// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){e.defineMode("pig",function(e,O){function T(e,O,T){return O.tokenize=T,T(e,O)}function E(e,O){for(var T,E=!1;T=e.next();){if("/"==T&&E){O.tokenize=I;break}E="*"==T}return"comment"}function t(e){return function(O,T){for(var E,t=!1,N=!1;null!=(E=O.next());){if(E==e&&!t){N=!0;break}t=!t&&"\\"==E}return(N||!t&&!R)&&(T.tokenize=I),"error"}}function I(e,O){var I=e.next();return'"'==I||"'"==I?T(e,O,t(I)):/[\[\]{}\(\),;\.]/.test(I)?null:/\d/.test(I)?(e.eatWhile(/[\w\.]/),"number"):"/"==I?e.eat("*")?T(e,O,E):(e.eatWhile(S),"operator"):"-"==I?e.eat("-")?(e.skipToEnd(),"comment"):(e.eatWhile(S),"operator"):S.test(I)?(e.eatWhile(S),"operator"):(e.eatWhile(/[\w\$_]/),N&&N.propertyIsEnumerable(e.current().toUpperCase())&&!e.eat(")")&&!e.eat(".")?"keyword":r&&r.propertyIsEnumerable(e.current().toUpperCase())?"variable-2":A&&A.propertyIsEnumerable(e.current().toUpperCase())?"variable-3":"variable")}var N=O.keywords,r=O.builtins,A=O.types,R=O.multiLineStrings,S=/[*+\-%<>=&?:\/!|]/;return{startState:function(){return{tokenize:I,startOfLine:!0}},token:function(e,O){if(e.eatSpace())return null;var T=O.tokenize(e,O);return T}}}),function(){function O(e){for(var O={},T=e.split(" "),E=0;E<T.length;++E)O[T[E]]=!0;return O}var T="ABS ACOS ARITY ASIN ATAN AVG BAGSIZE BINSTORAGE BLOOM BUILDBLOOM CBRT CEIL CONCAT COR COS COSH COUNT COUNT_STAR COV CONSTANTSIZE CUBEDIMENSIONS DIFF DISTINCT DOUBLEABS DOUBLEAVG DOUBLEBASE DOUBLEMAX DOUBLEMIN DOUBLEROUND DOUBLESUM EXP FLOOR FLOATABS FLOATAVG FLOATMAX FLOATMIN FLOATROUND FLOATSUM GENERICINVOKER INDEXOF INTABS INTAVG INTMAX INTMIN INTSUM INVOKEFORDOUBLE INVOKEFORFLOAT INVOKEFORINT INVOKEFORLONG INVOKEFORSTRING INVOKER ISEMPTY JSONLOADER JSONMETADATA JSONSTORAGE LAST_INDEX_OF LCFIRST LOG LOG10 LOWER LONGABS LONGAVG LONGMAX LONGMIN LONGSUM MAX MIN MAPSIZE MONITOREDUDF NONDETERMINISTIC OUTPUTSCHEMA  PIGSTORAGE PIGSTREAMING RANDOM REGEX_EXTRACT REGEX_EXTRACT_ALL REPLACE ROUND SIN SINH SIZE SQRT STRSPLIT SUBSTRING SUM STRINGCONCAT STRINGMAX STRINGMIN STRINGSIZE TAN TANH TOBAG TOKENIZE TOMAP TOP TOTUPLE TRIM TEXTLOADER TUPLESIZE UCFIRST UPPER UTF8STORAGECONVERTER ",E="VOID IMPORT RETURNS DEFINE LOAD FILTER FOREACH ORDER CUBE DISTINCT COGROUP JOIN CROSS UNION SPLIT INTO IF OTHERWISE ALL AS BY USING INNER OUTER ONSCHEMA PARALLEL PARTITION GROUP AND OR NOT GENERATE FLATTEN ASC DESC IS STREAM THROUGH STORE MAPREDUCE SHIP CACHE INPUT OUTPUT STDERROR STDIN STDOUT LIMIT SAMPLE LEFT RIGHT FULL EQ GT LT GTE LTE NEQ MATCHES TRUE FALSE DUMP",t="BOOLEAN INT LONG FLOAT DOUBLE CHARARRAY BYTEARRAY BAG TUPLE MAP ";e.defineMIME("text/x-pig",{name:"pig",builtins:O(T),keywords:O(E),types:O(t)}),e.registerHelper("hintWords","pig",(T+t+E).split(" "))}()});