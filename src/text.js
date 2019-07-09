import { expressionMatch } from './globals.js';

export default class Attr {
  constructor(text, compiler) {
    this.text = text;
    this.compiler = compiler;
  }

  compile() {
    return this.text.replace(expressionMatch, (a, b) => {
      let value = this.compiler.resourceData;
      b.split('.').forEach(identifier => {
        if (typeof value === 'object') {
          value = value[identifier];
        } else {
          value = '';
        }
      });
      return value;
    });
  }
}
