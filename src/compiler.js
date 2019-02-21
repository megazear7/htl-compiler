import TokenList from './generator/token-list.js';
import Interpreter from './interpreter/interpreter.js';

export default class Compiler {
  constructor(template, data, resources) {
    this.tokenList = new TokenList(
      (new Interpreter(template)).getTokenList(),
      data,
      resources
    );
  }

  compile() {
    return this.tokenList.output;
  }
}
