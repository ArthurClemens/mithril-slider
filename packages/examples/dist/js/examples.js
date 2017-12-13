document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('mithril')) :
	typeof define === 'function' && define.amd ? define(['mithril'], factory) :
	(factory(global.m));
}(this, (function (m) { 'use strict';

m = 'default' in m ? m['default'] : m;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var fastclick = createCommonjsModule(function (module) {
	(function () {
		'use strict';

		/**
   * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
   *
   * @codingstandard ftlabs-jsv2
   * @copyright The Financial Times Limited [All Rights Reserved]
   * @license MIT License (see LICENSE.txt)
   */

		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/

		/**
   * Instantiate fast-clicking listeners on the specified layer.
   *
   * @constructor
   * @param {Element} layer The layer to listen on
   * @param {Object} [options={}] The options to override the defaults
   */

		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			/**
    * Whether a click is currently being tracked.
    *
    * @type boolean
    */
			this.trackingClick = false;

			/**
    * Timestamp for when click tracking started.
    *
    * @type number
    */
			this.trackingClickStart = 0;

			/**
    * The element being tracked for a click.
    *
    * @type EventTarget
    */
			this.targetElement = null;

			/**
    * X-coordinate of touch start event.
    *
    * @type number
    */
			this.touchStartX = 0;

			/**
    * Y-coordinate of touch start event.
    *
    * @type number
    */
			this.touchStartY = 0;

			/**
    * ID of the last touch, retrieved from Touch.identifier.
    *
    * @type number
    */
			this.lastTouchIdentifier = 0;

			/**
    * Touchmove boundary, beyond which a click will be cancelled.
    *
    * @type number
    */
			this.touchBoundary = options.touchBoundary || 10;

			/**
    * The FastClick layer.
    *
    * @type Element
    */
			this.layer = layer;

			/**
    * The minimum time between tap(touchstart and touchend) events
    *
    * @type number
    */
			this.tapDelay = options.tapDelay || 200;

			/**
    * The maximum time for a tap
    *
    * @type number
    */
			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function () {
					return method.apply(context, arguments);
				};
			}

			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function (type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function (type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {

				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function (event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		/**
  * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
  *
  * @type boolean
  */
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		/**
   * Android requires exceptions.
   *
   * @type boolean
   */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

		/**
   * iOS requires exceptions.
   *
   * @type boolean
   */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

		/**
   * iOS 4 requires an exception for select elements.
   *
   * @type boolean
   */
		var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

		/**
   * iOS 6.0-7.* requires the target element to be manually derived
   *
   * @type boolean
   */
		var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

		/**
   * BlackBerry requires exceptions.
   *
   * @type boolean
   */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		/**
   * Determine whether a given element requires a native click.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element needs a native click
   */
		FastClick.prototype.needsClick = function (target) {
			switch (target.nodeName.toLowerCase()) {

				// Don't send a synthetic click to disabled inputs (issue #62)
				case 'button':
				case 'select':
				case 'textarea':
					if (target.disabled) {
						return true;
					}

					break;
				case 'input':

					// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
					if (deviceIsIOS && target.type === 'file' || target.disabled) {
						return true;
					}

					break;
				case 'label':
				case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
				case 'video':
					return true;
			}

			return (/\bneedsclick\b/.test(target.className)
			);
		};

		/**
   * Determine whether a given element requires a call to focus to simulate click into element.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
   */
		FastClick.prototype.needsFocus = function (target) {
			switch (target.nodeName.toLowerCase()) {
				case 'textarea':
					return true;
				case 'select':
					return !deviceIsAndroid;
				case 'input':
					switch (target.type) {
						case 'button':
						case 'checkbox':
						case 'file':
						case 'image':
						case 'radio':
						case 'submit':
							return false;
					}

					// No point in attempting to focus disabled inputs
					return !target.disabled && !target.readOnly;
				default:
					return (/\bneedsfocus\b/.test(target.className)
					);
			}
		};

		/**
   * Send a click event to the specified element.
   *
   * @param {EventTarget|Element} targetElement
   * @param {Event} event
   */
		FastClick.prototype.sendClick = function (targetElement, event) {
			var clickEvent, touch;

			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function (targetElement) {

			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};

		/**
   * @param {EventTarget|Element} targetElement
   */
		FastClick.prototype.focus = function (targetElement) {
			var length;

			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};

		/**
   * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
   *
   * @param {EventTarget|Element} targetElement
   */
		FastClick.prototype.updateScrollParent = function (targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};

		/**
   * @param {EventTarget} targetElement
   * @returns {Element|EventTarget}
   */
		FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};

		/**
   * On touch start, record the position and scroll offset.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onTouchStart = function (event) {
			var targetElement, touch, selection;

			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			if (deviceIsIOS) {

				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}

				if (!deviceIsIOS4) {

					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			// Prevent phantom clicks on fast double-tap (issue #36)
			if (event.timeStamp - this.lastClickTime < this.tapDelay) {
				event.preventDefault();
			}

			return true;
		};

		/**
   * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.touchHasMoved = function (event) {
			var touch = event.changedTouches[0],
			    boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};

		/**
   * Update the last position.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onTouchMove = function (event) {
			if (!this.trackingClick) {
				return true;
			}

			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};

		/**
   * Attempt to find the labelled control for the given label element.
   *
   * @param {EventTarget|HTMLLabelElement} labelElement
   * @returns {Element|null}
   */
		FastClick.prototype.findControl = function (labelElement) {

			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};

		/**
   * On touch end, determine whether to send a click event at once.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onTouchEnd = function (event) {
			var forElement,
			    trackingClickStart,
			    targetTagName,
			    scrollParent,
			    touch,
			    targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			// Prevent phantom clicks on fast double-tap (issue #36)
			if (event.timeStamp - this.lastClickTime < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}

			if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
				return true;
			}

			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {

				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {

				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};

		/**
   * On touch cancel, stop tracking the click.
   *
   * @returns {void}
   */
		FastClick.prototype.onTouchCancel = function () {
			this.trackingClick = false;
			this.targetElement = null;
		};

		/**
   * Determine mouse events which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onMouse = function (event) {

			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}

			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {

					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}

				// Cancel the event
				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};

		/**
   * On actual clicks, determine whether this is a touch-generated click, a click action occurring
   * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
   * an actual click which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onClick = function (event) {
			var permitted;

			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}

			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};

		/**
   * Remove all FastClick's event listeners.
   *
   * @returns {void}
   */
		FastClick.prototype.destroy = function () {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};

		/**
   * Check whether FastClick is needed.
   *
   * @param {Element} layer The layer to listen on
   */
		FastClick.notNeeded = function (layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}

					// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};

		/**
   * Factory method for creating a FastClick object
   *
   * @param {Element} layer The layer to listen on
   * @param {Object} [options={}] The options to override the defaults
   */
		FastClick.attach = function (layer, options) {
			return new FastClick(layer, options);
		};

		if (typeof undefined === 'function' && _typeof(undefined.amd) === 'object' && undefined.amd) {

			// AMD. Register as an anonymous module.
			undefined(function () {
				return FastClick;
			});
		} else if ('object' !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	})();
});

var layer = document.body;
var fastClick = void 0;

var add = function add() {
  fastClick = new fastclick(layer);
};

var init = function init() {
  add();
};

init();

var hammer = createCommonjsModule(function (module) {
    /*! Hammer.JS - v2.0.7 - 2016-04-22
     * http://hammerjs.github.io/
     *
     * Copyright (c) 2016 Jorik Tangelder;
     * Licensed under the MIT license */
    (function (window, document, exportName, undefined) {
        'use strict';

        var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
        var TEST_ELEMENT = document.createElement('div');

        var TYPE_FUNCTION = 'function';

        var round = Math.round;
        var abs = Math.abs;
        var now = Date.now;

        /**
         * set a timeout with a given scope
         * @param {Function} fn
         * @param {Number} timeout
         * @param {Object} context
         * @returns {number}
         */
        function setTimeoutContext(fn, timeout, context) {
            return setTimeout(bindFn(fn, context), timeout);
        }

        /**
         * if the argument is an array, we want to execute the fn on each entry
         * if it aint an array we don't want to do a thing.
         * this is used by all the methods that accept a single and array argument.
         * @param {*|Array} arg
         * @param {String} fn
         * @param {Object} [context]
         * @returns {Boolean}
         */
        function invokeArrayArg(arg, fn, context) {
            if (Array.isArray(arg)) {
                each(arg, context[fn], context);
                return true;
            }
            return false;
        }

        /**
         * walk objects and arrays
         * @param {Object} obj
         * @param {Function} iterator
         * @param {Object} context
         */
        function each(obj, iterator, context) {
            var i;

            if (!obj) {
                return;
            }

            if (obj.forEach) {
                obj.forEach(iterator, context);
            } else if (obj.length !== undefined) {
                i = 0;
                while (i < obj.length) {
                    iterator.call(context, obj[i], i, obj);
                    i++;
                }
            } else {
                for (i in obj) {
                    obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
                }
            }
        }

        /**
         * wrap a method with a deprecation warning and stack trace
         * @param {Function} method
         * @param {String} name
         * @param {String} message
         * @returns {Function} A new function wrapping the supplied method.
         */
        function deprecate(method, name, message) {
            var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
            return function () {
                var e = new Error('get-stack-trace');
                var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

                var log = window.console && (window.console.warn || window.console.log);
                if (log) {
                    log.call(window.console, deprecationMessage, stack);
                }
                return method.apply(this, arguments);
            };
        }

        /**
         * extend object.
         * means that properties in dest will be overwritten by the ones in src.
         * @param {Object} target
         * @param {...Object} objects_to_assign
         * @returns {Object} target
         */
        var assign;
        if (typeof Object.assign !== 'function') {
            assign = function assign(target) {
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        } else {
            assign = Object.assign;
        }

        /**
         * extend object.
         * means that properties in dest will be overwritten by the ones in src.
         * @param {Object} dest
         * @param {Object} src
         * @param {Boolean} [merge=false]
         * @returns {Object} dest
         */
        var extend = deprecate(function extend(dest, src, merge) {
            var keys = Object.keys(src);
            var i = 0;
            while (i < keys.length) {
                if (!merge || merge && dest[keys[i]] === undefined) {
                    dest[keys[i]] = src[keys[i]];
                }
                i++;
            }
            return dest;
        }, 'extend', 'Use `assign`.');

        /**
         * merge the values from src in the dest.
         * means that properties that exist in dest will not be overwritten by src
         * @param {Object} dest
         * @param {Object} src
         * @returns {Object} dest
         */
        var merge = deprecate(function merge(dest, src) {
            return extend(dest, src, true);
        }, 'merge', 'Use `assign`.');

        /**
         * simple class inheritance
         * @param {Function} child
         * @param {Function} base
         * @param {Object} [properties]
         */
        function inherit(child, base, properties) {
            var baseP = base.prototype,
                childP;

            childP = child.prototype = Object.create(baseP);
            childP.constructor = child;
            childP._super = baseP;

            if (properties) {
                assign(childP, properties);
            }
        }

        /**
         * simple function bind
         * @param {Function} fn
         * @param {Object} context
         * @returns {Function}
         */
        function bindFn(fn, context) {
            return function boundFn() {
                return fn.apply(context, arguments);
            };
        }

        /**
         * let a boolean value also be a function that must return a boolean
         * this first item in args will be used as the context
         * @param {Boolean|Function} val
         * @param {Array} [args]
         * @returns {Boolean}
         */
        function boolOrFn(val, args) {
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == TYPE_FUNCTION) {
                return val.apply(args ? args[0] || undefined : undefined, args);
            }
            return val;
        }

        /**
         * use the val2 when val1 is undefined
         * @param {*} val1
         * @param {*} val2
         * @returns {*}
         */
        function ifUndefined(val1, val2) {
            return val1 === undefined ? val2 : val1;
        }

        /**
         * addEventListener with multiple events at once
         * @param {EventTarget} target
         * @param {String} types
         * @param {Function} handler
         */
        function addEventListeners(target, types, handler) {
            each(splitStr(types), function (type) {
                target.addEventListener(type, handler, false);
            });
        }

        /**
         * removeEventListener with multiple events at once
         * @param {EventTarget} target
         * @param {String} types
         * @param {Function} handler
         */
        function removeEventListeners(target, types, handler) {
            each(splitStr(types), function (type) {
                target.removeEventListener(type, handler, false);
            });
        }

        /**
         * find if a node is in the given parent
         * @method hasParent
         * @param {HTMLElement} node
         * @param {HTMLElement} parent
         * @return {Boolean} found
         */
        function hasParent(node, parent) {
            while (node) {
                if (node == parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }

        /**
         * small indexOf wrapper
         * @param {String} str
         * @param {String} find
         * @returns {Boolean} found
         */
        function inStr(str, find) {
            return str.indexOf(find) > -1;
        }

        /**
         * split string on whitespace
         * @param {String} str
         * @returns {Array} words
         */
        function splitStr(str) {
            return str.trim().split(/\s+/g);
        }

        /**
         * find if a array contains the object using indexOf or a simple polyFill
         * @param {Array} src
         * @param {String} find
         * @param {String} [findByKey]
         * @return {Boolean|Number} false when not found, or the index
         */
        function inArray(src, find, findByKey) {
            if (src.indexOf && !findByKey) {
                return src.indexOf(find);
            } else {
                var i = 0;
                while (i < src.length) {
                    if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
                        return i;
                    }
                    i++;
                }
                return -1;
            }
        }

        /**
         * convert array-like objects to real arrays
         * @param {Object} obj
         * @returns {Array}
         */
        function toArray$$1(obj) {
            return Array.prototype.slice.call(obj, 0);
        }

        /**
         * unique array with objects based on a key (like 'id') or just by the array's value
         * @param {Array} src [{id:1},{id:2},{id:1}]
         * @param {String} [key]
         * @param {Boolean} [sort=False]
         * @returns {Array} [{id:1},{id:2}]
         */
        function uniqueArray(src, key, sort) {
            var results = [];
            var values = [];
            var i = 0;

            while (i < src.length) {
                var val = key ? src[i][key] : src[i];
                if (inArray(values, val) < 0) {
                    results.push(src[i]);
                }
                values[i] = val;
                i++;
            }

            if (sort) {
                if (!key) {
                    results = results.sort();
                } else {
                    results = results.sort(function sortUniqueArray(a, b) {
                        return a[key] > b[key];
                    });
                }
            }

            return results;
        }

        /**
         * get the prefixed property
         * @param {Object} obj
         * @param {String} property
         * @returns {String|Undefined} prefixed
         */
        function prefixed(obj, property) {
            var prefix, prop;
            var camelProp = property[0].toUpperCase() + property.slice(1);

            var i = 0;
            while (i < VENDOR_PREFIXES.length) {
                prefix = VENDOR_PREFIXES[i];
                prop = prefix ? prefix + camelProp : property;

                if (prop in obj) {
                    return prop;
                }
                i++;
            }
            return undefined;
        }

        /**
         * get a unique id
         * @returns {number} uniqueId
         */
        var _uniqueId = 1;
        function uniqueId() {
            return _uniqueId++;
        }

        /**
         * get the window object of an element
         * @param {HTMLElement} element
         * @returns {DocumentView|Window}
         */
        function getWindowForElement(element) {
            var doc = element.ownerDocument || element;
            return doc.defaultView || doc.parentWindow || window;
        }

        var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

        var SUPPORT_TOUCH = 'ontouchstart' in window;
        var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
        var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

        var INPUT_TYPE_TOUCH = 'touch';
        var INPUT_TYPE_PEN = 'pen';
        var INPUT_TYPE_MOUSE = 'mouse';
        var INPUT_TYPE_KINECT = 'kinect';

        var COMPUTE_INTERVAL = 25;

        var INPUT_START = 1;
        var INPUT_MOVE = 2;
        var INPUT_END = 4;
        var INPUT_CANCEL = 8;

        var DIRECTION_NONE = 1;
        var DIRECTION_LEFT = 2;
        var DIRECTION_RIGHT = 4;
        var DIRECTION_UP = 8;
        var DIRECTION_DOWN = 16;

        var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
        var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
        var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

        var PROPS_XY = ['x', 'y'];
        var PROPS_CLIENT_XY = ['clientX', 'clientY'];

        /**
         * create new input type manager
         * @param {Manager} manager
         * @param {Function} callback
         * @returns {Input}
         * @constructor
         */
        function Input(manager, callback) {
            var self = this;
            this.manager = manager;
            this.callback = callback;
            this.element = manager.element;
            this.target = manager.options.inputTarget;

            // smaller wrapper around the handler, for the scope and the enabled state of the manager,
            // so when disabled the input events are completely bypassed.
            this.domHandler = function (ev) {
                if (boolOrFn(manager.options.enable, [manager])) {
                    self.handler(ev);
                }
            };

            this.init();
        }

        Input.prototype = {
            /**
             * should handle the inputEvent data and trigger the callback
             * @virtual
             */
            handler: function handler() {},

            /**
             * bind the events
             */
            init: function init() {
                this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
                this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
                this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
            },

            /**
             * unbind the events
             */
            destroy: function destroy() {
                this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
                this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
                this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
            }
        };

        /**
         * create new input type manager
         * called by the Manager constructor
         * @param {Hammer} manager
         * @returns {Input}
         */
        function createInputInstance(manager) {
            var Type;
            var inputClass = manager.options.inputClass;

            if (inputClass) {
                Type = inputClass;
            } else if (SUPPORT_POINTER_EVENTS) {
                Type = PointerEventInput;
            } else if (SUPPORT_ONLY_TOUCH) {
                Type = TouchInput;
            } else if (!SUPPORT_TOUCH) {
                Type = MouseInput;
            } else {
                Type = TouchMouseInput;
            }
            return new Type(manager, inputHandler);
        }

        /**
         * handle input events
         * @param {Manager} manager
         * @param {String} eventType
         * @param {Object} input
         */
        function inputHandler(manager, eventType, input) {
            var pointersLen = input.pointers.length;
            var changedPointersLen = input.changedPointers.length;
            var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
            var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

            input.isFirst = !!isFirst;
            input.isFinal = !!isFinal;

            if (isFirst) {
                manager.session = {};
            }

            // source event is the normalized value of the domEvents
            // like 'touchstart, mouseup, pointerdown'
            input.eventType = eventType;

            // compute scale, rotation etc
            computeInputData(manager, input);

            // emit secret event
            manager.emit('hammer.input', input);

            manager.recognize(input);
            manager.session.prevInput = input;
        }

        /**
         * extend the data with some usable properties like scale, rotate, velocity etc
         * @param {Object} manager
         * @param {Object} input
         */
        function computeInputData(manager, input) {
            var session = manager.session;
            var pointers = input.pointers;
            var pointersLength = pointers.length;

            // store the first input to calculate the distance and direction
            if (!session.firstInput) {
                session.firstInput = simpleCloneInputData(input);
            }

            // to compute scale and rotation we need to store the multiple touches
            if (pointersLength > 1 && !session.firstMultiple) {
                session.firstMultiple = simpleCloneInputData(input);
            } else if (pointersLength === 1) {
                session.firstMultiple = false;
            }

            var firstInput = session.firstInput;
            var firstMultiple = session.firstMultiple;
            var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

            var center = input.center = getCenter(pointers);
            input.timeStamp = now();
            input.deltaTime = input.timeStamp - firstInput.timeStamp;

            input.angle = getAngle(offsetCenter, center);
            input.distance = getDistance(offsetCenter, center);

            computeDeltaXY(session, input);
            input.offsetDirection = getDirection(input.deltaX, input.deltaY);

            var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
            input.overallVelocityX = overallVelocity.x;
            input.overallVelocityY = overallVelocity.y;
            input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;

            input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
            input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

            input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;

            computeIntervalInputData(session, input);

            // find the correct target
            var target = manager.element;
            if (hasParent(input.srcEvent.target, target)) {
                target = input.srcEvent.target;
            }
            input.target = target;
        }

        function computeDeltaXY(session, input) {
            var center = input.center;
            var offset = session.offsetDelta || {};
            var prevDelta = session.prevDelta || {};
            var prevInput = session.prevInput || {};

            if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
                prevDelta = session.prevDelta = {
                    x: prevInput.deltaX || 0,
                    y: prevInput.deltaY || 0
                };

                offset = session.offsetDelta = {
                    x: center.x,
                    y: center.y
                };
            }

            input.deltaX = prevDelta.x + (center.x - offset.x);
            input.deltaY = prevDelta.y + (center.y - offset.y);
        }

        /**
         * velocity is calculated every x ms
         * @param {Object} session
         * @param {Object} input
         */
        function computeIntervalInputData(session, input) {
            var last = session.lastInterval || input,
                deltaTime = input.timeStamp - last.timeStamp,
                velocity,
                velocityX,
                velocityY,
                direction;

            if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
                var deltaX = input.deltaX - last.deltaX;
                var deltaY = input.deltaY - last.deltaY;

                var v = getVelocity(deltaTime, deltaX, deltaY);
                velocityX = v.x;
                velocityY = v.y;
                velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
                direction = getDirection(deltaX, deltaY);

                session.lastInterval = input;
            } else {
                // use latest velocity info if it doesn't overtake a minimum period
                velocity = last.velocity;
                velocityX = last.velocityX;
                velocityY = last.velocityY;
                direction = last.direction;
            }

            input.velocity = velocity;
            input.velocityX = velocityX;
            input.velocityY = velocityY;
            input.direction = direction;
        }

        /**
         * create a simple clone from the input used for storage of firstInput and firstMultiple
         * @param {Object} input
         * @returns {Object} clonedInputData
         */
        function simpleCloneInputData(input) {
            // make a simple copy of the pointers because we will get a reference if we don't
            // we only need clientXY for the calculations
            var pointers = [];
            var i = 0;
            while (i < input.pointers.length) {
                pointers[i] = {
                    clientX: round(input.pointers[i].clientX),
                    clientY: round(input.pointers[i].clientY)
                };
                i++;
            }

            return {
                timeStamp: now(),
                pointers: pointers,
                center: getCenter(pointers),
                deltaX: input.deltaX,
                deltaY: input.deltaY
            };
        }

        /**
         * get the center of all the pointers
         * @param {Array} pointers
         * @return {Object} center contains `x` and `y` properties
         */
        function getCenter(pointers) {
            var pointersLength = pointers.length;

            // no need to loop when only one touch
            if (pointersLength === 1) {
                return {
                    x: round(pointers[0].clientX),
                    y: round(pointers[0].clientY)
                };
            }

            var x = 0,
                y = 0,
                i = 0;
            while (i < pointersLength) {
                x += pointers[i].clientX;
                y += pointers[i].clientY;
                i++;
            }

            return {
                x: round(x / pointersLength),
                y: round(y / pointersLength)
            };
        }

        /**
         * calculate the velocity between two points. unit is in px per ms.
         * @param {Number} deltaTime
         * @param {Number} x
         * @param {Number} y
         * @return {Object} velocity `x` and `y`
         */
        function getVelocity(deltaTime, x, y) {
            return {
                x: x / deltaTime || 0,
                y: y / deltaTime || 0
            };
        }

        /**
         * get the direction between two points
         * @param {Number} x
         * @param {Number} y
         * @return {Number} direction
         */
        function getDirection(x, y) {
            if (x === y) {
                return DIRECTION_NONE;
            }

            if (abs(x) >= abs(y)) {
                return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
            }
            return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
        }

        /**
         * calculate the absolute distance between two points
         * @param {Object} p1 {x, y}
         * @param {Object} p2 {x, y}
         * @param {Array} [props] containing x and y keys
         * @return {Number} distance
         */
        function getDistance(p1, p2, props) {
            if (!props) {
                props = PROPS_XY;
            }
            var x = p2[props[0]] - p1[props[0]],
                y = p2[props[1]] - p1[props[1]];

            return Math.sqrt(x * x + y * y);
        }

        /**
         * calculate the angle between two coordinates
         * @param {Object} p1
         * @param {Object} p2
         * @param {Array} [props] containing x and y keys
         * @return {Number} angle
         */
        function getAngle(p1, p2, props) {
            if (!props) {
                props = PROPS_XY;
            }
            var x = p2[props[0]] - p1[props[0]],
                y = p2[props[1]] - p1[props[1]];
            return Math.atan2(y, x) * 180 / Math.PI;
        }

        /**
         * calculate the rotation degrees between two pointersets
         * @param {Array} start array of pointers
         * @param {Array} end array of pointers
         * @return {Number} rotation
         */
        function getRotation(start, end) {
            return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
        }

        /**
         * calculate the scale factor between two pointersets
         * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
         * @param {Array} start array of pointers
         * @param {Array} end array of pointers
         * @return {Number} scale
         */
        function getScale(start, end) {
            return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
        }

        var MOUSE_INPUT_MAP = {
            mousedown: INPUT_START,
            mousemove: INPUT_MOVE,
            mouseup: INPUT_END
        };

        var MOUSE_ELEMENT_EVENTS = 'mousedown';
        var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

        /**
         * Mouse events input
         * @constructor
         * @extends Input
         */
        function MouseInput() {
            this.evEl = MOUSE_ELEMENT_EVENTS;
            this.evWin = MOUSE_WINDOW_EVENTS;

            this.pressed = false; // mousedown state

            Input.apply(this, arguments);
        }

        inherit(MouseInput, Input, {
            /**
             * handle mouse events
             * @param {Object} ev
             */
            handler: function MEhandler(ev) {
                var eventType = MOUSE_INPUT_MAP[ev.type];

                // on start we want to have the left mouse button down
                if (eventType & INPUT_START && ev.button === 0) {
                    this.pressed = true;
                }

                if (eventType & INPUT_MOVE && ev.which !== 1) {
                    eventType = INPUT_END;
                }

                // mouse must be down
                if (!this.pressed) {
                    return;
                }

                if (eventType & INPUT_END) {
                    this.pressed = false;
                }

                this.callback(this.manager, eventType, {
                    pointers: [ev],
                    changedPointers: [ev],
                    pointerType: INPUT_TYPE_MOUSE,
                    srcEvent: ev
                });
            }
        });

        var POINTER_INPUT_MAP = {
            pointerdown: INPUT_START,
            pointermove: INPUT_MOVE,
            pointerup: INPUT_END,
            pointercancel: INPUT_CANCEL,
            pointerout: INPUT_CANCEL
        };

        // in IE10 the pointer types is defined as an enum
        var IE10_POINTER_TYPE_ENUM = {
            2: INPUT_TYPE_TOUCH,
            3: INPUT_TYPE_PEN,
            4: INPUT_TYPE_MOUSE,
            5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
        };

        var POINTER_ELEMENT_EVENTS = 'pointerdown';
        var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

        // IE10 has prefixed support, and case-sensitive
        if (window.MSPointerEvent && !window.PointerEvent) {
            POINTER_ELEMENT_EVENTS = 'MSPointerDown';
            POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
        }

        /**
         * Pointer events input
         * @constructor
         * @extends Input
         */
        function PointerEventInput() {
            this.evEl = POINTER_ELEMENT_EVENTS;
            this.evWin = POINTER_WINDOW_EVENTS;

            Input.apply(this, arguments);

            this.store = this.manager.session.pointerEvents = [];
        }

        inherit(PointerEventInput, Input, {
            /**
             * handle mouse events
             * @param {Object} ev
             */
            handler: function PEhandler(ev) {
                var store = this.store;
                var removePointer = false;

                var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
                var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
                var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

                var isTouch = pointerType == INPUT_TYPE_TOUCH;

                // get index of the event in the store
                var storeIndex = inArray(store, ev.pointerId, 'pointerId');

                // start and mouse must be down
                if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                    if (storeIndex < 0) {
                        store.push(ev);
                        storeIndex = store.length - 1;
                    }
                } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                    removePointer = true;
                }

                // it not found, so the pointer hasn't been down (so it's probably a hover)
                if (storeIndex < 0) {
                    return;
                }

                // update the event in the store
                store[storeIndex] = ev;

                this.callback(this.manager, eventType, {
                    pointers: store,
                    changedPointers: [ev],
                    pointerType: pointerType,
                    srcEvent: ev
                });

                if (removePointer) {
                    // remove from the store
                    store.splice(storeIndex, 1);
                }
            }
        });

        var SINGLE_TOUCH_INPUT_MAP = {
            touchstart: INPUT_START,
            touchmove: INPUT_MOVE,
            touchend: INPUT_END,
            touchcancel: INPUT_CANCEL
        };

        var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
        var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

        /**
         * Touch events input
         * @constructor
         * @extends Input
         */
        function SingleTouchInput() {
            this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
            this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
            this.started = false;

            Input.apply(this, arguments);
        }

        inherit(SingleTouchInput, Input, {
            handler: function TEhandler(ev) {
                var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

                // should we handle the touch events?
                if (type === INPUT_START) {
                    this.started = true;
                }

                if (!this.started) {
                    return;
                }

                var touches = normalizeSingleTouches.call(this, ev, type);

                // when done, reset the started state
                if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
                    this.started = false;
                }

                this.callback(this.manager, type, {
                    pointers: touches[0],
                    changedPointers: touches[1],
                    pointerType: INPUT_TYPE_TOUCH,
                    srcEvent: ev
                });
            }
        });

        /**
         * @this {TouchInput}
         * @param {Object} ev
         * @param {Number} type flag
         * @returns {undefined|Array} [all, changed]
         */
        function normalizeSingleTouches(ev, type) {
            var all = toArray$$1(ev.touches);
            var changed = toArray$$1(ev.changedTouches);

            if (type & (INPUT_END | INPUT_CANCEL)) {
                all = uniqueArray(all.concat(changed), 'identifier', true);
            }

            return [all, changed];
        }

        var TOUCH_INPUT_MAP = {
            touchstart: INPUT_START,
            touchmove: INPUT_MOVE,
            touchend: INPUT_END,
            touchcancel: INPUT_CANCEL
        };

        var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

        /**
         * Multi-user touch events input
         * @constructor
         * @extends Input
         */
        function TouchInput() {
            this.evTarget = TOUCH_TARGET_EVENTS;
            this.targetIds = {};

            Input.apply(this, arguments);
        }

        inherit(TouchInput, Input, {
            handler: function MTEhandler(ev) {
                var type = TOUCH_INPUT_MAP[ev.type];
                var touches = getTouches.call(this, ev, type);
                if (!touches) {
                    return;
                }

                this.callback(this.manager, type, {
                    pointers: touches[0],
                    changedPointers: touches[1],
                    pointerType: INPUT_TYPE_TOUCH,
                    srcEvent: ev
                });
            }
        });

        /**
         * @this {TouchInput}
         * @param {Object} ev
         * @param {Number} type flag
         * @returns {undefined|Array} [all, changed]
         */
        function getTouches(ev, type) {
            var allTouches = toArray$$1(ev.touches);
            var targetIds = this.targetIds;

            // when there is only one touch, the process can be simplified
            if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
                targetIds[allTouches[0].identifier] = true;
                return [allTouches, allTouches];
            }

            var i,
                targetTouches,
                changedTouches = toArray$$1(ev.changedTouches),
                changedTargetTouches = [],
                target = this.target;

            // get target touches from touches
            targetTouches = allTouches.filter(function (touch) {
                return hasParent(touch.target, target);
            });

            // collect touches
            if (type === INPUT_START) {
                i = 0;
                while (i < targetTouches.length) {
                    targetIds[targetTouches[i].identifier] = true;
                    i++;
                }
            }

            // filter changed touches to only contain touches that exist in the collected target ids
            i = 0;
            while (i < changedTouches.length) {
                if (targetIds[changedTouches[i].identifier]) {
                    changedTargetTouches.push(changedTouches[i]);
                }

                // cleanup removed touches
                if (type & (INPUT_END | INPUT_CANCEL)) {
                    delete targetIds[changedTouches[i].identifier];
                }
                i++;
            }

            if (!changedTargetTouches.length) {
                return;
            }

            return [
            // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
            uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
        }

        /**
         * Combined touch and mouse input
         *
         * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
         * This because touch devices also emit mouse events while doing a touch.
         *
         * @constructor
         * @extends Input
         */

        var DEDUP_TIMEOUT = 2500;
        var DEDUP_DISTANCE = 25;

        function TouchMouseInput() {
            Input.apply(this, arguments);

            var handler = bindFn(this.handler, this);
            this.touch = new TouchInput(this.manager, handler);
            this.mouse = new MouseInput(this.manager, handler);

            this.primaryTouch = null;
            this.lastTouches = [];
        }

        inherit(TouchMouseInput, Input, {
            /**
             * handle mouse and touch events
             * @param {Hammer} manager
             * @param {String} inputEvent
             * @param {Object} inputData
             */
            handler: function TMEhandler(manager, inputEvent, inputData) {
                var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
                    isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

                if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
                    return;
                }

                // when we're in a touch event, record touches to  de-dupe synthetic mouse event
                if (isTouch) {
                    recordTouches.call(this, inputEvent, inputData);
                } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
                    return;
                }

                this.callback(manager, inputEvent, inputData);
            },

            /**
             * remove the event listeners
             */
            destroy: function destroy() {
                this.touch.destroy();
                this.mouse.destroy();
            }
        });

        function recordTouches(eventType, eventData) {
            if (eventType & INPUT_START) {
                this.primaryTouch = eventData.changedPointers[0].identifier;
                setLastTouch.call(this, eventData);
            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                setLastTouch.call(this, eventData);
            }
        }

        function setLastTouch(eventData) {
            var touch = eventData.changedPointers[0];

            if (touch.identifier === this.primaryTouch) {
                var lastTouch = { x: touch.clientX, y: touch.clientY };
                this.lastTouches.push(lastTouch);
                var lts = this.lastTouches;
                var removeLastTouch = function removeLastTouch() {
                    var i = lts.indexOf(lastTouch);
                    if (i > -1) {
                        lts.splice(i, 1);
                    }
                };
                setTimeout(removeLastTouch, DEDUP_TIMEOUT);
            }
        }

        function isSyntheticEvent(eventData) {
            var x = eventData.srcEvent.clientX,
                y = eventData.srcEvent.clientY;
            for (var i = 0; i < this.lastTouches.length; i++) {
                var t = this.lastTouches[i];
                var dx = Math.abs(x - t.x),
                    dy = Math.abs(y - t.y);
                if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
                    return true;
                }
            }
            return false;
        }

        var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
        var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

        // magical touchAction value
        var TOUCH_ACTION_COMPUTE = 'compute';
        var TOUCH_ACTION_AUTO = 'auto';
        var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
        var TOUCH_ACTION_NONE = 'none';
        var TOUCH_ACTION_PAN_X = 'pan-x';
        var TOUCH_ACTION_PAN_Y = 'pan-y';
        var TOUCH_ACTION_MAP = getTouchActionProps();

        /**
         * Touch Action
         * sets the touchAction property or uses the js alternative
         * @param {Manager} manager
         * @param {String} value
         * @constructor
         */
        function TouchAction(manager, value) {
            this.manager = manager;
            this.set(value);
        }

        TouchAction.prototype = {
            /**
             * set the touchAction value on the element or enable the polyfill
             * @param {String} value
             */
            set: function set$$1(value) {
                // find out the touch-action by the event handlers
                if (value == TOUCH_ACTION_COMPUTE) {
                    value = this.compute();
                }

                if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
                    this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
                }
                this.actions = value.toLowerCase().trim();
            },

            /**
             * just re-set the touchAction value
             */
            update: function update() {
                this.set(this.manager.options.touchAction);
            },

            /**
             * compute the value for the touchAction property based on the recognizer's settings
             * @returns {String} value
             */
            compute: function compute() {
                var actions = [];
                each(this.manager.recognizers, function (recognizer) {
                    if (boolOrFn(recognizer.options.enable, [recognizer])) {
                        actions = actions.concat(recognizer.getTouchAction());
                    }
                });
                return cleanTouchActions(actions.join(' '));
            },

            /**
             * this method is called on each input cycle and provides the preventing of the browser behavior
             * @param {Object} input
             */
            preventDefaults: function preventDefaults(input) {
                var srcEvent = input.srcEvent;
                var direction = input.offsetDirection;

                // if the touch action did prevented once this session
                if (this.manager.session.prevented) {
                    srcEvent.preventDefault();
                    return;
                }

                var actions = this.actions;
                var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
                var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
                var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

                if (hasNone) {
                    //do not prevent defaults if this is a tap gesture

                    var isTapPointer = input.pointers.length === 1;
                    var isTapMovement = input.distance < 2;
                    var isTapTouchTime = input.deltaTime < 250;

                    if (isTapPointer && isTapMovement && isTapTouchTime) {
                        return;
                    }
                }

                if (hasPanX && hasPanY) {
                    // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
                    return;
                }

                if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
                    return this.preventSrc(srcEvent);
                }
            },

            /**
             * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
             * @param {Object} srcEvent
             */
            preventSrc: function preventSrc(srcEvent) {
                this.manager.session.prevented = true;
                srcEvent.preventDefault();
            }
        };

        /**
         * when the touchActions are collected they are not a valid value, so we need to clean things up. *
         * @param {String} actions
         * @returns {*}
         */
        function cleanTouchActions(actions) {
            // none
            if (inStr(actions, TOUCH_ACTION_NONE)) {
                return TOUCH_ACTION_NONE;
            }

            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

            // if both pan-x and pan-y are set (different recognizers
            // for different directions, e.g. horizontal pan but vertical swipe?)
            // we need none (as otherwise with pan-x pan-y combined none of these
            // recognizers will work, since the browser would handle all panning
            if (hasPanX && hasPanY) {
                return TOUCH_ACTION_NONE;
            }

            // pan-x OR pan-y
            if (hasPanX || hasPanY) {
                return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
            }

            // manipulation
            if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
                return TOUCH_ACTION_MANIPULATION;
            }

            return TOUCH_ACTION_AUTO;
        }

        function getTouchActionProps() {
            if (!NATIVE_TOUCH_ACTION) {
                return false;
            }
            var touchMap = {};
            var cssSupports = window.CSS && window.CSS.supports;
            ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {

                // If css.supports is not supported but there is native touch-action assume it supports
                // all values. This is the case for IE 10 and 11.
                touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
            });
            return touchMap;
        }

        /**
         * Recognizer flow explained; *
         * All recognizers have the initial state of POSSIBLE when a input session starts.
         * The definition of a input session is from the first input until the last input, with all it's movement in it. *
         * Example session for mouse-input: mousedown -> mousemove -> mouseup
         *
         * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
         * which determines with state it should be.
         *
         * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
         * POSSIBLE to give it another change on the next cycle.
         *
         *               Possible
         *                  |
         *            +-----+---------------+
         *            |                     |
         *      +-----+-----+               |
         *      |           |               |
         *   Failed      Cancelled          |
         *                          +-------+------+
         *                          |              |
         *                      Recognized       Began
         *                                         |
         *                                      Changed
         *                                         |
         *                                  Ended/Recognized
         */
        var STATE_POSSIBLE = 1;
        var STATE_BEGAN = 2;
        var STATE_CHANGED = 4;
        var STATE_ENDED = 8;
        var STATE_RECOGNIZED = STATE_ENDED;
        var STATE_CANCELLED = 16;
        var STATE_FAILED = 32;

        /**
         * Recognizer
         * Every recognizer needs to extend from this class.
         * @constructor
         * @param {Object} options
         */
        function Recognizer(options) {
            this.options = assign({}, this.defaults, options || {});

            this.id = uniqueId();

            this.manager = null;

            // default is enable true
            this.options.enable = ifUndefined(this.options.enable, true);

            this.state = STATE_POSSIBLE;

            this.simultaneous = {};
            this.requireFail = [];
        }

        Recognizer.prototype = {
            /**
             * @virtual
             * @type {Object}
             */
            defaults: {},

            /**
             * set options
             * @param {Object} options
             * @return {Recognizer}
             */
            set: function set$$1(options) {
                assign(this.options, options);

                // also update the touchAction, in case something changed about the directions/enabled state
                this.manager && this.manager.touchAction.update();
                return this;
            },

            /**
             * recognize simultaneous with an other recognizer.
             * @param {Recognizer} otherRecognizer
             * @returns {Recognizer} this
             */
            recognizeWith: function recognizeWith(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
                    return this;
                }

                var simultaneous = this.simultaneous;
                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                if (!simultaneous[otherRecognizer.id]) {
                    simultaneous[otherRecognizer.id] = otherRecognizer;
                    otherRecognizer.recognizeWith(this);
                }
                return this;
            },

            /**
             * drop the simultaneous link. it doesnt remove the link on the other recognizer.
             * @param {Recognizer} otherRecognizer
             * @returns {Recognizer} this
             */
            dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
                    return this;
                }

                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                delete this.simultaneous[otherRecognizer.id];
                return this;
            },

            /**
             * recognizer can only run when an other is failing
             * @param {Recognizer} otherRecognizer
             * @returns {Recognizer} this
             */
            requireFailure: function requireFailure(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
                    return this;
                }

                var requireFail = this.requireFail;
                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                if (inArray(requireFail, otherRecognizer) === -1) {
                    requireFail.push(otherRecognizer);
                    otherRecognizer.requireFailure(this);
                }
                return this;
            },

            /**
             * drop the requireFailure link. it does not remove the link on the other recognizer.
             * @param {Recognizer} otherRecognizer
             * @returns {Recognizer} this
             */
            dropRequireFailure: function dropRequireFailure(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
                    return this;
                }

                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                var index = inArray(this.requireFail, otherRecognizer);
                if (index > -1) {
                    this.requireFail.splice(index, 1);
                }
                return this;
            },

            /**
             * has require failures boolean
             * @returns {boolean}
             */
            hasRequireFailures: function hasRequireFailures() {
                return this.requireFail.length > 0;
            },

            /**
             * if the recognizer can recognize simultaneous with an other recognizer
             * @param {Recognizer} otherRecognizer
             * @returns {Boolean}
             */
            canRecognizeWith: function canRecognizeWith(otherRecognizer) {
                return !!this.simultaneous[otherRecognizer.id];
            },

            /**
             * You should use `tryEmit` instead of `emit` directly to check
             * that all the needed recognizers has failed before emitting.
             * @param {Object} input
             */
            emit: function emit(input) {
                var self = this;
                var state = this.state;

                function emit(event) {
                    self.manager.emit(event, input);
                }

                // 'panstart' and 'panmove'
                if (state < STATE_ENDED) {
                    emit(self.options.event + stateStr(state));
                }

                emit(self.options.event); // simple 'eventName' events

                if (input.additionalEvent) {
                    // additional event(panleft, panright, pinchin, pinchout...)
                    emit(input.additionalEvent);
                }

                // panend and pancancel
                if (state >= STATE_ENDED) {
                    emit(self.options.event + stateStr(state));
                }
            },

            /**
             * Check that all the require failure recognizers has failed,
             * if true, it emits a gesture event,
             * otherwise, setup the state to FAILED.
             * @param {Object} input
             */
            tryEmit: function tryEmit(input) {
                if (this.canEmit()) {
                    return this.emit(input);
                }
                // it's failing anyway
                this.state = STATE_FAILED;
            },

            /**
             * can we emit?
             * @returns {boolean}
             */
            canEmit: function canEmit() {
                var i = 0;
                while (i < this.requireFail.length) {
                    if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                        return false;
                    }
                    i++;
                }
                return true;
            },

            /**
             * update the recognizer
             * @param {Object} inputData
             */
            recognize: function recognize(inputData) {
                // make a new copy of the inputData
                // so we can change the inputData without messing up the other recognizers
                var inputDataClone = assign({}, inputData);

                // is is enabled and allow recognizing?
                if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
                    this.reset();
                    this.state = STATE_FAILED;
                    return;
                }

                // reset when we've reached the end
                if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
                    this.state = STATE_POSSIBLE;
                }

                this.state = this.process(inputDataClone);

                // the recognizer has recognized a gesture
                // so trigger an event
                if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
                    this.tryEmit(inputDataClone);
                }
            },

            /**
             * return the state of the recognizer
             * the actual recognizing happens in this method
             * @virtual
             * @param {Object} inputData
             * @returns {Const} STATE
             */
            process: function process(inputData) {}, // jshint ignore:line

            /**
             * return the preferred touch-action
             * @virtual
             * @returns {Array}
             */
            getTouchAction: function getTouchAction() {},

            /**
             * called when the gesture isn't allowed to recognize
             * like when another is being recognized or it is disabled
             * @virtual
             */
            reset: function reset() {}
        };

        /**
         * get a usable string, used as event postfix
         * @param {Const} state
         * @returns {String} state
         */
        function stateStr(state) {
            if (state & STATE_CANCELLED) {
                return 'cancel';
            } else if (state & STATE_ENDED) {
                return 'end';
            } else if (state & STATE_CHANGED) {
                return 'move';
            } else if (state & STATE_BEGAN) {
                return 'start';
            }
            return '';
        }

        /**
         * direction cons to string
         * @param {Const} direction
         * @returns {String}
         */
        function directionStr(direction) {
            if (direction == DIRECTION_DOWN) {
                return 'down';
            } else if (direction == DIRECTION_UP) {
                return 'up';
            } else if (direction == DIRECTION_LEFT) {
                return 'left';
            } else if (direction == DIRECTION_RIGHT) {
                return 'right';
            }
            return '';
        }

        /**
         * get a recognizer by name if it is bound to a manager
         * @param {Recognizer|String} otherRecognizer
         * @param {Recognizer} recognizer
         * @returns {Recognizer}
         */
        function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
            var manager = recognizer.manager;
            if (manager) {
                return manager.get(otherRecognizer);
            }
            return otherRecognizer;
        }

        /**
         * This recognizer is just used as a base for the simple attribute recognizers.
         * @constructor
         * @extends Recognizer
         */
        function AttrRecognizer() {
            Recognizer.apply(this, arguments);
        }

        inherit(AttrRecognizer, Recognizer, {
            /**
             * @namespace
             * @memberof AttrRecognizer
             */
            defaults: {
                /**
                 * @type {Number}
                 * @default 1
                 */
                pointers: 1
            },

            /**
             * Used to check if it the recognizer receives valid input, like input.distance > 10.
             * @memberof AttrRecognizer
             * @param {Object} input
             * @returns {Boolean} recognized
             */
            attrTest: function attrTest(input) {
                var optionPointers = this.options.pointers;
                return optionPointers === 0 || input.pointers.length === optionPointers;
            },

            /**
             * Process the input and return the state for the recognizer
             * @memberof AttrRecognizer
             * @param {Object} input
             * @returns {*} State
             */
            process: function process(input) {
                var state = this.state;
                var eventType = input.eventType;

                var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
                var isValid = this.attrTest(input);

                // on cancel input and we've recognized before, return STATE_CANCELLED
                if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
                    return state | STATE_CANCELLED;
                } else if (isRecognized || isValid) {
                    if (eventType & INPUT_END) {
                        return state | STATE_ENDED;
                    } else if (!(state & STATE_BEGAN)) {
                        return STATE_BEGAN;
                    }
                    return state | STATE_CHANGED;
                }
                return STATE_FAILED;
            }
        });

        /**
         * Pan
         * Recognized when the pointer is down and moved in the allowed direction.
         * @constructor
         * @extends AttrRecognizer
         */
        function PanRecognizer() {
            AttrRecognizer.apply(this, arguments);

            this.pX = null;
            this.pY = null;
        }

        inherit(PanRecognizer, AttrRecognizer, {
            /**
             * @namespace
             * @memberof PanRecognizer
             */
            defaults: {
                event: 'pan',
                threshold: 10,
                pointers: 1,
                direction: DIRECTION_ALL
            },

            getTouchAction: function getTouchAction() {
                var direction = this.options.direction;
                var actions = [];
                if (direction & DIRECTION_HORIZONTAL) {
                    actions.push(TOUCH_ACTION_PAN_Y);
                }
                if (direction & DIRECTION_VERTICAL) {
                    actions.push(TOUCH_ACTION_PAN_X);
                }
                return actions;
            },

            directionTest: function directionTest(input) {
                var options = this.options;
                var hasMoved = true;
                var distance = input.distance;
                var direction = input.direction;
                var x = input.deltaX;
                var y = input.deltaY;

                // lock to axis?
                if (!(direction & options.direction)) {
                    if (options.direction & DIRECTION_HORIZONTAL) {
                        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
                        hasMoved = x != this.pX;
                        distance = Math.abs(input.deltaX);
                    } else {
                        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
                        hasMoved = y != this.pY;
                        distance = Math.abs(input.deltaY);
                    }
                }
                input.direction = direction;
                return hasMoved && distance > options.threshold && direction & options.direction;
            },

            attrTest: function attrTest(input) {
                return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
            },

            emit: function emit(input) {

                this.pX = input.deltaX;
                this.pY = input.deltaY;

                var direction = directionStr(input.direction);

                if (direction) {
                    input.additionalEvent = this.options.event + direction;
                }
                this._super.emit.call(this, input);
            }
        });

        /**
         * Pinch
         * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
         * @constructor
         * @extends AttrRecognizer
         */
        function PinchRecognizer() {
            AttrRecognizer.apply(this, arguments);
        }

        inherit(PinchRecognizer, AttrRecognizer, {
            /**
             * @namespace
             * @memberof PinchRecognizer
             */
            defaults: {
                event: 'pinch',
                threshold: 0,
                pointers: 2
            },

            getTouchAction: function getTouchAction() {
                return [TOUCH_ACTION_NONE];
            },

            attrTest: function attrTest(input) {
                return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
            },

            emit: function emit(input) {
                if (input.scale !== 1) {
                    var inOut = input.scale < 1 ? 'in' : 'out';
                    input.additionalEvent = this.options.event + inOut;
                }
                this._super.emit.call(this, input);
            }
        });

        /**
         * Press
         * Recognized when the pointer is down for x ms without any movement.
         * @constructor
         * @extends Recognizer
         */
        function PressRecognizer() {
            Recognizer.apply(this, arguments);

            this._timer = null;
            this._input = null;
        }

        inherit(PressRecognizer, Recognizer, {
            /**
             * @namespace
             * @memberof PressRecognizer
             */
            defaults: {
                event: 'press',
                pointers: 1,
                time: 251, // minimal time of the pointer to be pressed
                threshold: 9 // a minimal movement is ok, but keep it low
            },

            getTouchAction: function getTouchAction() {
                return [TOUCH_ACTION_AUTO];
            },

            process: function process(input) {
                var options = this.options;
                var validPointers = input.pointers.length === options.pointers;
                var validMovement = input.distance < options.threshold;
                var validTime = input.deltaTime > options.time;

                this._input = input;

                // we only allow little movement
                // and we've reached an end event, so a tap is possible
                if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
                    this.reset();
                } else if (input.eventType & INPUT_START) {
                    this.reset();
                    this._timer = setTimeoutContext(function () {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.time, this);
                } else if (input.eventType & INPUT_END) {
                    return STATE_RECOGNIZED;
                }
                return STATE_FAILED;
            },

            reset: function reset() {
                clearTimeout(this._timer);
            },

            emit: function emit(input) {
                if (this.state !== STATE_RECOGNIZED) {
                    return;
                }

                if (input && input.eventType & INPUT_END) {
                    this.manager.emit(this.options.event + 'up', input);
                } else {
                    this._input.timeStamp = now();
                    this.manager.emit(this.options.event, this._input);
                }
            }
        });

        /**
         * Rotate
         * Recognized when two or more pointer are moving in a circular motion.
         * @constructor
         * @extends AttrRecognizer
         */
        function RotateRecognizer() {
            AttrRecognizer.apply(this, arguments);
        }

        inherit(RotateRecognizer, AttrRecognizer, {
            /**
             * @namespace
             * @memberof RotateRecognizer
             */
            defaults: {
                event: 'rotate',
                threshold: 0,
                pointers: 2
            },

            getTouchAction: function getTouchAction() {
                return [TOUCH_ACTION_NONE];
            },

            attrTest: function attrTest(input) {
                return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
            }
        });

        /**
         * Swipe
         * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
         * @constructor
         * @extends AttrRecognizer
         */
        function SwipeRecognizer() {
            AttrRecognizer.apply(this, arguments);
        }

        inherit(SwipeRecognizer, AttrRecognizer, {
            /**
             * @namespace
             * @memberof SwipeRecognizer
             */
            defaults: {
                event: 'swipe',
                threshold: 10,
                velocity: 0.3,
                direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
                pointers: 1
            },

            getTouchAction: function getTouchAction() {
                return PanRecognizer.prototype.getTouchAction.call(this);
            },

            attrTest: function attrTest(input) {
                var direction = this.options.direction;
                var velocity;

                if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
                    velocity = input.overallVelocity;
                } else if (direction & DIRECTION_HORIZONTAL) {
                    velocity = input.overallVelocityX;
                } else if (direction & DIRECTION_VERTICAL) {
                    velocity = input.overallVelocityY;
                }

                return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
            },

            emit: function emit(input) {
                var direction = directionStr(input.offsetDirection);
                if (direction) {
                    this.manager.emit(this.options.event + direction, input);
                }

                this.manager.emit(this.options.event, input);
            }
        });

        /**
         * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
         * between the given interval and position. The delay option can be used to recognize multi-taps without firing
         * a single tap.
         *
         * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
         * multi-taps being recognized.
         * @constructor
         * @extends Recognizer
         */
        function TapRecognizer() {
            Recognizer.apply(this, arguments);

            // previous time and center,
            // used for tap counting
            this.pTime = false;
            this.pCenter = false;

            this._timer = null;
            this._input = null;
            this.count = 0;
        }

        inherit(TapRecognizer, Recognizer, {
            /**
             * @namespace
             * @memberof PinchRecognizer
             */
            defaults: {
                event: 'tap',
                pointers: 1,
                taps: 1,
                interval: 300, // max time between the multi-tap taps
                time: 250, // max time of the pointer to be down (like finger on the screen)
                threshold: 9, // a minimal movement is ok, but keep it low
                posThreshold: 10 // a multi-tap can be a bit off the initial position
            },

            getTouchAction: function getTouchAction() {
                return [TOUCH_ACTION_MANIPULATION];
            },

            process: function process(input) {
                var options = this.options;

                var validPointers = input.pointers.length === options.pointers;
                var validMovement = input.distance < options.threshold;
                var validTouchTime = input.deltaTime < options.time;

                this.reset();

                if (input.eventType & INPUT_START && this.count === 0) {
                    return this.failTimeout();
                }

                // we only allow little movement
                // and we've reached an end event, so a tap is possible
                if (validMovement && validTouchTime && validPointers) {
                    if (input.eventType != INPUT_END) {
                        return this.failTimeout();
                    }

                    var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
                    var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

                    this.pTime = input.timeStamp;
                    this.pCenter = input.center;

                    if (!validMultiTap || !validInterval) {
                        this.count = 1;
                    } else {
                        this.count += 1;
                    }

                    this._input = input;

                    // if tap count matches we have recognized it,
                    // else it has began recognizing...
                    var tapCount = this.count % options.taps;
                    if (tapCount === 0) {
                        // no failing requirements, immediately trigger the tap event
                        // or wait as long as the multitap interval to trigger
                        if (!this.hasRequireFailures()) {
                            return STATE_RECOGNIZED;
                        } else {
                            this._timer = setTimeoutContext(function () {
                                this.state = STATE_RECOGNIZED;
                                this.tryEmit();
                            }, options.interval, this);
                            return STATE_BEGAN;
                        }
                    }
                }
                return STATE_FAILED;
            },

            failTimeout: function failTimeout() {
                this._timer = setTimeoutContext(function () {
                    this.state = STATE_FAILED;
                }, this.options.interval, this);
                return STATE_FAILED;
            },

            reset: function reset() {
                clearTimeout(this._timer);
            },

            emit: function emit() {
                if (this.state == STATE_RECOGNIZED) {
                    this._input.tapCount = this.count;
                    this.manager.emit(this.options.event, this._input);
                }
            }
        });

        /**
         * Simple way to create a manager with a default set of recognizers.
         * @param {HTMLElement} element
         * @param {Object} [options]
         * @constructor
         */
        function Hammer(element, options) {
            options = options || {};
            options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
            return new Manager(element, options);
        }

        /**
         * @const {string}
         */
        Hammer.VERSION = '2.0.7';

        /**
         * default settings
         * @namespace
         */
        Hammer.defaults = {
            /**
             * set if DOM events are being triggered.
             * But this is slower and unused by simple implementations, so disabled by default.
             * @type {Boolean}
             * @default false
             */
            domEvents: false,

            /**
             * The value for the touchAction property/fallback.
             * When set to `compute` it will magically set the correct value based on the added recognizers.
             * @type {String}
             * @default compute
             */
            touchAction: TOUCH_ACTION_COMPUTE,

            /**
             * @type {Boolean}
             * @default true
             */
            enable: true,

            /**
             * EXPERIMENTAL FEATURE -- can be removed/changed
             * Change the parent input target element.
             * If Null, then it is being set the to main element.
             * @type {Null|EventTarget}
             * @default null
             */
            inputTarget: null,

            /**
             * force an input class
             * @type {Null|Function}
             * @default null
             */
            inputClass: null,

            /**
             * Default recognizer setup when calling `Hammer()`
             * When creating a new Manager these will be skipped.
             * @type {Array}
             */
            preset: [
            // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
            [RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],

            /**
             * Some CSS properties can be used to improve the working of Hammer.
             * Add them to this method and they will be set when creating a new Manager.
             * @namespace
             */
            cssProps: {
                /**
                 * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
                 * @type {String}
                 * @default 'none'
                 */
                userSelect: 'none',

                /**
                 * Disable the Windows Phone grippers when pressing an element.
                 * @type {String}
                 * @default 'none'
                 */
                touchSelect: 'none',

                /**
                 * Disables the default callout shown when you touch and hold a touch target.
                 * On iOS, when you touch and hold a touch target such as a link, Safari displays
                 * a callout containing information about the link. This property allows you to disable that callout.
                 * @type {String}
                 * @default 'none'
                 */
                touchCallout: 'none',

                /**
                 * Specifies whether zooming is enabled. Used by IE10>
                 * @type {String}
                 * @default 'none'
                 */
                contentZooming: 'none',

                /**
                 * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
                 * @type {String}
                 * @default 'none'
                 */
                userDrag: 'none',

                /**
                 * Overrides the highlight color shown when the user taps a link or a JavaScript
                 * clickable element in iOS. This property obeys the alpha value, if specified.
                 * @type {String}
                 * @default 'rgba(0,0,0,0)'
                 */
                tapHighlightColor: 'rgba(0,0,0,0)'
            }
        };

        var STOP = 1;
        var FORCED_STOP = 2;

        /**
         * Manager
         * @param {HTMLElement} element
         * @param {Object} [options]
         * @constructor
         */
        function Manager(element, options) {
            this.options = assign({}, Hammer.defaults, options || {});

            this.options.inputTarget = this.options.inputTarget || element;

            this.handlers = {};
            this.session = {};
            this.recognizers = [];
            this.oldCssProps = {};

            this.element = element;
            this.input = createInputInstance(this);
            this.touchAction = new TouchAction(this, this.options.touchAction);

            toggleCssProps(this, true);

            each(this.options.recognizers, function (item) {
                var recognizer = this.add(new item[0](item[1]));
                item[2] && recognizer.recognizeWith(item[2]);
                item[3] && recognizer.requireFailure(item[3]);
            }, this);
        }

        Manager.prototype = {
            /**
             * set options
             * @param {Object} options
             * @returns {Manager}
             */
            set: function set$$1(options) {
                assign(this.options, options);

                // Options that need a little more setup
                if (options.touchAction) {
                    this.touchAction.update();
                }
                if (options.inputTarget) {
                    // Clean up existing event listeners and reinitialize
                    this.input.destroy();
                    this.input.target = options.inputTarget;
                    this.input.init();
                }
                return this;
            },

            /**
             * stop recognizing for this session.
             * This session will be discarded, when a new [input]start event is fired.
             * When forced, the recognizer cycle is stopped immediately.
             * @param {Boolean} [force]
             */
            stop: function stop(force) {
                this.session.stopped = force ? FORCED_STOP : STOP;
            },

            /**
             * run the recognizers!
             * called by the inputHandler function on every movement of the pointers (touches)
             * it walks through all the recognizers and tries to detect the gesture that is being made
             * @param {Object} inputData
             */
            recognize: function recognize(inputData) {
                var session = this.session;
                if (session.stopped) {
                    return;
                }

                // run the touch-action polyfill
                this.touchAction.preventDefaults(inputData);

                var recognizer;
                var recognizers = this.recognizers;

                // this holds the recognizer that is being recognized.
                // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
                // if no recognizer is detecting a thing, it is set to `null`
                var curRecognizer = session.curRecognizer;

                // reset when the last recognizer is recognized
                // or when we're in a new session
                if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
                    curRecognizer = session.curRecognizer = null;
                }

                var i = 0;
                while (i < recognizers.length) {
                    recognizer = recognizers[i];

                    // find out if we are allowed try to recognize the input for this one.
                    // 1.   allow if the session is NOT forced stopped (see the .stop() method)
                    // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
                    //      that is being recognized.
                    // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
                    //      this can be setup with the `recognizeWith()` method on the recognizer.
                    if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) {
                        // 3
                        recognizer.recognize(inputData);
                    } else {
                        recognizer.reset();
                    }

                    // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
                    // current active recognizer. but only if we don't already have an active recognizer
                    if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                        curRecognizer = session.curRecognizer = recognizer;
                    }
                    i++;
                }
            },

            /**
             * get a recognizer by its event name.
             * @param {Recognizer|String} recognizer
             * @returns {Recognizer|Null}
             */
            get: function get$$1(recognizer) {
                if (recognizer instanceof Recognizer) {
                    return recognizer;
                }

                var recognizers = this.recognizers;
                for (var i = 0; i < recognizers.length; i++) {
                    if (recognizers[i].options.event == recognizer) {
                        return recognizers[i];
                    }
                }
                return null;
            },

            /**
             * add a recognizer to the manager
             * existing recognizers with the same event name will be removed
             * @param {Recognizer} recognizer
             * @returns {Recognizer|Manager}
             */
            add: function add(recognizer) {
                if (invokeArrayArg(recognizer, 'add', this)) {
                    return this;
                }

                // remove existing
                var existing = this.get(recognizer.options.event);
                if (existing) {
                    this.remove(existing);
                }

                this.recognizers.push(recognizer);
                recognizer.manager = this;

                this.touchAction.update();
                return recognizer;
            },

            /**
             * remove a recognizer by name or instance
             * @param {Recognizer|String} recognizer
             * @returns {Manager}
             */
            remove: function remove(recognizer) {
                if (invokeArrayArg(recognizer, 'remove', this)) {
                    return this;
                }

                recognizer = this.get(recognizer);

                // let's make sure this recognizer exists
                if (recognizer) {
                    var recognizers = this.recognizers;
                    var index = inArray(recognizers, recognizer);

                    if (index !== -1) {
                        recognizers.splice(index, 1);
                        this.touchAction.update();
                    }
                }

                return this;
            },

            /**
             * bind event
             * @param {String} events
             * @param {Function} handler
             * @returns {EventEmitter} this
             */
            on: function on(events, handler) {
                if (events === undefined) {
                    return;
                }
                if (handler === undefined) {
                    return;
                }

                var handlers = this.handlers;
                each(splitStr(events), function (event) {
                    handlers[event] = handlers[event] || [];
                    handlers[event].push(handler);
                });
                return this;
            },

            /**
             * unbind event, leave emit blank to remove all handlers
             * @param {String} events
             * @param {Function} [handler]
             * @returns {EventEmitter} this
             */
            off: function off(events, handler) {
                if (events === undefined) {
                    return;
                }

                var handlers = this.handlers;
                each(splitStr(events), function (event) {
                    if (!handler) {
                        delete handlers[event];
                    } else {
                        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
                    }
                });
                return this;
            },

            /**
             * emit event to the listeners
             * @param {String} event
             * @param {Object} data
             */
            emit: function emit(event, data) {
                // we also want to trigger dom events
                if (this.options.domEvents) {
                    triggerDomEvent(event, data);
                }

                // no handlers, so skip it all
                var handlers = this.handlers[event] && this.handlers[event].slice();
                if (!handlers || !handlers.length) {
                    return;
                }

                data.type = event;
                data.preventDefault = function () {
                    data.srcEvent.preventDefault();
                };

                var i = 0;
                while (i < handlers.length) {
                    handlers[i](data);
                    i++;
                }
            },

            /**
             * destroy the manager and unbinds all events
             * it doesn't unbind dom events, that is the user own responsibility
             */
            destroy: function destroy() {
                this.element && toggleCssProps(this, false);

                this.handlers = {};
                this.session = {};
                this.input.destroy();
                this.element = null;
            }
        };

        /**
         * add/remove the css properties as defined in manager.options.cssProps
         * @param {Manager} manager
         * @param {Boolean} add
         */
        function toggleCssProps(manager, add) {
            var element = manager.element;
            if (!element.style) {
                return;
            }
            var prop;
            each(manager.options.cssProps, function (value, name) {
                prop = prefixed(element.style, name);
                if (add) {
                    manager.oldCssProps[prop] = element.style[prop];
                    element.style[prop] = value;
                } else {
                    element.style[prop] = manager.oldCssProps[prop] || '';
                }
            });
            if (!add) {
                manager.oldCssProps = {};
            }
        }

        /**
         * trigger dom event
         * @param {String} event
         * @param {Object} data
         */
        function triggerDomEvent(event, data) {
            var gestureEvent = document.createEvent('Event');
            gestureEvent.initEvent(event, true, true);
            gestureEvent.gesture = data;
            data.target.dispatchEvent(gestureEvent);
        }

        assign(Hammer, {
            INPUT_START: INPUT_START,
            INPUT_MOVE: INPUT_MOVE,
            INPUT_END: INPUT_END,
            INPUT_CANCEL: INPUT_CANCEL,

            STATE_POSSIBLE: STATE_POSSIBLE,
            STATE_BEGAN: STATE_BEGAN,
            STATE_CHANGED: STATE_CHANGED,
            STATE_ENDED: STATE_ENDED,
            STATE_RECOGNIZED: STATE_RECOGNIZED,
            STATE_CANCELLED: STATE_CANCELLED,
            STATE_FAILED: STATE_FAILED,

            DIRECTION_NONE: DIRECTION_NONE,
            DIRECTION_LEFT: DIRECTION_LEFT,
            DIRECTION_RIGHT: DIRECTION_RIGHT,
            DIRECTION_UP: DIRECTION_UP,
            DIRECTION_DOWN: DIRECTION_DOWN,
            DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
            DIRECTION_VERTICAL: DIRECTION_VERTICAL,
            DIRECTION_ALL: DIRECTION_ALL,

            Manager: Manager,
            Input: Input,
            TouchAction: TouchAction,

            TouchInput: TouchInput,
            MouseInput: MouseInput,
            PointerEventInput: PointerEventInput,
            TouchMouseInput: TouchMouseInput,
            SingleTouchInput: SingleTouchInput,

            Recognizer: Recognizer,
            AttrRecognizer: AttrRecognizer,
            Tap: TapRecognizer,
            Pan: PanRecognizer,
            Swipe: SwipeRecognizer,
            Pinch: PinchRecognizer,
            Rotate: RotateRecognizer,
            Press: PressRecognizer,

            on: addEventListeners,
            off: removeEventListeners,
            each: each,
            merge: merge,
            extend: extend,
            assign: assign,
            inherit: inherit,
            bindFn: bindFn,
            prefixed: prefixed
        });

        // this prevents errors when Hammer is loaded in the presence of an AMD
        //  style loader but by script tag, not by the loader.
        var freeGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}; // jshint ignore:line
        freeGlobal.Hammer = Hammer;

        if (typeof undefined === 'function' && undefined.amd) {
            undefined(function () {
                return Hammer;
            });
        } else if ('object' != 'undefined' && module.exports) {
            module.exports = Hammer;
        } else {
            window[exportName] = Hammer;
        }
    })(window, document, 'Hammer');
});

