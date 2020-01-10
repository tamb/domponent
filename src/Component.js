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
    this.$watchers = this.watch ? this.watch() : {};
    initState.call(this);
    this.$s = createStateObjects.call(this);
    this.connected();
  }

  // lifecycle methods
  stateWillUpdate() {}
  stateDidUpdate() {}

  // TODO - add dev note that if # of fields being watched is fewer than 2,
  // use stateDidUpdate and stateWillUpdate for performance reasons
  // log out the component name as well

  // public setters
  setState(newState = this.state, fn) {
    this.stateWillUpdate();
    const propsToUpdate = [];
    /* START.DEV */
    try {
      /* END.DEV */
      for (let stateKey in newState) {
        if (newState[stateKey] !== this.state[stateKey]) {
          propsToUpdate.push(stateKey);
          if (this.$watchers[stateKey]) {
            if (this.$watchers[stateKey].pre) {
              this.$watchers[stateKey].pre.call(
                this,
                newState[stateKey],
                this.state[stateKey]
              );
            }
          }
          this.state[stateKey] = newState[stateKey];
          if (this.$watchers[stateKey]) {
            if (this.$watchers[stateKey].post) {
              this.$watchers[stateKey].post.call(this, this.state[stateKey]);
            }
          }
          if (this.$s) {
            if (this.$s[stateKey]) {
              this.$s[stateKey].forEach(stateObj => {
                updateDOM(stateObj.el, newState[stateKey]);
              });
            }
          }
        }
      }
      /* START.DEV */
    } catch (err) {
      console.error(
        `🤓 -- "Whoops, pal!  You ran into this error while updating state: 
      `,
        err,
        ` within this root element `,
        this.$root
      );
    }
    /* END.DEV */
    if (this.$d.size > 0) {
      updateDependents.call(this, propsToUpdate);
    }
    hasCallback(fn);
    this.stateDidUpdate();
  }
}
