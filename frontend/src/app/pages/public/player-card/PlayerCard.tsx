import ProfilePicture from "@/app/components/molecules/profile-picture/ProfilePicture";

import type { User } from "@models";

import "./PlayerCard.scss";

interface PlayerCardProps {
  player: User;
  onClick: () => void;
  animationDelay: string;
}

const PlayerCard = ({
  player: { username, aka, avatar },
  onClick,
  animationDelay,
}: PlayerCardProps) => {
  return (
    <div className="player-card" style={{ animationDelay }} onClick={onClick}>
      <div className="player-card-compact">
        <ProfilePicture avatar={avatar.imageUrl} alt={username} size="small" />
        <div className="player-info">
          <h3 className="player-name">{username}</h3>
          <p className="player-aka">AKA {aka}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
