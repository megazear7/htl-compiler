const fs = require('fs-extra');
const path = require('path');
const esmImport = require('esm')(module);
const Compiler = esmImport('../src/compiler.js').default;

async function main() {
  fs.readdir(path.resolve(__dirname, `./cases`), async (err, tests) => {
    await tests.forEach(async test => {
      let fileName = test.split('.')[0];
      let exampleHtml = await fs.readFile(path.resolve(__dirname, `./cases/${fileName}.html`), 'utf-8');
      let resourceData = JSON.parse(await fs.readFile(path.resolve(__dirname, `./resource-data/${fileName}.json`), 'utf-8'));
      let useModels = JSON.parse(await fs.readFile(path.resolve(__dirname, `./use-models/${fileName}.json`), 'utf-8'));
      let resourceTypes = JSON.parse(await fs.readFile(path.resolve(__dirname, `./resources/${fileName}.json`), 'utf-8'));

      await Object.keys(resourceTypes).forEach(async (key) => {
        let templateFileName = resourceTypes[key];
        resourceTypes[key] = await fs.readFile(path.resolve(__dirname, `./templates/${templateFileName}`), 'utf-8');
      });

      console.log((new Compiler(exampleHtml, resourceData, useModels, resourceTypes)).compile());
    });
  });
}

main();
