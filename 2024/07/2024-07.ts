const getInstructions = (input: string): EquationInstruction[] => {
  return input
    .split("\n")
    .map((line) => {
      const numbers = line.match(/\d+/g) ?? [];
      if (!numbers.length) {
        return;
      }
      return {
        result: Number(numbers[0]),
        numbers: numbers.splice(1).map(Number),
      };
    })
    .filter((instr) => instr !== undefined);
};

const getOperatorPermutations = (
  requiredCountOfOperators: number,
  usePipe?: boolean,
) => {
  const operators = ["+", "*"];
  if (usePipe) {
    operators.push("||");
  }
  const results: string[] = [];

  function backtrack(current: string) {
    if (current.length === requiredCountOfOperators) {
      results.push(current);
      return;
    }

    for (let operator of operators) {
      backtrack(current + operator);
    }
  }

  backtrack("");
  return results;
};

interface EquationInstruction {
  result: number;
  numbers: number[];
}

function mergeNumbersAndOperators(numbers: number[], operators: string[]) {
  const result: (string | number)[] = [];
  numbers.forEach((num, index) => {
    result.push(num);
    if (index < operators.length) {
      result.push(operators[index]);
    }
  });
  return result;
}

interface EquationPermutation {
  result: number;
  equation: (string | number)[];
}

type EquationPermutationSet = EquationPermutation[];

const getEquationPermutationSets = (
  equationInstructions: EquationInstruction[],
  usePipe?: boolean,
): EquationPermutationSet[] => {
  return equationInstructions.map((instruction) => {
    const operatorPermutations = getOperatorPermutations(
      instruction.numbers.length - 1,
      usePipe,
    );
    return operatorPermutations.map((permutation) => {
      const operators = permutation.split("");
      return {
        result: instruction.result,
        equation: mergeNumbersAndOperators(instruction.numbers, operators),
      };
    });
  });
};

const isEqual = (equationPermutation: EquationPermutation): boolean => {
  const expectedResult = equationPermutation.result;
  const equationInstruction = equationPermutation.equation;

  let result = Number(equationInstruction[0]); // Start with the first number

  for (let i = 1; i < equationInstruction.length; i += 2) {
    const operator = equationInstruction[i]; // Get the operator
    const nextNumber = equationInstruction[i + 1]; // Get the next number

    if (operator === "+") {
      result += Number(nextNumber);
    } else if (operator === "*") {
      result *= Number(nextNumber);
    } else {
      throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  return expectedResult === result;
};

const isAnyPermutationEqualToResult = (
  equationPermutationSet: EquationPermutationSet,
): boolean => {
  let isAnyPermutationSolvable = false;
  equationPermutationSet.forEach((equationPermutation) => {
    if (isEqual(equationPermutation)) {
      isAnyPermutationSolvable = true;
    }
  });
  return isAnyPermutationSolvable;
};

//Result
export const getTotalCalibrationResult = (input: string): number => {
  //All
  const equationInstructions = getInstructions(input).filter(Boolean);
  const equationPermutationSets =
    getEquationPermutationSets(equationInstructions);
  const solvableEquationResults = equationPermutationSets
    .filter(isAnyPermutationEqualToResult)
    .map((set) => set[0].result);

  //Non-solvable
  const resultsOfNonSolvableEquationPermutationSets = equationPermutationSets
    .filter((set) => !isAnyPermutationEqualToResult(set))
    .map((set) => set[0].result);

  const nonSolvableEquationInstructions = equationInstructions.filter(
    (instruction) =>
      resultsOfNonSolvableEquationPermutationSets.includes(instruction.result),
  );

  const nonSolvableEquationPermutationSets = getEquationPermutationSets(
    nonSolvableEquationInstructions,
    true,
  );
  /*
                                                                                                                  Take the unfulfilling set
                                                                                                                  Take the first item, and convert it into an input for getEquationPermutationSets
                                                                                                                  Adapt getEquationPermutationSets to take in a param which is an array of supported operators
                                                                                                                  Get getEquationPermutationSets with [+, *, ||]
                                                                                                                  In the isEqual check whether || operator is used. If yes, pass into the new function to process the || and then recursively call isEqual
                                                                                                                   */
  return solvableEquationResults.reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
};
