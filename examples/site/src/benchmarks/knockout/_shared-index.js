import ko from "knockout";

// Here's my data model
var ViewModel = function(count, width) {
  this.count = ko.observable(count);
  this.width = ko.observable(width);
  this.reps = 0;
  console.log(this);
  this.expanding = true;

  document.addEventListener("stopEvent", () => {
    globalCounts.push(this.reps);
  });

  setInterval(() => {
    if (this.expanding) {
      if (this.count() < 250) {
        this.count(this.count() + 1);
        this.width(this.width() + 1);
      } else {
        this.expanding = false;
        this.count(this.count() - 1);
        this.width(this.width() - 1);
      }
    } else {
      if (this.count() > 0) {
        this.count(this.count() - 1);
        this.width(this.width() - 1);
      } else {
        this.expanding = true;
        this.count(this.count() + 1);
        this.width(this.width() + 1);
      }
    }
    this.reps++;
  }, 1);
};

window.globalCounts = [];

ko.applyBindings(new ViewModel(0, 0)); // This makes Knockout get to work
const stopEvent = new Event("stopEvent");
setTimeout(function() {
  document.dispatchEvent(stopEvent);
}, 60000);

const d = 816; // This is a shared ViewModel instance -- need to measure on components
// measure all on shared model as well
