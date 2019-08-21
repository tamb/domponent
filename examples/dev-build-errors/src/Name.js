import { Component } from "domponent/dist/domponent.development";

export default class Name extends Component {
  constructor(el) {
    super(el);
    this.state = {
      name: "Thomas"
    };
  }

  handleInput(event) {
    this.setState({ name: event.target.value });
  }

  stateWillUpdate() {
    this.secondInput = this.$root.querySelector(".above-controlled");
  }

  stateDidUpdate() {
    this.secondInput.value = this.state.name;
  }
}
