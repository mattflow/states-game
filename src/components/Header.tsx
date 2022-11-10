import { MouseEventHandler } from "react";

type HeaderProps = {
  resetOnClick: MouseEventHandler;
};

const Header = ({ resetOnClick }: HeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-3xl font-semibold">States Game</h1>
      <button className="btn-primary btn-sm btn" onClick={resetOnClick}>
        Reset
      </button>
    </div>
  );
};

export default Header;
