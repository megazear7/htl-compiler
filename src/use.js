import { expressionMatch } from './globals.js';

export default class Use {
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
      const classPath = matches[1];
      this.compiler.resourceData[handle] = this.compiler.useModels[classPath];
    }

    return output;
  }
}
