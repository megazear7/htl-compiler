import Operand from './operand.js';
import Target from './target.js';

export default class Operator {
  constructor(sym, operands, target, context) {
    this.sym = sym;
    if (operands) this.operands = operands.map(operand => new Operand(operand, context));
    if (target) this.target = new Target(target, context);
  }

  get output() {
    if (this.operands) {
      return this.operands.reduce((total, operand) => {
        if (typeof total === 'undefined' && typeof operand.value !== 'undefined') {
          return operand.value;
        } else if (typeof operand.value !== 'undefined') {
          if (this.sym === '+') {
            return total + operand.value
          } else {
            throw new Error('Unsupported operator');
          }
        }
      }, undefined);
    } else {
      if (this.sym === 'len:') {
        return this.target.value.length;
      }
    }
  }
}
