import TokenList from './generator/token-list.js';
import Interpreter from './interpreter.js';

export default class Compiler {
  constructor(template, data, resources) {
    this.template = template;
    this.data = data;
    this.resources = resources;
  }

  compile() {
    return new TokenList(
      (new Interpreter(this.template)).getTokenList(),
      this.data,
      this.resources
    ).output;
  }

  // Remove this once the interpreter works
  compileExampleTokenList() {
    return new TokenList(
      (new Interpreter(this.template)).getExampleTokenList(),
      this.data,
      this.resources
    ).output;
  }
}
