import { titleCase } from "title-case";

export type GuessFeedbackProps = {
  status: "typing" | "empty" | "correct" | "already guessed" | "not a state";
  correctStateName: string;
};
const GuessFeedback = ({ status, correctStateName }: GuessFeedbackProps) => {
  if (status === "already guessed") {
    return <span className="text-error">Already guessed</span>;
  }

  if (status === "not a state") {
    return <span className="text-error">Not a state</span>;
  }

  if (status === "correct") {
    return (
      <span className="text-success">
        {titleCase(correctStateName.toLowerCase())}
      </span>
    );
  }

  return null;
};

export default GuessFeedback;
