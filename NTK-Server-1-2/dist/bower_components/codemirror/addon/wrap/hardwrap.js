// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(r){"object"==typeof exports&&"object"==typeof module?r(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],r):r(CodeMirror)}(function(r){function t(r,t,e){for(var n=e.paragraphStart||r.getHelper(t,"paragraphStart"),o=t.line,a=r.firstLine();o>a;--o){var i=r.getLine(o);if(n&&n.test(i))break;if(!/\S/.test(i)){++o;break}}for(var f=e.paragraphEnd||r.getHelper(t,"paragraphEnd"),l=t.line+1,h=r.lastLine();h>=l;++l){var i=r.getLine(l);if(f&&f.test(i)){++l;break}if(!/\S/.test(i))break}return{from:o,to:l}}function e(r,t,e,n){for(var o=t;o>0&&!e.test(r.slice(o-1,o+1));--o);0==o&&(o=t);var a=o;if(n)for(;" "==r.charAt(a-1);)--a;return{from:a,to:o}}function n(t,n,a,i){n=t.clipPos(n),a=t.clipPos(a);var f=i.column||80,l=i.wrapOn||/\s\S|-[^\.\d]/,h=i.killTrailingSpace!==!1,s=[],c="",g=n.line,p=t.getRange(n,a,!1);if(!p.length)return null;for(var u=p[0].match(/^[ \t]*/)[0],m=0;m<p.length;++m){var v=p[m],d=c.length,b=0;c&&v&&!l.test(c.charAt(c.length-1)+v.charAt(0))&&(c+=" ",b=1);var x="";if(m&&(x=v.match(/^\s*/)[0],v=v.slice(x.length)),c+=v,m){var S=c.length>f&&u==x&&e(c,f,l,h);S&&S.from==d&&S.to==d+b?(c=u+v,++g):s.push({text:[b?" ":""],from:o(g,d),to:o(g+1,x.length)})}for(;c.length>f;){var E=e(c,f,l,h);s.push({text:["",u],from:o(g,E.from),to:o(g,E.to)}),c=u+c.slice(E.to),++g}}return s.length&&t.operation(function(){for(var r=0;r<s.length;++r){var e=s[r];t.replaceRange(e.text,e.from,e.to)}}),s.length?{from:s[0].from,to:r.changeEnd(s[s.length-1])}:null}var o=r.Pos;r.defineExtension("wrapParagraph",function(r,e){e=e||{},r||(r=this.getCursor());var a=t(this,r,e);return n(this,o(a.from,0),o(a.to-1),e)}),r.commands.wrapLines=function(r){r.operation(function(){for(var e=r.listSelections(),a=r.lastLine()+1,i=e.length-1;i>=0;i--){var f,l=e[i];if(l.empty()){var h=t(r,l.head,{});f={from:o(h.from,0),to:o(h.to-1)}}else f={from:l.from(),to:l.to()};f.to.line>=a||(a=f.from.line,n(r,f.from,f.to,{}))}})},r.defineExtension("wrapRange",function(r,t,e){return n(this,r,t,e||{})}),r.defineExtension("wrapParagraphsInRange",function(r,e,a){a=a||{};for(var i=this,f=[],l=r.line;l<=e.line;){var h=t(i,o(l,0),a);f.push(h),l=h.to}var s=!1;return f.length&&i.operation(function(){for(var r=f.length-1;r>=0;--r)s=s||n(i,o(f[r].from,0),o(f[r].to-1),a)}),s})});