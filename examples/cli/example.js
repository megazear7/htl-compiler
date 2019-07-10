const fs = require('fs-extra');
const path = require('path');
const esmImport = require('esm')(module);
const Compiler = esmImport('../../src/compiler.js').default;

async function main() {
  let exampleHtml = await fs.readFile(path.resolve(__dirname, './example.html'), 'utf-8');
  let resourceData = JSON.parse(await fs.readFile(path.resolve(__dirname, './resource-data.json'), 'utf-8'));
  let useModels = JSON.parse(await fs.readFile(path.resolve(__dirname, './use-models.json'), 'utf-8'));
  let fooResourceHtml = await fs.readFile(path.resolve(__dirname, './foo-resource.html'), 'utf-8');
  let resourceTypes = { "foo": fooResourceHtml };

  console.log((new Compiler(exampleHtml, resourceData, useModels, resourceTypes)).compile());
}

main();
