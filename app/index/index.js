"bundle";
System.registerDynamic("app/index/index", ["lib/mithril/mithril.min", "app/images/images", "app/vertical/vertical", "app/controls/controls", "app/group/group", "app/pages/pages", "app/app/github", "app/index/index.css!lib/system-css/css"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  var _appImagesImages = require("app/images/images");
  var _appImagesImages2 = _interopRequireDefault(_appImagesImages);
  var _appVerticalVertical = require("app/vertical/vertical");
  var _appVerticalVertical2 = _interopRequireDefault(_appVerticalVertical);
  var _appControlsControls = require("app/controls/controls");
  var _appControlsControls2 = _interopRequireDefault(_appControlsControls);
  var _appGroupGroup = require("app/group/group");
  var _appGroupGroup2 = _interopRequireDefault(_appGroupGroup);
  var _appPagesPages = require("app/pages/pages");
  var _appPagesPages2 = _interopRequireDefault(_appPagesPages);
  var _appAppGithub = require("app/app/github");
  var _appAppGithub2 = _interopRequireDefault(_appAppGithub);
  require("app/index/index.css!lib/system-css/css");
  var menuData = [{
    href: "/images",
    title: "Simple image swipe",
    subtitle: "Swiping a series of images, lazily loaded."
  }, {
    href: "/vertical",
    title: "Vertical image swipe",
    subtitle: "Swiping a vertical series of images, lazily loaded."
  }, {
    href: "/controls",
    title: "Slider controls",
    subtitle: "Using controls to manage sliding and get feedback, lazily loaded."
  }, {
    href: "/group",
    title: "Dynamic groups",
    subtitle: "Creating dynamically sized pages, lazily loaded."
  }, {
    href: "/pages",
    title: "Page content",
    subtitle: "More diverse content, lazily loaded."
  }];
  var menu = (0, _mithril2["default"])("ul.menu", [(0, _mithril2["default"])("li.header", "Examples"), menuData.map(function(menuItem) {
    return (0, _mithril2["default"])("li", (0, _mithril2["default"])("a", {
      href: menuItem.href,
      config: _mithril2["default"].route
    }, [(0, _mithril2["default"])("span.title", menuItem.title), (0, _mithril2["default"])("span.subtitle", menuItem.subtitle)]));
  })]);
  var app = {};
  app.view = function() {
    return (0, _mithril2["default"])("div", [(0, _mithril2["default"])("h1", "Content Slider for Mithril"), menu, (0, _appAppGithub2["default"])({home: true})]);
  };
  _mithril2["default"].route.mode = "hash";
  _mithril2["default"].route(document.body, "/", {
    "/": app,
    "/images": _appImagesImages2["default"],
    "/vertical": _appVerticalVertical2["default"],
    "/controls": _appControlsControls2["default"],
    "/group": _appGroupGroup2["default"],
    "/pages": _appPagesPages2["default"]
  });
  global.define = __define;
  return module.exports;
});

