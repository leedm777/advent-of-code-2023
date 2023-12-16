import { findReflection, part1, part2, transposeGrid } from "./day13";
import { readInput } from "./aoc";
import * as aoc from "./aoc.js";
import _ from "lodash";

const puzzleInput = readInput("./src/day13.txt");
const grids = aoc.splitArray(puzzleInput, _.isEmpty);
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

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(400);
    });
    it("should work on grid 3", () => {
      const actual = part2(grids[2]);
      expect(actual).toStrictEqual(2);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(37453);
    });
  });
});
