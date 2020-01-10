const rimraf = require("rimraf");

console.log("beginning clean");
rimraf("*.tgz", {}, () => console.log("removed pack"));
rimraf("/dist", {}, () => console.log("removed rollup dist"));
rimraf("examples/e2e*/dist", {}, () => console.log("removed example dist"));
rimraf("examples/e2e*/node_modules", {}, () =>
  console.log("removed example node_modules")
);
rimraf("examples/**/package-lock.json", {}, () =>
  console.log("removed example package-lock.json")
);
