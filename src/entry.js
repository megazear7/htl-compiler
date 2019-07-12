import htmlparser from 'htmlparser2';
import Tag from './tag.js';
import Text from './text.js';

export default class Entry {
  constructor(entry, compiler) {
    this.entry = entry;
    this.compiler = compiler;
  }

  async compile() {
    let output = '';

    if (this.entry.type === 'tag') {
      var tag = new Tag(this.entry, this.compiler);
      output += await tag.compile();
    } else if (this.entry.type === 'text') {
      output += new Text(this.entry.data, this.compiler).compile();
    }

    return Promise.resolve(output);
  }
}
