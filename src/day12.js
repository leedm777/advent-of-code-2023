import _ from "lodash";
import assert from "assert";

const DAMAGED = "#";
const GOOD = ".";
const UNKNOWN = "?";

function parseRecord(line) {
  // console.log(line);
  const [conditionStr, damagedGroupsStr] = _.split(line, " ");
  const condition = _.map(conditionStr);
  // Logic is simpler if we end on a good spring
  if (_.last(condition) !== GOOD) {
    condition.push(GOOD);
  }
  const damagedGroups = _(damagedGroupsStr)
    .split(",")
    .map((s) => _.parseInt(s, 10))
    .value();
  const totalDamaged = _.sum(damagedGroups);
  const knownDamaged = _(condition)
    .filter((ch) => ch === DAMAGED)
    .size();
  const totalUnknown = _(condition)
    .filter((ch) => ch === UNKNOWN)
    .size();
  return {
    condition,
    damagedGroups,
    totalDamaged,
    knownDamaged,
    totalUnknown,
    conditionIdx: 0,
    ch: condition[0],
    damagedGroupIdx: 0,
    damagedCtr: 0,
  };
}

function countArrangements(record) {
  const {
    condition,
    damagedGroups,
    totalDamaged,
    knownDamaged,
    totalUnknown,
    conditionIdx,
    ch,
    damagedGroupIdx,
    damagedCtr,
  } = record;
  // console.log(`[${conditionIdx}] = ${ch}`);
  // met the end of both lists; found a working arrangement
  if (
    conditionIdx === condition.length &&
    damagedGroupIdx === damagedGroups.length
  ) {
    // console.log("  SUCCESS");
    return 1;
  }

  // if there's more damaged springs than we're supposed to have, then bail
  if (knownDamaged > totalDamaged) {
    // console.log("  Too much damage");
    return 0;
  }

  // if there's not enough damaged springs, then bail
  if (knownDamaged + totalUnknown < totalDamaged) {
    // console.log("  Too little damage");
    return 0;
  }

  // if unknown, try both good and damaged
  if (ch === UNKNOWN) {
    const goodCount = countArrangements({
      ...record,
      ch: GOOD,
      totalUnknown: totalUnknown - 1,
    });
    const damagedCount = countArrangements({
      ...record,
      ch: DAMAGED,
      knownDamaged: knownDamaged + 1,
      totalUnknown: totalUnknown - 1,
    });

    return goodCount + damagedCount;
  }

  // if damaged, bump the counter
  if (ch === DAMAGED) {
    // if we've already seen too much damage, then bail
    if (damagedCtr >= damagedGroups[damagedGroupIdx]) {
      // console.log(`  Too much damage for group ${damagedGroupIdx}`);
      return 0;
    }

    return countArrangements({
      ...record,
      damagedCtr: damagedCtr + 1,
      ch: condition[conditionIdx + 1],
      conditionIdx: conditionIdx + 1,
    });
  }

  // if good, then check the damage counter
  if (ch === GOOD) {
    // if we're not tracking any damage, keep looking
    if (damagedCtr === 0) {
      return countArrangements({
        ...record,
        ch: condition[conditionIdx + 1],
        conditionIdx: conditionIdx + 1,
      });
    }

    // if damage does not match, bail
    if (damagedCtr !== damagedGroups[damagedGroupIdx]) {
      // console.log(`  Wrong damage (${damagedCtr})for group ${damagedGroupIdx}`);
      return 0;
    }

    // good match; keep looking
    return countArrangements({
      ...record,
      ch: condition[conditionIdx + 1],
      conditionIdx: conditionIdx + 1,
      damagedCtr: 0,
      damagedGroupIdx: damagedGroupIdx + 1,
    });
  }

  assert.fail(`Unexpected spring ${ch}`);
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  return _(input).map(parseRecord).map(countArrangements).sum();
}

function fiveX(line) {
  const [conditionStr, damagedGroupsStr] = _.split(line, " ");
  const fiveCondition = _(5).range().map(_.constant(conditionStr)).join("?");
  const fiveDamagedGroupsStr = _(5)
    .range()
    .map(_.constant(damagedGroupsStr))
    .join(",");
  return `${fiveCondition} ${fiveDamagedGroupsStr}`;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part2(input) {
  return _(input).map(fiveX).map(parseRecord).map(countArrangements).sum();
}
