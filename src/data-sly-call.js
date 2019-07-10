import Entry from './entry.js';

export default class DataSlyCall {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    const template = this.compiler.templates[this.value.expression.getUnwrappedExpression()];

    if (template) {
      this.compiler.addUncompiledTemplate({
        entries: template.entry.children.map(child => new Entry(child, this.compiler))
      });
    } else {
      throw "No template found with identifier: " + this.value.expression.getUnwrappedExpression();
    }

    return output;
  }
}
