// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){function e(e,s){var n=s&&s.schemaInfo,a=s&&s.quoteChar||'"';if(n){var i=e.getCursor(),o=e.getTokenAt(i);o.end>i.ch&&(o.end=i.ch,o.string=o.string.slice(0,i.ch-o.start));var l=t.innerMode(e.getMode(),o.state);if("xml"==l.mode.name){var f,g,c=[],h=!1,p=/\btag\b/.test(o.type)&&!/>$/.test(o.string),u=p&&/^\w/.test(o.string);if(u){var d=e.getLine(i.line).slice(Math.max(0,o.start-2),o.start),m=/<\/$/.test(d)?"close":/<$/.test(d)?"open":null;m&&(g=o.start-("close"==m?2:1))}else p&&"<"==o.string?m="open":p&&"</"==o.string&&(m="close");if(!p&&!l.state.tagName||m){u&&(f=o.string),h=m;var v=l.state.context,y=v&&n[v.tagName],x=v?y&&y.children:n["!top"];if(x&&"close"!=m)for(var O=0;O<x.length;++O)f&&0!=x[O].lastIndexOf(f,0)||c.push("<"+x[O]);else if("close"!=m)for(var b in n)!n.hasOwnProperty(b)||"!top"==b||"!attrs"==b||f&&0!=b.lastIndexOf(f,0)||c.push("<"+b);v&&(!f||"close"==m&&0==v.tagName.lastIndexOf(f,0))&&c.push("</"+v.tagName+">")}else{var y=n[l.state.tagName],w=y&&y.attrs,I=n["!attrs"];if(!w&&!I)return;if(w){if(I){var P={};for(var A in I)I.hasOwnProperty(A)&&(P[A]=I[A]);for(var A in w)w.hasOwnProperty(A)&&(P[A]=w[A]);w=P}}else w=I;if("string"==o.type||"="==o.string){var M,d=e.getRange(r(i.line,Math.max(0,i.ch-60)),r(i.line,"string"==o.type?o.start:o.end)),N=d.match(/([^\s\u00a0=<>\"\']+)=$/);if(!N||!w.hasOwnProperty(N[1])||!(M=w[N[1]]))return;if("function"==typeof M&&(M=M.call(this,e)),"string"==o.type){f=o.string;var $=0;/['"]/.test(o.string.charAt(0))&&(a=o.string.charAt(0),f=o.string.slice(1),$++);var C=o.string.length;/['"]/.test(o.string.charAt(C-1))&&(a=o.string.charAt(C-1),f=o.string.substr($,C-2)),h=!0}for(var O=0;O<M.length;++O)f&&0!=M[O].lastIndexOf(f,0)||c.push(a+M[O]+a)}else{"attribute"==o.type&&(f=o.string,h=!0);for(var j in w)!w.hasOwnProperty(j)||f&&0!=j.lastIndexOf(f,0)||c.push(j)}}return{list:c,from:h?r(i.line,null==g?o.start:g):i,to:h?r(i.line,o.end):i}}}}var r=t.Pos;t.registerHelper("hint","xml",e)});