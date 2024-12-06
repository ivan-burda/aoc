import { Dictionary } from "../../utils/dataStructures/dictionary/dictionary";

type Rule = string[];
type Update = string[];
type PagePositionsInUpdate = Dictionary<string, number>;

const getRules = (rulesInput: string): Rule[] => {
  return rulesInput.split("\n").map((line) => line.split("|"));
};

const getUpdates = (updatesInput: string): Update[] => {
  return updatesInput.split("\n").map((line) => line.split(","));
};

const getDictionaryOfUpdatePagePositions = (update: Update) => {
  const pagePositions = new Dictionary<string, number>();
  update.forEach((page, index) => pagePositions.add(page, index));
  return pagePositions;
};

const getRulesRelevantForUpdate = (
  rules: Rule[],
  pagePositionsInUpdate: PagePositionsInUpdate,
): Rule[] => {
  return rules.filter(([page1, page2]) => {
    const isPage1IncludedInRule = pagePositionsInUpdate.containsKey(page1);
    const isPage2IncludedInRule = pagePositionsInUpdate.containsKey(page2);
    return isPage1IncludedInRule && isPage2IncludedInRule;
  });
};

const getViolatedRelevantRules = (
  relevantRules: Rule[],
  pagePositionsInUpdate: PagePositionsInUpdate,
): Rule[] => {
  return relevantRules.filter(([page1, page2]) => {
    const p1Index = pagePositionsInUpdate.get(page1) ?? -1;
    const p2Index = pagePositionsInUpdate.get(page2) ?? -1;
    return p1Index > p2Index;
  });
};

const getCorrectUpdates = (updates: Update[], rules: Rule[]) => {
  return updates.filter((update) => {
    const pagePositionsInUpdate = getDictionaryOfUpdatePagePositions(update);
    const relevantRules = getRulesRelevantForUpdate(
      rules,
      pagePositionsInUpdate,
    );
    const violatedRelevantRules = getViolatedRelevantRules(
      relevantRules,
      pagePositionsInUpdate,
    );

    return violatedRelevantRules.length === 0;
  });
};

const getIncorrectUpdates = (updates: Update[], rules: Rule[]) => {
  return updates.filter((update) => {
    const pagePositionsInUpdate = getDictionaryOfUpdatePagePositions(update);
    const relevantRules = getRulesRelevantForUpdate(
      rules,
      pagePositionsInUpdate,
    );
    const violatedRelevantRules = getViolatedRelevantRules(
      relevantRules,
      pagePositionsInUpdate,
    );
    return violatedRelevantRules.length > 0;
  });
};

const getCorrectedUpdates = (
  incorrectUpdates: Update[],
  rules: Rule[],
): Update[] => {
  return incorrectUpdates.map((update) => {
    const pagePositionsInUpdate = getDictionaryOfUpdatePagePositions(update);
    const relevantRules = getRulesRelevantForUpdate(
      rules,
      pagePositionsInUpdate,
    );

    const ruleFirstNumbers = relevantRules.map(([num1]) => num1);
    const ruleSecondNumbers = relevantRules.map(([, num2]) => num2);
    const correctedUpdateLastNumber = ruleSecondNumbers.filter(
      (num) => !ruleFirstNumbers.includes(num),
    )[0];

    const rulesFirstNumbersAndTheirCounts = Object.entries(
      ruleFirstNumbers.reduce<Record<string, number>>(
        (countMap, currentNumber) => {
          if (!countMap[currentNumber]) {
            countMap[currentNumber] = 1;
          } else {
            countMap[currentNumber]++;
          }
          return countMap;
        },
        {},
      ),
    );

    const ruleFirstNumbersOrderedByTheirCounts = rulesFirstNumbersAndTheirCounts
      .sort((a, b) => b[1] - a[1])
      .map(([num1]) => num1);

    return [...ruleFirstNumbersOrderedByTheirCounts, correctedUpdateLastNumber];
  });
};

const sumUpMiddleNumbers = (updates: Update[]): number => {
  return updates.reduce((total, currentUpdate) => {
    total = total + Number(currentUpdate[(currentUpdate.length - 1) / 2]);
    return total;
  }, 0);
};

//part1
export const getMiddlePageSumForCorrectUpdates = (
  rulesInput: string,
  updatesInput: string,
): number => {
  const updates = getUpdates(updatesInput);
  const rules = getRules(rulesInput);
  const correctUpdates = getCorrectUpdates(updates, rules);
  return sumUpMiddleNumbers(correctUpdates);
};

//part2
export const getMiddlePageSumForCorrectedUpdates = (
  rulesInput: string,
  updatesInput: string,
): number => {
  const updates = getUpdates(updatesInput);
  const rules = getRules(rulesInput);
  const incorrectUpdates = getIncorrectUpdates(updates, rules);
  const correctedUpdates = getCorrectedUpdates(incorrectUpdates, rules);
  return sumUpMiddleNumbers(correctedUpdates);
};
