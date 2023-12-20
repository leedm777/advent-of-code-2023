import _ from "lodash";
import * as aoc from "./aoc.js";

class Graph {
  constructor(input) {
    this.grid = _.map(input, (line) => _.map(line, (ch) => _.parseInt(ch, 10)));
    this.goal = [this.grid.length - 1, this.grid[0].length - 1];
    this.h = aoc.manhattanHeuristic(this.goal);
    this.h = aoc.dijkstraHeuristic;
    this.start = [0, 0];
  }

  isGoal(coord) {
    return _.isEqual(coord, this.goal);
  }

  getNeighbors(coord, cameFrom) {
    const back1 = cameFrom[this.keyify(coord)];
    const back2 = back1 && cameFrom[this.keyify(back1)];
    const back3 = back2 && cameFrom[this.keyify(back2)];

    const dir3 = back3 && [coord[0] - back3[0], coord[1] - back3[1]];

    const mustTurnFrom =
      dir3 && (dir3[0] === 0 || dir3[1] === 0) && _.map(dir3, (v) => v / 3);

    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    return _(dirs)
      .filter((dir) => !_.isEqual(dir, mustTurnFrom))
      .map((dir) => aoc.movePos(coord, dir))
      .filter((next) => {
        if (_.isEqual(back1, next)) {
          return false;
        }
        const [y, x] = next;
        return (
          y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length
        );
      })
      .value();
  }

  getNeighborDistance(c1, c2) {
    return _.get(this.grid, c2);
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

  _.forEach(path, (coord) => _.set(x, coord, _.get(g.grid, coord)));

  console.log(
    _(x)
      .map((row) => _.join(row, ""))
      .join("\n"),
  );

  return _(path)
    .drop(1)
    .map((coord) => _.get(g.grid, coord))
    .sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
