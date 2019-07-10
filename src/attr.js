import DataSlyUse from './data-sly-use.js';
import DataSlyList from './data-sly-list.js';
import DataSlyText from './data-sly-text.js';
import AttrName from './attr-name.js';
import AttrValue from './attr-value.js';

export default class Attr {
  constructor(name, value, compiler) {
    this.name = new AttrName(name);
    this.value = new AttrValue(value, compiler);
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    if (this.name.isSlyUse()) {
      output += new DataSlyUse(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyList()) {
      output += new DataSlyList(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyText()) {
      output += new DataSlyText(this.name, this.value, this.compiler).compile();
    } else if (this.name.isSlyElement()) {
      // Don't output anything
    } else {
      output += ' ' + this.name.getStandardName() + '="' + this.value.getValue() + '"';
    }

    return output;
  }
}
