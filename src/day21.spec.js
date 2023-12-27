import { part1, part2 } from "./day21";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day21.txt");
const exampleInput = [
  "...........",
  ".....###.#.",
  ".###.##..#.",
  "..#.#...#..",
  "....#.#....",
  ".##..S####.",
  ".##..#...#.",
  ".......##..",
  ".##.#.####.",
  ".##..##.##.",
  "...........",
];

const exampleSteps = [
  [1, 2],
  [2, 4],
  [3, 6],
  [6, 16],
];

describe("day21", () => {
  describe("part 1", () => {
    it.each(exampleSteps)(
      "should work with the sample %d",
      (numSteps, expectedOutput) => {
        const actual = part1(exampleInput, numSteps);
        expect(actual).toStrictEqual(expectedOutput);
      },
    );
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(3737);
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
