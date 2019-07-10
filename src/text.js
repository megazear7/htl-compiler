import Expression from './expression.js';

export default class Attr {
  constructor(text, compiler) {
    this.text = text;
    this.compiler = compiler;
  }

  compile() {
    return Expression.calculateEachMatch(this.text, this.compiler);
  }
}
