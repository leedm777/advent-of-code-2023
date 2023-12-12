import _ from "lodash";

function parseStarChart(input) {
  const galaxies = [];
  _.forEach(input, (row, y) => {
    _.forEach(row, (ch, x) => {
      if (ch === "#") {
        galaxies.push({ x, y });
      }
    });
  });
  const maxY = _.size(input);
  const maxX = _.size(input[0]);
  const emptyRows = [];
  const emptyColumns = [];

  const nonEmptyRows = _(galaxies).map("y").uniq().value();
  const nonEmptyColumns = _(galaxies).map("x").uniq().value();
  for (let y = 0; y < maxY; ++y) {
    if (!_.includes(nonEmptyRows, y)) {
      emptyRows.push(y);
    }
  }

  for (let x = 0; x < maxX; ++x) {
    if (!_.includes(nonEmptyColumns, x)) {
      emptyColumns.push(x);
    }
  }

  return {
    galaxies,
    // maxX,
    // maxY,
    emptyRows,
    emptyColumns,
  };
}

function computeTotalDistance(starChart, expansion = 2) {
  const { galaxies, emptyRows, emptyColumns } = starChart;
  let totalDistance = 0;
  for (let i = 0; i < _.size(galaxies); ++i) {
    const g1 = galaxies[i];
    for (let j = i + 1; j < _.size(galaxies); ++j) {
      const g2 = galaxies[j];
      let distance = 0;
      for (let x = Math.min(g1.x, g2.x); x < Math.max(g1.x, g2.x); ++x) {
        if (_.includes(emptyColumns, x)) {
          distance += expansion;
        } else {
          ++distance;
        }
      }
      for (let y = Math.min(g1.y, g2.y); y < Math.max(g1.y, g2.y); ++y) {
        if (_.includes(emptyRows, y)) {
          distance += expansion;
        } else {
          ++distance;
        }
      }

      totalDistance += distance;
    }
  }

  return totalDistance;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  const starChart = parseStarChart(input);
  return computeTotalDistance(starChart);
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input, expansion = 1_000_000) {
  const starChart = parseStarChart(input);
  return computeTotalDistance(starChart, expansion);
}
