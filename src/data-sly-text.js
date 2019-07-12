export default class DataSlyText {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  async compile() {
    let output = '';

    if (this.value.hasExpression()) {
      this.compiler.addUnusedText({ value: await this.value.getComputedValue() });
    } else {
      this.compiler.addUnusedText({ value: await this.value.getValue() });
    }

    return output;
  }
}
