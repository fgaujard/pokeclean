import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CardService } from "./card.service";
import { BinderCardDto } from "@dto";

@ApiTags("Cards")
@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get("cards/binder")
  async getSv35Binder(
    @Query("userId") userId?: string,
  ): Promise<BinderCardDto[]> {
    if (!userId) {
      throw new BadRequestException("userId is required");
    }

    return this.cardService.getSv35BinderByUser(userId);
  }

  // @Get("cards")
  // async getAll(): Promise<Card[]> {
  //   return this.cardService.findAll();
  // }

  // @Get("card/:publicId")
  // async get(@Param("publicId") publicId: string): Promise<Card | null> {
  //   return this.cardService.findOne(publicId);
  // }

  // @Get("cards/pokemon/:pokemonPublicId")
  // async getByPokemon(
  //   @Param("pokemonPublicId") pokemonPublicId: string
  // ): Promise<Card[] | null> {
  //   return this.cardService.findByPokemon(pokemonPublicId);
  // }

  // @Get("cards/pokemon/:name")
  // async getByPokemonName(
  //   @Param("name") name: string
  // ): Promise<Card[] | null> {
  //   return this.cardService.findByPokemonName(name);
  // }

  // @Get("cards/set/:setPublicId")
  // async getBySet(@Param("setPublicId") setPublicId: string): Promise<Card[]> {
  //   return this.cardService.findBySet(setPublicId);
  // }

  // @Get("cards/set/:name")
  // async getBySetName(
  //   @Param("name") name: string
  // ): Promise<Card[] | null> {
  //   return this.cardService.findBySetName(name);
  // }

  // @Get("cards/set/:name/pokemon/:pokemonId")
  // async getBySetNameAndPokemon(
  //   @Param("name") name: string,
  //   @Param("pokemonId") pokemonId: string
  // ): Promise<Card[] | null> {
  //   return this.cardService.findBySetNameAndPokemon(name, pokemonId);
  // }

  // @Get("users/:userPublicId/cards")
  // async getAllByUser(@Param("userPublicId") userPublicId: string): Promise<Card[]> {
  //   return this.cardService.findAllByUser(userPublicId);
  // }

  // @Post("cards/search")
  // async search(
  //   @Body() params: {
  //     pokemonId?: number;
  //     setId?: number;
  //     rarity?: string;
  //     secret?: boolean;
  //   }
  // ): Promise<Card[] | null> {
  //   return this.cardService.findByQueryParams(params);
  // }
}
