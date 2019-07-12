import Attr from './attr.js';
import AttrName from './attr-name.js';
import Entry from './entry.js';
import Compiler from './compiler.js';

export default class Tag {
  constructor(entry, compiler) {
    this.entry = entry;
    this.compiler = compiler;
  }

  isContentRendered() {
    let isContentRendered = true;

    Object.keys(this.entry.attribs).forEach(attrStr => {
      const attrName = new AttrName(attrStr);
      const attr = new Attr(attrStr, this.entry.attribs[attrStr], this.compiler);
      if ((attrName.isSlyTest() && ! attr.value.getComputedValue()) || attrName.isSlyTemplate()) {
        isContentRendered = false;
      }
    });

    return isContentRendered;
  }

  isRendered() {
    let isRendered = this.getElementName() != 'sly';

    Object.keys(this.entry.attribs).forEach(attrStr => {
      const attrName = new AttrName(attrStr);
      const attr = new Attr(attrStr, this.entry.attribs[attrStr], this.compiler);
      if ((attrName.isSlyTest() && ! attr.value.getComputedValue()) || attrName.isSlyTemplate()) {
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

    const attrResults = Object.keys(this.entry.attribs)
    .map(attr => new Attr(attr, this.entry.attribs[attr], this.compiler).compile());

    const unusedList = this.compiler.unusedList;
    this.compiler.unusedList = undefined;

    if (isRendered && (! unusedList || ! unusedList.repeatContainer)) {
      output += '<' + this.getElementName();
      attrResults.forEach(attrResult => output += attrResult);
      output += '>';
    }

    if (unusedList) {
      unusedList.list.forEach(item => {
        this.compiler.resourceResolver.setResourceData(unusedList.handle, item);
        this.entry.children.forEach(child => {
          if (isRendered) {
            if (unusedList.repeatContainer) {
              output += '<' + this.getElementName();
              attrResults.forEach(attrResult => output += attrResult);
              output += '>';
            }

            output += new Entry(child, this.compiler).compile()

            if (unusedList.repeatContainer) {
              output += '</' + this.getElementName() + '>';
            }
          }
        });
      });
    } else if (this.compiler.unusedText) {
      const unusedText = this.compiler.unusedText;
      this.compiler.unusedText = undefined;
      output += unusedText.value;
    } else if (this.compiler.unusedResource) {
      const unusedResource = this.compiler.unusedResource;
      this.compiler.unusedResource = undefined;
      output += new Compiler(unusedResource.type, unusedResource.data, this.compiler.useModels, this.compiler.resourceTypes).compileSync();
    } else if (this.compiler.unusedTemplate) {
      const unusedTemplate = this.compiler.unusedTemplate;
      this.compiler.unusedTemplate = undefined;
      this.compiler.templates[unusedTemplate.handler] = { entry: this.entry };
    } else if (this.compiler.uncompiledTemplate) {
      const uncompiledTemplate = this.compiler.uncompiledTemplate;
      this.compiler.uncompiledTemplate = undefined;
      uncompiledTemplate.entries.forEach(entry => output += entry.compile());
    } else {
      if (this.isContentRendered()) {
        this.entry.children.forEach(child =>
          output += new Entry(child, this.compiler).compile());
      }
    }

    if (isRendered && (! unusedList || ! unusedList.repeatContainer)) {
      output += '</' + this.getElementName() + '>';
    }

    return output;
  }
}
