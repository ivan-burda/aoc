import { readFileSync } from "graceful-fs";
import { getChecksumPart } from "../2024-09-part2-attempt2";

const testInput = `2333133121414131402`;
const fullInput = readFileSync("2024/09/2024-09.txt", "utf8");

describe("AOC-2024-09", () => {
  it("part2-test returns filesystem checksum", () => {
    expect(getChecksumPart(testInput)).toEqual(2858);
  });

  it("part2-full returns filesystem checksum", () => {
    expect(getChecksumPart(fullInput)).toEqual(1);
  });
});
