import TokenList from './generator/token-list.js';

export default class Compiler {
  constructor(tokens, data) {
    this.tokenList = new TokenList(tokens, data, {});
  }

  compile() {
    return this.tokenList.output;
  }
}
