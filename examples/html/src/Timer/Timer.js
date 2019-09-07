import { Component } from "domponent";

export default class CurrentTime extends Component {
  constructor(el) {
    super(el);
    this.state = {
      hours: "",
      seconds: "",
      minutes: ""
    };

    setInterval(() => {
      this.changeTime();
    }, 1000);
  }

  padDate(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }

  changeTime() {
    const date = new Date();
    this.setState({
      seconds: this.padDate(date.getSeconds()),
      hours: this.padDate(date.getHours()),
      minutes: this.padDate(date.getMinutes())
    });
  }
}
