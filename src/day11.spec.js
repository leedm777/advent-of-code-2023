import { part1, part2 } from "./day11";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day11.txt");
const exampleInput = [
  "...#......",
  ".......#..",
  "#.........",
  "..........",
  "......#...",
  ".#........",
  ".........#",
  "..........",
  ".......#..",
  "#...#.....",
];

describe("day11", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(374);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(10165598);
    });
  });

  describe("part 2", () => {
    it("should work with the sample and expansion of 10", () => {
      const actual = part2(exampleInput, 10);
      expect(actual).toStrictEqual(1030);
    });
    it("should work with the sample and expansion of 100", () => {
      const actual = part2(exampleInput, 100);
      expect(actual).toStrictEqual(8410);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(678728808158);
    });
  });
});
