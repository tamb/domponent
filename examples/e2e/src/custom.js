import { Init } from "domponent";
import Counter from "./Counter/Counter";

const app = new Init({
  components: {
    Counter
  },
  selector: document.getElementById("custom"),
  dataAttributes: {
    action: "my-cool-action",
    bind: "show-me"
  },
  customSyntax: {
    METHOD_CALL: "#",
    FROM_COMPONENT: "+"
  }
});
