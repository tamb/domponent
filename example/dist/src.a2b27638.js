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
})({"node_modules/domponent/dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const t = {
  component: "component",
  key: "key",
  props: "props",
  action: "action",
  state: "state",
  bind: "bind"
},
      e = {
  INHERITS_FROM: "<-",
  FROM_COMPONENT: ".",
  KEY_VALUE: ":",
  MULTIPLE_VALUES: "|",
  METHOD_CALL: "->"
};

class s {
  constructor(t) {
    this.$root = t.element, this.$app = t.app, this.$key = t.key, this.$name = t.element.getAttribute(`data-${this.$app.$datasets.component}`);
  }

}

function n(t, e) {
  t.textContent = e;
}

function i(t) {
  return t.trim().split(e.KEY_VALUE);
}

function o(t) {
  return t.trim().split(e.MULTIPLE_VALUES);
}

function a(t) {
  return t.trim().split(e.FROM_COMPONENT);
}

function r(t) {
  return [...this.$root.querySelectorAll(t)].filter(t => t.closest(`[data-${this.$app.$datasets.component}]`) === this.$root);
}

function p() {
  r.call(this, `[data-${this.$app.$datasets.action}]`).forEach(t => {
    o(t.getAttribute(`data-${this.$app.$datasets.action}`)).forEach(s => {
      const n = function (t) {
        return t.trim().split(e.METHOD_CALL);
      }(s),
            i = n[0],
            o = a(n[1]);

      o[0] === this.$name && t.addEventListener(i, t => this[o[1]](t));
    }, this);
  }, this);
}

function c(t) {
  this.dependents.forEach(e => {
    (function (t) {
      this.propsWillUpdate();
      const e = Object.assign({}, this.props);

      for (let e in this.propObjects) {
        const s = this.propObjects[e];
        t.includes(this.propObjects[e].parentComponentKey) && (this.props[e] = s.parentComponent.state[s.parentComponentKey], this.propObjects[e].els && this.propObjects[e].els.forEach(t => {
          updateDOM(t, this.props[e]);
        }));
      }

      this.propsDidUpdate(e);
    }).call(this.$app.registeredComponents[e], t);
  });
}

function h() {
  const t = this.$root.getAttribute(`data-${this.$app.$datasets.props}`);

  if (t) {
    const s = {};
    return o(t).forEach(t => {
      const n = function (t) {
        return t.trim().split(e.INHERITS_FROM);
      }(t),
            o = i(n[1]),
            a = n[0],
            p = this.$app.registeredComponents[o[0]],
            c = o[1];

      p.dependents.add(this.$key);
      const h = [...r.call(this, `[${this.$app.$datasets.bind}^="props:${a}"]`)];
      this.props[a] = p.state[c], s[a] = {
        parentComponent: p,
        parentComponentKey: c,
        els: h.length > 0 ? h : null
      };
    }, this), s;
  }

  return null;
}

class d extends s {
  constructor(t) {
    super(t), this.props = {}, this.dependents = new Set(), this.propObjects = h.call(this);
  }

  propsWillUpdate() {}

  propsDidUpdate() {}

}

var l = {
  Init: function (e) {
    return this.components = e.components, this.registeredComponents = {}, this.$datasets = (() => {
      const s = t;
      if (e.dataAttributes) for (let t in e.dataAttributes) s[t] = e.dataAttributes[t];
      return s;
    })(), this._cc = (t, s) => {
      const n = t.getAttribute(`data-${this.$datasets.key}`) || "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var e = 16 * Math.random() | 0;
        return ("x" == t ? e : 3 & e | 8).toString(16);
      });
      this.registeredComponents[n] = new e.components[t.getAttribute(`data-${this.$datasets.component}`)]({
        element: t,
        key: n,
        app: this
      }), s && s();
    }, this._dc = (t, e) => {
      delete this.registeredComponents[t], e && e();
    }, this._rc = (t, e, s) => {
      this.components[t] = e, s && s();
    }, this._urc = (t, e) => {
      delete this.component[t], e && e();
    }, [...e.selector.querySelectorAll(`[data-${this.$datasets.component}]`)].forEach(t => {
      this._cc(t);
    }, this), e.appCreated && e.appCreated(), {
      createComponent: (t, e) => this._cc(t, e),
      deleteComponent: (t, e) => this._dc(t, e),
      register: (t, e, s) => this._rc(t, e, s),
      unregister: (t, e) => this._urc(t, e)
    };
  },
  Exponent: d,
  Component: class extends d {
    constructor(t) {
      super(t), this.state = {}, this.stateObjects = function () {
        const t = r.call(this, '[data-bind^="state:"]');

        if (t.length > 0) {
          const e = {};
          return t.forEach(t => {
            const s = {};
            o(t.getAttribute("data-bind")).forEach(n => {
              const o = a(i(n)[1])[1];
              s.el = t, e[o] || (e[o] = []), e[o].push(s);
            });
          }, this), e;
        }

        return null;
      }.call(this), p.call(this), function () {
        const t = this.$root.getAttribute("data-state");

        if (t) {
          const e = o(t),
                s = {};
          e.forEach(t => {
            const e = i(t);
            s[e[0]] = e[1];
          }), this.setState(s);
        }
      }.call(this);
    }

    stateWillUpdate() {}

    stateDidUpdate() {}

    setState(t = this.state, e) {
      this.stateWillUpdate();
      const s = [];

      for (let e in t) t[e] !== this.state[e] && (s.push(e), this.state[e] = t[e], this.stateObjects[e] && this.stateObjects[e].forEach(s => {
        n(s.el, t[e]);
      }));

      var i;
      this.dependents.size > 0 && c.call(this, s), (i = e) && i(), this.stateDidUpdate();
    }

  }
};
var _default = l;
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

