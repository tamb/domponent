import { Exponent } from 'domponent';

export default class DisplayAnything extends Exponent {
  constructor(el) {
    super(el);
    this.displayProps();
  }

  propsDidUpdate() {
      this.displayProps();
  }

  displayProps() {
    this.objects.innerHTML = JSON.stringify(this.props, null, 4);
  }
}
