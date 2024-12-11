const getEquations = (input: string): EquationInstruction[] => {
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
  useThreeOperators?: boolean,
) => {
  const operators = ["+", "*"];
  if (useThreeOperators) {
    operators.push("|");
  }

  const results: string[] = [];
  const stack: { current: string; depth: number }[] = [
    { current: "", depth: 0 },
  ];

  while (stack.length > 0) {
    const { current, depth } = stack.pop()!;

    if (depth === requiredCountOfOperators) {
      results.push(current);
      continue;
    }

    for (let operator of operators) {
      stack.push({ current: current + operator, depth: depth + 1 });
    }
  }

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
const getEquationPermutationsWithVariousOperators = (
  equationInstruction: EquationInstruction,
  useThreeOperators?: boolean,
): EquationPermutationSet => {
  const operatorPermutations = getOperatorPermutations(
    equationInstruction.numbers.length - 1,
    useThreeOperators,
  );

  return operatorPermutations.map((permutation) => {
    const operators = permutation.split("");
    return {
      result: equationInstruction.result,
      equation: mergeNumbersAndOperators(
        equationInstruction.numbers,
        operators,
      ),
    };
  });
};

const areSidesEqual = (equationPermutation: EquationPermutation): boolean => {
  const expectedResult = equationPermutation.result;
  const equationInstruction = equationPermutation.equation;
  const isThirdOperatorUsed = equationPermutation.equation.find(
    (equationItem) => equationItem === "|",
  );

  let result = Number(equationInstruction[0]); // Start with the first number

  for (let i = 1; i < equationInstruction.length; i += 2) {
    const operator = equationInstruction[i]; // Get the operator
    const nextNumber = equationInstruction[i + 1]; // Get the next number

    if (isThirdOperatorUsed && operator === "|") {
      const concatenated = result.toString() + nextNumber;
      result = Number(concatenated);
    } else if (operator === "+") {
      result += Number(nextNumber);
    } else if (operator === "*") {
      result *= Number(nextNumber);
    } else {
      throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  return expectedResult === result;
};

const isSolvable = (
  equationPermutationSet: EquationPermutationSet,
): boolean => {
  let isAnyEquationPermutationSolvable = false;
  equationPermutationSet.forEach((equationPermutation) => {
    if (areSidesEqual(equationPermutation)) {
      isAnyEquationPermutationSolvable = true;
    }
  });

  return isAnyEquationPermutationSolvable;
};

//Solution
export const getTotalCalibrationResult = (
  input: string,
  operatorCount: 2 | 3,
): number => {
  //Three operators
  const resultsOfEquationsSolvableWithTwoOperators = getEquations(input)
    .filter(Boolean)
    .filter((equation) =>
      isSolvable(getEquationPermutationsWithVariousOperators(equation)),
    )
    .map((solved) => solved.result);

  const totalResultForTwoOperators =
    resultsOfEquationsSolvableWithTwoOperators.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);

  //Three operators
  if (operatorCount === 3) {
    const totalResultForThreeOperators = getEquations(input)
      .filter(Boolean)
      .filter(
        (equation) =>
          !resultsOfEquationsSolvableWithTwoOperators.includes(equation.result),
      )
      .filter((equationNotSolvableWithTwoOperators) =>
        isSolvable(
          getEquationPermutationsWithVariousOperators(
            equationNotSolvableWithTwoOperators,
            true,
          ),
        ),
      )
      .map((solved) => solved.result);

    return (
      totalResultForTwoOperators +
      totalResultForThreeOperators.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0)
    );
  } else {
    return totalResultForTwoOperators;
  }
};
