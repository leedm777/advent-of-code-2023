import _ from "lodash";
import * as aoc from "./aoc.js";
import assert from "assert";

function parseCell(startStr) {
  return _(startStr)
    .split(",")
    .map((s) => _.parseInt(s, 10))
    .thru(([x, y, z]) => [z, y, x])
    .value();
}

function findSettledOn(grid, brick) {
  if (brick.start[0] === 1) {
    return [-1]; // ground
  }

  if (brick.start[0] === brick.end[0]) {
    // horizontal brick
    const cells = [];
    for (
      let c = brick.start;
      !_.isEqual(c, brick.end);
      c = aoc.movePos(c, brick.dir)
    ) {
      cells.push(aoc.movePos(c, [-1, 0, 0]));
    }
    cells.push(aoc.movePos(brick.end, [-1, 0, 0]));

    return _(cells)
      .map((c) => _.get(grid, c))
      .reject(_.isNil)
      .map("idx")
      .value();
  } else {
    // vertical brick
    const cell = aoc.movePos(brick.start, [-1, 0, 0]);
    const below = _.get(grid, cell);
    return below ? [below.idx] : [];
  }
}

function drop(brick) {
  --brick.start[0];
  --brick.end[0];
}

function setBrick(grid, brick) {
  for (
    let c = brick.start;
    !_.isEqual(c, brick.end);
    c = aoc.movePos(c, brick.dir)
  ) {
    assert.ok(
      _.isNil(_.get(grid, c)),
      `Overlapping brick at ${JSON.stringify(c)}`,
    );
    _.set(grid, c, brick);
  }
  assert.ok(
    _.isNil(_.get(grid, brick.end)),
    `Overlapping brick at ${JSON.stringify(brick.end)}`,
  );
  _.set(grid, brick.end, brick);
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part1(input) {
  const grid = [];
  const bricks = _(input)
    .map((line, idx) => {
      const [startStr, endStr] = _.split(line, "~");
      const start = parseCell(startStr);
      const end = parseCell(endStr);
      const dir = _(end)
        .zip(start)
        .map(([e, s]) => e - s)
        .map(Math.sign)
        .value();
      return { idx, start, end, dir, settledOn: [] };
    })
    .sortBy((b) => b.start[0])
    .value();
  for (const brick of bricks) {
    while (_.isEmpty((brick.settledOn = findSettledOn(grid, brick)))) {
      drop(brick);
    }
    setBrick(grid, brick);
  }

  const essential = _(bricks)
    .filter((b) => b.settledOn.length === 1)
    .flatMap("settledOn")
    .sortBy()
    .uniq()
    .value();

  const expendable = _.difference(_.range(0, bricks.length), essential);

  return expendable.length;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
