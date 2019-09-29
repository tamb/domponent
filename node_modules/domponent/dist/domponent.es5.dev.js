(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Domponent = {}));
}(this, function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var datasetEnum = {
    component: 'component',
    key: 'key',
    props: 'props',
    action: 'action',
    state: 'state',
    bind: 'bind',
    ref: 'ref',
    ref_array: 'ref-array'
  };
  var relationalStringEnum = {
    INHERITS_FROM: '<-',
    FROM_COMPONENT: '.',
    KEY_VALUE: ':',
    MULTIPLE_VALUES: "|",
    METHOD_CALL: "->",
    LIST: ","
  };
  var eventOptions = {
    ONCE: 'once',
    PASSIVE: 'passive',
    CAPTURE: 'capture'
  };

  var Scope = function Scope(config) {
    _classCallCheck(this, Scope);

    this.$root = config.element;
    this.$app = config.app;
    this.$key = config.key;
    this.$name = config.element.getAttribute("data-".concat(this.$app.$datasets.component));
  };

  function createKey() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == "x" ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }
  function updateDOM$1(el, value) {
    el.textContent = value;
  }
  function hasCallback(cb) {
    cb ? cb() : null;
  } // string parsing

  function splitKeyValuePairs(string) {
    return string.trim().split(relationalStringEnum.KEY_VALUE).map(function (item) {
      return item.trim();
    });
  }
  function splitMultipleValues(string) {
    return string.trim().split(relationalStringEnum.MULTIPLE_VALUES).map(function (item) {
      return item.trim();
    });
  }
  function splitPropsPassedIn(string) {
    /* START.DEV */
    if (!string.includes("<-")) {
      console.error("\uD83E\uDD13 -- \"You have bad syntax on this data- value: ".concat(string, ".  \n        You are not inheriting props correctly.  It should look like this 'myProp<-MyComponent.myStateField'"));
    }
    /* END.DEV */


    return string.trim().split(relationalStringEnum.INHERITS_FROM).map(function (item) {
      return item.trim();
    });
  }
  function splitMethodCalls(string) {
    /* START.DEV */
    if (!string.includes("->")) {
      console.error("\uD83E\uDD13 -- \"You have bad syntax on this data- value: ".concat(string, ".  \n      You are missing an arrow in your method call.  It should look like this 'DOMEvent->MyComponent.myMethod'"));
    }
    /* END.DEV */


    return string.trim().split(relationalStringEnum.METHOD_CALL).map(function (item) {
      return item.trim();
    });
  }
  function splitFromComponent(string) {
    /* START.DEV */
    if (!string.includes(".")) {
      console.error("\uD83E\uDD13 -- \"You have bad syntax on this data- value: ".concat(string, ".  \n    You need to have a period (.) like 'MyComponent.myField'"));
    }
    /* END.DEV */


    return string.trim().split(relationalStringEnum.FROM_COMPONENT).map(function (item) {
      return item.trim();
    });
  }
  function splitList(string) {
    return string.trim().split(relationalStringEnum.LIST).map(function (item) {
      return item.trim();
    });
  }

  function createStateObjects() {
    var _this = this;

    var nodes = scopeElements.call(this, "[data-".concat(this.$app.$datasets.bind, "^=\"state:\"]"));

    if (nodes.length > 0) {
      var $s = {};
      nodes.forEach(function (el) {
        var newStateObject = {};
        /* START.DEV */

        try {
          /* END.DEV */
          var states = splitMultipleValues(el.getAttribute("data-".concat(_this.$app.$datasets.bind)));
          /* START.DEV */
        } catch (err) {
          console.error("\uD83E\uDD13 -- \"There's a problem creating the state.\n        You have a syntax error splitting multiple values on element: \n        ".concat(el, " with error: ").concat(err, "\""));
        }
        /* END.DEV */


        states.forEach(function (state) {
          /* START.DEV */
          try {
            /* END.DEV */
            var parts = splitKeyValuePairs(state);
            /* START.DEV */
          } catch (err) {
            console.error("\uD83E\uDD13 -- \"There's a problem creating the state.\n          You have a syntax error splitting key/value pairs on element: \n          ".concat(el, " with error: ").concat(err, "\""));
          }
          /* END.DEV */

          /* START.DEV */


          try {
            /* END.DEV */
            var stateKey = splitFromComponent(parts[1])[1];
            /* START.DEV */
          } catch (err) {
            console.error("\uD83E\uDD13 -- \"There's a problem creating the state.\n          You have a syntax error splitting fields from components on element: \n          ".concat(el, " with error: ").concat(err, "\""));
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
      console.warn("\uD83E\uDD13 -- \"You are creating state but not binding state values to any DOM elements.  Is this intended? \n    If not, check your binding syntax from within this root element ", this.$root);
    }
    /* END.DEV */


    return null;
  }
  function initState() {
    var stateAttr = this.$root.getAttribute("data-".concat(this.$app.$datasets.state));

    if (stateAttr) {
      this.setState(JSON.parse(stateAttr));
    }
  }
  function bindListeners() {
    var _this2 = this;

    this.$b = [];
    var arr = this.$root.getAttribute("data-".concat(this.$app.$datasets.action)) ? [this.$root] : [];
    arr.concat(scopeElements.call(this, "[data-".concat(this.$app.$datasets.action, "]"))).forEach(function (el) {
      var actions = splitMultipleValues(el.getAttribute("data-".concat(_this2.$app.$datasets.action)));
      var binding = {
        el: el,
        actions: []
      };
      actions.forEach(function (action) {
        var parts = splitMethodCalls(action);
        var event = parts[0];
        var cbFunc = splitFromComponent(parts[1]);

        if (cbFunc[0] === _this2.$name) {
          var options = {};

          if (cbFunc[2]) {
            var _arr = splitList(cbFunc[2]);

            for (var key in eventOptions) {
              options[eventOptions[key]] = _arr.includes(eventOptions[key]);
            }
          }

          var handler = _this2[cbFunc[1]].bind(_this2);

          el.addEventListener(event, handler, options);
          binding.actions.push({
            event: event,
            handler: handler,
            options: options
          });
        }
      }, _this2);

      _this2.$b.push(binding);
    }, this);
  }
  function unbindListeners() {
    var _this3 = this;

    /* START.DEV */
    var me = this;

    try {
      /* END.DEV */
      this.$b.forEach(function (binding) {
        binding.actions.forEach(function (action) {
          binding.el.removeEventListener(action.event, action.handler, action.options);
        }, _this3);
      }, this);
      /* START.DEV */
    } catch (err) {
      console.error("\uD83E\uDD13 -- \"You had this issue:\n  ".concat(err, "\n  removing eventListeners while deleting this component:  \n  ").concat(me, "\n  ... You'll still listen to me though? Right?? I love our chats."));
    }
    /* END.DEV */

  }
  function updateDependents(updatedProps) {
    var _this4 = this;

    /* START.DEV */
    var me = this;

    try {
      /* END.DEV */
      this.$d.forEach(function (key) {
        updateProps.call(_this4.$app.registeredComponents[key], updatedProps);
      });
      /* START.DEV */
    } catch (err) {
      console.error("\uD83E\uDD13 -- \"You had this issue:\n    ".concat(err, " \n    updating the dependents of this component: \n    ").concat(me, "...\n    Can I DEPEND on your for a ride to the airport?... Friend??\""));
    }
    /* END.DEV */

  }
  function updateProps(updatedProps) {
    var _this5 = this;

    this.propsWillUpdate();
    var oldProps = Object.assign({}, this.props);

    var _loop = function _loop(key) {
      var obj = _this5.$p[key];

      if (updatedProps.includes(_this5.$p[key].parentComponentKey)) {
        _this5.props[key] = obj.parentComponent.state[obj.parentComponentKey];

        if (_this5.$p[key].els) {
          _this5.$p[key].els.forEach(function (el) {
            updateDOM(el, _this5.props[key]);
          });
        }
      }
    };

    for (var key in this.$p) {
      _loop(key);
    }

    this.propsDidUpdate(oldProps);
  }
  function createPropObjects() {
    var _this6 = this;

    var attr = this.$root.getAttribute("data-".concat(this.$app.$datasets.props));

    if (attr) {
      var $p = {};
      var props = splitMultipleValues(attr);
      props.forEach(function (prop) {
        var propStringValues = splitPropsPassedIn(prop);
        var parentComponentValues = splitKeyValuePairs(propStringValues[1]);
        var propName = propStringValues[0];
        var parentComponent = _this6.$app.registeredComponents[parentComponentValues[0]];
        var parentComponentKey = parentComponentValues[1];
        parentComponent.$d.add(_this6.$key);

        var els = _toConsumableArray(scopeElements.call(_this6, "[".concat(_this6.$app.$datasets.bind, "^=\"props:").concat(propName, "\"]")));

        _this6.props[propName] = parentComponent.state[parentComponentKey];
        $p[propName] = {
          parentComponent: parentComponent,
          parentComponentKey: parentComponentKey,
          els: els.length > 0 ? els : null
        };
      }, this);
      return $p;
    } else {
      return null;
    }
  }
  function createRefs() {
    var _this7 = this;

    scopeElements.call(this, "[data-".concat(this.$app.$datasets.ref, "]")).forEach(function (element) {
      _this7[splitFromComponent(element.getAttribute("data-".concat(_this7.$app.$datasets.ref)))[1]] = element;
    });
  }
  function createRefArrays() {
    var _this8 = this;

    var prevKey = null;
    scopeElements.call(this, "[data-".concat(this.$app.$datasets.ref_array, "]")).forEach(function (element) {
      var key = splitFromComponent(element.getAttribute("data-".concat(_this8.$app.$datasets.ref_array)))[1];

      if (key === prevKey) {
        _this8[key].push(element);
      } else {
        prevKey = key;
        _this8[key] = [];

        _this8[key].push(element);
      }
    });
  }
  function scopeElements(selector) {
    var _this9 = this;

    return _toConsumableArray(this.$root.querySelectorAll(selector)).filter(function (el) {
      return el.closest("[data-".concat(_this9.$app.$datasets.component, "=\"").concat(_this9.$root.getAttribute("data-" + _this9.$app.$datasets.component), "\"]")) === _this9.$root;
    });
  }

  var Exponent =
  /*#__PURE__*/
  function (_Scope) {
    _inherits(Exponent, _Scope);

    function Exponent(config) {
      var _this;

      var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _classCallCheck(this, Exponent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Exponent).call(this, config));

      _this.connecting();

      _this.props = {};
      _this.$d = new Set();
      createRefs.call(_assertThisInitialized(_this));
      createRefArrays.call(_assertThisInitialized(_this));
      _this.$p = createPropObjects.call(_assertThisInitialized(_this));
      bindListeners.call(_assertThisInitialized(_this));
      wait ? null : _this.connected();
      return _this;
    } // lifecycle methods


    _createClass(Exponent, [{
      key: "connecting",
      value: function connecting() {}
    }, {
      key: "connected",
      value: function connected() {}
    }, {
      key: "disconnecting",
      value: function disconnecting() {}
    }, {
      key: "propsWillUpdate",
      value: function propsWillUpdate() {}
    }, {
      key: "propsDidUpdate",
      value: function propsDidUpdate() {}
    }]);

    return Exponent;
  }(Scope);

  var Component =
  /*#__PURE__*/
  function (_Exponent) {
    _inherits(Component, _Exponent);

    function Component(config) {
      var _this;

      _classCallCheck(this, Component);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, config, true));
      _this.state = {};
      _this.$s = createStateObjects.call(_assertThisInitialized(_this));
      initState.call(_assertThisInitialized(_this));

      _this.connected();

      return _this;
    } // lifecycle methods


    _createClass(Component, [{
      key: "stateWillUpdate",
      value: function stateWillUpdate() {}
    }, {
      key: "stateDidUpdate",
      value: function stateDidUpdate() {} // public setters

    }, {
      key: "setState",
      value: function setState() {
        var _this2 = this;

        var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;
        var fn = arguments.length > 1 ? arguments[1] : undefined;
        this.stateWillUpdate();
        var propsToUpdate = [];
        /* START.DEV */

        try {
          var _loop = function _loop(stateKey) {
            if (newState[stateKey] !== _this2.state[stateKey]) {
              propsToUpdate.push(stateKey);
              _this2.state[stateKey] = newState[stateKey];

              if (_this2.$s) {
                if (_this2.$s[stateKey]) {
                  _this2.$s[stateKey].forEach(function (stateObj) {
                    updateDOM$1(stateObj.el, newState[stateKey]);
                  });
                }
              }
            }
          };

          /* END.DEV */
          for (var stateKey in newState) {
            _loop(stateKey);
          }
          /* START.DEV */

        } catch (err) {
          console.error("\uD83E\uDD13 -- \"Whoops, pal!  You ran into this error while updating state: \n      ", err, " within this root element ", this.$root);
        }
        /* END.DEV */


        if (this.$d.size > 0) {
          updateDependents.call(this, propsToUpdate);
        }

        hasCallback(fn);
        this.stateDidUpdate();
      }
    }]);

    return Component;
  }(Exponent);

  /* START.DEV */

  console.warn("\uD83E\uDD13 -- \"Excuse me there. I am Dominic, call me Dom.\nYou are using a DEVELOPMENT build of Domponent.  \nThis will create performance issues within your app.  \nThe use of domponent.development.js is to provide better debugging... and to hang with me... Dom.\nPlease swap out to domponent.production.min.js for production code.\nSee ya soon!\"");
  /* END.DEV */
  // generates the App

  function Init(config) {
    var _this = this;

    // components and their instances
    this.components = config.components;
    this.registeredComponents = {}; // renaming data attributes to avoid collisions

    this.$datasets = function () {
      var dataSet = datasetEnum;

      if (config.dataAttributes) {
        for (var key in config.dataAttributes) {
          dataSet[key] = config.dataAttributes[key];
        }
      }
      /* START.DEV */


      console.log("\uD83E\uDD13 -- \"Dom here. Your data attribute suffixes are in this object: \n      ", dataSet, "\n      Coolio.  We should hang out some time!\"");
      /* END.DEV */

      return dataSet;
    }(); // methods to expose
    // create component


    this._cc = function (el, cb) {
      var key = el.getAttribute("data-".concat(_this.$datasets.key)) || createKey();
      /* START.DEV */

      try {
        /* END.DEV */
        _this.registeredComponents[key] = new config.components[el.getAttribute("data-".concat(_this.$datasets.component))]({
          element: el,
          key: key,
          app: _this
        });
        /* START.DEV */
      } catch (err) {
        console.error("\uD83E\uDD13 -- \"You messed up creating a component instance for component \n          ".concat(key, " \n          on $root element \""), el, err);
      }
      /* END.DEV */


      cb ? cb() : null;
    }; // delete component


    this._dc = function (key, cb) {
      _this.registeredComponents[key].disconnecting();

      unbindListeners.call(_this.registeredComponents[key]);
      delete _this.registeredComponents[key];
      cb ? cb() : null;
    }; // register component


    this._rc = function (name, C, cb) {
      /* START.DEV */
      if (typeof C.constructor !== 'function') {
        console.error("\uD83E\uDD13 -- \"Hey, buddy.  You can't register something that's not a class.\n        Also, wanna play Catan or something later?  ...No pressure.\"");
      }
      /* END.DEV */


      _this.components[name] = C;
      cb ? cb() : null;
    }; // unregister component


    this._urc = function (name, cb) {
      delete _this.component[name];
      cb ? cb() : null;
    }; // creating the components initially


    _toConsumableArray(config.selector.querySelectorAll("[data-".concat(this.$datasets.component, "]"))).forEach(function (componentEl) {
      _this._cc(componentEl);
    }, this);

    config.appCreated ? config.appCreated() : null;
    /* START.DEV */

    var me = this;
    console.log("\uD83E\uDD13 -- \"Here's the app you created: \"", me);
    /* END.DEV */
    // exposing methods

    return {
      createComponent: function createComponent(el, cb) {
        return _this._cc(el, cb);
      },
      deleteComponent: function deleteComponent(el, cb) {
        return _this._dc(el, cb);
      },
      register: function register(name, C, cb) {
        return _this._rc(name, C, cb);
      },
      unregister: function unregister(name, cb) {
        return _this._urc(name, cb);
      }
    };
  }

  exports.Component = Component;
  exports.Exponent = Exponent;
  exports.Init = Init;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
