import { Exponent } from "domponent";
import "./DisplayAnything.scss";

export default class DisplayAnything extends Exponent {
  constructor(el) {
    super(el);
    this.displayProps();
  }

  propsDidUpdate() {
    this.displayProps();
  }

  displayProps() {
    this.$refs.objects.innerHTML = JSON.stringify(this.props, null, 1);
  }
}
