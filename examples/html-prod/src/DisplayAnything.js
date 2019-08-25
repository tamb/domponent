import { Exponent } from 'domponent';

export default class DisplayAnything extends Exponent {
  constructor(el) {
    super(el);
    this.objects = this.$root.querySelector(".propObjects");
    this.displayProps();
  }

  propsDidUpdate(oldProps) {
      this.displayProps();
    
  }
  displayProps() {
    this.objects.textContent = `isTopcounterEven: ${this.props.isTopCounterEven}`
  }
}
