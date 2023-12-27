import { part1, part2 } from "./day20";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day20.txt");
const exampleInput1 = [
  "broadcaster -> a, b, c",
  "%a -> b",
  "%b -> c",
  "%c -> inv",
  "&inv -> a",
];
const exampleInput2 = [
  "broadcaster -> a",
  "%a -> inv, con",
  "&inv -> b",
  "%b -> con",
  "&con -> output",
];

describe("day20", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput1);
      expect(actual).toStrictEqual(32000000);
    });
    it("should work with the other sample", () => {
      const actual = part1(exampleInput2);
      expect(actual).toStrictEqual(11687500);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(818649769);
    });
  });

  describe("part 2", () => {
    // No sample for part 2
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual();
    });
  });
});
