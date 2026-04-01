import { useQuery } from "@tanstack/react-query";

import type { PokemonType } from "@/tools/models/enums";
import {
  fetchPokemonCount,
  fetchPokemons,
} from "@/tools/services/pokemonService";

interface PokemonSearchParams {
  userId?: string;
  search?: string;
  types?: PokemonType[];
}

export const usePokemonCount = () => {
  return useQuery({
    queryKey: ["pokemons-count"],
    queryFn: fetchPokemonCount,
  });
};

export const useFoundPokemons = (params: PokemonSearchParams) => {
  const { userId, search, types } = params;

  const otherParams = [
    {
      key: "userId",
      value: userId,
    },
    {
      key: "types",
      value: types,
    },
  ];

  return useQuery({
    queryKey: ["pokemons-found", { userId, search, types }],
    queryFn: () =>
      fetchPokemons({
        page: 1,
        limit: 151,
        search: search || undefined,
        params: otherParams,
      }),
    enabled: !!userId,
  });
};
