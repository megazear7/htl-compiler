import { expressionMatch } from './globals.js';

export default class DataSlyText {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    const matches = new RegExp(expressionMatch).exec(this.value);

    if (matches && matches.length >= 1) {
      const expression = matches[1];
      let value = this.compiler.resourceData;
      expression.split('.').forEach(identifier => {
        if (typeof value === 'object') {
          value = value[identifier];
        } else {
          value = [];
        }
      });

      this.compiler.addUnusedText({ value });
    } else {
      this.compiler.addUnusedText({ value: this.value });
    }

    return output;
  }
}
