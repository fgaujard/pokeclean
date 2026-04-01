import { Controller, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { Card } from "@prisma/client";

import { PurchaseService } from "./purchase.service";

@ApiTags("Purchases")
@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post("users/:userId/boosters/:boosterId/purchase")
  async buyBooster(
    @Param("userId") userId: string,
    @Param("boosterId") boosterId: string,
    @Query("quantity") quantity: number = 1,
  ): Promise<Card[][]> {
    return this.purchaseService.buyBooster({
      userPublicId: userId,
      boosterPublicId: boosterId,
      quantity: quantity,
    });
  }
}
