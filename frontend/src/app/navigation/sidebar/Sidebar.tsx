import { useNavigate } from "react-router-dom";

import { X } from "lucide-react";

import "./Sidebar.scss";
import ProfilePicture from "../../components/molecules/profile-picture/ProfilePicture";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
  playerName: string;
  playerSprite: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  position = "right",
  playerName,
  playerSprite,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer toutes les données du localStorage
    localStorage.clear();

    // Fermer la sidebar
    onClose();

    // Rediriger vers la page d'accueil
    navigate("/");
  };

  return (
    <>
      {/* Overlay pour fermer la sidebar en cliquant à l'extérieur */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`sidebar sidebar-${position} ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="sidebar-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="sidebar-content">
          {/* Profil utilisateur */}
          <ProfilePicture avatar={playerSprite} alt={playerName} size="large" />

          {/* Menu */}
          <nav className="sidebar-menu">
            <button className="sidebar-menu-item logout" onClick={handleLogout}>
              <span className="sidebar-menu-icon">🚪</span>
              <span className="sidebar-menu-text">Déconnexion</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
