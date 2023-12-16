import _ from "lodash";

const ROCK = "O";
const SPACE = ".";

export function parseRocks(input) {
  return _.map(input, (line) => _.map(line));
}

export function tiltNorth(rocks) {
  for (let colNum = 0; colNum < rocks[0].length; ++colNum) {
    for (let rowNum = 1; rowNum < rocks.length; ++rowNum) {
      if (
        rocks[rowNum][colNum] === ROCK &&
        rocks[rowNum - 1][colNum] === SPACE
      ) {
        // rock and roll
        let j = rowNum - 1;
        while (j >= 1 && rocks[j - 1][colNum] === SPACE) {
          --j;
        }
        // swap rock and space
        [rocks[j][colNum], rocks[rowNum][colNum]] = [
          rocks[rowNum][colNum],
          rocks[j][colNum],
        ];
      }
    }
  }
  return rocks;
}

function scoreRocks(rocks) {
  return _(rocks)
    .map((row, idx) => {
      const rowsFromSouthEdge = rocks.length - idx;
      return (
        rowsFromSouthEdge *
        _(row)
          .filter((ch) => ch === ROCK)
          .size()
      );
    })
    .sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  const rocks = parseRocks(input);
  const tilted = tiltNorth(rocks);
  return scoreRocks(tilted);
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
