import htmlparser from 'htmlparser2';
import Attr from './attr.js';
import Text from './text.js';

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

        Object.keys(attribs).forEach(attr =>
          output += new Attr(attr, attribs[attr], this).compile());

        output += '>';
    	},
    	ontext: text => {
        output += new Text(text, this).compile();
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
