import _ from "lodash";

const FLIP_FLOP = "%";
const CONJUNCTION = "&";
const BROADCASTER = "b";

const LOW = "low";
const HIGH = "high";

function parseModule(line) {
  let { type, label, outStr } =
    /^(?<type>[b%&])(?<label>[a-z]+) -> (?<outStr>.*)$/.exec(line).groups;

  if (type === "b") {
    label = "broadcaster";
  }

  const out = _.split(outStr, ", ");

  switch (type) {
    case FLIP_FLOP:
      return { type, label, out, on: false };
    case CONJUNCTION:
      return { type, label, out };
    case BROADCASTER:
      return { type, label: "broadcaster", out };
  }

  return { type, label, out };
}

function connectConjuctions(modules) {
  const conjuctions = _.filter(modules, ({ type }) => type === CONJUNCTION);
  for (const conjuction of conjuctions) {
    const inputs = _.filter(modules, ({ out }) =>
      _.includes(out, conjuction.label),
    );
    conjuction.in = _(inputs)
      .map(({ label }) => ({ label, state: LOW }))
      .keyBy("label")
      .mapValues("state")
      .value();
  }
}

function pushButton(modules) {
  const ctr = {
    high: 0,
    low: 0,
  };
  const signals = [{ dest: "broadcaster", sig: LOW, from: "button" }];
  while (!_.isEmpty(signals)) {
    const { dest, sig, from } = signals.shift();
    ++ctr[sig];
    const module = modules[dest];

    switch (module?.type) {
      case BROADCASTER:
        // When it receives a pulse, it sends the same pulse to all of its
        // destination modules.
        for (const dest of module.out) {
          signals.push({ dest, sig, from: module.label });
        }
        break;
      case FLIP_FLOP:
        // If a flip-flop module receives a high pulse, it is ignored and
        // nothing happens. However, if a flip-flop module receives a low
        // pulse, it flips between on and off. If it was off, it turns on and
        // sends a high pulse. If it was on, it turns off and sends a low
        // pulse.
        if (sig === LOW) {
          module.on = !module.on;
          for (const dest of module.out) {
            signals.push({
              dest,
              sig: module.on ? HIGH : LOW,
              from: module.label,
            });
          }
        }
        break;
      case CONJUNCTION: {
        // When a pulse is received, the conjunction module first updates its
        // memory for that input. Then, if it remembers high pulses for all
        // inputs, it sends a low pulse; otherwise, it sends a high pulse.
        module.in[from] = sig;
        for (const dest of module.out) {
          signals.push({
            dest,
            sig: _.every(module.in, (inSig) => inSig === HIGH) ? LOW : HIGH,
            from: module.label,
          });
        }
        break;
      }
    }
  }

  return ctr;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part1(input) {
  const modules = _(input).map(parseModule).keyBy("label").value();
  connectConjuctions(modules);

  let totalHigh = 0;
  let totalLow = 0;
  for (let i = 0; i < 1000; ++i) {
    const { high, low } = pushButton(modules);
    totalHigh += high;
    totalLow += low;
  }

  return totalHigh * totalLow;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
