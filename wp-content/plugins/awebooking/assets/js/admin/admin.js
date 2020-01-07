(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("rBQX");


/***/ }),

/***/ "7l0f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9T72");
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



var Dropdown = function ($, Popper) {
  'use strict';

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, options) {
      _classCallCheck(this, Dropdown);

      this.element = element;
      this.options = Object.assign({}, Dropdown.defaults, options);
      this.drop = this._getDropElement();
      this.popper = null;

      if (!this.drop || typeof this.drop === 'undefined') {
        throw new Error('Drop Error: Cannot find the drop element.');
      }

      if (typeof Popper !== 'undefined' && !this.popper) {
        var referenceElement = this.element;
        this.popper = new Popper(referenceElement, this.drop, this._getPopperConfig());
      }

      this._addEventListeners();

      Dropdown.allDrops.push(this);
    }

    _createClass(Dropdown, [{
      key: "isOpened",
      value: function isOpened() {
        return this.drop.classList.contains('open');
      }
    }, {
      key: "isDisabled",
      value: function isDisabled() {
        return this.element.disabled || this.element.classList.contains('disabled');
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.isOpened()) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: "open",
      value: function open() {
        var _this = this;

        if (this.isDisabled() || this.isOpened()) {
          return;
        }

        this.element.focus();
        this.element.setAttribute('aria-expanded', true); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        this.drop.classList.add('open');
        this.drop.setAttribute('aria-hidden', true);

        if (this.popper) {
          this.popper.update();
        }

        setTimeout(function () {
          _this.drop.classList.add('open--transition');
        });
      }
    }, {
      key: "close",
      value: function close() {
        var _this2 = this;

        if (this.isDisabled() || !this.isOpened()) {
          return;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        this.element.setAttribute('aria-expanded', false);
        this.drop.removeAttribute('aria-hidden');
        this.drop.classList.remove('open--transition');
        _util__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].onTransitionEnd(this.drop, function () {
          _this2.drop.classList.remove('open');
        });
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this3 = this;

        if (!this.options.openOn) {
          return;
        }

        if (this.options.openOn === 'always') {
          setTimeout(this.open.bind(this));
          return;
        }

        var events = this.options.openOn.split(' ');

        if (events.indexOf('click') >= 0) {
          $(this.element).on('click', function (e) {
            e.preventDefault(); // e.stopPropagation();

            _this3.toggle();
          });
          $(document).on('click', function (e) {
            if (!_this3.isOpened()) {
              return;
            } // Clicking inside dropdown


            if (e.target === _this3.drop || _this3.drop.contains(e.target)) {
              return;
            } // Clicking target


            if (e.target === _this3.element || _this3.element.contains(e.target)) {
              return;
            }

            _this3.close(e);
          });
        }

        if (events.indexOf('hover') >= 0) {// TODO: ...
        }

        if (events.indexOf('focus') >= 0) {// TODO: ...
        }
      }
    }, {
      key: "_getDropElement",
      value: function _getDropElement() {
        if (!this.drop) {
          var parent = this.element.parentNode;
          var target = _util__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].getTargetFromElement(this.element);

          if (target) {
            this.drop = document.querySelector(target);
          } else {
            this.drop = parent ? parent.querySelector(this.options.drop) : null;
          }
        }

        return this.drop;
      }
    }, {
      key: "_getPopperConfig",
      value: function _getPopperConfig() {
        var _this4 = this;

        var offset = {};

        if (typeof this.options.offset === 'function') {
          offset.fn = function (data) {
            data.offsets = Object.assign({}, data.offsets, _this4.options.offset(data.offsets) || {});
            return data;
          };
        } else {
          offset.offset = this.options.offset;
        }

        var config = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offset,
            flip: {
              enabled: this.options.flip
            },
            preventOverflow: {
              boundariesElement: this.options.boundary
            }
          }
        }; // Disable Popper.js if we have a static display.

        if (this.options.display === 'static') {
          config.modifiers.applyStyle = {
            enabled: false
          };
        }

        return config;
      }
    }, {
      key: "_getPlacement",
      value: function _getPlacement() {
        return 'bottom-start';
      }
    }]);

    return Dropdown;
  }(); // Store dropdown instances.


  Dropdown.allDrops = [];
  Dropdown.defaults = {
    drop: '[data-drop]',
    offset: 0,
    flip: true,
    openOn: 'click',
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  return Dropdown;
}(jQuery, window.Popper);

