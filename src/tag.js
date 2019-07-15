import Attr from './attr.js';
import AttrName from './attr-name.js';
import Entry from './entry.js';
import Compiler from './compiler.js';

export default class Tag {
  constructor(entry, compiler) {
    this.entry = entry;
    this.compiler = compiler;
  }

  async isContentRendered() {
    let isContentRendered = true;

    for (let attrStr of Object.keys(this.entry.attribs)) {
      const attrName = new AttrName(attrStr);
      const attr = new Attr(attrStr, this.entry.attribs[attrStr], this.compiler);
      if ((attrName.isSlyTest() && ! await Promise.resolve(attr.value.getComputedValue())) || attrName.isSlyTemplate()) {
        isContentRendered = false;
      }
    }

    return isContentRendered;
  }

  async isRendered() {
    let isRendered = this.getElementName() != 'sly';

    for (let attrStr of Object.keys(this.entry.attribs)) {
      const attrName = new AttrName(attrStr);
      const attr = new Attr(attrStr, this.entry.attribs[attrStr], this.compiler);
      if ((attrName.isSlyTest() && ! await attr.value.getComputedValue()) || attrName.isSlyTemplate()) {
        isRendered = false;
      }
    }

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

  async compile() {
    let output = '';
    const isRendered = await this.isRendered();

    const attrResults = await Promise.all(Object.keys(this.entry.attribs)
    .map(attr => new Attr(attr, this.entry.attribs[attr], this.compiler).compile()));

    const unusedList = this.compiler.unusedList;
    this.compiler.unusedList = undefined;

    if (isRendered && (! unusedList || ! unusedList.repeatContainer)) {
      output += '<' + this.getElementName();
      attrResults.forEach(attrResult => output += attrResult);
      output += '>';
    }

    if (unusedList) {
      let listIndex = 0;
      for (let listItem of unusedList.list) {
        this.compiler.resourceResolver.setResourceData(unusedList.handle, listItem);
        this.compiler.resourceResolver.setResourceData(unusedList.handle + 'Index', listIndex);

        let entryOutputs = await Promise.all(this.entry.children.map(child => new Entry(child, this.compiler).compile()))
        entryOutputs.forEach(entryOutput => {
          if (isRendered) {
            if (unusedList.repeatContainer) {
              output += '<' + this.getElementName();
              attrResults.map(attrResult => output += attrResult);
              output += '>';
            }

            output += entryOutput;

            if (unusedList.repeatContainer) {
              output += '</' + this.getElementName() + '>';
            }
          }
        });
        listIndex++;
      }
    } else if (this.compiler.unusedText) {
      let unusedText = await Promise.resolve(this.compiler.unusedText);
      this.compiler.unusedText = undefined;
      output += unusedText.value;
    } else if (this.compiler.unusedResource) {
      let unusedResource = await Promise.resolve(this.compiler.unusedResource);
      this.compiler.unusedResource = undefined;
      output += await new Compiler(unusedResource.type, unusedResource.data, this.compiler.useModels, this.compiler.resourceTypes).compile();
    } else if (this.compiler.unusedTemplate) {
      let unusedTemplate = await Promise.resolve(this.compiler.unusedTemplate);
      this.compiler.unusedTemplate = undefined;
      this.compiler.templates[unusedTemplate.handler] = { entry: this.entry };
    } else if (this.compiler.uncompiledTemplate) {
      let uncompiledTemplate = await Promise.resolve(this.compiler.uncompiledTemplate);
      this.compiler.uncompiledTemplate = undefined;
      uncompiledTemplate.entries.forEach(async entry => {
        output += await entry.compile()
      });
    } else {
      if (await this.isContentRendered()) {
        await Promise.all(
          this.entry.children.map(child => new Entry(child, this.compiler).compile())
        ).then(outputs => {
          outputs.forEach(entryOutput => {
            output += entryOutput;
          });
        });
      }
    }

    if (isRendered && (! unusedList || ! unusedList.repeatContainer)) {
      output += '</' + this.getElementName() + '>';
    }

    return output;
  }
}
