export default class DataSlyRepeat {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  async compile() {
    let output = '';

    const handle = this.name.getSlyIdentifier();

    if (this.value.hasExpression()) {
      this.compiler.addUnusedList({
        handle: handle || 'item',
        list: await this.value.getComputedValue(),
        repeatContainer: true
      });
    }

    return output;
  }
}
