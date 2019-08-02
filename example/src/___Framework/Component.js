import Exponent from "./Exponent";

import { updateDOM, hasCallback } from "./utils";
import {
  createStateObjects,
  bindListeners,
  initState,
  updateDependents
} from "./componentUtils";

export default class Component extends Exponent {
  constructor(config) {
    super(config);
    this.state = {};
    this.stateObjects = createStateObjects.call(this);
    bindListeners.call(this);
    initState.call(this);
    this.constructor.name == "Component" ? this.created() : null;
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
        if (this.stateObjects[stateKey]) {
          this.stateObjects[stateKey].forEach(stateObj => {
            updateDOM(stateObj.el, newState[stateKey]);
          });
        }
      }
    }
    if (this.dependents.size > 0) {
      updateDependents.call(this, propsToUpdate);
    }
    hasCallback(fn);
    this.stateDidUpdate();
  }
}
