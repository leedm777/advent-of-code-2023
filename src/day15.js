import _ from "lodash";

/**
 * @param {string} str String to hash
 */
export function hash(str) {
  return _.reduce(
    str,
    (acc, ch) => {
      acc += ch.charCodeAt(0);
      acc *= 17;
      acc %= 256;

      return acc;
    },
    0,
  );
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1([input]) {
  return _(input).split(",").map(hash).sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2([input]) {
  return "TODO";
}
