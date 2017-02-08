/* =============================================================
 * bootstrap-scrollspy.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
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
 * ============================================================== */

!function(t){function s(s,o){var e,r=t.proxy(this.process,this),i=t(t(s).is("body")?window:s);this.options=t.extend({},t.fn.scrollspy.defaults,o),this.$scrollElement=i.on("scroll.scroll-spy.data-api",r),this.selector=(this.options.target||(e=t(s).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=t("body"),this.refresh(),this.process()}s.prototype={constructor:s,refresh:function(){var s,o=this;this.offsets=t([]),this.targets=t([]),s=this.$body.find(this.selector).map(function(){var s=t(this),e=s.data("target")||s.attr("href"),r=/^#\w/.test(e)&&t(e);return r&&r.length&&[[r.position().top+(!t.isWindow(o.$scrollElement.get(0))&&o.$scrollElement.scrollTop()),e]]||null}).sort(function(t,s){return t[0]-s[0]}).each(function(){o.offsets.push(this[0]),o.targets.push(this[1])})},process:function(){var t,s=this.$scrollElement.scrollTop()+this.options.offset,o=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,e=o-this.$scrollElement.height(),r=this.offsets,i=this.targets,l=this.activeTarget;if(s>=e)return l!=(t=i.last()[0])&&this.activate(t);for(t=r.length;t--;)l!=i[t]&&s>=r[t]&&(!r[t+1]||s<=r[t+1])&&this.activate(i[t])},activate:function(s){var o,e;this.activeTarget=s,t(this.selector).parent(".active").removeClass("active"),e=this.selector+'[data-target="'+s+'"],'+this.selector+'[href="'+s+'"]',o=t(e).parent("li").addClass("active"),o.parent(".dropdown-menu").length&&(o=o.closest("li.dropdown").addClass("active")),o.trigger("activate")}};var o=t.fn.scrollspy;t.fn.scrollspy=function(o){return this.each(function(){var e=t(this),r=e.data("scrollspy"),i="object"==typeof o&&o;r||e.data("scrollspy",r=new s(this,i)),"string"==typeof o&&r[o]()})},t.fn.scrollspy.Constructor=s,t.fn.scrollspy.defaults={offset:10},t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=o,this},t(window).on("load",function(){t('[data-spy="scroll"]').each(function(){var s=t(this);s.scrollspy(s.data())})})}(window.jQuery);