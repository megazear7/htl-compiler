import TokenList from './generator/token-list.js';

export default class Compiler {
  constructor(tokens, data, resources) {
    this.tokenList = new TokenList(tokens, data, resources);
  }

  compile() {
    return this.tokenList.output;
  }
}
