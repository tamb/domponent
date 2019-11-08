import ko from "knockout";
import { AMOUNT, INTERVAL } from "../consts";

ko.components.register("wave-component", {
  viewModel: function(params) {
    this.count = ko.observable(0);
    this.width = ko.observable(0);
    this.reps = 0;
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
    }, INTERVAL);
  },
  template: `
    <div data-bind="style: {height: '20px', border: '1px solid', width: width() + 'px'}">
        <p data-bind="text: count"></p>
    </div>`
});

var viewModel = function() {
  var self = this;

  self.waves = ko.observableArray();
  for (let i = 0; i < AMOUNT; i++) {
    self.waves.push(i);
  }
};

var model = new viewModel();
ko.applyBindings(model);
