import _ from "lodash";
import * as aoc from "./aoc.js";

export function findReflection(lines) {
  for (let i = 1; i < lines.length; ++i) {
    if (lines[i] === lines[i - 1]) {
      let match = true;
      // check remaining lines
      for (let k = i + 1, j = i - 2; j >= 0 && k < lines.length; ++k, --j) {
        if (lines[k] !== lines[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        return i;
      }
    }
  }

  return -1;
}

export function transposeGrid(grid) {
  const g = [];
  for (let col = 0; col < grid[0].length; ++col) {
    const r = [];
    for (let row = 0; row < grid.length; ++row) {
      r.push(grid[row].charAt(col));
    }
    g.push(_.join(r, ""));
  }
  return g;
}

function scoreGrid(grid) {
  // horizontal
  const hScore = findReflection(grid);
  if (hScore !== -1) {
    return 100 * hScore;
  }

  return findReflection(transposeGrid(grid));
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  const grids = aoc.splitArray(input, _.isEmpty);

  return _(grids).map(scoreGrid).sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
