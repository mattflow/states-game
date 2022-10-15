import { stateNameSet } from "./utils/states";
import { useSet } from "react-use";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Feedback from "./components/Feedback";
import GuessInput from "./components/GuessInput";

function App() {
  const [guessedSet, { has, reset }] = useSet<string>(new Set());
  const [remainingSet, setRemainingSet] = useState(new Set([...stateNameSet]));

  useEffect(() => {
    setRemainingSet(new Set([...stateNameSet].filter((name) => !has(name))));
  }, [guessedSet]);

  return (
    <div className="mx-auto max-w-lg p-4">
      <Header resetOnClick={reset} />
      <Feedback
        correctCount={guessedSet.size}
        remainingCount={remainingSet.size}
      />
      <div className="divider" />
      <GuessInput guessedSet={guessedSet} />
    </div>
  );
}

export default App;
