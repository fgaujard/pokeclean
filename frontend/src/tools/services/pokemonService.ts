import axiosInstance from "@lib/axios";

import { createSearchParamsUrl } from "../utils/pageUtils";

import type { Page } from "../dto/page";
import type { Pokemon } from "../models";
import type { SearchParams } from "@types";

export const fetchPokemons = async (
  params: SearchParams,
): Promise<Page<Pokemon>> => {
  const { data } = await axiosInstance.get<Page<Pokemon>>(
    `/pokemons/search?${createSearchParamsUrl(params)}`,
  );
  return data;
};

export const fetchPokemonCount = async (): Promise<number> => {
  const { data } = await axiosInstance.get<number>("/pokemons/count");
  return data;
};
