import type { PokemonType } from "@models";

const typeColors: Record<PokemonType, string> = {
  NORMAL: "#A8A878",
  FIGHTING: "#C03028",
  FLYING: "#A890F0",
  POISON: "#A040A0",
  GROUND: "#E0C068",
  ROCK: "#B8A038",
  BUG: "#A8B820",
  GHOST: "#705898",
  STEEL: "#B8B8D0",
  FIRE: "#F08030",
  WATER: "#6890F0",
  GRASS: "#78C850",
  ELECTRIC: "#F8D030",
  PSYCHIC: "#F85888",
  ICE: "#98D8D8",
  DRAGON: "#7038F8",
  DARK: "#705848",
  FAIRY: "#EE99AC",
};

const typeNames: Record<PokemonType, string> = {
  NORMAL: "Normal",
  FIGHTING: "Combat",
  FLYING: "Vol",
  POISON: "Poison",
  GROUND: "Sol",
  ROCK: "Roche",
  BUG: "Insecte",
  GHOST: "Spectre",
  STEEL: "Acier",
  FIRE: "Feu",
  WATER: "Eau",
  GRASS: "Plante",
  ELECTRIC: "\u00C9lectrik",
  PSYCHIC: "Psy",
  ICE: "Glace",
  DRAGON: "Dragon",
  DARK: "T\u00E9n\u00E8bres",
  FAIRY: "F\u00E9e",
};

export const getTypeColor = (typeName: PokemonType): string => {
  return typeColors[typeName] || "#777";
};

export const getTypeName = (type: PokemonType): string => {
  return typeNames[type] || type;
};

export const formatPokemonNumber = (num: number): string => {
  return num.toString().padStart(3, "0");
};
