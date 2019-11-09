import { Component } from "domponent";

export default class FavoriteShow extends Component {
  constructor(el) {
    super(el);
    this.state = {
      show: "Thomas"
    };
  }

  connected() {
    this.setState(this.state);
  }

  handleInput(event) {
    this.setState({ show: event.target.value });
  }

  stateDidUpdate() {
    this.secondInput.value = this.state.show;
  }
}
