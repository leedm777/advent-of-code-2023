import { part1, part2 } from "./day22";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day22.txt");
const exampleInput = [
  "1,0,1~1,2,1",
  "0,0,2~2,0,2",
  "0,2,3~2,2,3",
  "0,0,4~0,2,4",
  "2,0,5~2,2,5",
  "0,1,6~2,1,6",
  "1,1,8~1,1,9",
];

describe("day22", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(5);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toBeLessThan(681);
      expect(actual).toBeLessThan(656);
      expect(actual).toStrictEqual();
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
