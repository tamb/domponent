import Scope from "./Scope";

import { createPropObjects, bindListeners, createRefs } from './componentUtils'

export default class Exponent extends Scope {
  constructor(config, wait = false) {
    super(config);
    this.connecting();
    this.props = {};
    this.$d = new Set();
    createRefs.call(this);
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
