import _ from "lodash";

const DAMAGED = "#";
const GOOD = ".";
const UNKNOWN = "?";

/**
 * Same number of one bits. From https://www.geeksforgeeks.org/next-higher-number-with-same-number-of-set-bits/
 *
 * @param {number} x Number
 * @return {number} Next number with the same number of bits set
 */
function snoob(x) {
  let next = 0;

  if (x > 0) {
    const rightOne = x & -x;

    const nextHigherOneBit = x + rightOne;

    let rightOnesPattern = x ^ nextHigherOneBit;

    rightOnesPattern = rightOnesPattern / rightOne;

    rightOnesPattern >>= 2;

    next = nextHigherOneBit | rightOnesPattern;
  }
  return next;
}

function parseRecord(line) {
  const [conditionStr, damagedGroupsStr] = _.split(line, " ");
  return {
    condition: _.map(conditionStr),
    damagedGroups: _(damagedGroupsStr)
      .split(",")
      .map((s) => _.parseInt(s, 10))
      .value(),
  };
}

function countArrangements(record) {
  const counts = _.countBy(record.condition);
  const totalDamaged = _.sum(record.damagedGroups);
  const numUnknown = _.get(counts, UNKNOWN, 0);
  const numUnknownDamaged = totalDamaged - _.get(counts, DAMAGED, 0);

  // set a bit per damaged spring
  let i = (1 << numUnknownDamaged) - 1;

  const guesses = [];

  // and iterate through all combinations of those bits
  while (i < 1 << numUnknown) {
    const guess = _.reduce(
      record.condition,
      ({ acc, guessBits }, ch) => {
        if (ch === UNKNOWN) {
          const g = guessBits & 1 ? DAMAGED : GOOD;
          return {
            acc: acc + g,
            guessBits: guessBits >> 1,
          };
        }

        return {
          acc: acc + ch,
          guessBits,
        };
      },
      {
        acc: "",
        guessBits: i,
      },
    );

    const runLengths = _.map(guess.acc.match(/#+/g), _.size);
    if (_.isEqual(runLengths, record.damagedGroups)) {
      guesses.push(guess.acc);
    }

    i = snoob(i);
  }

  return guesses.length;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  return _(input).map(parseRecord).map(countArrangements).sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
