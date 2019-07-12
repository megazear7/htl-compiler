export default class DataSlyTemplate {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  async compile() {
    let output = '';

    this.compiler.addUnusedTemplate({ handler: this.name.getSlyIdentifier() });

    return output;
  }
}
