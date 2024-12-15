import { getBlocks, getChecksum } from "../2024-09";
import { readFileSync } from "graceful-fs";

const testInput = `2333133121414131402`;

const fullInput = readFileSync("2024/09/2024-09.txt", "utf8");

describe("AOC-2024-09", () => {
  it("part1-test returns filesystem checksum", () => {
    expect(getChecksum(testInput)).toEqual(1928);
  });

  it("part1-full returns filesystem checksum", () => {
    expect(getChecksum(fullInput)).toEqual(6385338159127);
  });
});
