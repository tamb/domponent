import { Exponent } from "domponent";
import "./AddHighlight.scss";

export default class AddHighlight extends Exponent {
  constructor(conf) {
    super(conf);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    document.body.classList.toggle("highlight");
    this.$root.classList.toggle("highlight");
  }
}
