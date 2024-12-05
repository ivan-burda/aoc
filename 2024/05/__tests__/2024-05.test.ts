import { getMiddlePageSum } from "../2024-05";
import { readFileSync } from "graceful-fs";

const testInputRules = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`;

const testInputUpdates = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const fullInputRules = readFileSync("2024/05/2024-05-rules.txt", "utf8");
const fullInputUpdates = readFileSync("2024/05/2024-05-updates.txt", "utf8");

describe("AOC-2024-05", () => {
  it("part1-test: returns so  me of middle pages of correct updates", () => {
    expect(getMiddlePageSum(testInputRules, testInputUpdates)).toEqual(143);
  });

  it("part2-test: returns some of middle pages of correct updates", () => {
    expect(getMiddlePageSum(fullInputRules, fullInputUpdates)).toEqual(4959);
  });
});
