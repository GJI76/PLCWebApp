/** @license MIT License (c) copyright 2010-2014 original author or authors */

!function(t){"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define(t):"undefined"!=typeof window?window.Promise=t():"undefined"!=typeof global?global.Promise=t():"undefined"!=typeof self&&(self.Promise=t())}(function(){var t;return function e(t,n,o){function i(u,c){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(r)return r(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return i(n?n:e)},s,s.exports,e,t,n,o)}return n[u].exports}for(var r="function"==typeof require&&require,u=0;u<o.length;u++)i(o[u]);return i}({1:[function(t,e){var n=t("../lib/decorators/unhandledRejection"),o=e.exports=n(t("../lib/Promise")),i="undefined"!=typeof global&&global||"undefined"!=typeof self&&self;"undefined"!=typeof i&&"undefined"==typeof i.Promise&&(i.Promise=o)},{"../lib/Promise":2,"../lib/decorators/unhandledRejection":6}],2:[function(e,n){!function(t){t(function(t){var e=t("./makePromise"),n=t("./Scheduler"),o=t("./async");return e({scheduler:new n(o)})})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{"./Scheduler":4,"./async":5,"./makePromise":7}],3:[function(e,n){!function(t){t(function(){function t(t){this.head=this.tail=this.length=0,this.buffer=new Array(1<<t)}return t.prototype.push=function(t){return this.length===this.buffer.length&&this._ensureCapacity(2*this.length),this.buffer[this.tail]=t,this.tail=this.tail+1&this.buffer.length-1,++this.length,this.length},t.prototype.shift=function(){var t=this.buffer[this.head];return this.buffer[this.head]=void 0,this.head=this.head+1&this.buffer.length-1,--this.length,t},t.prototype._ensureCapacity=function(t){var e,n=this.head,o=this.buffer,i=new Array(t),r=0;if(0===n)for(e=this.length;e>r;++r)i[r]=o[r];else{for(t=o.length,e=this.tail;t>n;++r,++n)i[r]=o[n];for(n=0;e>n;++r,++n)i[r]=o[n]}this.buffer=i,this.head=0,this.tail=this.length},t})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}],4:[function(e,n){!function(t){t(function(t){function e(t){this._async=t,this._queue=new o(15),this._afterQueue=new o(5),this._running=!1;var e=this;this.drain=function(){e._drain()}}function n(t){for(;t.length>0;)t.shift().run()}var o=t("./Queue");return e.prototype.enqueue=function(t){this._add(this._queue,t)},e.prototype.afterQueue=function(t){this._add(this._afterQueue,t)},e.prototype._drain=function(){n(this._queue),this._running=!1,n(this._afterQueue)},e.prototype._add=function(t,e){t.push(e),this._running||(this._running=!0,this._async(this.drain))},e})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{"./Queue":3}],5:[function(e,n){!function(t){t(function(t){var e,n;return e="undefined"!=typeof process&&null!==process&&"function"==typeof process.nextTick?function(t){process.nextTick(t)}:(n="function"==typeof MutationObserver&&MutationObserver||"function"==typeof WebKitMutationObserver&&WebKitMutationObserver)?function(t,e){function n(){var t=o;o=void 0,t()}var o,i=t.createElement("div"),r=new e(n);return r.observe(i,{attributes:!0}),function(t){o=t,i.setAttribute("class","x")}}(document,n):function(t){try{return t("vertx").runOnLoop||t("vertx").runOnContext}catch(e){}var n=setTimeout;return function(t){n(t,0)}}(t)})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{}],6:[function(e,n){!function(t){t(function(t){function e(t){var e="object"==typeof t&&t.stack?t.stack:n(t);return t instanceof Error?e:e+" (WARNING: non-Error used)"}function n(t){var e=String(t);return"[object Object]"===e&&"undefined"!=typeof JSON&&(e=o(t,e)),e}function o(t,e){try{return JSON.stringify(t)}catch(t){return e}}function i(t){throw t}function r(){}var u=t("../timer");return function(t){function o(t){t.handled||(l.push(t),h("Potentially unhandled rejection ["+t.id+"] "+e(t.value)))}function c(t){var e=l.indexOf(t);e>=0&&(l.splice(e,1),a("Handled previous rejection ["+t.id+"] "+n(t.value)))}function f(t,e){p.push(t,e),d||(d=!0,d=u.set(s,0))}function s(){for(d=!1;p.length>0;)p.shift()(p.shift())}var h=r,a=r;"undefined"!=typeof console&&(h="undefined"!=typeof console.error?function(t){console.error(t)}:function(t){console.log(t)},a="undefined"!=typeof console.info?function(t){console.info(t)}:function(t){console.log(t)}),t.onPotentiallyUnhandledRejection=function(t){f(o,t)},t.onPotentiallyUnhandledRejectionHandled=function(t){f(c,t)},t.onFatalRejection=function(t){f(i,t.value)};var p=[],l=[],d=!1;return t}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{"../timer":8}],7:[function(e,n){!function(t){t(function(){return function(t){function e(t,e){this._handler=t===a?e:n(t)}function n(t){function e(t){i.resolve(t)}function n(t){i.reject(t)}function o(t){i.notify(t)}var i=new l;try{t(e,n,o)}catch(r){n(r)}return i}function o(t){return R(t)?t:new e(a,new y(s(t)))}function i(t){return new e(a,new y(new _(t)))}function r(){return G}function u(){return new e(a,new l)}function c(t){function n(t,e,n){this[t]=e,0===--f&&n.become(new m(this))}var o,i,r,u,c=new l,f=t.length>>>0,s=new Array(f);for(o=0;o<t.length;++o)if(r=t[o],void 0!==r||o in t)if(Q(r))if(i=R(r)?r._handler.join():h(r),u=i.state(),0===u)i.fold(n,o,s,c);else{if(!(u>0)){c.become(i);break}s[o]=i.value,--f}else s[o]=r,--f;else--f;return 0===f&&c.become(new m(s)),new e(a,c)}function f(t){if(Object(t)===t&&0===t.length)return r();var n,o,i=new l;for(n=0;n<t.length;++n)o=t[n],void 0!==o&&n in t&&s(o).visit(i,i.resolve,i.reject);return new e(a,i)}function s(t){return R(t)?t._handler.join():Q(t)?h(t):new m(t)}function h(t){try{var e=t.then;return"function"==typeof e?new w(e,t):new m(t)}catch(n){return new _(n)}}function a(){}function p(){}function l(t,n){e.createContext(this,n),this.consumers=void 0,this.receiver=t,this.handler=void 0,this.resolved=!1}function d(t){this.handler=t}function y(t){d.call(this,t)}function v(t,e){d.call(this,t),this.receiver=e}function w(t,e){l.call(this),N.enqueue(new q(t,e,this))}function m(t){e.createContext(this),this.value=t}function _(t){e.createContext(this),this.id=++J,this.value=t,this.handled=!1,this.reported=!1,this._report()}function b(t,e){this.rejection=t,this.context=e}function j(t){this.rejection=t}function x(){return new _(new TypeError("Promise cycle"))}function g(){return{state:"pending"}}function C(t,e){this.continuation=t,this.handler=e}function P(t,e){this.handler=e,this.value=t}function q(t,e,n){this._then=t,this.thenable=e,this.resolver=n}function O(t,e,n,o,i){try{t.call(e,n,o,i)}catch(r){o(r)}}function R(t){return t instanceof e}function Q(t){return("object"==typeof t||"function"==typeof t)&&null!==t}function T(t,n,o,i){return"function"!=typeof t?i.become(n):(e.enterContext(n),A(t,n.value,o,i),void e.exitContext())}function k(t,n,o,i,r){return"function"!=typeof t?r.become(o):(e.enterContext(o),E(t,n,o.value,i,r),void e.exitContext())}function U(t,n,o,i,r){return"function"!=typeof t?r.notify(n):(e.enterContext(o),S(t,n,i,r),void e.exitContext())}function A(t,e,n,o){try{o.become(s(t.call(n,e)))}catch(i){o.become(new _(i))}}function E(t,e,n,o,i){try{t.call(o,e,n,i)}catch(r){i.become(new _(r))}}function S(t,e,n,o){try{o.notify(t.call(n,e))}catch(i){o.notify(i)}}function H(t,e){e.prototype=F(t.prototype),e.prototype.constructor=e}function M(){}var N=t.scheduler,F=Object.create||function(t){function e(){}return e.prototype=t,new e};e.resolve=o,e.reject=i,e.never=r,e._defer=u,e._handler=s,e.prototype.then=function(t,n){var o=this._handler;if("function"!=typeof t&&o.join().state()>0)return new e(a,o);var i=this._beget(),r=i._handler;return o.chain(r,o.receiver,t,n,arguments.length>2?arguments[2]:void 0),i},e.prototype["catch"]=function(t){return this.then(void 0,t)},e.prototype._bindContext=function(t){return new e(a,new v(this._handler,t))},e.prototype._beget=function(){var t=this._handler,e=new l(t.receiver,t.join().context);return new this.constructor(a,e)},e.all=c,e.race=f,a.prototype.when=a.prototype.become=a.prototype.notify=a.prototype.fail=a.prototype._unreport=a.prototype._report=M,a.prototype.inspect=g,a.prototype._state=0,a.prototype.state=function(){return this._state},a.prototype.join=function(){for(var t=this;void 0!==t.handler;)t=t.handler;return t},a.prototype.chain=function(t,e,n,o,i){this.when({resolver:t,receiver:e,fulfilled:n,rejected:o,progress:i})},a.prototype.visit=function(t,e,n,o){this.chain(W,t,e,n,o)},a.prototype.fold=function(t,e,n,o){this.visit(o,function(o){t.call(n,e,o,this)},o.reject,o.notify)},H(a,p),p.prototype.become=function(t){t.fail()};var W=new p;H(a,l),l.prototype._state=0,l.prototype.inspect=function(){return this.resolved?this.join().inspect():g()},l.prototype.resolve=function(t){this.become(s(t))},l.prototype.reject=function(t){this.resolved||this.become(new _(t))},l.prototype.join=function(){if(!this.resolved)return this;for(var t=this;void 0!==t.handler;)if(t=t.handler,t===this)return this.handler=x();return t},l.prototype.run=function(){var t=this.consumers,e=this.join();this.consumers=void 0;for(var n=0;n<t.length;++n)e.when(t[n])},l.prototype.become=function(t){this.resolved||(this.resolved=!0,this.handler=t,void 0!==this.consumers&&N.enqueue(this),void 0!==this.context&&t._report(this.context))},l.prototype.when=function(t){this.resolved?N.enqueue(new C(t,this.handler)):void 0===this.consumers?this.consumers=[t]:this.consumers.push(t)},l.prototype.notify=function(t){this.resolved||N.enqueue(new P(t,this))},l.prototype.fail=function(t){var e="undefined"==typeof t?this.context:t;this.resolved&&this.handler.join().fail(e)},l.prototype._report=function(t){this.resolved&&this.handler.join()._report(t)},l.prototype._unreport=function(){this.resolved&&this.handler.join()._unreport()},H(a,d),d.prototype.inspect=function(){return this.join().inspect()},d.prototype._report=function(t){this.join()._report(t)},d.prototype._unreport=function(){this.join()._unreport()},H(d,y),y.prototype.when=function(t){N.enqueue(new C(t,this))},H(d,v),v.prototype.when=function(t){void 0!==this.receiver&&(t.receiver=this.receiver),this.join().when(t)},H(l,w),H(a,m),m.prototype._state=1,m.prototype.inspect=function(){return{state:"fulfilled",value:this.value}},m.prototype.fold=function(t,e,n,o){k(t,e,this,n,o)},m.prototype.when=function(t){T(t.fulfilled,this,t.receiver,t.resolver)};var J=0;H(a,_),_.prototype._state=-1,_.prototype.inspect=function(){return{state:"rejected",reason:this.value}},_.prototype.fold=function(t,e,n,o){this._unreport(),o.become(this)},_.prototype.when=function(t){this._unreport(),T(t.rejected,this,t.receiver,t.resolver)},_.prototype._report=function(t){N.afterQueue(new b(this,t))},_.prototype._unreport=function(){this.handled=!0,N.afterQueue(new j(this))},_.prototype.fail=function(t){e.onFatalRejection(this,void 0===t?this.context:t)},b.prototype.run=function(){this.rejection.handled||(this.rejection.reported=!0,e.onPotentiallyUnhandledRejection(this.rejection,this.context))},j.prototype.run=function(){this.rejection.reported&&e.onPotentiallyUnhandledRejectionHandled(this.rejection)},e.createContext=e.enterContext=e.exitContext=e.onPotentiallyUnhandledRejection=e.onPotentiallyUnhandledRejectionHandled=e.onFatalRejection=M;var K=new a,G=new e(a,K);return C.prototype.run=function(){this.handler.join().when(this.continuation)},P.prototype.run=function(){var t=this.handler.consumers;if(void 0!==t)for(var e,n=0;n<t.length;++n)e=t[n],U(e.progress,this.value,this.handler,e.receiver,e.resolver)},q.prototype.run=function(){function t(t){o.resolve(t)}function e(t){o.reject(t)}function n(t){o.notify(t)}var o=this.resolver;O(this._then,this.thenable,t,e,n)},e}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}],8:[function(e,n){!function(t){t(function(t){var e,n,o,i;e=t;try{n=e("vertx"),o=function(t,e){return n.setTimer(e,t)},i=n.cancelTimer}catch(r){o=function(t,e){return setTimeout(t,e)},i=function(t){return clearTimeout(t)}}return{set:o,clear:i}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{}]},{},[1])(1)});