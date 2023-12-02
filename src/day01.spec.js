import { parseNumbers, part1, part2 } from "./day01";
import { readInput } from "./aoc";
import _ from "lodash";

const puzzleInput = readInput("./src/day01.txt");
const exampleInput = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
const exampleInput2 = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];
const exampleOutput2 = ["29", "83", "13", "24", "42", "14", "76"];

describe("day01", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(142);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(53651);
    });
  });

  describe("parseNumbers", () => {
    it.each(_.zip(exampleInput2, exampleOutput2))(
      "should parse %s",
      (input, expected) => {
        const actual = parseNumbers(input);
        expect(_.join(actual, "")).toStrictEqual(expected);
      },
    );
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput2);
      expect(actual).toStrictEqual(281);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toBeLessThan(53896);
      expect(actual).toStrictEqual(53894);
    });
  });
});
