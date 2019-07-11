# HTL Compiler

## Usage

#### Installation

```bash
npm install htl-compiler
```

#### Node.JS Usage

```js
const Compiler = require('htl-compiler');
```

#### UMD Module Usage

```html
<script src="/node_modules/htl-compiler/dist/compiler-umd.js"></script>
```

## The Rundown

Given an [HTL template](https://docs.adobe.com/content/help/en/experience-manager-htl/using/getting-started/getting-started.html) provided as a string, and data provided as JSON, this compiler will output HTML.

```js
new Compiler("<div>${message}</div>", { message: "Hello, World!" }).compile();
```

This will output what you would expect:

```html
<div>Hello, World!</div>
```

The following features from the [HTL Spec](https://github.com/adobe/htl-spec) are supported:

1. `data-sly-repeat`
1. `data-sly-list`
1. `data-sly-test`
1. `data-sly-resource`
1. `data-sly-use`
1. `data-sly-template`
1. `data-sly-call`
1. `data-sly-attribute`
1. `<sly>`

In order to support the HTL concepts of use models and resources, you can also pass two additional parameters to the compiler:

```js
new Compiler(
  "<div>${message}</div>",
  {
    message: "Hello, World!"
    sampleResource: { /* The data that will be available to the sampleResource */ }
  },
  {
    "class.path.of.use.Model": { /* Data you want this use model to provide */ }
  },
  {
    "sampleResource": "<div>The template for the sampleResource. It will only have a subset of the data available to it.</div>"
  }
).compile();
```

## Usage

#### Expressions

Here is a simple hello world example:

```js
import Compiler from './src/compiler.js';

const exampleHtml = `
  <div>\${myMessage}</div>
`;

const resourceData = {
  myMessage: "Hello, World!"
}

const compiledHtml = new Compiler(exampleHtml, resourceData).compile();
// This will produce <div>Hello, World!</div>
```

#### Use models

Here is an example using use models:

```js
import Compiler from './src/compiler.js';

const exampleHtml = `
  <sly data-sly-use.test="\${my.example.class.path.TestModel}"
  <div>\${test.messageFromTestModel}</div>
`;

const resourceData = {
  myMessage: "Hello, World!"
}

const useModels = {
  "my.example.class.path.TestModel": {
    title: "Hello from TestModel"
  }
}

const compiledHtml = new Compiler(exampleHtml, resourceData, useModels).compile();
// This will produce <div>Hello from TestModel</div>
```

```js
class MyClass {
  constructor(context) {
    this.name = context.firstName + " " + context.lastName;
  }

  name() {
    return this.name;
  }
}

new Compiler(`
  <sly data-sly-use.example="some.example.class.path.MyClass">
  <div>\${example.name}</div>
  `,
  { firstName: 'Joe', lastName: 'Smith' },
  { 'some.example.class.path.MyClass': MyClass }
).compile()
```

#### Resources
Here is an example using resources:

```js
import Compiler from './src/compiler.js';

const exampleHtml = `
  <div data-sly-resource="simple"></div>
`;

const resourceData = {
  simple: {
    nestedResourceData: "Hello from the simple resource"
  }
}

const resourceTypes = {
  "simple": "<div>\${nestedResourceData}</div>"
}

const compiledHtml = new Compiler(exampleHtml, resourceData, { }, resourceTypes).compile();
// This will produce <div><div>Hello from the simple resource</div></div>
```

## Demos

#### Command Line Demo

To see this in action on the command line you can run the example with:

```bash
npm run example:cli
```

#### Browser Demo

To see this in action in the browser run the following command and then open up [localhost:3000](http://localhost:3000).

```bash
npm run example:browser
```

## Development

#### Build new release

The following command will build a UMD module at /dist/compiler.js

```
npm build
```

#### Testing

```
npm test
```

27 passing
0 failing
