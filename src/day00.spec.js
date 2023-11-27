import { part1, part2 } from "./day00";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day00.txt");
const examples = [
  ["R2, L3", 5],
  ["R2, R2, R2", 2],
  ["R5, L5, R5, R3", 12],
];

describe("day00", () => {
  describe("part 1", () => {
    it.each(examples)("should work with the sample %s", (input, expected) => {
      const actual = part1(input);
      expect(actual).toStrictEqual(expected);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(291);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2("R8, R4, R4, R8");
      expect(actual).toStrictEqual(4);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(159);
    });
  });
});
