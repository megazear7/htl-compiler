const fs = require('fs-extra');
const path = require('path');

const newTestNumber = fs.readdirSync(path.resolve(__dirname, `test/tests`))
.filter(name => name.startsWith('describe-'))
.map(name => name.split("describe-")[1])
.map(testNumber => parseInt(testNumber))
.reduce((a, b) => Math.max(a, b)) + 1;

const describeName = `describe-${newTestNumber}`;

fs.mkdirSync(path.resolve(__dirname, `test/tests`, describeName));

fs.writeFile(
  path.resolve(__dirname, 'test/tests', describeName, 'config.json'), `{
  "describe": "Example scenario"
}`,
  'utf-8'
);
