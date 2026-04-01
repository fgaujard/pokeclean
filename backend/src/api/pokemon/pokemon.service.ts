import { Injectable } from "@nestjs/common";

import { Pokemon } from "@prisma/client";

import { EntityService } from "../prisma/prisma.service";
import { Page, PokemonSearchParams } from "@dto";
import { SortOrder } from "@types";

@Injectable()
export class PokemonService extends EntityService<Pokemon> {
  protected readonly model = this.prisma.pokemon;

  async search(params: PokemonSearchParams): Promise<Page<Pokemon>> {
    const {
      userId,
      types,
      mustAllMatch,
      page = 1,
      limit = 1000,
      search,
      sortBy = "pokedexId",
      sortOrder = SortOrder.ASC,
    } = params;

    const pageNum = typeof page === "string" ? parseInt(page, 10) : page;
    const limitNum = typeof limit === "string" ? parseInt(limit, 10) : limit;
    const skip = (pageNum - 1) * limitNum;

    const normalizedTypes = Array.isArray(types)
      ? types
      : typeof types === "string" && types.length > 0
        ? [types]
        : [];
    const mustMatchAll =
      mustAllMatch === true || mustAllMatch === "true" || mustAllMatch === "1";

    if (!userId) {
      return {
        items: [],
        meta: {
          totalItems: 0,
          limit: limitNum,
          currentPage: pageNum,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: pageNum > 1,
        },
      };
    }

    const userOwnedCards = await this.prisma.cardOwned.findMany({
      where: {
        user: {
          publicId: userId,
        },
      },
      select: {
        card: {
          select: {
            pokemonId: true,
          },
        },
      },
    });

    const pokemonIds = [
      ...new Set(userOwnedCards.map((entry) => entry.card.pokemonId)),
    ];

    if (pokemonIds.length === 0) {
      return {
        items: [],
        meta: {
          totalItems: 0,
          limit: limitNum,
          currentPage: pageNum,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: pageNum > 1,
        },
      };
    }

    const where: Record<string, unknown> = {
      id: {
        in: pokemonIds,
      },
    };

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (normalizedTypes.length > 0) {
      where.types = mustMatchAll
        ? { hasEvery: normalizedTypes }
        : { hasSome: normalizedTypes };
    }

    const orderBy: Record<string, string> = {};
    orderBy[sortBy] = sortOrder;

    const [total, data] = await this.prisma.$transaction([
      this.model.count({ where }),
      this.model.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
      }),
    ]);

    return {
      items: data,
      meta: {
        totalItems: total,
        limit: limitNum,
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum * limitNum < total,
        hasPreviousPage: pageNum > 1,
      },
    };
  }
}
