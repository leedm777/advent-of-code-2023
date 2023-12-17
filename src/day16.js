import _ from "lodash";
import assert from "assert";

function beamToString({ coord: [y, x], dir }) {
  return `[${y},${x}]-${dir}`;
}

function parseSplitters(input) {
  return _.map(input, (line) => _.map(line));
}

function initBeamMap(splitters, beam) {
  const energized = _.map(splitters, (line) => _.map(line, _.constant(0)));

  const seen = new Set();

  _.set(energized, beam.coord, 1);
  seen.add(beamToString(beam));
  return {
    splitters,
    energized,
    seen,
    beams: [beam],
  };
}

function moveBeam({ coord: [y, x], dir }) {
  switch (dir) {
    case "north":
      return { dir, coord: [y - 1, x] };
    case "south":
      return { dir, coord: [y + 1, x] };
    case "west":
      return { dir, coord: [y, x - 1] };
    case "east":
      return { dir, coord: [y, x + 1] };
  }
}

function splitBeam(beam, splitters) {
  const { dir, coord } = beam;
  const splitter = _.get(splitters, beam.coord);
  switch (splitter) {
    case ".":
      return [moveBeam(beam)];
    case "\\":
      switch (dir) {
        case "north":
          return [moveBeam({ coord, dir: "west" })];
        case "south":
          return [moveBeam({ coord, dir: "east" })];
        case "west":
          return [moveBeam({ coord, dir: "north" })];
        case "east":
          return [moveBeam({ coord, dir: "south" })];
      }
      break;
    case "/":
      switch (dir) {
        case "north":
          return [moveBeam({ coord, dir: "east" })];
        case "south":
          return [moveBeam({ coord, dir: "west" })];
        case "west":
          return [moveBeam({ coord, dir: "south" })];
        case "east":
          return [moveBeam({ coord, dir: "north" })];
      }
      break;
    case "|":
      switch (dir) {
        case "north":
        case "south":
          return [moveBeam({ coord, dir })];
        case "west":
        case "east":
          return [
            moveBeam({ coord, dir: "north" }),
            moveBeam({ coord, dir: "south" }),
          ];
      }
      break;
    case "-":
      switch (dir) {
        case "west":
        case "east":
          return [moveBeam({ coord, dir })];
        case "north":
        case "south":
          return [
            moveBeam({ coord, dir: "west" }),
            moveBeam({ coord, dir: "east" }),
          ];
      }
      break;
  }
  assert.fail(`Invalid splitter ${splitter}`);
}

function isValidCoord(splitters, [y, x]) {
  return y >= 0 && y < splitters.length && x >= 0 && x < splitters[y].length;
}

function step({ splitters, energized, seen, beams }) {
  beams = _.flatMap(beams, (beam) => splitBeam(beam, splitters));
  beams = _.filter(beams, (beam) => {
    const { coord } = beam;
    return isValidCoord(splitters, coord) && !seen.has(beamToString(beam));
  });
  _.forEach(beams, (beam) => {
    const {
      coord: [y, x],
    } = beam;
    ++energized[y][x];
    seen.add(beamToString(beam));
  });

  return { splitters, energized, seen, beams };
}

function illuminate(beamMap) {
  while (!_.isEmpty(beamMap.beams)) {
    beamMap = step(beamMap);
  }
  return beamMap;
}

function scoreBeamMap(beamMap) {
  return _(beamMap.energized)
    .map((row) => _.filter(row, (n) => n > 0).length)
    .sum();
}

function scoreBeam(splitters, beam) {
  let beamMap = initBeamMap(splitters, beam);
  beamMap = illuminate(beamMap);
  return scoreBeamMap(beamMap);
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part1(input) {
  const splitters = parseSplitters(input);
  const beam = { coord: [0, 0], dir: "east" };
  return scoreBeam(splitters, beam);
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  let maxScore = 0;
  const splitters = parseSplitters(input);
  const numRows = splitters.length;
  const numCols = splitters[0].length;

  for (let row = 0; row < numRows; ++row) {
    const scoreLeft = scoreBeam(splitters, { coord: [row, 0], dir: "east" });
    const scoreRight = scoreBeam(splitters, {
      coord: [row, numCols - 1],
      dir: "west",
    });

    maxScore = _.max([maxScore, scoreLeft, scoreRight]);
  }

  for (let col = 0; col < numCols; ++col) {
    const scoreTop = scoreBeam(splitters, { coord: [0, col], dir: "south" });
    const scoreBottom = scoreBeam(splitters, { coord: [0, col], dir: "south" });

    maxScore = _.max([maxScore, scoreTop, scoreBottom]);
  }

  return maxScore;
}
