// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Slim Highlighting for CodeMirror copyright (c) HicknHack Software Gmbh

!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed"),require("../ruby/ruby")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed","../ruby/ruby"],t):t(CodeMirror)}(function(t){t.defineMode("slim",function(e){function n(t,e,n){var i=function(i,r){return r.tokenize=e,i.pos<t?(i.pos=t,n):r.tokenize(i,r)};return function(t,n){return n.tokenize=i,e(t,n)}}function i(t,e,i,r,o){var u=t.current(),a=u.search(i);return a>-1&&(e.tokenize=n(t.pos,e.tokenize,o),t.backUp(u.length-a-r)),o}function r(t,e){t.stack={parent:t.stack,style:"continuation",indented:e,tokenize:t.line},t.line=t.tokenize}function o(t){t.line==t.tokenize&&(t.line=t.stack.tokenize,t.stack=t.stack.parent)}function u(t,e){return function(n,i){if(o(i),n.match(/^\\$/))return r(i,t),"lineContinuation";var u=e(n,i);return n.eol()&&n.current().match(/(?:^|[^\\])(?:\\\\)*\\$/)&&n.backUp(1),u}}function a(t,e){return function(n,i){o(i);var u=e(n,i);return n.eol()&&n.current().match(/,$/)&&r(i,t),u}}function c(t,e){return function(n,i){var r=n.peek();return r==t&&1==i.rubyState.tokenize.length?(n.next(),i.tokenize=e,"closeAttributeTag"):s(n,i)}}function l(t){var e,n=function(n,i){if(1==i.rubyState.tokenize.length&&!i.rubyState.context.prev){if(n.backUp(1),n.eatSpace())return i.rubyState=e,i.tokenize=t,t(n,i);n.next()}return s(n,i)};return function(t,i){return e=i.rubyState,i.rubyState=Z.startState(),i.tokenize=n,s(t,i)}}function s(t,e){return Z.token(t,e.rubyState)}function k(t,e){return t.match(/^\\$/)?"lineContinuation":d(t,e)}function d(t,e){return t.match(/^#\{/)?(e.tokenize=c("}",e.tokenize),null):i(t,e,/[^\\]#\{/,1,P.token(t,e.htmlState))}function m(t){return function(e,n){var i=k(e,n);return e.eol()&&(n.tokenize=t),i}}function f(t,e,n){return e.stack={parent:e.stack,style:"html",indented:t.column()+n,tokenize:e.line},e.line=e.tokenize=d,null}function b(t,e){return t.skipToEnd(),e.stack.style}function z(t,e){return e.stack={parent:e.stack,style:"comment",indented:e.indented+1,tokenize:e.line},e.line=b,b(t,e)}function p(t,e){return t.eat(e.stack.endQuote)?(e.line=e.stack.line,e.tokenize=e.stack.tokenize,e.stack=e.stack.parent,null):t.match(K)?(e.tokenize=x,"slimAttribute"):(t.next(),null)}function x(t,e){return t.match(/^==?/)?(e.tokenize=h,null):p(t,e)}function h(t,e){var n=t.peek();return'"'==n||"'"==n?(e.tokenize=q(n,"string",!0,!1,p),t.next(),e.tokenize(t,e)):"["==n?l(p)(t,e):t.match(/^(true|false|nil)\b/)?(e.tokenize=p,"keyword"):l(p)(t,e)}function y(t,e,n){return t.stack={parent:t.stack,style:"wrapper",indented:t.indented+1,tokenize:n,line:t.line,endQuote:e},t.line=t.tokenize=p,null}function S(e,n){if(e.match(/^#\{/))return n.tokenize=c("}",n.tokenize),null;var i=new t.StringStream(e.string.slice(n.stack.indented),e.tabSize);i.pos=e.pos-n.stack.indented,i.start=e.start-n.stack.indented,i.lastColumnPos=e.lastColumnPos-n.stack.indented,i.lastColumnValue=e.lastColumnValue-n.stack.indented;var r=n.subMode.token(i,n.subState);return e.pos=i.pos+n.stack.indented,r}function v(t,e){return e.stack.indented=t.column(),e.line=e.tokenize=S,e.tokenize(t,e)}function w(n){var i=D[n],r=t.mimeModes[i];if(r)return t.getMode(e,r);var o=t.modes[i];return o?o(e,{name:i}):t.getMode(e,"null")}function g(t){return _.hasOwnProperty(t)?_[t]:_[t]=w(t)}function M(t,e){var n=g(t),i=n.startState&&n.startState();return e.subMode=n,e.subState=i,e.stack={parent:e.stack,style:"sub",indented:e.indented+1,tokenize:e.line},e.line=e.tokenize=v,"slimSubmode"}function C(t){return t.skipToEnd(),"slimDoctype"}function E(t,e){var n=t.peek();if("<"==n)return(e.tokenize=m(e.tokenize))(t,e);if(t.match(/^[|']/))return f(t,e,1);if(t.match(/^\/(!|\[\w+])?/))return z(t,e);if(t.match(/^(-|==?[<>]?)/))return e.tokenize=u(t.column(),a(t.column(),s)),"slimSwitch";if(t.match(/^doctype\b/))return e.tokenize=C,"keyword";var i=t.match(Q);return i?M(i[1],e):L(t,e)}function A(t,e){return e.startOfLine?E(t,e):L(t,e)}function L(t,e){return t.eat("*")?(e.tokenize=l($),null):t.match(H)?(e.tokenize=$,"slimTag"):T(t,e)}function $(t,e){return t.match(/^(<>?|><?)/)?(e.tokenize=T,null):T(t,e)}function T(t,e){return t.match(W)?(e.tokenize=T,"slimId"):t.match(N)?(e.tokenize=T,"slimClass"):U(t,e)}function U(t,e){return t.match(/^([\[\{\(])/)?y(e,B[RegExp.$1],U):t.match(J)?(e.tokenize=j,"slimAttribute"):"*"==t.peek()?(t.next(),e.tokenize=l(I),null):I(t,e)}function j(t,e){return t.match(/^==?/)?(e.tokenize=O,null):U(t,e)}function O(t,e){var n=t.peek();return'"'==n||"'"==n?(e.tokenize=q(n,"string",!0,!1,U),t.next(),e.tokenize(t,e)):"["==n?l(U)(t,e):":"==n?l(R)(t,e):t.match(/^(true|false|nil)\b/)?(e.tokenize=U,"keyword"):l(U)(t,e)}function R(t,e){return t.backUp(1),t.match(/^[^\s],(?=:)/)?(e.tokenize=l(R),null):(t.next(),U(t,e))}function q(t,e,n,i,u){return function(a,l){o(l);var s=0==a.current().length;if(a.match(/^\\$/,s))return s?(r(l,l.indented),"lineContinuation"):e;if(a.match(/^#\{/,s))return s?(l.tokenize=c("}",l.tokenize),null):e;for(var k,d=!1;null!=(k=a.next());){if(k==t&&(i||!d)){l.tokenize=u;break}if(n&&"#"==k&&!d&&a.eat("{")){a.backUp(2);break}d=!d&&"\\"==k}return a.eol()&&d&&a.backUp(1),e}}function I(t,e){return t.match(/^==?/)?(e.tokenize=s,"slimSwitch"):t.match(/^\/$/)?(e.tokenize=A,null):t.match(/^:/)?(e.tokenize=L,"slimSwitch"):(f(t,e,0),e.tokenize(t,e))}var P=t.getMode(e,{name:"htmlmixed"}),Z=t.getMode(e,"ruby"),_={html:P,ruby:Z},D={ruby:"ruby",javascript:"javascript",css:"text/css",sass:"text/x-sass",scss:"text/x-scss",less:"text/x-less",styl:"text/x-styl",coffee:"coffeescript",asciidoc:"text/x-asciidoc",markdown:"text/x-markdown",textile:"text/x-textile",creole:"text/x-creole",wiki:"text/x-wiki",mediawiki:"text/x-mediawiki",rdoc:"text/x-rdoc",builder:"text/x-builder",nokogiri:"text/x-nokogiri",erb:"application/x-erb"},Q=function(t){var e=[];for(var n in t)e.push(n);return new RegExp("^("+e.join("|")+"):")}(D),V={commentLine:"comment",slimSwitch:"operator special",slimTag:"tag",slimId:"attribute def",slimClass:"attribute qualifier",slimAttribute:"attribute",slimSubmode:"keyword special",closeAttributeTag:null,slimDoctype:null,lineContinuation:null},B={"{":"}","[":"]","(":")"},F="_a-zA-ZÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�",G=F+"\\-0-9·̀-ͯ‿-⁀",H=new RegExp("^[:"+F+"](?::["+G+"]|["+G+"]*)"),J=new RegExp("^[:"+F+"][:\\."+G+"]*(?=\\s*=)"),K=new RegExp("^[:"+F+"][:\\."+G+"]*"),N=/^\.-?[_a-zA-Z]+[\w\-]*/,W=/^#[_a-zA-Z]+[\w\-]*/,X={startState:function(){var t=P.startState(),e=Z.startState();return{htmlState:t,rubyState:e,stack:null,last:null,tokenize:A,line:A,indented:0}},copyState:function(e){return{htmlState:t.copyState(P,e.htmlState),rubyState:t.copyState(Z,e.rubyState),subMode:e.subMode,subState:e.subMode&&t.copyState(e.subMode,e.subState),stack:e.stack,last:e.last,tokenize:e.tokenize,line:e.line}},token:function(t,e){if(t.sol())for(e.indented=t.indentation(),e.startOfLine=!0,e.tokenize=e.line;e.stack&&e.stack.indented>e.indented&&"slimSubmode"!=e.last;)e.line=e.tokenize=e.stack.tokenize,e.stack=e.stack.parent,e.subMode=null,e.subState=null;if(t.eatSpace())return null;var n=e.tokenize(t,e);return e.startOfLine=!1,n&&(e.last=n),V.hasOwnProperty(n)?V[n]:n},blankLine:function(t){return t.subMode&&t.subMode.blankLine?t.subMode.blankLine(t.subState):void 0},innerMode:function(t){return t.subMode?{state:t.subState,mode:t.subMode}:{state:t,mode:X}}};return X},"htmlmixed","ruby"),t.defineMIME("text/x-slim","slim"),t.defineMIME("application/x-slim","slim")});