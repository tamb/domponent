(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Domponent = {}));
}(this, function (exports) { 'use strict';

    const datasetEnum = {
        component: 'component',
        key: 'key',
        props: 'props',
        action: 'action',
        state: 'state',
        bind: 'bind',
        ref: 'ref',
        ref_array: 'ref-array',

    };

    const relationalStringEnum = {
        INHERITS_FROM: '<-',
        FROM_COMPONENT: '.',
        KEY_VALUE: ':',
        MULTIPLE_VALUES: "|",
        METHOD_CALL: "->",
        LIST: ","
    };

    const eventOptions = {
        ONCE: 'once',
        PASSIVE: 'passive',
        CAPTURE: 'capture'
    };

    class Scope {
      constructor(config) {
        this.$root = config.element;
        this.$app = config.app;
        this.$key = config.key;
        this.$name = config.element.getAttribute(`data-${this.$app.$datasets.component}`);
      }
    }

    function createKey() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    function updateDOM$1(el, value) {
      el.textContent = value;
    }

    function hasCallback(cb) {
      cb ? cb() : null;
    }

    // string parsing
    function splitKeyValuePairs(string) {
      return string
        .trim()
        .split(relationalStringEnum.KEY_VALUE)
        .map(item => item.trim());
    }
    function splitMultipleValues(string) {
      return string
        .trim()
        .split(relationalStringEnum.MULTIPLE_VALUES)
        .map(item => item.trim());
    }
    function splitPropsPassedIn(string) {
      /* START.DEV */
      if (!string.includes("<-")) {
        console.error(`🤓 -- "You have bad syntax on this data- value: ${string}.  
        You are not inheriting props correctly.  It should look like this 'myProp<-MyComponent.myStateField'`);
      }
      /* END.DEV */
      return string
        .trim()
        .split(relationalStringEnum.INHERITS_FROM)
        .map(item => item.trim());
    }
    function splitMethodCalls(string) {
      /* START.DEV */
      if (!string.includes("->")) {
        console.error(`🤓 -- "You have bad syntax on this data- value: ${string}.  
      You are missing an arrow in your method call.  It should look like this 'DOMEvent->MyComponent.myMethod'`);
      }
      /* END.DEV */
      return string
        .trim()
        .split(relationalStringEnum.METHOD_CALL)
        .map(item => item.trim());
    }
    function splitFromComponent(string) {
      /* START.DEV */
      if (!string.includes(".")) {
        console.error(`🤓 -- "You have bad syntax on this data- value: ${string}.  
    You need to have a period (.) like 'MyComponent.myField'`);
      }
      /* END.DEV */
      return string
        .trim()
        .split(relationalStringEnum.FROM_COMPONENT)
        .map(item => item.trim());
    }
    function splitList(string) {
      return string
        .trim()
        .split(relationalStringEnum.LIST)
        .map(item => item.trim());
    }

    function createStateObjects() {
      const nodes = scopeElements.call(
        this,
        `[data-${this.$app.$datasets.bind}^="state:"]`
      );
      if (nodes.length > 0) {
        const $s = {};
        nodes.forEach(el => {
          const newStateObject = {};
          /* START.DEV */
          try {
            /* END.DEV */
            var states = splitMultipleValues(
              el.getAttribute(`data-${this.$app.$datasets.bind}`)
            );
            /* START.DEV */
          } catch (err) {
            console.error(`🤓 -- "There's a problem creating the state.
        You have a syntax error splitting multiple values on element: 
        ${el} with error: ${err}"`);
          }
          /* END.DEV */
          states.forEach(state => {
            /* START.DEV */
            try {
              /* END.DEV */
              var parts = splitKeyValuePairs(state);
              /* START.DEV */
            } catch (err) {
              console.error(`🤓 -- "There's a problem creating the state.
          You have a syntax error splitting key/value pairs on element: 
          ${el} with error: ${err}"`);
            }
            /* END.DEV */
            /* START.DEV */
            try {
              /* END.DEV */
              var stateKey = splitFromComponent(parts[1])[1];
              /* START.DEV */
            } catch (err) {
              console.error(`🤓 -- "There's a problem creating the state.
          You have a syntax error splitting fields from components on element: 
          ${el} with error: ${err}"`);
            }
            /* END.DEV */
            newStateObject.el = el;
            if (!$s[stateKey]) {
              $s[stateKey] = [];
            }
            $s[stateKey].push(newStateObject);
          });
        }, this);
        return $s;
      }
      /* START.DEV */
      if (nodes.length === 0) {
        console.warn(
          `🤓 -- "You are creating state but not binding state values to any DOM elements.  Is this intended? 
    If not, check your binding syntax from within this root element `,
          this.$root
        );
      }
      /* END.DEV */
      return null;
    }

    function initState() {
      const stateAttr = this.$root.getAttribute(
        `data-${this.$app.$datasets.state}`
      );
      if (stateAttr) {
        this.state = JSON.parse(stateAttr);
      }
    }

    function bindListeners() {
      this.$b = [];
      let arr = this.$root.getAttribute(`data-${this.$app.$datasets.action}`)
        ? [this.$root]
        : [];
      arr
        .concat(scopeElements.call(this, `[data-${this.$app.$datasets.action}]`))
        .forEach(el => {
          const actions = splitMultipleValues(
            el.getAttribute(`data-${this.$app.$datasets.action}`)
          );
          const binding = {
            el: el,
            actions: []
          };
          actions.forEach(action => {
            const parts = splitMethodCalls(action);
            const event = parts[0];
            const cbFunc = splitFromComponent(parts[1]);
            if (cbFunc[0] === this.$name) {
              let options = {};
              if (cbFunc[2]) {
                const arr = splitList(cbFunc[2]);
                for (let key in eventOptions) {
                  options[eventOptions[key]] = arr.includes(eventOptions[key]);
                }
              }
              const handler = this[cbFunc[1]].bind(this);
              el.addEventListener(event, handler, options);
              binding.actions.push({
                event,
                handler,
                options
              });
            }
          }, this);
          this.$b.push(binding);
        }, this);
    }

    function unbindListeners() {
      /* START.DEV */
      const me = this;
      try {
        /* END.DEV */
        this.$b.forEach(binding => {
          binding.actions.forEach(action => {
            binding.el.removeEventListener(
              action.event,
              action.handler,
              action.options
            );
          }, this);
        }, this);
        /* START.DEV */
      } catch (err) {
        console.error(`🤓 -- "You had this issue:
  ${err}
  removing eventListeners while deleting this component:  
  ${me}
  ... You'll still listen to me though? Right?? I love our chats.`);
      }
      /* END.DEV */
    }

    function updateDependents(updatedProps) {
      /* START.DEV */
      const me = this;
      try {
        /* END.DEV */
        this.$d.forEach(key => {
          updateProps.call(this.$app.registeredComponents[key], updatedProps);
        });
        /* START.DEV */
      } catch (err) {
        console.error(`🤓 -- "You had this issue:
    ${err} 
    updating the dependents of this component: 
    ${me}...
    Can I DEPEND on your for a ride to the airport?... Friend??"`);
      }
      /* END.DEV */
    }

    function updateProps(updatedProps) {
      this.propsWillUpdate();
      const oldProps = Object.assign({}, this.props);
      for (let key in this.$p) {
        const obj = this.$p[key];
        if (updatedProps.includes(this.$p[key].parentComponentKey)) {
          this.props[key] = obj.parentComponent.state[obj.parentComponentKey];
          if (this.$p[key].els) {
            this.$p[key].els.forEach(el => {
              updateDOM(el, this.props[key]);
            });
          }
        }
      }
      this.propsDidUpdate(oldProps);
    }

    function createPropObjects() {
      const attr = this.$root.getAttribute(`data-${this.$app.$datasets.props}`);
      if (attr) {
        const $p = {};
        const props = splitMultipleValues(attr);
        props.forEach(prop => {
          const propStringValues = splitPropsPassedIn(prop);
          const parentComponentValues = splitKeyValuePairs(propStringValues[1]);
          const propName = propStringValues[0];
          const parentComponent = this.$app.registeredComponents[
            parentComponentValues[0]
          ];
          const parentComponentKey = parentComponentValues[1];
          parentComponent.$d.add(this.$key);

          const els = [
            ...scopeElements.call(
              this,
              `[${this.$app.$datasets.bind}^="props:${propName}"]`
            )
          ];
          this.props[propName] = parentComponent.state[parentComponentKey];
          $p[propName] = {
            parentComponent,
            parentComponentKey,
            els: els.length > 0 ? els : null
          };
        }, this);
        return $p;
      } else {
        return null;
      }
    }

    function createRefs() {
      scopeElements
        .call(this, `[data-${this.$app.$datasets.ref}]`)
        .forEach(element => {
          this[
            splitFromComponent(
              element.getAttribute(`data-${this.$app.$datasets.ref}`)
            )[1]
          ] = element;
        });
    }

    function createRefArrays() {
      let prevKey = null;
      scopeElements
        .call(this, `[data-${this.$app.$datasets.ref_array}]`)
        .forEach(element => {
          const key = splitFromComponent(
            element.getAttribute(`data-${this.$app.$datasets.ref_array}`)
          )[1];
          if (key === prevKey) {
            this[key].push(element);
          } else {
            prevKey = key;
            this[key] = [];
            this[key].push(element);
          }
        });
    }

    function scopeElements(selector) {
      return [...this.$root.querySelectorAll(selector)].filter(el => {
        return (
          el.closest(
            `[data-${this.$app.$datasets.component}="${this.$root.getAttribute(
          "data-" + this.$app.$datasets.component
        )}"]`
          ) === this.$root
        );
      });
    }

    class Exponent extends Scope {
      constructor(config, wait = false) {
        super(config);
        this.connecting();
        this.props = {};
        this.$d = new Set();
        createRefs.call(this);
        createRefArrays.call(this);
        this.$p = createPropObjects.call(this);
        bindListeners.call(this);
        wait? null : this.connected();
      }

      // lifecycle methods
      connecting(){}
      connected(){}
      disconnecting(){}
      propsWillUpdate() {}
      propsDidUpdate() {}

    }

    class Component extends Exponent {
      constructor(config) {
        super(config, true);
        initState.call(this);
        this.$s = createStateObjects.call(this);
        this.connected();
      }

      // lifecycle methods
      stateWillUpdate() {}
      stateDidUpdate() {}

      // public setters
      setState(newState = this.state, fn) {
        this.stateWillUpdate();
        const propsToUpdate = [];
        /* START.DEV */
        try {
          /* END.DEV */
          for (let stateKey in newState) {
            if (newState[stateKey] !== this.state[stateKey]) {
              propsToUpdate.push(stateKey);
              this.state[stateKey] = newState[stateKey];
              if (this.$s) {
                if (this.$s[stateKey]) {
                  this.$s[stateKey].forEach(stateObj => {
                    updateDOM$1(stateObj.el, newState[stateKey]);
                  });
                }
              }
            }
          }
          /* START.DEV */
        } catch (err) {
          console.error(
            `🤓 -- "Whoops, pal!  You ran into this error while updating state: 
      `,
            err,
            ` within this root element `,
            this.$root
          );
        }
        /* END.DEV */
        if (this.$d.size > 0) {
          updateDependents.call(this, propsToUpdate);
        }
        hasCallback(fn);
        this.stateDidUpdate();
      }
    }

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
          /* START.DEV */
          console.log(`🤓 -- "Dom here. Your data attribute suffixes are in this object: 
      `, dataSet, `
      Coolio.  We should hang out some time!"`);
          /* END.DEV */
          return dataSet;
        })();

        // methods to expose
        // create component
        this._cc = (el, cb) => {
          const key = el.getAttribute(`data-${this.$datasets.key}`) || createKey();
          /* START.DEV */
          try{
          /* END.DEV */
            this.registeredComponents[key] = new config.components[
              (el.getAttribute(`data-${this.$datasets.component}`))
              ]({ element: el, key, app: this });
          /* START.DEV */
            } catch (err) {
              console.error(`🤓 -- "You messed up creating a component instance for component 
          ${key} 
          on $root element "`, el, err);
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
          if(typeof C.constructor !== 'function'){
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
        [...config.selector.querySelectorAll(`[data-${this.$datasets.component}]`)].forEach(
          componentEl => {
            this._cc(componentEl);
          },
          this
        );
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
          unregister: (name, cb) => this._urc(name, cb)
        };
      }

    exports.Component = Component;
    exports.Exponent = Exponent;
    exports.Init = Init;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
