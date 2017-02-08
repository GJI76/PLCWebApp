/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function(t){var e='[data-dismiss="alert"]',a=function(a){t(a).on("click",e,this.close)};a.prototype.close=function(e){function a(){n.trigger("closed").remove()}var n,r=t(this),o=r.attr("data-target");o||(o=r.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,"")),n=t(o),e&&e.preventDefault(),n.length||(n=r.hasClass("alert")?r:r.parent()),n.trigger(e=t.Event("close")),e.isDefaultPrevented()||(n.removeClass("in"),t.support.transition&&n.hasClass("fade")?n.on(t.support.transition.end,a):a())};var n=t.fn.alert;t.fn.alert=function(e){return this.each(function(){var n=t(this),r=n.data("alert");r||n.data("alert",r=new a(this)),"string"==typeof e&&r[e].call(n)})},t.fn.alert.Constructor=a,t.fn.alert.noConflict=function(){return t.fn.alert=n,this},t(document).on("click.alert.data-api",e,a.prototype.close)}(window.jQuery);