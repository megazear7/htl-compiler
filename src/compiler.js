import htmlparser from 'htmlparser2';
import Entry from './entry.js';

export default class Compiler {
  constructor(template = '', resourceData = { }, useModels = { }, resourceTypes = { }) {
    this.template = template;
    this.resourceData = resourceData;
    this.useModels = useModels;
    this.resourceTypes = resourceTypes;
    this.templates = [ ];
  }

  compile() {
    return Promise.all([
      Promise.resolve(this.template),
      Promise.resolve(this.resourceData),
      Promise.resolve(this.useModels),
      Promise.resolve(this.resourceTypes)
    ])
    .then(values => {
      this.template = values[0];
      this.resourceData = values[1];
      this.useModels = values[2];
      this.resourceTypes = values[3];
    })
    .then(() => this.compileSync());
  }

  compileSync() {
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

  addUnusedList({ handle, list, repeatContainer }) {
    this.unusedList = { handle, list, repeatContainer };
  }

  addUnusedText({ value }) {
    this.unusedText = { value };
  }

  setUnusedResource({ type, data }) {
    this.unusedResource = { type, data };
  }

  addUnusedTemplate({ handler }) {
    this.unusedTemplate = { handler };
  }

  addUncompiledTemplate({ entries }) {
    this.uncompiledTemplate = { entries };
  }
}
