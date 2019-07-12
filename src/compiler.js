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
    .then(() => {
      let output = '';

      if (! isClass(this.resourceResolver)) {
        this.resourceResolver = new StaticResourceResolver(this.resourceResolver);
      }

      var handler = new htmlparser.DomHandler(async (error, dom) => {
        if (error) {
          console.log(error);
        } else {
          console.log('X');

          /* ATTENTION! ASYNC RESOURCE RESOLVER
             THIS SIMPLY WILL NOT WORK.
             This is inside a callback that is passed to htmlparser2.
             We cannot use promises here because htmlparser2 is not going to wait
             for our async promises to complete before returning. This means that
             the "output" object will not get updated with the result of the
             entryOutputs, as this code will execute _after_ this the output is
             returned from the compile method.
          */
          let entryOutputs = await Promise.all(
            dom.map(
              async entry => await new Entry(entry, this).compile()));

          console.log('1', entryOutputs);

          entryOutputs.forEach(entryOutput => output += entryOutput);

          console.log('2');
        }
      });

      const parser = new htmlparser.Parser(handler, { lowerCaseAttributeNames: false });

      parser.write(this.template);
      parser.end();

      console.log('COMPILER', output);

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
