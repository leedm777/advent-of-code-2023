import { part1, part2 } from "./day08";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day08.txt");
const exampleInput1 = [
  "RL",
  "",
  "AAA = (BBB, CCC)",
  "BBB = (DDD, EEE)",
  "CCC = (ZZZ, GGG)",
  "DDD = (DDD, DDD)",
  "EEE = (EEE, EEE)",
  "GGG = (GGG, GGG)",
  "ZZZ = (ZZZ, ZZZ)",
];

const exampleInput2 = [
  "LLR",
  "",
  "AAA = (BBB, BBB)",
  "BBB = (AAA, ZZZ)",
  "ZZZ = (ZZZ, ZZZ)",
];

describe("day08", () => {
  describe("part 1", () => {
    it("should work with the first sample", () => {
      const actual = part1(exampleInput1);
      expect(actual).toStrictEqual(2);
    });
    it("should work with the second sample", () => {
      const actual = part1(exampleInput2);
      expect(actual).toStrictEqual(6);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(14429);
    });
  });

  describe.skip("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput1);
      expect(actual).toStrictEqual();
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual();
    });
  });
});
