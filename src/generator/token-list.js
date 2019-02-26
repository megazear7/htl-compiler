import Token from './token.js';

export default class TokenList {
  constructor(tokenArray, context, useModels, resourceTypes) {
    this.tokens = tokenArray.map(token => new Token(token, this, context, useModels, resourceTypes));
    this.index = 0;
    this.outputString = '';
    let startTokens = [];
    let endTokens = [];

    this.tokens.forEach((token, index) => {
      if (token.type === 'Start') {
        startTokens.push(index);
      } else if (token.type === 'End') {
        endTokens.unshift(index);
      }
    });

    startTokens.forEach((tokenIndex, endIndex) => {
      this.tokens[tokenIndex].endToken = {
        token: this.tokens[endTokens[endIndex]],
        index: endTokens[endIndex]
      };
    });

    endTokens.forEach((tokenIndex, startIndex) => {
      this.tokens[tokenIndex].startToken = {
        token: this.tokens[startTokens[startIndex]],
        index: startTokens[startIndex]
      };
    });
  }

  goTo(index) {
    this.index = index;
  }

  generate() {
    while (this.index < this.tokens.length) {
      this.outputString += this.tokens[this.index].output();
      this.index += 1;
    }

    return this;
  }

  get output() {
    return this.outputString;
  }
}
