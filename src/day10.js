import _ from "lodash";
import assert from "assert";

function parsePipes(input) {
  let start;
  const grid = _.map(input, (line, y) =>
    _.map(line, (ch, x) => {
      switch (ch) {
        case "|":
          // | is a vertical pipe connecting north and south.
          return {
            coord: { x, y },
            north: true,
            south: true,
          };
        case "-":
          // - is a horizontal pipe connecting east and west.
          return {
            coord: { x, y },
            east: true,
            west: true,
          };
        case "L":
          // L is a 90-degree bend connecting north and east.
          return {
            coord: { x, y },
            north: true,
            east: true,
          };
        case "J":
          // J is a 90-degree bend connecting north and west.
          return {
            coord: { x, y },
            north: true,
            west: true,
          };
        case "7":
          // 7 is a 90-degree bend connecting south and west.
          return {
            coord: { x, y },
            south: true,
            west: true,
          };
        case "F":
          // F is a 90-degree bend connecting south and east.
          return {
            coord: { x, y },
            south: true,
            east: true,
          };
        case ".":
          // . is ground; there is no pipe in this tile.
          return {
            coord: { x, y },
            ground: true,
          };
        case "S":
          // S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
          start = {
            coord: { x, y },
            north: true,
            south: true,
            east: true,
            west: true,
          };
          return start;
      }
    }),
  );

  return {
    grid,
    start,
  };
}

function neighbors(grid, node) {
  const r = [];
  const { x, y } = node.coord;
  const northTile = _.get(grid, [y - 1, x], {});
  const southTile = _.get(grid, [y + 1, x], {});
  const westTile = _.get(grid, [y, x - 1], {});
  const eastTile = _.get(grid, [y, x + 1], {});

  if (node.north && northTile.south) {
    r.push(northTile);
  }

  if (node.south && southTile.north) {
    r.push(southTile);
  }

  if (node.west && westTile.east) {
    r.push(westTile);
  }

  if (node.east && eastTile.west) {
    r.push(eastTile);
  }

  assert.equal(r.length, 2, "Could not find the proper number of neighbors");
  return r;
}

function step(grid, node, priorNode) {
  const [left, right] = neighbors(grid, node);
  return left === priorNode ? right : left;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  const { grid, start } = parsePipes(input);
  let priorLeft = start;
  let priorRight = start;
  let [left, right] = neighbors(grid, start);

  let ctr = 1;
  while (left !== right) {
    const oldLeft = left;
    const oldRight = right;

    left = step(grid, left, priorLeft);
    right = step(grid, right, priorRight);
    priorLeft = oldLeft;
    priorRight = oldRight;
    ++ctr;
  }

  return ctr;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
