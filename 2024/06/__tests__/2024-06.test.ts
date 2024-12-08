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

const fullInput = readFileSync("2024/06/2024-06.txt", "utf8");

describe("AOC-2024-06", () => {
  it("part1-test: returns counts of positions the guard visits before leaving the map", () => {
    expect(getCountOfVisitedPositions(testInput)).toBe(41);
  });
  it("part2-full: returns counts of positions the guard visits before leaving the map", () => {
    expect(getCountOfVisitedPositions(fullInput)).toBe(1);
  });
});


/*


[x4,y0] ---------
 -             [x9,y1]
 -             -
 -             -
 -             -
 -             -
[x3,y6]*----------
           [x8,y7]


 [1,6] .........
              [7,7]*
[0,8]             .
..........  [6,9]




 */