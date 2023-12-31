import { part1, part2 } from "./day17";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day17.txt");
const exampleInput = [
  "2413432311323",
  "3215453535623",
  "3255245654254",
  "3446585845452",
  "4546657867536",
  "1438598798454",
  "4457876987766",
  "3637877979653",
  "4654967986887",
  "4564679986453",
  "1224686865563",
  "2546548887735",
  "4322674655533",
];
const unfortunateExampleInput = [
  "111111111111",
  "999999999991",
  "999999999991",
  "999999999991",
  "999999999991",
];

describe("day17", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(102);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(870);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(94);
    });
    it("should work with the unfortunate sample", () => {
      const actual = part2(unfortunateExampleInput);
      expect(actual).toStrictEqual(71);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toBeLessThan(1094);
      expect(actual).toStrictEqual(1063);
    });
  });
});
