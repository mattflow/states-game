import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

export type GuessInputProps = {
  value: string;
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  status: "typing" | "empty" | "correct" | "already guessed" | "not a state";
};
const GuessInput = ({ value, onChange, status }: GuessInputProps) => {
  return (
    <div className="form-control mt-1 w-full">
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input block w-full"
          value={value}
          onChange={onChange}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <ExclamationCircleIcon
            className="h-5 w-5 text-error"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="ml-2 mt-1 text-sm">{status}</div>
    </div>
  );
};

export default GuessInput;
