const {
  below20s,
  tenners
} = require('./number-text-strings');

const argumentIsValid = argument => {
  if (!argument || isNaN(argument)) {
    throw('Argument must be a number');
  }
  if (argument > 99) {
    throw('Numbers larger than 99 are not supported yet');
  }
  return true;
}

const processNumber = number => {
  if (argument < 20) {
    return below20s[argument];
  }
  if (argument <= 99) {
    const firstNum = parseInt(argument.toString()[0]);
    const secNum = parseInt(argument.toString()[1]);
    return `${tenners[firstNum]}-${below20s[secNum]}`;
  }
  return 'Failed to parse number :(';
}

const argument = process.argv[2];

if (argumentIsValid(argument)) {
  console.log(
    processNumber(argument)
  );
}



