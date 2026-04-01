import { Injectable } from "@nestjs/common";

import { User } from "@prisma/client";

import { EntityService } from "@api/prisma/prisma.service";

@Injectable()
export class UserService extends EntityService<User> {
  protected readonly model = this.prisma.user;

  async findByUsername(username: string): Promise<User | null> {
    return this.model.findUnique({ where: { username } });
  }

  async findAll(): Promise<User[]> {
    return this.model.findMany({
      include: {
        avatar: { select: { imageUrl: true } },
      },
    });
  }
}
