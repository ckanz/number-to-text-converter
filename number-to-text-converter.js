const below20s = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fiveteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tenners = ['zero', 'ten', 'twenty', 'thirty', 'fourty', 'fivety', 'sixty', 'seventy', 'eighty', 'ninety'];

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
  return below20s[parseInt(number)];
}

const processDoubleDigitNumber = number => {
  const integerNumber = parseInt(number);
  if (integerNumber < 20) {
    return processSingleDigitNumber(number);
  }
  const digits = number.split('');
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

const processSegment = segmentString => {
  const digits = segmentString.split('');
  if (digits.length === 1) {
    return processSingleDigitNumber(segmentString);
  }
  if (digits.length === 2) {
    return processDoubleDigitNumber(segmentString);
  }
  if (digits.length === 3) {
    return processTripleDigitNumber(segmentString);
  }
}

const processTripleStringArray = segmentStringArray => {
  const length = segmentStringArray.length;
  if (length === 1) {
    return segmentStringArray[0];
  }
  if (length === 2) {
    const thousandString = segmentStringArray[0] && segmentStringArray[0] !== 'zero' ?`${segmentStringArray[0]} thousand and ` : '';
    return `${thousandString}${segmentStringArray[1]}`;
  }
}

const processEuros = euros => {
  const triples = euros.toString().match(/.{1,3}/g);
  const segmentStringArray = triples.map(segmentString => {
    return processSegment(segmentString);
  });
  return `${processTripleStringArray(segmentStringArray)} euros`;
}

const processCents = cents => {
  const centString = cents ? processDoubleDigitNumber(cents) : 'zero';
  return ` and ${centString || 'zero'} cents`; // TODO: should unexapected result default to 'zero cents'?
}

const argument = process.argv[2];

if (argumentIsValid(argument)) {
  const splitNumber = argument.split('.');
  const euros = splitNumber[0];
  const cents = splitNumber[1] && splitNumber[1].length === 1 ? splitNumber[1]+'0' : splitNumber[1]; // TODO: should be its own function
  const euroString = processEuros(euros);
  const centString = processCents(cents);
  console.log(euroString+centString);
}