/* harmony default export */ __webpack_exports__["a"] = (Dropdown);

/***/ }),

/***/ "8jRI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "9T72":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sBL/");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("jfjY");
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_mobile__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cr+I");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_2__);




var Utils = function ($) {
  function getTransitionEndEvent() {
    var transitionEndEvent = '';
    var transitionEndEvents = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'otransitionend',
      'transition': 'transitionend'
    };

    for (var name in transitionEndEvents) {
      if ({}.hasOwnProperty.call(transitionEndEvents, name)) {
        var tempEl = document.createElement('p');

        if (typeof tempEl.style[name] !== 'undefined') {
          transitionEndEvent = transitionEndEvents[name];
        }
      }
    }

    return transitionEndEvent;
  }

  return {
    isMobile: is_mobile__WEBPACK_IMPORTED_MODULE_1___default.a,
    debounce: debounce__WEBPACK_IMPORTED_MODULE_0___default.a,
    queryString: query_string__WEBPACK_IMPORTED_MODULE_2__,
    TRANSITION_END: getTransitionEndEvent(),
    onTransitionEnd: function onTransitionEnd(el, callback) {
      var _this = this;

      var called = false;
      $(el).one(this.TRANSITION_END, function () {
        callback();
        called = true;
      });
      setTimeout(function () {
        if (!called) $(el).trigger(_this.TRANSITION_END);
      }, this.getTransitionDurationFromElement(el));
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element.


      var transitionDuration = $(element).css('transition-duration');
      var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found.

      if (!floatTransitionDuration) {
        return 0;
      } // If multiple durations are defined, take the first.


      transitionDuration = transitionDuration.split(',')[0];
      return parseFloat(transitionDuration) * 1000;
    },
    getTargetFromElement: function getTargetFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    }
  };
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (Utils);

/***/ }),

