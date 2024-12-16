import { getChecksumPart1, getChecksumPart2 } from "../2024-09";
import { readFileSync } from "graceful-fs";

const testInput = `2333133121414131402`;
const fullInput = readFileSync("2024/09/2024-09.txt", "utf8");

describe("AOC-2024-09", () => {
  it("part1-test returns filesystem checksum", () => {
    expect(getChecksumPart1(testInput)).toEqual(1928);
  });

  it("part1-full returns filesystem checksum", () => {
    expect(getChecksumPart1(fullInput)).toEqual(6385338159127);
  });

  it("part2-test returns filesystem checksum", () => {
    expect(getChecksumPart2(testInput)).toEqual(2858);
  });

  it("part2-full returns filesystem checksum", () => {
    expect(getChecksumPart2(fullInput)).not.toEqual(22877);
    expect(getChecksumPart2(fullInput)).toEqual(1);
  });
});
