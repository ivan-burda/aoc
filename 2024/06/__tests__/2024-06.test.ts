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

  xit("part2-full: returns counts of possible obstacle positions to make the guard loop", () => {
    expect(getCountOfPossibleObstaclePositions(fullInput)).toBe(1);
  });
});


//PLACING OBSTACLES - idea1 (does not work if the loop should be more complex than just a rectangle)
/*
Iterate over turning positions by 1
Take 3 neighboring positions

Rectangular-loop turning points
       A[4,1]          B[8,1]

X[3,6]  [4,6]*         C[8,6]

Guard is going LEFT
A[1] === B[1] && B[0] === C[0]  ----> new obstacle: [A[0]-1,C[1]] => [3,6]

======================
Rectangular-loop turning points
B[ 2, 4 ]        C[ 6, 4 ]

A[ 2, 6 ]         [ 6, 6]*
                 X[ 6, 7]

Guard is going DOWN
A[0] === B[0]  && B[1] === C[1] -----> new obstacle: [C[0],A[1]+1] => [6,7]

======================
C[ 1, 7 ]         [6,7]* X[7,7]

B[ 1, 8 ]     A[ 6, 8 ]

Guide is going RIGHT
A[1] === B[1] && B[0]=== C[0] ------->new obstacle: [A[0]+1, C[1]] =>[7,7]

======================

        A[ 2, 4 ]       B[ 6, 4 ]

 X[1,8] [ 2, 8 ]*       C[ 6, 8 ]

Guard is going LEFT
A[1] === B[1] && B[0] === C[0]   ------->new obstacle: [A[0]-1,C[1]] =>[1,8]

======================
X[ 2, 3 ]
 [ 2, 4 ]*        A[ 6, 4 ]

C[ 2, 6 ]         B[ 6, 6]

Guard is going UP
A[0] === B[0]  && B[1] === C[1] -----> new obstacle: [C[0],A[1]-1] => [2,3]

======================




 */


//PLACING OBSTACLES - idea2
/*
Loop over visited position
place a new obstacle at one position after another



 */