type FeedbackProps = {
  correctCount: number;
  remainingCount: number;
};

const Feedback = ({ correctCount, remainingCount }: FeedbackProps) => {
  return (
    <div className="flex justify-between">
      <span>
        Correct: <span className="text-success">{correctCount}</span>
      </span>
      <span>
        Remaining: <span className="text-error">{remainingCount}</span>
      </span>
    </div>
  );
};

export default Feedback;
