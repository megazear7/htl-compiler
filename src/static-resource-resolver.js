export default class StaticResourceResolver {
  constructor(staticJsonData) {
    this.staticJsonData = staticJsonData;
  }

  setResourceData(identifier, jsonData) {
    this.staticJsonData[identifier] = jsonData;
  }

  resolve(path) {
    if (typeof path === 'string') path = path.split('.');
    let value = this.staticJsonData;
    let valueParent = undefined;

    path.forEach(segment => {
      if (typeof value === 'object') {
        valueParent = value;
        value = value[segment];
      } else {
        throw 'No resource exists at path: ' + path;
      }
    });

    if (isFunction(value)) {
      if (valueParent) {
        value = value.call(valueParent);
      } else {
        value = value();
      }
    }

    return value;
  }
}

function isFunction(functionToCheck) {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
