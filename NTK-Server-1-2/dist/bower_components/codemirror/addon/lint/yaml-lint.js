// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){e.registerHelper("lint","yaml",function(o){var r=[];try{jsyaml.load(o)}catch(i){var n=i.mark;r.push({from:e.Pos(n.line,n.column),to:e.Pos(n.line,n.column),message:i.message})}return r})});