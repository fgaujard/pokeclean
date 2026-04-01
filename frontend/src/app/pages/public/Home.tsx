import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Pokeball from "@/app/components/atoms/pokeball/Pokeball";
import PlayerModal from "@/app/components/organisms/modals/player-start/PlayerModal";
import Background from "@/app/pages/public/background/Background";
import Logo from "@/app/pages/public/logo/Logo";
import PlayerCard from "@/app/pages/public/player-card/PlayerCard";
import { useUsers } from "@/tools/hooks/queries/useUsers";
import { LocalStorageKey } from "@/tools/types";

import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const [selectedPlayerId, setSelectedPlayer] = useState<string>("");

  const { data: users } = useUsers();

  const handleSelectPlayer = (playerId: string) => {
    setSelectedPlayer(playerId);
  };

  const handleStartGame = () => {
    localStorage.setItem(LocalStorageKey.PLAYER_ID, selectedPlayerId);
    navigate("/app/tasks");
  };

  const selectedPlayerData = users?.find(
    (p) => p.publicId === selectedPlayerId,
  );

  return (
    <Background>
      <div className="home-container">
        <Logo />

        <div className="home-players-container">
          {users?.map((user, index) => (
            <PlayerCard
              key={index}
              player={user}
              onClick={() => handleSelectPlayer(user.publicId)}
              animationDelay={`${index * 0.2}s`}
            />
          ))}
          <div className="pokeball-container">
            <Pokeball />
            <div className="select-player">SELECT A PLAYER</div>
          </div>
        </div>
      </div>

      <PlayerModal
        player={selectedPlayerData!}
        isOpen={selectedPlayerId.length > 0}
        onClose={() => setSelectedPlayer("")}
        onStartGame={handleStartGame}
      />
    </Background>
  );
};

export default Home;
