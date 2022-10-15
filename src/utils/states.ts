import states from "../assets/states.json";

export function formatStateProperty(property: string) {
  return property.trim().toUpperCase();
}

const formattedStates = states.map(({ name, abbreviation }) => ({
  name: formatStateProperty(name),
  abbr: formatStateProperty(abbreviation),
}));

const excludedStateNameSet = new Set([
  "AMERICAN SAMOA",
  "DISTRICT OF COLUMBIA",
  "FEDERATED STATES OF MICRONESIA",
  "GUAM",
  "MARSHALL ISLANDS",
  "NORTHERN MARIANA ISLANDS",
  "PALAU",
  "PUERTO RICO",
  "VIRGIN ISLANDS",
]);

const filteredStates = formattedStates.filter(
  ({ name }) => !excludedStateNameSet.has(name)
);

export const stateNameAbbrMap = new Map(
  filteredStates.map(({ name, abbr }) => [name, abbr])
);
export const stateAbbrNameMap = new Map(
  filteredStates.map(({ name, abbr }) => [abbr, name])
);
export const stateNameSet = new Set(stateNameAbbrMap.keys());
export const stateAbbrSet = new Set(stateAbbrNameMap.keys());

export const isAState = (nameOrAbbr: string) => {
  const formattedNameOrAbbr = formatStateProperty(nameOrAbbr);
  if (stateAbbrSet.has(formattedNameOrAbbr)) {
    return true;
  }
  if (stateNameSet.has(formattedNameOrAbbr)) {
    return true;
  }
  return false;
};
