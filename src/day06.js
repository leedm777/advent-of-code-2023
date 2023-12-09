import _ from "lodash";

function parseLine(line) {
  return _(line)
    .split(/\s+/)
    .drop(1)
    .map((s) => parseInt(s, 10))
    .value();
}

function parseRaces(input) {
  const [timeLine, distanceLine] = input;
  const times = parseLine(timeLine);
  const distances = parseLine(distanceLine);

  return _.map(_.zip(times, distances), ([raceTime, distance]) => ({
    raceTime,
    distance,
  }));
}

function numWaysToWin({ raceTime, distance }) {
  // distance traveled in a race:
  //   (raceTime - holdTime) * holdTime
  // looking for:
  //   (raceTime - holdTime) * holdTime > distance
  // reformulate into quadratic (x is holdTime)
  //   -x^2 + raceTime * x - distance > 0
  const a = -1;
  const b = raceTime;
  const c = -distance;

  const x1 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const x2 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);

  const min = Math.floor(Math.min(x1, x2) + 1);
  const max = Math.ceil(Math.max(x1, x2) - 1);

  return { waysToWin: max - min + 1, x1, x2 };
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  const races = parseRaces(input);

  return _(races).map(numWaysToWin).map("waysToWin").reduce(_.multiply);
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
