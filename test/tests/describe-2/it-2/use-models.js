class ExampleModel {
  constructor(resourceResolver) {
    this.name = resourceResolver.resolve('firstName') + " " + resourceResolver.resolve('lastName');
  }

  name() {
    return name;
  }
}

export default {
  "some.example.class.path.ExampleModel": ExampleModel
};
