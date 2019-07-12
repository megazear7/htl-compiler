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

#### AMD Module Usage

A AMD module is also provided at `/dist/compiler.amd.js`.

TODO: Add an example usage of the AMD module.

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
  constructor(resourceResolver) {
    this.name = resourceResolver.resolve('firstName') + " " + resourceResolver.resolve('lastName');
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

#### Custom Resource Resolvers

The second parameter to the compiler is the resource resolver. If you provide a JSON object (with no constructor) a static resource resolver will be used. That means that resource paths will simply resolve to the data at the specified location in the provided json structure. For example if you provide the below json as the second parameter:

```json
{
  "example": {
    "path": "hello"
  }
}
```

Then the resource at the `example.path` will evaluate to the string `"hello"`.

However you can provide your own resource resolver that resolves paths differently. In order to do this you must provide a class as the second parameter to the compiler that implements the following API:

```js
export default class StaticResourceResolver {
  setResourceData(identifier, jsonData) {
  }

  resolve(path) {
  }
}
```

The `setResourceData` is used at various times during script execution and provides your resource resolver with additional data that it needs to be capable of resolving. If this method is not properly implemented then features such as data-sly-use and data-sly-list will not work because the context data for those features will not be available from your resource resolver. This likely means that you need to set this jsonData to some internal state and check for it's existence in the resolve method before performing custom resource resolution logic.

The `resolve` method takes a path variable which can either be a string of the form `some.path.separated.by.periods` or an array of the form `['some', 'path', 'as', 'an', 'array']`. Your resource resolver should contain some logic for retrieving the value of the indicated resource and should be capable of handling both paths and strings, most likely by checking `typeof path === 'string'` and if so then doing `path = path.split('.')`.

An example use case for this is to provide a resource resolver that resolves resource paths to urls for integration with a custom API.

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
