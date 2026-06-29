import { useEffect, useState } from "react";
import Container from "./components/Container";
import DebugMenu from "./components/DebugMenu";
import GuessInput, { GuessInputProps } from "./components/GuessInput";
import Header from "./components/Header";
import Score from "./components/Score";
import WinScreen from "./components/WinScreen";
import {
  abbreviationNameMap,
  abbreviationSet,
  formatProperty,
  getAbbreviation,
  nameSet,
} from "./lib/states";

const localStorageKey = "guessedSet";
const getInitialGuessed = () => {
  const localStorageGuessed = localStorage.getItem(localStorageKey);
  if (localStorageGuessed) {
    return JSON.parse(localStorageGuessed) as string[];
  }
  return [] as string[];
};

const App = () => {
  const [guessedSet, setGuessedSet] = useState<Set<string>>(
    new Set(getInitialGuessed())
  );
  const [guessed, setGuessed] = useState<string[]>([]);
  useEffect(() => {
    setGuessed([...guessedSet]);
  }, [guessedSet]);

  const [remainingSet, setRemainingSet] = useState(
    new Set([...abbreviationSet])
  );
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify([...guessedSet]));
    setRemainingSet(
      new Set(
        [...abbreviationSet].filter(
          (abbreviation) => !guessedSet.has(abbreviation)
        )
      )
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
    const formattedTrimmedGuess = formattedGuess.trim();
    let timeoutId: ReturnType<typeof setTimeout>;
    let innerTimeoutId: ReturnType<typeof setTimeout>;

    if (formattedTrimmedGuess === "") {
      setGuessInputStatus("empty");
    } else {
      timeoutId = setTimeout(() => {
        if (formattedTrimmedGuess === "") {
          setGuessInputStatus("empty");
        } else if (
          abbreviationSet.has(formattedTrimmedGuess) ||
          nameSet.has(formattedTrimmedGuess)
        ) {
          const abbreviation = getAbbreviation(formattedTrimmedGuess);
          if (abbreviation) {
            if (!guessedSet.has(abbreviation)) {
              setGuessInputStatus("correct");
              setGuessedSet(new Set([...guessedSet, abbreviation]));
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

  // Elapsed-time timer: starts on the first guess, freezes when all are named.
  // Persisted so it survives refreshes; the win screen formats arbitrarily large
  // gaps (days/months) gracefully.
  const [startTime, setStartTime] = useState<number | null>(() => {
    const value = localStorage.getItem("startTime");
    return value ? Number(value) : null;
  });
  const [endTime, setEndTime] = useState<number | null>(() => {
    const value = localStorage.getItem("endTime");
    return value ? Number(value) : null;
  });
  useEffect(() => {
    if (startTime === null) localStorage.removeItem("startTime");
    else localStorage.setItem("startTime", String(startTime));
  }, [startTime]);
  useEffect(() => {
    if (endTime === null) localStorage.removeItem("endTime");
    else localStorage.setItem("endTime", String(endTime));
  }, [endTime]);
  useEffect(() => {
    if (guessedSet.size > 0 && startTime === null) setStartTime(Date.now());
    if (guessedSet.size === abbreviationSet.size && endTime === null) {
      setEndTime(Date.now());
    }
  }, [guessedSet, startTime, endTime]);

  const reset = () => {
    setGuess("");
    setGuessedSet(new Set());
    setStartTime(null);
    setEndTime(null);
  };

  const isComplete =
    guessedSet.size > 0 && guessedSet.size === abbreviationSet.size;
  const elapsedMs =
    startTime !== null ? (endTime ?? Date.now()) - startTime : 0;

  // Secret debug menu: Ctrl/Cmd+Shift+D toggles it, or load with ?debug.
  const [debug, setDebug] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).has("debug");
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "d"
      ) {
        event.preventDefault();
        setDebug((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const addRandom = (count: number) => {
    const remainingAbbrs = [...abbreviationSet].filter(
      (abbreviation) => !guessedSet.has(abbreviation)
    );
    const next = new Set(guessedSet);
    for (let i = 0; i < count && remainingAbbrs.length > 0; i++) {
      const index = Math.floor(Math.random() * remainingAbbrs.length);
      next.add(remainingAbbrs.splice(index, 1)[0]);
    }
    setGuessedSet(next);
  };

  return (
    <Container>
      <header className="flex items-center justify-between pt-6">
        <h1 className="text-xl font-bold tracking-tight">States</h1>
        <a
          href="https://sports.mattflow.com"
          className="link link-hover text-sm opacity-70"
          title="Play the Sports Game"
        >
          Sports ↗
        </a>
      </header>
      <Header guessedSet={guessedSet} onResetClick={reset} />
      <Score correct={guessed.length} remaining={remaining.length} />
      {isComplete ? (
        <WinScreen elapsedMs={elapsedMs} onPlayAgain={reset} />
      ) : (
        <GuessInput
          value={guess}
          onChange={onGuessChange}
          status={guessInputStatus}
          correctStateName={correctStateName}
        />
      )}
      {debug && (
        <DebugMenu
          onWin={() => setGuessedSet(new Set(abbreviationSet))}
          onAllButOne={() => {
            setGuess("");
            setGuessedSet(
              new Set([...abbreviationSet].filter((a) => a !== "CA"))
            );
          }}
          onAddTen={() => addRandom(10)}
          onClear={reset}
          onClose={() => setDebug(false)}
        />
      )}
    </Container>
  );
};

export default App;