/***/ "9UV2":
/***/ (function(module, exports, __webpack_require__) {

/*!
 * accounting.js v0.4.1
 * Copyright 2014 Open Exchange Rates
 *
 * Freely distributable under the MIT license.
 * Portions of accounting.js are inspired or borrowed from underscore.js
 *
 * Full details and documentation:
 * http://openexchangerates.github.io/accounting.js/
 */

(function(root, undefined) {

	/* --- Setup --- */

	// Create the local library object, to be exported or referenced globally later
	var lib = {};

	// Current version
	lib.version = '0.4.1';


	/* --- Exposed settings --- */

	// The library's settings configuration object. Contains default parameters for
	// currency and number formatting
	lib.settings = {
		currency: {
			symbol : "$",		// default currency symbol is '$'
			format : "%s%v",	// controls output: %s = symbol, %v = value (can be object, see docs)
			decimal : ".",		// decimal point separator
			thousand : ",",		// thousands separator
			precision : 2,		// decimal places
			grouping : 3		// digit grouping (not implemented yet)
		},
		number: {
			precision : 0,		// default precision on numbers is 0
			grouping : 3,		// digit grouping (not implemented yet)
			thousand : ",",
			decimal : "."
		}
	};


	/* --- Internal Helper Methods --- */

	// Store reference to possibly-available ECMAScript 5 methods for later
	var nativeMap = Array.prototype.map,
		nativeIsArray = Array.isArray,
		toString = Object.prototype.toString;

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js
	 */
	function isString(obj) {
		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
	}

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js, delegates to ECMA5's native Array.isArray
	 */
	function isArray(obj) {
		return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
	}

	/**
	 * Tests whether supplied parameter is a true object
	 */
	function isObject(obj) {
		return obj && toString.call(obj) === '[object Object]';
	}

	/**
	 * Extends an object with a defaults object, similar to underscore's _.defaults
	 *
	 * Used for abstracting parameter handling from API methods
	 */
	function defaults(object, defs) {
		var key;
		object = object || {};
		defs = defs || {};
		// Iterate over object non-prototype properties:
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				// Replace values with defaults only if undefined (allow empty/zero values):
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
	}

	/**
	 * Implementation of `Array.map()` for iteration loops
	 *
	 * Returns a new Array as a result of calling `iterator` on each array value.
	 * Defers to native Array.map if available
	 */
	function map(obj, iterator, context) {
		var results = [], i, j;

		if (!obj) return results;

		// Use native .map method if it exists:
		if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

		// Fallback for native .map:
		for (i = 0, j = obj.length; i < j; i++ ) {
			results[i] = iterator.call(context, obj[i], i, obj);
		}
		return results;
	}

	/**
	 * Check and normalise the value of precision (must be positive integer)
	 */
	function checkPrecision(val, base) {
		val = Math.round(Math.abs(val));
		return isNaN(val)? base : val;
	}


	/**
	 * Parses a format string or object and returns format obj for use in rendering
	 *
	 * `format` is either a string with the default (positive) format, or object
	 * containing `pos` (required), `neg` and `zero` values (or a function returning
	 * either a string or object)
	 *
	 * Either string or format.pos must contain "%v" (value) to be valid
	 */
	function checkCurrencyFormat(format) {
		var defaults = lib.settings.currency.format;

		// Allow function as format parameter (should return string or object):
		if ( typeof format === "function" ) format = format();

		// Format can be a string, in which case `value` ("%v") must be present:
		if ( isString( format ) && format.match("%v") ) {

			// Create and return positive, negative and zero formats:
			return {
				pos : format,
				neg : format.replace("-", "").replace("%v", "-%v"),
				zero : format
			};

		// If no format, or object is missing valid positive value, use defaults:
		} else if ( !format || !format.pos || !format.pos.match("%v") ) {

			// If defaults is a string, casts it to an object for faster checking next time:
			return ( !isString( defaults ) ) ? defaults : lib.settings.currency.format = {
				pos : defaults,
				neg : defaults.replace("%v", "-%v"),
				zero : defaults
			};

		}
		// Otherwise, assume format was fine:
		return format;
	}


	/* --- API Methods --- */

	/**
	 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
	 * Alias: `accounting.parse(string)`
	 *
	 * Decimal must be included in the regular expression to match floats (defaults to
	 * accounting.settings.number.decimal), so if the number uses a non-standard decimal 
	 * separator, provide it as the second argument.
	 *
	 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
	 *
	 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
	 */
	var unformat = lib.unformat = lib.parse = function(value, decimal) {
		// Recursively unformat arrays:
		if (isArray(value)) {
			return map(value, function(val) {
				return unformat(val, decimal);
			});
		}

		// Fails silently (need decent errors):
		value = value || 0;

		// Return the value as-is if it's already a number:
		if (typeof value === "number") return value;

		// Default decimal point comes from settings, but could be set to eg. "," in opts:
		decimal = decimal || lib.settings.number.decimal;

		 // Build regex to strip out everything except digits, decimal point and minus sign:
		var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
			unformatted = parseFloat(
				("" + value)
				.replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
				.replace(regex, '')         // strip out any cruft
				.replace(decimal, '.')      // make sure decimal point is standard
			);

		// This will fail silently which may cause trouble, let's wait and see:
		return !isNaN(unformatted) ? unformatted : 0;
	};


	/**
	 * Implementation of toFixed() that treats floats more like decimals
	 *
	 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
	 * problems for accounting- and finance-related software.
	 */
	var toFixed = lib.toFixed = function(value, precision) {
		precision = checkPrecision(precision, lib.settings.number.precision);
		var power = Math.pow(10, precision);

		// Multiply up by precision, round accurately, then divide and use native toFixed():
		return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
	};


	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 * Alias: `accounting.format()`
	 *
	 * Localise by overriding the precision and thousand / decimal separators
	 * 2nd parameter `precision` can be an object matching `settings.number`
	 */
	var formatNumber = lib.formatNumber = lib.format = function(number, precision, thousand, decimal) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val) {
				return formatNumber(val, precision, thousand, decimal);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(precision) ? precision : {
					precision : precision,
					thousand : thousand,
					decimal : decimal
				}),
				lib.settings.number
			),

			// Clean up precision
			usePrecision = checkPrecision(opts.precision),

			// Do some calc:
			negative = number < 0 ? "-" : "",
			base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
			mod = base.length > 3 ? base.length % 3 : 0;

		// Format the number:
		return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
	};


	/**
	 * Format a number into currency
	 *
	 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
	 * defaults: (0, "$", 2, ",", ".", "%s%v")
	 *
	 * Localise by overriding the symbol, precision, thousand / decimal separators and format
	 * Second param can be an object matching `settings.currency` which is the easiest way.
	 *
	 * To do: tidy up the parameters
	 */
	var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val){
				return formatMoney(val, symbol, precision, thousand, decimal, format);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

			// Check format (returns object with pos, neg and zero):
			formats = checkCurrencyFormat(opts.format),

			// Choose which format to use for this value:
			useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

		// Return with currency symbol added:
		return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
	};


	/**
	 * Format a list of numbers into an accounting column, padding with whitespace
	 * to line up currency symbols, thousand separators and decimals places
	 *
	 * List should be an array of numbers
	 * Second parameter can be an object containing keys that match the params
	 *
	 * Returns array of accouting-formatted number strings of same length
	 *
	 * NB: `white-space:pre` CSS rule is required on the list container to prevent
	 * browsers from collapsing the whitespace in the output strings.
	 */
	lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
		if (!list) return [];

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

			// Check format (returns object with pos, neg and zero), only need pos for now:
			formats = checkCurrencyFormat(opts.format),

			// Whether to pad at start of string or after currency symbol:
			padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,

			// Store value for the length of the longest string in the column:
			maxLength = 0,

			// Format the list according to options, store the length of the longest string:
			formatted = map(list, function(val, i) {
				if (isArray(val)) {
					// Recursively format columns if list is a multi-dimensional array:
					return lib.formatColumn(val, opts);
				} else {
					// Clean up the value
					val = unformat(val);

					// Choose which format to use for this value (pos, neg or zero):
					var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero,

						// Format this value, push into formatted list and save the length:
						fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));

					if (fVal.length > maxLength) maxLength = fVal.length;
					return fVal;
				}
			});

		// Pad each number in the list and send back the column of numbers:
		return map(formatted, function(val, i) {
			// Only if this is a string (not a nested array, which would have already been padded):
			if (isString(val) && val.length < maxLength) {
				// Depending on symbol position, pad after symbol or at index 0:
				return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
			}
			return val;
		});
	};


	/* --- Module Definition --- */

	// Export accounting for CommonJS. If being loaded as an AMD module, define it as such.
	// Otherwise, just add `accounting` to the global object
	if (true) {
		if ( true && module.exports) {
			exports = module.exports = lib;
		}
		exports.accounting = lib;
	} else {}

	// Root will be `window` in browser or `global` on the server:
}(this));


