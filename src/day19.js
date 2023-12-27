import _ from "lodash";
import * as aoc from "./aoc.js";

function parseInstructions(instructions) {
  return _(instructions)
    .map((line) => {
      const { label, txt } = /^(?<label>[a-z]+)\{(?<txt>.*)\}$/.exec(
        line,
      ).groups;

      const steps = _(txt)
        .split(",")
        .map((condition) => {
          if (condition.match(/^[a-zAR]+$/)) {
            return { goto: condition };
          }

          const decode =
            /^(?<cat>[xmas])(?<cmp>[<>])(?<val>[0-9]+):(?<lbl>[a-zAR]+)/.exec(
              condition,
            );
          const { cat, cmp, val, lbl } = decode.groups;

          return { cat, cmp, val: _.parseInt(val, 10), lbl };
        })
        .value();

      return { label, steps };
    })
    .keyBy("label")
    .value();
}

function parsePart(str) {
  const { x, m, a, s } =
    /^\{x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)\}$/.exec(str).groups;

  return {
    x: _.parseInt(x, 10),
    m: _.parseInt(m, 10),
    a: _.parseInt(a, 10),
    s: _.parseInt(s, 10),
  };
}

function processPart(workflows, part) {
  let pc = "in";

  while (pc !== "R" && pc !== "A") {
    const workflow = workflows[pc];
    for (const step of workflow.steps) {
      if (step.goto) {
        pc = step.goto;
        break;
      } else {
        const { cat, cmp, val, lbl } = step;
        const v = part[cat];
        const f = cmp === "<" ? _.lt : _.gt;
        const b = f(v, val);
        if (b) {
          pc = lbl;
          break;
        }
      }
    }
  }

  return pc === "A";
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part1(input) {
  const [instructions, parts] = aoc.splitArray(input, _.isEmpty);
  const workflows = parseInstructions(instructions);

  return _(parts)
    .map(parsePart)
    .filter((part) => processPart(workflows, part))
    .map(({ x, m, a, s }) => x + m + a + s)
    .sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
