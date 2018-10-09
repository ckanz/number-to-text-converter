const {
  below20s,
  doubleDigitsTens,
  doubleDigitsTwentyPlus
} = require('./number-text-strings');

const argumentIsValid = argument => {
  if (!argument || isNaN(argument)) {
    throw('Argument must be a number');
  }
  if (argument > 19) {
    throw('Numbers larger than 19 are not supported yet');
  }
  return true;
}

const processNumber = number => {
  if (argument < 20) {
    return below20s[argument];
  }
  return 'Failed to parse number :(';
}

const argument = process.argv[2];

if (argumentIsValid(argument)) {
  console.log(
    processNumber(argument)
  );
}



