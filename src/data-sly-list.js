import { expressionMatch } from './globals.js';

export default class DataSlyList {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    const handle = this.name.split('\.')[1];
    const matches = expressionMatch.exec(this.value);

    if (matches && matches.length >= 1) {
      const expression = matches[1];
      let list = this.compiler.resourceData;
      expression.split('.').forEach(identifier => {
        if (typeof value === 'object') {
          list = value[identifier];
        } else {
          list = [];
        }
      });
      // TODO: Now what do we do with "handle" and "list"???
    }

    return output;
  }
}
