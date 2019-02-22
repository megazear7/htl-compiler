const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');
const esmImport = require('esm')(module);
const Compiler = esmImport('../src/compiler.js').default;

fs.readdirSync(path.resolve(__dirname, `./cases`)).forEach(async test => {
  let fileName = test.split('.')[0];
  let exampleHtml = fs.readFileSync(path.resolve(__dirname, `./cases/${fileName}.html`), 'utf-8');
  let resourceData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./resource-data/${fileName}.json`), 'utf-8'));
  let useModels = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./use-models/${fileName}.json`), 'utf-8'));
  let resourceTypes = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./resources/${fileName}.json`), 'utf-8'));

  Object.keys(resourceTypes).forEach(key => {
    let templateFileName = resourceTypes[key];
    resourceTypes[key] = fs.readFileSync(path.resolve(__dirname, `./templates/${templateFileName}`), 'utf-8');
  });

  let output = (new Compiler(exampleHtml, resourceData, useModels, resourceTypes)).compile();
  let expected = fs.readFileSync(path.resolve(__dirname, `./expected/${fileName}.html`), 'utf-8');

  // TODO we need test configurations instead of just the cases/test-#.html in order to provide mocha with better descriptions of tests.
  describe('Each test case', () => {
    it('should match the expected output', () => {
      assert.equal(output, expected);
    });
  });
});
