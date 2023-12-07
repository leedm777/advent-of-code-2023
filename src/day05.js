import _ from "lodash";
import { splitArray } from "./aoc.js";
import assert from "assert";
import cliProgress from "cli-progress";

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

function findLocation(seed, maps) {
  let type = "seed";
  let id = seed;
  while (type !== "location") {
    const map = maps[type];
    type = map.to;
    const range = _.find(
      map.ranges,
      ({ fromMin, fromMax }) => fromMin <= id && id < fromMax,
    );
    if (range) {
      id = id + range.delta;
    }
  }
  return id;
}

function findLocations(seeds, maps) {
  return _.map(seeds, (seed) => findLocation(seed, maps));
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
  const bar1 = new cliProgress.SingleBar({
    format: "progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
    barsize: 20,
    etaBuffer: 1_000,
  });
  const { seeds: seedRanges, maps } = parseAlmanac(input);
  const seeds = _.chunk(seedRanges, 2);
  const totalLen = _(seeds).map(1).sum();
  bar1.start(totalLen, 0);

  let minLocation = Infinity;
  for (const [seedMin, seedLen] of seeds) {
    for (let seed = seedMin; seed < seedMin + seedLen; ++seed) {
      bar1.increment();
      const location = findLocation(seed, maps);
      if (location < minLocation) {
        minLocation = location;
      }
    }
  }
  bar1.stop();

  return minLocation;
}
