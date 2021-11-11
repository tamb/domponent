!(function(t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.Domponent = e())
    : (t.Domponent = e());
})(self, function() {
  return (() => {
    "use strict";
    var t = {
        d: (e, n) => {
          for (var r in n)
            t.o(n, r) &&
              !t.o(e, r) &&
              Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
        },
        o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
        r: t => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(t, "__esModule", { value: !0 });
        }
      },
      e = {};
    t.r(e), t.d(e, { default: () => T });
    const n = {
        component: "component",
        key: "key",
        props: "props",
        action: "action",
        state: "state",
        bind: "bind",
        ref: "ref",
        ref_array: "ref-array"
      },
      r = {
        INHERITS_FROM: "<-",
        FROM_COMPONENT: ".",
        KEY_VALUE: ":",
        MULTIPLE_VALUES: "|",
        METHOD_CALL: "->",
        LIST: ","
      },
      o = { ONCE: "once", PASSIVE: "passive", CAPTURE: "capture" };
    function a(t, e) {
      "INPUT" === t.tagName.toUpperCase() ||
      "TEXTAREA" === t.tagName.toUpperCase() ||
      "SELECT" === t.tagName.toUpperCase()
        ? (t.value = e)
        : (t.textContent = e);
    }
    function s(t) {
      return t
        .trim()
        .split(this.$app.$syntax.KEY_VALUE)
        .map(function(t) {
          return t.trim();
        });
    }
    function i(t) {
      return t
        .trim()
        .split(this.$app.$syntax.MULTIPLE_VALUES)
        .map(function(t) {
          return t.trim();
        });
    }
    function p(t) {
      return t
        .trim()
        .split(this.$app.$syntax.INHERITS_FROM)
        .map(function(t) {
          return t.trim();
        });
    }
    function c(t) {
      return t
        .trim()
        .split(this.$app.$syntax.METHOD_CALL)
        .map(function(t) {
          return t.trim();
        });
    }
    function u(t) {
      return t
        .trim()
        .split(this.$app.$syntax.FROM_COMPONENT)
        .map(function(t) {
          return t.trim();
        });
    }
    function l(t) {
      return t
        .trim()
        .split(this.$app.$syntax.LIST)
        .map(function(t) {
          return t.trim();
        });
    }
    var f = function(t, e, n) {
      if (n || 2 === arguments.length)
        for (var r, o = 0, a = e.length; o < a; o++)
          (!r && o in e) ||
            (r || (r = Array.prototype.slice.call(e, 0, o)), (r[o] = e[o]));
      return t.concat(r || Array.prototype.slice.call(e));
    };
    function h() {
      var t = this,
        e = this,
        n = _.call(
          this,
          "[data-" +
            this.$app.$datasets.bind +
            '^="state' +
            this.$app.$syntax.KEY_VALUE +
            '"]'
        );
      if (n.length > 0) {
        var r = {};
        return (
          n.forEach(function(n) {
            var o = {};
            i.call(e, n.getAttribute("data-" + t.$app.$datasets.bind)).forEach(
              function(t) {
                var a = s.call(e, t),
                  i = u.call(e, a[1])[1];
                (o.el = n), r[i] || (r[i] = []), r[i].push(o);
              }
            );
          }, this),
          r
        );
      }
      return null;
    }
    function d() {
      var t = this.$root.getAttribute("data-" + this.$app.$datasets.state);
      this.state = t ? JSON.parse(t) : {};
    }
    function $() {
      var t = this,
        e = this;
      (this.$b = []),
        (this.$root.getAttribute("data-" + this.$app.$datasets.action)
          ? [this.$root]
          : []
        )
          .concat(_.call(this, "[data-" + this.$app.$datasets.action + "]"))
          .forEach(function(n) {
            var r = i.call(
                e,
                n.getAttribute("data-" + t.$app.$datasets.action)
              ),
              a = { el: n, actions: [] };
            r.forEach(function(r) {
              var s = c.call(e, r),
                i = s[0],
                p = u.call(e, s[1]);
              if (p[0] === t.$name) {
                var f = {};
                if (p[2]) {
                  var h = l.call(e, p[2]);
                  for (var d in o) f[o[d]] = h.includes(o[d]);
                }
                var $ = t[p[1]];
                n.addEventListener(i, $, f),
                  a.actions.push({ event: i, handler: $, options: f });
              }
            }, t),
              t.$b.push(a);
          }, this);
    }
    function y() {
      var t = this;
      this.$b.forEach(function(e) {
        e.actions.forEach(function(t) {
          e.el.removeEventListener(t.event, t.handler, t.options);
        }, t);
      }, this);
    }
    function m(t) {
      var e = this;
      this.$d.forEach(function(n) {
        v.call(e.$app.registeredComponents[n], t);
      });
    }
    function v(t) {
      var e = this;
      this.propsWillUpdate();
      var n = Object.assign({}, this.props),
        r = function(n) {
          var r = o.$p[n];
          t.includes(o.$p[n].parentComponentKey) &&
            (o.$watchers[n] &&
              o.$watchers[n].pre &&
              o.$watchers[n].pre.call(
                o,
                r.parentComponent.state[r.parentComponentKey],
                o.props[n]
              ),
            (o.props[n] = r.parentComponent.state[r.parentComponentKey]),
            o.$p[n].els &&
              o.$p[n].els.forEach(function(t) {
                a(t, e.props[n]);
              }),
            o.$watchers[n] &&
              o.$watchers[n].post &&
              o.$watchers[n].post.call(o, o.props[n]));
        },
        o = this;
      for (var s in this.$p) r(s);
      this.propsDidUpdate(n);
    }
    function x() {
      var t = this,
        e = this,
        n = this.$root.getAttribute("data-" + this.$app.$datasets.props);
      if (n) {
        var r = {};
        return (
          i.call(e, n).forEach(function(n) {
            var o = p.call(e, n),
              a = s.call(e, o[1]),
              i = o[0],
              c = t.$app.registeredComponents[a[0]],
              u = a[1];
            c.$d.add(t.$key);
            var l = f(
              [],
              _.call(
                t,
                "[" +
                  t.$app.$datasets.bind +
                  '^="props' +
                  t.$app.$syntax.KEY_VALUE +
                  i +
                  '"]'
              ),
              !0
            );
            (t.props[i] = c.state[u]),
              (r[i] = {
                parentComponent: c,
                parentComponentKey: u,
                els: l.length > 0 ? l : null
              });
          }, this),
          r
        );
      }
      return null;
    }
    function E() {
      var t = this,
        e = this;
      _.call(
        this,
        "[data-" +
          this.$app.$datasets.ref +
          "*='" +
          this.$name +
          this.$app.$syntax.FROM_COMPONENT +
          "']"
      ).forEach(function(n) {
        t.$refs[
          u.call(e, n.getAttribute("data-" + t.$app.$datasets.ref))[1]
        ] = n;
      });
    }
    function g() {
      var t = this,
        e = null,
        n = this;
      _.call(
        this,
        "[data-" +
          this.$app.$datasets.ref_array +
          "*='" +
          this.$name +
          this.$app.$syntax.FROM_COMPONENT +
          "']"
      ).forEach(function(r) {
        var o = u.call(
          n,
          r.getAttribute("data-" + t.$app.$datasets.ref_array)
        )[1];
        !t.$refs[o] && (t.$refs[o] = []),
          o === e || ((e = o), (t.$refs[o] = [])),
          t.$refs[o].push(r);
      });
    }
    function _(t) {
      var e = this;
      return f([], this.$root.querySelectorAll(t), !0).filter(function(t) {
        return (
          t.closest(
            "[data-" +
              e.$app.$datasets.component +
              '="' +
              e.$root.getAttribute("data-" + e.$app.$datasets.component) +
              '"]'
          ) === e.$root
        );
      });
    }
    var b,
      C =
        ((b = function(t, e) {
          return (
            (b =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(t, e) {
                  t.__proto__ = e;
                }) ||
              function(t, e) {
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              }),
            b(t, e)
          );
        }),
        function(t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Class extends value " +
                String(e) +
                " is not a constructor or null"
            );
          function n() {
            this.constructor = t;
          }
          b(t, e),
            (t.prototype =
              null === e
                ? Object.create(e)
                : ((n.prototype = e.prototype), new n()));
        });
    const A = (function(t) {
      function e(e, n, r) {
        void 0 === r && (r = !1);
        var o = t.call(this, e, n) || this;
        return (
          o.connecting(),
          (o.props = {}),
          (o.$d = new Set()),
          (o.$refs = {}),
          E.call(o),
          g.call(o),
          (o.$p = x.call(o)),
          $.call(o),
          (o.$watchers = o.watch ? o.watch() : {}),
          !r && o.connected(),
          o
        );
      }
      return (
        C(e, t),
        (e.prototype.connecting = function() {}),
        (e.prototype.connected = function() {}),
        (e.prototype.disconnecting = function() {}),
        (e.prototype.propsWillUpdate = function() {}),
        (e.prototype.propsDidUpdate = function() {}),
        e
      );
    })(function(t, e) {
      (this.$root = t),
        e &&
          ((this.$app = e.app),
          (this.$key = e.key),
          (this.$name = t.getAttribute(
            "data-" + this.$app.$datasets.component
          )));
    });
    var O = (function() {
        var t = function(e, n) {
          return (
            (t =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(t, e) {
                  t.__proto__ = e;
                }) ||
              function(t, e) {
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              }),
            t(e, n)
          );
        };
        return function(e, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function r() {
            this.constructor = e;
          }
          t(e, n),
            (e.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        };
      })(),
      w = (function(t) {
        function e(e, n) {
          var r = t.call(this, e, n, !0) || this;
          return d.call(r), (r.$s = h.call(r)), r.connected(), r;
        }
        return (
          O(e, t),
          (e.prototype.stateWillUpdate = function() {}),
          (e.prototype.stateDidUpdate = function() {}),
          (e.prototype.setState = function(t, e) {
            void 0 === t && (t = this.state), this.stateWillUpdate();
            var n,
              r = [],
              o = function(e) {
                t[e] !== s.state[e] &&
                  (r.push(e),
                  s.$watchers[e] &&
                    s.$watchers[e].pre &&
                    s.$watchers[e].pre.call(s, t[e], s.state[e]),
                  (s.state[e] = t[e]),
                  s.$s &&
                    s.$s[e] &&
                    s.$s[e].forEach(function(n) {
                      a(n.el, t[e]);
                    }),
                  s.$watchers[e] &&
                    s.$watchers[e].post &&
                    s.$watchers[e].post.call(s, s.state[e]));
              },
              s = this;
            for (var i in t) o(i);
            this.$d.size > 0 && m.call(this, r),
              (n = e) && n(),
              this.stateDidUpdate();
          }),
          e
        );
      })(A);
    var S = function(t, e, n) {
      if (n || 2 === arguments.length)
        for (var r, o = 0, a = e.length; o < a; o++)
          (!r && o in e) ||
            (r || (r = Array.prototype.slice.call(e, 0, o)), (r[o] = e[o]));
      return t.concat(r || Array.prototype.slice.call(e));
    };
    const T = {
      Init: function(t) {
        var e = this;
        return (
          (this.components = t.components || {}),
          (this.registeredComponents = {}),
          (this.$datasets = (function() {
            var e = n;
            if (t.dataAttributes)
              for (var r in t.dataAttributes) e[r] = t.dataAttributes[r];
            return e;
          })()),
          (this.$syntax = (function() {
            var e = r;
            if (t.customSyntax)
              for (var n in t.customSyntax) e[n] = t.customSyntax[n];
            return e;
          })()),
          (this._cc = function(n, r) {
            var o =
              n.getAttribute("data-" + e.$datasets.key) ||
              "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
                t
              ) {
                var e = (16 * Math.random()) | 0;
                return ("x" == t ? e : (3 & e) | 8).toString(16);
              });
            (e.registeredComponents[o] = new t.components[
              n.getAttribute("data-" + e.$datasets.component)
            ](n, { key: o, app: e })),
              r && r();
          }),
          (this._dc = function(t, n) {
            e.registeredComponents[t].disconnecting(),
              y.call(e.registeredComponents[t]),
              delete e.registeredComponents[t],
              n && n();
          }),
          (this._rc = function(t, n, r) {
            (e.components[t] = n), r && r();
          }),
          (this._urc = function(t, n) {
            delete e.component[t], n && n();
          }),
          S(
            [],
            t.selector.querySelectorAll(
              "[data-" + this.$datasets.component + "]"
            ),
            !0
          ).forEach(function(t) {
            e._cc(t);
          }, this),
          t.appCreated && t.appCreated(),
          {
            createComponent: function(t, n) {
              return e._cc(t, n);
            },
            deleteComponent: function(t, n) {
              return e._dc(t, n);
            },
            register: function(t, n, r) {
              return e._rc(t, n, r);
            },
            unregister: function(t, n) {
              return e._urc(t, n);
            },
            createdComponents: this.registeredComponents,
            components: this.components
          }
        );
      },
      Component: w,
      Exponent: A
    };
    return e;
  })();
});

console.log(window.Domponent);
