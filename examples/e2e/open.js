const open = require("open");

(async () => {
  // Specify app arguments
  await open("http://localhost:1234/index.html", {
    app: ["firefox"],
    wait: true
  });
})();
