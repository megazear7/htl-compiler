# HTL Compiler

## Usage

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

Here is an example using "use models":

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

TODO

## Test

```
npm test
```

26 passing
0 failing

#### Create new empty test

Copy a folder at `/test/tests/describe-*` to create a new category of tests.
Copy a folder at `/test/tests/describe-*/it-*` to create a new test within an existing category.
