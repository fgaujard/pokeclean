import { useState } from "react";

import ProfilePicture from "@/app/components/molecules/profile-picture/ProfilePicture";

import Sidebar from "../sidebar/Sidebar";

import type { User } from "@models";

import "./TopBar.scss";

const TopBar: React.FC<Pick<User, "username" | "avatar" | "wallet">> = ({
  username,
  avatar,
  wallet,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return amount?.toLocaleString("fr-FR");
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-wallet">
            <span className="top-bar-wallet-icon">💰</span>
            <span className="top-bar-wallet-amount">
              {formatCurrency(wallet)}
            </span>
          </div>
          <div className="top-bar-profile" onClick={handleSidebarToggle}>
            <ProfilePicture
              avatar={avatar.imageUrl}
              alt={username}
              size="small"
            />
          </div>
        </div>
      </header>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarToggle}
        position="right"
        playerName={username}
        playerSprite={avatar.imageUrl}
      />
    </>
  );
};

export default TopBar;
