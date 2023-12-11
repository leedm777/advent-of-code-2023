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
    ranges: _.sortBy(ranges, "fromMin"),
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

function findLocationAndSkip(seed, maps) {
  let type = "seed";
  let id = seed;
  // We've got to search large ranges of numbers, so we'll take advantage of
  // the fact that these ranges are _mostly_ linear. When we find a mapping,
  // we know the output will increase at least until the current range ends,
  // or a new range begins. Keep track of this so we can skip through the
  // ranges.
  let skip = Infinity;
  while (type !== "location") {
    const map = maps[type];
    type = map.to;
    for (let rangeIdx = 0; rangeIdx < map.ranges.length; ++rangeIdx) {
      const range = map.ranges[rangeIdx];

      if (range.fromMin <= id && id < range.fromMax) {
        skip = Math.min(skip, range.fromMax - id);
        id = id + range.delta;
        break;
      }

      if (id < range.fromMin) {
        skip = Math.min(skip, range.fromMin - id);
      }
    }
  }
  return { id, skip };
}

function findLocation(seed, maps) {
  const { id } = findLocationAndSkip(seed, maps);
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
  const { seeds: seedRanges, maps } = parseAlmanac(input);
  const seeds = _.chunk(seedRanges, 2);

  let minLocation = Infinity;
  for (const [seedMin, seedLen] of seeds) {
    for (let seed = seedMin; seed < seedMin + seedLen; ) {
      const { id: location, skip } = findLocationAndSkip(seed, maps);
      if (location < minLocation) {
        minLocation = location;
      }
      seed += skip;
    }
  }

  return minLocation;
}
