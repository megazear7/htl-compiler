const expressionMatch = /\$\{(.*)\}/g;

export default class Expression {
  constructor(expressionStr, compiler) {
    this.expressionStr = expressionStr;
    this.compiler = compiler;
  }

  getUnwrappedExpression() {
    return this.isValid() ? this.getMatches()[1] : undefined;
  }

  getMatches() {
    return new RegExp(expressionMatch).exec(this.expressionStr);
  }

  isValid() {
    return this.getMatches() && this.getMatches().length >= 2;
  }

  getComputedValue() {
    let value = this.compiler.resourceData;

    this.getUnwrappedExpression().split('.').forEach(identifier => {
      if (typeof value === 'object') {
        value = value[identifier];
      } else {
        value = undefined;
      }
    });

    return value;
  }
}

Expression.calculateEachMatch = function(str, compiler) {
  return str.replace(new RegExp(expressionMatch), (a, b) =>
    new Expression('${' + b + '}', compiler).getComputedValue());
}
