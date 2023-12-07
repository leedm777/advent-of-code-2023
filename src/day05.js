import _ from "lodash";
import { splitArray } from "./aoc.js";
import assert from "assert";

function parseMap(mapSection) {
  const [titleStr, ...rangeStrs] = mapSection;
  const { from, to } = /(?<from>[a-z]+)-to-(?<to>[a-z]+) map:/.exec(
    titleStr,
  ).groups;

  const ranges = _.map(rangeStrs, (rangeStr) => {
    const [dest, src, len] = _(rangeStr)
      .split(" ")
      .map((str) => _.parseInt(str, 10));

    return {
      fromMin: src,
      fromMax: src + len,
      delta: dest - src,
    };
  });

  return {
    from,
    to,
    ranges,
  };
}

function parseAlmanac(input) {
  const [[seedsLine], ...mapSections] = splitArray(input, (line) =>
    _.isEmpty(line),
  );

  const [seedsTitle, ...seedStrs] = _.split(seedsLine, " ");
  assert.strictEqual(seedsTitle, "seeds:", "Unexpected first line");
  const seeds = _.map(seedStrs, (str) => _.parseInt(str, 10));

  const maps = _(mapSections).map(parseMap).keyBy("from").value();

  return {
    seeds,
    maps,
  };
}

function findLocations(seeds, maps) {
  let type = "seed";
  let ids = seeds;
  while (type !== "location") {
    const map = maps[type];
    type = map.to;
    ids = _.map(ids, (id) => {
      const range = _.find(
        map.ranges,
        ({ fromMin, fromMax }) => fromMin <= id && id < fromMax,
      );
      if (range) {
        return id + range.delta;
      }

      return id;
    });
  }
  return ids;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {Number} Puzzle output
 */
export function part1(input) {
  const { seeds, maps } = parseAlmanac(input);
  const ids = findLocations(seeds, maps);

  return _.min(ids);
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
