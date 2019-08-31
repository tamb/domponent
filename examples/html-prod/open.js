const open = require('open');
 
(async () => {
    // Specify app arguments
    await open('http://localhost:1234/', {app: ["firefox"], wait: true});
})();