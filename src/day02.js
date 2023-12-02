import _ from "lodash";

function parseRound(round) {
  return _(round)
    .split(", ")
    .map((pull) => {
      const [num, color] = _.split(pull, " ");
      return {
        num: _.parseInt(num, 10),
        color,
      };
    })
    .keyBy("color")
    .mapValues("num")
    .value();
}

function parseGame(game) {
  return _.split(game, "; ");
}

function parseLine(line) {
  const { gameId, game } = /^Game (?<gameId>[0-9]+): (?<game>.*)$/.exec(
    line,
  ).groups;
  return {
    gameId: _.parseInt(gameId, 10),
    rounds: _(game).thru(parseGame).map(parseRound).value(),
  };
}

export function part1(input) {
  const mustHave = { red: 12, green: 13, blue: 14 };
  return _(input)
    .map(parseLine)
    .filter((game) => {
      return !_.some(game.rounds, (round) => {
        return (
          round.blue > mustHave.blue ||
          round.green > mustHave.green ||
          round.red > mustHave.red
        );
      });
    })
    .map("gameId")
    .sum();
}

export function part2(input) {
  return _(input)
    .map(parseLine)
    .map((game) => {
      return _.reduce(
        game.rounds,
        (acc, { red = 0, green = 0, blue = 0 }) => {
          return {
            red: Math.max(red, acc.red),
            green: Math.max(green, acc.green),
            blue: Math.max(blue, acc.blue),
          };
        },
        {
          red: 0,
          green: 0,
          blue: 0,
        },
      );
    })
    .map(({ red, green, blue }) => red * green * blue)
    .sum();
}
