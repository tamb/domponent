export default function(id) {
  console.log("inserting into dom");
  const root = document.getElementById("root");
  const number = Math.floor(Math.random()*100);
  const component = `
  <div id="${id}" data-component="Counter" data-state="count:${number}|${number % 5 === 0? 'ofFive:true' : null}">
  <h2 data-action="mousedown:goBlue|mouseup:goGreen">Async Counter</h2>
  <div>count: <span data-bind="state:count"></span></div>
  <button
    type="button"
    data-action="click:increment|mouseover:goBlue|mouseout:goGreen"
    class="increment"
  >
    +1
  </button>
  <button type="button" data-action="click:decrement" class="decrement">
    -1
  </button>
</div>
  `;
  root.insertAdjacentHTML("beforeend", component);
}