var prop = function prop(x) {
  var p = x;
  return function (args) {
    if (args === undefined) {
      return p;
    } else {
      p = args;
    }
  };
};

/* global Hammer */
var Touch = function Touch(_ref) {
  var el = _ref.el,
      orientation = _ref.orientation,
      onStart = _ref.onStart,
      onMove = _ref.onMove,
      onEnd = _ref.onEnd;

  var hammer = new Hammer.Manager(el, {});
  hammer.add(new Hammer.Pan({
    direction: orientation === "vertical" ? Hammer.DIRECTION_VERTICAL : orientation === "all" ? Hammer.DIRECTION_ALL : Hammer.DIRECTION_HORIZONTAL,
    threshold: 0
  }));
  hammer.on("panstart", onStart);
  hammer.on("panmove", onMove);
  hammer.on("panend", onEnd);

  return {
    destroy: function destroy() {
      hammer.off("panstart", onStart);
      hammer.off("panmove", onMove);
      hammer.off("panend", onEnd);
    }
  };
};

var classes = {
  slider: "mithril-slider",
  content: "mithril-slider__content",
  before: "mithril-slider__before",
  after: "mithril-slider__after"
};

var DEFAULT_DURATION = 160;
var DEFAULT_CANCEL_DRAG_FACTOR = 1 / 5;
var DEFAULT_GROUP_SIZE = 1;
var DEFAULT_ORIENTATION = "vertical";
var DEFAULT_DIRECTION = 1;
var DEFAULT_OFFSET_X = 0;
var DEFAULT_OFFSET_Y = 0;

