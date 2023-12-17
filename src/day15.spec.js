import { hash, part1, part2 } from "./day15";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day15.txt");
const exampleInput = ["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"];

describe("day15", () => {
  describe("hash", () => {
    it("should hash a simple string", async () => {
      const actual = hash("HASH");
      expect(actual).toStrictEqual(52);
    });
  });

  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(1320);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(511343);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(145);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(294474);
    });
  });
});
