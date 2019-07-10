export default class DataSlyList {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    const handle = this.name.getSlyIdentifier();

    if (this.value.hasExpression()) {
      this.compiler.addUnusedList({
        handle: handle || 'item',
        list: this.value.getComputedValue()
      });
    }

    return output;
  }
}