/***/ }),

/***/ "MgzW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "ZFOp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ "cr+I":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__("ZFOp");
var objectAssign = __webpack_require__("MgzW");
var decodeComponent = __webpack_require__("8jRI");

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

function extract(str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
}

function parse(str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: parse(extract(str), opts)
	};
};


/***/ }),

/***/ "jfjY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isMobile
module.exports.isMobile = isMobile
module.exports.default = isMobile

var mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i

var tabletRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i

function isMobile (opts) {
  if (!opts) opts = {}
  var ua = opts.ua
  if (!ua && typeof navigator !== 'undefined') ua = navigator.userAgent
  if (ua && ua.headers && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent']
  }
  if (typeof ua !== 'string') return false

  return opts.tablet ? tabletRE.test(ua) : mobileRE.test(ua)
}


/***/ }),

/***/ "rBQX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "jQuery"
var external_jQuery_ = __webpack_require__("xeH2");
var external_jQuery_default = /*#__PURE__*/__webpack_require__.n(external_jQuery_);

// EXTERNAL MODULE: ./node_modules/debounce/index.js
var debounce = __webpack_require__("sBL/");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// EXTERNAL MODULE: ./node_modules/is-mobile/index.js
var is_mobile = __webpack_require__("jfjY");
var is_mobile_default = /*#__PURE__*/__webpack_require__.n(is_mobile);

// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__("cr+I");

// EXTERNAL MODULE: ./assets/babel/core/dropdown.js
var dropdown = __webpack_require__("7l0f");

// CONCATENATED MODULE: ./assets/babel/core/range-dates.js
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function rangePlugin() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (fp) {
    var dateFormat = '',
        secondInput,
        _firstInputFocused,
        _secondInputFocused;

    var createSecondInput = function createSecondInput() {
      if (config.input) {
        secondInput = config.input instanceof Element ? config.input : window.document.querySelector(config.input);
      } else {
        secondInput = fp._input.cloneNode();
        secondInput.removeAttribute('id');
        secondInput._flatpickr = undefined;
      }

      if (secondInput.value) {
        var parsedDate = fp.parseDate(secondInput.value);

        if (parsedDate) {
          fp.selectedDates.push(parsedDate);
        }
      }

      secondInput.setAttribute('data-fp-omit', '');

      fp._bind(secondInput, ['focus', 'click'], function () {
        if (fp.selectedDates[1]) {
          fp.latestSelectedDateObj = fp.selectedDates[1];

          fp._setHoursFromDate(fp.selectedDates[1]);

          fp.jumpToDate(fp.selectedDates[1]);
        }

        _firstInputFocused = false;
        _secondInputFocused = true;
        fp.isOpen = false;
        fp.open(undefined, secondInput);
      });

      fp._bind(fp._input, ['focus', 'click'], function (e) {
        e.preventDefault();
        fp.isOpen = false;
        fp.open();
      });

      if (fp.config.allowInput) {
        fp._bind(secondInput, 'keydown', function (e) {
          if (e.key === 'Enter') {
            fp.setDate([fp.selectedDates[0], secondInput.value], true, dateFormat);
            secondInput.click();
          }
        });
      }

      if (!config.input) {
        fp._input.parentNode && fp._input.parentNode.insertBefore(secondInput, fp._input.nextSibling);
      }
    };

    var plugin = {
      onParseConfig: function onParseConfig() {
        fp.config.mode = 'range';
        dateFormat = fp.config.altInput ? fp.config.altFormat : fp.config.dateFormat;
      },
      onReady: function onReady() {
        createSecondInput();
        fp.config.ignoredFocusElements.push(secondInput);

        if (fp.config.allowInput) {
          fp._input.removeAttribute('readonly');

          secondInput.removeAttribute('readonly');
        } else {
          secondInput.setAttribute('readonly', 'readonly');
        }

        fp._bind(fp._input, 'focus', function () {
          fp.latestSelectedDateObj = fp.selectedDates[0];

          fp._setHoursFromDate(fp.selectedDates[0]);

          _firstInputFocused = true;
          _secondInputFocused = false;
        });

        if (fp.config.allowInput) {
          fp._bind(fp._input, 'keydown', function (e) {
            if (e.key === 'Enter') {
              fp.setDate([fp._input.value, fp.selectedDates[1]], true, dateFormat);
            }
          });
        }

        fp.setDate(fp.selectedDates, false);
        plugin.onValueUpdate(fp.selectedDates);
        fp.loadedPlugins.push('range');
      },
      onPreCalendarPosition: function onPreCalendarPosition() {
        if (_secondInputFocused) {
          fp._positionElement = secondInput;
          setTimeout(function () {
            fp._positionElement = fp._input;
          }, 0);
        }
      },
      onValueUpdate: function onValueUpdate() {
        if (!secondInput) {
          return;
        }

        var _fp$selectedDates$map = fp.selectedDates.map(function (d) {
          return fp.formatDate(d, dateFormat);
        });

        var _fp$selectedDates$map2 = _slicedToArray(_fp$selectedDates$map, 2);

        var _fp$selectedDates$map3 = _fp$selectedDates$map2[0];
        fp._input.value = _fp$selectedDates$map3 === void 0 ? '' : _fp$selectedDates$map3;
        var _fp$selectedDates$map4 = _fp$selectedDates$map2[1];
        secondInput.value = _fp$selectedDates$map4 === void 0 ? '' : _fp$selectedDates$map4;
      },
      onChange: function onChange() {
        if (!fp.selectedDates.length) {
          setTimeout(function () {
            if (fp.selectedDates.length) {
              return;
            }

            secondInput.value = '';
          }, 10);
        }

        if (_secondInputFocused) {
          setTimeout(function () {
            secondInput.focus();
          }, 0);
        }
      },
      onDestroy: function onDestroy() {
        if (!config.input) {
          secondInput.parentNode && secondInput.parentNode.removeChild(secondInput);
        }
      }
    };
    return plugin;
  };
}
// CONCATENATED MODULE: ./assets/babel/admin/utils/search-customer.js
var $ = jQuery;
var search_customer_plugin = window.awebooking;

