import { useEffect, useState } from "react";
import { useSet } from "react-use";
import Container from "./components/Container";
import GuessInput, { GuessInputProps } from "./components/GuessInput";
import Header from "./components/Header";
import Score from "./components/Score";
import {
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

  const timeoutSeconds = 1;
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
      <Score correct={guessed.length} remaining={remaining.length} />
      <GuessInput
        value={guess}
        onChange={onGuessChange}
        status={guessInputStatus}
      />
    </Container>
  );
};

export default App;
