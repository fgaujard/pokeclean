import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { Pokemon as PokemonModel } from "@prisma/client";

import { PokemonService } from "./pokemon.service";
import { Page, PokemonSearchParams } from "@dto";

@ApiTags("pokemons")
@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get("pokemons/count")
  async count(): Promise<number> {
    return this.pokemonService.count();
  }
  @Get("pokemons/search")
  async search(
    @Query() params: PokemonSearchParams,
  ): Promise<Page<PokemonModel>> {
    return this.pokemonService.search(params);
  }
}
