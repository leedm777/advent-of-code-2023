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

function reverseString(str) {
  return _(str).split("").reverse().join("");
}

export function parseNumbers(str) {
  const firstNum = str.match(
    /[0-9]|one|two|three|four|five|six|seven|eight|nine/,
  )[0];

  // Find the last number. Double reverse the string so we handle overlaping
  // strings
  const lastNum = reverseString(
    reverseString(str).match(
      /[0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/,
    )[0],
  );

  return _.map([firstNum, lastNum], (token) => {
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
