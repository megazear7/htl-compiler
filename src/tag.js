import htmlparser from 'htmlparser2';
import Attr from './attr.js';
import Entry from './entry.js';

export default class Tag {
  constructor(entry, compiler) {
    this.entry = entry;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    output += '<' + this.entry.name;

    Object.keys(this.entry.attribs).forEach(attr =>
      output += new Attr(attr, this.entry.attribs[attr], this).compile());

    output += '>';

    this.entry.children.forEach(child =>
      output += new Entry(child, this.compiler).compile());

    output += '</' + this.entry.name + '>';

    return output;
  }
}
