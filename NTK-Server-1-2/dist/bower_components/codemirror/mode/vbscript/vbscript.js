// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){e.defineMode("vbscript",function(e,t){function n(e){return new RegExp("^(("+e.join(")|(")+"))\\b","i")}function r(e,t){t.currentIndent++}function a(e,t){t.currentIndent--}function i(e,t){if(e.eatSpace())return"space";var n=e.peek();if("'"===n)return e.skipToEnd(),"comment";if(e.match(K))return e.skipToEnd(),"comment";if(e.match(/^((&H)|(&O))?[0-9\.]/i,!1)&&!e.match(/^((&H)|(&O))?[0-9\.]+[a-z_]/i,!1)){var i=!1;if(e.match(/^\d*\.\d+/i)?i=!0:e.match(/^\d+\.\d*/)?i=!0:e.match(/^\.\d+/)&&(i=!0),i)return e.eat(/J/i),"number";var c=!1;if(e.match(/^&H[0-9a-f]+/i)?c=!0:e.match(/^&O[0-7]+/i)?c=!0:e.match(/^[1-9]\d*F?/)?(e.eat(/J/i),c=!0):e.match(/^0(?![\dx])/i)&&(c=!0),c)return e.eat(/L/i),"number"}return e.match(R)?(t.tokenize=o(e.current()),t.tokenize(e,t)):e.match(s)||e.match(l)||e.match(h)?"operator":e.match(u)?null:e.match(d)?"bracket":e.match(W)?(t.doInCurrentLine=!0,"keyword"):e.match(q)?(r(e,t),t.doInCurrentLine=!0,"keyword"):e.match(B)?(t.doInCurrentLine?t.doInCurrentLine=!1:r(e,t),"keyword"):e.match(M)?"keyword":e.match(N)?(a(e,t),a(e,t),"keyword"):e.match(A)?(t.doInCurrentLine?t.doInCurrentLine=!1:a(e,t),"keyword"):e.match(T)?"keyword":e.match(j)?"atom":e.match(F)?"variable-2":e.match(O)?"builtin":e.match(z)?"variable-2":e.match(v)?"variable":(e.next(),b)}function o(e){var n=1==e.length,r="string";return function(a,o){for(;!a.eol();){if(a.eatWhile(/[^'"]/),a.match(e))return o.tokenize=i,r;a.eat(/['"]/)}if(n){if(t.singleLineStringErrors)return b;o.tokenize=i}return r}}function c(e,t){var n=t.tokenize(e,t),r=e.current();return"."===r?(n=t.tokenize(e,t),r=e.current(),!n||"variable"!==n.substr(0,8)&&"builtin"!==n&&"keyword"!==n?b:(("builtin"===n||"keyword"===n)&&(n="variable"),S.indexOf(r.substr(1))>-1&&(n="variable-2"),n)):n}var b="error",l=new RegExp("^[\\+\\-\\*/&\\\\\\^<>=]"),s=new RegExp("^((<>)|(<=)|(>=))"),u=new RegExp("^[\\.,]"),d=new RegExp("^[\\(\\)]"),v=new RegExp("^[A-Za-z][_A-Za-z0-9]*"),m=["class","sub","select","while","if","function","property","with","for"],p=["else","elseif","case"],f=["next","loop","wend"],h=n(["and","or","not","xor","is","mod","eqv","imp"]),y=["dim","redim","then","until","randomize","byval","byref","new","property","exit","in","const","private","public","get","set","let","stop","on error resume next","on error goto 0","option explicit","call","me"],g=["true","false","nothing","empty","null"],x=["abs","array","asc","atn","cbool","cbyte","ccur","cdate","cdbl","chr","cint","clng","cos","csng","cstr","date","dateadd","datediff","datepart","dateserial","datevalue","day","escape","eval","execute","exp","filter","formatcurrency","formatdatetime","formatnumber","formatpercent","getlocale","getobject","getref","hex","hour","inputbox","instr","instrrev","int","fix","isarray","isdate","isempty","isnull","isnumeric","isobject","join","lbound","lcase","left","len","loadpicture","log","ltrim","rtrim","trim","maths","mid","minute","month","monthname","msgbox","now","oct","replace","rgb","right","rnd","round","scriptengine","scriptenginebuildversion","scriptenginemajorversion","scriptengineminorversion","second","setlocale","sgn","sin","space","split","sqr","strcomp","string","strreverse","tan","time","timer","timeserial","timevalue","typename","ubound","ucase","unescape","vartype","weekday","weekdayname","year"],k=["vbBlack","vbRed","vbGreen","vbYellow","vbBlue","vbMagenta","vbCyan","vbWhite","vbBinaryCompare","vbTextCompare","vbSunday","vbMonday","vbTuesday","vbWednesday","vbThursday","vbFriday","vbSaturday","vbUseSystemDayOfWeek","vbFirstJan1","vbFirstFourDays","vbFirstFullWeek","vbGeneralDate","vbLongDate","vbShortDate","vbLongTime","vbShortTime","vbObjectError","vbOKOnly","vbOKCancel","vbAbortRetryIgnore","vbYesNoCancel","vbYesNo","vbRetryCancel","vbCritical","vbQuestion","vbExclamation","vbInformation","vbDefaultButton1","vbDefaultButton2","vbDefaultButton3","vbDefaultButton4","vbApplicationModal","vbSystemModal","vbOK","vbCancel","vbAbort","vbRetry","vbIgnore","vbYes","vbNo","vbCr","VbCrLf","vbFormFeed","vbLf","vbNewLine","vbNullChar","vbNullString","vbTab","vbVerticalTab","vbUseDefault","vbTrue","vbFalse","vbEmpty","vbNull","vbInteger","vbLong","vbSingle","vbDouble","vbCurrency","vbDate","vbString","vbObject","vbError","vbBoolean","vbVariant","vbDataObject","vbDecimal","vbByte","vbArray"],w=["WScript","err","debug","RegExp"],I=["description","firstindex","global","helpcontext","helpfile","ignorecase","length","number","pattern","source","value","count"],C=["clear","execute","raise","replace","test","write","writeline","close","open","state","eof","update","addnew","end","createobject","quit"],L=["server","response","request","session","application"],E=["buffer","cachecontrol","charset","contenttype","expires","expiresabsolute","isclientconnected","pics","status","clientcertificate","cookies","form","querystring","servervariables","totalbytes","contents","staticobjects","codepage","lcid","sessionid","timeout","scripttimeout"],D=["addheader","appendtolog","binarywrite","end","flush","redirect","binaryread","remove","removeall","lock","unlock","abandon","getlasterror","htmlencode","mappath","transfer","urlencode"],S=C.concat(I);w=w.concat(k),e.isASP&&(w=w.concat(L),S=S.concat(D,E));var T=n(y),j=n(g),O=n(x),z=n(w),F=n(S),R='"',B=n(m),M=n(p),A=n(f),N=n(["end"]),q=n(["do"]),W=n(["on error resume next","exit"]),K=n(["rem"]),U={electricChars:"dDpPtTfFeE ",startState:function(){return{tokenize:i,lastToken:null,currentIndent:0,nextLineIndent:0,doInCurrentLine:!1,ignoreKeyword:!1}},token:function(e,t){e.sol()&&(t.currentIndent+=t.nextLineIndent,t.nextLineIndent=0,t.doInCurrentLine=0);var n=c(e,t);return t.lastToken={style:n,content:e.current()},"space"===n&&(n=null),n},indent:function(t,n){var r=n.replace(/^\s+|\s+$/g,"");return r.match(A)||r.match(N)||r.match(M)?e.indentUnit*(t.currentIndent-1):t.currentIndent<0?0:t.currentIndent*e.indentUnit}};return U}),e.defineMIME("text/vbscript","vbscript")});