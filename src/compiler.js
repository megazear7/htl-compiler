import htmlparser from 'htmlparser2';

const expressionMatch = /\$\{(.*)\}/g;

export default class Compiler {
  constructor(template, resourceData, useModels, resourceTypes) {
    this.template = template;
    this.resourceData = resourceData;
    this.useModels = useModels;
    this.resourceTypes = resourceTypes;
  }

  compile() {
    let output = '';

    const parser = new htmlparser.Parser({
    	onopentag: (tagname, attribs) => {
        output += '<' + tagname;

        Object.keys(attribs).forEach(attr => {
          if (attr.startsWith('data-sly-use')) {
            const handle = attr.split('\.')[1];
            const matches = expressionMatch.exec(attribs[attr]);

            if (matches && matches.length >= 1) {
              const classPath = [1];
              this.resourceData[handle] = this.useModels[classPath];
            }
          } else {
            output += ' ' + attr + '="' + attribs[attr] + '"';
          }
        });

        output += '>';
    	},
    	ontext: text => {
        output += text.replace(expressionMatch, (a, b) => {
          let value = this.resourceData;
          b.split('.').forEach(identifier => {
            if (typeof value === 'object') {
              value = value[identifier];
            } else {
              value = '';
            }
          });
          return value
        });
    	},
    	onclosetag: tagname => {
        output += '</' + tagname + '>';
    	}
    }, {
      decodeEntities: true,
      lowerCaseAttributeNames: false
    });

    parser.write(this.template);
    parser.end();

    return output;
  }
}
