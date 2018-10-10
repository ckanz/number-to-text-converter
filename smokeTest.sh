set -e

echo 'Running smoke test...'

echo "0.25 => \c" && node main.js 0.25
echo "1.5 => \c" && node main.js 1.5
echo "9.00 => \c" && node main.js 9.00
echo "09 => \c" && node main.js 09

echo "10.25 => \c" && node main.js 10.25
echo "15.25 => \c" && node main.js 15.25
echo "21.25 => \c" && node main.js 21.25
echo "57.25 => \c" && node main.js 57.25
echo "60.25 => \c" && node main.js 60.25
echo "98.25 => \c" && node main.js 98.25

echo "098.25 => \c" && node main.js 098.25
echo "111.25 => \c" && node main.js 111.25
echo "198.25 => \c" && node main.js 198.25
echo "398.25 => \c" && node main.js 398.25
echo "507.25 => \c" && node main.js 507.25
echo "999.25 => \c" && node main.js 999.25

echo "3098.25 => \c" && node main.js 3098.25
echo "5111.25 => \c" && node main.js 5111.25

echo "94198.25 => \c" && node main.js 94198.25
echo "00398.25 => \c" && node main.js 00398.25
echo "99999.25 => \c" && node main.js 99999.25

echo "123098.25 => \c" && node main.js 123098.25
echo "904198.25 => \c" && node main.js 904198.25
echo "000398.25 => \c" && node main.js 000398.25

echo '...no errors thrown, check result above.'
