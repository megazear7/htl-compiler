import { isClass } from './util.js';

export default class DataSlyUse {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  async compile() {
    let output = '';

    const handle = this.name.getSlyIdentifier();

    if (typeof handle === 'undefined') {
      throw "data-sly-use must have an identifier";
    }

    let classPath = this.value.getValue();
    if (this.value.hasExpression()) {
      classPath = this.value.getExpression();
    }

    if (isClass(this.compiler.useModels[classPath])) {
      this.compiler.resourceResolver.setResourceData(handle, new this.compiler.useModels[classPath](this.compiler.resourceResolver));
    } else {
      this.compiler.resourceResolver.setResourceData(handle, this.compiler.useModels[classPath]);
    }

    return output;
  }
}
