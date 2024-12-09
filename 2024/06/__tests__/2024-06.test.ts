import { readFileSync } from "graceful-fs";
import {
  getCountOfPossibleObstaclePositions,
  getCountOfVisitedPositions,
} from "../2024-06";

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

const fullInput = readFileSync("2024/06/2024-06.txt", "utf8");

describe("AOC-2024-06", () => {
  it("part1-test: returns counts of positions the guard visits before leaving the map", () => {
    expect(getCountOfVisitedPositions(testInput)).toBe(41);
  });

  it("part1-full: returns counts of positions the guard visits before leaving the map", () => {
    expect(getCountOfVisitedPositions(fullInput)).toBe(5080);
  });

  it("part2-test: returns counts of possible obstacle positions to make the guard loop", () => {
    expect(getCountOfPossibleObstaclePositions(testInput)).toBe(6);
  });

  it("part2-full: returns counts of possible obstacle positions to make the guard loop", () => {
    expect(getCountOfPossibleObstaclePositions(fullInput)).toBe(1919);
  });
});
