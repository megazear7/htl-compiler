import { expressionMatch } from './globals.js';

export default class AttrValue {
  constructor(value, compiler) {
    this.value = value;
    this.compiler = compiler;
    this.matches = new RegExp(expressionMatch).exec(this.value);
  }

  hasExpression() {
    return this.matches && this.matches.length >= 2;
  }

  getExpression() {
    return this.hasExpression() ? this.matches[1] : undefined;
  }

  getComputedValue() {
    let value = undefined;

    if (this.hasExpression()) {
      value = this.compiler.resourceData;
      this.getExpression().split('.').forEach(identifier => {
        if (typeof value === 'object') {
          value = value[identifier];
        } else {
          value = undefined;
        }
      });
    }

    return value;
  }

  getValue() {
    const expressionValue = this.getComputedValue();

    if (expressionValue != undefined) {
      return expressionValue;
    } else {
      return this.value;
    }
  }
}
