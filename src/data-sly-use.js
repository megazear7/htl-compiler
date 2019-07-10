import { expressionMatch } from './globals.js';

export default class DataSlyUse {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    const handle = this.name.getSlyIdentifier();

    if (typeof handle === 'undefined') {
      throw "data-sly-use must have an identifier";
    }

    const matches = new RegExp(expressionMatch).exec(this.value);

    let classPath = this.value.getValue();
    if (this.value.hasExpression()) {
      classPath = this.value.getExpression();
    }

    this.compiler.resourceData[handle] = this.compiler.useModels[classPath];

    return output;
  }
}
