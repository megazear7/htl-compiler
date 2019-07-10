export default class AttrName {
  constructor(name) {
    this.name = name;
    this.parts = this.name.split('\.');
  }

  getStandardName() {
    return ! this.isSlyAttr() ? this.name : undefined;
  }

  isSlyAttr() {
    return this.name.startsWith('data-sly-');
  }

  isSlyUse() {
    return this.isSlyAttr() && this.getSlyName() === 'data-sly-use';
  }

  isSlyText() {
    return this.isSlyAttr() && this.getSlyName() === 'data-sly-text';
  }

  isSlyElement() {
    return this.isSlyAttr() && this.getSlyName() === 'data-sly-element';
  }

  isSlyTest() {
    return this.isSlyAttr() && this.getSlyName() === 'data-sly-test';
  }

  isSlyList() {
    return this.isSlyAttr() && this.getSlyName() === 'data-sly-list';
  }

  isSlyRepeat() {
    return this.isSlyAttr() && this.getSlyName() === 'data-sly-repeat';
  }

  isSlyResource() {
    return this.isSlyAttr() && this.getSlyName() === 'data-sly-resource';
  }

  isSlyAttribute() {
    return this.isSlyAttr() && this.getSlyName() === 'data-sly-attribute';
  }

  getSlyName() {
    return this.isSlyAttr() ? this.parts[0] : undefined;
  }

  hasSlyIdentifier() {
    return this.isSlyAttr() && this.parts.length >= 2;
  }

  getSlyIdentifier() {
    return this.hasSlyIdentifier() ? this.parts[1] : undefined;
  }
}
