import { splitArray } from "./aoc";
import _ from "lodash";

describe("aoc helpers", () => {
  describe("splitArray", () => {
    // ''.split('whatever') === []
    it("should split an empty array to an empty array", () => {
      const actual = splitArray([], _.constant(false));
      expect(actual).toStrictEqual([]);
    });

    // '12345'.split('0') === ['12345']
    it("split into a single array when it is always falsey", () => {
      const actual = splitArray([1, 2, 3, 4, 5], _.constant(false));
      expect(actual).toStrictEqual([[1, 2, 3, 4, 5]]);
    });

    // 'a'.split('a') === ['', '']
    it("should split to empty arrays on match", () => {
      const actual = splitArray([1], _.constant(true));
      expect(actual).toStrictEqual([[], []]);
    });

    it("should split along matches", () => {
      const input = [
        "part 1",
        "",
        "part 2",
        "still",
        "part 2",
        "",
        "part 3",
        "also part 3",
      ];
      const actual = splitArray(input, (line) => _.isEmpty(line));
      expect(actual).toStrictEqual([
        ["part 1"],
        ["part 2", "still", "part 2"],
        ["part 3", "also part 3"],
      ]);
    });
  });
});
