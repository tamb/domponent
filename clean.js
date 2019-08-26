const rimraf = require('rimraf');

console.log('beginning clean');
rimraf('*.tgz', {}, ()=>console.log('removed pack'));
rimraf('/dist', {}, ()=>console.log('removed rollup dist'));
rimraf('examples/html-*/dist', {}, ()=>console.log('removed example dist'));
// rimraf('examples/**/node_modules', {}, ()=>console.log('removed example node_modules'));
rimraf('examples/**/package-lock.json', {}, ()=>console.log('removed example package-lock.json'));
