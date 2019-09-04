/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module"
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s = "./src/index.js")
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "./node_modules/domponent/dist/domponent.development.js":
      /*!**************************************************************!*\
  !*** ./node_modules/domponent/dist/domponent.development.js ***!
  \**************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        (function(global, factory) {
          true ? factory(exports) : undefined;
        })(this, function(exports) {
          "use strict";

          const datasetEnum = {
            component: "component",
            key: "key",
            props: "props",
            action: "action",
            state: "state",
            bind: "bind",
            ref: "ref"
          };

          const relationalStringEnum = {
            INHERITS_FROM: "<-",
            FROM_COMPONENT: ".",
            KEY_VALUE: ":",
            MULTIPLE_VALUES: "|",
            METHOD_CALL: "->",
            LIST: ","
          };

          const eventOptions = {
            ONCE: "once",
            PASSIVE: "passive",
            CAPTURE: "capture"
          };

          class Scope {
            constructor(config) {
              this.$root = config.element;
              this.$app = config.app;
              this.$key = config.key;
              this.$name = config.element.getAttribute(
                `data-${this.$app.$datasets.component}`
              );
            }
          }

          function createKey() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function(c) {
                var r = (Math.random() * 16) | 0,
                  v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
              }
            );
          }

          function updateDOM$1(el, value) {
            el.textContent = value;
          }

          function hasCallback(cb) {
            cb ? cb() : null;
          }

          // string parsing
          function splitKeyValuePairs(string) {
            return string.trim().split(relationalStringEnum.KEY_VALUE);
          }
          function splitMultipleValues(string) {
            return string.trim().split(relationalStringEnum.MULTIPLE_VALUES);
          }
          function splitPropsPassedIn(string) {
            /* START.DEV */
            if (!string.includes("<-")) {
              console.error(`🤓 -- "You have bad syntax on this data- value: ${string}.  
        You are not inheriting props correctly.  It should look like this 'myProp<-MyComponent.myStateField'`);
            }
            /* END.DEV */
            return string.trim().split(relationalStringEnum.INHERITS_FROM);
          }
          function splitMethodCalls(string) {
            /* START.DEV */
            if (!string.includes("->")) {
              console.error(`🤓 -- "You have bad syntax on this data- value: ${string}.  
      You are missing an arrow in your method call.  It should look like this 'DOMEvent->MyComponent.myMethod'`);
            }
            /* END.DEV */
            return string.trim().split(relationalStringEnum.METHOD_CALL);
          }
          function splitFromComponent(string) {
            /* START.DEV */
            if (!string.includes(".")) {
              console.error(`🤓 -- "You have bad syntax on this data- value: ${string}.  
    You need to have a period (.) like 'MyComponent.myField'`);
            }
            /* END.DEV */
            return string.trim().split(relationalStringEnum.FROM_COMPONENT);
          }
          function splitList(string) {
            return string.trim().split(relationalStringEnum.LIST);
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
                `🤓 -- "You are creating state but not binding it to any DOM elements.  Is this intended? 
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
              this.setState(JSON.parse(stateAttr));
            }
          }

          function bindListeners() {
            this.$b = [];
            scopeElements
              .call(this, `[data-${this.$app.$datasets.action}]`)
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
                        options[eventOptions[key]] = arr.includes(
                          eventOptions[key]
                        );
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
                console.log("binding", binding);
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
                updateProps.call(
                  this.$app.registeredComponents[key],
                  updatedProps
                );
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
                this.props[key] =
                  obj.parentComponent.state[obj.parentComponentKey];
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
            const attr = this.$root.getAttribute(
              `data-${this.$app.$datasets.props}`
            );
            if (attr) {
              const $p = {};
              const props = splitMultipleValues(attr);
              props.forEach(prop => {
                const propStringValues = splitPropsPassedIn(prop);
                const parentComponentValues = splitKeyValuePairs(
                  propStringValues[1]
                );
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
                this.props[propName] =
                  parentComponent.state[parentComponentKey];
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

          function scopeElements(selector) {
            return [...this.$root.querySelectorAll(selector)].filter(el => {
              return (
                el.closest(
                  `[data-${
                    this.$app.$datasets.component
                  }="${this.$root.getAttribute(
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
              this.$p = createPropObjects.call(this);
              bindListeners.call(this);
              wait ? null : this.connected();
            }

            // lifecycle methods
            connecting() {}
            connected() {}
            disconnecting() {}
            propsWillUpdate() {}
            propsDidUpdate() {}
          }

          class Component extends Exponent {
            constructor(config) {
              super(config, true);
              this.state = {};
              this.$s = createStateObjects.call(this);
              initState.call(this);
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
              const key =
                el.getAttribute(`data-${this.$datasets.key}`) || createKey();
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
              ...config.selector.querySelectorAll(
                `[data-${this.$datasets.component}]`
              )
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
              unregister: (name, cb) => this._urc(name, cb)
            };
          }

          exports.Component = Component;
          exports.Exponent = Exponent;
          exports.Init = Init;

          Object.defineProperty(exports, "__esModule", { value: true });
        });

        /***/
      },

    /***/ "./src/Counter/Counter.js":
      /*!********************************!*\
  !*** ./src/Counter/Counter.js ***!
  \********************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function() {
            return Counter;
          }
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! domponent */ "./node_modules/domponent/dist/domponent.development.js"
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          domponent__WEBPACK_IMPORTED_MODULE_0__
        );
        /* harmony import */ var _Counter_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./Counter.scss */ "./src/Counter/Counter.scss"
        );
        /* harmony import */ var _Counter_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
          _Counter_scss__WEBPACK_IMPORTED_MODULE_1__
        );

        class Counter extends domponent__WEBPACK_IMPORTED_MODULE_0__[
          "Component"
        ] {
          constructor(conf) {
            super(conf);
            this.state = {
              count: parseInt(this.state.count) || 0,
              isEven: this.state.isEven
            };
            this.setState(this.state);
            this.setEven();
          }

          increment(e) {
            const newState = {};
            const largerCount = parseInt(this.state.count + 1, 10);
            newState.count = largerCount;
            newState.isEven = largerCount % 2 === 0;
            this.setState(newState, () => console.log("Single Callback", this));
          }

          decrement(e) {
            const newState = {};
            const fewerCount = parseInt(this.state.count - 1, 10);
            newState.count = fewerCount;
            newState.isEven = fewerCount % 2 === 0;
            this.setState(newState);
          }

          goBlue(e) {
            e.target.style.color = "blue";
          }

          goGreen(e) {
            e.target.style.color = "green";
          }

          stateDidUpdate() {
            this.setEven();
          }

          setEven() {
            if (this.state.isEven) {
              this.$root.classList.add("even");
            } else {
              this.$root.classList.remove("even");
            }
          }
        }

        /***/
      },

    /***/ "./src/Counter/Counter.scss":
      /*!**********************************!*\
  !*** ./src/Counter/Counter.scss ***!
  \**********************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // extracted by mini-css-extract-plugin
        /***/
      },

    /***/ "./src/DisplayAnything/DisplayAnything.js":
      /*!************************************************!*\
  !*** ./src/DisplayAnything/DisplayAnything.js ***!
  \************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function() {
            return DisplayAnything;
          }
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! domponent */ "./node_modules/domponent/dist/domponent.development.js"
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          domponent__WEBPACK_IMPORTED_MODULE_0__
        );

        class DisplayAnything extends domponent__WEBPACK_IMPORTED_MODULE_0__[
          "Exponent"
        ] {
          constructor(el) {
            super(el);
            this.displayProps();
          }

          propsDidUpdate() {
            this.displayProps();
          }

          displayProps() {
            this.objects.innerHTML = JSON.stringify(this.props, null, 1);
          }
        }

        /***/
      },

    /***/ "./src/FavoriteShow/FavoriteShow.js":
      /*!******************************************!*\
  !*** ./src/FavoriteShow/FavoriteShow.js ***!
  \******************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function() {
            return FavoriteShow;
          }
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! domponent */ "./node_modules/domponent/dist/domponent.development.js"
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          domponent__WEBPACK_IMPORTED_MODULE_0__
        );

        class FavoriteShow extends domponent__WEBPACK_IMPORTED_MODULE_0__[
          "Component"
        ] {
          constructor(el) {
            super(el);
            this.state = {
              show: "Thomas"
            };
          }

          handleInput(event) {
            console.log(event);
            this.setState({ show: event.target.value });
          }

          stateDidUpdate() {
            this.secondInput.value = this.state.show;
          }
        }

        /***/
      },

    /***/ "./src/HoverLetter/HoverLetter.js":
      /*!****************************************!*\
  !*** ./src/HoverLetter/HoverLetter.js ***!
  \****************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function() {
            return HoverLetter;
          }
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! domponent */ "./node_modules/domponent/dist/domponent.development.js"
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          domponent__WEBPACK_IMPORTED_MODULE_0__
        );

        class HoverLetter extends domponent__WEBPACK_IMPORTED_MODULE_0__[
          "Exponent"
        ] {
          constructor(conf) {
            super(conf);
            this.styleID = "hover-letter__style";
            this.splitWord();
          }

          splitWord() {
            let html = this.letters.textContent
              .toString()
              .split("")
              .map(item => {
                return `<span tabindex="0" class="hoverable">${item}</span>`;
              });

            let htmlString = "";
            html.forEach(item => (htmlString += item));
            this.letters.innerHTML = "";
            this.letters.innerHTML = htmlString;

            if (!document.getElementById(this.styleID)) {
              this.placeStyles();
            }
          }

          placeStyles() {
            const style = `<style id="${this.styleID}">
        .hoverable{
            transition: transform .25s;
            display: inline-block;
            cursor: pointer;
        }
        .hoverable:hover,
        .hoverable:focus{
            transform: scale(1.4);
        }
    </style>`;
            document.head.insertAdjacentHTML("beforeend", style);
          }
        }

        /***/
      },

    /***/ "./src/Navigation/Navigation.js":
      /*!**************************************!*\
  !*** ./src/Navigation/Navigation.js ***!
  \**************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function() {
            return Navigation;
          }
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! domponent */ "./node_modules/domponent/dist/domponent.development.js"
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          domponent__WEBPACK_IMPORTED_MODULE_0__
        );
        /* harmony import */ var _Navigation_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./Navigation.scss */ "./src/Navigation/Navigation.scss"
        );
        /* harmony import */ var _Navigation_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
          _Navigation_scss__WEBPACK_IMPORTED_MODULE_1__
        );

        class Navigation extends domponent__WEBPACK_IMPORTED_MODULE_0__[
          "Component"
        ] {
          constructor(conf) {
            super(conf);
            this.styleID = "collapse-comp-styles";

            this.changeNav = this.changeNav.bind(this);
          }

          toggle() {
            this.setState({ opened: !this.state.opened }, this.changeNav);
          }

          changeNav() {
            if (this.state.opened) {
              this.menu.classList.add("show");
              this.open.style.display = "none";
              this.close.style.display = "block";
            } else {
              this.menu.classList.remove("show");
              this.open.style.display = "block";
              this.close.style.display = "none";
            }
          }
        }

        /***/
      },

    /***/ "./src/Navigation/Navigation.scss":
      /*!****************************************!*\
  !*** ./src/Navigation/Navigation.scss ***!
  \****************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // extracted by mini-css-extract-plugin
        /***/
      },

    /***/ "./src/ShowCode/ShowCode.js":
      /*!**********************************!*\
  !*** ./src/ShowCode/ShowCode.js ***!
  \**********************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function() {
            return ShowCode;
          }
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! domponent */ "./node_modules/domponent/dist/domponent.development.js"
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          domponent__WEBPACK_IMPORTED_MODULE_0__
        );
        /* harmony import */ var _ShowCode_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./ShowCode.scss */ "./src/ShowCode/ShowCode.scss"
        );
        /* harmony import */ var _ShowCode_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
          _ShowCode_scss__WEBPACK_IMPORTED_MODULE_1__
        );

        class ShowCode extends domponent__WEBPACK_IMPORTED_MODULE_0__[
          "Exponent"
        ] {
          constructor(conf) {
            super(conf);
          }
          toggle() {
            console.log(this);
            this.foldable.classList.toggle("show");
          }
        }

        /***/
      },

    /***/ "./src/ShowCode/ShowCode.scss":
      /*!************************************!*\
  !*** ./src/ShowCode/ShowCode.scss ***!
  \************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // extracted by mini-css-extract-plugin
        /***/
      },

    /***/ "./src/Timer/Timer.js":
      /*!****************************!*\
  !*** ./src/Timer/Timer.js ***!
  \****************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function() {
            return CurrentTime;
          }
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! domponent */ "./node_modules/domponent/dist/domponent.development.js"
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          domponent__WEBPACK_IMPORTED_MODULE_0__
        );

        class CurrentTime extends domponent__WEBPACK_IMPORTED_MODULE_0__[
          "Component"
        ] {
          constructor(el) {
            super(el);
            this.state = {
              hours: "",
              seconds: "",
              minutes: ""
            };

            setInterval(() => {
              this.changeTime();
            }, 1000);
          }

          changeTime() {
            const date = new Date();
            this.setState({
              seconds: date.getSeconds(),
              hours: date.getHours(),
              minutes: date.getMinutes()
            });
          }
        }

        /***/
      },

    /***/ "./src/app.scss":
      /*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // extracted by mini-css-extract-plugin
        /***/
      },

    /***/ "./src/domInsert.js":
      /*!**************************!*\
  !*** ./src/domInsert.js ***!
  \**************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony default export */ __webpack_exports__["default"] = function(
          id
        ) {
          const async = document.getElementById("async");
          const number = Math.floor(Math.random() * 100);
          const isEven = number % 2 === 0;
          const component = `
    <div class="col-md-6">
    <div id="${id}" data-component="Counter" class="card" data-state='{"count":${number},"isEven":${isEven}}'>
    <div class="card-body">
    <strong class="card-title" data-action="mousedown->Counter.goBlue|mouseup->Counter.goGreen">Async Counter</strong>
    <div>count: <span data-bind="state:Counter.count"></span></div>
    <button type="button" data-action="click->Counter.decrement" class="btn btn-danger">
      <i aria-label="subtract" data-feather="minus-circle"></i>
    </button>
    
    <button
      type="button"
      data-action="click->Counter.increment|mouseover->Counter.goBlue|mouseout->Counter.goGreen"
      class="btn btn-success"
    >
      <i aria-label="add" data-feather="plus-circle"></i>
    </button>
    </div>
    
  </div>
    </div>
  <div class="col-md-6">
    <div id="async-props" class="card" data-props="theSecond<-MyTimeKey:seconds|theMinute<-MyTimeKey:minutes|theHour<-MyTimeKey:hours" data-component="DisplayAnything">
      <div class="card-body">
        <p class="card-title">
          Asynchronously inherits props
        </p>
        <p>WHOOOOOOOOOOOA!</p>
        <p>props:</p>
        
          <pre>
            <code data-ref="DisplayAnything.objects">
            </code>  
          </pre>
        
      </div>
    </div>
  </div>
  `;
          async.insertAdjacentHTML("beforeend", component);
        };

        /***/
      },

    /***/ "./src/index.js":
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /*! no exports provided */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! domponent */ "./node_modules/domponent/dist/domponent.development.js"
        );
        /* harmony import */ var domponent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          domponent__WEBPACK_IMPORTED_MODULE_0__
        );
        /* harmony import */ var _Counter_Counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./Counter/Counter */ "./src/Counter/Counter.js"
        );
        /* harmony import */ var _Timer_Timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./Timer/Timer */ "./src/Timer/Timer.js"
        );
        /* harmony import */ var _DisplayAnything_DisplayAnything__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./DisplayAnything/DisplayAnything */ "./src/DisplayAnything/DisplayAnything.js"
        );
        /* harmony import */ var _FavoriteShow_FavoriteShow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./FavoriteShow/FavoriteShow */ "./src/FavoriteShow/FavoriteShow.js"
        );
        /* harmony import */ var _HoverLetter_HoverLetter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ./HoverLetter/HoverLetter */ "./src/HoverLetter/HoverLetter.js"
        );
        /* harmony import */ var _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./Navigation/Navigation */ "./src/Navigation/Navigation.js"
        );
        /* harmony import */ var _ShowCode_ShowCode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./ShowCode/ShowCode */ "./src/ShowCode/ShowCode.js"
        );
        /* harmony import */ var _domInsert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ./domInsert */ "./src/domInsert.js"
        );
        /* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! ./app.scss */ "./src/app.scss"
        );
        /* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __webpack_require__.n(
          _app_scss__WEBPACK_IMPORTED_MODULE_9__
        );

        feather.replace();

        console.time("appCreation");
        const App = new domponent__WEBPACK_IMPORTED_MODULE_0__["Init"]({
          selector: document.getElementById("root"),
          components: {
            Counter: _Counter_Counter__WEBPACK_IMPORTED_MODULE_1__["default"],
            Timer: _Timer_Timer__WEBPACK_IMPORTED_MODULE_2__["default"],
            DisplayAnything:
              _DisplayAnything_DisplayAnything__WEBPACK_IMPORTED_MODULE_3__[
                "default"
              ],
            FavoriteShow:
              _FavoriteShow_FavoriteShow__WEBPACK_IMPORTED_MODULE_4__[
                "default"
              ],
            HoverLetter:
              _HoverLetter_HoverLetter__WEBPACK_IMPORTED_MODULE_5__["default"],
            Navigation:
              _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_6__["default"],
            ShowCode: _ShowCode_ShowCode__WEBPACK_IMPORTED_MODULE_7__["default"]
          },
          appCreated: () => console.log("app created")
        });
        console.timeEnd("appCreation");

        window.DomponentApp = App;

        setTimeout(() => {
          Object(_domInsert__WEBPACK_IMPORTED_MODULE_8__["default"])("id2");
          App.createComponent(document.getElementById("id2"), () =>
            feather.replace()
          );
          App.createComponent(document.getElementById("async-props"), () =>
            feather.replace()
          );
        }, 1000);

        /***/
      }

    /******/
  }
);
//# sourceMappingURL=main.js.map
