export default function(id) {
  const root = document.getElementById("root");
  const number = Math.floor(Math.random() * 100);
  const isEven = number % 2 === 0;
  const component = `
    <div class="col-md-3">
    <div id="${id}" data-component="Counter" data-state='{"count":${number},"isEven":${isEven}}'>
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
    </div>
  `;
  root.insertAdjacentHTML("beforeend", component);
}
