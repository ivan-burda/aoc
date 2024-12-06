import { readFileSync } from "graceful-fs";
import { getCountOfVisitedPositions } from "../2024-06";

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const fullInput = readFileSync("2024/06/2024-06-rules.txt", "utf8");

describe("AOC-2024-06", () => {
  it("part1-test: returns counts of positions the guard visits before leaving the map", () => {
    expect(getCountOfVisitedPositions(testInput)).toBe(41);
  });
  it("part2-full: returns counts of positions the guard visits before leaving the map", () => {
    expect(getCountOfVisitedPositions(fullInput)).toBe(1);
  });
});
