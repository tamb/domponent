import { IScope } from "./interfaces";

export default class Scope {
  $root: HTMLElement;
  $app?: any;
  $key?: string;
  $name: string;

  constructor(root: HTMLElement, config: IScope) {
    this.$root = root;
    if (config) {
      this.$app = config.app;
      this.$key = config.key;
      this.$name = root.getAttribute(`data-${this.$app.$datasets.component}`);
    }
  }
}
