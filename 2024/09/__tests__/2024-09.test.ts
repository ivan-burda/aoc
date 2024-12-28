import { getPart1Checksum, getPart2Checksum } from "../2024-09";
import { readFileSync } from "graceful-fs";

const testInput = `2333133121414131402`;
const fullInput = readFileSync("2024/09/2024-09.txt", "utf8");

describe("AOC-2024-09", () => {
  it("part1-test returns filesystem checksum", () => {
    expect(getPart1Checksum(testInput)).toEqual(1928);
  });

  it("part1-full returns filesystem checksum", () => {
    expect(getPart1Checksum(fullInput)).toEqual(6385338159127);
  });

  it("part2-test returns filesystem checksum", () => {
    expect(getPart2Checksum(testInput)).toEqual(2858);
  });

  it("part2-full returns filesystem checksum", () => {
    expect(getPart2Checksum(fullInput)).toEqual(6415163624282);
  });
});
