import ImageFromApi from "@/app/components/atoms/ImageFromApi";
import Modal from "@/app/components/molecules/modal/Modal";

import type { Pokemon, PokemonType as PokemonTypeEnum } from "@models";

import "./PokemonDetailModal.scss";

interface PokemonDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  isOpen,
  onClose,
  pokemon,
}) => {
  if (!pokemon) return null;

  const formatNumber = (num: number): string => {
    return num.toString().padStart(3, "0");
  };

  const getTypeColor = (typeName: PokemonTypeEnum): string => {
    const typeColors: Record<PokemonTypeEnum, string> = {
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
    return typeColors[typeName] || "#777";
  };

  const getTypeName = (type: PokemonTypeEnum): string => {
    const typeNames: Record<PokemonTypeEnum, string> = {
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
      ELECTRIC: "Électrik",
      PSYCHIC: "Psy",
      ICE: "Glace",
      DRAGON: "Dragon",
      DARK: "Ténèbres",
      FAIRY: "Fée",
    };
    return typeNames[type] || type;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="pokemon-detail-content">
        <div className="pokemon-detail-header">
          <h2>{pokemon.name}</h2>
          <span className="pokemon-detail-number">
            #{formatNumber(pokemon.pokedexId)}
          </span>
        </div>

        <div className="pokemon-detail-body">
          <div className="pokemon-detail-image">
            <ImageFromApi url={pokemon.imageUrl} alt={pokemon.name} />
          </div>

          <div className="pokemon-detail-types">
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

          <div className="pokemon-detail-stats">
            <h3>Statistiques</h3>
            <div className="stat-bar">
              <span className="stat-name">HP</span>
              <div className="stat-value-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${(pokemon.stats.hp / 255) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.hp}</span>
            </div>
            <div className="stat-bar">
              <span className="stat-name">Attaque</span>
              <div className="stat-value-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${(pokemon.stats.attack / 255) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.attack}</span>
            </div>
            <div className="stat-bar">
              <span className="stat-name">Défense</span>
              <div className="stat-value-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${(pokemon.stats.defense / 255) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.defense}</span>
            </div>
            <div className="stat-bar">
              <span className="stat-name">Att. Spé</span>
              <div className="stat-value-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${(pokemon.stats.specialAttack / 255) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.specialAttack}</span>
            </div>
            <div className="stat-bar">
              <span className="stat-name">Déf. Spé</span>
              <div className="stat-value-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${(pokemon.stats.specialDefense / 255) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.specialDefense}</span>
            </div>
            <div className="stat-bar">
              <span className="stat-name">Vitesse</span>
              <div className="stat-value-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${(pokemon.stats.speed / 255) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.speed}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PokemonDetailModal;
