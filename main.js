const {
  below20s,
  tenners
} = require('./number-text-strings');

const argumentIsValid = argument => {
  if (!argument || isNaN(argument)) {
    throw('Argument must be a number');
  }
  if (argument > 999999) {
    throw('Numbers larger than 999 are not supported yet');
  }
  return true;
}

const processSingleDigitNumber = number => {
  return below20s[number];
}

const processDoubleDigitNumber = number => {
  const digits = number.split('');
  const integerNumber = parseInt(number);
  if (integerNumber < 20) {
    return processSingleDigitNumber(integerNumber);
  }
  const firstHalf = digits[0] !== '0' ? tenners[digits[0]] : '';
  const secondHalf = digits[1] !== '0' ? `-${processSingleDigitNumber(digits[1])}` : '';
  return `${firstHalf}${secondHalf}`;
}

const processTripleDigitNumber = number => {
  const digits = number.split('');
  const hundredText = digits[0] !== '0' ? `${processSingleDigitNumber(digits[0])} hundred and ` : '';
  const ntyText = processDoubleDigitNumber(
    String(digits[1]+digits[2])
  );
  return `${hundredText}${ntyText}`;
}

const processTriples = tripleString => {
  const digits = tripleString.split('');
  if (digits.length === 1) {
    return processSingleDigitNumber(tripleString);
  }
  if (digits.length === 2) {
    return processDoubleDigitNumber(tripleString);
  }
  if (digits.length === 3) {
    return processTripleDigitNumber(tripleString);
  }
}

const processNumber = number => {
  const triples = number.toString().match(/.{1,3}/g);
  const tripleStringArray = triples.map(tripleString => {
    return processTriples(tripleString);
  });
  return tripleStringArray;
}

const argument = process.argv[2];

if (argumentIsValid(argument)) {
  console.log(
    processNumber(argument)
  );
}
