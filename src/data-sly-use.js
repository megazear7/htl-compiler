import { expressionMatch } from './globals.js';

export default class DataSlyUse {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    const handle = this.name.split('\.')[1];
    const matches = new RegExp(expressionMatch).exec(this.value);

    let classPath = this.value;
    if (matches && matches.length >= 1) {
      classPath = matches[1];
    }

    this.compiler.resourceData[handle] = this.compiler.useModels[classPath];

    return output;
  }
}
