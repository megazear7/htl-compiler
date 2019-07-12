import htmlparser from 'htmlparser2';
import Entry from './entry.js';
import { isClass } from './util.js';
import StaticResourceResolver from './static-resource-resolver.js';

export default class Compiler {
  constructor(
      template = '',
      resourceResolver = new StaticResourceResolver({ }),
      useModels = { },
      resourceTypes = { }) {
    this.template = template;
    this.resourceResolver = resourceResolver;
    this.useModels = useModels;
    this.resourceTypes = resourceTypes;
    this.templates = [ ];
  }

  compile() {
    return Promise.all([
      Promise.resolve(this.template),
      Promise.resolve(this.resourceResolver),
      Promise.resolve(this.useModels),
      Promise.resolve(this.resourceTypes)
    ])
    .then(values => {
      this.template = values[0];
      this.resourceResolver = values[1];
      this.useModels = values[2];
      this.resourceTypes = values[3];
    })
    .then(async () => {
      let output = '';

      if (! isClass(this.resourceResolver)) {
        this.resourceResolver = new StaticResourceResolver(this.resourceResolver);
      }

      let nodes = [ ];

      var handler = new htmlparser.DomHandler(async (error, dom) => {
        if (error) {
          console.log(error);
        } else {
          nodes = dom;
        }
      });

      const parser = new htmlparser.Parser(handler, { lowerCaseAttributeNames: false });

      parser.write(this.template);
      parser.end();

      let entryOutputs = await Promise.all(
        nodes.map(async entry => await new Entry(entry, this).compile()));

      entryOutputs.forEach(entryOutput => output += entryOutput);

      return output;
    });
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
