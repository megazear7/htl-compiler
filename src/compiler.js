import TokenList from './generator/token-list.js';
const TemplateParser = require('../node_modules/@adobe/htlengine/src/parser/html/TemplateParser.js');

export default class Compiler {
  constructor(template, resourceData, useModels, resourceTypes) {
    this.template = template;
    this.resourceData = resourceData;
    this.useModels = useModels;
    this.resourceTypes = resourceTypes;
  }

  compile() {
    const tokenList = new TemplateParser().parse(this.template);

    // console.log(tokenList);

    return new TokenList(
      tokenList,
      this.resourceData,
      this.useModels,
      this.resourceTypes
    ).output;
  }
}
