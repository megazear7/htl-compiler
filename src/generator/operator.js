import Operand from './operand.js';

export default class Operator {
  constructor(sym, operands, context) {
    this.sym = sym;
    this.operands = operands.map(operand => new Operand(operand, context));
  }

  get output() {
    let operands = this.operands.slice(1);
    return operands.reduce((total, operand) => {
      if (this.sym === '+') {
        return total + operand.value
      } else {
        throw new Error('Unsupported operator');
      }
    }, this.operands[0].value);
  }
}
