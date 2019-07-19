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
})({"src/Framework.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Component = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// utils
function createKey() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function splitColon(string) {
  return string.trim().split(":");
}

function splitPipe(string) {
  return string.trim().split("|");
}

function splitArrow(string) {
  return string.trim().split("<-");
}

function splitComma(string) {
  return string.trim().split(",");
}

var Component =
/*#__PURE__*/
function () {
  function Component(conf) {
    _classCallCheck(this, Component);

    this.root = conf.rootEl;
    this.key = conf.key;
    this.__app = conf.app;

    this._createComponent();

    this._initState();
  } // internal methods


  _createClass(Component, [{
    key: "_bindListeners",
    value: function _bindListeners() {
      var _this = this;

      this.root.querySelectorAll("[data-action]").forEach(function (el) {
        var actions = splitPipe(el.getAttribute("data-action"));
        actions.forEach(function (action) {
          var parts = splitColon(action);
          var event = parts[0];
          var cbFunc = parts[1];
          el.addEventListener(event, function (e) {
            return _this[cbFunc](e);
          });
        }, _this);
      }, this);
    }
  }, {
    key: "_createComponent",
    value: function _createComponent() {
      this.dependents = new Set();
      this.props = {};
      this.state = {};
      this.propObjects = this._createPropObjects();
      this.stateObjects = this._createStateObjects();

      this._bindListeners();

      this.componentMade();
    }
  }, {
    key: "_createPropObjects",
    value: function _createPropObjects() {
      var _this2 = this;

      var attr = this.root.getAttribute("data-props");

      if (attr) {
        var propObjects = {};
        var props = splitPipe(attr);
        props.forEach(function (prop) {
          var propStringValues = splitArrow(prop);
          var parentComponentValues = splitColon(propStringValues[1]);
          var propName = propStringValues[0];
          var parentComponent = _this2.__app.registeredComponents[parentComponentValues[0]];
          var parentComponentKey = parentComponentValues[1];
          parentComponent.dependents.add(_this2.key);

          var els = _toConsumableArray(_this2.root.querySelectorAll("[data-bind^=\"props:".concat(propName, "\"]")));

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
  }, {
    key: "_createStateObjects",
    value: function _createStateObjects() {
      var nodes = this.root.querySelectorAll('[data-bind^="state:"]');

      if (nodes.length > 0) {
        var stateObjects = {};
        nodes.forEach(function (el) {
          var newStateObject = {};
          var states = splitPipe(el.getAttribute("data-bind"));
          states.forEach(function (state) {
            var parts = splitColon(state);
            var stateKey = parts[1];
            var attrs = parts[2];

            if (attrs) {
              attrs = splitComma(attrs);
            }

            newStateObject.el = el;
            newStateObject.attrs = attrs;

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
  }, {
    key: "_initState",
    value: function _initState() {
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
  }, {
    key: "_updateDependents",
    value: function _updateDependents(updatedProps) {
      var _this3 = this;

      this.dependents.forEach(function (key) {
        _this3.__app.registeredComponents[key]._updateProps(updatedProps);
      });
    }
  }, {
    key: "_updateDOM",
    value: function _updateDOM(el, value, attrs) {
      var _this4 = this;

      if (attrs) {
        splitComma(attrs).forEach(function (attr) {
          _this4.updateAttr(el, attr, value);
        });
        return;
      }

      el.textContent = value;
    }
  }, {
    key: "_updateProps",
    value: function _updateProps(updatedProps) {
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
    } // lifecycle methods

  }, {
    key: "componentMade",
    value: function componentMade() {}
  }, {
    key: "propsWillUpdate",
    value: function propsWillUpdate() {}
  }, {
    key: "propsDidUpdate",
    value: function propsDidUpdate() {}
  }, {
    key: "stateWillUpdate",
    value: function stateWillUpdate() {}
  }, {
    key: "stateDidUpdate",
    value: function stateDidUpdate() {} // public setters

  }, {
    key: "setState",
    value: function setState() {
      var _this6 = this;

      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;
      var fn = arguments.length > 1 ? arguments[1] : undefined;
      this.stateWillUpdate();
      var propsToUpdate = [];

      var _loop2 = function _loop2(stateKey) {
        if (newState[stateKey] !== _this6.state[stateKey]) {
          propsToUpdate.push(stateKey);
          _this6.state[stateKey] = newState[stateKey];

          var els = _toConsumableArray(_this6.root.querySelectorAll("[data-bind=\"state:".concat(stateKey, "\"]")));

          if (els.length > 0) {
            els.forEach(function (el) {
              _this6._updateDOM(el, newState[stateKey]);
            });
          }
        }
      };

      for (var stateKey in newState) {
        _loop2(stateKey);
      }

      if (this.dependents.size > 0) {
        this._updateDependents(propsToUpdate);
      }

      fn ? fn() : null;
      this.stateDidUpdate();
    }
  }]);

  return Component;
}(); // generates the App


exports.Component = Component;

function InitApp(config) {
  var _this7 = this;

  // components and their instances
  this.components = config.components;
  this.registeredComponents = {}; // methods to expose
  // create component

  this._cc = function (el, cb) {
    var key = el.getAttribute("data-key") || createKey();
    _this7.registeredComponents[key] = new config.components[el.getAttribute("data-component")]({
      rootEl: el,
      key: key,
      app: _this7
    });
    cb ? cb() : null;
  }; // delete component


  this._dc = function (key, cb) {
    delete _this7.registeredComponents[key];
    cb ? cb() : null;
  }; // register component


  this._rc = function (name, C, cb) {
    _this7.components[name] = C;
    cb ? cb() : null;
  }; // unregister component


  this._urc = function (name, cb) {
    delete _this7.component[name];
    cb ? cb() : null;
  }; // creating the components initially


  _toConsumableArray(config.selector.querySelectorAll("[data-component]")).forEach(function (componentEl) {
    _this7._cc(componentEl);
  }, this);

  config.appCreated ? config.appCreated() : null; // exposing methods

  return {
    createComponent: function createComponent(el, cb) {
      return _this7._cc(el, cb);
    },
    deleteComponent: function deleteComponent(el, cb) {
      return _this7._dc(el, cb);
    },
    register: function register(name, C, cb) {
      return _this7._rc(name, C, cb);
    },
    unregister: function unregister(name, cb) {
      return _this7._urc(name, cb);
    }
  };
} // generates the app


var _default = InitApp;
exports.default = _default;
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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

var _Framework = require("./Framework");

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

var Counter =
/*#__PURE__*/
function (_Component) {
  _inherits(Counter, _Component);

  function Counter(el) {
    var _this;

    _classCallCheck(this, Counter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Counter).call(this, el));
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
}(_Framework.Component);

exports.default = Counter;
},{"./Framework":"src/Framework.js","./Counter.css":"src/Counter.css"}],"src/CurrentTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Framework = require("./Framework");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CurrentTime =
/*#__PURE__*/
function (_Component) {
  _inherits(CurrentTime, _Component);

  function CurrentTime(el) {
    var _this;

    _classCallCheck(this, CurrentTime);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CurrentTime).call(this, el));
    _this.state = {
      hours: "",
      seconds: "",
      minutes: ""
    };
    setInterval(function () {
      _this.changeTime();
    }, 1000);
    return _this;
  }

  _createClass(CurrentTime, [{
    key: "changeTime",
    value: function changeTime() {
      var date = new Date();
      this.setState({
        seconds: date.getSeconds(),
        hours: date.getHours(),
        minutes: date.getMinutes()
      });
    }
  }]);

  return CurrentTime;
}(_Framework.Component);

exports.default = CurrentTime;
},{"./Framework":"src/Framework.js"}],"src/DisplayAnything.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Framework = require("./Framework");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DisplayAnything =
/*#__PURE__*/
function (_Component) {
  _inherits(DisplayAnything, _Component);

  function DisplayAnything(el) {
    _classCallCheck(this, DisplayAnything);

    return _possibleConstructorReturn(this, _getPrototypeOf(DisplayAnything).call(this, el));
  }

  _createClass(DisplayAnything, [{
    key: "componentMade",
    value: function componentMade() {
      this.code = this.root.querySelector(".code");
      this.objects = this.root.querySelector(".propObjects");
      this.displayProps();
    }
  }, {
    key: "propsDidUpdate",
    value: function propsDidUpdate(oldProps) {
      if (oldProps.goBold !== this.props.goBold) {
        this.displayProps();
      }
    }
  }, {
    key: "displayProps",
    value: function displayProps() {
      this.code.textContent = JSON.stringify(this.props, undefined, 4);
      this.objects.textContent = JSON.stringify(this.propObjects.goBold.parentComponentKey, undefined, 4);
    }
  }]);

  return DisplayAnything;
}(_Framework.Component);

exports.default = DisplayAnything;
},{"./Framework":"src/Framework.js"}],"src/Name.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Framework = require("./Framework");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Name =
/*#__PURE__*/
function (_Component) {
  _inherits(Name, _Component);

  function Name(el) {
    var _this;

    _classCallCheck(this, Name);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Name).call(this, el));
    _this.state = {
      name: "Thomas"
    };
    return _this;
  }

  _createClass(Name, [{
    key: "handleInput",
    value: function handleInput(event) {
      this.setState({
        name: event.target.value
      });
    }
  }, {
    key: "stateWillUpdate",
    value: function stateWillUpdate() {
      this.secondInput = this.root.querySelector(".above-controlled");
    }
  }, {
    key: "stateDidUpdate",
    value: function stateDidUpdate() {
      this.secondInput.value = this.state.name;
    }
  }]);

  return Name;
}(_Framework.Component);

exports.default = Name;
},{"./Framework":"src/Framework.js"}],"src/domInsert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(id) {
  console.log("inserting into dom");
  var root = document.getElementById("root");
  var number = Math.floor(Math.random() * 100);
  var component = "\n  <div id=\"".concat(id, "\" data-component=\"Counter\" data-state=\"count:").concat(number, "|").concat(number % 5 === 0 ? 'ofFive:true' : null, "\">\n  <h2 data-action=\"mousedown:goBlue|mouseup:goGreen\">Async Counter</h2>\n  <div>count: <span data-bind=\"state:count\"></span></div>\n  <button\n    type=\"button\"\n    data-action=\"click:increment|mouseover:goBlue|mouseout:goGreen\"\n    class=\"increment\"\n  >\n    +1\n  </button>\n  <button type=\"button\" data-action=\"click:decrement\" class=\"decrement\">\n    -1\n  </button>\n</div>\n  ");
  root.insertAdjacentHTML("beforeend", component);
}
},{}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _Counter = _interopRequireDefault(require("./Counter"));

var _CurrentTime = _interopRequireDefault(require("./CurrentTime"));

var _DisplayAnything = _interopRequireDefault(require("./DisplayAnything"));

var _Name = _interopRequireDefault(require("./Name"));

var _Framework = _interopRequireDefault(require("./Framework"));

var _domInsert = _interopRequireDefault(require("./domInsert"));

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = new _Framework.default({
  selector: document.getElementById("root"),
  components: {
    Counter: _Counter.default,
    CurrentTime: _CurrentTime.default,
    DisplayAnything: _DisplayAnything.default,
    Name: _Name.default
  },
  appCreated: function appCreated() {
    return console.log("app created");
  }
});
setTimeout(function () {
  (0, _domInsert.default)("id2");
  App.createComponent(document.getElementById("id2"));
}, 1000);
setTimeout(function () {
  (0, _domInsert.default)("id3");
  App.createComponent(document.getElementById("id3"));
}, 3000);
},{"./Counter":"src/Counter.js","./CurrentTime":"src/CurrentTime.js","./DisplayAnything":"src/DisplayAnything.js","./Name":"src/Name.js","./Framework":"src/Framework.js","./domInsert":"src/domInsert.js","./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38343" + '/');

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