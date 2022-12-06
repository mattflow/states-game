import { useEffect, useState } from "react";
import { useSet } from "react-use";
import Container from "./components/Container";
import GuessInput, { GuessInputProps } from "./components/GuessInput";
import GuessMap from "./components/GuessMap";
import Header from "./components/Header";
import Score from "./components/Score";
import {
  abbreviationNameMap,
  abbreviationSet,
  formatProperty,
  getAbbreviation,
  nameSet,
} from "./lib/states";

const App = () => {
  const [guessedSet, { has, add }] = useSet<string>(new Set());
  const [guessed, setGuessed] = useState<string[]>([]);
  useEffect(() => {
    setGuessed([...guessedSet]);
  }, [guessedSet]);

  const [remainingSet, setRemainingSet] = useState(
    new Set([...abbreviationSet])
  );
  useEffect(() => {
    setRemainingSet(
      new Set([...abbreviationSet].filter((abbreviation) => !has(abbreviation)))
    );
  }, [guessedSet]);
  const [remaining, setRemaining] = useState<string[]>([]);
  useEffect(() => {
    setRemaining([...remainingSet]);
  }, [remainingSet]);
  const [correctStateName, setCorrectStateName] = useState("");

  const timeoutSeconds = 0.8;
  const timeoutMilliseconds = timeoutSeconds * 1000;
  const [guess, setGuess] = useState("");
  useEffect(() => {
    const formattedGuess = formatProperty(guess);
    let timeoutId: ReturnType<typeof setTimeout>;
    let innerTimeoutId: ReturnType<typeof setTimeout>;
    if (formattedGuess.trim() === "") {
      setGuessInputStatus("empty");
    } else {
      timeoutId = setTimeout(() => {
        if (formattedGuess.trim() === "") {
          setGuessInputStatus("empty");
        } else if (
          abbreviationSet.has(formattedGuess) ||
          nameSet.has(formattedGuess)
        ) {
          const abbreviation = getAbbreviation(formattedGuess);
          if (abbreviation) {
            if (!has(abbreviation)) {
              setGuessInputStatus("correct");
              add(abbreviation);
              const name = abbreviationNameMap.get(abbreviation);
              if (name) {
                setCorrectStateName(name);
              }
              innerTimeoutId = setTimeout(() => {
                setGuess("");
              }, timeoutMilliseconds);
            } else {
              setGuessInputStatus("already guessed");
            }
          }
        } else {
          setGuessInputStatus("not a state");
        }
      }, timeoutMilliseconds);
    }
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(innerTimeoutId);
    };
  }, [guess]);
  const onGuessChange: GuessInputProps["onChange"] = (event) => {
    setGuessInputStatus("typing");
    setGuess(event.target.value.toUpperCase());
  };
  const [guessInputStatus, setGuessInputStatus] =
    useState<GuessInputProps["status"]>("empty");

  return (
    <Container>
      <Header />
      <GuessMap guessedSet={guessedSet} remainingSet={remainingSet} />
      <Score correct={guessed.length} remaining={remaining.length} />
      <GuessInput
        value={guess}
        onChange={onGuessChange}
        status={guessInputStatus}
        correctStateName={correctStateName}
      />
    </Container>
  );
};

export default App;
