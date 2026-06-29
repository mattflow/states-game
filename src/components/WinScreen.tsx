import { abbreviationSet } from "../lib/states";
import GuessMap from "./GuessMap";

type WinScreenProps = {
  onPlayAgain: () => void;
};

const WinScreen = ({ onPlayAgain }: WinScreenProps) => (
  <div className="mt-8 text-center">
    <div className="text-6xl">🏆</div>
    <h2 className="mt-3 text-2xl font-bold">All 50 states</h2>
    <p className="mt-1 opacity-70">You named every state. Nice work.</p>
    <div className="my-6">
      <GuessMap guessedSet={new Set(abbreviationSet)} />
    </div>
    <button className="btn-primary btn-sm btn" onClick={onPlayAgain}>
      Play again
    </button>
  </div>
);

export default WinScreen;
