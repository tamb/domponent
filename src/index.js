import { datasetEnum } from './enums';

import Exp from './Exponent';
import Comp from './Component';

import { createKey } from './utils';

// generates the App
function InitApp(config) {
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
      console.log(el, key, this.$datasets);
      console.log(el.getAttribute(`data-${this.$datasets.component}`));
      this.registeredComponents[key] = new config.components[
        (el.getAttribute(`data-${this.$datasets.component}`))
      ]({ element: el, key, app: this });
      cb ? cb() : null;
    };
    // delete component
    this._dc = (key, cb) => {
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

  export const Init = InitApp;
  export const Component = Comp;
  export const Exponent = Exp;


  // generates the app
  // export default Init;