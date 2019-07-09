import htmlparser from 'htmlparser2';

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
        output += '<' + tagname + '>';
    	},
    	ontext: text => {
        output += text;
    	},
    	onclosetag: tagname => {
        output += '</' + tagname + '>';
    	}
    }, { decodeEntities: true });

    parser.write(this.template);
    parser.end();

    return output;
  }
}
