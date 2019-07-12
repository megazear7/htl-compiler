export default class StaticResourceResolver {
  constructor(staticJsonData) {
    this.staticJsonData = staticJsonData;
  }

  setResourceData(identifier, jsonData) {
    this.staticJsonData[identifier] = jsonData;
  }

  resolve(path) {
    let pathSegments = path.split('.');
    let value = this.staticJsonData;
    let valueParent = undefined;

    pathSegments.forEach(segment => {
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

    return Promise.resolve(value);
  }
}

function isFunction(functionToCheck) {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
