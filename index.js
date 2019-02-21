const FUNCTION_USE = 'use';

class Args {
  constructor({_hasParens, _map}) {
    this.hasParens = _hasParens;
    this.map = _map;
  }
}

class Property {
  constructor({_hasParens, _text}) {
    this.hasParens = _hasParens;
    this.text = _text;
  }
}

class Target {
  constructor({_hasParens, _name}) {
    this.hasParens = _hasParens;
    this.name = _name;
  }
}

class Expression {
  constructor({_hasParens, _functionName, _text, _target, _property, _args, _expression}, context) {
    this.hasParens = _hasParens;
    this.functionName = _functionName;
    this.context = context;
    this.text = _text;

    if (_target) this.target = new Target(_target);
    if (_property) this.property = new Property(_property);
    if (_args) this.args = new Args(_args);
    if (_expression)this.expression = new Expression(_expression);
  }

  get output() {
    if (this.target && this.property) {
      return this.context[this.target.name][this.property.text];
    } else {
      return '';
    }
  }
}

class Token {
  constructor({_variableName, _text, _location, _expression}, context) {
    this.variableName = _variableName;
    this.text = _text;
    this.location = _location;
    this.context = context;

    if (_expression) this.expression = new Expression(_expression, context);
  }

  get output() {
    if (this.text && this.text.indexOf('<sly') !== 0 && this.text.indexOf('</sly') !== 0) {
      return this.text;
    } else if (this.expression && this.expression.functionName === FUNCTION_USE) {
      this.context[this.variableName] = this.context[this.expression.expression.text];
      return '';
    } else if (this.expression) {
      return this.expression.output;
    } else {
      return '';
    }
  }
}

class TokenList {
  constructor(tokenArray, context) {
    this.tokens = tokenArray.map(token => new Token(token, context));
  }

  get output() {
    return this.tokens.reduce((outputHtml, token) => outputHtml + token.output, '');
  }
}

class Compiler {
  constructor(tokens, data) {
    this.tokenList = new TokenList(tokens, data, {});
  }

  compile() {
    return this.tokenList.output;
  }
}

const exampleData = {
  "exampleGlobalValue": "Example global value",
  "some.path.to.a.java.ExampleClass": {
    "title": "Example title",
    "description": "Example description"
  }
}

const tokenArray = [
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

console.log((new Compiler(tokenArray, exampleData)).compile());
