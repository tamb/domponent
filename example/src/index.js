import { Init } from 'domponent'
import Counter from "./Counter";
import CurrentTime from "./CurrentTime";
import DisplayAnything from "./DisplayAnything";
import Name from "./Name";
import domInsert from "./domInsert";

console.time('appCreation');
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
console.timeEnd('appCreation');

// const mills = document.getElementById('mills');
// const up = document.getElementById('up');
// const down = document.getElementById('down');
// const total = document.getElementById('total');

// const max = 15;

// let totalCount = 0;
// let grow = 1;
// let shrink = 60;
// setInterval(()=>{
//   --shrink;
//   mills.textContent = ++grow;
//   if(grow === max){
//     grow = 0;
//     total.textContent = ++totalCount;
//   }
//   if(shrink === 0){
//     shrink = max;
//   }
//   up.style.height = grow * 6+'px';
//   down.style.height = shrink * 6+'px';

// },1);

setTimeout(() => {
  domInsert("id2");
  App.createComponent(document.getElementById("id2"));
}, 1000);

setTimeout(() => {
  domInsert("id3");
  App.createComponent(document.getElementById("id3"));
}, 3000);
