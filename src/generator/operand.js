import Expression from './expression.js';

export default class Operand {
  constructor(config, context) {
    this.config = config;
    this.name = config._name;
    this.text = config._text;
    this.target = config._target;
    this.context = context;
  }

  get value() {
    if (this.name || this.target) {
      return new Expression(this.config, this.context).value;
    } else if (this.text) {
      return this.text;
    } else {
      return undefined;
    }
  }
}
