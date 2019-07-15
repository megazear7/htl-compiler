import DataSlyUse from './data-sly-use.js';
import DataSlyList from './data-sly-list.js';
import DataSlyRepeat from './data-sly-repeat.js';
import DataSlyText from './data-sly-text.js';
import DataSlyAttribute from './data-sly-attribute.js';
import DataSlyResource from './data-sly-resource.js';
import DataSlyTemplate from './data-sly-template.js';
import DataSlyCall from './data-sly-call.js';
import AttrName from './attr-name.js';
import AttrValue from './attr-value.js';

export default class Attr {
  constructor(name, value, compiler) {
    this.name = new AttrName(name);
    this.value = new AttrValue(value, compiler);
    this.compiler = compiler;
  }

  async compile() {
    let output = '';

    if (this.name.isSlyUse()) {
      output += await new DataSlyUse(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyList()) {
      output += await new DataSlyList(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyRepeat()) {
      output += await new DataSlyRepeat(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyText()) {
      output += await new DataSlyText(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyAttribute()) {
      output += await new DataSlyAttribute(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyResource()) {
      output += await new DataSlyResource(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyTemplate()) {
      output += await new DataSlyTemplate(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyCall()) {
      output += await new DataSlyCall(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyElement()) {
      // Don't output anything
    } else {
      output += ' ' + this.name.getStandardName() + '="' + await this.value.getValue() + '"';
    }

    return output;
  }
}