var view = function view(_ref) {
  var state = _ref.state,
      attrs = _ref.attrs;

  if (attrs.sliderController) {
    attrs.sliderController(state);
  }
  var currentIndex = state.index();
  // sizes need to be set each redraw because of screen resizes
  state.groupBy(attrs.groupBy || 1);
  var contentEl = state.contentEl;
  if (contentEl) {
    state.updateContentSize(contentEl);
  }
  return m("div", {
    class: [classes.slider, attrs.class || ""].join(" ")
  }, [attrs.before ? m("." + classes.before, attrs.before) : null, m("div", {
    class: classes.content,
    onupdate: function onupdate(_ref2) {
      var dom = _ref2.dom;

      if (state.inited) {
        return;
      }
      if (dom.childNodes.length > 0) {
        state.setContentEl(dom);
        state.updateContentSize(dom);
        state.touch = new Touch({
          el: dom,
          orientation: attrs.orientation,
          onStart: state.handleDragStart,
          onMove: state.handleDrag,
          onEnd: state.handleDragEnd
        });
        state.inited = true;
      }
    },
    onremove: function onremove() {
      return state.touch && state.touch.destroy();
    }
  }, state.list().map(function (data, listIndex) {
    return attrs.page({
      data: data,
      listIndex: listIndex,
      currentIndex: currentIndex
    });
  })), attrs.after ? m("." + classes.after, attrs.after) : null]);
};

