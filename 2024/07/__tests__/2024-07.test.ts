import { getTotalCalibrationResult } from "../2024-07";
import { readFileSync } from "graceful-fs";

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const fullInput = readFileSync("2024/07/2024-07.txt", "utf8");

describe("AOC-2024-07", () => {
  it("part1-test returns total calibration result", () => {
    expect(getTotalCalibrationResult(testInput, 2)).toEqual(3749);
  });

  it("part1-full returns total calibration result", () => {
    expect(getTotalCalibrationResult(fullInput, 2)).toEqual(4998764814652);
  });

  it("part2-test returns total calibration result", () => {
    expect(getTotalCalibrationResult(testInput, 3)).toEqual(11387);
  });

  it("part2-full returns total calibration result", () => {
    expect(getTotalCalibrationResult(fullInput, 3)).toEqual(37598910447546);
  });
});
