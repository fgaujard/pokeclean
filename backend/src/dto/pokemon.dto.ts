import { SearchParams } from "./search-params.dto";

export interface PokemonSearchParams extends SearchParams {
  userId?: string;
  types?: string[] | string;
  mustAllMatch?: boolean | string;
}
