import _ from "lodash";

function parseMap(input) {
  const turns = _.head(input);
  const graph = _(input)
    .drop(2)
    .map((line) => {
      const { node, L, R } =
        /^(?<node>[A-Z][A-Z][A-Z]) = \((?<L>[A-Z][A-Z][A-Z]), (?<R>[A-Z][A-Z][A-Z])\)$/.exec(
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

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  let map = parseMap(input);
  while (map.node !== "ZZZ") {
    map = next(map);
  }

  return map.step;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
