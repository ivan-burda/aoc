import { readFileSync } from "graceful-fs";
import { getXMASWordCount, getXmasCrossCount } from "../2024-04";

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const fullInput = readFileSync("2024/04/2024-04.txt", "utf8");

describe("AOC-2024-04", () => {
  it("part1-test: returns how many time the word XMAS is found", () => {
    expect(getXMASWordCount(testInput)).toEqual(18);
  });

  it("part1-full: returns how many time the word XMAS is found", () => {
    expect(getXMASWordCount(fullInput)).toEqual(2336);
  });

  it("part2-test: returns how many time an X-MAS is found", () => {
    expect(getXmasCrossCount(testInput)).toEqual(9);
  });

  it("part2-full: returns how many time an X-MAS is found", () => {
    expect(getXmasCrossCount(fullInput)).toEqual(1831);
  });
});
