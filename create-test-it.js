const fs = require('fs-extra');
const path = require('path');

let describeNumber = 1;

process.argv.forEach(arg => {
  if (arg.startsWith('describe=')) {
    describeNumber = arg.split('describe=')[1];
  }
});

const newTestNumber = fs.readdirSync(path.resolve(__dirname, `test/tests/describe-${describeNumber}`))
.filter(name => name.startsWith('it-'))
.map(name => name.split("it-")[1])
.map(testNumber => parseInt(testNumber))
.reduce((a, b) => Math.max(a, b)) + 1;

const itName = `it-${newTestNumber}`;

console.log(itName);

fs.mkdirSync(path.resolve(__dirname, `test/tests/describe-${describeNumber}`, itName));

fs.writeFile(
  path.resolve(__dirname, `test/tests/describe-${describeNumber}`, itName, 'config.json'), `{
  "it": "Should match the output"
}`,
  'utf-8'
);

fs.writeFile(
  path.resolve(__dirname, `test/tests/describe-${describeNumber}`, itName, 'template.html'), `
<p>Example Test</p>

<sly data-sly-use.headerComponent="some.path.to.a.java.ExampleClass"></sly>

<h1>\${headerComponent.title}</h1>
<p>\${headerComponent.description}</p>

<sly data-sly-resource="\${'foo'}"></sly>
`,
  'utf-8'
);

fs.writeFile(
  path.resolve(__dirname, `test/tests/describe-${describeNumber}`, itName, 'resource-data.json'), `{
  "exampleGlobalValue": "Example global value"
}
`,
  'utf-8'
);

fs.writeFile(
  path.resolve(__dirname, `test/tests/describe-${describeNumber}`, itName, 'use-models.json'), `{
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
  path.resolve(__dirname, `test/tests/describe-${describeNumber}`, itName, 'resources.json'), `{
  "foo": "foo-resource.html"
}
`
,
  'utf-8'
);

fs.writeFile(
  path.resolve(__dirname, `test/tests/describe-${describeNumber}`, itName, 'expected.html'), `
<p>Example Test</p>



<h1>Example title</h1>
<p>Example description</p>

<p>Example resource</p>



<div>This is the foo resource. It has its own scope.</div>
<div>I am from FooClass</div>
`,
  'utf-8'
);
