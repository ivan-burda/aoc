import { readFileSync } from "graceful-fs";
import { getConditionalMultiplication, getMultiplication } from "../2024-03";

const testInputPart1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testInputPart2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
const fullInput = readFileSync("2024/03/2024-03.txt", "utf8");

describe("AOC-2024-03", () => {
  it("part1-test: returns multiplication", () => {
    expect(getMultiplication(testInputPart1)).toEqual(161);
  });

  it("part1-full: returns multiplication", () => {
    expect(getMultiplication(fullInput)).toEqual(180233229);
  });

  it("part2-test: returns multiplication", () => {
    expect(getConditionalMultiplication(testInputPart2)).toEqual(48);
  });

  it("part2-test: returns multiplication", () => {
    expect(getConditionalMultiplication(fullInput)).toEqual(95411583);
  });
});
