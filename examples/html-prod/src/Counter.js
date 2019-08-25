import { Component } from 'domponent';

export default class Counter extends Component {
  constructor(conf) {
    super(conf);
    this.state = {
      count: parseInt(this.state.count) || 0,
      isEven: this.state.isEven
    };
    this.setState();
    this.setYellow();
  }

  increment(e) {
    const newState = {};
    const largerCount = parseInt(this.state.count + 1, 10);
    newState.count = largerCount;
    newState.isEven = largerCount % 2 === 0;
    this.setState(newState, ()=>console.log('Single Callback', this));
  }

  decrement(e) {
    const newState = {};
    const fewerCount = parseInt(this.state.count - 1, 10);
    newState.count = fewerCount;
    newState.isEven = fewerCount % 2 === 0;
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
    if (this.state.isEven) {
      this.$root.classList.add("yellow");
    } else {
      this.$root.classList.remove("yellow");
    }
  }
}
