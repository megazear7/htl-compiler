import DataSlyUse from './data-sly-use.js';
import DataSlyList from './data-sly-list.js';
import { expressionMatch } from './globals.js';

export default class Attr {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    if (this.name.startsWith('data-sly-use')) {
      output += new DataSlyUse(this.name, this.value, this.compiler).compile();
    } else if (this.name.startsWith('data-sly-list')) {
      output += new DataSlyList(this.name, this.value, this.compiler).compile();
    } else {
      output += ' ' + this.name + '="' + this.getAttributeValue() + '"';
    }

    return output;
  }

  getAttributeValue() {
    const expressionValue = this.computeValue();

    if (expressionValue != undefined) {
      return expressionValue;
    } else {
      return this.value;
    }
  }

  computeValue() {
    let value = undefined;
    const matches = expressionMatch.exec(this.value);

    if (matches && matches.length >= 1) {
      const expression = matches[1];
      value = this.compiler.resourceData;
      expression.split('.').forEach(identifier => {
        if (typeof value === 'object') {
          value = value[identifier];
        } else {
          value = undefined;
        }
      });
    }

    return value;
  }
}
