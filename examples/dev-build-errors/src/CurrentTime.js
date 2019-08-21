import { Component } from 'domponent/dist/domponent.development';

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

  changeTime() {
    const date = new Date();
    this.setState({
      seconds: date.getSeconds(),
      hours: date.getHours(),
      minutes: date.getMinutes()
    });
  }
}
