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

Expression.calculateEachMatch = async function(str, compiler) {
  let matches = str.match(new RegExp(expressionMatch));

  if (matches && matches.length > 0) {
    const expressions = matches.map(match => new Expression(match, compiler));
    const promises = expressions.map(expression => expression.getComputedValue());
    var values = await Promise.all(promises);

    values.forEach((value, index) => {
      str = str.replace(matches[index], value);
    });
  }

  return str;
}
