import _ from "lodash";

const SYMBOL = "SYMBOL";
const NUMBER = "NUMBER";

function parseSchematic(input) {
  const map = {};
  const numbers = [];
  const symbols = [];

  for (let y = 0; y < input.length; ++y) {
    const line = input[y];
    for (let x = 0; x < line.length; ++x) {
      const ch = line.charAt(x);
      const coord = `${x},${y}`;

      if (ch.match(/[0-9]/)) {
        // number; see if we're building a number
        const prior = `${x - 1},${y}`;
        if (map[prior]?.type === NUMBER) {
          map[prior].value = map[prior].value * 10 + _.parseInt(ch, 10);
          map[coord] = map[prior];
        } else {
          map[coord] = {
            type: NUMBER,
            value: _.parseInt(ch, 10),
          };
          map[coord].idx = numbers.push(map[coord]) - 1;
        }
      } else if (ch !== ".") {
        // symbol
        map[coord] = {
          type: SYMBOL,
          value: ch,
          coord: [x, y],
          adjacentNumbers: new Set(),
        };
        symbols.push(map[coord]);
      } // else empty space
    }
  }

  return { map, numbers, symbols };
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {Number} Puzzle output
 */
export function part1(input) {
  const { map, numbers, symbols } = parseSchematic(input);

  for (const symbol of symbols) {
    const [x, y] = symbol.coord;
    for (let dx = -1; dx <= 1; ++dx) {
      for (let dy = -1; dy <= 1; ++dy) {
        if (dx === 0 && dy === 0) {
          continue;
        }

        const coord = `${x + dx},${y + dy}`;
        if (map[coord]?.type === NUMBER) {
          map[coord].symbolAdjecent = true;
        }
      }
    }
  }

  return _(numbers).filter("symbolAdjecent").map("value").sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  const { map, numbers, symbols } = parseSchematic(input);

  for (const symbol of symbols) {
    const [x, y] = symbol.coord;
    for (let dx = -1; dx <= 1; ++dx) {
      for (let dy = -1; dy <= 1; ++dy) {
        if (dx === 0 && dy === 0) {
          continue;
        }

        const coord = `${x + dx},${y + dy}`;
        if (map[coord]?.type === NUMBER) {
          symbol.adjacentNumbers.add(map[coord].idx);
        }
      }
    }
  }

  return _(symbols)
    .filter(
      ({ value, adjacentNumbers }) =>
        value === "*" && adjacentNumbers.size === 2,
    )
    .map(({ adjacentNumbers }) =>
      _.map([...adjacentNumbers], (idx) => numbers[idx].value),
    )
    .map(([a, b]) => a * b)
    .sum();
}
