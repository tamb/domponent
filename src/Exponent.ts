import Scope from "./Scope";

import {
  createPropObjects,
  bindListeners,
  createRefs,
  createRefArrays
} from "./componentUtils";

import { IScope } from "./interfaces";

export default class Exponent extends Scope {
  props: { [key: string]: any };
  $d: Set<any>;
  $refs: { [key: string]: any };
  $p: any;
  $watchers: any;
  watch?: Function;

  constructor(root: HTMLElement, config: IScope, wait: boolean = false) {
    super(root, config);
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
