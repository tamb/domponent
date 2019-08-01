// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Framework/enums.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relationalStringEnum = exports.datasetEnum = exports.attributeEnum = void 0;
var attributeEnum = {
  COMPONENT: 'data-component',
  ACTION: 'data-action',
  BIND: 'data-bind',
  INITIALSTATE: 'data-state',
  INITIALPROPS: 'data-props',
  KEY: 'data-key'
};
exports.attributeEnum = attributeEnum;
var datasetEnum = {
  component: 'component',
  key: 'key',
  props: 'props',
  action: 'action',
  state: 'state',
  bind: 'bind'
};
exports.datasetEnum = datasetEnum;
var relationalStringEnum = {
  INHERITS_FROM: '<-',
  FROM_COMPONENT: '.',
  KEY_VALUE: ':',
  MULTIPLE_VALUES: "|",
  METHOD_CALL: "->"
};
exports.relationalStringEnum = relationalStringEnum;
},{}],"src/Framework/Scope.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scope =
/*#__PURE__*/
function () {
  function Scope(config) {
    _classCallCheck(this, Scope);

    console.log('in Scope constructor ', config);
    this.$root = config.element;
    this.$app = config.app;
    this.$key = config.key;
    this.$name = config.element.dataset[this.$app.$datasets.component];
  }

  _createClass(Scope, [{
    key: "scopeElements",
    value: function scopeElements(selector) {
      var _this = this;

      console.log('scoping element', this);
      return _toConsumableArray(this.$root.querySelectorAll(selector)).filter(function (el) {
        return el.closest("[data-".concat(_this.$app.$datasets.component, "]")) === _this.$root;
      });
    }
  }]);

  return Scope;
}();

exports.default = Scope;
},{}],"src/Framework/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKey = createKey;
exports.updateDOM = updateDOM;
exports.hasCallback = hasCallback;
exports.splitKeyValuePairs = splitKeyValuePairs;
exports.splitMultipleValues = splitMultipleValues;
exports.splitPropsPassedIn = splitPropsPassedIn;
exports.splitMethodCalls = splitMethodCalls;
exports.splitFromComponent = splitFromComponent;

var _enums = require("./enums");

function createKey() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function updateDOM(el, value) {
  el.textContent = value;
}

function hasCallback(cb) {
  cb ? cb() : null;
} // string parsing


function splitKeyValuePairs(string) {
  return string.trim().split(_enums.relationalStringEnum.KEY_VALUE);
}

function splitMultipleValues(string) {
  return string.trim().split(_enums.relationalStringEnum.MULTIPLE_VALUES);
}

function splitPropsPassedIn(string) {
  return string.trim().split(_enums.relationalStringEnum.INHERITS_FROM);
}

function splitMethodCalls(string) {
  return string.trim().split(_enums.relationalStringEnum.METHOD_CALL);
}

function splitFromComponent(string) {
  return string.trim().split(_enums.relationalStringEnum.FROM_COMPONENT);
}
},{"./enums":"src/Framework/enums.js"}],"src/Framework/Exponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Scope2 = _interopRequireDefault(require("./Scope"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function bindListeners() {
  var _this = this;

  this.scopeElements("[data-".concat(this.$app.$datasets.action, "]")).forEach(function (el) {
    var actions = (0, _utils.splitMultipleValues)(el.getAttribute("data-".concat(_this.$app.$datasets.action)));
    actions.forEach(function (action) {
      var parts = (0, _utils.splitMethodCalls)(action);
      var event = parts[0];
      var cbFunc = splitFromComponent(parts[1]);

      if (cbFunc[0] === _this.$name) {
        el.addEventListener(event, function (e) {
          return _this[cbFunc[1]](e);
        });
      }
    }, _this);
  }, this);
}

function createPropObjects() {
  var _this2 = this;

  var attr = this.$root.getAttribute("data-".concat(this.$app.$datasets.props));

  if (attr) {
    var propObjects = {};
    var props = splitPipe(attr);
    props.forEach(function (prop) {
      var propStringValues = (0, _utils.splitPropsPassedIn)(prop);
      var parentComponentValues = (0, _utils.splitKeyValuePairs)(propStringValues[1]);
      var propName = propStringValues[0];
      var parentComponent = _this2.__app.registeredComponents[parentComponentValues[0]];
      var parentComponentKey = parentComponentValues[1];
      parentComponent.dependents.add(_this2.key);

      var els = _toConsumableArray(_this2.$root.querySelectorAll("[".concat(_this2.$app.$datasets.bind, "^=\"props:").concat(propName, "\"]")));

      _this2.props[propName] = parentComponent.state[parentComponentKey];
      propObjects[propName] = {
        parentComponent: parentComponent,
        parentComponentKey: parentComponentKey,
        els: els.length > 0 ? els : null
      };
    }, this);
    return propObjects;
  } else {
    return null;
  }
}