var oninit = function oninit(vnode) {
  var attrs = vnode.attrs;
  var list = prop([]);
  if (attrs.pageData) {
    attrs.pageData().then(function (result) {
      return initWithResult(result);
    });
  }
  var duration = parseInt(attrs.duration, 10) || DEFAULT_DURATION;
  var index = prop(attrs.index || -1);
  var contentEl = void 0;
  var pageSize = 0;
  var groupBy = prop(attrs.groupBy || DEFAULT_GROUP_SIZE);
  var cancelDragFactor = attrs.cancelDragFactor || DEFAULT_CANCEL_DRAG_FACTOR;
  var isVertical = attrs.orientation === DEFAULT_ORIENTATION;
  var dir = attrs.rtl ? -1 : DEFAULT_DIRECTION;
  var pageOffsetX = attrs.pageOffsetX || DEFAULT_OFFSET_X;
  var pageOffsetY = attrs.pageOffsetY || DEFAULT_OFFSET_Y;

  var initWithResult = function initWithResult(result) {
    list(result);
    // First redraw so that pages are drawn
    // continuation in view's oncreate
    m.redraw();
  };

  var setIndex = function setIndex(idx) {
    var oldIndex = index();
    if (oldIndex !== idx) {
      index(idx);
      m.redraw();
      if (attrs.getState) {
        var el = contentEl;
        var page = getPageEl(el, index());
        attrs.getState({
          index: idx,
          hasNext: hasNext(),
          hasPrevious: hasPrevious(),
          pageEl: page
        });
      }
    }
  };

  var getPageEl = function getPageEl(el, idx) {
    return el.childNodes[idx];
  };

  var createAttrs = function createAttrs(value) {
    var x = isVertical ? "0" : value + "px";
    var y = isVertical ? value + "px" : "0";
    var z = "0";
    var attrs = [x, y, z].join(", ");
    return "translate3d(" + attrs + ")";
  };

  var setTransitionStyle = function setTransitionStyle(el, value) {
    var style = el.style;
    style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-ms-transform"] = createAttrs(value);
  };

  var setTransitionDurationStyle = function setTransitionDurationStyle(duration) {
    contentEl.style["-webkit-transition-duration"] = contentEl.style["transition-duration"] = duration + "ms";
  };

  var goTo = function goTo(idx, duration) {
    if (idx < 0 || idx > list().length - 1) {
      return;
    }
    updateContentSize(contentEl);
    if (duration !== undefined) {
      setTransitionDurationStyle(duration);
    }
    setTransitionStyle(contentEl, -dir * idx * pageSize);
    setIndex(idx);
  };

  var normalizedStep = function normalizedStep() {
    var orientation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var idx = index();
    var size = groupBy();
    var min = 0;
    var max = list().length;
    var next = idx + orientation * size;
    // make sure that last item aligns at the right
    if (next + size > max) {
      return max - size;
    }
    if (next < min) {
      return min;
    }
    return next;
  };

  var updateContentSize = function updateContentSize(el) {
    var prop$$1 = isVertical ? "height" : "width";
    var page = el.childNodes[0];
    if (page.getBoundingClientRect()[prop$$1]) {
      pageSize = page.getBoundingClientRect()[prop$$1];
      el.style[prop$$1] = list().length * pageSize + "px";
    }
  };

  var goCurrent = function goCurrent() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    updateContentSize(contentEl);
    setTransitionDurationStyle(duration);
    goTo(normalizedStep());
  };

  var goNext = function goNext() {
    var dur = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : duration;
    return setTransitionDurationStyle(dur), index() < list().length ? goTo(normalizedStep(1)) : goTo(normalizedStep());
  };

  var goPrevious = function goPrevious() {
    var dur = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : duration;
    return setTransitionDurationStyle(dur), index() > 0 ? goTo(normalizedStep(-1)) : goTo(normalizedStep());
  };

  var hasNext = function hasNext() {
    return index() + groupBy() < list().length;
  };

  var hasPrevious = function hasPrevious() {
    return index() > 0;
  };

  var setContentEl = function setContentEl(el) {
    contentEl = el;
    updateContentSize(el);
    goCurrent();
  };

  var handleDragStart = function handleDragStart() {
    return updateContentSize(contentEl), setTransitionDurationStyle(0);
  };

  var handleDrag = function handleDrag(e) {
    var el = contentEl;
    var page = getPageEl(el, index());
    var delta = isVertical ? e.deltaY + pageOffsetY : e.deltaX + pageOffsetX;
    var origin = isVertical ? page.offsetTop : dir === -1 ? page.offsetLeft - page.parentNode.clientWidth + page.clientWidth : page.offsetLeft;
    setTransitionStyle(el, delta - origin);
    e.preventDefault();
  };

  var calculateTransitionDuration = function calculateTransitionDuration(velocity) {
    var el = contentEl;
    var page = getPageEl(el, index());
    var width = page.clientWidth;
    var speed = Math.abs(velocity) || 1;
    var dur = 1 / speed * width;
    if (dur > duration) {
      dur = duration;
    }
    return dur;
  };

  var handleDragEnd = function handleDragEnd(e) {
    var dur = calculateTransitionDuration(e.velocity);
    var delta = isVertical ? e.deltaY : e.deltaX;
    if (Math.abs(delta) > pageSize * groupBy() * cancelDragFactor) {
      if (dir * delta < 0) {
        goNext(dur);
      } else {
        goPrevious(dur);
      }
    } else {
      goCurrent(dur);
    }
  };

  vnode.state = {
    // component methods
    list: list,
    contentEl: contentEl,
    setContentEl: setContentEl,
    handleDrag: handleDrag,
    handleDragStart: handleDragStart,
    handleDragEnd: handleDragEnd,
    groupBy: groupBy,
    updateContentSize: updateContentSize,

    // public interface
    index: index,
    hasNext: hasNext,
    hasPrevious: hasPrevious,
    goTo: goTo,
    goCurrent: goCurrent,
    goNext: goNext,
    goPrevious: goPrevious
  };
};

