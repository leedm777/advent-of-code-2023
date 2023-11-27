import _ from "lodash";
import assert from "assert";
import * as aoc from "./aoc.js";

// Old puzzle for practice
// https://adventofcode.com/2016/day/1

const nextMap = {
  north: {
    R: { facing: "east", dir: [1, 0] },
    L: { facing: "west", dir: [-1, 0] },
  },
  south: {
    R: { facing: "west", dir: [-1, 0] },
    L: { facing: "east", dir: [1, 0] },
  },
  west: {
    R: { facing: "north", dir: [0, 1] },
    L: { facing: "south", dir: [0, -1] },
  },
  east: {
    R: { facing: "south", dir: [0, -1] },
    L: { facing: "north", dir: [0, 1] },
  },
};

export function part1(input) {
  const { pos } = _(input)
    .split(", ")
    .map((elem) => {
      const m = elem.match(/^([RL])([0-9]*)$/);
      assert(m, `Invalid direction ${elem}`);
      return {
        dir: m[1],
        dist: Number.parseInt(m[2], 10),
      };
    })
    .reduce(
      ({ facing, pos }, { dir, dist }) => {
        const next = nextMap[facing][dir];
        assert(next, `Invalid facing (${facing}) or dir (${dir})`);
        return {
          facing: next.facing,
          pos: _.map(next.dir, (x, idx) => pos[idx] + x * dist),
        };
      },
      { facing: "north", pos: [0, 0] },
    );
  return _(pos).map(Math.abs).sum();
}

export function part2(input) {
  const parsed = _(input)
    .split(", ")
    .map((elem) => {
      const m = elem.match(/^([RL])([0-9]*)$/);
      assert(m, `Invalid direction ${elem}`);
      return {
        dir: m[1],
        dist: Number.parseInt(m[2], 10),
      };
    })
    .value();

  let facing = "north";
  let pos = [0, 0];
  const visited = [pos.join(",")];
  for (const { dir, dist } of parsed) {
    const next = nextMap[facing][dir];
    for (let x = 0; x < dist; ++x) {
      pos = aoc.movePos(pos, next.dir);
      if (_.includes(visited, pos.join(","))) {
        return _(pos).map(Math.abs).sum();
      }
      visited.push(pos.join(","));
    }
    facing = next.facing;
  }

  return -1;
}
