import {
  Component,
  Init
} from "domponent/dist/domponent.es5.production.min.js";
// import { Component, Init } from "domponent";

import { INTERVAL } from "../consts.js";

window.globalCounts = [];

class Wave extends Component {
  constructor(conf) {
    super(conf);
    this.state = {
      expanding: true,
      width: this.state.width || 0,
      count: this.state.count || 0,
      reps: 0
    };
  }

  connected() {
    document.addEventListener("stopEvent", () => {
      globalCounts.push(this.state.reps);
    });
    this.$root.style.height = "20px";
    this.$root.style.width = "1px";
    this.$root.style.border = "1px solid";

    setInterval(() => {
      if (this.state.expanding) {
        this.setState(
          {
            width: ++this.state.width,
            count: this.state.count + 1,
            reps: this.state.reps + 1
          },
          () => {
            if (this.state.width >= 250) {
              this.setState({ expanding: false });
            }
          }
        );
      } else {
        this.setState(
          {
            width: --this.state.width,
            count: this.state.count - 1,
            reps: this.state.reps + 1
          },
          () => {
            if (this.state.width === 0) {
              this.setState({ expanding: true });
            }
          }
        );
      }
    }, INTERVAL);
  }

  stateDidUpdate() {
    this.$root.style.width = `${this.state.width}px`;
  }
}

const stopEvent = new Event("stopEvent");
setTimeout(function() {
  document.dispatchEvent(stopEvent);
}, 60000);

document.addEventListener("DOMContentLoaded", () => {
  const app = new Init({
    selector: document.getElementById("root"),
    components: {
      Wave
    }
  });
});
