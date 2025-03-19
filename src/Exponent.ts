import Scope from "./Scope";

import {
  createPropObjects,
  bindListeners,
  createRefs,
  createRefArrays
} from "./componentUtils";

export default class Exponent extends Scope {
  constructor(config, wait = false) {
    super(config);
    this.connecting();
    this.props = {};
    this.$d = new Set();
    this.$refs = {};
    createRefs.call(this);
    createRefArrays.call(this);
    this.$p = createPropObjects.call(this);
    bindListeners.call(this);
    this.$watchers = this.watch ? this.watch() : {};
    wait ? null : this.connected();
  }

  // lifecycle methods
  connecting() {}
  connected() {}
  disconnecting() {}
  propsWillUpdate() {}
  propsDidUpdate() {}
}
