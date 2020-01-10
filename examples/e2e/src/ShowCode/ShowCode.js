import { Exponent } from "domponent";
import "./ShowCode.scss";

export default class ShowCode extends Exponent {
  constructor(conf) {
    super(conf);
  }
  toggle() {
    this.$refs.foldable.classList.toggle("show");
  }
}
