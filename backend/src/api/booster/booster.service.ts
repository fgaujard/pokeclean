import { Injectable } from "@nestjs/common";

import { Booster } from "@prisma/client";

import { EntityService } from "@api/prisma/prisma.service";

@Injectable()
export class BoosterService extends EntityService<Booster> {
  protected readonly model = this.prisma.booster;
}
