import { getTrailheadScoreSum } from "../2024-10";
import { readFileSync } from "graceful-fs";

const testInput1 = `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;

const testInput2 = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

const testInput3 = `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`;

const testInput4 = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const fullInput = readFileSync("2024/10/2024-10.txt", "utf8");

describe("AOC-2024-10", () => {
  it("part1-test1 returns trailhead score sum", () => {
    expect(getTrailheadScoreSum(testInput1)).toEqual(2);
  });

  it("part1-test2 returns trailhead score sum", () => {
    expect(getTrailheadScoreSum(testInput2)).toEqual(4);
  });

  it("part1-test3 returns trailhead score sum", () => {
    expect(getTrailheadScoreSum(testInput3)).toEqual(3);
  });

  it("part1-test4 returns trailhead score sum", () => {
    expect(getTrailheadScoreSum(testInput4)).toEqual(36);
  });

  it("part1-full returns trailhead score sum", () => {
    expect(getTrailheadScoreSum(fullInput)).toEqual(468);
  });
});
