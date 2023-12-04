import { parseNumbers, part1, part2 } from "./day04";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day04.txt");
const exampleInput = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

describe("day04", () => {
  describe("parseNumbers", () => {
    it("should deal with leading spaces", async () => {
      const actual = parseNumbers(" 1 21 53 59 44");
      expect(actual).toStrictEqual([1, 21, 53, 59, 44]);
    });
    it("should deal with multiple spaces", async () => {
      const actual = parseNumbers("69 82 63 72 16 21 14  1");
      expect(actual).toStrictEqual([69, 82, 63, 72, 16, 21, 14, 1]);
    });
  });
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(13);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(21158);
    });
  });

  describe.skip("part 2", () => {
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
