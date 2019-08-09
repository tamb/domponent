import { datasetEnum } from './enums';

import Exponent from './Exponent';
import Component from './Component';

import { createKey } from './utils';
import { unbindListeners } from './componentUtils';

// generates the App
function Init(config) {
    // components and their instances
    this.components = config.components;
    this.registeredComponents = {};
    
    // renaming data attributes to avoid collisions
    this.$datasets = (()=>{
      const dataSet = datasetEnum;
      if(config.dataAttributes){
        for(let key in config.dataAttributes){
          dataSet[key] = config.dataAttributes[key];
        }
      }
      return dataSet;
    })();

    // methods to expose
    // create component
    this._cc = (el, cb) => {
      const key = el.getAttribute(`data-${this.$datasets.key}`) || createKey();
      this.registeredComponents[key] = new config.components[
        (el.getAttribute(`data-${this.$datasets.component}`))
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
    [...config.selector.querySelectorAll(`[data-${this.$datasets.component}]`)].forEach(
      componentEl => {
        this._cc(componentEl);
      },
      this
    );
    config.appCreated ? config.appCreated() : null;
  
    // exposing methods
    return {
      createComponent: (el, cb) => this._cc(el, cb),
      deleteComponent: (el, cb) => this._dc(el, cb),
      register: (name, C, cb) => this._rc(name, C, cb),
      unregister: (name, cb) => this._urc(name, cb)
    };
  }

export {
  Init,
  Component,
  Exponent
}