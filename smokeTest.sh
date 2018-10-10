set -e

echo 'Running smoke test...'

echo "0 => \c" && node main.js 0
echo "1 => \c" && node main.js 1
echo "9 => \c" && node main.js 9
echo "10 => \c" && node main.js 10
echo "21 => \c" && node main.js 21
echo "57 => \c" && node main.js 57
echo "98 => \c" && node main.js 98
echo "111 => \c" && node main.js 111
echo "198 => \c" && node main.js 198
echo "398 => \c" && node main.js 398
echo "999 => \c" && node main.js 999

echo '...no errors thrown, check result above.'
