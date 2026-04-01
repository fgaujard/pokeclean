import ImageFromApi from "@/app/components/atoms/ImageFromApi";

import type { BinderCard } from "@models";

import "./PokemonCard.scss";

const PokemonCard: React.FC<{
  card: BinderCard;
  onClick: (card: BinderCard) => void;
}> = ({ card, onClick }) => {
  return (
    <button
      key={card.publicId}
      className={`binder-card ${card.isDiscovered ? "" : "binder-card--locked"}`}
      onClick={() => card.isDiscovered && onClick(card)}
      disabled={!card.isDiscovered}
      type="button"
    >
      {card.isDiscovered ? (
        <ImageFromApi url={card.imageUrl} alt={`Carte n°${card.cardNumber}`} />
      ) : (
        <div className="binder-placeholder">?</div>
      )}
    </button>
  );
};

export default PokemonCard;
