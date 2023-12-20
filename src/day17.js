import _ from "lodash";
import * as aoc from "./aoc.js";

class Graph {
  constructor(input) {
    this.grid = _.map(input, (line) => _.map(line, (ch) => _.parseInt(ch, 10)));
    this.goal = [this.grid.length - 1, this.grid[0].length - 1];
    this.h = aoc.manhattanHeuristic(this.goal);
    this.h = aoc.dijkstraHeuristic;
    this.start = { coord: [0, 0], dir: [-1, -1], stepsStraight: 0 };
  }

  isGoal({ coord }) {
    return _.isEqual(coord, this.goal);
  }

  getNeighbors({ coord, dir, stepsStraight }) {
    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    return _(dirs)
      .map((neighborDir) => ({
        coord: aoc.movePos(coord, neighborDir),
        dir: neighborDir,
        stepsStraight: _.isEqual(neighborDir, dir) ? stepsStraight + 1 : 0,
      }))
      .filter(({ coord: [y, x], dir: neighborDir, stepsStraight }) => {
        // Can move at most three blocks in a single direction before it must
        // turn 90 degrees left or right
        if (stepsStraight >= 3) {
          return false;
        }
        // don't go back
        if (
          _.isEqual(
            neighborDir,
            _.map(dir, (x) => -x),
          )
        ) {
          return false;
        }
        // and stay on the grid
        return (
          y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length
        );
      })
      .value();
  }

  getNeighborDistance(c1, { coord, stepsStraight }) {
    // prefer shorter straight distances so we have more options for turning soon
    return _.get(this.grid, coord);
  }

  keyify(coord) {
    return JSON.stringify(coord);
  }
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part1(input) {
  const g = new Graph(input);
  const path = aoc.findPath(g);

  const x = _.map(g.grid, (line) => _.map(line, _.constant(".")));

  _.forEach(path, ({ coord, stepsStraight }) =>
    _.set(x, coord, stepsStraight + 1),
  );

  console.log(
    _(x)
      .map((row) => _.join(row, ""))
      .join("\n"),
  );

  return _(path)
    .drop(1)
    .map(({ coord }) => _.get(g.grid, coord))
    .sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
