import { useLocation, useNavigate } from "react-router-dom";
import "./BottomNav.scss";

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: "tasks", label: "Tasks", path: "/app/tasks", icon: "📝" },
  { id: "shop", label: "Shop", path: "/app/shop", icon: "🛒" },
  { id: "pokedex", label: "Pokédex", path: "/app/pokedex", icon: "📖" },
  { id: "binder", label: "Binder", path: "/app/binder", icon: "🗂️" },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive(item.path) ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
