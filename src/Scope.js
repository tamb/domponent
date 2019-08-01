export default class Scope {
  constructor(config) {
    console.log('in Scope constructor ', config);
    this.$root = config.element;
    this.$app = config.app;
    this.$key = config.key;
    this.$name = config.element.dataset[this.$app.$datasets.component];
  }

  scopeElements(selector) {
    console.log('scoping element', this);
    return [...this.$root.querySelectorAll(selector)].filter(el => {
      return (
        el.closest(`[data-${this.$app.$datasets.component}]`) === this.$root
      );
    });
  }
}
