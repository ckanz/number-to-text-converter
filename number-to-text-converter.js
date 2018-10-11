const below20s = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tenners = ['zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/**
 * Checks whether provided arguments are valid. Returns true if argument is valid, otherwise throws exception.
 * @param  {string} argument The provided argument.
 * @return {boolean} true if the argument passes all checks
 */
const argumentIsValid = argument => {
  if (!argument || isNaN(parseInt(argument))) {
    throw('Argument must be a number');
  }
  if (argument > 999999) {
    throw('Numbers larger than 999 are not supported yet');
  }
  return true;
}

/**
 * Takes any number below 20 and returns its written equivalent.
 * @param  {string} number The number to be turned into written form.
 * @return {string} The written number.
 */
const processNumberBelow20 = number => {
  return below20s[parseInt(number)];
}

/**
 * Takes any two-digit number and returns its written equivalent.
 * @param  {string} number The number to be turned into written form.
 * @return {string} The written number.
 */
const processDoubleDigitNumber = number => {
  if (parseInt(number) < 20) {
    return processNumberBelow20(number);
  }
  const digits = number.toString().split('');
  const firstHalf = digits[0] !== '0' ? tenners[digits[0]] : '';
  const secondHalf = digits[1] !== '0' ? ` ${processNumberBelow20(digits[1])}` : '';
  return `${firstHalf}${secondHalf}`;
}

/**
 * Takes any three-digit number and returns its written equivalent.
 * @param  {string} number The number to be turned into written form.
 * @return {string} The written number.
 */
const processTripleDigitNumber = number => {
  const digits = number.split('');
  const hundredText = digits[0] !== '0' ? `${processNumberBelow20(digits[0])} hundred ` : '';
  const ntyText = processDoubleDigitNumber(
    String(digits[1]+digits[2])
  );
  return `${hundredText}${ntyText}`;
}

/**
 * Takes a number between 1-3 digits long and returns its written equivalent.
 * @param  {string} number The number to be turned into written form.
 * @return {string} The written number.
 */
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

/**
 * Takes an array of strings containing written number representations and turns it into one readable string.
 * @param  {Array<string>} segmentStringArray An array of strings containing written representations of each three-digit segment of the currency value.
 * @return {string} The full written number.
 */
const processSegmentStringArray = segmentStringArray => {
  switch (segmentStringArray.length) {
    case 1:
      return segmentStringArray[0];
    case 2:
      const thousandString = segmentStringArray[0] && segmentStringArray[0] !== 'zero' ?`${segmentStringArray[0]} thousand ` : '';
      return `${thousandString}${segmentStringArray[1]}`;
    default:
      return '';
  }
}

/**
 * Takes a string and splits it into chunks of 3 digits starting from the back.
 * @param  {string} euroString The string to be split.
 * @return {Array} An array containing the split segments.
 */
const splitStringIntoThreeDigitSegments = euroString => {
  const threeDigitSegments = [];
  while (euroString) {
    threeDigitSegments.push(euroString.substring(euroString.length -3, euroString.length));
    euroString = euroString.substring(0, euroString.length - 3)
  }
  return threeDigitSegments.reverse();
}

/**
 * Takes a number and returns its written equivalent with a euro currency suffix.
 * @param  {number} euros The euro number to be processed.
 * @return {string} The written number and currency.
 */
const processEuros = euros => {
  const threeDigitSegments = splitStringIntoThreeDigitSegments(euros.toString());
  const segmentStringArray = threeDigitSegments.map(segmentString => processSegment(segmentString));
  const euroString = processSegmentStringArray(segmentStringArray);
  const euroSuffix = euroString !== 'one' ? 'euros' : 'euro';
  return `${euroString} ${euroSuffix}`;
}

/**
 * Takes a number and returns its written equivalent with a cents currency suffix.
 * @param  {number} cents The cents number to be processed.
 * @return {string} The written number and currency.
 */
const processCents = cents => {
  const centString = cents ? processDoubleDigitNumber(cents) : 'zero';
  const centSuffix = centString !== 'one' ? 'cents' : 'cent';
  return ` and ${centString || 'zero'} ${centSuffix}`;
}

/**
 * Takes a string representing cents behind the dot and converts them into a two-digit representation if necessary.
 * @param  {string} cents The cents number to be processed.
 * @return {string} The cents number in two-digit representation.
 */
const parseCentString = centString => {
  if (!centString) {
    return '00';
  }
  if (centString.length === 1) {
    return `${centString}0`;
  }
  return centString;
}

/**
 * Takes a string representing a currency value and splits euros and cents.
 * @param  {string} argument The currency value to be processed.
 * @return {object} An object containing the euro and cent value.
 */
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

  console.log(
    euroString[0].toUpperCase() +
    euroString.slice(1) +
    centString
  );
}
