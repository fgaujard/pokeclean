import "./Logo.scss";

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <div className="logo-text">PokéClean</div>
      <div className="subtitle">
        <p>ADVENTURE</p>
        <span>beta v1.0.0</span>
      </div>
    </div>
  );
};

export default Logo;
