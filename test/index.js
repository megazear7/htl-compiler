const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');
const esmImport = require('esm')(module);
const Compiler = esmImport('../src/compiler.js').default;

describe('Each test case', () => {
  fs.readdirSync(path.resolve(__dirname, `./cases`)).forEach(async testName => {
    let fileName = testName.split('.')[0];
    let test = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./cases/${fileName}.json`), 'utf-8'));
    let template = fs.readFileSync(path.resolve(__dirname, `./templates/${test.template}`), 'utf-8');
    let resourceData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./resource-data/${fileName}.json`), 'utf-8'));
    let useModels = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./use-models/${fileName}.json`), 'utf-8'));
    let resourceTypes = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./resources/${fileName}.json`), 'utf-8'));

    Object.keys(resourceTypes).forEach(key => {
      let templateFileName = resourceTypes[key];
      resourceTypes[key] = fs.readFileSync(path.resolve(__dirname, `./templates/${templateFileName}`), 'utf-8');
    });

    let output = (new Compiler(template, resourceData, useModels, resourceTypes)).compile();
    let expected = fs.readFileSync(path.resolve(__dirname, `./expected/${fileName}.html`), 'utf-8');

    it(test.it, () => {
      assert.equal(output.trim(), expected.trim());
    });
  });
});
