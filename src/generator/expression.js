import Target from './target.js';
import Property from './property.js';
import Args from './args.js';
import Operator from './operator.js';

export default class Expression {
  constructor({_hasParens, _functionName, _text, _name, _target, _property, _operator, _operands, _args, _expression}, context) {
    this.hasParens = _hasParens;
    this.functionName = _functionName;
    this.context = context;
    this.text = _text;
    this.name = _name;

    if (_operator && _operands) this.operator = new Operator(_operator.sym, _operands, context);
    if (_target) this.target = new Target(_target);
    if (_property) this.property = new Property(_property);
    if (_args) this.args = new Args(_args);
    if (_expression)this.expression = new Expression(_expression);
  }

  get output() {
    if (this.target && this.property) {
      return this.context[this.target.name][this.property.text];
    } else if (this.name) {
      return this.context[this.name];
    } else if (this.operator) {
      return this.operator.output;
    } else {
      return '';
    }
  }
}
