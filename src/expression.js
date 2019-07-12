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
    return this.compiler.resourceResolver.resolve(this.getUnwrappedExpression());
  }
}

Expression.calculateEachMatch = function(str, compiler) {
  return str.replace(new RegExp(expressionMatch), (a, b) =>
    new Expression('${' + b + '}', compiler).getComputedValue());
}
