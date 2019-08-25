console.log('counter loaded');
window.count = window.count || 0;
window.count++;
window.tom = window.tom || {};
window.tom[`_${window.count}`] = 'new entry';

console.log(window.tom)