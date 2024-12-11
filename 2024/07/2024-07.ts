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
const getPermutationsForSingleInstruction = (
  equationInstruction: EquationInstruction,
  usePipe?: boolean,
): EquationPermutationSet => {
  const operatorPermutations = getOperatorPermutations(
    equationInstruction.numbers.length - 1,
    usePipe,
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

const isEqualUsingPipe = (
  equationPermutation: EquationPermutation,
  usePipe?: boolean,
): boolean => {
  const expectedResult = equationPermutation.result;
  const equationInstruction = equationPermutation.equation;

  let result = Number(equationInstruction[0]); // Start with the first number

  for (let i = 1; i < equationInstruction.length; i += 2) {
    const operator = equationInstruction[i]; // Get the operator
    const nextNumber = equationInstruction[i + 1]; // Get the next number

    if (usePipe && operator === "|") {
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

const isAnyPermutationEqualToResult = (
  equationPermutationSet: EquationPermutationSet,
  usePipe?: boolean,
): boolean => {
  let isAnyPermutationSolvable = false;

  if (!usePipe) {
    equationPermutationSet.forEach((equationPermutation) => {
      if (isEqualUsingPipe(equationPermutation)) {
        isAnyPermutationSolvable = true;
      }
    });
  } else {
    equationPermutationSet.forEach((equationPermutation) => {
      if (isEqualUsingPipe(equationPermutation, true)) {
        isAnyPermutationSolvable = true;
      }
    });
  }
  return isAnyPermutationSolvable;
};

//Result
export const getTotalCalibrationResult = (
  input: string,
): { twoOperators: number; threeOperators: number } => {
  //All
  const solvableEquationsResults: number[] = [];
  const equationInstructions = getInstructions(input).filter(Boolean);
  equationInstructions.forEach((instruction) => {
    const permutations = getPermutationsForSingleInstruction(instruction);
    const isSolvable = isAnyPermutationEqualToResult(permutations);
    if (isSolvable) {
      solvableEquationsResults.push(instruction.result);
    }
  });

  //Non-solvable
  const repairedNonSolvableEquationsResults: number[] = [];
  const nonSolvableEquationInstructions = equationInstructions.filter(
    (instruction) => !solvableEquationsResults.includes(instruction.result),
  );
  nonSolvableEquationInstructions.forEach((instruction) => {
    const permutations = getPermutationsForSingleInstruction(instruction, true);
    const isSolvable = isAnyPermutationEqualToResult(permutations, true);
    if (isSolvable) {
      repairedNonSolvableEquationsResults.push(instruction.result);
    }
  });

  const solvable = solvableEquationsResults.reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
  const repaired = repairedNonSolvableEquationsResults.reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);

  return {
    twoOperators: solvable,
    threeOperators: solvable + repaired,
  };
};
