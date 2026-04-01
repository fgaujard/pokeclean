import { Injectable } from "@nestjs/common";

import { Card, Prisma } from "@prisma/client";
import { BinderCardDto } from "@dto";

import { EntityService } from "../prisma/prisma.service";

@Injectable()
export class CardService extends EntityService<Card> {
  protected readonly model = this.prisma.card;

  async getSv35BinderByUser(userPublicId: string): Promise<BinderCardDto[]> {
    const cards = await this.model.findMany({
      where: {
        imageUrl: {
          startsWith: "cards/sv3_5/",
        },
      },
      orderBy: [{ cardNumber: "asc" }, { id: "asc" }],
      select: {
        publicId: true,
        imageUrl: true,
        cardNumber: true,
        foundedBy: {
          where: {
            user: {
              publicId: userPublicId,
            },
          },
          select: {
            quantity: true,
          },
          take: 1,
        },
      },
    });

    return cards.map((card) => ({
      publicId: card.publicId,
      imageUrl: card.imageUrl,
      cardNumber: card.cardNumber,
      isDiscovered: card.foundedBy.length > 0,
      quantity: card.foundedBy[0]?.quantity ?? 0,
    }));
  }

  async findAll(): Promise<Card[]> {
    return this.model.findMany({
      include: { pokemon: true, set: true },
    });
  }

  // async findByQueryParams(params: {
  //   pokemonId?: number;
  //   setId?: number;
  //   rarity?: $Enums.CardRarity;
  //   secret?: boolean;
  // }): Promise<Card[] | null> {
  //   return this.model.findMany({
  //     where: {
  //       pokemonId: params.pokemonId,
  //       setId: params.setId,
  //       rarity: params.rarity,
  //       secret: params.secret,
  //     },
  //     include: { pokemon: true, set: true },
  //   });
  // }

  async findByPublicId(publicId: string): Promise<Card | null> {
    return this.model.findUnique({
      where: { publicId },
      include: { pokemon: true, set: true },
    });
  }

  async findByPokemon(pokemonPublicId: string): Promise<Card[] | null> {
    return this.model.findMany({
      where: { pokemon: { publicId: pokemonPublicId } },
      include: { pokemon: true, set: true },
    });
  }

  async findBySet(setPublicId: string): Promise<Card[]> {
    return this.model.findMany({
      where: { set: { publicId: setPublicId } },
      include: { pokemon: true, set: true },
    });
  }

  async findByRarity(
    rarity: Prisma.EnumCardRarityFilter,
  ): Promise<Card[] | null> {
    return this.model.findMany({
      where: { rarity },
      include: { pokemon: true, set: true },
    });
  }

  // async findSecretCards(): Promise<Card[] | null> {
  //   return this.model.findMany({
  //     where: { secret: true },
  //     include: { pokemon: true, set: true },
  //   });
  // }
}
