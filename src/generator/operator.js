import Operand from './operand.js';

export default class Operator {
  constructor(sym, operands, context) {
    this.sym = sym;
    this.operands = operands.map(operand => new Operand(operand, context));
  }

  get output() {
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
  }
}
