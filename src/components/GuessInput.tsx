import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import GuessFeedback, { GuessFeedbackProps } from "./GuessFeedback";

const getIcon = (status: GuessInputProps["status"]) => {
  if (status === "already guessed" || status === "not a state") {
    return (
      <ExclamationCircleIcon
        strokeWidth={2}
        className="h-5 w-5 text-error"
        aria-hidden="true"
      />
    );
  }

  if (status === "correct") {
    return (
      <CheckCircleIcon
        strokeWidth={2}
        className="h-5 w-5 text-success"
        aria-hidden="true"
      />
    );
  }

  return null;
};

export type GuessInputProps = {
  value: string;
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  status: GuessFeedbackProps["status"];
  correctStateName: GuessFeedbackProps["correctStateName"];
};
const GuessInput = ({
  value,
  onChange,
  status,
  correctStateName,
}: GuessInputProps) => {
  return (
    <div className="form-control mt-1 w-full">
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          placeholder="Guess here..."
          className="input-bordered input block w-full"
          value={value}
          onChange={onChange}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          {getIcon(status)}
        </div>
      </div>
      <div className="ml-2 mt-2 font-semibold">
        <GuessFeedback status={status} correctStateName={correctStateName} />
      </div>
    </div>
  );
};

export default GuessInput;
