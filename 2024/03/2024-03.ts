const getNumberPair = (input: string): number[] => {
  let numbers = input.match(/\d+,\d+/) ?? ["0,0"];
  return numbers[0].split(",").map(Number);
};

export const getMultiplication = (input: string): number => {
  const cleanedInput = input.replaceAll("\n", "").replaceAll(" ", "");
  const instructions = cleanedInput.match(/mul\(\d+,\d+\)/g) ?? [];

  return instructions.reduce((acc, currInst) => {
    const [num1, num2] = getNumberPair(currInst);
    acc = acc + num1 * num2;
    return acc;
  }, 0);
};

export const getConditionalMultiplication = (input: string): number => {
  const cleanedInput = input.replaceAll("\n", "").replaceAll(" ", "");
  const instructions =
    cleanedInput.match(/mul\(\d+,\d+\)|don't\(\)|do\(\)/g) ?? [];

  let shouldUseInstruction = true;
  return instructions.reduce((acc, currInst) => {
    if (currInst === "don't()") {
      shouldUseInstruction = false;
    }

    if (currInst === "do()") {
      shouldUseInstruction = true;
    }

    if (currInst.includes("mul") && shouldUseInstruction) {
      const [num1, num2] = getNumberPair(currInst);
      acc = acc + num1 * num2;
    }

    return acc;
  }, 0);
};
