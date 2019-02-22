export default class Target {
  constructor({_hasParens, _name, _target, _property}, context) {
    this.hasParens = _hasParens;
    this.name = _name;
    this.target = _target;
    this.property = _property;
    this.context = context;
  }

  get value() {
    if (typeof this.name === 'undefined') {
      return new Target(this.target, this.context).value[this.property._text];
    } else {
      return this.context[this.name];
    }
  }
}
