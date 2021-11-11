(() => {
  var t = {
      138: t => {
        self,
          (t.exports = (() => {
            "use strict";
            var t = {
                d: (n, e) => {
                  for (var r in e)
                    t.o(e, r) &&
                      !t.o(n, r) &&
                      Object.defineProperty(n, r, {
                        enumerable: !0,
                        get: e[r]
                      });
                },
                o: (t, n) => Object.prototype.hasOwnProperty.call(t, n),
                r: t => {
                  "undefined" != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(t, Symbol.toStringTag, {
                      value: "Module"
                    }),
                    Object.defineProperty(t, "__esModule", { value: !0 });
                }
              },
              n = {};
            t.r(n), t.d(n, { default: () => S });
            const e = {
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
              a = { ONCE: "once", PASSIVE: "passive", CAPTURE: "capture" };
            function o(t, n) {
              "INPUT" === t.tagName.toUpperCase() ||
              "TEXTAREA" === t.tagName.toUpperCase() ||
              "SELECT" === t.tagName.toUpperCase()
                ? (t.value = n)
                : (t.textContent = n);
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
            var f = function(t, n, e) {
              if (e || 2 === arguments.length)
                for (var r, a = 0, o = n.length; a < o; a++)
                  (!r && a in n) ||
                    (r || (r = Array.prototype.slice.call(n, 0, a)),
                    (r[a] = n[a]));
              return t.concat(r || Array.prototype.slice.call(n));
            };
            function h() {
              var t = this,
                n = this,
                e = _.call(
                  this,
                  "[data-" +
                    this.$app.$datasets.bind +
                    '^="state' +
                    this.$app.$syntax.KEY_VALUE +
                    '"]'
                );
              if (e.length > 0) {
                var r = {};
                return (
                  e.forEach(function(e) {
                    var a = {};
                    i.call(
                      n,
                      e.getAttribute("data-" + t.$app.$datasets.bind)
                    ).forEach(function(t) {
                      var o = s.call(n, t),
                        i = u.call(n, o[1])[1];
                      (a.el = e), r[i] || (r[i] = []), r[i].push(a);
                    });
                  }, this),
                  r
                );
              }
              return null;
            }
            function $() {
              var t = this.$root.getAttribute(
                "data-" + this.$app.$datasets.state
              );
              this.state = t ? JSON.parse(t) : {};
            }
            function d() {
              var t = this,
                n = this;
              (this.$b = []),
                (this.$root.getAttribute("data-" + this.$app.$datasets.action)
                  ? [this.$root]
                  : []
                )
                  .concat(
                    _.call(this, "[data-" + this.$app.$datasets.action + "]")
                  )
                  .forEach(function(e) {
                    var r = i.call(
                        n,
                        e.getAttribute("data-" + t.$app.$datasets.action)
                      ),
                      o = { el: e, actions: [] };
                    r.forEach(function(r) {
                      var s = c.call(n, r),
                        i = s[0],
                        p = u.call(n, s[1]);
                      if (p[0] === t.$name) {
                        var f = {};
                        if (p[2]) {
                          var h = l.call(n, p[2]);
                          for (var $ in a) f[a[$]] = h.includes(a[$]);
                        }
                        var d = t[p[1]];
                        e.addEventListener(i, d, f),
                          o.actions.push({ event: i, handler: d, options: f });
                      }
                    }, t),
                      t.$b.push(o);
                  }, this);
            }
            function y() {
              var t = this;
              this.$b.forEach(function(n) {
                n.actions.forEach(function(t) {
                  n.el.removeEventListener(t.event, t.handler, t.options);
                }, t);
              }, this);
            }
            function m(t) {
              var n = this;
              this.$d.forEach(function(e) {
                v.call(n.$app.registeredComponents[e], t);
              });
            }
            function v(t) {
              var n = this;
              this.propsWillUpdate();
              var e = Object.assign({}, this.props),
                r = function(e) {
                  var r = a.$p[e];
                  t.includes(a.$p[e].parentComponentKey) &&
                    (a.$watchers[e] &&
                      a.$watchers[e].pre &&
                      a.$watchers[e].pre.call(
                        a,
                        r.parentComponent.state[r.parentComponentKey],
                        a.props[e]
                      ),
                    (a.props[e] =
                      r.parentComponent.state[r.parentComponentKey]),
                    a.$p[e].els &&
                      a.$p[e].els.forEach(function(t) {
                        o(t, n.props[e]);
                      }),
                    a.$watchers[e] &&
                      a.$watchers[e].post &&
                      a.$watchers[e].post.call(a, a.props[e]));
                },
                a = this;
              for (var s in this.$p) r(s);
              this.propsDidUpdate(e);
            }
            function x() {
              var t = this,
                n = this,
                e = this.$root.getAttribute(
                  "data-" + this.$app.$datasets.props
                );
              if (e) {
                var r = {};
                return (
                  i.call(n, e).forEach(function(e) {
                    var a = p.call(n, e),
                      o = s.call(n, a[1]),
                      i = a[0],
                      c = t.$app.registeredComponents[o[0]],
                      u = o[1];
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
            function g() {
              var t = this,
                n = this;
              _.call(
                this,
                "[data-" +
                  this.$app.$datasets.ref +
                  "*='" +
                  this.$name +
                  this.$app.$syntax.FROM_COMPONENT +
                  "']"
              ).forEach(function(e) {
                t.$refs[
                  u.call(n, e.getAttribute("data-" + t.$app.$datasets.ref))[1]
                ] = e;
              });
            }
            function E() {
              var t = this,
                n = null,
                e = this;
              _.call(
                this,
                "[data-" +
                  this.$app.$datasets.ref_array +
                  "*='" +
                  this.$name +
                  this.$app.$syntax.FROM_COMPONENT +
                  "']"
              ).forEach(function(r) {
                var a = u.call(
                  e,
                  r.getAttribute("data-" + t.$app.$datasets.ref_array)
                )[1];
                !t.$refs[a] && (t.$refs[a] = []),
                  a === n || ((n = a), (t.$refs[a] = [])),
                  t.$refs[a].push(r);
              });
            }
            function _(t) {
              var n = this;
              return f([], this.$root.querySelectorAll(t), !0).filter(function(
                t
              ) {
                return (
                  t.closest(
                    "[data-" +
                      n.$app.$datasets.component +
                      '="' +
                      n.$root.getAttribute(
                        "data-" + n.$app.$datasets.component
                      ) +
                      '"]'
                  ) === n.$root
                );
              });
            }
            var b,
              C =
                ((b = function(t, n) {
                  return (
                    (b =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function(t, n) {
                          t.__proto__ = n;
                        }) ||
                      function(t, n) {
                        for (var e in n)
                          Object.prototype.hasOwnProperty.call(n, e) &&
                            (t[e] = n[e]);
                      }),
                    b(t, n)
                  );
                }),
                function(t, n) {
                  if ("function" != typeof n && null !== n)
                    throw new TypeError(
                      "Class extends value " +
                        String(n) +
                        " is not a constructor or null"
                    );
                  function e() {
                    this.constructor = t;
                  }
                  b(t, n),
                    (t.prototype =
                      null === n
                        ? Object.create(n)
                        : ((e.prototype = n.prototype), new e()));
                });
            const A = (function(t) {
              function n(n, e, r) {
                void 0 === r && (r = !1);
                var a = t.call(this, n, e) || this;
                return (
                  a.connecting(),
                  (a.props = {}),
                  (a.$d = new Set()),
                  (a.$refs = {}),
                  g.call(a),
                  E.call(a),
                  (a.$p = x.call(a)),
                  d.call(a),
                  (a.$watchers = a.watch ? a.watch() : {}),
                  !r && a.connected(),
                  a
                );
              }
              return (
                C(n, t),
                (n.prototype.connecting = function() {}),
                (n.prototype.connected = function() {}),
                (n.prototype.disconnecting = function() {}),
                (n.prototype.propsWillUpdate = function() {}),
                (n.prototype.propsDidUpdate = function() {}),
                n
              );
            })(function(t, n) {
              (this.$root = t),
                n &&
                  ((this.$app = n.app),
                  (this.$key = n.key),
                  (this.$name = t.getAttribute(
                    "data-" + this.$app.$datasets.component
                  )));
            });
            var O = (function() {
                var t = function(n, e) {
                  return (
                    (t =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function(t, n) {
                          t.__proto__ = n;
                        }) ||
                      function(t, n) {
                        for (var e in n)
                          Object.prototype.hasOwnProperty.call(n, e) &&
                            (t[e] = n[e]);
                      }),
                    t(n, e)
                  );
                };
                return function(n, e) {
                  if ("function" != typeof e && null !== e)
                    throw new TypeError(
                      "Class extends value " +
                        String(e) +
                        " is not a constructor or null"
                    );
                  function r() {
                    this.constructor = n;
                  }
                  t(n, e),
                    (n.prototype =
                      null === e
                        ? Object.create(e)
                        : ((r.prototype = e.prototype), new r()));
                };
              })(),
              w = (function(t) {
                function n(n, e) {
                  var r = t.call(this, n, e, !0) || this;
                  return $.call(r), (r.$s = h.call(r)), r.connected(), r;
                }
                return (
                  O(n, t),
                  (n.prototype.stateWillUpdate = function() {}),
                  (n.prototype.stateDidUpdate = function() {}),
                  (n.prototype.setState = function(t, n) {
                    void 0 === t && (t = this.state), this.stateWillUpdate();
                    var e,
                      r = [],
                      a = function(n) {
                        t[n] !== s.state[n] &&
                          (r.push(n),
                          s.$watchers[n] &&
                            s.$watchers[n].pre &&
                            s.$watchers[n].pre.call(s, t[n], s.state[n]),
                          (s.state[n] = t[n]),
                          s.$s &&
                            s.$s[n] &&
                            s.$s[n].forEach(function(e) {
                              o(e.el, t[n]);
                            }),
                          s.$watchers[n] &&
                            s.$watchers[n].post &&
                            s.$watchers[n].post.call(s, s.state[n]));
                      },
                      s = this;
                    for (var i in t) a(i);
                    this.$d.size > 0 && m.call(this, r),
                      (e = n) && e(),
                      this.stateDidUpdate();
                  }),
                  n
                );
              })(A);
            const S = {
              Init: function(t) {
                var n = this;
                return (
                  (this.components = t.components || {}),
                  (this.registeredComponents = {}),
                  (this.$datasets = (function() {
                    var n = e;
                    if (t.dataAttributes)
                      for (var r in t.dataAttributes)
                        n[r] = t.dataAttributes[r];
                    return n;
                  })()),
                  (this.$syntax = (function() {
                    var n = r;
                    if (t.customSyntax)
                      for (var e in t.customSyntax) n[e] = t.customSyntax[e];
                    return n;
                  })()),
                  (this._cc = function(e, r) {
                    var a =
                      e.getAttribute("data-" + n.$datasets.key) ||
                      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                        /[xy]/g,
                        function(t) {
                          var n = (16 * Math.random()) | 0;
                          return ("x" == t ? n : (3 & n) | 8).toString(16);
                        }
                      );
                    (n.registeredComponents[a] = new t.components[
                      e.getAttribute("data-" + n.$datasets.component)
                    ](e, { key: a, app: n })),
                      r && r();
                  }),
                  (this._dc = function(t, e) {
                    n.registeredComponents[t].disconnecting(),
                      y.call(n.registeredComponents[t]),
                      delete n.registeredComponents[t],
                      e && e();
                  }),
                  (this._rc = function(t, e, r) {
                    (n.components[t] = e), r && r();
                  }),
                  (this._urc = function(t, e) {
                    delete n.component[t], e && e();
                  }),
                  (function(t, n, e) {
                    if (e || 2 === arguments.length)
                      for (var r, a = 0, o = n.length; a < o; a++)
                        (!r && a in n) ||
                          (r || (r = Array.prototype.slice.call(n, 0, a)),
                          (r[a] = n[a]));
                    return t.concat(r || Array.prototype.slice.call(n));
                  })(
                    [],
                    t.selector.querySelectorAll(
                      "[data-" + this.$datasets.component + "]"
                    ),
                    !0
                  ).forEach(function(t) {
                    n._cc(t);
                  }, this),
                  t.appCreated && t.appCreated(),
                  {
                    createComponent: function(t, e) {
                      return n._cc(t, e);
                    },
                    deleteComponent: function(t, e) {
                      return n._dc(t, e);
                    },
                    register: function(t, e, r) {
                      return n._rc(t, e, r);
                    },
                    unregister: function(t, e) {
                      return n._urc(t, e);
                    },
                    createdComponents: this.registeredComponents,
                    components: this.components
                  }
                );
              },
              Component: w,
              Exponent: A
            };
            return n;
          })()),
          console.log(Domponent);
      }
    },
    n = {};
  !(function e(r) {
    var a = n[r];
    if (void 0 !== a) return a.exports;
    var o = (n[r] = { exports: {} });
    return t[r](o, o.exports, e), o.exports;
  })(138);
})();
