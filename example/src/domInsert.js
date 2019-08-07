export default function(id) {
  console.log("inserting into dom");
  const root = document.getElementById("root");
  const number = Math.floor(Math.random()*100);
  const component = `
  <div id="${id}" data-component="Counter" data-state="count:${number}|${number % 5 === 0? 'ofFive:true' : null}">
  <h2 data-action="mousedown->Counter.goBlue|mouseup->Counter.goGreen">Async Counter</h2>
  <div>count: <span data-bind="state:Counter.count"></span></div>
  <button
    type="button"
    data-action="click->Counter.increment|mouseover->Counter.goBlue|mouseout->Counter.goGreen"
    class="increment"
  >
    +1
  </button>
  <button type="button" data-action="click->Counter.decrement" class="decrement">
    -1
  </button>
</div>
  `;
  root.insertAdjacentHTML("beforeend", component);
}
