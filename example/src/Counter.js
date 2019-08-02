import { Component } from "./Framework/index"
import "./Counter.css";

console.log(Component)

export default class Counter extends Component {
  constructor(el) {
    super(el);
    console.log('in counter')
    this.state = {
      count: parseInt(this.state.count) || 0,
      ofFive: this.state.ofFive || false
    };
    this.setState();
  }

  increment(e) {
    console.log('Gonna increment');
    const newState = {};
    const largerCount = parseInt(this.state.count + 1, 10);
    newState.count = largerCount;
    newState.ofFive = largerCount % 5 === 0;
    this.setState(newState);
  }

  decrement(e) {
    const newState = {};
    const fewerCount = parseInt(this.state.count - 1, 10);
    newState.count = fewerCount;
    newState.ofFive = fewerCount % 5 === 0;
    this.setState(newState);
  }

  goBlue(e) {
    e.target.style.color = "blue";
  }

  goGreen(e) {
    e.target.style.color = "green";
  }

  stateDidUpdate() {
    this.setYellow();
  }

  setYellow() {
    if (this.state.ofFive) {
      this.$root.classList.add("yellow");
    } else {
      this.$root.classList.remove("yellow");
    }
  }
}
