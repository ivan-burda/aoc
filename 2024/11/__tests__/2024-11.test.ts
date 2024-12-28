import { getStoneCountOptimized } from "../2024-11";

const testInput = `125 17`;
const fullInput = `1117 0 8 21078 2389032 142881 93 385`;

describe("AOC-2024-11", () => {
  it("part1-test returns count of stones after blinking 25 times", () => {
    expect(getStoneCountOptimized(testInput, 25)).toEqual(55312);
  });

  it("part1-full returns count of stones after blinking 25 times", () => {
    expect(getStoneCountOptimized(fullInput, 25)).toEqual(224529);
  });

  it("part2-full returns count of stones after blinking 75 times", () => {
    expect(getStoneCountOptimized(fullInput, 75)).toEqual(266820198587914);
  });
});
