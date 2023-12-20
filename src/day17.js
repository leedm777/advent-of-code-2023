import _ from "lodash";
import * as aoc from "./aoc.js";

class Graph {
  constructor(input) {
    this.grid = _.map(input, (line) => _.map(line, (ch) => _.parseInt(ch, 10)));
    this.goal = [this.grid.length - 1, this.grid[0].length - 1];
    this.h = aoc.manhattanHeuristic(this.goal);
    this.h = aoc.dijkstraHeuristic;
    this.start = { coord: [0, 0], dir: [-1, -1], stepsStraight: 0, init: true };
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

  return _(path)
    .drop(1)
    .map(({ coord }) => _.get(g.grid, coord))
    .sum();
}

class UltraGraph extends Graph {
  isGoal({ coord, stepsStraight }) {
    return stepsStraight >= 4 && _.isEqual(coord, this.goal);
  }

  getNeighbors({ coord, dir, stepsStraight, init }) {
    let dirs;

    if (init) {
      // no momentum and starting at 0,0, so pick the two directions available
      dirs = [
        [1, 0],
        [0, 1],
      ];
    } else {
      dirs = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ];
    }

    return (
      _(dirs)
        .map((neighborDir) => ({
          coord: aoc.movePos(coord, neighborDir),
          dir: neighborDir,
          stepsStraight: _.isEqual(neighborDir, dir) ? stepsStraight + 1 : 1,
        }))
        .filter(
          ({
            coord: [y, x],
            dir: nextDir,
            stepsStraight: nextStepsStraight,
          }) => {
            // it needs to move a minimum of four blocks in that direction before it can turn
            if (!init && stepsStraight < 4 && nextStepsStraight === 1) {
              return false;
            }

            // can move a maximum of ten consecutive blocks without turning
            if (nextStepsStraight > 10) {
              return false;
            }

            // don't go back
            if (
              _.isEqual(
                nextDir,
                _.map(dir, (x) => -x),
              )
            ) {
              return false;
            }

            // and stay on the grid
            return (
              y >= 0 &&
              y < this.grid.length &&
              x >= 0 &&
              x < this.grid[0].length
            );
          },
        )
        // .tap((n) => {
        //   console.log(`${JSON.stringify(coord)} => ${JSON.stringify(n)}`);
        // })
        .value()
    );
  }
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part2(input) {
  const g = new UltraGraph(input);
  const path = aoc.findPath(g);

  return _(path)
    .drop(1)
    .map(({ coord }) => _.get(g.grid, coord))
    .sum();
}
