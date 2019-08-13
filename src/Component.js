import Exponent from "./Exponent";

import { updateDOM, hasCallback } from "./utils";
import {
  createStateObjects,
  initState,
  updateDependents
} from "./componentUtils";

export default class Component extends Exponent {
  constructor(config) {
    super(config, true);
    this.state = {};
    this.$s = createStateObjects.call(this);
    initState.call(this);
    this.connected();
  }

  // lifecycle methods
  stateWillUpdate() {}
  stateDidUpdate() {}

  // public setters
  setState(newState = this.state, fn) {
    this.stateWillUpdate();
    const propsToUpdate = [];
    for (let stateKey in newState) {
      if (newState[stateKey] !== this.state[stateKey]) {
        propsToUpdate.push(stateKey);
        this.state[stateKey] = newState[stateKey];
        if (this.$s[stateKey]) {
          this.$s[stateKey].forEach(stateObj => {
            updateDOM(stateObj.el, newState[stateKey]);
          });
        }
      }
    }
    if (this.$d.size > 0) {
      updateDependents.call(this, propsToUpdate);
    }
    hasCallback(fn);
    this.stateDidUpdate();
  }
}
