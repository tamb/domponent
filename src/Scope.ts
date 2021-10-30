interface IScope {
  element: HTMLElement;
  app: any;
  key: string;
  name: string;
}

export default class Scope {
  $root: HTMLElement;
  $app: any;
  $key: string;
  $name: string;

  constructor(config: IScope) {
    this.$root = config.element;
    this.$app = config.app;
    this.$key = config.key;
    this.$name = config.element.getAttribute(
      `data-${this.$app.$datasets.component}`
    );
  }
}
