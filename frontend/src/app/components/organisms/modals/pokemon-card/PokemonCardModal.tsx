import ImageFromApi from "@/app/components/atoms/ImageFromApi";
import Modal from "@/app/components/molecules/modal/Modal";
import type { BinderCard } from "@/tools/models";
import "./PokemonCardModal.scss";

const PokemonCardModal: React.FC<{
  card: BinderCard | null;
  onClose: () => void;
}> = ({ card, onClose }) => {
  return (
    <Modal isOpen={card !== null} closeButton={false} onClose={onClose}>
      {card && (
        <div className="binder-modal-content">
          <ImageFromApi
            url={card.imageUrl}
            alt={`Carte n°${card.cardNumber}`}
          />
        </div>
      )}
    </Modal>
  );
};

export default PokemonCardModal;
