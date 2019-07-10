import htmlparser from 'htmlparser2';
import Attr from './attr.js';
import AttrName from './attr-name.js';
import Entry from './entry.js';

export default class Tag {
  constructor(entry, compiler) {
    this.entry = entry;
    this.compiler = compiler;
  }

  isRendered() {
    let isRendered = this.getElementName() != 'sly';

    Object.keys(this.entry.attribs).forEach(attrStr => {
      const attrName = new AttrName(attrStr);
      const attr = new Attr(attrStr, this.entry.attribs[attrStr], this.compiler);
      if (attrName.isSlyTest() && ! attr.value.getComputedValue()) {
        isRendered = false;
      }
    });

    return isRendered;
  }

  getElementName() {
    let elementName = this.entry.name;

    Object.keys(this.entry.attribs).forEach(attrStr => {
      const attrName = new AttrName(attrStr);
      const attr = new Attr(attrStr, this.entry.attribs[attrStr], this.compiler);
      if (attrName.isSlyElement()) {
        elementName = attr.value.getValue();
      }
    });

    return elementName;
  }

  compile() {
    let output = '';
    const isRendered = this.isRendered();

    if (isRendered) {
      output += '<' + this.getElementName();
    }

    Object.keys(this.entry.attribs).forEach(attr => {
      const attrResult = new Attr(attr, this.entry.attribs[attr], this.compiler).compile();
      if (isRendered) {
        output += attrResult;
      }
    });

    if (isRendered) {
      output += '>';
    }

    if (this.compiler.unusedList) {
      const unusedList = this.compiler.unusedList;
      this.compiler.unusedList = undefined;

      unusedList.list.forEach(item => {
        this.compiler.resourceData[unusedList.handle] = item;
        this.entry.children.forEach(child => {
          if (isRendered) {
            output += new Entry(child, this.compiler).compile()
          }
        });
      });
    } else if (this.compiler.unusedText) {
      const unusedText = this.compiler.unusedText;
      this.compiler.unusedText = undefined;
      output += unusedText.value;
    } else {
      this.entry.children.forEach(child =>
        output += new Entry(child, this.compiler).compile());
    }

    if (isRendered) {
      output += '</' + this.getElementName() + '>';
    }

    return output;
  }
}
