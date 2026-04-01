import { useState } from "react";

import { LocalStorageKey } from "@types";

import { ShoppingBag } from "lucide-react";

import BoosterOpeningModal from "@/app/components/organisms/modals/booster-opening/BoosterOpeningModal";
import PurchaseModal from "@/app/components/organisms/modals/purchase-booster/PurchaseModal";
import { useBoosters, useUsers } from "@/tools/hooks/queries";
import { buyBooster } from "@/tools/services";

import type { Booster, Card } from "@models";
import "./Shop.scss";

const Shop: React.FC = () => {
  const playerId = localStorage.getItem(LocalStorageKey.PLAYER_ID);

  const { data: users } = useUsers();
  const { data: boosters } = useBoosters();

  const player = users?.find((u) => u.publicId === playerId);

  const [selectedBooster, setSelectedBooster] = useState<Booster | null>(null);
  const [openedCardsByBooster, setOpenedCardsByBooster] = useState<Card[][]>(
    [],
  );

  const handleBoosterClick = (booster: Booster) => {
    setSelectedBooster(booster);
  };

  const handleCloseModal = () => {
    setSelectedBooster(null);
  };

  const handlePurchase = async (quantity: number) => {
    if (!selectedBooster || !playerId) {
      return;
    }

    buyBooster({
      userId: playerId,
      boosterId: selectedBooster.publicId,
      quantity,
    }).then((cards) => {
      setOpenedCardsByBooster(cards);
    });

    handleCloseModal();
  };

  const handleCloseOpeningModal = () => {
    setOpenedCardsByBooster([]);
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <ShoppingBag size={24} />
        <h1 className="shop-title">Boutique</h1>
      </div>

      <div className="shop-grid">
        {boosters?.map((booster) => (
          <div
            key={booster.publicId}
            className="booster-card"
            onClick={() => handleBoosterClick(booster)}
          >
            <div className="booster-info">
              <h3 className="booster-name">{booster.name}</h3>
              <p className="booster-description">{booster.description}</p>
              <div className="booster-price">
                <span className="price-icon">💰</span>
                <span className="price-value">{booster.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PurchaseModal
        isOpen={!!selectedBooster}
        onClose={handleCloseModal}
        booster={selectedBooster}
        playerWallet={player?.wallet || 0}
        onPurchase={handlePurchase}
      />

      <BoosterOpeningModal
        isOpen={openedCardsByBooster.length > 0}
        onClose={handleCloseOpeningModal}
        pulledCardsByBooster={openedCardsByBooster}
      />
    </div>
  );
};

export default Shop;
