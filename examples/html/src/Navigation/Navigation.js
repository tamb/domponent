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
      this.menu.classList.add("show");
      this.open.style.display = "none";
      this.close.style.display = "block";
    } else {
      this.menu.classList.remove("show");
      this.open.style.display = "block";
      this.close.style.display = "none";
    }
  }
}
