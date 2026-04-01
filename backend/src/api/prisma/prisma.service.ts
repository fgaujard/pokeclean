import { Page, SearchParams } from "@/dto";
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";

import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

@Injectable()
export abstract class EntityService<T> {
  protected abstract model: any;

  constructor(protected readonly prisma: PrismaService) {}

  async search(params: SearchParams): Promise<Page<T>> {
    const {
      page = 1,
      limit = 1000,
      resourceId,
      search,
      sortBy = "id",
      sortOrder = "desc",
      filters,
    } = params;

    // Convertir en nombres si ce sont des strings (query params)
    const pageNum = typeof page === "string" ? parseInt(page, 10) : page;
    const limitNum = typeof limit === "string" ? parseInt(limit, 10) : limit;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (resourceId) {
      where.resourceId = resourceId;
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const orderBy: any = {};
    if (sortBy && sortOrder) {
      orderBy[sortBy] = sortOrder;
    }

    if (filters) {
      for (const [key, filter] of Object.entries(filters)) {
        if (Array.isArray(filter.values) && filter.values.length > 0) {
          if (filter.mustAllMatch) {
            where[key] = { hasEvery: filter.values };
          } else {
            where[key] = { hasSome: filter.values };
          }
        }
      }
    }

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

  async findOne(publicId: string): Promise<T | null> {
    return this.model.findUnique({ where: { publicId } });
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async create(data: T): Promise<T> {
    return this.model.create({ data });
  }

  async update(publicId: string, data: Partial<T>): Promise<T> {
    return this.model.update({ where: { publicId }, data });
  }

  async delete(publicId: string): Promise<T> {
    return this.model.delete({ where: { publicId } });
  }

  async count(): Promise<number> {
    return this.model.count();
  }

  async exists(publicId: string): Promise<boolean> {
    const count = await this.model.count({ where: { publicId } });
    return count > 0;
  }

  async findMany(
    where: any = {},
    options: { skip?: number; take?: number; orderBy?: any } = {}
  ): Promise<T[]> {
    return this.model.findMany({
      where,
      ...options,
    });
  }
}
