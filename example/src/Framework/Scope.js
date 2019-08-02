export default class Scope {
  constructor(config) {
    this.$root = config.element;
    this.$app = config.app;
    this.$key = config.key;
    this.$name = config.element.dataset[this.$app.$datasets.component];
  }
}