var Exponent =
/*#__PURE__*/
function (_Scope) {
  _inherits(Exponent, _Scope);

  function Exponent(config) {
    var _this3;

    _classCallCheck(this, Exponent);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Exponent).call(this, config));
    console.log('in exponent');
    _this3.props = {};
    _this3.propObjects = createPropObjects.call(_assertThisInitialized(_this3));
    bindListeners.call(_assertThisInitialized(_this3));
    _this3.constructor.name == 'Exponent' ? _this3.created() : null;
    _this3.dependents = new Set();
    return _this3;
  }

  _createClass(Exponent, [{
    key: "created",
    value: function created() {}
  }, {
    key: "_updateDependents",
    value: function _updateDependents(updatedProps) {
      var _this4 = this;

      this.dependents.forEach(function (key) {
        _this4.__app.registeredComponents[key]._updateProps(updatedProps);
      });
    }
  }, {
    key: "updateProps",
    value: function updateProps(updatedProps) {
      var _this5 = this;

      this.propsWillUpdate();
      var oldProps = Object.assign({}, this.props);

      var _loop = function _loop(key) {
        var obj = _this5.propObjects[key];

        if (updatedProps.includes(_this5.propObjects[key].parentComponentKey)) {
          _this5.props[key] = obj.parentComponent.state[obj.parentComponentKey];

          if (_this5.propObjects[key].els) {
            _this5.propObjects[key].els.forEach(function (el) {
              _this5._updateDOM(el, _this5.props[key]);
            });
          }
        }
      };

      for (var key in this.propObjects) {
        _loop(key);
      }

      this.propsDidUpdate(oldProps);
    }
  }, {
    key: "propsWillUpdate",
    value: function propsWillUpdate() {}
  }, {
    key: "propsDidUpdate",
    value: function propsDidUpdate() {}
  }]);

  return Exponent;
}(_Scope2.default);

exports.default = Exponent;
},{"./Scope":"src/Framework/Scope.js","./utils":"src/Framework/utils.js"}],"src/Framework/Component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Exponent2 = _interopRequireDefault(require("./Exponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function createStateObjects() {
  var nodes = this.root.querySelectorAll('[data-bind^="state:"]');

  if (nodes.length > 0) {
    var stateObjects = {};
    nodes.forEach(function (el) {
      var newStateObject = {};
      var states = splitPipe(el.getAttribute("data-bind"));
      states.forEach(function (state) {
        var parts = splitColon(state);
        var stateKey = parts[1];
        newStateObject.el = el;

        if (!stateObjects[stateKey]) {
          stateObjects[stateKey] = [];
        }

        stateObjects[stateKey].push(newStateObject);
      });
    }, this);
    return stateObjects;
  }

  return null;
}

function initState() {
  var stateAttr = this.root.getAttribute("data-state");

  if (stateAttr) {
    var fields = splitPipe(stateAttr);
    var state = {};
    fields.forEach(function (field) {
      var splitField = splitColon(field);
      state[splitField[0]] = splitField[1];
    });
    this.setState(state);
  }
}

var Component =
/*#__PURE__*/
function (_Exponent) {
  _inherits(Component, _Exponent);

  function Component(config) {
    var _this;

    _classCallCheck(this, Component);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, config));
    _this.state = {};
    _this.stateObjects = createStateObjects.call(_assertThisInitialized(_this));
    initState.call(_assertThisInitialized(_this));
    _this.constructor.name == 'Component' ? _this.created() : null;
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

      var _loop = function _loop(stateKey) {
        if (newState[stateKey] !== _this2.state[stateKey]) {
          propsToUpdate.push(stateKey);
          _this2.state[stateKey] = newState[stateKey];

          var els = _toConsumableArray(_this2.root.querySelectorAll("[data-bind=\"state:".concat(stateKey, "\"]")));

          if (els.length > 0) {
            els.forEach(function (el) {
              _this2._updateDOM(el, newState[stateKey]);
            });
          }
        }
      };

      for (var stateKey in newState) {
        _loop(stateKey);
      }

      if (this.dependents.size > 0) {
        this._updateDependents(propsToUpdate);
      }

      fn ? fn() : null;
      this.stateDidUpdate();
    }
  }]);

  return Component;
}(_Exponent2.default);

