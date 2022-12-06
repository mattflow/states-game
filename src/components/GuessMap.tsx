import { abbreviationDimensionMap, abbreviationSet } from "../lib/states";

export type GuessMapProps = {
  guessedSet: Set<string>;
  remainingSet: Set<string>;
};

const GuessMap = ({ guessedSet, remainingSet }: GuessMapProps) => {
  return (
    <svg
      className="mt-4"
      viewBox="0 0 959 593"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {[...abbreviationSet].map((abbreviation) => {
          return (
            <path
              className={`${
                guessedSet.has(abbreviation)
                  ? "fill-success"
                  : "fill-base-content"
              }`}
              key={abbreviation}
              d={abbreviationDimensionMap.get(abbreviation)}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default GuessMap;
