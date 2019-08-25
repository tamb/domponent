export default function(id) {
  const async = document.getElementById("async");
  const number = Math.floor(Math.random() * 100);
  const isEven = number % 2 === 0;
  const component = `
    <div class="col-md-3">
    <div id="${id}" data-component="Counter" data-state='{"count":${number},"isEven":${isEven}}'>
    <h2 data-action="mousedown->Counter.goBlue|mouseup->Counter.goGreen">Async Counter</h2>
    <div>count: <span data-bind="state:Counter.count"></span></div>
    <button type="button" data-action="click->Counter.decrement" class="btn btn-danger">
      -1
    </button>
    
    <button
      type="button"
      data-action="click->Counter.increment|mouseover->Counter.goBlue|mouseout->Counter.goGreen"
      class="btn btn-success"
    >
      +1
    </button>
    
  </div>
    </div>
  `;
  async.insertAdjacentHTML("beforeend", component);
}
