import { Component } from "domponent";
import "./Navigation.scss";

export default class Navigation extends Component {
  constructor(conf) {
    super(conf);
    this.styleID = "collapse-comp-styles";

    this.changeNav = this.changeNav.bind(this);
  }

  toggle() {
    this.setState({ opened: !this.state.opened }, this.changeNav);
  }

  changeNav() {
    if (this.state.opened) {
      this.$refs.menu.classList.add("show");
      this.$refs.open.style.display = "none";
      this.$refs.close.style.display = "block";
    } else {
      this.$refs.menu.classList.remove("show");
      this.$refs.open.style.display = "block";
      this.$refs.close.style.display = "none";
    }
  }
}
