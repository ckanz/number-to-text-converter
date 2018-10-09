set -e

echo 'Node version:'
node -v
echo '-------------------'

node main.js 0
node main.js 1
node main.js 9
node main.js 10
node main.js 21
node main.js 57
node main.js 98

echo '...no errors thrown, smoke-test passed.'