/*!
 * jQuery UI Effects Fade 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fade-effect/
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","./effect"],e):e(jQuery)}(function(e){return e.effects.effect.fade=function(t,f){var n=e(this),i=e.effects.setMode(n,t.mode||"toggle");n.animate({opacity:i},{queue:!1,duration:t.duration,easing:t.easing,complete:f})}});