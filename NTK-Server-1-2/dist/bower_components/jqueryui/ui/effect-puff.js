/*!
 * jQuery UI Effects Puff 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/puff-effect/
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","./effect","./effect-scale"],e):e(jQuery)}(function(e){return e.effects.effect.puff=function(t,f){var i=e(this),h=e.effects.setMode(i,t.mode||"hide"),d="hide"===h,o=parseInt(t.percent,10)||150,u=o/100,r={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:h,complete:f,percent:d?o:100,from:d?r:{height:r.height*u,width:r.width*u,outerHeight:r.outerHeight*u,outerWidth:r.outerWidth*u}}),i.effect(t)}});