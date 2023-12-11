import _ from "lodash";
import assert from "assert";

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

function parseHandJokersWild(line) {
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
        return 0; // jokers wild
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
    switch (_.get(counts, 0, 0)) {
      case 5:
      case 4:
        // 4 or 5 jokers are 5 of a kind
        return "fiveOfAKind";
      case 3:
        // 3 jokers can be 4 or 5 of a kind
        switch (_.size(counts)) {
          case 3:
            return "fourOfAKind";
          case 2:
            return "fiveOfAKind";
        }
        assert.fail(`Invalid hand ${cardsStr}`);
        break;
      case 2:
        // 2 jokers can be 3, 4 or 5 of a kind
        switch (_.size(counts)) {
          case 4:
            return "threeOfAKind";
          case 3:
            return "fourOfAKind";
          case 2:
            return "fiveOfAKind";
        }
        assert.fail(`Invalid hand ${cardsStr}`);
        break;
      case 1:
        // Single joker
        //   J3T3T --> Full House
        switch (_.size(counts)) {
          case 5:
            return "onePair";
          case 4:
            return "threeOfAKind";
          case 3:
            if (_.includes(counts, 2)) {
              return "fullHouse";
            }
            return "fourOfAKind";
          case 2:
            return "fiveOfAKind";
        }
        assert.fail(`Invalid hand ${cardsStr}`);
        break;
      case 0:
        // No jokers, default rule
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
        assert.fail(`Invalid hand ${cardsStr}`);
        break;
    }
  })();

  if (!type) {
    assert.fail(`Invalid hand ${cardsStr}`);
  }

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
 * @return {string} Puzzle output
 */
export function part2(input) {
  const hands = _.map(input, parseHandJokersWild);
  return _(hands)
    .sortBy("score")
    .map(({ bid }, idx) => {
      const rank = idx + 1;
      return bid * rank;
    })
    .sum();
}
