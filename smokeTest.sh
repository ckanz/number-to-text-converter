set -e

echo 'Running smoke test...'

echo "0 => \c" && node main.js 0
echo "1 => \c" && node main.js 1
echo "9 => \c" && node main.js 9
echo "09 => \c" && node main.js 09

echo "10 => \c" && node main.js 10
echo "15 => \c" && node main.js 15
echo "21 => \c" && node main.js 21
echo "57 => \c" && node main.js 57
echo "60 => \c" && node main.js 60
echo "98 => \c" && node main.js 98

echo "098 => \c" && node main.js 098
echo "111 => \c" && node main.js 111
echo "198 => \c" && node main.js 198
echo "398 => \c" && node main.js 398
echo "507 => \c" && node main.js 507
echo "999 => \c" && node main.js 999

echo "3098 => \c" && node main.js 3098
echo "5111 => \c" && node main.js 5111

echo "94198 => \c" && node main.js 94198
echo "00398 => \c" && node main.js 00398
echo "99999 => \c" && node main.js 99999

echo "123098 => \c" && node main.js 123098
echo "904198 => \c" && node main.js 904198
echo "000398 => \c" && node main.js 000398

echo '...no errors thrown, check result above.'
