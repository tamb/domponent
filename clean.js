const rimraf = require('rimraf');

console.log('beginning clean');
rimraf('*.tgz', {}, ()=>console.log('removed pack'));
rimraf('/dist', {}, ()=>console.log('removed rollup dist'));
rimraf('example/html/dist', {}, ()=>console.log('removed example dist'));
rimraf('example/html/node_modules', {}, ()=>console.log('removed example node_modules'));
rimraf('example/html/package-lock.json', {}, ()=>console.log('removed example package-lock.json'));
