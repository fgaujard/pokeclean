import type { CardRarity } from "./enums/cardRarity";
import type { Pokemon } from "./pokemon";
import type { Set } from "./set";

export interface Card {
  publicId: string;
  set: Set;
  pokemon: Pokemon;
  imageUrl: string;
  rarity: CardRarity;
  cardNumber: number;
}
