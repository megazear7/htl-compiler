const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');
const esmImport = require('esm')(module);
const Compiler = esmImport('../src/compiler.js').default;

fs.readdirSync(path.resolve(__dirname, `./tests`)).forEach(describeDir => {
  let describeConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'tests', describeDir, `config.json`), 'utf-8'));
  describe(describeConfig.describe, () => {
    fs.readdirSync(path.resolve(__dirname, 'tests', describeDir)).forEach(itDir => {
      if (itDir !== 'config.json') {
        let template = fs.readFileSync(path.resolve(__dirname, 'tests', describeDir, itDir, `template.html`), 'utf-8');
        let expected = fs.readFileSync(path.resolve(__dirname, 'tests', describeDir, itDir, 'expected.html'), 'utf-8');

        let itConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'tests', describeDir, itDir, 'config.json'), 'utf-8'));
        let resourceData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'tests', describeDir, itDir, `resource-data.json`), 'utf-8'));
        let useModels = { };
        if (fs.existsSync(path.resolve(__dirname, 'tests', describeDir, itDir, `use-models.json`))) {
          useModels = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'tests', describeDir, itDir, `use-models.json`), 'utf-8'));
        } else {
          useModels = require(path.resolve(__dirname, 'tests', describeDir, itDir, `use-models.js`)).default;
        }
        let resourceTypes = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'tests', describeDir, itDir, `resources.json`), 'utf-8'));

        it(itConfig.it, async () => {
          let result = await new Compiler(template, resourceData, useModels, resourceTypes).compile();
          assert.equal(result.replace(/\s{2,}/g,' ').replace(/\n/g,' ').trim(), expected.replace(/\s{2,}/g,' ').replace(/\n/g,' ').trim())
        });
      }
    });
  });
});
