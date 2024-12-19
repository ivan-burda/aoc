import {
  getChecksumPart1,
  getChecksumPart2,
  getSameNumberBlocks2,
} from "../2024-09";
import { readFileSync } from "graceful-fs";

const testInput = `2333133121414131402`;
const fullInput = readFileSync("2024/09/2024-09.txt", "utf8");

describe("helper functions", () => {
  it("returns a list of blocks and their indices", () => {
    expect(
      getSameNumberBlocks2("00.111.2..33..4455..6.7...88..999...1010..111213"),
    ).toEqual([
      "00",
      "111",
      "2",
      "33",
      "4455",
      "6",
      "7",
      "88",
      "999",
      "1010",
      "11",
      "12",
      "13",
    ]);
  });
});

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
    // expect(getChecksumPart2(fullInput)).not.toEqual(22877);
    // expect(getChecksumPart2(fullInput)).not.toEqual(571470757822);;
    // expect(getChecksumPart2(fullInput)).not.toEqual(2469085652);
    // expect(getChecksumPart2(fullInput)).not.toEqual(14600364975982);
  });
});
