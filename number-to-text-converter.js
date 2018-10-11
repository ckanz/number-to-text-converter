const below20s = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fiveteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tenners = ['zero', 'ten', 'twenty', 'thirty', 'fourty', 'fivety', 'sixty', 'seventy', 'eighty', 'ninety'];

const argumentIsValid = argument => {
  if (!argument || isNaN(parseInt(argument))) {
    throw('Argument must be a number');
  }
  if (argument > 999999) {
    throw('Numbers larger than 999 are not supported yet');
  }
  return true;
}

const processNumberBelow20 = number => {
  return below20s[parseInt(number)];
}

const processDoubleDigitNumber = number => {
  if (parseInt(number) < 20) {
    return processNumberBelow20(number);
  }
  const digits = number.toString().split('');
  const firstHalf = digits[0] !== '0' ? tenners[digits[0]] : '';
  const secondHalf = digits[1] !== '0' ? `-${processNumberBelow20(digits[1])}` : '';
  return `${firstHalf}${secondHalf}`;
}

const processTripleDigitNumber = number => {
  const digits = number.split('');
  const hundredText = digits[0] !== '0' ? `${processNumberBelow20(digits[0])} hundred and ` : '';
  const ntyText = processDoubleDigitNumber(
    String(digits[1]+digits[2])
  );
  return `${hundredText}${ntyText}`;
}

const processSegment = segmentString => {
  switch (segmentString.split('').length) {
    case 1:
      return processNumberBelow20(segmentString);
    case 2:
      return processDoubleDigitNumber(segmentString);
    case 3:
      return processTripleDigitNumber(segmentString);
    default:
      return '';
  }
}

const processSegmentStringArray = segmentStringArray => {
  switch (segmentStringArray.length) {
    case 1:
      return segmentStringArray[0];
    case 2:
      const thousandString = segmentStringArray[0] && segmentStringArray[0] !== 'zero' ?`${segmentStringArray[0]} thousand and ` : '';
      return `${thousandString}${segmentStringArray[1]}`;
    default:
      return '';
  }
}

const splitStringIntoThreeDigitSegments = euroString => {
  const threeDigitSegments = [];
  while (euroString) {
    threeDigitSegments.push(euroString.substring(euroString.length -3, euroString.length));
    euroString = euroString.substring(0, euroString.length - 3)
  }
  return threeDigitSegments.reverse();
}

const processEuros = euros => {
  const threeDigitSegments = splitStringIntoThreeDigitSegments(euros.toString());
  const segmentStringArray = threeDigitSegments.map(segmentString => processSegment(segmentString));
  const euroString = processSegmentStringArray(segmentStringArray);
  const euroSuffix = euroString !== 'one' ? 'euros' : 'euro';
  return `${euroString} ${euroSuffix}`;
}

const processCents = cents => {
  const centString = cents ? processDoubleDigitNumber(cents) : 'zero';
  const centSuffix = centString !== 'one' ? 'cents' : 'cent';
  return ` and ${centString || 'zero'} ${centSuffix}`;
}

const parseCentString = centString => {
  if (!centString) {
    return '00';
  }
  if (centString.length === 1) {
    return `${centString}0`;
  }
  return centString;
}

const getEuroAndCentValue = argument => {
  const splitNumber = argument.toString().split('.');
  return {
    euros: parseInt(splitNumber[0]),
    cents: parseInt(parseCentString(splitNumber[1]))
  };
}

const argument = process.argv[2];

if (argumentIsValid(argument)) {
  const parsedCurrencyValue = getEuroAndCentValue(argument);
  const euroString = processEuros(parsedCurrencyValue.euros);
  const centString = processCents(parsedCurrencyValue.cents);
  console.log(euroString+centString);
}
