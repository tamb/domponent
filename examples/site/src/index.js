import "normalize-scss/fork-versions/default/_normalize.scss";
import jump from "jump.js";
import "./fonts.scss";
import "./base.scss";
import "./includes/nav/nav";
import "./includes/tags/tags";
import "./includes/header/header";
import "./includes/btn/btn";
import "./includes/markup/markup";
import "./includes/charts/charts";
import {
  Init,
  Component
} from "domponent/dist/domponent.es5.production.min.js";

import feather from "feather-icons";

feather.replace();

class Counter extends Component {
  constructor(el) {
    super(el);
    this.state = {
      count: 0
    };
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(`[data-action="click.jump"]`).forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault;
      const anchor = e.target;
      console.log(anchor);
      jump(anchor.getAttribute("href"));
    });
  });

  const app = new Init({
    selector: document.querySelector(".counter-preview"),
    components: {
      Counter
    }
  });
});
