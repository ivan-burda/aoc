import { readFileSync } from "graceful-fs";
import { getFittingLockKeyPairsCount } from "../2024-25";

const testInput = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

const fullInput = readFileSync("2024/25/2024-25.txt", "utf8");

describe("AOC-2024-25", () => {
  it("part1-test returns fitting lock-key pairs count", () => {
    expect(getFittingLockKeyPairsCount(testInput)).toBe(3);
  });
  it("part1-full returns fitting lock-key pairs count", () => {
    expect(getFittingLockKeyPairsCount(fullInput)).toBe(3116);
  });
});
