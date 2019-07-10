export default class DataSlyResource {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    this.compiler.setUnusedResource({
      type: this.compiler.resourceTypes[this.value.getValue()],
      data: this.compiler.resourceData[this.value.getValue()]
    });

    return output;
  }
}
