import Exponent from './Exponent';

import {
  splitMultipleValues,
  splitKeyValuePairs
} from './utils'

function createStateObjects() {
  const nodes = this.$root.querySelectorAll('[data-bind^="state:"]');
  if (nodes.length > 0) {
    const stateObjects = {};
    nodes.forEach(el => {
      const newStateObject = {};
      const states = splitMultipleValues(el.getAttribute("data-bind"));
      states.forEach(state => {
        const parts = splitKeyValuePairs(state);
        const stateKey = parts[1];        
        newStateObject.el = el;
        if (!stateObjects[stateKey]) {
          stateObjects[stateKey] = [];
        }
        stateObjects[stateKey].push(newStateObject);
      });
    }, this);
    return stateObjects;
  }
  return null;
}

function initState() {
  const stateAttr = this.$root.getAttribute("data-state");
  if (stateAttr) {
    const fields = splitMultipleValues(stateAttr);
    const state = {};
    fields.forEach(field => {
      const splitField = splitKeyValuePairs(field);
      state[splitField[0]] = splitField[1];
    });
    this.setState(state);
  }
}


export default class Component extends Exponent{
    constructor(config) {
      super(config);
      this.state = {};
      this.stateObjects = createStateObjects.call(this);
      initState.call(this);
      this.constructor.name == 'Component'? this.created(): null;
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
          const els = [
            ...this.$root.querySelectorAll(`[data-bind="state:${stateKey}"]`)
          ];
  
          if (els.length > 0) {
            els.forEach(el => {
              this._updateDOM(el, newState[stateKey]);
            });
          }
        }
      }
      if (this.dependents.size > 0) {
        this._updateDependents(propsToUpdate);
      }
      fn ? fn() : null;
      this.stateDidUpdate();
    }
  }