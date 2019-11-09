import { Exponent } from "domponent";
import "./AddHighlight.scss";

export default class AddHighlight extends Exponent {
  constructor(conf) {
    super(conf);
  }

  toggle() {
    document.body.classList.toggle("highlight");
    this.$root.classList.toggle("highlight");
  }
}
