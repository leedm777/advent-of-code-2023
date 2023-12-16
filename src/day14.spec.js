import { parseRocks, part1, part2, tiltNorth } from "./day14";
import { readInput } from "./aoc";
import _ from "lodash";

const puzzleInput = readInput("./src/day14.txt");
const exampleInput = [
  "O....#....",
  "O.OO#....#",
  ".....##...",
  "OO.#O....O",
  ".O.....O#.",
  "O.#..O.#.#",
  "..O..#O..O",
  ".......O..",
  "#....###..",
  "#OO..#....",
];

describe("day14", () => {
  describe("part 1", () => {
    describe("tiltNorth", () => {
      it("should tile the sample", async () => {
        const actual = _.map(tiltNorth(parseRocks(exampleInput)), (row) =>
          _.join(row, ""),
        );
        expect(actual).toStrictEqual([
          "OOOO.#.O..",
          "OO..#....#",
          "OO..O##..O",
          "O..#.OO...",
          "........#.",
          "..#....#.#",
          "..O..#.O.O",
          "..O.......",
          "#....###..",
          "#....#....",
        ]);
      });
    });
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(136);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(109596);
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
