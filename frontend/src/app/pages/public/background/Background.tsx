import "./Background.scss";

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="stars" id="stars">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 5}px`,
              height: `${Math.random() * 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      <div className="background">{children}</div>
    </>
  );
};

export default Background;
