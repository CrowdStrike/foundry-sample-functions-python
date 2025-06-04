function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var react = {exports: {}};

var react_production = {};

/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReact_production;

function requireReact_production () {
	if (hasRequiredReact_production) return react_production;
	hasRequiredReact_production = 1;

	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
	  REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	  REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	  REACT_MEMO_TYPE = Symbol.for("react.memo"),
	  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
	  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
	  maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
	  return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
	    isMounted: function () {
	      return false;
	    },
	    enqueueForceUpdate: function () {},
	    enqueueReplaceState: function () {},
	    enqueueSetState: function () {}
	  },
	  assign = Object.assign,
	  emptyObject = {};
	function Component(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function (partialState, callback) {
	  if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
	  this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = true;
	var isArrayImpl = Array.isArray,
	  ReactSharedInternals = {
	    H: null,
	    A: null,
	    T: null,
	    S: null,
	    V: null
	  },
	  hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, self, source, owner, props) {
	  self = props.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== self ? self : null,
	    props: props
	  };
	}
	function cloneAndReplaceKey(oldElement, newKey) {
	  return ReactElement(oldElement.type, newKey, void 0, void 0, void 0, oldElement.props);
	}
	function isValidElement(object) {
	  return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
	  var escaperLookup = {
	    "=": "=0",
	    ":": "=2"
	  };
	  return "$" + key.replace(/[=:]/g, function (match) {
	    return escaperLookup[match];
	  });
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
	  return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function noop$1() {}
	function resolveThenable(thenable) {
	  switch (thenable.status) {
	    case "fulfilled":
	      return thenable.value;
	    case "rejected":
	      throw thenable.reason;
	    default:
	      switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(function (fulfilledValue) {
	        "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
	      }, function (error) {
	        "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
	      })), thenable.status) {
	        case "fulfilled":
	          return thenable.value;
	        case "rejected":
	          throw thenable.reason;
	      }
	  }
	  throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
	  var type = typeof children;
	  if ("undefined" === type || "boolean" === type) children = null;
	  var invokeCallback = false;
	  if (null === children) invokeCallback = true;else switch (type) {
	    case "bigint":
	    case "string":
	    case "number":
	      invokeCallback = true;
	      break;
	    case "object":
	      switch (children.$$typeof) {
	        case REACT_ELEMENT_TYPE:
	        case REACT_PORTAL_TYPE:
	          invokeCallback = true;
	          break;
	        case REACT_LAZY_TYPE:
	          return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
	      }
	  }
	  if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function (c) {
	    return c;
	  })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
	  invokeCallback = 0;
	  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
	  if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);else if ("object" === type) {
	    if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
	    array = String(children);
	    throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
	  }
	  return invokeCallback;
	}
	function mapChildren(children, func, context) {
	  if (null == children) return children;
	  var result = [],
	    count = 0;
	  mapIntoArray(children, result, "", "", function (child) {
	    return func.call(context, child, count++);
	  });
	  return result;
	}
	function lazyInitializer(payload) {
	  if (-1 === payload._status) {
	    var ctor = payload._result;
	    ctor = ctor();
	    ctor.then(function (moduleObject) {
	      if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
	    }, function (error) {
	      if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
	    });
	    -1 === payload._status && (payload._status = 0, payload._result = ctor);
	  }
	  if (1 === payload._status) return payload._result.default;
	  throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function (error) {
	  if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
	    var event = new window.ErrorEvent("error", {
	      bubbles: true,
	      cancelable: true,
	      message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
	      error: error
	    });
	    if (!window.dispatchEvent(event)) return;
	  } else if ("object" === typeof process && "function" === typeof process.emit) {
	    process.emit("uncaughtException", error);
	    return;
	  }
	  console.error(error);
	};
	function noop() {}
	react_production.Children = {
	  map: mapChildren,
	  forEach: function (children, forEachFunc, forEachContext) {
	    mapChildren(children, function () {
	      forEachFunc.apply(this, arguments);
	    }, forEachContext);
	  },
	  count: function (children) {
	    var n = 0;
	    mapChildren(children, function () {
	      n++;
	    });
	    return n;
	  },
	  toArray: function (children) {
	    return mapChildren(children, function (child) {
	      return child;
	    }) || [];
	  },
	  only: function (children) {
	    if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
	    return children;
	  }
	};
	react_production.Component = Component;
	react_production.Fragment = REACT_FRAGMENT_TYPE;
	react_production.Profiler = REACT_PROFILER_TYPE;
	react_production.PureComponent = PureComponent;
	react_production.StrictMode = REACT_STRICT_MODE_TYPE;
	react_production.Suspense = REACT_SUSPENSE_TYPE;
	react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	react_production.__COMPILER_RUNTIME = {
	  __proto__: null,
	  c: function (size) {
	    return ReactSharedInternals.H.useMemoCache(size);
	  }
	};
	react_production.cache = function (fn) {
	  return function () {
	    return fn.apply(null, arguments);
	  };
	};
	react_production.cloneElement = function (element, config, children) {
	  if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
	  var props = assign({}, element.props),
	    key = element.key,
	    owner = void 0;
	  if (null != config) for (propName in void 0 !== config.ref && (owner = void 0), void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
	  var propName = arguments.length - 2;
	  if (1 === propName) props.children = children;else if (1 < propName) {
	    for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
	    props.children = childArray;
	  }
	  return ReactElement(element.type, key, void 0, void 0, owner, props);
	};
	react_production.createContext = function (defaultValue) {
	  defaultValue = {
	    $$typeof: REACT_CONTEXT_TYPE,
	    _currentValue: defaultValue,
	    _currentValue2: defaultValue,
	    _threadCount: 0,
	    Provider: null,
	    Consumer: null
	  };
	  defaultValue.Provider = defaultValue;
	  defaultValue.Consumer = {
	    $$typeof: REACT_CONSUMER_TYPE,
	    _context: defaultValue
	  };
	  return defaultValue;
	};
	react_production.createElement = function (type, config, children) {
	  var propName,
	    props = {},
	    key = null;
	  if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
	  var childrenLength = arguments.length - 2;
	  if (1 === childrenLength) props.children = children;else if (1 < childrenLength) {
	    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
	    props.children = childArray;
	  }
	  if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
	  return ReactElement(type, key, void 0, void 0, null, props);
	};
	react_production.createRef = function () {
	  return {
	    current: null
	  };
	};
	react_production.forwardRef = function (render) {
	  return {
	    $$typeof: REACT_FORWARD_REF_TYPE,
	    render: render
	  };
	};
	react_production.isValidElement = isValidElement;
	react_production.lazy = function (ctor) {
	  return {
	    $$typeof: REACT_LAZY_TYPE,
	    _payload: {
	      _status: -1,
	      _result: ctor
	    },
	    _init: lazyInitializer
	  };
	};
	react_production.memo = function (type, compare) {
	  return {
	    $$typeof: REACT_MEMO_TYPE,
	    type: type,
	    compare: void 0 === compare ? null : compare
	  };
	};
	react_production.startTransition = function (scope) {
	  var prevTransition = ReactSharedInternals.T,
	    currentTransition = {};
	  ReactSharedInternals.T = currentTransition;
	  try {
	    var returnValue = scope(),
	      onStartTransitionFinish = ReactSharedInternals.S;
	    null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
	    "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
	  } catch (error) {
	    reportGlobalError(error);
	  } finally {
	    ReactSharedInternals.T = prevTransition;
	  }
	};
	react_production.unstable_useCacheRefresh = function () {
	  return ReactSharedInternals.H.useCacheRefresh();
	};
	react_production.use = function (usable) {
	  return ReactSharedInternals.H.use(usable);
	};
	react_production.useActionState = function (action, initialState, permalink) {
	  return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	react_production.useCallback = function (callback, deps) {
	  return ReactSharedInternals.H.useCallback(callback, deps);
	};
	react_production.useContext = function (Context) {
	  return ReactSharedInternals.H.useContext(Context);
	};
	react_production.useDebugValue = function () {};
	react_production.useDeferredValue = function (value, initialValue) {
	  return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	react_production.useEffect = function (create, createDeps, update) {
	  var dispatcher = ReactSharedInternals.H;
	  if ("function" === typeof update) throw Error("useEffect CRUD overload is not enabled in this build of React.");
	  return dispatcher.useEffect(create, createDeps);
	};
	react_production.useId = function () {
	  return ReactSharedInternals.H.useId();
	};
	react_production.useImperativeHandle = function (ref, create, deps) {
	  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	react_production.useInsertionEffect = function (create, deps) {
	  return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	react_production.useLayoutEffect = function (create, deps) {
	  return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	react_production.useMemo = function (create, deps) {
	  return ReactSharedInternals.H.useMemo(create, deps);
	};
	react_production.useOptimistic = function (passthrough, reducer) {
	  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	react_production.useReducer = function (reducer, initialArg, init) {
	  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	react_production.useRef = function (initialValue) {
	  return ReactSharedInternals.H.useRef(initialValue);
	};
	react_production.useState = function (initialState) {
	  return ReactSharedInternals.H.useState(initialState);
	};
	react_production.useSyncExternalStore = function (subscribe, getSnapshot, getServerSnapshot) {
	  return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	react_production.useTransition = function () {
	  return ReactSharedInternals.H.useTransition();
	};
	react_production.version = "19.1.0";
	return react_production;
}

var hasRequiredReact;

function requireReact () {
	if (hasRequiredReact) return react.exports;
	hasRequiredReact = 1;

	{
	  react.exports = requireReact_production();
	}
	return react.exports;
}

var reactExports = requireReact();
var React = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  return unsafeStringify(rnds);
}
const VERSION = 'current';
function assertConnection(falcon) {
  if (!falcon.isConnected) {
    throw new Error('You cannot call this API before having established a connection to the host!');
  }
}
function isValidResponse(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
event) {
  return !!event?.data?.meta?.messageId;
}
const CONNECTION_TIMEOUT = 5_000;
const API_TIMEOUT = 30_000;
const NAVIGATION_TIMEOUT = 5_000;
function timeoutForMessage(message) {
  const timeout = message.type === 'connect' ? CONNECTION_TIMEOUT : message.type === 'api' ? API_TIMEOUT : message.type === 'navigateTo' ? NAVIGATION_TIMEOUT :
  // Requests not explicitly covered above will not have a timeout. This includes 'fileUpload', which is a user interaction that can take any amount of time.
  null;
  // In tests we have mocked responses which do not require long timeouts
  return timeout;
}
class Bridge {
  onDataUpdate;
  onBroadcast;
  onLivereload;
  pendingMessages = new Map();
  targetOrigin = '*';
  constructor({
    onDataUpdate,
    onBroadcast,
    onLivereload
  } = {}) {
    this.onDataUpdate = onDataUpdate;
    this.onBroadcast = onBroadcast;
    this.onLivereload = onLivereload;
    window.addEventListener('message', this.handleMessageWrapper);
  }
  destroy() {
    window.removeEventListener('message', this.handleMessageWrapper);
  }
  setOrigin(origin) {
    this.targetOrigin = origin;
  }
  sendUnidirectionalMessage(message) {
    const messageId = v4();
    const eventData = {
      message,
      meta: {
        messageId,
        version: VERSION
      }
    };
    window.parent.postMessage(eventData, this.targetOrigin);
  }
  async postMessage(message) {
    return new Promise((resolve, reject) => {
      const messageId = v4();
      let timeoutTimer;
      const timeoutValue = timeoutForMessage(message);
      if (timeoutValue !== null) {
        timeoutTimer = setTimeout(() => {
          reject(new Error(`Waiting for response from foundry host for "${message.type}" message (ID: ${messageId}) timed out after ${timeoutValue}ms`));
        }, timeoutValue);
      }
      this.pendingMessages.set(messageId, result => {
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        resolve(result);
      });
      const eventData = {
        message,
        meta: {
          messageId,
          version: VERSION
        }
      };
      window.parent.postMessage(eventData, this.targetOrigin);
    });
  }
  handleMessageWrapper = event => {
    return this.handleMessage(event);
  };
  handleMessage = event => {
    if (!isValidResponse(event)) {
      return;
    }
    const {
      message
    } = event.data;
    if (message.type === 'data') {
      this.onDataUpdate?.(message);
      // data update events are unidirectional and originated from the host, so there cannot be a callback waiting for this message
      return;
    }
    if (message.type === 'broadcast') {
      this.onBroadcast?.(message);
      // data update events are unidirectional and are proxied via the host, so there cannot be a callback waiting for this message
      return;
    }
    if (message.type === 'livereload') {
      this.onLivereload?.(message);
      // livereload events are unidirectional and are proxied via the host, so there cannot be a callback waiting for this message
      return;
    }
    const {
      messageId
    } = event.data.meta;
    const callback = this.pendingMessages.get(messageId);
    if (!callback) {
      this.throwError(`Received unexpected message`);
      return;
    }
    this.pendingMessages.delete(messageId);
    callback(message.payload);
  };
  throwError(message) {
    throw new Error(message);
  }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
const anyMap = new WeakMap();
const eventsMap = new WeakMap();
const producersMap = new WeakMap();
const anyProducer = Symbol('anyProducer');
const resolvedPromise = Promise.resolve();

// Define symbols for "meta" events.
const listenerAdded = Symbol('listenerAdded');
const listenerRemoved = Symbol('listenerRemoved');
let canEmitMetaEvents = false;
let isGlobalDebugEnabled = false;
const isEventKeyType = key => typeof key === 'string' || typeof key === 'symbol' || typeof key === 'number';
function assertEventName(eventName) {
  if (!isEventKeyType(eventName)) {
    throw new TypeError('`eventName` must be a string, symbol, or number');
  }
}
function assertListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('listener must be a function');
  }
}
function getListeners(instance, eventName) {
  const events = eventsMap.get(instance);
  if (!events.has(eventName)) {
    return;
  }
  return events.get(eventName);
}
function getEventProducers(instance, eventName) {
  const key = isEventKeyType(eventName) ? eventName : anyProducer;
  const producers = producersMap.get(instance);
  if (!producers.has(key)) {
    return;
  }
  return producers.get(key);
}
function enqueueProducers(instance, eventName, eventData) {
  const producers = producersMap.get(instance);
  if (producers.has(eventName)) {
    for (const producer of producers.get(eventName)) {
      producer.enqueue(eventData);
    }
  }
  if (producers.has(anyProducer)) {
    const item = Promise.all([eventName, eventData]);
    for (const producer of producers.get(anyProducer)) {
      producer.enqueue(item);
    }
  }
}
function iterator(instance, eventNames) {
  eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
  let isFinished = false;
  let flush = () => {};
  let queue = [];
  const producer = {
    enqueue(item) {
      queue.push(item);
      flush();
    },
    finish() {
      isFinished = true;
      flush();
    }
  };
  for (const eventName of eventNames) {
    let set = getEventProducers(instance, eventName);
    if (!set) {
      set = new Set();
      const producers = producersMap.get(instance);
      producers.set(eventName, set);
    }
    set.add(producer);
  }
  return {
    async next() {
      if (!queue) {
        return {
          done: true
        };
      }
      if (queue.length === 0) {
        if (isFinished) {
          queue = undefined;
          return this.next();
        }
        await new Promise(resolve => {
          flush = resolve;
        });
        return this.next();
      }
      return {
        done: false,
        value: await queue.shift()
      };
    },
    async return(value) {
      queue = undefined;
      for (const eventName of eventNames) {
        const set = getEventProducers(instance, eventName);
        if (set) {
          set.delete(producer);
          if (set.size === 0) {
            const producers = producersMap.get(instance);
            producers.delete(eventName);
          }
        }
      }
      flush();
      return arguments.length > 0 ? {
        done: true,
        value: await value
      } : {
        done: true
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function defaultMethodNamesOrAssert(methodNames) {
  if (methodNames === undefined) {
    return allEmitteryMethods;
  }
  if (!Array.isArray(methodNames)) {
    throw new TypeError('`methodNames` must be an array of strings');
  }
  for (const methodName of methodNames) {
    if (!allEmitteryMethods.includes(methodName)) {
      if (typeof methodName !== 'string') {
        throw new TypeError('`methodNames` element must be a string');
      }
      throw new Error(`${methodName} is not Emittery method`);
    }
  }
  return methodNames;
}
const isMetaEvent = eventName => eventName === listenerAdded || eventName === listenerRemoved;
function emitMetaEvent(emitter, eventName, eventData) {
  if (isMetaEvent(eventName)) {
    try {
      canEmitMetaEvents = true;
      emitter.emit(eventName, eventData);
    } finally {
      canEmitMetaEvents = false;
    }
  }
}
class Emittery {
  static mixin(emitteryPropertyName, methodNames) {
    methodNames = defaultMethodNamesOrAssert(methodNames);
    return target => {
      if (typeof target !== 'function') {
        throw new TypeError('`target` must be function');
      }
      for (const methodName of methodNames) {
        if (target.prototype[methodName] !== undefined) {
          throw new Error(`The property \`${methodName}\` already exists on \`target\``);
        }
      }
      function getEmitteryProperty() {
        Object.defineProperty(this, emitteryPropertyName, {
          enumerable: false,
          value: new Emittery()
        });
        return this[emitteryPropertyName];
      }
      Object.defineProperty(target.prototype, emitteryPropertyName, {
        enumerable: false,
        get: getEmitteryProperty
      });
      const emitteryMethodCaller = methodName => function (...args) {
        return this[emitteryPropertyName][methodName](...args);
      };
      for (const methodName of methodNames) {
        Object.defineProperty(target.prototype, methodName, {
          enumerable: false,
          value: emitteryMethodCaller(methodName)
        });
      }
      return target;
    };
  }
  static get isDebugEnabled() {
    // In a browser environment, `globalThis.process` can potentially reference a DOM Element with a `#process` ID,
    // so instead of just type checking `globalThis.process`, we need to make sure that `globalThis.process.env` exists.
    // eslint-disable-next-line n/prefer-global/process
    if (typeof globalThis.process?.env !== 'object') {
      return isGlobalDebugEnabled;
    }

    // eslint-disable-next-line n/prefer-global/process
    const {
      env
    } = globalThis.process ?? {
      env: {}
    };
    return env.DEBUG === 'emittery' || env.DEBUG === '*' || isGlobalDebugEnabled;
  }
  static set isDebugEnabled(newValue) {
    isGlobalDebugEnabled = newValue;
  }
  constructor(options = {}) {
    anyMap.set(this, new Set());
    eventsMap.set(this, new Map());
    producersMap.set(this, new Map());
    producersMap.get(this).set(anyProducer, new Set());
    this.debug = options.debug ?? {};
    if (this.debug.enabled === undefined) {
      this.debug.enabled = false;
    }
    if (!this.debug.logger) {
      this.debug.logger = (type, debugName, eventName, eventData) => {
        try {
          // TODO: Use https://github.com/sindresorhus/safe-stringify when the package is more mature. Just copy-paste the code.
          eventData = JSON.stringify(eventData);
        } catch {
          eventData = `Object with the following keys failed to stringify: ${Object.keys(eventData).join(',')}`;
        }
        if (typeof eventName === 'symbol' || typeof eventName === 'number') {
          eventName = eventName.toString();
        }
        const currentTime = new Date();
        const logTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}.${currentTime.getMilliseconds()}`;
        console.log(`[${logTime}][emittery:${type}][${debugName}] Event Name: ${eventName}\n\tdata: ${eventData}`);
      };
    }
  }
  logIfDebugEnabled(type, eventName, eventData) {
    if (Emittery.isDebugEnabled || this.debug.enabled) {
      this.debug.logger(type, this.debug.name, eventName, eventData);
    }
  }
  on(eventNames, listener) {
    assertListener(listener);
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      assertEventName(eventName);
      let set = getListeners(this, eventName);
      if (!set) {
        set = new Set();
        const events = eventsMap.get(this);
        events.set(eventName, set);
      }
      set.add(listener);
      this.logIfDebugEnabled('subscribe', eventName, undefined);
      if (!isMetaEvent(eventName)) {
        emitMetaEvent(this, listenerAdded, {
          eventName,
          listener
        });
      }
    }
    return this.off.bind(this, eventNames, listener);
  }
  off(eventNames, listener) {
    assertListener(listener);
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      assertEventName(eventName);
      const set = getListeners(this, eventName);
      if (set) {
        set.delete(listener);
        if (set.size === 0) {
          const events = eventsMap.get(this);
          events.delete(eventName);
        }
      }
      this.logIfDebugEnabled('unsubscribe', eventName, undefined);
      if (!isMetaEvent(eventName)) {
        emitMetaEvent(this, listenerRemoved, {
          eventName,
          listener
        });
      }
    }
  }
  once(eventNames) {
    let off_;
    const promise = new Promise(resolve => {
      off_ = this.on(eventNames, data => {
        off_();
        resolve(data);
      });
    });
    promise.off = off_;
    return promise;
  }
  events(eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      assertEventName(eventName);
    }
    return iterator(this, eventNames);
  }
  async emit(eventName, eventData) {
    assertEventName(eventName);
    if (isMetaEvent(eventName) && !canEmitMetaEvents) {
      throw new TypeError('`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`');
    }
    this.logIfDebugEnabled('emit', eventName, eventData);
    enqueueProducers(this, eventName, eventData);
    const listeners = getListeners(this, eventName) ?? new Set();
    const anyListeners = anyMap.get(this);
    const staticListeners = [...listeners];
    const staticAnyListeners = isMetaEvent(eventName) ? [] : [...anyListeners];
    await resolvedPromise;
    await Promise.all([...staticListeners.map(async listener => {
      if (listeners.has(listener)) {
        return listener(eventData);
      }
    }), ...staticAnyListeners.map(async listener => {
      if (anyListeners.has(listener)) {
        return listener(eventName, eventData);
      }
    })]);
  }
  async emitSerial(eventName, eventData) {
    assertEventName(eventName);
    if (isMetaEvent(eventName) && !canEmitMetaEvents) {
      throw new TypeError('`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`');
    }
    this.logIfDebugEnabled('emitSerial', eventName, eventData);
    const listeners = getListeners(this, eventName) ?? new Set();
    const anyListeners = anyMap.get(this);
    const staticListeners = [...listeners];
    const staticAnyListeners = [...anyListeners];
    await resolvedPromise;
    /* eslint-disable no-await-in-loop */
    for (const listener of staticListeners) {
      if (listeners.has(listener)) {
        await listener(eventData);
      }
    }
    for (const listener of staticAnyListeners) {
      if (anyListeners.has(listener)) {
        await listener(eventName, eventData);
      }
    }
    /* eslint-enable no-await-in-loop */
  }
  onAny(listener) {
    assertListener(listener);
    this.logIfDebugEnabled('subscribeAny', undefined, undefined);
    anyMap.get(this).add(listener);
    emitMetaEvent(this, listenerAdded, {
      listener
    });
    return this.offAny.bind(this, listener);
  }
  anyEvent() {
    return iterator(this);
  }
  offAny(listener) {
    assertListener(listener);
    this.logIfDebugEnabled('unsubscribeAny', undefined, undefined);
    emitMetaEvent(this, listenerRemoved, {
      listener
    });
    anyMap.get(this).delete(listener);
  }
  clearListeners(eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      this.logIfDebugEnabled('clear', eventName, undefined);
      if (isEventKeyType(eventName)) {
        const set = getListeners(this, eventName);
        if (set) {
          set.clear();
        }
        const producers = getEventProducers(this, eventName);
        if (producers) {
          for (const producer of producers) {
            producer.finish();
          }
          producers.clear();
        }
      } else {
        anyMap.get(this).clear();
        for (const [eventName, listeners] of eventsMap.get(this).entries()) {
          listeners.clear();
          eventsMap.get(this).delete(eventName);
        }
        for (const [eventName, producers] of producersMap.get(this).entries()) {
          for (const producer of producers) {
            producer.finish();
          }
          producers.clear();
          producersMap.get(this).delete(eventName);
        }
      }
    }
  }
  listenerCount(eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    let count = 0;
    for (const eventName of eventNames) {
      if (isEventKeyType(eventName)) {
        count += anyMap.get(this).size + (getListeners(this, eventName)?.size ?? 0) + (getEventProducers(this, eventName)?.size ?? 0) + (getEventProducers(this)?.size ?? 0);
        continue;
      }
      if (eventName !== undefined) {
        assertEventName(eventName);
      }
      count += anyMap.get(this).size;
      for (const value of eventsMap.get(this).values()) {
        count += value.size;
      }
      for (const value of producersMap.get(this).values()) {
        count += value.size;
      }
    }
    return count;
  }
  bindMethods(target, methodNames) {
    if (typeof target !== 'object' || target === null) {
      throw new TypeError('`target` must be an object');
    }
    methodNames = defaultMethodNamesOrAssert(methodNames);
    for (const methodName of methodNames) {
      if (target[methodName] !== undefined) {
        throw new Error(`The property \`${methodName}\` already exists on \`target\``);
      }
      Object.defineProperty(target, methodName, {
        enumerable: false,
        value: this[methodName].bind(this)
      });
    }
  }
}
const allEmitteryMethods = Object.getOwnPropertyNames(Emittery.prototype).filter(v => v !== 'constructor');
Object.defineProperty(Emittery, 'listenerAdded', {
  value: listenerAdded,
  writable: false,
  enumerable: true,
  configurable: false
});
Object.defineProperty(Emittery, 'listenerRemoved', {
  value: listenerRemoved,
  writable: false,
  enumerable: true,
  configurable: false
});
function Memoize(args) {
  let hashFunction;
  let duration;
  let tags;
  {
    hashFunction = args;
  }
  return (target, propertyKey, descriptor) => {
    if (descriptor.value != null) {
      descriptor.value = getNewFunction(descriptor.value, hashFunction, duration, tags);
    } else if (descriptor.get != null) {
      descriptor.get = getNewFunction(descriptor.get, hashFunction, duration, tags);
    } else {
      throw 'Only put a Memoize() decorator on a method or get accessor.';
    }
  };
}
const clearCacheTagsMap = new Map();
function getNewFunction(originalMethod, hashFunction, duration = 0, tags) {
  const propMapName = Symbol(`__memoized_map__`);
  return function (...args) {
    let returnedValue;
    if (!this.hasOwnProperty(propMapName)) {
      Object.defineProperty(this, propMapName, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new Map()
      });
    }
    let myMap = this[propMapName];
    if (Array.isArray(tags)) {
      for (const tag of tags) {
        if (clearCacheTagsMap.has(tag)) {
          clearCacheTagsMap.get(tag).push(myMap);
        } else {
          clearCacheTagsMap.set(tag, [myMap]);
        }
      }
    }
    if (hashFunction || args.length > 0 || duration > 0) {
      let hashKey;
      if (hashFunction === true) {
        hashKey = args.map(a => a.toString()).join('!');
      } else if (hashFunction) {
        hashKey = hashFunction.apply(this, args);
      } else {
        hashKey = args[0];
      }
      const timestampKey = `${hashKey}__timestamp`;
      let isExpired = false;
      if (duration > 0) {
        if (!myMap.has(timestampKey)) {
          isExpired = true;
        } else {
          let timestamp = myMap.get(timestampKey);
          isExpired = Date.now() - timestamp > duration;
        }
      }
      if (myMap.has(hashKey) && !isExpired) {
        returnedValue = myMap.get(hashKey);
      } else {
        returnedValue = originalMethod.apply(this, args);
        myMap.set(hashKey, returnedValue);
        if (duration > 0) {
          myMap.set(timestampKey, Date.now());
        }
      }
    } else {
      const hashKey = this;
      if (myMap.has(hashKey)) {
        returnedValue = myMap.get(hashKey);
      } else {
        returnedValue = originalMethod.apply(this, args);
        myMap.set(hashKey, returnedValue);
      }
    }
    return returnedValue;
  };
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class AlertsApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async deleteEntitiesSuppressedDevicesV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'deleteEntitiesSuppressedDevicesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  /**
   * @deprecated This method is deprecated. Use getQueriesAlertsV2 instead.
   */
  async getQueriesAlertsV1(urlParams = {}) {
    console.warn('This method is deprecated. Use getQueriesAlertsV2 instead.');
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'getQueriesAlertsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesAlertsV2(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'getQueriesAlertsV2',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  /**
   * @deprecated This method is deprecated. Use patchCombinedAlertsV3 instead.
   */
  async patchCombinedAlertsV2(postBody, urlParams = {}) {
    console.warn('This method is deprecated. Use patchCombinedAlertsV3 instead.');
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'patchCombinedAlertsV2',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchCombinedAlertsV3(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'patchCombinedAlertsV3',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  /**
   * @deprecated This method is deprecated. Use patchEntitiesAlertsV3 instead.
   */
  async patchEntitiesAlertsV2(postBody, urlParams = {}) {
    console.warn('This method is deprecated. Use patchEntitiesAlertsV3 instead.');
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'patchEntitiesAlertsV2',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchEntitiesAlertsV3(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'patchEntitiesAlertsV3',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchEntitiesSuppressedDevicesV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'patchEntitiesSuppressedDevicesV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  /**
   * @deprecated This method is deprecated. Use postAggregatesAlertsV2 instead.
   */
  async postAggregatesAlertsV1(postBody, urlParams = {}) {
    console.warn('This method is deprecated. Use postAggregatesAlertsV2 instead.');
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'postAggregatesAlertsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesAlertsV2(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'postAggregatesAlertsV2',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  /**
   * @deprecated This method is deprecated. Use postEntitiesAlertsV2 instead.
   */
  async postEntitiesAlertsV1(postBody, urlParams = {}) {
    console.warn('This method is deprecated. Use postEntitiesAlertsV2 instead.');
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'postEntitiesAlertsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesAlertsV2(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'postEntitiesAlertsV2',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesSuppressedDevicesV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'alerts',
      method: 'postEntitiesSuppressedDevicesV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class CustomobjectsApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async deleteV1CollectionsCollectionNameObjectsObjectKey(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'customobjects',
      method: 'deleteV1CollectionsCollectionNameObjectsObjectKey',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getV1Collections(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'customobjects',
      method: 'getV1Collections',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getV1CollectionsCollectionNameObjects(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'customobjects',
      method: 'getV1CollectionsCollectionNameObjects',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getV1CollectionsCollectionNameObjectsObjectKey(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'customobjects',
      method: 'getV1CollectionsCollectionNameObjectsObjectKey',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getV1CollectionsCollectionNameObjectsObjectKeyMetadata(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'customobjects',
      method: 'getV1CollectionsCollectionNameObjectsObjectKeyMetadata',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postV1CollectionsCollectionNameObjects(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'customobjects',
      method: 'postV1CollectionsCollectionNameObjects',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async putV1CollectionsCollectionNameObjectsObjectKey(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'customobjects',
      method: 'putV1CollectionsCollectionNameObjectsObjectKey',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class DetectsApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async getEntitiesSuppressedDevicesV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'detects',
      method: 'getEntitiesSuppressedDevicesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchEntitiesDetectsV2(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'detects',
      method: 'patchEntitiesDetectsV2',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchQueriesDetectsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'detects',
      method: 'patchQueriesDetectsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchQueriesDetectsV2(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'detects',
      method: 'patchQueriesDetectsV2',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesDetectsGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'detects',
      method: 'postAggregatesDetectsGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesSummariesGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'detects',
      method: 'postEntitiesSummariesGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesSuppressedDevicesV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'detects',
      method: 'postEntitiesSuppressedDevicesV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class DevicesApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async deleteEntitiesGroupsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'deleteEntitiesGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getAggregatesBucketsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getAggregatesBucketsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getAggregatesFgaTagPrefixCountsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getAggregatesFgaTagPrefixCountsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getAggregatesTagPrefixCountsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getAggregatesTagPrefixCountsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesFgaGroupsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getEntitiesFgaGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesGroupsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getEntitiesGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesAvailableGroupsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getQueriesAvailableGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesDevicesHiddenV2(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getQueriesDevicesHiddenV2',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesDevicesV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getQueriesDevicesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesDevicesV2(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getQueriesDevicesV2',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesFgaGroupsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getQueriesFgaGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesGroupsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'getQueriesGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchEntitiesDevicesTagsV2(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'patchEntitiesDevicesTagsV2',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchEntitiesGroupsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'patchEntitiesGroupsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesDevicesGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postAggregatesDevicesGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesFgaHostsGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postAggregatesFgaHostsGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postCombinedDevicesLoginHistoryV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postCombinedDevicesLoginHistoryV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postCombinedFgaHostsLoginHistoryV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postCombinedFgaHostsLoginHistoryV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesDevicesActionsV4(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postEntitiesDevicesActionsV4',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesDevicesHiddenActionsV4(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postEntitiesDevicesHiddenActionsV4',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesDevicesReportsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postEntitiesDevicesReportsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesDevicesV2(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postEntitiesDevicesV2',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesFgaHostsReportsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postEntitiesFgaHostsReportsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesFgaHostsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postEntitiesFgaHostsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesGroupActionsV1(postBody, urlParams) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postEntitiesGroupActionsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesGroupsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'devices',
      method: 'postEntitiesGroupsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class FaasGatewayApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async getEntitiesExecutionV1(urlParams) {
    const message = {
      type: 'api',
      api: 'faasGateway',
      method: 'getEntitiesExecutionV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesExecutionV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'faasGateway',
      method: 'postEntitiesExecutionV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class FwmgrApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async deleteEntitiesNetworkLocationsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'deleteEntitiesNetworkLocationsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async deleteEntitiesPoliciesV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'deleteEntitiesPoliciesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async deleteEntitiesRuleGroupsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'deleteEntitiesRuleGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesEventsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getEntitiesEventsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesFirewallFieldsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getEntitiesFirewallFieldsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesNetworkLocationsDetailsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getEntitiesNetworkLocationsDetailsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesNetworkLocationsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getEntitiesNetworkLocationsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesPlatformsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getEntitiesPlatformsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesPoliciesV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getEntitiesPoliciesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesRuleGroupsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getEntitiesRuleGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesRulesV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getEntitiesRulesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getLibraryEntitiesRuleGroupsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getLibraryEntitiesRuleGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getLibraryQueriesRuleGroupsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getLibraryQueriesRuleGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesEventsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getQueriesEventsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesFirewallFieldsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getQueriesFirewallFieldsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesNetworkLocationsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getQueriesNetworkLocationsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesPlatformsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getQueriesPlatformsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesPolicyRulesV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getQueriesPolicyRulesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesRuleGroupsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getQueriesRuleGroupsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesRulesV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'getQueriesRulesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchEntitiesNetworkLocationsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'patchEntitiesNetworkLocationsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async patchEntitiesRuleGroupsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'patchEntitiesRuleGroupsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesEventsGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postAggregatesEventsGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesPolicyRulesGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postAggregatesPolicyRulesGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesRuleGroupsGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postAggregatesRuleGroupsGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesRulesGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postAggregatesRulesGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesNetworkLocationsMetadataV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postEntitiesNetworkLocationsMetadataV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesNetworkLocationsPrecedenceV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postEntitiesNetworkLocationsPrecedenceV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesNetworkLocationsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postEntitiesNetworkLocationsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesOntologyV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postEntitiesOntologyV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesRuleGroupsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postEntitiesRuleGroupsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesRulesValidateFilepathV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'postEntitiesRulesValidateFilepathV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async putEntitiesNetworkLocationsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'putEntitiesNetworkLocationsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async putEntitiesPoliciesV2(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'fwmgr',
      method: 'putEntitiesPoliciesV2',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class IncidentsApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async getCombinedCrowdscoresV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'incidents',
      method: 'getCombinedCrowdscoresV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesBehaviorsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'incidents',
      method: 'getQueriesBehaviorsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesIncidentsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'incidents',
      method: 'getQueriesIncidentsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesBehaviorsGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'incidents',
      method: 'postAggregatesBehaviorsGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postAggregatesIncidentsGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'incidents',
      method: 'postAggregatesIncidentsGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesBehaviorsGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'incidents',
      method: 'postEntitiesBehaviorsGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesIncidentActionsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'incidents',
      method: 'postEntitiesIncidentActionsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesIncidentsGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'incidents',
      method: 'postEntitiesIncidentsGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class LoggingapiApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async getEntitiesSavedSearchesExecuteV1(urlParams) {
    const message = {
      type: 'api',
      api: 'loggingapi',
      method: 'getEntitiesSavedSearchesExecuteV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesSavedSearchesV1(urlParams) {
    const message = {
      type: 'api',
      api: 'loggingapi',
      method: 'getEntitiesSavedSearchesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesSavedSearchesExecuteV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'loggingapi',
      method: 'postEntitiesSavedSearchesExecuteV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class MitreApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async getIntelMitreEntitiesMatrixV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'mitre',
      method: 'getIntelMitreEntitiesMatrixV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class PluginsApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async getEntitiesConfigsV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'plugins',
      method: 'getEntitiesConfigsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesDefinitionsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'plugins',
      method: 'getEntitiesDefinitionsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesExecuteDraftV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'plugins',
      method: 'postEntitiesExecuteDraftV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesExecuteV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'plugins',
      method: 'postEntitiesExecuteV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class RemoteResponseApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async deleteEntitiesPutFilesV1(urlParams) {
    const message = {
      type: 'api',
      api: 'remoteResponse',
      method: 'deleteEntitiesPutFilesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesAppCommandV1(urlParams) {
    const message = {
      type: 'api',
      api: 'remoteResponse',
      method: 'getEntitiesAppCommandV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getEntitiesPutFilesV2(urlParams) {
    const message = {
      type: 'api',
      api: 'remoteResponse',
      method: 'getEntitiesPutFilesV2',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async getQueriesPutFilesV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'remoteResponse',
      method: 'getQueriesPutFilesV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesAppCommandV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'remoteResponse',
      method: 'postEntitiesAppCommandV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesAppSessionsV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'remoteResponse',
      method: 'postEntitiesAppSessionsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class UserManagementApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async getQueriesUsersV1(urlParams = {}) {
    const message = {
      type: 'api',
      api: 'userManagement',
      method: 'getQueriesUsersV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesUsersGetV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'userManagement',
      method: 'postEntitiesUsersGetV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class WorkflowsApiBridge {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  getBridge() {
    return this.bridge;
  }
  async getEntitiesExecutionResultsV1(urlParams) {
    const message = {
      type: 'api',
      api: 'workflows',
      method: 'getEntitiesExecutionResultsV1',
      payload: {
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesExecuteV1(postBody, urlParams = {}) {
    const message = {
      type: 'api',
      api: 'workflows',
      method: 'postEntitiesExecuteV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
  async postEntitiesExecutionActionsV1(postBody, urlParams) {
    const message = {
      type: 'api',
      api: 'workflows',
      method: 'postEntitiesExecutionActionsV1',
      payload: {
        body: postBody,
        params: urlParams
      }
    };
    return this.bridge.postMessage(message);
  }
}

/**
 *
 * This file is autogenerated.
 *
 * DO NOT EDIT DIRECTLY
 *
 **/
class FalconPublicApis {
  api;
  constructor(api) {
    this.api = api;
  }
  get alerts() {
    assertConnection(this.api);
    return new AlertsApiBridge(this.api.bridge);
  }
  get detects() {
    assertConnection(this.api);
    return new DetectsApiBridge(this.api.bridge);
  }
  get devices() {
    assertConnection(this.api);
    return new DevicesApiBridge(this.api.bridge);
  }
  get fwmgr() {
    assertConnection(this.api);
    return new FwmgrApiBridge(this.api.bridge);
  }
  get incidents() {
    assertConnection(this.api);
    return new IncidentsApiBridge(this.api.bridge);
  }
  get mitre() {
    assertConnection(this.api);
    return new MitreApiBridge(this.api.bridge);
  }
  /**
   * @internal
   */
  get plugins() {
    assertConnection(this.api);
    return new PluginsApiBridge(this.api.bridge);
  }
  get remoteResponse() {
    assertConnection(this.api);
    return new RemoteResponseApiBridge(this.api.bridge);
  }
  get userManagement() {
    assertConnection(this.api);
    return new UserManagementApiBridge(this.api.bridge);
  }
  get workflows() {
    assertConnection(this.api);
    return new WorkflowsApiBridge(this.api.bridge);
  }
  /**
   * @internal
   */
  get customobjects() {
    assertConnection(this.api);
    return new CustomobjectsApiBridge(this.api.bridge);
  }
  /**
   * @internal
   */
  get faasGateway() {
    assertConnection(this.api);
    return new FaasGatewayApiBridge(this.api.bridge);
  }
  /**
   * @internal
   */
  get loggingapi() {
    assertConnection(this.api);
    return new LoggingapiApiBridge(this.api.bridge);
  }
}
__decorate([Memoize()], FalconPublicApis.prototype, "alerts", null);
__decorate([Memoize()], FalconPublicApis.prototype, "detects", null);
__decorate([Memoize()], FalconPublicApis.prototype, "devices", null);
__decorate([Memoize()], FalconPublicApis.prototype, "fwmgr", null);
__decorate([Memoize()], FalconPublicApis.prototype, "incidents", null);
__decorate([Memoize()], FalconPublicApis.prototype, "mitre", null);
__decorate([Memoize()], FalconPublicApis.prototype, "plugins", null);
__decorate([Memoize()], FalconPublicApis.prototype, "remoteResponse", null);
__decorate([Memoize()], FalconPublicApis.prototype, "userManagement", null);
__decorate([Memoize()], FalconPublicApis.prototype, "workflows", null);
__decorate([Memoize()], FalconPublicApis.prototype, "customobjects", null);
__decorate([Memoize()], FalconPublicApis.prototype, "faasGateway", null);
__decorate([Memoize()], FalconPublicApis.prototype, "loggingapi", null);
class ApiIntegration {
  falcon;
  definition;
  constructor(falcon, definition) {
    this.falcon = falcon;
    this.definition = definition;
  }
  async execute({
    request
  } = {}) {
    return this.falcon.api.plugins.postEntitiesExecuteV1({
      resources: [{
        definition_id: this.definition.definitionId,
        operation_id: this.definition.operationId,
        request
      }]
    });
  }
}
class CloudFunction {
  falcon;
  definition;
  static GET = 'GET';
  static POST = 'POST';
  static PATCH = 'PATCH';
  static PUT = 'PUT';
  static DELETE = 'DELETE';
  /**
   * @internal
   */
  pollTimeout = 500;
  /**
   * @internal
   */
  intervalId;
  /**
   * @internal
   */
  constructor(falcon, definition) {
    this.falcon = falcon;
    this.definition = definition;
  }
  async execute({
    path,
    method,
    body,
    params
  }) {
    const functionDefinition = 'id' in this.definition ? {
      function_id: this.definition.id,
      function_version: this.definition.version
    } : {
      function_name: this.definition.name,
      function_version: this.definition.version
    };
    const result = await this.falcon.api.faasGateway.postEntitiesExecutionV1({
      ...functionDefinition,
      payload: {
        path,
        method,
        body,
        params
      }
    });
    return new Promise((resolve, reject) => {
      const execution = result?.resources?.[0];
      if (!execution?.execution_id) {
        reject(result?.errors);
      } else {
        this.pollForResult({
          resolve,
          reject,
          executionId: execution?.execution_id
        });
      }
    });
  }
  async getExecutionResult(executionId) {
    const resultResponse = await this.falcon.api.faasGateway.getEntitiesExecutionV1({
      id: executionId
    });
    const executionResult = resultResponse?.resources?.[0];
    return executionResult?.payload;
  }
  pollForResult({
    resolve,
    reject,
    executionId
  }) {
    let exceptionRetries = 2;
    this.intervalId = window.setInterval(async () => {
      try {
        const payload = await this.getExecutionResult(executionId);
        if (payload) {
          window.clearInterval(this.intervalId);
          resolve(payload);
        }
      } catch (e) {
        if (exceptionRetries <= 0) {
          window.clearInterval(this.intervalId);
          reject(e);
        }
        exceptionRetries--;
      }
    }, this.pollTimeout);
  }
  path(pathEntry) {
    const urlPath = new URL(pathEntry, 'http://localhost');
    const path = urlPath.pathname;
    const searchParams = [...urlPath.searchParams.entries()].reduce((acc, [key, value]) => ({
      ...acc,
      [key]: [value]
    }), {});
    return {
      path,
      queryParams: searchParams,
      get: async (params = {}) => {
        return this.get({
          path,
          params: {
            query: params?.query ?? searchParams ?? {},
            header: params?.header ?? {}
          }
        });
      },
      post: async (body, params = {}) => {
        return this.post({
          path,
          params: {
            query: params?.query ?? searchParams ?? {},
            header: params?.header ?? {}
          },
          body
        });
      },
      patch: async (body, params = {}) => {
        return this.patch({
          path,
          params: {
            query: params?.query ?? searchParams ?? {},
            header: params?.header ?? {}
          },
          body
        });
      },
      put: async (body, params = {}) => {
        return this.put({
          path,
          params: {
            query: params?.query ?? searchParams ?? {},
            header: params?.header ?? {}
          },
          body
        });
      },
      delete: async (body, params = {}) => {
        return this.delete({
          path,
          params: {
            query: params?.query ?? searchParams ?? {},
            header: params?.header ?? {}
          },
          body
        });
      }
    };
  }
  async get({
    path,
    params
  }) {
    return this.execute({
      path,
      method: CloudFunction.GET,
      params
    });
  }
  async post({
    path,
    params,
    body
  }) {
    return this.execute({
      path,
      method: CloudFunction.POST,
      body,
      params
    });
  }
  async patch({
    path,
    params,
    body
  }) {
    return this.execute({
      path,
      method: CloudFunction.PATCH,
      body,
      params
    });
  }
  async put({
    path,
    params,
    body
  }) {
    return this.execute({
      path,
      method: CloudFunction.PUT,
      body,
      params
    });
  }
  async delete({
    path,
    params,
    body
  }) {
    return this.execute({
      path,
      method: CloudFunction.DELETE,
      body,
      params
    });
  }
  destroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}
class Collection {
  falcon;
  definition;
  constructor(falcon, definition) {
    this.falcon = falcon;
    this.definition = definition;
  }
  /**
   * Write data to the collection
   *
   * @param key
   * @param data
   * @returns
   */
  async write(key, data) {
    return this.falcon.bridge.postMessage({
      type: 'collection',
      payload: {
        type: 'write',
        key,
        collection: this.definition.collection,
        data
      }
    });
  }
  /**
   * Read the data for the given `key`
   *
   * @param key
   * @returns
   */
  async read(key) {
    return this.falcon.bridge.postMessage({
      type: 'collection',
      payload: {
        type: 'read',
        key,
        collection: this.definition.collection
      }
    });
  }
  /**
   * Delete the data for the given `key`
   *
   * @param key
   * @returns
   */
  async delete(key) {
    return this.falcon.bridge.postMessage({
      type: 'collection',
      payload: {
        type: 'delete',
        key,
        collection: this.definition.collection
      }
    });
  }
  /**
   * Search for data
   *
   * @param searchDefinition
   * @returns
   */
  async search({
    filter,
    offset,
    sort,
    limit
  }) {
    return this.falcon.bridge.postMessage({
      type: 'collection',
      payload: {
        type: 'search',
        filter,
        limit,
        offset,
        sort,
        collection: this.definition.collection
      }
    });
  }
  /**
   * lists the object keys in the specified collection
   *
   * @param searchDefinition
   * @returns
   */
  async list(options) {
    return this.falcon.bridge.postMessage({
      type: 'collection',
      payload: {
        type: 'list',
        collection: this.definition.collection,
        start: options?.start,
        end: options?.end,
        limit: options?.limit
      }
    });
  }
}
class Logscale {
  falcon;
  constructor(falcon) {
    this.falcon = falcon;
  }
  /**
   * Write data to LogScale
   *
   * @param data
   * @param properties
   * @returns
   */
  async write(
  // @todo the proper type here is unclear  - we need to make clear how the user needs to call this
  data, properties) {
    return this.falcon.bridge.postMessage({
      type: 'loggingapi',
      payload: {
        type: 'ingest',
        data,
        tag: properties?.tag,
        tagSource: properties?.tagSource,
        testData: properties?.testData
      }
    });
  }
  /**
   * Execute a dynamic query
   *
   * @param query
   * @returns Promise that resolves with the data
   */
  async query(
  // @todo the proper type here is unclear  - we need to make clear how the user needs to call this
  query) {
    return this.falcon.bridge.postMessage({
      type: 'loggingapi',
      payload: {
        type: 'dynamic-execute',
        data: query
      }
    });
  }
  /**
   * Execute a saved query
   *
   * @param savedQuery
   * @returns
   */
  async savedQuery(
  // @todo the proper type here is unclear  - we need to make clear how the user needs to call this
  savedQuery) {
    return this.falcon.bridge.postMessage({
      type: 'loggingapi',
      payload: {
        type: 'saved-query-execute',
        data: savedQuery
      }
    });
  }
}
const ALLOWED_TARGETS = ['_self', '_blank'];
class Navigation {
  falcon;
  constructor(falcon) {
    this.falcon = falcon;
  }
  async navigateTo({
    path,
    type,
    target,
    metaKey,
    ctrlKey,
    shiftKey
  }) {
    await this.falcon.bridge.postMessage({
      type: 'navigateTo',
      payload: {
        path,
        type: type ?? 'falcon',
        target: target ?? '_self',
        metaKey: metaKey ?? false,
        ctrlKey: ctrlKey ?? false,
        shiftKey: shiftKey ?? false
      }
    });
  }
  async onClick(event, defaultTarget = '_self', defaultType = 'falcon') {
    if (!(event instanceof Event)) {
      throw Error('"event" property should be subclass of Event');
    }
    if (!('preventDefault' in event)) {
      return;
    }
    if (!(event.target instanceof HTMLAnchorElement)) {
      return;
    }
    event.preventDefault();
    const path = event.target.getAttribute('href');
    defaultTarget = event.target.getAttribute('target') ?? defaultTarget;
    const type = event.target.dataset?.type ?? defaultType;
    if (defaultTarget === null || !ALLOWED_TARGETS.includes(defaultTarget)) {
      throw new Error('Target should be _self or _blank');
    }
    const target = defaultTarget;
    if (path === undefined || path === null) {
      throw new Error('Navigation path is missing. Make sure you have added navigation.onClick on the `a` tag and `href` is present.');
    }
    const {
      metaKey,
      ctrlKey,
      shiftKey
    } = event;
    await this.navigateTo({
      path,
      type,
      target,
      metaKey,
      ctrlKey,
      shiftKey
    });
  }
}

/**
 * @internal
 */
class ResizeTracker {
  bridge;
  observer;
  constructor(bridge) {
    this.bridge = bridge;
    this.observer = new ResizeObserver(entries => this.handleResizeEvent(entries));
    this.observer.observe(document.body);
  }
  handleResizeEvent(entries) {
    const {
      height
    } = entries[0].contentRect;
    this.bridge.sendUnidirectionalMessage({
      type: 'resize',
      payload: {
        height
      }
    });
  }
  destroy() {
    this.observer.disconnect();
  }
}

/**
 * Invoke UI features within the main Falcon Console.
 */
class UI {
  bridge;
  constructor(bridge) {
    this.bridge = bridge;
  }
  /**
   * Open a modal within the Falcon Console, rendering an UI extension of your choice.
   *
   * ```js
   * const result = await api.ui.openModal({ id: '<extension ID as defined in the manifest>', type: 'extension' }, 'Modal title', {
      path: '/foo',
      data: { foo: 'bar' },
      size: 'lg',
      align: 'top',
    });
    ```
   *
   * @param extension The identifier of the extension, consisting of {@link ExtensionIdentifier.id} and {@link ExtensionIdentifier.type}
   * @param title The title to render in the header of the modal
   * @param options
   * @returns a Promise that resolves with the data passed to {@link closeModal}, or `undefined` if the user dismisses it
   */
  async openModal(extension, title, options = {}) {
    const result = await this.bridge.postMessage({
      type: 'openModal',
      payload: {
        extension,
        title,
        options
      }
    });
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }
  /**
   * Close a modal already opened via {@link openModal}. This can be called both by the extension that is rendered inside the modal or by the extension that opened the modal.
   *
   * @param payload the data to return to the caller that opened the modal as the value of the resolved promise
   */
  closeModal(payload) {
    this.bridge.sendUnidirectionalMessage({
      type: 'closeModal',
      payload
    });
  }
  /**
   * This opens a file upload modal inside the Falcon Console, to support file uploads, even large binary files.
   *
   * @param fileUploadType the type of file upload
   * @param initialData data that you want to pre-populate the form with
   */
  async uploadFile(fileUploadType, initialData) {
    return this.bridge.postMessage({
      type: 'fileUpload',
      fileUploadType,
      payload: initialData
    });
  }
}

/**
 * This is the main class and only entrypoint for engaging with the Falcon APIs from an Foundry UI extension or page.
 *
 * At the very minimum, you would have to instantiate the class and connect to the Falcon Console:
 *
 * ```js
 * import FalconApi from '@crowdstrike/foundry-js';
 *
 * const api = new FalconApi();
 *
 * await api.connect();
 * ```
 *
 */
class FalconApi {
  /**
   * @internal
   */
  isConnected = false;
  /**
   * An event emitter that allows you to subscribe to events issued by the Falcon Console.
   *
   * Currently supported event types:
   * * `data`: fires when {@link data} is updated.
   * * `broadcast`: this event is received when another extension of the same app has send a `broadcast` event via {@link sendBroadcast}.
   *
   * ```js
   * api.events.on('data', (newData) => console.log('new data received:', newData));
   * ```
   */
  events = new Emittery();
  /**
   * The "local data" that your extension receives from the Falcon Console. This can vary depending on the state of the Falcon Console and the socket of the extension.
   *
   * At the very least it will contain the data specified by the {@link LocalData} interface.
   */
  data;
  /**
   * @internal
   */
  bridge = new Bridge({
    onDataUpdate: data => this.handleDataUpdate(data),
    onBroadcast: msg => this.handleBroadcastMessage(msg),
    onLivereload: () => this.handleLivereloadMessage()
  });
  /**
   * Namespace for all the {@link FalconPublicApis | Falcon Cloud APIs} you have access to with this SDK.
   */
  api = new FalconPublicApis(this);
  /**
   * The {@link UI} class contains methods to invoke UI features within the main Falcon Console.
   */
  ui = new UI(this.bridge);
  resizeTracker;
  cloudFunctions = [];
  apiIntegrations = [];
  collections = [];
  /**
   * Connect to the main Falcon Console from within your UI extension.
   *
   * This establishes a connection to send messages between the extension and the Falcon Console. Only when established you will be able to call other APIs.
   */
  async connect() {
    const response = await this.bridge.postMessage({
      type: 'connect'
    });
    if (response !== undefined) {
      const {
        data,
        origin
      } = response;
      this.bridge.setOrigin(origin);
      this.data = data;
      this.updateTheme(data?.theme);
      this.isConnected = true;
    }
    this.resizeTracker = new ResizeTracker(this.bridge);
    return response;
  }
  /**
   * The ID of the Foundry app this UI extension belongs to.
   */
  get appId() {
    return this.data?.app.id;
  }
  /**
   * Sending broadcast messages is a mechanism for allowing communication between different UI extensions, when they are displayed at the same time.
   * When sending a broadcast message, other extensions need to listen for the `broadcast` event on the {@link events} event emitter.
   *
   * Note that broadcast messages are only dispatched between UI extensions of the same app!
   *
   * @param payload the data you want to send to other UI extensions
   */
  sendBroadcast(payload) {
    this.bridge.sendUnidirectionalMessage({
      type: 'broadcast',
      payload
    });
  }
  handleDataUpdate(dataMessage) {
    this.data = dataMessage.payload;
    this.updateTheme(this.data.theme);
    this.events.emit('data', this.data);
  }
  handleBroadcastMessage(message) {
    this.events.emit('broadcast', message.payload);
  }
  handleLivereloadMessage() {
    document.location.reload();
  }
  updateTheme(activeTheme) {
    if (!activeTheme) {
      return;
    }
    const inactiveTheme = activeTheme === 'theme-dark' ? 'theme-light' : 'theme-dark';
    document.documentElement.classList.add(activeTheme);
    document.documentElement.classList.remove(inactiveTheme);
  }
  /**
   * Create a {@link CloudFunction} to integrate with Falcon's "Function as a Service" platform.
   *
   * @param definition
   * @returns
   */
  cloudFunction(definition) {
    assertConnection(this);
    const cf = new CloudFunction(this, definition);
    this.cloudFunctions.push(cf);
    return cf;
  }
  /**
   * Create an {@link ApiIntegration} to call external APIs.
   *
   * @param defintition
   * @returns
   */
  apiIntegration({
    definitionId,
    operationId
  }) {
    assertConnection(this);
    if (!this.data) {
      throw Error('Data from console is missing');
    }
    const apiIntegration = new ApiIntegration(this, {
      operationId,
      definitionId: definitionId
    });
    this.apiIntegrations.push(apiIntegration);
    return apiIntegration;
  }
  /**
   * Create a {@link Collection} to write to and query Falcon's custom storage service.
   *
   * @param definition
   * @returns
   */
  collection({
    collection
  }) {
    assertConnection(this);
    const co = new Collection(this, {
      collection
    });
    this.collections.push(co);
    return co;
  }
  /**
   * The {@link Navigation} class provides functionality to navigate to other pages.
   */
  get navigation() {
    assertConnection(this);
    return new Navigation(this);
  }
  /**
   * The {@link Logscale} class allows you to read and write to your custom LogScale repository.
   */
  get logscale() {
    assertConnection(this);
    return new Logscale(this);
  }
  destroy() {
    this.cloudFunctions.forEach(cf => cf.destroy());
    this.resizeTracker?.destroy();
    this.bridge.destroy();
  }
}
__decorate([Memoize()], FalconApi.prototype, "navigation", null);
__decorate([Memoize()], FalconApi.prototype, "logscale", null);

const FalconApiContext = /*#__PURE__*/reactExports.createContext(null);
function useFalconApiContext() {
  const [isInitialized, setIsInitialized] = reactExports.useState(false);
  const falcon = reactExports.useMemo(() => new FalconApi(), []);
  const navigation = reactExports.useMemo(() => falcon.isConnected ? falcon.navigation : undefined, [falcon.isConnected]);
  reactExports.useEffect(() => {
    (async () => {
      await falcon.connect();
      setIsInitialized(true);
    })();
  }, []);
  return {
    falcon,
    navigation,
    isInitialized
  };
}

var dist = {};

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;

	Object.defineProperty(dist, "__esModule", {
	  value: true
	});
	dist.parse = parse;
	dist.serialize = serialize;
	/**
	 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
	 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
	 * which has been replaced by the token definition in RFC 7230 appendix B.
	 *
	 * cookie-name       = token
	 * token             = 1*tchar
	 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
	 *                     "*" / "+" / "-" / "." / "^" / "_" /
	 *                     "`" / "|" / "~" / DIGIT / ALPHA
	 *
	 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
	 * Allow same range as cookie value, except `=`, which delimits end of name.
	 */
	const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
	/**
	 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
	 *
	 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
	 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
	 *                     ; US-ASCII characters excluding CTLs,
	 *                     ; whitespace DQUOTE, comma, semicolon,
	 *                     ; and backslash
	 *
	 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
	 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
	 */
	const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
	/**
	 * RegExp to match domain-value in RFC 6265 sec 4.1.1
	 *
	 * domain-value      = <subdomain>
	 *                     ; defined in [RFC1034], Section 3.5, as
	 *                     ; enhanced by [RFC1123], Section 2.1
	 * <subdomain>       = <label> | <subdomain> "." <label>
	 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
	 *                     Labels must be 63 characters or less.
	 *                     'let-dig' not 'letter' in the first char, per RFC1123
	 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
	 * <let-dig-hyp>     = <let-dig> | "-"
	 * <let-dig>         = <letter> | <digit>
	 * <letter>          = any one of the 52 alphabetic characters A through Z in
	 *                     upper case and a through z in lower case
	 * <digit>           = any one of the ten digits 0 through 9
	 *
	 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
	 *
	 * > (Note that a leading %x2E ("."), if present, is ignored even though that
	 * character is not permitted, but a trailing %x2E ("."), if present, will
	 * cause the user agent to ignore the attribute.)
	 */
	const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
	/**
	 * RegExp to match path-value in RFC 6265 sec 4.1.1
	 *
	 * path-value        = <any CHAR except CTLs or ";">
	 * CHAR              = %x01-7F
	 *                     ; defined in RFC 5234 appendix B.1
	 */
	const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
	const __toString = Object.prototype.toString;
	const NullObject = /* @__PURE__ */(() => {
	  const C = function () {};
	  C.prototype = Object.create(null);
	  return C;
	})();
	/**
	 * Parse a cookie header.
	 *
	 * Parse the given cookie header string into an object
	 * The object has the various cookies as keys(names) => values
	 */
	function parse(str, options) {
	  const obj = new NullObject();
	  const len = str.length;
	  // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
	  if (len < 2) return obj;
	  const dec = options?.decode || decode;
	  let index = 0;
	  do {
	    const eqIdx = str.indexOf("=", index);
	    if (eqIdx === -1) break; // No more cookie pairs.
	    const colonIdx = str.indexOf(";", index);
	    const endIdx = colonIdx === -1 ? len : colonIdx;
	    if (eqIdx > endIdx) {
	      // backtrack on prior semicolon
	      index = str.lastIndexOf(";", eqIdx - 1) + 1;
	      continue;
	    }
	    const keyStartIdx = startIndex(str, index, eqIdx);
	    const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
	    const key = str.slice(keyStartIdx, keyEndIdx);
	    // only assign once
	    if (obj[key] === undefined) {
	      let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
	      let valEndIdx = endIndex(str, endIdx, valStartIdx);
	      const value = dec(str.slice(valStartIdx, valEndIdx));
	      obj[key] = value;
	    }
	    index = endIdx + 1;
	  } while (index < len);
	  return obj;
	}
	function startIndex(str, index, max) {
	  do {
	    const code = str.charCodeAt(index);
	    if (code !== 0x20 /*   */ && code !== 0x09 /* \t */) return index;
	  } while (++index < max);
	  return max;
	}
	function endIndex(str, index, min) {
	  while (index > min) {
	    const code = str.charCodeAt(--index);
	    if (code !== 0x20 /*   */ && code !== 0x09 /* \t */) return index + 1;
	  }
	  return min;
	}
	/**
	 * Serialize data into a cookie header.
	 *
	 * Serialize a name value pair into a cookie string suitable for
	 * http headers. An optional options object specifies cookie parameters.
	 *
	 * serialize('foo', 'bar', { httpOnly: true })
	 *   => "foo=bar; httpOnly"
	 */
	function serialize(name, val, options) {
	  const enc = options?.encode || encodeURIComponent;
	  if (!cookieNameRegExp.test(name)) {
	    throw new TypeError(`argument name is invalid: ${name}`);
	  }
	  const value = enc(val);
	  if (!cookieValueRegExp.test(value)) {
	    throw new TypeError(`argument val is invalid: ${val}`);
	  }
	  let str = name + "=" + value;
	  if (!options) return str;
	  if (options.maxAge !== undefined) {
	    if (!Number.isInteger(options.maxAge)) {
	      throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
	    }
	    str += "; Max-Age=" + options.maxAge;
	  }
	  if (options.domain) {
	    if (!domainValueRegExp.test(options.domain)) {
	      throw new TypeError(`option domain is invalid: ${options.domain}`);
	    }
	    str += "; Domain=" + options.domain;
	  }
	  if (options.path) {
	    if (!pathValueRegExp.test(options.path)) {
	      throw new TypeError(`option path is invalid: ${options.path}`);
	    }
	    str += "; Path=" + options.path;
	  }
	  if (options.expires) {
	    if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
	      throw new TypeError(`option expires is invalid: ${options.expires}`);
	    }
	    str += "; Expires=" + options.expires.toUTCString();
	  }
	  if (options.httpOnly) {
	    str += "; HttpOnly";
	  }
	  if (options.secure) {
	    str += "; Secure";
	  }
	  if (options.partitioned) {
	    str += "; Partitioned";
	  }
	  if (options.priority) {
	    const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : undefined;
	    switch (priority) {
	      case "low":
	        str += "; Priority=Low";
	        break;
	      case "medium":
	        str += "; Priority=Medium";
	        break;
	      case "high":
	        str += "; Priority=High";
	        break;
	      default:
	        throw new TypeError(`option priority is invalid: ${options.priority}`);
	    }
	  }
	  if (options.sameSite) {
	    const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
	    switch (sameSite) {
	      case true:
	      case "strict":
	        str += "; SameSite=Strict";
	        break;
	      case "lax":
	        str += "; SameSite=Lax";
	        break;
	      case "none":
	        str += "; SameSite=None";
	        break;
	      default:
	        throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
	    }
	  }
	  return str;
	}
	/**
	 * URL-decode string value. Optimized to skip native call when no %.
	 */
	function decode(str) {
	  if (str.indexOf("%") === -1) return str;
	  try {
	    return decodeURIComponent(str);
	  } catch (e) {
	    return str;
	  }
	}
	/**
	 * Determine if value is a Date.
	 */
	function isDate(val) {
	  return __toString.call(val) === "[object Date]";
	}
	return dist;
}

requireDist();

/**
 * react-router v7.6.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {}
  }
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i], decoded, allowPartial);
  }
  return matches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "") {
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`);
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true, `Index routes must not have child routes. Please remove all child routes from route path "${path}".`);
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    if (route.path === "" || !route.path?.includes("?")) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map(subpath => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(exploded => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = s => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ?
  // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] :
  // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo2, {
    paramName,
    isOptional
  }, index) => {
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo2[paramName] = void 0;
    } else {
      memo2[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo2;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`);
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map(v => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`);
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach(segment => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(path)}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = {
      ...toArg
    };
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;

// lib/router/router.ts
var validMutationMethodsArr = ["POST", "PUT", "PATCH", "DELETE"];
new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["GET", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
var DataRouterContext = /*#__PURE__*/reactExports.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = /*#__PURE__*/reactExports.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var ViewTransitionContext = /*#__PURE__*/reactExports.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = /*#__PURE__*/reactExports.createContext(/* @__PURE__ */new Map());
FetchersContext.displayName = "Fetchers";
var AwaitContext = /*#__PURE__*/reactExports.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = /*#__PURE__*/reactExports.createContext(null);
NavigationContext.displayName = "Navigation";
var LocationContext = /*#__PURE__*/reactExports.createContext(null);
LocationContext.displayName = "Location";
var RouteContext = /*#__PURE__*/reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = /*#__PURE__*/reactExports.createContext(null);
RouteErrorContext.displayName = "RouteError";
function useHref(to, {
  relative
} = {}) {
  invariant(useInRouterContext(),
  // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  `useHref() may be used only in the context of a <Router> component.`);
  let {
    basename,
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(useInRouterContext(),
  // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  `useLocation() may be used only in the context of a <Router> component.`);
  return reactExports.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(useInRouterContext(),
  // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  `useNavigate() may be used only in the context of a <Router> component.`);
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename,
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback((to, options = {}) => {
    warning(activeRef.current, navigateEffectWarning);
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
function useResolvedPath(to, {
  relative
} = {}) {
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return reactExports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(thisRoute.route.id, `${hookName} can only be used on routes that contain a unique "id"`);
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId("useRouteId" /* UseRouteId */);
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext("useNavigate" /* UseNavigateStable */);
  let id = useCurrentRouteId("useNavigate" /* UseNavigateStable */);
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(async (to, options = {}) => {
    warning(activeRef.current, navigateEffectWarning);
    if (!activeRef.current) return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      await router.navigate(to, {
        fromRouteId: id,
        ...options
      });
    }
  }, [router, id]);
  return navigate;
}

// lib/dom/dom.ts
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && (
  // Ignore everything but left clicks
  !target || target === "_self") &&
  // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(document.createElement("form"),
      // @ts-expect-error if FormData supports the submitter parameter, this will throw
      0);
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(false, `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`);
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}

// lib/dom/ssr/invariant.ts
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}

// lib/dom/ssr/routeModules.ts
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(/* @vite-ignore */
    /* webpackIgnore: true */
    route.module);
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(`Error loading route module \`${route.module}\`, reloading page...`);
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode &&
    // @ts-expect-error
    import.meta.hot) {
      throw error;
    }
    window.location.reload();
    return new Promise(() => {});
  }
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(matches.map(async match => {
    let route = manifest.routes[match.route.id];
    if (route) {
      let mod = await loadRouteModule(route, routeModules);
      return mod.links ? mod.links() : [];
    }
    return [];
  }));
  return dedupeLinkDescriptors(links.flat(1).filter(isHtmlLinkDescriptor).filter(link => link.rel === "stylesheet" || link.rel === "preload").map(link => link.rel === "stylesheet" ? {
    ...link,
    rel: "prefetch",
    as: "style"
  } : {
    ...link,
    rel: "prefetch"
  }));
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname ||
      // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter((match, index) => isNew(match, index) || matchPathChanged(match, index));
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
          currentParams: currentMatches[0]?.params || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, {
  includeHydrateFallback
} = {}) {
  return dedupeHrefs(matches.map(match => {
    let route = manifest.routes[match.route.id];
    if (!route) return [];
    let hrefs = [route.module];
    if (route.clientActionModule) {
      hrefs = hrefs.concat(route.clientActionModule);
    }
    if (route.clientLoaderModule) {
      hrefs = hrefs.concat(route.clientLoaderModule);
    }
    if (includeHydrateFallback && route.hydrateFallbackModule) {
      hrefs = hrefs.concat(route.hydrateFallbackModule);
    }
    if (route.imports) {
      hrefs = hrefs.concat(route.imports);
    }
    return hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */new Set();
  new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({
        key,
        link: descriptor
      });
    }
    return deduped;
  }, []);
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var NO_BODY_STATUS_CODES = /* @__PURE__ */new Set([100, 101, 204, 205]);
function singleFetchUrl(reqUrl, basename) {
  let url = typeof reqUrl === "string" ? new URL(reqUrl,
  // This can be called during the SSR flow via PrefetchPageLinksImpl so
  // don't assume window is available
  typeof window === "undefined" ? "server://singlefetch/" : window.location.origin) : reqUrl;
  if (url.pathname === "/") {
    url.pathname = "_root.data";
  } else if (basename && stripBasename(url.pathname, basename) === "/") {
    url.pathname = `${basename.replace(/\/$/, "")}/_root.data`;
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.data`;
  }
  return url;
}

// lib/dom/ssr/components.tsx
function useDataRouterContext2() {
  let context = reactExports.useContext(DataRouterContext);
  invariant2(context, "You must render this element inside a <DataRouterContext.Provider> element");
  return context;
}
function useDataRouterStateContext() {
  let context = reactExports.useContext(DataRouterStateContext);
  invariant2(context, "You must render this element inside a <DataRouterStateContext.Provider> element");
  return context;
}
var FrameworkContext = /*#__PURE__*/reactExports.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = reactExports.useContext(FrameworkContext);
  invariant2(context, "You must render this element inside a <HydratedRouter> element");
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = reactExports.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = reactExports.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = reactExports.useState(false);
  let {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps;
  let ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = entries => {
        entries.forEach(entry => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, {
        threshold: 0.5
      });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  reactExports.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [shouldPrefetch, ref, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return event => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    router
  } = useDataRouterContext2();
  let matches = reactExports.useMemo(() => matchRoutes(router.routes, page, router.basename), [router.routes, page, router.basename]);
  if (!matches) {
    return null;
  }
  return /* @__PURE__ */reactExports.createElement(PrefetchPageLinksImpl, {
    page,
    matches,
    ...dataLinkProps
  });
}
function useKeyedPrefetchLinks(matches) {
  let {
    manifest,
    routeModules
  } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(links => {
      if (!interrupted) {
        setKeyedPrefetchLinks(links);
      }
    });
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let {
    manifest,
    routeModules
  } = useFrameworkContext();
  let {
    basename
  } = useDataRouterContext2();
  let {
    loaderData,
    matches
  } = useDataRouterStateContext();
  let newMatchesForData = reactExports.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [page, nextMatches, matches, manifest, location]);
  let newMatchesForAssets = reactExports.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [page, nextMatches, matches, manifest, location]);
  let dataHrefs = reactExports.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach(m => {
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some(m2 => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(page, basename);
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set("_routes", nextMatches.filter(m => routesParams.has(m.route.id)).map(m => m.route.id).join(","));
    }
    return [url.pathname + url.search];
  }, [basename, loaderData, location, manifest, newMatchesForData, nextMatches, page, routeModules]);
  let moduleHrefs = reactExports.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]);
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */reactExports.createElement(reactExports.Fragment, null, dataHrefs.map(href2 => /* @__PURE__ */reactExports.createElement("link", {
    key: href2,
    rel: "prefetch",
    as: "fetch",
    href: href2,
    ...linkProps
  })), moduleHrefs.map(href2 => /* @__PURE__ */reactExports.createElement("link", {
    key: href2,
    rel: "modulepreload",
    href: href2,
    ...linkProps
  })), keyedPrefetchLinks.map(({
    key,
    link
  }) =>
  // these don't spread `linkProps` because they are full link descriptors
  // already with their own props
  /* @__PURE__ */
  reactExports.createElement("link", {
    key,
    ...link
  })));
}
function mergeRefs(...refs) {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

// lib/dom/lib.tsx
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser) {
    window.__reactRouterVersion = "7.6.1";
  }
} catch (e) {}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link$1 = /*#__PURE__*/reactExports.forwardRef(function LinkWithRef({
  onClick,
  discover = "render",
  prefetch = "none",
  relative,
  reloadDocument,
  replace: replace2,
  state,
  target,
  to,
  preventScrollReset,
  viewTransition,
  ...rest
}, forwardedRef) {
  let {
    basename
  } = reactExports.useContext(NavigationContext);
  let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && isAbsolute) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        warning(false, `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`);
      }
    }
  }
  let href2 = useHref(to, {
    relative
  });
  let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(prefetch, rest);
  let internalOnClick = useLinkClickHandler(to, {
    replace: replace2,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  let link =
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  /* @__PURE__ */
  reactExports.createElement("a", {
    ...rest,
    ...prefetchHandlers,
    href: absoluteHref || href2,
    onClick: isExternal || reloadDocument ? onClick : handleClick,
    ref: mergeRefs(forwardedRef, prefetchRef),
    target,
    "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
  });
  return shouldPrefetch && !isAbsolute ? /* @__PURE__ */reactExports.createElement(reactExports.Fragment, null, link, /* @__PURE__ */reactExports.createElement(PrefetchPageLinks, {
    page: href2
  })) : link;
});
Link$1.displayName = "Link";
var NavLink = /*#__PURE__*/reactExports.forwardRef(function NavLinkWithRef({
  "aria-current": ariaCurrentProp = "page",
  caseSensitive = false,
  className: classNameProp = "",
  end = false,
  style: styleProp,
  to,
  viewTransition,
  children,
  ...rest
}, ref) {
  let path = useResolvedPath(to, {
    relative: rest.relative
  });
  let location = useLocation();
  let routerState = reactExports.useContext(DataRouterStateContext);
  let {
    navigator,
    basename
  } = reactExports.useContext(NavigationContext);
  let isTransitioning = routerState != null &&
  // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && viewTransition === true;
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
  }
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /* @__PURE__ */reactExports.createElement(Link$1, {
    ...rest,
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to,
    viewTransition
  }, typeof children === "function" ? children(renderProps) : children);
});
NavLink.displayName = "NavLink";
var Form = /*#__PURE__*/reactExports.forwardRef(({
  discover = "render",
  fetcherKey,
  navigate,
  reloadDocument,
  replace: replace2,
  state,
  method = defaultMethod,
  action,
  onSubmit,
  relative,
  preventScrollReset,
  viewTransition,
  ...props
}, forwardedRef) => {
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
  let submitHandler = event => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = submitter?.getAttribute("formmethod") || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace: replace2,
      state,
      relative,
      preventScrollReset,
      viewTransition
    });
  };
  return /* @__PURE__ */reactExports.createElement("form", {
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler,
    ...props,
    "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
  });
});
Form.displayName = "Form";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  state,
  preventScrollReset,
  relative,
  viewTransition
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return reactExports.useCallback(event => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace: replace2,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let {
    router
  } = useDataRouterContext3("useSubmit" /* UseSubmit */);
  let {
    basename
  } = reactExports.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return reactExports.useCallback(async (target, options = {}) => {
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      await router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        flushSync: options.flushSync
      });
    } else {
      await router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        flushSync: options.flushSync,
        viewTransition: options.viewTransition
      });
    }
  }, [router, basename, currentRouteId]);
}
function useFormAction(action, {
  relative
} = {}) {
  let {
    basename
  } = reactExports.useContext(NavigationContext);
  let routeContext = reactExports.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = {
    ...useResolvedPath(action ? action : ".", {
      relative
    })
  };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some(v => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter(v => v).forEach(v => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, opts = {}) {
  let vtContext = reactExports.useContext(ViewTransitionContext);
  invariant(vtContext != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename
  } = useDataRouterContext3("useViewTransitionState" /* useViewTransitionState */);
  let path = useResolvedPath(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}

// lib/server-runtime/single-fetch.ts
/* @__PURE__ */new Set([...NO_BODY_STATUS_CODES, 304]);

var reactDom = {exports: {}};

var reactDom_production = {};

/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactDom_production;

function requireReactDom_production () {
	if (hasRequiredReactDom_production) return reactDom_production;
	hasRequiredReactDom_production = 1;

	var React = requireReact();
	function formatProdErrorMessage(code) {
	  var url = "https://react.dev/errors/" + code;
	  if (1 < arguments.length) {
	    url += "?args[]=" + encodeURIComponent(arguments[1]);
	    for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
	  }
	  return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
	    d: {
	      f: noop,
	      r: function () {
	        throw Error(formatProdErrorMessage(522));
	      },
	      D: noop,
	      C: noop,
	      L: noop,
	      m: noop,
	      X: noop,
	      S: noop,
	      M: noop
	    },
	    p: 0,
	    findDOMNode: null
	  },
	  REACT_PORTAL_TYPE = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
	  var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
	  return {
	    $$typeof: REACT_PORTAL_TYPE,
	    key: null == key ? null : "" + key,
	    children: children,
	    containerInfo: containerInfo,
	    implementation: implementation
	  };
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
	  if ("font" === as) return "";
	  if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	reactDom_production.createPortal = function (children, container) {
	  var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
	  if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
	  return createPortal$1(children, container, null, key);
	};
	reactDom_production.flushSync = function (fn) {
	  var previousTransition = ReactSharedInternals.T,
	    previousUpdatePriority = Internals.p;
	  try {
	    if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
	  } finally {
	    ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
	  }
	};
	reactDom_production.preconnect = function (href, options) {
	  "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	reactDom_production.prefetchDNS = function (href) {
	  "string" === typeof href && Internals.d.D(href);
	};
	reactDom_production.preinit = function (href, options) {
	  if ("string" === typeof href && options && "string" === typeof options.as) {
	    var as = options.as,
	      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
	      integrity = "string" === typeof options.integrity ? options.integrity : void 0,
	      fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
	    "style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
	      crossOrigin: crossOrigin,
	      integrity: integrity,
	      fetchPriority: fetchPriority
	    }) : "script" === as && Internals.d.X(href, {
	      crossOrigin: crossOrigin,
	      integrity: integrity,
	      fetchPriority: fetchPriority,
	      nonce: "string" === typeof options.nonce ? options.nonce : void 0
	    });
	  }
	};
	reactDom_production.preinitModule = function (href, options) {
	  if ("string" === typeof href) if ("object" === typeof options && null !== options) {
	    if (null == options.as || "script" === options.as) {
	      var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
	      Internals.d.M(href, {
	        crossOrigin: crossOrigin,
	        integrity: "string" === typeof options.integrity ? options.integrity : void 0,
	        nonce: "string" === typeof options.nonce ? options.nonce : void 0
	      });
	    }
	  } else null == options && Internals.d.M(href);
	};
	reactDom_production.preload = function (href, options) {
	  if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
	    var as = options.as,
	      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
	    Internals.d.L(href, as, {
	      crossOrigin: crossOrigin,
	      integrity: "string" === typeof options.integrity ? options.integrity : void 0,
	      nonce: "string" === typeof options.nonce ? options.nonce : void 0,
	      type: "string" === typeof options.type ? options.type : void 0,
	      fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
	      referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
	      imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
	      imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
	      media: "string" === typeof options.media ? options.media : void 0
	    });
	  }
	};
	reactDom_production.preloadModule = function (href, options) {
	  if ("string" === typeof href) if (options) {
	    var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
	    Internals.d.m(href, {
	      as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
	      crossOrigin: crossOrigin,
	      integrity: "string" === typeof options.integrity ? options.integrity : void 0
	    });
	  } else Internals.d.m(href);
	};
	reactDom_production.requestFormReset = function (form) {
	  Internals.d.r(form);
	};
	reactDom_production.unstable_batchedUpdates = function (fn, a) {
	  return fn(a);
	};
	reactDom_production.useFormState = function (action, initialState, permalink) {
	  return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	reactDom_production.useFormStatus = function () {
	  return ReactSharedInternals.H.useHostTransitionStatus();
	};
	reactDom_production.version = "19.1.0";
	return reactDom_production;
}

var hasRequiredReactDom;

function requireReactDom () {
	if (hasRequiredReactDom) return reactDom.exports;
	hasRequiredReactDom = 1;

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
	    return;
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}
	{
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  reactDom.exports = requireReactDom_production();
	}
	return reactDom.exports;
}

function Link({
  children,
  useFalconNavigation = false,
  to
}) {
  const {
    navigation
  } = reactExports.useContext(FalconApiContext);
  if (useFalconNavigation) {
    return /*#__PURE__*/React.createElement("a", {
      onClick: navigation.onClick,
      href: to
    }, children);
  }
  return /*#__PURE__*/React.createElement(Link$1, {
    to: to
  }, children);
}

function Home() {
  const {
    falcon
  } = reactExports.useContext(FalconApiContext);

  // Extract user's first name from the username (assuming format: firstname.lastname)
  const username = falcon?.data?.user?.username || '';
  const firstName = username.split('.')[0] || '';
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const [name, setName] = reactExports.useState(capitalizedFirstName);
  const [greeting, setGreeting] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const fetchGreeting = async () => {
    if (!name.trim()) {
      setError("Please enter a name first");
      return;
    }
    try {
      setLoading(true);
      setError(null);

      // Call the Hello function
      const helloFunction = falcon.cloudFunction({
        name: 'Hello'
      });
      const response = await helloFunction.path('/hello').post({
        name: name
      });
      if (!response.ok) {
        throw new Error(`Function call failed: ${response.status} ${response.statusText}`);
      }
      const responseData = await response.json();

      // Set the greeting from the response
      setGreeting(responseData.greeting);
    } catch (error) {
      console.error('Error calling Hello function:', error);
      setError(`Error: ${error.message || 'Failed to get greeting'}`);
      setGreeting(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press in the input field
  const handleKeyPress = async e => {
    if (e.key === 'Enter') {
      await fetchGreeting();
    }
  };
  return /*#__PURE__*/React.createElement("sl-card", null, /*#__PURE__*/React.createElement("div", {
    slot: "header"
  }, /*#__PURE__*/React.createElement("strong", null, "Foundry Functions Demo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-primary"
  }, "\uD83D\uDC4B Hello, ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--sl-color-primary-300)',
      padding: '0 4px'
    }
  }, "\u2728", username, "\u2728"), "!"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name-input",
    style: {
      display: 'block',
      marginBottom: '8px'
    }
  }, "What name do you want to send to the function?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("sl-input", {
    id: "name-input",
    placeholder: "Enter your name",
    value: name,
    onSlInput: e => setName(e.target.value),
    onKeyDown: handleKeyPress,
    clearable: true,
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("sl-button", {
    variant: "primary",
    onClick: fetchGreeting,
    disabled: loading
  }, loading ? /*#__PURE__*/React.createElement("sl-spinner", null) : /*#__PURE__*/React.createElement("sl-icon", {
    name: "chat-square-text",
    slot: "prefix"
  }), "Say Hello"))), error && /*#__PURE__*/React.createElement("sl-alert", {
    variant: "danger",
    open: true
  }, /*#__PURE__*/React.createElement("sl-icon", {
    slot: "icon",
    name: "exclamation-triangle"
  }), error), greeting && /*#__PURE__*/React.createElement("sl-card", {
    style: {
      background: 'var(--sl-color-neutral-50)',
      border: '1px solid var(--sl-color-neutral-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("sl-icon", {
    name: "chat-square-heart",
    style: {
      marginRight: '8px'
    }
  }), greeting)), /*#__PURE__*/React.createElement("sl-divider", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: '8px'
    }
  }, "Explore more Falcon features:"), /*#__PURE__*/React.createElement(Link, {
    useFalconNavigation: true,
    to: "/cloud-security"
  }, /*#__PURE__*/React.createElement("sl-button", {
    variant: "neutral",
    size: "small"
  }, /*#__PURE__*/React.createElement("sl-icon", {
    slot: "prefix",
    name: "cloudy"
  }), "Cloud Security")), /*#__PURE__*/React.createElement(Link, {
    useFalconNavigation: true,
    to: "/unified-detections"
  }, /*#__PURE__*/React.createElement("sl-button", {
    variant: "neutral",
    size: "small",
    style: {
      marginLeft: '8px'
    }
  }, /*#__PURE__*/React.createElement("sl-icon", {
    slot: "prefix",
    name: "database"
  }), "Next-Gen SIEM")))), /*#__PURE__*/React.createElement("div", {
    slot: "footer"
  }, /*#__PURE__*/React.createElement("small", null, "Powered by Falcon Foundry")));
}

var client = {exports: {}};

var reactDomClient_production = {};

var scheduler = {exports: {}};

var scheduler_production = {};

/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredScheduler_production;

function requireScheduler_production () {
	if (hasRequiredScheduler_production) return scheduler_production;
	hasRequiredScheduler_production = 1;
	(function (exports) {

		function push(heap, node) {
		  var index = heap.length;
		  heap.push(node);
		  a: for (; 0 < index;) {
		    var parentIndex = index - 1 >>> 1,
		      parent = heap[parentIndex];
		    if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;else break a;
		  }
		}
		function peek(heap) {
		  return 0 === heap.length ? null : heap[0];
		}
		function pop(heap) {
		  if (0 === heap.length) return null;
		  var first = heap[0],
		    last = heap.pop();
		  if (last !== first) {
		    heap[0] = last;
		    a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength;) {
		      var leftIndex = 2 * (index + 1) - 1,
		        left = heap[leftIndex],
		        rightIndex = leftIndex + 1,
		        right = heap[rightIndex];
		      if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;else break a;
		    }
		  }
		  return first;
		}
		function compare(a, b) {
		  var diff = a.sortIndex - b.sortIndex;
		  return 0 !== diff ? diff : a.id - b.id;
		}
		exports.unstable_now = void 0;
		if ("object" === typeof performance && "function" === typeof performance.now) {
		  var localPerformance = performance;
		  exports.unstable_now = function () {
		    return localPerformance.now();
		  };
		} else {
		  var localDate = Date,
		    initialTime = localDate.now();
		  exports.unstable_now = function () {
		    return localDate.now() - initialTime;
		  };
		}
		var taskQueue = [],
		  timerQueue = [],
		  taskIdCounter = 1,
		  currentTask = null,
		  currentPriorityLevel = 3,
		  isPerformingWork = false,
		  isHostCallbackScheduled = false,
		  isHostTimeoutScheduled = false,
		  needsPaint = false,
		  localSetTimeout = "function" === typeof setTimeout ? setTimeout : null,
		  localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null,
		  localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
		function advanceTimers(currentTime) {
		  for (var timer = peek(timerQueue); null !== timer;) {
		    if (null === timer.callback) pop(timerQueue);else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);else break;
		    timer = peek(timerQueue);
		  }
		}
		function handleTimeout(currentTime) {
		  isHostTimeoutScheduled = false;
		  advanceTimers(currentTime);
		  if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());else {
		    var firstTimer = peek(timerQueue);
		    null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
		  }
		}
		var isMessageLoopRunning = false,
		  taskTimeoutID = -1,
		  frameInterval = 5,
		  startTime = -1;
		function shouldYieldToHost() {
		  return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
		}
		function performWorkUntilDeadline() {
		  needsPaint = false;
		  if (isMessageLoopRunning) {
		    var currentTime = exports.unstable_now();
		    startTime = currentTime;
		    var hasMoreWork = true;
		    try {
		      a: {
		        isHostCallbackScheduled = !1;
		        isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
		        isPerformingWork = !0;
		        var previousPriorityLevel = currentPriorityLevel;
		        try {
		          b: {
		            advanceTimers(currentTime);
		            for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());) {
		              var callback = currentTask.callback;
		              if ("function" === typeof callback) {
		                currentTask.callback = null;
		                currentPriorityLevel = currentTask.priorityLevel;
		                var continuationCallback = callback(currentTask.expirationTime <= currentTime);
		                currentTime = exports.unstable_now();
		                if ("function" === typeof continuationCallback) {
		                  currentTask.callback = continuationCallback;
		                  advanceTimers(currentTime);
		                  hasMoreWork = !0;
		                  break b;
		                }
		                currentTask === peek(taskQueue) && pop(taskQueue);
		                advanceTimers(currentTime);
		              } else pop(taskQueue);
		              currentTask = peek(taskQueue);
		            }
		            if (null !== currentTask) hasMoreWork = !0;else {
		              var firstTimer = peek(timerQueue);
		              null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
		              hasMoreWork = !1;
		            }
		          }
		          break a;
		        } finally {
		          currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
		        }
		        hasMoreWork = void 0;
		      }
		    } finally {
		      hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
		    }
		  }
		}
		var schedulePerformWorkUntilDeadline;
		if ("function" === typeof localSetImmediate) schedulePerformWorkUntilDeadline = function () {
		  localSetImmediate(performWorkUntilDeadline);
		};else if ("undefined" !== typeof MessageChannel) {
		  var channel = new MessageChannel(),
		    port = channel.port2;
		  channel.port1.onmessage = performWorkUntilDeadline;
		  schedulePerformWorkUntilDeadline = function () {
		    port.postMessage(null);
		  };
		} else schedulePerformWorkUntilDeadline = function () {
		  localSetTimeout(performWorkUntilDeadline, 0);
		};
		function requestHostTimeout(callback, ms) {
		  taskTimeoutID = localSetTimeout(function () {
		    callback(exports.unstable_now());
		  }, ms);
		}
		exports.unstable_IdlePriority = 5;
		exports.unstable_ImmediatePriority = 1;
		exports.unstable_LowPriority = 4;
		exports.unstable_NormalPriority = 3;
		exports.unstable_Profiling = null;
		exports.unstable_UserBlockingPriority = 2;
		exports.unstable_cancelCallback = function (task) {
		  task.callback = null;
		};
		exports.unstable_forceFrameRate = function (fps) {
		  0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
		};
		exports.unstable_getCurrentPriorityLevel = function () {
		  return currentPriorityLevel;
		};
		exports.unstable_next = function (eventHandler) {
		  switch (currentPriorityLevel) {
		    case 1:
		    case 2:
		    case 3:
		      var priorityLevel = 3;
		      break;
		    default:
		      priorityLevel = currentPriorityLevel;
		  }
		  var previousPriorityLevel = currentPriorityLevel;
		  currentPriorityLevel = priorityLevel;
		  try {
		    return eventHandler();
		  } finally {
		    currentPriorityLevel = previousPriorityLevel;
		  }
		};
		exports.unstable_requestPaint = function () {
		  needsPaint = true;
		};
		exports.unstable_runWithPriority = function (priorityLevel, eventHandler) {
		  switch (priorityLevel) {
		    case 1:
		    case 2:
		    case 3:
		    case 4:
		    case 5:
		      break;
		    default:
		      priorityLevel = 3;
		  }
		  var previousPriorityLevel = currentPriorityLevel;
		  currentPriorityLevel = priorityLevel;
		  try {
		    return eventHandler();
		  } finally {
		    currentPriorityLevel = previousPriorityLevel;
		  }
		};
		exports.unstable_scheduleCallback = function (priorityLevel, callback, options) {
		  var currentTime = exports.unstable_now();
		  "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
		  switch (priorityLevel) {
		    case 1:
		      var timeout = -1;
		      break;
		    case 2:
		      timeout = 250;
		      break;
		    case 5:
		      timeout = 1073741823;
		      break;
		    case 4:
		      timeout = 1e4;
		      break;
		    default:
		      timeout = 5e3;
		  }
		  timeout = options + timeout;
		  priorityLevel = {
		    id: taskIdCounter++,
		    callback: callback,
		    priorityLevel: priorityLevel,
		    startTime: options,
		    expirationTime: timeout,
		    sortIndex: -1
		  };
		  options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
		  return priorityLevel;
		};
		exports.unstable_shouldYield = shouldYieldToHost;
		exports.unstable_wrapCallback = function (callback) {
		  var parentPriorityLevel = currentPriorityLevel;
		  return function () {
		    var previousPriorityLevel = currentPriorityLevel;
		    currentPriorityLevel = parentPriorityLevel;
		    try {
		      return callback.apply(this, arguments);
		    } finally {
		      currentPriorityLevel = previousPriorityLevel;
		    }
		  };
		}; 
	} (scheduler_production));
	return scheduler_production;
}

var hasRequiredScheduler;

function requireScheduler () {
	if (hasRequiredScheduler) return scheduler.exports;
	hasRequiredScheduler = 1;

	{
	  scheduler.exports = requireScheduler_production();
	}
	return scheduler.exports;
}

/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactDomClient_production;

function requireReactDomClient_production () {
	if (hasRequiredReactDomClient_production) return reactDomClient_production;
	hasRequiredReactDomClient_production = 1;
var Scheduler=requireScheduler(),React=requireReact(),ReactDOM=requireReactDom();function formatProdErrorMessage(code){var url="https://react.dev/errors/"+code;if(1<arguments.length){url+="?args[]="+encodeURIComponent(arguments[1]);for(var i=2;i<arguments.length;i++)url+="&args[]="+encodeURIComponent(arguments[i]);}return "Minified React error #"+code+"; visit "+url+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";}function isValidContainer(node){return !(!node||1!==node.nodeType&&9!==node.nodeType&&11!==node.nodeType);}function getNearestMountedFiber(fiber){var node=fiber,nearestMounted=fiber;if(fiber.alternate)for(;node.return;)node=node.return;else {fiber=node;do node=fiber,0!==(node.flags&4098)&&(nearestMounted=node.return),fiber=node.return;while(fiber);}return 3===node.tag?nearestMounted:null;}function getSuspenseInstanceFromFiber(fiber){if(13===fiber.tag){var suspenseState=fiber.memoizedState;null===suspenseState&&(fiber=fiber.alternate,null!==fiber&&(suspenseState=fiber.memoizedState));if(null!==suspenseState)return suspenseState.dehydrated;}return null;}function assertIsMounted(fiber){if(getNearestMountedFiber(fiber)!==fiber)throw Error(formatProdErrorMessage(188));}function findCurrentFiberUsingSlowPath(fiber){var alternate=fiber.alternate;if(!alternate){alternate=getNearestMountedFiber(fiber);if(null===alternate)throw Error(formatProdErrorMessage(188));return alternate!==fiber?null:fiber;}for(var a=fiber,b=alternate;;){var parentA=a.return;if(null===parentA)break;var parentB=parentA.alternate;if(null===parentB){b=parentA.return;if(null!==b){a=b;continue;}break;}if(parentA.child===parentB.child){for(parentB=parentA.child;parentB;){if(parentB===a)return assertIsMounted(parentA),fiber;if(parentB===b)return assertIsMounted(parentA),alternate;parentB=parentB.sibling;}throw Error(formatProdErrorMessage(188));}if(a.return!==b.return)a=parentA,b=parentB;else {for(var didFindChild=false,child$0=parentA.child;child$0;){if(child$0===a){didFindChild=true;a=parentA;b=parentB;break;}if(child$0===b){didFindChild=true;b=parentA;a=parentB;break;}child$0=child$0.sibling;}if(!didFindChild){for(child$0=parentB.child;child$0;){if(child$0===a){didFindChild=true;a=parentB;b=parentA;break;}if(child$0===b){didFindChild=true;b=parentB;a=parentA;break;}child$0=child$0.sibling;}if(!didFindChild)throw Error(formatProdErrorMessage(189));}}if(a.alternate!==b)throw Error(formatProdErrorMessage(190));}if(3!==a.tag)throw Error(formatProdErrorMessage(188));return a.stateNode.current===a?fiber:alternate;}function findCurrentHostFiberImpl(node){var tag=node.tag;if(5===tag||26===tag||27===tag||6===tag)return node;for(node=node.child;null!==node;){tag=findCurrentHostFiberImpl(node);if(null!==tag)return tag;node=node.sibling;}return null;}var assign=Object.assign,REACT_LEGACY_ELEMENT_TYPE=Symbol.for("react.element"),REACT_ELEMENT_TYPE=Symbol.for("react.transitional.element"),REACT_PORTAL_TYPE=Symbol.for("react.portal"),REACT_FRAGMENT_TYPE=Symbol.for("react.fragment"),REACT_STRICT_MODE_TYPE=Symbol.for("react.strict_mode"),REACT_PROFILER_TYPE=Symbol.for("react.profiler"),REACT_PROVIDER_TYPE=Symbol.for("react.provider"),REACT_CONSUMER_TYPE=Symbol.for("react.consumer"),REACT_CONTEXT_TYPE=Symbol.for("react.context"),REACT_FORWARD_REF_TYPE=Symbol.for("react.forward_ref"),REACT_SUSPENSE_TYPE=Symbol.for("react.suspense"),REACT_SUSPENSE_LIST_TYPE=Symbol.for("react.suspense_list"),REACT_MEMO_TYPE=Symbol.for("react.memo"),REACT_LAZY_TYPE=Symbol.for("react.lazy");var REACT_ACTIVITY_TYPE=Symbol.for("react.activity");var REACT_MEMO_CACHE_SENTINEL=Symbol.for("react.memo_cache_sentinel");var MAYBE_ITERATOR_SYMBOL=Symbol.iterator;function getIteratorFn(maybeIterable){if(null===maybeIterable||"object"!==typeof maybeIterable)return null;maybeIterable=MAYBE_ITERATOR_SYMBOL&&maybeIterable[MAYBE_ITERATOR_SYMBOL]||maybeIterable["@@iterator"];return "function"===typeof maybeIterable?maybeIterable:null;}var REACT_CLIENT_REFERENCE=Symbol.for("react.client.reference");function getComponentNameFromType(type){if(null==type)return null;if("function"===typeof type)return type.$$typeof===REACT_CLIENT_REFERENCE?null:type.displayName||type.name||null;if("string"===typeof type)return type;switch(type){case REACT_FRAGMENT_TYPE:return "Fragment";case REACT_PROFILER_TYPE:return "Profiler";case REACT_STRICT_MODE_TYPE:return "StrictMode";case REACT_SUSPENSE_TYPE:return "Suspense";case REACT_SUSPENSE_LIST_TYPE:return "SuspenseList";case REACT_ACTIVITY_TYPE:return "Activity";}if("object"===typeof type)switch(type.$$typeof){case REACT_PORTAL_TYPE:return "Portal";case REACT_CONTEXT_TYPE:return (type.displayName||"Context")+".Provider";case REACT_CONSUMER_TYPE:return (type._context.displayName||"Context")+".Consumer";case REACT_FORWARD_REF_TYPE:var innerType=type.render;type=type.displayName;type||(type=innerType.displayName||innerType.name||"",type=""!==type?"ForwardRef("+type+")":"ForwardRef");return type;case REACT_MEMO_TYPE:return innerType=type.displayName||null,null!==innerType?innerType:getComponentNameFromType(type.type)||"Memo";case REACT_LAZY_TYPE:innerType=type._payload;type=type._init;try{return getComponentNameFromType(type(innerType));}catch(x){}}return null;}var isArrayImpl=Array.isArray,ReactSharedInternals=React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ReactDOMSharedInternals=ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,sharedNotPendingObject={pending:false,data:null,method:null,action:null},valueStack=[],index=-1;function createCursor(defaultValue){return {current:defaultValue};}function pop(cursor){0>index||(cursor.current=valueStack[index],valueStack[index]=null,index--);}function push(cursor,value){index++;valueStack[index]=cursor.current;cursor.current=value;}var contextStackCursor=createCursor(null),contextFiberStackCursor=createCursor(null),rootInstanceStackCursor=createCursor(null),hostTransitionProviderCursor=createCursor(null);function pushHostContainer(fiber,nextRootInstance){push(rootInstanceStackCursor,nextRootInstance);push(contextFiberStackCursor,fiber);push(contextStackCursor,null);switch(nextRootInstance.nodeType){case 9:case 11:fiber=(fiber=nextRootInstance.documentElement)?(fiber=fiber.namespaceURI)?getOwnHostContext(fiber):0:0;break;default:if(fiber=nextRootInstance.tagName,nextRootInstance=nextRootInstance.namespaceURI)nextRootInstance=getOwnHostContext(nextRootInstance),fiber=getChildHostContextProd(nextRootInstance,fiber);else switch(fiber){case "svg":fiber=1;break;case "math":fiber=2;break;default:fiber=0;}}pop(contextStackCursor);push(contextStackCursor,fiber);}function popHostContainer(){pop(contextStackCursor);pop(contextFiberStackCursor);pop(rootInstanceStackCursor);}function pushHostContext(fiber){null!==fiber.memoizedState&&push(hostTransitionProviderCursor,fiber);var context=contextStackCursor.current;var JSCompiler_inline_result=getChildHostContextProd(context,fiber.type);context!==JSCompiler_inline_result&&(push(contextFiberStackCursor,fiber),push(contextStackCursor,JSCompiler_inline_result));}function popHostContext(fiber){contextFiberStackCursor.current===fiber&&(pop(contextStackCursor),pop(contextFiberStackCursor));hostTransitionProviderCursor.current===fiber&&(pop(hostTransitionProviderCursor),HostTransitionContext._currentValue=sharedNotPendingObject);}var hasOwnProperty=Object.prototype.hasOwnProperty,scheduleCallback$3=Scheduler.unstable_scheduleCallback,cancelCallback$1=Scheduler.unstable_cancelCallback,shouldYield=Scheduler.unstable_shouldYield,requestPaint=Scheduler.unstable_requestPaint,now=Scheduler.unstable_now,getCurrentPriorityLevel=Scheduler.unstable_getCurrentPriorityLevel,ImmediatePriority=Scheduler.unstable_ImmediatePriority,UserBlockingPriority=Scheduler.unstable_UserBlockingPriority,NormalPriority$1=Scheduler.unstable_NormalPriority,LowPriority=Scheduler.unstable_LowPriority,IdlePriority=Scheduler.unstable_IdlePriority,log$1=Scheduler.log,unstable_setDisableYieldValue=Scheduler.unstable_setDisableYieldValue,rendererID=null,injectedHook=null;function setIsStrictModeForDevtools(newIsStrictMode){"function"===typeof log$1&&unstable_setDisableYieldValue(newIsStrictMode);if(injectedHook&&"function"===typeof injectedHook.setStrictMode)try{injectedHook.setStrictMode(rendererID,newIsStrictMode);}catch(err){}}var clz32=Math.clz32?Math.clz32:clz32Fallback,log=Math.log,LN2=Math.LN2;function clz32Fallback(x){x>>>=0;return 0===x?32:31-(log(x)/LN2|0)|0;}var nextTransitionLane=256,nextRetryLane=4194304;function getHighestPriorityLanes(lanes){var pendingSyncLanes=lanes&42;if(0!==pendingSyncLanes)return pendingSyncLanes;switch(lanes&-lanes){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return lanes&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return lanes&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return lanes;}}function getNextLanes(root,wipLanes,rootHasPendingCommit){var pendingLanes=root.pendingLanes;if(0===pendingLanes)return 0;var nextLanes=0,suspendedLanes=root.suspendedLanes,pingedLanes=root.pingedLanes;root=root.warmLanes;var nonIdlePendingLanes=pendingLanes&134217727;0!==nonIdlePendingLanes?(pendingLanes=nonIdlePendingLanes&~suspendedLanes,0!==pendingLanes?nextLanes=getHighestPriorityLanes(pendingLanes):(pingedLanes&=nonIdlePendingLanes,0!==pingedLanes?nextLanes=getHighestPriorityLanes(pingedLanes):rootHasPendingCommit||(rootHasPendingCommit=nonIdlePendingLanes&~root,0!==rootHasPendingCommit&&(nextLanes=getHighestPriorityLanes(rootHasPendingCommit))))):(nonIdlePendingLanes=pendingLanes&~suspendedLanes,0!==nonIdlePendingLanes?nextLanes=getHighestPriorityLanes(nonIdlePendingLanes):0!==pingedLanes?nextLanes=getHighestPriorityLanes(pingedLanes):rootHasPendingCommit||(rootHasPendingCommit=pendingLanes&~root,0!==rootHasPendingCommit&&(nextLanes=getHighestPriorityLanes(rootHasPendingCommit))));return 0===nextLanes?0:0!==wipLanes&&wipLanes!==nextLanes&&0===(wipLanes&suspendedLanes)&&(suspendedLanes=nextLanes&-nextLanes,rootHasPendingCommit=wipLanes&-wipLanes,suspendedLanes>=rootHasPendingCommit||32===suspendedLanes&&0!==(rootHasPendingCommit&4194048))?wipLanes:nextLanes;}function checkIfRootIsPrerendering(root,renderLanes){return 0===(root.pendingLanes&~(root.suspendedLanes&~root.pingedLanes)&renderLanes);}function computeExpirationTime(lane,currentTime){switch(lane){case 1:case 2:case 4:case 8:case 64:return currentTime+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return currentTime+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return  -1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return  -1;default:return  -1;}}function claimNextTransitionLane(){var lane=nextTransitionLane;nextTransitionLane<<=1;0===(nextTransitionLane&4194048)&&(nextTransitionLane=256);return lane;}function claimNextRetryLane(){var lane=nextRetryLane;nextRetryLane<<=1;0===(nextRetryLane&62914560)&&(nextRetryLane=4194304);return lane;}function createLaneMap(initial){for(var laneMap=[],i=0;31>i;i++)laneMap.push(initial);return laneMap;}function markRootUpdated$1(root,updateLane){root.pendingLanes|=updateLane;268435456!==updateLane&&(root.suspendedLanes=0,root.pingedLanes=0,root.warmLanes=0);}function markRootFinished(root,finishedLanes,remainingLanes,spawnedLane,updatedLanes,suspendedRetryLanes){var previouslyPendingLanes=root.pendingLanes;root.pendingLanes=remainingLanes;root.suspendedLanes=0;root.pingedLanes=0;root.warmLanes=0;root.expiredLanes&=remainingLanes;root.entangledLanes&=remainingLanes;root.errorRecoveryDisabledLanes&=remainingLanes;root.shellSuspendCounter=0;var entanglements=root.entanglements,expirationTimes=root.expirationTimes,hiddenUpdates=root.hiddenUpdates;for(remainingLanes=previouslyPendingLanes&~remainingLanes;0<remainingLanes;){var index$5=31-clz32(remainingLanes),lane=1<<index$5;entanglements[index$5]=0;expirationTimes[index$5]=-1;var hiddenUpdatesForLane=hiddenUpdates[index$5];if(null!==hiddenUpdatesForLane)for(hiddenUpdates[index$5]=null,index$5=0;index$5<hiddenUpdatesForLane.length;index$5++){var update=hiddenUpdatesForLane[index$5];null!==update&&(update.lane&=-536870913);}remainingLanes&=~lane;}0!==spawnedLane&&markSpawnedDeferredLane(root,spawnedLane,0);0!==suspendedRetryLanes&&0===updatedLanes&&0!==root.tag&&(root.suspendedLanes|=suspendedRetryLanes&~(previouslyPendingLanes&~finishedLanes));}function markSpawnedDeferredLane(root,spawnedLane,entangledLanes){root.pendingLanes|=spawnedLane;root.suspendedLanes&=~spawnedLane;var spawnedLaneIndex=31-clz32(spawnedLane);root.entangledLanes|=spawnedLane;root.entanglements[spawnedLaneIndex]=root.entanglements[spawnedLaneIndex]|1073741824|entangledLanes&4194090;}function markRootEntangled(root,entangledLanes){var rootEntangledLanes=root.entangledLanes|=entangledLanes;for(root=root.entanglements;rootEntangledLanes;){var index$6=31-clz32(rootEntangledLanes),lane=1<<index$6;lane&entangledLanes|root[index$6]&entangledLanes&&(root[index$6]|=entangledLanes);rootEntangledLanes&=~lane;}}function getBumpedLaneForHydrationByLane(lane){switch(lane){case 2:lane=1;break;case 8:lane=4;break;case 32:lane=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:lane=128;break;case 268435456:lane=134217728;break;default:lane=0;}return lane;}function lanesToEventPriority(lanes){lanes&=-lanes;return 2<lanes?8<lanes?0!==(lanes&134217727)?32:268435456:8:2;}function resolveUpdatePriority(){var updatePriority=ReactDOMSharedInternals.p;if(0!==updatePriority)return updatePriority;updatePriority=window.event;return void 0===updatePriority?32:getEventPriority(updatePriority.type);}function runWithPriority(priority,fn){var previousPriority=ReactDOMSharedInternals.p;try{return ReactDOMSharedInternals.p=priority,fn();}finally{ReactDOMSharedInternals.p=previousPriority;}}var randomKey=Math.random().toString(36).slice(2),internalInstanceKey="__reactFiber$"+randomKey,internalPropsKey="__reactProps$"+randomKey,internalContainerInstanceKey="__reactContainer$"+randomKey,internalEventHandlersKey="__reactEvents$"+randomKey,internalEventHandlerListenersKey="__reactListeners$"+randomKey,internalEventHandlesSetKey="__reactHandles$"+randomKey,internalRootNodeResourcesKey="__reactResources$"+randomKey,internalHoistableMarker="__reactMarker$"+randomKey;function detachDeletedInstance(node){delete node[internalInstanceKey];delete node[internalPropsKey];delete node[internalEventHandlersKey];delete node[internalEventHandlerListenersKey];delete node[internalEventHandlesSetKey];}function getClosestInstanceFromNode(targetNode){var targetInst=targetNode[internalInstanceKey];if(targetInst)return targetInst;for(var parentNode=targetNode.parentNode;parentNode;){if(targetInst=parentNode[internalContainerInstanceKey]||parentNode[internalInstanceKey]){parentNode=targetInst.alternate;if(null!==targetInst.child||null!==parentNode&&null!==parentNode.child)for(targetNode=getParentSuspenseInstance(targetNode);null!==targetNode;){if(parentNode=targetNode[internalInstanceKey])return parentNode;targetNode=getParentSuspenseInstance(targetNode);}return targetInst;}targetNode=parentNode;parentNode=targetNode.parentNode;}return null;}function getInstanceFromNode(node){if(node=node[internalInstanceKey]||node[internalContainerInstanceKey]){var tag=node.tag;if(5===tag||6===tag||13===tag||26===tag||27===tag||3===tag)return node;}return null;}function getNodeFromInstance(inst){var tag=inst.tag;if(5===tag||26===tag||27===tag||6===tag)return inst.stateNode;throw Error(formatProdErrorMessage(33));}function getResourcesFromRoot(root){var resources=root[internalRootNodeResourcesKey];resources||(resources=root[internalRootNodeResourcesKey]={hoistableStyles:new Map(),hoistableScripts:new Map()});return resources;}function markNodeAsHoistable(node){node[internalHoistableMarker]=true;}var allNativeEvents=new Set(),registrationNameDependencies={};function registerTwoPhaseEvent(registrationName,dependencies){registerDirectEvent(registrationName,dependencies);registerDirectEvent(registrationName+"Capture",dependencies);}function registerDirectEvent(registrationName,dependencies){registrationNameDependencies[registrationName]=dependencies;for(registrationName=0;registrationName<dependencies.length;registrationName++)allNativeEvents.add(dependencies[registrationName]);}var VALID_ATTRIBUTE_NAME_REGEX=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),illegalAttributeNameCache={},validatedAttributeNameCache={};function isAttributeNameSafe(attributeName){if(hasOwnProperty.call(validatedAttributeNameCache,attributeName))return  true;if(hasOwnProperty.call(illegalAttributeNameCache,attributeName))return  false;if(VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))return validatedAttributeNameCache[attributeName]=true;illegalAttributeNameCache[attributeName]=true;return  false;}function setValueForAttribute(node,name,value){if(isAttributeNameSafe(name))if(null===value)node.removeAttribute(name);else {switch(typeof value){case "undefined":case "function":case "symbol":node.removeAttribute(name);return;case "boolean":var prefix$8=name.toLowerCase().slice(0,5);if("data-"!==prefix$8&&"aria-"!==prefix$8){node.removeAttribute(name);return;}}node.setAttribute(name,""+value);}}function setValueForKnownAttribute(node,name,value){if(null===value)node.removeAttribute(name);else {switch(typeof value){case "undefined":case "function":case "symbol":case "boolean":node.removeAttribute(name);return;}node.setAttribute(name,""+value);}}function setValueForNamespacedAttribute(node,namespace,name,value){if(null===value)node.removeAttribute(name);else {switch(typeof value){case "undefined":case "function":case "symbol":case "boolean":node.removeAttribute(name);return;}node.setAttributeNS(namespace,name,""+value);}}var prefix,suffix;function describeBuiltInComponentFrame(name){if(void 0===prefix)try{throw Error();}catch(x){var match=x.stack.trim().match(/\n( *(at )?)/);prefix=match&&match[1]||"";suffix=-1<x.stack.indexOf("\n    at")?" (<anonymous>)":-1<x.stack.indexOf("@")?"@unknown:0:0":"";}return "\n"+prefix+name+suffix;}var reentry=false;function describeNativeComponentFrame(fn,construct){if(!fn||reentry)return "";reentry=true;var previousPrepareStackTrace=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var RunInRootFrame={DetermineComponentFrameRoot:function(){try{if(construct){var Fake=function(){throw Error();};Object.defineProperty(Fake.prototype,"props",{set:function(){throw Error();}});if("object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(Fake,[]);}catch(x){var control=x;}Reflect.construct(fn,[],Fake);}else {try{Fake.call();}catch(x$9){control=x$9;}fn.call(Fake.prototype);}}else {try{throw Error();}catch(x$10){control=x$10;}(Fake=fn())&&"function"===typeof Fake.catch&&Fake.catch(function(){});}}catch(sample){if(sample&&control&&"string"===typeof sample.stack)return [sample.stack,control.stack];}return [null,null];}};RunInRootFrame.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var namePropDescriptor=Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot,"name");namePropDescriptor&&namePropDescriptor.configurable&&Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var _RunInRootFrame$Deter=RunInRootFrame.DetermineComponentFrameRoot(),sampleStack=_RunInRootFrame$Deter[0],controlStack=_RunInRootFrame$Deter[1];if(sampleStack&&controlStack){var sampleLines=sampleStack.split("\n"),controlLines=controlStack.split("\n");for(namePropDescriptor=RunInRootFrame=0;RunInRootFrame<sampleLines.length&&!sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot");)RunInRootFrame++;for(;namePropDescriptor<controlLines.length&&!controlLines[namePropDescriptor].includes("DetermineComponentFrameRoot");)namePropDescriptor++;if(RunInRootFrame===sampleLines.length||namePropDescriptor===controlLines.length)for(RunInRootFrame=sampleLines.length-1,namePropDescriptor=controlLines.length-1;1<=RunInRootFrame&&0<=namePropDescriptor&&sampleLines[RunInRootFrame]!==controlLines[namePropDescriptor];)namePropDescriptor--;for(;1<=RunInRootFrame&&0<=namePropDescriptor;RunInRootFrame--,namePropDescriptor--)if(sampleLines[RunInRootFrame]!==controlLines[namePropDescriptor]){if(1!==RunInRootFrame||1!==namePropDescriptor){do if(RunInRootFrame--,namePropDescriptor--,0>namePropDescriptor||sampleLines[RunInRootFrame]!==controlLines[namePropDescriptor]){var frame="\n"+sampleLines[RunInRootFrame].replace(" at new "," at ");fn.displayName&&frame.includes("<anonymous>")&&(frame=frame.replace("<anonymous>",fn.displayName));return frame;}while(1<=RunInRootFrame&&0<=namePropDescriptor);}break;}}}finally{reentry=false,Error.prepareStackTrace=previousPrepareStackTrace;}return (previousPrepareStackTrace=fn?fn.displayName||fn.name:"")?describeBuiltInComponentFrame(previousPrepareStackTrace):"";}function describeFiber(fiber){switch(fiber.tag){case 26:case 27:case 5:return describeBuiltInComponentFrame(fiber.type);case 16:return describeBuiltInComponentFrame("Lazy");case 13:return describeBuiltInComponentFrame("Suspense");case 19:return describeBuiltInComponentFrame("SuspenseList");case 0:case 15:return describeNativeComponentFrame(fiber.type,false);case 11:return describeNativeComponentFrame(fiber.type.render,false);case 1:return describeNativeComponentFrame(fiber.type,true);case 31:return describeBuiltInComponentFrame("Activity");default:return "";}}function getStackByFiberInDevAndProd(workInProgress){try{var info="";do info+=describeFiber(workInProgress),workInProgress=workInProgress.return;while(workInProgress);return info;}catch(x){return "\nError generating stack: "+x.message+"\n"+x.stack;}}function getToStringValue(value){switch(typeof value){case "bigint":case "boolean":case "number":case "string":case "undefined":return value;case "object":return value;default:return "";}}function isCheckable(elem){var type=elem.type;return (elem=elem.nodeName)&&"input"===elem.toLowerCase()&&("checkbox"===type||"radio"===type);}function trackValueOnNode(node){var valueField=isCheckable(node)?"checked":"value",descriptor=Object.getOwnPropertyDescriptor(node.constructor.prototype,valueField),currentValue=""+node[valueField];if(!node.hasOwnProperty(valueField)&&"undefined"!==typeof descriptor&&"function"===typeof descriptor.get&&"function"===typeof descriptor.set){var get=descriptor.get,set=descriptor.set;Object.defineProperty(node,valueField,{configurable:true,get:function(){return get.call(this);},set:function(value){currentValue=""+value;set.call(this,value);}});Object.defineProperty(node,valueField,{enumerable:descriptor.enumerable});return {getValue:function(){return currentValue;},setValue:function(value){currentValue=""+value;},stopTracking:function(){node._valueTracker=null;delete node[valueField];}};}}function track(node){node._valueTracker||(node._valueTracker=trackValueOnNode(node));}function updateValueIfChanged(node){if(!node)return  false;var tracker=node._valueTracker;if(!tracker)return  true;var lastValue=tracker.getValue();var value="";node&&(value=isCheckable(node)?node.checked?"true":"false":node.value);node=value;return node!==lastValue?(tracker.setValue(node),true):false;}function getActiveElement(doc){doc=doc||("undefined"!==typeof document?document:void 0);if("undefined"===typeof doc)return null;try{return doc.activeElement||doc.body;}catch(e){return doc.body;}}var escapeSelectorAttributeValueInsideDoubleQuotesRegex=/[\n"\\]/g;function escapeSelectorAttributeValueInsideDoubleQuotes(value){return value.replace(escapeSelectorAttributeValueInsideDoubleQuotesRegex,function(ch){return "\\"+ch.charCodeAt(0).toString(16)+" ";});}function updateInput(element,value,defaultValue,lastDefaultValue,checked,defaultChecked,type,name){element.name="";null!=type&&"function"!==typeof type&&"symbol"!==typeof type&&"boolean"!==typeof type?element.type=type:element.removeAttribute("type");if(null!=value){if("number"===type){if(0===value&&""===element.value||element.value!=value)element.value=""+getToStringValue(value);}else element.value!==""+getToStringValue(value)&&(element.value=""+getToStringValue(value));}else "submit"!==type&&"reset"!==type||element.removeAttribute("value");null!=value?setDefaultValue(element,type,getToStringValue(value)):null!=defaultValue?setDefaultValue(element,type,getToStringValue(defaultValue)):null!=lastDefaultValue&&element.removeAttribute("value");null==checked&&null!=defaultChecked&&(element.defaultChecked=!!defaultChecked);null!=checked&&(element.checked=checked&&"function"!==typeof checked&&"symbol"!==typeof checked);null!=name&&"function"!==typeof name&&"symbol"!==typeof name&&"boolean"!==typeof name?element.name=""+getToStringValue(name):element.removeAttribute("name");}function initInput(element,value,defaultValue,checked,defaultChecked,type,name,isHydrating){null!=type&&"function"!==typeof type&&"symbol"!==typeof type&&"boolean"!==typeof type&&(element.type=type);if(null!=value||null!=defaultValue){if(!("submit"!==type&&"reset"!==type||void 0!==value&&null!==value))return;defaultValue=null!=defaultValue?""+getToStringValue(defaultValue):"";value=null!=value?""+getToStringValue(value):defaultValue;isHydrating||value===element.value||(element.value=value);element.defaultValue=value;}checked=null!=checked?checked:defaultChecked;checked="function"!==typeof checked&&"symbol"!==typeof checked&&!!checked;element.checked=isHydrating?element.checked:!!checked;element.defaultChecked=!!checked;null!=name&&"function"!==typeof name&&"symbol"!==typeof name&&"boolean"!==typeof name&&(element.name=name);}function setDefaultValue(node,type,value){"number"===type&&getActiveElement(node.ownerDocument)===node||node.defaultValue===""+value||(node.defaultValue=""+value);}function updateOptions(node,multiple,propValue,setDefaultSelected){node=node.options;if(multiple){multiple={};for(var i=0;i<propValue.length;i++)multiple["$"+propValue[i]]=true;for(propValue=0;propValue<node.length;propValue++)i=multiple.hasOwnProperty("$"+node[propValue].value),node[propValue].selected!==i&&(node[propValue].selected=i),i&&setDefaultSelected&&(node[propValue].defaultSelected=true);}else {propValue=""+getToStringValue(propValue);multiple=null;for(i=0;i<node.length;i++){if(node[i].value===propValue){node[i].selected=true;setDefaultSelected&&(node[i].defaultSelected=true);return;}null!==multiple||node[i].disabled||(multiple=node[i]);}null!==multiple&&(multiple.selected=true);}}function updateTextarea(element,value,defaultValue){if(null!=value&&(value=""+getToStringValue(value),value!==element.value&&(element.value=value),null==defaultValue)){element.defaultValue!==value&&(element.defaultValue=value);return;}element.defaultValue=null!=defaultValue?""+getToStringValue(defaultValue):"";}function initTextarea(element,value,defaultValue,children){if(null==value){if(null!=children){if(null!=defaultValue)throw Error(formatProdErrorMessage(92));if(isArrayImpl(children)){if(1<children.length)throw Error(formatProdErrorMessage(93));children=children[0];}defaultValue=children;}null==defaultValue&&(defaultValue="");value=defaultValue;}defaultValue=getToStringValue(value);element.defaultValue=defaultValue;children=element.textContent;children===defaultValue&&""!==children&&null!==children&&(element.value=children);}function setTextContent(node,text){if(text){var firstChild=node.firstChild;if(firstChild&&firstChild===node.lastChild&&3===firstChild.nodeType){firstChild.nodeValue=text;return;}}node.textContent=text;}var unitlessNumbers=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function setValueForStyle(style,styleName,value){var isCustomProperty=0===styleName.indexOf("--");null==value||"boolean"===typeof value||""===value?isCustomProperty?style.setProperty(styleName,""):"float"===styleName?style.cssFloat="":style[styleName]="":isCustomProperty?style.setProperty(styleName,value):"number"!==typeof value||0===value||unitlessNumbers.has(styleName)?"float"===styleName?style.cssFloat=value:style[styleName]=(""+value).trim():style[styleName]=value+"px";}function setValueForStyles(node,styles,prevStyles){if(null!=styles&&"object"!==typeof styles)throw Error(formatProdErrorMessage(62));node=node.style;if(null!=prevStyles){for(var styleName in prevStyles)!prevStyles.hasOwnProperty(styleName)||null!=styles&&styles.hasOwnProperty(styleName)||(0===styleName.indexOf("--")?node.setProperty(styleName,""):"float"===styleName?node.cssFloat="":node[styleName]="");for(var styleName$16 in styles)styleName=styles[styleName$16],styles.hasOwnProperty(styleName$16)&&prevStyles[styleName$16]!==styleName&&setValueForStyle(node,styleName$16,styleName);}else for(var styleName$17 in styles)styles.hasOwnProperty(styleName$17)&&setValueForStyle(node,styleName$17,styles[styleName$17]);}function isCustomElement(tagName){if(-1===tagName.indexOf("-"))return  false;switch(tagName){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return  false;default:return  true;}}var aliases=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),isJavaScriptProtocol=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function sanitizeURL(url){return isJavaScriptProtocol.test(""+url)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":url;}var currentReplayingEvent=null;function getEventTarget(nativeEvent){nativeEvent=nativeEvent.target||nativeEvent.srcElement||window;nativeEvent.correspondingUseElement&&(nativeEvent=nativeEvent.correspondingUseElement);return 3===nativeEvent.nodeType?nativeEvent.parentNode:nativeEvent;}var restoreTarget=null,restoreQueue=null;function restoreStateOfTarget(target){var internalInstance=getInstanceFromNode(target);if(internalInstance&&(target=internalInstance.stateNode)){var props=target[internalPropsKey]||null;a:switch(target=internalInstance.stateNode,internalInstance.type){case "input":updateInput(target,props.value,props.defaultValue,props.defaultValue,props.checked,props.defaultChecked,props.type,props.name);internalInstance=props.name;if("radio"===props.type&&null!=internalInstance){for(props=target;props.parentNode;)props=props.parentNode;props=props.querySelectorAll('input[name="'+escapeSelectorAttributeValueInsideDoubleQuotes(""+internalInstance)+'"][type="radio"]');for(internalInstance=0;internalInstance<props.length;internalInstance++){var otherNode=props[internalInstance];if(otherNode!==target&&otherNode.form===target.form){var otherProps=otherNode[internalPropsKey]||null;if(!otherProps)throw Error(formatProdErrorMessage(90));updateInput(otherNode,otherProps.value,otherProps.defaultValue,otherProps.defaultValue,otherProps.checked,otherProps.defaultChecked,otherProps.type,otherProps.name);}}for(internalInstance=0;internalInstance<props.length;internalInstance++)otherNode=props[internalInstance],otherNode.form===target.form&&updateValueIfChanged(otherNode);}break a;case "textarea":updateTextarea(target,props.value,props.defaultValue);break a;case "select":internalInstance=props.value,null!=internalInstance&&updateOptions(target,!!props.multiple,internalInstance,false);}}}var isInsideEventHandler=false;function batchedUpdates$1(fn,a,b){if(isInsideEventHandler)return fn(a,b);isInsideEventHandler=true;try{var JSCompiler_inline_result=fn(a);return JSCompiler_inline_result;}finally{if(isInsideEventHandler=false,null!==restoreTarget||null!==restoreQueue)if(flushSyncWork$1(),restoreTarget&&(a=restoreTarget,fn=restoreQueue,restoreQueue=restoreTarget=null,restoreStateOfTarget(a),fn))for(a=0;a<fn.length;a++)restoreStateOfTarget(fn[a]);}}function getListener(inst,registrationName){var stateNode=inst.stateNode;if(null===stateNode)return null;var props=stateNode[internalPropsKey]||null;if(null===props)return null;stateNode=props[registrationName];a:switch(registrationName){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(props=!props.disabled)||(inst=inst.type,props=!("button"===inst||"input"===inst||"select"===inst||"textarea"===inst));inst=!props;break a;default:inst=false;}if(inst)return null;if(stateNode&&"function"!==typeof stateNode)throw Error(formatProdErrorMessage(231,registrationName,typeof stateNode));return stateNode;}var canUseDOM=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),passiveBrowserEventsSupported=false;if(canUseDOM)try{var options={};Object.defineProperty(options,"passive",{get:function(){passiveBrowserEventsSupported=!0;}});window.addEventListener("test",options,options);window.removeEventListener("test",options,options);}catch(e){passiveBrowserEventsSupported=false;}var root=null,startText=null,fallbackText=null;function getData(){if(fallbackText)return fallbackText;var start,startValue=startText,startLength=startValue.length,end,endValue="value"in root?root.value:root.textContent,endLength=endValue.length;for(start=0;start<startLength&&startValue[start]===endValue[start];start++);var minEnd=startLength-start;for(end=1;end<=minEnd&&startValue[startLength-end]===endValue[endLength-end];end++);return fallbackText=endValue.slice(start,1<end?1-end:void 0);}function getEventCharCode(nativeEvent){var keyCode=nativeEvent.keyCode;"charCode"in nativeEvent?(nativeEvent=nativeEvent.charCode,0===nativeEvent&&13===keyCode&&(nativeEvent=13)):nativeEvent=keyCode;10===nativeEvent&&(nativeEvent=13);return 32<=nativeEvent||13===nativeEvent?nativeEvent:0;}function functionThatReturnsTrue(){return  true;}function functionThatReturnsFalse(){return  false;}function createSyntheticEvent(Interface){function SyntheticBaseEvent(reactName,reactEventType,targetInst,nativeEvent,nativeEventTarget){this._reactName=reactName;this._targetInst=targetInst;this.type=reactEventType;this.nativeEvent=nativeEvent;this.target=nativeEventTarget;this.currentTarget=null;for(var propName in Interface)Interface.hasOwnProperty(propName)&&(reactName=Interface[propName],this[propName]=reactName?reactName(nativeEvent):nativeEvent[propName]);this.isDefaultPrevented=(null!=nativeEvent.defaultPrevented?nativeEvent.defaultPrevented:false===nativeEvent.returnValue)?functionThatReturnsTrue:functionThatReturnsFalse;this.isPropagationStopped=functionThatReturnsFalse;return this;}assign(SyntheticBaseEvent.prototype,{preventDefault:function(){this.defaultPrevented=true;var event=this.nativeEvent;event&&(event.preventDefault?event.preventDefault():"unknown"!==typeof event.returnValue&&(event.returnValue=false),this.isDefaultPrevented=functionThatReturnsTrue);},stopPropagation:function(){var event=this.nativeEvent;event&&(event.stopPropagation?event.stopPropagation():"unknown"!==typeof event.cancelBubble&&(event.cancelBubble=true),this.isPropagationStopped=functionThatReturnsTrue);},persist:function(){},isPersistent:functionThatReturnsTrue});return SyntheticBaseEvent;}var EventInterface={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(event){return event.timeStamp||Date.now();},defaultPrevented:0,isTrusted:0},SyntheticEvent=createSyntheticEvent(EventInterface),UIEventInterface=assign({},EventInterface,{view:0,detail:0}),SyntheticUIEvent=createSyntheticEvent(UIEventInterface),lastMovementX,lastMovementY,lastMouseEvent,MouseEventInterface=assign({},UIEventInterface,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:getEventModifierState,button:0,buttons:0,relatedTarget:function(event){return void 0===event.relatedTarget?event.fromElement===event.srcElement?event.toElement:event.fromElement:event.relatedTarget;},movementX:function(event){if("movementX"in event)return event.movementX;event!==lastMouseEvent&&(lastMouseEvent&&"mousemove"===event.type?(lastMovementX=event.screenX-lastMouseEvent.screenX,lastMovementY=event.screenY-lastMouseEvent.screenY):lastMovementY=lastMovementX=0,lastMouseEvent=event);return lastMovementX;},movementY:function(event){return "movementY"in event?event.movementY:lastMovementY;}}),SyntheticMouseEvent=createSyntheticEvent(MouseEventInterface),DragEventInterface=assign({},MouseEventInterface,{dataTransfer:0}),SyntheticDragEvent=createSyntheticEvent(DragEventInterface),FocusEventInterface=assign({},UIEventInterface,{relatedTarget:0}),SyntheticFocusEvent=createSyntheticEvent(FocusEventInterface),AnimationEventInterface=assign({},EventInterface,{animationName:0,elapsedTime:0,pseudoElement:0}),SyntheticAnimationEvent=createSyntheticEvent(AnimationEventInterface),ClipboardEventInterface=assign({},EventInterface,{clipboardData:function(event){return "clipboardData"in event?event.clipboardData:window.clipboardData;}}),SyntheticClipboardEvent=createSyntheticEvent(ClipboardEventInterface),CompositionEventInterface=assign({},EventInterface,{data:0}),SyntheticCompositionEvent=createSyntheticEvent(CompositionEventInterface),normalizeKey={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},translateToKey={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},modifierKeyToProp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function modifierStateGetter(keyArg){var nativeEvent=this.nativeEvent;return nativeEvent.getModifierState?nativeEvent.getModifierState(keyArg):(keyArg=modifierKeyToProp[keyArg])?!!nativeEvent[keyArg]:false;}function getEventModifierState(){return modifierStateGetter;}var KeyboardEventInterface=assign({},UIEventInterface,{key:function(nativeEvent){if(nativeEvent.key){var key=normalizeKey[nativeEvent.key]||nativeEvent.key;if("Unidentified"!==key)return key;}return "keypress"===nativeEvent.type?(nativeEvent=getEventCharCode(nativeEvent),13===nativeEvent?"Enter":String.fromCharCode(nativeEvent)):"keydown"===nativeEvent.type||"keyup"===nativeEvent.type?translateToKey[nativeEvent.keyCode]||"Unidentified":"";},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:getEventModifierState,charCode:function(event){return "keypress"===event.type?getEventCharCode(event):0;},keyCode:function(event){return "keydown"===event.type||"keyup"===event.type?event.keyCode:0;},which:function(event){return "keypress"===event.type?getEventCharCode(event):"keydown"===event.type||"keyup"===event.type?event.keyCode:0;}}),SyntheticKeyboardEvent=createSyntheticEvent(KeyboardEventInterface),PointerEventInterface=assign({},MouseEventInterface,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),SyntheticPointerEvent=createSyntheticEvent(PointerEventInterface),TouchEventInterface=assign({},UIEventInterface,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:getEventModifierState}),SyntheticTouchEvent=createSyntheticEvent(TouchEventInterface),TransitionEventInterface=assign({},EventInterface,{propertyName:0,elapsedTime:0,pseudoElement:0}),SyntheticTransitionEvent=createSyntheticEvent(TransitionEventInterface),WheelEventInterface=assign({},MouseEventInterface,{deltaX:function(event){return "deltaX"in event?event.deltaX:"wheelDeltaX"in event?-event.wheelDeltaX:0;},deltaY:function(event){return "deltaY"in event?event.deltaY:"wheelDeltaY"in event?-event.wheelDeltaY:"wheelDelta"in event?-event.wheelDelta:0;},deltaZ:0,deltaMode:0}),SyntheticWheelEvent=createSyntheticEvent(WheelEventInterface),ToggleEventInterface=assign({},EventInterface,{newState:0,oldState:0}),SyntheticToggleEvent=createSyntheticEvent(ToggleEventInterface),END_KEYCODES=[9,13,27,32],canUseCompositionEvent=canUseDOM&&"CompositionEvent"in window,documentMode=null;canUseDOM&&"documentMode"in document&&(documentMode=document.documentMode);var canUseTextInputEvent=canUseDOM&&"TextEvent"in window&&!documentMode,useFallbackCompositionData=canUseDOM&&(!canUseCompositionEvent||documentMode&&8<documentMode&&11>=documentMode),SPACEBAR_CHAR=String.fromCharCode(32),hasSpaceKeypress=false;function isFallbackCompositionEnd(domEventName,nativeEvent){switch(domEventName){case "keyup":return  -1!==END_KEYCODES.indexOf(nativeEvent.keyCode);case "keydown":return 229!==nativeEvent.keyCode;case "keypress":case "mousedown":case "focusout":return  true;default:return  false;}}function getDataFromCustomEvent(nativeEvent){nativeEvent=nativeEvent.detail;return "object"===typeof nativeEvent&&"data"in nativeEvent?nativeEvent.data:null;}var isComposing=false;function getNativeBeforeInputChars(domEventName,nativeEvent){switch(domEventName){case "compositionend":return getDataFromCustomEvent(nativeEvent);case "keypress":if(32!==nativeEvent.which)return null;hasSpaceKeypress=true;return SPACEBAR_CHAR;case "textInput":return domEventName=nativeEvent.data,domEventName===SPACEBAR_CHAR&&hasSpaceKeypress?null:domEventName;default:return null;}}function getFallbackBeforeInputChars(domEventName,nativeEvent){if(isComposing)return "compositionend"===domEventName||!canUseCompositionEvent&&isFallbackCompositionEnd(domEventName,nativeEvent)?(domEventName=getData(),fallbackText=startText=root=null,isComposing=false,domEventName):null;switch(domEventName){case "paste":return null;case "keypress":if(!(nativeEvent.ctrlKey||nativeEvent.altKey||nativeEvent.metaKey)||nativeEvent.ctrlKey&&nativeEvent.altKey){if(nativeEvent.char&&1<nativeEvent.char.length)return nativeEvent.char;if(nativeEvent.which)return String.fromCharCode(nativeEvent.which);}return null;case "compositionend":return useFallbackCompositionData&&"ko"!==nativeEvent.locale?null:nativeEvent.data;default:return null;}}var supportedInputTypes={color:true,date:true,datetime:true,"datetime-local":true,email:true,month:true,number:true,password:true,range:true,search:true,tel:true,text:true,time:true,url:true,week:true};function isTextInputElement(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();return "input"===nodeName?!!supportedInputTypes[elem.type]:"textarea"===nodeName?true:false;}function createAndAccumulateChangeEvent(dispatchQueue,inst,nativeEvent,target){restoreTarget?restoreQueue?restoreQueue.push(target):restoreQueue=[target]:restoreTarget=target;inst=accumulateTwoPhaseListeners(inst,"onChange");0<inst.length&&(nativeEvent=new SyntheticEvent("onChange","change",null,nativeEvent,target),dispatchQueue.push({event:nativeEvent,listeners:inst}));}var activeElement$1=null,activeElementInst$1=null;function runEventInBatch(dispatchQueue){processDispatchQueue(dispatchQueue,0);}function getInstIfValueChanged(targetInst){var targetNode=getNodeFromInstance(targetInst);if(updateValueIfChanged(targetNode))return targetInst;}function getTargetInstForChangeEvent(domEventName,targetInst){if("change"===domEventName)return targetInst;}var isInputEventSupported=false;if(canUseDOM){var JSCompiler_inline_result$jscomp$282;if(canUseDOM){var isSupported$jscomp$inline_417="oninput"in document;if(!isSupported$jscomp$inline_417){var element$jscomp$inline_418=document.createElement("div");element$jscomp$inline_418.setAttribute("oninput","return;");isSupported$jscomp$inline_417="function"===typeof element$jscomp$inline_418.oninput;}JSCompiler_inline_result$jscomp$282=isSupported$jscomp$inline_417;}else JSCompiler_inline_result$jscomp$282=false;isInputEventSupported=JSCompiler_inline_result$jscomp$282&&(!document.documentMode||9<document.documentMode);}function stopWatchingForValueChange(){activeElement$1&&(activeElement$1.detachEvent("onpropertychange",handlePropertyChange),activeElementInst$1=activeElement$1=null);}function handlePropertyChange(nativeEvent){if("value"===nativeEvent.propertyName&&getInstIfValueChanged(activeElementInst$1)){var dispatchQueue=[];createAndAccumulateChangeEvent(dispatchQueue,activeElementInst$1,nativeEvent,getEventTarget(nativeEvent));batchedUpdates$1(runEventInBatch,dispatchQueue);}}function handleEventsForInputEventPolyfill(domEventName,target,targetInst){"focusin"===domEventName?(stopWatchingForValueChange(),activeElement$1=target,activeElementInst$1=targetInst,activeElement$1.attachEvent("onpropertychange",handlePropertyChange)):"focusout"===domEventName&&stopWatchingForValueChange();}function getTargetInstForInputEventPolyfill(domEventName){if("selectionchange"===domEventName||"keyup"===domEventName||"keydown"===domEventName)return getInstIfValueChanged(activeElementInst$1);}function getTargetInstForClickEvent(domEventName,targetInst){if("click"===domEventName)return getInstIfValueChanged(targetInst);}function getTargetInstForInputOrChangeEvent(domEventName,targetInst){if("input"===domEventName||"change"===domEventName)return getInstIfValueChanged(targetInst);}function is(x,y){return x===y&&(0!==x||1/x===1/y)||x!==x&&y!==y;}var objectIs="function"===typeof Object.is?Object.is:is;function shallowEqual(objA,objB){if(objectIs(objA,objB))return  true;if("object"!==typeof objA||null===objA||"object"!==typeof objB||null===objB)return  false;var keysA=Object.keys(objA),keysB=Object.keys(objB);if(keysA.length!==keysB.length)return  false;for(keysB=0;keysB<keysA.length;keysB++){var currentKey=keysA[keysB];if(!hasOwnProperty.call(objB,currentKey)||!objectIs(objA[currentKey],objB[currentKey]))return  false;}return  true;}function getLeafNode(node){for(;node&&node.firstChild;)node=node.firstChild;return node;}function getNodeForCharacterOffset(root,offset){var node=getLeafNode(root);root=0;for(var nodeEnd;node;){if(3===node.nodeType){nodeEnd=root+node.textContent.length;if(root<=offset&&nodeEnd>=offset)return {node:node,offset:offset-root};root=nodeEnd;}a:{for(;node;){if(node.nextSibling){node=node.nextSibling;break a;}node=node.parentNode;}node=void 0;}node=getLeafNode(node);}}function containsNode(outerNode,innerNode){return outerNode&&innerNode?outerNode===innerNode?true:outerNode&&3===outerNode.nodeType?false:innerNode&&3===innerNode.nodeType?containsNode(outerNode,innerNode.parentNode):"contains"in outerNode?outerNode.contains(innerNode):outerNode.compareDocumentPosition?!!(outerNode.compareDocumentPosition(innerNode)&16):false:false;}function getActiveElementDeep(containerInfo){containerInfo=null!=containerInfo&&null!=containerInfo.ownerDocument&&null!=containerInfo.ownerDocument.defaultView?containerInfo.ownerDocument.defaultView:window;for(var element=getActiveElement(containerInfo.document);element instanceof containerInfo.HTMLIFrameElement;){try{var JSCompiler_inline_result="string"===typeof element.contentWindow.location.href;}catch(err){JSCompiler_inline_result=false;}if(JSCompiler_inline_result)containerInfo=element.contentWindow;else break;element=getActiveElement(containerInfo.document);}return element;}function hasSelectionCapabilities(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();return nodeName&&("input"===nodeName&&("text"===elem.type||"search"===elem.type||"tel"===elem.type||"url"===elem.type||"password"===elem.type)||"textarea"===nodeName||"true"===elem.contentEditable);}var skipSelectionChangeEvent=canUseDOM&&"documentMode"in document&&11>=document.documentMode,activeElement=null,activeElementInst=null,lastSelection=null,mouseDown=false;function constructSelectEvent(dispatchQueue,nativeEvent,nativeEventTarget){var doc=nativeEventTarget.window===nativeEventTarget?nativeEventTarget.document:9===nativeEventTarget.nodeType?nativeEventTarget:nativeEventTarget.ownerDocument;mouseDown||null==activeElement||activeElement!==getActiveElement(doc)||(doc=activeElement,"selectionStart"in doc&&hasSelectionCapabilities(doc)?doc={start:doc.selectionStart,end:doc.selectionEnd}:(doc=(doc.ownerDocument&&doc.ownerDocument.defaultView||window).getSelection(),doc={anchorNode:doc.anchorNode,anchorOffset:doc.anchorOffset,focusNode:doc.focusNode,focusOffset:doc.focusOffset}),lastSelection&&shallowEqual(lastSelection,doc)||(lastSelection=doc,doc=accumulateTwoPhaseListeners(activeElementInst,"onSelect"),0<doc.length&&(nativeEvent=new SyntheticEvent("onSelect","select",null,nativeEvent,nativeEventTarget),dispatchQueue.push({event:nativeEvent,listeners:doc}),nativeEvent.target=activeElement)));}function makePrefixMap(styleProp,eventName){var prefixes={};prefixes[styleProp.toLowerCase()]=eventName.toLowerCase();prefixes["Webkit"+styleProp]="webkit"+eventName;prefixes["Moz"+styleProp]="moz"+eventName;return prefixes;}var vendorPrefixes={animationend:makePrefixMap("Animation","AnimationEnd"),animationiteration:makePrefixMap("Animation","AnimationIteration"),animationstart:makePrefixMap("Animation","AnimationStart"),transitionrun:makePrefixMap("Transition","TransitionRun"),transitionstart:makePrefixMap("Transition","TransitionStart"),transitioncancel:makePrefixMap("Transition","TransitionCancel"),transitionend:makePrefixMap("Transition","TransitionEnd")},prefixedEventNames={},style={};canUseDOM&&(style=document.createElement("div").style,"AnimationEvent"in window||(delete vendorPrefixes.animationend.animation,delete vendorPrefixes.animationiteration.animation,delete vendorPrefixes.animationstart.animation),"TransitionEvent"in window||delete vendorPrefixes.transitionend.transition);function getVendorPrefixedEventName(eventName){if(prefixedEventNames[eventName])return prefixedEventNames[eventName];if(!vendorPrefixes[eventName])return eventName;var prefixMap=vendorPrefixes[eventName],styleProp;for(styleProp in prefixMap)if(prefixMap.hasOwnProperty(styleProp)&&styleProp in style)return prefixedEventNames[eventName]=prefixMap[styleProp];return eventName;}var ANIMATION_END=getVendorPrefixedEventName("animationend"),ANIMATION_ITERATION=getVendorPrefixedEventName("animationiteration"),ANIMATION_START=getVendorPrefixedEventName("animationstart"),TRANSITION_RUN=getVendorPrefixedEventName("transitionrun"),TRANSITION_START=getVendorPrefixedEventName("transitionstart"),TRANSITION_CANCEL=getVendorPrefixedEventName("transitioncancel"),TRANSITION_END=getVendorPrefixedEventName("transitionend"),topLevelEventsToReactNames=new Map(),simpleEventPluginEvents="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");simpleEventPluginEvents.push("scrollEnd");function registerSimpleEvent(domEventName,reactName){topLevelEventsToReactNames.set(domEventName,reactName);registerTwoPhaseEvent(reactName,[domEventName]);}var CapturedStacks=new WeakMap();function createCapturedValueAtFiber(value,source){if("object"===typeof value&&null!==value){var existing=CapturedStacks.get(value);if(void 0!==existing)return existing;source={value:value,source:source,stack:getStackByFiberInDevAndProd(source)};CapturedStacks.set(value,source);return source;}return {value:value,source:source,stack:getStackByFiberInDevAndProd(source)};}var concurrentQueues=[],concurrentQueuesIndex=0,concurrentlyUpdatedLanes=0;function finishQueueingConcurrentUpdates(){for(var endIndex=concurrentQueuesIndex,i=concurrentlyUpdatedLanes=concurrentQueuesIndex=0;i<endIndex;){var fiber=concurrentQueues[i];concurrentQueues[i++]=null;var queue=concurrentQueues[i];concurrentQueues[i++]=null;var update=concurrentQueues[i];concurrentQueues[i++]=null;var lane=concurrentQueues[i];concurrentQueues[i++]=null;if(null!==queue&&null!==update){var pending=queue.pending;null===pending?update.next=update:(update.next=pending.next,pending.next=update);queue.pending=update;}0!==lane&&markUpdateLaneFromFiberToRoot(fiber,update,lane);}}function enqueueUpdate$1(fiber,queue,update,lane){concurrentQueues[concurrentQueuesIndex++]=fiber;concurrentQueues[concurrentQueuesIndex++]=queue;concurrentQueues[concurrentQueuesIndex++]=update;concurrentQueues[concurrentQueuesIndex++]=lane;concurrentlyUpdatedLanes|=lane;fiber.lanes|=lane;fiber=fiber.alternate;null!==fiber&&(fiber.lanes|=lane);}function enqueueConcurrentHookUpdate(fiber,queue,update,lane){enqueueUpdate$1(fiber,queue,update,lane);return getRootForUpdatedFiber(fiber);}function enqueueConcurrentRenderForLane(fiber,lane){enqueueUpdate$1(fiber,null,null,lane);return getRootForUpdatedFiber(fiber);}function markUpdateLaneFromFiberToRoot(sourceFiber,update,lane){sourceFiber.lanes|=lane;var alternate=sourceFiber.alternate;null!==alternate&&(alternate.lanes|=lane);for(var isHidden=false,parent=sourceFiber.return;null!==parent;)parent.childLanes|=lane,alternate=parent.alternate,null!==alternate&&(alternate.childLanes|=lane),22===parent.tag&&(sourceFiber=parent.stateNode,null===sourceFiber||sourceFiber._visibility&1||(isHidden=true)),sourceFiber=parent,parent=parent.return;return 3===sourceFiber.tag?(parent=sourceFiber.stateNode,isHidden&&null!==update&&(isHidden=31-clz32(lane),sourceFiber=parent.hiddenUpdates,alternate=sourceFiber[isHidden],null===alternate?sourceFiber[isHidden]=[update]:alternate.push(update),update.lane=lane|536870912),parent):null;}function getRootForUpdatedFiber(sourceFiber){if(50<nestedUpdateCount)throw nestedUpdateCount=0,rootWithNestedUpdates=null,Error(formatProdErrorMessage(185));for(var parent=sourceFiber.return;null!==parent;)sourceFiber=parent,parent=sourceFiber.return;return 3===sourceFiber.tag?sourceFiber.stateNode:null;}var emptyContextObject={};function FiberNode(tag,pendingProps,key,mode){this.tag=tag;this.key=key;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.refCleanup=this.ref=null;this.pendingProps=pendingProps;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=mode;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null;}function createFiberImplClass(tag,pendingProps,key,mode){return new FiberNode(tag,pendingProps,key,mode);}function shouldConstruct(Component){Component=Component.prototype;return !(!Component||!Component.isReactComponent);}function createWorkInProgress(current,pendingProps){var workInProgress=current.alternate;null===workInProgress?(workInProgress=createFiberImplClass(current.tag,pendingProps,current.key,current.mode),workInProgress.elementType=current.elementType,workInProgress.type=current.type,workInProgress.stateNode=current.stateNode,workInProgress.alternate=current,current.alternate=workInProgress):(workInProgress.pendingProps=pendingProps,workInProgress.type=current.type,workInProgress.flags=0,workInProgress.subtreeFlags=0,workInProgress.deletions=null);workInProgress.flags=current.flags&65011712;workInProgress.childLanes=current.childLanes;workInProgress.lanes=current.lanes;workInProgress.child=current.child;workInProgress.memoizedProps=current.memoizedProps;workInProgress.memoizedState=current.memoizedState;workInProgress.updateQueue=current.updateQueue;pendingProps=current.dependencies;workInProgress.dependencies=null===pendingProps?null:{lanes:pendingProps.lanes,firstContext:pendingProps.firstContext};workInProgress.sibling=current.sibling;workInProgress.index=current.index;workInProgress.ref=current.ref;workInProgress.refCleanup=current.refCleanup;return workInProgress;}function resetWorkInProgress(workInProgress,renderLanes){workInProgress.flags&=65011714;var current=workInProgress.alternate;null===current?(workInProgress.childLanes=0,workInProgress.lanes=renderLanes,workInProgress.child=null,workInProgress.subtreeFlags=0,workInProgress.memoizedProps=null,workInProgress.memoizedState=null,workInProgress.updateQueue=null,workInProgress.dependencies=null,workInProgress.stateNode=null):(workInProgress.childLanes=current.childLanes,workInProgress.lanes=current.lanes,workInProgress.child=current.child,workInProgress.subtreeFlags=0,workInProgress.deletions=null,workInProgress.memoizedProps=current.memoizedProps,workInProgress.memoizedState=current.memoizedState,workInProgress.updateQueue=current.updateQueue,workInProgress.type=current.type,renderLanes=current.dependencies,workInProgress.dependencies=null===renderLanes?null:{lanes:renderLanes.lanes,firstContext:renderLanes.firstContext});return workInProgress;}function createFiberFromTypeAndProps(type,key,pendingProps,owner,mode,lanes){var fiberTag=0;owner=type;if("function"===typeof type)shouldConstruct(type)&&(fiberTag=1);else if("string"===typeof type)fiberTag=isHostHoistableType(type,pendingProps,contextStackCursor.current)?26:"html"===type||"head"===type||"body"===type?27:5;else a:switch(type){case REACT_ACTIVITY_TYPE:return type=createFiberImplClass(31,pendingProps,key,mode),type.elementType=REACT_ACTIVITY_TYPE,type.lanes=lanes,type;case REACT_FRAGMENT_TYPE:return createFiberFromFragment(pendingProps.children,mode,lanes,key);case REACT_STRICT_MODE_TYPE:fiberTag=8;mode|=24;break;case REACT_PROFILER_TYPE:return type=createFiberImplClass(12,pendingProps,key,mode|2),type.elementType=REACT_PROFILER_TYPE,type.lanes=lanes,type;case REACT_SUSPENSE_TYPE:return type=createFiberImplClass(13,pendingProps,key,mode),type.elementType=REACT_SUSPENSE_TYPE,type.lanes=lanes,type;case REACT_SUSPENSE_LIST_TYPE:return type=createFiberImplClass(19,pendingProps,key,mode),type.elementType=REACT_SUSPENSE_LIST_TYPE,type.lanes=lanes,type;default:if("object"===typeof type&&null!==type)switch(type.$$typeof){case REACT_PROVIDER_TYPE:case REACT_CONTEXT_TYPE:fiberTag=10;break a;case REACT_CONSUMER_TYPE:fiberTag=9;break a;case REACT_FORWARD_REF_TYPE:fiberTag=11;break a;case REACT_MEMO_TYPE:fiberTag=14;break a;case REACT_LAZY_TYPE:fiberTag=16;owner=null;break a;}fiberTag=29;pendingProps=Error(formatProdErrorMessage(130,null===type?"null":typeof type,""));owner=null;}key=createFiberImplClass(fiberTag,pendingProps,key,mode);key.elementType=type;key.type=owner;key.lanes=lanes;return key;}function createFiberFromFragment(elements,mode,lanes,key){elements=createFiberImplClass(7,elements,key,mode);elements.lanes=lanes;return elements;}function createFiberFromText(content,mode,lanes){content=createFiberImplClass(6,content,null,mode);content.lanes=lanes;return content;}function createFiberFromPortal(portal,mode,lanes){mode=createFiberImplClass(4,null!==portal.children?portal.children:[],portal.key,mode);mode.lanes=lanes;mode.stateNode={containerInfo:portal.containerInfo,pendingChildren:null,implementation:portal.implementation};return mode;}var forkStack=[],forkStackIndex=0,treeForkProvider=null,treeForkCount=0,idStack=[],idStackIndex=0,treeContextProvider=null,treeContextId=1,treeContextOverflow="";function pushTreeFork(workInProgress,totalChildren){forkStack[forkStackIndex++]=treeForkCount;forkStack[forkStackIndex++]=treeForkProvider;treeForkProvider=workInProgress;treeForkCount=totalChildren;}function pushTreeId(workInProgress,totalChildren,index){idStack[idStackIndex++]=treeContextId;idStack[idStackIndex++]=treeContextOverflow;idStack[idStackIndex++]=treeContextProvider;treeContextProvider=workInProgress;var baseIdWithLeadingBit=treeContextId;workInProgress=treeContextOverflow;var baseLength=32-clz32(baseIdWithLeadingBit)-1;baseIdWithLeadingBit&=~(1<<baseLength);index+=1;var length=32-clz32(totalChildren)+baseLength;if(30<length){var numberOfOverflowBits=baseLength-baseLength%5;length=(baseIdWithLeadingBit&(1<<numberOfOverflowBits)-1).toString(32);baseIdWithLeadingBit>>=numberOfOverflowBits;baseLength-=numberOfOverflowBits;treeContextId=1<<32-clz32(totalChildren)+baseLength|index<<baseLength|baseIdWithLeadingBit;treeContextOverflow=length+workInProgress;}else treeContextId=1<<length|index<<baseLength|baseIdWithLeadingBit,treeContextOverflow=workInProgress;}function pushMaterializedTreeId(workInProgress){null!==workInProgress.return&&(pushTreeFork(workInProgress,1),pushTreeId(workInProgress,1,0));}function popTreeContext(workInProgress){for(;workInProgress===treeForkProvider;)treeForkProvider=forkStack[--forkStackIndex],forkStack[forkStackIndex]=null,treeForkCount=forkStack[--forkStackIndex],forkStack[forkStackIndex]=null;for(;workInProgress===treeContextProvider;)treeContextProvider=idStack[--idStackIndex],idStack[idStackIndex]=null,treeContextOverflow=idStack[--idStackIndex],idStack[idStackIndex]=null,treeContextId=idStack[--idStackIndex],idStack[idStackIndex]=null;}var hydrationParentFiber=null,nextHydratableInstance=null,isHydrating=false,hydrationErrors=null,rootOrSingletonContext=false,HydrationMismatchException=Error(formatProdErrorMessage(519));function throwOnHydrationMismatch(fiber){var error=Error(formatProdErrorMessage(418,""));queueHydrationError(createCapturedValueAtFiber(error,fiber));throw HydrationMismatchException;}function prepareToHydrateHostInstance(fiber){var instance=fiber.stateNode,type=fiber.type,props=fiber.memoizedProps;instance[internalInstanceKey]=fiber;instance[internalPropsKey]=props;switch(type){case "dialog":listenToNonDelegatedEvent("cancel",instance);listenToNonDelegatedEvent("close",instance);break;case "iframe":case "object":case "embed":listenToNonDelegatedEvent("load",instance);break;case "video":case "audio":for(type=0;type<mediaEventTypes.length;type++)listenToNonDelegatedEvent(mediaEventTypes[type],instance);break;case "source":listenToNonDelegatedEvent("error",instance);break;case "img":case "image":case "link":listenToNonDelegatedEvent("error",instance);listenToNonDelegatedEvent("load",instance);break;case "details":listenToNonDelegatedEvent("toggle",instance);break;case "input":listenToNonDelegatedEvent("invalid",instance);initInput(instance,props.value,props.defaultValue,props.checked,props.defaultChecked,props.type,props.name,true);track(instance);break;case "select":listenToNonDelegatedEvent("invalid",instance);break;case "textarea":listenToNonDelegatedEvent("invalid",instance),initTextarea(instance,props.value,props.defaultValue,props.children),track(instance);}type=props.children;"string"!==typeof type&&"number"!==typeof type&&"bigint"!==typeof type||instance.textContent===""+type||true===props.suppressHydrationWarning||checkForUnmatchedText(instance.textContent,type)?(null!=props.popover&&(listenToNonDelegatedEvent("beforetoggle",instance),listenToNonDelegatedEvent("toggle",instance)),null!=props.onScroll&&listenToNonDelegatedEvent("scroll",instance),null!=props.onScrollEnd&&listenToNonDelegatedEvent("scrollend",instance),null!=props.onClick&&(instance.onclick=noop$1),instance=true):instance=false;instance||throwOnHydrationMismatch(fiber);}function popToNextHostParent(fiber){for(hydrationParentFiber=fiber.return;hydrationParentFiber;)switch(hydrationParentFiber.tag){case 5:case 13:rootOrSingletonContext=false;return;case 27:case 3:rootOrSingletonContext=true;return;default:hydrationParentFiber=hydrationParentFiber.return;}}function popHydrationState(fiber){if(fiber!==hydrationParentFiber)return  false;if(!isHydrating)return popToNextHostParent(fiber),isHydrating=true,false;var tag=fiber.tag,JSCompiler_temp;if(JSCompiler_temp=3!==tag&&27!==tag){if(JSCompiler_temp=5===tag)JSCompiler_temp=fiber.type,JSCompiler_temp=!("form"!==JSCompiler_temp&&"button"!==JSCompiler_temp)||shouldSetTextContent(fiber.type,fiber.memoizedProps);JSCompiler_temp=!JSCompiler_temp;}JSCompiler_temp&&nextHydratableInstance&&throwOnHydrationMismatch(fiber);popToNextHostParent(fiber);if(13===tag){fiber=fiber.memoizedState;fiber=null!==fiber?fiber.dehydrated:null;if(!fiber)throw Error(formatProdErrorMessage(317));a:{fiber=fiber.nextSibling;for(tag=0;fiber;){if(8===fiber.nodeType)if(JSCompiler_temp=fiber.data,"/$"===JSCompiler_temp){if(0===tag){nextHydratableInstance=getNextHydratable(fiber.nextSibling);break a;}tag--;}else "$"!==JSCompiler_temp&&"$!"!==JSCompiler_temp&&"$?"!==JSCompiler_temp||tag++;fiber=fiber.nextSibling;}nextHydratableInstance=null;}}else 27===tag?(tag=nextHydratableInstance,isSingletonScope(fiber.type)?(fiber=previousHydratableOnEnteringScopedSingleton,previousHydratableOnEnteringScopedSingleton=null,nextHydratableInstance=fiber):nextHydratableInstance=tag):nextHydratableInstance=hydrationParentFiber?getNextHydratable(fiber.stateNode.nextSibling):null;return  true;}function resetHydrationState(){nextHydratableInstance=hydrationParentFiber=null;isHydrating=false;}function upgradeHydrationErrorsToRecoverable(){var queuedErrors=hydrationErrors;null!==queuedErrors&&(null===workInProgressRootRecoverableErrors?workInProgressRootRecoverableErrors=queuedErrors:workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors,queuedErrors),hydrationErrors=null);return queuedErrors;}function queueHydrationError(error){null===hydrationErrors?hydrationErrors=[error]:hydrationErrors.push(error);}var valueCursor=createCursor(null),currentlyRenderingFiber$1=null,lastContextDependency=null;function pushProvider(providerFiber,context,nextValue){push(valueCursor,context._currentValue);context._currentValue=nextValue;}function popProvider(context){context._currentValue=valueCursor.current;pop(valueCursor);}function scheduleContextWorkOnParentPath(parent,renderLanes,propagationRoot){for(;null!==parent;){var alternate=parent.alternate;(parent.childLanes&renderLanes)!==renderLanes?(parent.childLanes|=renderLanes,null!==alternate&&(alternate.childLanes|=renderLanes)):null!==alternate&&(alternate.childLanes&renderLanes)!==renderLanes&&(alternate.childLanes|=renderLanes);if(parent===propagationRoot)break;parent=parent.return;}}function propagateContextChanges(workInProgress,contexts,renderLanes,forcePropagateEntireTree){var fiber=workInProgress.child;null!==fiber&&(fiber.return=workInProgress);for(;null!==fiber;){var list=fiber.dependencies;if(null!==list){var nextFiber=fiber.child;list=list.firstContext;a:for(;null!==list;){var dependency=list;list=fiber;for(var i=0;i<contexts.length;i++)if(dependency.context===contexts[i]){list.lanes|=renderLanes;dependency=list.alternate;null!==dependency&&(dependency.lanes|=renderLanes);scheduleContextWorkOnParentPath(list.return,renderLanes,workInProgress);forcePropagateEntireTree||(nextFiber=null);break a;}list=dependency.next;}}else if(18===fiber.tag){nextFiber=fiber.return;if(null===nextFiber)throw Error(formatProdErrorMessage(341));nextFiber.lanes|=renderLanes;list=nextFiber.alternate;null!==list&&(list.lanes|=renderLanes);scheduleContextWorkOnParentPath(nextFiber,renderLanes,workInProgress);nextFiber=null;}else nextFiber=fiber.child;if(null!==nextFiber)nextFiber.return=fiber;else for(nextFiber=fiber;null!==nextFiber;){if(nextFiber===workInProgress){nextFiber=null;break;}fiber=nextFiber.sibling;if(null!==fiber){fiber.return=nextFiber.return;nextFiber=fiber;break;}nextFiber=nextFiber.return;}fiber=nextFiber;}}function propagateParentContextChanges(current,workInProgress,renderLanes,forcePropagateEntireTree){current=null;for(var parent=workInProgress,isInsidePropagationBailout=false;null!==parent;){if(!isInsidePropagationBailout)if(0!==(parent.flags&524288))isInsidePropagationBailout=true;else if(0!==(parent.flags&262144))break;if(10===parent.tag){var currentParent=parent.alternate;if(null===currentParent)throw Error(formatProdErrorMessage(387));currentParent=currentParent.memoizedProps;if(null!==currentParent){var context=parent.type;objectIs(parent.pendingProps.value,currentParent.value)||(null!==current?current.push(context):current=[context]);}}else if(parent===hostTransitionProviderCursor.current){currentParent=parent.alternate;if(null===currentParent)throw Error(formatProdErrorMessage(387));currentParent.memoizedState.memoizedState!==parent.memoizedState.memoizedState&&(null!==current?current.push(HostTransitionContext):current=[HostTransitionContext]);}parent=parent.return;}null!==current&&propagateContextChanges(workInProgress,current,renderLanes,forcePropagateEntireTree);workInProgress.flags|=262144;}function checkIfContextChanged(currentDependencies){for(currentDependencies=currentDependencies.firstContext;null!==currentDependencies;){if(!objectIs(currentDependencies.context._currentValue,currentDependencies.memoizedValue))return  true;currentDependencies=currentDependencies.next;}return  false;}function prepareToReadContext(workInProgress){currentlyRenderingFiber$1=workInProgress;lastContextDependency=null;workInProgress=workInProgress.dependencies;null!==workInProgress&&(workInProgress.firstContext=null);}function readContext(context){return readContextForConsumer(currentlyRenderingFiber$1,context);}function readContextDuringReconciliation(consumer,context){null===currentlyRenderingFiber$1&&prepareToReadContext(consumer);return readContextForConsumer(consumer,context);}function readContextForConsumer(consumer,context){var value=context._currentValue;context={context:context,memoizedValue:value,next:null};if(null===lastContextDependency){if(null===consumer)throw Error(formatProdErrorMessage(308));lastContextDependency=context;consumer.dependencies={lanes:0,firstContext:context};consumer.flags|=524288;}else lastContextDependency=lastContextDependency.next=context;return value;}var AbortControllerLocal="undefined"!==typeof AbortController?AbortController:function(){var listeners=[],signal=this.signal={aborted:false,addEventListener:function(type,listener){listeners.push(listener);}};this.abort=function(){signal.aborted=true;listeners.forEach(function(listener){return listener();});};},scheduleCallback$2=Scheduler.unstable_scheduleCallback,NormalPriority=Scheduler.unstable_NormalPriority,CacheContext={$$typeof:REACT_CONTEXT_TYPE,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function createCache(){return {controller:new AbortControllerLocal(),data:new Map(),refCount:0};}function releaseCache(cache){cache.refCount--;0===cache.refCount&&scheduleCallback$2(NormalPriority,function(){cache.controller.abort();});}var currentEntangledListeners=null,currentEntangledPendingCount=0,currentEntangledLane=0,currentEntangledActionThenable=null;function entangleAsyncAction(transition,thenable){if(null===currentEntangledListeners){var entangledListeners=currentEntangledListeners=[];currentEntangledPendingCount=0;currentEntangledLane=requestTransitionLane();currentEntangledActionThenable={status:"pending",value:void 0,then:function(resolve){entangledListeners.push(resolve);}};}currentEntangledPendingCount++;thenable.then(pingEngtangledActionScope,pingEngtangledActionScope);return thenable;}function pingEngtangledActionScope(){if(0===--currentEntangledPendingCount&&null!==currentEntangledListeners){null!==currentEntangledActionThenable&&(currentEntangledActionThenable.status="fulfilled");var listeners=currentEntangledListeners;currentEntangledListeners=null;currentEntangledLane=0;currentEntangledActionThenable=null;for(var i=0;i<listeners.length;i++)(0, listeners[i])();}}function chainThenableValue(thenable,result){var listeners=[],thenableWithOverride={status:"pending",value:null,reason:null,then:function(resolve){listeners.push(resolve);}};thenable.then(function(){thenableWithOverride.status="fulfilled";thenableWithOverride.value=result;for(var i=0;i<listeners.length;i++)(0, listeners[i])(result);},function(error){thenableWithOverride.status="rejected";thenableWithOverride.reason=error;for(error=0;error<listeners.length;error++)(0, listeners[error])(void 0);});return thenableWithOverride;}var prevOnStartTransitionFinish=ReactSharedInternals.S;ReactSharedInternals.S=function(transition,returnValue){"object"===typeof returnValue&&null!==returnValue&&"function"===typeof returnValue.then&&entangleAsyncAction(transition,returnValue);null!==prevOnStartTransitionFinish&&prevOnStartTransitionFinish(transition,returnValue);};var resumedCache=createCursor(null);function peekCacheFromPool(){var cacheResumedFromPreviousRender=resumedCache.current;return null!==cacheResumedFromPreviousRender?cacheResumedFromPreviousRender:workInProgressRoot.pooledCache;}function pushTransition(offscreenWorkInProgress,prevCachePool){null===prevCachePool?push(resumedCache,resumedCache.current):push(resumedCache,prevCachePool.pool);}function getSuspendedCache(){var cacheFromPool=peekCacheFromPool();return null===cacheFromPool?null:{parent:CacheContext._currentValue,pool:cacheFromPool};}var SuspenseException=Error(formatProdErrorMessage(460)),SuspenseyCommitException=Error(formatProdErrorMessage(474)),SuspenseActionException=Error(formatProdErrorMessage(542)),noopSuspenseyCommitThenable={then:function(){}};function isThenableResolved(thenable){thenable=thenable.status;return "fulfilled"===thenable||"rejected"===thenable;}function noop$3(){}function trackUsedThenable(thenableState,thenable,index){index=thenableState[index];void 0===index?thenableState.push(thenable):index!==thenable&&(thenable.then(noop$3,noop$3),thenable=index);switch(thenable.status){case "fulfilled":return thenable.value;case "rejected":throw thenableState=thenable.reason,checkIfUseWrappedInAsyncCatch(thenableState),thenableState;default:if("string"===typeof thenable.status)thenable.then(noop$3,noop$3);else {thenableState=workInProgressRoot;if(null!==thenableState&&100<thenableState.shellSuspendCounter)throw Error(formatProdErrorMessage(482));thenableState=thenable;thenableState.status="pending";thenableState.then(function(fulfilledValue){if("pending"===thenable.status){var fulfilledThenable=thenable;fulfilledThenable.status="fulfilled";fulfilledThenable.value=fulfilledValue;}},function(error){if("pending"===thenable.status){var rejectedThenable=thenable;rejectedThenable.status="rejected";rejectedThenable.reason=error;}});}switch(thenable.status){case "fulfilled":return thenable.value;case "rejected":throw thenableState=thenable.reason,checkIfUseWrappedInAsyncCatch(thenableState),thenableState;}suspendedThenable=thenable;throw SuspenseException;}}var suspendedThenable=null;function getSuspendedThenable(){if(null===suspendedThenable)throw Error(formatProdErrorMessage(459));var thenable=suspendedThenable;suspendedThenable=null;return thenable;}function checkIfUseWrappedInAsyncCatch(rejectedReason){if(rejectedReason===SuspenseException||rejectedReason===SuspenseActionException)throw Error(formatProdErrorMessage(483));}var hasForceUpdate=false;function initializeUpdateQueue(fiber){fiber.updateQueue={baseState:fiber.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null};}function cloneUpdateQueue(current,workInProgress){current=current.updateQueue;workInProgress.updateQueue===current&&(workInProgress.updateQueue={baseState:current.baseState,firstBaseUpdate:current.firstBaseUpdate,lastBaseUpdate:current.lastBaseUpdate,shared:current.shared,callbacks:null});}function createUpdate(lane){return {lane:lane,tag:0,payload:null,callback:null,next:null};}function enqueueUpdate(fiber,update,lane){var updateQueue=fiber.updateQueue;if(null===updateQueue)return null;updateQueue=updateQueue.shared;if(0!==(executionContext&2)){var pending=updateQueue.pending;null===pending?update.next=update:(update.next=pending.next,pending.next=update);updateQueue.pending=update;update=getRootForUpdatedFiber(fiber);markUpdateLaneFromFiberToRoot(fiber,null,lane);return update;}enqueueUpdate$1(fiber,updateQueue,update,lane);return getRootForUpdatedFiber(fiber);}function entangleTransitions(root,fiber,lane){fiber=fiber.updateQueue;if(null!==fiber&&(fiber=fiber.shared,0!==(lane&4194048))){var queueLanes=fiber.lanes;queueLanes&=root.pendingLanes;lane|=queueLanes;fiber.lanes=lane;markRootEntangled(root,lane);}}function enqueueCapturedUpdate(workInProgress,capturedUpdate){var queue=workInProgress.updateQueue,current=workInProgress.alternate;if(null!==current&&(current=current.updateQueue,queue===current)){var newFirst=null,newLast=null;queue=queue.firstBaseUpdate;if(null!==queue){do{var clone={lane:queue.lane,tag:queue.tag,payload:queue.payload,callback:null,next:null};null===newLast?newFirst=newLast=clone:newLast=newLast.next=clone;queue=queue.next;}while(null!==queue);null===newLast?newFirst=newLast=capturedUpdate:newLast=newLast.next=capturedUpdate;}else newFirst=newLast=capturedUpdate;queue={baseState:current.baseState,firstBaseUpdate:newFirst,lastBaseUpdate:newLast,shared:current.shared,callbacks:current.callbacks};workInProgress.updateQueue=queue;return;}workInProgress=queue.lastBaseUpdate;null===workInProgress?queue.firstBaseUpdate=capturedUpdate:workInProgress.next=capturedUpdate;queue.lastBaseUpdate=capturedUpdate;}var didReadFromEntangledAsyncAction=false;function suspendIfUpdateReadFromEntangledAsyncAction(){if(didReadFromEntangledAsyncAction){var entangledActionThenable=currentEntangledActionThenable;if(null!==entangledActionThenable)throw entangledActionThenable;}}function processUpdateQueue(workInProgress$jscomp$0,props,instance$jscomp$0,renderLanes){didReadFromEntangledAsyncAction=false;var queue=workInProgress$jscomp$0.updateQueue;hasForceUpdate=false;var firstBaseUpdate=queue.firstBaseUpdate,lastBaseUpdate=queue.lastBaseUpdate,pendingQueue=queue.shared.pending;if(null!==pendingQueue){queue.shared.pending=null;var lastPendingUpdate=pendingQueue,firstPendingUpdate=lastPendingUpdate.next;lastPendingUpdate.next=null;null===lastBaseUpdate?firstBaseUpdate=firstPendingUpdate:lastBaseUpdate.next=firstPendingUpdate;lastBaseUpdate=lastPendingUpdate;var current=workInProgress$jscomp$0.alternate;null!==current&&(current=current.updateQueue,pendingQueue=current.lastBaseUpdate,pendingQueue!==lastBaseUpdate&&(null===pendingQueue?current.firstBaseUpdate=firstPendingUpdate:pendingQueue.next=firstPendingUpdate,current.lastBaseUpdate=lastPendingUpdate));}if(null!==firstBaseUpdate){var newState=queue.baseState;lastBaseUpdate=0;current=firstPendingUpdate=lastPendingUpdate=null;pendingQueue=firstBaseUpdate;do{var updateLane=pendingQueue.lane&-536870913,isHiddenUpdate=updateLane!==pendingQueue.lane;if(isHiddenUpdate?(workInProgressRootRenderLanes&updateLane)===updateLane:(renderLanes&updateLane)===updateLane){0!==updateLane&&updateLane===currentEntangledLane&&(didReadFromEntangledAsyncAction=true);null!==current&&(current=current.next={lane:0,tag:pendingQueue.tag,payload:pendingQueue.payload,callback:null,next:null});a:{var workInProgress=workInProgress$jscomp$0,update=pendingQueue;updateLane=props;var instance=instance$jscomp$0;switch(update.tag){case 1:workInProgress=update.payload;if("function"===typeof workInProgress){newState=workInProgress.call(instance,newState,updateLane);break a;}newState=workInProgress;break a;case 3:workInProgress.flags=workInProgress.flags&-65537|128;case 0:workInProgress=update.payload;updateLane="function"===typeof workInProgress?workInProgress.call(instance,newState,updateLane):workInProgress;if(null===updateLane||void 0===updateLane)break a;newState=assign({},newState,updateLane);break a;case 2:hasForceUpdate=true;}}updateLane=pendingQueue.callback;null!==updateLane&&(workInProgress$jscomp$0.flags|=64,isHiddenUpdate&&(workInProgress$jscomp$0.flags|=8192),isHiddenUpdate=queue.callbacks,null===isHiddenUpdate?queue.callbacks=[updateLane]:isHiddenUpdate.push(updateLane));}else isHiddenUpdate={lane:updateLane,tag:pendingQueue.tag,payload:pendingQueue.payload,callback:pendingQueue.callback,next:null},null===current?(firstPendingUpdate=current=isHiddenUpdate,lastPendingUpdate=newState):current=current.next=isHiddenUpdate,lastBaseUpdate|=updateLane;pendingQueue=pendingQueue.next;if(null===pendingQueue)if(pendingQueue=queue.shared.pending,null===pendingQueue)break;else isHiddenUpdate=pendingQueue,pendingQueue=isHiddenUpdate.next,isHiddenUpdate.next=null,queue.lastBaseUpdate=isHiddenUpdate,queue.shared.pending=null;}while(1);null===current&&(lastPendingUpdate=newState);queue.baseState=lastPendingUpdate;queue.firstBaseUpdate=firstPendingUpdate;queue.lastBaseUpdate=current;null===firstBaseUpdate&&(queue.shared.lanes=0);workInProgressRootSkippedLanes|=lastBaseUpdate;workInProgress$jscomp$0.lanes=lastBaseUpdate;workInProgress$jscomp$0.memoizedState=newState;}}function callCallback(callback,context){if("function"!==typeof callback)throw Error(formatProdErrorMessage(191,callback));callback.call(context);}function commitCallbacks(updateQueue,context){var callbacks=updateQueue.callbacks;if(null!==callbacks)for(updateQueue.callbacks=null,updateQueue=0;updateQueue<callbacks.length;updateQueue++)callCallback(callbacks[updateQueue],context);}var currentTreeHiddenStackCursor=createCursor(null),prevEntangledRenderLanesCursor=createCursor(0);function pushHiddenContext(fiber,context){fiber=entangledRenderLanes;push(prevEntangledRenderLanesCursor,fiber);push(currentTreeHiddenStackCursor,context);entangledRenderLanes=fiber|context.baseLanes;}function reuseHiddenContextOnStack(){push(prevEntangledRenderLanesCursor,entangledRenderLanes);push(currentTreeHiddenStackCursor,currentTreeHiddenStackCursor.current);}function popHiddenContext(){entangledRenderLanes=prevEntangledRenderLanesCursor.current;pop(currentTreeHiddenStackCursor);pop(prevEntangledRenderLanesCursor);}var renderLanes=0,currentlyRenderingFiber=null,currentHook=null,workInProgressHook=null,didScheduleRenderPhaseUpdate=false,didScheduleRenderPhaseUpdateDuringThisPass=false,shouldDoubleInvokeUserFnsInHooksDEV=false,localIdCounter=0,thenableIndexCounter$1=0,thenableState$1=null,globalClientIdCounter=0;function throwInvalidHookError(){throw Error(formatProdErrorMessage(321));}function areHookInputsEqual(nextDeps,prevDeps){if(null===prevDeps)return  false;for(var i=0;i<prevDeps.length&&i<nextDeps.length;i++)if(!objectIs(nextDeps[i],prevDeps[i]))return  false;return  true;}function renderWithHooks(current,workInProgress,Component,props,secondArg,nextRenderLanes){renderLanes=nextRenderLanes;currentlyRenderingFiber=workInProgress;workInProgress.memoizedState=null;workInProgress.updateQueue=null;workInProgress.lanes=0;ReactSharedInternals.H=null===current||null===current.memoizedState?HooksDispatcherOnMount:HooksDispatcherOnUpdate;shouldDoubleInvokeUserFnsInHooksDEV=false;nextRenderLanes=Component(props,secondArg);shouldDoubleInvokeUserFnsInHooksDEV=false;didScheduleRenderPhaseUpdateDuringThisPass&&(nextRenderLanes=renderWithHooksAgain(workInProgress,Component,props,secondArg));finishRenderingHooks(current);return nextRenderLanes;}function finishRenderingHooks(current){ReactSharedInternals.H=ContextOnlyDispatcher;var didRenderTooFewHooks=null!==currentHook&&null!==currentHook.next;renderLanes=0;workInProgressHook=currentHook=currentlyRenderingFiber=null;didScheduleRenderPhaseUpdate=false;thenableIndexCounter$1=0;thenableState$1=null;if(didRenderTooFewHooks)throw Error(formatProdErrorMessage(300));null===current||didReceiveUpdate||(current=current.dependencies,null!==current&&checkIfContextChanged(current)&&(didReceiveUpdate=true));}function renderWithHooksAgain(workInProgress,Component,props,secondArg){currentlyRenderingFiber=workInProgress;var numberOfReRenders=0;do{didScheduleRenderPhaseUpdateDuringThisPass&&(thenableState$1=null);thenableIndexCounter$1=0;didScheduleRenderPhaseUpdateDuringThisPass=false;if(25<=numberOfReRenders)throw Error(formatProdErrorMessage(301));numberOfReRenders+=1;workInProgressHook=currentHook=null;if(null!=workInProgress.updateQueue){var children=workInProgress.updateQueue;children.lastEffect=null;children.events=null;children.stores=null;null!=children.memoCache&&(children.memoCache.index=0);}ReactSharedInternals.H=HooksDispatcherOnRerender;children=Component(props,secondArg);}while(didScheduleRenderPhaseUpdateDuringThisPass);return children;}function TransitionAwareHostComponent(){var dispatcher=ReactSharedInternals.H,maybeThenable=dispatcher.useState()[0];maybeThenable="function"===typeof maybeThenable.then?useThenable(maybeThenable):maybeThenable;dispatcher=dispatcher.useState()[0];(null!==currentHook?currentHook.memoizedState:null)!==dispatcher&&(currentlyRenderingFiber.flags|=1024);return maybeThenable;}function checkDidRenderIdHook(){var didRenderIdHook=0!==localIdCounter;localIdCounter=0;return didRenderIdHook;}function bailoutHooks(current,workInProgress,lanes){workInProgress.updateQueue=current.updateQueue;workInProgress.flags&=-2053;current.lanes&=~lanes;}function resetHooksOnUnwind(workInProgress){if(didScheduleRenderPhaseUpdate){for(workInProgress=workInProgress.memoizedState;null!==workInProgress;){var queue=workInProgress.queue;null!==queue&&(queue.pending=null);workInProgress=workInProgress.next;}didScheduleRenderPhaseUpdate=false;}renderLanes=0;workInProgressHook=currentHook=currentlyRenderingFiber=null;didScheduleRenderPhaseUpdateDuringThisPass=false;thenableIndexCounter$1=localIdCounter=0;thenableState$1=null;}function mountWorkInProgressHook(){var hook={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===workInProgressHook?currentlyRenderingFiber.memoizedState=workInProgressHook=hook:workInProgressHook=workInProgressHook.next=hook;return workInProgressHook;}function updateWorkInProgressHook(){if(null===currentHook){var nextCurrentHook=currentlyRenderingFiber.alternate;nextCurrentHook=null!==nextCurrentHook?nextCurrentHook.memoizedState:null;}else nextCurrentHook=currentHook.next;var nextWorkInProgressHook=null===workInProgressHook?currentlyRenderingFiber.memoizedState:workInProgressHook.next;if(null!==nextWorkInProgressHook)workInProgressHook=nextWorkInProgressHook,currentHook=nextCurrentHook;else {if(null===nextCurrentHook){if(null===currentlyRenderingFiber.alternate)throw Error(formatProdErrorMessage(467));throw Error(formatProdErrorMessage(310));}currentHook=nextCurrentHook;nextCurrentHook={memoizedState:currentHook.memoizedState,baseState:currentHook.baseState,baseQueue:currentHook.baseQueue,queue:currentHook.queue,next:null};null===workInProgressHook?currentlyRenderingFiber.memoizedState=workInProgressHook=nextCurrentHook:workInProgressHook=workInProgressHook.next=nextCurrentHook;}return workInProgressHook;}function createFunctionComponentUpdateQueue(){return {lastEffect:null,events:null,stores:null,memoCache:null};}function useThenable(thenable){var index=thenableIndexCounter$1;thenableIndexCounter$1+=1;null===thenableState$1&&(thenableState$1=[]);thenable=trackUsedThenable(thenableState$1,thenable,index);index=currentlyRenderingFiber;null===(null===workInProgressHook?index.memoizedState:workInProgressHook.next)&&(index=index.alternate,ReactSharedInternals.H=null===index||null===index.memoizedState?HooksDispatcherOnMount:HooksDispatcherOnUpdate);return thenable;}function use(usable){if(null!==usable&&"object"===typeof usable){if("function"===typeof usable.then)return useThenable(usable);if(usable.$$typeof===REACT_CONTEXT_TYPE)return readContext(usable);}throw Error(formatProdErrorMessage(438,String(usable)));}function useMemoCache(size){var memoCache=null,updateQueue=currentlyRenderingFiber.updateQueue;null!==updateQueue&&(memoCache=updateQueue.memoCache);if(null==memoCache){var current=currentlyRenderingFiber.alternate;null!==current&&(current=current.updateQueue,null!==current&&(current=current.memoCache,null!=current&&(memoCache={data:current.data.map(function(array){return array.slice();}),index:0})));}null==memoCache&&(memoCache={data:[],index:0});null===updateQueue&&(updateQueue=createFunctionComponentUpdateQueue(),currentlyRenderingFiber.updateQueue=updateQueue);updateQueue.memoCache=memoCache;updateQueue=memoCache.data[memoCache.index];if(void 0===updateQueue)for(updateQueue=memoCache.data[memoCache.index]=Array(size),current=0;current<size;current++)updateQueue[current]=REACT_MEMO_CACHE_SENTINEL;memoCache.index++;return updateQueue;}function basicStateReducer(state,action){return "function"===typeof action?action(state):action;}function updateReducer(reducer){var hook=updateWorkInProgressHook();return updateReducerImpl(hook,currentHook,reducer);}function updateReducerImpl(hook,current,reducer){var queue=hook.queue;if(null===queue)throw Error(formatProdErrorMessage(311));queue.lastRenderedReducer=reducer;var baseQueue=hook.baseQueue,pendingQueue=queue.pending;if(null!==pendingQueue){if(null!==baseQueue){var baseFirst=baseQueue.next;baseQueue.next=pendingQueue.next;pendingQueue.next=baseFirst;}current.baseQueue=baseQueue=pendingQueue;queue.pending=null;}pendingQueue=hook.baseState;if(null===baseQueue)hook.memoizedState=pendingQueue;else {current=baseQueue.next;var newBaseQueueFirst=baseFirst=null,newBaseQueueLast=null,update=current,didReadFromEntangledAsyncAction$32=false;do{var updateLane=update.lane&-536870913;if(updateLane!==update.lane?(workInProgressRootRenderLanes&updateLane)===updateLane:(renderLanes&updateLane)===updateLane){var revertLane=update.revertLane;if(0===revertLane)null!==newBaseQueueLast&&(newBaseQueueLast=newBaseQueueLast.next={lane:0,revertLane:0,action:update.action,hasEagerState:update.hasEagerState,eagerState:update.eagerState,next:null}),updateLane===currentEntangledLane&&(didReadFromEntangledAsyncAction$32=true);else if((renderLanes&revertLane)===revertLane){update=update.next;revertLane===currentEntangledLane&&(didReadFromEntangledAsyncAction$32=true);continue;}else updateLane={lane:0,revertLane:update.revertLane,action:update.action,hasEagerState:update.hasEagerState,eagerState:update.eagerState,next:null},null===newBaseQueueLast?(newBaseQueueFirst=newBaseQueueLast=updateLane,baseFirst=pendingQueue):newBaseQueueLast=newBaseQueueLast.next=updateLane,currentlyRenderingFiber.lanes|=revertLane,workInProgressRootSkippedLanes|=revertLane;updateLane=update.action;shouldDoubleInvokeUserFnsInHooksDEV&&reducer(pendingQueue,updateLane);pendingQueue=update.hasEagerState?update.eagerState:reducer(pendingQueue,updateLane);}else revertLane={lane:updateLane,revertLane:update.revertLane,action:update.action,hasEagerState:update.hasEagerState,eagerState:update.eagerState,next:null},null===newBaseQueueLast?(newBaseQueueFirst=newBaseQueueLast=revertLane,baseFirst=pendingQueue):newBaseQueueLast=newBaseQueueLast.next=revertLane,currentlyRenderingFiber.lanes|=updateLane,workInProgressRootSkippedLanes|=updateLane;update=update.next;}while(null!==update&&update!==current);null===newBaseQueueLast?baseFirst=pendingQueue:newBaseQueueLast.next=newBaseQueueFirst;if(!objectIs(pendingQueue,hook.memoizedState)&&(didReceiveUpdate=true,didReadFromEntangledAsyncAction$32&&(reducer=currentEntangledActionThenable,null!==reducer)))throw reducer;hook.memoizedState=pendingQueue;hook.baseState=baseFirst;hook.baseQueue=newBaseQueueLast;queue.lastRenderedState=pendingQueue;}null===baseQueue&&(queue.lanes=0);return [hook.memoizedState,queue.dispatch];}function rerenderReducer(reducer){var hook=updateWorkInProgressHook(),queue=hook.queue;if(null===queue)throw Error(formatProdErrorMessage(311));queue.lastRenderedReducer=reducer;var dispatch=queue.dispatch,lastRenderPhaseUpdate=queue.pending,newState=hook.memoizedState;if(null!==lastRenderPhaseUpdate){queue.pending=null;var update=lastRenderPhaseUpdate=lastRenderPhaseUpdate.next;do newState=reducer(newState,update.action),update=update.next;while(update!==lastRenderPhaseUpdate);objectIs(newState,hook.memoizedState)||(didReceiveUpdate=true);hook.memoizedState=newState;null===hook.baseQueue&&(hook.baseState=newState);queue.lastRenderedState=newState;}return [newState,dispatch];}function updateSyncExternalStore(subscribe,getSnapshot,getServerSnapshot){var fiber=currentlyRenderingFiber,hook=updateWorkInProgressHook(),isHydrating$jscomp$0=isHydrating;if(isHydrating$jscomp$0){if(void 0===getServerSnapshot)throw Error(formatProdErrorMessage(407));getServerSnapshot=getServerSnapshot();}else getServerSnapshot=getSnapshot();var snapshotChanged=!objectIs((currentHook||hook).memoizedState,getServerSnapshot);snapshotChanged&&(hook.memoizedState=getServerSnapshot,didReceiveUpdate=true);hook=hook.queue;var create=subscribeToStore.bind(null,fiber,hook,subscribe);updateEffectImpl(2048,8,create,[subscribe]);if(hook.getSnapshot!==getSnapshot||snapshotChanged||null!==workInProgressHook&&workInProgressHook.memoizedState.tag&1){fiber.flags|=2048;pushSimpleEffect(9,createEffectInstance(),updateStoreInstance.bind(null,fiber,hook,getServerSnapshot,getSnapshot),null);if(null===workInProgressRoot)throw Error(formatProdErrorMessage(349));isHydrating$jscomp$0||0!==(renderLanes&124)||pushStoreConsistencyCheck(fiber,getSnapshot,getServerSnapshot);}return getServerSnapshot;}function pushStoreConsistencyCheck(fiber,getSnapshot,renderedSnapshot){fiber.flags|=16384;fiber={getSnapshot:getSnapshot,value:renderedSnapshot};getSnapshot=currentlyRenderingFiber.updateQueue;null===getSnapshot?(getSnapshot=createFunctionComponentUpdateQueue(),currentlyRenderingFiber.updateQueue=getSnapshot,getSnapshot.stores=[fiber]):(renderedSnapshot=getSnapshot.stores,null===renderedSnapshot?getSnapshot.stores=[fiber]:renderedSnapshot.push(fiber));}function updateStoreInstance(fiber,inst,nextSnapshot,getSnapshot){inst.value=nextSnapshot;inst.getSnapshot=getSnapshot;checkIfSnapshotChanged(inst)&&forceStoreRerender(fiber);}function subscribeToStore(fiber,inst,subscribe){return subscribe(function(){checkIfSnapshotChanged(inst)&&forceStoreRerender(fiber);});}function checkIfSnapshotChanged(inst){var latestGetSnapshot=inst.getSnapshot;inst=inst.value;try{var nextValue=latestGetSnapshot();return !objectIs(inst,nextValue);}catch(error){return  true;}}function forceStoreRerender(fiber){var root=enqueueConcurrentRenderForLane(fiber,2);null!==root&&scheduleUpdateOnFiber(root,fiber,2);}function mountStateImpl(initialState){var hook=mountWorkInProgressHook();if("function"===typeof initialState){var initialStateInitializer=initialState;initialState=initialStateInitializer();if(shouldDoubleInvokeUserFnsInHooksDEV){setIsStrictModeForDevtools(true);try{initialStateInitializer();}finally{setIsStrictModeForDevtools(false);}}}hook.memoizedState=hook.baseState=initialState;hook.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:basicStateReducer,lastRenderedState:initialState};return hook;}function updateOptimisticImpl(hook,current,passthrough,reducer){hook.baseState=passthrough;return updateReducerImpl(hook,currentHook,"function"===typeof reducer?reducer:basicStateReducer);}function dispatchActionState(fiber,actionQueue,setPendingState,setState,payload){if(isRenderPhaseUpdate(fiber))throw Error(formatProdErrorMessage(485));fiber=actionQueue.action;if(null!==fiber){var actionNode={payload:payload,action:fiber,next:null,isTransition:true,status:"pending",value:null,reason:null,listeners:[],then:function(listener){actionNode.listeners.push(listener);}};null!==ReactSharedInternals.T?setPendingState(true):actionNode.isTransition=false;setState(actionNode);setPendingState=actionQueue.pending;null===setPendingState?(actionNode.next=actionQueue.pending=actionNode,runActionStateAction(actionQueue,actionNode)):(actionNode.next=setPendingState.next,actionQueue.pending=setPendingState.next=actionNode);}}function runActionStateAction(actionQueue,node){var action=node.action,payload=node.payload,prevState=actionQueue.state;if(node.isTransition){var prevTransition=ReactSharedInternals.T,currentTransition={};ReactSharedInternals.T=currentTransition;try{var returnValue=action(prevState,payload),onStartTransitionFinish=ReactSharedInternals.S;null!==onStartTransitionFinish&&onStartTransitionFinish(currentTransition,returnValue);handleActionReturnValue(actionQueue,node,returnValue);}catch(error){onActionError(actionQueue,node,error);}finally{ReactSharedInternals.T=prevTransition;}}else try{prevTransition=action(prevState,payload),handleActionReturnValue(actionQueue,node,prevTransition);}catch(error$38){onActionError(actionQueue,node,error$38);}}function handleActionReturnValue(actionQueue,node,returnValue){null!==returnValue&&"object"===typeof returnValue&&"function"===typeof returnValue.then?returnValue.then(function(nextState){onActionSuccess(actionQueue,node,nextState);},function(error){return onActionError(actionQueue,node,error);}):onActionSuccess(actionQueue,node,returnValue);}function onActionSuccess(actionQueue,actionNode,nextState){actionNode.status="fulfilled";actionNode.value=nextState;notifyActionListeners(actionNode);actionQueue.state=nextState;actionNode=actionQueue.pending;null!==actionNode&&(nextState=actionNode.next,nextState===actionNode?actionQueue.pending=null:(nextState=nextState.next,actionNode.next=nextState,runActionStateAction(actionQueue,nextState)));}function onActionError(actionQueue,actionNode,error){var last=actionQueue.pending;actionQueue.pending=null;if(null!==last){last=last.next;do actionNode.status="rejected",actionNode.reason=error,notifyActionListeners(actionNode),actionNode=actionNode.next;while(actionNode!==last);}actionQueue.action=null;}function notifyActionListeners(actionNode){actionNode=actionNode.listeners;for(var i=0;i<actionNode.length;i++)(0, actionNode[i])();}function actionStateReducer(oldState,newState){return newState;}function mountActionState(action,initialStateProp){if(isHydrating){var ssrFormState=workInProgressRoot.formState;if(null!==ssrFormState){a:{var JSCompiler_inline_result=currentlyRenderingFiber;if(isHydrating){if(nextHydratableInstance){b:{var JSCompiler_inline_result$jscomp$0=nextHydratableInstance;for(var inRootOrSingleton=rootOrSingletonContext;8!==JSCompiler_inline_result$jscomp$0.nodeType;){if(!inRootOrSingleton){JSCompiler_inline_result$jscomp$0=null;break b;}JSCompiler_inline_result$jscomp$0=getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);if(null===JSCompiler_inline_result$jscomp$0){JSCompiler_inline_result$jscomp$0=null;break b;}}inRootOrSingleton=JSCompiler_inline_result$jscomp$0.data;JSCompiler_inline_result$jscomp$0="F!"===inRootOrSingleton||"F"===inRootOrSingleton?JSCompiler_inline_result$jscomp$0:null;}if(JSCompiler_inline_result$jscomp$0){nextHydratableInstance=getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);JSCompiler_inline_result="F!"===JSCompiler_inline_result$jscomp$0.data;break a;}}throwOnHydrationMismatch(JSCompiler_inline_result);}JSCompiler_inline_result=false;}JSCompiler_inline_result&&(initialStateProp=ssrFormState[0]);}}ssrFormState=mountWorkInProgressHook();ssrFormState.memoizedState=ssrFormState.baseState=initialStateProp;JSCompiler_inline_result={pending:null,lanes:0,dispatch:null,lastRenderedReducer:actionStateReducer,lastRenderedState:initialStateProp};ssrFormState.queue=JSCompiler_inline_result;ssrFormState=dispatchSetState.bind(null,currentlyRenderingFiber,JSCompiler_inline_result);JSCompiler_inline_result.dispatch=ssrFormState;JSCompiler_inline_result=mountStateImpl(false);inRootOrSingleton=dispatchOptimisticSetState.bind(null,currentlyRenderingFiber,false,JSCompiler_inline_result.queue);JSCompiler_inline_result=mountWorkInProgressHook();JSCompiler_inline_result$jscomp$0={state:initialStateProp,dispatch:null,action:action,pending:null};JSCompiler_inline_result.queue=JSCompiler_inline_result$jscomp$0;ssrFormState=dispatchActionState.bind(null,currentlyRenderingFiber,JSCompiler_inline_result$jscomp$0,inRootOrSingleton,ssrFormState);JSCompiler_inline_result$jscomp$0.dispatch=ssrFormState;JSCompiler_inline_result.memoizedState=action;return [initialStateProp,ssrFormState,false];}function updateActionState(action){var stateHook=updateWorkInProgressHook();return updateActionStateImpl(stateHook,currentHook,action);}function updateActionStateImpl(stateHook,currentStateHook,action){currentStateHook=updateReducerImpl(stateHook,currentStateHook,actionStateReducer)[0];stateHook=updateReducer(basicStateReducer)[0];if("object"===typeof currentStateHook&&null!==currentStateHook&&"function"===typeof currentStateHook.then)try{var state=useThenable(currentStateHook);}catch(x){if(x===SuspenseException)throw SuspenseActionException;throw x;}else state=currentStateHook;currentStateHook=updateWorkInProgressHook();var actionQueue=currentStateHook.queue,dispatch=actionQueue.dispatch;action!==currentStateHook.memoizedState&&(currentlyRenderingFiber.flags|=2048,pushSimpleEffect(9,createEffectInstance(),actionStateActionEffect.bind(null,actionQueue,action),null));return [state,dispatch,stateHook];}function actionStateActionEffect(actionQueue,action){actionQueue.action=action;}function rerenderActionState(action){var stateHook=updateWorkInProgressHook(),currentStateHook=currentHook;if(null!==currentStateHook)return updateActionStateImpl(stateHook,currentStateHook,action);updateWorkInProgressHook();stateHook=stateHook.memoizedState;currentStateHook=updateWorkInProgressHook();var dispatch=currentStateHook.queue.dispatch;currentStateHook.memoizedState=action;return [stateHook,dispatch,false];}function pushSimpleEffect(tag,inst,create,createDeps){tag={tag:tag,create:create,deps:createDeps,inst:inst,next:null};inst=currentlyRenderingFiber.updateQueue;null===inst&&(inst=createFunctionComponentUpdateQueue(),currentlyRenderingFiber.updateQueue=inst);create=inst.lastEffect;null===create?inst.lastEffect=tag.next=tag:(createDeps=create.next,create.next=tag,tag.next=createDeps,inst.lastEffect=tag);return tag;}function createEffectInstance(){return {destroy:void 0,resource:void 0};}function updateRef(){return updateWorkInProgressHook().memoizedState;}function mountEffectImpl(fiberFlags,hookFlags,create,createDeps){var hook=mountWorkInProgressHook();createDeps=void 0===createDeps?null:createDeps;currentlyRenderingFiber.flags|=fiberFlags;hook.memoizedState=pushSimpleEffect(1|hookFlags,createEffectInstance(),create,createDeps);}function updateEffectImpl(fiberFlags,hookFlags,create,deps){var hook=updateWorkInProgressHook();deps=void 0===deps?null:deps;var inst=hook.memoizedState.inst;null!==currentHook&&null!==deps&&areHookInputsEqual(deps,currentHook.memoizedState.deps)?hook.memoizedState=pushSimpleEffect(hookFlags,inst,create,deps):(currentlyRenderingFiber.flags|=fiberFlags,hook.memoizedState=pushSimpleEffect(1|hookFlags,inst,create,deps));}function mountEffect(create,createDeps){mountEffectImpl(8390656,8,create,createDeps);}function updateEffect(create,createDeps){updateEffectImpl(2048,8,create,createDeps);}function updateInsertionEffect(create,deps){return updateEffectImpl(4,2,create,deps);}function updateLayoutEffect(create,deps){return updateEffectImpl(4,4,create,deps);}function imperativeHandleEffect(create,ref){if("function"===typeof ref){create=create();var refCleanup=ref(create);return function(){"function"===typeof refCleanup?refCleanup():ref(null);};}if(null!==ref&&void 0!==ref)return create=create(),ref.current=create,function(){ref.current=null;};}function updateImperativeHandle(ref,create,deps){deps=null!==deps&&void 0!==deps?deps.concat([ref]):null;updateEffectImpl(4,4,imperativeHandleEffect.bind(null,create,ref),deps);}function mountDebugValue(){}function updateCallback(callback,deps){var hook=updateWorkInProgressHook();deps=void 0===deps?null:deps;var prevState=hook.memoizedState;if(null!==deps&&areHookInputsEqual(deps,prevState[1]))return prevState[0];hook.memoizedState=[callback,deps];return callback;}function updateMemo(nextCreate,deps){var hook=updateWorkInProgressHook();deps=void 0===deps?null:deps;var prevState=hook.memoizedState;if(null!==deps&&areHookInputsEqual(deps,prevState[1]))return prevState[0];prevState=nextCreate();if(shouldDoubleInvokeUserFnsInHooksDEV){setIsStrictModeForDevtools(true);try{nextCreate();}finally{setIsStrictModeForDevtools(false);}}hook.memoizedState=[prevState,deps];return prevState;}function mountDeferredValueImpl(hook,value,initialValue){if(void 0===initialValue||0!==(renderLanes&1073741824))return hook.memoizedState=value;hook.memoizedState=initialValue;hook=requestDeferredLane();currentlyRenderingFiber.lanes|=hook;workInProgressRootSkippedLanes|=hook;return initialValue;}function updateDeferredValueImpl(hook,prevValue,value,initialValue){if(objectIs(value,prevValue))return value;if(null!==currentTreeHiddenStackCursor.current)return hook=mountDeferredValueImpl(hook,value,initialValue),objectIs(hook,prevValue)||(didReceiveUpdate=true),hook;if(0===(renderLanes&42))return didReceiveUpdate=true,hook.memoizedState=value;hook=requestDeferredLane();currentlyRenderingFiber.lanes|=hook;workInProgressRootSkippedLanes|=hook;return prevValue;}function startTransition(fiber,queue,pendingState,finishedState,callback){var previousPriority=ReactDOMSharedInternals.p;ReactDOMSharedInternals.p=0!==previousPriority&&8>previousPriority?previousPriority:8;var prevTransition=ReactSharedInternals.T,currentTransition={};ReactSharedInternals.T=currentTransition;dispatchOptimisticSetState(fiber,false,queue,pendingState);try{var returnValue=callback(),onStartTransitionFinish=ReactSharedInternals.S;null!==onStartTransitionFinish&&onStartTransitionFinish(currentTransition,returnValue);if(null!==returnValue&&"object"===typeof returnValue&&"function"===typeof returnValue.then){var thenableForFinishedState=chainThenableValue(returnValue,finishedState);dispatchSetStateInternal(fiber,queue,thenableForFinishedState,requestUpdateLane(fiber));}else dispatchSetStateInternal(fiber,queue,finishedState,requestUpdateLane(fiber));}catch(error){dispatchSetStateInternal(fiber,queue,{then:function(){},status:"rejected",reason:error},requestUpdateLane());}finally{ReactDOMSharedInternals.p=previousPriority,ReactSharedInternals.T=prevTransition;}}function noop$2(){}function startHostTransition(formFiber,pendingState,action,formData){if(5!==formFiber.tag)throw Error(formatProdErrorMessage(476));var queue=ensureFormComponentIsStateful(formFiber).queue;startTransition(formFiber,queue,pendingState,sharedNotPendingObject,null===action?noop$2:function(){requestFormReset$1(formFiber);return action(formData);});}function ensureFormComponentIsStateful(formFiber){var existingStateHook=formFiber.memoizedState;if(null!==existingStateHook)return existingStateHook;existingStateHook={memoizedState:sharedNotPendingObject,baseState:sharedNotPendingObject,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:basicStateReducer,lastRenderedState:sharedNotPendingObject},next:null};var initialResetState={};existingStateHook.next={memoizedState:initialResetState,baseState:initialResetState,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:basicStateReducer,lastRenderedState:initialResetState},next:null};formFiber.memoizedState=existingStateHook;formFiber=formFiber.alternate;null!==formFiber&&(formFiber.memoizedState=existingStateHook);return existingStateHook;}function requestFormReset$1(formFiber){var resetStateQueue=ensureFormComponentIsStateful(formFiber).next.queue;dispatchSetStateInternal(formFiber,resetStateQueue,{},requestUpdateLane());}function useHostTransitionStatus(){return readContext(HostTransitionContext);}function updateId(){return updateWorkInProgressHook().memoizedState;}function updateRefresh(){return updateWorkInProgressHook().memoizedState;}function refreshCache(fiber){for(var provider=fiber.return;null!==provider;){switch(provider.tag){case 24:case 3:var lane=requestUpdateLane();fiber=createUpdate(lane);var root$41=enqueueUpdate(provider,fiber,lane);null!==root$41&&(scheduleUpdateOnFiber(root$41,provider,lane),entangleTransitions(root$41,provider,lane));provider={cache:createCache()};fiber.payload=provider;return;}provider=provider.return;}}function dispatchReducerAction(fiber,queue,action){var lane=requestUpdateLane();action={lane:lane,revertLane:0,action:action,hasEagerState:false,eagerState:null,next:null};isRenderPhaseUpdate(fiber)?enqueueRenderPhaseUpdate(queue,action):(action=enqueueConcurrentHookUpdate(fiber,queue,action,lane),null!==action&&(scheduleUpdateOnFiber(action,fiber,lane),entangleTransitionUpdate(action,queue,lane)));}function dispatchSetState(fiber,queue,action){var lane=requestUpdateLane();dispatchSetStateInternal(fiber,queue,action,lane);}function dispatchSetStateInternal(fiber,queue,action,lane){var update={lane:lane,revertLane:0,action:action,hasEagerState:false,eagerState:null,next:null};if(isRenderPhaseUpdate(fiber))enqueueRenderPhaseUpdate(queue,update);else {var alternate=fiber.alternate;if(0===fiber.lanes&&(null===alternate||0===alternate.lanes)&&(alternate=queue.lastRenderedReducer,null!==alternate))try{var currentState=queue.lastRenderedState,eagerState=alternate(currentState,action);update.hasEagerState=!0;update.eagerState=eagerState;if(objectIs(eagerState,currentState))return enqueueUpdate$1(fiber,queue,update,0),null===workInProgressRoot&&finishQueueingConcurrentUpdates(),!1;}catch(error){}finally{}action=enqueueConcurrentHookUpdate(fiber,queue,update,lane);if(null!==action)return scheduleUpdateOnFiber(action,fiber,lane),entangleTransitionUpdate(action,queue,lane),true;}return  false;}function dispatchOptimisticSetState(fiber,throwIfDuringRender,queue,action){action={lane:2,revertLane:requestTransitionLane(),action:action,hasEagerState:false,eagerState:null,next:null};if(isRenderPhaseUpdate(fiber)){if(throwIfDuringRender)throw Error(formatProdErrorMessage(479));}else throwIfDuringRender=enqueueConcurrentHookUpdate(fiber,queue,action,2),null!==throwIfDuringRender&&scheduleUpdateOnFiber(throwIfDuringRender,fiber,2);}function isRenderPhaseUpdate(fiber){var alternate=fiber.alternate;return fiber===currentlyRenderingFiber||null!==alternate&&alternate===currentlyRenderingFiber;}function enqueueRenderPhaseUpdate(queue,update){didScheduleRenderPhaseUpdateDuringThisPass=didScheduleRenderPhaseUpdate=true;var pending=queue.pending;null===pending?update.next=update:(update.next=pending.next,pending.next=update);queue.pending=update;}function entangleTransitionUpdate(root,queue,lane){if(0!==(lane&4194048)){var queueLanes=queue.lanes;queueLanes&=root.pendingLanes;lane|=queueLanes;queue.lanes=lane;markRootEntangled(root,lane);}}var ContextOnlyDispatcher={readContext:readContext,use:use,useCallback:throwInvalidHookError,useContext:throwInvalidHookError,useEffect:throwInvalidHookError,useImperativeHandle:throwInvalidHookError,useLayoutEffect:throwInvalidHookError,useInsertionEffect:throwInvalidHookError,useMemo:throwInvalidHookError,useReducer:throwInvalidHookError,useRef:throwInvalidHookError,useState:throwInvalidHookError,useDebugValue:throwInvalidHookError,useDeferredValue:throwInvalidHookError,useTransition:throwInvalidHookError,useSyncExternalStore:throwInvalidHookError,useId:throwInvalidHookError,useHostTransitionStatus:throwInvalidHookError,useFormState:throwInvalidHookError,useActionState:throwInvalidHookError,useOptimistic:throwInvalidHookError,useMemoCache:throwInvalidHookError,useCacheRefresh:throwInvalidHookError},HooksDispatcherOnMount={readContext:readContext,use:use,useCallback:function(callback,deps){mountWorkInProgressHook().memoizedState=[callback,void 0===deps?null:deps];return callback;},useContext:readContext,useEffect:mountEffect,useImperativeHandle:function(ref,create,deps){deps=null!==deps&&void 0!==deps?deps.concat([ref]):null;mountEffectImpl(4194308,4,imperativeHandleEffect.bind(null,create,ref),deps);},useLayoutEffect:function(create,deps){return mountEffectImpl(4194308,4,create,deps);},useInsertionEffect:function(create,deps){mountEffectImpl(4,2,create,deps);},useMemo:function(nextCreate,deps){var hook=mountWorkInProgressHook();deps=void 0===deps?null:deps;var nextValue=nextCreate();if(shouldDoubleInvokeUserFnsInHooksDEV){setIsStrictModeForDevtools(true);try{nextCreate();}finally{setIsStrictModeForDevtools(false);}}hook.memoizedState=[nextValue,deps];return nextValue;},useReducer:function(reducer,initialArg,init){var hook=mountWorkInProgressHook();if(void 0!==init){var initialState=init(initialArg);if(shouldDoubleInvokeUserFnsInHooksDEV){setIsStrictModeForDevtools(true);try{init(initialArg);}finally{setIsStrictModeForDevtools(false);}}}else initialState=initialArg;hook.memoizedState=hook.baseState=initialState;reducer={pending:null,lanes:0,dispatch:null,lastRenderedReducer:reducer,lastRenderedState:initialState};hook.queue=reducer;reducer=reducer.dispatch=dispatchReducerAction.bind(null,currentlyRenderingFiber,reducer);return [hook.memoizedState,reducer];},useRef:function(initialValue){var hook=mountWorkInProgressHook();initialValue={current:initialValue};return hook.memoizedState=initialValue;},useState:function(initialState){initialState=mountStateImpl(initialState);var queue=initialState.queue,dispatch=dispatchSetState.bind(null,currentlyRenderingFiber,queue);queue.dispatch=dispatch;return [initialState.memoizedState,dispatch];},useDebugValue:mountDebugValue,useDeferredValue:function(value,initialValue){var hook=mountWorkInProgressHook();return mountDeferredValueImpl(hook,value,initialValue);},useTransition:function(){var stateHook=mountStateImpl(false);stateHook=startTransition.bind(null,currentlyRenderingFiber,stateHook.queue,true,false);mountWorkInProgressHook().memoizedState=stateHook;return [false,stateHook];},useSyncExternalStore:function(subscribe,getSnapshot,getServerSnapshot){var fiber=currentlyRenderingFiber,hook=mountWorkInProgressHook();if(isHydrating){if(void 0===getServerSnapshot)throw Error(formatProdErrorMessage(407));getServerSnapshot=getServerSnapshot();}else {getServerSnapshot=getSnapshot();if(null===workInProgressRoot)throw Error(formatProdErrorMessage(349));0!==(workInProgressRootRenderLanes&124)||pushStoreConsistencyCheck(fiber,getSnapshot,getServerSnapshot);}hook.memoizedState=getServerSnapshot;var inst={value:getServerSnapshot,getSnapshot:getSnapshot};hook.queue=inst;mountEffect(subscribeToStore.bind(null,fiber,inst,subscribe),[subscribe]);fiber.flags|=2048;pushSimpleEffect(9,createEffectInstance(),updateStoreInstance.bind(null,fiber,inst,getServerSnapshot,getSnapshot),null);return getServerSnapshot;},useId:function(){var hook=mountWorkInProgressHook(),identifierPrefix=workInProgressRoot.identifierPrefix;if(isHydrating){var JSCompiler_inline_result=treeContextOverflow;var idWithLeadingBit=treeContextId;JSCompiler_inline_result=(idWithLeadingBit&~(1<<32-clz32(idWithLeadingBit)-1)).toString(32)+JSCompiler_inline_result;identifierPrefix="\u00ab"+identifierPrefix+"R"+JSCompiler_inline_result;JSCompiler_inline_result=localIdCounter++;0<JSCompiler_inline_result&&(identifierPrefix+="H"+JSCompiler_inline_result.toString(32));identifierPrefix+="\u00bb";}else JSCompiler_inline_result=globalClientIdCounter++,identifierPrefix="\u00ab"+identifierPrefix+"r"+JSCompiler_inline_result.toString(32)+"\u00bb";return hook.memoizedState=identifierPrefix;},useHostTransitionStatus:useHostTransitionStatus,useFormState:mountActionState,useActionState:mountActionState,useOptimistic:function(passthrough){var hook=mountWorkInProgressHook();hook.memoizedState=hook.baseState=passthrough;var queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};hook.queue=queue;hook=dispatchOptimisticSetState.bind(null,currentlyRenderingFiber,true,queue);queue.dispatch=hook;return [passthrough,hook];},useMemoCache:useMemoCache,useCacheRefresh:function(){return mountWorkInProgressHook().memoizedState=refreshCache.bind(null,currentlyRenderingFiber);}},HooksDispatcherOnUpdate={readContext:readContext,use:use,useCallback:updateCallback,useContext:readContext,useEffect:updateEffect,useImperativeHandle:updateImperativeHandle,useInsertionEffect:updateInsertionEffect,useLayoutEffect:updateLayoutEffect,useMemo:updateMemo,useReducer:updateReducer,useRef:updateRef,useState:function(){return updateReducer(basicStateReducer);},useDebugValue:mountDebugValue,useDeferredValue:function(value,initialValue){var hook=updateWorkInProgressHook();return updateDeferredValueImpl(hook,currentHook.memoizedState,value,initialValue);},useTransition:function(){var booleanOrThenable=updateReducer(basicStateReducer)[0],start=updateWorkInProgressHook().memoizedState;return ["boolean"===typeof booleanOrThenable?booleanOrThenable:useThenable(booleanOrThenable),start];},useSyncExternalStore:updateSyncExternalStore,useId:updateId,useHostTransitionStatus:useHostTransitionStatus,useFormState:updateActionState,useActionState:updateActionState,useOptimistic:function(passthrough,reducer){var hook=updateWorkInProgressHook();return updateOptimisticImpl(hook,currentHook,passthrough,reducer);},useMemoCache:useMemoCache,useCacheRefresh:updateRefresh},HooksDispatcherOnRerender={readContext:readContext,use:use,useCallback:updateCallback,useContext:readContext,useEffect:updateEffect,useImperativeHandle:updateImperativeHandle,useInsertionEffect:updateInsertionEffect,useLayoutEffect:updateLayoutEffect,useMemo:updateMemo,useReducer:rerenderReducer,useRef:updateRef,useState:function(){return rerenderReducer(basicStateReducer);},useDebugValue:mountDebugValue,useDeferredValue:function(value,initialValue){var hook=updateWorkInProgressHook();return null===currentHook?mountDeferredValueImpl(hook,value,initialValue):updateDeferredValueImpl(hook,currentHook.memoizedState,value,initialValue);},useTransition:function(){var booleanOrThenable=rerenderReducer(basicStateReducer)[0],start=updateWorkInProgressHook().memoizedState;return ["boolean"===typeof booleanOrThenable?booleanOrThenable:useThenable(booleanOrThenable),start];},useSyncExternalStore:updateSyncExternalStore,useId:updateId,useHostTransitionStatus:useHostTransitionStatus,useFormState:rerenderActionState,useActionState:rerenderActionState,useOptimistic:function(passthrough,reducer){var hook=updateWorkInProgressHook();if(null!==currentHook)return updateOptimisticImpl(hook,currentHook,passthrough,reducer);hook.baseState=passthrough;return [passthrough,hook.queue.dispatch];},useMemoCache:useMemoCache,useCacheRefresh:updateRefresh},thenableState=null,thenableIndexCounter=0;function unwrapThenable(thenable){var index=thenableIndexCounter;thenableIndexCounter+=1;null===thenableState&&(thenableState=[]);return trackUsedThenable(thenableState,thenable,index);}function coerceRef(workInProgress,element){element=element.props.ref;workInProgress.ref=void 0!==element?element:null;}function throwOnInvalidObjectType(returnFiber,newChild){if(newChild.$$typeof===REACT_LEGACY_ELEMENT_TYPE)throw Error(formatProdErrorMessage(525));returnFiber=Object.prototype.toString.call(newChild);throw Error(formatProdErrorMessage(31,"[object Object]"===returnFiber?"object with keys {"+Object.keys(newChild).join(", ")+"}":returnFiber));}function resolveLazy(lazyType){var init=lazyType._init;return init(lazyType._payload);}function createChildReconciler(shouldTrackSideEffects){function deleteChild(returnFiber,childToDelete){if(shouldTrackSideEffects){var deletions=returnFiber.deletions;null===deletions?(returnFiber.deletions=[childToDelete],returnFiber.flags|=16):deletions.push(childToDelete);}}function deleteRemainingChildren(returnFiber,currentFirstChild){if(!shouldTrackSideEffects)return null;for(;null!==currentFirstChild;)deleteChild(returnFiber,currentFirstChild),currentFirstChild=currentFirstChild.sibling;return null;}function mapRemainingChildren(currentFirstChild){for(var existingChildren=new Map();null!==currentFirstChild;)null!==currentFirstChild.key?existingChildren.set(currentFirstChild.key,currentFirstChild):existingChildren.set(currentFirstChild.index,currentFirstChild),currentFirstChild=currentFirstChild.sibling;return existingChildren;}function useFiber(fiber,pendingProps){fiber=createWorkInProgress(fiber,pendingProps);fiber.index=0;fiber.sibling=null;return fiber;}function placeChild(newFiber,lastPlacedIndex,newIndex){newFiber.index=newIndex;if(!shouldTrackSideEffects)return newFiber.flags|=1048576,lastPlacedIndex;newIndex=newFiber.alternate;if(null!==newIndex)return newIndex=newIndex.index,newIndex<lastPlacedIndex?(newFiber.flags|=67108866,lastPlacedIndex):newIndex;newFiber.flags|=67108866;return lastPlacedIndex;}function placeSingleChild(newFiber){shouldTrackSideEffects&&null===newFiber.alternate&&(newFiber.flags|=67108866);return newFiber;}function updateTextNode(returnFiber,current,textContent,lanes){if(null===current||6!==current.tag)return current=createFiberFromText(textContent,returnFiber.mode,lanes),current.return=returnFiber,current;current=useFiber(current,textContent);current.return=returnFiber;return current;}function updateElement(returnFiber,current,element,lanes){var elementType=element.type;if(elementType===REACT_FRAGMENT_TYPE)return updateFragment(returnFiber,current,element.props.children,lanes,element.key);if(null!==current&&(current.elementType===elementType||"object"===typeof elementType&&null!==elementType&&elementType.$$typeof===REACT_LAZY_TYPE&&resolveLazy(elementType)===current.type))return current=useFiber(current,element.props),coerceRef(current,element),current.return=returnFiber,current;current=createFiberFromTypeAndProps(element.type,element.key,element.props,null,returnFiber.mode,lanes);coerceRef(current,element);current.return=returnFiber;return current;}function updatePortal(returnFiber,current,portal,lanes){if(null===current||4!==current.tag||current.stateNode.containerInfo!==portal.containerInfo||current.stateNode.implementation!==portal.implementation)return current=createFiberFromPortal(portal,returnFiber.mode,lanes),current.return=returnFiber,current;current=useFiber(current,portal.children||[]);current.return=returnFiber;return current;}function updateFragment(returnFiber,current,fragment,lanes,key){if(null===current||7!==current.tag)return current=createFiberFromFragment(fragment,returnFiber.mode,lanes,key),current.return=returnFiber,current;current=useFiber(current,fragment);current.return=returnFiber;return current;}function createChild(returnFiber,newChild,lanes){if("string"===typeof newChild&&""!==newChild||"number"===typeof newChild||"bigint"===typeof newChild)return newChild=createFiberFromText(""+newChild,returnFiber.mode,lanes),newChild.return=returnFiber,newChild;if("object"===typeof newChild&&null!==newChild){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:return lanes=createFiberFromTypeAndProps(newChild.type,newChild.key,newChild.props,null,returnFiber.mode,lanes),coerceRef(lanes,newChild),lanes.return=returnFiber,lanes;case REACT_PORTAL_TYPE:return newChild=createFiberFromPortal(newChild,returnFiber.mode,lanes),newChild.return=returnFiber,newChild;case REACT_LAZY_TYPE:var init=newChild._init;newChild=init(newChild._payload);return createChild(returnFiber,newChild,lanes);}if(isArrayImpl(newChild)||getIteratorFn(newChild))return newChild=createFiberFromFragment(newChild,returnFiber.mode,lanes,null),newChild.return=returnFiber,newChild;if("function"===typeof newChild.then)return createChild(returnFiber,unwrapThenable(newChild),lanes);if(newChild.$$typeof===REACT_CONTEXT_TYPE)return createChild(returnFiber,readContextDuringReconciliation(returnFiber,newChild),lanes);throwOnInvalidObjectType(returnFiber,newChild);}return null;}function updateSlot(returnFiber,oldFiber,newChild,lanes){var key=null!==oldFiber?oldFiber.key:null;if("string"===typeof newChild&&""!==newChild||"number"===typeof newChild||"bigint"===typeof newChild)return null!==key?null:updateTextNode(returnFiber,oldFiber,""+newChild,lanes);if("object"===typeof newChild&&null!==newChild){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:return newChild.key===key?updateElement(returnFiber,oldFiber,newChild,lanes):null;case REACT_PORTAL_TYPE:return newChild.key===key?updatePortal(returnFiber,oldFiber,newChild,lanes):null;case REACT_LAZY_TYPE:return key=newChild._init,newChild=key(newChild._payload),updateSlot(returnFiber,oldFiber,newChild,lanes);}if(isArrayImpl(newChild)||getIteratorFn(newChild))return null!==key?null:updateFragment(returnFiber,oldFiber,newChild,lanes,null);if("function"===typeof newChild.then)return updateSlot(returnFiber,oldFiber,unwrapThenable(newChild),lanes);if(newChild.$$typeof===REACT_CONTEXT_TYPE)return updateSlot(returnFiber,oldFiber,readContextDuringReconciliation(returnFiber,newChild),lanes);throwOnInvalidObjectType(returnFiber,newChild);}return null;}function updateFromMap(existingChildren,returnFiber,newIdx,newChild,lanes){if("string"===typeof newChild&&""!==newChild||"number"===typeof newChild||"bigint"===typeof newChild)return existingChildren=existingChildren.get(newIdx)||null,updateTextNode(returnFiber,existingChildren,""+newChild,lanes);if("object"===typeof newChild&&null!==newChild){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:return existingChildren=existingChildren.get(null===newChild.key?newIdx:newChild.key)||null,updateElement(returnFiber,existingChildren,newChild,lanes);case REACT_PORTAL_TYPE:return existingChildren=existingChildren.get(null===newChild.key?newIdx:newChild.key)||null,updatePortal(returnFiber,existingChildren,newChild,lanes);case REACT_LAZY_TYPE:var init=newChild._init;newChild=init(newChild._payload);return updateFromMap(existingChildren,returnFiber,newIdx,newChild,lanes);}if(isArrayImpl(newChild)||getIteratorFn(newChild))return existingChildren=existingChildren.get(newIdx)||null,updateFragment(returnFiber,existingChildren,newChild,lanes,null);if("function"===typeof newChild.then)return updateFromMap(existingChildren,returnFiber,newIdx,unwrapThenable(newChild),lanes);if(newChild.$$typeof===REACT_CONTEXT_TYPE)return updateFromMap(existingChildren,returnFiber,newIdx,readContextDuringReconciliation(returnFiber,newChild),lanes);throwOnInvalidObjectType(returnFiber,newChild);}return null;}function reconcileChildrenArray(returnFiber,currentFirstChild,newChildren,lanes){for(var resultingFirstChild=null,previousNewFiber=null,oldFiber=currentFirstChild,newIdx=currentFirstChild=0,nextOldFiber=null;null!==oldFiber&&newIdx<newChildren.length;newIdx++){oldFiber.index>newIdx?(nextOldFiber=oldFiber,oldFiber=null):nextOldFiber=oldFiber.sibling;var newFiber=updateSlot(returnFiber,oldFiber,newChildren[newIdx],lanes);if(null===newFiber){null===oldFiber&&(oldFiber=nextOldFiber);break;}shouldTrackSideEffects&&oldFiber&&null===newFiber.alternate&&deleteChild(returnFiber,oldFiber);currentFirstChild=placeChild(newFiber,currentFirstChild,newIdx);null===previousNewFiber?resultingFirstChild=newFiber:previousNewFiber.sibling=newFiber;previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(newIdx===newChildren.length)return deleteRemainingChildren(returnFiber,oldFiber),isHydrating&&pushTreeFork(returnFiber,newIdx),resultingFirstChild;if(null===oldFiber){for(;newIdx<newChildren.length;newIdx++)oldFiber=createChild(returnFiber,newChildren[newIdx],lanes),null!==oldFiber&&(currentFirstChild=placeChild(oldFiber,currentFirstChild,newIdx),null===previousNewFiber?resultingFirstChild=oldFiber:previousNewFiber.sibling=oldFiber,previousNewFiber=oldFiber);isHydrating&&pushTreeFork(returnFiber,newIdx);return resultingFirstChild;}for(oldFiber=mapRemainingChildren(oldFiber);newIdx<newChildren.length;newIdx++)nextOldFiber=updateFromMap(oldFiber,returnFiber,newIdx,newChildren[newIdx],lanes),null!==nextOldFiber&&(shouldTrackSideEffects&&null!==nextOldFiber.alternate&&oldFiber.delete(null===nextOldFiber.key?newIdx:nextOldFiber.key),currentFirstChild=placeChild(nextOldFiber,currentFirstChild,newIdx),null===previousNewFiber?resultingFirstChild=nextOldFiber:previousNewFiber.sibling=nextOldFiber,previousNewFiber=nextOldFiber);shouldTrackSideEffects&&oldFiber.forEach(function(child){return deleteChild(returnFiber,child);});isHydrating&&pushTreeFork(returnFiber,newIdx);return resultingFirstChild;}function reconcileChildrenIterator(returnFiber,currentFirstChild,newChildren,lanes){if(null==newChildren)throw Error(formatProdErrorMessage(151));for(var resultingFirstChild=null,previousNewFiber=null,oldFiber=currentFirstChild,newIdx=currentFirstChild=0,nextOldFiber=null,step=newChildren.next();null!==oldFiber&&!step.done;newIdx++,step=newChildren.next()){oldFiber.index>newIdx?(nextOldFiber=oldFiber,oldFiber=null):nextOldFiber=oldFiber.sibling;var newFiber=updateSlot(returnFiber,oldFiber,step.value,lanes);if(null===newFiber){null===oldFiber&&(oldFiber=nextOldFiber);break;}shouldTrackSideEffects&&oldFiber&&null===newFiber.alternate&&deleteChild(returnFiber,oldFiber);currentFirstChild=placeChild(newFiber,currentFirstChild,newIdx);null===previousNewFiber?resultingFirstChild=newFiber:previousNewFiber.sibling=newFiber;previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(step.done)return deleteRemainingChildren(returnFiber,oldFiber),isHydrating&&pushTreeFork(returnFiber,newIdx),resultingFirstChild;if(null===oldFiber){for(;!step.done;newIdx++,step=newChildren.next())step=createChild(returnFiber,step.value,lanes),null!==step&&(currentFirstChild=placeChild(step,currentFirstChild,newIdx),null===previousNewFiber?resultingFirstChild=step:previousNewFiber.sibling=step,previousNewFiber=step);isHydrating&&pushTreeFork(returnFiber,newIdx);return resultingFirstChild;}for(oldFiber=mapRemainingChildren(oldFiber);!step.done;newIdx++,step=newChildren.next())step=updateFromMap(oldFiber,returnFiber,newIdx,step.value,lanes),null!==step&&(shouldTrackSideEffects&&null!==step.alternate&&oldFiber.delete(null===step.key?newIdx:step.key),currentFirstChild=placeChild(step,currentFirstChild,newIdx),null===previousNewFiber?resultingFirstChild=step:previousNewFiber.sibling=step,previousNewFiber=step);shouldTrackSideEffects&&oldFiber.forEach(function(child){return deleteChild(returnFiber,child);});isHydrating&&pushTreeFork(returnFiber,newIdx);return resultingFirstChild;}function reconcileChildFibersImpl(returnFiber,currentFirstChild,newChild,lanes){"object"===typeof newChild&&null!==newChild&&newChild.type===REACT_FRAGMENT_TYPE&&null===newChild.key&&(newChild=newChild.props.children);if("object"===typeof newChild&&null!==newChild){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:a:{for(var key=newChild.key;null!==currentFirstChild;){if(currentFirstChild.key===key){key=newChild.type;if(key===REACT_FRAGMENT_TYPE){if(7===currentFirstChild.tag){deleteRemainingChildren(returnFiber,currentFirstChild.sibling);lanes=useFiber(currentFirstChild,newChild.props.children);lanes.return=returnFiber;returnFiber=lanes;break a;}}else if(currentFirstChild.elementType===key||"object"===typeof key&&null!==key&&key.$$typeof===REACT_LAZY_TYPE&&resolveLazy(key)===currentFirstChild.type){deleteRemainingChildren(returnFiber,currentFirstChild.sibling);lanes=useFiber(currentFirstChild,newChild.props);coerceRef(lanes,newChild);lanes.return=returnFiber;returnFiber=lanes;break a;}deleteRemainingChildren(returnFiber,currentFirstChild);break;}else deleteChild(returnFiber,currentFirstChild);currentFirstChild=currentFirstChild.sibling;}newChild.type===REACT_FRAGMENT_TYPE?(lanes=createFiberFromFragment(newChild.props.children,returnFiber.mode,lanes,newChild.key),lanes.return=returnFiber,returnFiber=lanes):(lanes=createFiberFromTypeAndProps(newChild.type,newChild.key,newChild.props,null,returnFiber.mode,lanes),coerceRef(lanes,newChild),lanes.return=returnFiber,returnFiber=lanes);}return placeSingleChild(returnFiber);case REACT_PORTAL_TYPE:a:{for(key=newChild.key;null!==currentFirstChild;){if(currentFirstChild.key===key){if(4===currentFirstChild.tag&&currentFirstChild.stateNode.containerInfo===newChild.containerInfo&&currentFirstChild.stateNode.implementation===newChild.implementation){deleteRemainingChildren(returnFiber,currentFirstChild.sibling);lanes=useFiber(currentFirstChild,newChild.children||[]);lanes.return=returnFiber;returnFiber=lanes;break a;}else {deleteRemainingChildren(returnFiber,currentFirstChild);break;}}else deleteChild(returnFiber,currentFirstChild);currentFirstChild=currentFirstChild.sibling;}lanes=createFiberFromPortal(newChild,returnFiber.mode,lanes);lanes.return=returnFiber;returnFiber=lanes;}return placeSingleChild(returnFiber);case REACT_LAZY_TYPE:return key=newChild._init,newChild=key(newChild._payload),reconcileChildFibersImpl(returnFiber,currentFirstChild,newChild,lanes);}if(isArrayImpl(newChild))return reconcileChildrenArray(returnFiber,currentFirstChild,newChild,lanes);if(getIteratorFn(newChild)){key=getIteratorFn(newChild);if("function"!==typeof key)throw Error(formatProdErrorMessage(150));newChild=key.call(newChild);return reconcileChildrenIterator(returnFiber,currentFirstChild,newChild,lanes);}if("function"===typeof newChild.then)return reconcileChildFibersImpl(returnFiber,currentFirstChild,unwrapThenable(newChild),lanes);if(newChild.$$typeof===REACT_CONTEXT_TYPE)return reconcileChildFibersImpl(returnFiber,currentFirstChild,readContextDuringReconciliation(returnFiber,newChild),lanes);throwOnInvalidObjectType(returnFiber,newChild);}return "string"===typeof newChild&&""!==newChild||"number"===typeof newChild||"bigint"===typeof newChild?(newChild=""+newChild,null!==currentFirstChild&&6===currentFirstChild.tag?(deleteRemainingChildren(returnFiber,currentFirstChild.sibling),lanes=useFiber(currentFirstChild,newChild),lanes.return=returnFiber,returnFiber=lanes):(deleteRemainingChildren(returnFiber,currentFirstChild),lanes=createFiberFromText(newChild,returnFiber.mode,lanes),lanes.return=returnFiber,returnFiber=lanes),placeSingleChild(returnFiber)):deleteRemainingChildren(returnFiber,currentFirstChild);}return function(returnFiber,currentFirstChild,newChild,lanes){try{thenableIndexCounter=0;var firstChildFiber=reconcileChildFibersImpl(returnFiber,currentFirstChild,newChild,lanes);thenableState=null;return firstChildFiber;}catch(x){if(x===SuspenseException||x===SuspenseActionException)throw x;var fiber=createFiberImplClass(29,x,null,returnFiber.mode);fiber.lanes=lanes;fiber.return=returnFiber;return fiber;}finally{}};}var reconcileChildFibers=createChildReconciler(true),mountChildFibers=createChildReconciler(false),suspenseHandlerStackCursor=createCursor(null),shellBoundary=null;function pushPrimaryTreeSuspenseHandler(handler){var current=handler.alternate;push(suspenseStackCursor,suspenseStackCursor.current&1);push(suspenseHandlerStackCursor,handler);null===shellBoundary&&(null===current||null!==currentTreeHiddenStackCursor.current?shellBoundary=handler:null!==current.memoizedState&&(shellBoundary=handler));}function pushOffscreenSuspenseHandler(fiber){if(22===fiber.tag){if(push(suspenseStackCursor,suspenseStackCursor.current),push(suspenseHandlerStackCursor,fiber),null===shellBoundary){var current=fiber.alternate;null!==current&&null!==current.memoizedState&&(shellBoundary=fiber);}}else reuseSuspenseHandlerOnStack();}function reuseSuspenseHandlerOnStack(){push(suspenseStackCursor,suspenseStackCursor.current);push(suspenseHandlerStackCursor,suspenseHandlerStackCursor.current);}function popSuspenseHandler(fiber){pop(suspenseHandlerStackCursor);shellBoundary===fiber&&(shellBoundary=null);pop(suspenseStackCursor);}var suspenseStackCursor=createCursor(0);function findFirstSuspended(row){for(var node=row;null!==node;){if(13===node.tag){var state=node.memoizedState;if(null!==state&&(state=state.dehydrated,null===state||"$?"===state.data||isSuspenseInstanceFallback(state)))return node;}else if(19===node.tag&&void 0!==node.memoizedProps.revealOrder){if(0!==(node.flags&128))return node;}else if(null!==node.child){node.child.return=node;node=node.child;continue;}if(node===row)break;for(;null===node.sibling;){if(null===node.return||node.return===row)return null;node=node.return;}node.sibling.return=node.return;node=node.sibling;}return null;}function applyDerivedStateFromProps(workInProgress,ctor,getDerivedStateFromProps,nextProps){ctor=workInProgress.memoizedState;getDerivedStateFromProps=getDerivedStateFromProps(nextProps,ctor);getDerivedStateFromProps=null===getDerivedStateFromProps||void 0===getDerivedStateFromProps?ctor:assign({},ctor,getDerivedStateFromProps);workInProgress.memoizedState=getDerivedStateFromProps;0===workInProgress.lanes&&(workInProgress.updateQueue.baseState=getDerivedStateFromProps);}var classComponentUpdater={enqueueSetState:function(inst,payload,callback){inst=inst._reactInternals;var lane=requestUpdateLane(),update=createUpdate(lane);update.payload=payload;void 0!==callback&&null!==callback&&(update.callback=callback);payload=enqueueUpdate(inst,update,lane);null!==payload&&(scheduleUpdateOnFiber(payload,inst,lane),entangleTransitions(payload,inst,lane));},enqueueReplaceState:function(inst,payload,callback){inst=inst._reactInternals;var lane=requestUpdateLane(),update=createUpdate(lane);update.tag=1;update.payload=payload;void 0!==callback&&null!==callback&&(update.callback=callback);payload=enqueueUpdate(inst,update,lane);null!==payload&&(scheduleUpdateOnFiber(payload,inst,lane),entangleTransitions(payload,inst,lane));},enqueueForceUpdate:function(inst,callback){inst=inst._reactInternals;var lane=requestUpdateLane(),update=createUpdate(lane);update.tag=2;void 0!==callback&&null!==callback&&(update.callback=callback);callback=enqueueUpdate(inst,update,lane);null!==callback&&(scheduleUpdateOnFiber(callback,inst,lane),entangleTransitions(callback,inst,lane));}};function checkShouldComponentUpdate(workInProgress,ctor,oldProps,newProps,oldState,newState,nextContext){workInProgress=workInProgress.stateNode;return "function"===typeof workInProgress.shouldComponentUpdate?workInProgress.shouldComponentUpdate(newProps,newState,nextContext):ctor.prototype&&ctor.prototype.isPureReactComponent?!shallowEqual(oldProps,newProps)||!shallowEqual(oldState,newState):true;}function callComponentWillReceiveProps(workInProgress,instance,newProps,nextContext){workInProgress=instance.state;"function"===typeof instance.componentWillReceiveProps&&instance.componentWillReceiveProps(newProps,nextContext);"function"===typeof instance.UNSAFE_componentWillReceiveProps&&instance.UNSAFE_componentWillReceiveProps(newProps,nextContext);instance.state!==workInProgress&&classComponentUpdater.enqueueReplaceState(instance,instance.state,null);}function resolveClassComponentProps(Component,baseProps){var newProps=baseProps;if("ref"in baseProps){newProps={};for(var propName in baseProps)"ref"!==propName&&(newProps[propName]=baseProps[propName]);}if(Component=Component.defaultProps){newProps===baseProps&&(newProps=assign({},newProps));for(var propName$73 in Component) void 0===newProps[propName$73]&&(newProps[propName$73]=Component[propName$73]);}return newProps;}var reportGlobalError="function"===typeof reportError?reportError:function(error){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var event=new window.ErrorEvent("error",{bubbles:true,cancelable:true,message:"object"===typeof error&&null!==error&&"string"===typeof error.message?String(error.message):String(error),error:error});if(!window.dispatchEvent(event))return;}else if("object"===typeof process&&"function"===typeof process.emit){process.emit("uncaughtException",error);return;}console.error(error);};function defaultOnUncaughtError(error){reportGlobalError(error);}function defaultOnCaughtError(error){console.error(error);}function defaultOnRecoverableError(error){reportGlobalError(error);}function logUncaughtError(root,errorInfo){try{var onUncaughtError=root.onUncaughtError;onUncaughtError(errorInfo.value,{componentStack:errorInfo.stack});}catch(e$74){setTimeout(function(){throw e$74;});}}function logCaughtError(root,boundary,errorInfo){try{var onCaughtError=root.onCaughtError;onCaughtError(errorInfo.value,{componentStack:errorInfo.stack,errorBoundary:1===boundary.tag?boundary.stateNode:null});}catch(e$75){setTimeout(function(){throw e$75;});}}function createRootErrorUpdate(root,errorInfo,lane){lane=createUpdate(lane);lane.tag=3;lane.payload={element:null};lane.callback=function(){logUncaughtError(root,errorInfo);};return lane;}function createClassErrorUpdate(lane){lane=createUpdate(lane);lane.tag=3;return lane;}function initializeClassErrorUpdate(update,root,fiber,errorInfo){var getDerivedStateFromError=fiber.type.getDerivedStateFromError;if("function"===typeof getDerivedStateFromError){var error=errorInfo.value;update.payload=function(){return getDerivedStateFromError(error);};update.callback=function(){logCaughtError(root,fiber,errorInfo);};}var inst=fiber.stateNode;null!==inst&&"function"===typeof inst.componentDidCatch&&(update.callback=function(){logCaughtError(root,fiber,errorInfo);"function"!==typeof getDerivedStateFromError&&(null===legacyErrorBoundariesThatAlreadyFailed?legacyErrorBoundariesThatAlreadyFailed=new Set([this]):legacyErrorBoundariesThatAlreadyFailed.add(this));var stack=errorInfo.stack;this.componentDidCatch(errorInfo.value,{componentStack:null!==stack?stack:""});});}function throwException(root,returnFiber,sourceFiber,value,rootRenderLanes){sourceFiber.flags|=32768;if(null!==value&&"object"===typeof value&&"function"===typeof value.then){returnFiber=sourceFiber.alternate;null!==returnFiber&&propagateParentContextChanges(returnFiber,sourceFiber,rootRenderLanes,true);sourceFiber=suspenseHandlerStackCursor.current;if(null!==sourceFiber){switch(sourceFiber.tag){case 13:return null===shellBoundary?renderDidSuspendDelayIfPossible():null===sourceFiber.alternate&&0===workInProgressRootExitStatus&&(workInProgressRootExitStatus=3),sourceFiber.flags&=-257,sourceFiber.flags|=65536,sourceFiber.lanes=rootRenderLanes,value===noopSuspenseyCommitThenable?sourceFiber.flags|=16384:(returnFiber=sourceFiber.updateQueue,null===returnFiber?sourceFiber.updateQueue=new Set([value]):returnFiber.add(value),attachPingListener(root,value,rootRenderLanes)),false;case 22:return sourceFiber.flags|=65536,value===noopSuspenseyCommitThenable?sourceFiber.flags|=16384:(returnFiber=sourceFiber.updateQueue,null===returnFiber?(returnFiber={transitions:null,markerInstances:null,retryQueue:new Set([value])},sourceFiber.updateQueue=returnFiber):(sourceFiber=returnFiber.retryQueue,null===sourceFiber?returnFiber.retryQueue=new Set([value]):sourceFiber.add(value)),attachPingListener(root,value,rootRenderLanes)),false;}throw Error(formatProdErrorMessage(435,sourceFiber.tag));}attachPingListener(root,value,rootRenderLanes);renderDidSuspendDelayIfPossible();return  false;}if(isHydrating)return returnFiber=suspenseHandlerStackCursor.current,null!==returnFiber?(0===(returnFiber.flags&65536)&&(returnFiber.flags|=256),returnFiber.flags|=65536,returnFiber.lanes=rootRenderLanes,value!==HydrationMismatchException&&(root=Error(formatProdErrorMessage(422),{cause:value}),queueHydrationError(createCapturedValueAtFiber(root,sourceFiber)))):(value!==HydrationMismatchException&&(returnFiber=Error(formatProdErrorMessage(423),{cause:value}),queueHydrationError(createCapturedValueAtFiber(returnFiber,sourceFiber))),root=root.current.alternate,root.flags|=65536,rootRenderLanes&=-rootRenderLanes,root.lanes|=rootRenderLanes,value=createCapturedValueAtFiber(value,sourceFiber),rootRenderLanes=createRootErrorUpdate(root.stateNode,value,rootRenderLanes),enqueueCapturedUpdate(root,rootRenderLanes),4!==workInProgressRootExitStatus&&(workInProgressRootExitStatus=2)),false;var wrapperError=Error(formatProdErrorMessage(520),{cause:value});wrapperError=createCapturedValueAtFiber(wrapperError,sourceFiber);null===workInProgressRootConcurrentErrors?workInProgressRootConcurrentErrors=[wrapperError]:workInProgressRootConcurrentErrors.push(wrapperError);4!==workInProgressRootExitStatus&&(workInProgressRootExitStatus=2);if(null===returnFiber)return  true;value=createCapturedValueAtFiber(value,sourceFiber);sourceFiber=returnFiber;do{switch(sourceFiber.tag){case 3:return sourceFiber.flags|=65536,root=rootRenderLanes&-rootRenderLanes,sourceFiber.lanes|=root,root=createRootErrorUpdate(sourceFiber.stateNode,value,root),enqueueCapturedUpdate(sourceFiber,root),false;case 1:if(returnFiber=sourceFiber.type,wrapperError=sourceFiber.stateNode,0===(sourceFiber.flags&128)&&("function"===typeof returnFiber.getDerivedStateFromError||null!==wrapperError&&"function"===typeof wrapperError.componentDidCatch&&(null===legacyErrorBoundariesThatAlreadyFailed||!legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))return sourceFiber.flags|=65536,rootRenderLanes&=-rootRenderLanes,sourceFiber.lanes|=rootRenderLanes,rootRenderLanes=createClassErrorUpdate(rootRenderLanes),initializeClassErrorUpdate(rootRenderLanes,root,sourceFiber,value),enqueueCapturedUpdate(sourceFiber,rootRenderLanes),false;}sourceFiber=sourceFiber.return;}while(null!==sourceFiber);return  false;}var SelectiveHydrationException=Error(formatProdErrorMessage(461)),didReceiveUpdate=false;function reconcileChildren(current,workInProgress,nextChildren,renderLanes){workInProgress.child=null===current?mountChildFibers(workInProgress,null,nextChildren,renderLanes):reconcileChildFibers(workInProgress,current.child,nextChildren,renderLanes);}function updateForwardRef(current,workInProgress,Component,nextProps,renderLanes){Component=Component.render;var ref=workInProgress.ref;if("ref"in nextProps){var propsWithoutRef={};for(var key in nextProps)"ref"!==key&&(propsWithoutRef[key]=nextProps[key]);}else propsWithoutRef=nextProps;prepareToReadContext(workInProgress);nextProps=renderWithHooks(current,workInProgress,Component,propsWithoutRef,ref,renderLanes);key=checkDidRenderIdHook();if(null!==current&&!didReceiveUpdate)return bailoutHooks(current,workInProgress,renderLanes),bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);isHydrating&&key&&pushMaterializedTreeId(workInProgress);workInProgress.flags|=1;reconcileChildren(current,workInProgress,nextProps,renderLanes);return workInProgress.child;}function updateMemoComponent(current,workInProgress,Component,nextProps,renderLanes){if(null===current){var type=Component.type;if("function"===typeof type&&!shouldConstruct(type)&&void 0===type.defaultProps&&null===Component.compare)return workInProgress.tag=15,workInProgress.type=type,updateSimpleMemoComponent(current,workInProgress,type,nextProps,renderLanes);current=createFiberFromTypeAndProps(Component.type,null,nextProps,workInProgress,workInProgress.mode,renderLanes);current.ref=workInProgress.ref;current.return=workInProgress;return workInProgress.child=current;}type=current.child;if(!checkScheduledUpdateOrContext(current,renderLanes)){var prevProps=type.memoizedProps;Component=Component.compare;Component=null!==Component?Component:shallowEqual;if(Component(prevProps,nextProps)&&current.ref===workInProgress.ref)return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}workInProgress.flags|=1;current=createWorkInProgress(type,nextProps);current.ref=workInProgress.ref;current.return=workInProgress;return workInProgress.child=current;}function updateSimpleMemoComponent(current,workInProgress,Component,nextProps,renderLanes){if(null!==current){var prevProps=current.memoizedProps;if(shallowEqual(prevProps,nextProps)&&current.ref===workInProgress.ref)if(didReceiveUpdate=false,workInProgress.pendingProps=nextProps=prevProps,checkScheduledUpdateOrContext(current,renderLanes))0!==(current.flags&131072)&&(didReceiveUpdate=true);else return workInProgress.lanes=current.lanes,bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}return updateFunctionComponent(current,workInProgress,Component,nextProps,renderLanes);}function updateOffscreenComponent(current,workInProgress,renderLanes){var nextProps=workInProgress.pendingProps,nextChildren=nextProps.children,prevState=null!==current?current.memoizedState:null;if("hidden"===nextProps.mode){if(0!==(workInProgress.flags&128)){nextProps=null!==prevState?prevState.baseLanes|renderLanes:renderLanes;if(null!==current){nextChildren=workInProgress.child=current.child;for(prevState=0;null!==nextChildren;)prevState=prevState|nextChildren.lanes|nextChildren.childLanes,nextChildren=nextChildren.sibling;workInProgress.childLanes=prevState&~nextProps;}else workInProgress.childLanes=0,workInProgress.child=null;return deferHiddenOffscreenComponent(current,workInProgress,nextProps,renderLanes);}if(0!==(renderLanes&536870912))workInProgress.memoizedState={baseLanes:0,cachePool:null},null!==current&&pushTransition(workInProgress,null!==prevState?prevState.cachePool:null),null!==prevState?pushHiddenContext(workInProgress,prevState):reuseHiddenContextOnStack(),pushOffscreenSuspenseHandler(workInProgress);else return workInProgress.lanes=workInProgress.childLanes=536870912,deferHiddenOffscreenComponent(current,workInProgress,null!==prevState?prevState.baseLanes|renderLanes:renderLanes,renderLanes);}else null!==prevState?(pushTransition(workInProgress,prevState.cachePool),pushHiddenContext(workInProgress,prevState),reuseSuspenseHandlerOnStack(),workInProgress.memoizedState=null):(null!==current&&pushTransition(workInProgress,null),reuseHiddenContextOnStack(),reuseSuspenseHandlerOnStack());reconcileChildren(current,workInProgress,nextChildren,renderLanes);return workInProgress.child;}function deferHiddenOffscreenComponent(current,workInProgress,nextBaseLanes,renderLanes){var JSCompiler_inline_result=peekCacheFromPool();JSCompiler_inline_result=null===JSCompiler_inline_result?null:{parent:CacheContext._currentValue,pool:JSCompiler_inline_result};workInProgress.memoizedState={baseLanes:nextBaseLanes,cachePool:JSCompiler_inline_result};null!==current&&pushTransition(workInProgress,null);reuseHiddenContextOnStack();pushOffscreenSuspenseHandler(workInProgress);null!==current&&propagateParentContextChanges(current,workInProgress,renderLanes,true);return null;}function markRef(current,workInProgress){var ref=workInProgress.ref;if(null===ref)null!==current&&null!==current.ref&&(workInProgress.flags|=4194816);else {if("function"!==typeof ref&&"object"!==typeof ref)throw Error(formatProdErrorMessage(284));if(null===current||current.ref!==ref)workInProgress.flags|=4194816;}}function updateFunctionComponent(current,workInProgress,Component,nextProps,renderLanes){prepareToReadContext(workInProgress);Component=renderWithHooks(current,workInProgress,Component,nextProps,void 0,renderLanes);nextProps=checkDidRenderIdHook();if(null!==current&&!didReceiveUpdate)return bailoutHooks(current,workInProgress,renderLanes),bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);isHydrating&&nextProps&&pushMaterializedTreeId(workInProgress);workInProgress.flags|=1;reconcileChildren(current,workInProgress,Component,renderLanes);return workInProgress.child;}function replayFunctionComponent(current,workInProgress,nextProps,Component,secondArg,renderLanes){prepareToReadContext(workInProgress);workInProgress.updateQueue=null;nextProps=renderWithHooksAgain(workInProgress,Component,nextProps,secondArg);finishRenderingHooks(current);Component=checkDidRenderIdHook();if(null!==current&&!didReceiveUpdate)return bailoutHooks(current,workInProgress,renderLanes),bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);isHydrating&&Component&&pushMaterializedTreeId(workInProgress);workInProgress.flags|=1;reconcileChildren(current,workInProgress,nextProps,renderLanes);return workInProgress.child;}function updateClassComponent(current,workInProgress,Component,nextProps,renderLanes){prepareToReadContext(workInProgress);if(null===workInProgress.stateNode){var context=emptyContextObject,contextType=Component.contextType;"object"===typeof contextType&&null!==contextType&&(context=readContext(contextType));context=new Component(nextProps,context);workInProgress.memoizedState=null!==context.state&&void 0!==context.state?context.state:null;context.updater=classComponentUpdater;workInProgress.stateNode=context;context._reactInternals=workInProgress;context=workInProgress.stateNode;context.props=nextProps;context.state=workInProgress.memoizedState;context.refs={};initializeUpdateQueue(workInProgress);contextType=Component.contextType;context.context="object"===typeof contextType&&null!==contextType?readContext(contextType):emptyContextObject;context.state=workInProgress.memoizedState;contextType=Component.getDerivedStateFromProps;"function"===typeof contextType&&(applyDerivedStateFromProps(workInProgress,Component,contextType,nextProps),context.state=workInProgress.memoizedState);"function"===typeof Component.getDerivedStateFromProps||"function"===typeof context.getSnapshotBeforeUpdate||"function"!==typeof context.UNSAFE_componentWillMount&&"function"!==typeof context.componentWillMount||(contextType=context.state,"function"===typeof context.componentWillMount&&context.componentWillMount(),"function"===typeof context.UNSAFE_componentWillMount&&context.UNSAFE_componentWillMount(),contextType!==context.state&&classComponentUpdater.enqueueReplaceState(context,context.state,null),processUpdateQueue(workInProgress,nextProps,context,renderLanes),suspendIfUpdateReadFromEntangledAsyncAction(),context.state=workInProgress.memoizedState);"function"===typeof context.componentDidMount&&(workInProgress.flags|=4194308);nextProps=true;}else if(null===current){context=workInProgress.stateNode;var unresolvedOldProps=workInProgress.memoizedProps,oldProps=resolveClassComponentProps(Component,unresolvedOldProps);context.props=oldProps;var oldContext=context.context,contextType$jscomp$0=Component.contextType;contextType=emptyContextObject;"object"===typeof contextType$jscomp$0&&null!==contextType$jscomp$0&&(contextType=readContext(contextType$jscomp$0));var getDerivedStateFromProps=Component.getDerivedStateFromProps;contextType$jscomp$0="function"===typeof getDerivedStateFromProps||"function"===typeof context.getSnapshotBeforeUpdate;unresolvedOldProps=workInProgress.pendingProps!==unresolvedOldProps;contextType$jscomp$0||"function"!==typeof context.UNSAFE_componentWillReceiveProps&&"function"!==typeof context.componentWillReceiveProps||(unresolvedOldProps||oldContext!==contextType)&&callComponentWillReceiveProps(workInProgress,context,nextProps,contextType);hasForceUpdate=false;var oldState=workInProgress.memoizedState;context.state=oldState;processUpdateQueue(workInProgress,nextProps,context,renderLanes);suspendIfUpdateReadFromEntangledAsyncAction();oldContext=workInProgress.memoizedState;unresolvedOldProps||oldState!==oldContext||hasForceUpdate?("function"===typeof getDerivedStateFromProps&&(applyDerivedStateFromProps(workInProgress,Component,getDerivedStateFromProps,nextProps),oldContext=workInProgress.memoizedState),(oldProps=hasForceUpdate||checkShouldComponentUpdate(workInProgress,Component,oldProps,nextProps,oldState,oldContext,contextType))?(contextType$jscomp$0||"function"!==typeof context.UNSAFE_componentWillMount&&"function"!==typeof context.componentWillMount||("function"===typeof context.componentWillMount&&context.componentWillMount(),"function"===typeof context.UNSAFE_componentWillMount&&context.UNSAFE_componentWillMount()),"function"===typeof context.componentDidMount&&(workInProgress.flags|=4194308)):("function"===typeof context.componentDidMount&&(workInProgress.flags|=4194308),workInProgress.memoizedProps=nextProps,workInProgress.memoizedState=oldContext),context.props=nextProps,context.state=oldContext,context.context=contextType,nextProps=oldProps):("function"===typeof context.componentDidMount&&(workInProgress.flags|=4194308),nextProps=false);}else {context=workInProgress.stateNode;cloneUpdateQueue(current,workInProgress);contextType=workInProgress.memoizedProps;contextType$jscomp$0=resolveClassComponentProps(Component,contextType);context.props=contextType$jscomp$0;getDerivedStateFromProps=workInProgress.pendingProps;oldState=context.context;oldContext=Component.contextType;oldProps=emptyContextObject;"object"===typeof oldContext&&null!==oldContext&&(oldProps=readContext(oldContext));unresolvedOldProps=Component.getDerivedStateFromProps;(oldContext="function"===typeof unresolvedOldProps||"function"===typeof context.getSnapshotBeforeUpdate)||"function"!==typeof context.UNSAFE_componentWillReceiveProps&&"function"!==typeof context.componentWillReceiveProps||(contextType!==getDerivedStateFromProps||oldState!==oldProps)&&callComponentWillReceiveProps(workInProgress,context,nextProps,oldProps);hasForceUpdate=false;oldState=workInProgress.memoizedState;context.state=oldState;processUpdateQueue(workInProgress,nextProps,context,renderLanes);suspendIfUpdateReadFromEntangledAsyncAction();var newState=workInProgress.memoizedState;contextType!==getDerivedStateFromProps||oldState!==newState||hasForceUpdate||null!==current&&null!==current.dependencies&&checkIfContextChanged(current.dependencies)?("function"===typeof unresolvedOldProps&&(applyDerivedStateFromProps(workInProgress,Component,unresolvedOldProps,nextProps),newState=workInProgress.memoizedState),(contextType$jscomp$0=hasForceUpdate||checkShouldComponentUpdate(workInProgress,Component,contextType$jscomp$0,nextProps,oldState,newState,oldProps)||null!==current&&null!==current.dependencies&&checkIfContextChanged(current.dependencies))?(oldContext||"function"!==typeof context.UNSAFE_componentWillUpdate&&"function"!==typeof context.componentWillUpdate||("function"===typeof context.componentWillUpdate&&context.componentWillUpdate(nextProps,newState,oldProps),"function"===typeof context.UNSAFE_componentWillUpdate&&context.UNSAFE_componentWillUpdate(nextProps,newState,oldProps)),"function"===typeof context.componentDidUpdate&&(workInProgress.flags|=4),"function"===typeof context.getSnapshotBeforeUpdate&&(workInProgress.flags|=1024)):("function"!==typeof context.componentDidUpdate||contextType===current.memoizedProps&&oldState===current.memoizedState||(workInProgress.flags|=4),"function"!==typeof context.getSnapshotBeforeUpdate||contextType===current.memoizedProps&&oldState===current.memoizedState||(workInProgress.flags|=1024),workInProgress.memoizedProps=nextProps,workInProgress.memoizedState=newState),context.props=nextProps,context.state=newState,context.context=oldProps,nextProps=contextType$jscomp$0):("function"!==typeof context.componentDidUpdate||contextType===current.memoizedProps&&oldState===current.memoizedState||(workInProgress.flags|=4),"function"!==typeof context.getSnapshotBeforeUpdate||contextType===current.memoizedProps&&oldState===current.memoizedState||(workInProgress.flags|=1024),nextProps=false);}context=nextProps;markRef(current,workInProgress);nextProps=0!==(workInProgress.flags&128);context||nextProps?(context=workInProgress.stateNode,Component=nextProps&&"function"!==typeof Component.getDerivedStateFromError?null:context.render(),workInProgress.flags|=1,null!==current&&nextProps?(workInProgress.child=reconcileChildFibers(workInProgress,current.child,null,renderLanes),workInProgress.child=reconcileChildFibers(workInProgress,null,Component,renderLanes)):reconcileChildren(current,workInProgress,Component,renderLanes),workInProgress.memoizedState=context.state,current=workInProgress.child):current=bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);return current;}function mountHostRootWithoutHydrating(current,workInProgress,nextChildren,renderLanes){resetHydrationState();workInProgress.flags|=256;reconcileChildren(current,workInProgress,nextChildren,renderLanes);return workInProgress.child;}var SUSPENDED_MARKER={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function mountSuspenseOffscreenState(renderLanes){return {baseLanes:renderLanes,cachePool:getSuspendedCache()};}function getRemainingWorkInPrimaryTree(current,primaryTreeDidDefer,renderLanes){current=null!==current?current.childLanes&~renderLanes:0;primaryTreeDidDefer&&(current|=workInProgressDeferredLane);return current;}function updateSuspenseComponent(current,workInProgress,renderLanes){var nextProps=workInProgress.pendingProps,showFallback=false,didSuspend=0!==(workInProgress.flags&128),JSCompiler_temp;(JSCompiler_temp=didSuspend)||(JSCompiler_temp=null!==current&&null===current.memoizedState?false:0!==(suspenseStackCursor.current&2));JSCompiler_temp&&(showFallback=true,workInProgress.flags&=-129);JSCompiler_temp=0!==(workInProgress.flags&32);workInProgress.flags&=-33;if(null===current){if(isHydrating){showFallback?pushPrimaryTreeSuspenseHandler(workInProgress):reuseSuspenseHandlerOnStack();if(isHydrating){var nextInstance=nextHydratableInstance,JSCompiler_temp$jscomp$0;if(JSCompiler_temp$jscomp$0=nextInstance){c:{JSCompiler_temp$jscomp$0=nextInstance;for(nextInstance=rootOrSingletonContext;8!==JSCompiler_temp$jscomp$0.nodeType;){if(!nextInstance){nextInstance=null;break c;}JSCompiler_temp$jscomp$0=getNextHydratable(JSCompiler_temp$jscomp$0.nextSibling);if(null===JSCompiler_temp$jscomp$0){nextInstance=null;break c;}}nextInstance=JSCompiler_temp$jscomp$0;}null!==nextInstance?(workInProgress.memoizedState={dehydrated:nextInstance,treeContext:null!==treeContextProvider?{id:treeContextId,overflow:treeContextOverflow}:null,retryLane:536870912,hydrationErrors:null},JSCompiler_temp$jscomp$0=createFiberImplClass(18,null,null,0),JSCompiler_temp$jscomp$0.stateNode=nextInstance,JSCompiler_temp$jscomp$0.return=workInProgress,workInProgress.child=JSCompiler_temp$jscomp$0,hydrationParentFiber=workInProgress,nextHydratableInstance=null,JSCompiler_temp$jscomp$0=true):JSCompiler_temp$jscomp$0=false;}JSCompiler_temp$jscomp$0||throwOnHydrationMismatch(workInProgress);}nextInstance=workInProgress.memoizedState;if(null!==nextInstance&&(nextInstance=nextInstance.dehydrated,null!==nextInstance))return isSuspenseInstanceFallback(nextInstance)?workInProgress.lanes=32:workInProgress.lanes=536870912,null;popSuspenseHandler(workInProgress);}nextInstance=nextProps.children;nextProps=nextProps.fallback;if(showFallback)return reuseSuspenseHandlerOnStack(),showFallback=workInProgress.mode,nextInstance=mountWorkInProgressOffscreenFiber({mode:"hidden",children:nextInstance},showFallback),nextProps=createFiberFromFragment(nextProps,showFallback,renderLanes,null),nextInstance.return=workInProgress,nextProps.return=workInProgress,nextInstance.sibling=nextProps,workInProgress.child=nextInstance,showFallback=workInProgress.child,showFallback.memoizedState=mountSuspenseOffscreenState(renderLanes),showFallback.childLanes=getRemainingWorkInPrimaryTree(current,JSCompiler_temp,renderLanes),workInProgress.memoizedState=SUSPENDED_MARKER,nextProps;pushPrimaryTreeSuspenseHandler(workInProgress);return mountSuspensePrimaryChildren(workInProgress,nextInstance);}JSCompiler_temp$jscomp$0=current.memoizedState;if(null!==JSCompiler_temp$jscomp$0&&(nextInstance=JSCompiler_temp$jscomp$0.dehydrated,null!==nextInstance)){if(didSuspend)workInProgress.flags&256?(pushPrimaryTreeSuspenseHandler(workInProgress),workInProgress.flags&=-257,workInProgress=retrySuspenseComponentWithoutHydrating(current,workInProgress,renderLanes)):null!==workInProgress.memoizedState?(reuseSuspenseHandlerOnStack(),workInProgress.child=current.child,workInProgress.flags|=128,workInProgress=null):(reuseSuspenseHandlerOnStack(),showFallback=nextProps.fallback,nextInstance=workInProgress.mode,nextProps=mountWorkInProgressOffscreenFiber({mode:"visible",children:nextProps.children},nextInstance),showFallback=createFiberFromFragment(showFallback,nextInstance,renderLanes,null),showFallback.flags|=2,nextProps.return=workInProgress,showFallback.return=workInProgress,nextProps.sibling=showFallback,workInProgress.child=nextProps,reconcileChildFibers(workInProgress,current.child,null,renderLanes),nextProps=workInProgress.child,nextProps.memoizedState=mountSuspenseOffscreenState(renderLanes),nextProps.childLanes=getRemainingWorkInPrimaryTree(current,JSCompiler_temp,renderLanes),workInProgress.memoizedState=SUSPENDED_MARKER,workInProgress=showFallback);else if(pushPrimaryTreeSuspenseHandler(workInProgress),isSuspenseInstanceFallback(nextInstance)){JSCompiler_temp=nextInstance.nextSibling&&nextInstance.nextSibling.dataset;if(JSCompiler_temp)var digest=JSCompiler_temp.dgst;JSCompiler_temp=digest;nextProps=Error(formatProdErrorMessage(419));nextProps.stack="";nextProps.digest=JSCompiler_temp;queueHydrationError({value:nextProps,source:null,stack:null});workInProgress=retrySuspenseComponentWithoutHydrating(current,workInProgress,renderLanes);}else if(didReceiveUpdate||propagateParentContextChanges(current,workInProgress,renderLanes,false),JSCompiler_temp=0!==(renderLanes&current.childLanes),didReceiveUpdate||JSCompiler_temp){JSCompiler_temp=workInProgressRoot;if(null!==JSCompiler_temp&&(nextProps=renderLanes&-renderLanes,nextProps=0!==(nextProps&42)?1:getBumpedLaneForHydrationByLane(nextProps),nextProps=0!==(nextProps&(JSCompiler_temp.suspendedLanes|renderLanes))?0:nextProps,0!==nextProps&&nextProps!==JSCompiler_temp$jscomp$0.retryLane))throw JSCompiler_temp$jscomp$0.retryLane=nextProps,enqueueConcurrentRenderForLane(current,nextProps),scheduleUpdateOnFiber(JSCompiler_temp,current,nextProps),SelectiveHydrationException;"$?"===nextInstance.data||renderDidSuspendDelayIfPossible();workInProgress=retrySuspenseComponentWithoutHydrating(current,workInProgress,renderLanes);}else "$?"===nextInstance.data?(workInProgress.flags|=192,workInProgress.child=current.child,workInProgress=null):(current=JSCompiler_temp$jscomp$0.treeContext,nextHydratableInstance=getNextHydratable(nextInstance.nextSibling),hydrationParentFiber=workInProgress,isHydrating=true,hydrationErrors=null,rootOrSingletonContext=false,null!==current&&(idStack[idStackIndex++]=treeContextId,idStack[idStackIndex++]=treeContextOverflow,idStack[idStackIndex++]=treeContextProvider,treeContextId=current.id,treeContextOverflow=current.overflow,treeContextProvider=workInProgress),workInProgress=mountSuspensePrimaryChildren(workInProgress,nextProps.children),workInProgress.flags|=4096);return workInProgress;}if(showFallback)return reuseSuspenseHandlerOnStack(),showFallback=nextProps.fallback,nextInstance=workInProgress.mode,JSCompiler_temp$jscomp$0=current.child,digest=JSCompiler_temp$jscomp$0.sibling,nextProps=createWorkInProgress(JSCompiler_temp$jscomp$0,{mode:"hidden",children:nextProps.children}),nextProps.subtreeFlags=JSCompiler_temp$jscomp$0.subtreeFlags&65011712,null!==digest?showFallback=createWorkInProgress(digest,showFallback):(showFallback=createFiberFromFragment(showFallback,nextInstance,renderLanes,null),showFallback.flags|=2),showFallback.return=workInProgress,nextProps.return=workInProgress,nextProps.sibling=showFallback,workInProgress.child=nextProps,nextProps=showFallback,showFallback=workInProgress.child,nextInstance=current.child.memoizedState,null===nextInstance?nextInstance=mountSuspenseOffscreenState(renderLanes):(JSCompiler_temp$jscomp$0=nextInstance.cachePool,null!==JSCompiler_temp$jscomp$0?(digest=CacheContext._currentValue,JSCompiler_temp$jscomp$0=JSCompiler_temp$jscomp$0.parent!==digest?{parent:digest,pool:digest}:JSCompiler_temp$jscomp$0):JSCompiler_temp$jscomp$0=getSuspendedCache(),nextInstance={baseLanes:nextInstance.baseLanes|renderLanes,cachePool:JSCompiler_temp$jscomp$0}),showFallback.memoizedState=nextInstance,showFallback.childLanes=getRemainingWorkInPrimaryTree(current,JSCompiler_temp,renderLanes),workInProgress.memoizedState=SUSPENDED_MARKER,nextProps;pushPrimaryTreeSuspenseHandler(workInProgress);renderLanes=current.child;current=renderLanes.sibling;renderLanes=createWorkInProgress(renderLanes,{mode:"visible",children:nextProps.children});renderLanes.return=workInProgress;renderLanes.sibling=null;null!==current&&(JSCompiler_temp=workInProgress.deletions,null===JSCompiler_temp?(workInProgress.deletions=[current],workInProgress.flags|=16):JSCompiler_temp.push(current));workInProgress.child=renderLanes;workInProgress.memoizedState=null;return renderLanes;}function mountSuspensePrimaryChildren(workInProgress,primaryChildren){primaryChildren=mountWorkInProgressOffscreenFiber({mode:"visible",children:primaryChildren},workInProgress.mode);primaryChildren.return=workInProgress;return workInProgress.child=primaryChildren;}function mountWorkInProgressOffscreenFiber(offscreenProps,mode){offscreenProps=createFiberImplClass(22,offscreenProps,null,mode);offscreenProps.lanes=0;offscreenProps.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null};return offscreenProps;}function retrySuspenseComponentWithoutHydrating(current,workInProgress,renderLanes){reconcileChildFibers(workInProgress,current.child,null,renderLanes);current=mountSuspensePrimaryChildren(workInProgress,workInProgress.pendingProps.children);current.flags|=2;workInProgress.memoizedState=null;return current;}function scheduleSuspenseWorkOnFiber(fiber,renderLanes,propagationRoot){fiber.lanes|=renderLanes;var alternate=fiber.alternate;null!==alternate&&(alternate.lanes|=renderLanes);scheduleContextWorkOnParentPath(fiber.return,renderLanes,propagationRoot);}function initSuspenseListRenderState(workInProgress,isBackwards,tail,lastContentRow,tailMode){var renderState=workInProgress.memoizedState;null===renderState?workInProgress.memoizedState={isBackwards:isBackwards,rendering:null,renderingStartTime:0,last:lastContentRow,tail:tail,tailMode:tailMode}:(renderState.isBackwards=isBackwards,renderState.rendering=null,renderState.renderingStartTime=0,renderState.last=lastContentRow,renderState.tail=tail,renderState.tailMode=tailMode);}function updateSuspenseListComponent(current,workInProgress,renderLanes){var nextProps=workInProgress.pendingProps,revealOrder=nextProps.revealOrder,tailMode=nextProps.tail;reconcileChildren(current,workInProgress,nextProps.children,renderLanes);nextProps=suspenseStackCursor.current;if(0!==(nextProps&2))nextProps=nextProps&1|2,workInProgress.flags|=128;else {if(null!==current&&0!==(current.flags&128))a:for(current=workInProgress.child;null!==current;){if(13===current.tag)null!==current.memoizedState&&scheduleSuspenseWorkOnFiber(current,renderLanes,workInProgress);else if(19===current.tag)scheduleSuspenseWorkOnFiber(current,renderLanes,workInProgress);else if(null!==current.child){current.child.return=current;current=current.child;continue;}if(current===workInProgress)break a;for(;null===current.sibling;){if(null===current.return||current.return===workInProgress)break a;current=current.return;}current.sibling.return=current.return;current=current.sibling;}nextProps&=1;}push(suspenseStackCursor,nextProps);switch(revealOrder){case "forwards":renderLanes=workInProgress.child;for(revealOrder=null;null!==renderLanes;)current=renderLanes.alternate,null!==current&&null===findFirstSuspended(current)&&(revealOrder=renderLanes),renderLanes=renderLanes.sibling;renderLanes=revealOrder;null===renderLanes?(revealOrder=workInProgress.child,workInProgress.child=null):(revealOrder=renderLanes.sibling,renderLanes.sibling=null);initSuspenseListRenderState(workInProgress,false,revealOrder,renderLanes,tailMode);break;case "backwards":renderLanes=null;revealOrder=workInProgress.child;for(workInProgress.child=null;null!==revealOrder;){current=revealOrder.alternate;if(null!==current&&null===findFirstSuspended(current)){workInProgress.child=revealOrder;break;}current=revealOrder.sibling;revealOrder.sibling=renderLanes;renderLanes=revealOrder;revealOrder=current;}initSuspenseListRenderState(workInProgress,true,renderLanes,null,tailMode);break;case "together":initSuspenseListRenderState(workInProgress,false,null,null,void 0);break;default:workInProgress.memoizedState=null;}return workInProgress.child;}function bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes){null!==current&&(workInProgress.dependencies=current.dependencies);workInProgressRootSkippedLanes|=workInProgress.lanes;if(0===(renderLanes&workInProgress.childLanes))if(null!==current){if(propagateParentContextChanges(current,workInProgress,renderLanes,false),0===(renderLanes&workInProgress.childLanes))return null;}else return null;if(null!==current&&workInProgress.child!==current.child)throw Error(formatProdErrorMessage(153));if(null!==workInProgress.child){current=workInProgress.child;renderLanes=createWorkInProgress(current,current.pendingProps);workInProgress.child=renderLanes;for(renderLanes.return=workInProgress;null!==current.sibling;)current=current.sibling,renderLanes=renderLanes.sibling=createWorkInProgress(current,current.pendingProps),renderLanes.return=workInProgress;renderLanes.sibling=null;}return workInProgress.child;}function checkScheduledUpdateOrContext(current,renderLanes){if(0!==(current.lanes&renderLanes))return  true;current=current.dependencies;return null!==current&&checkIfContextChanged(current)?true:false;}function attemptEarlyBailoutIfNoScheduledUpdate(current,workInProgress,renderLanes){switch(workInProgress.tag){case 3:pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);pushProvider(workInProgress,CacheContext,current.memoizedState.cache);resetHydrationState();break;case 27:case 5:pushHostContext(workInProgress);break;case 4:pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);break;case 10:pushProvider(workInProgress,workInProgress.type,workInProgress.memoizedProps.value);break;case 13:var state=workInProgress.memoizedState;if(null!==state){if(null!==state.dehydrated)return pushPrimaryTreeSuspenseHandler(workInProgress),workInProgress.flags|=128,null;if(0!==(renderLanes&workInProgress.child.childLanes))return updateSuspenseComponent(current,workInProgress,renderLanes);pushPrimaryTreeSuspenseHandler(workInProgress);current=bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);return null!==current?current.sibling:null;}pushPrimaryTreeSuspenseHandler(workInProgress);break;case 19:var didSuspendBefore=0!==(current.flags&128);state=0!==(renderLanes&workInProgress.childLanes);state||(propagateParentContextChanges(current,workInProgress,renderLanes,false),state=0!==(renderLanes&workInProgress.childLanes));if(didSuspendBefore){if(state)return updateSuspenseListComponent(current,workInProgress,renderLanes);workInProgress.flags|=128;}didSuspendBefore=workInProgress.memoizedState;null!==didSuspendBefore&&(didSuspendBefore.rendering=null,didSuspendBefore.tail=null,didSuspendBefore.lastEffect=null);push(suspenseStackCursor,suspenseStackCursor.current);if(state)break;else return null;case 22:case 23:return workInProgress.lanes=0,updateOffscreenComponent(current,workInProgress,renderLanes);case 24:pushProvider(workInProgress,CacheContext,current.memoizedState.cache);}return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}function beginWork(current,workInProgress,renderLanes){if(null!==current){if(current.memoizedProps!==workInProgress.pendingProps)didReceiveUpdate=true;else {if(!checkScheduledUpdateOrContext(current,renderLanes)&&0===(workInProgress.flags&128))return didReceiveUpdate=false,attemptEarlyBailoutIfNoScheduledUpdate(current,workInProgress,renderLanes);didReceiveUpdate=0!==(current.flags&131072)?true:false;}}else didReceiveUpdate=false,isHydrating&&0!==(workInProgress.flags&1048576)&&pushTreeId(workInProgress,treeForkCount,workInProgress.index);workInProgress.lanes=0;switch(workInProgress.tag){case 16:a:{current=workInProgress.pendingProps;var lazyComponent=workInProgress.elementType,init=lazyComponent._init;lazyComponent=init(lazyComponent._payload);workInProgress.type=lazyComponent;if("function"===typeof lazyComponent)shouldConstruct(lazyComponent)?(current=resolveClassComponentProps(lazyComponent,current),workInProgress.tag=1,workInProgress=updateClassComponent(null,workInProgress,lazyComponent,current,renderLanes)):(workInProgress.tag=0,workInProgress=updateFunctionComponent(null,workInProgress,lazyComponent,current,renderLanes));else {if(void 0!==lazyComponent&&null!==lazyComponent)if(init=lazyComponent.$$typeof,init===REACT_FORWARD_REF_TYPE){workInProgress.tag=11;workInProgress=updateForwardRef(null,workInProgress,lazyComponent,current,renderLanes);break a;}else if(init===REACT_MEMO_TYPE){workInProgress.tag=14;workInProgress=updateMemoComponent(null,workInProgress,lazyComponent,current,renderLanes);break a;}workInProgress=getComponentNameFromType(lazyComponent)||lazyComponent;throw Error(formatProdErrorMessage(306,workInProgress,""));}}return workInProgress;case 0:return updateFunctionComponent(current,workInProgress,workInProgress.type,workInProgress.pendingProps,renderLanes);case 1:return lazyComponent=workInProgress.type,init=resolveClassComponentProps(lazyComponent,workInProgress.pendingProps),updateClassComponent(current,workInProgress,lazyComponent,init,renderLanes);case 3:a:{pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);if(null===current)throw Error(formatProdErrorMessage(387));lazyComponent=workInProgress.pendingProps;var prevState=workInProgress.memoizedState;init=prevState.element;cloneUpdateQueue(current,workInProgress);processUpdateQueue(workInProgress,lazyComponent,null,renderLanes);var nextState=workInProgress.memoizedState;lazyComponent=nextState.cache;pushProvider(workInProgress,CacheContext,lazyComponent);lazyComponent!==prevState.cache&&propagateContextChanges(workInProgress,[CacheContext],renderLanes,true);suspendIfUpdateReadFromEntangledAsyncAction();lazyComponent=nextState.element;if(prevState.isDehydrated){if(prevState={element:lazyComponent,isDehydrated:false,cache:nextState.cache},workInProgress.updateQueue.baseState=prevState,workInProgress.memoizedState=prevState,workInProgress.flags&256){workInProgress=mountHostRootWithoutHydrating(current,workInProgress,lazyComponent,renderLanes);break a;}else if(lazyComponent!==init){init=createCapturedValueAtFiber(Error(formatProdErrorMessage(424)),workInProgress);queueHydrationError(init);workInProgress=mountHostRootWithoutHydrating(current,workInProgress,lazyComponent,renderLanes);break a;}else {current=workInProgress.stateNode.containerInfo;switch(current.nodeType){case 9:current=current.body;break;default:current="HTML"===current.nodeName?current.ownerDocument.body:current;}nextHydratableInstance=getNextHydratable(current.firstChild);hydrationParentFiber=workInProgress;isHydrating=true;hydrationErrors=null;rootOrSingletonContext=true;renderLanes=mountChildFibers(workInProgress,null,lazyComponent,renderLanes);for(workInProgress.child=renderLanes;renderLanes;)renderLanes.flags=renderLanes.flags&-3|4096,renderLanes=renderLanes.sibling;}}else {resetHydrationState();if(lazyComponent===init){workInProgress=bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);break a;}reconcileChildren(current,workInProgress,lazyComponent,renderLanes);}workInProgress=workInProgress.child;}return workInProgress;case 26:return markRef(current,workInProgress),null===current?(renderLanes=getResource(workInProgress.type,null,workInProgress.pendingProps,null))?workInProgress.memoizedState=renderLanes:isHydrating||(renderLanes=workInProgress.type,current=workInProgress.pendingProps,lazyComponent=getOwnerDocumentFromRootContainer(rootInstanceStackCursor.current).createElement(renderLanes),lazyComponent[internalInstanceKey]=workInProgress,lazyComponent[internalPropsKey]=current,setInitialProperties(lazyComponent,renderLanes,current),markNodeAsHoistable(lazyComponent),workInProgress.stateNode=lazyComponent):workInProgress.memoizedState=getResource(workInProgress.type,current.memoizedProps,workInProgress.pendingProps,current.memoizedState),null;case 27:return pushHostContext(workInProgress),null===current&&isHydrating&&(lazyComponent=workInProgress.stateNode=resolveSingletonInstance(workInProgress.type,workInProgress.pendingProps,rootInstanceStackCursor.current),hydrationParentFiber=workInProgress,rootOrSingletonContext=true,init=nextHydratableInstance,isSingletonScope(workInProgress.type)?(previousHydratableOnEnteringScopedSingleton=init,nextHydratableInstance=getNextHydratable(lazyComponent.firstChild)):nextHydratableInstance=init),reconcileChildren(current,workInProgress,workInProgress.pendingProps.children,renderLanes),markRef(current,workInProgress),null===current&&(workInProgress.flags|=4194304),workInProgress.child;case 5:if(null===current&&isHydrating){if(init=lazyComponent=nextHydratableInstance)lazyComponent=canHydrateInstance(lazyComponent,workInProgress.type,workInProgress.pendingProps,rootOrSingletonContext),null!==lazyComponent?(workInProgress.stateNode=lazyComponent,hydrationParentFiber=workInProgress,nextHydratableInstance=getNextHydratable(lazyComponent.firstChild),rootOrSingletonContext=false,init=true):init=false;init||throwOnHydrationMismatch(workInProgress);}pushHostContext(workInProgress);init=workInProgress.type;prevState=workInProgress.pendingProps;nextState=null!==current?current.memoizedProps:null;lazyComponent=prevState.children;shouldSetTextContent(init,prevState)?lazyComponent=null:null!==nextState&&shouldSetTextContent(init,nextState)&&(workInProgress.flags|=32);null!==workInProgress.memoizedState&&(init=renderWithHooks(current,workInProgress,TransitionAwareHostComponent,null,null,renderLanes),HostTransitionContext._currentValue=init);markRef(current,workInProgress);reconcileChildren(current,workInProgress,lazyComponent,renderLanes);return workInProgress.child;case 6:if(null===current&&isHydrating){if(current=renderLanes=nextHydratableInstance)renderLanes=canHydrateTextInstance(renderLanes,workInProgress.pendingProps,rootOrSingletonContext),null!==renderLanes?(workInProgress.stateNode=renderLanes,hydrationParentFiber=workInProgress,nextHydratableInstance=null,current=true):current=false;current||throwOnHydrationMismatch(workInProgress);}return null;case 13:return updateSuspenseComponent(current,workInProgress,renderLanes);case 4:return pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo),lazyComponent=workInProgress.pendingProps,null===current?workInProgress.child=reconcileChildFibers(workInProgress,null,lazyComponent,renderLanes):reconcileChildren(current,workInProgress,lazyComponent,renderLanes),workInProgress.child;case 11:return updateForwardRef(current,workInProgress,workInProgress.type,workInProgress.pendingProps,renderLanes);case 7:return reconcileChildren(current,workInProgress,workInProgress.pendingProps,renderLanes),workInProgress.child;case 8:return reconcileChildren(current,workInProgress,workInProgress.pendingProps.children,renderLanes),workInProgress.child;case 12:return reconcileChildren(current,workInProgress,workInProgress.pendingProps.children,renderLanes),workInProgress.child;case 10:return lazyComponent=workInProgress.pendingProps,pushProvider(workInProgress,workInProgress.type,lazyComponent.value),reconcileChildren(current,workInProgress,lazyComponent.children,renderLanes),workInProgress.child;case 9:return init=workInProgress.type._context,lazyComponent=workInProgress.pendingProps.children,prepareToReadContext(workInProgress),init=readContext(init),lazyComponent=lazyComponent(init),workInProgress.flags|=1,reconcileChildren(current,workInProgress,lazyComponent,renderLanes),workInProgress.child;case 14:return updateMemoComponent(current,workInProgress,workInProgress.type,workInProgress.pendingProps,renderLanes);case 15:return updateSimpleMemoComponent(current,workInProgress,workInProgress.type,workInProgress.pendingProps,renderLanes);case 19:return updateSuspenseListComponent(current,workInProgress,renderLanes);case 31:return lazyComponent=workInProgress.pendingProps,renderLanes=workInProgress.mode,lazyComponent={mode:lazyComponent.mode,children:lazyComponent.children},null===current?(renderLanes=mountWorkInProgressOffscreenFiber(lazyComponent,renderLanes),renderLanes.ref=workInProgress.ref,workInProgress.child=renderLanes,renderLanes.return=workInProgress,workInProgress=renderLanes):(renderLanes=createWorkInProgress(current.child,lazyComponent),renderLanes.ref=workInProgress.ref,workInProgress.child=renderLanes,renderLanes.return=workInProgress,workInProgress=renderLanes),workInProgress;case 22:return updateOffscreenComponent(current,workInProgress,renderLanes);case 24:return prepareToReadContext(workInProgress),lazyComponent=readContext(CacheContext),null===current?(init=peekCacheFromPool(),null===init&&(init=workInProgressRoot,prevState=createCache(),init.pooledCache=prevState,prevState.refCount++,null!==prevState&&(init.pooledCacheLanes|=renderLanes),init=prevState),workInProgress.memoizedState={parent:lazyComponent,cache:init},initializeUpdateQueue(workInProgress),pushProvider(workInProgress,CacheContext,init)):(0!==(current.lanes&renderLanes)&&(cloneUpdateQueue(current,workInProgress),processUpdateQueue(workInProgress,null,null,renderLanes),suspendIfUpdateReadFromEntangledAsyncAction()),init=current.memoizedState,prevState=workInProgress.memoizedState,init.parent!==lazyComponent?(init={parent:lazyComponent,cache:lazyComponent},workInProgress.memoizedState=init,0===workInProgress.lanes&&(workInProgress.memoizedState=workInProgress.updateQueue.baseState=init),pushProvider(workInProgress,CacheContext,lazyComponent)):(lazyComponent=prevState.cache,pushProvider(workInProgress,CacheContext,lazyComponent),lazyComponent!==init.cache&&propagateContextChanges(workInProgress,[CacheContext],renderLanes,true))),reconcileChildren(current,workInProgress,workInProgress.pendingProps.children,renderLanes),workInProgress.child;case 29:throw workInProgress.pendingProps;}throw Error(formatProdErrorMessage(156,workInProgress.tag));}function markUpdate(workInProgress){workInProgress.flags|=4;}function preloadResourceAndSuspendIfNeeded(workInProgress,resource){if("stylesheet"!==resource.type||0!==(resource.state.loading&4))workInProgress.flags&=-16777217;else if(workInProgress.flags|=16777216,!preloadResource(resource)){resource=suspenseHandlerStackCursor.current;if(null!==resource&&((workInProgressRootRenderLanes&4194048)===workInProgressRootRenderLanes?null!==shellBoundary:(workInProgressRootRenderLanes&62914560)!==workInProgressRootRenderLanes&&0===(workInProgressRootRenderLanes&536870912)||resource!==shellBoundary))throw suspendedThenable=noopSuspenseyCommitThenable,SuspenseyCommitException;workInProgress.flags|=8192;}}function scheduleRetryEffect(workInProgress,retryQueue){null!==retryQueue&&(workInProgress.flags|=4);workInProgress.flags&16384&&(retryQueue=22!==workInProgress.tag?claimNextRetryLane():536870912,workInProgress.lanes|=retryQueue,workInProgressSuspendedRetryLanes|=retryQueue);}function cutOffTailIfNeeded(renderState,hasRenderedATailFallback){if(!isHydrating)switch(renderState.tailMode){case "hidden":hasRenderedATailFallback=renderState.tail;for(var lastTailNode=null;null!==hasRenderedATailFallback;)null!==hasRenderedATailFallback.alternate&&(lastTailNode=hasRenderedATailFallback),hasRenderedATailFallback=hasRenderedATailFallback.sibling;null===lastTailNode?renderState.tail=null:lastTailNode.sibling=null;break;case "collapsed":lastTailNode=renderState.tail;for(var lastTailNode$113=null;null!==lastTailNode;)null!==lastTailNode.alternate&&(lastTailNode$113=lastTailNode),lastTailNode=lastTailNode.sibling;null===lastTailNode$113?hasRenderedATailFallback||null===renderState.tail?renderState.tail=null:renderState.tail.sibling=null:lastTailNode$113.sibling=null;}}function bubbleProperties(completedWork){var didBailout=null!==completedWork.alternate&&completedWork.alternate.child===completedWork.child,newChildLanes=0,subtreeFlags=0;if(didBailout)for(var child$114=completedWork.child;null!==child$114;)newChildLanes|=child$114.lanes|child$114.childLanes,subtreeFlags|=child$114.subtreeFlags&65011712,subtreeFlags|=child$114.flags&65011712,child$114.return=completedWork,child$114=child$114.sibling;else for(child$114=completedWork.child;null!==child$114;)newChildLanes|=child$114.lanes|child$114.childLanes,subtreeFlags|=child$114.subtreeFlags,subtreeFlags|=child$114.flags,child$114.return=completedWork,child$114=child$114.sibling;completedWork.subtreeFlags|=subtreeFlags;completedWork.childLanes=newChildLanes;return didBailout;}function completeWork(current,workInProgress,renderLanes){var newProps=workInProgress.pendingProps;popTreeContext(workInProgress);switch(workInProgress.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return bubbleProperties(workInProgress),null;case 1:return bubbleProperties(workInProgress),null;case 3:renderLanes=workInProgress.stateNode;newProps=null;null!==current&&(newProps=current.memoizedState.cache);workInProgress.memoizedState.cache!==newProps&&(workInProgress.flags|=2048);popProvider(CacheContext);popHostContainer();renderLanes.pendingContext&&(renderLanes.context=renderLanes.pendingContext,renderLanes.pendingContext=null);if(null===current||null===current.child)popHydrationState(workInProgress)?markUpdate(workInProgress):null===current||current.memoizedState.isDehydrated&&0===(workInProgress.flags&256)||(workInProgress.flags|=1024,upgradeHydrationErrorsToRecoverable());bubbleProperties(workInProgress);return null;case 26:return renderLanes=workInProgress.memoizedState,null===current?(markUpdate(workInProgress),null!==renderLanes?(bubbleProperties(workInProgress),preloadResourceAndSuspendIfNeeded(workInProgress,renderLanes)):(bubbleProperties(workInProgress),workInProgress.flags&=-16777217)):renderLanes?renderLanes!==current.memoizedState?(markUpdate(workInProgress),bubbleProperties(workInProgress),preloadResourceAndSuspendIfNeeded(workInProgress,renderLanes)):(bubbleProperties(workInProgress),workInProgress.flags&=-16777217):(current.memoizedProps!==newProps&&markUpdate(workInProgress),bubbleProperties(workInProgress),workInProgress.flags&=-16777217),null;case 27:popHostContext(workInProgress);renderLanes=rootInstanceStackCursor.current;var type=workInProgress.type;if(null!==current&&null!=workInProgress.stateNode)current.memoizedProps!==newProps&&markUpdate(workInProgress);else {if(!newProps){if(null===workInProgress.stateNode)throw Error(formatProdErrorMessage(166));bubbleProperties(workInProgress);return null;}current=contextStackCursor.current;popHydrationState(workInProgress)?prepareToHydrateHostInstance(workInProgress):(current=resolveSingletonInstance(type,newProps,renderLanes),workInProgress.stateNode=current,markUpdate(workInProgress));}bubbleProperties(workInProgress);return null;case 5:popHostContext(workInProgress);renderLanes=workInProgress.type;if(null!==current&&null!=workInProgress.stateNode)current.memoizedProps!==newProps&&markUpdate(workInProgress);else {if(!newProps){if(null===workInProgress.stateNode)throw Error(formatProdErrorMessage(166));bubbleProperties(workInProgress);return null;}current=contextStackCursor.current;if(popHydrationState(workInProgress))prepareToHydrateHostInstance(workInProgress);else {type=getOwnerDocumentFromRootContainer(rootInstanceStackCursor.current);switch(current){case 1:current=type.createElementNS("http://www.w3.org/2000/svg",renderLanes);break;case 2:current=type.createElementNS("http://www.w3.org/1998/Math/MathML",renderLanes);break;default:switch(renderLanes){case "svg":current=type.createElementNS("http://www.w3.org/2000/svg",renderLanes);break;case "math":current=type.createElementNS("http://www.w3.org/1998/Math/MathML",renderLanes);break;case "script":current=type.createElement("div");current.innerHTML="<script>\x3c/script>";current=current.removeChild(current.firstChild);break;case "select":current="string"===typeof newProps.is?type.createElement("select",{is:newProps.is}):type.createElement("select");newProps.multiple?current.multiple=true:newProps.size&&(current.size=newProps.size);break;default:current="string"===typeof newProps.is?type.createElement(renderLanes,{is:newProps.is}):type.createElement(renderLanes);}}current[internalInstanceKey]=workInProgress;current[internalPropsKey]=newProps;a:for(type=workInProgress.child;null!==type;){if(5===type.tag||6===type.tag)current.appendChild(type.stateNode);else if(4!==type.tag&&27!==type.tag&&null!==type.child){type.child.return=type;type=type.child;continue;}if(type===workInProgress)break a;for(;null===type.sibling;){if(null===type.return||type.return===workInProgress)break a;type=type.return;}type.sibling.return=type.return;type=type.sibling;}workInProgress.stateNode=current;a:switch(setInitialProperties(current,renderLanes,newProps),renderLanes){case "button":case "input":case "select":case "textarea":current=!!newProps.autoFocus;break a;case "img":current=true;break a;default:current=false;}current&&markUpdate(workInProgress);}}bubbleProperties(workInProgress);workInProgress.flags&=-16777217;return null;case 6:if(current&&null!=workInProgress.stateNode)current.memoizedProps!==newProps&&markUpdate(workInProgress);else {if("string"!==typeof newProps&&null===workInProgress.stateNode)throw Error(formatProdErrorMessage(166));current=rootInstanceStackCursor.current;if(popHydrationState(workInProgress)){current=workInProgress.stateNode;renderLanes=workInProgress.memoizedProps;newProps=null;type=hydrationParentFiber;if(null!==type)switch(type.tag){case 27:case 5:newProps=type.memoizedProps;}current[internalInstanceKey]=workInProgress;current=current.nodeValue===renderLanes||null!==newProps&&true===newProps.suppressHydrationWarning||checkForUnmatchedText(current.nodeValue,renderLanes)?true:false;current||throwOnHydrationMismatch(workInProgress);}else current=getOwnerDocumentFromRootContainer(current).createTextNode(newProps),current[internalInstanceKey]=workInProgress,workInProgress.stateNode=current;}bubbleProperties(workInProgress);return null;case 13:newProps=workInProgress.memoizedState;if(null===current||null!==current.memoizedState&&null!==current.memoizedState.dehydrated){type=popHydrationState(workInProgress);if(null!==newProps&&null!==newProps.dehydrated){if(null===current){if(!type)throw Error(formatProdErrorMessage(318));type=workInProgress.memoizedState;type=null!==type?type.dehydrated:null;if(!type)throw Error(formatProdErrorMessage(317));type[internalInstanceKey]=workInProgress;}else resetHydrationState(),0===(workInProgress.flags&128)&&(workInProgress.memoizedState=null),workInProgress.flags|=4;bubbleProperties(workInProgress);type=false;}else type=upgradeHydrationErrorsToRecoverable(),null!==current&&null!==current.memoizedState&&(current.memoizedState.hydrationErrors=type),type=true;if(!type){if(workInProgress.flags&256)return popSuspenseHandler(workInProgress),workInProgress;popSuspenseHandler(workInProgress);return null;}}popSuspenseHandler(workInProgress);if(0!==(workInProgress.flags&128))return workInProgress.lanes=renderLanes,workInProgress;renderLanes=null!==newProps;current=null!==current&&null!==current.memoizedState;if(renderLanes){newProps=workInProgress.child;type=null;null!==newProps.alternate&&null!==newProps.alternate.memoizedState&&null!==newProps.alternate.memoizedState.cachePool&&(type=newProps.alternate.memoizedState.cachePool.pool);var cache$127=null;null!==newProps.memoizedState&&null!==newProps.memoizedState.cachePool&&(cache$127=newProps.memoizedState.cachePool.pool);cache$127!==type&&(newProps.flags|=2048);}renderLanes!==current&&renderLanes&&(workInProgress.child.flags|=8192);scheduleRetryEffect(workInProgress,workInProgress.updateQueue);bubbleProperties(workInProgress);return null;case 4:return popHostContainer(),null===current&&listenToAllSupportedEvents(workInProgress.stateNode.containerInfo),bubbleProperties(workInProgress),null;case 10:return popProvider(workInProgress.type),bubbleProperties(workInProgress),null;case 19:pop(suspenseStackCursor);type=workInProgress.memoizedState;if(null===type)return bubbleProperties(workInProgress),null;newProps=0!==(workInProgress.flags&128);cache$127=type.rendering;if(null===cache$127){if(newProps)cutOffTailIfNeeded(type,false);else {if(0!==workInProgressRootExitStatus||null!==current&&0!==(current.flags&128))for(current=workInProgress.child;null!==current;){cache$127=findFirstSuspended(current);if(null!==cache$127){workInProgress.flags|=128;cutOffTailIfNeeded(type,false);current=cache$127.updateQueue;workInProgress.updateQueue=current;scheduleRetryEffect(workInProgress,current);workInProgress.subtreeFlags=0;current=renderLanes;for(renderLanes=workInProgress.child;null!==renderLanes;)resetWorkInProgress(renderLanes,current),renderLanes=renderLanes.sibling;push(suspenseStackCursor,suspenseStackCursor.current&1|2);return workInProgress.child;}current=current.sibling;}null!==type.tail&&now()>workInProgressRootRenderTargetTime&&(workInProgress.flags|=128,newProps=true,cutOffTailIfNeeded(type,false),workInProgress.lanes=4194304);}}else {if(!newProps)if(current=findFirstSuspended(cache$127),null!==current){if(workInProgress.flags|=128,newProps=true,current=current.updateQueue,workInProgress.updateQueue=current,scheduleRetryEffect(workInProgress,current),cutOffTailIfNeeded(type,true),null===type.tail&&"hidden"===type.tailMode&&!cache$127.alternate&&!isHydrating)return bubbleProperties(workInProgress),null;}else 2*now()-type.renderingStartTime>workInProgressRootRenderTargetTime&&536870912!==renderLanes&&(workInProgress.flags|=128,newProps=true,cutOffTailIfNeeded(type,false),workInProgress.lanes=4194304);type.isBackwards?(cache$127.sibling=workInProgress.child,workInProgress.child=cache$127):(current=type.last,null!==current?current.sibling=cache$127:workInProgress.child=cache$127,type.last=cache$127);}if(null!==type.tail)return workInProgress=type.tail,type.rendering=workInProgress,type.tail=workInProgress.sibling,type.renderingStartTime=now(),workInProgress.sibling=null,current=suspenseStackCursor.current,push(suspenseStackCursor,newProps?current&1|2:current&1),workInProgress;bubbleProperties(workInProgress);return null;case 22:case 23:return popSuspenseHandler(workInProgress),popHiddenContext(),newProps=null!==workInProgress.memoizedState,null!==current?null!==current.memoizedState!==newProps&&(workInProgress.flags|=8192):newProps&&(workInProgress.flags|=8192),newProps?0!==(renderLanes&536870912)&&0===(workInProgress.flags&128)&&(bubbleProperties(workInProgress),workInProgress.subtreeFlags&6&&(workInProgress.flags|=8192)):bubbleProperties(workInProgress),renderLanes=workInProgress.updateQueue,null!==renderLanes&&scheduleRetryEffect(workInProgress,renderLanes.retryQueue),renderLanes=null,null!==current&&null!==current.memoizedState&&null!==current.memoizedState.cachePool&&(renderLanes=current.memoizedState.cachePool.pool),newProps=null,null!==workInProgress.memoizedState&&null!==workInProgress.memoizedState.cachePool&&(newProps=workInProgress.memoizedState.cachePool.pool),newProps!==renderLanes&&(workInProgress.flags|=2048),null!==current&&pop(resumedCache),null;case 24:return renderLanes=null,null!==current&&(renderLanes=current.memoizedState.cache),workInProgress.memoizedState.cache!==renderLanes&&(workInProgress.flags|=2048),popProvider(CacheContext),bubbleProperties(workInProgress),null;case 25:return null;case 30:return null;}throw Error(formatProdErrorMessage(156,workInProgress.tag));}function unwindWork(current,workInProgress){popTreeContext(workInProgress);switch(workInProgress.tag){case 1:return current=workInProgress.flags,current&65536?(workInProgress.flags=current&-65537|128,workInProgress):null;case 3:return popProvider(CacheContext),popHostContainer(),current=workInProgress.flags,0!==(current&65536)&&0===(current&128)?(workInProgress.flags=current&-65537|128,workInProgress):null;case 26:case 27:case 5:return popHostContext(workInProgress),null;case 13:popSuspenseHandler(workInProgress);current=workInProgress.memoizedState;if(null!==current&&null!==current.dehydrated){if(null===workInProgress.alternate)throw Error(formatProdErrorMessage(340));resetHydrationState();}current=workInProgress.flags;return current&65536?(workInProgress.flags=current&-65537|128,workInProgress):null;case 19:return pop(suspenseStackCursor),null;case 4:return popHostContainer(),null;case 10:return popProvider(workInProgress.type),null;case 22:case 23:return popSuspenseHandler(workInProgress),popHiddenContext(),null!==current&&pop(resumedCache),current=workInProgress.flags,current&65536?(workInProgress.flags=current&-65537|128,workInProgress):null;case 24:return popProvider(CacheContext),null;case 25:return null;default:return null;}}function unwindInterruptedWork(current,interruptedWork){popTreeContext(interruptedWork);switch(interruptedWork.tag){case 3:popProvider(CacheContext);popHostContainer();break;case 26:case 27:case 5:popHostContext(interruptedWork);break;case 4:popHostContainer();break;case 13:popSuspenseHandler(interruptedWork);break;case 19:pop(suspenseStackCursor);break;case 10:popProvider(interruptedWork.type);break;case 22:case 23:popSuspenseHandler(interruptedWork);popHiddenContext();null!==current&&pop(resumedCache);break;case 24:popProvider(CacheContext);}}function commitHookEffectListMount(flags,finishedWork){try{var updateQueue=finishedWork.updateQueue,lastEffect=null!==updateQueue?updateQueue.lastEffect:null;if(null!==lastEffect){var firstEffect=lastEffect.next;updateQueue=firstEffect;do{if((updateQueue.tag&flags)===flags){lastEffect=void 0;var create=updateQueue.create,inst=updateQueue.inst;lastEffect=create();inst.destroy=lastEffect;}updateQueue=updateQueue.next;}while(updateQueue!==firstEffect);}}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}function commitHookEffectListUnmount(flags,finishedWork,nearestMountedAncestor$jscomp$0){try{var updateQueue=finishedWork.updateQueue,lastEffect=null!==updateQueue?updateQueue.lastEffect:null;if(null!==lastEffect){var firstEffect=lastEffect.next;updateQueue=firstEffect;do{if((updateQueue.tag&flags)===flags){var inst=updateQueue.inst,destroy=inst.destroy;if(void 0!==destroy){inst.destroy=void 0;lastEffect=finishedWork;var nearestMountedAncestor=nearestMountedAncestor$jscomp$0,destroy_=destroy;try{destroy_();}catch(error){captureCommitPhaseError(lastEffect,nearestMountedAncestor,error);}}}updateQueue=updateQueue.next;}while(updateQueue!==firstEffect);}}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}function commitClassCallbacks(finishedWork){var updateQueue=finishedWork.updateQueue;if(null!==updateQueue){var instance=finishedWork.stateNode;try{commitCallbacks(updateQueue,instance);}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}}function safelyCallComponentWillUnmount(current,nearestMountedAncestor,instance){instance.props=resolveClassComponentProps(current.type,current.memoizedProps);instance.state=current.memoizedState;try{instance.componentWillUnmount();}catch(error){captureCommitPhaseError(current,nearestMountedAncestor,error);}}function safelyAttachRef(current,nearestMountedAncestor){try{var ref=current.ref;if(null!==ref){switch(current.tag){case 26:case 27:case 5:var instanceToUse=current.stateNode;break;case 30:instanceToUse=current.stateNode;break;default:instanceToUse=current.stateNode;}"function"===typeof ref?current.refCleanup=ref(instanceToUse):ref.current=instanceToUse;}}catch(error){captureCommitPhaseError(current,nearestMountedAncestor,error);}}function safelyDetachRef(current,nearestMountedAncestor){var ref=current.ref,refCleanup=current.refCleanup;if(null!==ref)if("function"===typeof refCleanup)try{refCleanup();}catch(error){captureCommitPhaseError(current,nearestMountedAncestor,error);}finally{current.refCleanup=null,current=current.alternate,null!=current&&(current.refCleanup=null);}else if("function"===typeof ref)try{ref(null);}catch(error$143){captureCommitPhaseError(current,nearestMountedAncestor,error$143);}else ref.current=null;}function commitHostMount(finishedWork){var type=finishedWork.type,props=finishedWork.memoizedProps,instance=finishedWork.stateNode;try{a:switch(type){case "button":case "input":case "select":case "textarea":props.autoFocus&&instance.focus();break a;case "img":props.src?instance.src=props.src:props.srcSet&&(instance.srcset=props.srcSet);}}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}function commitHostUpdate(finishedWork,newProps,oldProps){try{var domElement=finishedWork.stateNode;updateProperties(domElement,finishedWork.type,oldProps,newProps);domElement[internalPropsKey]=newProps;}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}function isHostParent(fiber){return 5===fiber.tag||3===fiber.tag||26===fiber.tag||27===fiber.tag&&isSingletonScope(fiber.type)||4===fiber.tag;}function getHostSibling(fiber){a:for(;;){for(;null===fiber.sibling;){if(null===fiber.return||isHostParent(fiber.return))return null;fiber=fiber.return;}fiber.sibling.return=fiber.return;for(fiber=fiber.sibling;5!==fiber.tag&&6!==fiber.tag&&18!==fiber.tag;){if(27===fiber.tag&&isSingletonScope(fiber.type))continue a;if(fiber.flags&2)continue a;if(null===fiber.child||4===fiber.tag)continue a;else fiber.child.return=fiber,fiber=fiber.child;}if(!(fiber.flags&2))return fiber.stateNode;}}function insertOrAppendPlacementNodeIntoContainer(node,before,parent){var tag=node.tag;if(5===tag||6===tag)node=node.stateNode,before?(9===parent.nodeType?parent.body:"HTML"===parent.nodeName?parent.ownerDocument.body:parent).insertBefore(node,before):(before=9===parent.nodeType?parent.body:"HTML"===parent.nodeName?parent.ownerDocument.body:parent,before.appendChild(node),parent=parent._reactRootContainer,null!==parent&&void 0!==parent||null!==before.onclick||(before.onclick=noop$1));else if(4!==tag&&(27===tag&&isSingletonScope(node.type)&&(parent=node.stateNode,before=null),node=node.child,null!==node))for(insertOrAppendPlacementNodeIntoContainer(node,before,parent),node=node.sibling;null!==node;)insertOrAppendPlacementNodeIntoContainer(node,before,parent),node=node.sibling;}function insertOrAppendPlacementNode(node,before,parent){var tag=node.tag;if(5===tag||6===tag)node=node.stateNode,before?parent.insertBefore(node,before):parent.appendChild(node);else if(4!==tag&&(27===tag&&isSingletonScope(node.type)&&(parent=node.stateNode),node=node.child,null!==node))for(insertOrAppendPlacementNode(node,before,parent),node=node.sibling;null!==node;)insertOrAppendPlacementNode(node,before,parent),node=node.sibling;}function commitHostSingletonAcquisition(finishedWork){var singleton=finishedWork.stateNode,props=finishedWork.memoizedProps;try{for(var type=finishedWork.type,attributes=singleton.attributes;attributes.length;)singleton.removeAttributeNode(attributes[0]);setInitialProperties(singleton,type,props);singleton[internalInstanceKey]=finishedWork;singleton[internalPropsKey]=props;}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}var offscreenSubtreeIsHidden=false,offscreenSubtreeWasHidden=false,needsFormReset=false,PossiblyWeakSet="function"===typeof WeakSet?WeakSet:Set,nextEffect=null;function commitBeforeMutationEffects(root,firstChild){root=root.containerInfo;eventsEnabled=_enabled;root=getActiveElementDeep(root);if(hasSelectionCapabilities(root)){if("selectionStart"in root)var JSCompiler_temp={start:root.selectionStart,end:root.selectionEnd};else a:{JSCompiler_temp=(JSCompiler_temp=root.ownerDocument)&&JSCompiler_temp.defaultView||window;var selection=JSCompiler_temp.getSelection&&JSCompiler_temp.getSelection();if(selection&&0!==selection.rangeCount){JSCompiler_temp=selection.anchorNode;var anchorOffset=selection.anchorOffset,focusNode=selection.focusNode;selection=selection.focusOffset;try{JSCompiler_temp.nodeType,focusNode.nodeType;}catch(e$20){JSCompiler_temp=null;break a;}var length=0,start=-1,end=-1,indexWithinAnchor=0,indexWithinFocus=0,node=root,parentNode=null;b:for(;;){for(var next;;){node!==JSCompiler_temp||0!==anchorOffset&&3!==node.nodeType||(start=length+anchorOffset);node!==focusNode||0!==selection&&3!==node.nodeType||(end=length+selection);3===node.nodeType&&(length+=node.nodeValue.length);if(null===(next=node.firstChild))break;parentNode=node;node=next;}for(;;){if(node===root)break b;parentNode===JSCompiler_temp&&++indexWithinAnchor===anchorOffset&&(start=length);parentNode===focusNode&&++indexWithinFocus===selection&&(end=length);if(null!==(next=node.nextSibling))break;node=parentNode;parentNode=node.parentNode;}node=next;}JSCompiler_temp=-1===start||-1===end?null:{start:start,end:end};}else JSCompiler_temp=null;}JSCompiler_temp=JSCompiler_temp||{start:0,end:0};}else JSCompiler_temp=null;selectionInformation={focusedElem:root,selectionRange:JSCompiler_temp};_enabled=false;for(nextEffect=firstChild;null!==nextEffect;)if(firstChild=nextEffect,root=firstChild.child,0!==(firstChild.subtreeFlags&1024)&&null!==root)root.return=firstChild,nextEffect=root;else for(;null!==nextEffect;){firstChild=nextEffect;focusNode=firstChild.alternate;root=firstChild.flags;switch(firstChild.tag){case 0:break;case 11:case 15:break;case 1:if(0!==(root&1024)&&null!==focusNode){root=void 0;JSCompiler_temp=firstChild;anchorOffset=focusNode.memoizedProps;focusNode=focusNode.memoizedState;selection=JSCompiler_temp.stateNode;try{var resolvedPrevProps=resolveClassComponentProps(JSCompiler_temp.type,anchorOffset,JSCompiler_temp.elementType===JSCompiler_temp.type);root=selection.getSnapshotBeforeUpdate(resolvedPrevProps,focusNode);selection.__reactInternalSnapshotBeforeUpdate=root;}catch(error){captureCommitPhaseError(JSCompiler_temp,JSCompiler_temp.return,error);}}break;case 3:if(0!==(root&1024))if(root=firstChild.stateNode.containerInfo,JSCompiler_temp=root.nodeType,9===JSCompiler_temp)clearContainerSparingly(root);else if(1===JSCompiler_temp)switch(root.nodeName){case "HEAD":case "HTML":case "BODY":clearContainerSparingly(root);break;default:root.textContent="";}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(0!==(root&1024))throw Error(formatProdErrorMessage(163));}root=firstChild.sibling;if(null!==root){root.return=firstChild.return;nextEffect=root;break;}nextEffect=firstChild.return;}}function commitLayoutEffectOnFiber(finishedRoot,current,finishedWork){var flags=finishedWork.flags;switch(finishedWork.tag){case 0:case 11:case 15:recursivelyTraverseLayoutEffects(finishedRoot,finishedWork);flags&4&&commitHookEffectListMount(5,finishedWork);break;case 1:recursivelyTraverseLayoutEffects(finishedRoot,finishedWork);if(flags&4)if(finishedRoot=finishedWork.stateNode,null===current)try{finishedRoot.componentDidMount();}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}else {var prevProps=resolveClassComponentProps(finishedWork.type,current.memoizedProps);current=current.memoizedState;try{finishedRoot.componentDidUpdate(prevProps,current,finishedRoot.__reactInternalSnapshotBeforeUpdate);}catch(error$142){captureCommitPhaseError(finishedWork,finishedWork.return,error$142);}}flags&64&&commitClassCallbacks(finishedWork);flags&512&&safelyAttachRef(finishedWork,finishedWork.return);break;case 3:recursivelyTraverseLayoutEffects(finishedRoot,finishedWork);if(flags&64&&(finishedRoot=finishedWork.updateQueue,null!==finishedRoot)){current=null;if(null!==finishedWork.child)switch(finishedWork.child.tag){case 27:case 5:current=finishedWork.child.stateNode;break;case 1:current=finishedWork.child.stateNode;}try{commitCallbacks(finishedRoot,current);}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}break;case 27:null===current&&flags&4&&commitHostSingletonAcquisition(finishedWork);case 26:case 5:recursivelyTraverseLayoutEffects(finishedRoot,finishedWork);null===current&&flags&4&&commitHostMount(finishedWork);flags&512&&safelyAttachRef(finishedWork,finishedWork.return);break;case 12:recursivelyTraverseLayoutEffects(finishedRoot,finishedWork);break;case 13:recursivelyTraverseLayoutEffects(finishedRoot,finishedWork);flags&4&&commitSuspenseHydrationCallbacks(finishedRoot,finishedWork);flags&64&&(finishedRoot=finishedWork.memoizedState,null!==finishedRoot&&(finishedRoot=finishedRoot.dehydrated,null!==finishedRoot&&(finishedWork=retryDehydratedSuspenseBoundary.bind(null,finishedWork),registerSuspenseInstanceRetry(finishedRoot,finishedWork))));break;case 22:flags=null!==finishedWork.memoizedState||offscreenSubtreeIsHidden;if(!flags){current=null!==current&&null!==current.memoizedState||offscreenSubtreeWasHidden;prevProps=offscreenSubtreeIsHidden;var prevOffscreenSubtreeWasHidden=offscreenSubtreeWasHidden;offscreenSubtreeIsHidden=flags;(offscreenSubtreeWasHidden=current)&&!prevOffscreenSubtreeWasHidden?recursivelyTraverseReappearLayoutEffects(finishedRoot,finishedWork,0!==(finishedWork.subtreeFlags&8772)):recursivelyTraverseLayoutEffects(finishedRoot,finishedWork);offscreenSubtreeIsHidden=prevProps;offscreenSubtreeWasHidden=prevOffscreenSubtreeWasHidden;}break;case 30:break;default:recursivelyTraverseLayoutEffects(finishedRoot,finishedWork);}}function detachFiberAfterEffects(fiber){var alternate=fiber.alternate;null!==alternate&&(fiber.alternate=null,detachFiberAfterEffects(alternate));fiber.child=null;fiber.deletions=null;fiber.sibling=null;5===fiber.tag&&(alternate=fiber.stateNode,null!==alternate&&detachDeletedInstance(alternate));fiber.stateNode=null;fiber.return=null;fiber.dependencies=null;fiber.memoizedProps=null;fiber.memoizedState=null;fiber.pendingProps=null;fiber.stateNode=null;fiber.updateQueue=null;}var hostParent=null,hostParentIsContainer=false;function recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,parent){for(parent=parent.child;null!==parent;)commitDeletionEffectsOnFiber(finishedRoot,nearestMountedAncestor,parent),parent=parent.sibling;}function commitDeletionEffectsOnFiber(finishedRoot,nearestMountedAncestor,deletedFiber){if(injectedHook&&"function"===typeof injectedHook.onCommitFiberUnmount)try{injectedHook.onCommitFiberUnmount(rendererID,deletedFiber);}catch(err){}switch(deletedFiber.tag){case 26:offscreenSubtreeWasHidden||safelyDetachRef(deletedFiber,nearestMountedAncestor);recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,deletedFiber);deletedFiber.memoizedState?deletedFiber.memoizedState.count--:deletedFiber.stateNode&&(deletedFiber=deletedFiber.stateNode,deletedFiber.parentNode.removeChild(deletedFiber));break;case 27:offscreenSubtreeWasHidden||safelyDetachRef(deletedFiber,nearestMountedAncestor);var prevHostParent=hostParent,prevHostParentIsContainer=hostParentIsContainer;isSingletonScope(deletedFiber.type)&&(hostParent=deletedFiber.stateNode,hostParentIsContainer=false);recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,deletedFiber);releaseSingletonInstance(deletedFiber.stateNode);hostParent=prevHostParent;hostParentIsContainer=prevHostParentIsContainer;break;case 5:offscreenSubtreeWasHidden||safelyDetachRef(deletedFiber,nearestMountedAncestor);case 6:prevHostParent=hostParent;prevHostParentIsContainer=hostParentIsContainer;hostParent=null;recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,deletedFiber);hostParent=prevHostParent;hostParentIsContainer=prevHostParentIsContainer;if(null!==hostParent)if(hostParentIsContainer)try{(9===hostParent.nodeType?hostParent.body:"HTML"===hostParent.nodeName?hostParent.ownerDocument.body:hostParent).removeChild(deletedFiber.stateNode);}catch(error){captureCommitPhaseError(deletedFiber,nearestMountedAncestor,error);}else try{hostParent.removeChild(deletedFiber.stateNode);}catch(error){captureCommitPhaseError(deletedFiber,nearestMountedAncestor,error);}break;case 18:null!==hostParent&&(hostParentIsContainer?(finishedRoot=hostParent,clearSuspenseBoundary(9===finishedRoot.nodeType?finishedRoot.body:"HTML"===finishedRoot.nodeName?finishedRoot.ownerDocument.body:finishedRoot,deletedFiber.stateNode),retryIfBlockedOn(finishedRoot)):clearSuspenseBoundary(hostParent,deletedFiber.stateNode));break;case 4:prevHostParent=hostParent;prevHostParentIsContainer=hostParentIsContainer;hostParent=deletedFiber.stateNode.containerInfo;hostParentIsContainer=true;recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,deletedFiber);hostParent=prevHostParent;hostParentIsContainer=prevHostParentIsContainer;break;case 0:case 11:case 14:case 15:offscreenSubtreeWasHidden||commitHookEffectListUnmount(2,deletedFiber,nearestMountedAncestor);offscreenSubtreeWasHidden||commitHookEffectListUnmount(4,deletedFiber,nearestMountedAncestor);recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,deletedFiber);break;case 1:offscreenSubtreeWasHidden||(safelyDetachRef(deletedFiber,nearestMountedAncestor),prevHostParent=deletedFiber.stateNode,"function"===typeof prevHostParent.componentWillUnmount&&safelyCallComponentWillUnmount(deletedFiber,nearestMountedAncestor,prevHostParent));recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,deletedFiber);break;case 21:recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,deletedFiber);break;case 22:offscreenSubtreeWasHidden=(prevHostParent=offscreenSubtreeWasHidden)||null!==deletedFiber.memoizedState;recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,deletedFiber);offscreenSubtreeWasHidden=prevHostParent;break;default:recursivelyTraverseDeletionEffects(finishedRoot,nearestMountedAncestor,deletedFiber);}}function commitSuspenseHydrationCallbacks(finishedRoot,finishedWork){if(null===finishedWork.memoizedState&&(finishedRoot=finishedWork.alternate,null!==finishedRoot&&(finishedRoot=finishedRoot.memoizedState,null!==finishedRoot&&(finishedRoot=finishedRoot.dehydrated,null!==finishedRoot))))try{retryIfBlockedOn(finishedRoot);}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}function getRetryCache(finishedWork){switch(finishedWork.tag){case 13:case 19:var retryCache=finishedWork.stateNode;null===retryCache&&(retryCache=finishedWork.stateNode=new PossiblyWeakSet());return retryCache;case 22:return finishedWork=finishedWork.stateNode,retryCache=finishedWork._retryCache,null===retryCache&&(retryCache=finishedWork._retryCache=new PossiblyWeakSet()),retryCache;default:throw Error(formatProdErrorMessage(435,finishedWork.tag));}}function attachSuspenseRetryListeners(finishedWork,wakeables){var retryCache=getRetryCache(finishedWork);wakeables.forEach(function(wakeable){var retry=resolveRetryWakeable.bind(null,finishedWork,wakeable);retryCache.has(wakeable)||(retryCache.add(wakeable),wakeable.then(retry,retry));});}function recursivelyTraverseMutationEffects(root$jscomp$0,parentFiber){var deletions=parentFiber.deletions;if(null!==deletions)for(var i=0;i<deletions.length;i++){var childToDelete=deletions[i],root=root$jscomp$0,returnFiber=parentFiber,parent=returnFiber;a:for(;null!==parent;){switch(parent.tag){case 27:if(isSingletonScope(parent.type)){hostParent=parent.stateNode;hostParentIsContainer=false;break a;}break;case 5:hostParent=parent.stateNode;hostParentIsContainer=false;break a;case 3:case 4:hostParent=parent.stateNode.containerInfo;hostParentIsContainer=true;break a;}parent=parent.return;}if(null===hostParent)throw Error(formatProdErrorMessage(160));commitDeletionEffectsOnFiber(root,returnFiber,childToDelete);hostParent=null;hostParentIsContainer=false;root=childToDelete.alternate;null!==root&&(root.return=null);childToDelete.return=null;}if(parentFiber.subtreeFlags&13878)for(parentFiber=parentFiber.child;null!==parentFiber;)commitMutationEffectsOnFiber(parentFiber,root$jscomp$0),parentFiber=parentFiber.sibling;}var currentHoistableRoot=null;function commitMutationEffectsOnFiber(finishedWork,root){var current=finishedWork.alternate,flags=finishedWork.flags;switch(finishedWork.tag){case 0:case 11:case 14:case 15:recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);flags&4&&(commitHookEffectListUnmount(3,finishedWork,finishedWork.return),commitHookEffectListMount(3,finishedWork),commitHookEffectListUnmount(5,finishedWork,finishedWork.return));break;case 1:recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);flags&512&&(offscreenSubtreeWasHidden||null===current||safelyDetachRef(current,current.return));flags&64&&offscreenSubtreeIsHidden&&(finishedWork=finishedWork.updateQueue,null!==finishedWork&&(flags=finishedWork.callbacks,null!==flags&&(current=finishedWork.shared.hiddenCallbacks,finishedWork.shared.hiddenCallbacks=null===current?flags:current.concat(flags))));break;case 26:var hoistableRoot=currentHoistableRoot;recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);flags&512&&(offscreenSubtreeWasHidden||null===current||safelyDetachRef(current,current.return));if(flags&4){var currentResource=null!==current?current.memoizedState:null;flags=finishedWork.memoizedState;if(null===current){if(null===flags){if(null===finishedWork.stateNode){a:{flags=finishedWork.type;current=finishedWork.memoizedProps;hoistableRoot=hoistableRoot.ownerDocument||hoistableRoot;b:switch(flags){case "title":currentResource=hoistableRoot.getElementsByTagName("title")[0];if(!currentResource||currentResource[internalHoistableMarker]||currentResource[internalInstanceKey]||"http://www.w3.org/2000/svg"===currentResource.namespaceURI||currentResource.hasAttribute("itemprop"))currentResource=hoistableRoot.createElement(flags),hoistableRoot.head.insertBefore(currentResource,hoistableRoot.querySelector("head > title"));setInitialProperties(currentResource,flags,current);currentResource[internalInstanceKey]=finishedWork;markNodeAsHoistable(currentResource);flags=currentResource;break a;case "link":var maybeNodes=getHydratableHoistableCache("link","href",hoistableRoot).get(flags+(current.href||""));if(maybeNodes)for(var i=0;i<maybeNodes.length;i++)if(currentResource=maybeNodes[i],currentResource.getAttribute("href")===(null==current.href||""===current.href?null:current.href)&&currentResource.getAttribute("rel")===(null==current.rel?null:current.rel)&&currentResource.getAttribute("title")===(null==current.title?null:current.title)&&currentResource.getAttribute("crossorigin")===(null==current.crossOrigin?null:current.crossOrigin)){maybeNodes.splice(i,1);break b;}currentResource=hoistableRoot.createElement(flags);setInitialProperties(currentResource,flags,current);hoistableRoot.head.appendChild(currentResource);break;case "meta":if(maybeNodes=getHydratableHoistableCache("meta","content",hoistableRoot).get(flags+(current.content||"")))for(i=0;i<maybeNodes.length;i++)if(currentResource=maybeNodes[i],currentResource.getAttribute("content")===(null==current.content?null:""+current.content)&&currentResource.getAttribute("name")===(null==current.name?null:current.name)&&currentResource.getAttribute("property")===(null==current.property?null:current.property)&&currentResource.getAttribute("http-equiv")===(null==current.httpEquiv?null:current.httpEquiv)&&currentResource.getAttribute("charset")===(null==current.charSet?null:current.charSet)){maybeNodes.splice(i,1);break b;}currentResource=hoistableRoot.createElement(flags);setInitialProperties(currentResource,flags,current);hoistableRoot.head.appendChild(currentResource);break;default:throw Error(formatProdErrorMessage(468,flags));}currentResource[internalInstanceKey]=finishedWork;markNodeAsHoistable(currentResource);flags=currentResource;}finishedWork.stateNode=flags;}else mountHoistable(hoistableRoot,finishedWork.type,finishedWork.stateNode);}else finishedWork.stateNode=acquireResource(hoistableRoot,flags,finishedWork.memoizedProps);}else currentResource!==flags?(null===currentResource?null!==current.stateNode&&(current=current.stateNode,current.parentNode.removeChild(current)):currentResource.count--,null===flags?mountHoistable(hoistableRoot,finishedWork.type,finishedWork.stateNode):acquireResource(hoistableRoot,flags,finishedWork.memoizedProps)):null===flags&&null!==finishedWork.stateNode&&commitHostUpdate(finishedWork,finishedWork.memoizedProps,current.memoizedProps);}break;case 27:recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);flags&512&&(offscreenSubtreeWasHidden||null===current||safelyDetachRef(current,current.return));null!==current&&flags&4&&commitHostUpdate(finishedWork,finishedWork.memoizedProps,current.memoizedProps);break;case 5:recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);flags&512&&(offscreenSubtreeWasHidden||null===current||safelyDetachRef(current,current.return));if(finishedWork.flags&32){hoistableRoot=finishedWork.stateNode;try{setTextContent(hoistableRoot,"");}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}flags&4&&null!=finishedWork.stateNode&&(hoistableRoot=finishedWork.memoizedProps,commitHostUpdate(finishedWork,hoistableRoot,null!==current?current.memoizedProps:hoistableRoot));flags&1024&&(needsFormReset=true);break;case 6:recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);if(flags&4){if(null===finishedWork.stateNode)throw Error(formatProdErrorMessage(162));flags=finishedWork.memoizedProps;current=finishedWork.stateNode;try{current.nodeValue=flags;}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}break;case 3:tagCaches=null;hoistableRoot=currentHoistableRoot;currentHoistableRoot=getHoistableRoot(root.containerInfo);recursivelyTraverseMutationEffects(root,finishedWork);currentHoistableRoot=hoistableRoot;commitReconciliationEffects(finishedWork);if(flags&4&&null!==current&&current.memoizedState.isDehydrated)try{retryIfBlockedOn(root.containerInfo);}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}needsFormReset&&(needsFormReset=false,recursivelyResetForms(finishedWork));break;case 4:flags=currentHoistableRoot;currentHoistableRoot=getHoistableRoot(finishedWork.stateNode.containerInfo);recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);currentHoistableRoot=flags;break;case 12:recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);break;case 13:recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);finishedWork.child.flags&8192&&null!==finishedWork.memoizedState!==(null!==current&&null!==current.memoizedState)&&(globalMostRecentFallbackTime=now());flags&4&&(flags=finishedWork.updateQueue,null!==flags&&(finishedWork.updateQueue=null,attachSuspenseRetryListeners(finishedWork,flags)));break;case 22:hoistableRoot=null!==finishedWork.memoizedState;var wasHidden=null!==current&&null!==current.memoizedState,prevOffscreenSubtreeIsHidden=offscreenSubtreeIsHidden,prevOffscreenSubtreeWasHidden=offscreenSubtreeWasHidden;offscreenSubtreeIsHidden=prevOffscreenSubtreeIsHidden||hoistableRoot;offscreenSubtreeWasHidden=prevOffscreenSubtreeWasHidden||wasHidden;recursivelyTraverseMutationEffects(root,finishedWork);offscreenSubtreeWasHidden=prevOffscreenSubtreeWasHidden;offscreenSubtreeIsHidden=prevOffscreenSubtreeIsHidden;commitReconciliationEffects(finishedWork);if(flags&8192)a:for(root=finishedWork.stateNode,root._visibility=hoistableRoot?root._visibility&-2:root._visibility|1,hoistableRoot&&(null===current||wasHidden||offscreenSubtreeIsHidden||offscreenSubtreeWasHidden||recursivelyTraverseDisappearLayoutEffects(finishedWork)),current=null,root=finishedWork;;){if(5===root.tag||26===root.tag){if(null===current){wasHidden=current=root;try{if(currentResource=wasHidden.stateNode,hoistableRoot)maybeNodes=currentResource.style,"function"===typeof maybeNodes.setProperty?maybeNodes.setProperty("display","none","important"):maybeNodes.display="none";else {i=wasHidden.stateNode;var styleProp=wasHidden.memoizedProps.style,display=void 0!==styleProp&&null!==styleProp&&styleProp.hasOwnProperty("display")?styleProp.display:null;i.style.display=null==display||"boolean"===typeof display?"":(""+display).trim();}}catch(error){captureCommitPhaseError(wasHidden,wasHidden.return,error);}}}else if(6===root.tag){if(null===current){wasHidden=root;try{wasHidden.stateNode.nodeValue=hoistableRoot?"":wasHidden.memoizedProps;}catch(error){captureCommitPhaseError(wasHidden,wasHidden.return,error);}}}else if((22!==root.tag&&23!==root.tag||null===root.memoizedState||root===finishedWork)&&null!==root.child){root.child.return=root;root=root.child;continue;}if(root===finishedWork)break a;for(;null===root.sibling;){if(null===root.return||root.return===finishedWork)break a;current===root&&(current=null);root=root.return;}current===root&&(current=null);root.sibling.return=root.return;root=root.sibling;}flags&4&&(flags=finishedWork.updateQueue,null!==flags&&(current=flags.retryQueue,null!==current&&(flags.retryQueue=null,attachSuspenseRetryListeners(finishedWork,current))));break;case 19:recursivelyTraverseMutationEffects(root,finishedWork);commitReconciliationEffects(finishedWork);flags&4&&(flags=finishedWork.updateQueue,null!==flags&&(finishedWork.updateQueue=null,attachSuspenseRetryListeners(finishedWork,flags)));break;case 30:break;case 21:break;default:recursivelyTraverseMutationEffects(root,finishedWork),commitReconciliationEffects(finishedWork);}}function commitReconciliationEffects(finishedWork){var flags=finishedWork.flags;if(flags&2){try{for(var hostParentFiber,parentFiber=finishedWork.return;null!==parentFiber;){if(isHostParent(parentFiber)){hostParentFiber=parentFiber;break;}parentFiber=parentFiber.return;}if(null==hostParentFiber)throw Error(formatProdErrorMessage(160));switch(hostParentFiber.tag){case 27:var parent=hostParentFiber.stateNode,before=getHostSibling(finishedWork);insertOrAppendPlacementNode(finishedWork,before,parent);break;case 5:var parent$144=hostParentFiber.stateNode;hostParentFiber.flags&32&&(setTextContent(parent$144,""),hostParentFiber.flags&=-33);var before$145=getHostSibling(finishedWork);insertOrAppendPlacementNode(finishedWork,before$145,parent$144);break;case 3:case 4:var parent$146=hostParentFiber.stateNode.containerInfo,before$147=getHostSibling(finishedWork);insertOrAppendPlacementNodeIntoContainer(finishedWork,before$147,parent$146);break;default:throw Error(formatProdErrorMessage(161));}}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}finishedWork.flags&=-3;}flags&4096&&(finishedWork.flags&=-4097);}function recursivelyResetForms(parentFiber){if(parentFiber.subtreeFlags&1024)for(parentFiber=parentFiber.child;null!==parentFiber;){var fiber=parentFiber;recursivelyResetForms(fiber);5===fiber.tag&&fiber.flags&1024&&fiber.stateNode.reset();parentFiber=parentFiber.sibling;}}function recursivelyTraverseLayoutEffects(root,parentFiber){if(parentFiber.subtreeFlags&8772)for(parentFiber=parentFiber.child;null!==parentFiber;)commitLayoutEffectOnFiber(root,parentFiber.alternate,parentFiber),parentFiber=parentFiber.sibling;}function recursivelyTraverseDisappearLayoutEffects(parentFiber){for(parentFiber=parentFiber.child;null!==parentFiber;){var finishedWork=parentFiber;switch(finishedWork.tag){case 0:case 11:case 14:case 15:commitHookEffectListUnmount(4,finishedWork,finishedWork.return);recursivelyTraverseDisappearLayoutEffects(finishedWork);break;case 1:safelyDetachRef(finishedWork,finishedWork.return);var instance=finishedWork.stateNode;"function"===typeof instance.componentWillUnmount&&safelyCallComponentWillUnmount(finishedWork,finishedWork.return,instance);recursivelyTraverseDisappearLayoutEffects(finishedWork);break;case 27:releaseSingletonInstance(finishedWork.stateNode);case 26:case 5:safelyDetachRef(finishedWork,finishedWork.return);recursivelyTraverseDisappearLayoutEffects(finishedWork);break;case 22:null===finishedWork.memoizedState&&recursivelyTraverseDisappearLayoutEffects(finishedWork);break;case 30:recursivelyTraverseDisappearLayoutEffects(finishedWork);break;default:recursivelyTraverseDisappearLayoutEffects(finishedWork);}parentFiber=parentFiber.sibling;}}function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0,parentFiber,includeWorkInProgressEffects){includeWorkInProgressEffects=includeWorkInProgressEffects&&0!==(parentFiber.subtreeFlags&8772);for(parentFiber=parentFiber.child;null!==parentFiber;){var current=parentFiber.alternate,finishedRoot=finishedRoot$jscomp$0,finishedWork=parentFiber,flags=finishedWork.flags;switch(finishedWork.tag){case 0:case 11:case 15:recursivelyTraverseReappearLayoutEffects(finishedRoot,finishedWork,includeWorkInProgressEffects);commitHookEffectListMount(4,finishedWork);break;case 1:recursivelyTraverseReappearLayoutEffects(finishedRoot,finishedWork,includeWorkInProgressEffects);current=finishedWork;finishedRoot=current.stateNode;if("function"===typeof finishedRoot.componentDidMount)try{finishedRoot.componentDidMount();}catch(error){captureCommitPhaseError(current,current.return,error);}current=finishedWork;finishedRoot=current.updateQueue;if(null!==finishedRoot){var instance=current.stateNode;try{var hiddenCallbacks=finishedRoot.shared.hiddenCallbacks;if(null!==hiddenCallbacks)for(finishedRoot.shared.hiddenCallbacks=null,finishedRoot=0;finishedRoot<hiddenCallbacks.length;finishedRoot++)callCallback(hiddenCallbacks[finishedRoot],instance);}catch(error){captureCommitPhaseError(current,current.return,error);}}includeWorkInProgressEffects&&flags&64&&commitClassCallbacks(finishedWork);safelyAttachRef(finishedWork,finishedWork.return);break;case 27:commitHostSingletonAcquisition(finishedWork);case 26:case 5:recursivelyTraverseReappearLayoutEffects(finishedRoot,finishedWork,includeWorkInProgressEffects);includeWorkInProgressEffects&&null===current&&flags&4&&commitHostMount(finishedWork);safelyAttachRef(finishedWork,finishedWork.return);break;case 12:recursivelyTraverseReappearLayoutEffects(finishedRoot,finishedWork,includeWorkInProgressEffects);break;case 13:recursivelyTraverseReappearLayoutEffects(finishedRoot,finishedWork,includeWorkInProgressEffects);includeWorkInProgressEffects&&flags&4&&commitSuspenseHydrationCallbacks(finishedRoot,finishedWork);break;case 22:null===finishedWork.memoizedState&&recursivelyTraverseReappearLayoutEffects(finishedRoot,finishedWork,includeWorkInProgressEffects);safelyAttachRef(finishedWork,finishedWork.return);break;case 30:break;default:recursivelyTraverseReappearLayoutEffects(finishedRoot,finishedWork,includeWorkInProgressEffects);}parentFiber=parentFiber.sibling;}}function commitOffscreenPassiveMountEffects(current,finishedWork){var previousCache=null;null!==current&&null!==current.memoizedState&&null!==current.memoizedState.cachePool&&(previousCache=current.memoizedState.cachePool.pool);current=null;null!==finishedWork.memoizedState&&null!==finishedWork.memoizedState.cachePool&&(current=finishedWork.memoizedState.cachePool.pool);current!==previousCache&&(null!=current&&current.refCount++,null!=previousCache&&releaseCache(previousCache));}function commitCachePassiveMountEffect(current,finishedWork){current=null;null!==finishedWork.alternate&&(current=finishedWork.alternate.memoizedState.cache);finishedWork=finishedWork.memoizedState.cache;finishedWork!==current&&(finishedWork.refCount++,null!=current&&releaseCache(current));}function recursivelyTraversePassiveMountEffects(root,parentFiber,committedLanes,committedTransitions){if(parentFiber.subtreeFlags&10256)for(parentFiber=parentFiber.child;null!==parentFiber;)commitPassiveMountOnFiber(root,parentFiber,committedLanes,committedTransitions),parentFiber=parentFiber.sibling;}function commitPassiveMountOnFiber(finishedRoot,finishedWork,committedLanes,committedTransitions){var flags=finishedWork.flags;switch(finishedWork.tag){case 0:case 11:case 15:recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions);flags&2048&&commitHookEffectListMount(9,finishedWork);break;case 1:recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions);break;case 3:recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions);flags&2048&&(finishedRoot=null,null!==finishedWork.alternate&&(finishedRoot=finishedWork.alternate.memoizedState.cache),finishedWork=finishedWork.memoizedState.cache,finishedWork!==finishedRoot&&(finishedWork.refCount++,null!=finishedRoot&&releaseCache(finishedRoot)));break;case 12:if(flags&2048){recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions);finishedRoot=finishedWork.stateNode;try{var _finishedWork$memoize2=finishedWork.memoizedProps,id=_finishedWork$memoize2.id,onPostCommit=_finishedWork$memoize2.onPostCommit;"function"===typeof onPostCommit&&onPostCommit(id,null===finishedWork.alternate?"mount":"update",finishedRoot.passiveEffectDuration,-0);}catch(error){captureCommitPhaseError(finishedWork,finishedWork.return,error);}}else recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions);break;case 13:recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions);break;case 23:break;case 22:_finishedWork$memoize2=finishedWork.stateNode;id=finishedWork.alternate;null!==finishedWork.memoizedState?_finishedWork$memoize2._visibility&2?recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions):recursivelyTraverseAtomicPassiveEffects(finishedRoot,finishedWork):_finishedWork$memoize2._visibility&2?recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions):(_finishedWork$memoize2._visibility|=2,recursivelyTraverseReconnectPassiveEffects(finishedRoot,finishedWork,committedLanes,committedTransitions,0!==(finishedWork.subtreeFlags&10256)));flags&2048&&commitOffscreenPassiveMountEffects(id,finishedWork);break;case 24:recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions);flags&2048&&commitCachePassiveMountEffect(finishedWork.alternate,finishedWork);break;default:recursivelyTraversePassiveMountEffects(finishedRoot,finishedWork,committedLanes,committedTransitions);}}function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0,parentFiber,committedLanes$jscomp$0,committedTransitions$jscomp$0,includeWorkInProgressEffects){includeWorkInProgressEffects=includeWorkInProgressEffects&&0!==(parentFiber.subtreeFlags&10256);for(parentFiber=parentFiber.child;null!==parentFiber;){var finishedRoot=finishedRoot$jscomp$0,finishedWork=parentFiber,committedLanes=committedLanes$jscomp$0,committedTransitions=committedTransitions$jscomp$0,flags=finishedWork.flags;switch(finishedWork.tag){case 0:case 11:case 15:recursivelyTraverseReconnectPassiveEffects(finishedRoot,finishedWork,committedLanes,committedTransitions,includeWorkInProgressEffects);commitHookEffectListMount(8,finishedWork);break;case 23:break;case 22:var instance=finishedWork.stateNode;null!==finishedWork.memoizedState?instance._visibility&2?recursivelyTraverseReconnectPassiveEffects(finishedRoot,finishedWork,committedLanes,committedTransitions,includeWorkInProgressEffects):recursivelyTraverseAtomicPassiveEffects(finishedRoot,finishedWork):(instance._visibility|=2,recursivelyTraverseReconnectPassiveEffects(finishedRoot,finishedWork,committedLanes,committedTransitions,includeWorkInProgressEffects));includeWorkInProgressEffects&&flags&2048&&commitOffscreenPassiveMountEffects(finishedWork.alternate,finishedWork);break;case 24:recursivelyTraverseReconnectPassiveEffects(finishedRoot,finishedWork,committedLanes,committedTransitions,includeWorkInProgressEffects);includeWorkInProgressEffects&&flags&2048&&commitCachePassiveMountEffect(finishedWork.alternate,finishedWork);break;default:recursivelyTraverseReconnectPassiveEffects(finishedRoot,finishedWork,committedLanes,committedTransitions,includeWorkInProgressEffects);}parentFiber=parentFiber.sibling;}}function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0,parentFiber){if(parentFiber.subtreeFlags&10256)for(parentFiber=parentFiber.child;null!==parentFiber;){var finishedRoot=finishedRoot$jscomp$0,finishedWork=parentFiber,flags=finishedWork.flags;switch(finishedWork.tag){case 22:recursivelyTraverseAtomicPassiveEffects(finishedRoot,finishedWork);flags&2048&&commitOffscreenPassiveMountEffects(finishedWork.alternate,finishedWork);break;case 24:recursivelyTraverseAtomicPassiveEffects(finishedRoot,finishedWork);flags&2048&&commitCachePassiveMountEffect(finishedWork.alternate,finishedWork);break;default:recursivelyTraverseAtomicPassiveEffects(finishedRoot,finishedWork);}parentFiber=parentFiber.sibling;}}var suspenseyCommitFlag=8192;function recursivelyAccumulateSuspenseyCommit(parentFiber){if(parentFiber.subtreeFlags&suspenseyCommitFlag)for(parentFiber=parentFiber.child;null!==parentFiber;)accumulateSuspenseyCommitOnFiber(parentFiber),parentFiber=parentFiber.sibling;}function accumulateSuspenseyCommitOnFiber(fiber){switch(fiber.tag){case 26:recursivelyAccumulateSuspenseyCommit(fiber);fiber.flags&suspenseyCommitFlag&&null!==fiber.memoizedState&&suspendResource(currentHoistableRoot,fiber.memoizedState,fiber.memoizedProps);break;case 5:recursivelyAccumulateSuspenseyCommit(fiber);break;case 3:case 4:var previousHoistableRoot=currentHoistableRoot;currentHoistableRoot=getHoistableRoot(fiber.stateNode.containerInfo);recursivelyAccumulateSuspenseyCommit(fiber);currentHoistableRoot=previousHoistableRoot;break;case 22:null===fiber.memoizedState&&(previousHoistableRoot=fiber.alternate,null!==previousHoistableRoot&&null!==previousHoistableRoot.memoizedState?(previousHoistableRoot=suspenseyCommitFlag,suspenseyCommitFlag=16777216,recursivelyAccumulateSuspenseyCommit(fiber),suspenseyCommitFlag=previousHoistableRoot):recursivelyAccumulateSuspenseyCommit(fiber));break;default:recursivelyAccumulateSuspenseyCommit(fiber);}}function detachAlternateSiblings(parentFiber){var previousFiber=parentFiber.alternate;if(null!==previousFiber&&(parentFiber=previousFiber.child,null!==parentFiber)){previousFiber.child=null;do previousFiber=parentFiber.sibling,parentFiber.sibling=null,parentFiber=previousFiber;while(null!==parentFiber);}}function recursivelyTraversePassiveUnmountEffects(parentFiber){var deletions=parentFiber.deletions;if(0!==(parentFiber.flags&16)){if(null!==deletions)for(var i=0;i<deletions.length;i++){var childToDelete=deletions[i];nextEffect=childToDelete;commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete,parentFiber);}detachAlternateSiblings(parentFiber);}if(parentFiber.subtreeFlags&10256)for(parentFiber=parentFiber.child;null!==parentFiber;)commitPassiveUnmountOnFiber(parentFiber),parentFiber=parentFiber.sibling;}function commitPassiveUnmountOnFiber(finishedWork){switch(finishedWork.tag){case 0:case 11:case 15:recursivelyTraversePassiveUnmountEffects(finishedWork);finishedWork.flags&2048&&commitHookEffectListUnmount(9,finishedWork,finishedWork.return);break;case 3:recursivelyTraversePassiveUnmountEffects(finishedWork);break;case 12:recursivelyTraversePassiveUnmountEffects(finishedWork);break;case 22:var instance=finishedWork.stateNode;null!==finishedWork.memoizedState&&instance._visibility&2&&(null===finishedWork.return||13!==finishedWork.return.tag)?(instance._visibility&=-3,recursivelyTraverseDisconnectPassiveEffects(finishedWork)):recursivelyTraversePassiveUnmountEffects(finishedWork);break;default:recursivelyTraversePassiveUnmountEffects(finishedWork);}}function recursivelyTraverseDisconnectPassiveEffects(parentFiber){var deletions=parentFiber.deletions;if(0!==(parentFiber.flags&16)){if(null!==deletions)for(var i=0;i<deletions.length;i++){var childToDelete=deletions[i];nextEffect=childToDelete;commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete,parentFiber);}detachAlternateSiblings(parentFiber);}for(parentFiber=parentFiber.child;null!==parentFiber;){deletions=parentFiber;switch(deletions.tag){case 0:case 11:case 15:commitHookEffectListUnmount(8,deletions,deletions.return);recursivelyTraverseDisconnectPassiveEffects(deletions);break;case 22:i=deletions.stateNode;i._visibility&2&&(i._visibility&=-3,recursivelyTraverseDisconnectPassiveEffects(deletions));break;default:recursivelyTraverseDisconnectPassiveEffects(deletions);}parentFiber=parentFiber.sibling;}}function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot,nearestMountedAncestor){for(;null!==nextEffect;){var fiber=nextEffect;switch(fiber.tag){case 0:case 11:case 15:commitHookEffectListUnmount(8,fiber,nearestMountedAncestor);break;case 23:case 22:if(null!==fiber.memoizedState&&null!==fiber.memoizedState.cachePool){var cache=fiber.memoizedState.cachePool.pool;null!=cache&&cache.refCount++;}break;case 24:releaseCache(fiber.memoizedState.cache);}cache=fiber.child;if(null!==cache)cache.return=fiber,nextEffect=cache;else a:for(fiber=deletedSubtreeRoot;null!==nextEffect;){cache=nextEffect;var sibling=cache.sibling,returnFiber=cache.return;detachFiberAfterEffects(cache);if(cache===fiber){nextEffect=null;break a;}if(null!==sibling){sibling.return=returnFiber;nextEffect=sibling;break a;}nextEffect=returnFiber;}}}var DefaultAsyncDispatcher={getCacheForType:function(resourceType){var cache=readContext(CacheContext),cacheForType=cache.data.get(resourceType);void 0===cacheForType&&(cacheForType=resourceType(),cache.data.set(resourceType,cacheForType));return cacheForType;}},PossiblyWeakMap="function"===typeof WeakMap?WeakMap:Map,executionContext=0,workInProgressRoot=null,workInProgress=null,workInProgressRootRenderLanes=0,workInProgressSuspendedReason=0,workInProgressThrownValue=null,workInProgressRootDidSkipSuspendedSiblings=false,workInProgressRootIsPrerendering=false,workInProgressRootDidAttachPingListener=false,entangledRenderLanes=0,workInProgressRootExitStatus=0,workInProgressRootSkippedLanes=0,workInProgressRootInterleavedUpdatedLanes=0,workInProgressRootPingedLanes=0,workInProgressDeferredLane=0,workInProgressSuspendedRetryLanes=0,workInProgressRootConcurrentErrors=null,workInProgressRootRecoverableErrors=null,workInProgressRootDidIncludeRecursiveRenderUpdate=false,globalMostRecentFallbackTime=0,workInProgressRootRenderTargetTime=Infinity,workInProgressTransitions=null,legacyErrorBoundariesThatAlreadyFailed=null,pendingEffectsStatus=0,pendingEffectsRoot=null,pendingFinishedWork=null,pendingEffectsLanes=0,pendingEffectsRemainingLanes=0,pendingPassiveTransitions=null,pendingRecoverableErrors=null,nestedUpdateCount=0,rootWithNestedUpdates=null;function requestUpdateLane(){if(0!==(executionContext&2)&&0!==workInProgressRootRenderLanes)return workInProgressRootRenderLanes&-workInProgressRootRenderLanes;if(null!==ReactSharedInternals.T){var actionScopeLane=currentEntangledLane;return 0!==actionScopeLane?actionScopeLane:requestTransitionLane();}return resolveUpdatePriority();}function requestDeferredLane(){0===workInProgressDeferredLane&&(workInProgressDeferredLane=0===(workInProgressRootRenderLanes&536870912)||isHydrating?claimNextTransitionLane():536870912);var suspenseHandler=suspenseHandlerStackCursor.current;null!==suspenseHandler&&(suspenseHandler.flags|=32);return workInProgressDeferredLane;}function scheduleUpdateOnFiber(root,fiber,lane){if(root===workInProgressRoot&&(2===workInProgressSuspendedReason||9===workInProgressSuspendedReason)||null!==root.cancelPendingCommit)prepareFreshStack(root,0),markRootSuspended(root,workInProgressRootRenderLanes,workInProgressDeferredLane,false);markRootUpdated$1(root,lane);if(0===(executionContext&2)||root!==workInProgressRoot)root===workInProgressRoot&&(0===(executionContext&2)&&(workInProgressRootInterleavedUpdatedLanes|=lane),4===workInProgressRootExitStatus&&markRootSuspended(root,workInProgressRootRenderLanes,workInProgressDeferredLane,false)),ensureRootIsScheduled(root);}function performWorkOnRoot(root$jscomp$0,lanes,forceSync){if(0!==(executionContext&6))throw Error(formatProdErrorMessage(327));var shouldTimeSlice=!forceSync&&0===(lanes&124)&&0===(lanes&root$jscomp$0.expiredLanes)||checkIfRootIsPrerendering(root$jscomp$0,lanes),exitStatus=shouldTimeSlice?renderRootConcurrent(root$jscomp$0,lanes):renderRootSync(root$jscomp$0,lanes,true),renderWasConcurrent=shouldTimeSlice;do{if(0===exitStatus){workInProgressRootIsPrerendering&&!shouldTimeSlice&&markRootSuspended(root$jscomp$0,lanes,0,false);break;}else {forceSync=root$jscomp$0.current.alternate;if(renderWasConcurrent&&!isRenderConsistentWithExternalStores(forceSync)){exitStatus=renderRootSync(root$jscomp$0,lanes,false);renderWasConcurrent=false;continue;}if(2===exitStatus){renderWasConcurrent=lanes;if(root$jscomp$0.errorRecoveryDisabledLanes&renderWasConcurrent)var JSCompiler_inline_result=0;else JSCompiler_inline_result=root$jscomp$0.pendingLanes&-536870913,JSCompiler_inline_result=0!==JSCompiler_inline_result?JSCompiler_inline_result:JSCompiler_inline_result&536870912?536870912:0;if(0!==JSCompiler_inline_result){lanes=JSCompiler_inline_result;a:{var root=root$jscomp$0;exitStatus=workInProgressRootConcurrentErrors;var wasRootDehydrated=root.current.memoizedState.isDehydrated;wasRootDehydrated&&(prepareFreshStack(root,JSCompiler_inline_result).flags|=256);JSCompiler_inline_result=renderRootSync(root,JSCompiler_inline_result,false);if(2!==JSCompiler_inline_result){if(workInProgressRootDidAttachPingListener&&!wasRootDehydrated){root.errorRecoveryDisabledLanes|=renderWasConcurrent;workInProgressRootInterleavedUpdatedLanes|=renderWasConcurrent;exitStatus=4;break a;}renderWasConcurrent=workInProgressRootRecoverableErrors;workInProgressRootRecoverableErrors=exitStatus;null!==renderWasConcurrent&&(null===workInProgressRootRecoverableErrors?workInProgressRootRecoverableErrors=renderWasConcurrent:workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors,renderWasConcurrent));}exitStatus=JSCompiler_inline_result;}renderWasConcurrent=false;if(2!==exitStatus)continue;}}if(1===exitStatus){prepareFreshStack(root$jscomp$0,0);markRootSuspended(root$jscomp$0,lanes,0,true);break;}a:{shouldTimeSlice=root$jscomp$0;renderWasConcurrent=exitStatus;switch(renderWasConcurrent){case 0:case 1:throw Error(formatProdErrorMessage(345));case 4:if((lanes&4194048)!==lanes)break;case 6:markRootSuspended(shouldTimeSlice,lanes,workInProgressDeferredLane,!workInProgressRootDidSkipSuspendedSiblings);break a;case 2:workInProgressRootRecoverableErrors=null;break;case 3:case 5:break;default:throw Error(formatProdErrorMessage(329));}if((lanes&62914560)===lanes&&(exitStatus=globalMostRecentFallbackTime+300-now(),10<exitStatus)){markRootSuspended(shouldTimeSlice,lanes,workInProgressDeferredLane,!workInProgressRootDidSkipSuspendedSiblings);if(0!==getNextLanes(shouldTimeSlice,0,true))break a;shouldTimeSlice.timeoutHandle=scheduleTimeout(commitRootWhenReady.bind(null,shouldTimeSlice,forceSync,workInProgressRootRecoverableErrors,workInProgressTransitions,workInProgressRootDidIncludeRecursiveRenderUpdate,lanes,workInProgressDeferredLane,workInProgressRootInterleavedUpdatedLanes,workInProgressSuspendedRetryLanes,workInProgressRootDidSkipSuspendedSiblings,renderWasConcurrent,2,-0,0),exitStatus);break a;}commitRootWhenReady(shouldTimeSlice,forceSync,workInProgressRootRecoverableErrors,workInProgressTransitions,workInProgressRootDidIncludeRecursiveRenderUpdate,lanes,workInProgressDeferredLane,workInProgressRootInterleavedUpdatedLanes,workInProgressSuspendedRetryLanes,workInProgressRootDidSkipSuspendedSiblings,renderWasConcurrent,0,-0,0);}}break;}while(1);ensureRootIsScheduled(root$jscomp$0);}function commitRootWhenReady(root,finishedWork,recoverableErrors,transitions,didIncludeRenderPhaseUpdate,lanes,spawnedLane,updatedLanes,suspendedRetryLanes,didSkipSuspendedSiblings,exitStatus,suspendedCommitReason,completedRenderStartTime,completedRenderEndTime){root.timeoutHandle=-1;suspendedCommitReason=finishedWork.subtreeFlags;if(suspendedCommitReason&8192||16785408===(suspendedCommitReason&16785408))if(suspendedState={stylesheets:null,count:0,unsuspend:noop},accumulateSuspenseyCommitOnFiber(finishedWork),suspendedCommitReason=waitForCommitToBeReady(),null!==suspendedCommitReason){root.cancelPendingCommit=suspendedCommitReason(commitRoot.bind(null,root,finishedWork,lanes,recoverableErrors,transitions,didIncludeRenderPhaseUpdate,spawnedLane,updatedLanes,suspendedRetryLanes,exitStatus,1,completedRenderStartTime,completedRenderEndTime));markRootSuspended(root,lanes,spawnedLane,!didSkipSuspendedSiblings);return;}commitRoot(root,finishedWork,lanes,recoverableErrors,transitions,didIncludeRenderPhaseUpdate,spawnedLane,updatedLanes,suspendedRetryLanes);}function isRenderConsistentWithExternalStores(finishedWork){for(var node=finishedWork;;){var tag=node.tag;if((0===tag||11===tag||15===tag)&&node.flags&16384&&(tag=node.updateQueue,null!==tag&&(tag=tag.stores,null!==tag)))for(var i=0;i<tag.length;i++){var check=tag[i],getSnapshot=check.getSnapshot;check=check.value;try{if(!objectIs(getSnapshot(),check))return !1;}catch(error){return  false;}}tag=node.child;if(node.subtreeFlags&16384&&null!==tag)tag.return=node,node=tag;else {if(node===finishedWork)break;for(;null===node.sibling;){if(null===node.return||node.return===finishedWork)return  true;node=node.return;}node.sibling.return=node.return;node=node.sibling;}}return  true;}function markRootSuspended(root,suspendedLanes,spawnedLane,didAttemptEntireTree){suspendedLanes&=~workInProgressRootPingedLanes;suspendedLanes&=~workInProgressRootInterleavedUpdatedLanes;root.suspendedLanes|=suspendedLanes;root.pingedLanes&=~suspendedLanes;didAttemptEntireTree&&(root.warmLanes|=suspendedLanes);didAttemptEntireTree=root.expirationTimes;for(var lanes=suspendedLanes;0<lanes;){var index$4=31-clz32(lanes),lane=1<<index$4;didAttemptEntireTree[index$4]=-1;lanes&=~lane;}0!==spawnedLane&&markSpawnedDeferredLane(root,spawnedLane,suspendedLanes);}function flushSyncWork$1(){return 0===(executionContext&6)?(flushSyncWorkAcrossRoots_impl(0),false):true;}function resetWorkInProgressStack(){if(null!==workInProgress){if(0===workInProgressSuspendedReason)var interruptedWork=workInProgress.return;else interruptedWork=workInProgress,lastContextDependency=currentlyRenderingFiber$1=null,resetHooksOnUnwind(interruptedWork),thenableState=null,thenableIndexCounter=0,interruptedWork=workInProgress;for(;null!==interruptedWork;)unwindInterruptedWork(interruptedWork.alternate,interruptedWork),interruptedWork=interruptedWork.return;workInProgress=null;}}function prepareFreshStack(root,lanes){var timeoutHandle=root.timeoutHandle;-1!==timeoutHandle&&(root.timeoutHandle=-1,cancelTimeout(timeoutHandle));timeoutHandle=root.cancelPendingCommit;null!==timeoutHandle&&(root.cancelPendingCommit=null,timeoutHandle());resetWorkInProgressStack();workInProgressRoot=root;workInProgress=timeoutHandle=createWorkInProgress(root.current,null);workInProgressRootRenderLanes=lanes;workInProgressSuspendedReason=0;workInProgressThrownValue=null;workInProgressRootDidSkipSuspendedSiblings=false;workInProgressRootIsPrerendering=checkIfRootIsPrerendering(root,lanes);workInProgressRootDidAttachPingListener=false;workInProgressSuspendedRetryLanes=workInProgressDeferredLane=workInProgressRootPingedLanes=workInProgressRootInterleavedUpdatedLanes=workInProgressRootSkippedLanes=workInProgressRootExitStatus=0;workInProgressRootRecoverableErrors=workInProgressRootConcurrentErrors=null;workInProgressRootDidIncludeRecursiveRenderUpdate=false;0!==(lanes&8)&&(lanes|=lanes&32);var allEntangledLanes=root.entangledLanes;if(0!==allEntangledLanes)for(root=root.entanglements,allEntangledLanes&=lanes;0<allEntangledLanes;){var index$2=31-clz32(allEntangledLanes),lane=1<<index$2;lanes|=root[index$2];allEntangledLanes&=~lane;}entangledRenderLanes=lanes;finishQueueingConcurrentUpdates();return timeoutHandle;}function handleThrow(root,thrownValue){currentlyRenderingFiber=null;ReactSharedInternals.H=ContextOnlyDispatcher;thrownValue===SuspenseException||thrownValue===SuspenseActionException?(thrownValue=getSuspendedThenable(),workInProgressSuspendedReason=3):thrownValue===SuspenseyCommitException?(thrownValue=getSuspendedThenable(),workInProgressSuspendedReason=4):workInProgressSuspendedReason=thrownValue===SelectiveHydrationException?8:null!==thrownValue&&"object"===typeof thrownValue&&"function"===typeof thrownValue.then?6:1;workInProgressThrownValue=thrownValue;null===workInProgress&&(workInProgressRootExitStatus=1,logUncaughtError(root,createCapturedValueAtFiber(thrownValue,root.current)));}function pushDispatcher(){var prevDispatcher=ReactSharedInternals.H;ReactSharedInternals.H=ContextOnlyDispatcher;return null===prevDispatcher?ContextOnlyDispatcher:prevDispatcher;}function pushAsyncDispatcher(){var prevAsyncDispatcher=ReactSharedInternals.A;ReactSharedInternals.A=DefaultAsyncDispatcher;return prevAsyncDispatcher;}function renderDidSuspendDelayIfPossible(){workInProgressRootExitStatus=4;workInProgressRootDidSkipSuspendedSiblings||(workInProgressRootRenderLanes&4194048)!==workInProgressRootRenderLanes&&null!==suspenseHandlerStackCursor.current||(workInProgressRootIsPrerendering=true);0===(workInProgressRootSkippedLanes&134217727)&&0===(workInProgressRootInterleavedUpdatedLanes&134217727)||null===workInProgressRoot||markRootSuspended(workInProgressRoot,workInProgressRootRenderLanes,workInProgressDeferredLane,false);}function renderRootSync(root,lanes,shouldYieldForPrerendering){var prevExecutionContext=executionContext;executionContext|=2;var prevDispatcher=pushDispatcher(),prevAsyncDispatcher=pushAsyncDispatcher();if(workInProgressRoot!==root||workInProgressRootRenderLanes!==lanes)workInProgressTransitions=null,prepareFreshStack(root,lanes);lanes=false;var exitStatus=workInProgressRootExitStatus;a:do try{if(0!==workInProgressSuspendedReason&&null!==workInProgress){var unitOfWork=workInProgress,thrownValue=workInProgressThrownValue;switch(workInProgressSuspendedReason){case 8:resetWorkInProgressStack();exitStatus=6;break a;case 3:case 2:case 9:case 6:null===suspenseHandlerStackCursor.current&&(lanes=!0);var reason=workInProgressSuspendedReason;workInProgressSuspendedReason=0;workInProgressThrownValue=null;throwAndUnwindWorkLoop(root,unitOfWork,thrownValue,reason);if(shouldYieldForPrerendering&&workInProgressRootIsPrerendering){exitStatus=0;break a;}break;default:reason=workInProgressSuspendedReason,workInProgressSuspendedReason=0,workInProgressThrownValue=null,throwAndUnwindWorkLoop(root,unitOfWork,thrownValue,reason);}}workLoopSync();exitStatus=workInProgressRootExitStatus;break;}catch(thrownValue$167){handleThrow(root,thrownValue$167);}while(1);lanes&&root.shellSuspendCounter++;lastContextDependency=currentlyRenderingFiber$1=null;executionContext=prevExecutionContext;ReactSharedInternals.H=prevDispatcher;ReactSharedInternals.A=prevAsyncDispatcher;null===workInProgress&&(workInProgressRoot=null,workInProgressRootRenderLanes=0,finishQueueingConcurrentUpdates());return exitStatus;}function workLoopSync(){for(;null!==workInProgress;)performUnitOfWork(workInProgress);}function renderRootConcurrent(root,lanes){var prevExecutionContext=executionContext;executionContext|=2;var prevDispatcher=pushDispatcher(),prevAsyncDispatcher=pushAsyncDispatcher();workInProgressRoot!==root||workInProgressRootRenderLanes!==lanes?(workInProgressTransitions=null,workInProgressRootRenderTargetTime=now()+500,prepareFreshStack(root,lanes)):workInProgressRootIsPrerendering=checkIfRootIsPrerendering(root,lanes);a:do try{if(0!==workInProgressSuspendedReason&&null!==workInProgress){lanes=workInProgress;var thrownValue=workInProgressThrownValue;b:switch(workInProgressSuspendedReason){case 1:workInProgressSuspendedReason=0;workInProgressThrownValue=null;throwAndUnwindWorkLoop(root,lanes,thrownValue,1);break;case 2:case 9:if(isThenableResolved(thrownValue)){workInProgressSuspendedReason=0;workInProgressThrownValue=null;replaySuspendedUnitOfWork(lanes);break;}lanes=function(){2!==workInProgressSuspendedReason&&9!==workInProgressSuspendedReason||workInProgressRoot!==root||(workInProgressSuspendedReason=7);ensureRootIsScheduled(root);};thrownValue.then(lanes,lanes);break a;case 3:workInProgressSuspendedReason=7;break a;case 4:workInProgressSuspendedReason=5;break a;case 7:isThenableResolved(thrownValue)?(workInProgressSuspendedReason=0,workInProgressThrownValue=null,replaySuspendedUnitOfWork(lanes)):(workInProgressSuspendedReason=0,workInProgressThrownValue=null,throwAndUnwindWorkLoop(root,lanes,thrownValue,7));break;case 5:var resource=null;switch(workInProgress.tag){case 26:resource=workInProgress.memoizedState;case 5:case 27:var hostFiber=workInProgress;if(resource?preloadResource(resource):1){workInProgressSuspendedReason=0;workInProgressThrownValue=null;var sibling=hostFiber.sibling;if(null!==sibling)workInProgress=sibling;else {var returnFiber=hostFiber.return;null!==returnFiber?(workInProgress=returnFiber,completeUnitOfWork(returnFiber)):workInProgress=null;}break b;}}workInProgressSuspendedReason=0;workInProgressThrownValue=null;throwAndUnwindWorkLoop(root,lanes,thrownValue,5);break;case 6:workInProgressSuspendedReason=0;workInProgressThrownValue=null;throwAndUnwindWorkLoop(root,lanes,thrownValue,6);break;case 8:resetWorkInProgressStack();workInProgressRootExitStatus=6;break a;default:throw Error(formatProdErrorMessage(462));}}workLoopConcurrentByScheduler();break;}catch(thrownValue$169){handleThrow(root,thrownValue$169);}while(1);lastContextDependency=currentlyRenderingFiber$1=null;ReactSharedInternals.H=prevDispatcher;ReactSharedInternals.A=prevAsyncDispatcher;executionContext=prevExecutionContext;if(null!==workInProgress)return 0;workInProgressRoot=null;workInProgressRootRenderLanes=0;finishQueueingConcurrentUpdates();return workInProgressRootExitStatus;}function workLoopConcurrentByScheduler(){for(;null!==workInProgress&&!shouldYield();)performUnitOfWork(workInProgress);}function performUnitOfWork(unitOfWork){var next=beginWork(unitOfWork.alternate,unitOfWork,entangledRenderLanes);unitOfWork.memoizedProps=unitOfWork.pendingProps;null===next?completeUnitOfWork(unitOfWork):workInProgress=next;}function replaySuspendedUnitOfWork(unitOfWork){var next=unitOfWork;var current=next.alternate;switch(next.tag){case 15:case 0:next=replayFunctionComponent(current,next,next.pendingProps,next.type,void 0,workInProgressRootRenderLanes);break;case 11:next=replayFunctionComponent(current,next,next.pendingProps,next.type.render,next.ref,workInProgressRootRenderLanes);break;case 5:resetHooksOnUnwind(next);default:unwindInterruptedWork(current,next),next=workInProgress=resetWorkInProgress(next,entangledRenderLanes),next=beginWork(current,next,entangledRenderLanes);}unitOfWork.memoizedProps=unitOfWork.pendingProps;null===next?completeUnitOfWork(unitOfWork):workInProgress=next;}function throwAndUnwindWorkLoop(root,unitOfWork,thrownValue,suspendedReason){lastContextDependency=currentlyRenderingFiber$1=null;resetHooksOnUnwind(unitOfWork);thenableState=null;thenableIndexCounter=0;var returnFiber=unitOfWork.return;try{if(throwException(root,returnFiber,unitOfWork,thrownValue,workInProgressRootRenderLanes)){workInProgressRootExitStatus=1;logUncaughtError(root,createCapturedValueAtFiber(thrownValue,root.current));workInProgress=null;return;}}catch(error){if(null!==returnFiber)throw workInProgress=returnFiber,error;workInProgressRootExitStatus=1;logUncaughtError(root,createCapturedValueAtFiber(thrownValue,root.current));workInProgress=null;return;}if(unitOfWork.flags&32768){if(isHydrating||1===suspendedReason)root=true;else if(workInProgressRootIsPrerendering||0!==(workInProgressRootRenderLanes&536870912))root=false;else if(workInProgressRootDidSkipSuspendedSiblings=root=true,2===suspendedReason||9===suspendedReason||3===suspendedReason||6===suspendedReason)suspendedReason=suspenseHandlerStackCursor.current,null!==suspendedReason&&13===suspendedReason.tag&&(suspendedReason.flags|=16384);unwindUnitOfWork(unitOfWork,root);}else completeUnitOfWork(unitOfWork);}function completeUnitOfWork(unitOfWork){var completedWork=unitOfWork;do{if(0!==(completedWork.flags&32768)){unwindUnitOfWork(completedWork,workInProgressRootDidSkipSuspendedSiblings);return;}unitOfWork=completedWork.return;var next=completeWork(completedWork.alternate,completedWork,entangledRenderLanes);if(null!==next){workInProgress=next;return;}completedWork=completedWork.sibling;if(null!==completedWork){workInProgress=completedWork;return;}workInProgress=completedWork=unitOfWork;}while(null!==completedWork);0===workInProgressRootExitStatus&&(workInProgressRootExitStatus=5);}function unwindUnitOfWork(unitOfWork,skipSiblings){do{var next=unwindWork(unitOfWork.alternate,unitOfWork);if(null!==next){next.flags&=32767;workInProgress=next;return;}next=unitOfWork.return;null!==next&&(next.flags|=32768,next.subtreeFlags=0,next.deletions=null);if(!skipSiblings&&(unitOfWork=unitOfWork.sibling,null!==unitOfWork)){workInProgress=unitOfWork;return;}workInProgress=unitOfWork=next;}while(null!==unitOfWork);workInProgressRootExitStatus=6;workInProgress=null;}function commitRoot(root,finishedWork,lanes,recoverableErrors,transitions,didIncludeRenderPhaseUpdate,spawnedLane,updatedLanes,suspendedRetryLanes){root.cancelPendingCommit=null;do flushPendingEffects();while(0!==pendingEffectsStatus);if(0!==(executionContext&6))throw Error(formatProdErrorMessage(327));if(null!==finishedWork){if(finishedWork===root.current)throw Error(formatProdErrorMessage(177));didIncludeRenderPhaseUpdate=finishedWork.lanes|finishedWork.childLanes;didIncludeRenderPhaseUpdate|=concurrentlyUpdatedLanes;markRootFinished(root,lanes,didIncludeRenderPhaseUpdate,spawnedLane,updatedLanes,suspendedRetryLanes);root===workInProgressRoot&&(workInProgress=workInProgressRoot=null,workInProgressRootRenderLanes=0);pendingFinishedWork=finishedWork;pendingEffectsRoot=root;pendingEffectsLanes=lanes;pendingEffectsRemainingLanes=didIncludeRenderPhaseUpdate;pendingPassiveTransitions=transitions;pendingRecoverableErrors=recoverableErrors;0!==(finishedWork.subtreeFlags&10256)||0!==(finishedWork.flags&10256)?(root.callbackNode=null,root.callbackPriority=0,scheduleCallback$1(NormalPriority$1,function(){flushPassiveEffects();return null;})):(root.callbackNode=null,root.callbackPriority=0);recoverableErrors=0!==(finishedWork.flags&13878);if(0!==(finishedWork.subtreeFlags&13878)||recoverableErrors){recoverableErrors=ReactSharedInternals.T;ReactSharedInternals.T=null;transitions=ReactDOMSharedInternals.p;ReactDOMSharedInternals.p=2;spawnedLane=executionContext;executionContext|=4;try{commitBeforeMutationEffects(root,finishedWork,lanes);}finally{executionContext=spawnedLane,ReactDOMSharedInternals.p=transitions,ReactSharedInternals.T=recoverableErrors;}}pendingEffectsStatus=1;flushMutationEffects();flushLayoutEffects();flushSpawnedWork();}}function flushMutationEffects(){if(1===pendingEffectsStatus){pendingEffectsStatus=0;var root=pendingEffectsRoot,finishedWork=pendingFinishedWork,rootMutationHasEffect=0!==(finishedWork.flags&13878);if(0!==(finishedWork.subtreeFlags&13878)||rootMutationHasEffect){rootMutationHasEffect=ReactSharedInternals.T;ReactSharedInternals.T=null;var previousPriority=ReactDOMSharedInternals.p;ReactDOMSharedInternals.p=2;var prevExecutionContext=executionContext;executionContext|=4;try{commitMutationEffectsOnFiber(finishedWork,root);var priorSelectionInformation=selectionInformation,curFocusedElem=getActiveElementDeep(root.containerInfo),priorFocusedElem=priorSelectionInformation.focusedElem,priorSelectionRange=priorSelectionInformation.selectionRange;if(curFocusedElem!==priorFocusedElem&&priorFocusedElem&&priorFocusedElem.ownerDocument&&containsNode(priorFocusedElem.ownerDocument.documentElement,priorFocusedElem)){if(null!==priorSelectionRange&&hasSelectionCapabilities(priorFocusedElem)){var start=priorSelectionRange.start,end=priorSelectionRange.end;void 0===end&&(end=start);if("selectionStart"in priorFocusedElem)priorFocusedElem.selectionStart=start,priorFocusedElem.selectionEnd=Math.min(end,priorFocusedElem.value.length);else {var doc=priorFocusedElem.ownerDocument||document,win=doc&&doc.defaultView||window;if(win.getSelection){var selection=win.getSelection(),length=priorFocusedElem.textContent.length,start$jscomp$0=Math.min(priorSelectionRange.start,length),end$jscomp$0=void 0===priorSelectionRange.end?start$jscomp$0:Math.min(priorSelectionRange.end,length);!selection.extend&&start$jscomp$0>end$jscomp$0&&(curFocusedElem=end$jscomp$0,end$jscomp$0=start$jscomp$0,start$jscomp$0=curFocusedElem);var startMarker=getNodeForCharacterOffset(priorFocusedElem,start$jscomp$0),endMarker=getNodeForCharacterOffset(priorFocusedElem,end$jscomp$0);if(startMarker&&endMarker&&(1!==selection.rangeCount||selection.anchorNode!==startMarker.node||selection.anchorOffset!==startMarker.offset||selection.focusNode!==endMarker.node||selection.focusOffset!==endMarker.offset)){var range=doc.createRange();range.setStart(startMarker.node,startMarker.offset);selection.removeAllRanges();start$jscomp$0>end$jscomp$0?(selection.addRange(range),selection.extend(endMarker.node,endMarker.offset)):(range.setEnd(endMarker.node,endMarker.offset),selection.addRange(range));}}}}doc=[];for(selection=priorFocusedElem;selection=selection.parentNode;)1===selection.nodeType&&doc.push({element:selection,left:selection.scrollLeft,top:selection.scrollTop});"function"===typeof priorFocusedElem.focus&&priorFocusedElem.focus();for(priorFocusedElem=0;priorFocusedElem<doc.length;priorFocusedElem++){var info=doc[priorFocusedElem];info.element.scrollLeft=info.left;info.element.scrollTop=info.top;}}_enabled=!!eventsEnabled;selectionInformation=eventsEnabled=null;}finally{executionContext=prevExecutionContext,ReactDOMSharedInternals.p=previousPriority,ReactSharedInternals.T=rootMutationHasEffect;}}root.current=finishedWork;pendingEffectsStatus=2;}}function flushLayoutEffects(){if(2===pendingEffectsStatus){pendingEffectsStatus=0;var root=pendingEffectsRoot,finishedWork=pendingFinishedWork,rootHasLayoutEffect=0!==(finishedWork.flags&8772);if(0!==(finishedWork.subtreeFlags&8772)||rootHasLayoutEffect){rootHasLayoutEffect=ReactSharedInternals.T;ReactSharedInternals.T=null;var previousPriority=ReactDOMSharedInternals.p;ReactDOMSharedInternals.p=2;var prevExecutionContext=executionContext;executionContext|=4;try{commitLayoutEffectOnFiber(root,finishedWork.alternate,finishedWork);}finally{executionContext=prevExecutionContext,ReactDOMSharedInternals.p=previousPriority,ReactSharedInternals.T=rootHasLayoutEffect;}}pendingEffectsStatus=3;}}function flushSpawnedWork(){if(4===pendingEffectsStatus||3===pendingEffectsStatus){pendingEffectsStatus=0;requestPaint();var root=pendingEffectsRoot,finishedWork=pendingFinishedWork,lanes=pendingEffectsLanes,recoverableErrors=pendingRecoverableErrors;0!==(finishedWork.subtreeFlags&10256)||0!==(finishedWork.flags&10256)?pendingEffectsStatus=5:(pendingEffectsStatus=0,pendingFinishedWork=pendingEffectsRoot=null,releaseRootPooledCache(root,root.pendingLanes));var remainingLanes=root.pendingLanes;0===remainingLanes&&(legacyErrorBoundariesThatAlreadyFailed=null);lanesToEventPriority(lanes);finishedWork=finishedWork.stateNode;if(injectedHook&&"function"===typeof injectedHook.onCommitFiberRoot)try{injectedHook.onCommitFiberRoot(rendererID,finishedWork,void 0,128===(finishedWork.current.flags&128));}catch(err){}if(null!==recoverableErrors){finishedWork=ReactSharedInternals.T;remainingLanes=ReactDOMSharedInternals.p;ReactDOMSharedInternals.p=2;ReactSharedInternals.T=null;try{for(var onRecoverableError=root.onRecoverableError,i=0;i<recoverableErrors.length;i++){var recoverableError=recoverableErrors[i];onRecoverableError(recoverableError.value,{componentStack:recoverableError.stack});}}finally{ReactSharedInternals.T=finishedWork,ReactDOMSharedInternals.p=remainingLanes;}}0!==(pendingEffectsLanes&3)&&flushPendingEffects();ensureRootIsScheduled(root);remainingLanes=root.pendingLanes;0!==(lanes&4194090)&&0!==(remainingLanes&42)?root===rootWithNestedUpdates?nestedUpdateCount++:(nestedUpdateCount=0,rootWithNestedUpdates=root):nestedUpdateCount=0;flushSyncWorkAcrossRoots_impl(0);}}function releaseRootPooledCache(root,remainingLanes){0===(root.pooledCacheLanes&=remainingLanes)&&(remainingLanes=root.pooledCache,null!=remainingLanes&&(root.pooledCache=null,releaseCache(remainingLanes)));}function flushPendingEffects(wasDelayedCommit){flushMutationEffects();flushLayoutEffects();flushSpawnedWork();return flushPassiveEffects();}function flushPassiveEffects(){if(5!==pendingEffectsStatus)return  false;var root=pendingEffectsRoot,remainingLanes=pendingEffectsRemainingLanes;pendingEffectsRemainingLanes=0;var renderPriority=lanesToEventPriority(pendingEffectsLanes),prevTransition=ReactSharedInternals.T,previousPriority=ReactDOMSharedInternals.p;try{ReactDOMSharedInternals.p=32>renderPriority?32:renderPriority;ReactSharedInternals.T=null;renderPriority=pendingPassiveTransitions;pendingPassiveTransitions=null;var root$jscomp$0=pendingEffectsRoot,lanes=pendingEffectsLanes;pendingEffectsStatus=0;pendingFinishedWork=pendingEffectsRoot=null;pendingEffectsLanes=0;if(0!==(executionContext&6))throw Error(formatProdErrorMessage(331));var prevExecutionContext=executionContext;executionContext|=4;commitPassiveUnmountOnFiber(root$jscomp$0.current);commitPassiveMountOnFiber(root$jscomp$0,root$jscomp$0.current,lanes,renderPriority);executionContext=prevExecutionContext;flushSyncWorkAcrossRoots_impl(0,!1);if(injectedHook&&"function"===typeof injectedHook.onPostCommitFiberRoot)try{injectedHook.onPostCommitFiberRoot(rendererID,root$jscomp$0);}catch(err){}return !0;}finally{ReactDOMSharedInternals.p=previousPriority,ReactSharedInternals.T=prevTransition,releaseRootPooledCache(root,remainingLanes);}}function captureCommitPhaseErrorOnRoot(rootFiber,sourceFiber,error){sourceFiber=createCapturedValueAtFiber(error,sourceFiber);sourceFiber=createRootErrorUpdate(rootFiber.stateNode,sourceFiber,2);rootFiber=enqueueUpdate(rootFiber,sourceFiber,2);null!==rootFiber&&(markRootUpdated$1(rootFiber,2),ensureRootIsScheduled(rootFiber));}function captureCommitPhaseError(sourceFiber,nearestMountedAncestor,error){if(3===sourceFiber.tag)captureCommitPhaseErrorOnRoot(sourceFiber,sourceFiber,error);else for(;null!==nearestMountedAncestor;){if(3===nearestMountedAncestor.tag){captureCommitPhaseErrorOnRoot(nearestMountedAncestor,sourceFiber,error);break;}else if(1===nearestMountedAncestor.tag){var instance=nearestMountedAncestor.stateNode;if("function"===typeof nearestMountedAncestor.type.getDerivedStateFromError||"function"===typeof instance.componentDidCatch&&(null===legacyErrorBoundariesThatAlreadyFailed||!legacyErrorBoundariesThatAlreadyFailed.has(instance))){sourceFiber=createCapturedValueAtFiber(error,sourceFiber);error=createClassErrorUpdate(2);instance=enqueueUpdate(nearestMountedAncestor,error,2);null!==instance&&(initializeClassErrorUpdate(error,instance,nearestMountedAncestor,sourceFiber),markRootUpdated$1(instance,2),ensureRootIsScheduled(instance));break;}}nearestMountedAncestor=nearestMountedAncestor.return;}}function attachPingListener(root,wakeable,lanes){var pingCache=root.pingCache;if(null===pingCache){pingCache=root.pingCache=new PossiblyWeakMap();var threadIDs=new Set();pingCache.set(wakeable,threadIDs);}else threadIDs=pingCache.get(wakeable),void 0===threadIDs&&(threadIDs=new Set(),pingCache.set(wakeable,threadIDs));threadIDs.has(lanes)||(workInProgressRootDidAttachPingListener=true,threadIDs.add(lanes),root=pingSuspendedRoot.bind(null,root,wakeable,lanes),wakeable.then(root,root));}function pingSuspendedRoot(root,wakeable,pingedLanes){var pingCache=root.pingCache;null!==pingCache&&pingCache.delete(wakeable);root.pingedLanes|=root.suspendedLanes&pingedLanes;root.warmLanes&=~pingedLanes;workInProgressRoot===root&&(workInProgressRootRenderLanes&pingedLanes)===pingedLanes&&(4===workInProgressRootExitStatus||3===workInProgressRootExitStatus&&(workInProgressRootRenderLanes&62914560)===workInProgressRootRenderLanes&&300>now()-globalMostRecentFallbackTime?0===(executionContext&2)&&prepareFreshStack(root,0):workInProgressRootPingedLanes|=pingedLanes,workInProgressSuspendedRetryLanes===workInProgressRootRenderLanes&&(workInProgressSuspendedRetryLanes=0));ensureRootIsScheduled(root);}function retryTimedOutBoundary(boundaryFiber,retryLane){0===retryLane&&(retryLane=claimNextRetryLane());boundaryFiber=enqueueConcurrentRenderForLane(boundaryFiber,retryLane);null!==boundaryFiber&&(markRootUpdated$1(boundaryFiber,retryLane),ensureRootIsScheduled(boundaryFiber));}function retryDehydratedSuspenseBoundary(boundaryFiber){var suspenseState=boundaryFiber.memoizedState,retryLane=0;null!==suspenseState&&(retryLane=suspenseState.retryLane);retryTimedOutBoundary(boundaryFiber,retryLane);}function resolveRetryWakeable(boundaryFiber,wakeable){var retryLane=0;switch(boundaryFiber.tag){case 13:var retryCache=boundaryFiber.stateNode;var suspenseState=boundaryFiber.memoizedState;null!==suspenseState&&(retryLane=suspenseState.retryLane);break;case 19:retryCache=boundaryFiber.stateNode;break;case 22:retryCache=boundaryFiber.stateNode._retryCache;break;default:throw Error(formatProdErrorMessage(314));}null!==retryCache&&retryCache.delete(wakeable);retryTimedOutBoundary(boundaryFiber,retryLane);}function scheduleCallback$1(priorityLevel,callback){return scheduleCallback$3(priorityLevel,callback);}var firstScheduledRoot=null,lastScheduledRoot=null,didScheduleMicrotask=false,mightHavePendingSyncWork=false,isFlushingWork=false,currentEventTransitionLane=0;function ensureRootIsScheduled(root){root!==lastScheduledRoot&&null===root.next&&(null===lastScheduledRoot?firstScheduledRoot=lastScheduledRoot=root:lastScheduledRoot=lastScheduledRoot.next=root);mightHavePendingSyncWork=true;didScheduleMicrotask||(didScheduleMicrotask=true,scheduleImmediateRootScheduleTask());}function flushSyncWorkAcrossRoots_impl(syncTransitionLanes,onlyLegacy){if(!isFlushingWork&&mightHavePendingSyncWork){isFlushingWork=true;do{var didPerformSomeWork=false;for(var root$174=firstScheduledRoot;null!==root$174;){if(0!==syncTransitionLanes){var pendingLanes=root$174.pendingLanes;if(0===pendingLanes)var JSCompiler_inline_result=0;else {var suspendedLanes=root$174.suspendedLanes,pingedLanes=root$174.pingedLanes;JSCompiler_inline_result=(1<<31-clz32(42|syncTransitionLanes)+1)-1;JSCompiler_inline_result&=pendingLanes&~(suspendedLanes&~pingedLanes);JSCompiler_inline_result=JSCompiler_inline_result&201326741?JSCompiler_inline_result&201326741|1:JSCompiler_inline_result?JSCompiler_inline_result|2:0;}0!==JSCompiler_inline_result&&(didPerformSomeWork=true,performSyncWorkOnRoot(root$174,JSCompiler_inline_result));}else JSCompiler_inline_result=workInProgressRootRenderLanes,JSCompiler_inline_result=getNextLanes(root$174,root$174===workInProgressRoot?JSCompiler_inline_result:0,null!==root$174.cancelPendingCommit||-1!==root$174.timeoutHandle),0===(JSCompiler_inline_result&3)||checkIfRootIsPrerendering(root$174,JSCompiler_inline_result)||(didPerformSomeWork=true,performSyncWorkOnRoot(root$174,JSCompiler_inline_result));root$174=root$174.next;}}while(didPerformSomeWork);isFlushingWork=false;}}function processRootScheduleInImmediateTask(){processRootScheduleInMicrotask();}function processRootScheduleInMicrotask(){mightHavePendingSyncWork=didScheduleMicrotask=false;var syncTransitionLanes=0;0!==currentEventTransitionLane&&(shouldAttemptEagerTransition()&&(syncTransitionLanes=currentEventTransitionLane),currentEventTransitionLane=0);for(var currentTime=now(),prev=null,root=firstScheduledRoot;null!==root;){var next=root.next,nextLanes=scheduleTaskForRootDuringMicrotask(root,currentTime);if(0===nextLanes)root.next=null,null===prev?firstScheduledRoot=next:prev.next=next,null===next&&(lastScheduledRoot=prev);else if(prev=root,0!==syncTransitionLanes||0!==(nextLanes&3))mightHavePendingSyncWork=true;root=next;}flushSyncWorkAcrossRoots_impl(syncTransitionLanes);}function scheduleTaskForRootDuringMicrotask(root,currentTime){for(var suspendedLanes=root.suspendedLanes,pingedLanes=root.pingedLanes,expirationTimes=root.expirationTimes,lanes=root.pendingLanes&-62914561;0<lanes;){var index$3=31-clz32(lanes),lane=1<<index$3,expirationTime=expirationTimes[index$3];if(-1===expirationTime){if(0===(lane&suspendedLanes)||0!==(lane&pingedLanes))expirationTimes[index$3]=computeExpirationTime(lane,currentTime);}else expirationTime<=currentTime&&(root.expiredLanes|=lane);lanes&=~lane;}currentTime=workInProgressRoot;suspendedLanes=workInProgressRootRenderLanes;suspendedLanes=getNextLanes(root,root===currentTime?suspendedLanes:0,null!==root.cancelPendingCommit||-1!==root.timeoutHandle);pingedLanes=root.callbackNode;if(0===suspendedLanes||root===currentTime&&(2===workInProgressSuspendedReason||9===workInProgressSuspendedReason)||null!==root.cancelPendingCommit)return null!==pingedLanes&&null!==pingedLanes&&cancelCallback$1(pingedLanes),root.callbackNode=null,root.callbackPriority=0;if(0===(suspendedLanes&3)||checkIfRootIsPrerendering(root,suspendedLanes)){currentTime=suspendedLanes&-suspendedLanes;if(currentTime===root.callbackPriority)return currentTime;null!==pingedLanes&&cancelCallback$1(pingedLanes);switch(lanesToEventPriority(suspendedLanes)){case 2:case 8:suspendedLanes=UserBlockingPriority;break;case 32:suspendedLanes=NormalPriority$1;break;case 268435456:suspendedLanes=IdlePriority;break;default:suspendedLanes=NormalPriority$1;}pingedLanes=performWorkOnRootViaSchedulerTask.bind(null,root);suspendedLanes=scheduleCallback$3(suspendedLanes,pingedLanes);root.callbackPriority=currentTime;root.callbackNode=suspendedLanes;return currentTime;}null!==pingedLanes&&null!==pingedLanes&&cancelCallback$1(pingedLanes);root.callbackPriority=2;root.callbackNode=null;return 2;}function performWorkOnRootViaSchedulerTask(root,didTimeout){if(0!==pendingEffectsStatus&&5!==pendingEffectsStatus)return root.callbackNode=null,root.callbackPriority=0,null;var originalCallbackNode=root.callbackNode;if(flushPendingEffects()&&root.callbackNode!==originalCallbackNode)return null;var workInProgressRootRenderLanes$jscomp$0=workInProgressRootRenderLanes;workInProgressRootRenderLanes$jscomp$0=getNextLanes(root,root===workInProgressRoot?workInProgressRootRenderLanes$jscomp$0:0,null!==root.cancelPendingCommit||-1!==root.timeoutHandle);if(0===workInProgressRootRenderLanes$jscomp$0)return null;performWorkOnRoot(root,workInProgressRootRenderLanes$jscomp$0,didTimeout);scheduleTaskForRootDuringMicrotask(root,now());return null!=root.callbackNode&&root.callbackNode===originalCallbackNode?performWorkOnRootViaSchedulerTask.bind(null,root):null;}function performSyncWorkOnRoot(root,lanes){if(flushPendingEffects())return null;performWorkOnRoot(root,lanes,true);}function scheduleImmediateRootScheduleTask(){scheduleMicrotask(function(){0!==(executionContext&6)?scheduleCallback$3(ImmediatePriority,processRootScheduleInImmediateTask):processRootScheduleInMicrotask();});}function requestTransitionLane(){0===currentEventTransitionLane&&(currentEventTransitionLane=claimNextTransitionLane());return currentEventTransitionLane;}function coerceFormActionProp(actionProp){return null==actionProp||"symbol"===typeof actionProp||"boolean"===typeof actionProp?null:"function"===typeof actionProp?actionProp:sanitizeURL(""+actionProp);}function createFormDataWithSubmitter(form,submitter){var temp=submitter.ownerDocument.createElement("input");temp.name=submitter.name;temp.value=submitter.value;form.id&&temp.setAttribute("form",form.id);submitter.parentNode.insertBefore(temp,submitter);form=new FormData(form);temp.parentNode.removeChild(temp);return form;}function extractEvents$1(dispatchQueue,domEventName,maybeTargetInst,nativeEvent,nativeEventTarget){if("submit"===domEventName&&maybeTargetInst&&maybeTargetInst.stateNode===nativeEventTarget){var action=coerceFormActionProp((nativeEventTarget[internalPropsKey]||null).action),submitter=nativeEvent.submitter;submitter&&(domEventName=(domEventName=submitter[internalPropsKey]||null)?coerceFormActionProp(domEventName.formAction):submitter.getAttribute("formAction"),null!==domEventName&&(action=domEventName,submitter=null));var event=new SyntheticEvent("action","action",null,nativeEvent,nativeEventTarget);dispatchQueue.push({event:event,listeners:[{instance:null,listener:function(){if(nativeEvent.defaultPrevented){if(0!==currentEventTransitionLane){var formData=submitter?createFormDataWithSubmitter(nativeEventTarget,submitter):new FormData(nativeEventTarget);startHostTransition(maybeTargetInst,{pending:true,data:formData,method:nativeEventTarget.method,action:action},null,formData);}}else "function"===typeof action&&(event.preventDefault(),formData=submitter?createFormDataWithSubmitter(nativeEventTarget,submitter):new FormData(nativeEventTarget),startHostTransition(maybeTargetInst,{pending:true,data:formData,method:nativeEventTarget.method,action:action},action,formData));},currentTarget:nativeEventTarget}]});}}for(var i$jscomp$inline_1528=0;i$jscomp$inline_1528<simpleEventPluginEvents.length;i$jscomp$inline_1528++){var eventName$jscomp$inline_1529=simpleEventPluginEvents[i$jscomp$inline_1528],domEventName$jscomp$inline_1530=eventName$jscomp$inline_1529.toLowerCase(),capitalizedEvent$jscomp$inline_1531=eventName$jscomp$inline_1529[0].toUpperCase()+eventName$jscomp$inline_1529.slice(1);registerSimpleEvent(domEventName$jscomp$inline_1530,"on"+capitalizedEvent$jscomp$inline_1531);}registerSimpleEvent(ANIMATION_END,"onAnimationEnd");registerSimpleEvent(ANIMATION_ITERATION,"onAnimationIteration");registerSimpleEvent(ANIMATION_START,"onAnimationStart");registerSimpleEvent("dblclick","onDoubleClick");registerSimpleEvent("focusin","onFocus");registerSimpleEvent("focusout","onBlur");registerSimpleEvent(TRANSITION_RUN,"onTransitionRun");registerSimpleEvent(TRANSITION_START,"onTransitionStart");registerSimpleEvent(TRANSITION_CANCEL,"onTransitionCancel");registerSimpleEvent(TRANSITION_END,"onTransitionEnd");registerDirectEvent("onMouseEnter",["mouseout","mouseover"]);registerDirectEvent("onMouseLeave",["mouseout","mouseover"]);registerDirectEvent("onPointerEnter",["pointerout","pointerover"]);registerDirectEvent("onPointerLeave",["pointerout","pointerover"]);registerTwoPhaseEvent("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));registerTwoPhaseEvent("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));registerTwoPhaseEvent("onBeforeInput",["compositionend","keypress","textInput","paste"]);registerTwoPhaseEvent("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));registerTwoPhaseEvent("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));registerTwoPhaseEvent("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var mediaEventTypes="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),nonDelegatedEvents=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes));function processDispatchQueue(dispatchQueue,eventSystemFlags){eventSystemFlags=0!==(eventSystemFlags&4);for(var i=0;i<dispatchQueue.length;i++){var _dispatchQueue$i=dispatchQueue[i],event=_dispatchQueue$i.event;_dispatchQueue$i=_dispatchQueue$i.listeners;a:{var previousInstance=void 0;if(eventSystemFlags)for(var i$jscomp$0=_dispatchQueue$i.length-1;0<=i$jscomp$0;i$jscomp$0--){var _dispatchListeners$i=_dispatchQueue$i[i$jscomp$0],instance=_dispatchListeners$i.instance,currentTarget=_dispatchListeners$i.currentTarget;_dispatchListeners$i=_dispatchListeners$i.listener;if(instance!==previousInstance&&event.isPropagationStopped())break a;previousInstance=_dispatchListeners$i;event.currentTarget=currentTarget;try{previousInstance(event);}catch(error){reportGlobalError(error);}event.currentTarget=null;previousInstance=instance;}else for(i$jscomp$0=0;i$jscomp$0<_dispatchQueue$i.length;i$jscomp$0++){_dispatchListeners$i=_dispatchQueue$i[i$jscomp$0];instance=_dispatchListeners$i.instance;currentTarget=_dispatchListeners$i.currentTarget;_dispatchListeners$i=_dispatchListeners$i.listener;if(instance!==previousInstance&&event.isPropagationStopped())break a;previousInstance=_dispatchListeners$i;event.currentTarget=currentTarget;try{previousInstance(event);}catch(error){reportGlobalError(error);}event.currentTarget=null;previousInstance=instance;}}}}function listenToNonDelegatedEvent(domEventName,targetElement){var JSCompiler_inline_result=targetElement[internalEventHandlersKey];void 0===JSCompiler_inline_result&&(JSCompiler_inline_result=targetElement[internalEventHandlersKey]=new Set());var listenerSetKey=domEventName+"__bubble";JSCompiler_inline_result.has(listenerSetKey)||(addTrappedEventListener(targetElement,domEventName,2,false),JSCompiler_inline_result.add(listenerSetKey));}function listenToNativeEvent(domEventName,isCapturePhaseListener,target){var eventSystemFlags=0;isCapturePhaseListener&&(eventSystemFlags|=4);addTrappedEventListener(target,domEventName,eventSystemFlags,isCapturePhaseListener);}var listeningMarker="_reactListening"+Math.random().toString(36).slice(2);function listenToAllSupportedEvents(rootContainerElement){if(!rootContainerElement[listeningMarker]){rootContainerElement[listeningMarker]=true;allNativeEvents.forEach(function(domEventName){"selectionchange"!==domEventName&&(nonDelegatedEvents.has(domEventName)||listenToNativeEvent(domEventName,false,rootContainerElement),listenToNativeEvent(domEventName,true,rootContainerElement));});var ownerDocument=9===rootContainerElement.nodeType?rootContainerElement:rootContainerElement.ownerDocument;null===ownerDocument||ownerDocument[listeningMarker]||(ownerDocument[listeningMarker]=true,listenToNativeEvent("selectionchange",false,ownerDocument));}}function addTrappedEventListener(targetContainer,domEventName,eventSystemFlags,isCapturePhaseListener){switch(getEventPriority(domEventName)){case 2:var listenerWrapper=dispatchDiscreteEvent;break;case 8:listenerWrapper=dispatchContinuousEvent;break;default:listenerWrapper=dispatchEvent;}eventSystemFlags=listenerWrapper.bind(null,domEventName,eventSystemFlags,targetContainer);listenerWrapper=void 0;!passiveBrowserEventsSupported||"touchstart"!==domEventName&&"touchmove"!==domEventName&&"wheel"!==domEventName||(listenerWrapper=true);isCapturePhaseListener?void 0!==listenerWrapper?targetContainer.addEventListener(domEventName,eventSystemFlags,{capture:true,passive:listenerWrapper}):targetContainer.addEventListener(domEventName,eventSystemFlags,true):void 0!==listenerWrapper?targetContainer.addEventListener(domEventName,eventSystemFlags,{passive:listenerWrapper}):targetContainer.addEventListener(domEventName,eventSystemFlags,false);}function dispatchEventForPluginEventSystem(domEventName,eventSystemFlags,nativeEvent,targetInst$jscomp$0,targetContainer){var ancestorInst=targetInst$jscomp$0;if(0===(eventSystemFlags&1)&&0===(eventSystemFlags&2)&&null!==targetInst$jscomp$0)a:for(;;){if(null===targetInst$jscomp$0)return;var nodeTag=targetInst$jscomp$0.tag;if(3===nodeTag||4===nodeTag){var container=targetInst$jscomp$0.stateNode.containerInfo;if(container===targetContainer)break;if(4===nodeTag)for(nodeTag=targetInst$jscomp$0.return;null!==nodeTag;){var grandTag=nodeTag.tag;if((3===grandTag||4===grandTag)&&nodeTag.stateNode.containerInfo===targetContainer)return;nodeTag=nodeTag.return;}for(;null!==container;){nodeTag=getClosestInstanceFromNode(container);if(null===nodeTag)return;grandTag=nodeTag.tag;if(5===grandTag||6===grandTag||26===grandTag||27===grandTag){targetInst$jscomp$0=ancestorInst=nodeTag;continue a;}container=container.parentNode;}}targetInst$jscomp$0=targetInst$jscomp$0.return;}batchedUpdates$1(function(){var targetInst=ancestorInst,nativeEventTarget=getEventTarget(nativeEvent),dispatchQueue=[];a:{var reactName=topLevelEventsToReactNames.get(domEventName);if(void 0!==reactName){var SyntheticEventCtor=SyntheticEvent,reactEventType=domEventName;switch(domEventName){case "keypress":if(0===getEventCharCode(nativeEvent))break a;case "keydown":case "keyup":SyntheticEventCtor=SyntheticKeyboardEvent;break;case "focusin":reactEventType="focus";SyntheticEventCtor=SyntheticFocusEvent;break;case "focusout":reactEventType="blur";SyntheticEventCtor=SyntheticFocusEvent;break;case "beforeblur":case "afterblur":SyntheticEventCtor=SyntheticFocusEvent;break;case "click":if(2===nativeEvent.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":SyntheticEventCtor=SyntheticMouseEvent;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":SyntheticEventCtor=SyntheticDragEvent;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":SyntheticEventCtor=SyntheticTouchEvent;break;case ANIMATION_END:case ANIMATION_ITERATION:case ANIMATION_START:SyntheticEventCtor=SyntheticAnimationEvent;break;case TRANSITION_END:SyntheticEventCtor=SyntheticTransitionEvent;break;case "scroll":case "scrollend":SyntheticEventCtor=SyntheticUIEvent;break;case "wheel":SyntheticEventCtor=SyntheticWheelEvent;break;case "copy":case "cut":case "paste":SyntheticEventCtor=SyntheticClipboardEvent;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":SyntheticEventCtor=SyntheticPointerEvent;break;case "toggle":case "beforetoggle":SyntheticEventCtor=SyntheticToggleEvent;}var inCapturePhase=0!==(eventSystemFlags&4),accumulateTargetOnly=!inCapturePhase&&("scroll"===domEventName||"scrollend"===domEventName),reactEventName=inCapturePhase?null!==reactName?reactName+"Capture":null:reactName;inCapturePhase=[];for(var instance=targetInst,lastHostComponent;null!==instance;){var _instance=instance;lastHostComponent=_instance.stateNode;_instance=_instance.tag;5!==_instance&&26!==_instance&&27!==_instance||null===lastHostComponent||null===reactEventName||(_instance=getListener(instance,reactEventName),null!=_instance&&inCapturePhase.push(createDispatchListener(instance,_instance,lastHostComponent)));if(accumulateTargetOnly)break;instance=instance.return;}0<inCapturePhase.length&&(reactName=new SyntheticEventCtor(reactName,reactEventType,null,nativeEvent,nativeEventTarget),dispatchQueue.push({event:reactName,listeners:inCapturePhase}));}}if(0===(eventSystemFlags&7)){a:{reactName="mouseover"===domEventName||"pointerover"===domEventName;SyntheticEventCtor="mouseout"===domEventName||"pointerout"===domEventName;if(reactName&&nativeEvent!==currentReplayingEvent&&(reactEventType=nativeEvent.relatedTarget||nativeEvent.fromElement)&&(getClosestInstanceFromNode(reactEventType)||reactEventType[internalContainerInstanceKey]))break a;if(SyntheticEventCtor||reactName){reactName=nativeEventTarget.window===nativeEventTarget?nativeEventTarget:(reactName=nativeEventTarget.ownerDocument)?reactName.defaultView||reactName.parentWindow:window;if(SyntheticEventCtor){if(reactEventType=nativeEvent.relatedTarget||nativeEvent.toElement,SyntheticEventCtor=targetInst,reactEventType=reactEventType?getClosestInstanceFromNode(reactEventType):null,null!==reactEventType&&(accumulateTargetOnly=getNearestMountedFiber(reactEventType),inCapturePhase=reactEventType.tag,reactEventType!==accumulateTargetOnly||5!==inCapturePhase&&27!==inCapturePhase&&6!==inCapturePhase))reactEventType=null;}else SyntheticEventCtor=null,reactEventType=targetInst;if(SyntheticEventCtor!==reactEventType){inCapturePhase=SyntheticMouseEvent;_instance="onMouseLeave";reactEventName="onMouseEnter";instance="mouse";if("pointerout"===domEventName||"pointerover"===domEventName)inCapturePhase=SyntheticPointerEvent,_instance="onPointerLeave",reactEventName="onPointerEnter",instance="pointer";accumulateTargetOnly=null==SyntheticEventCtor?reactName:getNodeFromInstance(SyntheticEventCtor);lastHostComponent=null==reactEventType?reactName:getNodeFromInstance(reactEventType);reactName=new inCapturePhase(_instance,instance+"leave",SyntheticEventCtor,nativeEvent,nativeEventTarget);reactName.target=accumulateTargetOnly;reactName.relatedTarget=lastHostComponent;_instance=null;getClosestInstanceFromNode(nativeEventTarget)===targetInst&&(inCapturePhase=new inCapturePhase(reactEventName,instance+"enter",reactEventType,nativeEvent,nativeEventTarget),inCapturePhase.target=lastHostComponent,inCapturePhase.relatedTarget=accumulateTargetOnly,_instance=inCapturePhase);accumulateTargetOnly=_instance;if(SyntheticEventCtor&&reactEventType)b:{inCapturePhase=SyntheticEventCtor;reactEventName=reactEventType;instance=0;for(lastHostComponent=inCapturePhase;lastHostComponent;lastHostComponent=getParent(lastHostComponent))instance++;lastHostComponent=0;for(_instance=reactEventName;_instance;_instance=getParent(_instance))lastHostComponent++;for(;0<instance-lastHostComponent;)inCapturePhase=getParent(inCapturePhase),instance--;for(;0<lastHostComponent-instance;)reactEventName=getParent(reactEventName),lastHostComponent--;for(;instance--;){if(inCapturePhase===reactEventName||null!==reactEventName&&inCapturePhase===reactEventName.alternate)break b;inCapturePhase=getParent(inCapturePhase);reactEventName=getParent(reactEventName);}inCapturePhase=null;}else inCapturePhase=null;null!==SyntheticEventCtor&&accumulateEnterLeaveListenersForEvent(dispatchQueue,reactName,SyntheticEventCtor,inCapturePhase,!1);null!==reactEventType&&null!==accumulateTargetOnly&&accumulateEnterLeaveListenersForEvent(dispatchQueue,accumulateTargetOnly,reactEventType,inCapturePhase,!0);}}}a:{reactName=targetInst?getNodeFromInstance(targetInst):window;SyntheticEventCtor=reactName.nodeName&&reactName.nodeName.toLowerCase();if("select"===SyntheticEventCtor||"input"===SyntheticEventCtor&&"file"===reactName.type)var getTargetInstFunc=getTargetInstForChangeEvent;else if(isTextInputElement(reactName)){if(isInputEventSupported)getTargetInstFunc=getTargetInstForInputOrChangeEvent;else {getTargetInstFunc=getTargetInstForInputEventPolyfill;var handleEventFunc=handleEventsForInputEventPolyfill;}}else SyntheticEventCtor=reactName.nodeName,!SyntheticEventCtor||"input"!==SyntheticEventCtor.toLowerCase()||"checkbox"!==reactName.type&&"radio"!==reactName.type?targetInst&&isCustomElement(targetInst.elementType)&&(getTargetInstFunc=getTargetInstForChangeEvent):getTargetInstFunc=getTargetInstForClickEvent;if(getTargetInstFunc&&(getTargetInstFunc=getTargetInstFunc(domEventName,targetInst))){createAndAccumulateChangeEvent(dispatchQueue,getTargetInstFunc,nativeEvent,nativeEventTarget);break a;}handleEventFunc&&handleEventFunc(domEventName,reactName,targetInst);"focusout"===domEventName&&targetInst&&"number"===reactName.type&&null!=targetInst.memoizedProps.value&&setDefaultValue(reactName,"number",reactName.value);}handleEventFunc=targetInst?getNodeFromInstance(targetInst):window;switch(domEventName){case "focusin":if(isTextInputElement(handleEventFunc)||"true"===handleEventFunc.contentEditable)activeElement=handleEventFunc,activeElementInst=targetInst,lastSelection=null;break;case "focusout":lastSelection=activeElementInst=activeElement=null;break;case "mousedown":mouseDown=!0;break;case "contextmenu":case "mouseup":case "dragend":mouseDown=!1;constructSelectEvent(dispatchQueue,nativeEvent,nativeEventTarget);break;case "selectionchange":if(skipSelectionChangeEvent)break;case "keydown":case "keyup":constructSelectEvent(dispatchQueue,nativeEvent,nativeEventTarget);}var fallbackData;if(canUseCompositionEvent)b:{switch(domEventName){case "compositionstart":var eventType="onCompositionStart";break b;case "compositionend":eventType="onCompositionEnd";break b;case "compositionupdate":eventType="onCompositionUpdate";break b;}eventType=void 0;}else isComposing?isFallbackCompositionEnd(domEventName,nativeEvent)&&(eventType="onCompositionEnd"):"keydown"===domEventName&&229===nativeEvent.keyCode&&(eventType="onCompositionStart");eventType&&(useFallbackCompositionData&&"ko"!==nativeEvent.locale&&(isComposing||"onCompositionStart"!==eventType?"onCompositionEnd"===eventType&&isComposing&&(fallbackData=getData()):(root=nativeEventTarget,startText="value"in root?root.value:root.textContent,isComposing=!0)),handleEventFunc=accumulateTwoPhaseListeners(targetInst,eventType),0<handleEventFunc.length&&(eventType=new SyntheticCompositionEvent(eventType,domEventName,null,nativeEvent,nativeEventTarget),dispatchQueue.push({event:eventType,listeners:handleEventFunc}),fallbackData?eventType.data=fallbackData:(fallbackData=getDataFromCustomEvent(nativeEvent),null!==fallbackData&&(eventType.data=fallbackData))));if(fallbackData=canUseTextInputEvent?getNativeBeforeInputChars(domEventName,nativeEvent):getFallbackBeforeInputChars(domEventName,nativeEvent))eventType=accumulateTwoPhaseListeners(targetInst,"onBeforeInput"),0<eventType.length&&(handleEventFunc=new SyntheticCompositionEvent("onBeforeInput","beforeinput",null,nativeEvent,nativeEventTarget),dispatchQueue.push({event:handleEventFunc,listeners:eventType}),handleEventFunc.data=fallbackData);extractEvents$1(dispatchQueue,domEventName,targetInst,nativeEvent,nativeEventTarget);}processDispatchQueue(dispatchQueue,eventSystemFlags);});}function createDispatchListener(instance,listener,currentTarget){return {instance:instance,listener:listener,currentTarget:currentTarget};}function accumulateTwoPhaseListeners(targetFiber,reactName){for(var captureName=reactName+"Capture",listeners=[];null!==targetFiber;){var _instance2=targetFiber,stateNode=_instance2.stateNode;_instance2=_instance2.tag;5!==_instance2&&26!==_instance2&&27!==_instance2||null===stateNode||(_instance2=getListener(targetFiber,captureName),null!=_instance2&&listeners.unshift(createDispatchListener(targetFiber,_instance2,stateNode)),_instance2=getListener(targetFiber,reactName),null!=_instance2&&listeners.push(createDispatchListener(targetFiber,_instance2,stateNode)));if(3===targetFiber.tag)return listeners;targetFiber=targetFiber.return;}return [];}function getParent(inst){if(null===inst)return null;do inst=inst.return;while(inst&&5!==inst.tag&&27!==inst.tag);return inst?inst:null;}function accumulateEnterLeaveListenersForEvent(dispatchQueue,event,target,common,inCapturePhase){for(var registrationName=event._reactName,listeners=[];null!==target&&target!==common;){var _instance3=target,alternate=_instance3.alternate,stateNode=_instance3.stateNode;_instance3=_instance3.tag;if(null!==alternate&&alternate===common)break;5!==_instance3&&26!==_instance3&&27!==_instance3||null===stateNode||(alternate=stateNode,inCapturePhase?(stateNode=getListener(target,registrationName),null!=stateNode&&listeners.unshift(createDispatchListener(target,stateNode,alternate))):inCapturePhase||(stateNode=getListener(target,registrationName),null!=stateNode&&listeners.push(createDispatchListener(target,stateNode,alternate))));target=target.return;}0!==listeners.length&&dispatchQueue.push({event:event,listeners:listeners});}var NORMALIZE_NEWLINES_REGEX=/\r\n?/g,NORMALIZE_NULL_AND_REPLACEMENT_REGEX=/\u0000|\uFFFD/g;function normalizeMarkupForTextOrAttribute(markup){return ("string"===typeof markup?markup:""+markup).replace(NORMALIZE_NEWLINES_REGEX,"\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX,"");}function checkForUnmatchedText(serverText,clientText){clientText=normalizeMarkupForTextOrAttribute(clientText);return normalizeMarkupForTextOrAttribute(serverText)===clientText?true:false;}function noop$1(){}function setProp(domElement,tag,key,value,props,prevValue){switch(key){case "children":"string"===typeof value?"body"===tag||"textarea"===tag&&""===value||setTextContent(domElement,value):("number"===typeof value||"bigint"===typeof value)&&"body"!==tag&&setTextContent(domElement,""+value);break;case "className":setValueForKnownAttribute(domElement,"class",value);break;case "tabIndex":setValueForKnownAttribute(domElement,"tabindex",value);break;case "dir":case "role":case "viewBox":case "width":case "height":setValueForKnownAttribute(domElement,key,value);break;case "style":setValueForStyles(domElement,value,prevValue);break;case "data":if("object"!==tag){setValueForKnownAttribute(domElement,"data",value);break;}case "src":case "href":if(""===value&&("a"!==tag||"href"!==key)){domElement.removeAttribute(key);break;}if(null==value||"function"===typeof value||"symbol"===typeof value||"boolean"===typeof value){domElement.removeAttribute(key);break;}value=sanitizeURL(""+value);domElement.setAttribute(key,value);break;case "action":case "formAction":if("function"===typeof value){domElement.setAttribute(key,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break;}else "function"===typeof prevValue&&("formAction"===key?("input"!==tag&&setProp(domElement,tag,"name",props.name,props,null),setProp(domElement,tag,"formEncType",props.formEncType,props,null),setProp(domElement,tag,"formMethod",props.formMethod,props,null),setProp(domElement,tag,"formTarget",props.formTarget,props,null)):(setProp(domElement,tag,"encType",props.encType,props,null),setProp(domElement,tag,"method",props.method,props,null),setProp(domElement,tag,"target",props.target,props,null)));if(null==value||"symbol"===typeof value||"boolean"===typeof value){domElement.removeAttribute(key);break;}value=sanitizeURL(""+value);domElement.setAttribute(key,value);break;case "onClick":null!=value&&(domElement.onclick=noop$1);break;case "onScroll":null!=value&&listenToNonDelegatedEvent("scroll",domElement);break;case "onScrollEnd":null!=value&&listenToNonDelegatedEvent("scrollend",domElement);break;case "dangerouslySetInnerHTML":if(null!=value){if("object"!==typeof value||!("__html"in value))throw Error(formatProdErrorMessage(61));key=value.__html;if(null!=key){if(null!=props.children)throw Error(formatProdErrorMessage(60));domElement.innerHTML=key;}}break;case "multiple":domElement.multiple=value&&"function"!==typeof value&&"symbol"!==typeof value;break;case "muted":domElement.muted=value&&"function"!==typeof value&&"symbol"!==typeof value;break;case "suppressContentEditableWarning":case "suppressHydrationWarning":case "defaultValue":case "defaultChecked":case "innerHTML":case "ref":break;case "autoFocus":break;case "xlinkHref":if(null==value||"function"===typeof value||"boolean"===typeof value||"symbol"===typeof value){domElement.removeAttribute("xlink:href");break;}key=sanitizeURL(""+value);domElement.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",key);break;case "contentEditable":case "spellCheck":case "draggable":case "value":case "autoReverse":case "externalResourcesRequired":case "focusable":case "preserveAlpha":null!=value&&"function"!==typeof value&&"symbol"!==typeof value?domElement.setAttribute(key,""+value):domElement.removeAttribute(key);break;case "inert":case "allowFullScreen":case "async":case "autoPlay":case "controls":case "default":case "defer":case "disabled":case "disablePictureInPicture":case "disableRemotePlayback":case "formNoValidate":case "hidden":case "loop":case "noModule":case "noValidate":case "open":case "playsInline":case "readOnly":case "required":case "reversed":case "scoped":case "seamless":case "itemScope":value&&"function"!==typeof value&&"symbol"!==typeof value?domElement.setAttribute(key,""):domElement.removeAttribute(key);break;case "capture":case "download":true===value?domElement.setAttribute(key,""):false!==value&&null!=value&&"function"!==typeof value&&"symbol"!==typeof value?domElement.setAttribute(key,value):domElement.removeAttribute(key);break;case "cols":case "rows":case "size":case "span":null!=value&&"function"!==typeof value&&"symbol"!==typeof value&&!isNaN(value)&&1<=value?domElement.setAttribute(key,value):domElement.removeAttribute(key);break;case "rowSpan":case "start":null==value||"function"===typeof value||"symbol"===typeof value||isNaN(value)?domElement.removeAttribute(key):domElement.setAttribute(key,value);break;case "popover":listenToNonDelegatedEvent("beforetoggle",domElement);listenToNonDelegatedEvent("toggle",domElement);setValueForAttribute(domElement,"popover",value);break;case "xlinkActuate":setValueForNamespacedAttribute(domElement,"http://www.w3.org/1999/xlink","xlink:actuate",value);break;case "xlinkArcrole":setValueForNamespacedAttribute(domElement,"http://www.w3.org/1999/xlink","xlink:arcrole",value);break;case "xlinkRole":setValueForNamespacedAttribute(domElement,"http://www.w3.org/1999/xlink","xlink:role",value);break;case "xlinkShow":setValueForNamespacedAttribute(domElement,"http://www.w3.org/1999/xlink","xlink:show",value);break;case "xlinkTitle":setValueForNamespacedAttribute(domElement,"http://www.w3.org/1999/xlink","xlink:title",value);break;case "xlinkType":setValueForNamespacedAttribute(domElement,"http://www.w3.org/1999/xlink","xlink:type",value);break;case "xmlBase":setValueForNamespacedAttribute(domElement,"http://www.w3.org/XML/1998/namespace","xml:base",value);break;case "xmlLang":setValueForNamespacedAttribute(domElement,"http://www.w3.org/XML/1998/namespace","xml:lang",value);break;case "xmlSpace":setValueForNamespacedAttribute(domElement,"http://www.w3.org/XML/1998/namespace","xml:space",value);break;case "is":setValueForAttribute(domElement,"is",value);break;case "innerText":case "textContent":break;default:if(!(2<key.length)||"o"!==key[0]&&"O"!==key[0]||"n"!==key[1]&&"N"!==key[1])key=aliases.get(key)||key,setValueForAttribute(domElement,key,value);}}function setPropOnCustomElement(domElement,tag,key,value,props,prevValue){switch(key){case "style":setValueForStyles(domElement,value,prevValue);break;case "dangerouslySetInnerHTML":if(null!=value){if("object"!==typeof value||!("__html"in value))throw Error(formatProdErrorMessage(61));key=value.__html;if(null!=key){if(null!=props.children)throw Error(formatProdErrorMessage(60));domElement.innerHTML=key;}}break;case "children":"string"===typeof value?setTextContent(domElement,value):("number"===typeof value||"bigint"===typeof value)&&setTextContent(domElement,""+value);break;case "onScroll":null!=value&&listenToNonDelegatedEvent("scroll",domElement);break;case "onScrollEnd":null!=value&&listenToNonDelegatedEvent("scrollend",domElement);break;case "onClick":null!=value&&(domElement.onclick=noop$1);break;case "suppressContentEditableWarning":case "suppressHydrationWarning":case "innerHTML":case "ref":break;case "innerText":case "textContent":break;default:if(!registrationNameDependencies.hasOwnProperty(key))a:{if("o"===key[0]&&"n"===key[1]&&(props=key.endsWith("Capture"),tag=key.slice(2,props?key.length-7:void 0),prevValue=domElement[internalPropsKey]||null,prevValue=null!=prevValue?prevValue[key]:null,"function"===typeof prevValue&&domElement.removeEventListener(tag,prevValue,props),"function"===typeof value)){"function"!==typeof prevValue&&null!==prevValue&&(key in domElement?domElement[key]=null:domElement.hasAttribute(key)&&domElement.removeAttribute(key));domElement.addEventListener(tag,value,props);break a;}key in domElement?domElement[key]=value:true===value?domElement.setAttribute(key,""):setValueForAttribute(domElement,key,value);}}}function setInitialProperties(domElement,tag,props){switch(tag){case "div":case "span":case "svg":case "path":case "a":case "g":case "p":case "li":break;case "img":listenToNonDelegatedEvent("error",domElement);listenToNonDelegatedEvent("load",domElement);var hasSrc=false,hasSrcSet=false,propKey;for(propKey in props)if(props.hasOwnProperty(propKey)){var propValue=props[propKey];if(null!=propValue)switch(propKey){case "src":hasSrc=true;break;case "srcSet":hasSrcSet=true;break;case "children":case "dangerouslySetInnerHTML":throw Error(formatProdErrorMessage(137,tag));default:setProp(domElement,tag,propKey,propValue,props,null);}}hasSrcSet&&setProp(domElement,tag,"srcSet",props.srcSet,props,null);hasSrc&&setProp(domElement,tag,"src",props.src,props,null);return;case "input":listenToNonDelegatedEvent("invalid",domElement);var defaultValue=propKey=propValue=hasSrcSet=null,checked=null,defaultChecked=null;for(hasSrc in props)if(props.hasOwnProperty(hasSrc)){var propValue$188=props[hasSrc];if(null!=propValue$188)switch(hasSrc){case "name":hasSrcSet=propValue$188;break;case "type":propValue=propValue$188;break;case "checked":checked=propValue$188;break;case "defaultChecked":defaultChecked=propValue$188;break;case "value":propKey=propValue$188;break;case "defaultValue":defaultValue=propValue$188;break;case "children":case "dangerouslySetInnerHTML":if(null!=propValue$188)throw Error(formatProdErrorMessage(137,tag));break;default:setProp(domElement,tag,hasSrc,propValue$188,props,null);}}initInput(domElement,propKey,defaultValue,checked,defaultChecked,propValue,hasSrcSet,false);track(domElement);return;case "select":listenToNonDelegatedEvent("invalid",domElement);hasSrc=propValue=propKey=null;for(hasSrcSet in props)if(props.hasOwnProperty(hasSrcSet)&&(defaultValue=props[hasSrcSet],null!=defaultValue))switch(hasSrcSet){case "value":propKey=defaultValue;break;case "defaultValue":propValue=defaultValue;break;case "multiple":hasSrc=defaultValue;default:setProp(domElement,tag,hasSrcSet,defaultValue,props,null);}tag=propKey;props=propValue;domElement.multiple=!!hasSrc;null!=tag?updateOptions(domElement,!!hasSrc,tag,false):null!=props&&updateOptions(domElement,!!hasSrc,props,true);return;case "textarea":listenToNonDelegatedEvent("invalid",domElement);propKey=hasSrcSet=hasSrc=null;for(propValue in props)if(props.hasOwnProperty(propValue)&&(defaultValue=props[propValue],null!=defaultValue))switch(propValue){case "value":hasSrc=defaultValue;break;case "defaultValue":hasSrcSet=defaultValue;break;case "children":propKey=defaultValue;break;case "dangerouslySetInnerHTML":if(null!=defaultValue)throw Error(formatProdErrorMessage(91));break;default:setProp(domElement,tag,propValue,defaultValue,props,null);}initTextarea(domElement,hasSrc,hasSrcSet,propKey);track(domElement);return;case "option":for(checked in props)if(props.hasOwnProperty(checked)&&(hasSrc=props[checked],null!=hasSrc))switch(checked){case "selected":domElement.selected=hasSrc&&"function"!==typeof hasSrc&&"symbol"!==typeof hasSrc;break;default:setProp(domElement,tag,checked,hasSrc,props,null);}return;case "dialog":listenToNonDelegatedEvent("beforetoggle",domElement);listenToNonDelegatedEvent("toggle",domElement);listenToNonDelegatedEvent("cancel",domElement);listenToNonDelegatedEvent("close",domElement);break;case "iframe":case "object":listenToNonDelegatedEvent("load",domElement);break;case "video":case "audio":for(hasSrc=0;hasSrc<mediaEventTypes.length;hasSrc++)listenToNonDelegatedEvent(mediaEventTypes[hasSrc],domElement);break;case "image":listenToNonDelegatedEvent("error",domElement);listenToNonDelegatedEvent("load",domElement);break;case "details":listenToNonDelegatedEvent("toggle",domElement);break;case "embed":case "source":case "link":listenToNonDelegatedEvent("error",domElement),listenToNonDelegatedEvent("load",domElement);case "area":case "base":case "br":case "col":case "hr":case "keygen":case "meta":case "param":case "track":case "wbr":case "menuitem":for(defaultChecked in props)if(props.hasOwnProperty(defaultChecked)&&(hasSrc=props[defaultChecked],null!=hasSrc))switch(defaultChecked){case "children":case "dangerouslySetInnerHTML":throw Error(formatProdErrorMessage(137,tag));default:setProp(domElement,tag,defaultChecked,hasSrc,props,null);}return;default:if(isCustomElement(tag)){for(propValue$188 in props)props.hasOwnProperty(propValue$188)&&(hasSrc=props[propValue$188],void 0!==hasSrc&&setPropOnCustomElement(domElement,tag,propValue$188,hasSrc,props,void 0));return;}}for(defaultValue in props)props.hasOwnProperty(defaultValue)&&(hasSrc=props[defaultValue],null!=hasSrc&&setProp(domElement,tag,defaultValue,hasSrc,props,null));}function updateProperties(domElement,tag,lastProps,nextProps){switch(tag){case "div":case "span":case "svg":case "path":case "a":case "g":case "p":case "li":break;case "input":var name=null,type=null,value=null,defaultValue=null,lastDefaultValue=null,checked=null,defaultChecked=null;for(propKey in lastProps){var lastProp=lastProps[propKey];if(lastProps.hasOwnProperty(propKey)&&null!=lastProp)switch(propKey){case "checked":break;case "value":break;case "defaultValue":lastDefaultValue=lastProp;default:nextProps.hasOwnProperty(propKey)||setProp(domElement,tag,propKey,null,nextProps,lastProp);}}for(var propKey$205 in nextProps){var propKey=nextProps[propKey$205];lastProp=lastProps[propKey$205];if(nextProps.hasOwnProperty(propKey$205)&&(null!=propKey||null!=lastProp))switch(propKey$205){case "type":type=propKey;break;case "name":name=propKey;break;case "checked":checked=propKey;break;case "defaultChecked":defaultChecked=propKey;break;case "value":value=propKey;break;case "defaultValue":defaultValue=propKey;break;case "children":case "dangerouslySetInnerHTML":if(null!=propKey)throw Error(formatProdErrorMessage(137,tag));break;default:propKey!==lastProp&&setProp(domElement,tag,propKey$205,propKey,nextProps,lastProp);}}updateInput(domElement,value,defaultValue,lastDefaultValue,checked,defaultChecked,type,name);return;case "select":propKey=value=defaultValue=propKey$205=null;for(type in lastProps)if(lastDefaultValue=lastProps[type],lastProps.hasOwnProperty(type)&&null!=lastDefaultValue)switch(type){case "value":break;case "multiple":propKey=lastDefaultValue;default:nextProps.hasOwnProperty(type)||setProp(domElement,tag,type,null,nextProps,lastDefaultValue);}for(name in nextProps)if(type=nextProps[name],lastDefaultValue=lastProps[name],nextProps.hasOwnProperty(name)&&(null!=type||null!=lastDefaultValue))switch(name){case "value":propKey$205=type;break;case "defaultValue":defaultValue=type;break;case "multiple":value=type;default:type!==lastDefaultValue&&setProp(domElement,tag,name,type,nextProps,lastDefaultValue);}tag=defaultValue;lastProps=value;nextProps=propKey;null!=propKey$205?updateOptions(domElement,!!lastProps,propKey$205,false):!!nextProps!==!!lastProps&&(null!=tag?updateOptions(domElement,!!lastProps,tag,true):updateOptions(domElement,!!lastProps,lastProps?[]:"",false));return;case "textarea":propKey=propKey$205=null;for(defaultValue in lastProps)if(name=lastProps[defaultValue],lastProps.hasOwnProperty(defaultValue)&&null!=name&&!nextProps.hasOwnProperty(defaultValue))switch(defaultValue){case "value":break;case "children":break;default:setProp(domElement,tag,defaultValue,null,nextProps,name);}for(value in nextProps)if(name=nextProps[value],type=lastProps[value],nextProps.hasOwnProperty(value)&&(null!=name||null!=type))switch(value){case "value":propKey$205=name;break;case "defaultValue":propKey=name;break;case "children":break;case "dangerouslySetInnerHTML":if(null!=name)throw Error(formatProdErrorMessage(91));break;default:name!==type&&setProp(domElement,tag,value,name,nextProps,type);}updateTextarea(domElement,propKey$205,propKey);return;case "option":for(var propKey$221 in lastProps)if(propKey$205=lastProps[propKey$221],lastProps.hasOwnProperty(propKey$221)&&null!=propKey$205&&!nextProps.hasOwnProperty(propKey$221))switch(propKey$221){case "selected":domElement.selected=false;break;default:setProp(domElement,tag,propKey$221,null,nextProps,propKey$205);}for(lastDefaultValue in nextProps)if(propKey$205=nextProps[lastDefaultValue],propKey=lastProps[lastDefaultValue],nextProps.hasOwnProperty(lastDefaultValue)&&propKey$205!==propKey&&(null!=propKey$205||null!=propKey))switch(lastDefaultValue){case "selected":domElement.selected=propKey$205&&"function"!==typeof propKey$205&&"symbol"!==typeof propKey$205;break;default:setProp(domElement,tag,lastDefaultValue,propKey$205,nextProps,propKey);}return;case "img":case "link":case "area":case "base":case "br":case "col":case "embed":case "hr":case "keygen":case "meta":case "param":case "source":case "track":case "wbr":case "menuitem":for(var propKey$226 in lastProps)propKey$205=lastProps[propKey$226],lastProps.hasOwnProperty(propKey$226)&&null!=propKey$205&&!nextProps.hasOwnProperty(propKey$226)&&setProp(domElement,tag,propKey$226,null,nextProps,propKey$205);for(checked in nextProps)if(propKey$205=nextProps[checked],propKey=lastProps[checked],nextProps.hasOwnProperty(checked)&&propKey$205!==propKey&&(null!=propKey$205||null!=propKey))switch(checked){case "children":case "dangerouslySetInnerHTML":if(null!=propKey$205)throw Error(formatProdErrorMessage(137,tag));break;default:setProp(domElement,tag,checked,propKey$205,nextProps,propKey);}return;default:if(isCustomElement(tag)){for(var propKey$231 in lastProps)propKey$205=lastProps[propKey$231],lastProps.hasOwnProperty(propKey$231)&&void 0!==propKey$205&&!nextProps.hasOwnProperty(propKey$231)&&setPropOnCustomElement(domElement,tag,propKey$231,void 0,nextProps,propKey$205);for(defaultChecked in nextProps)propKey$205=nextProps[defaultChecked],propKey=lastProps[defaultChecked],!nextProps.hasOwnProperty(defaultChecked)||propKey$205===propKey||void 0===propKey$205&&void 0===propKey||setPropOnCustomElement(domElement,tag,defaultChecked,propKey$205,nextProps,propKey);return;}}for(var propKey$236 in lastProps)propKey$205=lastProps[propKey$236],lastProps.hasOwnProperty(propKey$236)&&null!=propKey$205&&!nextProps.hasOwnProperty(propKey$236)&&setProp(domElement,tag,propKey$236,null,nextProps,propKey$205);for(lastProp in nextProps)propKey$205=nextProps[lastProp],propKey=lastProps[lastProp],!nextProps.hasOwnProperty(lastProp)||propKey$205===propKey||null==propKey$205&&null==propKey||setProp(domElement,tag,lastProp,propKey$205,nextProps,propKey);}var eventsEnabled=null,selectionInformation=null;function getOwnerDocumentFromRootContainer(rootContainerElement){return 9===rootContainerElement.nodeType?rootContainerElement:rootContainerElement.ownerDocument;}function getOwnHostContext(namespaceURI){switch(namespaceURI){case "http://www.w3.org/2000/svg":return 1;case "http://www.w3.org/1998/Math/MathML":return 2;default:return 0;}}function getChildHostContextProd(parentNamespace,type){if(0===parentNamespace)switch(type){case "svg":return 1;case "math":return 2;default:return 0;}return 1===parentNamespace&&"foreignObject"===type?0:parentNamespace;}function shouldSetTextContent(type,props){return "textarea"===type||"noscript"===type||"string"===typeof props.children||"number"===typeof props.children||"bigint"===typeof props.children||"object"===typeof props.dangerouslySetInnerHTML&&null!==props.dangerouslySetInnerHTML&&null!=props.dangerouslySetInnerHTML.__html;}var currentPopstateTransitionEvent=null;function shouldAttemptEagerTransition(){var event=window.event;if(event&&"popstate"===event.type){if(event===currentPopstateTransitionEvent)return  false;currentPopstateTransitionEvent=event;return  true;}currentPopstateTransitionEvent=null;return  false;}var scheduleTimeout="function"===typeof setTimeout?setTimeout:void 0,cancelTimeout="function"===typeof clearTimeout?clearTimeout:void 0,localPromise="function"===typeof Promise?Promise:void 0,scheduleMicrotask="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof localPromise?function(callback){return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);}:scheduleTimeout;function handleErrorInNextTick(error){setTimeout(function(){throw error;});}function isSingletonScope(type){return "head"===type;}function clearSuspenseBoundary(parentInstance,suspenseInstance){var node=suspenseInstance,possiblePreambleContribution=0,depth=0;do{var nextNode=node.nextSibling;parentInstance.removeChild(node);if(nextNode&&8===nextNode.nodeType){if(node=nextNode.data,"/$"===node){if(0<possiblePreambleContribution&&8>possiblePreambleContribution){node=possiblePreambleContribution;var ownerDocument=parentInstance.ownerDocument;node&1&&releaseSingletonInstance(ownerDocument.documentElement);node&2&&releaseSingletonInstance(ownerDocument.body);if(node&4)for(node=ownerDocument.head,releaseSingletonInstance(node),ownerDocument=node.firstChild;ownerDocument;){var nextNode$jscomp$0=ownerDocument.nextSibling,nodeName=ownerDocument.nodeName;ownerDocument[internalHoistableMarker]||"SCRIPT"===nodeName||"STYLE"===nodeName||"LINK"===nodeName&&"stylesheet"===ownerDocument.rel.toLowerCase()||node.removeChild(ownerDocument);ownerDocument=nextNode$jscomp$0;}}if(0===depth){parentInstance.removeChild(nextNode);retryIfBlockedOn(suspenseInstance);return;}depth--;}else "$"===node||"$?"===node||"$!"===node?depth++:possiblePreambleContribution=node.charCodeAt(0)-48;}else possiblePreambleContribution=0;node=nextNode;}while(node);retryIfBlockedOn(suspenseInstance);}function clearContainerSparingly(container){var nextNode=container.firstChild;nextNode&&10===nextNode.nodeType&&(nextNode=nextNode.nextSibling);for(;nextNode;){var node=nextNode;nextNode=nextNode.nextSibling;switch(node.nodeName){case "HTML":case "HEAD":case "BODY":clearContainerSparingly(node);detachDeletedInstance(node);continue;case "SCRIPT":case "STYLE":continue;case "LINK":if("stylesheet"===node.rel.toLowerCase())continue;}container.removeChild(node);}}function canHydrateInstance(instance,type,props,inRootOrSingleton){for(;1===instance.nodeType;){var anyProps=props;if(instance.nodeName.toLowerCase()!==type.toLowerCase()){if(!inRootOrSingleton&&("INPUT"!==instance.nodeName||"hidden"!==instance.type))break;}else if(!inRootOrSingleton){if("input"===type&&"hidden"===instance.type){var name=null==anyProps.name?null:""+anyProps.name;if("hidden"===anyProps.type&&instance.getAttribute("name")===name)return instance;}else return instance;}else if(!instance[internalHoistableMarker])switch(type){case "meta":if(!instance.hasAttribute("itemprop"))break;return instance;case "link":name=instance.getAttribute("rel");if("stylesheet"===name&&instance.hasAttribute("data-precedence"))break;else if(name!==anyProps.rel||instance.getAttribute("href")!==(null==anyProps.href||""===anyProps.href?null:anyProps.href)||instance.getAttribute("crossorigin")!==(null==anyProps.crossOrigin?null:anyProps.crossOrigin)||instance.getAttribute("title")!==(null==anyProps.title?null:anyProps.title))break;return instance;case "style":if(instance.hasAttribute("data-precedence"))break;return instance;case "script":name=instance.getAttribute("src");if((name!==(null==anyProps.src?null:anyProps.src)||instance.getAttribute("type")!==(null==anyProps.type?null:anyProps.type)||instance.getAttribute("crossorigin")!==(null==anyProps.crossOrigin?null:anyProps.crossOrigin))&&name&&instance.hasAttribute("async")&&!instance.hasAttribute("itemprop"))break;return instance;default:return instance;}instance=getNextHydratable(instance.nextSibling);if(null===instance)break;}return null;}function canHydrateTextInstance(instance,text,inRootOrSingleton){if(""===text)return null;for(;3!==instance.nodeType;){if((1!==instance.nodeType||"INPUT"!==instance.nodeName||"hidden"!==instance.type)&&!inRootOrSingleton)return null;instance=getNextHydratable(instance.nextSibling);if(null===instance)return null;}return instance;}function isSuspenseInstanceFallback(instance){return "$!"===instance.data||"$?"===instance.data&&"complete"===instance.ownerDocument.readyState;}function registerSuspenseInstanceRetry(instance,callback){var ownerDocument=instance.ownerDocument;if("$?"!==instance.data||"complete"===ownerDocument.readyState)callback();else {var listener=function(){callback();ownerDocument.removeEventListener("DOMContentLoaded",listener);};ownerDocument.addEventListener("DOMContentLoaded",listener);instance._reactRetry=listener;}}function getNextHydratable(node){for(;null!=node;node=node.nextSibling){var nodeType=node.nodeType;if(1===nodeType||3===nodeType)break;if(8===nodeType){nodeType=node.data;if("$"===nodeType||"$!"===nodeType||"$?"===nodeType||"F!"===nodeType||"F"===nodeType)break;if("/$"===nodeType)return null;}}return node;}var previousHydratableOnEnteringScopedSingleton=null;function getParentSuspenseInstance(targetInstance){targetInstance=targetInstance.previousSibling;for(var depth=0;targetInstance;){if(8===targetInstance.nodeType){var data=targetInstance.data;if("$"===data||"$!"===data||"$?"===data){if(0===depth)return targetInstance;depth--;}else "/$"===data&&depth++;}targetInstance=targetInstance.previousSibling;}return null;}function resolveSingletonInstance(type,props,rootContainerInstance){props=getOwnerDocumentFromRootContainer(rootContainerInstance);switch(type){case "html":type=props.documentElement;if(!type)throw Error(formatProdErrorMessage(452));return type;case "head":type=props.head;if(!type)throw Error(formatProdErrorMessage(453));return type;case "body":type=props.body;if(!type)throw Error(formatProdErrorMessage(454));return type;default:throw Error(formatProdErrorMessage(451));}}function releaseSingletonInstance(instance){for(var attributes=instance.attributes;attributes.length;)instance.removeAttributeNode(attributes[0]);detachDeletedInstance(instance);}var preloadPropsMap=new Map(),preconnectsSet=new Set();function getHoistableRoot(container){return "function"===typeof container.getRootNode?container.getRootNode():9===container.nodeType?container:container.ownerDocument;}var previousDispatcher=ReactDOMSharedInternals.d;ReactDOMSharedInternals.d={f:flushSyncWork,r:requestFormReset,D:prefetchDNS,C:preconnect,L:preload,m:preloadModule,X:preinitScript,S:preinitStyle,M:preinitModuleScript};function flushSyncWork(){var previousWasRendering=previousDispatcher.f(),wasRendering=flushSyncWork$1();return previousWasRendering||wasRendering;}function requestFormReset(form){var formInst=getInstanceFromNode(form);null!==formInst&&5===formInst.tag&&"form"===formInst.type?requestFormReset$1(formInst):previousDispatcher.r(form);}var globalDocument="undefined"===typeof document?null:document;function preconnectAs(rel,href,crossOrigin){var ownerDocument=globalDocument;if(ownerDocument&&"string"===typeof href&&href){var limitedEscapedHref=escapeSelectorAttributeValueInsideDoubleQuotes(href);limitedEscapedHref='link[rel="'+rel+'"][href="'+limitedEscapedHref+'"]';"string"===typeof crossOrigin&&(limitedEscapedHref+='[crossorigin="'+crossOrigin+'"]');preconnectsSet.has(limitedEscapedHref)||(preconnectsSet.add(limitedEscapedHref),rel={rel:rel,crossOrigin:crossOrigin,href:href},null===ownerDocument.querySelector(limitedEscapedHref)&&(href=ownerDocument.createElement("link"),setInitialProperties(href,"link",rel),markNodeAsHoistable(href),ownerDocument.head.appendChild(href)));}}function prefetchDNS(href){previousDispatcher.D(href);preconnectAs("dns-prefetch",href,null);}function preconnect(href,crossOrigin){previousDispatcher.C(href,crossOrigin);preconnectAs("preconnect",href,crossOrigin);}function preload(href,as,options){previousDispatcher.L(href,as,options);var ownerDocument=globalDocument;if(ownerDocument&&href&&as){var preloadSelector='link[rel="preload"][as="'+escapeSelectorAttributeValueInsideDoubleQuotes(as)+'"]';"image"===as?options&&options.imageSrcSet?(preloadSelector+='[imagesrcset="'+escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSrcSet)+'"]',"string"===typeof options.imageSizes&&(preloadSelector+='[imagesizes="'+escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSizes)+'"]')):preloadSelector+='[href="'+escapeSelectorAttributeValueInsideDoubleQuotes(href)+'"]':preloadSelector+='[href="'+escapeSelectorAttributeValueInsideDoubleQuotes(href)+'"]';var key=preloadSelector;switch(as){case "style":key=getStyleKey(href);break;case "script":key=getScriptKey(href);}preloadPropsMap.has(key)||(href=assign({rel:"preload",href:"image"===as&&options&&options.imageSrcSet?void 0:href,as:as},options),preloadPropsMap.set(key,href),null!==ownerDocument.querySelector(preloadSelector)||"style"===as&&ownerDocument.querySelector(getStylesheetSelectorFromKey(key))||"script"===as&&ownerDocument.querySelector(getScriptSelectorFromKey(key))||(as=ownerDocument.createElement("link"),setInitialProperties(as,"link",href),markNodeAsHoistable(as),ownerDocument.head.appendChild(as)));}}function preloadModule(href,options){previousDispatcher.m(href,options);var ownerDocument=globalDocument;if(ownerDocument&&href){var as=options&&"string"===typeof options.as?options.as:"script",preloadSelector='link[rel="modulepreload"][as="'+escapeSelectorAttributeValueInsideDoubleQuotes(as)+'"][href="'+escapeSelectorAttributeValueInsideDoubleQuotes(href)+'"]',key=preloadSelector;switch(as){case "audioworklet":case "paintworklet":case "serviceworker":case "sharedworker":case "worker":case "script":key=getScriptKey(href);}if(!preloadPropsMap.has(key)&&(href=assign({rel:"modulepreload",href:href},options),preloadPropsMap.set(key,href),null===ownerDocument.querySelector(preloadSelector))){switch(as){case "audioworklet":case "paintworklet":case "serviceworker":case "sharedworker":case "worker":case "script":if(ownerDocument.querySelector(getScriptSelectorFromKey(key)))return;}as=ownerDocument.createElement("link");setInitialProperties(as,"link",href);markNodeAsHoistable(as);ownerDocument.head.appendChild(as);}}}function preinitStyle(href,precedence,options){previousDispatcher.S(href,precedence,options);var ownerDocument=globalDocument;if(ownerDocument&&href){var styles=getResourcesFromRoot(ownerDocument).hoistableStyles,key=getStyleKey(href);precedence=precedence||"default";var resource=styles.get(key);if(!resource){var state={loading:0,preload:null};if(resource=ownerDocument.querySelector(getStylesheetSelectorFromKey(key)))state.loading=5;else {href=assign({rel:"stylesheet",href:href,"data-precedence":precedence},options);(options=preloadPropsMap.get(key))&&adoptPreloadPropsForStylesheet(href,options);var link=resource=ownerDocument.createElement("link");markNodeAsHoistable(link);setInitialProperties(link,"link",href);link._p=new Promise(function(resolve,reject){link.onload=resolve;link.onerror=reject;});link.addEventListener("load",function(){state.loading|=1;});link.addEventListener("error",function(){state.loading|=2;});state.loading|=4;insertStylesheet(resource,precedence,ownerDocument);}resource={type:"stylesheet",instance:resource,count:1,state:state};styles.set(key,resource);}}}function preinitScript(src,options){previousDispatcher.X(src,options);var ownerDocument=globalDocument;if(ownerDocument&&src){var scripts=getResourcesFromRoot(ownerDocument).hoistableScripts,key=getScriptKey(src),resource=scripts.get(key);resource||(resource=ownerDocument.querySelector(getScriptSelectorFromKey(key)),resource||(src=assign({src:src,async:true},options),(options=preloadPropsMap.get(key))&&adoptPreloadPropsForScript(src,options),resource=ownerDocument.createElement("script"),markNodeAsHoistable(resource),setInitialProperties(resource,"link",src),ownerDocument.head.appendChild(resource)),resource={type:"script",instance:resource,count:1,state:null},scripts.set(key,resource));}}function preinitModuleScript(src,options){previousDispatcher.M(src,options);var ownerDocument=globalDocument;if(ownerDocument&&src){var scripts=getResourcesFromRoot(ownerDocument).hoistableScripts,key=getScriptKey(src),resource=scripts.get(key);resource||(resource=ownerDocument.querySelector(getScriptSelectorFromKey(key)),resource||(src=assign({src:src,async:true,type:"module"},options),(options=preloadPropsMap.get(key))&&adoptPreloadPropsForScript(src,options),resource=ownerDocument.createElement("script"),markNodeAsHoistable(resource),setInitialProperties(resource,"link",src),ownerDocument.head.appendChild(resource)),resource={type:"script",instance:resource,count:1,state:null},scripts.set(key,resource));}}function getResource(type,currentProps,pendingProps,currentResource){var JSCompiler_inline_result=(JSCompiler_inline_result=rootInstanceStackCursor.current)?getHoistableRoot(JSCompiler_inline_result):null;if(!JSCompiler_inline_result)throw Error(formatProdErrorMessage(446));switch(type){case "meta":case "title":return null;case "style":return "string"===typeof pendingProps.precedence&&"string"===typeof pendingProps.href?(currentProps=getStyleKey(pendingProps.href),pendingProps=getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles,currentResource=pendingProps.get(currentProps),currentResource||(currentResource={type:"style",instance:null,count:0,state:null},pendingProps.set(currentProps,currentResource)),currentResource):{type:"void",instance:null,count:0,state:null};case "link":if("stylesheet"===pendingProps.rel&&"string"===typeof pendingProps.href&&"string"===typeof pendingProps.precedence){type=getStyleKey(pendingProps.href);var styles$244=getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles,resource$245=styles$244.get(type);resource$245||(JSCompiler_inline_result=JSCompiler_inline_result.ownerDocument||JSCompiler_inline_result,resource$245={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},styles$244.set(type,resource$245),(styles$244=JSCompiler_inline_result.querySelector(getStylesheetSelectorFromKey(type)))&&!styles$244._p&&(resource$245.instance=styles$244,resource$245.state.loading=5),preloadPropsMap.has(type)||(pendingProps={rel:"preload",as:"style",href:pendingProps.href,crossOrigin:pendingProps.crossOrigin,integrity:pendingProps.integrity,media:pendingProps.media,hrefLang:pendingProps.hrefLang,referrerPolicy:pendingProps.referrerPolicy},preloadPropsMap.set(type,pendingProps),styles$244||preloadStylesheet(JSCompiler_inline_result,type,pendingProps,resource$245.state)));if(currentProps&&null===currentResource)throw Error(formatProdErrorMessage(528,""));return resource$245;}if(currentProps&&null!==currentResource)throw Error(formatProdErrorMessage(529,""));return null;case "script":return currentProps=pendingProps.async,pendingProps=pendingProps.src,"string"===typeof pendingProps&&currentProps&&"function"!==typeof currentProps&&"symbol"!==typeof currentProps?(currentProps=getScriptKey(pendingProps),pendingProps=getResourcesFromRoot(JSCompiler_inline_result).hoistableScripts,currentResource=pendingProps.get(currentProps),currentResource||(currentResource={type:"script",instance:null,count:0,state:null},pendingProps.set(currentProps,currentResource)),currentResource):{type:"void",instance:null,count:0,state:null};default:throw Error(formatProdErrorMessage(444,type));}}function getStyleKey(href){return 'href="'+escapeSelectorAttributeValueInsideDoubleQuotes(href)+'"';}function getStylesheetSelectorFromKey(key){return 'link[rel="stylesheet"]['+key+"]";}function stylesheetPropsFromRawProps(rawProps){return assign({},rawProps,{"data-precedence":rawProps.precedence,precedence:null});}function preloadStylesheet(ownerDocument,key,preloadProps,state){ownerDocument.querySelector('link[rel="preload"][as="style"]['+key+"]")?state.loading=1:(key=ownerDocument.createElement("link"),state.preload=key,key.addEventListener("load",function(){return state.loading|=1;}),key.addEventListener("error",function(){return state.loading|=2;}),setInitialProperties(key,"link",preloadProps),markNodeAsHoistable(key),ownerDocument.head.appendChild(key));}function getScriptKey(src){return '[src="'+escapeSelectorAttributeValueInsideDoubleQuotes(src)+'"]';}function getScriptSelectorFromKey(key){return "script[async]"+key;}function acquireResource(hoistableRoot,resource,props){resource.count++;if(null===resource.instance)switch(resource.type){case "style":var instance=hoistableRoot.querySelector('style[data-href~="'+escapeSelectorAttributeValueInsideDoubleQuotes(props.href)+'"]');if(instance)return resource.instance=instance,markNodeAsHoistable(instance),instance;var styleProps=assign({},props,{"data-href":props.href,"data-precedence":props.precedence,href:null,precedence:null});instance=(hoistableRoot.ownerDocument||hoistableRoot).createElement("style");markNodeAsHoistable(instance);setInitialProperties(instance,"style",styleProps);insertStylesheet(instance,props.precedence,hoistableRoot);return resource.instance=instance;case "stylesheet":styleProps=getStyleKey(props.href);var instance$250=hoistableRoot.querySelector(getStylesheetSelectorFromKey(styleProps));if(instance$250)return resource.state.loading|=4,resource.instance=instance$250,markNodeAsHoistable(instance$250),instance$250;instance=stylesheetPropsFromRawProps(props);(styleProps=preloadPropsMap.get(styleProps))&&adoptPreloadPropsForStylesheet(instance,styleProps);instance$250=(hoistableRoot.ownerDocument||hoistableRoot).createElement("link");markNodeAsHoistable(instance$250);var linkInstance=instance$250;linkInstance._p=new Promise(function(resolve,reject){linkInstance.onload=resolve;linkInstance.onerror=reject;});setInitialProperties(instance$250,"link",instance);resource.state.loading|=4;insertStylesheet(instance$250,props.precedence,hoistableRoot);return resource.instance=instance$250;case "script":instance$250=getScriptKey(props.src);if(styleProps=hoistableRoot.querySelector(getScriptSelectorFromKey(instance$250)))return resource.instance=styleProps,markNodeAsHoistable(styleProps),styleProps;instance=props;if(styleProps=preloadPropsMap.get(instance$250))instance=assign({},props),adoptPreloadPropsForScript(instance,styleProps);hoistableRoot=hoistableRoot.ownerDocument||hoistableRoot;styleProps=hoistableRoot.createElement("script");markNodeAsHoistable(styleProps);setInitialProperties(styleProps,"link",instance);hoistableRoot.head.appendChild(styleProps);return resource.instance=styleProps;case "void":return null;default:throw Error(formatProdErrorMessage(443,resource.type));}else "stylesheet"===resource.type&&0===(resource.state.loading&4)&&(instance=resource.instance,resource.state.loading|=4,insertStylesheet(instance,props.precedence,hoistableRoot));return resource.instance;}function insertStylesheet(instance,precedence,root){for(var nodes=root.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),last=nodes.length?nodes[nodes.length-1]:null,prior=last,i=0;i<nodes.length;i++){var node=nodes[i];if(node.dataset.precedence===precedence)prior=node;else if(prior!==last)break;}prior?prior.parentNode.insertBefore(instance,prior.nextSibling):(precedence=9===root.nodeType?root.head:root,precedence.insertBefore(instance,precedence.firstChild));}function adoptPreloadPropsForStylesheet(stylesheetProps,preloadProps){null==stylesheetProps.crossOrigin&&(stylesheetProps.crossOrigin=preloadProps.crossOrigin);null==stylesheetProps.referrerPolicy&&(stylesheetProps.referrerPolicy=preloadProps.referrerPolicy);null==stylesheetProps.title&&(stylesheetProps.title=preloadProps.title);}function adoptPreloadPropsForScript(scriptProps,preloadProps){null==scriptProps.crossOrigin&&(scriptProps.crossOrigin=preloadProps.crossOrigin);null==scriptProps.referrerPolicy&&(scriptProps.referrerPolicy=preloadProps.referrerPolicy);null==scriptProps.integrity&&(scriptProps.integrity=preloadProps.integrity);}var tagCaches=null;function getHydratableHoistableCache(type,keyAttribute,ownerDocument){if(null===tagCaches){var cache=new Map();var caches=tagCaches=new Map();caches.set(ownerDocument,cache);}else caches=tagCaches,cache=caches.get(ownerDocument),cache||(cache=new Map(),caches.set(ownerDocument,cache));if(cache.has(type))return cache;cache.set(type,null);ownerDocument=ownerDocument.getElementsByTagName(type);for(caches=0;caches<ownerDocument.length;caches++){var node=ownerDocument[caches];if(!(node[internalHoistableMarker]||node[internalInstanceKey]||"link"===type&&"stylesheet"===node.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==node.namespaceURI){var nodeKey=node.getAttribute(keyAttribute)||"";nodeKey=type+nodeKey;var existing=cache.get(nodeKey);existing?existing.push(node):cache.set(nodeKey,[node]);}}return cache;}function mountHoistable(hoistableRoot,type,instance){hoistableRoot=hoistableRoot.ownerDocument||hoistableRoot;hoistableRoot.head.insertBefore(instance,"title"===type?hoistableRoot.querySelector("head > title"):null);}function isHostHoistableType(type,props,hostContext){if(1===hostContext||null!=props.itemProp)return  false;switch(type){case "meta":case "title":return  true;case "style":if("string"!==typeof props.precedence||"string"!==typeof props.href||""===props.href)break;return  true;case "link":if("string"!==typeof props.rel||"string"!==typeof props.href||""===props.href||props.onLoad||props.onError)break;switch(props.rel){case "stylesheet":return type=props.disabled,"string"===typeof props.precedence&&null==type;default:return  true;}case "script":if(props.async&&"function"!==typeof props.async&&"symbol"!==typeof props.async&&!props.onLoad&&!props.onError&&props.src&&"string"===typeof props.src)return  true;}return  false;}function preloadResource(resource){return "stylesheet"===resource.type&&0===(resource.state.loading&3)?false:true;}var suspendedState=null;function noop(){}function suspendResource(hoistableRoot,resource,props){if(null===suspendedState)throw Error(formatProdErrorMessage(475));var state=suspendedState;if("stylesheet"===resource.type&&("string"!==typeof props.media||false!==matchMedia(props.media).matches)&&0===(resource.state.loading&4)){if(null===resource.instance){var key=getStyleKey(props.href),instance=hoistableRoot.querySelector(getStylesheetSelectorFromKey(key));if(instance){hoistableRoot=instance._p;null!==hoistableRoot&&"object"===typeof hoistableRoot&&"function"===typeof hoistableRoot.then&&(state.count++,state=onUnsuspend.bind(state),hoistableRoot.then(state,state));resource.state.loading|=4;resource.instance=instance;markNodeAsHoistable(instance);return;}instance=hoistableRoot.ownerDocument||hoistableRoot;props=stylesheetPropsFromRawProps(props);(key=preloadPropsMap.get(key))&&adoptPreloadPropsForStylesheet(props,key);instance=instance.createElement("link");markNodeAsHoistable(instance);var linkInstance=instance;linkInstance._p=new Promise(function(resolve,reject){linkInstance.onload=resolve;linkInstance.onerror=reject;});setInitialProperties(instance,"link",props);resource.instance=instance;}null===state.stylesheets&&(state.stylesheets=new Map());state.stylesheets.set(resource,hoistableRoot);(hoistableRoot=resource.state.preload)&&0===(resource.state.loading&3)&&(state.count++,resource=onUnsuspend.bind(state),hoistableRoot.addEventListener("load",resource),hoistableRoot.addEventListener("error",resource));}}function waitForCommitToBeReady(){if(null===suspendedState)throw Error(formatProdErrorMessage(475));var state=suspendedState;state.stylesheets&&0===state.count&&insertSuspendedStylesheets(state,state.stylesheets);return 0<state.count?function(commit){var stylesheetTimer=setTimeout(function(){state.stylesheets&&insertSuspendedStylesheets(state,state.stylesheets);if(state.unsuspend){var unsuspend=state.unsuspend;state.unsuspend=null;unsuspend();}},6e4);state.unsuspend=commit;return function(){state.unsuspend=null;clearTimeout(stylesheetTimer);};}:null;}function onUnsuspend(){this.count--;if(0===this.count)if(this.stylesheets)insertSuspendedStylesheets(this,this.stylesheets);else if(this.unsuspend){var unsuspend=this.unsuspend;this.unsuspend=null;unsuspend();}}var precedencesByRoot=null;function insertSuspendedStylesheets(state,resources){state.stylesheets=null;null!==state.unsuspend&&(state.count++,precedencesByRoot=new Map(),resources.forEach(insertStylesheetIntoRoot,state),precedencesByRoot=null,onUnsuspend.call(state));}function insertStylesheetIntoRoot(root,resource){if(!(resource.state.loading&4)){var precedences=precedencesByRoot.get(root);if(precedences)var last=precedences.get(null);else {precedences=new Map();precedencesByRoot.set(root,precedences);for(var nodes=root.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<nodes.length;i++){var node=nodes[i];if("LINK"===node.nodeName||"not all"!==node.getAttribute("media"))precedences.set(node.dataset.precedence,node),last=node;}last&&precedences.set(null,last);}nodes=resource.instance;node=nodes.getAttribute("data-precedence");i=precedences.get(node)||last;i===last&&precedences.set(null,nodes);precedences.set(node,nodes);this.count++;last=onUnsuspend.bind(this);nodes.addEventListener("load",last);nodes.addEventListener("error",last);i?i.parentNode.insertBefore(nodes,i.nextSibling):(root=9===root.nodeType?root.head:root,root.insertBefore(nodes,root.firstChild));resource.state.loading|=4;}}var HostTransitionContext={$$typeof:REACT_CONTEXT_TYPE,Provider:null,Consumer:null,_currentValue:sharedNotPendingObject,_currentValue2:sharedNotPendingObject,_threadCount:0};function FiberRootNode(containerInfo,tag,hydrate,identifierPrefix,onUncaughtError,onCaughtError,onRecoverableError,formState){this.tag=1;this.containerInfo=containerInfo;this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null;this.callbackPriority=0;this.expirationTimes=createLaneMap(-1);this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=createLaneMap(0);this.hiddenUpdates=createLaneMap(null);this.identifierPrefix=identifierPrefix;this.onUncaughtError=onUncaughtError;this.onCaughtError=onCaughtError;this.onRecoverableError=onRecoverableError;this.pooledCache=null;this.pooledCacheLanes=0;this.formState=formState;this.incompleteTransitions=new Map();}function createFiberRoot(containerInfo,tag,hydrate,initialChildren,hydrationCallbacks,isStrictMode,identifierPrefix,onUncaughtError,onCaughtError,onRecoverableError,transitionCallbacks,formState){containerInfo=new FiberRootNode(containerInfo,tag,hydrate,identifierPrefix,onUncaughtError,onCaughtError,onRecoverableError,formState);tag=1;true===isStrictMode&&(tag|=24);isStrictMode=createFiberImplClass(3,null,null,tag);containerInfo.current=isStrictMode;isStrictMode.stateNode=containerInfo;tag=createCache();tag.refCount++;containerInfo.pooledCache=tag;tag.refCount++;isStrictMode.memoizedState={element:initialChildren,isDehydrated:hydrate,cache:tag};initializeUpdateQueue(isStrictMode);return containerInfo;}function getContextForSubtree(parentComponent){if(!parentComponent)return emptyContextObject;parentComponent=emptyContextObject;return parentComponent;}function updateContainerImpl(rootFiber,lane,element,container,parentComponent,callback){parentComponent=getContextForSubtree(parentComponent);null===container.context?container.context=parentComponent:container.pendingContext=parentComponent;container=createUpdate(lane);container.payload={element:element};callback=void 0===callback?null:callback;null!==callback&&(container.callback=callback);element=enqueueUpdate(rootFiber,container,lane);null!==element&&(scheduleUpdateOnFiber(element,rootFiber,lane),entangleTransitions(element,rootFiber,lane));}function markRetryLaneImpl(fiber,retryLane){fiber=fiber.memoizedState;if(null!==fiber&&null!==fiber.dehydrated){var a=fiber.retryLane;fiber.retryLane=0!==a&&a<retryLane?a:retryLane;}}function markRetryLaneIfNotHydrated(fiber,retryLane){markRetryLaneImpl(fiber,retryLane);(fiber=fiber.alternate)&&markRetryLaneImpl(fiber,retryLane);}function attemptContinuousHydration(fiber){if(13===fiber.tag){var root=enqueueConcurrentRenderForLane(fiber,67108864);null!==root&&scheduleUpdateOnFiber(root,fiber,67108864);markRetryLaneIfNotHydrated(fiber,67108864);}}var _enabled=true;function dispatchDiscreteEvent(domEventName,eventSystemFlags,container,nativeEvent){var prevTransition=ReactSharedInternals.T;ReactSharedInternals.T=null;var previousPriority=ReactDOMSharedInternals.p;try{ReactDOMSharedInternals.p=2,dispatchEvent(domEventName,eventSystemFlags,container,nativeEvent);}finally{ReactDOMSharedInternals.p=previousPriority,ReactSharedInternals.T=prevTransition;}}function dispatchContinuousEvent(domEventName,eventSystemFlags,container,nativeEvent){var prevTransition=ReactSharedInternals.T;ReactSharedInternals.T=null;var previousPriority=ReactDOMSharedInternals.p;try{ReactDOMSharedInternals.p=8,dispatchEvent(domEventName,eventSystemFlags,container,nativeEvent);}finally{ReactDOMSharedInternals.p=previousPriority,ReactSharedInternals.T=prevTransition;}}function dispatchEvent(domEventName,eventSystemFlags,targetContainer,nativeEvent){if(_enabled){var blockedOn=findInstanceBlockingEvent(nativeEvent);if(null===blockedOn)dispatchEventForPluginEventSystem(domEventName,eventSystemFlags,nativeEvent,return_targetInst,targetContainer),clearIfContinuousEvent(domEventName,nativeEvent);else if(queueIfContinuousEvent(blockedOn,domEventName,eventSystemFlags,targetContainer,nativeEvent))nativeEvent.stopPropagation();else if(clearIfContinuousEvent(domEventName,nativeEvent),eventSystemFlags&4&&-1<discreteReplayableEvents.indexOf(domEventName)){for(;null!==blockedOn;){var fiber=getInstanceFromNode(blockedOn);if(null!==fiber)switch(fiber.tag){case 3:fiber=fiber.stateNode;if(fiber.current.memoizedState.isDehydrated){var lanes=getHighestPriorityLanes(fiber.pendingLanes);if(0!==lanes){var root=fiber;root.pendingLanes|=2;for(root.entangledLanes|=2;lanes;){var lane=1<<31-clz32(lanes);root.entanglements[1]|=lane;lanes&=~lane;}ensureRootIsScheduled(fiber);0===(executionContext&6)&&(workInProgressRootRenderTargetTime=now()+500,flushSyncWorkAcrossRoots_impl(0));}}break;case 13:root=enqueueConcurrentRenderForLane(fiber,2),null!==root&&scheduleUpdateOnFiber(root,fiber,2),flushSyncWork$1(),markRetryLaneIfNotHydrated(fiber,2);}fiber=findInstanceBlockingEvent(nativeEvent);null===fiber&&dispatchEventForPluginEventSystem(domEventName,eventSystemFlags,nativeEvent,return_targetInst,targetContainer);if(fiber===blockedOn)break;blockedOn=fiber;}null!==blockedOn&&nativeEvent.stopPropagation();}else dispatchEventForPluginEventSystem(domEventName,eventSystemFlags,nativeEvent,null,targetContainer);}}function findInstanceBlockingEvent(nativeEvent){nativeEvent=getEventTarget(nativeEvent);return findInstanceBlockingTarget(nativeEvent);}var return_targetInst=null;function findInstanceBlockingTarget(targetNode){return_targetInst=null;targetNode=getClosestInstanceFromNode(targetNode);if(null!==targetNode){var nearestMounted=getNearestMountedFiber(targetNode);if(null===nearestMounted)targetNode=null;else {var tag=nearestMounted.tag;if(13===tag){targetNode=getSuspenseInstanceFromFiber(nearestMounted);if(null!==targetNode)return targetNode;targetNode=null;}else if(3===tag){if(nearestMounted.stateNode.current.memoizedState.isDehydrated)return 3===nearestMounted.tag?nearestMounted.stateNode.containerInfo:null;targetNode=null;}else nearestMounted!==targetNode&&(targetNode=null);}}return_targetInst=targetNode;return null;}function getEventPriority(domEventName){switch(domEventName){case "beforetoggle":case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "toggle":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 2;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 8;case "message":switch(getCurrentPriorityLevel()){case ImmediatePriority:return 2;case UserBlockingPriority:return 8;case NormalPriority$1:case LowPriority:return 32;case IdlePriority:return 268435456;default:return 32;}default:return 32;}}var hasScheduledReplayAttempt=false,queuedFocus=null,queuedDrag=null,queuedMouse=null,queuedPointers=new Map(),queuedPointerCaptures=new Map(),queuedExplicitHydrationTargets=[],discreteReplayableEvents="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function clearIfContinuousEvent(domEventName,nativeEvent){switch(domEventName){case "focusin":case "focusout":queuedFocus=null;break;case "dragenter":case "dragleave":queuedDrag=null;break;case "mouseover":case "mouseout":queuedMouse=null;break;case "pointerover":case "pointerout":queuedPointers.delete(nativeEvent.pointerId);break;case "gotpointercapture":case "lostpointercapture":queuedPointerCaptures.delete(nativeEvent.pointerId);}}function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent,blockedOn,domEventName,eventSystemFlags,targetContainer,nativeEvent){if(null===existingQueuedEvent||existingQueuedEvent.nativeEvent!==nativeEvent)return existingQueuedEvent={blockedOn:blockedOn,domEventName:domEventName,eventSystemFlags:eventSystemFlags,nativeEvent:nativeEvent,targetContainers:[targetContainer]},null!==blockedOn&&(blockedOn=getInstanceFromNode(blockedOn),null!==blockedOn&&attemptContinuousHydration(blockedOn)),existingQueuedEvent;existingQueuedEvent.eventSystemFlags|=eventSystemFlags;blockedOn=existingQueuedEvent.targetContainers;null!==targetContainer&&-1===blockedOn.indexOf(targetContainer)&&blockedOn.push(targetContainer);return existingQueuedEvent;}function queueIfContinuousEvent(blockedOn,domEventName,eventSystemFlags,targetContainer,nativeEvent){switch(domEventName){case "focusin":return queuedFocus=accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus,blockedOn,domEventName,eventSystemFlags,targetContainer,nativeEvent),true;case "dragenter":return queuedDrag=accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag,blockedOn,domEventName,eventSystemFlags,targetContainer,nativeEvent),true;case "mouseover":return queuedMouse=accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse,blockedOn,domEventName,eventSystemFlags,targetContainer,nativeEvent),true;case "pointerover":var pointerId=nativeEvent.pointerId;queuedPointers.set(pointerId,accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId)||null,blockedOn,domEventName,eventSystemFlags,targetContainer,nativeEvent));return  true;case "gotpointercapture":return pointerId=nativeEvent.pointerId,queuedPointerCaptures.set(pointerId,accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(pointerId)||null,blockedOn,domEventName,eventSystemFlags,targetContainer,nativeEvent)),true;}return  false;}function attemptExplicitHydrationTarget(queuedTarget){var targetInst=getClosestInstanceFromNode(queuedTarget.target);if(null!==targetInst){var nearestMounted=getNearestMountedFiber(targetInst);if(null!==nearestMounted)if(targetInst=nearestMounted.tag,13===targetInst){if(targetInst=getSuspenseInstanceFromFiber(nearestMounted),null!==targetInst){queuedTarget.blockedOn=targetInst;runWithPriority(queuedTarget.priority,function(){if(13===nearestMounted.tag){var lane=requestUpdateLane();lane=getBumpedLaneForHydrationByLane(lane);var root=enqueueConcurrentRenderForLane(nearestMounted,lane);null!==root&&scheduleUpdateOnFiber(root,nearestMounted,lane);markRetryLaneIfNotHydrated(nearestMounted,lane);}});return;}}else if(3===targetInst&&nearestMounted.stateNode.current.memoizedState.isDehydrated){queuedTarget.blockedOn=3===nearestMounted.tag?nearestMounted.stateNode.containerInfo:null;return;}}queuedTarget.blockedOn=null;}function attemptReplayContinuousQueuedEvent(queuedEvent){if(null!==queuedEvent.blockedOn)return  false;for(var targetContainers=queuedEvent.targetContainers;0<targetContainers.length;){var nextBlockedOn=findInstanceBlockingEvent(queuedEvent.nativeEvent);if(null===nextBlockedOn){nextBlockedOn=queuedEvent.nativeEvent;var nativeEventClone=new nextBlockedOn.constructor(nextBlockedOn.type,nextBlockedOn);currentReplayingEvent=nativeEventClone;nextBlockedOn.target.dispatchEvent(nativeEventClone);currentReplayingEvent=null;}else return targetContainers=getInstanceFromNode(nextBlockedOn),null!==targetContainers&&attemptContinuousHydration(targetContainers),queuedEvent.blockedOn=nextBlockedOn,false;targetContainers.shift();}return  true;}function attemptReplayContinuousQueuedEventInMap(queuedEvent,key,map){attemptReplayContinuousQueuedEvent(queuedEvent)&&map.delete(key);}function replayUnblockedEvents(){hasScheduledReplayAttempt=false;null!==queuedFocus&&attemptReplayContinuousQueuedEvent(queuedFocus)&&(queuedFocus=null);null!==queuedDrag&&attemptReplayContinuousQueuedEvent(queuedDrag)&&(queuedDrag=null);null!==queuedMouse&&attemptReplayContinuousQueuedEvent(queuedMouse)&&(queuedMouse=null);queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);}function scheduleCallbackIfUnblocked(queuedEvent,unblocked){queuedEvent.blockedOn===unblocked&&(queuedEvent.blockedOn=null,hasScheduledReplayAttempt||(hasScheduledReplayAttempt=true,Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority,replayUnblockedEvents)));}var lastScheduledReplayQueue=null;function scheduleReplayQueueIfNeeded(formReplayingQueue){lastScheduledReplayQueue!==formReplayingQueue&&(lastScheduledReplayQueue=formReplayingQueue,Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority,function(){lastScheduledReplayQueue===formReplayingQueue&&(lastScheduledReplayQueue=null);for(var i=0;i<formReplayingQueue.length;i+=3){var form=formReplayingQueue[i],submitterOrAction=formReplayingQueue[i+1],formData=formReplayingQueue[i+2];if("function"!==typeof submitterOrAction)if(null===findInstanceBlockingTarget(submitterOrAction||form))continue;else break;var formInst=getInstanceFromNode(form);null!==formInst&&(formReplayingQueue.splice(i,3),i-=3,startHostTransition(formInst,{pending:true,data:formData,method:form.method,action:submitterOrAction},submitterOrAction,formData));}}));}function retryIfBlockedOn(unblocked){function unblock(queuedEvent){return scheduleCallbackIfUnblocked(queuedEvent,unblocked);}null!==queuedFocus&&scheduleCallbackIfUnblocked(queuedFocus,unblocked);null!==queuedDrag&&scheduleCallbackIfUnblocked(queuedDrag,unblocked);null!==queuedMouse&&scheduleCallbackIfUnblocked(queuedMouse,unblocked);queuedPointers.forEach(unblock);queuedPointerCaptures.forEach(unblock);for(var i=0;i<queuedExplicitHydrationTargets.length;i++){var queuedTarget=queuedExplicitHydrationTargets[i];queuedTarget.blockedOn===unblocked&&(queuedTarget.blockedOn=null);}for(;0<queuedExplicitHydrationTargets.length&&(i=queuedExplicitHydrationTargets[0],null===i.blockedOn);)attemptExplicitHydrationTarget(i),null===i.blockedOn&&queuedExplicitHydrationTargets.shift();i=(unblocked.ownerDocument||unblocked).$$reactFormReplay;if(null!=i)for(queuedTarget=0;queuedTarget<i.length;queuedTarget+=3){var form=i[queuedTarget],submitterOrAction=i[queuedTarget+1],formProps=form[internalPropsKey]||null;if("function"===typeof submitterOrAction)formProps||scheduleReplayQueueIfNeeded(i);else if(formProps){var action=null;if(submitterOrAction&&submitterOrAction.hasAttribute("formAction")){if(form=submitterOrAction,formProps=submitterOrAction[internalPropsKey]||null)action=formProps.formAction;else {if(null!==findInstanceBlockingTarget(form))continue;}}else action=formProps.action;"function"===typeof action?i[queuedTarget+1]=action:(i.splice(queuedTarget,3),queuedTarget-=3);scheduleReplayQueueIfNeeded(i);}}}function ReactDOMRoot(internalRoot){this._internalRoot=internalRoot;}ReactDOMHydrationRoot.prototype.render=ReactDOMRoot.prototype.render=function(children){var root=this._internalRoot;if(null===root)throw Error(formatProdErrorMessage(409));var current=root.current,lane=requestUpdateLane();updateContainerImpl(current,lane,children,root,null,null);};ReactDOMHydrationRoot.prototype.unmount=ReactDOMRoot.prototype.unmount=function(){var root=this._internalRoot;if(null!==root){this._internalRoot=null;var container=root.containerInfo;updateContainerImpl(root.current,2,null,root,null,null);flushSyncWork$1();container[internalContainerInstanceKey]=null;}};function ReactDOMHydrationRoot(internalRoot){this._internalRoot=internalRoot;}ReactDOMHydrationRoot.prototype.unstable_scheduleHydration=function(target){if(target){var updatePriority=resolveUpdatePriority();target={blockedOn:null,target:target,priority:updatePriority};for(var i=0;i<queuedExplicitHydrationTargets.length&&0!==updatePriority&&updatePriority<queuedExplicitHydrationTargets[i].priority;i++);queuedExplicitHydrationTargets.splice(i,0,target);0===i&&attemptExplicitHydrationTarget(target);}};var isomorphicReactPackageVersion$jscomp$inline_1785=React.version;if("19.1.0"!==isomorphicReactPackageVersion$jscomp$inline_1785)throw Error(formatProdErrorMessage(527,isomorphicReactPackageVersion$jscomp$inline_1785,"19.1.0"));ReactDOMSharedInternals.findDOMNode=function(componentOrElement){var fiber=componentOrElement._reactInternals;if(void 0===fiber){if("function"===typeof componentOrElement.render)throw Error(formatProdErrorMessage(188));componentOrElement=Object.keys(componentOrElement).join(",");throw Error(formatProdErrorMessage(268,componentOrElement));}componentOrElement=findCurrentFiberUsingSlowPath(fiber);componentOrElement=null!==componentOrElement?findCurrentHostFiberImpl(componentOrElement):null;componentOrElement=null===componentOrElement?null:componentOrElement.stateNode;return componentOrElement;};var internals$jscomp$inline_2256={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:ReactSharedInternals,reconcilerVersion:"19.1.0"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var hook$jscomp$inline_2257=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hook$jscomp$inline_2257.isDisabled&&hook$jscomp$inline_2257.supportsFiber)try{rendererID=hook$jscomp$inline_2257.inject(internals$jscomp$inline_2256),injectedHook=hook$jscomp$inline_2257;}catch(err){}}reactDomClient_production.createRoot=function(container,options){if(!isValidContainer(container))throw Error(formatProdErrorMessage(299));var isStrictMode=false,identifierPrefix="",onUncaughtError=defaultOnUncaughtError,onCaughtError=defaultOnCaughtError,onRecoverableError=defaultOnRecoverableError,transitionCallbacks=null;null!==options&&void 0!==options&&(true===options.unstable_strictMode&&(isStrictMode=true),void 0!==options.identifierPrefix&&(identifierPrefix=options.identifierPrefix),void 0!==options.onUncaughtError&&(onUncaughtError=options.onUncaughtError),void 0!==options.onCaughtError&&(onCaughtError=options.onCaughtError),void 0!==options.onRecoverableError&&(onRecoverableError=options.onRecoverableError),void 0!==options.unstable_transitionCallbacks&&(transitionCallbacks=options.unstable_transitionCallbacks));options=createFiberRoot(container,1,false,null,null,isStrictMode,identifierPrefix,onUncaughtError,onCaughtError,onRecoverableError,transitionCallbacks,null);container[internalContainerInstanceKey]=options.current;listenToAllSupportedEvents(container);return new ReactDOMRoot(options);};reactDomClient_production.hydrateRoot=function(container,initialChildren,options){if(!isValidContainer(container))throw Error(formatProdErrorMessage(299));var isStrictMode=false,identifierPrefix="",onUncaughtError=defaultOnUncaughtError,onCaughtError=defaultOnCaughtError,onRecoverableError=defaultOnRecoverableError,transitionCallbacks=null,formState=null;null!==options&&void 0!==options&&(true===options.unstable_strictMode&&(isStrictMode=true),void 0!==options.identifierPrefix&&(identifierPrefix=options.identifierPrefix),void 0!==options.onUncaughtError&&(onUncaughtError=options.onUncaughtError),void 0!==options.onCaughtError&&(onCaughtError=options.onCaughtError),void 0!==options.onRecoverableError&&(onRecoverableError=options.onRecoverableError),void 0!==options.unstable_transitionCallbacks&&(transitionCallbacks=options.unstable_transitionCallbacks),void 0!==options.formState&&(formState=options.formState));initialChildren=createFiberRoot(container,1,true,initialChildren,null!=options?options:null,isStrictMode,identifierPrefix,onUncaughtError,onCaughtError,onRecoverableError,transitionCallbacks,formState);initialChildren.context=getContextForSubtree(null);options=initialChildren.current;isStrictMode=requestUpdateLane();isStrictMode=getBumpedLaneForHydrationByLane(isStrictMode);identifierPrefix=createUpdate(isStrictMode);identifierPrefix.callback=null;enqueueUpdate(options,identifierPrefix,isStrictMode);options=isStrictMode;initialChildren.current.lanes=options;markRootUpdated$1(initialChildren,options);ensureRootIsScheduled(initialChildren);container[internalContainerInstanceKey]=initialChildren.current;listenToAllSupportedEvents(container);return new ReactDOMHydrationRoot(initialChildren);};reactDomClient_production.version="19.1.0";
	return reactDomClient_production;
}

var hasRequiredClient;

function requireClient () {
	if (hasRequiredClient) return client.exports;
	hasRequiredClient = 1;

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
	    return;
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}
	{
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  client.exports = requireReactDomClient_production();
	}
	return client.exports;
}

var clientExports = requireClient();
var ReactDOM = /*@__PURE__*/getDefaultExportFromCjs(clientExports);

// src/utilities/base-path.ts
var basePath = "";
function setBasePath(path) {
  basePath = path;
}
function getBasePath(subpath = "") {
  if (!basePath) {
    const scripts = [...document.getElementsByTagName("script")];
    const configScript = scripts.find(script => script.hasAttribute("data-shoelace"));
    if (configScript) {
      setBasePath(configScript.getAttribute("data-shoelace"));
    } else {
      const fallbackScript = scripts.find(s => {
        return /shoelace(\.min)?\.js($|\?)/.test(s.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src);
      });
      let path = "";
      if (fallbackScript) {
        path = fallbackScript.getAttribute("src");
      }
      setBasePath(path.split("/").slice(0, -1).join("/"));
    }
  }
  return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : ``);
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __typeError = msg => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)) {
    if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = globalThis,
  e$7 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  s$1 = Symbol(),
  o$5 = new WeakMap();
let n$4 = class n {
  constructor(t, e, o) {
    if (this._$cssResult$ = true, o !== s$1) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e$7 && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = o$5.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && o$5.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const r$5 = t => new n$4("string" == typeof t ? t : t + "", void 0, s$1),
  i$5 = (t, ...e) => {
    const o = 1 === t.length ? t[0] : e.reduce((e, s, o) => e + (t => {
      if (true === t._$cssResult$) return t.cssText;
      if ("number" == typeof t) return t;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s) + t[o + 1], t[0]);
    return new n$4(o, t, s$1);
  },
  S$1 = (s, o) => {
    if (e$7) s.adoptedStyleSheets = o.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet);else for (const e of o) {
      const o = document.createElement("style"),
        n = t$2.litNonce;
      void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
  },
  c$2 = e$7 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
    let e = "";
    for (const s of t.cssRules) e += s.cssText;
    return r$5(e);
  })(t) : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {
    is: i$4,
    defineProperty: e$6,
    getOwnPropertyDescriptor: r$4,
    getOwnPropertyNames: h$1,
    getOwnPropertySymbols: o$4,
    getPrototypeOf: n$3
  } = Object,
  a$2 = globalThis,
  c$1 = a$2.trustedTypes,
  l$3 = c$1 ? c$1.emptyScript : "",
  p$1 = a$2.reactiveElementPolyfillSupport,
  d$1 = (t, s) => t,
  u$3 = {
    toAttribute(t, s) {
      switch (s) {
        case Boolean:
          t = t ? l$3 : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, s) {
      let i = t;
      switch (s) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (t) {
            i = null;
          }
      }
      return i;
    }
  },
  f$2 = (t, s) => !i$4(t, s),
  y$1 = {
    attribute: true,
    type: String,
    converter: u$3,
    reflect: false,
    hasChanged: f$2
  };
Symbol.metadata ??= Symbol("metadata"), a$2.litPropertyMetadata ??= new WeakMap();
class b extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = y$1) {
    if (s.state && (s.attribute = false), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(),
        r = this.getPropertyDescriptor(t, i, s);
      void 0 !== r && e$6(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const {
      get: e,
      set: h
    } = r$4(this.prototype, t) ?? {
      get() {
        return this[s];
      },
      set(t) {
        this[s] = t;
      }
    };
    return {
      get() {
        return e?.call(this);
      },
      set(s) {
        const r = e?.call(this);
        h.call(this, s), this.requestUpdate(t, r, i);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? y$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t = n$3(this);
    t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t = this.properties,
        s = [...h$1(t), ...o$4(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const s = litPropertyMetadata.get(t);
      if (void 0 !== s) for (const [t, i] of s) this.elementProperties.set(t, i);
    }
    this._$Eh = new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      void 0 !== i && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s) {
    const i = [];
    if (Array.isArray(s)) {
      const e = new Set(s.flat(1 / 0).reverse());
      for (const s of e) i.unshift(c$2(s));
    } else void 0 !== s && i.push(c$2(s));
    return i;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return false === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(t => t(this));
  }
  addController(t) {
    (this._$EO ??= new Set()).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = new Map(),
      s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach(t => t.hostConnected?.());
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this._$EO?.forEach(t => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$EC(t, s) {
    const i = this.constructor.elementProperties.get(t),
      e = this.constructor._$Eu(t, i);
    if (void 0 !== e && true === i.reflect) {
      const r = (void 0 !== i.converter?.toAttribute ? i.converter : u$3).toAttribute(s, i.type);
      this._$Em = t, null == r ? this.removeAttribute(e) : this.setAttribute(e, r), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const i = this.constructor,
      e = i._$Eh.get(t);
    if (void 0 !== e && this._$Em !== e) {
      const t = i.getPropertyOptions(e),
        r = "function" == typeof t.converter ? {
          fromAttribute: t.converter
        } : void 0 !== t.converter?.fromAttribute ? t.converter : u$3;
      this._$Em = e, this[e] = r.fromAttribute(s, t.type), this._$Em = null;
    }
  }
  requestUpdate(t, s, i) {
    if (void 0 !== t) {
      if (i ??= this.constructor.getPropertyOptions(t), !(i.hasChanged ?? f$2)(this[t], s)) return;
      this.P(t, s, i);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t, s, i) {
    this._$AL.has(t) || this._$AL.set(t, s), true === i.reflect && this._$Em !== t && (this._$Ej ??= new Set()).add(t);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t, s] of this._$Ep) this[t] = s;
        this._$Ep = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0) for (const [s, i] of t) true !== i.wrapped || this._$AL.has(s) || void 0 === this[s] || this.P(s, this[s], i);
    }
    let t = false;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach(t => t.hostUpdate?.()), this.update(s)) : this._$EU();
    } catch (s) {
      throw t = false, this._$EU(), s;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    this._$EO?.forEach(t => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return true;
  }
  update(t) {
    this._$Ej &&= this._$Ej.forEach(t => this._$EC(t, this[t])), this._$EU();
  }
  updated(t) {}
  firstUpdated(t) {}
}
b.elementStyles = [], b.shadowRootOptions = {
  mode: "open"
}, b[d$1("elementProperties")] = new Map(), b[d$1("finalized")] = new Map(), p$1?.({
  ReactiveElement: b
}), (a$2.reactiveElementVersions ??= []).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis,
  i$3 = t$1.trustedTypes,
  s = i$3 ? i$3.createPolicy("lit-html", {
    createHTML: t => t
  }) : void 0,
  e$5 = "$lit$",
  h = `lit$${Math.random().toFixed(9).slice(2)}$`,
  o$3 = "?" + h,
  n$2 = `<${o$3}>`,
  r$3 = document,
  l$2 = () => r$3.createComment(""),
  c = t => null === t || "object" != typeof t && "function" != typeof t,
  a$1 = Array.isArray,
  u$2 = t => a$1(t) || "function" == typeof t?.[Symbol.iterator],
  d = "[ \t\n\f\r]",
  f$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  v = /-->/g,
  _ = />/g,
  m$1 = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
  p = /'/g,
  g = /"/g,
  $ = /^(?:script|style|textarea|title)$/i,
  y = t => (i, ...s) => ({
    _$litType$: t,
    strings: i,
    values: s
  }),
  x = y(1),
  T = Symbol.for("lit-noChange"),
  E = Symbol.for("lit-nothing"),
  A = new WeakMap(),
  C = r$3.createTreeWalker(r$3, 129);
function P(t, i) {
  if (!a$1(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s ? s.createHTML(i) : i;
}
const V = (t, i) => {
  const s = t.length - 1,
    o = [];
  let r,
    l = 2 === i ? "<svg>" : 3 === i ? "<math>" : "",
    c = f$1;
  for (let i = 0; i < s; i++) {
    const s = t[i];
    let a,
      u,
      d = -1,
      y = 0;
    for (; y < s.length && (c.lastIndex = y, u = c.exec(s), null !== u);) y = c.lastIndex, c === f$1 ? "!--" === u[1] ? c = v : void 0 !== u[1] ? c = _ : void 0 !== u[2] ? ($.test(u[2]) && (r = RegExp("</" + u[2], "g")), c = m$1) : void 0 !== u[3] && (c = m$1) : c === m$1 ? ">" === u[0] ? (c = r ?? f$1, d = -1) : void 0 === u[1] ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = void 0 === u[3] ? m$1 : '"' === u[3] ? g : p) : c === g || c === p ? c = m$1 : c === v || c === _ ? c = f$1 : (c = m$1, r = void 0);
    const x = c === m$1 && t[i + 1].startsWith("/>") ? " " : "";
    l += c === f$1 ? s + n$2 : d >= 0 ? (o.push(a), s.slice(0, d) + e$5 + s.slice(d) + h + x) : s + h + (-2 === d ? i : x);
  }
  return [P(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")), o];
};
class N {
  constructor({
    strings: t,
    _$litType$: s
  }, n) {
    let r;
    this.parts = [];
    let c = 0,
      a = 0;
    const u = t.length - 1,
      d = this.parts,
      [f, v] = V(t, s);
    if (this.el = N.createElement(f, n), C.currentNode = this.el.content, 2 === s || 3 === s) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (; null !== (r = C.nextNode()) && d.length < u;) {
      if (1 === r.nodeType) {
        if (r.hasAttributes()) for (const t of r.getAttributeNames()) if (t.endsWith(e$5)) {
          const i = v[a++],
            s = r.getAttribute(t).split(h),
            e = /([.?@])?(.*)/.exec(i);
          d.push({
            type: 1,
            index: c,
            name: e[2],
            strings: s,
            ctor: "." === e[1] ? H : "?" === e[1] ? I : "@" === e[1] ? L : k
          }), r.removeAttribute(t);
        } else t.startsWith(h) && (d.push({
          type: 6,
          index: c
        }), r.removeAttribute(t));
        if ($.test(r.tagName)) {
          const t = r.textContent.split(h),
            s = t.length - 1;
          if (s > 0) {
            r.textContent = i$3 ? i$3.emptyScript : "";
            for (let i = 0; i < s; i++) r.append(t[i], l$2()), C.nextNode(), d.push({
              type: 2,
              index: ++c
            });
            r.append(t[s], l$2());
          }
        }
      } else if (8 === r.nodeType) if (r.data === o$3) d.push({
        type: 2,
        index: c
      });else {
        let t = -1;
        for (; -1 !== (t = r.data.indexOf(h, t + 1));) d.push({
          type: 7,
          index: c
        }), t += h.length - 1;
      }
      c++;
    }
  }
  static createElement(t, i) {
    const s = r$3.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(t, i, s = t, e) {
  if (i === T) return i;
  let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
  const o = c(i) ? void 0 : i._$litDirective$;
  return h?.constructor !== o && (h?._$AO?.(false), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? (s._$Co ??= [])[e] = h : s._$Cl = h), void 0 !== h && (i = S(t, h._$AS(t, i.values), h, e)), i;
}
class M {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const {
        el: {
          content: i
        },
        parts: s
      } = this._$AD,
      e = (t?.creationScope ?? r$3).importNode(i, true);
    C.currentNode = e;
    let h = C.nextNode(),
      o = 0,
      n = 0,
      l = s[0];
    for (; void 0 !== l;) {
      if (o === l.index) {
        let i;
        2 === l.type ? i = new R(h, h.nextSibling, this, t) : 1 === l.type ? i = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (i = new z(h, this, t)), this._$AV.push(i), l = s[++n];
      }
      o !== l?.index && (h = C.nextNode(), o++);
    }
    return C.currentNode = r$3, e;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, e) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? true;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = S(this, t, i), c(t) ? t === E || null == t || "" === t ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== T && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : u$2(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== E && c(this._$AH) ? this._$AA.nextSibling.data = t : this.T(r$3.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const {
        values: i,
        _$litType$: s
      } = t,
      e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = N.createElement(P(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === e) this._$AH.p(i);else {
      const t = new M(e, this),
        s = t.u(this.options);
      t.p(i), this.T(s), this._$AH = t;
    }
  }
  _$AC(t) {
    let i = A.get(t.strings);
    return void 0 === i && A.set(t.strings, i = new N(t)), i;
  }
  k(t) {
    a$1(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const h of t) e === i.length ? i.push(s = new R(this.O(l$2()), this.O(l$2()), this, this.options)) : s = i[e], s._$AI(h), e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(false, true, i); t && t !== this._$AB;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
  }
}
class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, e, h) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = E;
  }
  _$AI(t, i = this, s, e) {
    const h = this.strings;
    let o = false;
    if (void 0 === h) t = S(this, t, i, 0), o = !c(t) || t !== this._$AH && t !== T, o && (this._$AH = t);else {
      const e = t;
      let n, r;
      for (t = h[0], n = 0; n < h.length - 1; n++) r = S(this, e[s + n], i, n), r === T && (r = this._$AH[n]), o ||= !c(r) || r !== this._$AH[n], r === E ? t = E : t !== E && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
    }
    o && !e && this.j(t);
  }
  j(t) {
    t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class H extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === E ? void 0 : t;
  }
}
class I extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== E);
  }
}
class L extends k {
  constructor(t, i, s, e, h) {
    super(t, i, s, e, h), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = S(this, t, i, 0) ?? E) === T) return;
    const s = this._$AH,
      e = t === E && s !== E || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
      h = t !== E && (s === E || e);
    e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class z {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const j = t$1.litHtmlPolyfillSupport;
j?.(N, R), (t$1.litHtmlVersions ??= []).push("3.2.1");
const B = (t, i, s) => {
  const e = s?.renderBefore ?? i;
  let h = e._$litPart$;
  if (void 0 === h) {
    const t = s?.renderBefore ?? null;
    e._$litPart$ = h = new R(i.insertBefore(l$2(), t), t, void 0, s ?? {});
  }
  return h._$AI(t), h;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let r$2 = class r extends b {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = B(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return T;
  }
};
r$2._$litElement$ = true, r$2["finalized"] = true, globalThis.litElementHydrateSupport?.({
  LitElement: r$2
});
const i$2 = globalThis.litElementPolyfillSupport;
i$2?.({
  LitElement: r$2
});
(globalThis.litElementVersions ??= []).push("4.1.1");

// src/components/card/card.styles.ts
var card_styles_default = i$5`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`;

// src/internal/slot.ts
var HasSlotController = class {
  constructor(host, ...slotNames) {
    this.slotNames = [];
    this.handleSlotChange = event => {
      const slot = event.target;
      if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
        this.host.requestUpdate();
      }
    };
    (this.host = host).addController(this);
    this.slotNames = slotNames;
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some(node => {
      if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node;
        const tagName = el.tagName.toLowerCase();
        if (tagName === "sl-visually-hidden") {
          return false;
        }
        if (!el.hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }
  hasNamedSlot(name) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
  }
  test(slotName) {
    return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
};

// src/styles/component.styles.ts
var component_styles_default = i$5`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$2 = {
    attribute: true,
    type: String,
    converter: u$3,
    reflect: false,
    hasChanged: f$2
  },
  r$1 = (t = o$2, e, r) => {
    const {
      kind: n,
      metadata: i
    } = r;
    let s = globalThis.litPropertyMetadata.get(i);
    if (void 0 === s && globalThis.litPropertyMetadata.set(i, s = new Map()), s.set(r.name, t), "accessor" === n) {
      const {
        name: o
      } = r;
      return {
        set(r) {
          const n = e.get.call(this);
          e.set.call(this, r), this.requestUpdate(o, n, t);
        },
        init(e) {
          return void 0 !== e && this.P(o, void 0, t), e;
        }
      };
    }
    if ("setter" === n) {
      const {
        name: o
      } = r;
      return function (r) {
        const n = this[o];
        e.call(this, r), this.requestUpdate(o, n, t);
      };
    }
    throw Error("Unsupported decorator location: " + n);
  };
function n$1(t) {
  return (e, o) => "object" == typeof o ? r$1(t, e, o) : ((t, e, o) => {
    const r = e.hasOwnProperty(o);
    return e.constructor.createProperty(o, r ? {
      ...t,
      wrapped: true
    } : t), r ? Object.getOwnPropertyDescriptor(e, o) : void 0;
  })(t, e, o);
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r) {
  return n$1({
    ...r,
    state: true,
    attribute: false
  });
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$4 = (e, t, c) => (c.configurable = true, c.enumerable = true, Reflect.decorate && "object" != typeof t && Object.defineProperty(e, t, c), c);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$3(e, r) {
  return (n, s, i) => {
    const o = t => t.renderRoot?.querySelector(e) ?? null;
    return e$4(n, s, {
      get() {
        return o(this);
      }
    });
  };
}

var _hasRecordedInitialProperties;
var ShoelaceElement = class extends r$2 {
  constructor() {
    super();
    __privateAdd(this, _hasRecordedInitialProperties, false);
    // Store the constructor value of all `static properties = {}`
    this.initialReflectedProperties = /* @__PURE__ */new Map();
    Object.entries(this.constructor.dependencies).forEach(([name, component]) => {
      this.constructor.define(name, component);
    });
  }
  emit(name, options) {
    const event = new CustomEvent(name, __spreadValues({
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {}
    }, options));
    this.dispatchEvent(event);
    return event;
  }
  /* eslint-enable */
  static define(name, elementConstructor = this, options = {}) {
    const currentlyRegisteredConstructor = customElements.get(name);
    if (!currentlyRegisteredConstructor) {
      try {
        customElements.define(name, elementConstructor, options);
      } catch (_err) {
        customElements.define(name, class extends elementConstructor {}, options);
      }
      return;
    }
    let newVersion = " (unknown version)";
    let existingVersion = newVersion;
    if ("version" in elementConstructor && elementConstructor.version) {
      newVersion = " v" + elementConstructor.version;
    }
    if ("version" in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
      existingVersion = " v" + currentlyRegisteredConstructor.version;
    }
    if (newVersion && existingVersion && newVersion === existingVersion) {
      return;
    }
    console.warn(`Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!__privateGet(this, _hasRecordedInitialProperties)) {
      this.constructor.elementProperties.forEach((obj, prop) => {
        if (obj.reflect && this[prop] != null) {
          this.initialReflectedProperties.set(prop, this[prop]);
        }
      });
      __privateSet(this, _hasRecordedInitialProperties, true);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    this.initialReflectedProperties.forEach((value, prop) => {
      if (changedProperties.has(prop) && this[prop] == null) {
        this[prop] = value;
      }
    });
  }
};
_hasRecordedInitialProperties = new WeakMap();
/* eslint-disable */
// @ts-expect-error This is auto-injected at build time.
ShoelaceElement.version = "2.20.1";
ShoelaceElement.dependencies = {};
__decorateClass([n$1()], ShoelaceElement.prototype, "dir", 2);
__decorateClass([n$1()], ShoelaceElement.prototype, "lang", 2);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = {
    ATTRIBUTE: 1,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4},
  e$2 = t => (...e) => ({
    _$litDirective$: t,
    values: e
  });
let i$1 = class i {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = e$2(class extends i$1 {
  constructor(t$1) {
    if (super(t$1), t$1.type !== t.ATTRIBUTE || "class" !== t$1.name || t$1.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(s => t[s]).join(" ") + " ";
  }
  update(s, [i]) {
    if (void 0 === this.st) {
      this.st = new Set(), void 0 !== s.strings && (this.nt = new Set(s.strings.join(" ").split(/\s/).filter(t => "" !== t)));
      for (const t in i) i[t] && !this.nt?.has(t) && this.st.add(t);
      return this.render(i);
    }
    const r = s.element.classList;
    for (const t of this.st) t in i || (r.remove(t), this.st.delete(t));
    for (const t in i) {
      const s = !!i[t];
      s === this.st.has(t) || this.nt?.has(t) || (s ? (r.add(t), this.st.add(t)) : (r.remove(t), this.st.delete(t)));
    }
    return T;
  }
});

var SlCard = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer", "header", "image");
  }
  render() {
    return x`
      <div
        part="base"
        class=${e$1({
      card: true,
      "card--has-footer": this.hasSlotController.test("footer"),
      "card--has-image": this.hasSlotController.test("image"),
      "card--has-header": this.hasSlotController.test("header")
    })}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `;
  }
};
SlCard.styles = [component_styles_default, card_styles_default];

SlCard.define("sl-card");

// src/components/input/input.styles.ts
var input_styles_default = i$5`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;

// src/internal/default-value.ts
var defaultValue = (propertyName = "value") => (proto, key) => {
  const ctor = proto.constructor;
  const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
  ctor.prototype.attributeChangedCallback = function (name, old, value) {
    var _a;
    const options = ctor.getPropertyOptions(propertyName);
    const attributeName = typeof options.attribute === "string" ? options.attribute : propertyName;
    if (name === attributeName) {
      const converter = options.converter || u$3;
      const fromAttribute = typeof converter === "function" ? converter : (_a = converter == null ? void 0 : converter.fromAttribute) != null ? _a : u$3.fromAttribute;
      const newValue = fromAttribute(value, options.type);
      if (this[propertyName] !== newValue) {
        this[key] = newValue;
      }
    }
    attributeChangedCallback.call(this, name, old, value);
  };
};

// src/styles/form-control.styles.ts
var form_control_styles_default = i$5`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;

// src/internal/form.ts
var formCollections = /* @__PURE__ */new WeakMap();
var reportValidityOverloads = /* @__PURE__ */new WeakMap();
var checkValidityOverloads = /* @__PURE__ */new WeakMap();
var userInteractedControls = /* @__PURE__ */new WeakSet();
var interactions = /* @__PURE__ */new WeakMap();
var FormControlController = class {
  constructor(host, options) {
    this.handleFormData = event => {
      const disabled = this.options.disabled(this.host);
      const name = this.options.name(this.host);
      const value = this.options.value(this.host);
      const isButton = this.host.tagName.toLowerCase() === "sl-button";
      if (this.host.isConnected && !disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
        if (Array.isArray(value)) {
          value.forEach(val => {
            event.formData.append(name, val.toString());
          });
        } else {
          event.formData.append(name, value.toString());
        }
      }
    };
    this.handleFormSubmit = event => {
      var _a;
      const disabled = this.options.disabled(this.host);
      const reportValidity = this.options.reportValidity;
      if (this.form && !this.form.noValidate) {
        (_a = formCollections.get(this.form)) == null ? void 0 : _a.forEach(control => {
          this.setUserInteracted(control, true);
        });
      }
      if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    this.handleFormReset = () => {
      this.options.setValue(this.host, this.options.defaultValue(this.host));
      this.setUserInteracted(this.host, false);
      interactions.set(this.host, []);
    };
    this.handleInteraction = event => {
      const emittedEvents = interactions.get(this.host);
      if (!emittedEvents.includes(event.type)) {
        emittedEvents.push(event.type);
      }
      if (emittedEvents.length === this.options.assumeInteractionOn.length) {
        this.setUserInteracted(this.host, true);
      }
    };
    this.checkFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const elements = this.form.querySelectorAll("*");
        for (const element of elements) {
          if (typeof element.checkValidity === "function") {
            if (!element.checkValidity()) {
              return false;
            }
          }
        }
      }
      return true;
    };
    this.reportFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const elements = this.form.querySelectorAll("*");
        for (const element of elements) {
          if (typeof element.reportValidity === "function") {
            if (!element.reportValidity()) {
              return false;
            }
          }
        }
      }
      return true;
    };
    (this.host = host).addController(this);
    this.options = __spreadValues({
      form: input => {
        const formId = input.form;
        if (formId) {
          const root = input.getRootNode();
          const form = root.querySelector(`#${formId}`);
          if (form) {
            return form;
          }
        }
        return input.closest("form");
      },
      name: input => input.name,
      value: input => input.value,
      defaultValue: input => input.defaultValue,
      disabled: input => {
        var _a;
        return (_a = input.disabled) != null ? _a : false;
      },
      reportValidity: input => typeof input.reportValidity === "function" ? input.reportValidity() : true,
      checkValidity: input => typeof input.checkValidity === "function" ? input.checkValidity() : true,
      setValue: (input, value) => input.value = value,
      assumeInteractionOn: ["sl-input"]
    }, options);
  }
  hostConnected() {
    const form = this.options.form(this.host);
    if (form) {
      this.attachForm(form);
    }
    interactions.set(this.host, []);
    this.options.assumeInteractionOn.forEach(event => {
      this.host.addEventListener(event, this.handleInteraction);
    });
  }
  hostDisconnected() {
    this.detachForm();
    interactions.delete(this.host);
    this.options.assumeInteractionOn.forEach(event => {
      this.host.removeEventListener(event, this.handleInteraction);
    });
  }
  hostUpdated() {
    const form = this.options.form(this.host);
    if (!form) {
      this.detachForm();
    }
    if (form && this.form !== form) {
      this.detachForm();
      this.attachForm(form);
    }
    if (this.host.hasUpdated) {
      this.setValidity(this.host.validity.valid);
    }
  }
  attachForm(form) {
    if (form) {
      this.form = form;
      if (formCollections.has(this.form)) {
        formCollections.get(this.form).add(this.host);
      } else {
        formCollections.set(this.form, /* @__PURE__ */new Set([this.host]));
      }
      this.form.addEventListener("formdata", this.handleFormData);
      this.form.addEventListener("submit", this.handleFormSubmit);
      this.form.addEventListener("reset", this.handleFormReset);
      if (!reportValidityOverloads.has(this.form)) {
        reportValidityOverloads.set(this.form, this.form.reportValidity);
        this.form.reportValidity = () => this.reportFormValidity();
      }
      if (!checkValidityOverloads.has(this.form)) {
        checkValidityOverloads.set(this.form, this.form.checkValidity);
        this.form.checkValidity = () => this.checkFormValidity();
      }
    } else {
      this.form = void 0;
    }
  }
  detachForm() {
    if (!this.form) return;
    const formCollection = formCollections.get(this.form);
    if (!formCollection) {
      return;
    }
    formCollection.delete(this.host);
    if (formCollection.size <= 0) {
      this.form.removeEventListener("formdata", this.handleFormData);
      this.form.removeEventListener("submit", this.handleFormSubmit);
      this.form.removeEventListener("reset", this.handleFormReset);
      if (reportValidityOverloads.has(this.form)) {
        this.form.reportValidity = reportValidityOverloads.get(this.form);
        reportValidityOverloads.delete(this.form);
      }
      if (checkValidityOverloads.has(this.form)) {
        this.form.checkValidity = checkValidityOverloads.get(this.form);
        checkValidityOverloads.delete(this.form);
      }
      this.form = void 0;
    }
  }
  setUserInteracted(el, hasInteracted) {
    if (hasInteracted) {
      userInteractedControls.add(el);
    } else {
      userInteractedControls.delete(el);
    }
    el.requestUpdate();
  }
  doAction(type, submitter) {
    if (this.form) {
      const button = document.createElement("button");
      button.type = type;
      button.style.position = "absolute";
      button.style.width = "0";
      button.style.height = "0";
      button.style.clipPath = "inset(50%)";
      button.style.overflow = "hidden";
      button.style.whiteSpace = "nowrap";
      if (submitter) {
        button.name = submitter.name;
        button.value = submitter.value;
        ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach(attr => {
          if (submitter.hasAttribute(attr)) {
            button.setAttribute(attr, submitter.getAttribute(attr));
          }
        });
      }
      this.form.append(button);
      button.click();
      button.remove();
    }
  }
  /** Returns the associated `<form>` element, if one exists. */
  getForm() {
    var _a;
    return (_a = this.form) != null ? _a : null;
  }
  /** Resets the form, restoring all the control to their default value */
  reset(submitter) {
    this.doAction("reset", submitter);
  }
  /** Submits the form, triggering validation and form data injection. */
  submit(submitter) {
    this.doAction("submit", submitter);
  }
  /**
   * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
   * the host element immediately, i.e. before Lit updates the component in the next update.
   */
  setValidity(isValid) {
    const host = this.host;
    const hasInteracted = Boolean(userInteractedControls.has(host));
    const required = Boolean(host.required);
    host.toggleAttribute("data-required", required);
    host.toggleAttribute("data-optional", !required);
    host.toggleAttribute("data-invalid", !isValid);
    host.toggleAttribute("data-valid", isValid);
    host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
    host.toggleAttribute("data-user-valid", isValid && hasInteracted);
  }
  /**
   * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
   * that affects constraint validation changes so the component receives the correct validity states.
   */
  updateValidity() {
    const host = this.host;
    this.setValidity(host.validity.valid);
  }
  /**
   * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
   * If the `sl-invalid` event will be cancelled then the original `invalid`
   * event (which may have been passed as argument) will also be cancelled.
   * If no original `invalid` event has been passed then the `sl-invalid`
   * event will be cancelled before being dispatched.
   */
  emitInvalidEvent(originalInvalidEvent) {
    const slInvalidEvent = new CustomEvent("sl-invalid", {
      bubbles: false,
      composed: false,
      cancelable: true,
      detail: {}
    });
    if (!originalInvalidEvent) {
      slInvalidEvent.preventDefault();
    }
    if (!this.host.dispatchEvent(slInvalidEvent)) {
      originalInvalidEvent == null ? void 0 : originalInvalidEvent.preventDefault();
    }
  }
};
var validValidityState = Object.freeze({
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false
});
Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
  valid: false,
  valueMissing: true
}));
Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
  valid: false,
  customError: true
}));

const connectedElements = new Set();
const translations = new Map();
let fallback;
let documentDirection = 'ltr';
let documentLanguage = 'en';
const isClient = typeof MutationObserver !== "undefined" && typeof document !== "undefined" && typeof document.documentElement !== "undefined";
if (isClient) {
  const documentElementObserver = new MutationObserver(update);
  documentDirection = document.documentElement.dir || 'ltr';
  documentLanguage = document.documentElement.lang || navigator.language;
  documentElementObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir', 'lang']
  });
}
function registerTranslation(...translation) {
  translation.map(t => {
    const code = t.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t));
    } else {
      translations.set(code, t);
    }
    if (!fallback) {
      fallback = t;
    }
  });
  update();
}
function update() {
  if (isClient) {
    documentDirection = document.documentElement.dir || 'ltr';
    documentLanguage = document.documentElement.lang || navigator.language;
  }
  [...connectedElements.keys()].map(el => {
    if (typeof el.requestUpdate === 'function') {
      el.requestUpdate();
    }
  });
}
let LocalizeController$1 = class LocalizeController {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    connectedElements.add(this.host);
  }
  hostDisconnected() {
    connectedElements.delete(this.host);
  }
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }
  getTranslationData(lang) {
    var _a, _b;
    const locale = new Intl.Locale(lang.replace(/_/g, '-'));
    const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
    const region = (_b = (_a = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
    const primary = translations.get(`${language}-${region}`);
    const secondary = translations.get(language);
    return {
      locale,
      language,
      region,
      primary,
      secondary
    };
  }
  exists(key, options) {
    var _a;
    const {
      primary,
      secondary
    } = this.getTranslationData((_a = options.lang) !== null && _a !== void 0 ? _a : this.lang());
    options = Object.assign({
      includeFallback: false
    }, options);
    if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
      return true;
    }
    return false;
  }
  term(key, ...args) {
    const {
      primary,
      secondary
    } = this.getTranslationData(this.lang());
    let term;
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key]) {
      term = fallback[key];
    } else {
      console.error(`No translation found for: ${String(key)}`);
      return String(key);
    }
    if (typeof term === 'function') {
      return term(...args);
    }
    return term;
  }
  date(dateToFormat, options) {
    dateToFormat = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
  }
  number(numberToFormat, options) {
    numberToFormat = Number(numberToFormat);
    return isNaN(numberToFormat) ? '' : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
  }
  relativeTime(value, unit, options) {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
};

// src/translations/en.ts
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  error: "Error",
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: num => {
    if (num === 0) return "No options selected";
    if (num === 1) return "1 option selected";
    return `${num} options selected`;
  },
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: "Toggle color format"
};
registerTranslation(translation);
var en_default = translation;

var LocalizeController = class extends LocalizeController$1 {};
registerTranslation(en_default);

// src/components/icon/library.default.ts
var library = {
  name: "default",
  resolver: name => getBasePath(`assets/icons/${name}.svg`)
};
var library_default_default = library;

// src/components/icon/library.system.ts
var icons = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
};
var systemLibrary = {
  name: "system",
  resolver: name => {
    if (name in icons) {
      return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
    }
    return "";
  }
};
var library_system_default = systemLibrary;

// src/components/icon/library.ts
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter(el => el !== icon);
}
function getIconLibrary(name) {
  return registry.find(lib => lib.name === name);
}

// src/components/icon/icon.styles.ts
var icon_styles_default = i$5`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

// src/internal/watch.ts
function watch(propertyName, options) {
  const resolvedOptions = __spreadValues({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const {
      update
    } = proto;
    const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
    proto.update = function (changedProps) {
      watchedProperties.forEach(property => {
        const key = property;
        if (changedProps.has(key)) {
          const oldValue = changedProps.get(key);
          const newValue = this[key];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
      });
      update.call(this, changedProps);
    };
  };
}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = (o, t) => void 0 !== o?._$litType$ ,
  f = o => void 0 === o.strings,
  u$1 = {},
  m = (o, t = u$1) => o._$AH = t;

var CACHEABLE_ERROR = Symbol();
var RETRYABLE_ERROR = Symbol();
var parser;
var iconCache = /* @__PURE__ */new Map();
var SlIcon = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.initialRender = false;
    this.svg = null;
    this.label = "";
    this.library = "default";
  }
  /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
  async resolveIcon(url, library) {
    var _a;
    let fileData;
    if (library == null ? void 0 : library.spriteSheet) {
      this.svg = x`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`;
      return this.svg;
    }
    try {
      fileData = await fetch(url, {
        mode: "cors"
      });
      if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
    } catch (e) {
      return RETRYABLE_ERROR;
    }
    try {
      const div = document.createElement("div");
      div.innerHTML = await fileData.text();
      const svg = div.firstElementChild;
      if (((_a = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a.toLowerCase()) !== "svg") return CACHEABLE_ERROR;
      if (!parser) parser = new DOMParser();
      const doc = parser.parseFromString(svg.outerHTML, "text/html");
      const svgEl = doc.body.querySelector("svg");
      if (!svgEl) return CACHEABLE_ERROR;
      svgEl.part.add("svg");
      return document.adoptNode(svgEl);
    } catch (e) {
      return CACHEABLE_ERROR;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.initialRender = true;
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getIconSource() {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return {
        url: library.resolver(this.name),
        fromLibrary: true
      };
    }
    return {
      url: this.src,
      fromLibrary: false
    };
  }
  handleLabelChange() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
      this.removeAttribute("aria-hidden");
    } else {
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this.setAttribute("aria-hidden", "true");
    }
  }
  async setIcon() {
    var _a;
    const {
      url,
      fromLibrary
    } = this.getIconSource();
    const library = fromLibrary ? getIconLibrary(this.library) : void 0;
    if (!url) {
      this.svg = null;
      return;
    }
    let iconResolver = iconCache.get(url);
    if (!iconResolver) {
      iconResolver = this.resolveIcon(url, library);
      iconCache.set(url, iconResolver);
    }
    if (!this.initialRender) {
      return;
    }
    const svg = await iconResolver;
    if (svg === RETRYABLE_ERROR) {
      iconCache.delete(url);
    }
    if (url !== this.getIconSource().url) {
      return;
    }
    if (e(svg)) {
      this.svg = svg;
      if (library) {
        await this.updateComplete;
        const shadowSVG = this.shadowRoot.querySelector("[part='svg']");
        if (typeof library.mutator === "function" && shadowSVG) {
          library.mutator(shadowSVG);
        }
      }
      return;
    }
    switch (svg) {
      case RETRYABLE_ERROR:
      case CACHEABLE_ERROR:
        this.svg = null;
        this.emit("sl-error");
        break;
      default:
        this.svg = svg.cloneNode(true);
        (_a = library == null ? void 0 : library.mutator) == null ? void 0 : _a.call(library, this.svg);
        this.emit("sl-load");
    }
  }
  render() {
    return this.svg;
  }
};
SlIcon.styles = [component_styles_default, icon_styles_default];
__decorateClass([r()], SlIcon.prototype, "svg", 2);
__decorateClass([n$1({
  reflect: true
})], SlIcon.prototype, "name", 2);
__decorateClass([n$1()], SlIcon.prototype, "src", 2);
__decorateClass([n$1()], SlIcon.prototype, "label", 2);
__decorateClass([n$1({
  reflect: true
})], SlIcon.prototype, "library", 2);
__decorateClass([watch("label")], SlIcon.prototype, "handleLabelChange", 1);
__decorateClass([watch(["name", "src", "library"])], SlIcon.prototype, "setIcon", 1);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1 = o => o ?? E;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l$1 = e$2(class extends i$1 {
  constructor(r) {
    if (super(r), r.type !== t.PROPERTY && r.type !== t.ATTRIBUTE && r.type !== t.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!f(r)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r) {
    return r;
  }
  update(i, [t$1]) {
    if (t$1 === T || t$1 === E) return t$1;
    const o = i.element,
      l = i.name;
    if (i.type === t.PROPERTY) {
      if (t$1 === o[l]) return T;
    } else if (i.type === t.BOOLEAN_ATTRIBUTE) {
      if (!!t$1 === o.hasAttribute(l)) return T;
    } else if (i.type === t.ATTRIBUTE && o.getAttribute(l) === t$1 + "") return T;
    return m(i), t$1;
  }
});

var SlInput = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController(this);
    this.hasFocus = false;
    this.title = "";
    // make reactive to pass through
    this.__numberInput = Object.assign(document.createElement("input"), {
      type: "number"
    });
    this.__dateInput = Object.assign(document.createElement("input"), {
      type: "date"
    });
    this.type = "text";
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.helpText = "";
    this.clearable = false;
    this.disabled = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.noSpinButtons = false;
    this.form = "";
    this.required = false;
    this.spellcheck = true;
  }
  //
  // NOTE: We use an in-memory input for these getters/setters instead of the one in the template because the properties
  // can be set before the component is rendered.
  //
  /**
   * Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. This will use the native `<input type="{{type}}">` implementation and may result in an error.
   */
  get valueAsDate() {
    var _a;
    this.__dateInput.type = this.type;
    this.__dateInput.value = this.value;
    return ((_a = this.input) == null ? void 0 : _a.valueAsDate) || this.__dateInput.valueAsDate;
  }
  set valueAsDate(newValue) {
    this.__dateInput.type = this.type;
    this.__dateInput.valueAsDate = newValue;
    this.value = this.__dateInput.value;
  }
  /** Gets or sets the current value as a number. Returns `NaN` if the value can't be converted. */
  get valueAsNumber() {
    var _a;
    this.__numberInput.value = this.value;
    return ((_a = this.input) == null ? void 0 : _a.valueAsNumber) || this.__numberInput.valueAsNumber;
  }
  set valueAsNumber(newValue) {
    this.__numberInput.valueAsNumber = newValue;
    this.value = this.__numberInput.value;
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.emit("sl-change");
  }
  handleClearClick(event) {
    event.preventDefault();
    if (this.value !== "") {
      this.value = "";
      this.emit("sl-clear");
      this.emit("sl-input");
      this.emit("sl-change");
    }
    this.input.focus();
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.formControlController.updateValidity();
    this.emit("sl-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleKeyDown(event) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented && !event.isComposing) {
          this.formControlController.submit();
        }
      });
    }
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.formControlController.updateValidity();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.formControlController.updateValidity();
  }
  /** Sets focus on the input. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start != null ? start : this.input.selectionStart;
    const selectionEnd = end != null ? end : this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  /** Increments the value of a numeric input type by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value of a numeric input type by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
    const isClearIconVisible = hasClearIcon && (typeof this.value === "number" || this.value.length > 0);
    return x`
      <div
        part="form-control"
        class=${e$1({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e$1({
      input: true,
      // Sizes
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      // States
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": !this.value,
      "input--no-spin-buttons": this.noSpinButtons
    })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${o$1(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${o$1(this.placeholder)}
              minlength=${o$1(this.minlength)}
              maxlength=${o$1(this.maxlength)}
              min=${o$1(this.min)}
              max=${o$1(this.max)}
              step=${o$1(this.step)}
              .value=${l$1(this.value)}
              autocapitalize=${o$1(this.autocapitalize)}
              autocomplete=${o$1(this.autocomplete)}
              autocorrect=${o$1(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${o$1(this.pattern)}
              enterkeyhint=${o$1(this.enterkeyhint)}
              inputmode=${o$1(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${isClearIconVisible ? x`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                ` : ""}
            ${this.passwordToggle && !this.disabled ? x`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible ? x`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        ` : x`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                ` : ""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlInput.styles = [component_styles_default, form_control_styles_default, input_styles_default];
SlInput.dependencies = {
  "sl-icon": SlIcon
};
__decorateClass([e$3(".input__control")], SlInput.prototype, "input", 2);
__decorateClass([r()], SlInput.prototype, "hasFocus", 2);
__decorateClass([n$1()], SlInput.prototype, "title", 2);
__decorateClass([n$1({
  reflect: true
})], SlInput.prototype, "type", 2);
__decorateClass([n$1()], SlInput.prototype, "name", 2);
__decorateClass([n$1()], SlInput.prototype, "value", 2);
__decorateClass([defaultValue()], SlInput.prototype, "defaultValue", 2);
__decorateClass([n$1({
  reflect: true
})], SlInput.prototype, "size", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlInput.prototype, "filled", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlInput.prototype, "pill", 2);
__decorateClass([n$1()], SlInput.prototype, "label", 2);
__decorateClass([n$1({
  attribute: "help-text"
})], SlInput.prototype, "helpText", 2);
__decorateClass([n$1({
  type: Boolean
})], SlInput.prototype, "clearable", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlInput.prototype, "disabled", 2);
__decorateClass([n$1()], SlInput.prototype, "placeholder", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlInput.prototype, "readonly", 2);
__decorateClass([n$1({
  attribute: "password-toggle",
  type: Boolean
})], SlInput.prototype, "passwordToggle", 2);
__decorateClass([n$1({
  attribute: "password-visible",
  type: Boolean
})], SlInput.prototype, "passwordVisible", 2);
__decorateClass([n$1({
  attribute: "no-spin-buttons",
  type: Boolean
})], SlInput.prototype, "noSpinButtons", 2);
__decorateClass([n$1({
  reflect: true
})], SlInput.prototype, "form", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlInput.prototype, "required", 2);
__decorateClass([n$1()], SlInput.prototype, "pattern", 2);
__decorateClass([n$1({
  type: Number
})], SlInput.prototype, "minlength", 2);
__decorateClass([n$1({
  type: Number
})], SlInput.prototype, "maxlength", 2);
__decorateClass([n$1()], SlInput.prototype, "min", 2);
__decorateClass([n$1()], SlInput.prototype, "max", 2);
__decorateClass([n$1()], SlInput.prototype, "step", 2);
__decorateClass([n$1()], SlInput.prototype, "autocapitalize", 2);
__decorateClass([n$1()], SlInput.prototype, "autocorrect", 2);
__decorateClass([n$1()], SlInput.prototype, "autocomplete", 2);
__decorateClass([n$1({
  type: Boolean
})], SlInput.prototype, "autofocus", 2);
__decorateClass([n$1()], SlInput.prototype, "enterkeyhint", 2);
__decorateClass([n$1({
  type: Boolean,
  converter: {
    // Allow "true|false" attribute values but keep the property boolean
    fromAttribute: value => !value || value === "false" ? false : true,
    toAttribute: value => value ? "true" : "false"
  }
})], SlInput.prototype, "spellcheck", 2);
__decorateClass([n$1()], SlInput.prototype, "inputmode", 2);
__decorateClass([watch("disabled", {
  waitUntilFirstUpdate: true
})], SlInput.prototype, "handleDisabledChange", 1);
__decorateClass([watch("step", {
  waitUntilFirstUpdate: true
})], SlInput.prototype, "handleStepChange", 1);
__decorateClass([watch("value", {
  waitUntilFirstUpdate: true
})], SlInput.prototype, "handleValueChange", 1);

SlInput.define("sl-input");

// src/components/spinner/spinner.styles.ts
var spinner_styles_default = i$5`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;

var SlSpinner = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
  }
  render() {
    return x`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
SlSpinner.styles = [component_styles_default, spinner_styles_default];

// src/components/button/button.styles.ts
var button_styles_default = i$5`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const a = Symbol.for(""),
  o = t => {
    if (t?.r === a) return t?._$litStatic$;
  },
  i = (t, ...r) => ({
    _$litStatic$: r.reduce((r, e, a) => r + (t => {
      if (void 0 !== t._$litStatic$) return t._$litStatic$;
      throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`);
    })(e) + t[a + 1], t[0]),
    r: a
  }),
  l = new Map(),
  n = t => (r, ...e) => {
    const a = e.length;
    let s, i;
    const n = [],
      u = [];
    let c,
      $ = 0,
      f = false;
    for (; $ < a;) {
      for (c = r[$]; $ < a && void 0 !== (i = e[$], s = o(i));) c += s + r[++$], f = true;
      $ !== a && u.push(i), n.push(c), $++;
    }
    if ($ === a && n.push(r[a]), f) {
      const t = n.join("$$lit$$");
      void 0 === (r = l.get(t)) && (n.raw = n, l.set(t, r = n)), e = u;
    }
    return t(r, ...e);
  },
  u = n(x);

var SlButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["click"]
    });
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.localize = new LocalizeController(this);
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.variant = "default";
    this.size = "medium";
    this.caret = false;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.pill = false;
    this.circle = false;
    this.type = "button";
    this.name = "";
    this.value = "";
    this.href = "";
    this.rel = "noreferrer noopener";
  }
  /** Gets the validity state object */
  get validity() {
    if (this.isButton()) {
      return this.button.validity;
    }
    return validValidityState;
  }
  /** Gets the validation message */
  get validationMessage() {
    if (this.isButton()) {
      return this.button.validationMessage;
    }
    return "";
  }
  firstUpdated() {
    if (this.isButton()) {
      this.formControlController.updateValidity();
    }
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick() {
    if (this.type === "submit") {
      this.formControlController.submit(this);
    }
    if (this.type === "reset") {
      this.formControlController.reset(this);
    }
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    if (this.isButton()) {
      this.formControlController.setValidity(this.disabled);
    }
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    if (this.isButton()) {
      return this.button.checkValidity();
    }
    return true;
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (this.isButton()) {
      return this.button.reportValidity();
    }
    return true;
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    if (this.isButton()) {
      this.button.setCustomValidity(message);
      this.formControlController.updateValidity();
    }
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i`a` : i`button`;
    return u`
      <${tag}
        part="base"
        class=${e$1({
      button: true,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${o$1(isLink ? void 0 : this.disabled)}
        type=${o$1(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${o$1(isLink ? void 0 : this.name)}
        value=${o$1(isLink ? void 0 : this.value)}
        href=${o$1(isLink && !this.disabled ? this.href : void 0)}
        target=${o$1(isLink ? this.target : void 0)}
        download=${o$1(isLink ? this.download : void 0)}
        rel=${o$1(isLink ? this.rel : void 0)}
        role=${o$1(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? u` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? u`<sl-spinner part="spinner"></sl-spinner>` : ""}
      </${tag}>
    `;
  }
};
SlButton.styles = [component_styles_default, button_styles_default];
SlButton.dependencies = {
  "sl-icon": SlIcon,
  "sl-spinner": SlSpinner
};
__decorateClass([e$3(".button")], SlButton.prototype, "button", 2);
__decorateClass([r()], SlButton.prototype, "hasFocus", 2);
__decorateClass([r()], SlButton.prototype, "invalid", 2);
__decorateClass([n$1()], SlButton.prototype, "title", 2);
__decorateClass([n$1({
  reflect: true
})], SlButton.prototype, "variant", 2);
__decorateClass([n$1({
  reflect: true
})], SlButton.prototype, "size", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlButton.prototype, "caret", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlButton.prototype, "disabled", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlButton.prototype, "loading", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlButton.prototype, "outline", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlButton.prototype, "pill", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlButton.prototype, "circle", 2);
__decorateClass([n$1()], SlButton.prototype, "type", 2);
__decorateClass([n$1()], SlButton.prototype, "name", 2);
__decorateClass([n$1()], SlButton.prototype, "value", 2);
__decorateClass([n$1()], SlButton.prototype, "href", 2);
__decorateClass([n$1()], SlButton.prototype, "target", 2);
__decorateClass([n$1()], SlButton.prototype, "rel", 2);
__decorateClass([n$1()], SlButton.prototype, "download", 2);
__decorateClass([n$1()], SlButton.prototype, "form", 2);
__decorateClass([n$1({
  attribute: "formaction"
})], SlButton.prototype, "formAction", 2);
__decorateClass([n$1({
  attribute: "formenctype"
})], SlButton.prototype, "formEnctype", 2);
__decorateClass([n$1({
  attribute: "formmethod"
})], SlButton.prototype, "formMethod", 2);
__decorateClass([n$1({
  attribute: "formnovalidate",
  type: Boolean
})], SlButton.prototype, "formNoValidate", 2);
__decorateClass([n$1({
  attribute: "formtarget"
})], SlButton.prototype, "formTarget", 2);
__decorateClass([watch("disabled", {
  waitUntilFirstUpdate: true
})], SlButton.prototype, "handleDisabledChange", 1);

SlButton.define("sl-button");

// src/internal/closeActiveElement.ts
var blurActiveElement = elm => {
  var _a;
  const {
    activeElement
  } = document;
  if (activeElement && elm.contains(activeElement)) {
    (_a = document.activeElement) == null ? void 0 : _a.blur();
  }
};

// src/components/icon-button/icon-button.styles.ts
var icon_button_styles_default = i$5`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

var SlIconButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /** Simulates a click on the icon button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the icon button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the icon button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? i`a` : i`button`;
    return u`
      <${tag}
        part="base"
        class=${e$1({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${o$1(isLink ? void 0 : this.disabled)}
        type=${o$1(isLink ? void 0 : "button")}
        href=${o$1(isLink ? this.href : void 0)}
        target=${o$1(isLink ? this.target : void 0)}
        download=${o$1(isLink ? this.download : void 0)}
        rel=${o$1(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${o$1(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${o$1(this.name)}
          library=${o$1(this.library)}
          src=${o$1(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
  }
};
SlIconButton.styles = [component_styles_default, icon_button_styles_default];
SlIconButton.dependencies = {
  "sl-icon": SlIcon
};
__decorateClass([e$3(".icon-button")], SlIconButton.prototype, "button", 2);
__decorateClass([r()], SlIconButton.prototype, "hasFocus", 2);
__decorateClass([n$1()], SlIconButton.prototype, "name", 2);
__decorateClass([n$1()], SlIconButton.prototype, "library", 2);
__decorateClass([n$1()], SlIconButton.prototype, "src", 2);
__decorateClass([n$1()], SlIconButton.prototype, "href", 2);
__decorateClass([n$1()], SlIconButton.prototype, "target", 2);
__decorateClass([n$1()], SlIconButton.prototype, "download", 2);
__decorateClass([n$1()], SlIconButton.prototype, "label", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlIconButton.prototype, "disabled", 2);

// src/utilities/animation-registry.ts
var defaultAnimationRegistry = /* @__PURE__ */new Map();
var customAnimationRegistry = /* @__PURE__ */new WeakMap();
function ensureAnimation(animation) {
  return animation != null ? animation : {
    keyframes: [],
    options: {
      duration: 0
    }
  };
}
function getLogicalAnimation(animation, dir) {
  if (dir.toLowerCase() === "rtl") {
    return {
      keyframes: animation.rtlKeyframes || animation.keyframes,
      options: animation.options
    };
  }
  return animation;
}
function setDefaultAnimation(animationName, animation) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
function getAnimation(el, animationName, options) {
  const customAnimation = customAnimationRegistry.get(el);
  if (customAnimation == null ? void 0 : customAnimation[animationName]) {
    return getLogicalAnimation(customAnimation[animationName], options.dir);
  }
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return getLogicalAnimation(defaultAnimation, options.dir);
  }
  return {
    keyframes: [],
    options: {
      duration: 0
    }
  };
}

// src/internal/event.ts
function waitForEvent(el, eventName) {
  return new Promise(resolve => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}

// src/internal/animate.ts
function animateTo(el, keyframes, options) {
  return new Promise(resolve => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, {
      once: true
    });
    animation.addEventListener("finish", resolve, {
      once: true
    });
  });
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}
function stopAnimations(el) {
  return Promise.all(el.getAnimations().map(animation => {
    return new Promise(resolve => {
      animation.cancel();
      requestAnimationFrame(resolve);
    });
  }));
}

// src/components/alert/alert.styles.ts
var alert_styles_default = i$5`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    overflow: hidden;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    margin-inline-end: var(--sl-spacing-medium);
    align-self: center;
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`;

var _SlAlert = class _SlAlert extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "icon", "suffix");
    this.localize = new LocalizeController(this);
    this.open = false;
    this.closable = false;
    this.variant = "primary";
    this.duration = Infinity;
    this.remainingTime = this.duration;
  }
  static get toastStack() {
    if (!this.currentToastStack) {
      this.currentToastStack = Object.assign(document.createElement("div"), {
        className: "sl-toast-stack"
      });
    }
    return this.currentToastStack;
  }
  firstUpdated() {
    this.base.hidden = !this.open;
  }
  restartAutoHide() {
    this.handleCountdownChange();
    clearTimeout(this.autoHideTimeout);
    clearInterval(this.remainingTimeInterval);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = window.setTimeout(() => this.hide(), this.duration);
      this.remainingTime = this.duration;
      this.remainingTimeInterval = window.setInterval(() => {
        this.remainingTime -= 100;
      }, 100);
    }
  }
  pauseAutoHide() {
    var _a;
    (_a = this.countdownAnimation) == null ? void 0 : _a.pause();
    clearTimeout(this.autoHideTimeout);
    clearInterval(this.remainingTimeInterval);
  }
  resumeAutoHide() {
    var _a;
    if (this.duration < Infinity) {
      this.autoHideTimeout = window.setTimeout(() => this.hide(), this.remainingTime);
      this.remainingTimeInterval = window.setInterval(() => {
        this.remainingTime -= 100;
      }, 100);
      (_a = this.countdownAnimation) == null ? void 0 : _a.play();
    }
  }
  handleCountdownChange() {
    if (this.open && this.duration < Infinity && this.countdown) {
      const {
        countdownElement
      } = this;
      const start = "100%";
      const end = "0";
      this.countdownAnimation = countdownElement.animate([{
        width: start
      }, {
        width: end
      }], {
        duration: this.duration,
        easing: "linear"
      });
    }
  }
  handleCloseClick() {
    this.hide();
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show");
      if (this.duration < Infinity) {
        this.restartAutoHide();
      }
      await stopAnimations(this.base);
      this.base.hidden = false;
      const {
        keyframes,
        options
      } = getAnimation(this, "alert.show", {
        dir: this.localize.dir()
      });
      await animateTo(this.base, keyframes, options);
      this.emit("sl-after-show");
    } else {
      blurActiveElement(this);
      this.emit("sl-hide");
      clearTimeout(this.autoHideTimeout);
      clearInterval(this.remainingTimeInterval);
      await stopAnimations(this.base);
      const {
        keyframes,
        options
      } = getAnimation(this, "alert.hide", {
        dir: this.localize.dir()
      });
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;
      this.emit("sl-after-hide");
    }
  }
  handleDurationChange() {
    this.restartAutoHide();
  }
  /** Shows the alert. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  /** Hides the alert */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  /**
   * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
   * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
   * calling this method again. The returned promise will resolve after the alert is hidden.
   */
  async toast() {
    return new Promise(resolve => {
      this.handleCountdownChange();
      if (_SlAlert.toastStack.parentElement === null) {
        document.body.append(_SlAlert.toastStack);
      }
      _SlAlert.toastStack.appendChild(this);
      requestAnimationFrame(() => {
        this.clientWidth;
        this.show();
      });
      this.addEventListener("sl-after-hide", () => {
        _SlAlert.toastStack.removeChild(this);
        resolve();
        if (_SlAlert.toastStack.querySelector("sl-alert") === null) {
          _SlAlert.toastStack.remove();
        }
      }, {
        once: true
      });
    });
  }
  render() {
    return x`
      <div
        part="base"
        class=${e$1({
      alert: true,
      "alert--open": this.open,
      "alert--closable": this.closable,
      "alert--has-countdown": !!this.countdown,
      "alert--has-icon": this.hasSlotController.test("icon"),
      "alert--primary": this.variant === "primary",
      "alert--success": this.variant === "success",
      "alert--neutral": this.variant === "neutral",
      "alert--warning": this.variant === "warning",
      "alert--danger": this.variant === "danger"
    })}
        role="alert"
        aria-hidden=${this.open ? "false" : "true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable ? x`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            ` : ""}

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown ? x`
              <div
                class=${e$1({
      alert__countdown: true,
      "alert__countdown--ltr": this.countdown === "ltr"
    })}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            ` : ""}
      </div>
    `;
  }
};
_SlAlert.styles = [component_styles_default, alert_styles_default];
_SlAlert.dependencies = {
  "sl-icon-button": SlIconButton
};
__decorateClass([e$3('[part~="base"]')], _SlAlert.prototype, "base", 2);
__decorateClass([e$3(".alert__countdown-elapsed")], _SlAlert.prototype, "countdownElement", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], _SlAlert.prototype, "open", 2);
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], _SlAlert.prototype, "closable", 2);
__decorateClass([n$1({
  reflect: true
})], _SlAlert.prototype, "variant", 2);
__decorateClass([n$1({
  type: Number
})], _SlAlert.prototype, "duration", 2);
__decorateClass([n$1({
  type: String,
  reflect: true
})], _SlAlert.prototype, "countdown", 2);
__decorateClass([r()], _SlAlert.prototype, "remainingTime", 2);
__decorateClass([watch("open", {
  waitUntilFirstUpdate: true
})], _SlAlert.prototype, "handleOpenChange", 1);
__decorateClass([watch("duration")], _SlAlert.prototype, "handleDurationChange", 1);
var SlAlert = _SlAlert;
setDefaultAnimation("alert.show", {
  keyframes: [{
    opacity: 0,
    scale: 0.8
  }, {
    opacity: 1,
    scale: 1
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("alert.hide", {
  keyframes: [{
    opacity: 1,
    scale: 1
  }, {
    opacity: 0,
    scale: 0.8
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});

SlAlert.define("sl-alert");

SlSpinner.define("sl-spinner");

// src/components/divider/divider.styles.ts
var divider_styles_default = i$5`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;

var SlDivider = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
};
SlDivider.styles = [component_styles_default, divider_styles_default];
__decorateClass([n$1({
  type: Boolean,
  reflect: true
})], SlDivider.prototype, "vertical", 2);
__decorateClass([watch("vertical")], SlDivider.prototype, "handleVerticalChange", 1);

SlDivider.define("sl-divider");

SlIcon.define("sl-icon");

// Set the base path for Shoelace assets
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/');
function App() {
  const {
    falcon,
    navigation,
    isInitialized
  } = useFalconApiContext();
  if (!isInitialized) {
    return null;
  }
  return /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(FalconApiContext.Provider, {
    value: {
      falcon,
      navigation,
      isInitialized
    }
  }, /*#__PURE__*/React.createElement(Home, null)));
}
const domContainer = document.querySelector("#app");
const root = ReactDOM.createRoot(domContainer);
root.render(/*#__PURE__*/React.createElement(App, null));
