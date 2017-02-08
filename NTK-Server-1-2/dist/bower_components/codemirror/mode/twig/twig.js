// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){e.defineMode("twig",function(){function e(e,a){var f=e.peek();if(a.incomment)return e.skipTo("#}")?(e.eatWhile(/\#|}/),a.incomment=!1):e.skipToEnd(),"comment";if(a.intag){if(a.operator){if(a.operator=!1,e.match(r))return"atom";if(e.match(o))return"number"}if(a.sign){if(a.sign=!1,e.match(r))return"atom";if(e.match(o))return"number"}if(a.instring)return f==a.instring&&(a.instring=!1),e.next(),"string";if("'"==f||'"'==f)return a.instring=f,e.next(),"string";if(e.match(a.intag+"}")||e.eat("-")&&e.match(a.intag+"}"))return a.intag=!1,"tag";if(e.match(n))return a.operator=!0,"operator";if(e.match(i))a.sign=!0;else if(e.eat(" ")||e.sol()){if(e.match(t))return"keyword";if(e.match(r))return"atom";if(e.match(o))return"number";e.sol()&&e.next()}else e.next();return"variable"}if(e.eat("{")){if(f=e.eat("#"))return a.incomment=!0,e.skipTo("#}")?(e.eatWhile(/\#|}/),a.incomment=!1):e.skipToEnd(),"comment";if(f=e.eat(/\{|%/))return a.intag=f,"{"==f&&(a.intag="}"),e.eat("-"),"tag"}e.next()}var t=["and","as","autoescape","endautoescape","block","do","endblock","else","elseif","extends","for","endfor","embed","endembed","filter","endfilter","flush","from","if","endif","in","is","include","import","not","or","set","spaceless","endspaceless","with","endwith","trans","endtrans","blocktrans","endblocktrans","macro","endmacro","use","verbatim","endverbatim"],n=/^[+\-*&%=<>!?|~^]/,i=/^[:\[\(\{]/,r=["true","false","null","empty","defined","divisibleby","divisible by","even","odd","iterable","sameas","same as"],o=/^(\d[+\-\*\/])?\d+(\.\d+)?/;return t=new RegExp("(("+t.join(")|(")+"))\\b"),r=new RegExp("(("+r.join(")|(")+"))\\b"),{startState:function(){return{}},token:function(t,n){return e(t,n)}}}),e.defineMIME("text/x-twig","twig")});