// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){e.registerHelper("lint","json",function(o){var r=[];jsonlint.parseError=function(o,n){var t=n.loc;r.push({from:e.Pos(t.first_line-1,t.first_column),to:e.Pos(t.last_line-1,t.last_column),message:o})};try{jsonlint.parse(o)}catch(n){}return r})});