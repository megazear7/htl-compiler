import htmlparser from 'htmlparser2';
import Attr from './attr.js';
import Entry from './entry.js';

export default class Tag {
  constructor(entry, compiler) {
    this.entry = entry;
    this.compiler = compiler;
  }

  isRendered() {
    // TODO: Also look for and evaluate data-sly-test attributes
    return this.entry.name != 'sly';
  }

  compile() {
    let output = '';

    if (this.isRendered()) {
      output += '<' + this.entry.name;
    }

    Object.keys(this.entry.attribs).forEach(attr => {
      const attrResult = new Attr(attr, this.entry.attribs[attr], this.compiler).compile();
      if (this.isRendered()) {
        output += attrResult;
      }
    });

    if (this.isRendered()) {
      output += '>';
    }

    if (this.compiler.unusedList) {
      const unusedList = this.compiler.unusedList;
      this.compiler.unusedList = undefined;

      unusedList.list.forEach(item => {
        this.compiler.resourceData[unusedList.handle] = item;
        this.entry.children.forEach(child =>
          output += new Entry(child, this.compiler).compile());
      });
    } else {
      this.entry.children.forEach(child =>
        output += new Entry(child, this.compiler).compile());
    }

    if (this.isRendered()) {
      output += '</' + this.entry.name + '>';
    }

    return output;
  }
}
