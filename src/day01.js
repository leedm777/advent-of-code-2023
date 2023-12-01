import _ from "lodash";

export function part1(input) {
  return _(input)
    .map((str) => {
      return _.filter(str, (c) => c.match(/[0-9]/));
    })
    .map((str) => {
      const a = _.head(str);
      const b = _.last(str);
      return a + b;
    })
    .map((str) => _.parseInt(str, 10))
    .sum();
}

export function part2(input) {
  return "TODO";
}
