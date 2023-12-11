import _ from "lodash";

function parseSequence(line) {
  return _(line)
    .split(" ")
    .map((s) => _.parseInt(s, 10))
    .value();
}

function derivative(sequence) {
  return _(_.take(sequence, _.size(sequence) - 1))
    .zip(_.drop(sequence, 1))
    .map(([a, b]) => b - a)
    .value();
}

function nextValue(sequence) {
  if (_.every(sequence, (n) => n === 0)) {
    return 0;
  }
  const d = derivative(sequence);
  const delta = nextValue(d);
  return _.last(sequence) + delta;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  const sequences = _.map(input, parseSequence);
  return _(sequences).map(nextValue).sum();
}

function priorValue(sequence) {
  return nextValue(_.reverse(sequence));
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  const sequences = _.map(input, parseSequence);
  return _(sequences).map(priorValue).sum();
}
