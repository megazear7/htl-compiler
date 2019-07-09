import Use from './use.js';

export default class Attr {
  constructor(name, value, compiler) {
    this.name = name;
    this.value = value;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    if (this.name.startsWith('data-sly-use')) {
      output += new Use(this.name, this.value, this.compiler).compile();
    } else {
      output += ' ' + this.name + '="' + this.value + '"';
    }

    return output;
  }
}
