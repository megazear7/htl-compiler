export default class DataSlyResource {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  async compile() {
    let output = '';

    this.compiler.setUnusedResource({
      type: this.compiler.resourceTypes[await this.value.getValue()],
      data: await this.compiler.resourceResolver.resolve(await this.value.getValue())
    });

    return output;
  }
}
