export default class Target {
  constructor({_hasParens, _name, _target, _property, _operator, _operands}, context) {
    this.hasParens = _hasParens;
    this.name = _name;
    this.target = _target;
    this.property = _property;
    this.context = context;

    if (_operator && _operands) this.operator = new Operator(_operator.sym, _operands, context);
  }

  get value() {
    if (typeof this.name === 'undefined') {
      return new Target(this.target, this.context).value[this.property._text];
    } else {
      return this.context[this.name];
    }
  }
}
