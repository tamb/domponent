import { Init } from 'domponent'
import Counter from "./Counter";
import CurrentTime from "./CurrentTime";
import DisplayAnything from "./DisplayAnything";
import Name from "./Name";
import HoverLetter from './HoverLetter';
import Navigation from './Navigation';
import domInsert from "./domInsert";

import './app.scss';

feather.replace();

console.time('appCreation');
const App = new Init({
  selector: document.getElementById("root"),
  components: {
    Counter,
    CurrentTime,
    DisplayAnything,
    Name,
    HoverLetter,
    Navigation
  },
  appCreated: () => console.log("app created")
});
console.timeEnd('appCreation');

window.DomponentApp = App;

setTimeout(() => {
  domInsert("id2");
  App.createComponent(document.getElementById("id2"), ()=>feather.replace());
}, 1000);

setTimeout(() => {
  domInsert("id3");
  App.createComponent(document.getElementById("id3"), ()=>feather.replace());
}, 3000);
