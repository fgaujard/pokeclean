import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { LocalStorageKey } from "@types";

import BottomNav from "@/app/navigation/bottombar/BottomNav";
import TopBar from "@/app/navigation/topbar/TopBar";
import { useUsers } from "@/tools/hooks/queries";

import "./AppLayout.scss";

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const playerId = localStorage.getItem(LocalStorageKey.PLAYER_ID);

  const { data: users } = useUsers();

  useEffect(() => {
    if (!playerId || playerId.length === 0) {
      navigate("/");
    }
    if (location.pathname === "/app" || location.pathname === "/app/") {
      navigate("/app/tasks");
    }
  }, [playerId, navigate, location.pathname]);

  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "#1e3a8a";
    };
  }, []);

  const selectedPlayerData = users?.find((p) => p.publicId === playerId);

  return (
    <div className="app-layout">
      <TopBar
        username={selectedPlayerData?.username || "Player"}
        avatar={selectedPlayerData?.avatar || { imageUrl: "/sprite1.gif" }}
        wallet={selectedPlayerData?.wallet || 0}
      />
      <main className="app-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
