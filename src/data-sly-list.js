import { expressionMatch } from './globals.js';

export default class DataSlyList {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    const handle = this.name.getSlyIdentifier();
    const matches = new RegExp(expressionMatch).exec(this.value);

    if (this.value.hasExpression()) {
      this.compiler.addUnusedList({
        handle: handle || 'item',
        list: this.value.getComputedValue()
      });
    }

    return output;
  }
}
