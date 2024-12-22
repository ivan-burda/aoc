import { getTrailheadStats } from "../2024-10";
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

const part2TestInput1 = `.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`;

const part2TestInput2 = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

const part2TestInput3 = `012345
123456
234567
345678
4.6789
56789.`;

const part2TestInput4 = `89010123
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
    expect(getTrailheadStats(testInput1).trailheadScoreSum).toEqual(2);
  });

  it("part1-test2 returns trailhead score sum", () => {
    expect(getTrailheadStats(testInput2).trailheadScoreSum).toEqual(4);
  });

  it("part1-test3 returns trailhead score sum", () => {
    expect(getTrailheadStats(testInput3).trailheadScoreSum).toEqual(3);
  });

  it("part1-test4 returns trailhead score sum", () => {
    expect(getTrailheadStats(testInput4).trailheadScoreSum).toEqual(36);
  });

  it("part1-full returns trailhead score sum", () => {
    expect(getTrailheadStats(fullInput).trailheadScoreSum).toEqual(468);
  });
  //part2
  it("part2-test1 returns trailhead rating sum", () => {
    expect(getTrailheadStats(part2TestInput1).trailheadRatingSum).toEqual(3);
  });

  it("part2-test2 returns trailhead rating sum", () => {
    expect(getTrailheadStats(part2TestInput2).trailheadRatingSum).toEqual(13);
  });

  it("part2-test3 returns trailhead rating sum", () => {
    expect(getTrailheadStats(part2TestInput3).trailheadRatingSum).toEqual(227);
  });

  it("part2-test4 returns trailhead rating sum", () => {
    expect(getTrailheadStats(part2TestInput4).trailheadRatingSum).toEqual(81);
  });

  it("part2-full returns trailhead rating sum", () => {
    expect(getTrailheadStats(fullInput).trailheadRatingSum).toEqual(966);
  });
});