var slider = {
  oninit: oninit,
  view: view
};

var css = [{
  ".mithril-slider": {
    overflow: "hidden",

    " .mithril-slider__content": {
      transitionProperty: "transform",
      transitionTimingFunction: "ease-out",
      // transition-duration set in js
      transform: "translate3d(0, 0, 0)"
    }
  }
}];

// Derived from Lea Verou's PrefixFree

var allStyles;
var styleAttr;
var styleElement;
var supportedProperty;
var supportedDecl;

function init$1() {
  allStyles = getComputedStyle(document.documentElement, null);
  styleAttr = document.createElement('div').style;
  styleElement = document.documentElement.appendChild(document.createElement('style'));
  supportedDecl = _supportedDecl;
  supportedProperty = _supportedProperty;
  if ('zIndex' in styleAttr && !('z-index' in styleAttr)) {
    // Some browsers like it dash-cased, some camelCased, most like both.
    supportedDecl = function supportedDecl(property, value) {
      return _supportedDecl(camelCase(property), value);
    };
    supportedProperty = function supportedProperty(property) {
      return _supportedProperty(camelCase(property));
    };
  }
}
function finalize() {
  if (typeof document !== 'undefined') document.documentElement.removeChild(styleElement
  // `styleAttr` is used at run time via `supportedProperty()`
  // `allStyles` and `styleElement` can be displosed of after initialization.
  );allStyles = styleElement = null;
}
// Helpers, in alphabetic order

function camelCase(str) {
  return str.replace(/-([a-z])/g, function ($0, $1) {
    return $1.toUpperCase();
  }).replace('-', '');
}
function deCamelCase(str) {
  return str.replace(/[A-Z]/g, function ($0) {
    return '-' + $0.toLowerCase();
  });
}
function _supportedDecl(property, value) {
  styleAttr[property] = '';
  styleAttr[property] = value;
  return !!styleAttr[property];
}
function supportedMedia(condition) {
  styleElement.textContent = '@media (' + condition + '){}';
  // Opera 11 treats unknown conditions as 'all', the rest as 'not all'.
  // So far tested in modern browsers (01/01/2017), and desktop IE9, FF4,
  // Opera 11/12, and Safari 6. TY SauceLabs.
  return !/^@media(?:\s+not)?\s+all/.test(styleElement.sheet.cssRules[0].cssText);
}
function _supportedProperty(property) {
  return property in styleAttr;
}
function supportedRule(selector) {
  styleElement.textContent = selector + '{}';
  return !!styleElement.sheet.cssRules.length;
}

// Derived from Lea Verou's PrefixFree

// TODO: http://caniuse.com/#feat=css-media-resolution

function detectAtrules(fixers) {
  if (fixers.prefix === '') return;
  var atrules = {
    'keyframes': 'name',
    'viewport': null,
    'document': 'regexp(".")'

    // build a map of {'@ruleX': '@-prefix-ruleX'}
  };for (var atrule in atrules) {
    var test = atrule + ' ' + (atrules[atrule] || '');
    if (!supportedRule('@' + test) && supportedRule('@' + fixers.prefix + test)) {

      fixers.hasAtrules = true;
      fixers.atrules['@' + atrule] = '@' + fixers.prefix + atrule;
    }
  }

  // Standard
  fixers.hasDppx = supportedMedia('resolution:1dppx'
  // Webkit
  );fixers.hasPixelRatio = supportedMedia(fixers.prefix + 'device-pixel-ratio:1'
  // Opera
  );fixers.hasPixelRatioFraction = supportedMedia(fixers.prefix + 'device-pixel-ratio:1/1');

  if (fixers.hasPixelRatio || fixers.hasPixelRatioFraction) {
    fixers.properties['resolution'] = fixers.prefix + 'device-pixel-ratio';
    fixers.properties['min-resolution'] = fixers.prefix + 'min-device-pixel-ratio';
    fixers.properties['max-resolution'] = fixers.prefix + 'max-device-pixel-ratio';
    if (supportedMedia('min-' + fixers.prefix + 'device-pixel-ratio:1')) {
      // Mozilla/Firefox tunred a vendor prefix into a vendor infix
      fixers.properties['min-resolution'] = 'min-' + fixers.prefix + 'device-pixel-ratio';
      fixers.properties['max-resolution'] = 'max-' + fixers.prefix + 'device-pixel-ratio';
    }
  }
}

// Derived from Lea Verou's PrefixFree

function detectFunctions(fixers) {
  // Values that might need prefixing
  if (fixers.prefix === '') return;
  var functions = {
    'linear-gradient': {
      property: 'background-image',
      params: 'red, teal'
    },
    'calc': {
      property: 'width',
      params: '1px + 5%'
    },
    'element': {
      property: 'background-image',
      params: '#foo'
    },
    'cross-fade': {
      property: 'backgroundImage',
      params: 'url(a.png), url(b.png), 50%'
    }
  };
  functions['repeating-linear-gradient'] = functions['repeating-radial-gradient'] = functions['radial-gradient'] = functions['linear-gradient'];

  // build an array of prefixable functions
  for (var func in functions) {
    var test = functions[func],
        property = test.property,
        value = func + '(' + test.params + ')';

    if (!supportedDecl(property, value) && supportedDecl(property, fixers.prefix + value)) {
      // It's only supported with a prefix
      fixers.functions.push(func);
    }
  }
}

// Derived from Lea Verou's PrefixFree and Robin Frischmann's Inline Style Prefixer

// TODO: http://caniuse.com/#feat=css-writing-mode

// db of prop/value pairs whose values may need treatment.

var keywords = [

// `initial` applies to all properties and is thus handled separately.
{
  props: ['cursor'],
  values: ['grab', 'grabbing', 'zoom-in', 'zoom-out']
}, {
  props: ['display'],
  values: ['box', 'inline-box', 'flexbox', 'inline-flexbox', 'flex', 'inline-flex', 'grid', 'inline-grid']
}, {
  props: ['position'],
  values: ['sticky']
}, {
  props: ['width', 'column-width', 'height', 'max-height', 'max-width', 'min-height', 'min-width'],
  values: ['contain-floats', 'fill-available', 'fit-content', 'max-content', 'min-content']
}];
// The flexbox zoo
//
// ## Specs:
// - box     (2009/old):  https://www.w3.org/TR/2009/WD-css3-flexbox-20090723/
// - flexbox (2012/ie10): https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/
// - flex    (final):     https://www.w3.org/TR/css-flexbox-1/
var flex2009Props = {
  // ?align-content =>
  // ?align-self =>
  'align-items': 'box-align',
  'flex': 'box-flex', // https://css-tricks.com/snippets/css/a-guide-to-flexbox/#comment-371025,
  // ?flex-basis =>
  // !!flex-direction => box-direction + box-orient, covered in `plugin.js`
  'box-direction': 'box-direction', // we prepopulate the cache for the above case.
  'box-orient': 'box-orient',
  // !!flex-flow => flex-direction and/or flex-wrap, covered in `plugin.js`
  // ?flex-grow =>
  // ?flex-shrink =>
  'flex-wrap': 'box-lines',
  'justify-content': 'box-pack',
  'order': 'box-ordinal-group' // https://css-tricks.com/snippets/css/a-guide-to-flexbox/#comment-371025
};
var flex2009Values = {
  // flex => box || only for display? handled in the code
  'flex-end': 'end',
  'flex-start': 'start',
  // inline-flex => inline-box || see flex
  'nowrap': 'single',
  'space-around': 'justify',
  'space-between': 'justify',
  'wrap': 'multiple',
  'wrap-reverse': 'multiple'
};
var flex2012Props = {
  'align-content': '-ms-flex-line-pack',
  'align-items': '-ms-flex-align',
  'align-self': '-ms-flex-item-align',
  // flex => -ms-flex
  'flex-basis': '-ms-preferred-size',
  // flex-direction => -ms-flex-direction
  // flex-flow => -ms-flex-flow
  'flex-grow': '-ms-flex-positive',
  'flex-shrink': '-ms-flex-negative',
  // flex-wrap => -ms-flex-wrap
  'justify-content': '-ms-flex-pack',
  'order': '-ms-flex-order'
};
var flex2012Values = {
  // flex => flexbox || only for display? handled in the code
  'flex-end': 'end',
  'flex-start': 'start',
  // inline-flex => inline-flexbox || see 'flex'
  // nowrap => nowrap
  'space-around': 'distribute',
  'space-between': 'justify'
  // wrap => wrap
  // wrap-reverse => wrap-reverse
};

function detectKeywords(fixers) {
  if (fixers.prefix === '') return;

  // build a map of {propertyI: {keywordJ: previxedKeywordJ, ...}, ...}
  for (var i = 0; i < keywords.length; i++) {
    var map = {},
        property = keywords[i].props[0];
    // eslint-disable-next-line
    for (var j = 0, keyword; keyword = keywords[i].values[j]; j++) {

      if (!supportedDecl(property, keyword) && supportedDecl(property, fixers.prefix + keyword)) {
        fixers.hasKeywords = true;
        map[keyword] = fixers.prefix + keyword;
      }
    }
    // eslint-disable-next-line
    for (j = 0; property = keywords[i].props[j]; j++) {
      fixers.keywords[property] = map;
    }
  }
  if (fixers.keywords.display && fixers.keywords.display.flexbox && !supportedDecl('display', 'flex')) {
    // old IE
    fixers.keywords.display.flex = fixers.keywords.display.flexbox;
    fixers.keywords.display['inline-flex'] = fixers.keywords.display['inline-flexbox'];
    for (var k in flex2012Props) {
      fixers.properties[k] = flex2012Props[k];
      fixers.keywords[k] = flex2012Values;
    }
  } else if (fixers.keywords.display && fixers.keywords.display.box && !supportedDecl('display', 'flex')) {
    // old flexbox spec
    fixers.keywords.display.flex = fixers.keywords.display.box;
    fixers.keywords.display['inline-flex'] = fixers.keywords.display['inline-box'];
    fixers.flexbox2009 = true;
    for (k in flex2009Props) {
      fixers.properties[k] = fixers.prefix + flex2009Props[k];
      fixers.keywords[k] = flex2009Values;
    }
  }
  if (!supportedDecl('color', 'initial') && supportedDecl('color', fixers.prefix + 'initial')) {
    // `initial` does not use the `hasKeywords` branch, no need to set it to true.
    fixers.initial = fixers.prefix + 'initial';
  }
}

// Derived from Lea Verou's PrefixFree

