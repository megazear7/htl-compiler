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

    if (matches && matches.length >= 1) {
      const expression = matches[1];
      let list = this.compiler.resourceData;
      expression.split('.').forEach(identifier => {
        if (typeof list === 'object') {
          list = list[identifier];
        } else {
          list = [];
        }
      });

      this.compiler.addUnusedList({ handle: handle || 'item', list });
    }

    return output;
  }
}
