import { Init } from 'domponent'
import Counter from "./Counter/Counter";
import Timer from "./Timer/Timer";
import DisplayAnything from "./DisplayAnything/DisplayAnything";
import FavoriteShow from "./FavoriteShow/FavoriteShow";
import HoverLetter from './HoverLetter/HoverLetter';
import Navigation from './Navigation/Navigation';
import ShowCode from './ShowCode/ShowCode';
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
    FavoriteShow,
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
