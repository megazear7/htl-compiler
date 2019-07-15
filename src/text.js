import Expression from './expression.js';

export default class Text {
  constructor(text, compiler) {
    this.text = text;
    this.compiler = compiler;
  }

  async compile() {
    return await Expression.calculateEachMatch(this.text, this.compiler);
  }
}
