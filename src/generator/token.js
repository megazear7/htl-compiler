import Expression from './expression.js';
import Compiler from '../compiler.js';

export const FUNCTION_USE = 'use';
export const FUNCTION_RESOURCE = 'resource';

export default class Token {
  constructor({_variableName, _text, _location, _expression}, context, resources) {
    this.variableName = _variableName;
    this.text = _text;
    this.location = _location;
    this.context = context;
    this.resources = resources;

    if (_expression) this.expression = new Expression(_expression, context);
  }

  get output() {
    if (this.text && this.text.indexOf('<sly') !== 0 && this.text.indexOf('</sly') !== 0) {
      return this.text;
    } else if (this.expression && this.expression.functionName === FUNCTION_USE) {
      this.context[this.variableName] = this.context[this.expression.expression.text];
      return '';
    } else if (this.expression && this.expression.functionName === FUNCTION_RESOURCE) {
      // TODO Instead of passing in all of the example data pass in only a sub set based upon the resource name. Do the same for the resources
      return (new Compiler(this.resources[this.expression.expression.text], this.context, this.resources)).compile();
    } else if (this.expression) {
      return this.expression.output;
    } else {
      return '';
    }
  }
}
