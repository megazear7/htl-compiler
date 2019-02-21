import TokenList from './generator/token-list.js';
import Interpreter from './interpreter.js';

export default class Compiler {
  constructor(template, resourceData, useModels, resourceTypes) {
    this.template = template;
    this.resourceData = resourceData;
    this.useModels = useModels;
    this.resourceTypes = resourceTypes;
  }

  compile() {
    return new TokenList(
      (new Interpreter(this.template)).getTokenList(),
      this.resourceData,
      this.useModels,
      this.resourceTypes
    ).output;
  }

  // Remove this once the interpreter works
  compileExampleTokenList() {
    return new TokenList(
      (new Interpreter(this.template)).getExampleTokenList(),
      this.resourceData,
      this.useModels,
      this.resourceTypes
    ).output;
  }
}
