import states from "../data/states.json";

export const formatProperty = (property: string) => {
  return property.toUpperCase();
};

const formattedStates = states.map((state) => {
  const { name, abbreviation, ...remaining } = state;
  return {
    name: formatProperty(name),
    abbreviation: formatProperty(abbreviation),
    ...remaining,
  };
});

export const getAbbreviation = (nameOrAbbreviation: string) => {
  const formattedNameOrAbbreviation = formatProperty(nameOrAbbreviation);
  if (abbreviationSet.has(formattedNameOrAbbreviation)) {
    return formattedNameOrAbbreviation;
  }
  if (nameSet.has(formattedNameOrAbbreviation)) {
    const abbreviation = nameAbbreviationMap.get(formattedNameOrAbbreviation);
    if (abbreviation) {
      return abbreviation;
    }
  }
  return null;
};

export const nameAbbreviationMap = new Map(
  formattedStates.map(({ name, abbreviation }) => [name, abbreviation])
);

export const abbreviationNameMap = new Map(
  formattedStates.map(({ name, abbreviation }) => [abbreviation, name])
);

export const abbreviationDimensionMap = new Map(
  formattedStates.map(({ abbreviation, dimensions }) => [
    abbreviation,
    dimensions,
  ])
);

export const nameSet = new Set(nameAbbreviationMap.keys());
export const abbreviationSet = new Set(abbreviationNameMap.keys());
