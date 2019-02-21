import Expression from './expression.js';

export const FUNCTION_USE = 'use';

export default class Token {
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
