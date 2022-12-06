type ScoreProps = {
  correct: number;
  remaining: number;
};
const Score = ({ correct, remaining }: ScoreProps) => (
  <div className="mx-2 mt-4 flex justify-between">
    <span>
      Correct: <span className="font-semibold text-success">{correct}</span>
    </span>
    <span>
      Remaining: <span className="font-semibold text-error">{remaining}</span>
    </span>
  </div>
);

export default Score;
