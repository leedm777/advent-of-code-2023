import _ from "lodash";
import * as aoc from "./aoc.js";

function parseLine(line) {
  // R 6 (#70c710)
  const { turn, dist, color } =
    /^(?<turn>[LRUD]) (?<dist>\d+) \((?<color>#[0-9a-f]{6})\)$/.exec(
      line,
    ).groups;

  return {
    turn,
    dist: _.parseInt(dist, 10),
    color,
  };
}

const dirs = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0],
};

const reverse = {
  R: "L",
  L: "R",
  U: "D",
  D: "U",
};

function dig(input) {
  const initPos = [200, 150];
  const initGrid = [[]];
  _.set(initGrid, initPos, { color: "#000000" });
  const { grid, min, max } = _(input)
    .map(parseLine)
    .reduce(
      ({ pos, grid, min, max }, { turn, dist, color }) => {
        const dir = dirs[turn];
        for (let i = 0; i < dist; ++i) {
          _.set(grid, _.concat(pos, [turn]), true);
          pos = aoc.movePos(pos, dir);
          _.set(grid, pos, { color, [reverse[turn]]: true });
        }

        return {
          pos,
          grid,
          min: [Math.min(min[0], pos[0]), Math.min(min[1], pos[1])],
          max: [Math.max(max[0], pos[0]), Math.max(max[1], pos[1])],
        };
      },
      {
        pos: initPos,
        grid: initGrid,
        min: initPos,
        max: initPos,
      },
    );
  return { grid, min, max };
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part1(input) {
  const { grid, min, max } = dig(input);

  let s = "\n";
  let ctr = 0;
  for (let row = min[0]; row <= max[0]; ++row) {
    let upEdge = false;
    let downEdge = false;
    for (let col = min[1]; col <= max[1]; ++col) {
      const cell = _.get(grid, [row, col]);

      if (cell) {
        ++ctr;
        s += "#";
        if (cell.U) {
          upEdge = !upEdge;
        }
        if (cell.D) {
          downEdge = !downEdge;
        }
      } else {
        if (upEdge && downEdge) {
          ++ctr;
          s += "#";
        } else {
          s += ".";
        }
      }
    }
    s += "\n";
  }

  if (process.env.VERBOSE) {
    console.log(s);
  }

  return ctr;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
