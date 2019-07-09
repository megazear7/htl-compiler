import htmlparser from 'htmlparser2';
import Tag from './tag.js';
import Text from './text.js';

export default class Entry {
  constructor(entry, compiler) {
    this.entry = entry;
    this.compiler = compiler;
  }

  compile() {
    let output = '';

    if (this.entry.type === 'tag') {
      output += new Tag(this.entry, this.compiler).compile();
    } else if (this.entry.type === 'text') {
      output += new Text(this.entry.data, this.compiler).compile();
    }

    return output;
  }
}
