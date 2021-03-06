export default class DataSlyAttribute {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  async compile() {
    let output = '';

    if (this.name.hasSlyIdentifier()) {
      output += ' ' + this.name.getSlyIdentifier() + '=' + '"' + await this.value.getValue() + '"';
    } else {
      throw "data-sly-attribute requires an identifier";
    }

    return output;
  }
}
