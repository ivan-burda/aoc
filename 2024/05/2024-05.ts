import { Dictionary } from "../../utils/dataStructures/dictionary/dictionary";

type Rule = string[];
type Update = string[];

const getRules = (rulesInput: string): Rule[] => {
  return rulesInput.split("\n").map((line) => line.split("|"));
};

const getUpdates = (updatesInput: string): Update[] => {
  return updatesInput.split("\n").map((line) => line.split(","));
};

//part1
export const getMiddlePageSumForCorrectUpdates = (
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

//part2
export const getMiddlePageSumForCorrectedUpdates = (
  rulesInput: string,
  updatesInput: string,
): number => {
  const rules = getRules(rulesInput);
  const updates = getUpdates(updatesInput);

  const incorrectUpdates = updates.filter((update) => {
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

    return violatedRelevantRules.length > 0;
  });

  const correctedUpdates = incorrectUpdates.map((update) => {
    const pagePositionDict = new Dictionary<string, number>();
    update.forEach((page, index) => pagePositionDict.add(page, index));

    const relevantRules = rules.filter(([page1, page2]) => {
      const isPage1IncludedInRule = pagePositionDict.containsKey(page1);
      const isPage2IncludedInRule = pagePositionDict.containsKey(page2);
      return isPage1IncludedInRule && isPage2IncludedInRule;
    });

    const ruleFirstNumbers = relevantRules.map(([num1]) => num1);
    const ruleSecondNumbers = relevantRules.map(([, num2]) => num2);

    const correctedUpdateLastNumber = Number(
      ruleSecondNumbers.filter((num) => !ruleFirstNumbers.includes(num))[0],
    );

    return [
      ...Object.entries(
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
      )
        .sort((a, b) => b[1] - a[1])
        .map(([num1]) => Number(num1)),
      correctedUpdateLastNumber,
    ];
  });

  return correctedUpdates.reduce((total, currentUpdate) => {
    total = total + Number(currentUpdate[(currentUpdate.length - 1) / 2]);
    return total;
  }, 0);
};
