const fs = require('fs-extra');
const path = require('path');
const esmImport = require('esm')(module);
const Compiler = esmImport('../../src/compiler.js').default;

class MyClass {
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

class MovieUseModel {
  constructor(resourceResolver) {
    this.name = resourceResolver.resolve('name');
    this.releaseDate = resourceResolver.resolve('releaseDate');
    this._releaseDate = new Date(resourceResolver.resolve('releaseDate'));
  }

  formattedReleaseDate() {
    // TODO NOT WORKING
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = this._releaseDate.getDate();
    var monthIndex = this._releaseDate.getMonth();
    var year = this._releaseDate.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}

class MoviesUseModel {
  constructor(resourceResolver) {
    this.movies = resourceResolver.resolve('movies').map(movie => {
      let temp = new MovieUseModel(movie);
      return temp;
    });
  }
}

async function main() {
  let exampleHtml = await fs.readFile(path.resolve(__dirname, './example.html'), 'utf-8');
  let resourceData = JSON.parse(await fs.readFile(path.resolve(__dirname, './resource-data.json'), 'utf-8'));
  let useModels = {
    MovieUseModel,
    MoviesUseModel,
    "some.class.path.MyClass": MyClass,
    "some.path.to.a.java.ExampleClass": {
      "title": "Example title",
      "description": "Example description"
    },
    "some.path.to.a.java.FooClass": {
      "example": "I am from FooClass",
      "myList": [
        "one",
        "two",
        "three"
      ]
    }
  };
  let fooResourceHtml = await fs.readFile(path.resolve(__dirname, './foo-resource.html'), 'utf-8');
  let resourceTypes = {
    "foo": fooResourceHtml,
    "simple": "<div>${hello}</div>"
  };

  new Compiler(exampleHtml, resourceData, useModels, resourceTypes).compile()
  .then(result => {
    console.log(result);
  });
}

main();
