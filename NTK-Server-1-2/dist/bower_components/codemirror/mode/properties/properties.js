// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){e.defineMode("properties",function(){return{token:function(e,i){var t=e.sol()||i.afterSection,n=e.eol();if(i.afterSection=!1,t&&(i.nextMultiline?(i.inMultiline=!0,i.nextMultiline=!1):i.position="def"),n&&!i.nextMultiline&&(i.inMultiline=!1,i.position="def"),t)for(;e.eatSpace(););var o=e.next();return!t||"#"!==o&&"!"!==o&&";"!==o?t&&"["===o?(i.afterSection=!0,e.skipTo("]"),e.eat("]"),"header"):"="===o||":"===o?(i.position="quote",null):("\\"===o&&"quote"===i.position&&e.eol()&&(i.nextMultiline=!0),i.position):(i.position="comment",e.skipToEnd(),"comment")},startState:function(){return{position:"def",nextMultiline:!1,inMultiline:!1,afterSection:!1}}}}),e.defineMIME("text/x-properties","properties"),e.defineMIME("text/x-ini","properties")});