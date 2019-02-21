const esmImport = require('esm')(module);
const Compiler = esmImport('./src/compiler.js').default;

const exampleData = {
  "exampleGlobalValue": "Example global value",
  "some.path.to.a.java.ExampleClass": {
    "title": "Example title",
    "description": "Example description"
  }
}

const exampleResources = {
  "foo.html": "<div>This is foo.html</div>"
}

const exampleTokenArray = [
  {
		"_variableName": "headerComponent",
		"_expression": {
			"_hasParens": false,
			"_functionName": "use",
			"_expression": {
				"_hasParens": false,
				"_text": "some.path.to.a.java.ExampleClass"
			},
			"_args": [{
				"_hasParens": false,
				"_map": {

				}
			}]
		}
	},
	{
		"_expression": {
			"_hasParens": false,
			"_value": false,
			"_text": false
		}
	},
	{
		"_text": "<sly>"
	},
	{

	},
	{
		"_expression": {
			"_hasParens": false,
			"_value": false,
			"_text": false
		}
	},
	{
		"_text": "</sly>"
	},
	{

	},
	{
		"_text": "\n\n<h1>"
	},
	{
		"_variableName": "var_0",
		"_expression": {
			"_hasParens": false,
			"_target": {
				"_hasParens": false,
				"_name": "headerComponent"
			},
			"_property": {
				"_hasParens": false,
				"_text": "title"
			}
		}
	},
	{
		"_location": {
			"line": 2,
			"column": 4
		},
		"_variableName": "var_0"
	},
	{

	},
	{
		"_text": "</h1>\n<p>"
	},
	{
		"_variableName": "var_1",
		"_expression": {
			"_hasParens": false,
			"_target": {
				"_hasParens": false,
				"_name": "headerComponent"
			},
			"_property": {
				"_hasParens": false,
				"_text": "description"
			}
		}
	},
	{
		"_location": {
			"line": 3,
			"column": 3
		},
		"_variableName": "var_1"
	},
	{

	},
	{
		"_text": "</p>\n\n"
	},
	{
		"_expression": {
			"_hasParens": false,
			"_value": false,
			"_text": false
		}
	},
	{
		"_text": "<sly>"
	},
	{

	},
	{
		"_variableName": "var_resourceContent2",
		"_expression": {
			"_hasParens": false,
			"_functionName": "resource",
			"_expression": {
				"_hasParens": false,
				"_text": "foo.html"
			},
			"_args": [

			]
		}
	},
	{
		"_variableName": "var_resourceContent2"
	},
	{

	},
	{
		"_expression": {
			"_hasParens": false,
			"_value": false,
			"_text": false
		}
	},
	{

	},
	{
		"_expression": {
			"_hasParens": false,
			"_value": false,
			"_text": false
		}
	},
	{
		"_text": "</sly>"
	},
	{

	},
	{
		"_text": "\n"
	}
];

console.log((new Compiler(exampleTokenArray, exampleData, exampleResources)).compile());
