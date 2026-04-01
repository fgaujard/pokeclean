import { useEffect, useMemo, useRef, useState } from "react";

import { useBinderCards } from "@hooks";
import { LocalStorageKey } from "@types";

import PokemonCardModal from "@/app/components/organisms/modals/pokemon-card/PokemonCardModal";

import PokemonCard from "./card/PokemonCard";

import type { BinderCard } from "@models";

import "./CardsBinder.scss";

const Binder: React.FC = () => {
  const playerId = localStorage.getItem(LocalStorageKey.PLAYER_ID) ?? undefined;
  const [selectedCard, setSelectedCard] = useState<BinderCard | null>(null);
  const [headerActive, setHeaderActive] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const { data: binderCards = [] } = useBinderCards(playerId);

  useEffect(() => {
    const handleScroll = () => {
      if (pageRef.current) {
        // Activer le liquid glass après avoir scrollé un peu
        setHeaderActive(pageRef.current.scrollTop > 15);
      }
    };

    const element = pageRef.current;
    element?.addEventListener("scroll", handleScroll);
    return () => element?.removeEventListener("scroll", handleScroll);
  }, []);

  const discoveredCount = useMemo(() => {
    return binderCards.filter((card) => card.isDiscovered).length;
  }, [binderCards]);

  return (
    <div className="binder-page" ref={pageRef}>
      <div className={`binder-header ${headerActive ? "active" : ""}`}>
        <h1>Set sv3_5</h1>
        <p>
          {discoveredCount} / {binderCards.length} cartes découvertes
        </p>
      </div>

      <div className="binder-grid">
        {binderCards.map((card) => (
          <PokemonCard
            key={card.publicId}
            card={card}
            onClick={(card) => setSelectedCard(card)}
          />
        ))}
      </div>

      <PokemonCardModal
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
};

export default Binder;
