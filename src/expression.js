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
    let valueParent = undefined;

    this.getUnwrappedExpression().split('.').forEach(identifier => {
      if (typeof value === 'object') {
        valueParent = value;
        value = value[identifier];
      } else {
        value = undefined;
      }
    });

    if (isFunction(value)) {
      if (valueParent) {
        value = value.call(valueParent);
      } else {
        value = value();
      }
    }

    return value;
  }
}

Expression.calculateEachMatch = function(str, compiler) {
  return str.replace(new RegExp(expressionMatch), (a, b) =>
    new Expression('${' + b + '}', compiler).getComputedValue());
}

function isFunction(functionToCheck) {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
