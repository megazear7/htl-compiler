const fs = require('fs-extra');
const path = require('path');
const esmImport = require('esm')(module);
const Compiler = esmImport('../../src/compiler.js').default;

class MyClass {
  constructor(context) {
    this.name = context.firstName + " " + context.lastName;
  }

  name() {
    return this.name;
  }
}

async function main() {
  let exampleHtml = await fs.readFile(path.resolve(__dirname, './example.html'), 'utf-8');
  let resourceData = JSON.parse(await fs.readFile(path.resolve(__dirname, './resource-data.json'), 'utf-8'));
  let useModels = {
    "some.class.path.MyClass": MyClass,
    "some.path.to.a.java.ExampleClass": {
      "title": "Example title",
      "description": "Example description"
    },
    "some.path.to.a.java.FooClass": {
      "example": "I am from FooClass",
      "myList": [
        "one",
        "two",
        "three"
      ]
    }
  };
  let fooResourceHtml = await fs.readFile(path.resolve(__dirname, './foo-resource.html'), 'utf-8');
  let resourceTypes = { "foo": fooResourceHtml };

  console.log((new Compiler(exampleHtml, resourceData, useModels, resourceTypes)).compile());
}

main();
