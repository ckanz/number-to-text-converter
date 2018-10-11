set -e

echo 'Running smoke test...'

echo ''
echo 'Testing cent strings'

echo "1.25 => \c" && node number-to-text-converter.js 1.25
echo "1.5 => \c" && node number-to-text-converter.js 1.5
echo "1.50 => \c" && node number-to-text-converter.js 1.50
echo "1.01 => \c" && node number-to-text-converter.js 1.01
echo "1 => \c" && node number-to-text-converter.js 1

echo ''
echo 'Testing euro strings'
echo "15 => \c" && node number-to-text-converter.js 15
echo "57 => \c" && node number-to-text-converter.js 57
echo "111 => \c" && node number-to-text-converter.js 111
echo "507 => \c" && node number-to-text-converter.js 507
echo "3098 => \c" && node number-to-text-converter.js 3098
echo "5111 => \c" && node number-to-text-converter.js 5111
echo "94198 => \c" && node number-to-text-converter.js 94198
echo "123098 => \c" && node number-to-text-converter.js 123098
echo "904198 => \c" && node number-to-text-converter.js 904198

echo ''
echo 'Testing handling of zeros'

echo "0.00 => \c" && node number-to-text-converter.js 0.00
echo "0000000.00 => \c" && node number-to-text-converter.js 0000000.00
echo "100005.05 => \c" && node number-to-text-converter.js 100005.05
echo "098.25 => \c" && node number-to-text-converter.js 098.25
echo "00398.25 => \c" && node number-to-text-converter.js 00398.25
echo "000398.25 => \c" && node number-to-text-converter.js 000398.25

echo ''
echo '...no errors thrown, check result above.'
