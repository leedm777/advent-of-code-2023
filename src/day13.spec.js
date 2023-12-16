import { findReflection, part1, part2, transposeGrid } from "./day13";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day13.txt");
const exampleInput = [
  "#.##..##.",
  "..#.##.#.",
  "##......#",
  "##......#",
  "..#.##.#.",
  "..##..##.",
  "#.#.##.#.",
  "",
  "#...##..#",
  "#....#..#",
  "..##..###",
  "#####.##.",
  "#####.##.",
  "..##..###",
  "#....#..#",
];

describe("day13", () => {
  describe("findReflection", () => {
    it("should work with simple example", async () => {
      const actual = findReflection([
        "#.##..##.",
        "..#.##.#.",
        "##......#",
        "##......#",
        "..#.##.#.",
        "#.##..##.",
      ]);
      expect(actual).toStrictEqual(3);
    });
    it("should work with another simple example", async () => {
      const actual = findReflection([
        "#.##..##.",
        "..#.##.#.",
        "##......#",
        "##......#",
        "..#.##.#.",
      ]);
      expect(actual).toStrictEqual(3);
    });
    it("should work with yet one more another simple example", async () => {
      const actual = findReflection([
        "..#.##.#.",
        "##......#",
        "##......#",
        "..#.##.#.",
        "#.##..##.",
      ]);
      expect(actual).toStrictEqual(2);
    });
  });

  describe("transposeGrid", () => {
    it("should transpose a simple grid", async () => {
      const actual = transposeGrid([
        "..#.##.#.",
        "##......#",
        "##......#",
        "..#.##.#.",
        "#.##..##.",
      ]);
      expect(actual).toStrictEqual([
        ".##.#",
        ".##..",
        "#..##",
        "....#",
        "#..#.",
        "#..#.",
        "....#",
        "#..##",
        ".##..",
      ]);
    });
  });

  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(405);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(29213);
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
