import Exponent from "./Exponent";
import Component from "./Component";

import { createKey } from "./utils";
import { unbindListeners } from "./componentUtils";
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
  dataAttributes: IDataAttributes;
  customSyntax: ICustomSyntax;
  createComponent: (el: HTMLElement, cb?: Function) => void;

  constructor({
    components = {},
    selector = document.body,
    dataAttributes = defaultDataAttributes,
    customSyntax = defaultRelationalStrings,
    watch = true,
  }: IDomponentConfig) {
    this.components = components || {};
    this.registeredComponents = {};

    this.dataAttributes = {
      ...defaultDataAttributes,
      ...dataAttributes,
    };

    this.customSyntax = {
      ...defaultRelationalStrings,
      ...customSyntax,
    };

    // methods to expose
    // create component
    this.createComponent = (el: HTMLElement, cb?: Function) => {
      const key =
        el.getAttribute(`data-${this.dataAttributes.key}`) || createKey();

      this.registeredComponents[key] = new this.components[
        el.getAttribute(`data-${this.$datasets.component}`)
      ]({ element: el, key, app: this });

      cb ? cb() : null;
    };
    // delete component
    this._dc = (key, cb) => {
      this.registeredComponents[key].disconnecting();
      unbindListeners.call(this.registeredComponents[key]);
      delete this.registeredComponents[key];
      cb ? cb() : null;
    };
    // register component
    this._rc = (name, C, cb) => {
      this.components[name] = C;
      cb ? cb() : null;
    };
    // unregister component
    this._urc = (name, cb) => {
      delete this.component[name];
      cb ? cb() : null;
    };

    // creating the components initially
    [
      ...config.selector.querySelectorAll(`[data-${this.$datasets.component}]`),
    ].forEach((componentEl) => {
      this._cc(componentEl);
    }, this);
  }
}

export { DomponentApp, Component, Exponent };
