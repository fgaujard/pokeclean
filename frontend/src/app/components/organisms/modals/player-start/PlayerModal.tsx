import Modal from "@/app/components/molecules/modal/Modal";
import ProfilePicture from "@/app/components/molecules/profile-picture/ProfilePicture";
import StartButton from "@/app/pages/public/start-button/StartButton";

import type { User } from "@models";

import "./PlayerModal.scss";

interface PlayerModalProps {
  player: User;
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

const PlayerModalContent = ({
  player,
  isOpen,
  onClose,
  onStartGame,
}: PlayerModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {player && (
          <>
            <div className="expanded-header">
              <ProfilePicture
                avatar={player.avatar.imageUrl || "/sprite1.gif"}
                alt={player.username}
                size="large"
              />
              <div className="expanded-info">
                <h2 className="expanded-name">{player.username}</h2>
                <p className="expanded-aka">AKA {player.aka}</p>
              </div>
            </div>
            <div className="player-bio">
              <h3>BIOGRAPHIE</h3>
              <p>{player.bio}</p>
            </div>
            <StartButton onClick={onStartGame}>COMMENCER</StartButton>
          </>
        )}
      </Modal>
    </>
  );
};

export default PlayerModalContent;
