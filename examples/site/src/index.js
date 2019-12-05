import "normalize-scss/fork-versions/default/_normalize.scss";
import jump from "jump.js";
import { Init, Component } from "domponent/dist/domponent.development.js";
import feather from "feather-icons";

import "./fonts.scss";
import "./base.scss";
import "./includes/nav/nav";
import "./includes/tags/tags";
import "./includes/header/header";
import "./includes/btn/btn";
import "./includes/markup/markup";
import "./includes/charts/charts";
import "./includes/seo/seo";
import "./includes/api/api";

feather.replace();

class HoverBuddy extends Component {
  constructor(props) {
    super(props);
  }

  highlight(e) {
    console.log(this);
    const refName = e.target.dataset.refArray;
    if (refName) {
      this[refName].forEach(el => el.classList.add("same"));
    }
  }
  removeHighlight(e) {
    const refName = e.target.dataset.refArray;
    if (refName) {
      this[refName].forEach(el => el.classList.remove("same"));
    }
  }
}

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
    selector: document.body,
    components: {
      Counter,
      HoverBuddy
    }
  });

  console.log(app);
});
