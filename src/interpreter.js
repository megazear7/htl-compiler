import { FUNCTION_USE } from './generator/token.js';

const STATE_EXPRESSION = 'STATE_EXPRESSION';
const STATE_FUNCTION = 'STATE_FUNCTION';
const STATE_TEXT = 'STATE_TEXT';
const STATE_SLY_ELEMENT = 'STATE_SLY_ELEMENT';

const DATA_SLY_ATTRIBUTE = 'data-sly-';
const DATA_SLY_ELEMENT = '<sly';
const SLY_EXPRESSION_PREFIX = '${';
const SLY_EXPRESSION_SUFFIX = '}';
const SLY_FUNCTION_SUFFIX = '="';

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
    if (this.state === STATE_EXPRESSION) {
      this.consumeExpression(character);
    } else if (this.state === STATE_FUNCTION) {
      this.consumeFunction(character);
    } else if (this.state === STATE_TEXT) {
      this.consumeText(character);
    } else if (this.state === STATE_SLY_ELEMENT) {
      this.consumeSlyElement(character);
    }
  }

  consumeExpression(character) {
    this.word += character;

    if (this.word.endsWith(SLY_EXPRESSION_SUFFIX)) {
      this.word = this.word.substring(0, this.word.length - SLY_EXPRESSION_SUFFIX.length);
      this.pushToken();
      this.state = STATE_TEXT;
    }
  }

  consumeFunction(character) {
    this.word += character;

    if (this.word.endsWith(SLY_FUNCTION_SUFFIX)) {
      this.word = this.word.substring(0, this.word.length - SLY_FUNCTION_SUFFIX.length);
      this.pushToken();
      this.state = STATE_TEXT;
    }
  }

  consumeText(character) {
    this.word += character;

    if (this.word.endsWith(DATA_SLY_ATTRIBUTE)) {
      this.word = this.word.substring(0, this.word.length - DATA_SLY_ATTRIBUTE.length);
      this.pushToken();
      this.state = STATE_FUNCTION;
    } else if (this.word.endsWith(DATA_SLY_ELEMENT)) {
      this.word = this.word.substring(0, this.word.length - DATA_SLY_ELEMENT.length);
      this.pushToken();
      this.state = STATE_SLY_ELEMENT;
    } else if (this.word.endsWith(SLY_EXPRESSION_PREFIX)) {
      this.word = this.word.substring(0, this.word.length - SLY_EXPRESSION_PREFIX.length);
      this.pushToken();
      this.state = STATE_EXPRESSION;
    }
  }

  consumeSlyElement(character) {
    if ([" "].indexOf(character) >= 0) {
      this.word = this.word.substring(0, this.word.length - DATA_SLY_ATTRIBUTE.length);
      this.pushToken();
      this.state = STATE_TEXT;
    } else {
      this.word += character;
    }
  }

  pushToken() {
    if (this.state === STATE_EXPRESSION) {
      this.pushExpression();
    } else if (this.state === STATE_FUNCTION) {
      this.pushFunction();
    } else if (this.state === STATE_TEXT) {
      this.pushText();
    } else if (this.state === STATE_SLY_ELEMENT) {
      this.pushSlyElement();
    }

    this.word = '';
  }

  pushExpression() {
    var expressions = this.word.split(".");
    this.tokens.push({
  		"_variableName": "var_0",
  		"_expression": {
  			"_target": {
  				"_name": expressions[0]
  			},
  			"_property": {
  				"_text": expressions[1]
  			}
  		}
  	});
    /*
    this.tokens.push({
      "_text": " --expression-for__" + this.word + "__ "
    });
    */
  }

  pushFunction() {
    let functionName = this.word.split('.')[0];
    let handle = this.word.split('.')[1];

    if (functionName === FUNCTION_USE) {
      this.tokens.push({
    		"_variableName": handle,
    		"_expression": {
    			"_hasParens": false,
    			"_functionName": functionName,
    			"_expression": {
    				"_hasParens": false,
    				"_text": "some.path.to.a.java.ExampleClass" // TODO get this expression dynamically
    			},
    			"_args": [{
    				"_hasParens": false,
    				"_map": {

    				}
    			}]
    		}
    	});
    } else {
      this.tokens.push({
        "_text": " --function__" + this.word + "__ "
      });
    }
  }

  pushText() {
    this.tokens.push({
      "_text": this.word
    });
  }

  pushSlyElement() {
    // TODO
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
