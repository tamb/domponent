var fs = require("fs");
var unified = require("unified");
var markdown = require("remark-parse");
var html = require("remark-html");

unified()
  .use(markdown)
  .use(html)
  .process(fs.readFileSync("./src/code-examples.md"), function(err, file) {
    if (err) throw err;
    console.log(String(file));
  });
