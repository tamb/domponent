export default function(id) {
  const async = document.getElementById("async");
  const number = Math.floor(Math.random() * 100);
  const isEven = number % 2 === 0;
  const component = `
    <div class="col-md-6">
    <div id="${id}" data-component="Counter" class="card" data-state='{"count":${number},"isEven":${isEven}}'>
    <div class="card-body">
    <strong class="card-title" data-action="mousedown->Counter.goBlue|mouseup->Counter.goGreen">Async Counter</strong>
    <div>count: <span data-bind="state:Counter.count"></span></div>
    <button type="button" data-action="click->Counter.decrement" class="btn btn-danger">
      <i aria-label="subtract" data-feather="minus-circle"></i>
    </button>
    
    <button
      type="button"
      data-action="click->Counter.increment|mouseover->Counter.goBlue|mouseout->Counter.goGreen"
      class="btn btn-success"
    >
      <i aria-label="add" data-feather="plus-circle"></i>
    </button>
    </div>
    
  </div>
    </div>
  <div class="col-md-6>
    <div class="card" data-props="theSecond<-Time:seconds|theMinute<-Time:minutes|theHour<-Time:hours" data-component="DisplayAnything">
      <div class="card-body">
        <p class="card-title">
          Asynchronously inherits props
        </p>
        <p>WHOOOOOOOOOOOA!</p>
        <p>props:</p>
        <code>
          <pre class="propObjects"></pre>
        </code>
      </div>
    </div>
  </div>
  `;
  async.insertAdjacentHTML("beforeend", component);
}
