import { Component } from "domponent";
import "./Counter.scss";

export default class Counter extends Component {
  constructor(conf) {
    super(conf);
    this.state = {
      count: parseInt(this.state.count) || 0,
      isEven: this.state.count
        ? this.state.count % 2 === 0
          ? true
          : false
        : true,
      stateFieldFromDOM: this.state.stateFieldFromDOM || "default cat",
      stateFieldDefault: "default iPhone 11"
    };
    this.setState(this.state);
  }

  increment = e => {
    const newState = {};
    const largerCount = parseInt(this.state.count + 1, 10);
    newState.count = largerCount;
    newState.isEven = largerCount % 2 === 0;
    this.setState(newState, () => console.log("Single Callback", this));
  };

  decrement = e => {
    const newState = {};
    const fewerCount = parseInt(this.state.count - 1, 10);
    newState.count = fewerCount;
    newState.isEven = fewerCount % 2 === 0;
    this.setState(newState);
  };

  // connecting() {
  //   console.log("Connecting:", this.state);
  // }

  // connected() {
  //   console.log("Connected:", this.state);
  // }

  stateDidUpdate() {
    this.setEven();
    console.log("state updated", this.state);
  }

  setEven = () => {
    if (this.state.isEven) {
      this.$root.classList.add("even");
    } else {
      this.$root.classList.remove("even");
    }
  };
}
