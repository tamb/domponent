import Exponent from "./Exponent";
import Component from "./Component";
import { createKey } from "./utils";
import {
  IComponentInstances,
  IComponents,
  ICustomSyntax,
  IDataAttributes,
  IDomponentConfig,
} from "./interfaces";
import { defaultDataAttributes, defaultRelationalStrings } from "./defaults";

/**
 * @class DomponentApp
 * @description The main application class for Domponent. It initializes the components and manages their lifecycle.
 * @param {Object} config - Configuration object for the DomponentApp.
 * @param {Object} config.components - An object containing the components to be registered.
 * @param {HTMLElement|string} config.selector - The selector or element where the components will be initialized.
 * @param {Object} config.dataAttributes - An object containing custom data attributes for the components.
 * @param {Object} config.customSyntax - An object containing custom syntax for relational strings.
 * @param {boolean} [config.watch=true] - Whether to add a MutationObserver to watch for changes in the DOM and automatically create components.
 */
class DomponentApp {
  components: IComponents;
  registeredComponents: IComponentInstances;
  componentsByKey: { [key: string]: any } = {};
  $datasets: IDataAttributes;
  $syntax: ICustomSyntax;
  observer: MutationObserver | null = null;

  constructor({
    components = {},
    selector = document.body,
    dataAttributes = defaultDataAttributes,
    customSyntax = defaultRelationalStrings,
    watch = true,
  }: IDomponentConfig) {
    this.components = components || {};
    this.registeredComponents = new WeakMap() as IComponentInstances;

    this.$datasets = {
      ...defaultDataAttributes,
      ...dataAttributes,
    };

    this.$syntax = {
      ...defaultRelationalStrings,
      ...customSyntax,
    };

    if (typeof selector === "string") {
      selector = document.querySelector(selector) as HTMLElement;
    }
    selector
      .querySelectorAll(`[data-${this.$datasets.component}]`)
      .forEach((componentEl) => {
        this.createComponent(componentEl as HTMLElement);
      });

    if (watch) {
      this.startObserving(selector);
    }
  }

  /**
   *
   * @param el - The HTML element to create the component for.
   * @param cb - An optional callback function to be executed after the component is created.
   * @description Creates a component based on the provided HTML element and registers it in the app.
   * If the component is already registered, it will not create a new instance.
   * If the component is not found in the components object, it will throw an error.
   * @throws {Error} If the component is not found in the components object.
   * @example
   * const app = new DomponentApp({ components: { MyComponent } });
   * const el = document.querySelector('#my-component');
   * app.createComponent(el, () => {
   *   console.log('Component created!');
   * });
   * @memberof DomponentApp
   * @returns {void}
   * @public
   * @method createComponent
   * @type {Function}
   */
  public createComponent(el: HTMLElement, cb?: Function): void {
    const key =
      el.getAttribute(`data-${this.$datasets.key}`) || createKey();
    const componentName = el.getAttribute(
      `data-${this.$datasets.component}`
    ) as string;
    const componentInstance = new (this.components[componentName] as any)({
      element: el,
      key,
      app: this,
    });
    this.registeredComponents.set(el, componentInstance);
    this.componentsByKey[key] = componentInstance;

    cb ? cb() : null;
  }

  private initObserver(): void {
    if (!this.observer) {
      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                const el = node as HTMLElement;
                if (el.hasAttribute(`data-${this.$datasets.component}`)) {
                  this.createComponent(el);
                }
              }
            });
          }
        });
      });
    }
  }

  /**
   * @description Starts observing the DOM for changes and automatically creates components when new elements are added.
   * @param {HTMLElement|string} selector - The selector or element to observe for changes.
   * @public
   * @method startObserving
   * @returns {void}
   */
  public startObserving(selector: HTMLElement | string): void {
    if (typeof selector === "string") {
      selector = document.querySelector(selector) as HTMLElement;
    }
    this.initObserver();
    this.observer?.observe(selector, {
      childList: true,
      subtree: true,
    });
  }

  /**
   * @description Stops observing the DOM for changes and disconnects the MutationObserver.
   * @public
   * @method stopObserving
   * @returns {void}
   */
  public stopObserving(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

export { DomponentApp, Component, Exponent };
