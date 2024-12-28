export const getStoneCountOptimized = (
  input: string,
  timesToBlink: number,
): number => {
  let beforeStones: Record<string, number> = {};
  input.split(" ").forEach((stone: string) => {
    beforeStones[stone] = 1;
  });

  while (timesToBlink > 0) {
    const afterStones: Record<string, number> = {};

    for (const [stone, count] of Object.entries(beforeStones)) {
      if (stone === "0") {
        afterStones["1"] = (afterStones["1"] || 0) + count;
      } else if (stone.length % 2 === 0) {
        const halfLength = stone.length / 2;
        const firstHalf = stone.slice(0, halfLength);
        const secondHalf = stone.slice(halfLength).replace(/^0+(?=\d)/, "");

        afterStones[firstHalf] = (afterStones[firstHalf] || 0) + count;
        afterStones[secondHalf] = (afterStones[secondHalf] || 0) + count;
      } else {
        const newStone = String(Number(stone) * 2024);
        afterStones[newStone] = (afterStones[newStone] || 0) + count;
      }
    }

    timesToBlink--;
    beforeStones = afterStones;
  }

  return Object.values(beforeStones).reduce((sum, count) => sum + count, 0);
};
