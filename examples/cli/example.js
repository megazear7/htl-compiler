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

class MoviesUseModel {
  constructor(resourceResolver) {
    this.movies = resourceResolver.resolve('movies').then(movies => movies.map(movie => new MovieUseModel(movie)));
  }
}

class MovieUseModel {
  constructor(context) {
    this.name = context.name;
    this.releaseDate = context.releaseDate;
    this._releaseDate = new Date(context.releaseDate);
  }

  formattedReleaseDate() {
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
