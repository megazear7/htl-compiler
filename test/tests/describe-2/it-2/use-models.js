class ExampleModel {
  constructor(resourceResolver) {
    this._namePromise = Promise.all([
      resourceResolver.resolve('firstName'),
      resourceResolver.resolve('lastName')
    ]).then(name => name[0] + ' ' + name[1]);
  }

  name() {
    return this._namePromise;
  }
}

export default {
  "some.example.class.path.ExampleModel": ExampleModel
};
