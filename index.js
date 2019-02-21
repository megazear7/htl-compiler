const fs = require('fs-extra');
const path = require('path');
const esmImport = require('esm')(module);
const Compiler = esmImport('./src/compiler.js').default;

async function main() {
  let exampleHtml = await fs.readFile(path.resolve(__dirname, './example/example.html'), 'utf-8');
  let exampleData = JSON.parse(await fs.readFile(path.resolve(__dirname, './example/example.json'), 'utf-8'));
  let fooResourceHtml = await fs.readFile(path.resolve(__dirname, './example/foo-resource.html'), 'utf-8');
  let exampleResources = { "foo": fooResourceHtml };

  console.log((new Compiler(exampleHtml, exampleData, exampleResources)).compile());
}

main();
