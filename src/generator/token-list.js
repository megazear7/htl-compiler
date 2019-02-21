import Token from './token.js';

export default class TokenList {
  constructor(tokenArray, context, useModels, resourceTypes) {
    this.tokens = tokenArray.map(token => new Token(token, context, useModels, resourceTypes));
  }

  get output() {
    return this.tokens.reduce((outputHtml, token) => outputHtml + token.output, '');
  }
}
