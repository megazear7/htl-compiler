import Compiler from "../../dist/compiler";
let exampleHtml = "<h1>${test}</h1>";
let resourceData = { test: "Hello, World!" };
let useModels = {};
let fooResourceHtml = {};
let resourceTypes = {};

document.write(
    new Compiler(exampleHtml, resourceData, useModels, resourceTypes).compile()
);