exports.default = Component;
},{"./Exponent":"src/Framework/Exponent.js"}],"src/Framework/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Exponent = exports.Component = exports.Init = void 0;

var _enums = require("./enums");

var _Exponent = _interopRequireDefault(require("./Exponent"));

var _Component = _interopRequireDefault(require("./Component"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// generates the App
function InitApp(config) {
  var _this = this;

  // components and their instances
  this.components = config.components;
  this.registeredComponents = {}; // renaming data attributes to avoid collisions

  this.$datasets = function () {
    var dataSet = _enums.datasetEnum;

    if (config.dataAttributes) {
      for (var key in config.dataAttributes) {
        dataSet[key] = config.dataAttributes[key];
      }
    }

    return dataSet;
  }(); // methods to expose
  // create component


  this._cc = function (el, cb) {
    var key = el.getAttribute("data-".concat(_this.$datasets.key)) || (0, _utils.createKey)();
    console.log(el, key, _this.$datasets);
    console.log(el.getAttribute("data-".concat(_this.$datasets.component)));
    _this.registeredComponents[key] = new config.components[el.getAttribute("data-".concat(_this.$datasets.component))]({
      element: el,
      key: key,
      app: _this
    });
    cb ? cb() : null;
  }; // delete component


  this._dc = function (key, cb) {
    delete _this.registeredComponents[key];
    cb ? cb() : null;
  }; // register component


  this._rc = function (name, C, cb) {
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

  config.appCreated ? config.appCreated() : null; // exposing methods

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

var Init = InitApp;
exports.Init = Init;
var Component = _Component.default;
exports.Component = Component;
var Exponent = _Exponent.default; // generates the app
// export default Init;

exports.Exponent = Exponent;
},{"./enums":"src/Framework/enums.js","./Exponent":"src/Framework/Exponent.js","./Component":"src/Framework/Component.js","./utils":"src/Framework/utils.js"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/Counter.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Counter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("./Framework/index");

require("./Counter.css");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

console.log(_index.Component);

var Counter =
/*#__PURE__*/
function (_Component) {
  _inherits(Counter, _Component);

  function Counter(el) {
    var _this;

    _classCallCheck(this, Counter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Counter).call(this, el));
    console.log('in counter');
    _this.state = {
      count: parseInt(_this.state.count) || 0,
      ofFive: _this.state.ofFive || false
    };

    _this.setState();

    return _this;
  }

  _createClass(Counter, [{
    key: "increment",
    value: function increment(e) {
      var newState = {};
      var largerCount = parseInt(this.state.count + 1, 10);
      newState.count = largerCount;
      newState.ofFive = largerCount % 5 === 0;
      this.setState(newState);
    }
  }, {
    key: "decrement",
    value: function decrement(e) {
      var newState = {};
      var fewerCount = parseInt(this.state.count - 1, 10);
      newState.count = fewerCount;
      newState.ofFive = fewerCount % 5 === 0;
      this.setState(newState);
    }
  }, {
    key: "goBlue",
    value: function goBlue(e) {
      e.target.style.color = "blue";
    }
  }, {
    key: "goGreen",
    value: function goGreen(e) {
      e.target.style.color = "green";
    }
  }, {
    key: "stateDidUpdate",
    value: function stateDidUpdate() {
      this.setYellow();
    }
  }, {
    key: "setYellow",
    value: function setYellow() {
      if (this.state.ofFive) {
        this.root.classList.add("yellow");
      } else {
        this.root.classList.remove("yellow");
      }
    }
  }]);

  return Counter;
}(_index.Component);

exports.default = Counter;
},{"./Framework/index":"src/Framework/index.js","./Counter.css":"src/Counter.css"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _Counter = _interopRequireDefault(require("./Counter"));

var _index = require("./Framework/index");

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CurrentTime from "./CurrentTime";
// import DisplayAnything from "./DisplayAnything";
// import Name from "./Name";
// import domInsert from "./domInsert";
console.log('This is the init function', _index.Init);
var App = new _index.Init({
  selector: document.getElementById("root"),
  components: {
    Counter: _Counter.default // CurrentTime,
    // DisplayAnything,
    // Name

  },
  appCreated: function appCreated() {
    return console.log("app created");
  }
}); // setTimeout(() => {
//   domInsert("id2");
//   App.createComponent(document.getElementById("id2"));
// }, 1000);
// setTimeout(() => {
//   domInsert("id3");
//   App.createComponent(document.getElementById("id3"));
// }, 3000);
},{"./Counter":"src/Counter.js","./Framework/index":"src/Framework/index.js","./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34487" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map