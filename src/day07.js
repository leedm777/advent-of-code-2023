import _ from "lodash";

function parseHand(line) {
  const [cardsStr, bid] = _.split(line, " ");
  const cards = _.map(cardsStr, (ch) => {
    switch (ch) {
      case "A":
        return 14;
      case "K":
        return 13;
      case "Q":
        return 12;
      case "J":
        return 11;
      case "T":
        return 10;
      default:
        return _.parseInt(ch, 10);
    }
  });

  const counts = _.countBy(cards);

  const scoreByType = {
    highCard: 0,
    onePair: 1,
    twoPair: 2,
    threeOfAKind: 3,
    fullHouse: 4,
    fourOfAKind: 5,
    fiveOfAKind: 6,
  };

  const type = (() => {
    switch (_.size(counts)) {
      case 5:
        return "highCard";
      case 4:
        return "onePair";
      case 3:
        if (_(counts).values().includes(3)) {
          return "threeOfAKind";
        }
        return "twoPair";
      case 2:
        if (_(counts).values().includes(3)) {
          return "fullHouse";
        }
        return "fourOfAKind";
      case 1:
        return "fiveOfAKind";
    }
  })();

  const score =
    (scoreByType[type] << (5 * 4)) |
    (cards[0] << (4 * 4)) |
    (cards[1] << (3 * 4)) |
    (cards[2] << (2 * 4)) |
    (cards[3] << (1 * 4)) |
    (cards[4] << (0 * 4));

  return { cards, bid, type, score };
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {Number} Puzzle output
 */
export function part1(input) {
  const hands = _.map(input, parseHand);
  return _(hands)
    .sortBy("score")
    .map(({ bid }, idx) => {
      const rank = idx + 1;
      return bid * rank;
    })
    .sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
