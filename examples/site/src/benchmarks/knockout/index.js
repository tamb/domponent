import ko from "knockout";

// Here's my data model
var ViewModel = function(count, width) {
  this.width = ko.observable(count);
  this.count = ko.observable(width);
  this.reps = ko.observable(0);

  // this.fullName = ko.pureComputed(function() {
  //     // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
  //     return this.firstName() + " " + this.lastName();
  // }, this);
};

ko.applyBindings(new ViewModel(0, 0)); // This makes Knockout get to work
