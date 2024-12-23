import { getStoneCount } from "../2024-11";
import { readFileSync } from "graceful-fs";

const testInput = `125 17`;
const fullInput = `1117 0 8 21078 2389032 142881 93 385`;

describe("AOC-2024-11", () => {
  it("part1-test returns count of stones after blinking 25 times", () => {
    expect(getStoneCount(testInput, 25)).toEqual(55312);
  });

  it("part1-full returns count of stones after blinking 25 times", () => {
    expect(getStoneCount(fullInput, 25)).toEqual(224529);
  });

  it("part2-full returns count of stones after blinking 75 times", () => {
    expect(getStoneCount(fullInput, 75)).toEqual(1);
  });
});
