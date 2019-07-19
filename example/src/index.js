import Counter from "./Counter";
import CurrentTime from "./CurrentTime";
import DisplayAnything from "./DisplayAnything";
import Name from "./Name";
import Init from "./Framework";
import domInsert from "./domInsert";
import "./styles.css";

const App = new Init({
  selector: document.getElementById("root"),
  components: {
    Counter,
    CurrentTime,
    DisplayAnything,
    Name
  },
  appCreated: () => console.log("app created")
});

setTimeout(() => {
  domInsert("id2");
  App.createComponent(document.getElementById("id2"));
}, 1000);

setTimeout(() => {
  domInsert("id3");
  App.createComponent(document.getElementById("id3"));
}, 3000);
