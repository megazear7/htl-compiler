export default class Operand {
  constructor({_name, _text}, context) {
    this.name = _name;
    this.text = _text;
    this.context = context;
  }

  get value() {
    if (this.name) {
      return this.context[this.name];
    } else if (this.text) {
      return this.text;
    } else {
      return 0;
    }
  }
}
