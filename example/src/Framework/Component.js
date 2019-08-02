import Exponent from "./Exponent";

import { updateDOM } from "./utils";
import {
  scopeElements,
  createStateObjects,
  bindListeners,
  initState
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
    console.log("setting state");
    this.stateWillUpdate();
    const propsToUpdate = [];
    for (let stateKey in newState) {
      if (newState[stateKey] !== this.state[stateKey]) {
        propsToUpdate.push(stateKey);
        this.state[stateKey] = newState[stateKey];
        const els = [
          ...scopeElements.call(this, `[data-bind="state:${this.$name}.${stateKey}"]`) // TODO remove selector from setState.  this should already exist.
        ];
        console.log('scoped state')
        if (els.length > 0) {
          els.forEach(el => {
            updateDOM(el, newState[stateKey]);
          });
        }
      }
    }
    if (this.dependents.size > 0) {
      updateDependents.call(this, propsToUpdate);
    }
    fn ? fn() : null;
    this.stateDidUpdate();
  }
}
