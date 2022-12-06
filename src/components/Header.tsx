import GuessMap, { GuessMapProps } from "./GuessMap";

type HeaderProps = {
  guessedSet: GuessMapProps["guessedSet"];
  onResetClick: React.DOMAttributes<HTMLLabelElement>["onClick"];
};
const Header = ({ guessedSet, onResetClick }: HeaderProps) => (
  <>
    <div className="flex items-end justify-between">
      <h1 className="mt-6 text-2xl font-semibold">States Game</h1>
      <div className="space-x-2">
        <label htmlFor="cheat-modal" className="btn-info btn-sm btn">
          Cheat
        </label>
        <label htmlFor="reset-modal" className="btn-warning btn-sm btn">
          Reset
        </label>
      </div>
    </div>
    <input type="checkbox" id="cheat-modal" className="modal-toggle" />
    <div className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <label
          htmlFor="cheat-modal"
          className="btn-sm btn-circle btn absolute right-2 top-2"
        >
          ✕
        </label>
        <GuessMap guessedSet={guessedSet} />
      </div>
    </div>
    <input type="checkbox" id="reset-modal" className="modal-toggle" />
    <div className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <label
          htmlFor="reset-modal"
          className="btn-sm btn-circle btn absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">Are you sure?</h3>
        <div className="modal-action">
          <label htmlFor="reset-modal" className="btn">
            No
          </label>
          <label htmlFor="reset-modal" className="btn" onClick={onResetClick}>
            Yes
          </label>
        </div>
      </div>
    </div>
  </>
);

export default Header;
