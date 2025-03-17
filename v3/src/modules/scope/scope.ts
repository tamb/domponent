interface IScopeConfig {
  element: HTMLElement | string;
  key?: string;
}

interface IScope {
  $root: HTMLElement;
  $app: any; // Replace 'any' with the actual type of your app
  $key?: string;
  $name: string;
}

/**
 * Scope class to manage the component's root element and its associated properties.
 * It initializes the component with the provided configuration.
 * @class Scope
 * @implements {IScope}
 * @param {IScopeConfig} config - Configuration object containing the element, key, and app.
 * @throws {Error} If the element is not found or is invalid, or if the component name is not found in the element's data attributes.
 * @property {HTMLElement} $root - The root element of the component.
 * @property {any} $app - The application instance associated with the component.
 * @property {string} [$key] - An optional key for the component.
 * @property {string} $name - The name of the component, derived from the data attribute of the root element.
 * 
 * @note This class is part of a larger framework and is designed to work with the application's component system. You should not instantiate it directly unless you are familiar with the framework's architecture.
 */
export class Scope implements IScope {
  $root: HTMLElement;
  $app: any; // Replace 'any' with the actual type of your app
  $key?: string;
  $name: string;

  constructor(config: IScopeConfig) {
    if (typeof config.element === 'string') {
      config.element = document.querySelector(config.element) as HTMLElement;
      if (!config.element) {
        throw new Error(`Element not found for selector: ${config.element}`);
      }
    }
    if (!(config.element instanceof HTMLElement)) {
      throw new Error(`Invalid element provided: ${config.element}`);
    }
    this.$root = config.element;
    this.$app = config.app;
    this.$key = config.key;
    const name = config.element.getAttribute(`data-${this.$app.$datasets.component}`);
    if (!name){
      throw new Error(`Check data attributes. Component name not found in element: ${config.element}`);
    };
    this.$name = name;
  }
}
