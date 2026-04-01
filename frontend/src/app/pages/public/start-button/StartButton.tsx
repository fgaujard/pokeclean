import "./StartButton.scss";

interface StartButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const StartButton = ({ onClick, children }: StartButtonProps) => {
  return (
    <button className="start-game-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default StartButton;
