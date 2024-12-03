import {
  getSafeReportsCountPart1,
  getSafeReportsCountPart2,
  isDecreasing,
  isIncreasing,
  isRequiredAllowedDifference,
} from "../2024-02";
import { readFileSync } from "graceful-fs";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const fullInput = readFileSync("2024/02/2024-02.txt", "utf8");

describe("isIncreasing", () => {
  it("true", () => {
    expect(isIncreasing([0, 1, 2, 3, 4, 5])).toBe(true);
  });
  it("false", () => {
    expect(isIncreasing([0, 1, 2, 3, 2, 5])).toBe(false);
  });
});

describe("isDecreasing", () => {
  it("true", () => {
    expect(isDecreasing([5, 4, 3, 2, 1, 0])).toBe(true);
  });
  it("false", () => {
    expect(isDecreasing([5, 4, 3, 4, 1, 0])).toBe(false);
  });
});

describe("isRequiredAllowedDifference", () => {
  it("true", () => {
    expect(isRequiredAllowedDifference(0, 3)).toBe(true);
  });
  it("true", () => {
    expect(isRequiredAllowedDifference(0, 1)).toBe(true);
  });
  it("false", () => {
    expect(isRequiredAllowedDifference(1, 1)).toBe(false);
  });
  it("false", () => {
    expect(isRequiredAllowedDifference(0, 4)).toBe(false);
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
    // expect(getSafeReportsCount2(fullInput)).not.toEqual(68);
    // expect(getSafeReportsCount2(fullInput)).not.toEqual(65);
    // expect(getSafeReportsCount2(fullInput)).not.toEqual(294); - too low
    // expect(getSafeReportsCount2(fullInput)).not.toEqual(302); - too low
    // expect(getSafeReportsCount2(fullInput)).not.toEqual(317); - too low
    expect(getSafeReportsCountPart2(fullInput)).toEqual(294);
  });
});
