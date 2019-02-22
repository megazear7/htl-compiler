const fs = require('fs-extra');
const path = require('path');

const newTestNumber = fs.readdirSync(path.resolve(__dirname, `./test/cases`))
.map(fileName => fileName.split("test-")[1])
.map(fileName => fileName.split(".json")[0])
.map(testNumber => parseInt(testNumber))
.reduce((a, b) => Math.max(a, b)) + 1;

console.log(newTestNumber);

const fileName = `test-${newTestNumber}`;

/*
fs.writeFile(
  path.resolve(__dirname, `./test/cases/${fileName}.json`), `{
  "it": "Should match the output"
}`,
  'utf-8'
);

fs.writeFile(
  path.resolve(__dirname, `./test/test-templates/${fileName}.html`), `
<p>Example Test</p>

<sly data-sly-use.headerComponent="some.path.to.a.java.ExampleClass"></sly>

<h1>\${headerComponent.title}</h1>
<p>\${headerComponent.description}</p>

<sly data-sly-resource="\${'foo'}"></sly>
`,
  'utf-8'
);

fs.writeFile(
  path.resolve(__dirname, `./test/resource-data/${fileName}.json`), `{
  "exampleGlobalValue": "Example global value"
}
`,
  'utf-8'
);

fs.writeFile(
  path.resolve(__dirname, `./test/use-models/${fileName}.json`), `{
  "some.path.to.a.java.ExampleClass":
    {
      "title": "Example title",
      "description": "Example description"
    },
  "some.path.to.a.java.FooClass":
    {
      "example": "I am from FooClass"
    }
}
`,
  'utf-8'
);

fs.writeFile(
  path.resolve(__dirname, `./test/resources/${fileName}.json`), `{
  "foo": "foo-resource.html"
}
`
,
  'utf-8'
);

fs.writeFile(
  path.resolve(__dirname, `./test/expected/${fileName}.html`), `
<p>Example Test</p>



<h1>Example title</h1>
<p>Example description</p>

<p>Example resource</p>



<div>This is the foo resource. It has its own scope.</div>
<div>I am from FooClass</div>
`,
  'utf-8'
);
*/
