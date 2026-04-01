import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaModule } from "./api/prisma/prisma.module";
import { TaskController } from "./api/task/task.controller";
import { TaskService } from "./api/task/task.service";
import { UserController } from "./api/user/user.controller";
import { UserService } from "./api/user/user.service";
import { BoosterController } from "./api/booster/booster.controller";
import { BoosterService } from "./api/booster/booster.service";
import { PokemonController } from "./api/pokemon/pokemon.controller";
import { PokemonService } from "./api/pokemon/pokemon.service";
import { CardController } from "./api/card/card.controller";
import { CardService } from "./api/card/card.service";
import { PurchaseController } from "./api/purchase/purchase.controller";
import { PurchaseService } from "./api/purchase/purchase.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    PrismaModule,
  ],
  controllers: [
    UserController,
    TaskController,
    BoosterController,
    PokemonController,
    CardController,
    PurchaseController,
  ],
  providers: [
    UserService,
    TaskService,
    BoosterService,
    PokemonService,
    CardService,
    PurchaseService,
  ],
})
export class AppModule {}
