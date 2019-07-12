import { Component } from "./Framework";

export default class DisplayAnything extends Component {
  constructor(el) {
    super(el);
  }
  componentMade() {
    this.code = this.root.querySelector(".code");
    this.displayProps();
  }
  propsDidUpdate(oldProps) {
    if (oldProps.goBold !== this.props.goBold) {
      this.displayProps();
    }
  }
  displayProps() {
    this.code.textContent = JSON.stringify(this.props, undefined, 2);
  }
}
