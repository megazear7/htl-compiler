import DataSlyUse from './data-sly-use.js';
import DataSlyList from './data-sly-list.js';

export default class Attr {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    if (this.name.startsWith('data-sly-use')) {
      output += new DataSlyUse(this.name, this.value, this.compiler).compile();
    } else if (this.name.startsWith('data-sly-list')) {
      output += new DataSlyList(this.name, this.value, this.compiler).compile();
    } else {
      output += ' ' + this.name + '="' + this.value + '"';
    }

    return output;
  }
}
