import htmlparser from 'htmlparser2';
import Entry from './entry.js';

export default class Compiler {
  constructor(template, resourceData, useModels, resourceTypes) {
    this.template = template;
    this.resourceData = resourceData;
    this.useModels = useModels;
    this.resourceTypes = resourceTypes;
  }

  compile() {
    let output = '';

    var handler = new htmlparser.DomHandler((error, dom) => {
      if (error) {
        console.log(error);
      } else {
        dom.forEach(entry => {
          output += new Entry(entry, this).compile();
        });
      }
    });

    const parser = new htmlparser.Parser(handler, { lowerCaseAttributeNames: false });

    parser.write(this.template);
    parser.end();

    return output;
  }

  addUnusedList({ handle, list }) {
    this.unusedList = { handle, list };
  }
}
