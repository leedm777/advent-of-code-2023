import _ from "lodash";

export function part1(input) {
  return (
    _(input)
      .invokeMap("match", /[0-9]/g)
      // .map((str) => {
      //   return str.match(/[0-9]/g);
      // })
      .map((nums) => {
        const a = _.head(nums);
        const b = _.last(nums);
        return a + b;
      })
      .map((str) => _.parseInt(str, 10))
      .sum()
  );
}

export function parseNumbers(str) {
  const tokens = str.match(
    /[0-9]|one|two|three|four|five|six|seven|eight|nine/g,
  );
  return _.map(tokens, (token) => {
    switch (token) {
      case "one":
        return "1";
      case "two":
        return "2";
      case "three":
        return "3";
      case "four":
        return "4";
      case "five":
        return "5";
      case "six":
        return "6";
      case "seven":
        return "7";
      case "eight":
        return "8";
      case "nine":
        return "9";
      default:
        return token;
    }
  });
}

export function part2(input) {
  return _(input)
    .map(parseNumbers)
    .map((digits) => {
      const a = _.head(digits);
      const b = _.last(digits);
      return a + b;
    })
    .map((str) => _.parseInt(str, 10))
    .sum();
}
