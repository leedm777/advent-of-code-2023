import _ from "lodash";
import * as aoc from "./aoc.js";

function parseMap(input) {
  const turns = _.head(input);
  const graph = _(input)
    .drop(2)
    .map((line) => {
      const { node, L, R } =
        /^(?<node>..[A-Z]) = \((?<L>..[A-Z]), (?<R>..[A-Z])\)$/.exec(
          line,
        ).groups;

      return {
        node,
        L,
        R,
      };
    })
    .keyBy("node")
    .value();

  return {
    node: "AAA",
    step: 0,
    turns,
    graph,
  };
}

function next({ node, step, turns, graph }) {
  const turn = turns[step % turns.length];

  return {
    node: graph[node][turn],
    step: step + 1,
    turns,
    graph,
  };
}

function find(map, fn) {
  while (!fn(map)) {
    map = next(map);
  }
  return map;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  const map = parseMap(input);
  const end = find(map, (m) => m.node === "ZZZ");
  return end.step;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  const map = parseMap(input);
  const startNodes = _(map.graph)
    .keys()
    .filter((n) => _.endsWith(n, "A"))
    .value();
  const maps = _.map(startNodes, (node) => ({
    ...map,
    node,
  }));

  const distances = _(maps)
    .map((map) => find(map, (m) => _.endsWith(m.node, "Z")))
    .map("step")
    .value();

  return aoc.lcm(...distances);
}
