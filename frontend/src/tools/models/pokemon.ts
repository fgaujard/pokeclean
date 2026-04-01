import type { PokemonType } from "./enums/pokemonType";

export interface Pokemon {
  publicId: string;
  pokedexId: number;
  name: string;
  types: PokemonType[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  frontSpriteUrl: string;
  imageUrl: string;
  pkmnGeneration: number;
}
