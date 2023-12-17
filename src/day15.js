import _ from "lodash";

/**
 * @param {string} str String to hash
 @return {number} Hash value
 */
export function hash(str) {
  return _.reduce(
    str,
    (acc, ch) => {
      acc += ch.charCodeAt(0);
      acc *= 17;
      acc %= 256;

      return acc;
    },
    0,
  );
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part1([input]) {
  return _(input).split(",").map(hash).sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part2([input]) {
  const boxes = _.times(256, () => []);
  const cmds = _.split(input, ",");
  for (const cmd of cmds) {
    if (_.endsWith(cmd, "-")) {
      // Remove lens from box
      const labelToRemove = cmd.slice(0, -1);
      const idx = hash(labelToRemove);
      boxes[idx] = _.filter(boxes[idx], ({ label }) => label !== labelToRemove);
      continue;
    }

    // Possibly add lens
    const [labelToAdd, focalLengthStr] = _.split(cmd, "=");
    const focalLength = _.parseInt(focalLengthStr, 10);
    const boxIdx = hash(labelToAdd);
    const lens = _.find(boxes[boxIdx], ({ label }) => label === labelToAdd);
    if (lens) {
      // existing lens; replace it
      lens.focalLength = focalLength;
    } else {
      boxes[boxIdx] = [...boxes[boxIdx], { label: labelToAdd, focalLength }];
    }
  }

  return _(boxes)
    .map((box, boxIdx) => {
      return _(box)
        .map(
          ({ focalLength }, lensIdx) =>
            (boxIdx + 1) * (lensIdx + 1) * focalLength,
        )
        .sum();
    })
    .sum();
}
