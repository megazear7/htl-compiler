import Compiler from "../../dist/compiler-esm.js";

new Compiler(
  "<p>\${test}</p>",
  { test: "Hello, World!" })
.compile()
.then(result => document.write(result));
