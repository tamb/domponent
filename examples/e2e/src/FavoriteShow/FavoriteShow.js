import { Component } from "domponent";

export default class FavoriteShow extends Component {
  constructor(el) {
    super(el);
    this.state = {
      show: "Thomas"
    };
  }

  watch() {
    return {
      show: {
        pre(newValue, oldValue) {
          console.log("This is a pre watcher", newValue);
          console.log("old", oldValue);
        },
        post(newValue) {
          console.log("POST", this);
          console.log(newValue);
          if (this.state.show.length > 15) {
            alert("max length");
          } else {
            this.$refs.secondInput.value = this.state.show;
          }
        }
      }
    };
  }

  connected() {
    this.setState(this.state);
  }

  handleInput(event) {
    this.setState({ show: event.target.value });
  }
}
