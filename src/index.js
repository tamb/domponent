import { datasetEnum, relationalStringEnum } from "./enums";

import Exponent from "./Exponent";
import Component from "./Component";

import { createKey } from "./utils";
import { unbindListeners } from "./componentUtils";

/* START.DEV */
console.warn(`🤓 -- "Excuse me there. I am Dominic, call me Dom.
You are using a DEVELOPMENT build of Domponent.  
This will create performance issues within your app.  
The use of domponent.development.js is to provide better debugging... and to hang with me... Dom.
Please swap out to domponent.production.min.js for production code.
See ya soon!"`);
/* END.DEV */

// generates the App
function Init(config) {
  // components and their instances
  this.components = config.components || {};
  this.registeredComponents = {};

  // renaming data attributes to avoid collisions
  this.$datasets = (() => {
    const dataSet = datasetEnum;
    if (config.dataAttributes) {
      for (let key in config.dataAttributes) {
        dataSet[key] = config.dataAttributes[key];
      }
    }
    /* START.DEV */
    console.log(
      `🤓 -- "Dom here. Your data attribute suffixes are in this object: 
      `,
      dataSet,
      `
      Coolio.  We should hang out some time!"`
    );
    /* END.DEV */
    return dataSet;
  })();

  // methods to expose
  // create component
  this._cc = (el, cb) => {
    const key = el.getAttribute(`data-${this.$datasets.key}`) || createKey();
    /* START.DEV */
    try {
      /* END.DEV */
      this.registeredComponents[key] = new config.components[
        el.getAttribute(`data-${this.$datasets.component}`)
      ]({ element: el, key, app: this });
      /* START.DEV */
    } catch (err) {
      console.error(
        `🤓 -- "You messed up creating a component instance for component 
          ${key} 
          on $root element "`,
        el,
        err
      );
    }
    /* END.DEV */
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
    /* START.DEV */
    if (typeof C.constructor !== "function") {
      console.error(`🤓 -- "Hey, buddy.  You can't register something that's not a class.
        Also, wanna play Catan or something later?  ...No pressure."`);
    }
    /* END.DEV */

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
    ...config.selector.querySelectorAll(`[data-${this.$datasets.component}]`)
  ].forEach(componentEl => {
    this._cc(componentEl);
  }, this);
  config.appCreated ? config.appCreated() : null;

  /* START.DEV */
  const me = this;
  console.log(`🤓 -- "Here's the app you created: "`, me);
  /* END.DEV */

  // exposing methods
  return {
    createComponent: (el, cb) => this._cc(el, cb),
    deleteComponent: (el, cb) => this._dc(el, cb),
    register: (name, C, cb) => this._rc(name, C, cb),
    unregister: (name, cb) => this._urc(name, cb),
    createdComponents: this.registeredComponents,
    components: this.components
  };
}

export { Init, Component, Exponent };
