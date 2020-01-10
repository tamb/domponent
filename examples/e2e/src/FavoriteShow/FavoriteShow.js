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
        // pre(newS, oldS){
        //   console.log("This is a pre watcher", newS, oldS)
        // },
        post() {
          console.log("POST", this);
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
