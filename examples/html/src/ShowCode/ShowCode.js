import { Exponent } from "domponent";
import "./ShowCode.scss";

export default class ShowCode extends Exponent {
  constructor(conf) {
    super(conf);
  }
  toggle() {
    console.log(this);
    this.foldable.classList.toggle("show");
  }
}