var _domponent = require("domponent");

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

  function Counter(conf) {
    var _this;

    _classCallCheck(this, Counter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Counter).call(this, conf));
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
      var _this2 = this;

      var newState = {};
      var largerCount = parseInt(this.state.count + 1, 10);
      newState.count = largerCount;
      newState.ofFive = largerCount % 5 === 0;
      this.setState(newState, function () {
        return console.log('Single Callback', _this2);
      });
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
        this.$root.classList.add("yellow");
      } else {
        this.$root.classList.remove("yellow");
      }
    }
  }]);

  return Counter;
}(_domponent.Component);

exports.default = Counter;
},{"domponent":"node_modules/domponent/dist/index.js","./Counter.css":"src/Counter.css"}],"src/CurrentTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domponent = require("domponent");

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
}(_domponent.Component);

exports.default = CurrentTime;
},{"domponent":"node_modules/domponent/dist/index.js"}],"src/DisplayAnything.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domponent = require("domponent");

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
function (_Exponent) {
  _inherits(DisplayAnything, _Exponent);

  function DisplayAnything(el) {
    var _this;

    _classCallCheck(this, DisplayAnything);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DisplayAnything).call(this, el));
    _this.code = _this.$root.querySelector(".code");
    _this.objects = _this.$root.querySelector(".propObjects");

    _this.displayProps();

    return _this;
  }

  _createClass(DisplayAnything, [{
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
}(_domponent.Exponent);

exports.default = DisplayAnything;
},{"domponent":"node_modules/domponent/dist/index.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _domponent = require("domponent");

var _Counter = _interopRequireDefault(require("./Counter"));

var _CurrentTime = _interopRequireDefault(require("./CurrentTime"));

var _DisplayAnything = _interopRequireDefault(require("./DisplayAnything"));

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Name from "./Name";
// import { Init } from "./Framework/index";
// import domInsert from "./domInsert";
console.time('appCreation');
var App = new _domponent.Init({
  selector: document.getElementById("root"),
  components: {
    Counter: _Counter.default,
    CurrentTime: _CurrentTime.default,
    DisplayAnything: _DisplayAnything.default // Name

  },
  appCreated: function appCreated() {
    return console.log("app created");
  }
});
console.timeEnd('appCreation'); // const mills = document.getElementById('mills');
// const up = document.getElementById('up');
// const down = document.getElementById('down');
// let grow = 1;
// let shrink = 60;
// setInterval(()=>{
//   --shrink;
//   mills.textContent = ++grow;
//   if(grow === 30){
//     grow = 0;
//   }
//   if(shrink === 0){
//     shrink = 30;
//   }
//   up.style.height = grow * 3+'px';
//   down.style.height = shrink * 3+'px';
// },1);
// setTimeout(() => {
//   domInsert("id2");
//   App.createComponent(document.getElementById("id2"));
// }, 1000);
// setTimeout(() => {
//   domInsert("id3");
//   App.createComponent(document.getElementById("id3"));
// }, 3000);
},{"domponent":"node_modules/domponent/dist/index.js","./Counter":"src/Counter.js","./CurrentTime":"src/CurrentTime.js","./DisplayAnything":"src/DisplayAnything.js","./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35539" + '/');

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