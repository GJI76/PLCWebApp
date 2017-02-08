/*!
 * jQuery UI Touch Punch Improved 0.3.1
 *
 *
 * Copyright 2013, Chris Hutchinson <chris@brushd.com>
 * Original jquery-ui-touch-punch Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 * jquery.ui.widget.js
 * jquery.ui.mouse.js
 */

!function(o){function t(o){var t=window.pageXOffset,e=window.pageYOffset,n=o.clientX,i=o.clientY;return 0===o.pageY&&Math.floor(i)>Math.floor(o.pageY)||0===o.pageX&&Math.floor(n)>Math.floor(o.pageX)?(n-=t,i-=e):(i<o.pageY-e||n<o.pageX-t)&&(n=o.pageX-t,i=o.pageY-e),{clientX:n,clientY:i}}function e(e,i){if(!(!n&&e.originalEvent.touches.length>1||n&&!e.isPrimary)){var r=n?e.originalEvent:e.originalEvent.changedTouches[0],u=document.createEvent("MouseEvents"),c=t(r);o(r.target).is("input")||o(r.target).is("textarea")?e.stopPropagation():e.preventDefault(),u.initMouseEvent(i,!0,!0,window,1,e.screenX||r.screenX,e.screenY||r.screenY,e.clientX||c.clientX,e.clientY||c.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(u)}}var n=window.navigator.pointerEnabled||window.navigator.msPointerEnabled;if(o.support.touch="ontouchend"in document||n,o.support.touch&&o.ui.mouse){var i,r=o.ui.mouse.prototype,u=r._mouseInit;r._touchStart=function(o){var t=this;i||!n&&!t._mouseCapture(o.originalEvent.changedTouches[0])||(i=!0,t._touchMoved=!1,e(o,"mouseover"),e(o,"mousemove"),e(o,"mousedown"))},r._touchMove=function(o){i&&(this._touchMoved=!0,e(o,"mousemove"))},r._touchEnd=function(o){i&&(e(o,"mouseup"),e(o,"mouseout"),this._touchMoved||e(o,"click"),i=!1)},r._mouseInit=function(){var t=this;t.element.on({touchstart:o.proxy(t,"_touchStart"),touchmove:o.proxy(t,"_touchMove"),touchend:o.proxy(t,"_touchEnd"),pointerDown:o.proxy(t,"_touchStart"),pointerMove:o.proxy(t,"_touchMove"),pointerUp:o.proxy(t,"_touchEnd"),MSPointerDown:o.proxy(t,"_touchStart"),MSPointerMove:o.proxy(t,"_touchMove"),MSPointerUp:o.proxy(t,"_touchEnd")}),u.call(t)}}}(jQuery);