function detectPrefix(fixers) {
  var prefixCounters = {};
  // Why are we doing this instead of iterating over properties in a .style object? Because Webkit.
  // 1. Older Webkit won't iterate over those.
  // 2. Recent Webkit will, but the 'Webkit'-prefixed properties are not enumerable. The 'webkit'
  //    (lower case 'w') ones are, but they don't `deCamelCase()` into a prefix that we can detect.

  function iteration(property) {
    if (property.charAt(0) === '-') {
      var prefix = property.split('-')[1];

      // Count prefix uses
      prefixCounters[prefix] = ++prefixCounters[prefix] || 1;
    }
  }

  // Some browsers have numerical indices for the properties, some don't
  if (allStyles && allStyles.length > 0) {
    for (var i = 0; i < allStyles.length; i++) {
      iteration(allStyles[i]);
    }
  } else {
    for (var property in allStyles) {
      iteration(deCamelCase(property));
    }
  }

  var highest = 0;
  for (var prefix in prefixCounters) {
    if (highest < prefixCounters[prefix]) {
      highest = prefixCounters[prefix];
      fixers.prefix = '-' + prefix + '-';
    }
  }
  fixers.Prefix = camelCase(fixers.prefix);
}

// Derived from Lea Verou's PrefixFree

function detectSelectors(fixers) {
  var selector, prefixed;
  function prefixSelector(selector) {
    return selector.replace(/^::?/, function ($0) {
      return $0 + fixers.prefix;
    });
  }

  if (fixers.prefix === '') return;
  var selectors = {
    ':any-link': ':any-link',
    ':read-only': ':read-only',
    ':read-write': ':read-write',
    '::selection': '::selection',

    ':fullscreen': ':fullscreen', //TODO sort out what changed between specs
    ':full-screen': ':fullscreen',
    '::backdrop': '::backdrop',

    //sigh
    ':placeholder': '::placeholder',
    '::placeholder': '::placeholder',
    ':input-placeholder': '::placeholder',
    '::input-placeholder': '::placeholder'

    // builds an array of selectors that need a prefix.
  };for (selector in selectors) {
    prefixed = prefixSelector(selector);
    if (!supportedRule(selector) && supportedRule(prefixed)) {
      fixers.hasSelectors = true;
      fixers.selectorList.push(selectors[selector]);
      fixers.selectorMap[selectors[selector]] = prefixed;
    }
  }
}

function blankFixers() {
  return {
    atrules: {},
    hasAtrules: false,
    hasDppx: null,
    hasKeywords: false,
    hasPixelRatio: false,
    hasPixelRatioFraction: false,
    hasSelectors: false,
    hasValues: false,
    fixAtMediaParams: null,
    fixAtSupportsParams: null,
    fixProperty: null,
    fixSelector: null,
    fixValue: null,
    flexbox2009: false,
    functions: [],
    initial: null,
    keywords: {},
    placeholder: null,
    prefix: '',
    Prefix: '',
    properties: {},
    selectorList: [],
    selectorMap: {},
    valueProperties: {
      'transition': 1,
      'transition-property': 1,
      'will-change': 1
    }
  };
}

function browserDetector(fixers) {
  // add the required data to the fixers object.
  init$1();
  detectPrefix(fixers);
  detectSelectors(fixers);
  detectAtrules(fixers);
  detectKeywords(fixers);
  detectFunctions(fixers);
  finalize();
}

var emptySet = {};

var valueTokenizer = /[(),]|\/\*[\s\S]*?\*\//g;

/**
 * For properties whose values are also properties, this will split a coma-separated
 * value list into individual values, ignoring comas in comments and in
 * functions(parameter, lists).
 *
 * @param {string} selector
 * @return {string[]}
 */

function splitValue(value) {
  var indices = [],
      res = [],
      inParen = 0,
      o;
  /*eslint-disable no-cond-assign*/
  while (o = valueTokenizer.exec(value)) {
    /*eslint-enable no-cond-assign*/
    switch (o[0]) {
      case '(':
        inParen++;break;
      case ')':
        inParen--;break;
      case ',':
        if (inParen) break;indices.push(o.index);
    }
  }
  for (o = indices.length; o--;) {
    res.unshift(value.slice(indices[o] + 1));
    value = value.slice(0, indices[o]);
  }
  res.unshift(value);
  return res;
}

function makeDetector(before, targets, after) {
  return new RegExp(before + '(?:' + targets.join('|') + ')' + after);
}

function makeLexer(before, targets, after) {
  return new RegExp("\"(?:\\\\[\\S\\s]|[^\"])*\"|'(?:\\\\[\\S\\s]|[^'])*'|\\/\\*[\\S\\s]*?\\*\\/|" + before + '((?:' + targets.join('|') + '))' + after, 'gi');
}

