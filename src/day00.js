import _ from "lodash";
import assert from "assert";

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
          pos: _(next.dir)
            .map((x, idx) => pos[idx] + x * dist)
            .value(),
        };
      },
      { facing: "north", pos: [0, 0] },
    );
  return _(pos).map(Math.abs).sum();
}

export function part2(input) {
  return "TODO";
}
