import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Card, CardRarity } from "@prisma/client";

import { PrismaService } from "@api/prisma/prisma.service";
import { BuyBoosterPayload } from "@dto";

type PurchaseUser = {
  id: number;
  wallet: number;
};

type PurchaseBooster = {
  id: number;
  price: number;
  sets: { id: number }[];
};

type AvailableCard = {
  id: number;
  rarity: CardRarity;
};

type DrawPoolsByRarity = Map<CardRarity, number[]>;

const BOOSTER_CARD_COUNT = 10;
const MISSING_CARD_FOCUS_CHANCE = 0.2;

const CARD_RARITY_WEIGHTS: Record<CardRarity, number> = {
  COMMON: 0.55,
  UNCOMMON: 0.25,
  RARE: 0.1,
  PROMO: 0.03,
  DOUBLE_RARE: 0.03,
  ULTRA_RARE: 0.015,
  ILLUSTRATION_RARE: 0.015,
  SPECIAL_ILLUSTRATION_RARE: 0.008,
  HYPER_RARE: 0.002,
};

const CARD_RARITY_ORDER: Record<CardRarity, number> = {
  COMMON: 0,
  UNCOMMON: 1,
  RARE: 2,
  PROMO: 3,
  DOUBLE_RARE: 4,
  ULTRA_RARE: 5,
  ILLUSTRATION_RARE: 6,
  SPECIAL_ILLUSTRATION_RARE: 7,
  HYPER_RARE: 8,
};

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  private validateQuantity(quantity: number): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new BadRequestException("quantity must be a positive integer");
    }
  }

  private pickRandomItem<T>(items: T[]): T {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  private cloneRarityPools(source: DrawPoolsByRarity): DrawPoolsByRarity {
    return new Map(
      [...source.entries()].map(([rarity, cardIds]) => [rarity, [...cardIds]]),
    );
  }

  private pickRarityByWeight(availableRarities: CardRarity[]): CardRarity {
    const weightedRarities = availableRarities
      .map((rarity) => ({ rarity, weight: CARD_RARITY_WEIGHTS[rarity] ?? 0 }))
      .filter((entry) => entry.weight > 0);

    if (weightedRarities.length === 0) {
      return this.pickRandomItem(availableRarities);
    }

    const totalWeight = weightedRarities.reduce(
      (sum, entry) => sum + entry.weight,
      0,
    );
    let random = Math.random() * totalWeight;

    for (const entry of weightedRarities) {
      random -= entry.weight;
      if (random <= 0) {
        return entry.rarity;
      }
    }

    return weightedRarities[weightedRarities.length - 1].rarity;
  }

  private groupCardsByRarity(cards: AvailableCard[]): DrawPoolsByRarity {
    const cardsByRarity: DrawPoolsByRarity = new Map();

    for (const card of cards) {
      const rarityCards = cardsByRarity.get(card.rarity) ?? [];
      rarityCards.push(card.id);
      cardsByRarity.set(card.rarity, rarityCards);
    }

    return cardsByRarity;
  }

  private async getOwnedCardIdsForSets(
    userId: number,
    setIds: number[],
  ): Promise<Set<number>> {
    const ownedCards = await this.prisma.cardOwned.findMany({
      where: {
        userId,
        card: {
          setId: {
            in: setIds,
          },
        },
      },
      select: {
        cardId: true,
      },
    });

    return new Set(ownedCards.map((ownedCard) => ownedCard.cardId));
  }

  private filterOutDrawnCards(
    cardIds: number[],
    alreadyDrawn: Set<number>,
  ): number[] {
    const notDrawnYet = cardIds.filter((cardId) => !alreadyDrawn.has(cardId));
    return notDrawnYet.length > 0 ? notDrawnYet : cardIds;
  }

  private buildMissingCardsByRarity(
    availableCards: AvailableCard[],
    ownedCardIds: Set<number>,
  ): DrawPoolsByRarity {
    const missingCards = availableCards.filter(
      (card) => !ownedCardIds.has(card.id),
    );
    return this.groupCardsByRarity(missingCards);
  }

  private consumeCardFromPool(
    pools: DrawPoolsByRarity,
    rarity: CardRarity,
    cardId: number,
  ): void {
    const rarityCards = pools.get(rarity);
    if (!rarityCards || rarityCards.length === 0) {
      return;
    }

    const updatedRarityCards = rarityCards.filter((id) => id !== cardId);
    if (updatedRarityCards.length === 0) {
      pools.delete(rarity);
      return;
    }

    pools.set(rarity, updatedRarityCards);
  }

  private pickCardIdForRarity(
    rarity: CardRarity,
    allCardsByRarity: DrawPoolsByRarity,
    missingCardsByRarity: DrawPoolsByRarity,
    alreadyDrawnInBooster: Set<number>,
  ): number | null {
    const allRarityCards = allCardsByRarity.get(rarity);
    if (!allRarityCards || allRarityCards.length === 0) {
      return null;
    }

    const missingRarityCards = missingCardsByRarity.get(rarity) ?? [];
    const shouldFocusMissingCards =
      missingRarityCards.length > 0 &&
      Math.random() < MISSING_CARD_FOCUS_CHANCE;

    const basePool = shouldFocusMissingCards
      ? missingRarityCards
      : allRarityCards;
    const candidatePool = this.filterOutDrawnCards(
      basePool,
      alreadyDrawnInBooster,
    );

    return this.pickRandomItem(candidatePool);
  }

  private drawBoosterCardIds(
    allCardsByRarity: DrawPoolsByRarity,
    missingCardsByRarity: DrawPoolsByRarity,
  ): number[] {
    const pulledCardIds: number[] = [];
    const alreadyDrawnInBooster = new Set<number>();
    const availableRarities = [...allCardsByRarity.keys()];

    for (let i = 0; i < BOOSTER_CARD_COUNT; i += 1) {
      const pickedRarity = this.pickRarityByWeight(availableRarities);
      const pickedCardId = this.pickCardIdForRarity(
        pickedRarity,
        allCardsByRarity,
        missingCardsByRarity,
        alreadyDrawnInBooster,
      );

      if (pickedCardId === null) {
        continue;
      }

      pulledCardIds.push(pickedCardId);
      alreadyDrawnInBooster.add(pickedCardId);

      // If a missing card is drawn, remove it from missing pools for the current purchase.
      // This improves progression without eliminating randomness.
      this.consumeCardFromPool(
        missingCardsByRarity,
        pickedRarity,
        pickedCardId,
      );
    }

    return pulledCardIds;
  }

  private drawCardsByBooster(
    allCardsByRarity: DrawPoolsByRarity,
    missingCardsByRarity: DrawPoolsByRarity,
    quantity: number,
  ): number[][] {
    return Array.from({ length: quantity }, () => {
      const mutableMissingCardsByRarity =
        this.cloneRarityPools(missingCardsByRarity);
      const pulledCardIds = this.drawBoosterCardIds(
        allCardsByRarity,
        mutableMissingCardsByRarity,
      );

      return pulledCardIds;
    });
  }

  private countDrawnCards(pulledCardIds: number[]): Map<number, number> {
    const countsByCardId = new Map<number, number>();

    for (const cardId of pulledCardIds) {
      const previousCount = countsByCardId.get(cardId) ?? 0;
      countsByCardId.set(cardId, previousCount + 1);
    }

    return countsByCardId;
  }

  private async getPurchaseContext(
    userPublicId: string,
    boosterPublicId: string,
  ): Promise<{
    user: PurchaseUser;
    booster: PurchaseBooster;
    setIds: number[];
  }> {
    const [user, booster] = await this.prisma.$transaction([
      this.prisma.user.findUnique({
        where: { publicId: userPublicId },
        select: {
          id: true,
          wallet: true,
        },
      }),
      this.prisma.booster.findUnique({
        where: { publicId: boosterPublicId },
        select: {
          id: true,
          price: true,
          sets: {
            select: {
              id: true,
            },
          },
        },
      }),
    ]);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!booster) {
      throw new NotFoundException("Booster not found");
    }

    const setIds = booster.sets.map((set) => set.id);
    if (setIds.length === 0) {
      throw new BadRequestException("This booster has no linked set");
    }

    return {
      user,
      booster,
      setIds,
    };
  }

  private async getAvailableCards(setIds: number[]): Promise<AvailableCard[]> {
    const cards = await this.prisma.card.findMany({
      where: {
        setId: {
          in: setIds,
        },
      },
      select: {
        id: true,
        rarity: true,
      },
    });

    if (cards.length === 0) {
      throw new BadRequestException("No card available for this booster");
    }

    return cards;
  }

  private async persistPurchase(
    userId: number,
    totalCost: number,
    pulledCardIds: number[][],
  ): Promise<void> {
    const flatCardIds = pulledCardIds.flat();
    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          wallet: {
            decrement: totalCost,
          },
        },
      });

      const drawnCountsByCardId = this.countDrawnCards(flatCardIds);
      const drawnCardIds = [...drawnCountsByCardId.keys()];

      const existingOwnedCards = await tx.cardOwned.findMany({
        where: {
          userId,
          cardId: {
            in: drawnCardIds,
          },
        },
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          cardId: true,
          quantity: true,
        },
      });

      const existingOwnedByCardId = new Map<
        number,
        { id: number; quantity: number }
      >();

      for (const existingOwnedCard of existingOwnedCards) {
        if (!existingOwnedByCardId.has(existingOwnedCard.cardId)) {
          existingOwnedByCardId.set(existingOwnedCard.cardId, {
            id: existingOwnedCard.id,
            quantity: existingOwnedCard.quantity,
          });
        }
      }

      for (const [cardId, addedQuantity] of drawnCountsByCardId.entries()) {
        const existingOwned = existingOwnedByCardId.get(cardId);

        if (existingOwned) {
          await tx.cardOwned.update({
            where: {
              id: existingOwned.id,
            },
            data: {
              quantity: existingOwned.quantity + addedQuantity,
            },
          });
          continue;
        }

        await tx.cardOwned.create({
          data: {
            userId,
            cardId,
            quantity: addedQuantity,
          },
        });
      }
    });
  }

  private sortByRarity(cards: Card[]): Card[] {
    return [...cards].sort(
      (a, b) => CARD_RARITY_ORDER[a.rarity] - CARD_RARITY_ORDER[b.rarity],
    );
  }

  private async buildPurchaseResponse(
    pulledCardIdsByBooster: number[][],
  ): Promise<Card[][]> {
    const uniquePulledIds = [...new Set(pulledCardIdsByBooster.flat())];
    const uniquePulledCards = await this.prisma.card.findMany({
      where: {
        id: {
          in: uniquePulledIds,
        },
      },
    });

    const cardsById = new Map(uniquePulledCards.map((card) => [card.id, card]));

    return pulledCardIdsByBooster.map((boosterCardIds) =>
      this.sortByRarity(
        boosterCardIds
          .map((cardId) => cardsById.get(cardId))
          .filter((card): card is Card => card !== undefined),
      ),
    );
  }

  async buyBooster(payload: BuyBoosterPayload): Promise<Card[][]> {
    const { userPublicId, boosterPublicId, quantity } = payload;

    this.validateQuantity(quantity);

    const { user, booster, setIds } = await this.getPurchaseContext(
      userPublicId,
      boosterPublicId,
    );

    const totalCost = booster.price * quantity;
    if (user.wallet < totalCost) {
      throw new BadRequestException("Insufficient wallet balance");
    }

    const availableCards = await this.getAvailableCards(setIds);
    const allCardsByRarity = this.groupCardsByRarity(availableCards);
    const ownedCardIds = await this.getOwnedCardIdsForSets(user.id, setIds);
    const missingCardsByRarity = this.buildMissingCardsByRarity(
      availableCards,
      ownedCardIds,
    );

    const pulledCardIdsByBooster = this.drawCardsByBooster(
      allCardsByRarity,
      missingCardsByRarity,
      quantity,
    );

    await this.persistPurchase(user.id, totalCost, pulledCardIdsByBooster);

    return this.buildPurchaseResponse(pulledCardIdsByBooster);
  }
}
