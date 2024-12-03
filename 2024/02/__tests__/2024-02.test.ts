import {
  getSafeReportsCountPart1,
  getSafeReportsCountPart2,
  isConstantlyDecreasing,
  isConstantlyIncreasing,
  isDifferenceValid,
  removeItem,
} from "../2024-02";
import { readFileSync } from "graceful-fs";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const fullInput = readFileSync("2024/02/2024-02.txt", "utf8");

describe("isConstantlyIncreasing", () => {
  it("true", () => {
    expect(isConstantlyIncreasing([0, 1, 2, 3, 4, 5])).toBe(true);
  });
  it("false", () => {
    expect(isConstantlyIncreasing([0, 1, 2, 3, 2, 5])).toBe(false);
  });
});

describe("isConstantlyDecreasing", () => {
  it("true", () => {
    expect(isConstantlyDecreasing([5, 4, 3, 2, 1, 0])).toBe(true);
  });
  it("false", () => {
    expect(isConstantlyDecreasing([5, 4, 3, 4, 1, 0])).toBe(false);
  });
});

describe("isDifferenceValid", () => {
  it("true", () => {
    expect(isDifferenceValid(0, 3)).toBe(true);
  });
  it("true", () => {
    expect(isDifferenceValid(0, 1)).toBe(true);
  });
  it("false", () => {
    expect(isDifferenceValid(1, 1)).toBe(false);
  });
  it("false", () => {
    expect(isDifferenceValid(0, 4)).toBe(false);
  });
});

describe("removeItem", () => {
  it("removes required item", () => {
    expect(removeItem([10, 20, 30, 40, 50], 0)).toEqual([20, 30, 40, 50]);
  });
  it("removes required item", () => {
    expect(removeItem([10, 20, 30, 40, 50], 2)).toEqual([10, 20, 40, 50]);
  });
});

describe("AOC-2024-02", () => {
  it("part1-test: returns safe-report count", () => {
    expect(getSafeReportsCountPart1(testInput)).toEqual(2);
  });

  it("part1-full: returns safe-report count", () => {
    expect(getSafeReportsCountPart1(fullInput)).toEqual(252);
  });

  it("part2-test: returns safe-report count", () => {
    expect(getSafeReportsCountPart2(testInput)).toEqual(4);
  });

  it("part2-full: returns safe-report count", () => {
    expect(getSafeReportsCountPart2(fullInput)).toEqual(324);
  });
});
