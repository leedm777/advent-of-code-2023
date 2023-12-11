import { part1, part2 } from "./day09";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day09.txt");
const exampleInput = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];

describe("day09", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(114);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(1789635132);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(2);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(913);
    });
  });
});
