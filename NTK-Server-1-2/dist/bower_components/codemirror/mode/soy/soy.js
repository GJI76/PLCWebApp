// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed"],t):t(CodeMirror)}(function(t){var e=["template","literal","msg","fallbackmsg","let","if","elseif","else","switch","case","default","foreach","ifempty","for","call","param","deltemplate","delcall","log"];t.defineMode("soy",function(n){function a(t){return t[t.length-1]}function i(t,e,n){var a=t.string,i=n.exec(a.substr(t.pos));i&&(t.string=a.substr(0,t.pos+i.index));var l=t.hideFirstChars(e.indent,function(){return e.localMode.token(t,e.localState)});return t.string=a,l}var l=t.getMode(n,"text/plain"),o={html:t.getMode(n,{name:"text/html",multilineTagIndentFactor:2,multilineTagIndentPastTag:!1}),attributes:l,text:l,uri:l,css:t.getMode(n,"text/css"),js:t.getMode(n,{name:"text/javascript",statementIndent:2*n.indentUnit})};return{startState:function(){return{kind:[],kindTag:[],soyState:[],indent:0,localMode:o.html,localState:t.startState(o.html)}},copyState:function(e){return{tag:e.tag,kind:e.kind.concat([]),kindTag:e.kindTag.concat([]),soyState:e.soyState.concat([]),indent:e.indent,localMode:e.localMode,localState:t.copyState(e.localMode,e.localState)}},token:function(l,r){var s;switch(a(r.soyState)){case"comment":return l.match(/^.*?\*\//)?r.soyState.pop():l.skipToEnd(),"comment";case"variable":return l.match(/^}/)?(r.indent-=2*n.indentUnit,r.soyState.pop(),"variable-2"):(l.next(),null);case"tag":if(l.match(/^\/?}/))return"/template"==r.tag||"/deltemplate"==r.tag?r.indent=0:r.indent-=("/}"==l.current()||-1==e.indexOf(r.tag)?2:1)*n.indentUnit,r.soyState.pop(),"keyword";if(l.match(/^([\w?]+)(?==)/)){if("kind"==l.current()&&(s=l.match(/^="([^"]+)/,!1))){var c=s[1];r.kind.push(c),r.kindTag.push(r.tag),r.localMode=o[c]||o.html,r.localState=t.startState(r.localMode)}return"attribute"}return l.match(/^"/)?(r.soyState.push("string"),"string"):(l.next(),null);case"literal":return l.match(/^(?=\{\/literal})/)?(r.indent-=n.indentUnit,r.soyState.pop(),this.token(l,r)):i(l,r,/\{\/literal}/);case"string":return l.match(/^.*?"/)?r.soyState.pop():l.skipToEnd(),"string"}return l.match(/^\/\*/)?(r.soyState.push("comment"),"comment"):l.match(l.sol()?/^\s*\/\/.*/:/^\s+\/\/.*/)?"comment":l.match(/^\{\$[\w?]*/)?(r.indent+=2*n.indentUnit,r.soyState.push("variable"),"variable-2"):l.match(/^\{literal}/)?(r.indent+=n.indentUnit,r.soyState.push("literal"),"keyword"):(s=l.match(/^\{([\/@\\]?[\w?]*)/))?("/switch"!=s[1]&&(r.indent+=(/^(\/|(else|elseif|case|default)$)/.test(s[1])&&"switch"!=r.tag?1:2)*n.indentUnit),r.tag=s[1],r.tag=="/"+a(r.kindTag)&&(r.kind.pop(),r.kindTag.pop(),r.localMode=o[a(r.kind)]||o.html,r.localState=t.startState(r.localMode)),r.soyState.push("tag"),"keyword"):i(l,r,/\{|\s+\/\/|\/\*/)},indent:function(e,i){var l=e.indent,o=a(e.soyState);if("comment"==o)return t.Pass;if("literal"==o)/^\{\/literal}/.test(i)&&(l-=n.indentUnit);else{if(/^\s*\{\/(template|deltemplate)\b/.test(i))return 0;/^\{(\/|(fallbackmsg|elseif|else|ifempty)\b)/.test(i)&&(l-=n.indentUnit),"switch"!=e.tag&&/^\{(case|default)\b/.test(i)&&(l-=n.indentUnit),/^\{\/switch\b/.test(i)&&(l-=n.indentUnit)}return l&&e.localMode.indent&&(l+=e.localMode.indent(e.localState,i)),l},innerMode:function(t){return t.soyState.length&&"literal"!=a(t.soyState)?null:{state:t.localState,mode:t.localMode}},electricInput:/^\s*\{(\/|\/template|\/deltemplate|\/switch|fallbackmsg|elseif|else|case|default|ifempty|\/literal\})$/,lineComment:"//",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",fold:"indent"}},"htmlmixed"),t.registerHelper("hintWords","soy",e.concat(["delpackage","namespace","alias","print","css","debugger"])),t.defineMIME("text/x-soy","soy")});