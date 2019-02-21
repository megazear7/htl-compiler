import Token from './token.js';

export default class TokenList {
  constructor(tokenArray, context, resources) {
    this.tokens = tokenArray.map(token => new Token(token, context, resources));
  }

  get output() {
    return this.tokens.reduce((outputHtml, token) => outputHtml + token.output, '');
  }
}
