import Expression from './expression.js';

export default class AttrValue {
  constructor(value, compiler) {
    this.value = value;
    this.compiler = compiler;
    this.expression = new Expression(this.value, this.compiler);
  }

  hasExpression() {
    return this.expression.isValid();
  }

  getExpression() {
    return this.expression.getUnwrappedExpression();
  }

  getComputedValue() {
    let value = undefined;

    if (this.hasExpression()) {
      value = this.expression.getComputedValue();
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
