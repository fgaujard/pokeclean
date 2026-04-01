import { useState } from "react";

import { Minus, Plus, ShoppingCart } from "lucide-react";

import Modal from "@/app/components/molecules/modal/Modal";

import type { Booster } from "@models";

import "./PurchaseModal.scss";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  booster: Booster | null;
  playerWallet: number;
  onPurchase: (quantity: number) => Promise<void> | void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  booster,
  playerWallet,
  onPurchase,
}) => {
  const maxQuantity = booster ? Math.floor(playerWallet / booster.price) : 0;
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleConfirmPurchase = async () => {
    await onPurchase(quantity);
    setQuantity(1);
  };

  const totalPrice = booster ? booster.price * quantity : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="purchase-modal-content">
        <h2 className="purchase-modal-title">{booster?.name}</h2>
        <p className="purchase-modal-description">{booster?.description}</p>
        <p className="purchase-modal-price">
          Prix unitaire : {booster?.price} 💰
        </p>

        {maxQuantity === 0 ? (
          <p className="purchase-modal-error">
            Fonds insuffisants pour acheter ce booster
          </p>
        ) : (
          <>
            <div className="purchase-modal-quantity">
              <button
                className="quantity-button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                <Minus size={20} />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-button"
                onClick={handleIncrease}
                disabled={quantity >= maxQuantity}
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="purchase-modal-total">
              <span className="total-label">Total :</span>
              <span className="total-value">{totalPrice} 💰</span>
            </div>

            <div className="purchase-modal-wallet">
              <span>Solde restant :</span>
              <span className="wallet-remaining">
                {playerWallet - totalPrice} 💰
              </span>
            </div>

            <button
              className="purchase-modal-confirm"
              onClick={handleConfirmPurchase}
            >
              <ShoppingCart size={20} />
              <span>Confirmer l'achat</span>
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PurchaseModal;
