import { useEffect, useMemo, useState } from "react";

import ImageFromApi from "@/app/components/atoms/ImageFromApi";
import Modal from "@/app/components/molecules/modal/Modal";

import type { Card } from "@models";

import "./BoosterOpeningModal.scss";

interface BoosterOpeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  pulledCardsByBooster: Card[][];
}

const SWIPE_THRESHOLD = 70;

const formatRarity = (rarity: string): string => {
  return rarity
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
};

const BoosterOpeningModal: React.FC<BoosterOpeningModalProps> = ({
  isOpen,
  onClose,
  pulledCardsByBooster,
}) => {
  const flattenedCards = useMemo(
    () =>
      pulledCardsByBooster.flatMap((boosterCards, boosterIndex) =>
        boosterCards.map((card, cardIndex) => ({
          card,
          boosterIndex,
          cardIndex,
          boosterSize: boosterCards.length,
        })),
      ),
    [pulledCardsByBooster],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [pointerStartX, setPointerStartX] = useState<number | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isAutoSwiping, setIsAutoSwiping] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setCurrentIndex(0);
    setPointerStartX(null);
    setDragOffsetX(0);
    setIsGrabbing(false);
    setIsAutoSwiping(false);
  }, [isOpen, pulledCardsByBooster]);

  const currentEntry = flattenedCards[currentIndex];
  const canGoNext = currentIndex < flattenedCards.length - 1;
  const nextEntry = canGoNext ? flattenedCards[currentIndex + 1] : null;
  const currentCardName =
    currentEntry?.card.pokemon?.name ??
    (currentEntry ? `Carte #${currentEntry.card.cardNumber}` : "Carte");

  const goNext = () => {
    if (canGoNext) {
      setCurrentIndex((previous) => previous + 1);
    }
  };

  const animateToNextCard = () => {
    if (!canGoNext || isAutoSwiping) {
      return;
    }

    setIsAutoSwiping(true);
    setTimeout(() => {
      goNext();
      setDragOffsetX(0);
      setIsAutoSwiping(false);
    }, 220);
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (
    event,
  ) => {
    setPointerStartX(event.clientX);
    setIsGrabbing(true);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (
    event,
  ) => {
    if (pointerStartX === null || !isGrabbing || isAutoSwiping) {
      return;
    }

    const deltaX = event.clientX - pointerStartX;
    // Swipe avant uniquement: on ne laisse tirer la carte que vers la gauche.
    setDragOffsetX(Math.min(0, deltaX));
  };

  const handlePointerEnd = () => {
    if (dragOffsetX <= -SWIPE_THRESHOLD) {
      animateToNextCard();
    } else {
      setDragOffsetX(0);
    }

    setPointerStartX(null);
    setIsGrabbing(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="booster-opening-modal">
        <div className="booster-opening-header">
          <h2>Ouverture en cours</h2>
          <p>
            Carte {currentIndex + 1} / {flattenedCards.length}
          </p>
          {currentEntry && (
            <span className="booster-opening-subtitle">
              Booster {currentEntry.boosterIndex + 1} /{" "}
              {pulledCardsByBooster.length}
              {" · "}
              Carte {currentEntry.cardIndex + 1} / {currentEntry.boosterSize}
            </span>
          )}
        </div>

        {currentEntry ? (
          <div className="booster-opening-body">
            <div
              className={`booster-card-viewer ${isGrabbing ? "is-grabbing" : ""}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              onPointerLeave={handlePointerEnd}
            >
              <div className="booster-cards-stack">
                {nextEntry && (
                  <div className="booster-next-card-shell" aria-hidden="true">
                    <ImageFromApi
                      url={nextEntry.card.imageUrl}
                      alt="Carte suivante"
                      className="booster-opened-card"
                    />
                  </div>
                )}

                <div
                  className={`booster-opened-card-shell ${isAutoSwiping ? "is-auto-swiping" : ""}`}
                  style={{
                    transform: `translateX(${dragOffsetX}px) rotate(${dragOffsetX / 40}deg)`,
                  }}
                >
                  <ImageFromApi
                    url={currentEntry.card.imageUrl}
                    alt={`${currentCardName} - ${currentEntry.card.rarity}`}
                    className="booster-opened-card"
                  />
                </div>
              </div>
              <div className="booster-card-meta">
                <strong>{currentCardName}</strong>
                <span>{formatRarity(currentEntry.card.rarity)}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="booster-opening-empty">
            Aucune carte tiree pour cet achat.
          </p>
        )}

        <div className="booster-opening-footer">
          <span>Glisse la carte vers la gauche pour reveler la suivante.</span>
          {canGoNext ? (
            <button
              className="booster-action-button"
              onClick={animateToNextCard}
              disabled={isAutoSwiping}
            >
              Carte suivante
            </button>
          ) : (
            <button className="booster-action-button" onClick={onClose}>
              Terminer
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BoosterOpeningModal;
