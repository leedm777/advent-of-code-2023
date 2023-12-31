import _ from "lodash";
import { readInput } from "./aoc.js";
import { Command } from "commander";

const program = new Command();

program
  .name("advent-of-code-2023")
  .description("AoC 2023 Solutions")
  .option(
    "--only <days>",
    "Comma seperated list of days to run",
    (opt) =>
      _(opt)
        .split(",")
        .map((s) => parseInt(s, 10))
        .value(),
    _.range(1, 26),
  );

async function main(argv) {
  program.parse(argv);
  const { only } = program.opts();

  return _.reduce(
    only,
    async (prior, day) => {
      await prior;

      try {
        const dayStr = _.padStart(day.toString(10), 2, "0");
        const puzzleInput = readInput(`./src/day${dayStr}.txt`);
        // https://github.com/mysticatea/eslint-plugin-node/issues/250
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const solver = await import(`./day${dayStr}.js`);

        console.log(`Day ${day}:`);

        const begin1 = process.hrtime.bigint();
        const soln1 = solver.part1(puzzleInput);
        const millis1 = (process.hrtime.bigint() - begin1) / 1000000n;
        console.log(
          `  part1: ${JSON.stringify(soln1, null, 2)} (${millis1} ms)`,
        );

        const begin2 = process.hrtime.bigint();
        const soln2 = solver.part2(puzzleInput);
        const millis2 = (process.hrtime.bigint() - begin2) / 1000000n;
        console.log(
          `  part2: ${JSON.stringify(soln2, null, 2)} (${millis2} ms)`,
        );
      } catch (err) {
        // ENOENT means the input file is missing; skip
        if (err.code === "ENOENT") {
          return;
        }
        throw err;
      }
    },
    Promise.resolve(),
  );
}

main(process.argv).catch((err) =>
  process.nextTick(() => {
    throw err;
  }),
);
