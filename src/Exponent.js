import Scope from "./Scope";

import { createPropObjects, bindListeners } from './componentUtils'

export default class Exponent extends Scope {
  constructor(config, wait = false) {
    super(config);
    this.connecting();
    this.props = {};
    this.$d = new Set();
    this.$p = createPropObjects.call(this);
    bindListeners.call(this);
    wait? null : this.connected();
  }

  // lifecycle methods
  connecting(){}
  connected(){}
  disconnecting(){}
  propsWillUpdate() {}
  propsDidUpdate() {}

}
