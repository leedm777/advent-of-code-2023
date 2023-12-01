import { part1, part2 } from "./day01";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day01.txt");
const exampleInput = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

describe("day01", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(142);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(53651);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual();
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual();
    });
  });
});
