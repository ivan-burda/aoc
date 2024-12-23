const blink = (beforeParts: string[], blinkCount: number): string[] => {
  let afterParts: string[] = [];
  if (blinkCount > 0) {
    beforeParts.forEach((part) => {
      if (part === "0") {
        afterParts.push("1");
      } else if (part.length % 2 === 0) {
        const halfLength = part.length / 2;
        let firstHalf = part.substring(0, halfLength);
        let secondHalf = part.substring(halfLength).replace(/^0+(?=\d)/, "");
        afterParts.push(firstHalf);
        afterParts.push(secondHalf);
        return;
      } else {
        afterParts.push(String(Number(part) * 2024));
      }
    });
    return blink(afterParts, blinkCount - 1);
  } else {
    return beforeParts;
  }
};

export const getStoneCount = (input: string, blinkCount: number): number => {
  let beforeParts: string[] = input.split(" ");
  const result = blink(beforeParts, blinkCount).length;
  console.log(result);
  return result;
};