var ajaxSearch = function ajaxSearch() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'customers';
  var query = arguments.length > 1 ? arguments[1] : undefined;
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  $.ajax({
    type: 'GET',
    url: search_customer_plugin.route("/search/".concat(type)),
    data: {
      term: encodeURIComponent(query)
    },
    error: function error() {
      callback();
    },
    success: function success(res) {
      callback(res);
    }
  });
};

var initSelectize = function initSelectize(select) {
  $(select).selectize({
    valueField: 'id',
    labelField: 'display',
    searchField: 'display',
    dropdownParent: 'body',
    placeholder: $(this).data('placeholder'),
    load: function load(query, callback) {
      if (!query.length) {
        return callback();
      } else {
        ajaxSearch('customers', query, callback);
      }
    }
  });
};

var initSelectizeServices = function initSelectizeServices(select) {
  $(select).selectize({
    plugins: ['remove_button', 'drag_drop'],
    valueField: 'id',
    labelField: 'name',
    searchField: ['name', 'id'],
    dropdownParent: 'body',
    placeholder: $(this).data('placeholder'),
    load: function load(query, callback) {
      if (!query.length) {
        return callback();
      } else {
        ajaxSearch('services', query, callback);
      }
    }
  });
};

/* harmony default export */ var search_customer = (function () {
  $('select.awebooking-search-customer, .selectize-search-customer .cmb2_select').each(function () {
    initSelectize(this);
  });
  $('.selectize-search-services').each(function () {
    initSelectizeServices(this);
  });
});
;
// EXTERNAL MODULE: ./node_modules/accounting/accounting.js
var accounting = __webpack_require__("9UV2");
var accounting_default = /*#__PURE__*/__webpack_require__.n(accounting);

// CONCATENATED MODULE: ./assets/babel/admin/admin.js







 // Instance the awebooking object.

var awebooking = window.awebooking || {};
var i18n = awebooking.i18n || {}; // Create the properties.

awebooking.utils = {};
awebooking.instances = {};
awebooking.isMobile = is_mobile_default.a;
awebooking.utils.flatpickrRangePlugin = rangePlugin;
/**
 * The admin route.
 *
 * @param  {string} route
 * @return {string}
 */

