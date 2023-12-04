import _ from "lodash";

export function parseNumbers(str) {
  return _(str)
    .thru(_.trim)
    .split(/ +/)
    .map((s) => _.parseInt(s, 10))
    .value();
}

function parseCard(line) {
  const match =
    /^Card +(?<idStr>[0-9]+): (?<winningNumbersStr>[0-9 ]+) \| (?<scratchNumbersStr>[0-9 ]+)$/.exec(
      line,
    );
  if (!match) {
    throw new Error(`Failed to parse ${line}`);
  }
  const { idStr, winningNumbersStr, scratchNumbersStr } = match.groups;
  return {
    id: _.parseInt(idStr, 10),
    winningNumbers: parseNumbers(winningNumbersStr),
    scratchNumbers: parseNumbers(scratchNumbersStr),
  };
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  return _(input)
    .map(parseCard)
    .map(({ winningNumbers, scratchNumbers }) =>
      _.intersection(winningNumbers, scratchNumbers),
    )
    .map((matches) => {
      if (matches.length === 0) {
        return 0;
      }

      return 1 << (matches.length - 1);
    })
    .sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
