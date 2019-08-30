import { Init } from 'domponent'
import Counter from "./Counter";
import Timer from "./Timer";
import DisplayAnything from "./DisplayAnything";
import Name from "./Name";
import HoverLetter from './HoverLetter';
import Navigation from './Navigation';
import ShowCode from './ShowCode';
import domInsert from "./domInsert";

import './app.scss';

feather.replace();

console.time('appCreation');
const App = new Init({
  selector: document.getElementById("root"),
  components: {
    Counter,
    Timer,
    DisplayAnything,
    Name,
    HoverLetter,
    Navigation,
    ShowCode,
  },
  appCreated: () => console.log("app created")
});
console.timeEnd('appCreation');

window.DomponentApp = App;

setTimeout(() => {
  domInsert("id2");
  App.createComponent(document.getElementById("id2"), ()=>feather.replace());
  App.createComponent(document.getElementById("async-props"), ()=>feather.replace());
}, 1000);
