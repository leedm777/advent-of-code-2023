import _ from "lodash";
import * as aoc from "./aoc";

// const ROCK = "#";
const DIRT = ".";
const START = "S";

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input, numSteps = 64) {
  let positions = null;
  const garden = _.map(input, (line, row) =>
    _.map(line, (ch, col) => {
      if (ch === START) {
        positions = [[row, col]];
      }
      return ch;
    }),
  );

  for (let step = 0; step < numSteps; ++step) {
    positions = _(positions)
      .flatMap((pos) => {
        return _(dirs)
          .map((dir) => aoc.movePos(pos, dir))
          .filter((pos) => _.includes([DIRT, START], _.get(garden, pos)))
          .value();
      })
      .uniqBy(JSON.stringify)
      .value();
  }

  return _.size(positions);
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
