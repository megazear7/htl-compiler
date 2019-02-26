import Target from './target.js';
import Property from './property.js';
import Arg from './arg.js';
import Operator from './operator.js';

export default class Expression {
  constructor({_hasParens, _functionName, _text, _name, _target, _property, _operator, _operands, _args, _expression}, context) {
    this.hasParens = _hasParens;
    this.functionName = _functionName;
    this.context = context;
    this.text = _text;
    this.name = _name;

    if (_operator) this.operator = new Operator(_operator.sym, _operands, _target, context);
    if (_target) this.target = new Target(_target, context);
    if (_property) this.property = new Property(_property);
    if (_args) this.args = _args.map(arg => new Arg(arg));
    if (_expression) this.expression = new Expression(_expression, context);
  }

  get output() {
    return this.value ? this.value : '';
  }

  get value() {
    if (this.target && this.property) {
      return this.target.value[this.property.text];
    } else if (this.name) {
      return this.context[this.name];
    } else if (this.operator) {
      return this.operator.output;
    } else if (this.target) {
      return this.target.value;
    } else {
      return undefined;
    }
  }
}
