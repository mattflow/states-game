import { abbreviationSet } from "../lib/states";

const formatElapsed = (ms: number) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const pad = (n: number) => String(n).padStart(2, "0");
  const days = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const hms = `${pad(h)}:${pad(m)}:${pad(s)}`;
  // Keep HH:MM:SS for normal games; prefix days so months-long gaps stay sane.
  return days > 0 ? `${days}d ${hms}` : hms;
};

type WinScreenProps = {
  elapsedMs: number;
  onPlayAgain: () => void;
};

const WinScreen = ({ elapsedMs, onPlayAgain }: WinScreenProps) => (
  <div className="mt-8 text-center">
    <p className="text-lg">
      You guessed all {abbreviationSet.size} in{" "}
      <span className="font-semibold tabular-nums">{formatElapsed(elapsedMs)}</span>
    </p>
    <button className="btn-ghost btn-sm btn mt-3" onClick={onPlayAgain}>
      Play again
    </button>
  </div>
);

export default WinScreen;