(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
var m = function a(b, c) {
  function d(a) {
    D = a.document, E = a.location, G = a.cancelAnimationFrame || a.clearTimeout, F = a.requestAnimationFrame || a.setTimeout;
  }
  function e() {
    var a,
        b = [].slice.call(arguments),
        c = !(null == b[1] || L.call(b[1]) !== H || "tag" in b[1] || "view" in b[1] || "subtree" in b[1]),
        d = c ? b[1] : {},
        e = "class" in d ? "class" : "className",
        f = {
          tag: "div",
          attrs: {}
        },
        g = [];
    if (L.call(b[0]) != J)
      throw new Error("selector in m(selector, attrs, children) should be a string");
    for (; a = M.exec(b[0]); )
      if ("" === a[1] && a[2])
        f.tag = a[2];
      else if ("#" === a[1])
        f.attrs.id = a[2];
      else if ("." === a[1])
        g.push(a[2]);
      else if ("[" === a[3][0]) {
        var h = N.exec(a[3]);
        f.attrs[h[1]] = h[3] || (h[2] ? "" : !0);
      }
    var i = b.slice(c ? 2 : 1);
    f.children = 1 === i.length && L.call(i[0]) === I ? i[0] : i;
    for (var j in d)
      d.hasOwnProperty(j) && (j === e && null != d[j] && "" !== d[j] ? (g.push(d[j]), f.attrs[j] = "") : f.attrs[j] = d[j]);
    return g.length > 0 && (f.attrs[e] = g.join(" ")), f;
  }
  function f(a, b, d, j, l, m, n, o, p, q, r) {
    try {
      (null == l || null == l.toString()) && (l = "");
    } catch (s) {
      l = "";
    }
    if ("retain" === l.subtree)
      return m;
    var t = L.call(m),
        u = L.call(l);
    if (null == m || t !== u) {
      if (null != m)
        if (d && d.nodes) {
          var v = o - j,
              w = v + (u === I ? l : m.nodes).length;
          i(d.nodes.slice(v, w), d.slice(v, w));
        } else
          m.nodes && i(m.nodes, m);
      m = new l.constructor, m.tag && (m = {}), m.nodes = [];
    }
    if (u === I) {
      for (var x = 0,
          y = l.length; y > x; x++)
        L.call(l[x]) === I && (l = l.concat.apply([], l), x--, y = l.length);
      for (var z = [],
          A = m.length === l.length,
          B = 0,
          C = 1,
          E = 2,
          F = 3,
          G = {},
          M = !1,
          x = 0; x < m.length; x++)
        m[x] && m[x].attrs && null != m[x].attrs.key && (M = !0, G[m[x].attrs.key] = {
          action: C,
          index: x
        });
      for (var N = 0,
          x = 0,
          y = l.length; y > x; x++)
        if (l[x] && l[x].attrs && null != l[x].attrs.key) {
          for (var Q = 0,
              y = l.length; y > Q; Q++)
            l[Q] && l[Q].attrs && null == l[Q].attrs.key && (l[Q].attrs.key = "__mithril__" + N++);
          break;
        }
      if (M) {
        var R = !1;
        if (l.length != m.length)
          R = !0;
        else
          for (var S,
              T,
              x = 0; S = m[x], T = l[x]; x++)
            if (S.attrs && T.attrs && S.attrs.key != T.attrs.key) {
              R = !0;
              break;
            }
        if (R) {
          for (var x = 0,
              y = l.length; y > x; x++)
            if (l[x] && l[x].attrs && null != l[x].attrs.key) {
              var U = l[x].attrs.key;
              G[U] = G[U] ? {
                action: F,
                index: x,
                from: G[U].index,
                element: m.nodes[G[U].index] || D.createElement("div")
              } : {
                action: E,
                index: x
              };
            }
          var V = [];
          for (var W in G)
            V.push(G[W]);
          var X = V.sort(g),
              Y = new Array(m.length);
          Y.nodes = m.nodes.slice();
          for (var Z,
              x = 0; Z = X[x]; x++) {
            if (Z.action === C && (i(m[Z.index].nodes, m[Z.index]), Y.splice(Z.index, 1)), Z.action === E) {
              var $ = D.createElement("div");
              $.key = l[Z.index].attrs.key, a.insertBefore($, a.childNodes[Z.index] || null), Y.splice(Z.index, 0, {
                attrs: {key: l[Z.index].attrs.key},
                nodes: [$]
              }), Y.nodes[Z.index] = $;
            }
            Z.action === F && (a.childNodes[Z.index] !== Z.element && null !== Z.element && a.insertBefore(Z.element, a.childNodes[Z.index] || null), Y[Z.index] = m[Z.from], Y.nodes[Z.index] = Z.element);
          }
          m = Y;
        }
      }
      for (var x = 0,
          _ = 0,
          y = l.length; y > x; x++) {
        var bb = f(a, b, m, o, l[x], m[_], n, o + B || B, p, q, r);
        bb !== c && (bb.nodes.intact || (A = !1), B += bb.$trusted ? (bb.match(/<[^\/]|\>\s*[^<]/g) || [0]).length : L.call(bb) === I ? bb.length : 1, m[_++] = bb);
      }
      if (!A) {
        for (var x = 0,
            y = l.length; y > x; x++)
          null != m[x] && z.push.apply(z, m[x].nodes);
        for (var cb,
            x = 0; cb = m.nodes[x]; x++)
          null != cb.parentNode && z.indexOf(cb) < 0 && i([cb], [m[x]]);
        l.length < m.length && (m.length = l.length), m.nodes = z;
      }
    } else if (null != l && u === H) {
      for (var eb = [],
          fb = []; l.view; ) {
        var gb = l.view.$original || l.view,
            hb = "diff" == e.redraw.strategy() && m.views ? m.views.indexOf(gb) : -1,
            ib = hb > -1 ? m.controllers[hb] : new (l.controller || P),
            U = l && l.attrs && l.attrs.key;
        if (l = 0 == db || m && m.controllers && m.controllers.indexOf(ib) > -1 ? l.view(ib) : {tag: "placeholder"}, "retain" === l.subtree)
          return m;
        U && (l.attrs || (l.attrs = {}), l.attrs.key = U), ib.onunload && ab.push({
          controller: ib,
          handler: ib.onunload
        }), eb.push(gb), fb.push(ib);
      }
      if (!l.tag && fb.length)
        throw new Error("Component template must return a virtual element, not an array, string, etc.");
      l.attrs || (l.attrs = {}), m.attrs || (m.attrs = {});
      var jb = Object.keys(l.attrs),
          kb = jb.length > ("key" in l.attrs ? 1 : 0);
      if ((l.tag != m.tag || jb.sort().join() != Object.keys(m.attrs).sort().join() || l.attrs.id != m.attrs.id || l.attrs.key != m.attrs.key || "all" == e.redraw.strategy() && (!m.configContext || m.configContext.retain !== !0) || "diff" == e.redraw.strategy() && m.configContext && m.configContext.retain === !1) && (m.nodes.length && i(m.nodes), m.configContext && typeof m.configContext.onunload === K && m.configContext.onunload(), m.controllers))
        for (var ib,
            x = 0; ib = m.controllers[x]; x++)
          typeof ib.onunload === K && ib.onunload({preventDefault: P});
      if (L.call(l.tag) != J)
        return;
      var cb,
          lb = 0 === m.nodes.length;
      if (l.attrs.xmlns ? q = l.attrs.xmlns : "svg" === l.tag ? q = "http://www.w3.org/2000/svg" : "math" === l.tag && (q = "http://www.w3.org/1998/Math/MathML"), lb) {
        if (cb = l.attrs.is ? q === c ? D.createElement(l.tag, l.attrs.is) : D.createElementNS(q, l.tag, l.attrs.is) : q === c ? D.createElement(l.tag) : D.createElementNS(q, l.tag), m = {
          tag: l.tag,
          attrs: kb ? h(cb, l.tag, l.attrs, {}, q) : l.attrs,
          children: null != l.children && l.children.length > 0 ? f(cb, l.tag, c, c, l.children, m.children, !0, 0, l.attrs.contenteditable ? cb : p, q, r) : l.children,
          nodes: [cb]
        }, fb.length) {
          m.views = eb, m.controllers = fb;
          for (var ib,
              x = 0; ib = fb[x]; x++)
            if (ib.onunload && ib.onunload.$old && (ib.onunload = ib.onunload.$old), db && ib.onunload) {
              var mb = ib.onunload;
              ib.onunload = P, ib.onunload.$old = mb;
            }
        }
        m.children && !m.children.nodes && (m.children.nodes = []), "select" === l.tag && "value" in l.attrs && h(cb, l.tag, {value: l.attrs.value}, {}, q), a.insertBefore(cb, a.childNodes[o] || null);
      } else
        cb = m.nodes[0], kb && h(cb, l.tag, l.attrs, m.attrs, q), m.children = f(cb, l.tag, c, c, l.children, m.children, !1, 0, l.attrs.contenteditable ? cb : p, q, r), m.nodes.intact = !0, fb.length && (m.views = eb, m.controllers = fb), n === !0 && null != cb && a.insertBefore(cb, a.childNodes[o] || null);
      if (typeof l.attrs.config === K) {
        var nb = m.configContext = m.configContext || {},
            ob = function(a, b) {
              return function() {
                return a.attrs.config.apply(a, b);
              };
            };
        r.push(ob(l, [cb, !lb, nb, m]));
      }
    } else if (typeof l != K) {
      var z;
      0 === m.nodes.length ? (l.$trusted ? z = k(a, o, l) : (z = [D.createTextNode(l)], a.nodeName.match(O) || a.insertBefore(z[0], a.childNodes[o] || null)), m = "string number boolean".indexOf(typeof l) > -1 ? new l.constructor(l) : l, m.nodes = z) : m.valueOf() !== l.valueOf() || n === !0 ? (z = m.nodes, p && p === D.activeElement || (l.$trusted ? (i(z, m), z = k(a, o, l)) : "textarea" === b ? a.value = l : p ? p.innerHTML = l : ((1 === z[0].nodeType || z.length > 1) && (i(m.nodes, m), z = [D.createTextNode(l)]), a.insertBefore(z[0], a.childNodes[o] || null), z[0].nodeValue = l)), m = new l.constructor(l), m.nodes = z) : m.nodes.intact = !0;
    }
    return m;
  }
  function g(a, b) {
    return a.action - b.action || a.index - b.index;
  }
  function h(a, b, c, d, e) {
    for (var f in c) {
      var g = c[f],
          h = d[f];
      if (f in d && h === g)
        "value" === f && "input" === b && a.value != g && (a.value = g);
      else {
        d[f] = g;
        try {
          if ("config" === f || "key" == f)
            continue;
          if (typeof g === K && 0 === f.indexOf("on"))
            a[f] = l(g, a);
          else if ("style" === f && null != g && L.call(g) === H) {
            for (var i in g)
              (null == h || h[i] !== g[i]) && (a.style[i] = g[i]);
            for (var i in h)
              i in g || (a.style[i] = "");
          } else
            null != e ? "href" === f ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", g) : "className" === f ? a.setAttribute("class", g) : a.setAttribute(f, g) : f in a && "list" !== f && "style" !== f && "form" !== f && "type" !== f && "width" !== f && "height" !== f ? ("input" !== b || a[f] !== g) && (a[f] = g) : a.setAttribute(f, g);
        } catch (j) {
          if (j.message.indexOf("Invalid argument") < 0)
            throw j;
        }
      }
    }
    return d;
  }
  function i(a, b) {
    for (var c = a.length - 1; c > -1; c--)
      if (a[c] && a[c].parentNode) {
        try {
          a[c].parentNode.removeChild(a[c]);
        } catch (d) {}
        b = [].concat(b), b[c] && j(b[c]);
      }
    0 != a.length && (a.length = 0);
  }
  function j(a) {
    if (a.configContext && typeof a.configContext.onunload === K && (a.configContext.onunload(), a.configContext.onunload = null), a.controllers)
      for (var b,
          c = 0; b = a.controllers[c]; c++)
        typeof b.onunload === K && b.onunload({preventDefault: P});
    if (a.children)
      if (L.call(a.children) === I)
        for (var d,
            c = 0; d = a.children[c]; c++)
          j(d);
      else
        a.children.tag && j(a.children);
  }
  function k(a, b, c) {
    var d = a.childNodes[b];
    if (d) {
      var e = 1 != d.nodeType,
          f = D.createElement("span");
      e ? (a.insertBefore(f, d || null), f.insertAdjacentHTML("beforebegin", c), a.removeChild(f)) : d.insertAdjacentHTML("beforebegin", c);
    } else
      a.insertAdjacentHTML("beforeend", c);
    for (var g = []; a.childNodes[b] !== d; )
      g.push(a.childNodes[b]), b++;
    return g;
  }
  function l(a, b) {
    return function(c) {
      c = c || event, e.redraw.strategy("diff"), e.startComputation();
      try {
        return a.call(b, c);
      } finally {
        eb();
      }
    };
  }
  function m(a) {
    var b = S.indexOf(a);
    return 0 > b ? S.push(a) - 1 : b;
  }
  function n(a) {
    var b = function() {
      return arguments.length && (a = arguments[0]), a;
    };
    return b.toJSON = function() {
      return a;
    }, b;
  }
  function o(a, b) {
    var c = function() {
      return (a.controller || P).apply(this, b) || this;
    },
        d = function(c) {
          return arguments.length > 1 && (b = b.concat([].slice.call(arguments, 1))), a.view.apply(a, b ? [c].concat(b) : [c]);
        };
    d.$original = a.view;
    var e = {
      controller: c,
      view: d
    };
    return b[0] && null != b[0].key && (e.attrs = {key: b[0].key}), e;
  }
  function p() {
    $ && ($(), $ = null);
    for (var a,
        b = 0; a = V[b]; b++)
      if (X[b]) {
        var c = W[b].controller && W[b].controller.$$args ? [X[b]].concat(W[b].controller.$$args) : [X[b]];
        e.render(a, W[b].view ? W[b].view(X[b], c) : "");
      }
    _ && (_(), _ = null), Y = null, Z = new Date, e.redraw.strategy("diff");
  }
  function q(a) {
    return a.slice(hb[e.route.mode].length);
  }
  function r(a, b, c) {
    fb = {};
    var d = c.indexOf("?");
    -1 !== d && (fb = v(c.substr(d + 1, c.length)), c = c.substr(0, d));
    var f = Object.keys(b),
        g = f.indexOf(c);
    if (-1 !== g)
      return e.mount(a, b[f[g]]), !0;
    for (var h in b) {
      if (h === c)
        return e.mount(a, b[h]), !0;
      var i = new RegExp("^" + h.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "/?$");
      if (i.test(c))
        return c.replace(i, function() {
          for (var c = h.match(/:[^\/]+/g) || [],
              d = [].slice.call(arguments, 1, -2),
              f = 0,
              g = c.length; g > f; f++)
            fb[c[f].replace(/:|\./g, "")] = decodeURIComponent(d[f]);
          e.mount(a, b[h]);
        }), !0;
    }
  }
  function s(a) {
    if (a = a || event, !a.ctrlKey && !a.metaKey && 2 !== a.which) {
      a.preventDefault ? a.preventDefault() : a.returnValue = !1;
      for (var b = a.currentTarget || a.srcElement,
          c = "pathname" === e.route.mode && b.search ? v(b.search.slice(1)) : {}; b && "A" != b.nodeName.toUpperCase(); )
        b = b.parentNode;
      e.route(b[e.route.mode].slice(hb[e.route.mode].length), c);
    }
  }
  function t() {
    "hash" != e.route.mode && E.hash ? E.hash = E.hash : b.scrollTo(0, 0);
  }
  function u(a, b) {
    var d = {},
        e = [];
    for (var f in a) {
      var g = b ? b + "[" + f + "]" : f,
          h = a[f],
          i = L.call(h),
          j = null === h ? encodeURIComponent(g) : i === H ? u(h, g) : i === I ? h.reduce(function(a, b) {
            return d[g] || (d[g] = {}), d[g][b] ? a : (d[g][b] = !0, a.concat(encodeURIComponent(g) + "=" + encodeURIComponent(b)));
          }, []).join("&") : encodeURIComponent(g) + "=" + encodeURIComponent(h);
      h !== c && e.push(j);
    }
    return e.join("&");
  }
  function v(a) {
    "?" === a.charAt(0) && (a = a.substring(1));
    for (var b = a.split("&"),
        c = {},
        d = 0,
        e = b.length; e > d; d++) {
      var f = b[d].split("="),
          g = decodeURIComponent(f[0]),
          h = 2 == f.length ? decodeURIComponent(f[1]) : null;
      null != c[g] ? (L.call(c[g]) !== I && (c[g] = [c[g]]), c[g].push(h)) : c[g] = h;
    }
    return c;
  }
  function w(a) {
    var b = m(a);
    i(a.childNodes, T[b]), T[b] = c;
  }
  function x(a, b) {
    var c = e.prop(b);
    return a.then(c), c.then = function(c, d) {
      return x(a.then(c, d), b);
    }, c;
  }
  function y(a, b) {
    function c(a) {
      l = a || j, n.map(function(a) {
        l === i && a.resolve(m) || a.reject(m);
      });
    }
    function d(a, b, c, d) {
      if ((null != m && L.call(m) === H || typeof m === K) && typeof a === K)
        try {
          var f = 0;
          a.call(m, function(a) {
            f++ || (m = a, b());
          }, function(a) {
            f++ || (m = a, c());
          });
        } catch (g) {
          e.deferred.onerror(g), m = g, c();
        }
      else
        d();
    }
    function f() {
      var j;
      try {
        j = m && m.then;
      } catch (n) {
        return e.deferred.onerror(n), m = n, l = h, f();
      }
      d(j, function() {
        l = g, f();
      }, function() {
        l = h, f();
      }, function() {
        try {
          l === g && typeof a === K ? m = a(m) : l === h && "function" == typeof b && (m = b(m), l = g);
        } catch (f) {
          return e.deferred.onerror(f), m = f, c();
        }
        m === k ? (m = TypeError(), c()) : d(j, function() {
          c(i);
        }, c, function() {
          c(l === g && i);
        });
      });
    }
    var g = 1,
        h = 2,
        i = 3,
        j = 4,
        k = this,
        l = 0,
        m = 0,
        n = [];
    k.promise = {}, k.resolve = function(a) {
      return l || (m = a, l = g, f()), this;
    }, k.reject = function(a) {
      return l || (m = a, l = h, f()), this;
    }, k.promise.then = function(a, b) {
      var c = new y(a, b);
      return l === i ? c.resolve(m) : l === j ? c.reject(m) : n.push(c), c.promise;
    };
  }
  function z(a) {
    return a;
  }
  function A(a) {
    if (!a.dataType || "jsonp" !== a.dataType.toLowerCase()) {
      var d = new b.XMLHttpRequest;
      if (d.open(a.method, a.url, !0, a.user, a.password), d.onreadystatechange = function() {
        4 === d.readyState && (d.status >= 200 && d.status < 300 ? a.onload({
          type: "load",
          target: d
        }) : a.onerror({
          type: "error",
          target: d
        }));
      }, a.serialize === JSON.stringify && a.data && "GET" !== a.method && d.setRequestHeader("Content-Type", "application/json; charset=utf-8"), a.deserialize === JSON.parse && d.setRequestHeader("Accept", "application/json, text/*"), typeof a.config === K) {
        var e = a.config(d, a);
        null != e && (d = e);
      }
      var f = "GET" !== a.method && a.data ? a.data : "";
      if (f && L.call(f) != J && f.constructor != b.FormData)
        throw "Request data should be either be a string or FormData. Check the `serialize` option in `m.request`";
      return d.send(f), d;
    }
    var g = "mithril_callback_" + (new Date).getTime() + "_" + Math.round(1e16 * Math.random()).toString(36),
        h = D.createElement("script");
    b[g] = function(d) {
      h.parentNode.removeChild(h), a.onload({
        type: "load",
        target: {responseText: d}
      }), b[g] = c;
    }, h.onerror = function() {
      return h.parentNode.removeChild(h), a.onerror({
        type: "error",
        target: {
          status: 500,
          responseText: JSON.stringify({error: "Error making jsonp request"})
        }
      }), b[g] = c, !1;
    }, h.onload = function() {
      return !1;
    }, h.src = a.url + (a.url.indexOf("?") > 0 ? "&" : "?") + (a.callbackKey ? a.callbackKey : "callback") + "=" + g + "&" + u(a.data || {}), D.body.appendChild(h);
  }
  function B(a, b, c) {
    if ("GET" === a.method && "jsonp" != a.dataType) {
      var d = a.url.indexOf("?") < 0 ? "?" : "&",
          e = u(b);
      a.url = a.url + (e ? d + e : "");
    } else
      a.data = c(b);
    return a;
  }
  function C(a, b) {
    var c = a.match(/:[a-z]\w+/gi);
    if (c && b)
      for (var d = 0; d < c.length; d++) {
        var e = c[d].slice(1);
        a = a.replace(c[d], b[e]), delete b[e];
      }
    return a;
  }
  var D,
      E,
      F,
      G,
      H = "[object Object]",
      I = "[object Array]",
      J = "[object String]",
      K = "function",
      L = {}.toString,
      M = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g,
      N = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/,
      O = /^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/,
      P = function() {};
  d(b);
  var Q,
      R = {
        appendChild: function(a) {
          Q === c && (Q = D.createElement("html")), D.documentElement && D.documentElement !== a ? D.replaceChild(a, D.documentElement) : D.appendChild(a), this.childNodes = D.childNodes;
        },
        insertBefore: function(a) {
          this.appendChild(a);
        },
        childNodes: []
      },
      S = [],
      T = {};
  e.render = function(a, b, d) {
    var e = [];
    if (!a)
      throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
    var g = m(a),
        h = a === D,
        j = h || a === D.documentElement ? R : a;
    h && "html" != b.tag && (b = {
      tag: "html",
      attrs: {},
      children: b
    }), T[g] === c && i(j.childNodes), d === !0 && w(a), T[g] = f(j, null, c, c, b, T[g], !1, 0, null, c, e);
    for (var k = 0,
        l = e.length; l > k; k++)
      e[k]();
  }, e.trust = function(a) {
    return a = new String(a), a.$trusted = !0, a;
  }, e.prop = function(a) {
    return (null != a && L.call(a) === H || typeof a === K) && typeof a.then === K ? x(a) : n(a);
  };
  var U,
      V = [],
      W = [],
      X = [],
      Y = null,
      Z = 0,
      $ = null,
      _ = null,
      ab = [],
      bb = 16;
  e.component = function(a) {
    return o(a, [].slice.call(arguments, 1));
  }, e.mount = e.module = function(a, b) {
    if (!a)
      throw new Error("Please ensure the DOM element exists before rendering a template into it.");
    var c = V.indexOf(a);
    0 > c && (c = V.length);
    for (var d,
        f = !1,
        g = {preventDefault: function() {
            f = !0, $ = _ = null;
          }},
        h = 0; d = ab[h]; h++)
      d.handler.call(d.controller, g), d.controller.onunload = null;
    if (f)
      for (var d,
          h = 0; d = ab[h]; h++)
        d.controller.onunload = d.handler;
    else
      ab = [];
    if (X[c] && typeof X[c].onunload === K && X[c].onunload(g), !f) {
      e.redraw.strategy("all"), e.startComputation(), V[c] = a, arguments.length > 2 && (b = subcomponent(b, [].slice.call(arguments, 2)));
      var i = U = b = b || {controller: function() {}},
          j = b.controller || P,
          k = new j;
      return i === U && (X[c] = k, W[c] = b), eb(), X[c];
    }
  };
  var cb = !1;
  e.redraw = function(a) {
    cb || (cb = !0, Y && a !== !0 ? (F === b.requestAnimationFrame || new Date - Z > bb) && (Y > 0 && G(Y), Y = F(p, bb)) : (p(), Y = F(function() {
      Y = null;
    }, bb)), cb = !1);
  }, e.redraw.strategy = e.prop();
  var db = 0;
  e.startComputation = function() {
    db++;
  }, e.endComputation = function() {
    db = Math.max(db - 1, 0), 0 === db && e.redraw();
  };
  var eb = function() {
    "none" == e.redraw.strategy() ? (db--, e.redraw.strategy("diff")) : e.endComputation();
  };
  e.withAttr = function(a, b) {
    return function(c) {
      c = c || event;
      var d = c.currentTarget || this;
      b(a in d ? d[a] : d.getAttribute(a));
    };
  };
  var fb,
      gb,
      hb = {
        pathname: "",
        hash: "#",
        search: "?"
      },
      ib = P,
      jb = !1;
  return e.route = function() {
    if (0 === arguments.length)
      return gb;
    if (3 === arguments.length && L.call(arguments[1]) === J) {
      var a = arguments[0],
          c = arguments[1],
          d = arguments[2];
      ib = function(b) {
        var f = gb = q(b);
        if (!r(a, d, f)) {
          if (jb)
            throw new Error("Ensure the default route matches one of the routes defined in m.route");
          jb = !0, e.route(c, !0), jb = !1;
        }
      };
      var f = "hash" === e.route.mode ? "onhashchange" : "onpopstate";
      b[f] = function() {
        var a = E[e.route.mode];
        "pathname" === e.route.mode && (a += E.search), gb != q(a) && ib(a);
      }, $ = t, b[f]();
    } else if (arguments[0].addEventListener || arguments[0].attachEvent) {
      var g = arguments[0],
          h = (arguments[1], arguments[2], arguments[3]);
      g.href = ("pathname" !== e.route.mode ? E.pathname : "") + hb[e.route.mode] + h.attrs.href, g.addEventListener ? (g.removeEventListener("click", s), g.addEventListener("click", s)) : (g.detachEvent("onclick", s), g.attachEvent("onclick", s));
    } else if (L.call(arguments[0]) === J) {
      var i = gb;
      gb = arguments[0];
      var j = arguments[1] || {},
          k = gb.indexOf("?"),
          l = k > -1 ? v(gb.slice(k + 1)) : {};
      for (var m in j)
        l[m] = j[m];
      var n = u(l),
          o = k > -1 ? gb.slice(0, k) : gb;
      n && (gb = o + (-1 === o.indexOf("?") ? "?" : "&") + n);
      var p = (3 === arguments.length ? arguments[2] : arguments[1]) === !0 || i === arguments[0];
      b.history.pushState ? ($ = t, _ = function() {
        b.history[p ? "replaceState" : "pushState"](null, D.title, hb[e.route.mode] + gb);
      }, ib(hb[e.route.mode] + gb)) : (E[e.route.mode] = gb, ib(hb[e.route.mode] + gb));
    }
  }, e.route.param = function(a) {
    if (!fb)
      throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()");
    return fb[a];
  }, e.route.mode = "search", e.route.buildQueryString = u, e.route.parseQueryString = v, e.deferred = function() {
    var a = new y;
    return a.promise = x(a.promise), a;
  }, e.deferred.onerror = function(a) {
    if ("[object Error]" === L.call(a) && !a.constructor.toString().match(/ Error/))
      throw a;
  }, e.sync = function(a) {
    function b(a, b) {
      return function(e) {
        return g[a] = e, b || (c = "reject"), 0 === --f && (d.promise(g), d[c](g)), e;
      };
    }
    var c = "resolve",
        d = e.deferred(),
        f = a.length,
        g = new Array(f);
    if (a.length > 0)
      for (var h = 0; h < a.length; h++)
        a[h].then(b(h, !0), b(h, !1));
    else
      d.resolve([]);
    return d.promise;
  }, e.request = function(a) {
    a.background !== !0 && e.startComputation();
    var b = new y,
        c = a.dataType && "jsonp" === a.dataType.toLowerCase(),
        d = a.serialize = c ? z : a.serialize || JSON.stringify,
        f = a.deserialize = c ? z : a.deserialize || JSON.parse,
        g = c ? function(a) {
          return a.responseText;
        } : a.extract || function(a) {
          return 0 === a.responseText.length && f === JSON.parse ? null : a.responseText;
        };
    return a.method = (a.method || "GET").toUpperCase(), a.url = C(a.url, a.data), a = B(a, a.data, d), a.onload = a.onerror = function(c) {
      try {
        c = c || event;
        var d = ("load" === c.type ? a.unwrapSuccess : a.unwrapError) || z,
            h = d(f(g(c.target, a)), c.target);
        if ("load" === c.type)
          if (L.call(h) === I && a.type)
            for (var i = 0; i < h.length; i++)
              h[i] = new a.type(h[i]);
          else
            a.type && (h = new a.type(h));
        b["load" === c.type ? "resolve" : "reject"](h);
      } catch (c) {
        e.deferred.onerror(c), b.reject(c);
      }
      a.background !== !0 && e.endComputation();
    }, A(a), b.promise = x(b.promise, a.initialValue), b.promise;
  }, e.deps = function(a) {
    return d(b = a || b), b;
  }, e.deps.factory = a, e;
}("undefined" != typeof window ? window : {});
"undefined" != typeof module && null !== module && module.exports ? module.exports = m : "function" == typeof define && define.amd && define("lib/mithril/mithril.min", [], function() {
  return m;
});

_removeDefine();
})();
System.registerDynamic("app/images/images", ["lib/mithril/mithril.min", "lib/mithril-slider/mithril-slider", "app/app/common", "app/preloader/preloader", "app/app/github", "app/app/common.css!lib/system-css/css"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  var _mithrilSlider = require("lib/mithril-slider/mithril-slider");
  var _mithrilSlider2 = _interopRequireDefault(_mithrilSlider);
  var _appAppCommon = require("app/app/common");
  var _appAppCommon2 = _interopRequireDefault(_appAppCommon);
  var _appPreloaderPreloader = require("app/preloader/preloader");
  var _appPreloaderPreloader2 = _interopRequireDefault(_appPreloaderPreloader);
  var _appAppGithub = require("app/app/github");
  var _appAppGithub2 = _interopRequireDefault(_appAppGithub);
  require("app/app/common.css!lib/system-css/css");
  var createPage = function createPage(opts) {
    var currentIndex = opts.currentIndex;
    var listIndex = opts.listIndex;
    var data = opts.data;
    var inRange = Math.abs(currentIndex - listIndex) < 2;
    var content = inRange ? (0, _mithril2["default"])(".image-container", [(0, _mithril2["default"])(".image", {config: function config(el, inited) {
        if (inited) {
          return;
        }
        _appAppCommon2["default"].fadeInImage(el, data);
      }}), _appPreloaderPreloader2["default"]]) : null;
    return (0, _mithril2["default"])(".page", content);
  };
  var example = {};
  example.view = function() {
    return [_mithril2["default"].component(_mithrilSlider2["default"], {
      pageData: _appAppCommon2["default"].getPageData,
      page: createPage,
      "class": "example images"
    }), (0, _appAppGithub2["default"])()];
  };
  exports["default"] = example;
  module.exports = exports["default"];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("app/vertical/vertical", ["lib/mithril/mithril.min", "lib/mithril-slider/mithril-slider", "app/app/common", "app/preloader/preloader", "app/app/github", "app/app/common.css!lib/system-css/css", "app/vertical/vertical.css!lib/system-css/css"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  var _mithrilSlider = require("lib/mithril-slider/mithril-slider");
  var _mithrilSlider2 = _interopRequireDefault(_mithrilSlider);
  var _appAppCommon = require("app/app/common");
  var _appAppCommon2 = _interopRequireDefault(_appAppCommon);
  var _appPreloaderPreloader = require("app/preloader/preloader");
  var _appPreloaderPreloader2 = _interopRequireDefault(_appPreloaderPreloader);
  var _appAppGithub = require("app/app/github");
  var _appAppGithub2 = _interopRequireDefault(_appAppGithub);
  require("app/app/common.css!lib/system-css/css");
  require("app/vertical/vertical.css!lib/system-css/css");
  var createPage = function createPage(opts) {
    var currentIndex = opts.currentIndex;
    var listIndex = opts.listIndex;
    var data = opts.data;
    var inRange = Math.abs(currentIndex - listIndex) < 2;
    var content = inRange ? (0, _mithril2["default"])(".image-container", [(0, _mithril2["default"])(".image", {config: function config(el, inited) {
        if (inited) {
          return;
        }
        _appAppCommon2["default"].fadeInImage(el, data);
      }}), _appPreloaderPreloader2["default"]]) : null;
    return (0, _mithril2["default"])(".page", content);
  };
  var example = {};
  example.view = function() {
    return [_mithril2["default"].component(_mithrilSlider2["default"], {
      pageData: _appAppCommon2["default"].getPageData,
      page: createPage,
      "class": "example vertical",
      orientation: "vertical"
    }), (0, _appAppGithub2["default"])()];
  };
  exports["default"] = example;
  module.exports = exports["default"];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("app/controls/controls", ["lib/mithril/mithril.min", "lib/mithril-slider/mithril-slider", "app/app/common", "app/preloader/preloader", "app/app/github", "app/app/common.css!lib/system-css/css", "app/controls/controls.css!lib/system-css/css"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  var _mithrilSlider = require("lib/mithril-slider/mithril-slider");
  var _mithrilSlider2 = _interopRequireDefault(_mithrilSlider);
  var _appAppCommon = require("app/app/common");
  var _appAppCommon2 = _interopRequireDefault(_appAppCommon);
  var _appPreloaderPreloader = require("app/preloader/preloader");
  var _appPreloaderPreloader2 = _interopRequireDefault(_appPreloaderPreloader);
  var _appAppGithub = require("app/app/github");
  var _appAppGithub2 = _interopRequireDefault(_appAppGithub);
  require("app/app/common.css!lib/system-css/css");
  require("app/controls/controls.css!lib/system-css/css");
  var createPage = function createPage(opts) {
    var currentIndex = opts.currentIndex;
    var listIndex = opts.listIndex;
    var data = opts.data;
    var inRange = Math.abs(currentIndex - listIndex) < 2;
    var content = inRange ? (0, _mithril2["default"])(".image-container", [(0, _mithril2["default"])(".image", {config: function config(el, inited) {
        if (inited) {
          return;
        }
        _appAppCommon2["default"].fadeInImage(el, data);
      }}), _appPreloaderPreloader2["default"]]) : null;
    return (0, _mithril2["default"])(".page", content);
  };
  var example = {};
  example.controller = function() {
    return {
      sliderController: _mithril2["default"].prop(),
      isEditing: _mithril2["default"].prop(false)
    };
  };
  example.view = function(ctrl) {
    var sliderController = ctrl.sliderController();
    var mySlider = _mithril2["default"].component(_mithrilSlider2["default"], {
      pageData: _appAppCommon2["default"].getPageData,
      page: createPage,
      sliderController: ctrl.sliderController,
      "class": "example controls"
    });
    var sliderControls = sliderController ? (0, _mithril2["default"])(".slider-controls.slider-controls-controls", [(0, _mithril2["default"])("input.goto", {
      value: ctrl.isEditing() ? "" : sliderController.index(),
      oninput: function oninput(e) {
        ctrl.isEditing(true);
        var idx = parseInt(e.target.value, 10);
        if (!isNaN(idx)) {
          sliderController.goTo(idx, 0);
          ctrl.isEditing(false);
        }
      }
    }), (0, _mithril2["default"])("a.prev", {
      "class": sliderController.hasPrevious() ? "enabled" : "",
      onclick: function onclick() {
        return sliderController.goPrevious();
      }
    }, "Previous"), (0, _mithril2["default"])("a.next", {
      "class": sliderController.hasNext() ? "enabled" : "",
      onclick: function onclick() {
        return sliderController.goNext();
      }
    }, "Next")]) : null;
    return [mySlider, sliderControls, (0, _appAppGithub2["default"])()];
  };
  exports["default"] = example;
  module.exports = exports["default"];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("app/group/group", ["lib/mithril/mithril.min", "lib/mithril-slider/mithril-slider", "app/app/common", "app/preloader/preloader", "app/app/github", "app/app/common.css!lib/system-css/css", "app/group/group.css!lib/system-css/css"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  var _mithrilSlider = require("lib/mithril-slider/mithril-slider");
  var _mithrilSlider2 = _interopRequireDefault(_mithrilSlider);
  var _appAppCommon = require("app/app/common");
  var _appAppCommon2 = _interopRequireDefault(_appAppCommon);
  var _appPreloaderPreloader = require("app/preloader/preloader");
  var _appPreloaderPreloader2 = _interopRequireDefault(_appPreloaderPreloader);
  var _appAppGithub = require("app/app/github");
  var _appAppGithub2 = _interopRequireDefault(_appAppGithub);
  require("app/app/common.css!lib/system-css/css");
  require("app/group/group.css!lib/system-css/css");
  var callRight = function callRight(fn) {
    for (var _len = arguments.length,
        args = Array(_len > 1 ? _len - 1 : 0),
        _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return function() {
      for (var _len2 = arguments.length,
          remainingArgs = Array(_len2),
          _key2 = 0; _key2 < _len2; _key2++) {
        remainingArgs[_key2] = arguments[_key2];
      }
      return fn.apply(undefined, remainingArgs.concat(args));
    };
  };
  var createPage = function createPage(opts, ctrl) {
    var groupBy = ctrl.groupBy();
    var currentIndex = opts.currentIndex;
    var listIndex = opts.listIndex;
    var data = opts.data;
    var inRange = Math.abs(currentIndex - listIndex) < 2 * groupBy;
    var content = inRange ? [(0, _mithril2["default"])(".image-container", [(0, _mithril2["default"])(".image", {config: function config(el, inited) {
        if (inited) {
          return;
        }
        _appAppCommon2["default"].fadeInImage(el, data);
      }}), (0, _mithril2["default"])("span", listIndex), _appPreloaderPreloader2["default"]])] : null;
    return (0, _mithril2["default"])(".page", content);
  };
  var example = {};
  example.controller = function() {
    return {
      sliderController: _mithril2["default"].prop(),
      isEditing: _mithril2["default"].prop(false),
      groupBy: _mithril2["default"].prop(3)
    };
  };
  example.view = function(ctrl) {
    var sliderController = ctrl.sliderController();
    var groupBy = ctrl.groupBy();
    var mySlider = _mithril2["default"].component(_mithrilSlider2["default"], {
      pageData: _appAppCommon2["default"].getPageData,
      page: callRight(createPage, ctrl),
      groupBy: groupBy,
      sliderController: ctrl.sliderController,
      "class": ["example", "group", "group-" + groupBy].join(" ")
    });
    function _ref() {
      sliderController.goCurrent();
    }
    var sliderControls = (0, _mithril2["default"])(".slider-controls.slider-controls-group", sliderController ? [(0, _mithril2["default"])("a.prev", {
      "class": sliderController.hasPrevious() ? "enabled" : "",
      onclick: function onclick() {
        return sliderController.goPrevious();
      }
    }, "Previous"), (0, _mithril2["default"])(".count", [[1, 2, 3, 4, 5].map(function(size) {
      return (0, _mithril2["default"])("a", {
        onclick: function onclick() {
          ctrl.groupBy(size);
          setTimeout(_ref, 0);
        },
        "class": size === groupBy ? "selected" : ""
      }, size);
    })]), (0, _mithril2["default"])("a.next", {
      "class": sliderController.hasNext() ? "enabled" : "",
      onclick: function onclick() {
        return sliderController.goNext();
      }
    }, "Next")] : null);
    return [sliderControls, mySlider, (0, _appAppGithub2["default"])()];
  };
  exports["default"] = example;
  module.exports = exports["default"];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("app/pages/pages", ["lib/mithril/mithril.min", "lib/mithril-slider/mithril-slider", "app/app/common", "app/preloader/preloader", "app/app/common.css!lib/system-css/css", "app/pages/pages.css!lib/system-css/css"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  var _mithrilSlider = require("lib/mithril-slider/mithril-slider");
  var _mithrilSlider2 = _interopRequireDefault(_mithrilSlider);
  var _appAppCommon = require("app/app/common");
  var _appAppCommon2 = _interopRequireDefault(_appAppCommon);
  var _appPreloaderPreloader = require("app/preloader/preloader");
  var _appPreloaderPreloader2 = _interopRequireDefault(_appPreloaderPreloader);
  require("app/app/common.css!lib/system-css/css");
  require("app/pages/pages.css!lib/system-css/css");
  var dummyText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  var DATA_URL = "app/pages/data.json";
  var callRight = function callRight(fn) {
    for (var _len = arguments.length,
        args = Array(_len > 1 ? _len - 1 : 0),
        _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return function() {
      for (var _len2 = arguments.length,
          remainingArgs = Array(_len2),
          _key2 = 0; _key2 < _len2; _key2++) {
        remainingArgs[_key2] = arguments[_key2];
      }
      return fn.apply(undefined, remainingArgs.concat(args));
    };
  };
  var createPage = function createPage(opts) {
    var currentIndex = opts.currentIndex;
    var listIndex = opts.listIndex;
    var data = opts.data;
    var inRange = Math.abs(currentIndex - listIndex) < 2;
    var content = inRange ? (0, _mithril2["default"])(".article", [(0, _mithril2["default"])(".image-container", [(0, _mithril2["default"])(".image", {config: function config(el, inited) {
        if (inited) {
          return;
        }
        _appAppCommon2["default"].fadeInImage(el, data.image);
      }}), _appPreloaderPreloader2["default"]]), (0, _mithril2["default"])(".article-content", [(0, _mithril2["default"])(".title", data.title), (0, _mithril2["default"])("p", dummyText)])]) : null;
    return (0, _mithril2["default"])(".page", content);
  };
  var example = {};
  example.view = function() {
    return [_mithril2["default"].component(_mithrilSlider2["default"], {
      pageData: callRight(_appAppCommon2["default"].getPageData, DATA_URL),
      page: createPage,
      "class": "example pages"
    })];
  };
  exports["default"] = example;
  module.exports = exports["default"];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("app/app/github", ["lib/mithril/mithril.min", "app/app/github.css!lib/system-css/css"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  require("app/app/github.css!lib/system-css/css");
  var content = function content() {
    var opts = arguments[0] === undefined ? {} : arguments[0];
    return (0, _mithril2["default"])(".github", [!opts.home ? (0, _mithril2["default"])("a", {
      href: "/",
      config: _mithril2["default"].route
    }, "All examples") : null, (0, _mithril2["default"])("hr"), _mithril2["default"].trust('mithril-slider, Content Slider for Mithril on mobile and desktop. Project page on <a href="https://github.com/ArthurClemens/mithril-slider">Github</a>.')]);
  };
  exports["default"] = content;
  module.exports = exports["default"];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("lib/mithril-slider/mithril-slider", ["lib/mithril/mithril.min", "lib/hammerjs/hammer.min", "lib/mithril-slider/mithril-slider.css!lib/system-css/css"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  var _hammerjs = require("lib/hammerjs/hammer.min");
  var _hammerjs2 = _interopRequireDefault(_hammerjs);
  require("lib/mithril-slider/mithril-slider.css!lib/system-css/css");
  var createView = function createView(ctrl, opts) {
    var contentEl = ctrl.contentEl();
    var list = ctrl.list();
    var currentIndex = ctrl.index();
    ctrl.groupBy(opts.groupBy || 1);
    if (contentEl) {
      ctrl.updateContentSize(contentEl);
    }
    return (0, _mithril2["default"])("div", {"class": ["slider", opts["class"] || ""].join(" ")}, opts.before ? (0, _mithril2["default"])(".before", opts.before) : null, (0, _mithril2["default"])(".content", {config: function config(el, inited, context) {
        if (inited) {
          return;
        }
        ctrl.setContentEl(el);
        var mc = new _hammerjs2["default"].Manager(el, {});
        mc.add(new _hammerjs2["default"].Pan({
          orientation: opts.orientation === "vertical" ? _hammerjs2["default"].DIRECTION_VERTICAL : _hammerjs2["default"].DIRECTION_HORIZONTAL,
          threshold: 0
        }));
        mc.on("panmove", ctrl.handleDrag);
        mc.on("panend", ctrl.handleDragEnd);
        mc.on("panstart", ctrl.handleDragStart);
        context.onunload = function() {
          mc.off("panmove", ctrl.handleDrag);
          mc.off("panend", ctrl.handleDragEnd);
          mc.off("panstart", ctrl.handleDragStart);
        };
      }}, list.map(function(data, listIndex) {
      return opts.page({
        data: data,
        listIndex: listIndex,
        currentIndex: currentIndex
      });
    })), opts.after ? (0, _mithril2["default"])(".after", opts.after) : null);
  };
  var slider = {};
  function _ref(el, idx) {
    return el.childNodes[idx];
  }
  slider.controller = function() {
    var opts = arguments[0] === undefined ? {} : arguments[0];
    var defaultDuration = parseInt(opts.duration, 10) || 250;
    var index = _mithril2["default"].prop(opts.index || 0);
    var list = opts.pageData();
    list.then(_mithril2["default"].redraw);
    var contentEl = _mithril2["default"].prop();
    var pageSize = 0;
    var groupBy = _mithril2["default"].prop(opts.groupBy || 1);
    var cancelDragFactor = opts.cancelDragFactor || 1 / 5;
    var isVertical = opts.orientation === "vertical";
    var setIndex = function setIndex(idx) {
      index(idx);
      _mithril2["default"].redraw();
    };
    var getPageEl = _ref;
    var setTransitionStyle = function setTransitionStyle(el, value) {
      var style = el.style;
      var createAttrs = function createAttrs() {
        var x = isVertical ? "0" : value + "px";
        var y = isVertical ? value + "px" : "0";
        var z = "0";
        var attrs = [x, y, z].join(", ");
        return "translate3d(" + attrs + ")";
      };
      style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-ms-transform"] = createAttrs();
    };
    var setTransitionDurationStyle = function setTransitionDurationStyle(duration) {
      contentEl().style["-webkit-transition-duration"] = contentEl().style["transition-duration"] = duration + "ms";
    };
    var goTo = function goTo(idx, duration) {
      if (idx < 0 || idx > list().length - 1) {
        return;
      }
      if (duration !== undefined) {
        setTransitionDurationStyle(duration);
      }
      setTransitionStyle(contentEl(), -1 * idx * pageSize);
      setIndex(idx);
    };
    var normalizedStep = function normalizedStep(orientation) {
      var idx = index();
      var size = groupBy();
      var min = 0;
      var max = list().length;
      var next = idx + orientation * size;
      if (next + size > max) {
        return max - size;
      }
      if (next < min) {
        return min;
      }
      return next;
    };
    var updateContentSize = function updateContentSize(el) {
      var page = el.childNodes[0];
      var prop = isVertical ? "height" : "width";
      pageSize = page.getBoundingClientRect()[prop];
      el.style[prop] = list().length * pageSize + "px";
    };
    var goCurrent = function goCurrent() {
      var duration = arguments[0] === undefined ? 0 : arguments[0];
      updateContentSize(contentEl());
      setTransitionDurationStyle(duration);
      goTo(normalizedStep(0));
    };
    var goNext = function goNext() {
      var duration = arguments[0] === undefined ? defaultDuration : arguments[0];
      return setTransitionDurationStyle(duration), index() < list().length ? goTo(normalizedStep(1)) : goTo(normalizedStep(0));
    };
    var goPrev = function goPrev() {
      var duration = arguments[0] === undefined ? defaultDuration : arguments[0];
      return setTransitionDurationStyle(duration), index() > 0 ? goTo(normalizedStep(-1)) : goTo(normalizedStep(0));
    };
    var hasNext = function hasNext() {
      return index() + groupBy() < list().length;
    };
    var hasPrevious = function hasPrevious() {
      return index() > 0;
    };
    var setContentEl = function setContentEl(el) {
      contentEl(el);
      updateContentSize(el);
      goCurrent(0);
    };
    var handleDragStart = function handleDragStart() {
      return setTransitionDurationStyle(0);
    };
    var handleDrag = function handleDrag(e) {
      var el = contentEl();
      var page = getPageEl(el, index());
      var delta = isVertical ? e.deltaY : e.deltaX;
      var origin = isVertical ? page.offsetTop : page.offsetLeft;
      setTransitionStyle(el, delta - origin);
      e.preventDefault();
    };
    var calculateTransitionDuration = function calculateTransitionDuration(velocity) {
      var speed = Math.abs(velocity);
      var duration = 1 / speed * 360;
      if (duration < 80) {
        duration = 80;
      }
      if (duration > defaultDuration) {
        duration = defaultDuration;
      }
      return duration;
    };
    var handleDragEnd = function handleDragEnd(e) {
      var duration = calculateTransitionDuration(e.velocity);
      var delta = isVertical ? e.deltaY : e.deltaX;
      if (Math.abs(delta) > pageSize * groupBy() * cancelDragFactor) {
        if (delta < 0) {
          goNext(duration);
        } else {
          goPrev(duration);
        }
      } else {
        goCurrent(duration);
      }
    };
    return {
      list: list,
      contentEl: contentEl,
      setContentEl: setContentEl,
      handleDrag: handleDrag,
      handleDragStart: handleDragStart,
      handleDragEnd: handleDragEnd,
      groupBy: groupBy,
      updateContentSize: updateContentSize,
      index: index,
      hasNext: hasNext,
      hasPrevious: hasPrevious,
      goTo: goTo,
      goCurrent: goCurrent,
      goNext: goNext,
      goPrevious: goPrev
    };
  };
  slider.view = function(ctrl, opts) {
    if (opts.sliderController) {
      opts.sliderController(ctrl);
    }
    return createView(ctrl, opts);
  };
  exports["default"] = slider;
  module.exports = exports["default"];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("app/app/common", ["lib/mithril/mithril.min"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  var DATA_URL = "app/data/server.json";
  var vm = {seen: {}};
  exports["default"] = {
    getPageData: function getPageData() {
      var url = arguments[0] === undefined ? DATA_URL : arguments[0];
      return _mithril2["default"].request({
        method: "GET",
        url: url,
        background: false
      });
    },
    fadeInImage: function fadeInImage(el, url) {
      var showImage = function showImage() {
        el.style.backgroundImage = "url(" + url + ")";
        el.style.opacity = 1;
        vm.seen[url] = 1;
      };
      function _ref() {
        showImage();
      }
      if (!vm.seen[url]) {
        var img = new Image;
        img.onload = _ref;
        img.src = url;
      } else {
        showImage();
      }
    }
  };
  module.exports = exports["default"];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("app/preloader/preloader", ["lib/mithril/mithril.min", "app/preloader/preloader.css!lib/system-css/css"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _mithril = require("lib/mithril/mithril.min");
  var _mithril2 = _interopRequireDefault(_mithril);
  require("app/preloader/preloader.css!lib/system-css/css");
  var preloader = (0, _mithril2["default"])(".preloader", _mithril2["default"].trust('<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">' + '<path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">' + '<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1.0s" repeatCount="indefinite"></animateTransform>' + "</path>" + "</svg>"));
  exports["default"] = preloader;
  module.exports = exports["default"];
  global.define = __define;
  return module.exports;
});

(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
!function(a, b, c, d) {
  "use strict";
  function e(a, b, c) {
    return setTimeout(k(a, c), b);
  }
  function f(a, b, c) {
    return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
  }
  function g(a, b, c) {
    var e;
    if (a)
      if (a.forEach)
        a.forEach(b, c);
      else if (a.length !== d)
        for (e = 0; e < a.length; )
          b.call(c, a[e], e, a), e++;
      else
        for (e in a)
          a.hasOwnProperty(e) && b.call(c, a[e], e, a);
  }
  function h(a, b, c) {
    for (var e = Object.keys(b),
        f = 0; f < e.length; )
      (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
    return a;
  }
  function i(a, b) {
    return h(a, b, !0);
  }
  function j(a, b, c) {
    var d,
        e = b.prototype;
    d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c);
  }
  function k(a, b) {
    return function() {
      return a.apply(b, arguments);
    };
  }
  function l(a, b) {
    return typeof a == kb ? a.apply(b ? b[0] || d : d, b) : a;
  }
  function m(a, b) {
    return a === d ? b : a;
  }
  function n(a, b, c) {
    g(r(b), function(b) {
      a.addEventListener(b, c, !1);
    });
  }
  function o(a, b, c) {
    g(r(b), function(b) {
      a.removeEventListener(b, c, !1);
    });
  }
  function p(a, b) {
    for (; a; ) {
      if (a == b)
        return !0;
      a = a.parentNode;
    }
    return !1;
  }
  function q(a, b) {
    return a.indexOf(b) > -1;
  }
  function r(a) {
    return a.trim().split(/\s+/g);
  }
  function s(a, b, c) {
    if (a.indexOf && !c)
      return a.indexOf(b);
    for (var d = 0; d < a.length; ) {
      if (c && a[d][c] == b || !c && a[d] === b)
        return d;
      d++;
    }
    return -1;
  }
  function t(a) {
    return Array.prototype.slice.call(a, 0);
  }
  function u(a, b, c) {
    for (var d = [],
        e = [],
        f = 0; f < a.length; ) {
      var g = b ? a[f][b] : a[f];
      s(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
    }
    return c && (d = b ? d.sort(function(a, c) {
      return a[b] > c[b];
    }) : d.sort()), d;
  }
  function v(a, b) {
    for (var c,
        e,
        f = b[0].toUpperCase() + b.slice(1),
        g = 0; g < ib.length; ) {
      if (c = ib[g], e = c ? c + f : b, e in a)
        return e;
      g++;
    }
    return d;
  }
  function w() {
    return ob++;
  }
  function x(a) {
    var b = a.ownerDocument;
    return b.defaultView || b.parentWindow;
  }
  function y(a, b) {
    var c = this;
    this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) {
      l(a.options.enable, [a]) && c.handler(b);
    }, this.init();
  }
  function z(a) {
    var b,
        c = a.options.inputClass;
    return new (b = c ? c : rb ? N : sb ? Q : qb ? S : M)(a, A);
  }
  function A(a, b, c) {
    var d = c.pointers.length,
        e = c.changedPointers.length,
        f = b & yb && d - e === 0,
        g = b & (Ab | Bb) && d - e === 0;
    c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, B(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
  }
  function B(a, b) {
    var c = a.session,
        d = b.pointers,
        e = d.length;
    c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
    var f = c.firstInput,
        g = c.firstMultiple,
        h = g ? g.center : f.center,
        i = b.center = F(d);
    b.timeStamp = nb(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, b.rotation = g ? K(g.pointers, d) : 0, D(c, b);
    var j = a.element;
    p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j;
  }
  function C(a, b) {
    var c = b.center,
        d = a.offsetDelta || {},
        e = a.prevDelta || {},
        f = a.prevInput || {};
    (b.eventType === yb || f.eventType === Ab) && (e = a.prevDelta = {
      x: f.deltaX || 0,
      y: f.deltaY || 0
    }, d = a.offsetDelta = {
      x: c.x,
      y: c.y
    }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
  }
  function D(a, b) {
    var c,
        e,
        f,
        g,
        h = a.lastInterval || b,
        i = b.timeStamp - h.timeStamp;
    if (b.eventType != Bb && (i > xb || h.velocity === d)) {
      var j = h.deltaX - b.deltaX,
          k = h.deltaY - b.deltaY,
          l = G(i, j, k);
      e = l.x, f = l.y, c = mb(l.x) > mb(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b;
    } else
      c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
    b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
  }
  function E(a) {
    for (var b = [],
        c = 0; c < a.pointers.length; )
      b[c] = {
        clientX: lb(a.pointers[c].clientX),
        clientY: lb(a.pointers[c].clientY)
      }, c++;
    return {
      timeStamp: nb(),
      pointers: b,
      center: F(b),
      deltaX: a.deltaX,
      deltaY: a.deltaY
    };
  }
  function F(a) {
    var b = a.length;
    if (1 === b)
      return {
        x: lb(a[0].clientX),
        y: lb(a[0].clientY)
      };
    for (var c = 0,
        d = 0,
        e = 0; b > e; )
      c += a[e].clientX, d += a[e].clientY, e++;
    return {
      x: lb(c / b),
      y: lb(d / b)
    };
  }
  function G(a, b, c) {
    return {
      x: b / a || 0,
      y: c / a || 0
    };
  }
  function H(a, b) {
    return a === b ? Cb : mb(a) >= mb(b) ? a > 0 ? Db : Eb : b > 0 ? Fb : Gb;
  }
  function I(a, b, c) {
    c || (c = Kb);
    var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];
    return Math.sqrt(d * d + e * e);
  }
  function J(a, b, c) {
    c || (c = Kb);
    var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];
    return 180 * Math.atan2(e, d) / Math.PI;
  }
  function K(a, b) {
    return J(b[1], b[0], Lb) - J(a[1], a[0], Lb);
  }
  function L(a, b) {
    return I(b[0], b[1], Lb) / I(a[0], a[1], Lb);
  }
  function M() {
    this.evEl = Nb, this.evWin = Ob, this.allow = !0, this.pressed = !1, y.apply(this, arguments);
  }
  function N() {
    this.evEl = Rb, this.evWin = Sb, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
  }
  function O() {
    this.evTarget = Ub, this.evWin = Vb, this.started = !1, y.apply(this, arguments);
  }
  function P(a, b) {
    var c = t(a.touches),
        d = t(a.changedTouches);
    return b & (Ab | Bb) && (c = u(c.concat(d), "identifier", !0)), [c, d];
  }
  function Q() {
    this.evTarget = Xb, this.targetIds = {}, y.apply(this, arguments);
  }
  function R(a, b) {
    var c = t(a.touches),
        d = this.targetIds;
    if (b & (yb | zb) && 1 === c.length)
      return d[c[0].identifier] = !0, [c, c];
    var e,
        f,
        g = t(a.changedTouches),
        h = [],
        i = this.target;
    if (f = c.filter(function(a) {
      return p(a.target, i);
    }), b === yb)
      for (e = 0; e < f.length; )
        d[f[e].identifier] = !0, e++;
    for (e = 0; e < g.length; )
      d[g[e].identifier] && h.push(g[e]), b & (Ab | Bb) && delete d[g[e].identifier], e++;
    return h.length ? [u(f.concat(h), "identifier", !0), h] : void 0;
  }
  function S() {
    y.apply(this, arguments);
    var a = k(this.handler, this);
    this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a);
  }
  function T(a, b) {
    this.manager = a, this.set(b);
  }
  function U(a) {
    if (q(a, bc))
      return bc;
    var b = q(a, cc),
        c = q(a, dc);
    return b && c ? cc + " " + dc : b || c ? b ? cc : dc : q(a, ac) ? ac : _b;
  }
  function V(a) {
    this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), this.state = ec, this.simultaneous = {}, this.requireFail = [];
  }
  function W(a) {
    return a & jc ? "cancel" : a & hc ? "end" : a & gc ? "move" : a & fc ? "start" : "";
  }
  function X(a) {
    return a == Gb ? "down" : a == Fb ? "up" : a == Db ? "left" : a == Eb ? "right" : "";
  }
  function Y(a, b) {
    var c = b.manager;
    return c ? c.get(a) : a;
  }
  function Z() {
    V.apply(this, arguments);
  }
  function $() {
    Z.apply(this, arguments), this.pX = null, this.pY = null;
  }
  function _() {
    Z.apply(this, arguments);
  }
  function ab() {
    V.apply(this, arguments), this._timer = null, this._input = null;
  }
  function bb() {
    Z.apply(this, arguments);
  }
  function cb() {
    Z.apply(this, arguments);
  }
  function db() {
    V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
  }
  function eb(a, b) {
    return b = b || {}, b.recognizers = m(b.recognizers, eb.defaults.preset), new fb(a, b);
  }
  function fb(a, b) {
    b = b || {}, this.options = i(b, eb.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = z(this), this.touchAction = new T(this, this.options.touchAction), gb(this, !0), g(b.recognizers, function(a) {
      var b = this.add(new a[0](a[1]));
      a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
    }, this);
  }
  function gb(a, b) {
    var c = a.element;
    g(a.options.cssProps, function(a, d) {
      c.style[v(c.style, d)] = b ? a : "";
    });
  }
  function hb(a, c) {
    var d = b.createEvent("Event");
    d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
  }
  var ib = ["", "webkit", "moz", "MS", "ms", "o"],
      jb = b.createElement("div"),
      kb = "function",
      lb = Math.round,
      mb = Math.abs,
      nb = Date.now,
      ob = 1,
      pb = /mobile|tablet|ip(ad|hone|od)|android/i,
      qb = "ontouchstart" in a,
      rb = v(a, "PointerEvent") !== d,
      sb = qb && pb.test(navigator.userAgent),
      tb = "touch",
      ub = "pen",
      vb = "mouse",
      wb = "kinect",
      xb = 25,
      yb = 1,
      zb = 2,
      Ab = 4,
      Bb = 8,
      Cb = 1,
      Db = 2,
      Eb = 4,
      Fb = 8,
      Gb = 16,
      Hb = Db | Eb,
      Ib = Fb | Gb,
      Jb = Hb | Ib,
      Kb = ["x", "y"],
      Lb = ["clientX", "clientY"];
  y.prototype = {
    handler: function() {},
    init: function() {
      this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(x(this.element), this.evWin, this.domHandler);
    },
    destroy: function() {
      this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), this.evWin && o(x(this.element), this.evWin, this.domHandler);
    }
  };
  var Mb = {
    mousedown: yb,
    mousemove: zb,
    mouseup: Ab
  },
      Nb = "mousedown",
      Ob = "mousemove mouseup";
  j(M, y, {handler: function(a) {
      var b = Mb[a.type];
      b & yb && 0 === a.button && (this.pressed = !0), b & zb && 1 !== a.which && (b = Ab), this.pressed && this.allow && (b & Ab && (this.pressed = !1), this.callback(this.manager, b, {
        pointers: [a],
        changedPointers: [a],
        pointerType: vb,
        srcEvent: a
      }));
    }});
  var Pb = {
    pointerdown: yb,
    pointermove: zb,
    pointerup: Ab,
    pointercancel: Bb,
    pointerout: Bb
  },
      Qb = {
        2: tb,
        3: ub,
        4: vb,
        5: wb
      },
      Rb = "pointerdown",
      Sb = "pointermove pointerup pointercancel";
  a.MSPointerEvent && (Rb = "MSPointerDown", Sb = "MSPointerMove MSPointerUp MSPointerCancel"), j(N, y, {handler: function(a) {
      var b = this.store,
          c = !1,
          d = a.type.toLowerCase().replace("ms", ""),
          e = Pb[d],
          f = Qb[a.pointerType] || a.pointerType,
          g = f == tb,
          h = s(b, a.pointerId, "pointerId");
      e & yb && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ab | Bb) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
        pointers: b,
        changedPointers: [a],
        pointerType: f,
        srcEvent: a
      }), c && b.splice(h, 1));
    }});
  var Tb = {
    touchstart: yb,
    touchmove: zb,
    touchend: Ab,
    touchcancel: Bb
  },
      Ub = "touchstart",
      Vb = "touchstart touchmove touchend touchcancel";
  j(O, y, {handler: function(a) {
      var b = Tb[a.type];
      if (b === yb && (this.started = !0), this.started) {
        var c = P.call(this, a, b);
        b & (Ab | Bb) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
          pointers: c[0],
          changedPointers: c[1],
          pointerType: tb,
          srcEvent: a
        });
      }
    }});
  var Wb = {
    touchstart: yb,
    touchmove: zb,
    touchend: Ab,
    touchcancel: Bb
  },
      Xb = "touchstart touchmove touchend touchcancel";
  j(Q, y, {handler: function(a) {
      var b = Wb[a.type],
          c = R.call(this, a, b);
      c && this.callback(this.manager, b, {
        pointers: c[0],
        changedPointers: c[1],
        pointerType: tb,
        srcEvent: a
      });
    }}), j(S, y, {
    handler: function(a, b, c) {
      var d = c.pointerType == tb,
          e = c.pointerType == vb;
      if (d)
        this.mouse.allow = !1;
      else if (e && !this.mouse.allow)
        return;
      b & (Ab | Bb) && (this.mouse.allow = !0), this.callback(a, b, c);
    },
    destroy: function() {
      this.touch.destroy(), this.mouse.destroy();
    }
  });
  var Yb = v(jb.style, "touchAction"),
      Zb = Yb !== d,
      $b = "compute",
      _b = "auto",
      ac = "manipulation",
      bc = "none",
      cc = "pan-x",
      dc = "pan-y";
  T.prototype = {
    set: function(a) {
      a == $b && (a = this.compute()), Zb && (this.manager.element.style[Yb] = a), this.actions = a.toLowerCase().trim();
    },
    update: function() {
      this.set(this.manager.options.touchAction);
    },
    compute: function() {
      var a = [];
      return g(this.manager.recognizers, function(b) {
        l(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
      }), U(a.join(" "));
    },
    preventDefaults: function(a) {
      if (!Zb) {
        var b = a.srcEvent,
            c = a.offsetDirection;
        if (this.manager.session.prevented)
          return void b.preventDefault();
        var d = this.actions,
            e = q(d, bc),
            f = q(d, dc),
            g = q(d, cc);
        return e || f && c & Hb || g && c & Ib ? this.preventSrc(b) : void 0;
      }
    },
    preventSrc: function(a) {
      this.manager.session.prevented = !0, a.preventDefault();
    }
  };
  var ec = 1,
      fc = 2,
      gc = 4,
      hc = 8,
      ic = hc,
      jc = 16,
      kc = 32;
  V.prototype = {
    defaults: {},
    set: function(a) {
      return h(this.options, a), this.manager && this.manager.touchAction.update(), this;
    },
    recognizeWith: function(a) {
      if (f(a, "recognizeWith", this))
        return this;
      var b = this.simultaneous;
      return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
    },
    dropRecognizeWith: function(a) {
      return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], this);
    },
    requireFailure: function(a) {
      if (f(a, "requireFailure", this))
        return this;
      var b = this.requireFail;
      return a = Y(a, this), -1 === s(b, a) && (b.push(a), a.requireFailure(this)), this;
    },
    dropRequireFailure: function(a) {
      if (f(a, "dropRequireFailure", this))
        return this;
      a = Y(a, this);
      var b = s(this.requireFail, a);
      return b > -1 && this.requireFail.splice(b, 1), this;
    },
    hasRequireFailures: function() {
      return this.requireFail.length > 0;
    },
    canRecognizeWith: function(a) {
      return !!this.simultaneous[a.id];
    },
    emit: function(a) {
      function b(b) {
        c.manager.emit(c.options.event + (b ? W(d) : ""), a);
      }
      var c = this,
          d = this.state;
      hc > d && b(!0), b(), d >= hc && b(!0);
    },
    tryEmit: function(a) {
      return this.canEmit() ? this.emit(a) : void(this.state = kc);
    },
    canEmit: function() {
      for (var a = 0; a < this.requireFail.length; ) {
        if (!(this.requireFail[a].state & (kc | ec)))
          return !1;
        a++;
      }
      return !0;
    },
    recognize: function(a) {
      var b = h({}, a);
      return l(this.options.enable, [this, b]) ? (this.state & (ic | jc | kc) && (this.state = ec), this.state = this.process(b), void(this.state & (fc | gc | hc | jc) && this.tryEmit(b))) : (this.reset(), void(this.state = kc));
    },
    process: function() {},
    getTouchAction: function() {},
    reset: function() {}
  }, j(Z, V, {
    defaults: {pointers: 1},
    attrTest: function(a) {
      var b = this.options.pointers;
      return 0 === b || a.pointers.length === b;
    },
    process: function(a) {
      var b = this.state,
          c = a.eventType,
          d = b & (fc | gc),
          e = this.attrTest(a);
      return d && (c & Bb || !e) ? b | jc : d || e ? c & Ab ? b | hc : b & fc ? b | gc : fc : kc;
    }
  }), j($, Z, {
    defaults: {
      event: "pan",
      threshold: 10,
      pointers: 1,
      direction: Jb
    },
    getTouchAction: function() {
      var a = this.options.direction,
          b = [];
      return a & Hb && b.push(dc), a & Ib && b.push(cc), b;
    },
    directionTest: function(a) {
      var b = this.options,
          c = !0,
          d = a.distance,
          e = a.direction,
          f = a.deltaX,
          g = a.deltaY;
      return e & b.direction || (b.direction & Hb ? (e = 0 === f ? Cb : 0 > f ? Db : Eb, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Cb : 0 > g ? Fb : Gb, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
    },
    attrTest: function(a) {
      return Z.prototype.attrTest.call(this, a) && (this.state & fc || !(this.state & fc) && this.directionTest(a));
    },
    emit: function(a) {
      this.pX = a.deltaX, this.pY = a.deltaY;
      var b = X(a.direction);
      b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a);
    }
  }), j(_, Z, {
    defaults: {
      event: "pinch",
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function() {
      return [bc];
    },
    attrTest: function(a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fc);
    },
    emit: function(a) {
      if (this._super.emit.call(this, a), 1 !== a.scale) {
        var b = a.scale < 1 ? "in" : "out";
        this.manager.emit(this.options.event + b, a);
      }
    }
  }), j(ab, V, {
    defaults: {
      event: "press",
      pointers: 1,
      time: 500,
      threshold: 5
    },
    getTouchAction: function() {
      return [_b];
    },
    process: function(a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime > b.time;
      if (this._input = a, !d || !c || a.eventType & (Ab | Bb) && !f)
        this.reset();
      else if (a.eventType & yb)
        this.reset(), this._timer = e(function() {
          this.state = ic, this.tryEmit();
        }, b.time, this);
      else if (a.eventType & Ab)
        return ic;
      return kc;
    },
    reset: function() {
      clearTimeout(this._timer);
    },
    emit: function(a) {
      this.state === ic && (a && a.eventType & Ab ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = nb(), this.manager.emit(this.options.event, this._input)));
    }
  }), j(bb, Z, {
    defaults: {
      event: "rotate",
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function() {
      return [bc];
    },
    attrTest: function(a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fc);
    }
  }), j(cb, Z, {
    defaults: {
      event: "swipe",
      threshold: 10,
      velocity: .65,
      direction: Hb | Ib,
      pointers: 1
    },
    getTouchAction: function() {
      return $.prototype.getTouchAction.call(this);
    },
    attrTest: function(a) {
      var b,
          c = this.options.direction;
      return c & (Hb | Ib) ? b = a.velocity : c & Hb ? b = a.velocityX : c & Ib && (b = a.velocityY), this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && mb(b) > this.options.velocity && a.eventType & Ab;
    },
    emit: function(a) {
      var b = X(a.direction);
      b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
    }
  }), j(db, V, {
    defaults: {
      event: "tap",
      pointers: 1,
      taps: 1,
      interval: 300,
      time: 250,
      threshold: 2,
      posThreshold: 10
    },
    getTouchAction: function() {
      return [ac];
    },
    process: function(a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime < b.time;
      if (this.reset(), a.eventType & yb && 0 === this.count)
        return this.failTimeout();
      if (d && f && c) {
        if (a.eventType != Ab)
          return this.failTimeout();
        var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
            h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
        this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
        var i = this.count % b.taps;
        if (0 === i)
          return this.hasRequireFailures() ? (this._timer = e(function() {
            this.state = ic, this.tryEmit();
          }, b.interval, this), fc) : ic;
      }
      return kc;
    },
    failTimeout: function() {
      return this._timer = e(function() {
        this.state = kc;
      }, this.options.interval, this), kc;
    },
    reset: function() {
      clearTimeout(this._timer);
    },
    emit: function() {
      this.state == ic && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
    }
  }), eb.VERSION = "2.0.4", eb.defaults = {
    domEvents: !1,
    touchAction: $b,
    enable: !0,
    inputTarget: null,
    inputClass: null,
    preset: [[bb, {enable: !1}], [_, {enable: !1}, ["rotate"]], [cb, {direction: Hb}], [$, {direction: Hb}, ["swipe"]], [db], [db, {
      event: "doubletap",
      taps: 2
    }, ["tap"]], [ab]],
    cssProps: {
      userSelect: "none",
      touchSelect: "none",
      touchCallout: "none",
      contentZooming: "none",
      userDrag: "none",
      tapHighlightColor: "rgba(0,0,0,0)"
    }
  };
  var lc = 1,
      mc = 2;
  fb.prototype = {
    set: function(a) {
      return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
    },
    stop: function(a) {
      this.session.stopped = a ? mc : lc;
    },
    recognize: function(a) {
      var b = this.session;
      if (!b.stopped) {
        this.touchAction.preventDefaults(a);
        var c,
            d = this.recognizers,
            e = b.curRecognizer;
        (!e || e && e.state & ic) && (e = b.curRecognizer = null);
        for (var f = 0; f < d.length; )
          c = d[f], b.stopped === mc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (fc | gc | hc) && (e = b.curRecognizer = c), f++;
      }
    },
    get: function(a) {
      if (a instanceof V)
        return a;
      for (var b = this.recognizers,
          c = 0; c < b.length; c++)
        if (b[c].options.event == a)
          return b[c];
      return null;
    },
    add: function(a) {
      if (f(a, "add", this))
        return this;
      var b = this.get(a.options.event);
      return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
    },
    remove: function(a) {
      if (f(a, "remove", this))
        return this;
      var b = this.recognizers;
      return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this;
    },
    on: function(a, b) {
      var c = this.handlers;
      return g(r(a), function(a) {
        c[a] = c[a] || [], c[a].push(b);
      }), this;
    },
    off: function(a, b) {
      var c = this.handlers;
      return g(r(a), function(a) {
        b ? c[a].splice(s(c[a], b), 1) : delete c[a];
      }), this;
    },
    emit: function(a, b) {
      this.options.domEvents && hb(a, b);
      var c = this.handlers[a] && this.handlers[a].slice();
      if (c && c.length) {
        b.type = a, b.preventDefault = function() {
          b.srcEvent.preventDefault();
        };
        for (var d = 0; d < c.length; )
          c[d](b), d++;
      }
    },
    destroy: function() {
      this.element && gb(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
    }
  }, h(eb, {
    INPUT_START: yb,
    INPUT_MOVE: zb,
    INPUT_END: Ab,
    INPUT_CANCEL: Bb,
    STATE_POSSIBLE: ec,
    STATE_BEGAN: fc,
    STATE_CHANGED: gc,
    STATE_ENDED: hc,
    STATE_RECOGNIZED: ic,
    STATE_CANCELLED: jc,
    STATE_FAILED: kc,
    DIRECTION_NONE: Cb,
    DIRECTION_LEFT: Db,
    DIRECTION_RIGHT: Eb,
    DIRECTION_UP: Fb,
    DIRECTION_DOWN: Gb,
    DIRECTION_HORIZONTAL: Hb,
    DIRECTION_VERTICAL: Ib,
    DIRECTION_ALL: Jb,
    Manager: fb,
    Input: y,
    TouchAction: T,
    TouchInput: Q,
    MouseInput: M,
    PointerEventInput: N,
    TouchMouseInput: S,
    SingleTouchInput: O,
    Recognizer: V,
    AttrRecognizer: Z,
    Tap: db,
    Pan: $,
    Swipe: cb,
    Pinch: _,
    Rotate: bb,
    Press: ab,
    on: n,
    off: o,
    each: g,
    merge: i,
    extend: h,
    inherit: j,
    bindFn: k,
    prefixed: v
  }), typeof define == kb && define.amd ? define("lib/hammerjs/hammer.min", [], function() {
    return eb;
  }) : "undefined" != typeof module && module.exports ? module.exports = eb : a[c] = eb;
}(window, document, "Hammer");

_removeDefine();
})();