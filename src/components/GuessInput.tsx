import { ChangeEvent, useEffect, useState } from "react";
import { formatStateProperty, getStateName, isAState } from "../utils/states";

type GuessInputProps = {
  guessedSet: Set<string>;
  addGuess: (abbr: string) => void;
};

type StateType = "empty" | "correct" | "not a state" | "already guessed";

const getLabelText = (state: StateType) => {
  if (state === "correct") {
    return <span className="label-text-alt text-success">Correct</span>;
  }

  if (state === "not a state") {
    return <span className="label-text-alt text-error">Not a state</span>;
  }

  return null;
};

const getLabel = (state: StateType) => {
  if (state === "empty") {
    return null;
  }

  return <label className="label">{getLabelText(state)}</label>;
};

const GuessInput = ({ guessedSet, addGuess }: GuessInputProps) => {
  const [value, setValue] = useState("");
  const [state, setState] = useState<StateType>("empty");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const formattedValue = formatStateProperty(value);
      if (value === "") {
        setState("empty");
      } else if (isAState(formattedValue)) {
        const stateName = getStateName(formattedValue);
        setState("correct");
        if (stateName) {
          const innerTimeoutId = setTimeout(() => {
            addGuess(stateName);
            setValue("");
            setState("empty");
          }, 500);
          return () => {
            clearTimeout(innerTimeoutId);
            clearTimeout(timeoutId);
          };
        }
      } else {
        setState("not a state");
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const upperCaseValue = event.target.value.toUpperCase();
    setValue(upperCaseValue);
  };

  return (
    <div className="form-control">
      <input
        autoComplete="off"
        type="text"
        placeholder="Guess here"
        className="input input-bordered w-full"
        onChange={onChange}
        value={value}
      />
      {getLabel(state)}
    </div>
  );
};

export default GuessInput;
