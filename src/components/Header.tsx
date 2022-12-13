import GuessMap, { GuessMapProps } from "./GuessMap";

type HeaderProps = {
  guessedSet: GuessMapProps["guessedSet"];
  onResetClick: React.DOMAttributes<HTMLLabelElement>["onClick"];
};
const Header = ({ guessedSet, onResetClick }: HeaderProps) => (
  <>
    <div className="mt-8 flex justify-end">
      <div className="space-x-2">
        <label htmlFor="cheat-modal" className="btn-sm btn">
          Cheat
        </label>
        <label htmlFor="reset-modal" className="btn-sm btn">
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
        <div className="my-4">
          <GuessMap guessedSet={guessedSet} />
        </div>
      </div>
    </div>
    <input type="checkbox" id="reset-modal" className="modal-toggle" />
    <div className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <h3 className="text-lg font-bold">Reset</h3>
        <p className="pt-4">Are you sure?</p>
        <div className="modal-action">
          <label htmlFor="reset-modal" className="btn-sm btn w-16">
            No
          </label>
          <label
            htmlFor="reset-modal"
            className="btn-primary btn-sm btn w-16"
            onClick={onResetClick}
          >
            Yes
          </label>
        </div>
      </div>
    </div>
  </>
);

export default Header;
