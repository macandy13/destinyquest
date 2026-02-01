(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports$1) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports$1.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports$1.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports$1.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports$1.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports$1.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports$1.unstable_now());
    }, b);
  }
  exports$1.unstable_IdlePriority = 5;
  exports$1.unstable_ImmediatePriority = 1;
  exports$1.unstable_LowPriority = 4;
  exports$1.unstable_NormalPriority = 3;
  exports$1.unstable_Profiling = null;
  exports$1.unstable_UserBlockingPriority = 2;
  exports$1.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports$1.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports$1.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports$1.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports$1.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports$1.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_pauseExecution = function() {
  };
  exports$1.unstable_requestPaint = function() {
  };
  exports$1.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_scheduleCallback = function(a, b, c) {
    var d = exports$1.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports$1.unstable_shouldYield = M2;
  exports$1.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f2[h]) {
              var k2 = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c) return Xb(e), a;
        if (f2 === d) return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c) e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c = Nh(a, b, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e);
}
function jj(a, b, c, d, e, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      wj(b, false, e, c, f2);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e);
      X = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l2) {
      W(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f2(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f2, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f2, g, h, k2) {
  a = new al(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f2, g, h, k2) {
  a = bl(c, d, true, a, e, f2, g, h, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f2), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
const logo = "" + new URL("logo-destiny-CbkO7ug_.png", import.meta.url).href;
const MobileLayout = ({ children, className = "" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mobile-layout ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mobile-layout-content", children }) });
};
const BottomNav = ({ activeTab, onTabChange }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "bottom-nav", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onTabChange("stats"),
        className: `nav-button ${activeTab === "stats" ? "active" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-button-icon", children: "🦸" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-button-label", children: "Hero" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nav-divider" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onTabChange("equipment"),
        className: `nav-button ${activeTab === "equipment" ? "active" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-button-icon", children: "⚔️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-button-label", children: "Inventory" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nav-divider" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onTabChange("combat"),
        className: `nav-button ${activeTab === "combat" ? "active" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-button-icon", children: "💀" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-button-label", children: "Combat" })
        ]
      }
    )
  ] });
};
const NumberControl = ({ value, onChange, min = 0, max = 9999, label }) => {
  const handleChange = (delta) => {
    const newValue = Math.min(max, Math.max(min, value + delta));
    onChange(newValue);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "number-control", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nc-buttons left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "nc-btn nc-btn-large",
          onClick: () => handleChange(-10),
          disabled: value - 10 < min,
          "aria-label": "Decrease by 10",
          children: "-10"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "nc-btn",
          onClick: () => handleChange(-1),
          disabled: value <= min,
          "aria-label": "Decrease by 1",
          children: "-"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nc-display", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nc-value", children: value }),
      label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nc-label", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nc-buttons right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "nc-btn",
          onClick: () => handleChange(1),
          disabled: value >= max,
          "aria-label": "Increase by 1",
          children: "+"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "nc-btn nc-btn-large",
          onClick: () => handleChange(10),
          disabled: value + 10 > max,
          "aria-label": "Increase by 10",
          children: "+10"
        }
      )
    ] })
  ] });
};
function getStatIcon(stat) {
  switch (stat.toLowerCase()) {
    case "speed":
      return "⚡";
    case "die":
      return "🎲";
    case "brawn":
      return "💪";
    case "magic":
      return "✨";
    case "armour":
      return "🛡️";
    case "health":
      return "❤️";
    case "money":
      return "💰";
    case "damage":
      return "⚔️";
    case "damageModifier":
      return "⚔️";
    case "modifier":
      return "⚔️";
    case "hero":
      return "🧙";
    case "enemy":
      return "💀";
    default:
      return "";
  }
}
const ABILITY_REGISTRY = {};
function registerAbility(definition) {
  ABILITY_REGISTRY[toCanonicalName(definition.name)] = definition;
}
function toCanonicalName(name) {
  return name.replace(/ /g, "-").toLowerCase();
}
function getAbilityDefinition(name) {
  const canonicalName = toCanonicalName(name);
  return canonicalName ? ABILITY_REGISTRY[canonicalName] : void 0;
}
function getAbilityIcon(definition) {
  if (!definition) return "❓";
  const type = definition.type;
  if (definition.icon) return definition.icon;
  switch (type) {
    case "speed":
      return "⚡";
    case "combat":
      return "⚔️";
    case "modifier":
      return "✨";
    case "passive":
      return "👁️";
    case "special":
      return "👾";
    default:
      return "✨";
  }
}
const CAREERS = [
  // Warrior Careers
  {
    name: "Gladiator",
    path: "Warrior",
    abilities: ["Blood Rage", "Head Butt"]
  },
  {
    name: "Berserker",
    path: "Warrior",
    abilities: ["Seeing Red", "Raining Blows"]
  },
  {
    name: "Ranger",
    path: "Warrior",
    abilities: ["Lay of the Land", "Nature's Revenge"]
  },
  {
    name: "Cavalier",
    path: "Warrior",
    abilities: ["Shield Spind", "Shield Wall"]
  },
  {
    name: "Shadow Ranger",
    path: "Warrior",
    abilities: ["Black Rain", "Thorn Fist"]
  },
  {
    name: "Inquisitor",
    path: "Warrior",
    abilities: ["Cleansing Light", "Avenging Spirit"]
  },
  // Mage Careers
  {
    name: "Alchemist",
    path: "Mage",
    abilities: ["Good Taste", "Midas Touch"]
  },
  {
    name: "Pyromancer",
    path: "Mage",
    abilities: ["Ignite", "Burn"]
  },
  {
    name: "Medic",
    path: "Mage",
    abilities: ["Mend", "Torniquet"]
  },
  {
    name: "Icelock",
    path: "Mage",
    abilities: ["Ice Shards", "Ice Shield"]
  },
  {
    name: "Necromancer",
    path: "Mage",
    abilities: ["Shades", "Sacrifice"]
  },
  // Rogue Careers
  {
    name: "Pickpocket",
    path: "Rogue",
    abilities: ["Patchwork Pauper", "Loot Master"]
  },
  {
    name: "Assassin",
    path: "Rogue",
    abilities: ["First Strike", "Deadly Poisons"]
  },
  {
    name: "Shadowstalker",
    path: "Rogue",
    abilities: ["Shadow Speed", "Shadow Fury"]
  },
  {
    name: "Swordsmaster",
    path: "Rogue",
    abilities: ["Swift Strikes", "Ambidextrous"]
  }
];
function getCareersForPath(path) {
  return CAREERS.filter((c) => c.path === path);
}
function getCareer(name) {
  return CAREERS.find((c) => c.name === name);
}
const DqCard = ({ title, children, className = "", headerContent, onClose, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `dq-card ${className}`, ...props, children: [
    (title || headerContent || onClose) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-header", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "dq-card-title", children: title }),
      headerContent,
      onClose && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, "aria-label": "Close", children: "×" })
    ] }),
    children
  ] });
};
const Modal = ({ title, children, onClose, actions }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dq-modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dq-modal-content", onClick: (e) => e.stopPropagation(), children: [
    onClose && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "dq-modal-close", onClick: onClose, children: "✕" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dq-modal-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dq-modal-title", children: title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dq-modal-body", children }),
    actions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dq-modal-actions", children: actions })
  ] }) });
};
const STAT_CONFIG = [
  { key: "speed", label: "Speed" },
  { key: "brawn", label: "Brawn" },
  { key: "magic", label: "Magic" },
  { key: "armour", label: "Armour" }
];
const HeroStats = ({
  hero,
  activeAbilities: activeAbilities2,
  onHealthChange,
  onMoneyChange,
  onNameChange,
  onPathChange,
  onCareerChange
}) => {
  const { stats, money } = hero;
  const [warningMessage, setWarningMessage] = React.useState(null);
  const processedAbilities = React.useMemo(() => {
    const abilities = /* @__PURE__ */ new Map();
    activeAbilities2.forEach((a) => abilities.set(a, (abilities.get(a) || 0) + 1));
    return Array.from(abilities).sort((a, b) => a[0].localeCompare(b[0]));
  }, [activeAbilities2]);
  const availableCareers = React.useMemo(() => hero.path ? getCareersForPath(hero.path) : [], [hero.path]);
  const handlePathChange = (e) => {
    const newPath = e.target.value;
    onPathChange(newPath, (removedItems) => {
      setWarningMessage(`The following items were unequipped due to path requirements:

${removedItems.join("\n")}`);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DqCard, { title: "Hero Sheet", headerContent: null, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-stats-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "hero-input",
            value: hero.name,
            onChange: (e) => onNameChange(e.target.value),
            placeholder: "Hero Name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Path" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "hero-input",
            value: hero.path,
            onChange: handlePathChange,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No Path" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Warrior", children: "Warrior (+15 HP)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Mage", children: "Mage (+10 HP)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rogue", children: "Rogue (+5 HP)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Career" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "hero-input",
            value: hero.career,
            disabled: !hero.path,
            onChange: (e) => onCareerChange(e.target.value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Career..." }),
              availableCareers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.name, children: c.name }, c.name))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row health", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: getStatIcon("health") }),
          " Health"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-controls", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          NumberControl,
          {
            value: stats.health,
            onChange: onHealthChange,
            max: stats.maxHealth,
            min: 0,
            label: `/ ${stats.maxHealth}`
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row money", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: getStatIcon("money") }),
          " Money"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-controls", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          NumberControl,
          {
            value: money,
            onChange: onMoneyChange,
            min: 0
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "attributes-grid", children: STAT_CONFIG.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "attribute-square", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: getStatIcon(key) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "attribute-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value-large", children: stats[key] })
        ] })
      ] }, key)) }),
      processedAbilities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "abilities-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Active Abilities" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "abilities-list", children: processedAbilities.map(([abilityName, count]) => {
          const def = getAbilityDefinition(abilityName);
          const icon = getAbilityIcon(def);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ability-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ability-icon-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ability-icon", children: icon }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ability-details", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ability-header-row", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ability-name", children: abilityName }),
                count > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ability-count", children: [
                  "x",
                  count
                ] })
              ] }),
              (def == null ? void 0 : def.description) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ability-description", children: def.description })
            ] })
          ] }, abilityName);
        }) })
      ] })
    ] }),
    warningMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        title: "Equipment Removed",
        onClose: () => setWarningMessage(null),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: () => setWarningMessage(null), children: "OK" }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { whiteSpace: "pre-line" }, children: warningMessage })
      }
    )
  ] });
};
function formatEffect(effect) {
  if (effect.description) return effect.description;
  return Object.entries(effect.stats).map(([stat, value]) => {
    if (!value) return null;
    const statEffect = (value > 0 ? `+${value}` : `${value}`) + ` ${stat}`;
    let effectDescription = "";
    switch (effect.duration) {
      case void 0:
        effectDescription = statEffect + "/∞";
        break;
      case 0:
        effectDescription = statEffect;
        break;
      default:
        effectDescription = statEffect + `/${effect.duration}rd`;
    }
    if (!effect.visible) {
      effectDescription = `[${effectDescription}]`;
    }
    return effectDescription;
  }).filter((s) => s !== null).join(", ");
}
function applyStatsModification(base, mod) {
  const newStats = { ...base };
  newStats.speed += mod.speed ?? 0;
  newStats.brawn += mod.brawn ?? 0;
  newStats.magic += mod.magic ?? 0;
  newStats.armour += mod.armour ?? 0;
  newStats.maxHealth += mod.maxHealth ?? 0;
  newStats.health = Math.min(newStats.maxHealth, newStats.health + (mod.health ?? 0));
  newStats.speedDice = (newStats.speedDice ?? 2) + (mod.speedDice ?? 0);
  newStats.damageDice = (newStats.damageDice ?? 1) + (mod.damageDice ?? 0);
  newStats.damageModifier = (newStats.damageModifier ?? 0) + (mod.damageModifier ?? 0);
  return newStats;
}
function calculateEffectiveStatsForType(base, modifications, type) {
  return modifications.reduce((currentStats, mod) => {
    if (mod.target !== type) return currentStats;
    return applyStatsModification(currentStats, mod.stats);
  }, base);
}
const EquipmentSlot = ({ label, icon, item, onClick, className = "" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `equipment-slot ${item ? "equipped" : ""} ${className}`,
      onClick,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slot-icon", children: icon }),
        item ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "equipment-item-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "equipment-name-visible", children: item.name }),
          item.stats && Object.keys(item.stats).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "equipment-stats-display", children: Object.entries(item.stats).map(([stat, value]) => {
            const val = value;
            const statIcon = getStatIcon(stat);
            return `${val > 0 ? "+" : ""}${val} ${statIcon}`;
          }).join(" ") }),
          item.abilities && item.abilities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "equipment-abilities-display", children: item.abilities.map((a) => `★ ${a}`).join(", ") }),
          (item.description || item.effect) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "equipment-effect-display", children: item.description || (typeof item.effect === "string" ? item.effect : formatEffect(item.effect)) })
        ] }) : label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slot-label", children: label })
      ]
    }
  );
};
const ITEMS = [
  {
    "id": "patchwork_cloak",
    "name": "Patchwork cloak",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 68
    },
    "stats": {
      "speed": 1
    },
    "abilities": [],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "bat_cape",
    "name": "Bat cape",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 114
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "spindlesilk_cloak",
    "name": "Spindlesilk cloak",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 132
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Spindlesilk set"
    ],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "chieftains_furs",
    "name": "Chieftain's furs",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 260
    },
    "stats": {
      "armour": 1
    },
    "abilities": [],
    "location": "Goblin chief"
  },
  {
    "id": "travellers_cloak",
    "name": "Traveller's cloak",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 251
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Farmhouse bedroom"
  },
  {
    "id": "moth_eaten_blanket",
    "name": "Moth-eaten blanket",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 40
    },
    "stats": {
      "speed": 1
    },
    "abilities": [],
    "location": "Ruffians"
  },
  {
    "id": "crusaders_mantle",
    "name": "Crusader's mantle",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 160
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Valadin Roth"
  },
  {
    "id": "hags_shawl",
    "name": "Hag's shawl",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 155
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Witch"
  },
  {
    "id": "savage_pelt",
    "name": "Savage pelt",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 26
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Mauler"
  },
  {
    "id": "mottled_cloak",
    "name": "Mottled cloak",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 283
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Mud golem"
  },
  {
    "id": "diaphanous_wings",
    "name": "Diaphanous wings",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 314
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Haste"
    ],
    "location": "Hive queen"
  },
  {
    "id": "cloak_of_white_winter",
    "name": "Cloak of white winter",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 385
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Baron Greylock"
  },
  {
    "id": "cloak_of_shadows",
    "name": "Cloak of shadows",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 487
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Feint"
    ],
    "location": "Count(special)"
  },
  {
    "id": "golden_fleece",
    "name": "Golden fleece",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 548
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Radiance"
    ],
    "location": "Treasure vault"
  },
  {
    "id": "phoenix_feathers",
    "name": "Phoenix feathers",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 565
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Phoenix"
  },
  {
    "id": "destroyers_drape",
    "name": "Destroyer's drape",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 568
    },
    "stats": {
      "speed": 2,
      "armour": 1
    },
    "abilities": [
      "Backfire"
    ],
    "location": "Inferno"
  },
  {
    "id": "majestic_shoulders",
    "name": "Majestic shoulders",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 397
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Royal regalia set"
    ],
    "location": "Puzzle chest",
    "pathRequirement": "Warrior"
  },
  {
    "id": "sparkcraft_mantle",
    "name": "Sparkcraft mantle",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 509
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Lifespark"
    ],
    "location": "Swamp giant",
    "pathRequirement": "Mage"
  },
  {
    "id": "kaggadours_cloak",
    "name": "Kaggadour's cloak",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 443
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Stone giant"
  },
  {
    "id": "mantle_of_spite",
    "name": "Mantle of spite",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 713
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Curse"
    ],
    "location": "Gargoyle chest",
    "pathRequirement": "Mage"
  },
  {
    "id": "mane_of_the_black_lion",
    "name": "Mane of the Black Lion",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 379
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Nalsa"
  },
  {
    "id": "winter_pelt",
    "name": "Winter pelt",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 359
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Savagery"
    ],
    "location": "King Louis"
  },
  {
    "id": "flame_mantle",
    "name": "Flame mantle",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 377
    },
    "stats": {
      "speed": 2,
      "armour": 1
    },
    "abilities": [
      "Fire aura"
    ],
    "location": "Vesuvius"
  },
  {
    "id": "dragonscale_cloak",
    "name": "Dragonscale cloak",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 708
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Second skin"
    ],
    "location": "Kindle"
  },
  {
    "id": "slipstream_silk",
    "name": "Slipstream silk",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 914
    },
    "stats": {
      "speed": 3,
      "magic": 2
    },
    "abilities": [
      "Surge"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Mage"
  },
  {
    "id": "valiant_spaulders",
    "name": "Valiant spaulders",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 815
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Overpower"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Warrior"
  },
  {
    "id": "spiked_boneguards",
    "name": "Spiked boneguards",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 759
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Flesh golem"
  },
  {
    "id": "broken_wings",
    "name": "Broken wings",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 906
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Bone angel"
  },
  {
    "id": "cloak_of_ceremonies",
    "name": "Cloak of ceremonies",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 892
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Radiance"
    ],
    "location": "Arthurian's vault"
  },
  {
    "id": "stalwart_shoulders",
    "name": "Stalwart shoulders",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 565
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Yorvic"
  },
  {
    "id": "gloom_shade",
    "name": "Gloom shade",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 622
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Steal"
    ],
    "location": "Brothers' Grimm",
    "pathRequirement": "Rogue"
  },
  {
    "id": "pauldrons_of_might",
    "name": "Pauldrons of might",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 727
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Fortitude"
    ],
    "location": "Brothers' Grimm",
    "pathRequirement": "Warrior"
  },
  {
    "id": "cloak_of_the_wind",
    "name": "Cloak of the wind",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 762
    },
    "stats": {
      "speed": 3,
      "armour": 1
    },
    "abilities": [
      "Surge"
    ],
    "location": "Scout",
    "pathRequirement": "Mage"
  },
  {
    "id": "nemesis_shroud",
    "name": "Nemesis shroud",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 765
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Dark pact"
    ],
    "location": "Malcontent"
  },
  {
    "id": "veil_of_dark_synergies",
    "name": "Veil of dark synergies",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 865
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Second wind"
    ],
    "location": "Daarko",
    "pathRequirement": "Mage"
  },
  {
    "id": "spore_shoulders",
    "name": "Spore shoulders",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 845
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Spore cloud"
    ],
    "location": "Decayers",
    "pathRequirement": "Mage"
  },
  {
    "id": "hulking_shoulders",
    "name": "Hulking shoulders",
    "type": "cloak",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 847
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Barbs"
    ],
    "location": "The wrecker",
    "pathRequirement": "Rogue"
  },
  {
    "id": "simple_coif",
    "name": "Simple coif",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 175
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "all_weather_hat",
    "name": "All-weather hat",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 243
    },
    "stats": {
      "speed": 1
    },
    "abilities": [],
    "location": "Weather wizard"
  },
  {
    "id": "rusted_helm",
    "name": "Rusted helm",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 166
    },
    "stats": {
      "speed": 1
    },
    "abilities": [],
    "location": "Skeletons"
  },
  {
    "id": "maulers_maw",
    "name": "Mauler's maw",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 26
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Mauler"
  },
  {
    "id": "trolls_nose_ring",
    "name": "Troll's nose-ring",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 122
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Bridge troll"
  },
  {
    "id": "ramrod_helm",
    "name": "Ramrod helm",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 311
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Haste"
    ],
    "location": "No Hope tinker"
  },
  {
    "id": "footpads_cover",
    "name": "Footpad's cover",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 338
    },
    "stats": {
      "brawn": 2,
      "armour": 1
    },
    "abilities": [],
    "location": "Thievies' guild",
    "pathRequirement": "Rogue"
  },
  {
    "id": "skull_cap",
    "name": "Skull cap",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 287
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Mushroom forest"
  },
  {
    "id": "great_helm",
    "name": "Great helm",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 494
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [],
    "location": "Slime"
  },
  {
    "id": "wyrm_crest",
    "name": "Wyrm crest",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 517
    },
    "stats": {
      "magic": 1,
      "armour": 2
    },
    "abilities": [],
    "location": "Wormwood (normal)"
  },
  {
    "id": "wyrm_crown",
    "name": "Wyrm crown",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 533
    },
    "stats": {
      "magic": 2,
      "armour": 2
    },
    "abilities": [],
    "location": "Wormwood (special)"
  },
  {
    "id": "nightguard_cover",
    "name": "Nightguard cover",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 548
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Steadfast"
    ],
    "location": "Treasure vault"
  },
  {
    "id": "flame_bathed_cowl",
    "name": "Flame-bathed cowl",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 655
    },
    "stats": {
      "brawn": 2,
      "armour": 1
    },
    "abilities": [
      "Sear"
    ],
    "location": "Inferno"
  },
  {
    "id": "jesters_cap",
    "name": "Jester's cap",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 374
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Last laugh"
    ],
    "location": "Jester"
  },
  {
    "id": "masque_of_deceit",
    "name": "Masque of deceit",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 422
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Deceieve"
    ],
    "location": "Count (normal)"
  },
  {
    "id": "pirates_bandanna",
    "name": "Pirate's bandanna",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 716
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [],
    "location": "Kalimari"
  },
  {
    "id": "vanquishers_helm",
    "name": "Vanquisher's helm",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 581
    },
    "stats": {
      "brawn": 2,
      "armour": 2
    },
    "abilities": [
      "Vanquish"
    ],
    "location": "Armoury",
    "pathRequirement": "Warrior"
  },
  {
    "id": "night_watch",
    "name": "Night watch",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 583
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Steadfast"
    ],
    "location": "Raptor pit",
    "pathRequirement": "Rogue"
  },
  {
    "id": "cover_of_darkness",
    "name": "Cover of darkness",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 744
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Evade"
    ],
    "location": "Gargoyle chest",
    "pathRequirement": "Rogue"
  },
  {
    "id": "crown_of_command",
    "name": "Crown of command",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 689
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Command"
    ],
    "location": "Stone giant"
  },
  {
    "id": "crown_of_command_upgrade_1_",
    "name": "Crown of command (upgrade 1)",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 689
    },
    "stats": {
      "brawn": 3,
      "magic": 3
    },
    "abilities": [
      "Command"
    ],
    "location": "Stone giant"
  },
  {
    "id": "crown_of_command_upgrade_2_",
    "name": "Crown of command (upgrade 2)",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 689
    },
    "stats": {
      "brawn": 5,
      "magic": 5
    },
    "abilities": [
      "Command"
    ],
    "location": "Stone giant"
  },
  {
    "id": "tri_horned_hat",
    "name": "Tri-horned hat",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 277
    },
    "stats": {
      "magic": 1,
      "armour": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Left-hook Luke"
  },
  {
    "id": "horns_of_the_bull",
    "name": "Horns of the bull",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 216
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Charge"
    ],
    "location": "Zen"
  },
  {
    "id": "simian_crown",
    "name": "Simian crown",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 359
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Chill touch"
    ],
    "location": "King Louis"
  },
  {
    "id": "desert_keffiyeh",
    "name": "Desert Keffiyeh",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 370
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [],
    "location": "Nasareim"
  },
  {
    "id": "agal_of_shifting_sands",
    "name": "Agal of shifting sands",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 370
    },
    "stats": {
      "magic": 2,
      "armour": 2
    },
    "abilities": [],
    "location": "Nasareim"
  },
  {
    "id": "wreath_of_woe",
    "name": "Wreath of woe",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 346
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [
      "Barbs"
    ],
    "location": "Snapjaw"
  },
  {
    "id": "firewalkers_faceguard",
    "name": "Firewalker's faceguard",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 400
    },
    "stats": {
      "speed": 1,
      "armour": 3
    },
    "abilities": [
      "Overpower"
    ],
    "location": "Magmageddon",
    "pathRequirement": "Warrior"
  },
  {
    "id": "total_eclipse",
    "name": "Total eclipse",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 839
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Vanish"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Rogue"
  },
  {
    "id": "wyvern_jaws",
    "name": "Wyvern jaws",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 776
    },
    "stats": {
      "magic": 3,
      "armour": 2
    },
    "abilities": [],
    "location": "Bone wyvern"
  },
  {
    "id": "knuckle_head",
    "name": "Knuckle head",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 695
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Slam"
    ],
    "location": "Bone construct",
    "pathRequirement": "Warrior"
  },
  {
    "id": "hood_of_night",
    "name": "Hood of night",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 649
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Charm"
    ],
    "location": "Necromancer"
  },
  {
    "id": "enchanted_coif",
    "name": "Enchanted coif",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 677
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Deceive"
    ],
    "location": "Tor knight",
    "pathRequirement": "Mage"
  },
  {
    "id": "forked_crest",
    "name": "Forked crest",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 775
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Charge"
    ],
    "location": "Skeleton horde"
  },
  {
    "id": "bone_headdress",
    "name": "Bone headdress",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 778
    },
    "stats": {
      "magic": 3,
      "armour": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Ghoul pack"
  },
  {
    "id": "cracked_spectacles",
    "name": "Cracked spectacles",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 923
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Focus"
    ],
    "location": "Apprentice"
  },
  {
    "id": "crown_of_ice",
    "name": "Crown of ice",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 874
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Barbs"
    ],
    "location": "Sammain (special)"
  },
  {
    "id": "bone_halo",
    "name": "Bone halo",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 906
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Focus"
    ],
    "location": "Bone angel"
  },
  {
    "id": "black_widow",
    "name": "Black widow",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 929
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Webbed"
    ],
    "location": "Dark Arthurian"
  },
  {
    "id": "diadem_of_mastery",
    "name": "Diadem of mastery",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 664
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Brothers' Grimm",
    "pathRequirement": "Mage"
  },
  {
    "id": "ghouls_collar",
    "name": "Ghoul's collar",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 702
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Ghoulash"
  },
  {
    "id": "budaks_blindfold",
    "name": "Budak's blindfold",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 733
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Second sight"
    ],
    "location": "Budak",
    "pathRequirement": "Rogue"
  },
  {
    "id": "brain_infusers",
    "name": "Brain infusers",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 642
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Lichenstein"
  },
  {
    "id": "the_morgue",
    "name": "The morgue",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 765
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Leech"
    ],
    "location": "Malcontent",
    "pathRequirement": "Mage"
  },
  {
    "id": "cerebral_helm",
    "name": "Cerebral helm",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 765
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Overload"
    ],
    "location": "Death orb",
    "pathRequirement": "Mage"
  },
  {
    "id": "cranium_plate",
    "name": "Cranium plate",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 665
    },
    "stats": {
      "brawn": 2,
      "armour": 3
    },
    "abilities": [
      "Fortitide"
    ],
    "location": "Lord of pain"
  },
  {
    "id": "dread_mask",
    "name": "Dread mask",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 893
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Overpower"
    ],
    "location": "Daarko",
    "pathRequirement": "Warrior"
  },
  {
    "id": "drape_of_shadow",
    "name": "Drape of shadow",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 813
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Chill touch"
    ],
    "location": "Ghasts"
  },
  {
    "id": "thalamus_tiara",
    "name": "Thalamus tiara",
    "type": "head",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 826
    },
    "stats": {
      "speed": 2,
      "magic": 5
    },
    "abilities": [
      "Haste"
    ],
    "location": "Doom orb",
    "pathRequirement": "Mage"
  },
  {
    "id": "embroidered_gloves",
    "name": "Embroidered gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 68
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "rat_bitten_gloves",
    "name": "Rat-bitten gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 161
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Rat swarm"
  },
  {
    "id": "half_digested_gauntlets",
    "name": "Half-digested gauntlets",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 258
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Acid"
    ],
    "location": "Burrower wyrm"
  },
  {
    "id": "masons_gloves",
    "name": "Mason's gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 209
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "First cut"
    ],
    "location": "Crypt chest"
  },
  {
    "id": "stone_fists",
    "name": "Stone fists",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 522
    },
    "stats": {
      "brawn": 2,
      "armour": 1
    },
    "abilities": [],
    "location": "Treasure vault"
  },
  {
    "id": "diamond_gauntlets",
    "name": "Diamond gauntlets",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 540
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Rumbler"
  },
  {
    "id": "vambraces_of_might",
    "name": "Vambraces of might",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 568
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Parry"
    ],
    "location": "Inferno"
  },
  {
    "id": "prophets_handwraps",
    "name": "Prophet's handwraps",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 550
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Jenlar's cabin"
  },
  {
    "id": "nightguard_gloves",
    "name": "Nightguard gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 642
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Steadfast"
    ],
    "location": "Armoury",
    "pathRequirement": "Rogue"
  },
  {
    "id": "nightwalker_gloves",
    "name": "Nightwalker gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 765
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Nightwalker set"
    ],
    "location": "Gargoyle chest",
    "pathRequirement": "Rogue"
  },
  {
    "id": "battlemages_fists",
    "name": "Battlemage's fists",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 414
    },
    "stats": {
      "magic": 3,
      "armour": 3
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Arena champion",
    "pathRequirement": "Mage"
  },
  {
    "id": "barbed_bracers",
    "name": "Barbed bracers",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 346
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Barbs"
    ],
    "location": "Snapjaw"
  },
  {
    "id": "gardeners_gloves",
    "name": "Gardener's gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 516
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Thorns"
    ],
    "location": "Alchemist bonus quest"
  },
  {
    "id": "hydra_scaled_gloves",
    "name": "Hydra-scaled gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 389
    },
    "stats": {
      "magic": 2,
      "armour": 2
    },
    "abilities": [
      "Regrowth"
    ],
    "location": "Snapjaw",
    "pathRequirement": "Mage"
  },
  {
    "id": "hydra_scaled_fists",
    "name": "Hydra-scaled fists",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 418
    },
    "stats": {
      "magic": 3,
      "armour": 2
    },
    "abilities": [
      "Regrowth"
    ],
    "location": "Snapjaw",
    "pathRequirement": "Mage"
  },
  {
    "id": "molten_gauntlets",
    "name": "Molten gauntlets",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 377
    },
    "stats": {
      "brawn": 2,
      "armour": 1
    },
    "abilities": [
      "Fire aura"
    ],
    "location": "Vesuvius",
    "pathRequirement": "Warrior"
  },
  {
    "id": "crimson_cuffs",
    "name": "Crimson cuffs",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 400
    },
    "stats": {
      "speed": 1,
      "magic": 4
    },
    "abilities": [
      "Sear"
    ],
    "location": "Magmageddon"
  },
  {
    "id": "mortuary_gauntlets",
    "name": "Mortuary gauntlets",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 803
    },
    "stats": {
      "speed": 1,
      "armour": 3
    },
    "abilities": [
      "Acid"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Warrior"
  },
  {
    "id": "reapers_fists",
    "name": "Reaper's fists",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 903
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Rogue"
  },
  {
    "id": "bestial_gloves",
    "name": "Bestial gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 620
    },
    "stats": {
      "brawn": 2,
      "armour": 2
    },
    "abilities": [
      "Adrenaline"
    ],
    "location": "Packmaster"
  },
  {
    "id": "gauntlets_of_the_fallen",
    "name": "Gauntlets of the fallen",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 617
    },
    "stats": {
      "brawn": 3,
      "armour": 2
    },
    "abilities": [
      "Finery of the fallen"
    ],
    "location": "Tor knight",
    "pathRequirement": "Warrior"
  },
  {
    "id": "bone_bracers",
    "name": "Bone bracers",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 759
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Flesh golem"
  },
  {
    "id": "branded_bracers",
    "name": "Branded bracers",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 880
    },
    "stats": {
      "brawn": 2,
      "armour": 2
    },
    "abilities": [
      "Regrowth"
    ],
    "location": "Branded brute"
  },
  {
    "id": "tainted_wraps",
    "name": "Tainted wraps",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 912
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [
      "Curse"
    ],
    "location": "Malaise"
  },
  {
    "id": "devourers_grips",
    "name": "Devourer's grips",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 664
    },
    "stats": {
      "speed": 1,
      "magic": 4
    },
    "abilities": [
      "Rust"
    ],
    "location": "Brothers'Grimm",
    "pathRequirement": "Mage"
  },
  {
    "id": "bracelet_of_iron",
    "name": "Bracelet of iron",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 736
    },
    "stats": {
      "brawn": 2,
      "armour": 3
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Ghoulash chains"
  },
  {
    "id": "bracelet_of_fire",
    "name": "Bracelet of fire",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 736
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [
      "Embers"
    ],
    "location": "Ghoulash chains",
    "pathRequirement": "Mage"
  },
  {
    "id": "bracelet_of_fury",
    "name": "Bracelet of fury",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 736
    },
    "stats": {
      "speed": 1,
      "brawn": 4
    },
    "abilities": [
      "Adrenaline"
    ],
    "location": "Ghoulash chains"
  },
  {
    "id": "bracelet_of_power",
    "name": "Bracelet of power",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 702
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [
      "Focus"
    ],
    "location": "Ghoulash",
    "pathRequirement": "Mage"
  },
  {
    "id": "razor_fists",
    "name": "Razor fists",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 722
    },
    "stats": {
      "brawn": 1,
      "armour": 3
    },
    "abilities": [
      "Rake"
    ],
    "location": "Bone giant"
  },
  {
    "id": "abattoir_gloves",
    "name": "Abattoir gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 642
    },
    "stats": {
      "speed": 1,
      "magic": 4
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Lichenstein",
    "pathRequirement": "Mage"
  },
  {
    "id": "silk_robe",
    "name": "Silk robe",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 68
    },
    "stats": {
      "magic": 1
    },
    "abilities": [],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "goblin_leathers",
    "name": "Goblin leathers",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 150
    },
    "stats": {
      "armour": 1
    },
    "abilities": [],
    "location": "Goblin"
  },
  {
    "id": "huntsmans_jerkin",
    "name": "Huntsman's jerkin",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 228
    },
    "stats": {
      "armour": 1
    },
    "abilities": [],
    "location": "Huntsman"
  },
  {
    "id": "studded_leather",
    "name": "Studded leather",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 125
    },
    "stats": {
      "armour": 2
    },
    "abilities": [],
    "location": "Were rat"
  },
  {
    "id": "rain_soaked_robe",
    "name": "Rain-soaked robe",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 243
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Weather wizard"
  },
  {
    "id": "web_coated_jerkin",
    "name": "Web-coated jerkin",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 206
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Webbed"
    ],
    "location": "Water cave"
  },
  {
    "id": "spindlesilk_mantle",
    "name": "Spindlesilk mantle",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 91
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Spindlesilk set"
    ],
    "location": "Spindle"
  },
  {
    "id": "crusaders_vestments",
    "name": "Crusader's vestments",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 160
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Valadin Roth"
  },
  {
    "id": "hellfire_robes",
    "name": "Hellfire robes",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 133
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Changeling"
  },
  {
    "id": "duskleaf_doubloon",
    "name": "Duskleaf doubloon",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 80
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Zalladrel"
  },
  {
    "id": "chitinous_carapace",
    "name": "Chitinous carapace",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 368
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Kerklick"
  },
  {
    "id": "patchwork_jerkin",
    "name": "Patchwork jerkin",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 374
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Evade"
    ],
    "location": "Jester"
  },
  {
    "id": "gown_of_midnight",
    "name": "Gown of midnight",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 445
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Evade"
    ],
    "location": "Elvera"
  },
  {
    "id": "sanguine_gown",
    "name": "Sanguine gown",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 460
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Evade"
    ],
    "location": "Clymonistra"
  },
  {
    "id": "cinders_gown",
    "name": "Cinder's gown",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 655
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [
      "Sear"
    ],
    "location": "Cinders",
    "pathRequirement": "Mage"
  },
  {
    "id": "scorched_tunic",
    "name": "Scorched tunic",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 568
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Inferno"
  },
  {
    "id": "nightwalker_tunic",
    "name": "Nightwalker tunic",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 497
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Nightwalker set"
    ],
    "location": "Boggart",
    "pathRequirement": "Rogue"
  },
  {
    "id": "vigilant_chestguard",
    "name": "Vigilant chestguard",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 509
    },
    "stats": {
      "speed": 1,
      "armour": 3
    },
    "abilities": [],
    "location": "Swamp giant",
    "pathRequirement": "Warrior"
  },
  {
    "id": "scaled_vest",
    "name": "Scaled vest",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 452
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Swamp legs"
    ],
    "location": "Angler's cave"
  },
  {
    "id": "ink_stained_vest",
    "name": "Ink-stained vest",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 716
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [],
    "location": "Kalimari"
  },
  {
    "id": "navigators_waistcoat",
    "name": "Navigator's waistcoat",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 544
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Leviathan"
  },
  {
    "id": "channelers_robes",
    "name": "Channeler's robes",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 434
    },
    "stats": {
      "magic": 3,
      "armour": 2
    },
    "abilities": [
      "Focus"
    ],
    "location": "Raptor pit",
    "pathRequirement": "Mage"
  },
  {
    "id": "lincoln_green",
    "name": "Lincoln green",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 590
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Raptor pit",
    "pathRequirement": "Warrior"
  },
  {
    "id": "skulkers_coat",
    "name": "Skulker's coat",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 583
    },
    "stats": {
      "speed": 1,
      "armour": 3
    },
    "abilities": [
      "Evade"
    ],
    "location": "Raptor pit",
    "pathRequirement": "Rogue"
  },
  {
    "id": "spellplate",
    "name": "Spellplate",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 598
    },
    "stats": {
      "speed": 1,
      "armour": 3
    },
    "abilities": [
      "Focus"
    ],
    "location": "Armoury"
  },
  {
    "id": "stone_coat",
    "name": "Stone coat",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 706
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Gargoyle chest",
    "pathRequirement": "Warrior"
  },
  {
    "id": "breastplate_of_the_bull",
    "name": "Breastplate of the bull",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 216
    },
    "stats": {
      "brawn": 3,
      "armour": 2
    },
    "abilities": [
      "Charge"
    ],
    "location": "Zen"
  },
  {
    "id": "hunters_hide",
    "name": "Hunter's hide",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 379
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Nalsa"
  },
  {
    "id": "the_cage",
    "name": "The cage",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 414
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Iron will"
    ],
    "location": "Arena champion",
    "pathRequirement": "Warrior"
  },
  {
    "id": "dragonscale_mail",
    "name": "Dragonscale mail",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 708
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Second skin"
    ],
    "location": "Kindle",
    "pathRequirement": "Warrior"
  },
  {
    "id": "raiders_tunic",
    "name": "Raider's tunic",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 803
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Retaliation"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Warrior"
  },
  {
    "id": "slipstream_gown",
    "name": "Slipstream gown",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 881
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Overload"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Mage"
  },
  {
    "id": "confessors_coat",
    "name": "Confessor's coat",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 903
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Fortitude"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Rogue"
  },
  {
    "id": "titan_plate",
    "name": "Titan plate",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 730
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Bone giants"
  },
  {
    "id": "deathgrip_robes",
    "name": "Deathgrip robes",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 770
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Corruption"
    ],
    "location": "Rotterghast"
  },
  {
    "id": "lions_tabard",
    "name": "Lion's tabard",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 892
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Arthurian's vault"
  },
  {
    "id": "skullplate",
    "name": "Skullplate",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 906
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Bone angel"
  },
  {
    "id": "funeral_gown",
    "name": "Funeral gown",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 916
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [
      "Charm"
    ],
    "location": "Yorvic"
  },
  {
    "id": "redguards_tabard",
    "name": "Redguard's tabard",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 735
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Iron will"
    ],
    "location": "Special achievement"
  },
  {
    "id": "stalkers_jerkin",
    "name": "Stalker's jerkin",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 733
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Evade"
    ],
    "location": "Budak",
    "pathRequirement": "Rogue"
  },
  {
    "id": "silleers_robe",
    "name": "Silleer's robe",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 570
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Curse"
    ],
    "location": "Silleer",
    "pathRequirement": "Mage"
  },
  {
    "id": "plate_of_the_fallen",
    "name": "Plate of the fallen",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 719
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "finery of the fallen"
    ],
    "location": "Tor knight",
    "pathRequirement": "Warrior"
  },
  {
    "id": "funeral_wraps",
    "name": "Funeral wraps",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 765
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Malcontent"
  },
  {
    "id": "pacemaker",
    "name": "Pacemaker",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 716
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Kick start"
    ],
    "location": "The blob",
    "pathRequirement": "Warrior"
  },
  {
    "id": "shadow_bindings",
    "name": "Shadow bindings",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 631
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Evade"
    ],
    "location": "Mage hunter",
    "pathRequirement": "Rogue"
  },
  {
    "id": "dark_slayer_vest",
    "name": "Dark slayer vest",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 843
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Daarko",
    "pathRequirement": "Rogue"
  },
  {
    "id": "decayers_wraps",
    "name": "Decayer's wraps",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 845
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Disease"
    ],
    "location": "Decayers"
  },
  {
    "id": "beasts_harness",
    "name": "Beast's harness",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 801
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "The wrecker",
    "pathRequirement": "Warrior"
  },
  {
    "id": "beasts_backbone",
    "name": "Beast's backbone",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 847
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Savagery"
    ],
    "location": "The wrecker",
    "pathRequirement": "Rogue"
  },
  {
    "id": "bloodied_chestguard",
    "name": "Bloodied chestguard",
    "type": "chest",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 882
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Sannrah",
    "pathRequirement": "Warrior"
  },
  {
    "id": "buckled_boots",
    "name": "Buckled boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 175
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "spindlesilk_boots",
    "name": "Spindlesilk boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 110
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Spindlesilk set"
    ],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "crows_feet",
    "name": "Crow's feet",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 204
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Scarecrow"
  },
  {
    "id": "goblin_kickers",
    "name": "Goblin kickers",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 199
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [],
    "location": "Hobgoblin"
  },
  {
    "id": "rat_skin_boots",
    "name": "Rat-skin boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 260
    },
    "stats": {
      "speed": 1
    },
    "abilities": [],
    "location": "Goblin chief"
  },
  {
    "id": "dusty_footpads",
    "name": "Dusty footpads",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 206
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Water cave"
  },
  {
    "id": "ruby_slippers",
    "name": "Ruby slippers",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 155
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Click your heels"
    ],
    "location": "Witch"
  },
  {
    "id": "boar_hide_boots",
    "name": "Boar-hide boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 44
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Steadfast"
    ],
    "location": "Humbaroth"
  },
  {
    "id": "reed_woven_sandals",
    "name": "Reed-woven sandals",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 122
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Bridge troll"
  },
  {
    "id": "rune_forged_greaves",
    "name": "Rune-forged greaves",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 311
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [],
    "location": "No Hope tinker"
  },
  {
    "id": "boots_of_swift_flight",
    "name": "Boots of swift flight",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 338
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [],
    "location": "Thievies' guild",
    "pathRequirement": "Rogue"
  },
  {
    "id": "deerskin_boots",
    "name": "Deerskin boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 287
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [],
    "location": "Mushroom forest"
  },
  {
    "id": "sludge_waders",
    "name": "Sludge waders",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 494
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Slime"
  },
  {
    "id": "barons_boots",
    "name": "Baron's boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 385
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Baron Greylock"
  },
  {
    "id": "velvet_slippers",
    "name": "Velvet slippers",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 487
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [
      "Haste"
    ],
    "location": "Count (special)"
  },
  {
    "id": "scarab_sandals",
    "name": "Scarab sandals",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 446
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [],
    "location": "Treasure cave",
    "pathRequirement": "Mage"
  },
  {
    "id": "bright_greaves",
    "name": "Bright greaves",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 497
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Steadfast"
    ],
    "location": "Boggart"
  },
  {
    "id": "sanguine_slippers",
    "name": "Sanguine slippers",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 497
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Boggart",
    "pathRequirement": "Mage"
  },
  {
    "id": "captains_boots",
    "name": "Captain's boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 716
    },
    "stats": {
      "speed": 2,
      "armour": 1
    },
    "abilities": [],
    "location": "Kalimari"
  },
  {
    "id": "scouts_longboots",
    "name": "Scout's longboots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 590
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Raptor pit",
    "pathRequirement": "Warrior"
  },
  {
    "id": "quicksilver_boots",
    "name": "Quicksilver boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 434
    },
    "stats": {
      "speed": 2,
      "magic": 1
    },
    "abilities": [
      "Quicksilver"
    ],
    "location": "Raptor pit",
    "pathRequirement": "Mage"
  },
  {
    "id": "majestic_greaves",
    "name": "Majestic greaves",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 581
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Royal regalia set"
    ],
    "location": "Armoury",
    "pathRequirement": "Warrior"
  },
  {
    "id": "shadow_treads",
    "name": "Shadow treads",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 744
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Sidestep"
    ],
    "location": "Gargoyle chest",
    "pathRequirement": "Rogue"
  },
  {
    "id": "logans_runners",
    "name": "Logan's runners",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 394
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Sidestep"
    ],
    "location": "Logan",
    "pathRequirement": "Rogue"
  },
  {
    "id": "barkskin_greaves",
    "name": "Barkskin greaves",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 341
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Steadfast"
    ],
    "location": "Barkrot"
  },
  {
    "id": "marsh_striders",
    "name": "Marsh striders",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 389
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Hydra (normal)"
  },
  {
    "id": "marsh_stalkers",
    "name": "Marsh stalkers",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 418
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Hydra (special)"
  },
  {
    "id": "boots_of_shielding",
    "name": "Boots of shielding",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 881
    },
    "stats": {
      "speed": 2,
      "armour": 1
    },
    "abilities": [
      "Deflect"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Mage"
  },
  {
    "id": "barbarous_boots",
    "name": "Barbarous boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 815
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Warrior"
  },
  {
    "id": "vagabond_boots",
    "name": "Vagabond boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 620
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Steadfast"
    ],
    "location": "Packmaster"
  },
  {
    "id": "heralds_spurs",
    "name": "Herald's spurs",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 617
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Charge"
    ],
    "location": "Tor knight"
  },
  {
    "id": "ebon_boots",
    "name": "Ebon boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 649
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Necromancer"
  },
  {
    "id": "bewitched_boots",
    "name": "Bewitched boots",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 802
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Tomb"
  },
  {
    "id": "twisted_treads",
    "name": "Twisted treads",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 912
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Malaise"
  },
  {
    "id": "rumble_thumpers",
    "name": "Rumble thumpers",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 616
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "The blob"
  },
  {
    "id": "elemental_greaves",
    "name": "Elemental greaves",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 865
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Fire aura"
    ],
    "location": "Daarko",
    "pathRequirement": "Mage"
  },
  {
    "id": "boots_of_black_fortune",
    "name": "Boots of black fortune",
    "type": "feet",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 893
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Feint"
    ],
    "location": "Daarko",
    "pathRequirement": "Warrior"
  },
  {
    "id": "the_apprentice",
    "name": "The apprentice",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Prologue"
  },
  {
    "id": "notched_blade",
    "name": "Notched blade",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 175
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "curved_blade",
    "name": "Curved blade",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 199
    },
    "stats": {
      "speed": 1
    },
    "abilities": [],
    "location": "Hobgoblin"
  },
  {
    "id": "goblin_hewer",
    "name": "Goblin hewer",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 82
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Woodsman"
  },
  {
    "id": "huntsmans_axe",
    "name": "Huntsman's axe",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 228
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [],
    "location": "Huntsman"
  },
  {
    "id": "meat_cleaver",
    "name": "Meat cleaver",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 260
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Goblin chief"
  },
  {
    "id": "crones_dagger",
    "name": "Crone's dagger",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 40
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Ruffians"
  },
  {
    "id": "gilberts_club",
    "name": "Gilbert's club",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 40
    },
    "stats": {
      "brawn": 3
    },
    "abilities": [],
    "location": "Ruffians"
  },
  {
    "id": "leaders_edge",
    "name": "Leader's edge",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 125
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [],
    "location": "Were rat"
  },
  {
    "id": "acid_coated_battle_axe",
    "name": "Acid-coated battle axe",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 258
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Acid"
    ],
    "location": "Burrower wyrm"
  },
  {
    "id": "venomous_fang",
    "name": "Venomous fang",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 91
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Venom"
    ],
    "location": "Spindle"
  },
  {
    "id": "nightbringer",
    "name": "Nightbringer",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 52
    },
    "stats": {
      "speed": 1,
      "brawn": 4
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Noldor (special)"
  },
  {
    "id": "nightfall",
    "name": "Nightfall",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 52
    },
    "stats": {
      "speed": 1,
      "magic": 4
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Noldor (special)"
  },
  {
    "id": "ancient_sword",
    "name": "Ancient sword",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 222
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Skeleton knight"
  },
  {
    "id": "dirk_of_deceit",
    "name": "Dirk of deceit",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 271
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Corruption"
    ],
    "location": "Fetch"
  },
  {
    "id": "silver_silence",
    "name": "Silver silence",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 271
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Fetch"
  },
  {
    "id": "skullbreaker",
    "name": "Skullbreaker",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 44
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Pound"
    ],
    "location": "Humbaroth"
  },
  {
    "id": "dark_crystal",
    "name": "Dark crystal",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 311
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Venom"
    ],
    "location": "No Hope tinker",
    "pathRequirement": "Rogue"
  },
  {
    "id": "black_jack",
    "name": "Black jack",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 338
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Slam"
    ],
    "location": "Thievies' guild",
    "pathRequirement": "Rogue"
  },
  {
    "id": "abyssal_blade",
    "name": "Abyssal blade",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 432
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Sea spray Steve",
    "pathRequirement": "Rogue"
  },
  {
    "id": "ashen_staff",
    "name": "Ashen staff",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 283
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [],
    "location": "Mud golem"
  },
  {
    "id": "shiny_dirk",
    "name": "Shiny dirk",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 287
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [],
    "location": "Mushroom forest"
  },
  {
    "id": "trog_spear",
    "name": "Trog spear",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 327
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [],
    "location": "Trogs",
    "pathRequirement": "Warrior"
  },
  {
    "id": "black_fang",
    "name": "Black fang",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 517
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Parry"
    ],
    "location": "Wormwood (normal)"
  },
  {
    "id": "lacerator",
    "name": "Lacerator",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 533
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Parry"
    ],
    "location": "Wormwood (special)"
  },
  {
    "id": "bone_scythe",
    "name": "Bone scythe",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 368
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Retaliation"
    ],
    "location": "Kerklick"
  },
  {
    "id": "winters_bite",
    "name": "Winter's bite",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 385
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Baron Greylock",
    "pathRequirement": "Warrior"
  },
  {
    "id": "blood_harvest",
    "name": "Blood harvest",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 455
    },
    "stats": {
      "speed": 2,
      "magic": 1
    },
    "abilities": [
      "Leech"
    ],
    "location": "Lady Roe",
    "pathRequirement": "Mage"
  },
  {
    "id": "silk_cut",
    "name": "Silk cut",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 487
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Riposte"
    ],
    "location": "Count (special)",
    "pathRequirement": "Rogue"
  },
  {
    "id": "the_rock",
    "name": "The rock",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 540
    },
    "stats": {
      "brawn": 4
    },
    "abilities": [
      "Slam"
    ],
    "location": "Rumbler",
    "pathRequirement": "Warrior"
  },
  {
    "id": "illumanti_rod",
    "name": "Illumanti rod",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 548
    },
    "stats": {
      "speed": 2,
      "magic": 1
    },
    "abilities": [
      "Overload"
    ],
    "location": "Treasure vault",
    "pathRequirement": "Mage"
  },
  {
    "id": "phoenix_claw",
    "name": "Phoenix claw",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 565
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Phoenix"
  },
  {
    "id": "lucky_fishing_rod",
    "name": "Lucky fishing rod",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 452
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Angler's cave"
  },
  {
    "id": "magicians_crook",
    "name": "Magician's crook",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 446
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Radiance"
    ],
    "location": "Treasure cave",
    "pathRequirement": "Mage"
  },
  {
    "id": "trident_of_the_seven_seas",
    "name": "Trident of the seven seas",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 479
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [],
    "location": "Wreekin"
  },
  {
    "id": "dark_malice",
    "name": "Dark malice",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 506
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Impale"
    ],
    "location": "Scorpios",
    "pathRequirement": "Warrior"
  },
  {
    "id": "scorpion_stinger",
    "name": "Scorpion stinger",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 506
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Venom"
    ],
    "location": "Scorpios",
    "pathRequirement": "Rogue"
  },
  {
    "id": "betsy_blue_anchor",
    "name": "Betsy blue anchor",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 544
    },
    "stats": {
      "speed": 1,
      "brawn": 4
    },
    "abilities": [
      "Stun"
    ],
    "location": "Leviathan",
    "pathRequirement": "Warrior"
  },
  {
    "id": "spellbreaker",
    "name": "Spellbreaker",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 567
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Disrupt"
    ],
    "location": "Armoury",
    "pathRequirement": "Rogue"
  },
  {
    "id": "frenzy",
    "name": "Frenzy",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 581
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Cleave"
    ],
    "location": "Armoury",
    "pathRequirement": "Warrior"
  },
  {
    "id": "swordbreaker",
    "name": "Swordbreaker",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 593
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Retaliation"
    ],
    "location": "Armoury",
    "pathRequirement": "Mage"
  },
  {
    "id": "pulveriser",
    "name": "Pulveriser",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 706
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Gargoyle chest",
    "pathRequirement": "Warrior"
  },
  {
    "id": "torturers_rod",
    "name": "Torturer's rod",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 713
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Stun"
    ],
    "location": "Gargoyle chest",
    "pathRequirement": "Mage"
  },
  {
    "id": "buccaneers_rapier",
    "name": "Buccaneer's rapier",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 277
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Riposte"
    ],
    "location": "Left-hook Luke"
  },
  {
    "id": "nalsas_claws",
    "name": "Nalsa's claws",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 379
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Nalsa"
  },
  {
    "id": "ebony",
    "name": "Ebony",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 370
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Ebony and ivory"
    ],
    "location": "Nasareim"
  },
  {
    "id": "brawlers_shiv",
    "name": "Brawler's shiv",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 414
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Venom"
    ],
    "location": "Arena champion",
    "pathRequirement": "Rogue"
  },
  {
    "id": "fire_brand",
    "name": "Fire brand",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 377
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Fire aura"
    ],
    "location": "Vesuvius",
    "pathRequirement": "Mage"
  },
  {
    "id": "burning_heretic",
    "name": "Burning heretic",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 400
    },
    "stats": {
      "speed": 3,
      "brawn": 3
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Magmageddon",
    "pathRequirement": "Rogue"
  },
  {
    "id": "velocifero",
    "name": "Velocifero",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 729
    },
    "stats": {
      "speed": 3,
      "brawn": 3
    },
    "abilities": [
      "Riposte"
    ],
    "location": "Shadowstalker"
  },
  {
    "id": "sliver_of_shadow",
    "name": "Sliver of shadow",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 839
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Chill touch"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Rogue"
  },
  {
    "id": "talanosts_edge",
    "name": "Talanost's edge",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 903
    },
    "stats": {
      "speed": 3,
      "brawn": 5
    },
    "abilities": [
      "Sear"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Rogue"
  },
  {
    "id": "wicked_claw",
    "name": "Wicked claw",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 776
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Bone wyvern"
  },
  {
    "id": "bone_claw",
    "name": "Bone claw",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 695
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Rake"
    ],
    "location": "Bone construct"
  },
  {
    "id": "lasher",
    "name": "Lasher",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 620
    },
    "stats": {
      "speed": 3,
      "brawn": 3
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Packmaster"
  },
  {
    "id": "tainted_striker",
    "name": "Tainted striker",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 677
    },
    "stats": {
      "speed": 3,
      "magic": 3
    },
    "abilities": [
      "Corruption"
    ],
    "location": "Tor knight",
    "pathRequirement": "Mage"
  },
  {
    "id": "spinal_tap",
    "name": "Spinal tap",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 759
    },
    "stats": {
      "speed": 3,
      "brawn": 4
    },
    "abilities": [
      "Impale"
    ],
    "location": "Flesh golem",
    "pathRequirement": "Warrior"
  },
  {
    "id": "bone_gavel",
    "name": "Bone gavel",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 730
    },
    "stats": {
      "speed": 3,
      "brawn": 4
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Bone giants",
    "pathRequirement": "Warrior"
  },
  {
    "id": "tenacity",
    "name": "Tenacity",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 770
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Rotterghast",
    "pathRequirement": "Rogue"
  },
  {
    "id": "scorn",
    "name": "Scorn",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 912
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Malaise",
    "pathRequirement": "Rogue"
  },
  {
    "id": "ever_sharp",
    "name": "Ever-sharp",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 916
    },
    "stats": {
      "speed": 3,
      "brawn": 4
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Yorvic",
    "pathRequirement": "Warrior"
  },
  {
    "id": "deep_freeze",
    "name": "Deep freeze",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 869
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Stun"
    ],
    "location": "Sammain (normal)"
  },
  {
    "id": "hoarfrost",
    "name": "Hoarfrost",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 874
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Chill touch"
    ],
    "location": "Sammain (special)"
  },
  {
    "id": "grimm_reaper",
    "name": "Grimm reaper",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 727
    },
    "stats": {
      "speed": 3,
      "brawn": 5
    },
    "abilities": [
      "Brutality"
    ],
    "location": "Brothers' Grimm",
    "pathRequirement": "Warrior"
  },
  {
    "id": "serenity",
    "name": "Serenity",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 733
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Budak",
    "pathRequirement": "Rogue"
  },
  {
    "id": "wand_of_lightning",
    "name": "Wand of lightning",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 570
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Shock!"
    ],
    "location": "Silleer",
    "pathRequirement": "Mage"
  },
  {
    "id": "pain_in_chains",
    "name": "Pain in chains",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 722
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Pound"
    ],
    "location": "Bone giants"
  },
  {
    "id": "frost_burn",
    "name": "Frost burn",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 584
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Chilblain",
    "pathRequirement": "Mage"
  },
  {
    "id": "belching_bludger",
    "name": "Belching bludger",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 616
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Disease"
    ],
    "location": "The blob"
  },
  {
    "id": "morticians_scalpel",
    "name": "Mortician's scalpel",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 642
    },
    "stats": {
      "speed": 3,
      "brawn": 4
    },
    "abilities": [
      "Disease"
    ],
    "location": "Lichenstein",
    "pathRequirement": "Rogue"
  },
  {
    "id": "tempests_fury",
    "name": "Tempest's fury",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 754
    },
    "stats": {
      "speed": 2,
      "magic": 5
    },
    "abilities": [
      "Windblast"
    ],
    "location": "Flay"
  },
  {
    "id": "blood_crescent",
    "name": "Blood crescent",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 631
    },
    "stats": {
      "speed": 3,
      "brawn": 5
    },
    "abilities": [
      "Cleave"
    ],
    "location": "Mage hunter",
    "pathRequirement": "Warrior"
  },
  {
    "id": "orb_stinger",
    "name": "Orb stinger",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 665
    },
    "stats": {
      "speed": 3,
      "brawn": 4
    },
    "abilities": [
      "Shock!"
    ],
    "location": "Death orb",
    "pathRequirement": "Rogue"
  },
  {
    "id": "tricksters_maul",
    "name": "Trickster's maul",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 711
    },
    "stats": {
      "speed": 3,
      "brawn": 4
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Lord of pain"
  },
  {
    "id": "shadow_woven_kris",
    "name": "Shadow-woven kris",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 843
    },
    "stats": {
      "speed": 3,
      "brawn": 5
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Daarko",
    "pathRequirement": "Rogue"
  },
  {
    "id": "sacrum_of_carnage",
    "name": "Sacrum of carnage",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 847
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Fatal blow"
    ],
    "location": "The wrecker",
    "pathRequirement": "Rogue"
  },
  {
    "id": "aged_acronium",
    "name": "Aged acronium",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 878
    },
    "stats": {
      "speed": 2,
      "magic": 5
    },
    "abilities": [
      "Rust"
    ],
    "location": "The wrecker",
    "pathRequirement": "Mage"
  },
  {
    "id": "the_sting",
    "name": "The sting",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 868
    },
    "stats": {
      "speed": 3,
      "brawn": 5
    },
    "abilities": [
      "Impale"
    ],
    "location": "Scarrons",
    "pathRequirement": "Warrior"
  },
  {
    "id": "fortunes_favour",
    "name": "Fortune's favour",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 871
    },
    "stats": {
      "speed": 2,
      "magic": 5
    },
    "abilities": [
      "Radiance"
    ],
    "location": "Sannrah",
    "pathRequirement": "Mage"
  },
  {
    "id": "retribution",
    "name": "Retribution",
    "type": "mainHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 882
    },
    "stats": {
      "speed": 3,
      "brawn": 6
    },
    "abilities": [
      "Feral fury"
    ],
    "location": "Sannrah",
    "pathRequirement": "Warrior"
  },
  {
    "id": "scaled_defender",
    "name": "Scaled defender",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 191
    },
    "stats": {
      "brawn": 2,
      "armour": 1
    },
    "abilities": [],
    "location": "Vendor/Tithebury Cross"
  },
  {
    "id": "murder_of_crows",
    "name": "Murder of crows",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 204
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [],
    "location": "Scarecrow"
  },
  {
    "id": "crocks_tooth",
    "name": "Crock's tooth",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 118
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [],
    "location": "Crocodile"
  },
  {
    "id": "rennies_slicer",
    "name": "Rennie's slicer",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 55
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "First cut"
    ],
    "location": "Rennie the rat"
  },
  {
    "id": "stone_shield",
    "name": "Stone shield",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 41
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Slam"
    ],
    "location": "Noldor (normal)"
  },
  {
    "id": "essence_of_shadow",
    "name": "Essence of shadow",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 43
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Chill touch"
    ],
    "location": "Shadow"
  },
  {
    "id": "ghoul_claw",
    "name": "Ghoul claw",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 106
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Ghouls"
  },
  {
    "id": "dented_buckler",
    "name": "Dented buckler",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 166
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Skeletons"
  },
  {
    "id": "spiders_spinneret",
    "name": "Spider's spinneret",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 179
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Webbed"
    ],
    "location": "Spiders"
  },
  {
    "id": "rage_claw",
    "name": "Rage claw",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 26
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Mauler"
  },
  {
    "id": "ardent_edge",
    "name": "Ardent edge",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 494
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Parry"
    ],
    "location": "Slime"
  },
  {
    "id": "champions_blade",
    "name": "Champion's blade",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 283
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Mud golem"
  },
  {
    "id": "ridgeback",
    "name": "Ridgeback",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 517
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Slam"
    ],
    "location": "Wormwood (normal)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "razorback",
    "name": "Razorback",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 533
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Slam"
    ],
    "location": "Wormwood (special)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "rockbiter",
    "name": "Rockbiter",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 522
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Treasure vault"
  },
  {
    "id": "shrink_ray",
    "name": "Shrink ray",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 477
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Zapped!"
    ],
    "location": "Hal Arbuckle"
  },
  {
    "id": "book_of_black_deeds",
    "name": "Book of black deeds",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 445
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [],
    "location": "Treasure vault",
    "pathRequirement": "Mage"
  },
  {
    "id": "vampires_kiss",
    "name": "Vampire's kiss",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 422
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Leech"
    ],
    "location": "Treasure vault"
  },
  {
    "id": "ivory_r_w_",
    "name": "Ivory (R+W)",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 333
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Ebony and ivory"
    ],
    "location": "Treasure cave"
  },
  {
    "id": "t_bone_wand",
    "name": "T-Bone wand",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 449
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Bolt"
    ],
    "location": "Wreekin",
    "pathRequirement": "Mage"
  },
  {
    "id": "wreekin_net",
    "name": "Wreekin net",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 479
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Webbed"
    ],
    "location": "Wreekin"
  },
  {
    "id": "twin_furies",
    "name": "Twin furies",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 452
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [],
    "location": "Angler's cave",
    "pathRequirement": "Rogue"
  },
  {
    "id": "blackout",
    "name": "Blackout",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 509
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Stun"
    ],
    "location": "Swamp giant"
  },
  {
    "id": "tome_of_deep_thought",
    "name": "Tome of deep thought",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 550
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [],
    "location": "Jenlar's cabin",
    "pathRequirement": "Mage"
  },
  {
    "id": "deliverance",
    "name": "Deliverance",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 590
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Raptor pit",
    "pathRequirement": "Warrior"
  },
  {
    "id": "witching_hour",
    "name": "Witching hour",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 583
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Bull's eye"
    ],
    "location": "Raptor pit",
    "pathRequirement": "Rogue"
  },
  {
    "id": "ebenezers_spellbook",
    "name": "Ebenezer's spellbook",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 434
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Sear"
    ],
    "location": "Raptor pit",
    "pathRequirement": "Mage"
  },
  {
    "id": "st_elmos_fire",
    "name": "St Elmo's fire",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 544
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Leviathan"
  },
  {
    "id": "vorpal_sword",
    "name": "Vorpal sword",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 567
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Vanquish"
    ],
    "location": "Armoury",
    "pathRequirement": "Rogue"
  },
  {
    "id": "dour_claws",
    "name": "Dour claws",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 706
    },
    "stats": {
      "speed": 1,
      "brawn": 4
    },
    "abilities": [
      "Rake"
    ],
    "location": "Gargoyle chest",
    "pathRequirement": "Warrior"
  },
  {
    "id": "tome_of_intellect",
    "name": "Tome of intellect",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 713
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Focus"
    ],
    "location": "Gargoyle chest",
    "pathRequirement": "Mage"
  },
  {
    "id": "stone_crescent",
    "name": "Stone crescent",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 443
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Slam"
    ],
    "location": "Stone giant",
    "pathRequirement": "Warrior"
  },
  {
    "id": "left_hook",
    "name": "Left hook",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 277
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Left-hook Luke"
  },
  {
    "id": "deathstrike",
    "name": "Deathstrike",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 394
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Bull's eye"
    ],
    "location": "Logan"
  },
  {
    "id": "sprig_of_corruption",
    "name": "Sprig of corruption",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 341
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Corruption"
    ],
    "location": "Barkrot"
  },
  {
    "id": "spine_tooth",
    "name": "Spine tooth",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 346
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Snapjaw",
    "pathRequirement": "Rogue"
  },
  {
    "id": "hydras_wing",
    "name": "Hydra's wing",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 389
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Deflect"
    ],
    "location": "Hydra (normal)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "hydras_guard",
    "name": "Hydra's guard",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 418
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Deflect"
    ],
    "location": "Hydra (special)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "dragonslayer",
    "name": "Dragonslayer",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 708
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Kindle"
  },
  {
    "id": "shadowblade",
    "name": "Shadowblade",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 729
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Retaliation"
    ],
    "location": "Shadowstalker"
  },
  {
    "id": "talanosts_wall",
    "name": "Talanost's wall",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 803
    },
    "stats": {
      "speed": 2,
      "armour": 5
    },
    "abilities": [
      "Deflect"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Warrior"
  },
  {
    "id": "talanosts_reach",
    "name": "Talanost's reach",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 881
    },
    "stats": {
      "speed": 3,
      "magic": 4
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Mage"
  },
  {
    "id": "tor_shield",
    "name": "Tor shield",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 617
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Deflect"
    ],
    "location": "Tor knight"
  },
  {
    "id": "spite",
    "name": "Spite",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 649
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Venom"
    ],
    "location": "Necromancer"
  },
  {
    "id": "iron_curtain",
    "name": "Iron curtain",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 775
    },
    "stats": {
      "brawn": 3,
      "armour": 2
    },
    "abilities": [
      "Iron will"
    ],
    "location": "Skeleton horde",
    "pathRequirement": "Warrior"
  },
  {
    "id": "chains_of_binding",
    "name": "Chains of binding",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 778
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Shackle"
    ],
    "location": "Ghouls",
    "pathRequirement": "Mage"
  },
  {
    "id": "shallow_grave",
    "name": "Shallow grave",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 827
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Tomb robber"
  },
  {
    "id": "raven_eye",
    "name": "Raven eye",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 834
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Bolt"
    ],
    "location": "Dark ranger"
  },
  {
    "id": "witchs_finger",
    "name": "Witch's finger",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 869
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Curse"
    ],
    "location": "Sammain (normal)"
  },
  {
    "id": "meat_grinder",
    "name": "Meat grinder",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 891
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Pound"
    ],
    "location": "Clockwerk"
  },
  {
    "id": "steel_gear_solid",
    "name": "Steel gear solid",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 891
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Retaliation"
    ],
    "location": "Clockwerk",
    "pathRequirement": "Warrior"
  },
  {
    "id": "justice",
    "name": "Justice",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 892
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Arthurian's vault"
  },
  {
    "id": "twilight_claw",
    "name": "Twilight claw",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 929
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Rake"
    ],
    "location": "Dark arthurian"
  },
  {
    "id": "black_death",
    "name": "Black death",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 622
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Brothers' Grimm",
    "pathRequirement": "Rogue"
  },
  {
    "id": "grasping_grimm",
    "name": "Grasping grimm",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 664
    },
    "stats": {
      "speed": 3,
      "magic": 3
    },
    "abilities": [
      "Rake"
    ],
    "location": "Brothers'Grimm",
    "pathRequirement": "Mage"
  },
  {
    "id": "grimoire_of_entropy",
    "name": "Grimoire of entropy",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 570
    },
    "stats": {
      "speed": 3,
      "magic": 3
    },
    "abilities": [
      "Sear"
    ],
    "location": "Silleer",
    "pathRequirement": "Mage"
  },
  {
    "id": "dark_tower",
    "name": "Dark tower",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 719
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Impale"
    ],
    "location": "Tor knight",
    "pathRequirement": "Warrior"
  },
  {
    "id": "thunder_hammer",
    "name": "Thunder hammer",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 719
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Shock!"
    ],
    "location": "Tor knight",
    "pathRequirement": "Warrior"
  },
  {
    "id": "shield_of_bones",
    "name": "Shield of bones",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 722
    },
    "stats": {
      "brawn": 4,
      "armour": 2
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Bone giant",
    "pathRequirement": "Warrior"
  },
  {
    "id": "shield_of_bones",
    "name": "Shield of bones",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 762
    },
    "stats": {
      "speed": 3,
      "magic": 3
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Scout",
    "pathRequirement": "Mage"
  },
  {
    "id": "shield_of_bones",
    "name": "Shield of bones",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 762
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Sear"
    ],
    "location": "Scout",
    "pathRequirement": "Rogue"
  },
  {
    "id": "bone_splinter",
    "name": "Bone splinter",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 584
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Chilblain",
    "pathRequirement": "Rogue"
  },
  {
    "id": "shield_of_angels",
    "name": "Shield of angels",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 754
    },
    "stats": {
      "speed": 1,
      "brawn": 5
    },
    "abilities": [
      "Windblast"
    ],
    "location": "Flay"
  },
  {
    "id": "shield_of_blasting",
    "name": "Shield of blasting",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 665
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Death orb",
    "pathRequirement": "Warrior"
  },
  {
    "id": "torment",
    "name": "Torment",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 711
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Disease"
    ],
    "location": "Lord of pain"
  },
  {
    "id": "fang_of_vengos",
    "name": "Fang of Vengos",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 868
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Venom"
    ],
    "location": "Scarrons",
    "pathRequirement": "Rogue"
  },
  {
    "id": "parasitic_plate",
    "name": "Parasitic plate",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 845
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Leech"
    ],
    "location": "Decayers",
    "pathRequirement": "Warrior"
  },
  {
    "id": "lexicon_of_bones",
    "name": "Lexicon of bones",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 813
    },
    "stats": {
      "speed": 2,
      "magic": 5
    },
    "abilities": [
      "Haunt"
    ],
    "location": "Ghasts",
    "pathRequirement": "Mage"
  },
  {
    "id": "wrecking_ball",
    "name": "Wrecking ball",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 801
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Demolish"
    ],
    "location": "The wrecker",
    "pathRequirement": "Warrior"
  },
  {
    "id": "cortical_bulb",
    "name": "Cortical bulb",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 826
    },
    "stats": {
      "speed": 3,
      "magic": 5
    },
    "abilities": [
      "Brain drain"
    ],
    "location": "Doom orb",
    "pathRequirement": "Mage"
  },
  {
    "id": "bone_bow_of_grief",
    "name": "Bone bow of grief",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 882
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Puncture"
    ],
    "location": "Sannrah",
    "pathRequirement": "Warrior"
  },
  {
    "id": "final_solution",
    "name": "Final solution",
    "type": "leftHand",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 887
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Acid"
    ],
    "location": "Sannrah",
    "pathRequirement": "Rogue"
  },
  {
    "id": "stone_ward",
    "name": "Stone ward",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 41
    },
    "stats": {},
    "abilities": [
      "Might of stone"
    ],
    "location": "Noldor (normal)"
  },
  {
    "id": "spindles_eye",
    "name": "Spindle's eye",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 91
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Spindle"
  },
  {
    "id": "third_eye",
    "name": "Third eye",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 155
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Witch"
  },
  {
    "id": "demons_heart",
    "name": "Demon's heart",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 133
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Changeling"
  },
  {
    "id": "avians_crest",
    "name": "Avian's crest",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 275
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "The Legion of Shadow"
  },
  {
    "id": "sap_filled_gland",
    "name": "Sap-filled gland",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 283
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Kerklick"
  },
  {
    "id": "elemental_dust",
    "name": "Elemental dust",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 540
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Rumbler"
  },
  {
    "id": "phoenix_ashes",
    "name": "Phoenix ashes",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 565
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Phoenix"
  },
  {
    "id": "dours_whetstone_r_w_",
    "name": "Dour's whetstone (R+W)",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 593
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Stone puzzle"
  },
  {
    "id": "seal_of_war",
    "name": "Seal of war",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 593
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Stone puzzle"
  },
  {
    "id": "braids_of_the_bull",
    "name": "Braids of the bull",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 216
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Charge"
    ],
    "location": "Zen"
  },
  {
    "id": "tigers_heart",
    "name": "Tiger's heart",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 162
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Cat's speed"
    ],
    "location": "Shara Khana"
  },
  {
    "id": "tigers_fury",
    "name": "Tiger's fury",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 162
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Berserker"
    ],
    "location": "Shara Khana",
    "pathRequirement": "Warrior"
  },
  {
    "id": "core_of_flame",
    "name": "Core of flame",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 407
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Pyromancer"
    ],
    "location": "Vesuvius",
    "pathRequirement": "Mage"
  },
  {
    "id": "lady_of_the_lamp",
    "name": "Lady of the lamp",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 680
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Medic"
    ],
    "location": "Lansbury/medic tent",
    "pathRequirement": "Mage"
  },
  {
    "id": "bone_fetish",
    "name": "Bone fetish",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 692
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Necromancer"
    ],
    "location": "Necromancer",
    "pathRequirement": "Mage"
  },
  {
    "id": "blinding_dust",
    "name": "Blinding dust",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 730
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Deceive"
    ],
    "location": "Bone giants"
  },
  {
    "id": "bag_o_bones",
    "name": "Bag o' bones",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 775
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Curse"
    ],
    "location": "Skeleton horde"
  },
  {
    "id": "dark_therapy",
    "name": "Dark therapy",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 802
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Regrowth"
    ],
    "location": "Tomb"
  },
  {
    "id": "grimm_ichor",
    "name": "Grimm ichor",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 622
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Poison mastery"
    ],
    "location": "Brothers' Grimm",
    "pathRequirement": "Rogue"
  },
  {
    "id": "survivors_pennant",
    "name": "Survivor's pennant",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 735
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Fortitude"
    ],
    "location": "Special achievement"
  },
  {
    "id": "heart_of_the_beast",
    "name": "Heart of the beast",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 702
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Ghoulash"
  },
  {
    "id": "sands_of_time",
    "name": "Sands of time",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 754
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Time shift"
    ],
    "location": "Flay"
  },
  {
    "id": "winters_heart",
    "name": "Winter's heart",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 761
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Icelock"
    ],
    "location": "Chilblain",
    "pathRequirement": "Mage"
  },
  {
    "id": "the_cravens_head",
    "name": "The craven's head",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 843
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Sidestep"
    ],
    "location": "Daarko",
    "pathRequirement": "Rogue"
  },
  {
    "id": "seed_of_rage",
    "name": "Seed of rage",
    "type": "talisman",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 878
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Dominate"
    ],
    "location": "The wrecker",
    "pathRequirement": "Mage"
  },
  {
    "id": "grannys_locket",
    "name": "Granny's locket",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 199
    },
    "stats": {
      "magic": 1
    },
    "abilities": [],
    "location": "Hobgoblin"
  },
  {
    "id": "stone_collar",
    "name": "Stone collar",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 41
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Noldor (normal)"
  },
  {
    "id": "beads_of_brilliance",
    "name": "Beads of brilliance",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 193
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Flooded cave"
  },
  {
    "id": "clymonistras_sorrow",
    "name": "Clymonistra's sorrow",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 112
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Cly's adornments"
    ],
    "location": "Catacombs"
  },
  {
    "id": "trophy_of_bones",
    "name": "Trophy of bones",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 44
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Humbaroth"
  },
  {
    "id": "black_pearl",
    "name": "Black pearl",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 432
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Curse"
    ],
    "location": "Sea spray Steve"
  },
  {
    "id": "amber_coated_collar",
    "name": "Amber-coated collar",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 314
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Hive queen"
  },
  {
    "id": "beetle_shell_garland",
    "name": "Beetle-shell garland",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 327
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Trogs"
  },
  {
    "id": "channelers_prism",
    "name": "Channeler's prism",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 522
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Focus"
    ],
    "location": "Treasure vault"
  },
  {
    "id": "silver_cross",
    "name": "Silver cross",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 291
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Dead traveller"
  },
  {
    "id": "vermillion_heart",
    "name": "Vermillion heart",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 455
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Life spark"
    ],
    "location": "Lady Roe"
  },
  {
    "id": "dours_fury",
    "name": "Dour's fury",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 397
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Treasure chest"
  },
  {
    "id": "marsh_pendant",
    "name": "Marsh pendant",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 506
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Steadfast"
    ],
    "location": "Scorpios"
  },
  {
    "id": "pendant_of_foresight",
    "name": "Pendant of foresight",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 550
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Evade"
    ],
    "location": "Jenlar's cabin"
  },
  {
    "id": "lodestone",
    "name": "Lodestone",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 593
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Rust"
    ],
    "location": "Stone puzzle"
  },
  {
    "id": "warders_collar",
    "name": "Warder's collar",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 598
    },
    "stats": {
      "magic": 1,
      "armour": 2
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Armoury",
    "pathRequirement": "Mage"
  },
  {
    "id": "diamond_of_the_tundra",
    "name": "Diamond of the tundra",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 359
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Piercing"
    ],
    "location": "King Louis"
  },
  {
    "id": "eye_of_shadow",
    "name": "Eye of shadow",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 729
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Haste"
    ],
    "location": "Shadowstalker"
  },
  {
    "id": "ghouls_teeth",
    "name": "Ghoul's teeth",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 839
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Rogue"
  },
  {
    "id": "chilblains_tears",
    "name": "Chilblain's tears",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 914
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Mage"
  },
  {
    "id": "leap_of_faith",
    "name": "Leap of faith",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 677
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Radiance"
    ],
    "location": "Tor knight"
  },
  {
    "id": "horn_of_courage",
    "name": "Horn of courage",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 770
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Courage"
    ],
    "location": "Rotterghast",
    "pathRequirement": "Warrior"
  },
  {
    "id": "dark_queen",
    "name": "Dark queen",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 834
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Heal"
    ],
    "location": "Dark ranger"
  },
  {
    "id": "charged_core",
    "name": "Charged core",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 891
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Lifespark"
    ],
    "location": "Clockwerk"
  },
  {
    "id": "stolen_hope",
    "name": "Stolen hope",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 929
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Deceive"
    ],
    "location": "Dark Arthurian"
  },
  {
    "id": "inner_circle",
    "name": "Inner circle",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 541
    },
    "stats": {},
    "abilities": [
      "(+5 health) Curse"
    ],
    "location": "Zul"
  },
  {
    "id": "glacial_shards",
    "name": "Glacial shards",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 584
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Chilblain",
    "pathRequirement": "Warrior"
  },
  {
    "id": "winged_locket",
    "name": "Winged locket",
    "type": "necklace",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 777
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "(+5 health) Courage"
    ],
    "location": "Rune chest"
  },
  {
    "id": "widows_band",
    "name": "Widow's band",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 104
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Martha"
  },
  {
    "id": "missing_link",
    "name": "Missing link",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 180
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Barricaded room"
  },
  {
    "id": "travellers_band",
    "name": "Traveller's band",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 251
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Farm bedroom"
  },
  {
    "id": "lightning_ring",
    "name": "Lightning ring",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 243
    },
    "stats": {},
    "abilities": [
      "Lightning"
    ],
    "location": "Weather wizard"
  },
  {
    "id": "grave_dust_ring",
    "name": "Grave dust ring",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 106
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [],
    "location": "Ghouls"
  },
  {
    "id": "scholars_circle",
    "name": "Scholar's circle",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 170
    },
    "stats": {},
    "abilities": [
      "Eureka!"
    ],
    "location": "Perinold"
  },
  {
    "id": "blackfire_ring",
    "name": "Blackfire ring",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 133
    },
    "stats": {},
    "abilities": [
      "Sear"
    ],
    "location": "Changeling"
  },
  {
    "id": "circle_of_thorns",
    "name": "Circle of thorns",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 80
    },
    "stats": {},
    "abilities": [
      "Thorns"
    ],
    "location": "Zaladrell"
  },
  {
    "id": "splintered_band",
    "name": "Splintered band",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 432
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Retaliation"
    ],
    "location": "Sea spray Steve",
    "pathRequirement": "Warrior"
  },
  {
    "id": "my_precious",
    "name": "My precious",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 327
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Vanish"
    ],
    "location": "Trogs"
  },
  {
    "id": "wayfarers_ring",
    "name": "Wayfarer's ring",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 291
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Dead traveller"
  },
  {
    "id": "vermillion_rage",
    "name": "Vermillion rage",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 422
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Count (normal)"
  },
  {
    "id": "clymonistras_folly",
    "name": "Clymonistra's folly",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 460
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Cly's adornments"
    ],
    "location": "Clymonistra"
  },
  {
    "id": "finger_of_fire",
    "name": "Finger of fire",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 655
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Sear"
    ],
    "location": "Cinders"
  },
  {
    "id": "ring_of_the_marshes",
    "name": "Ring of the marshes",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 449
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Swamp legs"
    ],
    "location": "Wreekin"
  },
  {
    "id": "steadfast_ring",
    "name": "Steadfast ring",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 446
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Steadfast"
    ],
    "location": "Treasure cave",
    "pathRequirement": "Mage"
  },
  {
    "id": "serpents_coil_r_w_",
    "name": "Serpent's coil (R+W)",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 333
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Treasure cave"
  },
  {
    "id": "band_of_conquest_r_w_",
    "name": "Band of conquest (R+W)",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 333
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Fortitude"
    ],
    "location": "Treasure cave"
  },
  {
    "id": "abyssal_brimstone",
    "name": "Abyssal brimstone",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 397
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Cauterise"
    ],
    "location": "Treasure chest"
  },
  {
    "id": "avatars_circle",
    "name": "Avatar's circle",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 443
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Overload"
    ],
    "location": "Stone giant",
    "pathRequirement": "Mage"
  },
  {
    "id": "lupine_lapis",
    "name": "Lupine lapis",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 696
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Raolin Storm"
  },
  {
    "id": "menders_marcasite",
    "name": "Mender's marcasite",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 696
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Regrowth"
    ],
    "location": "Raolin Storm"
  },
  {
    "id": "cutters_cornelian",
    "name": "Cutter's cornelian",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 696
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Raolin Storm"
  },
  {
    "id": "magpies_mischief",
    "name": "Magpie's mischief",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 394
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Steal"
    ],
    "location": "Logan"
  },
  {
    "id": "dryads_band",
    "name": "Dryad's band",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 341
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Thorn armour"
    ],
    "location": "Barkrot"
  },
  {
    "id": "khanas_revenge",
    "name": "Khana's revenge",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 815
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Warrior"
  },
  {
    "id": "wrath_of_ages",
    "name": "Wrath of ages",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 914
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Rust"
    ],
    "location": "Waldo's wares",
    "pathRequirement": "Mage"
  },
  {
    "id": "leader_of_the_pack",
    "name": "Leader of the pack",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 778
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Ghouls"
  },
  {
    "id": "sinister_shadows",
    "name": "Sinister shadows",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 834
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Vanish"
    ],
    "location": "Dark ranger"
  },
  {
    "id": "blood_winter",
    "name": "Blood winter",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 869
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Leech"
    ],
    "location": "Sammain (normal)"
  },
  {
    "id": "hunger",
    "name": "Hunger",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 874
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Leech"
    ],
    "location": "Sammain (special)"
  },
  {
    "id": "tooth_n_claw",
    "name": "Tooth 'n claw",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 727
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Brothes' Grimm",
    "pathRequirement": "Warrior"
  },
  {
    "id": "martyrs_blood",
    "name": "Martyr's blood",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 735
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Martyr"
    ],
    "location": "Special achievement"
  },
  {
    "id": "seven_stars_r_w_",
    "name": "Seven stars (R+W)",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 577
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Heal"
    ],
    "location": "Silleer"
  },
  {
    "id": "wytchwood_thorn_r_w_",
    "name": "Wytchwood thorn (R+W)",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 577
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Thorns"
    ],
    "location": "Silleer"
  },
  {
    "id": "zuls_zapper",
    "name": "Zul's zapper",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 541
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Zapped!"
    ],
    "location": "Zul"
  },
  {
    "id": "band_of_elements_w_m_",
    "name": "Band of elements (W+M)",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 724
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Budak"
  },
  {
    "id": "budaks_signet_w_m_",
    "name": "Budak's signet (W+M)",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 724
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Steal"
    ],
    "location": "Budak"
  },
  {
    "id": "spider_sapphire_r_m_",
    "name": "Spider sapphire (R+M)",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 726
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Webbed"
    ],
    "location": "Tor knight"
  },
  {
    "id": "serpentine_spiral_r_m_",
    "name": "Serpentine spiral (R+M)",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 726
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Tor knight"
  },
  {
    "id": "conduit_of_shadow",
    "name": "Conduit of shadow",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 865
    },
    "stats": {
      "magic": 3
    },
    "abilities": [
      "Overload"
    ],
    "location": "Daarko",
    "pathRequirement": "Mage"
  },
  {
    "id": "stria_of_genna",
    "name": "Stria of Genna",
    "type": "ring",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 826
    },
    "stats": {
      "magic": 1,
      "armour": 2
    },
    "abilities": [
      "Shock!"
    ],
    "location": "Doom orb",
    "pathRequirement": "Mage"
  },
  {
    "id": "saddle_blanket",
    "name": "Saddle blanket",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1
    },
    "stats": {
      "armour": 1
    },
    "abilities": [],
    "location": "Prologue"
  },
  {
    "id": "inscribed_mantle",
    "name": "Inscribed mantle",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 22
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Iron will"
    ],
    "location": "Vendor/Carvel"
  },
  {
    "id": "shadow_dyed_cloak",
    "name": "Shadow-dyed cloak",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 50
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Wisdom"
    ],
    "location": "Barrow"
  },
  {
    "id": "predators_pelt",
    "name": "Predator's pelt",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 106
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Dire wolf"
  },
  {
    "id": "cardinals_cappa",
    "name": "Cardinal's cappa",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 359
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Bishop"
  },
  {
    "id": "ghost_cloth",
    "name": "Ghost cloth",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 367
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Zombie horde (special)"
  },
  {
    "id": "spectral_shawl",
    "name": "Spectral shawl",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 218
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Vanish"
    ],
    "location": "Reverend"
  },
  {
    "id": "grizzly_mantle",
    "name": "Grizzly mantle",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 105
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Cuddles"
  },
  {
    "id": "rock_shoulders",
    "name": "Rock shoulders",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 228
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Toymaker's golems"
  },
  {
    "id": "wildfire_weave",
    "name": "Wildfire weave",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 231
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Backdraft"
    ],
    "location": "Black shuck"
  },
  {
    "id": "chibacha",
    "name": "Chibacha",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 612
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Gorilla rage"
    ],
    "location": "Vendor/Emerald Isle"
  },
  {
    "id": "lice_ridden_pelt",
    "name": "Lice-ridden pelt",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 232
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Parasite"
    ],
    "location": "Lycanth",
    "pathRequirement": "Warrior"
  },
  {
    "id": "shades_mantle",
    "name": "Shade's mantle",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 556
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Umbra",
    "pathRequirement": "Warrior"
  },
  {
    "id": "hair_of_the_wolf",
    "name": "Hair of the wolf",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 507
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Cunning"
    ],
    "location": "Lycanth",
    "pathRequirement": "Rogue"
  },
  {
    "id": "stole_of_shadow",
    "name": "Stole of shadow",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 255
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Steal"
    ],
    "location": "Umbra",
    "pathRequirement": "Rogue"
  },
  {
    "id": "twister",
    "name": "Twister",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 346
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Confound"
    ],
    "location": "Zephyr",
    "pathRequirement": "Mage"
  },
  {
    "id": "conch_shoulders",
    "name": "Conch shoulders",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 634
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Timeshift"
    ],
    "location": "Yootha (side quest)"
  },
  {
    "id": "coronados_pride",
    "name": "Coronado's pride",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 501
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Reckless"
    ],
    "location": "Dead explorer"
  },
  {
    "id": "shroud_of_nightmares",
    "name": "Shroud of nightmares",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 748
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Confound"
    ],
    "location": "Succubus"
  },
  {
    "id": "net_of_snares",
    "name": "Net of snares",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 720
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Perez"
  },
  {
    "id": "hunters_burden",
    "name": "Hunter's burden",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 369
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Feint"
    ],
    "location": "Buckmaster Bill (side quest)",
    "pathRequirement": "Mage"
  },
  {
    "id": "cope_of_rituals",
    "name": "Cope of rituals",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 511
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Heal"
    ],
    "location": "Sun vault",
    "pathRequirement": "Rogue"
  },
  {
    "id": "shredded_drape",
    "name": "Shredded drape",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 666
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Channel"
    ],
    "location": "Lich",
    "pathRequirement": "Mage"
  },
  {
    "id": "cape_of_the_savage",
    "name": "Cape of the savage",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 714
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Primal"
    ],
    "location": "Gheira",
    "pathRequirement": "Mage"
  },
  {
    "id": "back_to_the_wild_w_r_",
    "name": "Back to the wild (W/R)",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 729
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Gheira"
  },
  {
    "id": "mantle_of_the_deceiver",
    "name": "Mantle of the deceiver",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 383
    },
    "stats": {
      "speed": 1,
      "brawn": 3,
      "armour": 2
    },
    "abilities": [
      "Deceive"
    ],
    "location": "Kaala"
  },
  {
    "id": "shawl_of_skulls",
    "name": "Shawl of skulls",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 657
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Purge"
    ],
    "location": "Siren sisters (side quest)",
    "pathRequirement": "Mage"
  },
  {
    "id": "drake_skin_epaulets",
    "name": "Drake-skin epaulets",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 761
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Backdraft"
    ],
    "location": "Issachar",
    "pathRequirement": "Mage"
  },
  {
    "id": "cloak_of_the_undying",
    "name": "Cloak of the undying",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 682
    },
    "stats": {
      "speed": 2
    },
    "abilities": [
      "(+3 health) Gr. heal"
    ],
    "location": "Vendor/Haunted shop"
  },
  {
    "id": "wings_of_fury",
    "name": "Wings of fury",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 790
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Surge"
    ],
    "location": "Furies",
    "pathRequirement": "Mage"
  },
  {
    "id": "sentry_shoulders",
    "name": "Sentry shoulders",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 546
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Heavy blow"
    ],
    "location": "Bridge sentries",
    "pathRequirement": "Warrior"
  },
  {
    "id": "patchwork_pulp",
    "name": "Patchwork pulp",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 554
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Slick"
    ],
    "location": "Book wyrm"
  },
  {
    "id": "nemesis_shawl",
    "name": "Nemesis shawl",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 787
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Wither"
    ],
    "location": "Nephele",
    "pathRequirement": "Mage"
  },
  {
    "id": "cape_of_the_unseen",
    "name": "Cape of the unseen",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 723
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Coup de grace"
    ],
    "location": "Nephele",
    "pathRequirement": "Rogue"
  },
  {
    "id": "runeplate_pauldrons",
    "name": "Runeplate pauldrons",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 834
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Last defence"
    ],
    "location": "Erkil",
    "pathRequirement": "Warrior"
  },
  {
    "id": "mesh_of_sinew",
    "name": "Mesh of sinew",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 608
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Dark pact"
    ],
    "location": "Evin Daala",
    "pathRequirement": "Rogue"
  },
  {
    "id": "blackrock_shoulders",
    "name": "Blackrock shoulders",
    "type": "cloak",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 637
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Retaliation"
    ],
    "location": "Krakatoa",
    "pathRequirement": "Warrior"
  },
  {
    "id": "plumed_helm",
    "name": "Plumed helm",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1
    },
    "stats": {
      "armour": 1
    },
    "abilities": [],
    "location": "Prologue"
  },
  {
    "id": "dark_scale_war_helm",
    "name": "Dark-scale war helm",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 230
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Deflect"
    ],
    "location": "Vendor/Carvel"
  },
  {
    "id": "white_mane",
    "name": "White mane",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 292
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Manticore"
  },
  {
    "id": "chieftains_guard",
    "name": "Chieftain's guard",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 34
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Barrow"
  },
  {
    "id": "assassins_veil",
    "name": "Assassin's veil",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 198
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Vanish"
    ],
    "location": "Assassin ant"
  },
  {
    "id": "snipers_goggles",
    "name": "Sniper's goggles",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 258
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Focus"
    ],
    "location": "Pirates"
  },
  {
    "id": "marauders_bandanna",
    "name": "Marauder's bandanna",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 79
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [],
    "location": "Crews' quarters"
  },
  {
    "id": "crown_of_spite",
    "name": "Crown of spite",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 381
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Curse"
    ],
    "location": "Queen Ballona"
  },
  {
    "id": "lock_jaw",
    "name": "Lock jaw",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 219
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Slam"
    ],
    "location": "Saw"
  },
  {
    "id": "hat_of_stars",
    "name": "Hat of stars",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 279
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Stitches puzzle"
  },
  {
    "id": "hood_of_the_night_fiend",
    "name": "Hood of the night fiend",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 493
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Fiend's finest"
    ],
    "location": "Custodian"
  },
  {
    "id": "garland_of_sacrifice",
    "name": "Garland of sacrifice",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 155
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Atonement"
    ],
    "location": "Wickerman"
  },
  {
    "id": "cobwebbed_capotain",
    "name": "Cobwebbed capotain",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 255
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Missionary's calling"
    ],
    "location": "Umbra",
    "pathRequirement": "Rogue"
  },
  {
    "id": "umbras_cowl",
    "name": "Umbra's cowl",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 534
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Umbra",
    "pathRequirement": "Mage"
  },
  {
    "id": "braids_of_the_outcast",
    "name": "Braids of the outcast",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 350
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Lycanth",
    "pathRequirement": "Mage"
  },
  {
    "id": "coif_of_waning",
    "name": "Coif of waning",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 455
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Grub knight"
  },
  {
    "id": "totem_mask",
    "name": "Totem mask",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 621
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Totem"
  },
  {
    "id": "monkey_brain",
    "name": "Monkey brain",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 634
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Disrupt"
    ],
    "location": "Yootha (side quest)"
  },
  {
    "id": "hammerhead",
    "name": "Hammerhead",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 470
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Charge"
    ],
    "location": "Guano chest",
    "pathRequirement": "Warrior"
  },
  {
    "id": "dark_vine_pith",
    "name": "Dark vine pith",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 479
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Thorns"
    ],
    "location": "Buckmaster Bill",
    "pathRequirement": "Mage"
  },
  {
    "id": "maidens_mask",
    "name": "Maiden's mask",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 699
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Sear"
    ],
    "location": "Sun maidens"
  },
  {
    "id": "wings_of_gold",
    "name": "Wings of gold",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 524
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Time shift"
    ],
    "location": "Golden guards"
  },
  {
    "id": "king_of_the_pond",
    "name": "King of the pond",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 575
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Overload"
    ],
    "location": "Fisher King",
    "pathRequirement": "Mage"
  },
  {
    "id": "anansis_hood",
    "name": "Anansi's hood",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 685
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [
      "Webbed"
    ],
    "location": "Anansi",
    "pathRequirement": "Mage"
  },
  {
    "id": "eyes_of_the_serpent_w_r_",
    "name": "Eyes of the serpent (W/R)",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 383
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Hypnotise"
    ],
    "location": "Kaala"
  },
  {
    "id": "crown_of_gandhara",
    "name": "Crown of Gandhara",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 737
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Command"
    ],
    "location": "Hanuman"
  },
  {
    "id": "black_talon_hood",
    "name": "Black talon hood",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 770
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Vanish"
    ],
    "location": "Issachar",
    "pathRequirement": "Rogue"
  },
  {
    "id": "troll_tusks",
    "name": "Troll tusks",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 724
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Charge"
    ],
    "location": "Nergal"
  },
  {
    "id": "helm_of_reflection",
    "name": "Helm of reflection",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 546
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Deflect"
    ],
    "location": "Bridge sentries",
    "pathRequirement": "Mage"
  },
  {
    "id": "mourn_helm",
    "name": "Mourn helm",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 789
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Impale"
    ],
    "location": "Nyx the dark wind",
    "pathRequirement": "Warrior"
  },
  {
    "id": "wastrels_guise",
    "name": "Wastrel's guise",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 730
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Blind"
    ],
    "location": "Kuderas",
    "pathRequirement": "Rogue"
  },
  {
    "id": "mordant_shroud",
    "name": "Mordant shroud",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 781
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Acid"
    ],
    "location": "Chilopoda",
    "pathRequirement": "Mage"
  },
  {
    "id": "crimson_cover",
    "name": "Crimson cover",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 598
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Joss",
    "pathRequirement": "Rogue"
  },
  {
    "id": "blood_sworn_crown",
    "name": "Blood-sworn crown",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 615
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Iron will"
    ],
    "location": "Erkil (hexed)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "volcanists_hood",
    "name": "Volcanist's hood",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 803
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Overload"
    ],
    "location": "Erkil (hexed)",
    "pathRequirement": "Mage"
  },
  {
    "id": "prowlers_cowl",
    "name": "Prowler's cowl",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 878
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Vanish"
    ],
    "location": "Erkil (hexed)",
    "pathRequirement": "Rogue"
  },
  {
    "id": "gore_mask",
    "name": "Gore mask",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 608
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Mangle"
    ],
    "location": "Evin Daala",
    "pathRequirement": "Rogue"
  },
  {
    "id": "puritans_peak",
    "name": "Puritan's peak",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 871
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Charm",
      "Heal"
    ],
    "location": "Virgil"
  },
  {
    "id": "krakkas_crown",
    "name": "Krakka's crown",
    "type": "head",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 873
    },
    "stats": {
      "speed": 2,
      "magic": 5
    },
    "abilities": [
      "Command"
    ],
    "location": "Krakatoa",
    "pathRequirement": "Mage"
  },
  {
    "id": "troll_skin_gloves",
    "name": "Troll-skin gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 50
    },
    "stats": {
      "armour": 1
    },
    "abilities": [],
    "location": "Barrow"
  },
  {
    "id": "gloves_of_the_night_fiend",
    "name": "Gloves of the night fiend",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 48
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Fiend's finest"
    ],
    "location": "Highwayman"
  },
  {
    "id": "dark_vein_bracers",
    "name": "Dark vein bracers",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 91
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Margoyle"
  },
  {
    "id": "dread_forge_gauntlets",
    "name": "Dread forge gauntlets",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 23
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Retaliation"
    ],
    "location": "Forger"
  },
  {
    "id": "patchwork_gloves",
    "name": "Patchwork gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 228
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Toymaker's golems"
  },
  {
    "id": "janitors_safety_gloves",
    "name": "Janitor's safety gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 236
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Poltergeist"
  },
  {
    "id": "armbands_of_living_flame",
    "name": "Armbands of living flame",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 301
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Sear"
    ],
    "location": "Dagona"
  },
  {
    "id": "phantom_gauntlets",
    "name": "Phantom gauntlets",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 124
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Curse"
    ],
    "location": "Gairn"
  },
  {
    "id": "dons_fists",
    "name": "Don's fists",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 492
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Scholar (side quest)"
  },
  {
    "id": "rusted_armbands",
    "name": "Rusted armbands",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 232
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Counter"
    ],
    "location": "Lycanth",
    "pathRequirement": "Warrior"
  },
  {
    "id": "bracers_of_frenzy",
    "name": "Bracers of frenzy",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 160
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Compulsion"
    ],
    "location": "Zephyr",
    "pathRequirement": "Warrior"
  },
  {
    "id": "fingerless_gloves",
    "name": "Fingerless gloves",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 246
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Crawlers"
    ],
    "location": "Gaia",
    "pathRequirement": "Rogue"
  },
  {
    "id": "shocking_scales",
    "name": "Shocking scales",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 158
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Shock!"
    ],
    "location": "Boogaloo",
    "pathRequirement": "Mage"
  },
  {
    "id": "armbands_of_attraction",
    "name": "Armbands of attraction",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 544
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Confound"
    ],
    "location": "Gaia",
    "pathRequirement": "Mage"
  },
  {
    "id": "weepers_blooms",
    "name": "Weeper's blooms",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 709
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Call of nature"
    ],
    "location": "The weeper",
    "pathRequirement": "Mage"
  },
  {
    "id": "bone_bracelets",
    "name": "Bone bracelets",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 765
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Witch"
  },
  {
    "id": "rainbow_skin_brassard",
    "name": "Rainbow-skin brassard",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 660
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Regrowth"
    ],
    "location": "Drecko",
    "pathRequirement": "Mage"
  },
  {
    "id": "the_untouchables",
    "name": "The untouchables",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 501
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Shunt"
    ],
    "location": "Coronado"
  },
  {
    "id": "leather_long_arms",
    "name": "Leather long arms",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 479
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Sure grip"
    ],
    "location": "Buckmaster Bill"
  },
  {
    "id": "burnished_gauntlets",
    "name": "Burnished gauntlets",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 524
    },
    "stats": {
      "brawn": 2,
      "armour": 2
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Golden guards"
  },
  {
    "id": "prickle_pair",
    "name": "Prickle pair",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 683
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Barbs"
    ],
    "location": "Sitadell",
    "pathRequirement": "Rogue"
  },
  {
    "id": "waxen_wilds",
    "name": "Waxen wilds",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 714
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Surge"
    ],
    "location": "Gheira",
    "pathRequirement": "Mage"
  },
  {
    "id": "spider_grips_w_r_",
    "name": "Spider grips (W/R)",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 840
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Sure grip"
    ],
    "location": "Anansi"
  },
  {
    "id": "drakes_scales",
    "name": "Drake's scales",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 745
    },
    "stats": {
      "speed": 1,
      "brawn": 4
    },
    "abilities": [
      "Rake"
    ],
    "location": "Issachar",
    "pathRequirement": "Warrior"
  },
  {
    "id": "nergals_splinters",
    "name": "Nergal's splinters",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 724
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Rake"
    ],
    "location": "Nergal",
    "pathRequirement": "Mage"
  },
  {
    "id": "warfists_of_fury",
    "name": "Warfists of fury",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 790
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Furies",
    "pathRequirement": "Warrior"
  },
  {
    "id": "deft_hands",
    "name": "Deft hands",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 642
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Stun",
      "steal"
    ],
    "location": "Imp"
  },
  {
    "id": "fortunes_seekers",
    "name": "Fortune's seekers",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 730
    },
    "stats": {
      "speed": 1,
      "brawn": 4
    },
    "abilities": [
      "Unstoppable"
    ],
    "location": "Kuderas",
    "pathRequirement": "Warrior"
  },
  {
    "id": "gloves_of_the_firmament",
    "name": "Gloves of the firmament",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 728
    },
    "stats": {
      "speed": 1,
      "magic": 4
    },
    "abilities": [
      "Resolve"
    ],
    "location": "Evin Daala",
    "pathRequirement": "Mage"
  },
  {
    "id": "gore_soaked_fists",
    "name": "Gore-soaked fists",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 791
    },
    "stats": {
      "speed": 1,
      "brawn": 4
    },
    "abilities": [
      "Slam"
    ],
    "location": "Evin Daala",
    "pathRequirement": "Warrior"
  },
  {
    "id": "grips_of_living_stone",
    "name": "Grips of living stone",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 794
    },
    "stats": {
      "speed": 1,
      "armour": 4
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Erkil",
    "pathRequirement": "Rogue"
  },
  {
    "id": "blood_sworn_gauntlets",
    "name": "Blood-sworn gauntlets",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 679
    },
    "stats": {
      "speed": 1,
      "brawn": 4
    },
    "abilities": [
      "Resolve"
    ],
    "location": "Nephele (hexed)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "prowlers_handguards",
    "name": "Prowler's handguards",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 838
    },
    "stats": {
      "speed": 1,
      "brawn": 4
    },
    "abilities": [
      "Sneak"
    ],
    "location": "Nephele (hexed)",
    "pathRequirement": "Rogue"
  },
  {
    "id": "volcanists_handwraps",
    "name": "Volcanist's handwraps",
    "type": "gloves",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 708
    },
    "stats": {
      "speed": 1,
      "magic": 4
    },
    "abilities": [
      "Melt"
    ],
    "location": "Nephele (hexed)",
    "pathRequirement": "Mage"
  },
  {
    "id": "riders_jerkin",
    "name": "Rider's jerkin",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1
    },
    "stats": {
      "speed": 1
    },
    "abilities": [],
    "location": "Prologue"
  },
  {
    "id": "josephs_coat",
    "name": "Joseph's coat",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Second skin",
      "charm"
    ],
    "location": "(side quest)"
  },
  {
    "id": "wolf_bone_vest",
    "name": "Wolf-bone vest",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 106
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Direwolf"
  },
  {
    "id": "highwaymans_coat",
    "name": "Highwayman's coat",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 48
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Fear"
    ],
    "location": "Highwayman"
  },
  {
    "id": "green_blaze",
    "name": "Green blaze",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 198
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Haste"
    ],
    "location": "Assassin ant"
  },
  {
    "id": "rusted_chainmail",
    "name": "Rusted chainmail",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 205
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Cannon crew"
  },
  {
    "id": "knot_of_knives",
    "name": "Knot of knives",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 286
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Flurry"
    ],
    "location": "Lazlo (special)"
  },
  {
    "id": "medics_uniform",
    "name": "Medic's uniform",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 279
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Stitches puzzle"
  },
  {
    "id": "barbarians_chest_wig",
    "name": "Barbarian's chest wig",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 279
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Fear"
    ],
    "location": "Stitches puzzle"
  },
  {
    "id": "sawdust_n_stitches",
    "name": "Sawdust 'n stitches",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 105
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Heartless"
    ],
    "location": "Cuddles"
  },
  {
    "id": "charged_breastplate",
    "name": "Charged breastplate",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 44
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Stone giants"
  },
  {
    "id": "shockwave",
    "name": "Shockwave",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 188
    },
    "stats": {
      "brawn": 2,
      "armour": 1
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Stone giants (special)"
  },
  {
    "id": "barkskin_barding",
    "name": "Barkskin barding",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 308
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Thorn armour"
    ],
    "location": "Orgorath"
  },
  {
    "id": "hound_masters_tunic",
    "name": "Hound-master's tunic",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 231
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Black shuck"
  },
  {
    "id": "stoneguard_chest",
    "name": "Stoneguard chest",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 528
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Gaia",
    "pathRequirement": "Warrior"
  },
  {
    "id": "gravedirt_girdle",
    "name": "Gravedirt girdle",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 544
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Parasite"
    ],
    "location": "Gaia",
    "pathRequirement": "Mage"
  },
  {
    "id": "preachers_coat",
    "name": "Preacher's coat",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 246
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Missionary's calling"
    ],
    "location": "Gaia",
    "pathRequirement": "Rogue"
  },
  {
    "id": "nocturnal_leathers",
    "name": "Nocturnal leathers",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 556
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Umbra",
    "pathRequirement": "Warrior"
  },
  {
    "id": "electrified_vest",
    "name": "Electrified vest",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 325
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Shock!"
    ],
    "location": "Boogaloo",
    "pathRequirement": "Rogue"
  },
  {
    "id": "forest_cuirass",
    "name": "Forest cuirass",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 709
    },
    "stats": {
      "brawn": 2,
      "armour": 2
    },
    "abilities": [
      "Thorn armour"
    ],
    "location": "The weeper",
    "pathRequirement": "Warrior"
  },
  {
    "id": "gator_aid",
    "name": "Gator aid",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 742
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Second skin"
    ],
    "location": "Alligator"
  },
  {
    "id": "bright_scale_hauberk",
    "name": "Bright scale hauberk",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 660
    },
    "stats": {
      "brawn": 2,
      "armour": 2
    },
    "abilities": [
      "Radiance"
    ],
    "location": "Drecko",
    "pathRequirement": "Warrior"
  },
  {
    "id": "desolation_robes",
    "name": "Desolation robes",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 748
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Siphon"
    ],
    "location": "Succubus"
  },
  {
    "id": "buckmasters_jacket",
    "name": "Buckmaster's jacket",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 479
    },
    "stats": {
      "brawn": 3,
      "armour": 1
    },
    "abilities": [
      "Cunning"
    ],
    "location": "Buckmaster Bill",
    "pathRequirement": "Warrior"
  },
  {
    "id": "snipers_jacket",
    "name": "Sniper's jacket",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 243
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Focus"
    ],
    "location": "Sniper"
  },
  {
    "id": "trackers_chestguard",
    "name": "Tracker's chestguard",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 678
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Tigris"
  },
  {
    "id": "safari_cams",
    "name": "Safari cams",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 421
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Vanish"
    ],
    "location": "Buckmaster Bill (side quest)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "burnished_breastplate",
    "name": "Burnished breastplate",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 699
    },
    "stats": {
      "brawn": 3,
      "armour": 2
    },
    "abilities": [
      "Blind"
    ],
    "location": "Golden guards"
  },
  {
    "id": "gilded_chasuble",
    "name": "Gilded chasuble",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 531
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Channel"
    ],
    "location": "Sun vault",
    "pathRequirement": "Mage"
  },
  {
    "id": "widows_weave",
    "name": "Widow's weave",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 685
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Weaver"
    ],
    "location": "Anansi",
    "pathRequirement": "Mage"
  },
  {
    "id": "snakeskin_coat",
    "name": "Snakeskin coat",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 473
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Deceive"
    ],
    "location": "Kaala",
    "pathRequirement": "Rogue"
  },
  {
    "id": "drakefire_raiment",
    "name": "Drakefire raiment",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 761
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Fire aura"
    ],
    "location": "Issachar",
    "pathRequirement": "Mage"
  },
  {
    "id": "drakefire_chestguard",
    "name": "Drakefire chestguard",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 745
    },
    "stats": {
      "brawn": 4,
      "armour": 3
    },
    "abilities": [
      "Barbs"
    ],
    "location": "Issachar",
    "pathRequirement": "Warrior"
  },
  {
    "id": "brace_of_fury",
    "name": "Brace of fury",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 790
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Furies",
    "pathRequirement": "Rogue"
  },
  {
    "id": "magma_hide",
    "name": "Magma hide",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 783
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Backdraft"
    ],
    "location": "Magma hounds",
    "pathRequirement": "Warrior"
  },
  {
    "id": "sanguine_surcoat",
    "name": "Sanguine surcoat",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 598
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Dark pact"
    ],
    "location": "Joss",
    "pathRequirement": "Mage"
  },
  {
    "id": "mucus_membrane",
    "name": "Mucus membrane",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 781
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Chilopoda",
    "pathRequirement": "Warrior"
  },
  {
    "id": "gluttons_robes",
    "name": "Glutton's robes",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 730
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Leech"
    ],
    "location": "Kuderas",
    "pathRequirement": "Mage"
  },
  {
    "id": "titan_forged_hauberk",
    "name": "Titan-forged hauberk",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 716
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Thorn armour"
    ],
    "location": "Erkil",
    "pathRequirement": "Mage"
  },
  {
    "id": "crystal_plate",
    "name": "Crystal plate",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 818
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Overpower"
    ],
    "location": "Nephele",
    "pathRequirement": "Warrior"
  },
  {
    "id": "blood_sworn_chestguard",
    "name": "Blood-sworn chestguard",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 800
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Unstoppable"
    ],
    "location": "Ixion (hexed)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "prowlers_tunic",
    "name": "Prowler's tunic",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 732
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Ixion (hexed)"
  },
  {
    "id": "volcanists_vestment",
    "name": "Volcanist's vestment",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 808
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Reaper"
    ],
    "location": "Ixion (hexed)"
  },
  {
    "id": "rock_spine_coat",
    "name": "Rock spine coat",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 830
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Gouge"
    ],
    "location": "Krakatoa",
    "pathRequirement": "Rogue"
  },
  {
    "id": "krakkas_casing",
    "name": "Krakka's casing",
    "type": "chest",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 637
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Thorn armour"
    ],
    "location": "Krakatoa",
    "pathRequirement": "Warrior"
  },
  {
    "id": "pilgrims_progress",
    "name": "Pilgrim's progress",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 235
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Surefooted"
    ],
    "location": "Vendor/Raven's Rest"
  },
  {
    "id": "ghost_riders_spurs",
    "name": "Ghost rider's spurs",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 48
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Reckless"
    ],
    "location": "Highwayman"
  },
  {
    "id": "bile_coated_boots",
    "name": "Bile-coated boots",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 300
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Number 13"
  },
  {
    "id": "tarsus_boots",
    "name": "Tarsus boots",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 336
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Surefooted"
    ],
    "location": "Konga"
  },
  {
    "id": "sailors_sandals",
    "name": "Sailor's sandals",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 205
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Surefooted"
    ],
    "location": "Cannon crew"
  },
  {
    "id": "iron_stompers",
    "name": "Iron stompers",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 219
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Saw"
  },
  {
    "id": "grounded_boots",
    "name": "Grounded boots",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 236
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Insulated"
    ],
    "location": "Poltergeist"
  },
  {
    "id": "firewalkers_boots",
    "name": "Firewalker's boots",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 431
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Turn up the heat"
    ],
    "location": "Furnace"
  },
  {
    "id": "shaggy_mukluks",
    "name": "Shaggy mukluks",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 231
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Haste"
    ],
    "location": "Black shuck"
  },
  {
    "id": "mud_sliders",
    "name": "Mud sliders",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 528
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Unstoppable"
    ],
    "location": "Gaia",
    "pathRequirement": "Warrior"
  },
  {
    "id": "storm_riders",
    "name": "Storm riders",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 297
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Pagan's spirit"
    ],
    "location": "Zephyr",
    "pathRequirement": "Rogue"
  },
  {
    "id": "conga_kickers",
    "name": "Conga kickers",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 325
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Boogaloo",
    "pathRequirement": "Rogue"
  },
  {
    "id": "lightning_loafers",
    "name": "Lightning loafers",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 458
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Boogaloo",
    "pathRequirement": "Mage"
  },
  {
    "id": "stone_walkers",
    "name": "Stone walkers",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 621
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Totem"
  },
  {
    "id": "jungle_runners",
    "name": "Jungle runners",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 780
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "(+2 health) Haste"
    ],
    "location": "Zambezi"
  },
  {
    "id": "bug_grinders",
    "name": "Bug grinders",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 421
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Compulsion"
    ],
    "location": "Buckmaster Bill (side quest)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "rough_pelt_moccasins",
    "name": "Rough pelt moccasins",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 641
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Terral devil",
    "pathRequirement": "Mage"
  },
  {
    "id": "golden_greaves",
    "name": "Golden greaves",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 550
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Sun vault",
    "pathRequirement": "Warrior"
  },
  {
    "id": "enchanted_boots",
    "name": "Enchanted boots",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 575
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Fisher king"
  },
  {
    "id": "slither_steps",
    "name": "Slither steps",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 473
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Kaala"
  },
  {
    "id": "death_blades",
    "name": "Death blades",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 770
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Fatal blow"
    ],
    "location": "Issachar",
    "pathRequirement": "Rogue"
  },
  {
    "id": "lava_pads",
    "name": "Lava pads",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 783
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Fire shield"
    ],
    "location": "Magma hounds",
    "pathRequirement": "Mage"
  },
  {
    "id": "slime_skimmers",
    "name": "Slime skimmers",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 781
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Webbed"
    ],
    "location": "Chilopoda"
  },
  {
    "id": "scarlet_sabatons",
    "name": "Scarlet sabatons",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 598
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Haste"
    ],
    "location": "Joss",
    "pathRequirement": "Warrior"
  },
  {
    "id": "singed_footpads",
    "name": "Singed footpads",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 812
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Sidestep"
    ],
    "location": "Ixion",
    "pathRequirement": "Rogue"
  },
  {
    "id": "ixions_shackles",
    "name": "Ixion's shackles",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 592
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Ixion",
    "pathRequirement": "Mage"
  },
  {
    "id": "frost_spike_boots",
    "name": "Frost spike boots",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 818
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Barbs"
    ],
    "location": "Nephele",
    "pathRequirement": "Warrior"
  },
  {
    "id": "cornerstone_boots",
    "name": "Cornerstone boots",
    "type": "feet",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 716
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Insulated"
    ],
    "location": "Erkil",
    "pathRequirement": "Mage"
  },
  {
    "id": "knights_folly",
    "name": "Knight's folly",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Prologue"
  },
  {
    "id": "duty",
    "name": "Duty",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 221
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Charm",
      "Faith & duty"
    ],
    "location": "Farmers (side quest)"
  },
  {
    "id": "headsplitter",
    "name": "Headsplitter",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 22
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Vendor/Carvel"
  },
  {
    "id": "midnights_edge",
    "name": "Midnight's edge",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 230
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Vendor/Carvel"
  },
  {
    "id": "walking_stick",
    "name": "Walking stick",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 235
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Vendor/Raven's Rest"
  },
  {
    "id": "cut_throats_carver",
    "name": "Cut throat's carver",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 26
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Anna"
  },
  {
    "id": "great_divider",
    "name": "Great divider",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 50
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Barrow"
  },
  {
    "id": "splintered_claw",
    "name": "Splintered claw",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 133
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Sinister sprigs"
  },
  {
    "id": "ivory_spire",
    "name": "Ivory spire",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 359
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Focus"
    ],
    "location": "Bishop"
  },
  {
    "id": "rusted_knife",
    "name": "Rusted knife",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 20
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Zombie goblin"
  },
  {
    "id": "stalkers_stiletto",
    "name": "Stalker's stiletto",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 372
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Silverfrost"
    ],
    "location": "Falks"
  },
  {
    "id": "flint_knife",
    "name": "Flint knife",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 336
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Gouge"
    ],
    "location": "Konga"
  },
  {
    "id": "mighty_claw",
    "name": "Mighty claw",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 198
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Assassin ant"
  },
  {
    "id": "winters_fall",
    "name": "Winter's fall",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 30
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Silverfrost"
    ],
    "location": "Jeeves"
  },
  {
    "id": "red_mist",
    "name": "Red mist",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 174
    },
    "stats": {
      "brawn": 2,
      "magic": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Lazlo (special)"
  },
  {
    "id": "buzz_saw",
    "name": "Buzz saw",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 219
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Cleave"
    ],
    "location": "Saw"
  },
  {
    "id": "forgers_hammer",
    "name": "Forger's hammer",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 23
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Pound"
    ],
    "location": "Forger"
  },
  {
    "id": "furnace_fire",
    "name": "Furnace fire",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 431
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Sear"
    ],
    "location": "Furnace"
  },
  {
    "id": "gratuitous_maximus",
    "name": "Gratuitous maximus",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 498
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Maximus"
  },
  {
    "id": "stone_spike",
    "name": "Stone spike",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 44
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Stone giants",
    "pathRequirement": "Rogue"
  },
  {
    "id": "black_peak",
    "name": "Black peak",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 188
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Stone giants (special)",
    "pathRequirement": "Rogue"
  },
  {
    "id": "twilight_scepter",
    "name": "Twilight scepter",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 493
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Wither"
    ],
    "location": "Custodian",
    "pathRequirement": "Mage"
  },
  {
    "id": "inscribed_fist",
    "name": "Inscribed fist",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 502
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "White abbot",
    "pathRequirement": "Warrior"
  },
  {
    "id": "frost_reavers_tongue",
    "name": "Frost reaver's tongue",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 124
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Frost bite"
    ],
    "location": "Gairn"
  },
  {
    "id": "bramble_blade",
    "name": "Bramble blade",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 308
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Orgorath"
  },
  {
    "id": "solstice",
    "name": "Solstice",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 155
    },
    "stats": {
      "speed": 1,
      "magic": 3
    },
    "abilities": [
      "Channel"
    ],
    "location": "Wicker man"
  },
  {
    "id": "wangimbo",
    "name": "Wangimbo",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 612
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Impale"
    ],
    "location": "Vendor/Emerald Isle",
    "pathRequirement": "Warrior"
  },
  {
    "id": "abracabamba",
    "name": "Abracabamba",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 612
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Blink"
    ],
    "location": "Vendor/Emerald Isle",
    "pathRequirement": "Mage"
  },
  {
    "id": "thunder",
    "name": "Thunder",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 528
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Savage arms"
    ],
    "location": "Gaia",
    "pathRequirement": "Warrior"
  },
  {
    "id": "broken_blade",
    "name": "Broken blade",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 544
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Gaia",
    "pathRequirement": "Mage"
  },
  {
    "id": "tremor_stick",
    "name": "Tremor stick",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 569
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Shock!"
    ],
    "location": "Boogaloo",
    "pathRequirement": "Warrior"
  },
  {
    "id": "wind_baton",
    "name": "Wind baton",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 346
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Windblast"
    ],
    "location": "Zephyr",
    "pathRequirement": "Mage"
  },
  {
    "id": "glaive_of_souls",
    "name": "Glaive of souls",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 602
    },
    "stats": {
      "speed": 2,
      "brawn": 2,
      "magic": 2
    },
    "abilities": [
      "Vampirism"
    ],
    "location": "Mortzilla"
  },
  {
    "id": "grubs_glory",
    "name": "Grub's glory",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 455
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Crawlers"
    ],
    "location": "Grub knight"
  },
  {
    "id": "lone_wolf",
    "name": "Lone wolf",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 757
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Travellers' shelter"
  },
  {
    "id": "shrunken_hand",
    "name": "Shrunken hand",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 634
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Yootha (side quest)"
  },
  {
    "id": "voodoo_doll",
    "name": "Voodoo doll",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 765
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Curse"
    ],
    "location": "Witch"
  },
  {
    "id": "fang_of_the_fearless",
    "name": "Fang of the fearless",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 660
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Drecko"
  },
  {
    "id": "nelsons_column",
    "name": "Nelson's column",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 421
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Buckmaster Bill (side quest)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "nelsons_column",
    "name": "Nelson's column",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 427
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Nelson",
    "pathRequirement": "Warrior"
  },
  {
    "id": "bone_wild",
    "name": "Bone wild",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 780
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Zambezi"
  },
  {
    "id": "bloodied_claws",
    "name": "Bloodied claws",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 678
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Rake"
    ],
    "location": "Tigris"
  },
  {
    "id": "jade_teeth",
    "name": "Jade teeth",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 720
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Rake"
    ],
    "location": "Perez",
    "pathRequirement": "Warrior"
  },
  {
    "id": "crystal_dagger",
    "name": "Crystal dagger",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 499
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Gut ripper"
    ],
    "location": "Buckmaster Bill (side quest)",
    "pathRequirement": "Rogue"
  },
  {
    "id": "ebon_cutlass",
    "name": "Ebon cutlass",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 499
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Buckmaster Bill (side quest)",
    "pathRequirement": "Rogue"
  },
  {
    "id": "sun_blaze",
    "name": "Sun blaze",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 699
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Sear"
    ],
    "location": "Sun maidens"
  },
  {
    "id": "ancestral_spear",
    "name": "Ancestral spear",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 461
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Spirt hunter"
    ],
    "location": "Font of souls",
    "pathRequirement": "Warrior"
  },
  {
    "id": "ancestral_blade",
    "name": "Ancestral blade",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 526
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Piercing",
      "bleed"
    ],
    "location": "Font of souls",
    "pathRequirement": "Rogue"
  },
  {
    "id": "ancestral_stave",
    "name": "Ancestral stave",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 514
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Overload",
      "focus"
    ],
    "location": "Font of souls",
    "pathRequirement": "Mage"
  },
  {
    "id": "ceremonial_dagger",
    "name": "Ceremonial dagger",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 508
    },
    "stats": {
      "speed": 2,
      "brawn": 2,
      "magic": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Ziggurat"
  },
  {
    "id": "burnished_knuckles",
    "name": "Burnished knuckles",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 524
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Fatal blow"
    ],
    "location": "Golden guards",
    "pathRequirement": "Warrior"
  },
  {
    "id": "mortal_coil",
    "name": "Mortal coil",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 666
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Reaper"
    ],
    "location": "Lich",
    "pathRequirement": "Rogue"
  },
  {
    "id": "hunting_fork",
    "name": "Hunting fork",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 575
    },
    "stats": {
      "speed": 1,
      "brawn": 3
    },
    "abilities": [
      "Skewer"
    ],
    "location": "Fisher king",
    "pathRequirement": "Warrior"
  },
  {
    "id": "untamed_will",
    "name": "Untamed will",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 729
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Gheira",
    "pathRequirement": "Rogue"
  },
  {
    "id": "death_rattle",
    "name": "Death rattle",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 383
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Near death"
    ],
    "location": "Kaala",
    "pathRequirement": "Mage"
  },
  {
    "id": "comb_of_sailors_fingers",
    "name": "Comb of sailors' fingers",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 657
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Disease"
    ],
    "location": "Siren sisters (side quest)"
  },
  {
    "id": "wishing_staff",
    "name": "Wishing staff",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 737
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Wish master"
    ],
    "location": "Hanuman",
    "pathRequirement": "Mage"
  },
  {
    "id": "dooms_harbinger",
    "name": "Doom's harbinger",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 682
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Doom"
    ],
    "location": "Vendor/Haunted shop"
  },
  {
    "id": "oculus_eye_of_pain",
    "name": "Oculus, eye of pain",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 649
    },
    "stats": {
      "speed": 2,
      "magic": 5
    },
    "abilities": [
      "Lightning",
      "focus"
    ],
    "location": "Rune forge"
  },
  {
    "id": "ravenos_bringer_of_ruin",
    "name": "Ravenos, bringer of ruin",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 796
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Deep wound",
      "sear"
    ],
    "location": "Rune forge"
  },
  {
    "id": "fist_of_fury",
    "name": "Fist of fury",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 455
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Furies"
  },
  {
    "id": "acherons_war_glaive_w_r_",
    "name": "Acheron's war glaive (W/R)",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 777
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Cleave"
    ],
    "location": "Treasure vault"
  },
  {
    "id": "acherons_tower",
    "name": "Acheron's tower",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 176
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Treasure vault",
    "pathRequirement": "Mage"
  },
  {
    "id": "crystal_hammer",
    "name": "Crystal hammer",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 893
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Stagger"
    ],
    "location": "Tourmalus",
    "pathRequirement": "Warrior"
  },
  {
    "id": "serrated_scapula",
    "name": "Serrated scapula",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 791
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Fallen hero"
    ],
    "location": "Evin Daala",
    "pathRequirement": "Warrior"
  },
  {
    "id": "spoke_of_the_wheel",
    "name": "Spoke of the wheel",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 812
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Deep wound"
    ],
    "location": "Ixion",
    "pathRequirement": "Rogue"
  },
  {
    "id": "abandoned_hope",
    "name": "Abandoned hope",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 723
    },
    "stats": {
      "speed": 3,
      "brawn": 4
    },
    "abilities": [
      "Gut ripper"
    ],
    "location": "Nephele",
    "pathRequirement": "Rogue"
  },
  {
    "id": "azure_embers",
    "name": "Azure embers",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 787
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Disrupt"
    ],
    "location": "Nephele",
    "pathRequirement": "Mage"
  },
  {
    "id": "hellslide_halberd",
    "name": "Hellslide halberd",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 637
    },
    "stats": {
      "speed": 2,
      "brawn": 6
    },
    "abilities": [
      "Impale"
    ],
    "location": "Krakatoa",
    "pathRequirement": "Warrior"
  },
  {
    "id": "avalanche",
    "name": "Avalanche",
    "type": "mainHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 873
    },
    "stats": {
      "speed": 2,
      "magic": 6
    },
    "abilities": [
      "Shatter"
    ],
    "location": "Krakatoa",
    "pathRequirement": "Mage"
  },
  {
    "id": "silver_leaf",
    "name": "Silver leaf",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 22
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Focus"
    ],
    "location": "Vendor/Carvel"
  },
  {
    "id": "black_heart",
    "name": "Black heart",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 230
    },
    "stats": {
      "speed": 1,
      "armour": 2
    },
    "abilities": [
      "Deflect"
    ],
    "location": "Vendor/Carvel"
  },
  {
    "id": "faith",
    "name": "Faith",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 276
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Immobilise",
      "Faith & duty"
    ],
    "location": "Fallen knight (side quest)"
  },
  {
    "id": "colt_phoenix",
    "name": "Colt phoenix",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 305
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Volley"
    ],
    "location": "Raven's Rest (side quest)"
  },
  {
    "id": "greenstone_axe",
    "name": "Greenstone axe",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 74
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [],
    "location": "Drust the defiled"
  },
  {
    "id": "dire_claw",
    "name": "Dire claw",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 106
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Direwolf"
  },
  {
    "id": "manticores_tooth",
    "name": "Manticore's tooth",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 292
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Savagery"
    ],
    "location": "Manticore"
  },
  {
    "id": "doorman",
    "name": "Doorman",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 234
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Slam"
    ],
    "location": "Gutless"
  },
  {
    "id": "cruel_cleaver",
    "name": "Cruel cleaver",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 234
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [],
    "location": "Gutless"
  },
  {
    "id": "repentance",
    "name": "Repentance",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 218
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Channel"
    ],
    "location": "Reverend"
  },
  {
    "id": "falks_firestarter",
    "name": "Falk's firestarter",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 372
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Head shot"
    ],
    "location": "Falks"
  },
  {
    "id": "sword_of_the_dales",
    "name": "Sword of the dales",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 109
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Loggers' camp"
  },
  {
    "id": "bugsplatter",
    "name": "Bugsplatter",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 164
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [],
    "location": "Goblins"
  },
  {
    "id": "flint_knife",
    "name": "Flint knife",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 336
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Gouge"
    ],
    "location": "Konga"
  },
  {
    "id": "cutlass_of_the_seven_seas",
    "name": "Cutlass of the seven seas",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 264
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Parry"
    ],
    "location": "Captain's cabin"
  },
  {
    "id": "celestes_anchor",
    "name": "Celeste's anchor",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 189
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Pound"
    ],
    "location": "Ship's hold"
  },
  {
    "id": "windbreaker",
    "name": "Windbreaker",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 91
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [],
    "location": "Margoyle"
  },
  {
    "id": "jeeves_juicer",
    "name": "Jeeve's juicer",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 286
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Gouge"
    ],
    "location": "Lazlo (special)"
  },
  {
    "id": "quill_of_aquila",
    "name": "Quill of Aquila",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 303
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Inkheart"
  },
  {
    "id": "ink_blotted_tome",
    "name": "Ink-blotted tome",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 303
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Inkheart"
  },
  {
    "id": "defendus_maximus",
    "name": "Defendus maximus",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 498
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Deflect"
    ],
    "location": "Maximus"
  },
  {
    "id": "rock_fist",
    "name": "Rock fist",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 44
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Surge"
    ],
    "location": "Stone giants"
  },
  {
    "id": "stone_fury",
    "name": "Stone fury",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 188
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Surge"
    ],
    "location": "Stone giants (special)"
  },
  {
    "id": "inscribed_fist",
    "name": "Inscribed fist",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 706
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Pound"
    ],
    "location": "White abbot",
    "pathRequirement": "Warrior"
  },
  {
    "id": "dawnlight",
    "name": "Dawnlight",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 502
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Blind"
    ],
    "location": "Custodian"
  },
  {
    "id": "fer_de_lance",
    "name": "Fer-de-lance",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 467
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Venom"
    ],
    "location": "Vendor/Emerald Isle",
    "pathRequirement": "Rogue"
  },
  {
    "id": "monarch_viper",
    "name": "Monarch viper",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 467
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Venom"
    ],
    "location": "Vendor/Emerald Isle",
    "pathRequirement": "Rogue"
  },
  {
    "id": "lesser_bushmaster",
    "name": "Lesser bushmaster",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 467
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Constrictor"
    ],
    "location": "Vendor/Emerald Isle",
    "pathRequirement": "Rogue"
  },
  {
    "id": "bogglespiffs_digest",
    "name": "Bogglespiff's digest",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 492
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Insight"
    ],
    "location": "Scholar (side quest)"
  },
  {
    "id": "squall",
    "name": "Squall",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 160
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Savage arms"
    ],
    "location": "Zephyr",
    "pathRequirement": "Warrior"
  },
  {
    "id": "silver_flight",
    "name": "Silver flight",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 297
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Charm"
    ],
    "location": "Zephyr",
    "pathRequirement": "Rogue"
  },
  {
    "id": "lost_scriptures",
    "name": "Lost scriptures",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 346
    },
    "stats": {
      "speed": 1,
      "magic": 2
    },
    "abilities": [
      "Cistene's chattels"
    ],
    "location": "Zephyr",
    "pathRequirement": "Mage"
  },
  {
    "id": "feral_falcate",
    "name": "Feral falcate",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 507
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Pagan's spirit"
    ],
    "location": "Lycanth",
    "pathRequirement": "Rogue"
  },
  {
    "id": "bone_shaker",
    "name": "Bone shaker",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 765
    },
    "stats": {
      "speed": 2,
      "magic": 1
    },
    "abilities": [
      "Fear"
    ],
    "location": "Witch",
    "pathRequirement": "Mage"
  },
  {
    "id": "creek_guard",
    "name": "Creek guard",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 742
    },
    "stats": {
      "speed": 2,
      "armour": 1
    },
    "abilities": [
      "Retaliation"
    ],
    "location": "Alligator",
    "pathRequirement": "Warrior"
  },
  {
    "id": "shrunken_hand",
    "name": "Shrunken hand",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 634
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Yootha (side quest)"
  },
  {
    "id": "cart_wheel",
    "name": "Cart wheel",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 697
    },
    "stats": {
      "speed": 2,
      "armour": 1
    },
    "abilities": [
      "Roll with it"
    ],
    "location": "Tigris cages (special)",
    "pathRequirement": "Warrior"
  },
  {
    "id": "brazen_bar",
    "name": "Brazen bar",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 697
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Knockdown"
    ],
    "location": "Tigris cages (special)"
  },
  {
    "id": "rip_spleen",
    "name": "Rip spleen",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 780
    },
    "stats": {
      "speed": 2,
      "brawn": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Zambezi"
  },
  {
    "id": "scarlet_hunter",
    "name": "Scarlet hunter",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 447
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Critical strike"
    ],
    "location": "Nelson",
    "pathRequirement": "Rogue"
  },
  {
    "id": "the_nosepicker",
    "name": "The nosepicker",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 447
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Nelson"
  },
  {
    "id": "bark_whip",
    "name": "Bark whip",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 720
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Perez"
  },
  {
    "id": "stormbound",
    "name": "Stormbound",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 243
    },
    "stats": {
      "speed": 1,
      "brawn": 2
    },
    "abilities": [
      "Volley"
    ],
    "location": "Sniper"
  },
  {
    "id": "emerald_taipan",
    "name": "Emerald taipan",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 499
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Venom"
    ],
    "location": "Buckmaster Bill (side quest)",
    "pathRequirement": "Rogue"
  },
  {
    "id": "medicine_staff",
    "name": "Medicine staff",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 369
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Greater heal"
    ],
    "location": "Buckmaster Bill (side quest)",
    "pathRequirement": "Mage"
  },
  {
    "id": "high_priests_scepter",
    "name": "High priest's scepter",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 531
    },
    "stats": {
      "speed": 2,
      "magic": 2
    },
    "abilities": [
      "Resolve"
    ],
    "location": "Sun vault"
  },
  {
    "id": "embalming_razor",
    "name": "Embalming razor",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 511
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Blindstrike"
    ],
    "location": "Sun vault"
  },
  {
    "id": "sol_shield",
    "name": "Sol shield",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 550
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Radiance"
    ],
    "location": "Sun vault"
  },
  {
    "id": "rodents_scratchers",
    "name": "Rodent's scratchers",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 641
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Terral devil"
  },
  {
    "id": "devils_incisor",
    "name": "Devil's incisor",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 641
    },
    "stats": {
      "speed": 2,
      "brawn": 2
    },
    "abilities": [
      "Fatal blow"
    ],
    "location": "Terral devil"
  },
  {
    "id": "black_taipan",
    "name": "Black taipan",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 885
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Convulsions"
    ],
    "location": "Lecture room"
  },
  {
    "id": "widows_needle",
    "name": "Widow's needle",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 840
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Anansi",
    "pathRequirement": "Rogue"
  },
  {
    "id": "carapace_crest",
    "name": "Carapace crest",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 840
    },
    "stats": {
      "speed": 2,
      "armour": 2
    },
    "abilities": [
      "Webbed"
    ],
    "location": "Anansi",
    "pathRequirement": "Warrior"
  },
  {
    "id": "spinneret_of_shadows",
    "name": "Spinneret of shadows",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 685
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Webbed"
    ],
    "location": "Anansi",
    "pathRequirement": "Mage"
  },
  {
    "id": "drakes_defender",
    "name": "Drake's defender",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 745
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Issachar",
    "pathRequirement": "Warrior"
  },
  {
    "id": "self_published_grimoire",
    "name": "Self-published grimoire",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 600
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Dark pact"
    ],
    "location": "Printing press",
    "pathRequirement": "Mage"
  },
  {
    "id": "self_published_grimoire",
    "name": "Self-published grimoire",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 539
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Surge"
    ],
    "location": "Printing press",
    "pathRequirement": "Mage"
  },
  {
    "id": "self_published_grimoire",
    "name": "Self-published grimoire",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 816
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Regrowth"
    ],
    "location": "Printing press",
    "pathRequirement": "Mage"
  },
  {
    "id": "self_published_grimoire",
    "name": "Self-published grimoire",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 876
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Printing press",
    "pathRequirement": "Mage"
  },
  {
    "id": "self_published_tome",
    "name": "Self-published tome",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 380
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Dark pact"
    ],
    "location": "Printing press",
    "pathRequirement": "Mage"
  },
  {
    "id": "self_published_tome",
    "name": "Self-published tome",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 806
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Printing press",
    "pathRequirement": "Mage"
  },
  {
    "id": "self_published_tome",
    "name": "Self-published tome",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 826
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Regrowth"
    ],
    "location": "Printing press",
    "pathRequirement": "Mage"
  },
  {
    "id": "self_published_tome",
    "name": "Self-published tome",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 845
    },
    "stats": {
      "speed": 2,
      "armour": 3
    },
    "abilities": [
      "Surge"
    ],
    "location": "Printing press",
    "pathRequirement": "Mage"
  },
  {
    "id": "mortis_shard_of_doom_w_r_",
    "name": "Mortis, shard of doom (W/R)",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 536
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Bleed",
      "lightning"
    ],
    "location": "Rune forge"
  },
  {
    "id": "scriva_nimbus_of_nightmares",
    "name": "Scriva, nimbus of nightmares",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 474
    },
    "stats": {
      "speed": 3,
      "magic": 4
    },
    "abilities": [
      "Curse",
      "sear"
    ],
    "location": "Rune forge",
    "pathRequirement": "Mage"
  },
  {
    "id": "light_forged_bulwark",
    "name": "Light-forged bulwark",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 682
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Defender"
    ],
    "location": "Vendor/Haunted shop",
    "pathRequirement": "Warrior"
  },
  {
    "id": "hound_hook",
    "name": "Hound hook",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 783
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Gouge"
    ],
    "location": "Magma hounds",
    "pathRequirement": "Rogue"
  },
  {
    "id": "bone_rot",
    "name": "Bone rot",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 724
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Leech"
    ],
    "location": "Nergal",
    "pathRequirement": "Warrior"
  },
  {
    "id": "dark_star",
    "name": "Dark star",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 789
    },
    "stats": {
      "speed": 2,
      "magic": 3
    },
    "abilities": [
      "Barbs"
    ],
    "location": "Nyx the dark wind"
  },
  {
    "id": "dull_gladius",
    "name": "Dull gladius",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 883
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Slam"
    ],
    "location": "Sparkacus"
  },
  {
    "id": "calcite_claw",
    "name": "Calcite claw",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 893
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Tourmalus"
  },
  {
    "id": "agilax_the_string_of_tears",
    "name": "Agilax, the string of tears",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 846
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "Blood archer"
    ],
    "location": "Joss",
    "pathRequirement": "Rogue"
  },
  {
    "id": "blood_thorn",
    "name": "Blood thorn",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 608
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Gouge"
    ],
    "location": "Evin Daala",
    "pathRequirement": "Rogue"
  },
  {
    "id": "ixions_wheel",
    "name": "Ixion's wheel",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 823
    },
    "stats": {
      "speed": 2,
      "armour": 4
    },
    "abilities": [
      "Fire aura"
    ],
    "location": "Ixion",
    "pathRequirement": "Warrior"
  },
  {
    "id": "b_is_for_banshee",
    "name": "B is for Banshee",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 787
    },
    "stats": {
      "speed": 2,
      "magic": 4
    },
    "abilities": [
      "Windblast"
    ],
    "location": "Nephele",
    "pathRequirement": "Mage"
  },
  {
    "id": "shiverspine",
    "name": "Shiverspine",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 723
    },
    "stats": {
      "speed": 2,
      "brawn": 3
    },
    "abilities": [
      "frostbite"
    ],
    "location": "Nephele",
    "pathRequirement": "Rogue"
  },
  {
    "id": "erkils_hacker",
    "name": "Erkil's hacker",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 834
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Compulsion"
    ],
    "location": "Erkil",
    "pathRequirement": "Warrior"
  },
  {
    "id": "blackthorn_twister",
    "name": "Blackthorn twister",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 794
    },
    "stats": {
      "speed": 2,
      "brawn": 4
    },
    "abilities": [
      "Cruel twist"
    ],
    "location": "Erkil",
    "pathRequirement": "Rogue"
  },
  {
    "id": "krakkas_vengeance",
    "name": "Krakka's vengeance",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 830
    },
    "stats": {
      "speed": 2,
      "brawn": 5
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Krakatoa",
    "pathRequirement": "Rogue"
  },
  {
    "id": "stones_of_dissolution",
    "name": "Stones of dissolution",
    "type": "leftHand",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 873
    },
    "stats": {
      "speed": 3,
      "magic": 5
    },
    "abilities": [
      "Confound"
    ],
    "location": "Krakatoa",
    "pathRequirement": "Mage"
  },
  {
    "id": "wolfs_paw",
    "name": "Wolf's paw",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 235
    },
    "stats": {
      "speed": 1
    },
    "abilities": [],
    "location": "Vendor/Raven's Rest"
  },
  {
    "id": "crow_feather",
    "name": "Crow feather",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 7
    },
    "stats": {
      "magic": 1
    },
    "abilities": [],
    "location": "Wiccan witch"
  },
  {
    "id": "wishing_well_coin",
    "name": "Wishing well coin",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 20
    },
    "stats": {},
    "abilities": [
      "Charm"
    ],
    "location": "Zombie goblin"
  },
  {
    "id": "lukes_left_hand",
    "name": "Luke's left hand",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 79
    },
    "stats": {},
    "abilities": [
      "High five!"
    ],
    "location": "Crews' quarters"
  },
  {
    "id": "stone_blood",
    "name": "Stone blood",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 91
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Margoyle"
  },
  {
    "id": "makers_button",
    "name": "Maker's button",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 105
    },
    "stats": {
      "speed": 1
    },
    "abilities": [],
    "location": "Cuddles"
  },
  {
    "id": "adams_core",
    "name": "Adam's core",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 498
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Heal"
    ],
    "location": "Maximus"
  },
  {
    "id": "elder_seed",
    "name": "Elder seed",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 403
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Druid"
    ],
    "location": "Damaris",
    "pathRequirement": "Mage"
  },
  {
    "id": "benediction",
    "name": "Benediction",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 487
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Acolyte"
    ],
    "location": "Benin",
    "pathRequirement": "Mage"
  },
  {
    "id": "earthen_ashes",
    "name": "Earthen ashes",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 301
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Cauterise"
    ],
    "location": "Dagona"
  },
  {
    "id": "the_minds_eye",
    "name": "The mind's eye",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 275
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Scholar"
    ],
    "location": "Andos (side quest)"
  },
  {
    "id": "lightning_whetstone_w_r_",
    "name": "Lightning whetstone (W/R)",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 325
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Sure edge"
    ],
    "location": "Boogaloo"
  },
  {
    "id": "spook_chi",
    "name": "Spook chi",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 255
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Trickster"
    ],
    "location": "Umbra",
    "pathRequirement": "Rogue"
  },
  {
    "id": "screaming_skull",
    "name": "Screaming skull",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 629
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "(+4 health) Charm"
    ],
    "location": "Mortzilla"
  },
  {
    "id": "khanas_pride",
    "name": "Khana's pride",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 636
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Sideswipe"
    ],
    "location": "Greyhair"
  },
  {
    "id": "tigris_paw",
    "name": "Tigris paw",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 678
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Evade"
    ],
    "location": "Tigris"
  },
  {
    "id": "stone_of_the_sitadell",
    "name": "Stone of the sitadell",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 683
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Disrupt"
    ],
    "location": "Sitadell",
    "pathRequirement": "Warrior"
  },
  {
    "id": "lich_stone",
    "name": "Lich stone",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 778
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Runecaster"
    ],
    "location": "Lich",
    "pathRequirement": "Mage"
  },
  {
    "id": "eye_of_a_kraken_w_r_",
    "name": "Eye of a kraken (W/R)",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 657
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Greater heal"
    ],
    "location": "Siren sisters (side quest)"
  },
  {
    "id": "kaalas_scale",
    "name": "Kaala's scale",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 745
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Venommancer"
    ],
    "location": "Kaala",
    "pathRequirement": "Rogue"
  },
  {
    "id": "drake_spirit",
    "name": "Drake spirit",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 473
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Drake"
    ],
    "location": "Kaala",
    "pathRequirement": "Warrior"
  },
  {
    "id": "fade_splinter_of_shadow",
    "name": "Fade, splinter of shadow",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 674
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Charm",
      "trickster"
    ],
    "location": "Rune forge"
  },
  {
    "id": "angels_despair",
    "name": "Angel's despair",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 546
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Dirge"
    ],
    "location": "Bridge sentries"
  },
  {
    "id": "rock_idol",
    "name": "Rock idol",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 750
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Geomancer"
    ],
    "location": "Secure vault",
    "pathRequirement": "Mage"
  },
  {
    "id": "blood_soul",
    "name": "Blood soul",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 791
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Weaver"
    ],
    "location": "Evin Daala",
    "pathRequirement": "Warrior"
  },
  {
    "id": "frozen_heart",
    "name": "Frozen heart",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 818
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Shatter"
    ],
    "location": "Nephele"
  },
  {
    "id": "titan_stone",
    "name": "Titan stone",
    "type": "talisman",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 834
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Titan"
    ],
    "location": "Erkil",
    "pathRequirement": "Warrior"
  },
  {
    "id": "wanderers_wytchstone",
    "name": "Wanderer's wytchstone",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 59
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Vendor/Carvel"
  },
  {
    "id": "drusts_medallion",
    "name": "Drust's medallion",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 74
    },
    "stats": {
      "magic": 1
    },
    "abilities": [],
    "location": "Drust the defiled"
  },
  {
    "id": "blood_iron_knot",
    "name": "Blood iron knot",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 34
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Barrow"
  },
  {
    "id": "prayer_beads",
    "name": "Prayer beads",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 359
    },
    "stats": {},
    "abilities": [
      "Heal"
    ],
    "location": "Bishop"
  },
  {
    "id": "number_of_the_beast",
    "name": "Number of the beast",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 300
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Number 13"
  },
  {
    "id": "silver_whistler",
    "name": "Silver whistler",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 170
    },
    "stats": {},
    "abilities": [
      "Faithful friend"
    ],
    "location": "Loggers' camp"
  },
  {
    "id": "eye_of_the_swarm",
    "name": "Eye of the swarm",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 381
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Swarm"
    ],
    "location": "Queen Ballona"
  },
  {
    "id": "betsys_second_compass",
    "name": "Betsy's second compass",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 264
    },
    "stats": {},
    "abilities": [
      "Safe path"
    ],
    "location": "Captain's cabin"
  },
  {
    "id": "torque_of_iron",
    "name": "Torque of iron",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 228
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Rust"
    ],
    "location": "Toymaker's golems"
  },
  {
    "id": "dagonas_heart",
    "name": "Dagona's heart",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 313
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Radiance"
    ],
    "location": "Dagona (side quest)"
  },
  {
    "id": "graven_chill",
    "name": "Graven chill",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 124
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Frostbite"
    ],
    "location": "Gairn"
  },
  {
    "id": "providence",
    "name": "Providence",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 411
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Faith"
    ],
    "location": "Orgorath (special)"
  },
  {
    "id": "sanctified_scale",
    "name": "Sanctified scale",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 569
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Seraphim's symbols"
    ],
    "location": "Boogaloo",
    "pathRequirement": "Warrior"
  },
  {
    "id": "silver_bullet",
    "name": "Silver bullet",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 350
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Quicksilver"
    ],
    "location": "Lycanth",
    "pathRequirement": "Mage"
  },
  {
    "id": "black_pearl_rosary",
    "name": "Black pearl rosary",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 534
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Cistene's chattels"
    ],
    "location": "Umbra",
    "pathRequirement": "Mage"
  },
  {
    "id": "wish_bone",
    "name": "Wish bone",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 629
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "(+4 health) Charm"
    ],
    "location": "Mortzilla"
  },
  {
    "id": "maggot_finger",
    "name": "Maggot finger",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 455
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Wither"
    ],
    "location": "Grub knight",
    "pathRequirement": "Mage"
  },
  {
    "id": "brocks_medallion",
    "name": "Brock's medallion",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 742
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Fearless"
    ],
    "location": "Alligator"
  },
  {
    "id": "dreamcatcher",
    "name": "Dreamcatcher",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 748
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Immobilise"
    ],
    "location": "Succubus"
  },
  {
    "id": "captives_collar",
    "name": "Captive's collar",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 697
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Tigris cages (special)"
  },
  {
    "id": "lucky_crown",
    "name": "Lucky crown",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 243
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Sniper"
  },
  {
    "id": "corroded_pendant",
    "name": "Corroded pendant",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 524
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Rust"
    ],
    "location": "Golden guards"
  },
  {
    "id": "obsidian_shard",
    "name": "Obsidian shard",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 683
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Piercing"
    ],
    "location": "Sitadell",
    "pathRequirement": "Mage"
  },
  {
    "id": "hanumans_hair",
    "name": "Hanuman's hair",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 737
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Monkey mob"
    ],
    "location": "Hanuman"
  },
  {
    "id": "sea_spray_garland",
    "name": "Sea spray garland",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 575
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Wave"
    ],
    "location": "Fisher king",
    "pathRequirement": "Mage"
  },
  {
    "id": "hunters_heart",
    "name": "Hunter's heart",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 729
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Savage call"
    ],
    "location": "Gheira",
    "pathRequirement": "Warrior"
  },
  {
    "id": "illumanti_circlet",
    "name": "Illumanti circlet",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 620
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Confound"
    ],
    "location": "Goblin looters",
    "pathRequirement": "Mage"
  },
  {
    "id": "gullet_scales",
    "name": "Gullet scales",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 554
    },
    "stats": {
      "speed": 1,
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Book wyrm"
  },
  {
    "id": "tendon_rope",
    "name": "Tendon rope",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 728
    },
    "stats": {
      "speed": 1
    },
    "abilities": [
      "Greater heal"
    ],
    "location": "Evin Daala",
    "pathRequirement": "Mage"
  },
  {
    "id": "soldering_iron",
    "name": "Soldering iron",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 823
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Dominate"
    ],
    "location": "Ixion",
    "pathRequirement": "Warrior"
  },
  {
    "id": "chained_heart",
    "name": "Chained heart",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 592
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Channel"
    ],
    "location": "Ixion",
    "pathRequirement": "Mage"
  },
  {
    "id": "garms_whistle",
    "name": "Garm's whistle",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 716
    },
    "stats": {
      "speed": 1,
      "magic": 1
    },
    "abilities": [
      "Packmaster"
    ],
    "location": "Erkil"
  },
  {
    "id": "collar_of_correction",
    "name": "Collar of correction",
    "type": "necklace",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 929
    },
    "stats": {
      "speed": 1,
      "brawn": 1
    },
    "abilities": [
      "Sweet spot"
    ],
    "location": "Krakatoa",
    "pathRequirement": "Rogue"
  },
  {
    "id": "puritans_band",
    "name": "Puritan's band",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 59
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Vendor/Carvel"
  },
  {
    "id": "eponas_blessing",
    "name": "Epona's blessing",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 59
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Vendor/Carvel"
  },
  {
    "id": "all_hallows_ring",
    "name": "All Hallows ring",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 201
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [],
    "location": "Jack'o Lantern"
  },
  {
    "id": "warded_wood",
    "name": "Warded wood",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 133
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [],
    "location": "Sinister sprigs"
  },
  {
    "id": "pilfered_ring",
    "name": "Pilfered ring",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 20
    },
    "stats": {
      "magic": 1
    },
    "abilities": [],
    "location": "Zombie goblin"
  },
  {
    "id": "signet_of_sorrow",
    "name": "Signet of sorrow",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 218
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Suppress"
    ],
    "location": "Reverend"
  },
  {
    "id": "motley_band",
    "name": "Motley band",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 79
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Sneak"
    ],
    "location": "Crews' quarters"
  },
  {
    "id": "pins_n_needles",
    "name": "Pins 'n needles",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 381
    },
    "stats": {},
    "abilities": [
      "Thorns"
    ],
    "location": "Queen Ballona"
  },
  {
    "id": "after_burn",
    "name": "After burn",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 431
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Turn up the heat"
    ],
    "location": "Furnace"
  },
  {
    "id": "the_fellowship_ring",
    "name": "The fellowship ring",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 145
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Tree house"
  },
  {
    "id": "black_hole",
    "name": "Black hole",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 477
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Dark pact"
    ],
    "location": "Toymaker's box"
  },
  {
    "id": "grieving_soul",
    "name": "Grieving soul",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 301
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Fire aura"
    ],
    "location": "Dagona"
  },
  {
    "id": "briar_star",
    "name": "Briar star",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 308
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Thorns"
    ],
    "location": "Orgorath"
  },
  {
    "id": "harvester",
    "name": "Harvester",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 155
    },
    "stats": {
      "brawn": 2,
      "magic": 2
    },
    "abilities": [
      "Regrowth"
    ],
    "location": "Wicker man"
  },
  {
    "id": "scholars_seal",
    "name": "Scholar's seal",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 492
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Confound"
    ],
    "location": "Scholar (side quest)"
  },
  {
    "id": "lycanths_teeth_w_r_",
    "name": "Lycanth's teeth (W/R)",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 232
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Lycanth"
  },
  {
    "id": "gravediggers_ring",
    "name": "Gravedigger's ring",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 246
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Underhand"
    ],
    "location": "Gaia",
    "pathRequirement": "Rogue"
  },
  {
    "id": "pious_halo",
    "name": "Pious halo",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 556
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Seraphim's symbols"
    ],
    "location": "Umbra",
    "pathRequirement": "Warrior"
  },
  {
    "id": "shard_of_sky",
    "name": "Shard of sky",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 297
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Blind"
    ],
    "location": "Zephyr",
    "pathRequirement": "Rogue"
  },
  {
    "id": "circle_of_storms",
    "name": "Circle of storms",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 160
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Zephyr",
    "pathRequirement": "Warrior"
  },
  {
    "id": "weirdstone",
    "name": "Weirdstone",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 350
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Focus"
    ],
    "location": "Lycanth",
    "pathRequirement": "Mage"
  },
  {
    "id": "rain_dance",
    "name": "Rain dance",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 458
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Call of nature"
    ],
    "location": "Boogaloo",
    "pathRequirement": "Mage"
  },
  {
    "id": "seal_of_shadows",
    "name": "Seal of shadows",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 534
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Veil"
    ],
    "location": "Umbra",
    "pathRequirement": "Mage"
  },
  {
    "id": "zilla_bling",
    "name": "Zilla bling",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 629
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "(+4 health) Charm"
    ],
    "location": "Mortzilla"
  },
  {
    "id": "tangle_knot",
    "name": "Tangle knot",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 709
    },
    "stats": {
      "brawn": 1,
      "magic": 1
    },
    "abilities": [
      "Barbs"
    ],
    "location": "The weeper"
  },
  {
    "id": "iron_recluse",
    "name": "Iron recluse",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 757
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Corrode"
    ],
    "location": "Travellers' shelter"
  },
  {
    "id": "shapers_stone",
    "name": "Shaper's stone",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 470
    },
    "stats": {
      "magic": 1,
      "armour": 1
    },
    "abilities": [
      "Might of stone"
    ],
    "location": "Guano chest",
    "pathRequirement": "Mage"
  },
  {
    "id": "ring_of_remedies",
    "name": "Ring of remedies",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 369
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Cauterise"
    ],
    "location": "Buckmaster Bill (side quest)",
    "pathRequirement": "Mage"
  },
  {
    "id": "fyre_fiend",
    "name": "Fyre fiend",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 511
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "Fire shield"
    ],
    "location": "Sun vault"
  },
  {
    "id": "last_breath",
    "name": "Last breath",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 666
    },
    "stats": {},
    "abilities": [
      "(+4 health) Refresh"
    ],
    "location": "Lich",
    "pathRequirement": "Warrior"
  },
  {
    "id": "fishers_friend",
    "name": "Fisher's friend",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 575
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Hooked"
    ],
    "location": "Fisher king",
    "pathRequirement": "Rogue"
  },
  {
    "id": "kiss_of_a_princess",
    "name": "Kiss of a princess",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 575
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Charm"
    ],
    "location": "Fisher king"
  },
  {
    "id": "bad_tooth",
    "name": "Bad tooth",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 714
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Disease"
    ],
    "location": "Gheira",
    "pathRequirement": "Mage"
  },
  {
    "id": "spark_stone",
    "name": "Spark stone",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 770
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Lightning"
    ],
    "location": "Issachar",
    "pathRequirement": "Rogue"
  },
  {
    "id": "twilight_tinder",
    "name": "Twilight tinder",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 761
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Overload"
    ],
    "location": "Issachar",
    "pathRequirement": "Mage"
  },
  {
    "id": "abyssal_firestone",
    "name": "Abyssal firestone",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 789
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "(+2 health) Fire aura"
    ],
    "location": "Nyx the dark wind"
  },
  {
    "id": "wyrmhole",
    "name": "Wyrmhole",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 554
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Vortex"
    ],
    "location": "Book wyrm",
    "pathRequirement": "Mage"
  },
  {
    "id": "aethereal",
    "name": "Aethereal",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 851
    },
    "stats": {
      "armour": 1
    },
    "abilities": [
      "(+2 health) Windblast"
    ],
    "location": "Rune spirit (side quest)"
  },
  {
    "id": "blood_diamond",
    "name": "Blood diamond",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 728
    },
    "stats": {
      "magic": 2
    },
    "abilities": [
      "Bleed"
    ],
    "location": "Evin Daala",
    "pathRequirement": "Mage"
  },
  {
    "id": "heat_of_ardour",
    "name": "Heat of ardour",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 823
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Sear"
    ],
    "location": "Ixion",
    "pathRequirement": "Warrior"
  },
  {
    "id": "crucifixion_nail",
    "name": "Crucifixion nail",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 812
    },
    "stats": {
      "brawn": 1
    },
    "abilities": [
      "Sweet spot"
    ],
    "location": "Ixion",
    "pathRequirement": "Rogue"
  },
  {
    "id": "circle_of_sacrifice",
    "name": "Circle of sacrifice",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 592
    },
    "stats": {
      "magic": 1
    },
    "abilities": [
      "Penance"
    ],
    "location": "Ixion",
    "pathRequirement": "Mage"
  },
  {
    "id": "the_dispossessed",
    "name": "The dispossessed",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 723
    },
    "stats": {
      "brawn": 1,
      "armour": 1
    },
    "abilities": [
      "Steal"
    ],
    "location": "Nephele",
    "pathRequirement": "Rogue"
  },
  {
    "id": "ironbeard_band",
    "name": "Ironbeard band",
    "type": "ring",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 3,
      "section": 834
    },
    "stats": {
      "brawn": 2
    },
    "abilities": [
      "Counter"
    ],
    "location": "Erkil",
    "pathRequirement": "Warrior"
  }
];
const getItemsBySlot = (slot) => {
  return ITEMS.filter((item) => {
    if (slot === "ring1" || slot === "ring2") return item.type === "ring";
    return item.type === slot;
  });
};
const InventorySelector = ({ slot, onSelect, onClose, showAllItems = false, customItems, heroPath }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  let items = [];
  if (customItems) {
    items = customItems;
  } else if (showAllItems) {
    items = ITEMS;
  } else if (slot) {
    items = getItemsBySlot(slot);
  }
  const filteredItems = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    return item.name.toLowerCase().includes(term) || item.bookRef.section && item.bookRef.section.toString().includes(term) || item.location && item.location.toLowerCase().includes(term);
  });
  const isAllowed = (item) => {
    if (!("pathRequirement" in item)) return true;
    return !item.pathRequirement || item.pathRequirement == heroPath;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "equipment-selector-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DqCard,
    {
      className: "equipment-selector-modal",
      onClick: (e) => e.stopPropagation(),
      title: slot ? `Select ${slot}` : "Select Item",
      onClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "selector-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-row-search", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "dq-input",
              placeholder: "Search items...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              autoFocus: true
            }
          ),
          searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "action-btn-secondary",
              onClick: () => setSearchTerm(""),
              title: "Clear search",
              children: "✕"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-card unequip-card", onClick: () => onSelect(null), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-card-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-name", children: "Empty Slot" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-stats", children: "Unequip" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-desc", children: "Clear current equipment from this slot." })
          ] }),
          filteredItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-dim no-items-message", children: [
            'No items found matching "',
            searchTerm,
            '".'
          ] }) : filteredItems.map((item) => {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `item-card ${!isAllowed(item) ? "disabled-item" : ""}`,
                onClick: () => isAllowed(item) && onSelect(item),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-card-header", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-name", children: [
                      item.name,
                      !isAllowed(item) && item.pathRequirement && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "requirement-tag", children: [
                        "(Req: ",
                        item.pathRequirement,
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-source", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-dim source-detail", children: [
                        "Act ",
                        item.bookRef.act
                      ] }),
                      item.bookRef.section && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-dim source-detail", children: [
                        "📖 ",
                        item.bookRef.section
                      ] })
                    ] })
                  ] }),
                  item.type == "backpack" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-stats", children: formatEffect(item.effect) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-stats", children: [
                    item.stats.speed ? `${getStatIcon("speed")} ${item.stats.speed} ` : "",
                    item.stats.brawn ? `${getStatIcon("brawn")} ${item.stats.brawn} ` : "",
                    item.stats.magic ? `${getStatIcon("magic")} ${item.stats.magic} ` : "",
                    item.stats.armour ? `${getStatIcon("armour")} ${item.stats.armour} ` : "",
                    "abilities" in item && item.abilities && item.abilities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-abilities-tag", children: item.abilities.map((a) => `★ ${a} `).join(", ") })
                  ] }),
                  "description" in item && item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-desc", children: item.description }),
                  "notes" in item && item.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-desc", children: item.notes }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-meta-container", children: [
                    item.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "📍 ",
                      item.location
                    ] }),
                    "pathRequirement" in item && item.pathRequirement && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "requirement-meta", children: [
                      "Requires: ",
                      item.pathRequirement
                    ] })
                  ] })
                ]
              },
              item.id
            );
          })
        ] })
      ]
    }
  ) });
};
const heroSilhouette = "" + new URL("hero_silhouette-VN-AEIFZ.png", import.meta.url).href;
const SLOT_CONFIG = {
  head: { top: "5%", left: "50%", label: "Head", icon: "⛑️" },
  necklace: { top: "22%", left: "50%", label: "Neck", icon: "📿" },
  talisman: { top: "22%", left: "20%", label: "Talisman", icon: "🧿" },
  leftHand: { top: "15%", left: "85%", label: "Off", icon: "🛡️" },
  ring2: { top: "32%", left: "85%", label: "Ring 2", icon: "💍" },
  cloak: { top: "43%", left: "12%", label: "Cloak", icon: "🧥" },
  chest: { top: "40%", left: "50%", label: "Chest", icon: "👕" },
  mainHand: { top: "60%", left: "12%", label: "Main", icon: "⚔️" },
  gloves: { top: "60%", left: "85%", label: "Hands", icon: "🧤" },
  ring1: { top: "60%", left: "40%", label: "Ring 1", icon: "💍" },
  feet: { top: "88%", left: "50%", label: "Feet", icon: "👢" }
};
const EquipmentSlots = ({ hero, onEquip, onUnequip }) => {
  const [selectedSlot, setSelectedSlot] = reactExports.useState(null);
  const handleEquip = (item) => {
    if (selectedSlot) {
      if (item) {
        onEquip(item, selectedSlot);
      } else {
        onUnequip(selectedSlot);
      }
      setSelectedSlot(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "equipment-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Equipment" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "equipment-slots", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "human-figure-container", style: { backgroundImage: `url(${heroSilhouette})` }, children: Object.entries(SLOT_CONFIG).map(([slot, config]) => {
      const item = hero.equipment[slot];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "positioned-slot",
          style: { top: config.top, left: config.left },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquipmentSlot,
            {
              label: config.label,
              icon: config.icon,
              item,
              onClick: () => setSelectedSlot(slot)
            }
          )
        },
        slot
      );
    }) }) }),
    selectedSlot && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InventorySelector,
      {
        slot: selectedSlot,
        onSelect: (item) => handleEquip(item),
        onClose: () => setSelectedSlot(null),
        heroPath: hero.path
      }
    )
  ] });
};
const BACKPACK_ITEMS = [
  {
    "id": "healing_potion",
    "name": "Healing Potion",
    "description": "+6 health",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 6
      },
      "source": "Healing Potion",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "speed_potion",
    "name": "Speed Potion",
    "description": "+2 speed",
    "type": "backpack",
    "effect": {
      "stats": {
        "speed": 2
      },
      "source": "Speed Potion",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "brawn_potion",
    "name": "Brawn Potion",
    "description": "+2 brawn",
    "type": "backpack",
    "effect": {
      "stats": {
        "brawn": 2
      },
      "source": "Brawn Potion",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "magic_potion",
    "name": "Magic Potion",
    "description": "+2 magic",
    "type": "backpack",
    "effect": {
      "stats": {
        "magic": 2
      },
      "source": "Magic Potion",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "crocodile_skin",
    "name": "Crocodile Skin",
    "description": "Quest Item",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Crocodile Skin",
      "target": "hero",
      "duration": 0
    },
    "uses": 0,
    "notes": "Dropped by the Crocodile",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 118
    }
  },
  {
    "id": "goblin_grog",
    "name": "Goblin Grog",
    "description": "+4 health",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 4
      },
      "source": "Goblin Grog",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "notes": "Found in Goblin loot",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 125
    }
  },
  {
    "id": "healing_salve",
    "name": "Healing Salve",
    "description": "+6 health",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 6
      },
      "source": "Healing Salve",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "notes": "Found in Goblin loot",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 125
    }
  },
  {
    "id": "miracle_grow",
    "name": "Miracle Grow",
    "description": "+2 brawn",
    "type": "backpack",
    "effect": {
      "stats": {
        "brawn": 2
      },
      "source": "Miracle Grow",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "notes": "Found in Goblin loot",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 125
    }
  },
  {
    "id": "ghoul_hair",
    "name": "Ghoul Hair",
    "description": "Quest Item",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Ghoul Hair",
      "target": "hero",
      "duration": 0
    },
    "uses": 0,
    "notes": "Dropped by Ghouls",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 127
    }
  },
  {
    "id": "explosives_bombs",
    "name": "Explosives / Bombs",
    "description": "+10 damage",
    "type": "backpack",
    "effect": {
      "stats": {
        "damageModifier": 10
      },
      "source": "Explosives / Bombs",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "notes": "Sold by the Tinker",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 175
    }
  },
  {
    "id": "spiders_leg",
    "name": "Spider's Leg",
    "description": "Quest Item",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Spider's Leg",
      "target": "hero",
      "duration": 0
    },
    "uses": 0,
    "notes": "Dropped by Spiders",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 179
    }
  },
  {
    "id": "goblin_grog",
    "name": "Goblin Grog",
    "description": "+4 health",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 4
      },
      "source": "Goblin Grog",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "notes": "Found in Goblin Chief's loot",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 260
    }
  },
  {
    "id": "da_boss",
    "name": "Da Boss",
    "description": "+10 damage",
    "type": "backpack",
    "effect": {
      "stats": {
        "damageModifier": 10
      },
      "source": "Da Boss",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "notes": "Sold by Sea-Spray Steve",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 432
    }
  }
];
const Backpack = ({ hero, onSetItem, onDeleteItem }) => {
  const [selectedIndex, setSelectedIndex] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backpack-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
      "Backpack (",
      hero.backpack.filter((i) => i !== null).length,
      "/",
      hero.backpack.length,
      ")"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "backpack-grid", children: Array.from({ length: hero.backpack.length }).map((_, index) => {
      const item = hero.backpack[index];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquipmentSlot,
        {
          label: `${index + 1}`,
          icon: "🎒",
          item,
          onClick: () => setSelectedIndex(index),
          className: "backpack-slot-wrapper"
        },
        `backpack-${index}`
      );
    }) }),
    selectedIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InventorySelector,
      {
        onSelect: (item) => {
          if (item) {
            onSetItem(item, selectedIndex);
          } else {
            onDeleteItem(selectedIndex);
          }
          setSelectedIndex(null);
        },
        onClose: () => setSelectedIndex(null),
        customItems: BACKPACK_ITEMS
      }
    )
  ] });
};
const HeroEquipment = ({ hero, onEquip, onUnequip, onSetBackpackItem, onDeleteBackpackItem }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DqCard, { title: "Inventory", className: "equipment-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EquipmentSlots,
      {
        hero,
        onEquip,
        onUnequip
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Backpack,
      {
        hero,
        onSetItem: onSetBackpackItem,
        onDeleteItem: onDeleteBackpackItem
      }
    )
  ] });
};
const ENEMIES = [
  {
    "type": "enemy",
    "name": "Mauler",
    "stats": {
      "speed": 5,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Ferocity"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 18
    }
  },
  {
    "type": "enemy",
    "name": "Humbaroth",
    "stats": {
      "speed": 4,
      "brawn": 9,
      "magic": 0,
      "armour": 4,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Punishing blows"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 29
    }
  },
  {
    "type": "enemy",
    "name": "Storm Elemental",
    "stats": {
      "speed": 2,
      "brawn": 0,
      "magic": 1,
      "armour": 1,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Charged"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 33
    }
  },
  {
    "type": "enemy",
    "name": "Malachi of Fire",
    "stats": {
      "speed": 4,
      "brawn": 0,
      "magic": 4,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Fiery aura"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 35
    }
  },
  {
    "type": "enemy",
    "name": "Goblin poachers",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 37
    },
    "notes": "If the goblins habe been reduced to 10 health or less, turn to 77"
  },
  {
    "type": "enemy",
    "name": "Zalladell",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 7,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Black sigill",
      "Bewitched"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 49
    }
  },
  {
    "type": "enemy",
    "name": "Ghouls",
    "stats": {
      "speed": 5,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Piercing claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 59
    }
  },
  {
    "type": "enemy",
    "name": "Spindle",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 3,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Webbed",
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 60
    },
    "notes": "Ignore the Webbed ability if the web was set to fire with the Torch"
  },
  {
    "type": "enemy",
    "name": "Ruffians",
    "stats": {
      "speed": 2,
      "brawn": 3,
      "magic": 0,
      "armour": 1,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Crone's dagger"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 62
    }
  },
  {
    "type": "enemy",
    "name": "Turnips",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 1,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 63
    }
  },
  {
    "type": "enemy",
    "name": "Mist stalker",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 65
    }
  },
  {
    "type": "enemy",
    "name": "Rennie",
    "stats": {
      "speed": 3,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "First cut"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 70
    }
  },
  {
    "type": "enemy",
    "name": "Lake Spirit",
    "stats": {
      "speed": 4,
      "brawn": 0,
      "magic": 5,
      "armour": 2,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 81
    },
    "notes": "If you survive to the end of 5 combat rounds, turn to 234"
  },
  {
    "type": "enemy",
    "name": "Skeleton guards",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Body of bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 90
    }
  },
  {
    "type": "enemy",
    "name": "Grey hag",
    "stats": {
      "speed": 6,
      "brawn": 6,
      "magic": 0,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Warts and all"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 92
    }
  },
  {
    "type": "enemy",
    "name": "Tree roots",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 230,
      "health": 0,
      "maxHealth": 0
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 93
    }
  },
  {
    "type": "enemy",
    "name": "Ancient knight",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Body of bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 98
    }
  },
  {
    "type": "enemy",
    "name": "Ghouls",
    "stats": {
      "speed": 5,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Piercing claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 100
    }
  },
  {
    "type": "enemy",
    "name": "Allura of Water",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 1,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Healing touch"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 105
    }
  },
  {
    "type": "enemy",
    "name": "Valadin Roth",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Faithful duty",
      "Body of bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 109
    }
  },
  {
    "type": "enemy",
    "name": "Goblin poacher",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 118
    }
  },
  {
    "type": "enemy",
    "name": "Changeling",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 3,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Blacke fire"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 121
    }
  },
  {
    "type": "enemy",
    "name": "Huntsman",
    "stats": {
      "speed": 1,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 125
    }
  },
  {
    "type": "enemy",
    "name": "Target dummy",
    "stats": {
      "speed": 5,
      "brawn": 6,
      "magic": 0,
      "armour": 6,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Sack and straw"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 126
    }
  },
  {
    "type": "enemy",
    "name": "Rabid rats",
    "stats": {
      "speed": 3,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 130
    }
  },
  {
    "type": "enemy",
    "name": "Ghoul",
    "stats": {
      "speed": 5,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Piercing claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 138
    }
  },
  {
    "type": "enemy",
    "name": "Scarecrow",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 8,
      "maxHealth": 8
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 139
    }
  },
  {
    "type": "enemy",
    "name": "Leader",
    "stats": {
      "speed": 2,
      "brawn": 3,
      "magic": 0,
      "armour": 4,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 144
    },
    "notes": "Once the leader's health is reduced to 12 or less, turn to 230"
  },
  {
    "type": "enemy",
    "name": "Troll",
    "stats": {
      "speed": 5,
      "brawn": 6,
      "magic": 0,
      "armour": 3,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Knockdown",
      "Regeneration"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 156
    }
  },
  {
    "type": "enemy",
    "name": "Giant crocodile",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 159
    }
  },
  {
    "type": "enemy",
    "name": "Shadow",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 4,
      "armour": 3,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 178
    }
  },
  {
    "type": "enemy",
    "name": "Hobgoblin",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 12,
      "maxHealth": 12
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 184
    }
  },
  {
    "type": "enemy",
    "name": "Giant spider",
    "stats": {
      "speed": 4,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 189
    }
  },
  {
    "type": "enemy",
    "name": "Leader",
    "stats": {
      "speed": 2,
      "brawn": 3,
      "magic": 0,
      "armour": 4,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 201
    },
    "notes": "Once the leader's health is reduced to 12 or less, turn to 233"
  },
  {
    "type": "enemy",
    "name": "Noldor",
    "stats": {
      "speed": 7,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 207
    },
    "notes": "TODO: You can use runes against this enemy."
  },
  {
    "type": "enemy",
    "name": "Changeling",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 4,
      "armour": 2,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Hellfire"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 217
    }
  },
  {
    "type": "enemy",
    "name": "Rennie",
    "stats": {
      "speed": 3,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "First cut"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 220
    }
  },
  {
    "type": "enemy",
    "name": "Voldring of Earth",
    "stats": {
      "speed": 4,
      "brawn": 3,
      "magic": 0,
      "armour": 5,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Mighty blows"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 221
    }
  },
  {
    "type": "enemy",
    "name": "Rattling",
    "stats": {
      "speed": 3,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 12,
      "maxHealth": 12
    },
    "abilities": [
      "Tail lash"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 230
    }
  },
  {
    "type": "enemy",
    "name": "Burrower Alpha",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Acid"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 232
    }
  },
  {
    "type": "enemy",
    "name": "Rattling",
    "stats": {
      "speed": 3,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 12,
      "maxHealth": 12
    },
    "abilities": [
      "Tail lash"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 233
    }
  },
  {
    "type": "enemy",
    "name": "Giant spiders",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 239
    }
  },
  {
    "type": "enemy",
    "name": "Big bad wolf",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 240
    }
  },
  {
    "type": "enemy",
    "name": "Goblin chief",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 242
    }
  },
  {
    "type": "enemy",
    "name": "Talos of Air",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Wind-dancer"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 244
    }
  },
  {
    "type": "enemy",
    "name": "Ghoul",
    "stats": {
      "speed": 5,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Piercing claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 253
    }
  },
  {
    "type": "enemy",
    "name": "Burrower wurm",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Acid"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 262
    }
  },
  {
    "type": "enemy",
    "name": "Burrower wurm",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Acid"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 273
    }
  },
  {
    "type": "enemy",
    "name": "Ghouls",
    "stats": {
      "speed": 5,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Piercing claws",
      "Holy Water"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 274
    }
  },
  {
    "type": "enemy",
    "name": "Fetch",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Dark disciple"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 280
    }
  },
  {
    "type": "enemy",
    "name": "Nalsa",
    "stats": {
      "speed": 11,
      "brawn": 10,
      "magic": 0,
      "armour": 6,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Mighty roar"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 293
    }
  },
  {
    "type": "enemy",
    "name": "Batwing",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Bleed"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 295
    }
  },
  {
    "type": "enemy",
    "name": "Lady Roe",
    "stats": {
      "speed": 8,
      "brawn": 0,
      "magic": 8,
      "armour": 5,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Blood harvest",
      "Vampire",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 302
    }
  },
  {
    "type": "enemy",
    "name": "Baron Greylock",
    "stats": {
      "speed": 8,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Vampire",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 306
    }
  },
  {
    "type": "enemy",
    "name": "Logan",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 9,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Poisened arrow"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 313
    }
  },
  {
    "type": "enemy",
    "name": "Left hook Luke",
    "stats": {
      "speed": 7,
      "brawn": 8,
      "magic": 0,
      "armour": 4,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "By hook",
      "And by crook"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 320
    }
  },
  {
    "type": "enemy",
    "name": "Bat swarm",
    "stats": {
      "speed": 7,
      "brawn": 8,
      "magic": 0,
      "armour": 4,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Watch your step",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 322
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking mage",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 6,
      "armour": 5,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Charge her up"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 323
    }
  },
  {
    "type": "enemy",
    "name": "Vesuvius",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 13,
      "armour": 9,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Molten armour",
      "Body of Flame"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 335
    }
  },
  {
    "type": "enemy",
    "name": "Mud Golen",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 3,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Mud pie"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 337
    }
  },
  {
    "type": "enemy",
    "name": "Hydra",
    "stats": {
      "speed": 12,
      "brawn": 15,
      "magic": 0,
      "armour": 10,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Many heads",
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 350
    }
  },
  {
    "type": "enemy",
    "name": "Nasareim",
    "stats": {
      "speed": 12,
      "brawn": 10,
      "magic": 0,
      "armour": 12,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Dervish",
      "Whirlwind"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 352
    }
  },
  {
    "type": "enemy",
    "name": "Fargin",
    "stats": {
      "speed": 6,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 354
    }
  },
  {
    "type": "enemy",
    "name": "Barkrot",
    "stats": {
      "speed": 10,
      "brawn": 7,
      "magic": 0,
      "armour": 10,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Tangled roots",
      "Air of corruption"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 357
    }
  },
  {
    "type": "enemy",
    "name": "Hive Queen",
    "stats": {
      "speed": 6,
      "brawn": 0,
      "magic": 6,
      "armour": 4,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Wing buffet",
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 358
    }
  },
  {
    "type": "enemy",
    "name": "Clymonistra",
    "stats": {
      "speed": 7,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Piercing",
      "Vampire",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 360
    }
  },
  {
    "type": "enemy",
    "name": "Cave trogs",
    "stats": {
      "speed": 6,
      "brawn": 7,
      "magic": 0,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 361
    }
  },
  {
    "type": "enemy",
    "name": "Snapjaw",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Strangle vines"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 364
    }
  },
  {
    "type": "enemy",
    "name": "Drones",
    "stats": {
      "speed": 7,
      "brawn": 3,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Stingers"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 365
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking hunter",
    "stats": {
      "speed": 8,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [],
    "spawns": [
      "Wreeking net"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 366
    },
    "notes": "After this enemy is killed, the hero wins the combat."
  },
  {
    "type": "enemy",
    "name": "Wreeking net",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 2,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Entrapment"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 366
    }
  },
  {
    "type": "enemy",
    "name": "Centipede",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 3,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Downsized"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 375
    }
  },
  {
    "type": "enemy",
    "name": "Zen",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 8,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Charge",
      "Trample"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 382
    }
  },
  {
    "type": "enemy",
    "name": "Shara Khana",
    "stats": {
      "speed": 10,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Cat's speed"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 386
    }
  },
  {
    "type": "enemy",
    "name": "Kings Louis",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "King of the swingers"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 391
    }
  },
  {
    "type": "enemy",
    "name": "KerKlick",
    "stats": {
      "speed": 7,
      "brawn": 5,
      "magic": 0,
      "armour": 7,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Pincer movement",
      "Unnatural growth"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 393
    }
  },
  {
    "type": "enemy",
    "name": "Jenkins",
    "stats": {
      "speed": 7,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 402
    }
  },
  {
    "type": "enemy",
    "name": "Cinders",
    "stats": {
      "speed": 8,
      "brawn": 0,
      "magic": 9,
      "armour": 6,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Vortex of fire",
      "Body of flame"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 426
    }
  },
  {
    "type": "enemy",
    "name": "Elvera",
    "stats": {
      "speed": 7,
      "brawn": 0,
      "magic": 6,
      "armour": 5,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Black coils",
      "Vampire"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 429
    }
  },
  {
    "type": "enemy",
    "name": "Jester",
    "stats": {
      "speed": 6,
      "brawn": 6,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Itchy and scratchy",
      "Vampire"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 435
    }
  },
  {
    "type": "enemy",
    "name": "The Angler",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 16,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Indigestion"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 438
    }
  },
  {
    "type": "enemy",
    "name": "Shadow Stalker",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 75,
      "maxHealth": 75
    },
    "abilities": [
      "Deadly venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 442
    }
  },
  {
    "type": "enemy",
    "name": "Kindle",
    "stats": {
      "speed": 12,
      "brawn": 11,
      "magic": 0,
      "armour": 9,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Dragon breath",
      "Dragon hide"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 454
    }
  },
  {
    "type": "enemy",
    "name": "Boggart",
    "stats": {
      "speed": 10,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Dread"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 462
    }
  },
  {
    "type": "enemy",
    "name": "Count",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Wailing Bride",
      "Vampire"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 464
    }
  },
  {
    "type": "enemy",
    "name": "Countess",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Painted veil"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 464
    }
  },
  {
    "type": "enemy",
    "name": "Shadow Terror",
    "stats": {
      "speed": 10,
      "brawn": 9,
      "magic": 0,
      "armour": 4,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Fed from fear"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 466
    }
  },
  {
    "type": "enemy",
    "name": "Leviathan",
    "stats": {
      "speed": 11,
      "brawn": 0,
      "magic": 10,
      "armour": 8,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 470
    }
  },
  {
    "type": "enemy",
    "name": "Snappers",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Snappers"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 470
    }
  },
  {
    "type": "enemy",
    "name": "Poison Needles",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Poison Needles"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 470
    }
  },
  {
    "type": "enemy",
    "name": "Thorn Spines",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Thorn Spines"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 470
    }
  },
  {
    "type": "enemy",
    "name": "Purple worm",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Split personality"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 472
    }
  },
  {
    "type": "enemy",
    "name": "Giant Ooze",
    "stats": {
      "speed": 6,
      "brawn": 4,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Glutinous maximus"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 481
    }
  },
  {
    "type": "enemy",
    "name": "Scorpios",
    "stats": {
      "speed": 10,
      "brawn": 7,
      "magic": 0,
      "armour": 4,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Black venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 482
    }
  },
  {
    "type": "enemy",
    "name": "Swamp Giant",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 7,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Knockdown",
      "Body of rock"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 486
    }
  },
  {
    "type": "enemy",
    "name": "Wormwood",
    "stats": {
      "speed": 7,
      "brawn": 7,
      "magic": 0,
      "armour": 4,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Soft spot"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 490
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking mage",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Charge her up"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 491
    }
  },
  {
    "type": "enemy",
    "name": "Ancient ancestors",
    "stats": {
      "speed": 10,
      "brawn": 8,
      "magic": 0,
      "armour": 8,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Body of bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 493
    }
  },
  {
    "type": "enemy",
    "name": "Rumbler",
    "stats": {
      "speed": 7,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Knockdown",
      "Body of rock"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 496
    }
  },
  {
    "type": "enemy",
    "name": "Count",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Blood drinker",
      "Vampire",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 505
    }
  },
  {
    "type": "enemy",
    "name": "Kalimari",
    "stats": {
      "speed": 11,
      "brawn": 10,
      "magic": 0,
      "armour": 9,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Ink bombs"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 510
    }
  },
  {
    "type": "enemy",
    "name": "Inferno",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 7,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Blazing armour"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 527
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking hunter",
    "stats": {
      "speed": 8,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 529
    },
    "notes": "After this enemy is killed, the hero wins the combat."
  },
  {
    "type": "enemy",
    "name": "Wreeking net",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 52,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Entrapment"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 529
    }
  },
  {
    "type": "enemy",
    "name": "Scout",
    "stats": {
      "speed": 14,
      "brawn": 15,
      "magic": 0,
      "armour": 14,
      "health": 85,
      "maxHealth": 85
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 531
    }
  },
  {
    "type": "enemy",
    "name": "Count",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Blood drinker",
      "Vampire",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 535
    }
  },
  {
    "type": "enemy",
    "name": "Phoenix",
    "stats": {
      "speed": 8,
      "brawn": 0,
      "magic": 7,
      "armour": 5,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Body of flame",
      "From the ashes"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 543
    }
  },
  {
    "type": "enemy",
    "name": "Risen Phoenix",
    "stats": {
      "speed": 7,
      "brawn": 0,
      "magic": 6,
      "armour": 5,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Body of flame"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 543
    }
  },
  {
    "type": "enemy",
    "name": "Count",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Blood drinker",
      "Vampire",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 545
    }
  },
  {
    "type": "enemy",
    "name": "Stone Giant",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 12,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Knockdown",
      "Body of rock"
    ],
    "spawns": [
      "Stone Golem",
      "Stone Golem",
      "Stone Golem",
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 554
    }
  },
  {
    "type": "enemy",
    "name": "Stone Golem",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 6,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Body of rock",
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 554
    }
  },
  {
    "type": "enemy",
    "name": "Bone Giant",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 12,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Knockdown",
      "Body of bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 555
    }
  },
  {
    "type": "enemy",
    "name": "The Blob",
    "stats": {
      "speed": 14,
      "brawn": 15,
      "magic": 0,
      "armour": 12,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Knockdown",
      "Bloated body"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 557
    }
  },
  {
    "type": "enemy",
    "name": "Gargoyles",
    "stats": {
      "speed": 11,
      "brawn": 10,
      "magic": 0,
      "armour": 9,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Body of rock"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 563
    }
  },
  {
    "type": "enemy",
    "name": "Chilblain",
    "stats": {
      "speed": 13,
      "brawn": 13,
      "magic": 0,
      "armour": 20,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Ice armour",
      "Body of Ice"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 564
    }
  },
  {
    "type": "enemy",
    "name": "Ice Pillar",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 8,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Ice pillar",
      "Body of Ice"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 564
    }
  },
  {
    "type": "enemy",
    "name": "Inferno",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 7,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Blazing armour",
      "Crazy hal"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 578
    }
  },
  {
    "type": "enemy",
    "name": "Flay",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 15,
      "armour": 16,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Maelstrom",
      "Body of air"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 582
    }
  },
  {
    "type": "enemy",
    "name": "Malcontent",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 15,
      "armour": 13,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Leech"
    ],
    "spawns": [
      "Carrion Crows"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 595
    }
  },
  {
    "type": "enemy",
    "name": "Carrion Crows",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 8,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Carrion Crows"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 595
    }
  },
  {
    "type": "enemy",
    "name": "Budak",
    "stats": {
      "speed": 14,
      "brawn": 14,
      "magic": 0,
      "armour": 12,
      "health": 110,
      "maxHealth": 110
    },
    "abilities": [
      "Lightning reflex"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 601
    }
  },
  {
    "type": "enemy",
    "name": "Flesh Golem",
    "stats": {
      "speed": 13,
      "brawn": 13,
      "magic": 0,
      "armour": 12,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Distraction"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 615
    }
  },
  {
    "type": "enemy",
    "name": "Tor Knight",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 24,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Dismantle",
      "Steel yourself"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 625
    }
  },
  {
    "type": "enemy",
    "name": "Lord of Pain",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 14,
      "armour": 13,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Disease"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 627
    }
  },
  {
    "type": "enemy",
    "name": "Rottaghast",
    "stats": {
      "speed": 14,
      "brawn": 14,
      "magic": 0,
      "armour": 15,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Body of bone"
    ],
    "spawns": [
      "Carrion Beetles"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 650
    }
  },
  {
    "type": "enemy",
    "name": "Carrion beetles",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 10,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Carrion beetles"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 650
    }
  },
  {
    "type": "enemy",
    "name": "Stone Giant",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 12,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Knockdown",
      "Body of rock"
    ],
    "spawns": [
      "Stone Golem",
      "Stone Golem",
      "Stone Golem",
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 652
    }
  },
  {
    "type": "enemy",
    "name": "Stone Golem",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 6,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Body of rock",
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 652
    }
  },
  {
    "type": "enemy",
    "name": "Brothers Grimm",
    "stats": {
      "speed": 13,
      "brawn": 13,
      "magic": 0,
      "armour": 10,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Got ma eyes an yer",
      "Helping Hand"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 653
    }
  },
  {
    "type": "enemy",
    "name": "Stone Giant",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 12,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Knockdown",
      "Body of rock"
    ],
    "spawns": [
      "Stone Golem",
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 658
    }
  },
  {
    "type": "enemy",
    "name": "Stone Golem",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 6,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Body of rock",
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 658
    }
  },
  {
    "type": "enemy",
    "name": "Necromancer",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 10,
      "armour": 10,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Heightened Magic",
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 662
    }
  },
  {
    "type": "enemy",
    "name": "Caeleb",
    "stats": {
      "speed": 13,
      "brawn": 16,
      "magic": 0,
      "armour": 14,
      "health": 65,
      "maxHealth": 65
    },
    "abilities": [
      "Shield Slam"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 676
    }
  },
  {
    "type": "enemy",
    "name": "Bone Wyvern",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Snapping Beak",
      "Body of bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 681
    }
  },
  {
    "type": "enemy",
    "name": "Death Orb",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 12,
      "armour": 11,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Eye Beam"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 684
    }
  },
  {
    "type": "enemy",
    "name": "Crawlers",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 687
    }
  },
  {
    "type": "enemy",
    "name": "Mathis",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 19,
      "health": 250,
      "maxHealth": 250
    },
    "abilities": [
      "Snap out of it!"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 700
    }
  },
  {
    "type": "enemy",
    "name": "Raptors",
    "stats": {
      "speed": 12,
      "brawn": 6,
      "magic": 0,
      "armour": 8,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Piercing"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 701
    }
  },
  {
    "type": "enemy",
    "name": "Wights",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 703
    }
  },
  {
    "type": "enemy",
    "name": "Bone Ghouls",
    "stats": {
      "speed": 13,
      "brawn": 10,
      "magic": 0,
      "armour": 12,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Piercing claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 712
    }
  },
  {
    "type": "enemy",
    "name": "Packmasters",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [],
    "spawns": [
      "Ghoul Pack"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 717
    }
  },
  {
    "type": "enemy",
    "name": "Ghoul Pack",
    "stats": {
      "speed": 12,
      "brawn": 9,
      "magic": 0,
      "armour": 8,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Frenzy",
      "Piercing claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 717
    }
  },
  {
    "type": "enemy",
    "name": "Ghoulash",
    "stats": {
      "speed": 14,
      "brawn": 13,
      "magic": 0,
      "armour": 15,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [],
    "spawns": [
      "Bracelet",
      "Bracelet",
      "Bracelet",
      "Bracelet"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 720
    }
  },
  {
    "type": "enemy",
    "name": "Bracelet",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 8,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Iron Clad"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 720
    }
  },
  {
    "type": "enemy",
    "name": "Shades",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 12,
      "armour": 12,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Grave Chill"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 721
    }
  },
  {
    "type": "enemy",
    "name": "Animated weapons",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 9,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Whirling Blades",
      "Sinister Steel"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 725
    }
  },
  {
    "type": "enemy",
    "name": "Silleer",
    "stats": {
      "speed": 14,
      "brawn": 0,
      "magic": 13,
      "armour": 12,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Deadly Charge"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 734
    }
  },
  {
    "type": "enemy",
    "name": "Magmageddon",
    "stats": {
      "speed": 11,
      "brawn": 0,
      "magic": 11,
      "armour": 9,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Heat Exposure",
      "Body of Flame"
    ],
    "spawns": [
      "3 Fire Sprite"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 738
    }
  },
  {
    "type": "enemy",
    "name": "Fire Sprite",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Fire Sprite"
    ],
    "spawns": [
      "Body of Flame"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 738
    }
  },
  {
    "type": "enemy",
    "name": "Zul Ator",
    "stats": {
      "speed": 14,
      "brawn": 0,
      "magic": 15,
      "armour": 12,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Black Lightening",
      "Heightened Magic"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 745
    }
  },
  {
    "type": "enemy",
    "name": "Snaide",
    "stats": {
      "speed": 14,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Dark Claw"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 746
    }
  },
  {
    "type": "enemy",
    "name": "Snaide (Shadow Infusion)",
    "stats": {
      "speed": 16,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Dark Claw"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 746
    }
  },
  {
    "type": "enemy",
    "name": "Mage Hunter",
    "stats": {
      "speed": 14,
      "brawn": 14,
      "magic": 0,
      "armour": 14,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Whirling Blades",
      "Black Poison",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 748
    }
  },
  {
    "type": "enemy",
    "name": "Dr. Liechtenstein",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 10,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Mad Scientist"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 752
    }
  },
  {
    "type": "enemy",
    "name": "Nyms",
    "stats": {
      "speed": 13,
      "brawn": 13,
      "magic": 0,
      "armour": 12,
      "health": 65,
      "maxHealth": 65
    },
    "abilities": [
      "Double Danger",
      "Lightning Reflexes"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 753
    }
  },
  {
    "type": "enemy",
    "name": "Packmasater",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Whiplash"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 756
    }
  },
  {
    "type": "enemy",
    "name": "Bone Giants",
    "stats": {
      "speed": 13,
      "brawn": 14,
      "magic": 0,
      "armour": 14,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Knockdown",
      "Body of Bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 758
    }
  },
  {
    "type": "enemy",
    "name": "Horrors",
    "stats": {
      "speed": 14,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Sucker Punch"
    ],
    "spawns": [
      "Locust"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 764
    }
  },
  {
    "type": "enemy",
    "name": "Locust",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Nasty Nibblers"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 764
    }
  },
  {
    "type": "enemy",
    "name": "Necromancer",
    "stats": {
      "speed": 14,
      "brawn": 0,
      "magic": 12,
      "armour": 8,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Raise Dead"
    ],
    "spawns": [
      "Skeleton Horde"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 768
    }
  },
  {
    "type": "enemy",
    "name": "Skeleton Horde",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 8,
      "armour": 10,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Body of Bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 768
    }
  },
  {
    "type": "enemy",
    "name": "Bone Construct",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Raking Claws",
      "Wyvern Talons",
      "Body of Bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 772
    }
  },
  {
    "type": "enemy",
    "name": "Tor Knight",
    "stats": {
      "speed": 13,
      "brawn": 14,
      "magic": 0,
      "armour": 24,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Dismantle",
      "Steel yourself"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 773
    }
  },
  {
    "type": "enemy",
    "name": "Ghoul Pack",
    "stats": {
      "speed": 13,
      "brawn": 7,
      "magic": 0,
      "armour": 12,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Piercing Claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 781
    }
  },
  {
    "type": "enemy",
    "name": "Sharroth",
    "stats": {
      "speed": 14,
      "brawn": 0,
      "magic": 14,
      "armour": 12,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [],
    "spawns": [
      "Tentacle",
      "Tentacle",
      "Tentacle",
      "Tentacle"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 782
    }
  },
  {
    "type": "enemy",
    "name": "Tentacle",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 6,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Oozing Tentacles"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 782
    }
  },
  {
    "type": "enemy",
    "name": "Baalim",
    "stats": {
      "speed": 12,
      "brawn": 10,
      "magic": 0,
      "armour": 10,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Thorn Fists",
      "Heightened Senses"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 784
    }
  },
  {
    "type": "enemy",
    "name": "Dark Arthurian",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 12,
      "armour": 13,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Dark Mending",
      "Team Effort",
      "Heal me"
    ],
    "spawns": [
      "Necromancer",
      "Necromancer",
      "Necromancer"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 790
    }
  },
  {
    "type": "enemy",
    "name": "Necromancer",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 6,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Raise Dead"
    ],
    "spawns": [
      "Skeleton Horde"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 790
    }
  },
  {
    "type": "enemy",
    "name": "The Architect",
    "stats": {
      "speed": 12,
      "brawn": 13,
      "magic": 0,
      "armour": 15,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [],
    "spawns": [
      "Holy Flame",
      "Holy Circle",
      "Holy Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 804
    }
  },
  {
    "type": "enemy",
    "name": "Holy Flame",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 4,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Holy Flame"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 804
    }
  },
  {
    "type": "enemy",
    "name": "Holy Circle",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 4,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Holy Circle"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 804
    }
  },
  {
    "type": "enemy",
    "name": "Holy Shield",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 4,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Holy Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 804
    }
  },
  {
    "type": "enemy",
    "name": "Daarko",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Elemental Master"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 807
    }
  },
  {
    "type": "enemy",
    "name": "Daarko (Shadow Form)",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 11,
      "armour": 12,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Elemental Master",
      "Shadow Form"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 807
    }
  },
  {
    "type": "enemy",
    "name": "Daarko (Flame Form)",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 16,
      "armour": 10,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Elemental Master",
      "Flame Form"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 807
    }
  },
  {
    "type": "enemy",
    "name": "Daarko (Rock Form)",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 13,
      "armour": 20,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Elemental Master",
      "Rock Form"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 807
    }
  },
  {
    "type": "enemy",
    "name": "Sanrah",
    "stats": {
      "speed": 15,
      "brawn": 10,
      "magic": 0,
      "armour": 11,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Retaliation",
      "Inquisitor's Wrath",
      "Healer's Gift"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 809
    }
  },
  {
    "type": "enemy",
    "name": "Tomb Robber",
    "stats": {
      "speed": 12,
      "brawn": 11,
      "magic": 0,
      "armour": 8,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Keen Edge"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 816
    }
  },
  {
    "type": "enemy",
    "name": "Gorgis",
    "stats": {
      "speed": 14,
      "brawn": 8,
      "magic": 0,
      "armour": 13,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Fatigue",
      "Piercing",
      "Iron-Mane"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 817
    }
  },
  {
    "type": "enemy",
    "name": "Sentient Anomaly",
    "stats": {
      "speed": 12,
      "brawn": 0,
      "magic": 16,
      "armour": 0,
      "health": 0,
      "maxHealth": 0
    },
    "abilities": [
      "Absorption",
      "Concentration"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 818
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 16,
      "brawn": 15,
      "magic": 0,
      "armour": 10,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 15,
      "brawn": 12,
      "magic": 0,
      "armour": 8,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 10,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 15,
      "brawn": 12,
      "magic": 0,
      "armour": 8,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 10,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Viprus",
    "stats": {
      "speed": 14,
      "brawn": 13,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Deadly Venom"
    ],
    "spawns": [
      "Snakes"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 835
    }
  },
  {
    "type": "enemy",
    "name": "Snakes",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 8,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Tight Spot"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 835
    }
  },
  {
    "type": "enemy",
    "name": "Sammain",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 10,
      "armour": 20,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Wrath of Winter",
      "Shatter Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 842
    }
  },
  {
    "type": "enemy",
    "name": "Bone Angel",
    "stats": {
      "speed": 13,
      "brawn": 11,
      "magic": 0,
      "armour": 11,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Terrible Talons",
      "Holy Aura",
      "Caaleb's Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 849
    }
  },
  {
    "type": "enemy",
    "name": "Ghasts",
    "stats": {
      "speed": 16,
      "brawn": 9,
      "magic": 0,
      "armour": 7,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Gathering of Ghasts",
      "Bolt from the Blue"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 854
    }
  },
  {
    "type": "enemy",
    "name": "Styraxian Steed",
    "stats": {
      "speed": 15,
      "brawn": 13,
      "magic": 0,
      "armour": 16,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Blindside",
      "Sharpshooter"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 861
    }
  },
  {
    "type": "enemy",
    "name": "Clockwerk",
    "stats": {
      "speed": 12,
      "brawn": 11,
      "magic": 0,
      "armour": 10,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Body of Metal"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 872
    }
  },
  {
    "type": "enemy",
    "name": "Cerebral Cortex",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 10,
      "armour": 8,
      "health": 180,
      "maxHealth": 180
    },
    "abilities": [
      "Neural Blast",
      "Magic Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 877
    }
  },
  {
    "type": "enemy",
    "name": "Jorvic",
    "stats": {
      "speed": 12,
      "brawn": 13,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Two Arms!",
      "Heal me",
      "Team Effort"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 878
    }
  },
  {
    "type": "enemy",
    "name": "Keldred",
    "stats": {
      "speed": 13,
      "brawn": 10,
      "magic": 0,
      "armour": 8,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Mark of Fury",
      "Heightened Senses"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 886
    }
  },
  {
    "type": "enemy",
    "name": "Malaise",
    "stats": {
      "speed": 12,
      "brawn": 11,
      "magic": 0,
      "armour": 10,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Withering Strikes",
      "Deadly Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 904
    }
  },
  {
    "type": "enemy",
    "name": "Apprentice",
    "stats": {
      "speed": 12,
      "brawn": 0,
      "magic": 9,
      "armour": 8,
      "health": 85,
      "maxHealth": 85
    },
    "abilities": [
      "Giblets",
      "Dark Master"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 911
    }
  },
  {
    "type": "enemy",
    "name": "Branded Brute",
    "stats": {
      "speed": 13,
      "brawn": 14,
      "magic": 0,
      "armour": 8,
      "health": 110,
      "maxHealth": 110
    },
    "abilities": [
      "Power of Shadow",
      "Dark Runes"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 919
    }
  },
  {
    "type": "enemy",
    "name": "Sentries",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 12,
      "armour": 0,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Endless Swarm"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 921
    }
  },
  {
    "type": "enemy",
    "name": "Membrane",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 19,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Avian's aid"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 921
    }
  },
  {
    "type": "enemy",
    "name": "Poison Nodes",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Poison Nodes"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 921
    }
  },
  {
    "type": "enemy",
    "name": "Decayers",
    "stats": {
      "speed": 15,
      "brawn": 13,
      "magic": 0,
      "armour": 7,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Disease"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 924
    }
  },
  {
    "type": "enemy",
    "name": "Spore Cloud",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Swarm of Spores",
      "Natural Immunity"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 924
    }
  },
  {
    "type": "enemy",
    "name": "Lansbury's Shield",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 924
    }
  },
  {
    "type": "enemy",
    "name": "The Wrecker",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 11,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Clobbering Time",
      "Inquisitor's Wrath",
      "Healer's Gift"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 930
    }
  },
  {
    "type": "enemy",
    "name": "Banshee",
    "stats": {
      "speed": 14,
      "brawn": 13,
      "magic": 0,
      "armour": 8,
      "health": 76,
      "maxHealth": 76
    },
    "abilities": [
      "Gathering Darkness",
      "Wail of the Banshee"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 932
    }
  },
  {
    "type": "enemy",
    "name": "Lorcan",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 13,
      "armour": 8,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Enduring Spirit"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 939
    }
  },
  {
    "type": "enemy",
    "name": "Statue",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 10,
      "health": 24,
      "maxHealth": 24
    },
    "abilities": [
      "Stomping Statues",
      "Magic of the Makers",
      "Enchanted Stone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 939
    }
  }
];
const EnemySelector = ({ onSelect }) => {
  const [mode, setMode] = reactExports.useState("list");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [customEnemy, setCustomEnemy] = reactExports.useState({
    type: "enemy",
    name: "Custom Enemy",
    stats: {
      speed: 2,
      brawn: 2,
      magic: 2,
      armour: 0,
      health: 20,
      maxHealth: 20
    },
    bookRef: {
      book: "Core",
      act: 1
    },
    abilities: []
  });
  const filteredEnemies = ENEMIES.filter((enemy) => {
    const term = searchTerm.toLowerCase();
    return enemy.name.toLowerCase().includes(term) || enemy.bookRef.section && enemy.bookRef.section.toString().includes(term);
  });
  const handleCustomChange = (field, value) => {
    if (field === "name") {
      setCustomEnemy((prev) => ({ ...prev, name: String(value) }));
    } else if (field === "bookRef" || field === "abilities" || field === "preventHealing" || field === "stats") ;
    else {
      setCustomEnemy((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          [field]: value,
          maxHealth: field === "health" ? Number(value) : prev.stats.maxHealth
        }
      }));
    }
  };
  const confirmCustomEnemy = () => {
    onSelect({
      ...customEnemy,
      stats: { ...customEnemy.stats, maxHealth: customEnemy.stats.health }
    });
  };
  const selectTrainingDummy = () => {
    onSelect({
      type: "enemy",
      name: "Training Dummy",
      stats: {
        speed: 2,
        brawn: 2,
        magic: 0,
        armour: 0,
        health: 20,
        maxHealth: 20
      },
      bookRef: {
        book: "",
        act: 0
      },
      abilities: []
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DqCard, { title: "Select Opponent", className: "enemy-selector-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "selector-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "enemy-tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `tab-btn ${mode === "list" ? "active" : ""}`,
            onClick: () => setMode("list"),
            children: "Bestiary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `tab-btn ${mode === "custom" ? "active" : ""}`,
            onClick: () => setMode("custom"),
            children: "Custom"
          }
        )
      ] }),
      mode === "list" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-row-search", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            className: "dq-input",
            placeholder: "Search enemy...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            autoFocus: true
          }
        ),
        searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "action-btn-secondary",
            onClick: () => setSearchTerm(""),
            title: "Clear search",
            children: "✕"
          }
        )
      ] })
    ] }),
    mode === "list" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "items-list", children: filteredEnemies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-dim", style: { textAlign: "center", padding: "20px" }, children: "No enemies found." }) : filteredEnemies.map((enemy, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-card enemy-card", onClick: () => onSelect(enemy), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-name", children: enemy.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-source", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-dim", style: { fontSize: "0.8rem" }, children: [
            "Act ",
            enemy.bookRef.act
          ] }),
          enemy.bookRef.section && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-dim", style: { fontSize: "0.8rem" }, children: [
            "📖 ",
            enemy.bookRef.section
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-stats", children: [
        `${getStatIcon("speed")} ${enemy.stats.speed} `,
        `${getStatIcon("brawn")} ${enemy.stats.brawn} `,
        `${getStatIcon("magic")} ${enemy.stats.magic} `,
        `${getStatIcon("armour")} ${enemy.stats.armour} `,
        `${getStatIcon("health")} ${enemy.stats.health}`
      ] }),
      enemy.abilities && enemy.abilities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-abilities-tag", children: enemy.abilities.map((a) => `★ ${a}`).join(", ") })
    ] }, idx)) }),
    mode === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "custom-enemy-form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stats-grid", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            className: "enemy-name-input",
            value: customEnemy.name,
            onChange: (e) => handleCustomChange("name", e.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-label", children: [
            getStatIcon("speed"),
            " Speed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NumberControl,
            {
              value: customEnemy.stats.speed,
              onChange: (v2) => handleCustomChange("speed", v2),
              min: 0
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-label", children: [
            getStatIcon("brawn"),
            " Brawn"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NumberControl,
            {
              value: customEnemy.stats.brawn,
              onChange: (v2) => handleCustomChange("brawn", v2),
              min: 0
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-label", children: [
            getStatIcon("magic"),
            " Magic"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NumberControl,
            {
              value: customEnemy.stats.magic,
              onChange: (v2) => handleCustomChange("magic", v2),
              min: 0
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-label", children: [
            getStatIcon("armour"),
            " Armour"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NumberControl,
            {
              value: customEnemy.stats.armour,
              onChange: (v2) => handleCustomChange("armour", v2),
              min: 0
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-label", children: [
            getStatIcon("health"),
            " Health"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NumberControl,
            {
              value: customEnemy.stats.health,
              onChange: (v2) => handleCustomChange("health", v2),
              min: 1
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: confirmCustomEnemy, children: "Start Fight" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary", onClick: selectTrainingDummy, style: { marginTop: "10px" }, children: "Fight Dummy" })
    ] })
  ] });
};
function getOpponent(target) {
  return target === "hero" ? "enemy" : "hero";
}
function getDamageType(target) {
  switch (target) {
    case "hero":
      return "damage-hero";
    case "enemy":
      return "damage-enemy";
    default:
      return "info";
  }
}
function sumDice(rolls) {
  if (!rolls) return 0;
  return rolls.reduce((sum, roll) => sum + roll.value, 0);
}
function rollDie() {
  return {
    value: Math.floor(Math.random() * 6) + 1,
    isRerolled: false
  };
}
function rollDice(count) {
  return new Array(count).fill(0).map(() => rollDie());
}
function deterministicRoll(rolls) {
  return rolls.map((r2) => {
    return { value: r2, isRerolled: false };
  });
}
function rerollDie() {
  const newDice = rollDie();
  newDice.isRerolled = true;
  return newDice;
}
function rerollSelectedDie(dice, selectedIndex) {
  const newDice = [...dice];
  newDice[selectedIndex] = rerollDie();
  return newDice;
}
function hasDouble(rolls) {
  if (!rolls || rolls.length < 2) return false;
  const values = rolls.map((r2) => typeof r2 === "number" ? r2 : r2.value);
  return new Set(values).size !== values.length;
}
function formatDice(rolls) {
  if (!rolls) return "";
  return rolls.map((r2) => typeof r2 === "number" ? r2 : r2.value).join("+");
}
const AttackSource = "Attack";
const activeAbilities = /* @__PURE__ */ new Set();
function forEachActiveAbility(state, callback) {
  const allAbilities = [
    ...state.hero.activeAbilities.values(),
    ...state.enemies.flatMap((e) => [...e.activeAbilities.values()])
  ];
  allAbilities.forEach((ability) => {
    const def = getAbilityDefinition(ability.name);
    if (!def || activeAbilities.has(ability.name)) return;
    activeAbilities.add(ability.name);
    callback(ability, def);
    activeAbilities.delete(ability.name);
  });
}
function runOnDamageDealtHooks(state, victim, source, amount) {
  forEachActiveAbility(state, (ability, def) => {
    if (def.onDamageDealt) {
      state = def.onDamageDealt(state, { ability, owner: ability.owner, target: victim }, source, amount);
    }
  });
  return state;
}
function setStats(state, target, stats) {
  const char = getCombatant(state, target);
  const newChar = {
    ...char,
    stats: {
      ...char.stats,
      ...stats
    }
  };
  return updateCombatant(state, target, newChar);
}
function runOnDamageRollHooks(state) {
  const looser = getOpponent(state.winner);
  forEachActiveAbility(state, (ability, def) => {
    var _a;
    if (def.onDamageRoll && ((_a = state.damage) == null ? void 0 : _a.damageRolls)) {
      state = def.onDamageRoll(state, { ability, owner: ability.owner, target: looser });
    }
  });
  return state;
}
function runOnDamageCalculateHooks(state) {
  const victim = getOpponent(state.winner);
  forEachActiveAbility(state, (ability, def) => {
    var _a;
    if (def.onDamageCalculate && ((_a = state.damage) == null ? void 0 : _a.damageRolls)) {
      const mod = def.onDamageCalculate(state, { ability, owner: ability.owner, target: victim });
      if (mod) {
        const newModifiers = [...state.damage.modifiers, {
          amount: mod,
          source: def.name,
          target: victim
        }];
        state = {
          ...state,
          damage: {
            ...state.damage,
            modifiers: newModifiers
          }
        };
        state = addLogs(state, {
          message: `Added damage modifier ${mod} from ${def.name}`
        });
      }
    }
  });
  return state;
}
function setDamageRoll(state, damageRolls) {
  state = {
    ...state,
    phase: "damage-roll",
    damage: {
      damageRolls: damageRolls ?? state.damage.damageRolls,
      modifiers: []
    }
  };
  state = addLogs(state, {
    message: `Damage roll: ${formatDice(state.damage.damageRolls)}=${sumDice(state.damage.damageRolls)}`
  });
  state = runOnDamageRollHooks(state);
  state = runOnDamageCalculateHooks(state);
  return state;
}
function modifyDamageRolls(state, damageRolls, source) {
  const originalRolls = state.damage.damageRolls;
  state = {
    ...state,
    damage: {
      ...state.damage,
      damageRolls,
      modifiers: []
    }
  };
  state = addLogs(state, {
    message: `Damage roll modified by (${source}). Changed from ${formatDice(originalRolls)} to ${formatDice(damageRolls)}`
  });
  state = runOnDamageRollHooks(state);
  state = runOnDamageCalculateHooks(state);
  return state;
}
function dealDamage(state, source, target, amount, message) {
  const targetChar = getCombatant(state, target);
  if (!targetChar) return state;
  if (targetChar.stats.health <= 0) return state;
  const actualDamage = Math.min(amount, targetChar.stats.health);
  state = setStats(state, target, {
    health: targetChar.stats.health - actualDamage
  });
  state = {
    ...state,
    damageDealt: [
      ...state.damageDealt,
      { target, source, amount: actualDamage }
    ]
  };
  state = addLogs(state, {
    message: message ?? `${source} dealt ${actualDamage} damage to ${targetChar.name}`,
    type: getDamageType(target)
  });
  state = runOnDamageDealtHooks(state, target, source, actualDamage);
  return state;
}
function healDamage(state, source, target, amount, message) {
  const targetChar = getCombatant(state, target);
  if (!targetChar) return state;
  if (targetChar.stats.health === targetChar.stats.maxHealth) return state;
  const actualHealed = Math.min(amount, targetChar.stats.maxHealth - targetChar.stats.health);
  state = setStats(state, target, {
    health: targetChar.stats.health + actualHealed
  });
  state = addLogs(state, {
    message: message ?? `${source} healed ${actualHealed} health to ${targetChar.name}`,
    type: getDamageType(target)
  });
  return state;
}
function requireAbilityDefinition(name) {
  const def = getAbilityDefinition(name);
  if (!def) throw new Error(`Ability ${name} not found`);
  return def;
}
function addAbility(combatant, def, item) {
  let activeAbility;
  const canonical = toCanonicalName(def.name);
  if (combatant.activeAbilities.has(canonical)) {
    activeAbility = combatant.activeAbilities.get(canonical);
  } else {
    activeAbility = {
      name: def.name,
      owner: combatant.type,
      def
    };
    combatant.activeAbilities.set(canonical, activeAbility);
  }
  switch (def.type) {
    case "speed":
    case "combat":
    case "modifier":
    case "special":
      activeAbility.uses = (activeAbility.uses ?? 0) + (def.uses ?? 1);
      break;
  }
  if (item) activeAbility.sources = [...activeAbility.sources ?? [], item];
  return activeAbility;
}
function cloneActiveAbilities(activeAbilities2) {
  return new Map(activeAbilities2);
}
function updateCombatantActiveAbilities(state, target, newAbilities) {
  const char = getCombatant(state, target);
  const newChar = { ...char, activeAbilities: newAbilities };
  return updateCombatant(state, target, newChar);
}
function useAbility(state, target, name) {
  const char = getCombatant(state, target);
  const canonicalName = toCanonicalName(name);
  const originalAbility = char.activeAbilities.get(canonicalName);
  if (!originalAbility) return state;
  const newActiveAbilities = cloneActiveAbilities(char.activeAbilities);
  const newAbility = { ...originalAbility };
  newAbility.uses--;
  if (newAbility.uses === 0) {
    newActiveAbilities.delete(canonicalName);
  } else {
    newActiveAbilities.set(canonicalName, newAbility);
  }
  return updateCombatantActiveAbilities(state, target, newActiveAbilities);
}
function hasAbility(state, target, name) {
  const activeAbilities2 = getCombatant(state, target).activeAbilities;
  const canonicalName = toCanonicalName(name);
  for (const key of activeAbilities2.keys()) {
    if (key === canonicalName) return true;
  }
  return false;
}
function hasEffect(state, target, source) {
  return getCombatant(state, target).activeEffects.some((e) => e.source === source);
}
function getEffect(state, target, source) {
  return getCombatant(state, target).activeEffects.find((e) => e.source === source);
}
function appendEffect(state, target, effect) {
  const char = getCombatant(state, target);
  const newChar = {
    ...char,
    activeEffects: [
      ...char.activeEffects,
      effect
    ]
  };
  state = updateCombatant(state, target, newChar);
  state = addLogs(state, {
    message: `${effect.source} applied effect ${formatEffect(effect)} to ${char.name}`
  });
  return state;
}
function applyEffect(state, effect) {
  const target = effect.target;
  if (effect.duration === void 0 || effect.duration > 0) {
    state = appendEffect(state, target, effect);
  } else if (effect.duration === 0) {
    const char = getCombatant(state, target);
    const newChar = {
      ...char,
      stats: applyStatsModification(char.stats, effect.stats)
    };
    state = updateCombatant(state, target, newChar);
    state = addLogs(state, {
      message: `${effect.source} applied effect ${formatEffect(effect)} to ${newChar.name}`
    });
  }
  return state;
}
function removeEffect(state, target, source) {
  const char = getCombatant(state, target);
  const newChar = {
    ...char,
    activeEffects: char.activeEffects.filter((e) => e.source !== source)
  };
  state = updateCombatant(state, target, newChar);
  state = addLogs(state, {
    message: `${source} removed from ${newChar.name}`
  });
  return state;
}
function hasEquipment(hero, equipmentName, locations) {
  const candidateLocations = locations ?? Object.keys(hero.original.equipment);
  return candidateLocations.some((slot) => {
    var _a, _b;
    return (_b = (_a = hero.original.equipment[slot]) == null ? void 0 : _a.name) == null ? void 0 : _b.match(equipmentName);
  });
}
function skipDamagePhase(state, message) {
  return {
    ...state,
    phase: "passive-damage",
    damage: {
      damageRolls: [],
      modifiers: []
    },
    logs: addLogs(state.logs, { message, type: "info" })
  };
}
function addLogs(arg, ...logs) {
  const fullLogs = logs.filter((l2) => l2.message).map((log) => {
    const round = !Array.isArray(arg) ? arg.round : log.round;
    const message = log.message;
    const type = log.type ?? "info";
    const fullLog = {
      ...log,
      round,
      message,
      type
    };
    console.log(`${fullLog.round}: ${fullLog.message}`);
    return fullLog;
  });
  if (Array.isArray(arg)) {
    return [...arg, ...fullLogs];
  }
  return { ...arg, logs: [...arg.logs, ...fullLogs] };
}
function getActiveEnemy(state) {
  return state.enemies[0];
}
function getCombatant(state, selector) {
  const type = typeof selector === "string" ? selector : selector.type;
  if (type === "hero") return state.hero;
  const index = typeof selector === "object" ? selector.enemyIndex ?? 0 : 0;
  return state.enemies[index];
}
function updateCombatant(state, selector, combatant) {
  const type = typeof selector === "string" ? selector : selector.type;
  if (type === "hero") {
    return { ...state, hero: combatant };
  }
  const index = typeof selector === "object" ? selector.enemyIndex ?? 0 : 0;
  const newEnemies = [...state.enemies];
  newEnemies[index] = combatant;
  return { ...state, enemies: newEnemies };
}
function getEnemyDefinition(name) {
  return ENEMIES.find((e) => e.name === name);
}
function resolveSpawns(enemies) {
  const result = [];
  const queue = [...enemies];
  let count = 0;
  const MAX_ENEMIES = 20;
  while (queue.length > 0 && count < MAX_ENEMIES) {
    const current = queue.shift();
    result.push(current);
    count++;
    if (current.spawns && current.spawns.length > 0) {
      for (const spawnName of current.spawns) {
        const spawnDef = getEnemyDefinition(spawnName);
        if (spawnDef) {
          queue.push({ ...spawnDef });
        } else {
          console.warn(`Spawn definition not found: ${spawnName}`);
        }
      }
    }
  }
  if (queue.length > 0) {
    console.warn(`Spawn limit reached (${MAX_ENEMIES}). Some enemies were not spawned.`);
  }
  return result;
}
registerAbility({
  name: "Avenging Spirit",
  type: "combat",
  description: "When you take health damage from an opponent’s damage score/dice, you inflict damage back equal to your armour. This ignores the opponent's armour and cannot be increased by modifier abilities.",
  onDamageDealt: (state, { owner, target }, source, amount) => {
    if (owner !== target || amount <= 0 || !target || source !== AttackSource) return state;
    const victim = getCombatant(state, target);
    if (!victim) return state;
    const victimArmour = victim.stats.armour || 0;
    const opponent = getOpponent(owner);
    if (!opponent) return state;
    const damageBack = victimArmour;
    if (damageBack <= 0) return state;
    return dealDamage(state, "Avenging Spirit", opponent, damageBack);
  }
});
function resolveTarget(state, context, target) {
  switch (target) {
    case "hero":
      return "hero";
    case "enemy":
      return "enemy";
    case "owner":
      return context.owner;
    case "opponent":
      return getOpponent(context.owner);
    case "winner":
      return state.winner;
    case "loser":
      return getOpponent(state.winner);
  }
}
function canModifySpeed(state) {
  return ["combat-start", "round-start"].includes(state.phase);
}
function canModifySpeedDice(state) {
  return ["combat-start", "round-start", "speed-roll"].includes(state.phase);
}
function canModifyDamage(state) {
  return ["damage-roll"].includes(state.phase);
}
function canModifyDamageDice(state) {
  return ["combat-start", "round-start", "damage-roll"].includes(state.phase);
}
function canModifyArmour(state) {
  return ["combat-start", "round-start", "apply-damage"].includes(state.phase);
}
function isHeroDamageRollPhase(state) {
  return canModifyDamage(state) && state.winner === "hero";
}
function isEnemyDamageRollPhase(state) {
  return canModifyDamage(state) && state.winner === "enemy";
}
function isOwnerDamageRollPhase(state, context) {
  return canModifyDamage(state) && state.winner === context.owner;
}
function isOpponentDamageRollPhase(state, context) {
  return canModifyDamage(state) && state.winner === getOpponent(context.owner);
}
function createStatModifierAbility(config) {
  return {
    name: config.name,
    type: config.type,
    description: config.description,
    icon: config.icon,
    canActivate: config.canActivate,
    onActivate: (state, context) => {
      if (config.canActivate && !config.canActivate(state, context)) {
        return state;
      }
      const target = resolveTarget(state, context, config.target || context.owner);
      const effect = config.effect || {
        source: config.name,
        target,
        stats: config.stats || {},
        duration: config.duration,
        icon: config.icon
        // Use the icon from config
      };
      return appendEffect(state, target, effect);
    }
  };
}
function createSpeedDiceModifier(config) {
  return createStatModifierAbility({
    name: config.name,
    description: config.description,
    icon: getStatIcon("speed"),
    target: config.target,
    canActivate: canModifySpeed,
    stats: { speedDice: config.speedModifier },
    duration: config.duration,
    type: config.type ?? "speed"
  });
}
function createDamageDiceModifier(config) {
  return createStatModifierAbility({
    name: config.name,
    description: config.description,
    icon: getStatIcon("die"),
    target: config.target,
    canActivate: canModifyDamage,
    stats: { damageDice: config.damageModifier },
    duration: config.duration,
    type: config.type ?? "combat"
  });
}
function modifySpeedRolls(state, target, modifier) {
  const propName = target === "hero" ? "heroSpeedRolls" : "enemySpeedRolls";
  const oldRolls = state[propName];
  if (!oldRolls) return state;
  const newRolls = modifier([...oldRolls]);
  state = {
    ...state,
    [propName]: newRolls
  };
  state = addLogs(state, {
    message: `${target} speed dice modified: ${formatDice(oldRolls)} -> ${formatDice(newRolls)}`
  });
  return state;
}
function createReactionAbility(config) {
  const checker = config.canActivate || isOpponentDamageRollPhase;
  return {
    name: config.name,
    type: config.type ?? "combat",
    description: config.description,
    icon: config.icon,
    canActivate: checker,
    onActivate: (state, context) => {
      if (!checker(state, context)) return state;
      const blockMsg = `Ability ${config.name} blocked damage`;
      state = skipDamagePhase(state, blockMsg);
      if (config.damageDice && config.damageDice > 0) {
        const dmgRolls = rollDice(config.damageDice);
        const dmg = sumDice(dmgRolls);
        state = dealDamage(
          state,
          config.name,
          getOpponent(context.owner),
          dmg,
          `Counter damage from ${config.name}: ${formatDice(dmgRolls)}=${dmg}`
        );
      }
      return state;
    }
  };
}
function createRetaliationAbility$1(config) {
  return {
    name: config.name,
    type: config.type ?? "combat",
    description: config.description,
    icon: config.icon,
    canActivate: config.canActivate,
    onDamageDealt: (state, context, _source, damage) => {
      if (context.owner !== context.target || damage <= 0) return state;
      const blockMsg = `Ability ${config.name} blocked damage`;
      state = skipDamagePhase(state, blockMsg);
      const damageSources = [];
      let totalDamage = 0;
      if (config.damage) {
        damageSources.push(`${config.damage}`);
        totalDamage += config.damage;
      }
      if (config.damageDice && config.damageDice > 0) {
        const dmgRolls = rollDice(config.damageDice);
        totalDamage += sumDice(dmgRolls);
      }
      if (totalDamage > 0) {
        state = dealDamage(
          state,
          config.name,
          getOpponent(context.owner),
          totalDamage,
          `Counter damage from ${config.name}: ${damageSources.join("+")} = ${totalDamage}`
        );
      }
      return state;
    }
  };
}
function createNoopAbility(config) {
  return {
    name: config.name,
    type: "special",
    description: config.description,
    icon: "🚫",
    reviewed: false
  };
}
registerAbility({
  name: "Backfire",
  type: "combat",
  description: "Instead of rolling for damage after winning a round, automatically inflict 3 damage dice to your opponent, but also take 2 damage dice to yourself (ignoring armour).",
  canActivate: isOpponentDamageRollPhase,
  onActivate: (state, context) => {
    if (!isOpponentDamageRollPhase(state, context)) return state;
    const enemyRolls = rollDice(3);
    const enemyDamage = sumDice(enemyRolls);
    const selfRolls = rollDice(2);
    const selfDamage = sumDice(selfRolls);
    state = dealDamage(state, `Backfire (enemy) rolled 3d6: ${formatDice(enemyRolls)}`, getOpponent(context.owner), enemyDamage);
    state = dealDamage(state, `Backfire (self) rolled 2d6: ${formatDice(selfRolls)}`, context.owner, selfDamage);
    return skipDamagePhase(state, "Backfire skipped normal damage roll");
  }
});
registerAbility({
  name: "Banshee Wail",
  type: "combat",
  description: "Stop your opponent from rolling for damage when they have won a round.",
  canActivate: isOpponentDamageRollPhase,
  onActivate: (state) => {
    return skipDamagePhase(state, "Used ability: Banshee Wail. Opponent's attack silenced!");
  }
});
registerAbility({
  name: "Black Rain",
  type: "combat",
  description: "(Requires bow in left hand). Instead of rolling damage after winning a round, roll 1 damage die and apply the result to each opponent, ignoring their armour.",
  canActivate: isHeroDamageRollPhase,
  onActivate: (state, context) => {
    if (!isHeroDamageRollPhase(state)) return state;
    const dmg = sumDice(rollDice(1));
    state = dealDamage(state, "Black Rain", getOpponent(context.owner), dmg);
    return skipDamagePhase(state, "Black Rain dealing 1d6 to all enemies");
  }
});
function winnerIsNotCharged(state, owner) {
  return state.phase === "speed-roll" && state.winner === owner && !hasEffect(state, owner, "Bolt");
}
registerAbility({
  name: "Bolt",
  type: "combat",
  description: "Instead of rolling damage, you can 'charge up' your wand. When you win your next round, you inflict 3 damage dice to one opponent, ignoring armour.",
  canActivate: (state, { owner }) => winnerIsNotCharged(state, owner),
  onActivate: (state, { owner }) => {
    if (!winnerIsNotCharged(state, owner)) return state;
    state = appendEffect(state, owner, {
      stats: {},
      // No stats change, just a marker
      source: "Bolt",
      target: owner,
      duration: void 0
      // Until consumed
    });
    state = skipDamagePhase(state, "Bolt");
    return state;
  },
  onDamageRoll: (state, { owner }) => {
    if (state.winner !== owner) return state;
    if (!hasEffect(state, owner, "Bolt")) return state;
    const dmgRolls = rollDice(3);
    const dmg = sumDice(dmgRolls);
    state = dealDamage(state, "Bolt", "enemy", dmg, `Bolt released! Rolled ${dmg} (${dmgRolls.map((r2) => r2.value).join("+")}). Ignored armour!`);
    state = removeEffect(state, owner, "Bolt");
    state = skipDamagePhase(state, "Bolt released");
    return state;
  }
});
registerAbility(createReactionAbility({
  name: "Brutality",
  type: "combat",
  description: "Stops an opponent from rolling damage after they win a round and automatically inflicts 2 damage dice (ignoring armour) to them.",
  damageDice: 2
}));
registerAbility({
  name: "Cleave",
  type: "combat",
  description: "Instead of rolling damage after winning a round, roll 1 damage die and apply the result to each opponent, ignoring armour.",
  canActivate: isOwnerDamageRollPhase,
  onActivate: (state) => {
    const damageRoll = rollDice(1);
    const damage = sumDice(damageRoll);
    state = dealDamage(state, "Cleave", "enemy", damage);
    return skipDamagePhase(state, "Cleave struck all enemies");
  }
});
registerAbility({
  name: "Command",
  type: "combat",
  description: "When an opponent wins a round, halt their attack and roll for damage yourself as if you had won the round.",
  canActivate: isOpponentDamageRollPhase,
  onActivate: (state, { owner }) => {
    state = {
      ...state,
      winner: owner
    };
    return addLogs(state, {
      message: "Used ability: Command. Seized the initiative!"
    });
  }
});
registerAbility({
  name: "Corruption",
  type: "combat",
  description: "If you cause health damage, reduce the opponent's brawn or magic by 2 for the remainder of the combat.",
  onDamageDealt: (state, { owner }, _source, amount) => {
    if (amount <= 0) return state;
    const opponent = getOpponent(owner);
    state = appendEffect(state, opponent, {
      stats: { brawn: -2, magic: -2 },
      source: "Corruption",
      target: opponent,
      duration: void 0
    });
    return addLogs(state, {
      message: "Used ability: Corruption. Enemy weakened!"
    });
  }
});
registerAbility({
  name: "Cripple",
  type: "combat",
  description: "If you cause health damage, the opponent's speed score is lowered by 1 for the next 3 rounds.",
  // TODO: This check is wrong
  canActivate: (state, { owner }) => {
    return !hasEffect(state, owner, "Cripple") && state.damageDealt.some((d) => d.source === "Melee" && d.amount > 0);
  },
  onActivate: (state, { owner }) => {
    const target = getOpponent(owner);
    return appendEffect(state, target, {
      stats: { speed: -1 },
      source: "Cripple",
      target,
      duration: 3
    });
  }
});
function canActivate$9(state, { owner }) {
  const char = getCombatant(state, owner);
  return char.stats.health > 4;
}
registerAbility({
  name: "Dark Pact",
  type: "combat",
  description: "Sacrifice 4 health to increase your damage score by 4.",
  canActivate: (state, { owner }) => canActivate$9(state, { owner }),
  onActivate: (state, { owner }) => {
    const costResult = dealDamage(state, "Dark Pact Cost", owner, 4);
    state = { ...state, ...costResult };
    state = appendEffect(state, owner, {
      stats: { damageModifier: 4 },
      source: "Dark Pact",
      target: owner,
      duration: 1
    });
    return addLogs(state, {
      message: "Used ability: Dark Pact. Sacrificed health for power!"
    });
  }
});
registerAbility(createDamageDiceModifier({
  name: "Deep Wound",
  description: "Roll an extra die when determining your damage score.",
  target: "owner",
  damageModifier: 1,
  duration: 1
}));
registerAbility(createReactionAbility({
  name: "Deflect",
  type: "combat",
  description: "Stops an opponent's damage after they win a round and automatically inflicts 2 damage dice (ignoring armour) to them.",
  damageDice: 2
}));
registerAbility({
  name: "Disrupt",
  type: "combat",
  description: "If you cause health damage, lower the opponent's magic score by 3 for the remainder of the combat.",
  onDamageDealt: (state, { target }, _source, amount) => {
    if (amount <= 0) return state;
    state = appendEffect(state, target, {
      stats: { magic: -3 },
      source: "Disrupt",
      target,
      duration: void 0
    });
    return addLogs(state, {
      message: "Used ability: Disrupt. Enemy weakened!"
    });
  }
});
registerAbility({
  name: "Dodge",
  type: "combat",
  description: "Avoid taking damage from an opponent after losing a round (still affected by passive damage like bleed/venom).",
  canActivate: (state, { owner }) => {
    const isDisabled = hasEffect(state, owner, "Ensnare") || hasEffect(state, owner, "Hamstring");
    return !isDisabled && isEnemyDamageRollPhase(state);
  },
  onActivate: (state) => {
    return skipDamagePhase(state, "Dodge");
  }
});
const dodgeAbilities = /* @__PURE__ */ new Set(["Vanish", "Sidestep", "Dodge"]);
function opponentHasDodge(state, opponent) {
  const opponentChar = getCombatant(state, opponent);
  return [...opponentChar.activeAbilities.keys()].some((name) => dodgeAbilities.has(name));
}
registerAbility({
  name: "Ensnare",
  type: "combat",
  description: "Cancel an opponent's dodge ability (e.g., evade, vanish) and roll for damage as normal.",
  canActivate: (state, { owner }) => opponentHasDodge(state, getOpponent(owner)),
  onActivate: (state, { owner }) => {
    const opponent = getOpponent(owner);
    if (!opponentHasDodge(state, opponent)) return state;
    return appendEffect(state, opponent, {
      stats: {},
      // Marker
      source: "Ensnare",
      target: opponent,
      duration: 1
    });
  }
});
function canActivate$8(state, context) {
  const cancellationEffects = ["Ensnare", "Hamstring"];
  const isRestricted = cancellationEffects.some((effectSource) => hasEffect(state, context.owner, effectSource));
  return isOpponentDamageRollPhase(state, context) && !isRestricted;
}
registerAbility({
  name: "Evade",
  type: "combat",
  description: "Avoid damage after losing a round (still affected by passive damage like bleed/venom).",
  canActivate: canActivate$8,
  onActivate: (state, context) => {
    if (!canActivate$8(state, context)) return state;
    return skipDamagePhase(state, "Used ability: Evade. Avoided attack!");
  }
});
registerAbility({
  name: "Fatal Blow",
  type: "combat",
  description: "Ignore half of your opponent's armour (rounding up).",
  canActivate: (state) => canModifyArmour(state),
  onActivate: (state, { owner }) => {
    const opponent = getOpponent(owner);
    const opponentChar = getCombatant(state, opponent);
    const armour = opponentChar.stats.armour || 0;
    const reduction = -Math.ceil(armour / 2);
    state = appendEffect(state, opponent, {
      stats: { armour: reduction },
      source: "Fatal Blow",
      target: opponent,
      duration: 1
    });
    return addLogs(state, {
      message: "Used ability: Fatal Blow."
    });
  }
});
registerAbility({
  name: "Feral Fury",
  type: "combat",
  description: "Roll an extra die for your damage score.",
  onActivate: (state, { owner }) => {
    const newState = appendEffect(state, owner, {
      stats: { damageDice: 1 },
      source: "Feral Fury",
      target: owner,
      duration: 1
    });
    return addLogs(newState, { round: state.round, message: "Used ability: Feral Fury.", type: "info" });
  }
});
function canActivate$7(state, { owner }) {
  return state.winner === getOpponent(owner);
}
registerAbility({
  name: "Hamstring",
  type: "combat",
  description: "Cancel an opponent's dodge (e.g., evade, sidestep) and roll for damage as normal.",
  canActivate: canActivate$7,
  onActivate: (state, context) => {
    const opponent = getOpponent(context.owner);
    if (!canActivate$7(state, context)) return state;
    return appendEffect(state, opponent, {
      stats: {},
      source: "Hamstring",
      target: opponent,
      duration: 1
    });
  }
});
registerAbility({
  name: "Haunt",
  type: "combat",
  description: "Summon a spirit to inflict 2 damage (ignoring armour) to one opponent at the end of every round until you roll a double.",
  canActivate: (state, { owner }) => {
    const opponent = getOpponent(owner);
    const hasSpirit = hasEffect(state, opponent, "Haunt Spirit");
    return !hasSpirit;
  },
  onActivate: (state, { owner }) => {
    const opponent = getOpponent(owner);
    const effect = {
      stats: {},
      source: "Haunt Spirit",
      target: opponent,
      duration: void 0
      // Infinite duration until removed
    };
    state = appendEffect(state, opponent, effect);
    return addLogs(state, { round: state.round, message: "Used ability: Haunt. Spirit summoned!", type: "info" });
  },
  // Check for "Roll a double" to dispel
  onSpeedRoll: (state, { owner }) => {
    const rolls = owner === "hero" ? state.heroSpeedRolls : state.enemySpeedRolls;
    if (rolls && hasDouble(rolls)) {
      const opponent = getOpponent(owner);
      if (hasEffect(state, opponent, "Haunt Spirit")) {
        state = removeEffect(state, opponent, "Haunt Spirit");
        return addLogs(state, {
          round: state.round,
          message: "Rolled a double! Haunt spirit dispelled.",
          type: "info"
        });
      }
    }
    return state;
  },
  onPassiveAbility: (state, { owner }) => {
    const opponent = getOpponent(owner);
    if (!hasEffect(state, opponent, "Haunt Spirit")) return state;
    return dealDamage(state, "Haunt", opponent, 2);
  }
});
function canActivate$6(state, _context) {
  return state.phase === "damage-roll" && state.winner === "enemy";
}
registerAbility({
  name: "Head Butt",
  type: "combat",
  description: "Prevent an opponent from rolling damage, ending the round immediately.",
  canActivate: canActivate$6,
  onActivate: (state, context) => {
    if (!canActivate$6(state)) return state;
    return skipDamagePhase(state, "Used ability: Head Butt. Stopped attack!");
  }
});
function canActivate$5(state, _context) {
  return (state.phase === "damage-roll" || state.phase === "round-end") && state.winner === "hero";
}
registerAbility({
  name: "Ice Shards",
  type: "combat",
  description: "After winning a round, automatically inflict damage equal to your magic score (ignoring armour) to one opponent.",
  canActivate: canActivate$5,
  onActivate: (state, context) => {
    var _a;
    if (!canActivate$5(state)) return state;
    const enemy = state.enemies[0];
    if (!enemy) return state;
    const magic = ((_a = state.hero) == null ? void 0 : _a.stats.magic) || 0;
    return dealDamage(state, "Ice Shards", "enemy", magic);
  }
});
registerAbility({
  name: "Ignite",
  type: "combat",
  description: "After winning a round, roll 2 damage dice and apply to each opponent (ignoring armour) and cause them to burn.",
  canActivate: canModifyDamage,
  onActivate: (state, { owner }) => {
    const dmgRolls = rollDice(2);
    const dmg = sumDice(dmgRolls);
    const opponent = getOpponent(owner);
    const effect = {
      stats: {},
      source: "Ignite",
      target: opponent,
      duration: void 0,
      // Burn lasts until removed
      icon: "🔥"
    };
    state = dealDamage(state, "Ignite", opponent, dmg);
    state = appendEffect(state, opponent, effect);
    return {
      ...state,
      phase: "apply-damage"
      // Ignite ends the round (replaces normal attack?)
    };
  }
});
registerAbility({
  name: "Impale",
  type: "combat",
  description: "Increase damage score by 3; opponent's speed is lowered by 1 in the next round.",
  onActivate: (state, { owner }) => {
    let newState = appendEffect(state, owner, {
      stats: { damageModifier: 3 },
      source: "Impale (Damage)",
      target: owner,
      duration: 1
    });
    const opponent = getOpponent(owner);
    newState = appendEffect(newState, opponent, {
      stats: { speed: -1 },
      source: "Impale (Slow)",
      target: opponent,
      duration: 2
    });
    return addLogs(newState, { round: state.round, message: "Used ability: Impale.", type: "info" });
  }
});
registerAbility({
  name: "Judgement",
  type: "combat",
  description: "When taking health damage, inflict damage back equal to half your speed score (rounding up), ignoring armour.",
  onDamageDealt: (state, context, _source, damageDealt) => {
    var _a;
    const owner = context.owner;
    const target = context.target;
    if (target !== owner || damageDealt <= 0) return state;
    const speed = ((_a = state.hero) == null ? void 0 : _a.stats.speed) || 0;
    const dmgBack = Math.ceil(speed / 2);
    return dealDamage(state, "Judgement", getOpponent(target), dmgBack);
  }
});
function canActivate$4(state, owner) {
  return state.phase === "damage-roll" && state.winner === owner;
}
registerAbility({
  name: "Nature's Revenge",
  type: "combat",
  description: "Instead of rolling damage, inflict 2 damage dice (ignoring armour) and reduce opponent's speed by 1 for the next round.",
  canActivate: (state, { owner }) => canActivate$4(state, owner),
  onActivate: (state, { owner }) => {
    if (!canActivate$4(state, owner)) return state;
    const dmgRolls = rollDice(2);
    const dmg = sumDice(dmgRolls);
    const opponent = getOpponent(owner);
    let newState = appendEffect(state, opponent, {
      stats: { speed: -1 },
      source: "Nature's Revenge",
      target: opponent,
      duration: 2
      // "for the next round" usually means current end + next round? Or just 1 round?
    });
    newState = addLogs(newState, { message: `Nature's Revenge! Slowed opponent.` });
    newState = dealDamage(newState, "Nature's Revenge", opponent, dmg);
    newState = {
      ...newState,
      phase: "passive-damage",
      damage: {
        damageRolls: [],
        modifiers: []
      },
      logs: addLogs(newState.logs, {
        round: state.round,
        message: `Nature's Revenge! Inflicted ${dmg} damage and slowed opponent.`,
        type: "damage-hero"
        // assuming owner is hero usually
      })
    };
    return newState;
  }
});
registerAbility(createStatModifierAbility({
  name: "Overload",
  type: "combat",
  description: "Roll an extra die for your damage score.",
  stats: { damageDice: 1 },
  duration: 1,
  target: "hero",
  canActivate: (state, context) => canModifyDamageDice(state) && state.winner === context.owner
}));
registerAbility(createReactionAbility({
  name: "Overpower",
  type: "combat",
  description: "Stop an opponent's damage after they win a round and automatically inflict 2 damage dice (ignoring armour).",
  damageDice: 2
  // Renamed from counterDamageDice
}));
registerAbility(createReactionAbility({
  name: "Parry",
  type: "combat",
  description: "Stop an opponent from rolling for damage after they win a round.",
  icon: "🛡️"
}));
registerAbility({
  name: "Piercing",
  type: "combat",
  description: "Ignore armour",
  reviewed: true,
  onActivate: (state, { owner }) => {
    const opponent = getOpponent(owner);
    const opponentChar = getCombatant(state, opponent);
    const reduction = -(opponentChar.stats.armour || 0);
    return appendEffect(state, opponent, {
      stats: { armour: reduction },
      source: "Piercing",
      target: opponent,
      duration: 1
    });
  }
});
registerAbility({
  name: "Pound",
  type: "combat",
  description: "Increase damage score by 3, but lower your speed by 1 in the next round.",
  onActivate: (state, { owner }) => {
    state = appendEffect(state, owner, {
      stats: { damageModifier: 3 },
      source: "Pound (Damage)",
      target: owner,
      duration: 1
    });
    return appendEffect(state, owner, {
      stats: { speed: -1 },
      source: "Pound (Speed)",
      target: owner,
      duration: 2
    });
  }
});
registerAbility({
  name: "Puncture",
  type: "combat",
  description: "Instead of rolling damage, inflict 2 damage dice (ignoring armour) and reduce opponent's armour by 1 for the remainder of the combat.",
  canActivate: isHeroDamageRollPhase,
  onActivate: (state) => {
    if (!isHeroDamageRollPhase(state)) return state;
    const dmgRolls = rollDice(2);
    const dmg = sumDice(dmgRolls);
    const enemy = state.enemies[0];
    if (!enemy) return state;
    const statMod = {
      stats: {
        armour: -1
      },
      source: "Puncture",
      target: "enemy",
      duration: void 0
    };
    state = dealDamage(state, "Puncture", "enemy", dmg);
    state = appendEffect(state, "enemy", statMod);
    return skipDamagePhase(state, "Puncture dealt damage and reduced armour");
  }
});
function canActivate$3(state, _context) {
  return state.phase === "damage-roll" && state.winner === "hero";
}
registerAbility({
  name: "Rake",
  type: "combat",
  description: "After winning a round, inflict 3 damage dice (ignoring armour). Modifiers cannot be used.",
  canActivate: canActivate$3,
  onActivate: (state, context) => {
    if (!canActivate$3(state)) return state;
    const dmgRolls = rollDice(3);
    const dmg = sumDice(dmgRolls);
    const rollValues = dmgRolls.map((r2) => r2.value).join("+");
    state = dealDamage(state, "Rake", "enemy", dmg);
    state = addLogs(state, { round: state.round, message: `Rake! Inflicted ${dmg} damage (${rollValues}).`, type: "damage-hero" });
    return skipDamagePhase(state, "Rake skipped normal damage roll");
  }
});
registerAbility({
  name: "Rebound",
  type: "combat",
  description: "If you take health damage, increase your speed by 2 for the next round.",
  onDamageDealt: (state, { owner, target }, _source, amount) => {
    if (!target || target !== owner) return state;
    if (amount <= 0) return state;
    return appendEffect(state, owner, {
      stats: { speed: 2 },
      source: "Rebound",
      target: owner,
      duration: 2
    });
  }
});
registerAbility({
  name: "Reflect",
  type: "combat",
  description: "Reflect health damage back to vampire opponents.",
  onDamageDealt: (state, context, _source, amount) => {
    const { owner, target } = context;
    if (owner !== target || amount <= 0) return state;
    const enemy = state.enemies[0];
    if (!enemy) return state;
    if (!enemy.original.abilities.includes("Vampire")) return state;
    return dealDamage(state, "Reflect", "enemy", amount);
  }
});
registerAbility(createRetaliationAbility$1({
  name: "Retaliation",
  type: "combat",
  description: "When taking health damage, inflict 1 damage die back (ignoring armour).",
  damageDice: 1
}));
registerAbility(createRetaliationAbility$1({
  name: "Riposte",
  type: "combat",
  description: "When taking health damage, inflict 1 damage die back (ignoring armour).",
  damageDice: 1,
  canActivate: (state, context) => {
    return !hasEffect(state, context.owner, "Expertise");
  }
}));
registerAbility({
  name: "Rust",
  type: "combat",
  description: "If you cause health damage, lower opponent's armour by 2 for the remainder of combat.",
  onDamageDealt: (state, { target }, _source, amount) => {
    if (amount <= 0) return state;
    return appendEffect(state, target, {
      stats: { armour: -2 },
      source: "Rust",
      target,
      duration: void 0
    });
  }
});
function canActivate$2(state, context) {
  return hasEffect(state, context.owner, "Shades") && state.phase === "damage-roll" && state.winner === "enemy";
}
registerAbility({
  name: "Sacrifice",
  type: "combat",
  description: "Sacrifice your shades to absorb all damage from an opponent's roll.",
  canActivate: canActivate$2,
  onActivate: (state, context) => {
    if (!canActivate$2(state, context)) return state;
    state = removeEffect(state, "hero", "Shades");
    return skipDamagePhase(state, "Used ability: Sacrifice. Shades absorbed the damage!");
  }
});
registerAbility({
  name: "Shadow Fury",
  type: "combat",
  description: "Add speed of both main and left-hand weapons to your damage score.",
  onActivate: (state, { owner }) => {
    var _a, _b;
    const character = getCombatant(state, owner);
    if (!character.original || !("equipment" in character.original)) {
      return addLogs(state, { round: state.round, message: "Shadow Fury failed: No equipment found.", type: "info" });
    }
    const equipment = character.original.equipment;
    const mh2 = equipment == null ? void 0 : equipment.mainHand;
    const oh2 = equipment == null ? void 0 : equipment.leftHand;
    const mhSpeed = ((_a = mh2 == null ? void 0 : mh2.stats) == null ? void 0 : _a.speed) || 0;
    const ohSpeed = ((_b = oh2 == null ? void 0 : oh2.stats) == null ? void 0 : _b.speed) || 0;
    const bonus = mhSpeed + ohSpeed;
    const newState = appendEffect(state, owner, {
      stats: { damageModifier: bonus },
      source: "Shadow Fury",
      target: owner,
      duration: 1
    });
    return addLogs(newState, { round: state.round, message: `Used ability: Shadow Fury (+${bonus} Damage).`, type: "info" });
  }
});
registerAbility({
  name: "Shield Wall",
  type: "combat",
  description: "(Requires shield in left hand). Double your armour score and inflict 1 damage die (ignoring armour) to the opponent.",
  canActivate: (state, { owner }) => {
    return !!state.winner && state.winner !== owner && !["passive-damage", "round-end", "combat-end"].includes(state.phase);
  },
  onActivate: (state, { owner }) => {
    const char = getCombatant(state, owner);
    const armour = char.stats.armour || 0;
    state = appendEffect(state, owner, {
      stats: { armour },
      source: "Shield Wall",
      target: owner,
      duration: 1
    });
    const damage = sumDice(rollDice(1));
    state = dealDamage(state, "Shield Wall", getOpponent(owner), damage, `Shield Wall rolled ${damage} 1d6`);
    return addLogs(state, {
      message: `Used ability: Shield Wall. Armour doubled (+${armour}).`
    });
  }
});
registerAbility({
  name: "Shock!",
  type: "combat",
  description: "If causing health damage, inflict 1 extra damage for every 2 points of opponent's armour.",
  onDamageDealt: (state, { owner, target }, _source, amount) => {
    if (owner === target || amount <= 0 || !target) return state;
    const targetChar = getCombatant(state, target);
    const oppArmour = targetChar.stats.armour || 0;
    const extra = Math.floor(oppArmour / 2);
    if (extra <= 0) return state;
    return dealDamage(state, "Shock!", target, extra);
  }
});
registerAbility(createStatModifierAbility({
  name: "Sidestep",
  type: "combat",
  description: "Avoid damage",
  stats: { armour: 200 },
  duration: 1,
  target: "hero"
}));
registerAbility(createRetaliationAbility$1({
  name: "Sideswipe",
  type: "combat",
  description: "When taking health damage, inflict 1 damage die back (ignoring armour).",
  damageDice: 1
}));
function canActivate$1(state, owner) {
  return state.phase === "damage-roll" && state.winner === getOpponent(owner);
}
registerAbility({
  name: "Slam",
  type: "combat",
  description: "Stop opponent's damage after they win a round; reduce their speed by 1 in the next round.",
  canActivate: (state, { owner }) => canActivate$1(state, owner),
  onActivate: (state, { owner }) => {
    if (!canActivate$1(state, owner)) return state;
    const opponent = getOpponent(owner);
    let newState = appendEffect(state, opponent, {
      stats: { speed: -1 },
      source: "Slam",
      target: opponent,
      duration: 2
    });
    newState = {
      ...newState,
      phase: "round-end",
      damage: {
        damageRolls: [],
        modifiers: []
      },
      logs: addLogs(newState.logs, { round: state.round, message: "Used ability: Slam. Blocked attack and slowed opponent.", type: "info" })
    };
    return newState;
  }
});
registerAbility(createReactionAbility({
  name: "Spider sense",
  type: "combat",
  description: "Avoid damage after losing a round (still affected by passive damage like bleed/venom).",
  // Logic similar to Vanish/Evade
  canActivate: (state, { owner }) => {
    const cancellationEffects = ["Ensnare", "Hamstring"];
    const agent = getCombatant(state, owner);
    if (!agent) return false;
    const isDisabled = agent.activeEffects.some((effect) => cancellationEffects.includes(effect.source));
    if (isDisabled) return false;
    return isOpponentDamageRollPhase(state, { owner });
  }
}));
registerAbility(createRetaliationAbility$1({
  name: "Spore Cloud",
  type: "combat",
  description: "When taking health damage, inflict 2 damage dice back (ignoring armour).",
  damageDice: 2
}));
registerAbility({
  name: "Surge",
  type: "combat",
  description: "Increase magic by 3, but lower speed by 1 in the next round.",
  onActivate: (state, { owner }) => {
    let newState = appendEffect(state, owner, {
      stats: { magic: 3 },
      source: "Surge (Magic)",
      target: owner,
      duration: 1
    });
    newState = appendEffect(newState, owner, {
      stats: { speed: -1 },
      source: "Surge (Speed)",
      target: owner,
      duration: 2
    });
    return addLogs(newState, { round: state.round, message: "Used ability: Surge.", type: "info" });
  }
});
registerAbility({
  name: "Thorn Armour",
  type: "combat",
  description: "Raise armour by 3 and inflict 1 damage die (ignoring armour) to all opponents.",
  onActivate: (state, { owner }) => {
    const val = rollDice(1)[0].value;
    const opponent = getOpponent(owner);
    let newState = appendEffect(state, owner, {
      stats: { armour: 3 },
      source: "Thorn Armour",
      target: owner,
      duration: 1
    });
    const damageResult = dealDamage(newState, "Thorn Armour", opponent, val);
    newState = { ...newState, ...damageResult };
    return addLogs(newState, { round: state.round, message: `Thorn Armour active! Armour +3, inflicted ${val} damage.`, type: "info" });
  }
});
registerAbility(createRetaliationAbility$1({
  name: "Thorn Fist",
  type: "combat",
  description: "When taking health damage, inflict 2 damage dice back (ignoring armour).",
  damageDice: 2
}));
registerAbility(createReactionAbility({
  name: "Vanish",
  type: "combat",
  description: "Avoid damage after losing a round (still affected by passive damage like bleed/venom).",
  canActivate: (state, { owner }) => {
    const cancellationEffects = ["Ensnare", "Hamstring"];
    const agent = getCombatant(state, owner);
    if (!agent) return false;
    const isDisabled = agent.activeEffects.some((e) => e.target === owner && cancellationEffects.includes(e.source));
    return !isDisabled && isOpponentDamageRollPhase(state, { owner });
  }
}));
registerAbility({
  name: "Windwalker",
  type: "combat",
  description: "Use all attack speed dice for your damage score after winning a round.",
  canActivate: isHeroDamageRollPhase,
  onActivate: (state) => {
    state = modifyDamageRolls(state, state.heroSpeedRolls, "Windwalker");
    return state;
  }
});
registerAbility({
  name: "Blood Rage",
  type: "modifier",
  description: "If you win two consecutive rounds and cause health damage in both, your brawn increases by 2 for the remainder of the combat.",
  onPassiveAbility: (state, { owner }) => {
    if (state.winner !== owner) return state;
    if (hasEffect(state, owner, "BloodRageStreak")) {
      state = appendEffect(state, owner, {
        stats: { brawn: 2 },
        source: "Blood Rage",
        target: owner,
        duration: void 0
      });
    } else {
      return appendEffect(state, owner, {
        stats: {},
        source: "BloodRageStreak",
        target: owner,
        duration: 1,
        visible: false
      });
    }
    return state;
  }
});
registerAbility({
  name: "Brain Drain",
  type: "modifier",
  description: "Spend up to 5 magic points to increase your damage score by 1 per point spent. Magic is restored after combat.",
  onActivate: (state) => {
    return state;
  }
});
registerAbility(createStatModifierAbility({
  name: "Bright Shield",
  type: "modifier",
  description: "Raise your armour by 4 for one combat round.",
  stats: {
    armour: 4
  },
  duration: 1
}));
registerAbility({
  name: "Bull's Eye",
  type: "modifier",
  description: "Before combat starts, fire an arrow/bullet to automatically inflict 1 damage die (ignoring armour). This also applies passive effects like venom and bleed.",
  onCombatStart: (state, { owner }) => {
    const dmgRoll = rollDice(1);
    const damage = sumDice(dmgRoll);
    const opponent = getOpponent(owner);
    state = dealDamage(state, "Bull's Eye", opponent, damage);
    return state;
  }
});
registerAbility({
  name: "Cauterise",
  type: "modifier",
  description: "Remove all venom, bleed, and disease effects currently on your hero.",
  onActivate: (state, { owner }) => {
    const effectsToRemove = ["Venom", "Bleed", "Disease"];
    let newState = state;
    for (const effect of effectsToRemove) {
      newState = removeEffect(newState, owner, effect);
    }
    return newState;
  }
});
registerAbility({
  name: "Charm",
  type: "modifier",
  description: "Re-roll one of your hero's dice; you must accept the second result.",
  icon: "🎲",
  reviewed: true,
  canActivate: (state) => state.phase === "speed-roll" || state.phase === "damage-roll" && state.winner === "hero",
  onActivate: (state, context) => {
    if (!context.ability) return state;
    let target;
    if (state.phase === "damage-roll" && state.winner === "hero") {
      target = "damage";
    } else if (state.phase === "speed-roll") {
      target = "hero-speed";
    } else {
      return state;
    }
    state = {
      ...state,
      pendingInteraction: {
        ability: context.ability,
        requests: [{
          type: "dice",
          target: "hero",
          mode: "select",
          count: 1
        }],
        callback: (state2, responses) => {
          if (responses.length === 0) return state2;
          const response = responses[0];
          state2 = {
            ...state2
          };
          let newDice;
          if (target === "hero-speed") {
            state2.heroSpeedRolls = rerollSelectedDie(state2.heroSpeedRolls, response.selectedIndexes[0]);
            newDice = formatDice(state2.heroSpeedRolls);
          } else if (target === "damage") {
            state2.damage.damageRolls = rerollSelectedDie(state2.damage.damageRolls, response.selectedIndexes[0]);
            newDice = formatDice(state2.damage.damageRolls);
          } else {
            return state2;
          }
          state2 = addLogs(state2, {
            message: `Rerolled die for ${context.ability.name}, new rolls: ${newDice}`
          });
          return state2;
        }
      }
    };
    return addLogs(
      state,
      { message: `Select a ${target === "damage" ? "damage" : "speed"} die to re-roll.` }
    );
  }
});
registerAbility({
  name: "Consume",
  type: "modifier",
  description: "Reduce the result of each of your opponent's attack speed dice by 1 (minimum 1).",
  onSpeedRoll: (state, { owner }) => {
    return modifySpeedRolls(state, getOpponent(owner), (rolls) => {
      return rolls.map((r2) => ({
        ...r2,
        value: Math.max(1, r2.value - 1),
        isRerolled: true
        // TODO: Should this be marked as rerolled?
      }));
    });
  }
});
registerAbility({
  name: "Critical Strike",
  type: "modifier",
  description: "All 6s",
  canActivate: canModifyDamage,
  onActivate: (state) => {
    const damageRoll = deterministicRoll(
      new Array(state.damage.damageRolls.length).fill(6)
    );
    return modifyDamageRolls(state, damageRoll, "Critical Strike");
  }
});
registerAbility({
  name: "Deceive",
  type: "modifier",
  description: "Swap one of your opponent's speed dice for your own.",
  canActivate: canModifySpeedDice,
  onSpeedRoll: (state, { owner }) => {
    const opponent = getOpponent(owner);
    const ownerRolls = state[owner === "hero" ? "heroSpeedRolls" : "enemySpeedRolls"];
    const opponentRolls = state[opponent === "hero" ? "heroSpeedRolls" : "enemySpeedRolls"];
    if (!ownerRolls || !opponentRolls || ownerRolls.length === 0 || opponentRolls.length === 0) return state;
    const newOwnerRolls = [...ownerRolls];
    const newOpponentRolls = [...opponentRolls];
    const minOwnerIndex = newOwnerRolls.reduce((minIndex, roll, index) => roll.value < newOwnerRolls[minIndex].value ? index : minIndex, 0);
    const maxOpponentIndex = newOpponentRolls.reduce((maxIndex, roll, index) => roll.value > newOpponentRolls[maxIndex].value ? index : maxIndex, 0);
    const temp = newOwnerRolls[minOwnerIndex].value;
    newOwnerRolls[minOwnerIndex].value = newOpponentRolls[maxOpponentIndex].value;
    newOpponentRolls[maxOpponentIndex].value = temp;
    state = modifySpeedRolls(state, owner, () => newOwnerRolls);
    state = modifySpeedRolls(state, opponent, () => newOpponentRolls);
    return state;
  }
});
registerAbility({
  name: "Dominate",
  type: "modifier",
  description: "Change the result of one damage die to a [6].",
  onDamageRoll: (state) => {
    const minIndex = state.damage.damageRolls.reduce((iMin, x2, i, arr) => x2.value < arr[iMin].value ? i : iMin, 0);
    const newRolls = [...state.damage.damageRolls];
    newRolls[minIndex] = { ...newRolls[minIndex], value: 6 };
    return modifyDamageRolls(state, newRolls, "Dominate");
  }
});
registerAbility(createStatModifierAbility({
  name: "Eureka",
  type: "modifier",
  description: "Raise speed, brawn, or magic by 1 for one round. Used once per combat.",
  // TODO: Implement choice. Defaulting to Brawn.
  stats: {
    brawn: 1
  },
  duration: 1
}));
registerAbility({
  name: "Expertise",
  type: "modifier",
  description: "Ignore damage from counter-attack abilities like riposte, deflect, or brutality.",
  onCombatStart: (state, { owner }) => {
    return appendEffect(state, owner, {
      stats: {},
      source: "Expertise",
      target: owner,
      duration: void 0
      // Duration combat
    });
  }
});
registerAbility({
  name: "Fallen Hero",
  type: "modifier",
  description: "Raise brawn by 3 for one round and heal 10 health.",
  onActivate: (state, { owner }) => {
    state = healDamage(state, "Fallen Hero", owner, 10);
    return appendEffect(state, owner, {
      stats: { brawn: 3 },
      source: "Fallen Hero",
      target: owner,
      duration: 1
    });
  }
});
registerAbility({
  name: "Feint",
  type: "modifier",
  description: "Re-roll any or all attack speed dice.",
  onSpeedRoll: (state) => {
    return state;
  }
});
registerAbility(createStatModifierAbility({
  name: "Focus",
  type: "modifier",
  description: "Raise magic by 3 for one round.",
  stats: {
    magic: 3
  },
  duration: 1
}));
registerAbility(createStatModifierAbility({
  name: "Fortitude",
  type: "modifier",
  description: "Raise brawn or armour by 3 for one round.",
  // TODO: Implement choice. Defaulting to Brawn for now.
  stats: {
    brawn: 3
  },
  duration: 1
}));
registerAbility({
  name: "Gut Ripper",
  type: "modifier",
  description: "Change all damage dice results to [6].",
  onDamageRoll: (state) => {
    var _a;
    const newRolls = (_a = state.damage) == null ? void 0 : _a.damageRolls.map((r2) => ({ ...r2, value: 6 }));
    return modifyDamageRolls(state, newRolls, "Gut Ripper");
  }
});
registerAbility({
  name: "Heal",
  type: "modifier",
  description: "Instantly restore 4 health.",
  icon: "❤️",
  reviewed: true,
  canActivate: (state, { owner }) => {
    const char = getCombatant(state, owner);
    return char.stats.health < char.stats.maxHealth;
  },
  onActivate: (state, { owner }) => {
    return healDamage(state, "Heal", owner, 4);
  }
});
registerAbility(createStatModifierAbility({
  name: "Ice Shield",
  type: "modifier",
  description: "Add 1 die to your armour score for one round.",
  stats: {
    // TODO: This should be determined by a die.
    armour: 3
  },
  duration: 1
}));
registerAbility(createStatModifierAbility({
  name: "Iron Will",
  type: "modifier",
  description: "Increase armour by 3 for one round.",
  stats: {
    armour: 3
  },
  duration: 1
}));
registerAbility({
  name: "Last Laugh",
  type: "modifier",
  description: "Reroll enemy die",
  canActivate: (state) => canModifySpeed(state) || canModifyDamage(state) && state.winner === "enemy",
  onActivate: (state, context) => {
    if (!context.ability) return state;
    let target;
    if (state.phase === "damage-roll" && state.winner === "enemy") {
      target = "damage";
    } else if (state.phase === "speed-roll") {
      target = "enemy-speed";
    } else {
      return state;
    }
    state = {
      ...state,
      pendingInteraction: {
        ability: context.ability,
        requests: [
          {
            type: "dice",
            target: "enemy",
            mode: "select",
            count: 1
          }
        ],
        callback: (state2, responses) => {
          if (responses.length === 0) return state2;
          const response = responses[0];
          state2 = {
            ...state2
          };
          let newDice;
          if (target === "enemy-speed") {
            state2.enemySpeedRolls = rerollSelectedDie(state2.enemySpeedRolls, response.selectedIndexes[0]);
            newDice = formatDice(state2.enemySpeedRolls);
          } else if (target === "damage") {
            state2.damage.damageRolls = rerollSelectedDie(state2.damage.damageRolls, response.selectedIndexes[0]);
            newDice = formatDice(state2.damage.damageRolls);
          } else {
            return state2;
          }
          state2 = addLogs(state2, {
            message: `Rerolled die for ${context.ability.name}, new rolls: ${newDice}`
          });
          return state2;
        }
      }
    };
    return addLogs(
      state,
      { message: `Select a ${target === "damage" ? "damage" : "speed"} die to re-roll.` }
    );
  }
});
registerAbility({
  name: "Martyr",
  type: "modifier",
  description: "Choose to lose 5 health instead of taking the result of an opponent's damage.",
  canActivate: isOpponentDamageRollPhase,
  onActivate: (state, { owner }) => {
    state = skipDamagePhase(state, "Martyr used: Taking 5 damage instead of roll.");
    return dealDamage(state, "Martyr", owner, 5);
  }
});
registerAbility({
  name: "Mend",
  type: "modifier",
  description: "Heal yourself or an ally for 15 health.",
  onActivate: (state, { owner }) => {
    return healDamage(state, "Mend", owner, 15);
  }
});
registerAbility(createStatModifierAbility({
  name: "Might of Stone",
  type: "modifier",
  description: "Increase armour by 3 for one round.",
  stats: {
    armour: 3
  },
  duration: 1
}));
registerAbility({
  name: "Raining Blows",
  type: "modifier",
  description: "Every [6] rolled for damage allows an additional die roll.",
  onDamageRoll: (state) => {
    const sixes = state.damage.damageRolls.filter((r2) => r2.value === 6).length;
    if (sixes === 0) return state;
    const extraRolls = rollDice(sixes);
    const newRolls = [...state.damage.damageRolls, ...extraRolls];
    return modifyDamageRolls(state, newRolls, "Raining Blows");
  }
});
registerAbility({
  name: "Regrowth",
  type: "modifier",
  description: "Instantly restore 6 health. Multiple items can each be used once.",
  onActivate: (state, { owner }) => {
    return healDamage(state, "Regrowth", owner, 6);
  }
});
registerAbility({
  name: "Savagery",
  type: "modifier",
  description: "Raise brawn or magic by 2 for one round.",
  onActivate: (state, context) => {
    if (!context.ability) return state;
    return {
      ...state,
      pendingInteraction: {
        ability: context.ability,
        requests: [{
          target: "hero",
          type: "choices",
          mode: "select",
          count: 1,
          choices: ["Brawn", "Magic"]
        }],
        callback: (currentState, responses) => {
          if (responses.length !== 1) return currentState;
          const choiceIndex = responses[0].selectedIndexes[0];
          const statMap = ["brawn", "magic"];
          const attribute = statMap[choiceIndex];
          if (!attribute) return currentState;
          return appendEffect(currentState, "hero", {
            stats: { [attribute]: 2 },
            source: context.ability.name,
            target: "hero",
            duration: 1,
            visible: true
          });
        }
      }
    };
  }
});
registerAbility({
  name: "Second Sight",
  type: "modifier",
  description: "Lower all opponent's damage dice by 2.",
  onDamageRoll: (state, { owner }) => {
    if (state.winner === owner) return state;
    const newRolls = state.damage.damageRolls.map((r2) => ({
      ...r2,
      value: Math.max(1, r2.value - 2)
    }));
    return modifyDamageRolls(state, newRolls, "Second Sight");
  }
});
registerAbility({
  name: "Second Wind",
  type: "modifier",
  description: "Restore one already-played speed ability for yourself or an ally.",
  onActivate: (state) => {
    return state;
  }
});
registerAbility({
  name: "Shadow Speed",
  type: "modifier",
  description: "Change all speed dice results of [1] to [3].",
  onSpeedRoll: (state, { owner }) => {
    return modifySpeedRolls(state, owner, (rolls) => {
      return rolls.map((r2) => r2.value === 1 ? { ...r2, value: 3 } : r2);
    });
  }
});
registerAbility({
  name: "Steal",
  type: "modifier",
  description: "Raise one attribute (speed, brawn, magic, or armour) to match your opponent's for one round.",
  onActivate: (state, context) => {
    if (!context.ability) return state;
    return {
      ...state,
      pendingInteraction: {
        ability: context.ability,
        requests: [{
          target: "hero",
          type: "choices",
          mode: "select",
          count: 1,
          choices: ["Speed", "Brawn", "Magic", "Armour"]
        }],
        callback: (currentState, responses) => {
          if (responses.length !== 1) return currentState;
          const choiceIndex = responses[0].selectedIndexes[0];
          const statMap = ["speed", "brawn", "magic", "armour"];
          const attribute = statMap[choiceIndex];
          if (!attribute) return currentState;
          const enemyValue = currentState.enemies[0].stats[attribute] ?? 0;
          const heroValue = currentState.hero.stats[attribute] ?? 0;
          const diff = Math.max(0, enemyValue - heroValue);
          if (diff > 0) {
            return appendEffect(currentState, "hero", {
              stats: { [attribute]: diff },
              source: context.ability.name,
              target: "hero",
              duration: 1,
              visible: true
            });
          }
          return currentState;
        }
      }
    };
  }
});
registerAbility({
  name: "Surefooted",
  type: "modifier",
  description: "Re-roll all speed dice; you must accept the second result.",
  onSpeedRoll: (state, { owner }) => {
    return modifySpeedRolls(state, owner, (rolls) => {
      const count = rolls.length;
      if (count === 0) return rolls;
      const newRolls = rollDice(count);
      return newRolls.map((r2) => ({
        ...r2,
        isRerolled: true
      }));
    });
  }
});
registerAbility({
  name: "Tourniquet",
  type: "modifier",
  description: "Remove bleed, venom, and disease from yourself or an ally.",
  // Assuming "ally" is not applicable in 1v1, treating as self.
  onActivate: (state, { owner }) => {
    const effectsToRemove = ["Venom", "Bleed", "Disease"];
    let newState = state;
    for (const effect of effectsToRemove) {
      newState = removeEffect(newState, owner, effect);
    }
    return newState;
  }
});
registerAbility({
  name: "Trickster",
  type: "modifier",
  description: "Swap one of your opponent's speed dice for your own.",
  // Same as Deceive.
  onSpeedRoll: (state, { owner }) => {
    const opponent = getOpponent(owner);
    const ownerRolls = state[owner === "hero" ? "heroSpeedRolls" : "enemySpeedRolls"];
    const opponentRolls = state[opponent === "hero" ? "heroSpeedRolls" : "enemySpeedRolls"];
    if (!ownerRolls || !opponentRolls || ownerRolls.length === 0 || opponentRolls.length === 0) return state;
    const newOwnerRolls = [...ownerRolls];
    const newOpponentRolls = [...opponentRolls];
    let minOwnerIndex = 0;
    for (let i = 1; i < newOwnerRolls.length; i++) {
      if (newOwnerRolls[i].value < newOwnerRolls[minOwnerIndex].value) minOwnerIndex = i;
    }
    let maxOpponentIndex = 0;
    for (let i = 1; i < newOpponentRolls.length; i++) {
      if (newOpponentRolls[i].value > newOpponentRolls[maxOpponentIndex].value) maxOpponentIndex = i;
    }
    const temp = newOwnerRolls[minOwnerIndex].value;
    newOwnerRolls[minOwnerIndex] = { ...newOwnerRolls[minOwnerIndex], value: newOpponentRolls[maxOpponentIndex].value, isRerolled: true };
    newOpponentRolls[maxOpponentIndex] = { ...newOpponentRolls[maxOpponentIndex], value: temp, isRerolled: true };
    state = modifySpeedRolls(state, owner, () => newOwnerRolls);
    state = modifySpeedRolls(state, opponent, () => newOpponentRolls);
    return state;
  }
});
registerAbility({
  name: "Vampirism",
  type: "modifier",
  description: "Heal for half the amount of health damage you inflict (rounding up).",
  // TODO: Only do once.
  onDamageDealt: (state, { owner }, source, amount) => {
    if (amount <= 0 && source !== "Attack") return state;
    const healAmount = Math.ceil(amount / 2);
    return healDamage(state, "Vampirism", owner, healAmount);
  }
});
registerAbility(createStatModifierAbility({
  name: "Vanquish",
  type: "modifier",
  description: "Raise brawn by 2 for one round.",
  stats: {
    brawn: 2
  },
  duration: 1
}));
registerAbility({
  name: "Watchful",
  type: "modifier",
  description: "Change an opponent's [6] result to a [1].",
  onSpeedRoll: (state, { owner }) => {
    return modifySpeedRolls(state, getOpponent(owner), (rolls) => {
      const index = rolls.findIndex((r2) => r2.value === 6);
      if (index === -1) return rolls;
      const newRolls = [...rolls];
      newRolls[index].value = 1;
      return newRolls;
    });
  }
});
registerAbility({
  name: "Acid",
  type: "passive",
  description: "Add 1 to the result of each die you roll for your damage score.",
  reviewed: true,
  onDamageCalculate: (state) => {
    var _a;
    return ((_a = state.damage) == null ? void 0 : _a.damageRolls.length) ?? 0;
  }
});
registerAbility({
  name: "Barbs",
  type: "passive",
  description: "At the end of every combat round, automatically inflict 1 damage to all opponents.",
  reviewed: true,
  onPassiveAbility: (state, { owner }) => {
    return dealDamage(
      state,
      "Barbs",
      getOpponent(owner),
      1,
      `Barbs deals 1 damage to ${getOpponent(owner)}`
    );
  }
});
registerAbility({
  name: "Bleed",
  type: "passive",
  description: "If your damage causes health damage, the opponent continues to take 1 damage (ignoring armour) at the end of each combat round.",
  reviewed: true,
  onDamageDealt(state, { target }, _source, damageDealt) {
    if (!target) return state;
    if (damageDealt === 0 || hasEffect(state, target, "Bleed")) return state;
    return appendEffect(state, target, {
      stats: {},
      source: "Bleed",
      target,
      duration: void 0,
      // for the rest of the combat (or until cauterized)
      icon: "🩸",
      description: "Takes 1 damage (ignoring armour) at the end of each round."
    });
  },
  onPassiveAbility: (state, { owner }) => {
    const opponent = getOpponent(owner);
    if (!hasEffect(state, opponent, "Bleed")) return state;
    return dealDamage(state, "Bleed", opponent, 1, `Bleed deals 1 damage to ${opponent}`);
  }
});
registerAbility({
  name: "Burn",
  type: "passive",
  description: "Opponents damaged by ignite lose 1 health (ignoring armour) at the end of every round.",
  onPassiveAbility: (state, { owner }) => {
    const opponent = getOpponent(owner);
    if (hasEffect(state, opponent, "Ignite")) {
      const damage = hasEffect(state, owner, "Embers") ? 2 : 1;
      return dealDamage(state, "Burn", opponent, damage);
    }
    return state;
  }
});
registerAbility({
  name: "Cleansing Light",
  type: "passive",
  description: "Automatically heal for 2 health at the end of each round.",
  onPassiveAbility: (state, { owner }) => {
    return healDamage(state, "Cleansing Light", owner, 2);
  }
});
function inflictDarkClawDamage(state, source, rolls) {
  if (!hasDouble(rolls)) {
    return state;
  }
  const target = getOpponent(source);
  return dealDamage(state, "Dark Claw", target, 4);
}
registerAbility({
  name: "Dark Claw",
  type: "passive",
  description: "For every double rolled, automatically inflict 4 damage (ignoring armour).",
  onSpeedRoll: (state, { owner }) => {
    const rolls = owner === "hero" ? state.heroSpeedRolls : state.enemySpeedRolls;
    if (!rolls) return state;
    return inflictDarkClawDamage(state, owner, rolls);
  },
  onDamageRoll: (state, { owner }) => {
    var _a;
    if (state.winner !== owner) return state;
    const rolls = (_a = state.damage) == null ? void 0 : _a.damageRolls;
    if (!rolls) return state;
    return inflictDarkClawDamage(state, owner, rolls);
  }
});
registerAbility({
  name: "Deadly Poisons",
  type: "passive",
  description: "Increases damage by venom by 1",
  reviewed: true
});
registerAbility({
  name: "Disease",
  type: "passive",
  description: "If you cause health damage, the opponent takes 2 damage (ignoring armour) at the end of each round.",
  onDamageDealt: (state, { target }, _source, amount) => {
    if (amount > 0 && target && !hasEffect(state, target, "Disease")) {
      return appendEffect(state, target, {
        stats: {},
        source: "Disease",
        target,
        duration: void 0,
        icon: "🦠"
      });
    }
    return state;
  },
  onPassiveAbility: (state, { owner }) => {
    const opponent = getOpponent(owner);
    if (hasEffect(state, opponent, "Disease")) {
      return dealDamage(state, "Disease", opponent, 2);
    }
    return state;
  }
});
const ebonyAndIvory = {
  name: "Ebony and ivory",
  type: "passive",
  description: "Equipping both swords allows use of the cripple ability.",
  icon: "⚔️",
  reviewed: true,
  onCombatStart: (state, context) => {
    if (context.owner !== "hero") return state;
    const hasEbony = hasEquipment(state.hero, /^Ebony$/);
    const hasIvory = hasEquipment(state.hero, /^Ivory$/);
    if (hasEbony && hasIvory) {
      const crippleDef = getAbilityDefinition("Cripple");
      if (crippleDef) {
        const crippleAbility = {
          name: "Cripple",
          owner: "hero",
          def: crippleDef
          // TODO: Use sources (Ebony and Ivory)
        };
        state.hero.activeAbilities.set("cripple", crippleAbility);
      }
    }
    return state;
  }
};
registerAbility(ebonyAndIvory);
registerAbility({
  name: "Embers",
  type: "passive",
  description: "Increases burn damage to 2 per opponent."
});
registerAbility({
  name: "Fire Aura",
  type: "passive",
  description: "All opponents take 1 damage (ignoring armour) at the end of every round.",
  onPassiveAbility: (state, { owner }) => {
    return dealDamage(state, "Fire Aura", getOpponent(owner), 1);
  }
});
registerAbility({
  name: "First Cut",
  type: "passive",
  description: "Inflict 1 health damage (ignoring armour) before combat begins.",
  reviewed: true,
  onCombatStart: (state, { owner }) => {
    const opponent = owner === "hero" ? "enemy" : "hero";
    return dealDamage(state, "First Cut", opponent, 1);
  }
});
registerAbility({
  name: "First Strike",
  type: "passive",
  description: "Pre-combat damage. Inflict 1 damage die (ignoring armour) and any harmful passive abilities (venom/bleed) before combat begins.",
  onCombatStart: (state, { owner }) => {
    const damage = sumDice(rollDice(1));
    const target = getOpponent(owner);
    return dealDamage(state, "First Strike", target, damage);
  }
});
registerAbility({
  name: "Kick Start",
  type: "passive",
  description: "When reduced to 0 health, automatically restore to 15 health and remove all passive effects.",
  // Requires a hook on death or damage? 
  // Implementing onDamageDealt to intercept death?
  // "When reduced to 0 health".
  // I need to check if there is a 'onDeath' or similar, or check health in onDamageDealt.
  onDamageDealt: (state, { owner }) => {
    const char = getCombatant(state, owner);
    if (char.stats.health > 0) return state;
    state = healDamage(state, "Kick Start", owner, 15);
    const targetChar = getCombatant(state, owner);
    const newChar = {
      ...targetChar,
      activeAbilities: new Map(targetChar.activeAbilities.entries().filter(([_, a]) => a.def.type !== "passive"))
    };
    return updateCombatant(state, owner, newChar);
  }
});
registerAbility({
  name: "Leech",
  type: "passive",
  description: "Restore 2 health every time you cause health damage (cannot exceed max health).",
  onDamageDealt: (state, { owner, target }, _source, amount) => {
    if (owner === target || amount <= 0) return state;
    return healDamage(state, "Leech", owner, 2);
  }
});
registerAbility({
  name: "Life Spark",
  type: "passive",
  description: "Heal 4 health every time you roll a double.",
  onSpeedRoll: (state, { owner }) => {
    if (owner === "hero" && hasDouble(state.heroSpeedRolls ?? [])) {
      return healDamage(state, "Life Spark", "hero", 4);
    }
    return state;
  },
  onDamageRoll: (state, { owner }) => {
    var _a;
    if (owner === "hero" && state.winner === "hero" && hasDouble(((_a = state.damage) == null ? void 0 : _a.damageRolls) ?? [])) {
      return healDamage(state, "Life Spark", "hero", 4);
    }
    return state;
  }
});
registerAbility({
  name: "Lightning",
  type: "passive",
  description: "Every time you take health damage, automatically inflict 2 damage back (ignoring armour). Multiple lightning items do not stack.",
  // TODO: Is this really every time, i.e outside of attacks?
  onDamageDealt: (state, { owner, target }, _source, amount) => {
    if (owner !== target || amount <= 0) return state;
    const opponent = getOpponent(target);
    return dealDamage(state, "Lightning", opponent, 2);
  }
});
registerAbility({
  name: "Merciless",
  type: "passive",
  description: "Add 1 to each damage die if the opponent is afflicted with bleed, disease, or venom.",
  onDamageCalculate: (state, { owner }) => {
    var _a, _b;
    const opponent = getOpponent(owner);
    const statuses = ["Bleed", "Disease", "Venom"];
    const hasStatus = statuses.some((s) => hasEffect(state, opponent, s));
    if (hasStatus) {
      return ((_b = (_a = state.damage) == null ? void 0 : _a.damageRolls) == null ? void 0 : _b.length) || 0;
    }
    return 0;
  }
});
registerAbility({
  name: "Poison Mastery",
  type: "passive",
  description: "Increases damage dealt by Venom by 2."
});
registerAbility({
  name: "Sear",
  type: "passive",
  description: "Add 1 to each damage die for the duration of combat. Multiple sear items do not stack.",
  onDamageCalculate: (state, _context) => {
    var _a, _b;
    return ((_b = (_a = state.damage) == null ? void 0 : _a.damageRolls) == null ? void 0 : _b.length) ?? 0;
  }
});
registerAbility({
  name: "Second Skin",
  type: "passive",
  description: "Immune to the piercing ability."
});
registerAbility({
  name: "Seeing Red",
  type: "passive",
  description: "If health is 20 or less, increase speed by 2.",
  onPassiveAbility: (state, { owner }) => {
    const char = getCombatant(state, owner);
    if (char.stats.health <= 20) {
      return appendEffect(state, owner, {
        stats: { speed: 2 },
        source: "Seeing Red",
        target: owner,
        duration: void 0
      });
    }
    return removeEffect(state, owner, "Seeing Red");
  }
});
registerAbility({
  name: "Shades",
  type: "passive",
  description: "Summon shades at start of combat to add 2 to each damage die until sacrificed.",
  // "Sacrifice" ability handles the removal/usage.
  // This just adds the damage buff at start.
  onCombatStart: (state, { owner }) => {
    return appendEffect(state, owner, {
      stats: {},
      // But is it per die (like Sear) or total?
      source: "Shades",
      target: owner,
      duration: void 0
    });
  },
  onDamageCalculate: (state, { owner, target }) => {
    var _a, _b;
    if (owner === target) return 0;
    const numDice = ((_b = (_a = state.damage) == null ? void 0 : _a.damageRolls) == null ? void 0 : _b.length) || 0;
    return numDice * 2;
  }
  // TODO: I need to ensure `Sacrifice` ability removes 'Shades' effect.
});
registerAbility({
  name: "Shield Spin",
  type: "passive",
  description: "Opponents take 1 damage die (ignoring armour) for every [1] they roll for speed.",
  // TODO: Should this be done during end of round instead?
  onSpeedRoll: (state, { owner }) => {
    const opponent = owner === "hero" ? "enemy" : "hero";
    const rolls = opponent === "enemy" ? state.enemySpeedRolls : state.heroSpeedRolls;
    if (!rolls) return state;
    const ones = rolls.filter((r2) => r2.value === 1).length;
    if (ones === 0) return state;
    const dmgResults = rollDice(ones);
    const totalDmg = sumDice(dmgResults);
    return dealDamage(state, "Shield Spin", opponent, totalDmg);
  }
});
registerAbility({
  name: "Stake",
  type: "passive",
  description: "Instantly win if a vampire opponent's health is 10 or less.",
  onDamageDealt: (state, { owner }) => {
    const opponent = getOpponent(owner);
    const oppChar = getCombatant(state, opponent);
    const isVampire = oppChar.name.toLowerCase().includes("vampire") || oppChar.activeAbilities.has("Vampirism");
    if (isVampire && oppChar.stats.health <= 10) {
      state = dealDamage(state, "Stake", opponent, 10);
    }
    return state;
  }
});
registerAbility({
  name: "Steadfast",
  type: "passive",
  description: "Immune to the knockdown ability."
});
registerAbility({
  name: "Swift Strikes",
  type: "passive",
  description: "(Requires two swords). For each [6] rolled for speed, inflict damage equal to your fastest weapon's speed, ignoring armour.",
  onSpeedRoll: (state, { owner }) => {
    var _a, _b, _c, _d;
    if (!(hasEquipment(state.hero, /sword/, ["mainHand"]) && hasEquipment(state.hero, /sword/, ["leftHand"]))) return state;
    const rolls = state[owner === "hero" ? "heroSpeedRolls" : "enemySpeedRolls"];
    if (!rolls) return state;
    const sixes = rolls.filter((r2) => r2.value === 6).length;
    if (sixes === 0) return state;
    const damagePerSix = Math.max(
      ((_b = (_a = state.hero.original.equipment.mainHand) == null ? void 0 : _a.stats) == null ? void 0 : _b.speed) || 0,
      ((_d = (_c = state.hero.original.equipment.leftHand) == null ? void 0 : _c.stats) == null ? void 0 : _d.speed) || 0
    );
    const totalDmg = sixes * damagePerSix;
    return dealDamage(state, "Swift Strikes", getOpponent(owner), totalDmg);
  }
});
registerAbility({
  name: "Thorns",
  type: "passive",
  description: "Inflict 1 damage (ignoring armour) to all opponents at end of every round.",
  onPassiveAbility: (state, { owner }) => {
    const opponent = getOpponent(owner);
    return dealDamage(state, "Thorns", opponent, 1);
  }
});
function getDamage(state, owner) {
  let damage = 2;
  const hasMastery = hasAbility(state, owner, "Poison Mastery");
  const hasDeadly = hasAbility(state, owner, "Deadly Poisons");
  if (hasMastery) damage = 4;
  else if (hasDeadly) damage = 3;
  return damage;
}
registerAbility({
  name: "Venom",
  type: "passive",
  description: "If causing health damage, opponent loses 2 health (ignoring armour) at the end of every round.",
  reviewed: true,
  onDamageDealt(state, { target }, _source, damageDealt) {
    if (!target) return state;
    if (damageDealt > 0 && !hasEffect(state, target, "Venom")) {
      const damage = getDamage(state, target);
      return appendEffect(state, target, {
        stats: {},
        source: "Venom",
        target,
        duration: void 0,
        icon: "☠️",
        description: `Loses ${damage} health (ignoring armour) at the end of every round.`
      });
    }
    return state;
  },
  onPassiveAbility: (state, { owner }) => {
    const opponent = getOpponent(owner);
    if (!hasEffect(state, opponent, "Venom")) return state;
    const damage = getDamage(state, owner);
    return dealDamage(state, "Venom", opponent, damage, `Venom deals ${damage} damage to ${opponent}`);
  }
});
registerAbility({
  name: "Vitriol",
  type: "passive",
  description: "Inflict 1 damage to all opponents and your hero at the end of every round.",
  onPassiveAbility: (state, { owner }) => {
    state = dealDamage(state, "Vitriol", getOpponent(owner), 1);
    state = dealDamage(state, "Vitriol", owner, 1);
    return state;
  }
});
registerAbility({
  name: "Acid",
  type: "special",
  description: "Roll a die at the start of each combat round. If you roll a 1 or 2, you automatically take 2 damage. This ability ignores armour.",
  reviewed: true,
  icon: "🧪",
  onRoundStart: (state, { target }) => {
    if (!target) return state;
    const roll = rollDie().value;
    let logMsg = `Acid check: rolled ${roll}.`;
    if (roll <= 2) {
      return dealDamage(state, "Acid", target, 2, logMsg);
    }
    return addLogs(state, {
      message: logMsg + " No damage."
    });
  }
});
registerAbility({
  name: "And by crook",
  type: "special",
  description: "Once Luke's health falls below 20, he only rolls 1 die for speed but 2 for damage.",
  reviewed: false,
  icon: "🎲",
  onRoundStart: (state, { owner }) => {
    const combatant = getCombatant(state, owner);
    if (!combatant) return state;
    const health = combatant.stats.health;
    const effectSource = "And by crook";
    const hasBuff = hasEffect(state, owner, effectSource);
    if (health < 20) {
      if (!hasBuff) {
        const baseSpeedDice = combatant.stats.speedDice ?? 2;
        const baseDamageDice = combatant.stats.damageDice ?? 1;
        const speedMod = 1 - baseSpeedDice;
        const damageMod = 2 - baseDamageDice;
        return appendEffect(state, owner, {
          stats: {
            speedDice: speedMod,
            damageDice: damageMod
          },
          source: effectSource,
          target: owner,
          description: "Enraged: 1 Speed Die, 2 Damage Dice"
        });
      }
    } else if (hasBuff) {
      return removeEffect(state, owner, effectSource);
    }
    return state;
  }
});
function rerollLowDice(rolls) {
  if (!rolls) return { newRolls: [], rerolled: false };
  let rerolled = false;
  const newRolls = rolls.map((die) => {
    if (die.value <= 2 && !die.isRerolled) {
      rerolled = true;
      return rerollDie();
    }
    return die;
  });
  return { newRolls, rerolled };
}
registerAbility({
  name: "Bewitched",
  type: "special",
  description: "Reroll any 1 or 2 dice results for Zalldell. The results of the rerolled dice must be used.",
  reviewed: false,
  icon: "🔮",
  onSpeedRoll: (state) => {
    const rolls = state.enemySpeedRolls;
    const { newRolls, rerolled } = rerollLowDice(rolls);
    if (rerolled) {
      state = addLogs(state, {
        message: `Bewitched: Rerolling low dice (1s and 2s). ${formatDice(rolls)} -> ${formatDice(newRolls)}`
      });
      return {
        ...state,
        "enemySpeedRolls": newRolls
      };
    }
    return state;
  },
  onDamageRoll: (state) => {
    var _a;
    if (state.winner !== "enemy") return state;
    const rolls = (_a = state.damage) == null ? void 0 : _a.damageRolls;
    const { newRolls, rerolled } = rerollLowDice(rolls);
    if (rerolled) {
      state = addLogs(state, {
        message: `Bewitched: Rerolled low damage dice. ${formatDice(rolls)} -> ${formatDice(newRolls)}`
      });
      return {
        ...state,
        damage: {
          ...state.damage,
          damageRolls: newRolls
        }
      };
    }
    return state;
  }
});
const BloodDrinker = {
  name: "Blood Drinker",
  type: "special",
  description: "If the count rolls a 6 for damage, he rolls an extra die for damage and restores 2 health.",
  reviewed: false,
  onDamageRoll: (state, { owner }) => {
    if (state.winner !== owner) return state;
    const damage = state.damage;
    if (!damage) return state;
    const hasSix = damage.damageRolls.some((d) => d.value === 6);
    if (hasSix) {
      const extraRoll = rollDie();
      const newRolls = [...damage.damageRolls, extraRoll];
      state = modifyDamageRolls(state, newRolls, "Blood Drinker");
      state = healDamage(state, "Blood Drinker", owner, 2);
    }
    return state;
  }
};
registerAbility(BloodDrinker);
const BloodHarvest = {
  name: "Blood harvest",
  type: "special",
  description: "Each time you take health damage from Lady Roe, she heals 2 damage.",
  onDamageDealt: (state, { owner, target }, _source, damageDealt) => {
    if (damageDealt <= 0) return state;
    const opponent = getOpponent(owner);
    if (target !== opponent) return state;
    state = healDamage(
      state,
      "Blood harvest",
      owner,
      2,
      "Blood harvest: healed 2 health"
    );
    return state;
  }
};
registerAbility(BloodHarvest);
const ChargeHerUp = {
  name: "Charge her up",
  type: "special",
  description: "The wreeking mage does not roll for damage if they win a round. Instead, for every 2 rounds it wins, it deals 10 damage ignoring armour. Immune to Vanish, Evade, Sidestep.",
  icon: "🔋",
  reviewed: false,
  onDamageRoll: (state, { owner }) => {
    if (state.winner !== owner) return state;
    state = {
      ...state,
      damage: {
        ...state.damage,
        damageRolls: []
      }
    };
    if (hasEffect(state, owner, "Charge her up")) {
      state = removeEffect(state, owner, "Charge her up");
      const target = getOpponent(owner);
      const damageAmount = 10;
      state = dealDamage(state, "Charge her up", target, damageAmount, '"Charge her up" triggered after 2nd combat round victory');
    } else {
      state = appendEffect(state, owner, {
        stats: {},
        source: "Charge her up",
        target: "enemy",
        visible: false,
        duration: void 0
      });
    }
    return state;
  }
};
registerAbility(ChargeHerUp);
registerAbility({
  name: "Snap out of it!",
  type: "special",
  description: "At the start of each round, roll a die. If you roll a 6, you gain the Hopeless state and cannot use combat abilities.",
  reviewed: false,
  onRoundStart: (state, { owner }) => {
    const target = getOpponent(owner);
    const roll = rollDie().value;
    let logMsg = `Snap out of it!: Rolled ${roll}`;
    if (roll === 6) {
      logMsg += " - Hopeless state applied!";
      state = appendEffect(state, target, {
        stats: {},
        source: "Snap out of it!",
        target,
        duration: void 0,
        icon: "😱",
        description: "Hopeless: Cannot use combat abilities"
      });
    } else {
      logMsg += " - no effect";
    }
    return addLogs(state, { message: logMsg });
  }
});
registerAbility({
  name: "Soft spot",
  type: "special",
  description: "When you win a round, roll a die before damage. If you roll a 1 or 2, you cannot deal damage this round.",
  reviewed: false,
  onDamageRoll: (state, { owner }) => {
    if (state.winner !== getOpponent(owner)) return state;
    const roll = rollDie().value;
    let logMsg = `Soft spot: Hero rolled ${roll}`;
    if (roll <= 2) {
      logMsg += " - damage blocked!";
      return skipDamagePhase(state, logMsg);
    }
    return addLogs(state, { message: logMsg + " - damage proceeds" });
  }
});
registerAbility({
  name: "Watch your step",
  type: "special",
  description: "If you roll a 1 during speed rolls, you lose the combat round. Dice can be rerolled.",
  reviewed: false,
  onSpeedRoll: (state, { owner }) => {
    if (owner !== "enemy") return state;
    const heroRolls = state.heroSpeedRolls;
    if (!heroRolls) return state;
    const hasOne = heroRolls.some((r2) => r2.value === 1);
    if (hasOne) {
      state = addLogs(state, {
        message: "Watch your step: Hero rolled a 1! Loses this round."
      });
      return { ...state, winner: "enemy" };
    }
    return state;
  }
});
registerAbility({
  name: "Whirlwind",
  type: "special",
  description: "When rolling for damage, each 6 rolled adds an extra damage die. This can repeat.",
  icon: "🌪️",
  reviewed: false,
  onDamageRoll: (state, { owner }) => {
    if (state.winner !== owner || !state.damage) return state;
    let extraDice = 0;
    let rolls = [...state.damage.damageRolls];
    let idx = 0;
    while (idx < rolls.length) {
      if (rolls[idx].value === 6) {
        const newRoll = rollDie();
        rolls.push(newRoll);
        extraDice++;
      }
      idx++;
    }
    if (extraDice > 0) {
      state = addLogs(state, {
        message: `Whirlwind: Added ${extraDice} extra damage dice, damage dice: ${formatDice(rolls)}`
      });
      state = {
        ...state,
        damage: {
          ...state.damage,
          damageRolls: rolls,
          modifiers: state.damage.modifiers ?? []
        }
      };
    }
    return state;
  }
});
registerAbility({
  name: "Warts and all",
  type: "special",
  description: "At the start of each round, roll a die. If you roll a 1, you are transformed into a toad and roll only 1 speed die.",
  icon: "🐸",
  reviewed: false,
  onRoundStart: (state, { owner }) => {
    const target = getOpponent(owner);
    const roll = rollDie().value;
    let logMsg = `Warts and all: Rolled ${roll}`;
    if (roll === 1) {
      logMsg += " - transformed into a toad!";
      state = appendEffect(state, target, {
        stats: { speedDice: -1 },
        source: "Warts and all",
        target,
        duration: 1,
        description: "Toad: Only 1 speed die"
      });
    } else {
      logMsg += " - no effect";
    }
    return addLogs(state, { message: logMsg });
  }
});
registerAbility({
  name: "Punishing blows",
  type: "special",
  description: "Each time the enemy deals damage, your armour is permanently reduced by 1 for this combat.",
  icon: "🔨",
  reviewed: false,
  onDamageDealt: (state, { owner, target }, _source, damageDealt) => {
    if (damageDealt <= 0) return state;
    if (target !== getOpponent(owner)) return state;
    const existingEffect = getEffect(state, target, "Punishing blows");
    if (existingEffect) {
      state = removeEffect(state, target, "Punishing blows");
    }
    const currentReduction = (existingEffect == null ? void 0 : existingEffect.stats.armour) ?? 0;
    state = appendEffect(state, target, {
      stats: { armour: currentReduction - 1 },
      source: "Punishing blows",
      target,
      duration: void 0,
      description: `Armour reduced by ${Math.abs(currentReduction - 1)}`
    });
    return addLogs(state, {
      message: `Punishing blows: Hero's armour reduced by 1!`
    });
  }
});
registerAbility({
  name: "Split personality",
  type: "special",
  description: "For every 10 health lost, the enemy gains +1 to speed and brawn.",
  reviewed: false,
  onRoundStart: (state, { owner }) => {
    const combatant = getCombatant(state, owner);
    const healthLost = combatant.stats.maxHealth - combatant.stats.health;
    const stacks = Math.floor(healthLost / 10);
    if (stacks <= 0) return state;
    if (hasEffect(state, owner, "Split personality")) {
      state = removeEffect(state, owner, "Split personality");
    }
    state = appendEffect(state, owner, {
      stats: { speed: stacks, brawn: stacks },
      source: "Split personality",
      target: owner,
      duration: void 0,
      description: `+${stacks} speed/brawn from rage`
    });
    return state;
  }
});
registerAbility({
  name: "Strangle vines",
  type: "special",
  description: "At the start of each round, you take damage equal to the round number multiplied by 2.",
  reviewed: false,
  onRoundStart: (state, { owner }) => {
    const target = getOpponent(owner);
    const damage = state.round * 2;
    return dealDamage(
      state,
      "Strangle vines",
      target,
      damage,
      `Strangle vines: Round ${state.round} = ${damage} damage`
    );
  }
});
registerAbility({
  name: "Wailing Bride",
  type: "special",
  description: "At the start of each round, your speed, brawn, and magic are reduced by 1.",
  reviewed: false,
  onRoundStart: (state, { owner }) => {
    const target = getOpponent(owner);
    state = appendEffect(state, target, {
      stats: {
        speed: -state.round,
        brawn: -state.round,
        magic: -state.round
      },
      source: "Wailing Bride",
      target,
      duration: 1,
      description: `Stats reduced by ${Math.abs(state.round)}`
    });
    return state;
  }
});
registerAbility({
  name: "Many heads",
  type: "special",
  description: "If combat reaches round 4, the Hydra regenerates all its health.",
  reviewed: false,
  uses: 1,
  onRoundStart: (state, { owner }) => {
    if (state.round !== 4) return state;
    const combatant = getCombatant(state, owner);
    const healAmount = combatant.stats.maxHealth - combatant.stats.health;
    if (healAmount > 0) {
      state = healDamage(state, "Many heads", owner, healAmount);
    }
    return state;
  }
});
registerAbility({
  name: "Mighty roar",
  type: "special",
  description: "After winning 2 consecutive rounds with damage dealt, gain +4 to speed and brawn for the rest of combat.",
  reviewed: false,
  onDamageDealt: (state, { owner, target }, source, damageDealt) => {
    if (damageDealt <= 0) return state;
    if (target !== getOpponent(owner)) return state;
    if (source !== AttackSource || state.winner !== "enemy") return state;
    if (hasEffect(state, owner, "Mighty roar")) return state;
    const effectName = "Mighty roar (building)";
    if (!hasEffect(state, owner, effectName)) {
      state = appendEffect(state, owner, {
        stats: {},
        source: effectName,
        target: owner,
        duration: 2,
        // duration for this and next round
        description: "Tracking consecutive wins",
        visible: false
      });
      return state;
    }
    state = removeEffect(state, owner, effectName);
    return appendEffect(state, owner, {
      stats: { speed: 4, brawn: 4 },
      source: "Mighty roar",
      target: owner,
      duration: void 0,
      description: "+4 speed/brawn"
    });
  }
});
registerAbility({
  name: "Wind-dancer",
  type: "special",
  description: "During this combat, you cannot use potions or special abilities.",
  icon: "💨",
  reviewed: false,
  onCombatStart: (state) => {
    state.hero.activeAbilities = /* @__PURE__ */ new Map();
    state.backpack = [];
    return addLogs(state, {
      message: "Wind-dancer: Hero cannot use potions or abilities!"
    });
  }
});
registerAbility({
  name: "Wail of the Banshee",
  type: "special",
  description: "If the Banshee's health is 100 or more at the start of combat, you automatically lose.",
  icon: "💀",
  reviewed: false,
  onCombatStart: (state, { owner }) => {
    const banshee = getCombatant(state, owner);
    if (banshee.stats.health < 100) return state;
    state = addLogs(state, {
      message: "Wail of the Banshee: Health >= 100! Instant loss!"
    });
    return {
      ...state,
      hero: {
        ...state.hero,
        stats: { ...state.hero.stats, health: 0 }
      },
      phase: "combat-end"
    };
  }
});
registerAbility({
  name: "Endless Swarm",
  type: "special",
  description: "The Sentries cannot be defeated. Their health cannot drop below 1.",
  reviewed: false,
  onDamageDealt: (state, { owner, target }, _source, _damageDealt) => {
    if (target !== owner) return state;
    const combatant = getCombatant(state, owner);
    if (combatant.stats.health <= 0) {
      state = updateCombatant(state, owner, {
        ...combatant,
        stats: { ...combatant.stats, health: 1 }
      });
      state = addLogs(state, {
        message: "Endless Swarm: Cannot be defeated! Health restored to 1."
      });
    }
    return state;
  }
});
const Distraction = {
  name: "Distraction",
  type: "special",
  description: "When you lose a round, roll a die. If you roll a 1 or 2, skip the damage roll for this round.",
  icon: "🎭",
  reviewed: false,
  onDamageRoll: (state) => {
    if (!state.winner || state.winner !== "enemy") return state;
    const roll = rollDie().value;
    if (roll <= 2) {
      state = {
        ...state,
        damage: { damageRolls: [], modifiers: [] },
        winner: null
      };
      state = addLogs(state, {
        message: `Distraction rolled a ${roll}! Skipping damage roll.`
      });
    } else {
      state = addLogs(state, {
        message: `Distraction rolled a ${roll}, no effect.`
      });
    }
    return state;
  }
};
registerAbility(Distraction);
const Downsized = {
  name: "Downsized",
  type: "special",
  description: "For every 10 health that the Centipede loses, one of its body segments is destroying its speed and branch (brawn) by 1 each time.",
  reviewed: false,
  onRoundStart: (state, { owner }) => {
    const char = getCombatant(state, owner);
    const lost = char.stats.maxHealth - char.stats.health;
    const stacks = Math.floor(lost / 10);
    if (stacks > 0) {
      state = removeEffect(state, owner, "Downsized");
      state = appendEffect(state, owner, {
        stats: { speed: -stacks, brawn: -stacks },
        source: "Downsized",
        target: owner,
        duration: void 0,
        description: `Lost segments: -${stacks} Speed/Brawn`
      });
    }
    return state;
  }
};
registerAbility(Downsized);
const DragonBreath = {
  name: "Dragon breath",
  type: "special",
  description: "If the opponent has the 'burn' status, Dragon Breath deals 2 damage at start of each combat round. This damage ignores armor.",
  reviewed: false,
  onRoundStart: (state, { owner }) => {
    const target = getOpponent(owner);
    const hasBurn = hasEffect(state, target, "Ignite") || getCombatant(state, target).activeEffects.some((e) => e.source.toLowerCase().includes("burn"));
    if (hasBurn) {
      state = dealDamage(state, "Dragon breath", target, 2, "Opponent is burning! Dragon breath deals 2 damage.");
    }
    return state;
  }
};
registerAbility(DragonBreath);
const Entrapment = {
  name: "Entrapment",
  type: "special",
  description: "Each time you win a combat round, your opponent rolls one less combat die in the next round.",
  reviewed: false,
  onDamageRoll: (state, { owner }) => {
    if (state.winner === owner) {
      const target = getOpponent(owner);
      state = appendEffect(state, target, {
        stats: { speedDice: -1 },
        source: "Entrapment",
        target,
        duration: 2,
        // Lasts until end of next round
        description: "-1 Speed Die next round"
      });
    }
    return state;
  }
};
registerAbility(Entrapment);
const EyeBeam = {
  name: "Eye Beam",
  type: "special",
  description: "If you roll a [6] for your attack speed, you can choose to deal 2 damage to your opponent immediately (this damage ignores armor).",
  reviewed: false,
  onSpeedRoll: (state, { owner }) => {
    const rolls = owner === "hero" ? state.heroSpeedRolls : state.enemySpeedRolls;
    if (!rolls) return state;
    const hasSix = rolls.some((r2) => r2.value === 6);
    if (hasSix) {
      const target = getOpponent(owner);
      state = dealDamage(state, "Eye Beam", target, 2, "Eye Beam deals 2 damage ignoring armour!");
    }
    return state;
  }
};
registerAbility(EyeBeam);
const FaithfulDuty = {
  name: "Faithful duty",
  type: "special",
  description: "If the hero's health drops to 4 or less, restore 10 health. This ability can only be used once per combat.",
  reviewed: false,
  uses: 1,
  onDamageDealt: (state, { owner }) => {
    if (hasEffect(state, owner, "Faithful duty")) {
      return state;
    }
    const currentHealth = getCombatant(state, owner).stats.health;
    if (currentHealth > 4) return state;
    state = appendEffect(state, owner, {
      stats: {},
      source: "Faithful duty",
      target: owner
    });
    state = useAbility(state, owner, "Faithful duty");
    return healDamage(state, "Faithful duty", owner, 10);
  }
};
registerAbility(FaithfulDuty);
const Ferocity = {
  name: "Ferocity",
  type: "special",
  description: "If you roll a [6] for your attack speed, you roll an extra die to determine your damage score.",
  reviewed: false,
  onSpeedRoll: (state, { owner }) => {
    const rolls = owner === "hero" ? state.heroSpeedRolls : state.enemySpeedRolls;
    if (!rolls) return state;
    const hasSix = rolls.some((r2) => r2.value === 6);
    if (hasSix) {
      state = appendEffect(state, owner, {
        stats: { damageDice: 1 },
        source: "Ferocity",
        target: owner,
        duration: 1,
        description: "+1 Damage Die"
      });
    }
    return state;
  }
};
registerAbility(Ferocity);
const Frenzy = {
  name: "Frenzy",
  type: "special",
  description: "If the Packmaster is alive, the Ghouls roll 2 damage dice.",
  reviewed: false,
  // TODO: This requires checking if another enemy (Packmaster) is alive in combat.
  // For now, we implement a simple onCombatStart buff.
  onRoundStart: (state, context) => {
    if (!hasEffect(state, context.owner, "Frenzy")) {
      state = appendEffect(state, context.owner, {
        stats: { damageDice: 1 },
        // +1 to base 1 = 2 dice
        source: "Frenzy",
        target: context.owner,
        description: "Frenzy: +1 Damage Die"
      });
    }
    return state;
  }
};
registerAbility(Frenzy);
const FromTheAshes = {
  name: "From the ashes",
  type: "special",
  description: "At the end of the combat, the Phoenix rises again as Phoenix risen.",
  reviewed: false,
  // TODO: This requires spawning a new enemy after combat ends.
  // For now, we log a message as a placeholder.
  onCombatEnd: (state, { owner }) => {
    const combatant = getCombatant(state, { type: owner, enemyIndex: 0 });
    if (!combatant) return state;
    if (combatant.stats.health <= 0) {
      state = addLogs(state, {
        message: "From the ashes: The Phoenix rises again! (TODO: Spawn Phoenix risen)"
      });
      const newEnemy = {
        ...state.enemies[0],
        name: "Phoenix risen",
        stats: {
          ...state.enemies[0].stats,
          health: 10,
          maxHealth: 10,
          speedDice: 2,
          damageDice: 2
        },
        activeEffects: []
      };
      const newEnemies = [...state.enemies];
      newEnemies[0] = newEnemy;
      state = {
        ...state,
        phase: "round-start",
        enemies: newEnemies
      };
      addAbility(state.enemies[0], requireAbilityDefinition("Body of flame"));
    }
    return state;
  }
};
registerAbility(FromTheAshes);
const GlutinousMaximus = {
  name: "Glutinous maximus",
  type: "special",
  description: "Every time you win a combat round, you are reduced to 1 speed die for the next attack roll. Cannot be avoided.",
  reviewed: false,
  onDamageRoll: (state) => {
    if (state.winner !== "hero") return state;
    if (hasEffect(state, "hero", "Glutinous maximus")) {
      return state;
    }
    return appendEffect(state, "hero", {
      stats: { speedDice: -1 },
      source: "Glutinous maximus",
      target: "hero",
      duration: 2,
      description: "Reduced to 1 speed die"
    });
  }
};
registerAbility(GlutinousMaximus);
function createHealingAbility(config) {
  registerAbility({
    name: config.name,
    type: "special",
    description: config.description,
    icon: "💚",
    reviewed: true,
    onRoundStart: config.trigger === "round-start" ? (state, { owner }) => {
      const combatant = getCombatant(state, owner);
      if (config.stopAtZero && combatant.stats.health <= 0) {
        return state;
      }
      state = healDamage(
        state,
        config.name,
        owner,
        config.amount,
        `${config.name}: +${config.amount} health`
      );
      return state;
    } : void 0,
    onPassiveAbility: config.trigger === "round-end" ? (state, { owner }) => {
      const combatant = getCombatant(state, owner);
      if (config.stopAtZero && combatant.stats.health <= 0) {
        return state;
      }
      state = healDamage(
        state,
        config.name,
        owner,
        config.amount,
        `${config.name}: +${config.amount} health`
      );
      return state;
    } : void 0
  });
}
createHealingAbility({
  name: "Regeneration",
  description: "At the start of the combat round, the Troll regains 2 health. Once the trolls health has been reduced to 0, he cannot heal.",
  amount: 2,
  trigger: "round-start",
  stopAtZero: true
});
createHealingAbility({
  name: "Healing touch",
  description: "At the end of the combat round, Allura heals 2 health. Once her health has been reduced to 0, she cannot heal.",
  amount: 2,
  trigger: "round-end",
  stopAtZero: true
});
createHealingAbility({
  name: "Holy Circle",
  description: "At the end of the combat round, the Architect heals 4 health.",
  amount: 4,
  trigger: "round-end"
});
createHealingAbility({
  name: "Dark Runes",
  description: "At the end of each combat round, the enemy heals 3 health.",
  amount: 3,
  trigger: "round-end"
});
createHealingAbility({
  name: "Enduring Spirit",
  description: "At the end of the combat round, Lorcan heals 4 health if not defeated.",
  amount: 4,
  trigger: "round-end",
  stopAtZero: true
});
createHealingAbility({
  name: "Gathering Darkness",
  description: "At the end of each combat round, the enemy heals 8 health if not defeated.",
  amount: 8,
  trigger: "round-end",
  stopAtZero: true
});
function createImmunityAbility(config) {
  const desc = config.description || `Immune to ${config.immunities.join(", ")}.`;
  const immunities = config.immunities.map((i) => toCanonicalName(i));
  registerAbility({
    name: config.name,
    type: "passive",
    description: desc,
    icon: "🛡️",
    reviewed: true,
    onDamageDealt: (state, { owner, target }, source, damageDealt) => {
      if (!target || owner !== target) return state;
      if (immunities.includes(source)) {
        state = healDamage(state, config.name, target, damageDealt, "Immune");
        state = addLogs(state, {
          message: `${target} is immune to ${source}.`
        });
        return state;
      }
      return state;
    }
  });
}
createImmunityAbility({
  name: "Blazing armour",
  immunities: ["Piercing", "Sear", "Impale", "Bleed", "Burn", "Ignite"]
});
createImmunityAbility({
  name: "Bloated body",
  immunities: ["Piercing", "Impale", "Barbs", "Thorns"]
});
createImmunityAbility({
  name: "Body of Flame",
  immunities: ["Sear", "Fire aura", "Bleed", "Burn", "Ignite"]
});
createImmunityAbility({
  name: "Body of Ice",
  immunities: ["Venom", "Disease", "Bleed"]
});
createImmunityAbility({
  name: "Body of air",
  immunities: ["Bleed", "Venom", "Disease"]
});
createImmunityAbility({
  name: "Body of bone",
  immunities: ["Bleed", "Venom"]
});
createImmunityAbility({
  name: "Body of rock",
  immunities: ["Piercing", "Impale", "Bleed", "Venom", "Thorns", "Barbs", "Lightning"]
});
createImmunityAbility({
  name: "Dragon hide",
  immunities: ["Piercing", "Impale", "Thorns", "Barbs"]
});
createImmunityAbility({
  name: "Got ma eyes an yer",
  immunities: ["Sidestep", "Evade", "Vanish"]
});
createImmunityAbility({
  name: "Heightened Magic",
  immunities: ["Sidestep", "Evade", "Vanish"]
});
createImmunityAbility({
  name: "Iron Clad",
  immunities: ["Piercing", "Impale", "Bleed", "Disease", "Venom"]
});
createImmunityAbility({
  name: "Lightning reflex",
  immunities: ["Sidestep", "Evade", "Vanish"]
});
createImmunityAbility({
  name: "Painted Veil",
  immunities: ["Venom", "Bleed"]
});
createImmunityAbility({
  name: "Sack and straw",
  immunities: ["Lightning", "Piercing", "Immobilise", "Venom", "Thorns", "Corruption"]
});
createImmunityAbility({
  name: "Steel yourself",
  immunities: ["Piercing", "Impale", "Barbs", "Thorns"]
});
createImmunityAbility({
  name: "Sinister Steel",
  immunities: ["Piercing", "Impale", "Barbs", "Thorns", "Bleed", "Venom"]
});
createImmunityAbility({
  name: "Lightning Reflexes",
  immunities: ["Sidestep", "Evade", "Vanish"]
});
createImmunityAbility({
  name: "Heightened Senses",
  immunities: ["Sidestep", "Evade", "Vanish"]
});
createImmunityAbility({
  name: "Iron-Mane",
  immunities: ["Piercing", "Impale"]
});
createImmunityAbility({
  name: "Body of Metal",
  immunities: ["Piercing", "Impale", "Barbs", "Thorns", "Bleed", "Venom", "Disease"]
});
createImmunityAbility({
  name: "Natural Immunity",
  description: "Immune to all passive effects.",
  immunities: []
});
createImmunityAbility({
  name: "Enchanted Stone",
  description: "Immune to all passive effects.",
  immunities: []
});
const InkBombs = {
  name: "Ink bombs",
  type: "special",
  description: "If you roll a 1 during speed rolls, hero is blinded and loses the round. You can only use passive abilities in this round. Dice can be rerolled.",
  reviewed: false,
  onSpeedRoll: (state, { owner }) => {
    if (owner !== "enemy") return state;
    const heroRolls = state.heroSpeedRolls;
    if (!heroRolls) return state;
    const hasOne = heroRolls.some((r2) => r2.value === 1 && !r2.isRerolled);
    if (hasOne) {
      state = addLogs(state, {
        message: "Ink bombs: Hero rolled a 1 and is blinded! Loses this round."
      });
      state = {
        ...state,
        winner: "enemy"
      };
    }
    return state;
  }
};
registerAbility(InkBombs);
const KingOfTheSwingers = {
  name: "King of the swingers",
  type: "special",
  description: "At the end of every combat round you automatically take 15 damage. Armour can be used to absorb this damage.",
  reviewed: false,
  onPassiveAbility: (state, { owner }) => {
    if (owner !== "enemy") return state;
    const heroArmour = state.hero.stats.armour ?? 0;
    const damageAfterArmour = Math.max(0, 15 - heroArmour);
    if (damageAfterArmour > 0) {
      state = dealDamage(
        state,
        "King of the swingers",
        "hero",
        damageAfterArmour,
        `King of the swingers deals ${damageAfterArmour} damage (15 - ${heroArmour} armour)`
      );
    }
    return state;
  }
};
registerAbility(KingOfTheSwingers);
function createDoTAbility(config) {
  registerAbility({
    name: config.name,
    type: "special",
    description: config.description,
    icon: config.icon ?? "☠️",
    reviewed: true,
    onDamageDealt: (state, { target }, _source, damageDealt) => {
      if (config.condition === "always") return state;
      if (!target) return state;
      const conditionMet = config.condition === "on-hit" || config.condition === "on-damage" && damageDealt > 0;
      if (conditionMet && !hasEffect(state, target, config.name)) {
        return appendEffect(state, target, {
          stats: {},
          source: config.name,
          target,
          duration: void 0,
          icon: config.icon ?? "☠️",
          description: config.description
        });
      }
      return state;
    },
    onPassiveAbility: (state, { owner }) => {
      const opponent = getOpponent(owner);
      const shouldTrigger = config.condition === "always" || hasEffect(state, opponent, config.name);
      if (shouldTrigger) {
        let damage = config.damage;
        let damageMsg = `${config.name} deals ${damage} damage`;
        const ignoreArmour = config.ignoreArmour !== false;
        if (!ignoreArmour) {
          const targetChar = getCombatant(state, opponent);
          const armour = targetChar.stats.armour;
          damage = Math.max(0, damage - armour);
          damageMsg += ` (reduced by armour)`;
        } else {
          damageMsg += ` (ignoring armour)`;
        }
        if (damage > 0) {
          return dealDamage(state, config.name, opponent, damage, damageMsg);
        }
      }
      return state;
    },
    onCombatStart: (state, { owner }) => {
      if (config.condition === "always" && !hasEffect(state, owner, config.name)) {
        return appendEffect(state, owner, {
          stats: {},
          source: config.name,
          target: owner,
          duration: void 0,
          icon: config.icon ?? "☠️",
          description: config.description
        });
      }
      return state;
    }
  });
}
createDoTAbility({
  name: "Black coils",
  description: "At the end of every combat round you automatically lose 2 health ignoring armour",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Black sigill",
  description: "At the end of each combat round, your hero suffers 1 damage. This ability ignores armour.",
  damage: 1,
  condition: "always"
});
createDoTAbility({
  name: "Black venom",
  description: "After a successful attack causing damage, lose 2 health on every end of a round, ignoring armour.",
  damage: 2,
  condition: "on-damage"
});
createDoTAbility({
  name: "Blacke fire",
  description: "At the end of the combat round, your hero takes 2 damage from the flames that surround the demon. This ability ignores armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Carrion Beetles",
  description: "At the end of the round, you take 2 health damage, ignoring armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Carrion Crows",
  description: "At the start of each round, you take 4 health damage, ignoring armour.",
  damage: 4,
  condition: "on-start-round"
});
createDoTAbility({
  name: "Deadly venom",
  description: "Once you have taken health damage, you lose 3 health at the end of each combat round.",
  damage: 3,
  condition: "on-damage"
});
createDoTAbility({
  name: "Disease",
  description: "Once you have taken health damage, you lose 2 health at the end of each combat round.",
  damage: 2,
  condition: "on-damage"
});
createDoTAbility({
  name: "Fiery aura",
  description: "At the end of each combat round, the hero takes 3 damage ignoring armour.",
  damage: 3,
  condition: "always"
});
createDoTAbility({
  name: "Grave Chill",
  description: "At the end of each combat round, the hero takes 2 damage ignoring armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Hellfire",
  description: "At the end of the combat round, your hero takes 2 damage from the flames that surround the demon. This ability ignores armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Heat Exposure",
  description: "At the end of each combat round, you take 2 damage ignoring armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Fire Sprite",
  description: "At the end of each combat round, you take 2 damage ignoring armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Black Lightening",
  description: "At the end of each combat round, you take 4 damage ignoring armour.",
  damage: 4,
  condition: "always"
});
createDoTAbility({
  name: "Black Poison",
  description: "Once you have taken health damage, at the end of every combat round you must automatically lose 2 health.",
  damage: 2,
  condition: "on-damage"
});
createDoTAbility({
  name: "Sucker Punch",
  description: "Once you have taken health damage, at the end of every combat round you must automatically lose 2 health ignoring armour.",
  damage: 2,
  condition: "on-damage"
});
createDoTAbility({
  name: "Wyvern Talons",
  description: "At the end of the round, you take 2 damage ignoring armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Poison Needles",
  description: "At the end of every combat round, lose 2 health.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Poisened arrow",
  description: "At the end of each combat round you lose 2 health.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Snapping Beak",
  description: "At the end of every combat round, lose 2 health ignoring armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Snappers",
  description: "At the end of every combat round, lose 2 health ignoring armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Stone Golem",
  description: "At the end of the round, take 1 damage ignoring armour.",
  damage: 1,
  condition: "always"
});
createDoTAbility({
  name: "Whirling Blades",
  description: "At the end of each combat round, you take 2 damage ignoring armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Mark of Fury",
  description: "At the end of the combat round, the hero takes 3 damage ignoring armour.",
  damage: 3,
  condition: "always"
});
createDoTAbility({
  name: "Giblets",
  description: "At the end of the combat round, the hero takes 3 damage ignoring armour.",
  damage: 3,
  condition: "always"
});
createDoTAbility({
  name: "Stomping Statues",
  description: "At the end of the combat round, the statues deal 4 damage ignoring armour to the hero.",
  damage: 4,
  condition: "always"
});
createDoTAbility({
  name: "Poison Nodes",
  description: "At the end of each combat round, the hero takes 2 damage ignoring armour.",
  damage: 2,
  condition: "always"
});
createDoTAbility({
  name: "Flame Form",
  description: "At the end of the combat round, the hero loses 4 health ignoring armour.",
  damage: 4,
  condition: "always"
});
createDoTAbility({
  name: "Molten armour",
  description: "At the end of the round the hero takes 4 damage ignoring armour.",
  damage: 4,
  condition: "always"
});
createDoTAbility({
  name: "Neural Blast",
  description: "At the end of the combat round, the hero takes 10 damage ignoring armour.",
  damage: 10,
  condition: "always"
});
createDoTAbility({
  name: "Tight Spot",
  description: "At the end of the round, take 5 damage ignoring armour.",
  damage: 5,
  condition: "always"
});
createDoTAbility({
  name: "Oozing Tentacles",
  description: "At the end of the round, you take 2 damage ignoring armour from every Tentacle.",
  damage: 2,
  condition: "always"
});
function createRetaliationAbility(config) {
  registerAbility({
    name: config.name,
    type: "special",
    description: config.description,
    icon: "🔄",
    reviewed: true,
    onDamageDealt: (state, { owner, target }, _source, damageDealt) => {
      if (damageDealt <= 0) return state;
      const opponent = getOpponent(owner);
      if (config.trigger === "on-owner-damaged" && target === owner) {
        state = dealDamage(
          state,
          config.name,
          opponent,
          config.damage,
          `${config.name}: ${config.damage} retaliation damage`
        );
      } else if (config.trigger === "on-owner-deals-damage" && target === opponent) {
        state = dealDamage(
          state,
          config.name,
          opponent,
          config.damage,
          `${config.name}: ${config.damage} damage in return`
        );
      }
      return state;
    }
  });
}
createRetaliationAbility({
  name: "Charged",
  description: "Each time you inflict health damage on the elemental, you take 2 damage in return. This ability ignores armour.",
  damage: 2,
  trigger: "on-owner-damaged"
});
createRetaliationAbility({
  name: "Thorn Fists",
  description: "Each time the enemy takes damage, the hero loses 4 health ignoring armour.",
  damage: 4,
  trigger: "on-owner-damaged"
});
createRetaliationAbility({
  name: "Retaliation",
  description: "Each time Sanrah takes attack damage, the hero loses 1 health ignoring armour.",
  damage: 1,
  trigger: "on-owner-damaged"
});
function createRollCheckAbility(config) {
  registerAbility({
    name: config.name,
    type: "special",
    description: config.description,
    icon: config.icon ?? "🎲",
    reviewed: false,
    onRoundStart: (state, { owner }) => {
      const target = getOpponent(owner);
      const targetCombatant = getCombatant(state, target);
      const rolls = rollDice(config.diceCount);
      const total = sumDice(rolls);
      const rollStr = formatDice(rolls);
      let triggered = false;
      let logMsg = `${config.name}: Rolled ${rollStr}=${total}`;
      if (config.triggerCondition.type === "vs-speed") {
        const speed = targetCombatant.stats.speed;
        logMsg += ` vs speed ${speed}`;
        triggered = total > speed;
      } else {
        triggered = rolls.some(
          (r2) => config.triggerCondition.type === "fixed" && config.triggerCondition.values.includes(r2.value)
        );
      }
      if (triggered) {
        let damage;
        if (config.damage === "formula" && config.damageFormula) {
          damage = config.damageFormula(targetCombatant.stats.armour);
        } else if (typeof config.damage === "number") {
          damage = config.damage;
        } else {
          damage = 0;
        }
        logMsg += ` - triggered! ${damage} damage`;
        return dealDamage(state, config.name, target, damage, logMsg);
      }
      return addLogs(state, { message: logMsg + " - no effect" });
    }
  });
}
createRollCheckAbility({
  name: "Mud Pie",
  description: "At the start of each round, roll 2 dice. If the result is higher than your speed, you take 2 damage ignoring armour.",
  diceCount: 2,
  triggerCondition: { type: "vs-speed" },
  damage: 2
});
createRollCheckAbility({
  name: "Vortex of fire",
  description: "At the start of each round, roll 2 dice. If the result is higher than your speed, you take 4 damage ignoring armour.",
  diceCount: 2,
  triggerCondition: { type: "vs-speed" },
  damage: 4,
  icon: "🔥"
});
createRollCheckAbility({
  name: "Clobbering Time",
  description: "At the start of each round, roll 4 dice. If the result is higher than your speed, you take 15 damage minus half your armour.",
  diceCount: 4,
  triggerCondition: { type: "vs-speed" },
  damage: "formula",
  damageFormula: (armour) => Math.max(0, 15 - Math.floor(armour / 2)),
  icon: "👊"
});
createRollCheckAbility({
  name: "Pincer Movement",
  description: "At the start of each round, roll 1 die. If you roll a 1, you lose 2 health ignoring armour.",
  diceCount: 1,
  triggerCondition: { type: "fixed", values: [1] },
  damage: 2,
  icon: "🦂"
});
createRollCheckAbility({
  name: "Shield Slam",
  description: "At the start of each round, roll 1 die. If you roll a 1, you take 6 damage ignoring armour. Rerolls not allowed.",
  diceCount: 1,
  triggerCondition: { type: "fixed", values: [1] },
  damage: 6,
  icon: "🛡️"
});
createRollCheckAbility({
  name: "Tangled roots",
  description: "At the start of each round, roll 1 die. If you roll a 1 or 2, you lose 5 health ignoring armour.",
  diceCount: 1,
  triggerCondition: { type: "fixed", values: [1, 2] },
  damage: 5,
  icon: "🌿"
});
createRollCheckAbility({
  name: "Bolt from the Blue",
  description: "At the end of the combat round, roll a die. If the result is 1, 2, or 3, take 5 damage ignoring armour.",
  diceCount: 1,
  triggerCondition: { type: "fixed", values: [1, 2, 3] },
  damage: 5,
  icon: "⚡"
});
function createRollDamageAbility(config) {
  registerAbility({
    name: config.name,
    type: "special",
    description: config.description,
    icon: config.icon ?? "🎲",
    reviewed: true,
    onSpeedRoll: config.rollType === "speed" || config.rollType === "all" ? (state) => {
      const targetRolls = config.rollsTarget === "hero" ? state.heroSpeedRolls : state.enemySpeedRolls;
      if (!targetRolls) return state;
      const triggerCount = targetRolls.filter(
        (r2) => config.triggerValues.includes(r2.value)
      ).length;
      if (triggerCount > 0) {
        const totalDamage = triggerCount * config.damagePerTrigger;
        state = dealDamage(
          state,
          config.name,
          config.damageTarget,
          totalDamage,
          `${config.name}: ${triggerCount}x ${config.triggerValues.join("/")} rolled = ${totalDamage} damage`
        );
      }
      return state;
    } : void 0,
    onDamageRoll: config.rollType === "damage" || config.rollType === "all" ? (state) => {
      if (!state.damage || state.winner !== config.rollsTarget) return state;
      const triggerCount = state.damage.damageRolls.filter(
        (r2) => config.triggerValues.includes(r2.value)
      ).length;
      if (triggerCount > 0) {
        const totalDamage = triggerCount * config.damagePerTrigger;
        state = dealDamage(
          state,
          config.name,
          config.damageTarget,
          totalDamage,
          `${config.name}: ${triggerCount}x ${config.triggerValues.join("/")} rolled = ${totalDamage} damage`
        );
      }
      return state;
    } : void 0
  });
}
createRollDamageAbility({
  name: "By hook",
  description: "For each 1 you roll you immediately lose 2 health, ignoring armour.",
  triggerValues: [1],
  damagePerTrigger: 2,
  rollType: "all",
  rollsTarget: "hero",
  damageTarget: "hero"
});
createRollDamageAbility({
  name: "Tail lash",
  description: "For every 1 you roll, the ratling hits you for 1 damage, ignoring armour.",
  triggerValues: [1],
  damagePerTrigger: 1,
  rollType: "all",
  rollsTarget: "hero",
  damageTarget: "hero"
});
createRollDamageAbility({
  name: "Terrible Talons",
  description: "For each 1 you roll, take 2 damage ignoring armour.",
  triggerValues: [1],
  damagePerTrigger: 2,
  rollType: "all",
  rollsTarget: "hero",
  damageTarget: "hero"
});
createRollDamageAbility({
  name: "Sharpshooter",
  description: "For each 1 you roll, take 1 damage ignoring armour.",
  triggerValues: [1],
  damagePerTrigger: 1,
  rollType: "all",
  rollsTarget: "hero",
  damageTarget: "hero"
});
createRollDamageAbility({
  name: "Maelstrom",
  description: "For each 1 you roll, lose 8 health ignoring armour.",
  triggerValues: [1],
  damagePerTrigger: 8,
  rollType: "all",
  rollsTarget: "hero",
  damageTarget: "hero"
});
createRollDamageAbility({
  name: "Whiplash",
  description: "For each 6 the enemy rolls for attack speed, you lose 2 health ignoring armour.",
  triggerValues: [6],
  damagePerTrigger: 2,
  rollType: "speed",
  rollsTarget: "enemy",
  damageTarget: "hero"
});
createRollDamageAbility({
  name: "Crone's dagger",
  description: "If the Ruffians roll a 6 for damage, the crone's dagger automatically inflicts 1 extra point of health damage.",
  triggerValues: [6],
  damagePerTrigger: 1,
  rollType: "damage",
  rollsTarget: "enemy",
  damageTarget: "hero"
});
createRollDamageAbility({
  name: "Keen Edge",
  description: "If the enemy rolls a 5 or 6 for their damage score, they add 4 more damage.",
  triggerValues: [5, 6],
  damagePerTrigger: 4,
  rollType: "damage",
  rollsTarget: "enemy",
  damageTarget: "hero"
});
function createStatCombatModifierAbility(config) {
  const skillIcons = Object.keys(config.stats).map((name) => getStatIcon(name));
  const icon = config.icon ?? skillIcons.length > 0 ? skillIcons[0] : getStatIcon("enemy");
  registerAbility({
    name: config.name,
    type: "modifier",
    description: config.description,
    icon,
    onCombatStart(state, { owner }) {
      state = appendEffect(state, config.target ?? owner, {
        stats: config.stats,
        source: config.name,
        target: owner,
        duration: void 0,
        icon
      });
      return state;
    }
  });
}
createStatCombatModifierAbility({
  name: "Avian's aid",
  // "Avian's aid"
  description: "Add 2 to your damage score for the entire combat.",
  stats: { damageModifier: 2 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Holy Water",
  description: "You may add 2 to your damage score in this combat.",
  stats: { damageModifier: 2 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Holy Flame",
  description: "Add 4 to the Architect's damage score.",
  stats: { damageModifier: 4 },
  target: "enemy"
});
createStatCombatModifierAbility({
  name: "Team Effort",
  description: "The hero adds 2 to their damage score, and 2 to their armour.",
  stats: { damageModifier: 2, armour: 2 }
});
createStatCombatModifierAbility({
  name: "Power of Shadow",
  description: "Your brawn and magic are raised by 5.",
  stats: { brawn: 5, magic: 5 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Holy Aura",
  description: "The hero adds 2 to their brawn and magic scores.",
  stats: { brawn: 2, magic: 2 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Caaleb's Shield",
  description: "The hero's armour is increased by 2.",
  stats: { armour: 2 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Fatigue",
  description: "The hero reduces their brawn and magic by 2 for the combat.",
  stats: { brawn: -2, magic: -2 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Thorn Spines",
  description: "Reduce hero speed by 1 for the entire combat.",
  stats: { speed: -1 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Wing buffet",
  description: "You must reduce your speed by 1 for the entire combat.",
  stats: { speed: -1 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Dread",
  description: "Causes Fear, reducing brawn and magic by 1 for the entire combat.",
  stats: { brawn: -1, magic: -1 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Mighty blows",
  description: "Voldring rolls 2 damage dice.",
  stats: { damageDice: 1 },
  target: "enemy"
});
createStatCombatModifierAbility({
  name: "Double Danger",
  description: "The enemy rolls 2 damage dice.",
  stats: { damageDice: 1 },
  target: "enemy"
});
createStatCombatModifierAbility({
  name: "Cat's speed",
  description: "Shara Khana rolls 3 dice to determine her attack speed. Your hero special abilities can be used to reduce this number.",
  stats: { speedDice: 1 },
  target: "enemy"
});
createStatCombatModifierAbility({
  name: "Piercing Claws",
  description: "The ghouls' attacks ignore armour.",
  stats: { armour: -100 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Stingers",
  description: "Attacks ignore armour.",
  stats: { armour: -100 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Dervish",
  description: "Attacks ignore armour.",
  stats: { armour: -100 },
  target: "hero"
});
createStatCombatModifierAbility({
  name: "Crazy hal",
  description: "When you roll for damage, Crazy hal adds 1 extra damage score.",
  stats: { damageModifier: 1 },
  target: "enemy"
});
registerAbility(createNoopAbility({
  name: "A Siege of Scarrons",
  description: "Complex multi-enemy combat encounter."
}));
registerAbility(createNoopAbility({
  name: "Absorption",
  description: "If you win a round, roll a die. If the result is 3+, reduce the magic of the enemy by 4. If magic reaches 0, you win."
}));
registerAbility(createNoopAbility({
  name: "Air of corruption",
  description: "You cannot use any special abilities. You can use potions and backpack items."
}));
registerAbility(createNoopAbility({
  name: "Concentration",
  description: "You cannot use potions or special abilities."
}));
registerAbility(createNoopAbility({
  name: "Dark Claw",
  description: "When Snaide rolls a double, he can immediately inflict 4 damage, ignoring armour."
}));
registerAbility(createNoopAbility({
  name: "Dark Master",
  description: "If you are a Necromancer, roll a die at the start of each round. If you roll a 6, the zombie will inflict damage on the Apprentice."
}));
registerAbility(createNoopAbility({
  name: "Dark Mending",
  description: "At the end of the combat round, the Dark Arthurian restores 2 health for each Necromancer that is alive."
}));
registerAbility(createNoopAbility({
  name: "Deadly Charge",
  description: "When you take health damage, you take 1 additional damage per 2 armour rounded up."
}));
registerAbility(createNoopAbility({
  name: "Elemental Master",
  description: "Can switch between Shadow, Flame, and Rock forms."
}));
registerAbility(createNoopAbility({
  name: "Fed from fear",
  description: "At the end of each combat round, the armour is increased by 1."
}));
registerAbility(createNoopAbility({
  name: "First cut",
  description: "First strike damage bonus."
}));
registerAbility(createNoopAbility({
  name: "Gathering of Ghasts",
  description: "Attacks ignore armour. If the hero has Second Skin, use half the armour score rounded up."
}));
registerAbility(createNoopAbility({
  name: "Heal me",
  description: "The hero can restore 15 health once in the combat."
}));
registerAbility(createNoopAbility({
  name: "Healer's Gift",
  description: "If the hero has Companion on the hero sheet, the hero can restore 12 health once in the combat."
}));
registerAbility(createNoopAbility({
  name: "Helping Hand",
  description: "For each remaining hero alive (Janna, Gull, Laine, Klaret), you can add 1 to your damage score."
}));
registerAbility(createNoopAbility({
  name: "Holy Shield",
  description: "When this is defeated, reduce the Architect's armour score by 8."
}));
registerAbility(createNoopAbility({
  name: "Ice armour",
  description: "Spawns 4 Ice Pillar."
}));
registerAbility(createNoopAbility({
  name: "Ice pillar",
  description: "When a pillar is destroyed, the Chilblain's armour is set to 10."
}));
registerAbility(createNoopAbility({
  name: "Indigestion",
  description: "If you win a round, you can strike as normal or lose 5 health and ignore armour."
}));
registerAbility(createNoopAbility({
  name: "Inquisitor's Wrath",
  description: "If the hero has Rival on the hero sheet, the hero adds 2 to their damage starting in round 3."
}));
registerAbility(createNoopAbility({
  name: "Itchy and scratchy",
  description: "At the start of each combat round roll a die: If you roll a 1, your speed is reduced by 1 for this combat round."
}));
registerAbility(createNoopAbility({
  name: "Knockdown",
  description: "If your hero takes health damage from the troll, you must reduce your speed for the next combat round by 1."
}));
registerAbility(createNoopAbility({
  name: "Leech",
  description: "For each damage inflicted to the hero, heal the same amount."
}));
registerAbility(createNoopAbility({
  name: "Mad Scientist",
  description: "Before rolling for damage, roll a die. On 1-2: cancel damage and reduce speed. On 3-4: reduce hero speed. On 5-6: enemy rolls 2 damage dice."
}));
registerAbility(createNoopAbility({
  name: "Magic Shield",
  description: "You can reduce your magic by 2 for the combat to avoid taking damage from the neural blast. If magic reaches 0, you lose."
}));
registerAbility(createNoopAbility({
  name: "Magic of the Makers",
  description: "When a statue is defeated, the speed, magic and armour score of Lorcan are raised by 1."
}));
registerAbility(createNoopAbility({
  name: "Nasty Nibblers",
  description: "At the end of the combat round, roll a die. If you roll a 1 or 2, you reduce your armour by 1 for the rest of the combat."
}));
registerAbility(createNoopAbility({
  name: "Raise Dead",
  description: "At the end of the combat round, the Skeleton Horde raises their health and max health by 10."
}));
registerAbility(createNoopAbility({
  name: "Raking Claws",
  description: "The enemy rolls 2 dice for damage and uses the higher result."
}));
registerAbility(createNoopAbility({
  name: "Rock Form",
  description: "If the hero takes health damage, lower the speed of the hero by 1 for the next round."
}));
registerAbility(createNoopAbility({
  name: "Shadow Form",
  description: "Each time you take health damage, lower your brawn or magic (the higher one) by 2."
}));
registerAbility(createNoopAbility({
  name: "Shatter Shield",
  description: "If you win a combat round, instead of rolling for damage, you can choose to reduce the enemy's armour by 4."
}));
registerAbility(createNoopAbility({
  name: "Swarm of Spores",
  description: "At the end of each combat round, starting in round 3, the Landsbury shield takes damage equal to the Spore Cloud's remaining health."
}));
registerAbility(createNoopAbility({
  name: "Two Arms!",
  description: "At the end of each round, add the next not yet equipped item: Breastplate (+2 armour), Cloak (+1 speed), Shield (+2 armour), Helmet (+2 armour), Legguards (+1 armour)."
}));
registerAbility(createNoopAbility({
  name: "Unnatural growth",
  description: "At the end of every combat round, KerKlick raises its brawn by 1, up to max of 10."
}));
registerAbility(createNoopAbility({
  name: "Vampire",
  description: "Vampiric creature with special weaknesses and abilities."
}));
registerAbility(createNoopAbility({
  name: "Withering Strikes",
  description: "Everytime you take damage, reduce brawn and magic by 1."
}));
registerAbility(createNoopAbility({
  name: "Wounded",
  description: "You cannot heal after this combat."
}));
registerAbility(createNoopAbility({
  name: "Wrath of Winter",
  description: "At the end of the round, take damage equal to the number of rounds plus 1 ignoring armour."
}));
registerAbility(createNoopAbility({
  name: "Blindside",
  description: "If you win the combat round while using a speed ability, decrease the armour by 10 for this combat round."
}));
registerAbility(createNoopAbility({
  name: "Dark disciple",
  description: "All hero rolls of a 6 become a 1 automatically."
}));
registerAbility(createNoopAbility({
  name: "Dismantle",
  description: "If you win a combat round, you can choose to skip the damage roll and lower the enemies armour by 4 for the rest of the combat."
}));
registerAbility({
  name: "Trample",
  type: "special",
  description: "If the enemy rolls a 6 on their damage roll, add 5 to the damage.",
  reviewed: true,
  onDamageCalculate: (state, context) => {
    if (context.owner !== "enemy" || context.target !== "hero") {
      return 0;
    }
    return state.damage.damageRolls.some((r2) => r2.value === 6) ? 5 : 0;
  }
});
const ZenCharge = {
  name: "Zen Charge",
  type: "special",
  description: "Zen can roll 3 dice of speed in the first round of combat. Immune to any abilities that reduce his speed dice for this first round.",
  icon: "⚡",
  reviewed: false,
  onRoundStart: (state, { owner }) => {
    if (state.round === 1) {
      state = appendEffect(state, owner, {
        stats: { speedDice: 1 },
        source: "Zen Charge",
        target: owner,
        duration: 1,
        description: "Rolling 3 speed dice"
      });
    }
    return state;
  }
};
registerAbility(ZenCharge);
registerAbility(createSpeedDiceModifier({
  name: "Adrenaline",
  description: "Increase your speed by 2 for two combat rounds.",
  target: "owner",
  speedModifier: 2,
  duration: 2
}));
registerAbility(createSpeedDiceModifier({
  name: "Cat's Speed",
  description: "Roll an extra die to determine attack speed for one round.",
  target: "owner",
  speedModifier: 1,
  duration: 1
}));
registerAbility(createStatModifierAbility({
  name: "Charge",
  type: "speed",
  description: "Increase speed by 2 in the first round of combat.",
  target: "owner",
  stats: { speed: 2 },
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility(createStatModifierAbility({
  name: "Chill Touch",
  type: "speed",
  description: "Reduce your opponent's speed by 2 for one round.",
  target: "opponent",
  stats: { speed: -2 },
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility(createStatModifierAbility({
  name: "Click Your Heels",
  type: "speed",
  description: "Raise speed by 2 for one combat round.",
  target: "owner",
  stats: { speed: 2 },
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility(createStatModifierAbility({
  name: "Courage",
  type: "speed",
  description: "Increase speed by 4 for one combat round.",
  target: "owner",
  stats: { speed: 4 },
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility(createSpeedDiceModifier({
  name: "Curse",
  description: "Reduce the number of dice your opponent rolls for attack speed by 1 for one round.",
  target: "opponent",
  speedModifier: -1,
  duration: 1
}));
registerAbility({
  name: "Demolish",
  type: "speed",
  description: "Reduce the opponent's speed dice by 1 for one round and lower their armour by 1 for the remainder of the combat.",
  canActivate: canModifySpeed,
  onActivate: (state, { owner }) => {
    const opponent = getOpponent(owner);
    let newState = appendEffect(state, opponent, {
      stats: { speedDice: -1 },
      source: "Demolish (Speed)",
      target: opponent,
      duration: 1
    });
    newState = appendEffect(newState, opponent, {
      stats: { armour: -1 },
      source: "Demolish (Armour)",
      target: opponent,
      duration: void 0
    });
    return newState;
  }
});
function canActivate(state, { owner }) {
  if (owner !== "hero") return false;
  const ownSpeed = state.hero.stats.speed || 0;
  const opponentHealth = state.enemies[0].stats.health || 0;
  return ["round-start", "start-combat"].includes(state.phase) && hasEquipment(state.hero, /sword/, ["mainHand", "leftHand"]) && opponentHealth > 0 && opponentHealth <= ownSpeed;
}
registerAbility({
  name: "Execution",
  type: "speed",
  description: "(Requires sword in main hand). If an opponent’s health is equal to or less than your speed, you may reduce their health to zero at the start of a round (once per round).",
  canActivate,
  onActivate: (state, { owner }) => {
    if (!canActivate(state, { owner })) return state;
    const opponentHealth = state.enemies[0].stats.health || 0;
    return dealDamage(state, "Execution", "enemy", opponentHealth);
  }
});
registerAbility(createStatModifierAbility({
  name: "Fearless",
  type: "speed",
  description: "Raise speed by 2 for one round.",
  target: "owner",
  stats: { speed: 2 },
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility(createStatModifierAbility({
  name: "Haste",
  type: "speed",
  description: "Roll an extra die for attack speed for one round.",
  stats: { speed: 1 },
  duration: 1
}));
registerAbility(createStatModifierAbility({
  name: "Immobilise",
  type: "speed",
  description: "Reduce opponent's speed dice by 1 for one round.",
  target: "opponent",
  stats: { speedDice: -1 },
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility(createStatModifierAbility({
  name: "Knockdown",
  type: "speed",
  description: "Reduce opponent's speed dice by 1 for one round.",
  stats: { speedDice: -1 },
  duration: 1,
  target: "opponent",
  canActivate: (state, { owner }) => state.phase === "speed-roll" && !hasAbility(state, getOpponent(owner), "Steadfast")
}));
registerAbility(createSpeedDiceModifier({
  name: "Lay of the Land",
  description: "Add one extra die to attack speed for one round.",
  target: "owner",
  speedModifier: 1,
  duration: 1
}));
registerAbility(createStatModifierAbility({
  name: "Quicksilver",
  type: "speed",
  description: "Increase speed by 2 for one round.",
  stats: { speed: 2 },
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility(createStatModifierAbility({
  name: "Radiance",
  type: "speed",
  description: "Lower opponent's speed by 2 for one round.",
  target: "opponent",
  stats: { speed: -2 },
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility({
  name: "Shackle",
  type: "speed",
  description: "Reduce opponent's speed dice by 1 for one round (used once per combat).",
  canActivate: (state, { owner }) => {
    return canModifySpeed(state) && !hasEffect(state, owner, "used-shackle");
  },
  onActivate: (state, { owner }) => {
    state = appendEffect(state, getOpponent(owner), {
      stats: { speedDice: -1 },
      source: "Shackle",
      target: getOpponent(owner),
      duration: 1
    });
    state = appendEffect(state, owner, {
      source: "used-shackle",
      target: owner,
      duration: void 0,
      stats: {},
      visible: false
    });
    return state;
  }
});
registerAbility(createStatModifierAbility({
  name: "Snakes Alive!",
  type: "speed",
  description: "Lower opponent's speed by 2 for one round.",
  stats: { speed: -2 },
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility({
  name: "Stun",
  type: "speed",
  description: "Reduce opponent's speed dice by 1 for one round (used once per combat).",
  canActivate: (state, { owner }) => {
    return canModifySpeedDice(state) && !hasEffect(state, owner, "used-stun");
  },
  onActivate: (state, { owner }) => {
    state = appendEffect(state, getOpponent(owner), {
      stats: { speedDice: -1 },
      source: "Stun",
      target: getOpponent(owner),
      duration: 1,
      icon: "💫"
    });
    state = appendEffect(state, owner, {
      source: "used-stun",
      target: owner,
      duration: void 0,
      stats: {},
      visible: false
    });
    return state;
  }
});
registerAbility({
  name: "Swamp Legs",
  type: "speed",
  description: "Reduce opponent's speed by 1 for one round.",
  onActivate: (state, { owner }) => {
    return appendEffect(state, getOpponent(owner), {
      stats: { speed: -1 },
      source: "Swamp Legs",
      target: getOpponent(owner),
      duration: 1
    });
  }
});
registerAbility({
  name: "Time Shift",
  type: "speed",
  description: "Match opponent's speed for three rounds; no other speed abilities can be played during this time.",
  onActivate: (state, { owner }) => {
    const mySpeed = getCombatant(state, owner).stats.speed;
    const opponentSpeed = getCombatant(state, getOpponent(owner)).stats.speed;
    const diff = opponentSpeed - mySpeed;
    return appendEffect(state, owner, {
      stats: { speed: diff },
      source: "Time Shift",
      target: owner,
      duration: 3
    });
  }
});
registerAbility({
  name: "Webbed",
  type: "speed",
  description: "Reduce enemy speed dice",
  onActivate: (state, { owner }) => {
    return appendEffect(state, getOpponent(owner), {
      source: "Webbed",
      target: getOpponent(owner),
      stats: { speedDice: -1 },
      duration: 1
      // TODO: Should the be infinite?
    });
  }
});
registerAbility(createStatModifierAbility({
  name: "Windblast",
  type: "speed",
  description: "Reduce opponent's speed dice by 1 for one round.",
  stats: { speedDice: -1 },
  duration: 1,
  target: "opponent",
  canActivate: canModifySpeed
}));
registerAbility(createStatModifierAbility({
  name: "Zapped!",
  type: "speed",
  description: "Lower opponent's speed, brawn, and magic by 3 until the end of the round.",
  stats: { speed: -3, brawn: -3, magic: -3 },
  target: "opponent",
  duration: 1,
  canActivate: canModifySpeed
}));
registerAbility(createNoopAbility({ name: "(+2 health) Fire aura", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "(+2 health) Haste", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "(+2 health) Windblast", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "(+3 health) Gr. heal", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "(+4 health) Charm", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "(+4 health) Refresh", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "(+5 health) Courage", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "(+5 health) Curse", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Acolyte", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Atonement", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Backdraft", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Berserker", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Blind", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Blindstrike", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Blink", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Blood archer", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Call of nature", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Channel", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Cistene's chattels", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Cly's adornments", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Compulsion", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Confound", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Constrictor", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Convulsions", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Corrode", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Counter", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Coup de grace", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Crawlers", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Cruel twist", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Cunning", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Deceieve", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Defender", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Dirge", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Doom", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Drake", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Druid", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Eureka!", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Faith", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Faith & duty", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Faithful friend", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Fear", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Fiend's finest", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Finery of the fallen", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Fire shield", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Flurry", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Fortitide", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Frost bite", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Frostbite", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Geomancer", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Gorilla rage", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Gouge", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Greater heal", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Head shot", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Heartless", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Heavy blow", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "High five!", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Hooked", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Hypnotise", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Icelock", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Insight", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Insulated", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Last defence", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Lifespark", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Mangle", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Medic", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Melt", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Missionary's calling", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Monkey mob", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Near death", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Necromancer", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Nightwalker set", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Packmaster", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Pagan's spirit", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Parasite", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Penance", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Primal", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Purge", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Pyromancer", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Reaper", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Reckless", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Resolve", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Roll with it", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Royal regalia set", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Runecaster", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Safe path", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Savage arms", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Savage call", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Scholar", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Seraphim's symbols", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Shatter", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Shunt", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Silverfrost", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Siphon", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Skewer", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Slick", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Sneak", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Spindlesilk set", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Spirt hunter", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Stagger", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Suppress", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Sure edge", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Sure grip", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Swarm", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Sweet spot", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Timeshift", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Titan", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Turn up the heat", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Underhand", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Unstoppable", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Veil", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Venommancer", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Volley", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Vortex", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Wave", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Weaver", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Wisdom", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Wish master", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "Wither", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "finery of the fallen", description: "Not implemented yet." }));
registerAbility(createNoopAbility({ name: "frostbite", description: "Not implemented yet." }));
function createHeroCombatant(character) {
  const hero = "original" in character ? character.original : character;
  const combatant = {
    type: hero.type,
    id: "hero",
    name: hero.name,
    stats: { ...hero.stats },
    original: { ...hero },
    activeAbilities: /* @__PURE__ */ new Map(),
    activeEffects: []
  };
  Object.values(hero.equipment).forEach((item) => {
    var _a;
    (_a = item == null ? void 0 : item.abilities) == null ? void 0 : _a.forEach((rawAbilityName) => {
      const def = requireAbilityDefinition(rawAbilityName);
      addAbility(combatant, def, item);
    });
  });
  return combatant;
}
function createEnemyCombatant(character, index = 0) {
  const enemy = "original" in character ? character.original : character;
  const combatant = {
    type: enemy.type,
    id: `enemy-${index}`,
    name: enemy.name,
    stats: { ...enemy.stats },
    original: { ...enemy },
    activeAbilities: /* @__PURE__ */ new Map(),
    activeEffects: []
  };
  Object.values(enemy.abilities).forEach((rawAbilityName) => {
    const def = requireAbilityDefinition(rawAbilityName);
    addAbility(combatant, def);
  });
  return combatant;
}
function printActiveAbilities(activeAbilities2) {
  return Array.from(activeAbilities2.values()).map((ability) => {
    var _a, _b;
    return `${ability.name}` + ((((_a = ability.sources) == null ? void 0 : _a.length) ?? 0) > 1 ? ` (${(_b = ability.sources) == null ? void 0 : _b.length})` : "");
  }).join(", ");
}
function calculateEffectiveStats(state) {
  const enemy = state.enemies[state.activeEnemyIndex];
  const effectiveHeroStats = calculateEffectiveStatsForType(
    state.hero.stats,
    state.hero.activeEffects,
    "hero"
  );
  const effectiveEnemyStats = calculateEffectiveStatsForType(
    enemy.stats,
    enemy.activeEffects,
    "enemy"
  );
  return { hero: effectiveHeroStats, enemy: effectiveEnemyStats };
}
function runCombatStartHook(state) {
  forEachActiveAbility(state, (ability, def) => {
    if (def == null ? void 0 : def.onCombatStart) {
      state = def.onCombatStart(state, { ability, owner: ability.owner });
    }
  });
  return state;
}
function startCombat(hero, initialEnemies) {
  const enemies = resolveSpawns(initialEnemies);
  const enemyCombatants = enemies.map((e, i) => createEnemyCombatant(e, i));
  let state = {
    phase: "combat-start",
    round: 0,
    hero: createHeroCombatant(hero),
    enemies: enemyCombatants,
    activeEnemyIndex: 0,
    logs: [],
    backpack: hero.backpack.filter((i) => i && (!(i == null ? void 0 : i.uses) || i.uses > 0)),
    damageDealt: []
  };
  state = addLogs(state, {
    round: 0,
    message: "Combat started",
    type: "info"
  });
  state = runCombatStartHook(state);
  state = checkForCombatEnd(state);
  if (state.hero.activeAbilities.size > 0) {
    state = addLogs(state, {
      message: `Active hero abilities: ${printActiveAbilities(state.hero.activeAbilities)}`
    });
  }
  state.enemies.forEach((enemy, _idx) => {
    if (enemy.activeAbilities.size > 0) {
      state = addLogs(state, {
        message: `Active ${enemy.name} abilities: ${printActiveAbilities(enemy.activeAbilities)}`
      });
    }
  });
  return state;
}
function startRound(state) {
  state = {
    ...state,
    round: state.round + 1,
    phase: "round-start",
    heroSpeedRolls: void 0,
    enemySpeedRolls: void 0,
    winner: void 0,
    damage: void 0,
    damageDealt: [],
    usedAbilities: [],
    itemsUsedThisRound: 0
  };
  forEachActiveAbility(state, (ability, def) => {
    if (def.onRoundStart) {
      state = def.onRoundStart(state, { ability, owner: ability.owner });
    }
  });
  return addLogs(state, { message: "Round started." });
}
function activateAbility(state, rawAbilityName) {
  const abilityName = toCanonicalName(rawAbilityName);
  const ability = state.hero.activeAbilities.get(abilityName);
  if (!ability || !ability.uses || ability.uses <= 0) return state;
  const definition = getAbilityDefinition(abilityName);
  if (!definition || !definition.onActivate) return state;
  if (["speed", "combat"].includes(definition.type)) {
    const used = state.usedAbilities || [];
    if (used.some((a) => a.type === definition.type)) {
      return state;
    }
  }
  state = definition.onActivate(state, { owner: ability.owner, ability });
  if (state.pendingInteraction) {
    return state;
  }
  state = useAbility(state, "hero", abilityName);
  if (["speed", "combat"].includes(definition.type)) {
    state = {
      ...state,
      usedAbilities: [...state.usedAbilities || [], { name: abilityName, type: definition.type }]
    };
  }
  return checkForCombatEnd(state);
}
function resolveInteraction(state, data) {
  var _a;
  if (!state.pendingInteraction) {
    console.error("No pending interaction to resolve");
    return state;
  }
  const { requests, ability, callback } = state.pendingInteraction;
  state = { ...state, pendingInteraction: void 0 };
  state = callback(state, data);
  if (ability.uses) {
    state = useAbility(state, ability.owner, ability.name);
  }
  const definition = getAbilityDefinition(ability.name);
  if (definition && ["speed", "combat"].includes(definition.type)) {
    state = {
      ...state,
      usedAbilities: [...state.usedAbilities || [], { name: ability.name, type: definition.type }]
    };
  }
  if (requests.some((r2) => r2.type === "dice")) {
    if (state.phase === "speed-roll") {
      state = updateWinner(state);
    } else if (state.phase === "damage-roll") {
      state = setDamageRoll(state, (_a = state.damage) == null ? void 0 : _a.damageRolls);
    }
  }
  return checkForCombatEnd(state);
}
function reduceBackpackItem(state, idx) {
  const originalItem = state.backpack[idx];
  const item = { ...originalItem };
  if (item.uses !== void 0) {
    item.uses -= 1;
  }
  const newBackpack = [...state.backpack];
  newBackpack[idx] = item;
  state = {
    ...state,
    // Filter out if uses are depleted (assumes logic: 0 uses = remove)
    backpack: newBackpack.filter((i) => i && (i.uses === void 0 || i.uses > 0))
  };
  state = addLogs(state, {
    message: `Used item ${item.name} (${item.description}).` + (item.uses !== void 0 ? ` (${item.uses} uses left)` : "")
  });
  return state;
}
function useBackpackItem(state, idx) {
  const item = state.backpack[idx];
  if (!item) {
    state = addLogs(state, {
      message: `No item at index ${idx} found in backpack.`,
      type: "warning"
    });
    return state;
  }
  if ((state.itemsUsedThisRound ?? 0) >= 1) {
    state = addLogs(state, {
      message: `Cannot use item. Limit of 1 item per round reached.`,
      type: "warning"
    });
    return state;
  }
  state = applyEffect(state, item.effect);
  state = reduceBackpackItem(state, idx);
  state = {
    ...state,
    itemsUsedThisRound: (state.itemsUsedThisRound ?? 0) + 1
  };
  forEachActiveAbility(state, (ability, def) => {
    if (def.onBackpackItemUse) {
      state = def.onBackpackItemUse(state, { ability, owner: ability.owner }, item);
    }
  });
  if (state.phase === "speed-roll") {
    state = updateWinner(state);
  }
  return checkForCombatEnd(state);
}
function runOnSpeedRollHooks(state) {
  forEachActiveAbility(state, (ability, def) => {
    if (def == null ? void 0 : def.onSpeedRoll) {
      state = def.onSpeedRoll(state, { ability, owner: ability.owner });
    }
  });
  return state;
}
function updateWinner(state) {
  const heroRoll = sumDice(state.heroSpeedRolls || []);
  const enemyRoll = sumDice(state.enemySpeedRolls || []);
  const effectiveStats = calculateEffectiveStats(state);
  const heroTotal = Number(heroRoll) + Number(effectiveStats.hero.speed);
  const enemyTotal = Number(enemyRoll) + Number(effectiveStats.enemy.speed);
  let winner;
  let modText = "";
  if (effectiveStats.hero.speed !== state.hero.stats.speed) {
    const diff = effectiveStats.hero.speed - state.hero.stats.speed;
    modText += diff > 0 ? ` (+${diff} mod)` : ` (${diff} mod)`;
  }
  let message = `Speed: Hero ${heroTotal}${modText} vs Enemy ${enemyTotal}.`;
  if (heroTotal > enemyTotal) {
    winner = "hero";
    message += " Hero wins speed round";
  } else if (enemyTotal > heroTotal) {
    winner = "enemy";
    message += " Enemy wins speed round";
  } else {
    winner = null;
    message += " Draw. No damage this round";
  }
  state = {
    ...state,
    winner
  };
  state = addLogs(state, { message });
  return state;
}
function getPassiveAbilityPreview(state) {
  const previews = [];
  let tempState = state;
  forEachActiveAbility(state, (ability, def) => {
    if (def.onPassiveAbility) {
      const beforeState = tempState;
      tempState = def.onPassiveAbility(tempState, { ability, owner: ability.owner });
      if (tempState !== beforeState) {
        const changes = [];
        const heroHealthDiff = tempState.hero.stats.health - beforeState.hero.stats.health;
        if (heroHealthDiff !== 0) {
          changes.push({
            target: "hero",
            type: heroHealthDiff > 0 ? "heal" : "damage",
            amount: Math.abs(heroHealthDiff),
            message: `${heroHealthDiff > 0 ? "Heals" : "Deals"} ${Math.abs(heroHealthDiff)} damage to Hero`
          });
        }
        tempState.enemies.forEach((enemy, idx) => {
          const beforeEnemy = beforeState.enemies[idx];
          if (beforeEnemy) {
            const enemyHealthDiff = enemy.stats.health - beforeEnemy.stats.health;
            if (enemyHealthDiff !== 0) {
              changes.push({
                target: "enemy",
                type: enemyHealthDiff > 0 ? "heal" : "damage",
                amount: Math.abs(enemyHealthDiff),
                message: `${enemyHealthDiff > 0 ? "Heals" : "Deals"} ${Math.abs(enemyHealthDiff)} damage to ${beforeEnemy.name}`
              });
            }
          }
        });
        previews.push({
          owner: ability.owner,
          abilityName: ability.name,
          description: ability.def.description,
          changes
        });
      }
    }
  });
  return { previews, finalState: tempState };
}
function rollForSpeed(state, heroRolls, enemyRolls) {
  const effectiveStats = calculateEffectiveStats(state);
  state = {
    ...state,
    phase: "speed-roll",
    heroSpeedRolls: rollDice(effectiveStats.hero.speedDice ?? 2),
    enemySpeedRolls: rollDice(effectiveStats.enemy.speedDice ?? 2)
  };
  state = addLogs(state, {
    message: `Hero rolled ${formatDice(state.heroSpeedRolls)}=${sumDice(state.heroSpeedRolls)}`
  }, {
    message: `Enemy rolled ${formatDice(state.enemySpeedRolls)}=${sumDice(state.enemySpeedRolls)}`
  });
  state = runOnSpeedRollHooks(state);
  state = updateWinner(state);
  return checkForCombatEnd(state);
}
function rollForDamage(state, damageRolls) {
  if (!state.winner) {
    console.log("ERROR: No winner found in state");
    return state;
  }
  const effectiveStats = calculateEffectiveStats(state);
  const diceCount = effectiveStats[state.winner].damageDice ?? 1;
  if (!damageRolls) {
    damageRolls = rollDice(diceCount);
  }
  state = setDamageRoll(state, damageRolls);
  return checkForCombatEnd(state);
}
function calculateDamageBreakdown(state) {
  if (!state.damage || !state.winner) {
    return null;
  }
  const effectiveStats = calculateEffectiveStats(state);
  const totalDiceValue = sumDice(state.damage.damageRolls);
  const winnerType = state.winner;
  const winnerStats = winnerType === "hero" ? effectiveStats.hero : effectiveStats.enemy;
  const useBrawn = winnerStats.brawn >= winnerStats.magic;
  const skill = useBrawn ? winnerStats.brawn : winnerStats.magic;
  const skillName = useBrawn ? "brawn" : "magic";
  const modifiers = state.damage.modifiers;
  const totalModifiersValue = modifiers.reduce((a, b) => a + b.amount, 0);
  const victim = getOpponent(winnerType);
  const victimStats = victim === "hero" ? effectiveStats.hero : effectiveStats.enemy;
  const armour = victimStats.armour;
  const totalDamage = Math.max(
    0,
    totalDiceValue + skill + totalModifiersValue - armour
  );
  return {
    diceTotal: totalDiceValue,
    skill,
    skillName,
    modifiers,
    modifiersTotal: totalModifiersValue,
    armour,
    totalDamage
  };
}
function applyDamage(state) {
  const breakdown = calculateDamageBreakdown(state);
  if (!breakdown) {
    console.log("ERROR: No damage found in state");
    return state;
  }
  state = { ...state, phase: "apply-damage" };
  const winnerType = state.winner;
  const victim = getOpponent(winnerType);
  state = dealDamage(
    state,
    AttackSource,
    victim,
    breakdown.totalDamage,
    `Total attack damage to ${victim}: ${breakdown.totalDamage} = ${breakdown.diceTotal} + ${breakdown.skill} + ${breakdown.modifiersTotal} - ${breakdown.armour}`
  );
  state = checkForCombatEnd(state);
  if (state.phase === "combat-end") return state;
  const { previews } = getPassiveAbilityPreview(state);
  if (previews.length === 0) {
    return applyPassiveAbilities(state);
  }
  return state;
}
function runOnPassiveAbilityHooks(state) {
  forEachActiveAbility(state, (ability, def) => {
    if (def.onPassiveAbility) {
      state = def.onPassiveAbility(state, { ability, owner: ability.owner });
    }
  });
  return state;
}
function applyPassiveAbilities(state) {
  state = { ...state, phase: "passive-damage" };
  state = runOnPassiveAbilityHooks(state);
  state = addLogs(state, { message: "Passive damage applied." });
  return checkForCombatEnd(state);
}
function endRound(state) {
  const updateEffects = (effects) => {
    return effects.map((e) => e.duration !== void 0 ? { ...e, duration: e.duration - 1 } : e).filter((e) => e.duration === void 0 || e.duration > 0);
  };
  state = {
    ...state,
    phase: "round-end",
    hero: {
      ...state.hero,
      activeEffects: updateEffects(state.hero.activeEffects)
    },
    enemies: state.enemies.map((enemy) => ({
      ...enemy,
      activeEffects: updateEffects(enemy.activeEffects)
    }))
  };
  state = addLogs(state, { message: "Round ended" });
  return state;
}
function checkForCombatEnd(state) {
  if (state.phase === "combat-end") return state;
  if (state.hero.stats.health <= 0) {
    return endCombat(state);
  }
  const masterDead = state.enemies.some(
    (e) => e.original.isMaster && e.stats.health <= 0
  );
  const allDead = !state.enemies.some((e) => e.stats.health > 0);
  if (masterDead || allDead) {
    return endCombat(state);
  }
  return state;
}
function runOnCombatEndHooks(state) {
  forEachActiveAbility(state, (ability, def) => {
    if (def.onCombatEnd) {
      state = def.onCombatEnd(state, { ability, owner: ability.owner });
    }
  });
  return state;
}
function endCombat(state) {
  state = { ...state, phase: "combat-end" };
  state = runOnCombatEndHooks(state);
  if (state.phase !== "combat-end") return state;
  state = addLogs(state, { message: "Combat ended" });
  state.hero.original.backpack = state.backpack;
  state.hero.original.backpack = state.hero.original.backpack.fill(null, state.backpack.length, 5);
  return state;
}
function useCombat(hero, enemies) {
  const enemyArray = Array.isArray(enemies) ? enemies : [enemies];
  const initialCombatState = startCombat(hero, enemyArray);
  const [state, setState] = reactExports.useState({
    current: initialCombatState,
    history: []
  });
  const combat = state.current;
  const updateCombat = (updater) => {
    setState((prevState) => {
      const nextCombatState = updater(prevState.current);
      if (nextCombatState === prevState.current) {
        return prevState;
      }
      const isIntermediateState = !!prevState.current.pendingInteraction;
      if (isIntermediateState) {
        return {
          current: nextCombatState,
          history: prevState.history
        };
      }
      return {
        current: nextCombatState,
        history: [...prevState.history, prevState.current]
      };
    });
  };
  const undo = () => {
    setState((prevState) => {
      if (prevState.history.length === 0) return prevState;
      const previous = prevState.history[prevState.history.length - 1];
      const newHistory = prevState.history.slice(0, -1);
      return {
        current: previous,
        history: newHistory
      };
    });
  };
  const canUndo = state.history.length > 0;
  const activateAbility$1 = (abilityName) => {
    updateCombat((prev) => activateAbility(prev, abilityName));
  };
  const useBackpackItem$1 = (itemIndex) => {
    updateCombat((prev) => useBackpackItem(prev, itemIndex));
  };
  const rollSpeedDice = () => {
    updateCombat((prev) => rollForSpeed(prev));
  };
  const commitSpeedAndRollDamageDice = () => {
    updateCombat((prev) => rollForDamage(prev));
  };
  const confirmDamageRoll = () => {
    updateCombat((prev) => applyDamage(prev));
  };
  const confirmBonusDamage = () => {
    updateCombat((prev) => applyPassiveAbilities(prev));
  };
  const nextRound = () => {
    updateCombat((prev) => startRound(endRound(prev)));
  };
  const endCombat$1 = () => {
    updateCombat((prev) => endCombat(prev));
  };
  const restartCombat = () => {
    const enemyArray2 = Array.isArray(enemies) ? enemies : [enemies];
    const newCombatState = startCombat(hero, enemyArray2);
    setState({
      current: newCombatState,
      history: []
    });
  };
  const setActiveEnemy = (index) => {
    updateCombat((prev) => {
      if (index < 0 || index >= prev.enemies.length) return prev;
      return { ...prev, activeEnemyIndex: index };
    });
  };
  const resolveInteraction$1 = (data) => {
    updateCombat((prev) => resolveInteraction(prev, data));
  };
  const updateCombatState = (newState) => {
    updateCombat((_) => checkForCombatEnd(newState));
  };
  return {
    combat,
    activateAbility: activateAbility$1,
    useBackpackItem: useBackpackItem$1,
    rollSpeedDice,
    commitSpeedAndRollDamageDice,
    confirmDamageRoll,
    confirmBonusDamage,
    nextRound,
    endCombat: endCombat$1,
    restartCombat,
    resolveInteraction: resolveInteraction$1,
    updateCombatState,
    setActiveEnemy,
    undo,
    canUndo
  };
}
const CombatLog = ({ logs }) => {
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `combat-log ${isFullscreen ? "fullscreen" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "log-title", children: "Combat Log" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "log-toggle",
          onClick: () => setIsFullscreen(!isFullscreen),
          children: isFullscreen ? "▼ Minimize" : "▲ Expand"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "log-content", children: [...logs].reverse().map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `log-entry ${log.type}`, children: [
      "[",
      log.round,
      "] ",
      log.message
    ] }, i)) })
  ] });
};
const CombatOverlayRoot = ({ title, icon, children, onClose }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ability-modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ability-modal-content", onClick: (e) => e.stopPropagation(), children: [
    onClose && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "ability-modal-close close-btn", onClick: onClose, children: "✕" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ability-modal-header", children: [
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ability-icon-huge", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ability-modal-title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: title }) })
    ] }),
    children
  ] }) });
};
const Content = ({ children, className }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `ability-modal-body ${className || ""}`, children });
const Actions = ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ability-modal-actions", children });
const CombatOverlay = Object.assign(CombatOverlayRoot, {
  Content,
  Actions
});
const Button = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: `btn btn-${variant} ${className}`,
      ...props,
      children
    }
  );
};
const PrimaryButton = ({
  className = "",
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", className, ...props, children });
};
const SecondaryButton = ({
  className = "",
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", className, ...props, children });
};
const ActiveEffectOverlay = ({
  effect,
  onClose,
  onRemove
}) => {
  let icon = effect.icon;
  if (!icon) {
    const def = getAbilityDefinition(effect.source);
    icon = getAbilityIcon(def);
  }
  const effectDescription = formatEffect(effect);
  const durationText = effect.duration === void 0 ? "Infinite" : `${effect.duration} rounds`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    CombatOverlay,
    {
      title: effect.source,
      icon,
      onClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CombatOverlay.Content, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "effect-overlay-content", children: [
          effectDescription && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: effectDescription }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "effect-overlay-duration", children: [
            "Duration: ",
            durationText
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CombatOverlay.Actions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: onRemove ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          PrimaryButton,
          {
            className: "btn-remove-effect",
            onClick: onRemove,
            children: "Remove Effect"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: onClose, children: "Close" }) }) })
      ]
    }
  );
};
const ActiveEffectIcon = ({
  effect,
  onClick,
  onRemove
}) => {
  const [showOverlay, setShowOverlay] = reactExports.useState(false);
  let icon = "✨";
  let value;
  const s = effect.stats;
  if (s.damageModifier) {
    icon = getStatIcon("damage");
    value = s.damageModifier;
  } else if (s.speed) {
    icon = getStatIcon("speed");
    value = s.speed;
  } else if (s.brawn) {
    icon = getStatIcon("brawn");
    value = s.brawn;
  } else if (s.magic) {
    icon = getStatIcon("magic");
    value = s.magic;
  } else if (s.armour) {
    icon = getStatIcon("armour");
    value = s.armour;
  } else if (s.health) {
    icon = getStatIcon("health");
    value = s.health;
  } else if (s.speedDice) {
    icon = getStatIcon("die");
    value = s.speedDice;
  } else if (s.damageDice) {
    icon = getStatIcon("die");
    value = s.damageDice;
  }
  if (effect.icon) {
    icon = effect.icon;
  }
  let valueDisplay = value === void 0 ? "" : value;
  if (value ?? 0 > 0) valueDisplay = "+" + valueDisplay;
  const durationDisplay = effect.duration === void 0 ? "∞" : effect.duration;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setShowOverlay(true);
  };
  const handleClose = () => {
    setShowOverlay(false);
  };
  const handleRemove = onRemove ? () => {
    onRemove();
    setShowOverlay(false);
  } : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "active-effect-icon",
        onClick: handleClick,
        title: effect.source,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: icon }),
          valueDisplay ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "effect-value", children: valueDisplay }) : null,
          durationDisplay ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "effect-duration-badge", children: durationDisplay }) : null
        ]
      }
    ),
    showOverlay && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActiveEffectOverlay,
      {
        effect,
        onClose: handleClose,
        onRemove: handleRemove
      }
    )
  ] });
};
const CombatantCard = ({
  name,
  currentHealth,
  maxHealth,
  speed,
  brawn,
  magic = void 0,
  armour = void 0,
  isEnemy = false,
  activeEffects = []
}) => {
  const healthPct = Math.max(0, Math.min(100, currentHealth / maxHealth * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `combatant-card ${isEnemy ? "enemy" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "combatant-name", children: name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-bar-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "health-bar-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "health-bar", style: { width: `${healthPct}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-bar-text", children: [
        currentHealth,
        "/",
        maxHealth
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "combatant-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        getStatIcon("speed"),
        " ",
        speed
      ] }),
      brawn >= (magic ?? -1) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        getStatIcon("brawn"),
        " ",
        brawn
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        getStatIcon("magic"),
        " ",
        magic
      ] }),
      armour && armour > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        getStatIcon("armour"),
        " ",
        armour
      ] }) : null
    ] }),
    activeEffects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "combatant-effects", children: activeEffects.map((effect, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActiveEffectIcon,
      {
        effect
      },
      idx
    )) })
  ] });
};
const EnemyCarousel = ({ enemies, activeIndex, onSelect }) => {
  const activeEnemy = enemies[activeIndex];
  const handlePrev = () => {
    onSelect((activeIndex - 1 + enemies.length) % enemies.length);
  };
  const handleNext = () => {
    onSelect((activeIndex + 1) % enemies.length);
  };
  if (!activeEnemy) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "enemy-carousel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "carousel-container", style: { position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CombatantCard,
      {
        name: activeEnemy.name,
        currentHealth: activeEnemy.stats.health,
        maxHealth: activeEnemy.stats.maxHealth,
        speed: activeEnemy.stats.speed,
        brawn: activeEnemy.stats.brawn,
        magic: activeEnemy.stats.magic,
        armour: activeEnemy.stats.armour,
        isEnemy: true,
        activeEffects: activeEnemy.activeEffects
      }
    ),
    enemies.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "carousel-btn prev-btn nc-btn",
          onClick: handlePrev,
          "aria-label": "Previous Enemy",
          children: "◀"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "carousel-dot-indicator", children: enemies.map((enemy, index) => {
        const isDead = enemy.stats.health <= 0;
        const isActive = index === activeIndex;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `indicator-dot ${isActive ? "active" : ""} ${isDead ? "dead" : ""}`,
            title: `${enemy.name} ${isDead ? "(Defeated)" : ""}`
          },
          enemy.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "carousel-btn next-btn nc-btn",
          onClick: handleNext,
          "aria-label": "Next Enemy",
          children: "▶"
        }
      )
    ] }),
    activeEnemy.stats.health <= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "enemy-status-badge dead", children: "DEFEATED" })
  ] }) });
};
const CombatAbilityItem = ({ ability, onClick }) => {
  const definition = getAbilityDefinition(ability.name);
  const icon = getAbilityIcon(definition);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "ability-item-compact", onClick, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ability-icon-large", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ability-name-compact", children: ability.name })
  ] });
};
const CombatBackpackItem = ({ item, onClick, disabled }) => {
  const getIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("potion")) return "🧪";
    if (lower.includes("bomb")) return "💣";
    if (lower.includes("scroll")) return "📜";
    return "🎒";
  };
  const icon = getIcon(item.name);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: `combat-backpack-item`,
      onClick,
      disabled: disabled || item.uses === 0,
      title: `${item.name} (Uses: ${item.uses})` + (disabled ? " (Limit reached)" : ""),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "backpack-icon-large", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "backpack-name-compact", children: item.name }),
        item.uses !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "backpack-uses-badge", children: item.uses })
      ]
    }
  );
};
const CombatAbilitySelector = ({ combat, onActivateAbility, onUseBackbackItem }) => {
  const [selectedAbility, setSelectedAbility] = reactExports.useState(null);
  const canActivateAbility = (abilityName) => {
    const def = getAbilityDefinition(abilityName);
    if (!def || def.type === "passive" || !def.onActivate) return false;
    if (["speed", "combat"].includes(def.type)) {
      const used = combat.usedAbilities || [];
      if (used.some((a) => a.type === def.type)) return false;
    }
    if (def.canActivate) return def.canActivate(combat, { owner: "hero" });
    return true;
  };
  const handleBackpackClick = (itemIndex) => {
    onUseBackbackItem(itemIndex);
  };
  const handleConfirm = () => {
    if (selectedAbility) {
      onActivateAbility(selectedAbility.name);
      setSelectedAbility(null);
    }
  };
  const allActiveAbilities = [...combat.hero.activeAbilities.values()];
  const availableAbilities = allActiveAbilities.filter((a) => canActivateAbility(a.name)).sort((a, b) => a.name.localeCompare(b.name));
  if (availableAbilities.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ability-selector-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ability-list-horizontal", children: [
      availableAbilities.map((ability, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CombatAbilityItem,
        {
          ability,
          onClick: () => setSelectedAbility(ability)
        },
        index
      )),
      combat.backpack.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CombatBackpackItem,
        {
          item,
          onClick: () => handleBackpackClick(index),
          disabled: (combat.itemsUsedThisRound ?? 0) >= 1
        },
        `backpack-${index}`
      ))
    ] }),
    selectedAbility && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CombatOverlay,
      {
        title: selectedAbility.name + (selectedAbility.uses ? ` (x${selectedAbility.uses})` : ""),
        icon: getAbilityIcon(selectedAbility.def),
        onClose: () => setSelectedAbility(null),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CombatOverlay.Content, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "ability-modal-description", children: selectedAbility.def.description }),
            selectedAbility.sources && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-dim text-sm", style: { marginTop: "8px" }, children: [
              "Source(s): ",
              selectedAbility.sources.map((s) => s.name).join(", ")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CombatOverlay.Actions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: handleConfirm, children: "Use Ability" }) })
        ]
      }
    )
  ] });
};
const CombatPhaseLayout = ({
  title,
  description = void 0,
  children,
  combat,
  onActivateAbility,
  onUseBackpackItem,
  actions
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "phase-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "phase-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: combat.round > 0 ? `Round ${combat.round} - ${title}` : title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "phase-description", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "phase-main-content", children }),
    onActivateAbility && onUseBackpackItem && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CombatAbilitySelector,
      {
        combat,
        onActivateAbility,
        onUseBackbackItem: onUseBackpackItem
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "phase-actions", children: actions })
  ] });
};
const CombatStartPhase = ({ combat, rollSpeedDice, activateAbility: activateAbility2, useBackpackItem: useBackpackItem2 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CombatPhaseLayout,
    {
      title: "Combat Start",
      description: "Prepare to fight!",
      combat,
      onActivateAbility: activateAbility2,
      onUseBackpackItem: useBackpackItem2,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-phase-action", onClick: rollSpeedDice, children: "Roll Speed Dice" })
    }
  );
};
const RoundStartPhase = ({ combat, rollSpeedDice, activateAbility: activateAbility2, useBackpackItem: useBackpackItem2 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CombatPhaseLayout,
    {
      title: `Round ${combat.round}`,
      description: "Prepare for the next round!",
      combat,
      onActivateAbility: activateAbility2,
      onUseBackpackItem: useBackpackItem2,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-phase-action", onClick: rollSpeedDice, children: "Roll Speed Dice" })
    }
  );
};
const CombatDice = ({
  values,
  label,
  onDieClick,
  mode = "normal",
  selectedIndices = []
}) => {
  const [rollingIndices, setRollingIndices] = reactExports.useState([]);
  const [internalDice, setInternalDice] = reactExports.useState(values ? new Array(values.length).fill(1) : []);
  const prevValuesRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    const valuesStr = JSON.stringify(values);
    if (values && valuesStr !== prevValuesRef.current) {
      const prevValues = prevValuesRef.current ? JSON.parse(prevValuesRef.current) : [];
      prevValuesRef.current = valuesStr;
      const newRollingIndices = [];
      values.forEach((val, i) => {
        const prev = prevValues[i];
        if (!prev || prev.value !== val.value || prev.isRerolled !== val.isRerolled) {
          newRollingIndices.push(i);
        }
      });
      if (newRollingIndices.length > 0) {
        setRollingIndices(newRollingIndices);
        const interval = setInterval(() => {
          setInternalDice(rollDice(values.length).map((d) => d.value));
        }, 50);
        setTimeout(() => {
          clearInterval(interval);
          setRollingIndices([]);
        }, 600);
        return () => clearInterval(interval);
      }
    } else if (!values) {
      prevValuesRef.current = valuesStr;
    }
  }, [values]);
  const currentDice = values ? values.map((val, i) => {
    if (rollingIndices.includes(i)) {
      return { value: internalDice[i], isRerolled: false };
    }
    return val;
  }) : [];
  const handleDieClick = (index, diceRoll) => {
    const isDieRolling = rollingIndices.includes(index);
    if (isDieRolling || mode !== "select-die" || !onDieClick) return;
    if (diceRoll.isRerolled) return;
    onDieClick(index);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `dice-wrapper dice-wrapper--${mode}`, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dice-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dice-container", children: currentDice.map((diceRoll, i) => {
      const isDieRolling = rollingIndices.includes(i);
      const isInteractive = mode === "select-die" && !!onDieClick && !isDieRolling && !diceRoll.isRerolled;
      const isSelected = selectedIndices.includes(i);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `die d6 ${isDieRolling ? "rolling" : ""} ${isInteractive ? "interactive" : "static"} ${diceRoll.isRerolled ? "rerolled" : ""} ${isSelected ? "selected" : ""}`,
          onClick: () => handleDieClick(i, diceRoll),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "die-result", children: diceRoll.value })
        },
        i
      );
    }) })
  ] });
};
const SpeedRollPhase = ({
  combat,
  commitSpeedAndRollDamageDice,
  confirmBonusDamage,
  currentInteraction,
  resolveInteraction: resolveInteraction2,
  activateAbility: activateAbility2,
  useBackpackItem: useBackpackItem2
}) => {
  const getInstruction = () => {
    if ((currentInteraction == null ? void 0 : currentInteraction.type) === "dice") {
      return "Select a die to interact with.";
    }
    switch (combat.winner) {
      case "hero":
        return "Hero wins speed! Proceed to damage?";
      case "enemy":
        return "Enemy wins speed! Brace for impact.";
      case null:
        return "Draw! Skip damage phase.";
      default:
        return "";
    }
  };
  const [selectedDice, setSelectedDice] = React.useState([]);
  const effectiveStats = calculateEffectiveStats(combat);
  const heroSpeed = effectiveStats.hero.speed;
  const heroSpeedRoll = sumDice(combat.heroSpeedRolls || []);
  const heroSpeedTotal = heroSpeed + heroSpeedRoll;
  const heroSpeedDiff = heroSpeed - combat.hero.stats.speed;
  const enemySpeed = effectiveStats.enemy.speed;
  const enemySpeedRoll = sumDice(combat.enemySpeedRolls || []);
  const enemySpeedTotal = enemySpeed + enemySpeedRoll;
  const enemySpeedDiff = enemySpeed - getActiveEnemy(combat).stats.speed;
  const isInteracting = (currentInteraction == null ? void 0 : currentInteraction.type) === "dice";
  const canInteractHero = isInteracting && ((currentInteraction == null ? void 0 : currentInteraction.target) === "hero" || !(currentInteraction == null ? void 0 : currentInteraction.target));
  const canInteractEnemy = isInteracting && (currentInteraction == null ? void 0 : currentInteraction.target) === "enemy";
  const onDieClick = (index) => {
    const count = (currentInteraction == null ? void 0 : currentInteraction.count) ?? 1;
    if (count > 1) {
      if (selectedDice.includes(index)) {
        setSelectedDice(selectedDice.filter((i) => i !== index));
      } else if (selectedDice.length < count) {
        setSelectedDice([...selectedDice, index]);
      }
    } else {
      resolveInteraction2({
        request: currentInteraction,
        selectedIndexes: [index]
      });
    }
  };
  const confirmDiceSelection = () => {
    resolveInteraction2({
      request: currentInteraction,
      selectedIndexes: selectedDice
    });
    setSelectedDice([]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CombatPhaseLayout,
    {
      title: "Speed Roll",
      description: getInstruction(),
      combat,
      onActivateAbility: activateAbility2,
      onUseBackpackItem: useBackpackItem2,
      actions: isInteracting ? ((currentInteraction == null ? void 0 : currentInteraction.count) ?? 1) > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        PrimaryButton,
        {
          className: "btn-phase-action",
          onClick: confirmDiceSelection,
          disabled: selectedDice.length !== ((currentInteraction == null ? void 0 : currentInteraction.count) ?? 1),
          children: [
            "Confirm Selection (",
            selectedDice.length,
            "/",
            currentInteraction == null ? void 0 : currentInteraction.count,
            ")"
          ]
        }
      ) : combat.winner ? /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { className: "btn-phase-action", onClick: commitSpeedAndRollDamageDice, children: "Roll Damage Dice" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { className: "btn-phase-action", onClick: confirmBonusDamage, children: "Apply Passive Abilities" }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "speed-rolls-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "speed-dice-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CombatDice,
            {
              label: "Hero Speed",
              values: combat.heroSpeedRolls,
              onDieClick: canInteractHero ? onDieClick : void 0,
              mode: canInteractHero ? "select-die" : isInteracting ? "disabled" : "normal",
              selectedIndices: selectedDice
            }
          ),
          combat.heroSpeedRolls && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dice-breakdown-table", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              sumDice(combat.heroSpeedRolls),
              " ",
              getStatIcon("die")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "+ ",
              combat.hero.stats.speed,
              " ",
              getStatIcon("speed")
            ] }),
            !!heroSpeedDiff && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "+ ",
              heroSpeedDiff > 0 ? `+${heroSpeedDiff}` : heroSpeedDiff
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dice-result-total", children: [
              "= ",
              heroSpeedTotal
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "speed-dice-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CombatDice,
            {
              label: "Enemy Speed",
              values: combat.enemySpeedRolls,
              onDieClick: canInteractEnemy ? onDieClick : void 0,
              mode: canInteractEnemy ? "select-die" : isInteracting ? "disabled" : "normal"
            }
          ),
          combat.enemySpeedRolls && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dice-breakdown-table", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              sumDice(combat.enemySpeedRolls),
              " ",
              getStatIcon("die")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "+ ",
              getActiveEnemy(combat).stats.speed,
              " ",
              getStatIcon("speed")
            ] }),
            !!enemySpeedDiff && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "+ ",
              enemySpeedDiff > 0 ? `+${enemySpeedDiff}` : enemySpeedDiff
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dice-result-total", children: [
              "= ",
              enemySpeedTotal
            ] })
          ] })
        ] })
      ] })
    }
  );
};
const DamageRollPhase = ({
  combat,
  confirmDamageRoll,
  currentInteraction,
  resolveInteraction: resolveInteraction2,
  activateAbility: activateAbility2,
  useBackpackItem: useBackpackItem2
}) => {
  var _a, _b;
  const [selectedDice, setSelectedDice] = React.useState([]);
  const canInteractHero = (currentInteraction == null ? void 0 : currentInteraction.target) === "hero" && combat.winner === "hero";
  const canInteractEnemy = (currentInteraction == null ? void 0 : currentInteraction.target) === "enemy" && combat.winner === "enemy";
  const breakdown = React.useMemo(() => {
    return calculateDamageBreakdown(combat);
  }, [combat]);
  const onDieClick = (index) => {
    const count = (currentInteraction == null ? void 0 : currentInteraction.count) ?? 1;
    if (count > 1) {
      if (selectedDice.includes(index)) {
        setSelectedDice(selectedDice.filter((i) => i !== index));
      } else if (selectedDice.length < count) {
        setSelectedDice([...selectedDice, index]);
      }
    } else {
      resolveInteraction2({
        request: currentInteraction,
        selectedIndexes: [index]
      });
    }
  };
  const confirmDiceSelection = () => {
    if (!currentInteraction) return;
    resolveInteraction2({
      request: currentInteraction,
      selectedIndexes: selectedDice
    });
    setSelectedDice([]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CombatPhaseLayout,
    {
      title: "Damage Roll",
      combat,
      onActivateAbility: activateAbility2,
      onUseBackpackItem: useBackpackItem2,
      actions: currentInteraction ? ((currentInteraction == null ? void 0 : currentInteraction.count) ?? 1) > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        PrimaryButton,
        {
          className: "btn-phase-action",
          onClick: confirmDiceSelection,
          disabled: selectedDice.length !== ((currentInteraction == null ? void 0 : currentInteraction.count) ?? 1),
          children: [
            "Confirm Selection (",
            selectedDice.length,
            "/",
            currentInteraction == null ? void 0 : currentInteraction.count,
            ")"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { className: "btn-phase-action", onClick: confirmDamageRoll, children: "Apply Damage" }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "damage-rolls-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "damage-dice-container", children: [
          combat.winner === "hero" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CombatDice,
            {
              label: combat.winner === "hero" ? "Hero" : "Enemy",
              values: (_a = combat.damage) == null ? void 0 : _a.damageRolls,
              onDieClick: canInteractHero ? onDieClick : void 0,
              mode: canInteractHero ? "select-die" : currentInteraction ? "disabled" : "normal",
              selectedIndices: selectedDice
            }
          ),
          combat.winner === "enemy" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CombatDice,
            {
              label: "Enemy Damage",
              values: (_b = combat.damage) == null ? void 0 : _b.damageRolls,
              onDieClick: canInteractEnemy ? onDieClick : void 0,
              mode: canInteractEnemy ? "select-die" : currentInteraction ? "disabled" : "normal",
              selectedIndices: selectedDice
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "damage-breakdown-container", children: breakdown && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dice-breakdown-table", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              breakdown.diceTotal,
              " ",
              getStatIcon("die")
            ] }),
            !!breakdown.skill && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "+ ",
              breakdown.skill,
              " ",
              breakdown.skillName === "brawn" ? getStatIcon("brawn") : getStatIcon("magic")
            ] }),
            !!breakdown.modifiersTotal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "+ ",
              breakdown.modifiersTotal > 0 ? `+${breakdown.modifiersTotal}` : breakdown.modifiersTotal,
              " ",
              getStatIcon("modifier")
            ] }),
            !!breakdown.armour && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "- ",
              breakdown.armour,
              " ",
              getStatIcon("armour")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dice-result-total", children: [
              "= ",
              breakdown.totalDamage
            ] })
          ] }) })
        ] }),
        breakdown && breakdown.modifiers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "damage-modifier-breakdown", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { children: "Modifiers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "damage-modifiers-list", children: breakdown.modifiers.map((modifier, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "damage-modifier-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "modifier-source", children: modifier.source }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "modifier-amount", children: modifier.amount > 0 ? `+${modifier.amount}` : modifier.amount })
          ] }, index)) })
        ] })
      ] })
    }
  );
};
const ApplyPassiveAbilitiesPhase = ({
  combat,
  confirmBonusDamage,
  activateAbility: activateAbility2,
  useBackpackItem: useBackpackItem2
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CombatPhaseLayout,
    {
      title: "Passive Damage",
      combat,
      onActivateAbility: activateAbility2,
      onUseBackpackItem: useBackpackItem2,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-phase-action", onClick: confirmBonusDamage, children: "Apply Passive Abilities" }) }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "passive-preview-list", style: { marginBottom: "1rem" }, children: getPassiveAbilityPreview(combat).previews.map((preview, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `passive-preview-item ${preview.owner}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          preview.abilityName,
          ":"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { margin: "0.5rem 0 0 1rem", padding: 0 }, children: preview.changes.map((change, cIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { style: { listStyle: "none" }, children: change.message }, cIdx)) }),
        !preview.changes.length && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "0.5em" }, children: preview.description })
      ] }, idx)) })
    }
  );
};
const CombatantEditor = ({
  combatant,
  onHealthChange,
  onRemoveEffect
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "combatant-editor-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-row health", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-label", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: getStatIcon("health") }),
        "Health"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-controls", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberControl,
        {
          value: combatant.stats.health,
          onChange: onHealthChange,
          min: 0,
          max: combatant.stats.maxHealth,
          label: `/ ${combatant.stats.maxHealth}`
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-subsection", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Active Effects" }),
      combatant.activeEffects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "empty-state", children: "No active effects" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "effect-grid", children: combatant.activeEffects.map((effect, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActiveEffectIcon,
        {
          effect,
          onRemove: () => onRemoveEffect(idx)
        },
        idx
      )) })
    ] })
  ] });
};
const CombatStateEditor = ({
  combat,
  onApply,
  onCancel
}) => {
  const [state, setState] = reactExports.useState(combat);
  const [selectedTab, setSelectedTab] = reactExports.useState("hero");
  const updateHeroHealth = (health) => {
    setState({
      ...state,
      hero: {
        ...state.hero,
        stats: { ...state.hero.stats, health }
      }
    });
  };
  const updateEnemyHealth = (health) => {
    if (typeof selectedTab !== "number") return;
    const newEnemies = [...state.enemies];
    newEnemies[selectedTab] = {
      ...newEnemies[selectedTab],
      stats: { ...newEnemies[selectedTab].stats, health }
    };
    setState({
      ...state,
      enemies: newEnemies
    });
  };
  const removeHeroEffect = (index) => {
    setState({
      ...state,
      hero: {
        ...state.hero,
        activeEffects: state.hero.activeEffects.filter(
          (_, i) => i !== index
        )
      }
    });
  };
  const removeEnemyEffect = (index) => {
    if (typeof selectedTab !== "number") return;
    const newEnemies = [...state.enemies];
    const targetEnemy = newEnemies[selectedTab];
    newEnemies[selectedTab] = {
      ...targetEnemy,
      activeEffects: targetEnemy.activeEffects.filter(
        (_, i) => i !== index
      )
    };
    setState({
      ...state,
      enemies: newEnemies
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DqCard,
    {
      title: "Combat State Editor",
      className: "combat-state-editor-card",
      onClose: onCancel,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "selector-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: `tab-btn ${selectedTab === "hero" ? "active" : ""}`,
              onClick: () => setSelectedTab("hero"),
              children: [
                "🦸 ",
                state.hero.name
              ]
            }
          ),
          state.enemies.map((enemy, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: `tab-btn ${selectedTab === index ? "active" : ""}`,
              onClick: () => setSelectedTab(index),
              children: [
                "👹 ",
                enemy.name,
                enemy.stats.health <= 0 && " (Defeated)"
              ]
            },
            index
          ))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-tab-content", children: selectedTab === "hero" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          CombatantEditor,
          {
            combatant: state.hero,
            type: "hero",
            onHealthChange: updateHeroHealth,
            onRemoveEffect: removeHeroEffect
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          CombatantEditor,
          {
            combatant: state.enemies[selectedTab],
            type: "enemy",
            onHealthChange: updateEnemyHealth,
            onRemoveEffect: removeEnemyEffect
          },
          selectedTab
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: onCancel, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: () => onApply(state), children: "Apply Changes" })
        ] })
      ]
    }
  );
};
const RoundSummary = ({
  combat,
  nextRound,
  activateAbility: activateAbility2,
  useBackpackItem: useBackpackItem2,
  onUpdateState
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    CombatPhaseLayout,
    {
      title: "Round Summary",
      combat,
      onActivateAbility: activateAbility2,
      onUseBackpackItem: useBackpackItem2,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary btn-phase-action", onClick: () => setIsEditing(true), children: "Fix State" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-phase-action", onClick: nextRound, children: "Next Round" })
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "TODO: Show summary of the changes in this round" }),
        isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CombatStateEditor,
          {
            combat,
            onApply: (state) => {
              onUpdateState(state);
              setIsEditing(false);
            },
            onCancel: () => setIsEditing(false)
          }
        )
      ]
    }
  );
};
const RoundEndPhase = ({
  combat,
  nextRound,
  activateAbility: activateAbility2,
  useBackpackItem: useBackpackItem2
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CombatPhaseLayout,
    {
      title: "Round End",
      description: `Round ${combat.round} complete. prepare for next round.`,
      combat,
      onActivateAbility: activateAbility2,
      onUseBackpackItem: useBackpackItem2,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(PrimaryButton, { className: "btn-phase-action", onClick: nextRound, children: [
        "Start Round ",
        combat.round + 1
      ] })
    }
  );
};
const CombatEndPhase = ({
  combat,
  onCombatFinish,
  restartCombat,
  onUpdateState
}) => {
  var _a, _b, _c;
  const [isEditing, setIsEditing] = React.useState(false);
  const isVictory = (((_a = combat.hero) == null ? void 0 : _a.stats.health) ?? 0) > 0;
  const enemyName = ((_c = (_b = getActiveEnemy(combat)) == null ? void 0 : _b.original) == null ? void 0 : _c.name) || "Enemy";
  const healAndMoveOn = () => {
    onCombatFinish({
      health: combat.hero.original.stats.maxHealth,
      backpack: combat.backpack
    });
  };
  const exitWithoutHealing = () => {
    onCombatFinish({
      backpack: combat.backpack
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CombatPhaseLayout,
    {
      title: isVictory ? "VICTORY!" : "DEFEAT!",
      description: isVictory ? `You have triumphed over ${enemyName}!` : `You have been defeated by ${enemyName}.`,
      combat,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: healAndMoveOn, children: "Restore Health & Move On" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: exitWithoutHealing, children: "Exit without Healing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: restartCombat, children: "Retry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => setIsEditing(true), children: "Fix State" })
      ] }),
      children: isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CombatStateEditor,
        {
          combat,
          onApply: (state) => {
            onUpdateState(state);
            setIsEditing(false);
          },
          onCancel: () => setIsEditing(false)
        }
      )
    }
  );
};
const InteractionOverlay = ({ ability, interaction, onResolve }) => {
  if (!interaction || interaction.type !== "choices" || !interaction.choices) return null;
  const handleChoice = (index) => {
    onResolve({ request: interaction, selectedIndexes: [index] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    CombatOverlay,
    {
      title: ability.name,
      icon: getAbilityIcon(ability.def),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CombatOverlay.Content, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "ability-modal-description", children: ability.def.description }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CombatOverlay.Actions, { children: interaction.choices.map((choice, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => handleChoice(index), children: choice }, index)) })
      ]
    }
  );
};
const heroBg = "" + new URL("hero_background-nBmexkXQ.png", import.meta.url).href;
const monsterBg = "" + new URL("monster_background-DONXtk9A.png", import.meta.url).href;
const CombatArena = ({ hero, enemy, onCombatFinish }) => {
  var _a, _b, _c, _d;
  const {
    combat,
    activateAbility: activateAbility2,
    useBackpackItem: useBackpackItem2,
    rollSpeedDice,
    commitSpeedAndRollDamageDice,
    confirmDamageRoll,
    confirmBonusDamage,
    resolveInteraction: resolveInteraction2,
    nextRound,
    restartCombat,
    updateCombatState,
    setActiveEnemy,
    undo,
    canUndo
  } = useCombat(hero, enemy);
  const [interactionData, setInteractionData] = reactExports.useState(null);
  React.useEffect(() => {
    if (combat.pendingInteraction) {
      setInteractionData({
        currentIndex: 0,
        length: combat.pendingInteraction.requests.length,
        collectedResponses: []
      });
    } else {
      setInteractionData(null);
    }
  }, [combat.pendingInteraction]);
  const currentInteraction = () => {
    var _a2;
    return (_a2 = combat.pendingInteraction) == null ? void 0 : _a2.requests[(interactionData == null ? void 0 : interactionData.currentIndex) ?? 0];
  };
  const resolveSingleInteraction = (response) => {
    if (!interactionData) return;
    const newData = {
      ...interactionData,
      currentIndex: interactionData.currentIndex + 1,
      collectedResponses: [...interactionData.collectedResponses, response]
    };
    if (newData.currentIndex < newData.length) {
      setInteractionData(newData);
      return;
    }
    resolveInteraction2(newData.collectedResponses);
    setInteractionData(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "combat-arena", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "combat-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-bg", style: { backgroundImage: `url(${heroBg})` } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "monster-bg", style: { backgroundImage: `url(${monsterBg})` } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "arena-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "combatants", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CombatantCard,
        {
          name: hero.name,
          currentHealth: ((_a = combat.hero) == null ? void 0 : _a.stats.health) ?? 0,
          maxHealth: hero.stats.maxHealth,
          speed: hero.stats.speed,
          brawn: hero.stats.brawn,
          magic: hero.stats.magic,
          armour: hero.stats.armour,
          activeEffects: combat.hero.activeEffects
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "vs-separator", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "vs-text", children: "VS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "undo-button",
            onClick: undo,
            disabled: !canUndo,
            title: "Undo last action",
            "aria-label": "Undo",
            children: "↺"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnemyCarousel,
        {
          enemies: combat.enemies,
          activeIndex: combat.activeEnemyIndex,
          onSelect: setActiveEnemy
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "arena-center", children: [
      ((_b = currentInteraction()) == null ? void 0 : _b.type) === "choices" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InteractionOverlay,
        {
          ability: combat.pendingInteraction.ability,
          interaction: currentInteraction(),
          onResolve: (data) => resolveSingleInteraction(data)
        }
      ),
      combat.phase === "combat-start" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CombatStartPhase,
        {
          combat,
          rollSpeedDice,
          activateAbility: activateAbility2,
          useBackpackItem: useBackpackItem2
        }
      ),
      combat.phase === "round-start" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RoundStartPhase,
        {
          combat,
          rollSpeedDice,
          activateAbility: activateAbility2,
          useBackpackItem: useBackpackItem2
        }
      ),
      combat.phase === "speed-roll" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SpeedRollPhase,
        {
          combat,
          commitSpeedAndRollDamageDice,
          confirmBonusDamage,
          currentInteraction: ((_c = currentInteraction()) == null ? void 0 : _c.type) === "dice" ? currentInteraction() : void 0,
          resolveInteraction: resolveSingleInteraction,
          activateAbility: activateAbility2,
          useBackpackItem: useBackpackItem2
        }
      ),
      combat.phase === "damage-roll" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        DamageRollPhase,
        {
          combat,
          confirmDamageRoll,
          currentInteraction: ((_d = currentInteraction()) == null ? void 0 : _d.type) === "dice" ? currentInteraction() : void 0,
          resolveInteraction: resolveSingleInteraction,
          activateAbility: activateAbility2,
          useBackpackItem: useBackpackItem2
        }
      ),
      combat.phase === "apply-damage" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ApplyPassiveAbilitiesPhase,
        {
          combat,
          confirmBonusDamage,
          activateAbility: activateAbility2,
          useBackpackItem: useBackpackItem2
        }
      ),
      combat.phase === "passive-damage" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RoundSummary,
        {
          combat,
          nextRound,
          activateAbility: activateAbility2,
          useBackpackItem: useBackpackItem2,
          onUpdateState: updateCombatState
        }
      ),
      combat.phase === "round-end" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RoundEndPhase,
        {
          combat,
          nextRound,
          activateAbility: activateAbility2,
          useBackpackItem: useBackpackItem2
        }
      ),
      combat.phase === "combat-end" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CombatEndPhase,
        {
          combat,
          onCombatFinish,
          restartCombat,
          onUpdateState: updateCombatState
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CombatLog, { logs: combat.logs })
  ] });
};
const CombatTab = ({ hero, onCombatFinish }) => {
  const [selectedEnemy, setSelectedEnemy] = reactExports.useState(null);
  const handleCombatFinish = (results) => {
    setSelectedEnemy(null);
    onCombatFinish(results);
  };
  if (!selectedEnemy) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EnemySelector, { onSelect: setSelectedEnemy });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CombatArena,
    {
      hero,
      enemy: selectedEnemy,
      onCombatFinish: handleCombatFinish
    }
  );
};
const INITIAL_HERO = {
  type: "hero",
  name: "New Hero",
  path: "",
  career: "",
  stats: {
    speed: 0,
    brawn: 0,
    magic: 0,
    armour: 0,
    health: 30,
    maxHealth: 30
  },
  equipment: {},
  backpack: [null, null, null, null, null],
  money: 0
};
const STORAGE_KEY = "dq-hero-v1";
function useHero() {
  const [hero, setHero] = reactExports.useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let hero2 = saved ? JSON.parse(saved) : INITIAL_HERO;
    hero2.backpack = [...hero2.backpack, ...Array(5).fill(null)].slice(0, 5);
    return hero2;
  });
  reactExports.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hero));
  }, [hero]);
  const effectiveStats = {
    speed: 0,
    brawn: 0,
    magic: 0,
    armour: 0,
    health: hero.stats.health,
    // Persisted
    maxHealth: hero.stats.maxHealth
    // Base persisted
  };
  if (hero.path === "Warrior") effectiveStats.maxHealth += 15;
  if (hero.path === "Mage") effectiveStats.maxHealth += 10;
  if (hero.path === "Rogue") effectiveStats.maxHealth += 5;
  Object.values(hero.equipment).forEach((item) => {
    if (item && item.stats) {
      if (item.stats.speed) effectiveStats.speed += item.stats.speed;
      if (item.stats.brawn) effectiveStats.brawn += item.stats.brawn;
      if (item.stats.magic) effectiveStats.magic += item.stats.magic;
      if (item.stats.armour) effectiveStats.armour += item.stats.armour;
      if (item.stats.maxHealth) effectiveStats.maxHealth += item.stats.maxHealth;
    }
  });
  const effectiveHero = {
    ...hero,
    stats: effectiveStats
  };
  const activeAbilities2 = reactExports.useMemo(() => {
    var _a;
    return Array.from(/* @__PURE__ */ new Set([
      // Equipment abilities
      ...Object.values(hero.equipment).flatMap((item) => (item == null ? void 0 : item.abilities) || []),
      // Career abilities
      ...hero.career ? ((_a = getCareer(hero.career)) == null ? void 0 : _a.abilities) ?? [] : []
    ]));
  }, [hero.equipment, hero.career]);
  const updateHealth = (value) => {
    setHero((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        health: Math.min(Math.max(0, value), effectiveStats.maxHealth)
        // Clamp to effective max
      }
    }));
  };
  const updateName = (name) => {
    setHero((prev) => ({ ...prev, name }));
  };
  const updatePath = (path, onItemsRemoved) => {
    const newEquipment = { ...hero.equipment };
    const removedItems = [];
    Object.keys(newEquipment).forEach((slot) => {
      const item = newEquipment[slot];
      if (item && item.pathRequirement && item.pathRequirement !== path) {
        delete newEquipment[slot];
        removedItems.push(item.name);
      }
    });
    if (removedItems.length > 0) {
      if (onItemsRemoved) {
        onItemsRemoved(removedItems);
      }
    }
    let newMaxHealth = hero.stats.maxHealth;
    if (path === "Warrior") newMaxHealth += 15;
    if (path === "Mage") newMaxHealth += 10;
    if (path === "Rogue") newMaxHealth += 5;
    Object.values(newEquipment).forEach((item) => {
      if (item && item.stats && item.stats.maxHealth) {
        newMaxHealth += item.stats.maxHealth;
      }
    });
    setHero((prev) => ({
      ...prev,
      path,
      career: "",
      // Reset career when path changes
      equipment: newEquipment,
      stats: {
        ...prev.stats,
        health: newMaxHealth
      }
    }));
  };
  const updateCareer = (career) => {
    setHero((prev) => ({ ...prev, career }));
  };
  const updateMoney = (value) => {
    setHero((prev) => ({
      ...prev,
      money: Math.max(0, value)
    }));
  };
  const equipItem = (item, slot) => {
    setHero((prev) => {
      let money = prev.money;
      activeAbilities2.forEach((abilityName) => {
        const def = getAbilityDefinition(abilityName);
        if (def && def.onEquipItem) {
          const updatedHero = def.onEquipItem(prev, item, slot);
          money = updatedHero.money;
        }
      });
      return {
        ...prev,
        money,
        equipment: {
          ...prev.equipment,
          [slot]: item
        }
      };
    });
  };
  const unequipItem = (slot) => {
    setHero((prev) => {
      const newEquipment = { ...prev.equipment };
      delete newEquipment[slot];
      return {
        ...prev,
        equipment: newEquipment
      };
    });
  };
  const setBackpackItem = (item, index) => {
    setHero((prev) => {
      const newBackpack = [...prev.backpack];
      newBackpack[index] = item;
      return {
        ...prev,
        backpack: newBackpack
      };
    });
  };
  const deleteBackpackItem = (index) => {
    setHero((prev) => {
      const newBackpack = [...prev.backpack];
      newBackpack[index] = null;
      return {
        ...prev,
        backpack: newBackpack
      };
    });
  };
  const updateBackpack = (newBackpack) => {
    setHero((prev) => ({
      ...prev,
      backpack: newBackpack
    }));
  };
  return {
    hero: effectiveHero,
    activeAbilities: activeAbilities2,
    updateHealth,
    updateName,
    updatePath,
    updateCareer,
    updateMoney,
    equipItem,
    unequipItem,
    setBackpackItem,
    deleteBackpackItem,
    updateBackpack
  };
}
function App() {
  const [activeTab, setActiveTab] = reactExports.useState("stats");
  const {
    hero,
    activeAbilities: activeAbilities2,
    updateHealth,
    updateMoney,
    updateName,
    updatePath,
    updateCareer,
    equipItem,
    unequipItem,
    setBackpackItem,
    deleteBackpackItem,
    updateBackpack
  } = useHero();
  const handleCombatFinish = (results) => {
    if (results.health) updateHealth(results.health);
    updateBackpack(results.backpack);
    setActiveTab("stats");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "app-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Destiny Quest", className: "app-logo" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "app-main", children: [
      activeTab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        HeroStats,
        {
          hero,
          activeAbilities: activeAbilities2,
          onHealthChange: updateHealth,
          onMoneyChange: updateMoney,
          onNameChange: updateName,
          onPathChange: updatePath,
          onCareerChange: updateCareer
        }
      ),
      activeTab === "equipment" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        HeroEquipment,
        {
          hero,
          onEquip: equipItem,
          onUnequip: unequipItem,
          onSetBackpackItem: setBackpackItem,
          onDeleteBackpackItem: deleteBackpackItem
        }
      ),
      activeTab === "combat" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CombatTab,
        {
          hero,
          onCombatFinish: handleCombatFinish
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { activeTab, onTabChange: setActiveTab })
  ] });
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
//# sourceMappingURL=index-BQO2Tu9K.js.map
