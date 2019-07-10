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

    if (this.value.hasExpression()) {
      this.compiler.addUnusedText({ value: this.value.getComputedValue() });
    } else {
      this.compiler.addUnusedText({ value: this.value.getValue() });
    }

    return output;
  }
}