function finalizeFixers(fixers) {
  var prefix = fixers.prefix;

  // properties
  // ----------

  fixers.fixProperty = fixers.fixProperty || function (prop) {
    var prefixed;
    return fixers.properties[prop] = supportedProperty(prop) || !supportedProperty(prefixed = prefix + prop) ? prop : prefixed;
  };

  // selectors
  // ----------

  var selectorDetector = makeDetector('', fixers.selectorList, '(?:\\b|$|[^-])');
  var selectorMatcher = makeLexer('', fixers.selectorList, '(?:\\b|$|[^-])');
  var selectorReplacer = function selectorReplacer(match, selector) {
    return selector != null ? fixers.selectorMap[selector] : match;
  };
  fixers.fixSelector = function (selector) {
    return selectorDetector.test(selector) ? selector.replace(selectorMatcher, selectorReplacer) : selector;
  };

  // values
  // ------

  // When gradients are supported with a prefix, convert angles to legacy
  // (from clockwise to trigonometric)
  var hasGradients = fixers.functions.indexOf('linear-gradient') > -1;
  var gradientDetector = /\blinear-gradient\(/;
  var gradientMatcher = /(^|\s|,|\()((?:repeating-)?linear-gradient\()\s*(-?\d*\.?\d*)deg/ig;
  var gradientReplacer = function gradientReplacer(match, delim, gradient, deg) {
    return delim + gradient + (90 - deg) + 'deg';
  };

  // functions
  var hasFunctions = !!fixers.functions.length;
  var functionsDetector = makeDetector('(?:^|\\s|,|\\()', fixers.functions, '\\s*\\(');
  var functionsMatcher = makeLexer('(^|\\s|,|\\()', fixers.functions, '(?=\\s*\\()');
  function functionReplacer(match, $1, $2) {
    return $1 + prefix + $2;
  }

  // properties as values (for transition, ...)
  // No need to look for strings in these properties. We may insert prefixes in comments. Oh the humanity.
  var valuePropertiesMatcher = /^\s*([-\w]+)/gi;
  var valuePropertiesReplacer = function valuePropertiesReplacer(match, prop) {
    return fixers.properties[prop] || fixers.fixProperty(prop);
  };

  fixers.fixValue = function (value, property) {
    var res;
    if (fixers.initial != null && value === 'initial') return fixers.initial;

    if (fixers.hasKeywords && (res = (fixers.keywords[property] || emptySet)[value])) return res;

    res = value;

    if (fixers.valueProperties.hasOwnProperty(property)) {
      res = value.indexOf(',') === -1 ? value.replace(valuePropertiesMatcher, valuePropertiesReplacer) : splitValue(value).map(function (v) {
        return v.replace(valuePropertiesMatcher, valuePropertiesReplacer);
      }).join(',');
    }

    if (hasFunctions && functionsDetector.test(value)) {
      if (hasGradients && gradientDetector.test(value)) {
        res = res.replace(gradientMatcher, gradientReplacer);
      }
      res = res.replace(functionsMatcher, functionReplacer);
    }
    return res;
  };

  // @media (resolution:...) {
  // -------------------------

  var resolutionMatcher = /((?:min-|max-)?resolution)\s*:\s*((?:\d*.)?\d+)dppx/g;
  var resolutionReplacer = fixers.hasPixelRatio ? function (_, prop, param) {
    return fixers.properties[prop] + ':' + param;
  } : fixers.hasPixelRatioFraction ? function (_, prop, param) {
    return fixers.properties[prop] + ':' + Math.round(param * 10) + '/10';
  } : function (_, prop, param) {
    return prop + ':' + Math.round(param * 96) + 'dpi';
  };

  fixers.fixAtMediaParams = fixers.hasDppx !== false /*it may be null*/ ? function (p) {
    return p;
  } : function (params) {
    return params.indexOf('reso') !== -1 ? params.replace(resolutionMatcher, resolutionReplacer) : params;
  };

  // @supports ... {
  // ---------------

  // regexp built by scripts/regexps.js
  var atSupportsParamsMatcher = /\(\s*([-\w]+)\s*:\s*((?:"(?:\\[\S\s]|[^"])*"|'(?:\\[\S\s]|[^'])*'|\/\*[\S\s]*?\*\/|\((?:"(?:\\[\S\s]|[^"])*"|'(?:\\[\S\s]|[^'])*'|\/\*[\S\s]*?\*\/|\((?:"(?:\\[\S\s]|[^"])*"|'(?:\\[\S\s]|[^'])*'|\/\*[\S\s]*?\*\/|\((?:"(?:\\[\S\s]|[^"])*"|'(?:\\[\S\s]|[^'])*'|\/\*[\S\s]*?\*\/|\((?:"(?:\\[\S\s]|[^"])*"|'(?:\\[\S\s]|[^'])*'|\/\*[\S\s]*?\*\/|\([^\)]*\)|[^\)])*\)|[^\)])*\)|[^\)])*\)|[^\)])*\)|[^\)])*)/g;
  function atSupportsParamsReplacer(match, prop, value) {
    return '(' + (fixers.properties[prop] || fixers.fixProperty(prop)) + ':' + fixers.fixValue(value, prop);
  }
  fixers.fixAtSupportsParams = function (params) {
    return params.replace(atSupportsParamsMatcher, atSupportsParamsReplacer);
  };
}

var commonFixers;

function initBrowser() {
  commonFixers = blankFixers();
  if (typeof getComputedStyle === 'function') browserDetector(commonFixers);
  finalizeFixers(commonFixers);
}
initBrowser();

function prefixPlugin(j2c) {
  var fixers = commonFixers;
  var cache = [];

  if (j2c) j2c.setPrefixDb = function (f) {
    if (cache.indexOf(f) === -1) {
      finalizeFixers(f);
      cache.push(f);
    }
    fixers = f;
    return prefixPlugin;
  };
  return {
    $filter: function $filter(next) {
      return {
        atrule: function atrule(rule, kind, params, hasBlock) {
          next.atrule(fixers.hasAtrules && fixers.atrules[rule] || rule, kind, rule === '@media' ? fixers.fixAtMediaParams(params) : rule === '@supports' ? fixers.fixAtSupportsParams(params) : params, hasBlock);
        },
        decl: function decl(property, value) {
          if (!property || !(typeof value === 'string' || typeof value === 'number')) {
            return next.decl(fixers.properties[property] || fixers.fixProperty(property), value);
          }
          value = value + '';
          if (property === 'flex-flow' && fixers.flexbox2009) {
            value.split(' ').forEach(function (v) {
              // recurse! The lack of `next.` is intentional.
              if (v.indexOf('wrap') > -1) decl('flex-wrap', v);else if (v !== '') decl('flex-direction', v);
            });
          } else if (property === 'flex-direction' && fixers.flexbox2009) {
            next.decl(fixers.properties['box-orient'], value.indexOf('column') > -1 ? 'block-axis' : 'inline-axis');
            next.decl(fixers.properties['box-direction'], value.indexOf('-reverse') > -1 ? 'reverse' : 'normal');
          } else {
            next.decl(fixers.properties[property] || fixers.fixProperty(property), fixers.fixValue(value, property));
          }
        },
        rule: function rule(selector) {
          next.rule(fixers.hasSelectors ? fixers.fixSelector(selector) : selector);
        }
      };
    }
  };
}

var emptyArray = [];
var emptyObject = {};
var type = emptyObject.toString;
var ARRAY = type.call(emptyArray);
var OBJECT = type.call(emptyObject);
var STRING = type.call('');
var FUNCTION = type.call(type);
var own = emptyObject.hasOwnProperty;
var freeze = Object.freeze || function (o) {
  return o;
};

function defaults$1(target, source) {
  for (var k in source) {
    if (own.call(source, k)) {
      if (k.indexOf('$') && !(k in target)) target[k] = source[k];
    }
  }return target;
}

function cartesian(a, b) {
  var res = [],
      i,
      j;
  for (j in b) {
    if (own.call(b, j)) for (i in a) {
      if (own.call(a, i)) res.push(a[i] + b[j]);
    }
  }return res;
}

// "Tokenizes" the selectors into parts relevant for the next function.
// Strings and comments are matched, but ignored afterwards.
// This is not a full tokenizers. It only recognizes comas, parentheses,
// strings and comments.
// regexp generated by scripts/regexps.js then trimmed by hand
var selectorTokenizer = /[(),]|"(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'|\/\*[\s\S]*?\*\//g;

/**
 * This will split a coma-separated selector list into individual selectors,
 * ignoring comas in strings, comments and in :pseudo-selectors(parameter, lists).
 *
 * @param {string} selector
 * @return {string[]}
 */

function splitSelector(selector) {
  var indices = [],
      res = [],
      inParen = 0,
      o;
  /*eslint-disable no-cond-assign*/
  while (o = selectorTokenizer.exec(selector)) {
    /*eslint-enable no-cond-assign*/
    switch (o[0]) {
      case '(':
        inParen++;break;
      case ')':
        inParen--;break;
      case ',':
        if (inParen) break;indices.push(o.index);
    }
  }
  for (o = indices.length; o--;) {
    res.unshift(selector.slice(indices[o] + 1));
    selector = selector.slice(0, indices[o]);
  }
  res.unshift(selector);
  return res;
}

// Like the `selectorTokenizer`, but for the `&` operator
var ampersandTokenizer = /&|"(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'|\/\*[\s\S]*?\*\//g;

function ampersand(selector, parents) {
  var indices = [],
      split = [],
      res,
      o;
  /*eslint-disable no-cond-assign*/
  while (o = ampersandTokenizer.exec(selector)) {
    /*eslint-enable no-cond-assign*/
    if (o[0] == '&') indices.push(o.index);
  }
  for (o = indices.length; o--;) {
    split.unshift(selector.slice(indices[o] + 1));
    selector = selector.slice(0, indices[o]);
  }
  split.unshift(selector);
  if (split.length === 1) split.unshift('');
  res = [split[0]];
  for (o = 1; o < split.length; o++) {
    res = cartesian(res, cartesian(parents, [split[o]]));
  }
  return res.join(',');
}

function flatIter(f) {
  return function iter(arg) {
    if (type.call(arg) === ARRAY) for (var i = 0; i < arg.length; i++) {
      iter(arg[i]);
    } else f(arg);
  };
}

function decamelize(match) {
  return '-' + match.toLowerCase();
}

/**
 * Handles the property:value; pairs.
 *
 * @param {object} state - holds the localizer- and walker-related methods
 *                         and state
 * @param {object} emit - the contextual emitters to the final buffer
 * @param {string} prefix - the current property or a prefix in case of nested
 *                          sub-properties.
 * @param {array|object|string} o - the declarations.
 * @param {boolean} local - are we in @local or in @global scope.
 */

function declarations(state, emit, prefix, o, local) {
  var k, v, kk;
  if (o == null) return;

  switch (type.call(o = o.valueOf())) {
    case ARRAY:
      for (k = 0; k < o.length; k++) {

        declarations(state, emit, prefix, o[k], local);
      }break;
    case OBJECT:
      // prefix is falsy iif it is the empty string, which means we're at the root
      // of the declarations list.
      prefix = prefix && prefix + '-';
      for (k in o) {
        if (own.call(o, k)) {
          v = o[k];
          if (/\$/.test(k)) {
            for (kk in k = k.split('$')) {
              if (own.call(k, kk)) {

                declarations(state, emit, prefix + k[kk], v, local);
              }
            }
          } else {

            declarations(state, emit, prefix + k, v, local);
          }
        }
      }break;
    default:
      // prefix is falsy when it is "", which means that we're
      // at the top level.
      // `o` is then treated as a `property:value` pair, or a
      // semi-colon-separated list thereof.
      // Otherwise, `prefix` is the property name, and
      // `o` is the value.

      // restore the dashes
      k = prefix.replace(/_/g, '-').replace(/[A-Z]/g, decamelize);

      if (local && (k == 'animation-name' || k == 'animation' || k == 'list-style')) {
        // no need to tokenize here a plain `.split(',')` has all bases covered.
        // We may 'localize' a comment, but it's not a big deal.
        o = o.split(',').map(function (o) {

          return o.replace(/^\s*(?:(var\([^)]+\))|:?global\(\s*([_A-Za-z][-\w]*)\s*\)|()(-?[_A-Za-z][-\w]*))/, state.localizeReplacer);
        }).join(',');
      }

      emit.decl(k, o);

  }
}

/**
 * Handles a single at-rules
 *
 * @param {object} state - holds the localizer- and walker-related methods
 *                         and state
 * @param {object} emit - the contextual emitters to the final buffer
 * @param {array} k - The parsed at-rule, including the parameters,
 *                    if takes both parameters and a block.
 *                    k == [match, fullAtRule, atRuleType, params?]
 *                    So in `@-webkit-keyframes foo`, we have
 *                     - match = "@-webkit-keyframes foo"
 *                     - fullAtRule = "@-webkit-keyframes"
 *                     - atRuleType = "keyframes"
 *                     - params = "foo"
 * @param {string|string[]|object|object[]} v - Either parameters for
 *                                              block-less rules or
 *                                              their block
 *                                              for the others.
 * @param {string} prefix - the current selector or the selector prefix
 *                          in case of nested rules
 * @param {boolean} local - are we in @local or in @global scope?
 * @param {string} nestingDepth - are we nested in an at-rule or a selector?
 */

function atRules(state, emit, k, v, prefix, local, nestingDepth) {

  // First iterate over user-provided at-rules and return if one of them corresponds to the current one
  for (var i = 0; i < state.$atHandlers.length; i++) {

    if (state.$atHandlers[i](state, emit, k, v, prefix, local, nestingDepth)) return;
  }

  // using `/^global$/.test(k[2])` rather that 'global' == k[2] gzips
  // slightly better thanks to the regexps tests further down.
  // It is slightly less efficient but this isn't a critical path.

  if (!k[3] && /^global$/.test(k[2])) {

    rules(state, emit, prefix, v, 0, nestingDepth);
  } else if (!k[3] && /^local$/.test(k[2])) {

    rules(state, emit, prefix, v, 1, nestingDepth);
  } else if (k[3] && /^adopt$/.test(k[2])) {

    if (!local || nestingDepth) return emit.err('@adopt global or nested: ' + k[0]);

    if (!/^\.?[_A-Za-z][-\w]*$/.test(k[3])) return emit.err('bad adopter ' + JSON.stringify(k[3]) + ' in ' + k[0]);

    i = [];
    flatIter(function (adoptee, asString) {

      if (adoptee == null || !/^\.?[_A-Za-z][-\w]*(?:\s+\.?[_A-Za-z][-\w]*)*$/.test(asString = adoptee + '')) emit.err('bad adoptee ' + JSON.stringify(adoptee) + ' in ' + k[0]);else i.push(asString.replace(/\./g, ''));
    })(v);

    // we may end up with duplicate classes but AFAIK it has no consequences on specificity.
    if (i.length) {
      state.localize(k[3] = k[3].replace(/\./g, ''));
      state.names[k[3]] += ' ' + i.join(' ');
    }
  } else if (!k[3] && /^(?:namespace|import|charset)$/.test(k[2])) {
    flatIter(function (v) {

      emit.atrule(k[1], k[2], v);
    })(v);
  } else if (!k[3] && /^(?:font-face|viewport)$/.test(k[2])) {
    flatIter(function (v) {

      emit.atrule(k[1], k[2], k[3], 1);

      declarations(state, emit, '', v, local);

      emit._atrule();
    })(v);
  } else if (k[3] && /^(?:media|supports|page|keyframes)$/.test(k[2])) {

    if (local && 'keyframes' == k[2]) {
      k[3] = k[3].replace(
      // generated by script/regexps.js
      /(var\([^)]+\))|:?global\(\s*([_A-Za-z][-\w]*)\s*\)|()(-?[_A-Za-z][-\w]*)/, state.localizeReplacer);
    }

    emit.atrule(k[1], k[2], k[3], 1);

    if ('page' == k[2]) {

      declarations(state, emit, '', v, local);
    } else {

      rules(state, emit, 'keyframes' == k[2] ? '' : prefix, v, local, nestingDepth + 1);
    }

    emit._atrule();
  } else {

    emit.err('Unsupported at-rule: ' + k[0]);
  }
}

/**
 * Add rulesets and other CSS tree to the sheet.
 *
 * @param {object} state - holds the localizer- and walker-related methods
 *                         and state
 * @param {object} emit - the contextual emitters to the final buffer
 * @param {string} prefix - the current selector or a prefix in case of nested rules
 * @param {array|string|object} tree - a source object or sub-object.
 * @param {string} nestingDepth - are we nested in an at-rule?
 * @param {boolean} local - are we in @local or in @global scope?
 */
function rules(state, emit, prefix, tree, local, nestingDepth) {
  var k, v, inDeclaration, kk;

  switch (type.call(tree)) {

    case OBJECT:
      for (k in tree) {
        if (own.call(tree, k)) {
          v = tree[k];

          if (prefix.length > 0 && /^[-\w$]+$/.test(k)) {
            if (!inDeclaration) {
              inDeclaration = 1;

              emit.rule(prefix);
            }
            if (/\$/.test(k)) {
              for (kk in k = k.split('$')) {
                if (own.call(k, kk)) {

                  declarations(state, emit, k[kk], v, local);
                }
              }
            } else {

              declarations(state, emit, k, v, local);
            }
          } else if (/^@/.test(k)) {
            // Handle At-rules
            inDeclaration = 0;

            atRules(state, emit, /^(.(?:-[\w]+-)?([_A-Za-z][-\w]*))\b\s*(.*?)\s*$/.exec(k) || [k, '@', '', ''], v, prefix, local, nestingDepth);
          } else {
            // selector or nested sub-selectors
            inDeclaration = 0;

            rules(state, emit,
            // build the selector `prefix` for the next iteration.
            // ugly and full of redundant bits but so far the fastest/shortest.gz
            /*0 if*/prefix.length > 0 && (/,/.test(prefix) || /,/.test(k)) ? (

            /*0 then*/kk = splitSelector(prefix), splitSelector(local ? k.replace(/("(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'|\/\*[\s\S]*?\*\/)|:global\(\s*(\.-?[_A-Za-z][-\w]*)\s*\)|(\.)(-?[_A-Za-z][-\w]*)/g, state.localizeReplacer) : k).map(function (k) {
              return (/&/.test(k) ? ampersand(k, kk) : kk.map(function (kk) {
                  return kk + k;
                }).join(',')
              );
            }).join(',')) :

            /*0 else*/ /*1 if*//&/.test(k) ?

            /*1 then*/ampersand(local ? k.replace(/("(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'|\/\*[\s\S]*?\*\/)|:global\(\s*(\.-?[_A-Za-z][-\w]*)\s*\)|(\.)(-?[_A-Za-z][-\w]*)/g, state.localizeReplacer) : k, [prefix]) :

            /*1 else*/prefix + (local ? k.replace(/("(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'|\/\*[\s\S]*?\*\/)|:global\(\s*(\.-?[_A-Za-z][-\w]*)\s*\)|(\.)(-?[_A-Za-z][-\w]*)/g, state.localizeReplacer) : k), v, local, nestingDepth + 1);
          }
        }
      }break;

    case ARRAY:
      for (k = 0; k < tree.length; k++) {

        rules(state, emit, prefix, tree[k], local, nestingDepth);
      }
      break;

    case STRING:
      // CSS hacks or ouptut of `j2c.inline`.
      if (!prefix.length) emit.err('No selector');
      emit.rule(prefix || ' ');

      declarations(state, emit, '', tree, local);

  }
}

// This is the first entry in the filters array, which is
// actually the last step of the compiler. It inserts
// closing braces to close normal (non at-) rules (those
// that start with a selector). Doing it earlier is
// impossible without passing state around in unrelated code
// or ending up with duplicated selectors when the source tree
// contains arrays.
// There's no `_rule` handler, because the core compiler never
// calls it.
function closeSelectors(next, inline) {
  var lastSelector;
  return inline ? next : {
    init: function init() {
      lastSelector = 0;next.init();
    },
    done: function done(raw) {
      if (lastSelector) {
        next._rule();lastSelector = 0;
      }
      return next.done(raw);
    },
    atrule: function atrule(rule, kind, param, takesBlock) {
      if (lastSelector) {
        next._rule();lastSelector = 0;
      }
      next.atrule(rule, kind, param, takesBlock);
    },
    _atrule: function _atrule(rule) {
      if (lastSelector) {
        next._rule();lastSelector = 0;
      }
      next._atrule(rule);
    },
    rule: function rule(selector) {
      if (selector !== lastSelector) {
        if (lastSelector) next._rule();
        next.rule(selector);
        lastSelector = selector;
      }
    }
  };
}

function global$1(x) {
  return ':global(' + x + ')';
}

function kv(k, v, o) {
  o = {};
  o[k] = v;
  return o;
}

function at(rule, params, block) {
  if (arguments.length < 3) {
    // inner curry!
    var _at = at.bind.apply(at, [null].concat([].slice.call(arguments, 0)));
    // So that it can be used as a key in an ES6 object literal.
    _at.toString = function () {
      return '@' + rule + ' ' + params;
    };
    return _at;
  } else return kv('@' + rule + ' ' + params, block);
}

function j2c$1() {

  // the buffer that accumulates the output. Initialized in `$sink.i()`
  var buf, _err;

  // the bottom of the 'codegen' stream. Mirrors the `$filter` plugin API.
  var $sink = {
    init: function init() {
      buf = [], _err = [];
    },
    done: function done(raw) {
      if (_err.length != 0) throw new Error('j2c error(s): ' + JSON.stringify(_err, null, 2) + 'in context:\n' + buf.join(''));
      return raw ? buf : buf.join('');
    },
    err: function err(msg) {
      _err.push(msg);
      buf.push('/* +++ ERROR +++ ' + msg + ' */\n');
    },
    atrule: function atrule(rule, kind, param, takesBlock) {
      buf.push(rule, param && ' ', param, takesBlock ? ' {' : ';', _instance.endline);
    },
    // close atrule
    _atrule: function _atrule() {
      buf.push('}', _instance.endline);
    },
    rule: function rule(selector) {
      buf.push(selector, ' {', _instance.endline);
    },
    // close rule
    _rule: function _rule() {
      buf.push('}', _instance.endline);
    },
    decl: function decl(prop, value) {
      buf.push(prop, prop && ':', value, ';', _instance.endline);
    }
  };

  // holds the `$filter` and `$at` handlers
  var $filters = [closeSelectors];
  var $atHandlers = [];

  // the public API (see the main docs)
  var _instance = {
    at: at,
    global: global$1,
    kv: kv,
    names: {},
    endline: '\n',
    suffix: '__j2c-' +
    // 128 bits of randomness
    Math.floor(Math.random() * 0x100000000).toString(36) + '-' + Math.floor(Math.random() * 0x100000000).toString(36) + '-' + Math.floor(Math.random() * 0x100000000).toString(36) + '-' + Math.floor(Math.random() * 0x100000000).toString(36),
    $plugins: [],
    sheet: function sheet(tree) {
      var emit = _createOrRetrieveStream(0);
      emit.init();
      rules(_walkers[0], emit, '', // prefix
      tree, 1, // local, by default
      0 // nesting depth
      );

      return emit.done();
    },
    inline: function inline(tree, options) {
      var emit = _createOrRetrieveStream(1);
      emit.init();
      declarations(_walkers[1], emit, '', // prefix
      tree, !(options && options.global) // local, by default
      );
      return emit.done();
    }
  };

  // The `state` (for the core functions) / `walker` (for the plugins) tables.
  var _walkers = [
  // for j2c.sheet
  {
    // helpers for locaizing class and animation names
    localizeReplacer: _localizeReplacer, // second argument to String.prototype.replace
    localize: _localize, // mangles local names
    names: _instance.names, // local => mangled mapping
    $atHandlers: $atHandlers, // extra at-rules
    // The core walker methods, to be provided to plugins
    atrule: atRules,
    decl: declarations,
    rule: rules
  },
  // likewise, for j2c.inline (idem with `$a`, `a` and `s` removed)
  {
    localizeReplacer: _localizeReplacer,
    localize: _localize,
    names: _instance.names,
    decl: declarations
  }];

  // inner helpers

  var _use = flatIter(function (plugin) {
    // `~n` is falsy for `n === -1` and truthy otherwise.
    // Works well to turn the  result of `a.indexOf(x)`
    // into a value that reflects the presence of `x` in
    // `a`.
    if (~_instance.$plugins.indexOf(plugin)) return;

    _instance.$plugins.push(plugin);

    if (type.call(plugin) === FUNCTION) plugin = plugin(_instance);

    if (!plugin) return;

    flatIter(function (filter) {
      $filters.push(filter);
    })(plugin.$filter || emptyArray);

    flatIter(function (handler) {
      $atHandlers.push(handler);
    })(plugin.$at || emptyArray);

    defaults$1(_instance.names, plugin.$names || emptyObject);

    _use(plugin.$plugins || emptyArray);

    $sink = plugin.$sink || $sink;

    defaults$1(_instance, plugin);
  });

  var _streams = [];
  /**
   * returns the codegen streams, creating them if necessary
   * @param
   */
  function _createOrRetrieveStream(inline) {
    // build the stream processors if needed
    if (!_streams.length) {
      // append the $sink as the ultimate filter
      $filters.push(function (_, inline) {
        return inline ? { init: $sink.init, decl: $sink.decl, done: $sink.done, err: $sink.err } : $sink;
      });
      for (var i = 0; i < 2; i++) {
        // 0 for j2c.sheet, 1 for j2c.inline
        for (var j = $filters.length; j--;) {
          _streams[i] = freeze(defaults$1($filters[j](_streams[i], !!i), _streams[i]));
        }
      }
    }
    return _streams[inline];
  }

  /**
   * Returns a localized version of a given name.
   * Registers the pair in `instnace.name` if needed.
   *
   * @param {string} name - the name to localize
   * @return {string} - the localized version
   */
  function _localize(name) {
    if (!_instance.names[name]) _instance.names[name] = name + _instance.suffix;
    return _instance.names[name].match(/^\S+/);
  }

  /**
   * Used as second argument for str.replace(localizeRegex, replacer)
   * `ignore`, `global` and `(dot, name)` are mutually exclusive
   *
   * @param {string} match - the whole match (ignored)
   * @param {string|null} ignore - a comment or a string literal
   * @param {string|null} global - a global name
   * @param {string|null} dot - either '.' for a local class name or the empty string otherwise
   * @param {string|null} name - the name to localize
   * @return {string}
   */
  function _localizeReplacer(match, ignore, global$$1, dot, name) {
    return ignore || global$$1 || dot + _localize(name);
  }

  _use(emptyArray.slice.call(arguments));
  return _instance;
}

var j2c_commonjs$1 = j2c$1;

var j2c = new j2c_commonjs$1(prefixPlugin);

/*
 * @param id: identifier, used as HTMLElement id for the attached <style></style> element
 * @param styles: list of lists style Objects
 */
var addStyle = function addStyle(id) {
  for (var _len = arguments.length, styles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    styles[_key - 1] = arguments[_key];
  }

  removeStyle(id);
  var styleEl = document.createElement("style");
  if (id) {
    styleEl.setAttribute("id", id);
  }
  styles.forEach(function (styleList) {
    // each style returns a list
    if (Object.keys(styleList).length) {
      styleList.forEach(function (style) {
        var scoped = { "@global": style };
        var sheet = j2c.sheet(scoped);
        styleEl.appendChild(document.createTextNode(sheet));
      });
    }
  });
  document.head.appendChild(styleEl);
};

var removeStyle = function removeStyle(id) {
  if (id) {
    var old = document.getElementById(id);
    if (old) {
      old.parentNode.removeChild(old);
    }
  }
};

var styleVariables = {
  size: 320,
  mobile_small: 320,
  mobile_medium: 375,
  mobile_large: 480,
  size_px: "320px",
  text_color: "#263238"
};

var pagePositions = function pagePositions(dir) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var sizes = {};
  var i = 0;
  while (i <= 10) {
    var posPx = offset + (i - 1) * styleVariables.size + "px";
    sizes[" .page:nth-child(" + i + ")"] = {
      top: 0,
      left: dir === "rtl" ? "auto" : posPx,
      right: dir === "ltr" ? "auto" : posPx
    };
    i++;
  }
  return sizes;
};

var appStyle = [{
  "*": {
    boxSizing: "border-box"
  },
  " html, body": {
    minHeight: "100%",
    height: "100%"
  },
  " body": {
    margin: 0,
    padding: 0,
    fontFamily: "arial, sans-serif",
    minWidth: styleVariables.size + "px"
  },
  " #app": {
    height: "inherit"
  },
  " .example": [pagePositions("ltr"), {
    "&.mithril-slider": {
      width: styleVariables.size + "px",
      height: styleVariables.size + "px",
      margin: "0 auto"
    },
    " .mithril-slider__content": {
      position: "relative",
      minHeight: styleVariables.size + "px"
    },
    " .page": {
      position: "absolute",
      width: styleVariables.size + "px",
      maxWidth: styleVariables.size + "px",

      " .image-container": {
        position: "relative",
        backgroundColor: "#f0f0f0"
      },
      " .image-container, .preloader, .image": {
        width: styleVariables.size + "px",
        height: styleVariables.size + "px"
      },
      " .preloader, .image": {
        position: "absolute"
      },
      " .image": {
        userSelect: "none",
        opacity: 0,
        transition: "opacity .7s",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1
      }
    }
  }],
  " .slider-placeholder": {
    height: styleVariables.size + "px"
  },
  " .mithril-slider + .slider-placeholder": {
    display: "none"
  },
  " [dir='rtl']": {
    " .example": pagePositions("rtl")
  },
  " a": {
    "&:link, &:visited": {
      "color": "#1E88E5",
      "text-decoration": "none"
    }
  }
}];

var textColorLight = "#90A4AE";
var indexBlockBackgroundColor = "#CFD8DC";
var indexBlockTextColor = "rgba(0,0,0,.85)";
var indexBlockTextColorLight = "rgba(0,0,0,.4)";
var menuWidthPx = styleVariables.size_px;

var indexStyle = [{
  ".index": {
    " h1": {
      display: "block",
      margin: "40px auto 0 auto",
      width: styleVariables.size + "px",
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "normal",
      color: styleVariables.text_color
    },
    " .menu": {
      width: menuWidthPx,
      margin: "20px auto",
      padding: "0 0 20px 0",
      listStyle: "none",

      " li": {
        margin: "0 0 1px 0",
        padding: 0,

        "&.header": {
          fontSize: "18px",
          color: textColorLight
        },
        "&.header, a": {
          padding: "20px"
        },
        " a": {
          display: "block",
          textDecoration: "none",
          backgroundColor: indexBlockBackgroundColor,

          " .title": {
            display: "block",
            color: indexBlockTextColor,
            fontSize: "18px",
            lineHeight: 1.4 * 18 + "px"
          },
          " .subtitle": {
            display: "block",
            color: indexBlockTextColorLight,
            fontSize: "14px"
          }
        }
      }
    }
  }
}];

var SIDE_PADDING = 16;
var VERSION = "1.0.1";

var styles = [{
  ".footer": {
    width: styleVariables.size - 2 * SIDE_PADDING + "px",
    margin: "32px auto 0 auto",
    textAlign: "left",
    padding: "24px " + SIDE_PADDING + "px",
    fontSize: "14px",
    lineHeight: 1.3,
    color: "#90A4AE",
    opacity: ".85",

    " hr": {
      height: "1px",
      border: "none",
      margin: "1em -" + SIDE_PADDING + "px",
      backgroundColor: "#CFD8DC",
      opacity: ".85"
    }
  }
}];

addStyle("slider-examples-footer", styles);

var footer = (function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return m(".footer", {
    dir: "ltr"
  }, [!opts.home ? m("a", {
    href: "/",
    oncreate: m.route.link
  }, "All examples") : null, m("hr"), m.trust("mithril-slider, content slider for Mithril on mobile and desktop. This site runs on version " + VERSION + ". Project page on <a href=\"https://github.com/ArthurClemens/mithril-slider\">Github</a>.")]);
});

var DATA_URL = "data/server.json";

var getPageData = function getPageData() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATA_URL;
  return m.request({
    method: "GET",
    url: url
  });
};

var fadeInImage = function fadeInImage(el, url, callback) {
  var showImage = function showImage() {
    el.style.backgroundImage = "url(" + url + ")";
    el.style.opacity = 1;
    el.dataset.seen = true;
    if (callback) {
      setTimeout(function () {
        callback();
      }, 500);
    }
  };
  if (!el.dataset.seen) {
    el.style.opacity = 0;
    var img = new Image();
    img.onload = function () {
      showImage();
    };
    img.src = url;
  } else {
    showImage();
  }
};

var style = [{
  ".preloader": {
    // layout
    display: "flex",
    visibility: "hidden",

    // center
    "align-items": "center",

    " svg": {
      width: "40px",
      height: "40px",

      // flex
      flex: 1,
      "flex-basis": "0.000000001px",

      // self-center-center
      "align-self": "center",

      " path": {
        fill: "rgba(0, 0, 0, .5)"
      }
    }
  }
}];

addStyle("preloader", style);

var preloader = m(".preloader", {
  oncreate: function oncreate(_ref) {
    var dom = _ref.dom;

    setTimeout(function () {
      dom.style.visibility = "visible";
    }, 1000);
  }
}, m.trust("<svg version=\"1.1\" id=\"loader-1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"40px\" height=\"40px\" viewBox=\"0 0 50 50\" style=\"enable-background:new 0 0 50 50;\" xml:space=\"preserve\">\n    <path fill=\"#000\" d=\"M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z\">\n    <animateTransform attributeType=\"xml\" attributeName=\"transform\" type=\"rotate\" from=\"0 25 25\" to=\"360 25 25\" dur=\"1.0s\" repeatCount=\"indefinite\"></animateTransform>\n    </path>\n    </svg>"));

var loaded = {};

var page = function page(opts) {
  var currentIndex = opts.currentIndex;
  var listIndex = opts.listIndex;
  var data = opts.data;
  // lazy loading
  var inRange = Math.abs(currentIndex - listIndex) < 2;
  var content = inRange ? m(".image-container", [m(".image", {
    oncreate: function oncreate(_ref) {
      var dom = _ref.dom;

      fadeInImage(dom, data, function () {
        loaded[listIndex] = true;
      });
    }
  }), loaded[listIndex] ? null : preloader]) : null;
  return m(".page", {
    key: listIndex
  }, content);
};

var images = {
  view: function view(_ref2) {
    var attrs = _ref2.attrs;
    return m("div", [m(slider, {
      pageData: getPageData,
      page: page,
      class: "example images"
    }), m(".slider-placeholder"), attrs.hideFooter ? null : footer()]);
  }
};

var pagePositions$1 = function pagePositions() {
  var sizes = {};
  var i = 0;
  while (i <= 10) {
    var posPx = (i - 1) * styleVariables.size + "px";
    sizes[" .page:nth-child(" + i + ")"] = {
      left: "auto",
      top: posPx
    };
    i++;
  }
  return sizes;
};

var style$1 = [{
  ".example.vertical": [pagePositions$1(), {
    "&.mithril-slider, .page": {
      height: styleVariables.size + "px"
    }
  }]
}];

addStyle("slider-examples-vertical", style$1);

var page$1 = function page(opts) {
  var currentIndex = opts.currentIndex;
  var listIndex = opts.listIndex;
  var data = opts.data;
  // lazy loading
  var inRange = Math.abs(currentIndex - listIndex) < 2;
  var content = inRange ? m(".image-container", [m(".image", {
    oncreate: function oncreate(_ref) {
      var dom = _ref.dom;

      fadeInImage(dom, data);
    }
  }), preloader]) : null;
  return m(".page", { key: listIndex }, content);
};

var vertical = {
  view: function view(_ref2) {
    var attrs = _ref2.attrs;

    return m("div", [m(slider, {
      pageData: getPageData,
      page: page$1,
      class: "example vertical",
      orientation: "vertical"
    }), m(".slider-placeholder"), attrs.hideFooter ? null : footer()]);
  }
};

var buttonSize = 40;
var inputGotoWidth = buttonSize;
var inputGotoHeight = buttonSize;

var style$2 = [{
  ".slider-controls.slider-controls-controls": {
    position: "relative",
    width: styleVariables.size + "px",
    height: buttonSize + 2 * 10 + "px",
    margin: "0 auto",
    marginTop: -1.4 * buttonSize + "px",
    padding: "10px 0",

    " a.prev, a.next": {
      userSelect: "none",
      transitionProperty: "opacity",
      transitionTimingFunction: "ease-out",
      transitionDuration: "200ms",
      backgroundSize: "30px",
      display: "block",
      width: buttonSize + "px",
      height: buttonSize + "px",
      borderRadius: buttonSize / 2 + "px",
      position: "absolute",
      backgroundColor: "#eee",
      textIndent: "-1234em",
      cursor: "default",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50%",
      opacity: 0,

      ".enabled": {
        opacity: 1,
        cursor: "pointer",

        "&:hover": {
          backgroundColor: "#ddd"
        }
      }
    },
    " a.prev": {
      backgroundImage: "url(assets/previous.svg)",
      left: "10px"
    },
    " a.next": {
      "background-image": "url(assets/next.svg)",
      right: "10px"
    },
    " input.goto": {
      position: "absolute",
      backgroundColor: "#eee",
      left: "50%",
      height: inputGotoHeight + "px",
      width: inputGotoWidth + "px",
      margin: "0 0 0 " + -inputGotoWidth / 2 + "px",
      padding: 0,
      textAlign: "center",
      border: "none",
      fontSize: "14px",

      "&:focus": {
        backgroundColor: "#fff"
      }
    }
  },
  "[dir='rtl']": {
    " .slider-controls.slider-controls-controls": {
      " a.next": {
        right: "auto",
        left: "10px",
        transform: "scaleX(-1)"
      },
      " a.prev": {
        left: "auto",
        right: "10px",
        transform: "scaleX(-1)"
      }
    }
  }
}];

addStyle("slider-examples-controls", style$2);

var page$2 = function page(opts) {
  var currentIndex = opts.currentIndex;
  var listIndex = opts.listIndex;
  var data = opts.data;
  // lazy loading
  var inRange = Math.abs(currentIndex - listIndex) < 2;
  var content = inRange ? m(".image-container", [m(".image", {
    oncreate: function oncreate(_ref) {
      var dom = _ref.dom;

      fadeInImage(dom, data);
    }
  }), preloader]) : null;
  return m(".page", {
    key: listIndex,
    class: currentIndex === listIndex ? "current-page" : null
  }, content);
};

var sliderControls = function sliderControls(sliderController, isEditing, setIsEditing) {
  return sliderController ? m(".slider-controls.slider-controls-controls", [m("input.goto", {
    value: isEditing ? "" : sliderController.index() + 1,
    oninput: function oninput(e) {
      setIsEditing(true);
      var idx = parseInt(e.target.value, 10) - 1;
      if (!isNaN(idx)) {
        sliderController.goTo(idx, 0);
        setIsEditing(false);
      }
    }
  }), m("a.prev", {
    class: sliderController.hasPrevious() ? "enabled" : "",
    onclick: function onclick() {
      return sliderController.goPrevious();
    }
  }, "Previous"), m("a.next", {
    class: sliderController.hasNext() ? "enabled" : "",
    onclick: function onclick() {
      return sliderController.goNext();
    }
  }, "Next")]) : null;
};

var controls = {
  view: function view(_ref2) {
    var attrs = _ref2.attrs,
        state = _ref2.state;

    var rtl = attrs.rtl;
    var sliderController = state.sliderController;
    var mySlider = m(slider, {
      pageData: function pageData() {
        return Promise.resolve(["http://arthurclemens.github.io/assets/mithril-slider/img/01.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/02.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/03.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/04.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/05.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/06.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/07.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/08.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/09.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/10.jpg"]);
      },
      page: page$2,
      pageOffsetX: attrs.pageOffsetX,
      sliderController: function sliderController(ctrl) {
        return state.sliderController = ctrl;
      },
      class: ["example controls", attrs.class].join(" "),
      rtl: rtl
    });
    var controls = sliderControls(sliderController, state.isEditing, function (editing) {
      return state.isEditing = editing;
    });
    var props = rtl ? { dir: "rtl" } : null;
    return m("div", props, [mySlider, m(".slider-placeholder"), controls, attrs.hideFooter ? null : footer()]);
  }
};

var regularWidth = 320;
var pageWidth = 420;

var offset = (pageWidth - regularWidth) / 2;

var style$3 = [{
  " .example.mithril-slider.carousel": [pagePositions("ltr", offset), {
    width: pageWidth + "px",
    maxWidth: pageWidth + "px",

    " .page": {
      opacity: .2,
      transitionProperty: "opacity",
      transitionTimingFunction: "ease-in-out",
      transitionDuration: "300ms",

      ".current-page": {
        opacity: 1,
        zIndex: 1
      }
    }
  }]
}];

addStyle("slider-examples-carousel", style$3);

var carousel = {
  view: function view() {
    return [m(controls, {
      hideFooter: true,
      class: "carousel",
      pageOffsetX: offset
    }), footer()];
  }
};

var ltr = {
  view: function view() {
    return m(controls, { rtl: true });
  }
};

var buttonSize$1 = 40;

var pageSizes = function pageSizes() {
  var sizes = {};
  var i = 1;
  while (i <= 5) {
    var size = styleVariables.size / i;
    sizes[".group-" + i] = {
      " .mithril-slider__content": {
        height: Math.floor(size) + "px"
      },
      " .page": {
        width: size + "px",
        height: size + "px"
      }
    };
    i++;
  }
  return sizes;
};

var countStyle = function countStyle() {
  var buttonCount = 5;
  var minButtonSize = 30;
  var margin = 10;
  var width = 5 * minButtonSize + buttonCount * margin;
  var height = buttonSize$1;

  return {
    position: "absolute",
    left: "50%",
    height: height + "px",
    width: width + "px",
    "margin-left": -width / 2 + "px",

    " a": {
      userSelect: "none",
      transitionProperty: "opacity",
      transitionTimingFunction: "ease-out",
      transitionDuration: "200ms",
      display: "block",
      float: "left",
      margin: (buttonSize$1 - minButtonSize) / 2 + "px " + margin / 2 + "px",
      width: minButtonSize + "px",
      height: minButtonSize + "px",
      borderRadius: minButtonSize / 2 + "px",
      backgroundColor: "rgba(0, 0, 0, .1)",
      cursor: "pointer",
      textAlign: "center",
      fontSize: "13px",
      lineHeight: minButtonSize + "px",

      ".selected": {
        backgroundColor: "rgba(0, 0, 0, .4)",
        color: "#fff",
        cursor: "default",
        pointerEvents: "none"
      }
    }
  };
};

var prevNextButtonStyle = function prevNextButtonStyle() {
  return {
    " a.prev, a.next": {
      userSelect: "none",
      transitionProperty: "opacity",
      transitionTimingFunction: "ease-out",
      transitionDuration: "200ms",
      backgroundSize: "30px",
      display: "block",
      width: buttonSize$1 + "px",
      height: buttonSize$1 + "px",
      borderRadius: buttonSize$1 / 2 + "px",
      position: "absolute",
      backgroundColor: "rgba(0, 0, 0, .1)",
      textIndent: "-1234em",
      cursor: "default",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50%",
      opacity: 0,

      ".enabled": {
        opacity: "1",
        cursor: "pointer",

        ":hover": {
          backgroundColor: "rgba(0, 0, 0, .2)"
        }
      }
    },
    " a.prev": {
      left: "10px",
      backgroundImage: "url(assets/previous.svg)"
    },
    " a.next": {
      right: "10px",
      backgroundImage: "url(assets/next.svg)"
    }
  };
};

var pageNumberStyle = function pageNumberStyle() {
  var size = 30;
  return {
    position: "absolute",
    left: 0,
    top: 0,
    width: size + "px",
    height: size + "px",
    lineHeight: size + "px",
    fontSize: "12px",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,.5)",
    zIndex: 2
  };
};

var style$4 = [{
  ".example.group": [pageSizes(), {
    position: "relative",

    " .page": {
      position: "static",
      float: "left",

      " span": pageNumberStyle(),

      " .preloader, .image-container, .image": {
        width: "100%",
        height: "100%"
      }
    }
  }],
  ".slider-controls.slider-controls-group": [prevNextButtonStyle(), {
    width: styleVariables.size + "px",
    height: buttonSize$1 + 2 * 10 + "px",
    padding: "10px 0",
    position: "relative",
    margin: "0 auto",

    " .count": countStyle()
  }]
}];

addStyle("group", style$4);

var callRight = function callRight(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, remainingArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      remainingArgs[_key2] = arguments[_key2];
    }

    return fn.apply(undefined, remainingArgs.concat(args));
  };
};

var page$3 = function page(opts, groupBy) {
  var currentIndex = opts.currentIndex;
  var listIndex = opts.listIndex;
  var data = opts.data;
  // lazy loading
  var inRange = Math.abs(currentIndex - listIndex) < 2 * groupBy;
  var content = inRange ? [m(".image-container", [m(".image", {
    oncreate: function oncreate(_ref) {
      var dom = _ref.dom;
      return fadeInImage(dom, data);
    }
  }), m("span", listIndex + 1), preloader])] : null;
  return m(".page", {
    key: listIndex
  }, content);
};

var sliderControls$1 = function sliderControls(sliderController, groupBy, onSetGroupBy) {
  return m(".slider-controls.slider-controls-group", sliderController ? [m("a.prev", {
    class: sliderController.hasPrevious() ? "enabled" : "",
    onclick: function onclick() {
      return sliderController.goPrevious();
    }
  }, "Previous"), m(".count", [[1, 2, 3, 4, 5].map(function (size) {
    return m("a", {
      onclick: function onclick() {
        onSetGroupBy(size);
        setTimeout(function () {
          sliderController.goCurrent();
        }, 0);
      },
      class: size === groupBy ? "selected" : ""
    }, size);
  })]), m("a.next", {
    class: sliderController.hasNext() ? "enabled" : "",
    onclick: function onclick() {
      return sliderController.goNext();
    }
  }, "Next")] : null);
};

var group = {
  sliderController: undefined,
  isEditing: false,
  groupBy: 3,
  view: function view(_ref2) {
    var attrs = _ref2.attrs,
        state = _ref2.state;

    var sliderController = state.sliderController;
    var groupBy = state.groupBy;
    var mySlider = m(slider, {
      pageData: getPageData,
      page: callRight(page$3, groupBy),
      groupBy: groupBy,
      sliderController: function sliderController(ctrl) {
        return state.sliderController = ctrl;
      },
      class: ["example", "group", "group-" + groupBy].join(" ")
    });
    var controls = sliderControls$1(sliderController, groupBy, function (size) {
      return state.groupBy = size;
    });
    return m("div", [controls, mySlider, m(".slider-placeholder"), attrs.hideFooter ? null : footer()]);
  }
};

addStyle("slider", css);
addStyle("slider-examples-app", appStyle);
addStyle("slider-examples-index", indexStyle);

var menuData = [{
  href: "/images",
  title: "Simple",
  subtitle: "Swiping a series of images."
}, {
  href: "/vertical",
  title: "Vertical",
  subtitle: "Swiping a vertical series of images."
}, {
  href: "/controls",
  title: "Controls",
  subtitle: "Using controls to manage sliding and get feedback."
}, {
  href: "/carousel",
  title: "Centered",
  subtitle: "Showing hints of previous and next images."
}, {
  href: "/ltr",
  title: "Left-to-right",
  subtitle: "Controls with left-to-right language support."
}, {
  href: "/group",
  title: "Groups",
  subtitle: "Creating dynamically sized pages."
}];

var menu = m("ul.menu", [m("li.header", "Examples"), menuData.map(function (menuItem) {
  return m("li", m("a", {
    href: menuItem.href,
    oncreate: m.route.link
  }, [m("span.title", menuItem.title), m("span.subtitle", menuItem.subtitle)]));
})]);

var app = {
  view: function view() {
    return m(".index", [m("h1", "Content Slider for Mithril"), menu, footer({ home: true })]);
  }
};

var mountNode = document.querySelector("#app");
m.route.prefix("#");
m.route(mountNode, "/", {
  "/": app,
  "/images": images,
  "/vertical": vertical,
  "/controls": controls,
  "/carousel": carousel,
  "/ltr": ltr,
  "/group": group
});

})));
