import { part1, part2 } from "./day10";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day10.txt");
const exampleInputs = [
  [[".....", ".S-7.", ".|.|.", ".L-J.", "....."], 4],
  [["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."], 8],
];

describe("day10", () => {
  describe("part 1", () => {
    it.each(exampleInputs)(
      "should work with the sample %s",
      (exampleInput, expected) => {
        const actual = part1(exampleInput);
        expect(actual).toStrictEqual(expected);
      },
    );
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(6856);
    });
  });

  describe.skip("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2();
      expect(actual).toStrictEqual();
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual();
    });
  });
});
