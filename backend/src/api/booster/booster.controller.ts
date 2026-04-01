import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { Booster } from "@prisma/client";

import { BoosterService } from "./booster.service";

@ApiTags("Boosters")
@Controller()
export class BoosterController {
  constructor(private readonly boosterService: BoosterService) {}

  @Get("boosters")
  async getAll(): Promise<Booster[]> {
    return this.boosterService.findAll();
  }
}
