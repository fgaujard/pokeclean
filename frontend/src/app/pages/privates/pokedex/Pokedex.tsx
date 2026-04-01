import { useMemo, useState } from "react";

import { useDebouncedValue, useFoundPokemons, usePokemonCount } from "@hooks";
import { LocalStorageKey } from "@types";

import PokemonDetailModal from "@/app/components/organisms/modals/pokemon-details/PokemonDetailModal";
import PokemonRow from "@/app/pages/privates/pokedex/pokemon-row/PokemonRow";

import type { Pokemon } from "@models";

import "./Pokedex.scss";

const Pokedex: React.FC = () => {
  const playerId = localStorage.getItem(LocalStorageKey.PLAYER_ID) ?? undefined;
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [searchInput, setSearchInput, debouncedSearch] = useDebouncedValue(
    "",
    500,
  );

  const { data: totalCount = 0 } = usePokemonCount();

  const { data: foundData } = useFoundPokemons({
    userId: playerId,
    search: debouncedSearch,
  });

  const foundPokemons = useMemo(() => foundData?.items ?? [], [foundData]);
  const foundCount = foundData?.meta.totalItems ?? 0;

  const foundByPokedexId = useMemo(() => {
    const map = new Map<number, Pokemon>();
    foundPokemons.forEach((p) => map.set(p.pokedexId, p));
    return map;
  }, [foundPokemons]);

  const slots = useMemo(() => {
    if (debouncedSearch) {
      return foundPokemons.map((p) => p.pokedexId);
    }
    return Array.from({ length: totalCount }, (_, i) => i + 1);
  }, [totalCount, debouncedSearch, foundPokemons]);

  return (
    <div className="pokedex">
      <div className="pokedex-header">
        <div className="pokedex-header-top">
          <div className="led-indicator led-blue"></div>
          <div className="led-indicator led-green"></div>
          <div className="led-indicator led-yellow"></div>
        </div>

        <div className="pokedex-center-module" aria-hidden="true">
          <div className="pokedex-camera-lens"></div>
          <div className="pokedex-speaker-grid">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="speaker-hole" />
            ))}
          </div>
        </div>

        <div className="pokedex-counter">
          {foundCount} / {totalCount}
        </div>
      </div>

      <div className="pokedex-search">
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="infinite-scroll-container">
        <div className="pokemon-grid">
          {slots.map((pokedexId) => {
            return (
              <PokemonRow
                key={pokedexId}
                pokedexId={pokedexId}
                pokemon={foundByPokedexId.get(pokedexId)}
                onSelect={setSelectedPokemon}
              />
            );
          })}
        </div>
      </div>

      <PokemonDetailModal
        isOpen={selectedPokemon !== null}
        onClose={() => setSelectedPokemon(null)}
        pokemon={selectedPokemon}
      />
    </div>
  );
};

export default Pokedex;
