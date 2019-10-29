// import { Component, Fragment, render } from 'react';
// import ReactDOM from 'react-dom';
import { Component, Fragment, h, render } from "preact";

import { INTERVAL, AMOUNT } from "../consts.js";

class Twirl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanding: true,
      width: props.width || 1,
      count: props.count || 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.expanding) {
        this.setState(
          { width: ++this.state.width, count: this.state.count + 1 },
          () => {
            if (this.state.width >= 250) {
              this.setState({ expanding: false });
            }
          }
        );
      } else {
        this.setState(
          { width: --this.state.width, count: this.state.count - 1 },
          () => {
            if (this.state.width === 0) {
              this.setState({ expanding: true });
            }
          }
        );
      }
    }, INTERVAL);
  }

  render() {
    return (
      <div
        style={{
          height: "20px",
          width: `${this.state.width}px`,
          border: "1px solid"
        }}
      >
        <p>{this.state.count}</p>
      </div>
    );
  }
}

const arr = [];

for (let i = 0; i < AMOUNT; i++) {
  arr.push(i);
}

const App = function() {
  return (
    <Fragment>
      {arr.map((a, i) => (
        <Twirl key={i} count={0} width={0} />
      ))}
    </Fragment>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.getElementById("root"));
});
