// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){t.defineMode("turtle",function(t){function e(t){return new RegExp("^(?:"+t.join("|")+")$","i")}function n(t,e){var n=t.next();if(c=null,"<"==n&&!t.match(/^[\s\u00a0=]/,!1))return t.match(/^[^\s\u00a0>]*>?/),"atom";if('"'==n||"'"==n)return e.tokenize=o(n),e.tokenize(t,e);if(/[{}\(\),\.;\[\]]/.test(n))return c=n,null;if("#"==n)return t.skipToEnd(),"comment";if(a.test(n))return t.eatWhile(a),null;if(":"==n)return"operator";if(t.eatWhile(/[_\w\d]/),":"==t.peek())return"variable-3";var r=t.current();return l.test(r)?"meta":n>="A"&&"Z">=n?"comment":"keyword";var r}function o(t){return function(e,o){for(var r,i=!1;null!=(r=e.next());){if(r==t&&!i){o.tokenize=n;break}i=!i&&"\\"==r}return"string"}}function r(t,e,n){t.context={prev:t.context,indent:t.indent,col:n,type:e}}function i(t){t.indent=t.context.indent,t.context=t.context.prev}var c,u=t.indentUnit,l=(e([]),e(["@prefix","@base","a"])),a=/[*+\-<>=&|]/;return{startState:function(){return{tokenize:n,context:null,indent:0,col:0}},token:function(t,e){if(t.sol()&&(e.context&&null==e.context.align&&(e.context.align=!1),e.indent=t.indentation()),t.eatSpace())return null;var n=e.tokenize(t,e);if("comment"!=n&&e.context&&null==e.context.align&&"pattern"!=e.context.type&&(e.context.align=!0),"("==c)r(e,")",t.column());else if("["==c)r(e,"]",t.column());else if("{"==c)r(e,"}",t.column());else if(/[\]\}\)]/.test(c)){for(;e.context&&"pattern"==e.context.type;)i(e);e.context&&c==e.context.type&&i(e)}else"."==c&&e.context&&"pattern"==e.context.type?i(e):/atom|string|variable/.test(n)&&e.context&&(/[\}\]]/.test(e.context.type)?r(e,"pattern",t.column()):"pattern"!=e.context.type||e.context.align||(e.context.align=!0,e.context.col=t.column()));return n},indent:function(t,e){var n=e&&e.charAt(0),o=t.context;if(/[\]\}]/.test(n))for(;o&&"pattern"==o.type;)o=o.prev;var r=o&&n==o.type;return o?"pattern"==o.type?o.col:o.align?o.col+(r?0:1):o.indent+(r?0:u):0},lineComment:"#"}}),t.defineMIME("text/turtle","turtle")});