import { Dictionary } from "../../utils/dataStructures/dictionary/dictionary";

type Rule = string[];

const getRules = (rulesInput: string): Rule[] => {
  return rulesInput.split("\n").map((line) => line.split("|"));
};

const getUpdates = (updatesInput: string): Rule[] => {
  return updatesInput.split("\n").map((line) => line.split(","));
};

export const getMiddlePageSum = (
  rulesInput: string,
  updatesInput: string,
): number => {
  const rules = getRules(rulesInput);
  const updates = getUpdates(updatesInput);
  const validUpdates = updates.filter((update) => {
    const pagePositionDict = new Dictionary<string, number>();
    update.forEach((page, index) => pagePositionDict.add(page, index));

    const relevantRules = rules.filter(([page1, page2]) => {
      const isPage1IncludedInRule = pagePositionDict.containsKey(page1);
      const isPage2IncludedInRule = pagePositionDict.containsKey(page2);
      return isPage1IncludedInRule && isPage2IncludedInRule;
    });

    const violatedRelevantRules = relevantRules.filter(([page1, page2]) => {
      const p1Index = pagePositionDict.get(page1) ?? -1;
      const p2Index = pagePositionDict.get(page2) ?? -1;
      return p1Index > p2Index;
    });

    return violatedRelevantRules.length === 0;
  });

  return validUpdates.reduce((total, currentUpdate) => {
    total = total + Number(currentUpdate[(currentUpdate.length - 1) / 2]);
    return total;
  }, 0);
};
