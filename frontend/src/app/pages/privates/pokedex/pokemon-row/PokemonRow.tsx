import ImageFromApi from "@/app/components/atoms/ImageFromApi";
import {
  formatPokemonNumber,
  getTypeColor,
  getTypeName,
} from "@/tools/utils/pokemonUtils";

import type { Pokemon } from "@models";

import "./PokemonRow.scss";

interface PokemonRowProps {
  pokedexId: number;
  pokemon?: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
}

const PokemonRow = ({ pokedexId, pokemon, onSelect }: PokemonRowProps) => {
  if (!pokemon) {
    return (
      <div className="pokemon-card pokemon-card--unknown">
        <div className="pokemon-image-container">
          <div className="pokemon-unknown-silhouette" />
        </div>
        <div className="pokemon-content">
          <div className="pokemon-number">
            #{formatPokemonNumber(pokedexId)}
          </div>
          <div className="pokemon-name">???</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-card" onClick={() => onSelect(pokemon)}>
      <div className="pokemon-image-container">
        <ImageFromApi url={pokemon.frontSpriteUrl} alt={pokemon.name} />
      </div>
      <div className="pokemon-content">
        <div className="pokemon-number">
          #{formatPokemonNumber(pokemon.pokedexId)}
        </div>
        <div className="pokemon-name">{pokemon.name}</div>
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="pokemon-type"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {getTypeName(type)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonRow;
