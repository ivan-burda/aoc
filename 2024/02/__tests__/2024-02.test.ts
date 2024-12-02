import { getSafeReportsCount } from "../2024-02";
import { readFileSync } from "graceful-fs";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const fullInput = readFileSync("2024/02/2024-02.txt", "utf8");

describe("AOC-2024-02", () => {
  it("part1-test: returns safe-report count", () => {
    expect(getSafeReportsCount(testInput)).toEqual(2);
  });

  it("part1-full: returns safe-report count", () => {
    expect(getSafeReportsCount(fullInput)).toEqual(252);
  });

  it("part2-test: returns safe-report count", () => {
    expect(getSafeReportsCount(testInput)).toEqual(4);
  });

  it("part2-full: returns safe-report count", () => {
    expect(getSafeReportsCount(fullInput)).toEqual(999);
  });
});
