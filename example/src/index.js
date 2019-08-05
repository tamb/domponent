// import { Init } from 'domponent'
import Counter from "./Counter";
import CurrentTime from "./CurrentTime";
import DisplayAnything from "./DisplayAnything";
// import Name from "./Name";
import { Init } from "./Framework/index";
// import domInsert from "./domInsert";
import "./styles.css";

console.time('appCreation');
const App = new Init({
  selector: document.getElementById("root"),
  components: {
    Counter,
    CurrentTime,
    DisplayAnything
    // Name
  },
  appCreated: () => console.log("app created")
});
console.timeEnd('appCreation');

// const mills = document.getElementById('mills');
// const up = document.getElementById('up');
// const down = document.getElementById('down');

// let grow = 1;
// let shrink = 60;
// setInterval(()=>{
//   --shrink;
//   mills.textContent = ++grow;
//   if(grow === 30){
//     grow = 0;
//   }
//   if(shrink === 0){
//     shrink = 30;
//   }
//   up.style.height = grow * 3+'px';
//   down.style.height = shrink * 3+'px';

// },1);

// setTimeout(() => {
//   domInsert("id2");
//   App.createComponent(document.getElementById("id2"));
// }, 1000);

// setTimeout(() => {
//   domInsert("id3");
//   App.createComponent(document.getElementById("id3"));
// }, 3000);
