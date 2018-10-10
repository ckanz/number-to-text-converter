const {
  below20s,
  tenners
} = require('./number-text-strings');

const argumentIsValid = argument => {
  if (!argument || isNaN(argument)) {
    throw('Argument must be a number');
  }
  if (argument > 999) {
    throw('Numbers larger than 999 are not supported yet');
  }
  return true;
}

const processSingleDigitNumber = number => {
  return below20s[number];
}

const processDoubleDigitNumber = number => {
  const digits = number.split('');
  if (number < 20) {
    return processSingleDigitNumber(number);
  }
  return `${tenners[digits[0]]}-${processSingleDigitNumber(digits[1])}`;
}

const processNumber = number => {
  const digits = number.split('');
  if (digits.length === 1) {
    return processSingleDigitNumber(number);
  }
  if (digits.length === 2) {
    return processDoubleDigitNumber(number);
  }
  if (digits.length === 3) {
    return `${processSingleDigitNumber(digits[0])} hundred and ${processDoubleDigitNumber(digits[1]+digits[2])}`;
  }
  return 'Failed to parse number :(';
}

const argument = process.argv[2];

if (argumentIsValid(argument)) {
  console.log(
    processNumber(argument)
  );
}
