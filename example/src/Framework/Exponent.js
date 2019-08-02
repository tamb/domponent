import Scope from "./Scope";

import { createPropObjects } from './componentUtils'

export default class Exponent extends Scope {
  constructor(config) {
    super(config);
    this.props = {};
    this.dependents = new Set();
    this.propObjects = createPropObjects.call(this);
  }

  // lifecycle methods
  propsWillUpdate() {}
  propsDidUpdate() {}

}
