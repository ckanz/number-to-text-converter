const {
  singleDigits,
  doubleDigitsTens,
  doubleDigitsTwentyPlus
} = require('./number-text-strings');

const argument = process.argv[2];

if (!argument || isNaN(argument)) {
  throw('Argument must be a number');
}
if (argument.length > 1) {
  throw('Numbers with more than 1 digit are not supported yet');
}

console.log(singleDigits[argument]);
