import { part1, part2 } from "./day10";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day10.txt");
const exampleInputs = [
  [[".....", ".S-7.", ".|.|.", ".L-J.", "....."], 4],
  [["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."], 8],
];

const exampleInputs2 = [
  [
    [
      "...........",
      ".S-------7.",
      ".|F-----7|.",
      ".||.....||.",
      ".||.....||.",
      ".|L-7.F-J|.",
      ".|..|.|..|.",
      ".L--J.L--J.",
      "...........",
    ],
    4,
  ],
  [
    [
      "...........",
      ".S------7.",
      ".|F----7|.",
      ".||....||.",
      ".||....||.",
      ".|L-7F-J|.",
      ".|..||..|.",
      ".L--JL--J.",
      "..........",
    ],
    4,
  ],
  [
    [
      ".F----7F7F7F7F-7....",
      ".|F--7||||||||FJ....",
      ".||.FJ||||||||L7....",
      "FJL7L7LJLJ||LJ.L-7..",
      "L--J.L7...LJS7F-7L7.",
      "....F-J..F7FJ|L7L7L7",
      "....L7.F7||L7|.L7L7|",
      ".....|FJLJ|FJ|F7|.LJ",
      "....FJL-7.||.||||...",
      "....L---J.LJ.LJLJ...",
    ],
    8,
  ],
  [
    [
      "FF7FSF7F7F7F7F7F---7",
      "L|LJ||||||||||||F--J",
      "FL-7LJLJ||||||LJL-77",
      "F--JF--7||LJLJ7F7FJ-",
      "L---JF-JLJ.||-FJLJJ7",
      "|F|F-JF---7F7-L7L|7|",
      "|FFJF7L7F-JF7|JL---7",
      "7-L-JL7||F7|L7F-7F7|",
      "L.L7LFJ|||||FJL7||LJ",
      "L7JLJL-JLJLJL--JLJ.L",
    ],
    10,
  ],
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

  describe("part 2", () => {
    it.each(exampleInputs2)(
      "should work with the sample %s",
      (exampleInput, expected) => {
        const actual = part2(exampleInput);
        expect(actual).toStrictEqual(expected);
      },
    );
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(501);
    });
  });
});
