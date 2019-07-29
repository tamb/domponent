export default class Scope {
  constructor(element, app, key) {
    this.$root = element;
    this.$app = app;
    this.$key = key;
    this.$name = element.dataset[componentSelector];
  }

  scopeElements(selector) {
    return [...this.$root.querySelectorAll(selector)].filter(el => {
      return (
        el.closest(`[data-${this.$app.$dataset.component}]`) === this.$root
      );
    });
  }
}
