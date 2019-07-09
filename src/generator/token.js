import Expression from './expression.js';
import Compiler from '../compiler.js';

export const FUNCTION_USE = 'use';
export const FUNCTION_RESOURCE = 'resource';
export const FUNCTION_XSS = 'xss';
export const FUNCTION_LIST = 'listInfo';

export default class Token {
  constructor({_variableName, _text, _location, _expression, _listVariable, _itemVariable, _indexVariable, constructor: { name }}, tokenList, context, useModels, resourceTypes) {
    this.type = name;
    this.variableName = _variableName;
    this.text = _text;
    this.location = _location;
    this.context = context;
    this.useModels = useModels;
    this.resourceTypes = resourceTypes;
    this.listVariable = _listVariable;
    this.itemVariable = _itemVariable;
    this.indexVariable = _indexVariable;
    this.tokenList = tokenList;

    if (_expression) this.expression = new Expression(_expression, context);
  }

  output() {
    if (this.text && this.text.indexOf('<sly') !== 0 && this.text.indexOf('</sly') !== 0) {
      return this.text;
    } else if (this.expression && this.expression.functionName === FUNCTION_USE) {
      this.context[this.variableName] = this.useModels[this.expression.expression.text];
      return '';
    } else if (this.expression && this.expression.functionName === FUNCTION_RESOURCE) {
      return (new Compiler(
        this.resourceTypes[this.expression.expression.text],
        this.context[this.expression.expression.text] ? this.context[this.expression.expression.text] : { },
        this.useModels,
        this.resourceTypes)
      ).compile();
    } else if (this.expression && this.expression.functionName === FUNCTION_LIST) {
      // TODO what is this supposed to do?
      return '';
    } else if (this.expression && this.expression.functionName === FUNCTION_XSS) {
      // TODO implement save cross site scripting protection.
      this.context[this.variableName] = this.expression.expression.value;
      return '';
    } else if (this.listVariable) {
      this.context[this.indexVariable] = this.context[this.indexVariable] + 1 || 0;
      if (this.context[this.indexVariable] < this.context[this.listVariable].length) {
        this.context[this.itemVariable] = this.context[this.listVariable][this.context[this.indexVariable]];
        this.endToken.token.recurse = true;
      }
      if (this.context[this.indexVariable] >= this.context[this.listVariable].length-1) {
        this.endToken.token.recurse = false;
      }
      return '';
    } else if (this.type === 'End' && this.recurse) {
      this.tokenList.goTo(this.startToken.index-1);
      return '';
    } else if (this.expression && this.variableName) {
      this.context[this.variableName] = this.expression.value;
      return '';
    } else if (this.variableName) {
      return this.context[this.variableName] ? this.context[this.variableName] : '';
    } else if (this.expression && this.type === 'Start') {
      if (this.expression.value === false) {
        // TODO
        // This expression plus type == "Start" scenario seems like the only way to know that we are in the "data-sly-test" scenario.
        // However it cause infinite loops sometimes and breaks the data-sly-use other times.
        //this.tokenList.goTo(this.endToken.index+1);
      }
      return '';
    } else if (this.expression) {
      return '';
    } else {
      return '';
    }
  }
}
