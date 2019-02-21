const STATE_TOKEN = 'STATE_TOKEN';
const STATE_EXPRESSION = 'STATE_EXPRESSION';
const STATE_FUNCTION = 'STATE_FUNCTION';
const STATE_TEXT = 'STATE_TEXT';

const DATA_SLY = 'data-sly';

export default class Args {
  constructor(template) {
    this.tokens = [];
    this.state = STATE_TEXT;
    this.word = '';
    let characters = template.split('');
    while (characters.length > 0) {
      this.consume(characters.shift());
    }
  }

  consume(character) {
    this.word += character;

    if (this.word.endsWith(DATA_SLY)) {
      this.word = this.word.substring(0, this.word.length - DATA_SLY.length);
      this.tokens.push({
        "_text": this.word
      });

      this.state = STATE_FUNCTION;
    }
  }

  getTokenList() {


    return this.tokens;
  }

  // Remove this once the interpreter works
  getExampleTokenList() {
    return exampleTokenList();
  }
}


function exampleTokenList() {
  return [
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
				"_text": "foo"
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
}