awebooking.route = function (route) {
  return this.admin_route + route.replace(/^\//g, '');
};
/**
 * Show the alert dialog.
 *
 * @return {SweetAlert}
 */


awebooking.alert = function (message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';
  return swal({
    text: message,
    type: type,
    toast: true,
    buttonsStyling: false,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonClass: 'button'
  });
};
/**
 * Show the confirm message.
 *
 * @return {SweetAlert}
 */


awebooking.confirm = function (message, callback) {
  if (!window.swal) {
    return window.confirm(message || i18n.warning) && callback();
  }

  var confirm = window.swal({
    text: message || this.i18n.warning,
    customClass: 'awebooking-confirm-dialog',
    position: 'center',
    animation: false,
    backdrop: 'rgba(0,0,0,.8)',
    reverseButtons: true,
    buttonsStyling: false,
    showCancelButton: true,
    cancelButtonClass: '',
    confirmButtonClass: '',
    cancelButtonText: this.i18n.cancel,
    confirmButtonText: this.i18n.ok
  });

  if (callback) {
    return confirm.then(function (result) {
      if (result.value) callback(result);
    });
  }

  return confirm;
};
/**
 * Create the dialog.
 *
 * @param  {string} selector
 * @return {Object}
 */


awebooking.dialog = function (selector) {
  var $dialog = external_jQuery_default()(selector).dialog({
    modal: true,
    width: 'auto',
    height: 'auto',
    autoOpen: false,
    draggable: false,
    resizable: false,
    closeOnEscape: true,
    dialogClass: 'wp-dialog awebooking-dialog',
    position: {
      my: 'center',
      at: 'center center-15%',
      of: window
    }
  });
  external_jQuery_default()(window).on('resize', debounce_default()(function () {
    $dialog.dialog('option', 'position', {
      my: 'center',
      at: 'center center-15%',
      of: window
    });
  }, 150));
  return $dialog;
};
/**
 * Send a ajax request to a route.
 *
 * @param  {String}   method
 * @param  {String}   route
 * @param  {Object}   data
 * @param  {Function} callback
 * @return {JQuery.jqXHR}
 */


awebooking.ajax = function (method, route, data, callback) {
  var xhr = external_jQuery_default.a.ajax({
    url: awebooking.route(route),
    data: data,
    method: method,
    dataType: 'json'
  });
  return xhr.done(function (data) {
    if (callback) callback(data);
  }).fail(function (xhr) {
    var json = xhr.responseJSON;

    if (json && json.message) {
      awebooking.alert(json.message, 'error');
    } else {
      awebooking.alert(i18n.error, 'error');
    }
  });
};
/**
 * Create a form then append to body.
 *
 * @param  {String} action The form action.
 * @param  {String} method The form method.
 * @return {Object}
 */


awebooking.createForm = function (action, method) {
  var $form = external_jQuery_default()('<form>', {
    'method': 'POST',
    'action': action
  });
  var hiddenInput = external_jQuery_default()('<input>', {
    'name': '_method',
    'type': 'hidden',
    'value': method
  });
  return $form.append(hiddenInput).appendTo('body');
};
/**
 * Format the price.
 *
 * @param amount
 * @returns {string}
 */


awebooking.formatPrice = function (amount) {
  return accounting_default.a.formatMoney(amount, {
    format: i18n.priceFormat,
    symbol: i18n.currencySymbol,
    decimal: i18n.decimalSeparator,
    thousand: i18n.priceThousandSeparator,
    precision: i18n.numberDecimals
  });
};
/**
 * Retrieves a modified URL query string.
 *
 * @param {object} args
 * @param {string} url
 */


awebooking.utils.addQueryArgs = function (args, url) {
  if (typeof url === 'undefined') {
    url = window.location.href;
  }

  var parsed = query_string["parseUrl"](url);
  var query = external_jQuery_default.a.extend({}, parsed.query, args);
  return parsed.url + '?' + query_string["stringify"](query, {
    sort: false
  });
};

external_jQuery_default()(function () {
  if (window.tippy) {
    tippy('.tippy', {
      arrow: true,
      animation: 'shift-toward',
      duration: [200, 150]
    });
  } // Init the selectize.


  if (external_jQuery_default.a.fn.selectize) {
    search_customer();
    external_jQuery_default()('select.selectize, .with-selectize .cmb2_select').selectize({
      allowEmptyOption: true,
      searchField: ['value', 'text']
    });
  } // Init warning before delete.


  external_jQuery_default()('[data-method="abrs-delete"]').on('click', function (e) {
    e.preventDefault();
    var link = external_jQuery_default()(this).attr('href');
    var message = external_jQuery_default()(this).data('warning');
    awebooking.confirm(message, function () {
      awebooking.createForm(link, 'DELETE').submit();
    });
  });
  external_jQuery_default()('[data-init="abrs-dropdown"]').each(function () {
    external_jQuery_default()(this).data('abrs-dropdown', new dropdown["a" /* default */](this, {
      drop: '.abrs-drop'
    }));
  });
});

/***/ }),

/***/ "sBL/":
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ }),

/***/ "xeH2":
/***/ (function(module, exports) {

(function() { module.exports = this["jQuery"]; }());

/***/ })

/******/ })));