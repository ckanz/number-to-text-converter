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

const processEuros = euros => {
  const threeDigitSegments = euros.toString().match(/.{1,3}/g);
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

const getEuroAndCentValue = argument => {
  const splitNumber = argument.toString().split('.');
  const euros = parseInt(splitNumber[0]);
  const cents = parseInt(splitNumber[1] ? `${splitNumber[1]}0` : '0');
  return { euros, cents };
}

const argument = process.argv[2];

if (argumentIsValid(argument)) {
  const parsedCurrencyValue = getEuroAndCentValue(argument);
  const euroString = processEuros(parsedCurrencyValue.euros);
  const centString = processCents(parsedCurrencyValue.cents);
  console.log(euroString+centString);
}
