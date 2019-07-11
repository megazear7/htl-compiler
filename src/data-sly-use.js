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

    let classPath = this.value.getValue();
    if (this.value.hasExpression()) {
      classPath = this.value.getExpression();
    }

    if (isClass(this.compiler.useModels[classPath])) {
      this.compiler.resourceData[handle] = new this.compiler.useModels[classPath](this.compiler.resourceData);
    } else {
      this.compiler.resourceData[handle] = this.compiler.useModels[classPath];
    }

    return output;
  }
}

export function isClass(obj) {
  const isCtorClass = obj.constructor
      && obj.constructor.toString().substring(0, 5) === 'class'
  if(obj.prototype === undefined) {
    return isCtorClass
  }
  const isPrototypeCtorClass = obj.prototype.constructor
    && obj.prototype.constructor.toString
    && obj.prototype.constructor.toString().substring(0, 5) === 'class'
  return isCtorClass || isPrototypeCtorClass
}
