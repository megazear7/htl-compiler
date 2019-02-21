import Token from './token.js';

export default class TokenList {
  constructor(tokenArray, context) {
    this.tokens = tokenArray.map(token => new Token(token, context));
  }

  get output() {
    return this.tokens.reduce((outputHtml, token) => outputHtml + token.output, '');
  }
}
