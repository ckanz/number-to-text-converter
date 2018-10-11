# number-to-text-converter

This repository contains a node script that turns numbers into their written equivalent.

### Execute Script

To run the script, run

`node number-to-text-converter.js 12.35` which outputs `twelve euros and thirty five cents`.

### Supported Numbers

Any number between 0 and 999,999 is supported. Numbers must not be split with commas.

Cents need to be separated with a “.” character. “.5” will be interpreted as “.50”. Any digit behind the first two cent digits are ignored.

### Test

No unit test framework has been used when developing this script. This repository contains a shell script that executes the node script with different inputs so that the output can be visually inspected. To run this script, run

`sh smokeTest.sh`
