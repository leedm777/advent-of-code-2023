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

export function findSmudgeReflection(lines) {
  // fixing smudges needs bit twiddling
  const bitmasks = _.map(lines, (line) =>
    _.reduce(line, (bitmask, ch) => (bitmask << 1) | (ch === "#" ? 1 : 0), 0),
  );

  for (let i = 1; i < bitmasks.length; ++i) {
    let bitMatch = bitmasks[i] ^ bitmasks[i - 1];

    // if 0 or power of 2, it's a match
    if (bitMatch === 0 || Math.log2(bitMatch) % 1 === 0) {
      // track when we fix the smudge so we only fix a single one
      let fixedSmudge = bitMatch !== 0;
      let match = true;

      // check remaining bitmasks
      for (let k = i + 1, j = i - 2; j >= 0 && k < bitmasks.length; ++k, --j) {
        bitMatch = bitmasks[k] ^ bitmasks[j];

        // if not a match, keep looking
        if (!(bitMatch === 0 || Math.log2(bitMatch) % 1 === 0)) {
          match = false;
          break;
        }

        // track whether we're fixing a smudge or not
        if (bitMatch !== 0) {
          // if we've already fixed a smudge, then this is not a match
          if (fixedSmudge) {
            match = false;
            break;
          }
          fixedSmudge = true;
        }
      }

      // if all the reflected lines matched, _and_ we fixed a smudge, we got it
      if (match && fixedSmudge) {
        return i;
      }
    }
  }

  return -1;
}

function scoreSmudgeGrid(grid) {
  // horizontal
  const hScore = findSmudgeReflection(grid);
  if (hScore !== -1) {
    return 100 * hScore;
  }

  return findSmudgeReflection(transposeGrid(grid));
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  const grids = aoc.splitArray(input, _.isEmpty);

  return _(grids).map(scoreSmudgeGrid).sum();
}
