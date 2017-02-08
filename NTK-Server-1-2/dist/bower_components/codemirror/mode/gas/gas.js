// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(i){"object"==typeof exports&&"object"==typeof module?i(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],i):i(CodeMirror)}(function(i){i.defineMode("gas",function(i,t){function l(){u="#",o.ax="variable",o.eax="variable-2",o.rax="variable-3",o.bx="variable",o.ebx="variable-2",o.rbx="variable-3",o.cx="variable",o.ecx="variable-2",o.rcx="variable-3",o.dx="variable",o.edx="variable-2",o.rdx="variable-3",o.si="variable",o.esi="variable-2",o.rsi="variable-3",o.di="variable",o.edi="variable-2",o.rdi="variable-3",o.sp="variable",o.esp="variable-2",o.rsp="variable-3",o.bp="variable",o.ebp="variable-2",o.rbp="variable-3",o.ip="variable",o.eip="variable-2",o.rip="variable-3",o.cs="keyword",o.ds="keyword",o.ss="keyword",o.es="keyword",o.fs="keyword",o.gs="keyword"}function n(){u="@",a.syntax="builtin",o.r0="variable",o.r1="variable",o.r2="variable",o.r3="variable",o.r4="variable",o.r5="variable",o.r6="variable",o.r7="variable",o.r8="variable",o.r9="variable",o.r10="variable",o.r11="variable",o.r12="variable",o.sp="variable-2",o.lr="variable-2",o.pc="variable-2",o.r13=o.sp,o.r14=o.lr,o.r15=o.pc,r.push(function(i,t){return"#"===i?(t.eatWhile(/\w/),"number"):void 0})}function e(i,t){for(var l,n=!1;null!=(l=i.next());){if(l===t&&!n)return!1;n=!n&&"\\"===l}return n}function b(i,t){for(var l,n=!1;null!=(l=i.next());){if("/"===l&&n){t.tokenize=null;break}n="*"===l}return"comment"}var r=[],u="",a={".abort":"builtin",".align":"builtin",".altmacro":"builtin",".ascii":"builtin",".asciz":"builtin",".balign":"builtin",".balignw":"builtin",".balignl":"builtin",".bundle_align_mode":"builtin",".bundle_lock":"builtin",".bundle_unlock":"builtin",".byte":"builtin",".cfi_startproc":"builtin",".comm":"builtin",".data":"builtin",".def":"builtin",".desc":"builtin",".dim":"builtin",".double":"builtin",".eject":"builtin",".else":"builtin",".elseif":"builtin",".end":"builtin",".endef":"builtin",".endfunc":"builtin",".endif":"builtin",".equ":"builtin",".equiv":"builtin",".eqv":"builtin",".err":"builtin",".error":"builtin",".exitm":"builtin",".extern":"builtin",".fail":"builtin",".file":"builtin",".fill":"builtin",".float":"builtin",".func":"builtin",".global":"builtin",".gnu_attribute":"builtin",".hidden":"builtin",".hword":"builtin",".ident":"builtin",".if":"builtin",".incbin":"builtin",".include":"builtin",".int":"builtin",".internal":"builtin",".irp":"builtin",".irpc":"builtin",".lcomm":"builtin",".lflags":"builtin",".line":"builtin",".linkonce":"builtin",".list":"builtin",".ln":"builtin",".loc":"builtin",".loc_mark_labels":"builtin",".local":"builtin",".long":"builtin",".macro":"builtin",".mri":"builtin",".noaltmacro":"builtin",".nolist":"builtin",".octa":"builtin",".offset":"builtin",".org":"builtin",".p2align":"builtin",".popsection":"builtin",".previous":"builtin",".print":"builtin",".protected":"builtin",".psize":"builtin",".purgem":"builtin",".pushsection":"builtin",".quad":"builtin",".reloc":"builtin",".rept":"builtin",".sbttl":"builtin",".scl":"builtin",".section":"builtin",".set":"builtin",".short":"builtin",".single":"builtin",".size":"builtin",".skip":"builtin",".sleb128":"builtin",".space":"builtin",".stab":"builtin",".string":"builtin",".struct":"builtin",".subsection":"builtin",".symver":"builtin",".tag":"builtin",".text":"builtin",".title":"builtin",".type":"builtin",".uleb128":"builtin",".val":"builtin",".version":"builtin",".vtable_entry":"builtin",".vtable_inherit":"builtin",".warning":"builtin",".weak":"builtin",".weakref":"builtin",".word":"builtin"},o={},c=(t.architecture||"x86").toLowerCase();return"x86"===c?l(t):("arm"===c||"armv6"===c)&&n(t),{startState:function(){return{tokenize:null}},token:function(i,t){if(t.tokenize)return t.tokenize(i,t);if(i.eatSpace())return null;var l,n,c=i.next();if("/"===c&&i.eat("*"))return t.tokenize=b,b(i,t);if(c===u)return i.skipToEnd(),"comment";if('"'===c)return e(i,'"'),"string";if("."===c)return i.eatWhile(/\w/),n=i.current().toLowerCase(),l=a[n],l||null;if("="===c)return i.eatWhile(/\w/),"tag";if("{"===c)return"braket";if("}"===c)return"braket";if(/\d/.test(c))return"0"===c&&i.eat("x")?(i.eatWhile(/[0-9a-fA-F]/),"number"):(i.eatWhile(/\d/),"number");if(/\w/.test(c))return i.eatWhile(/\w/),i.eat(":")?"tag":(n=i.current().toLowerCase(),l=o[n],l||null);for(var s=0;s<r.length;s++)if(l=r[s](c,i,t))return l},lineComment:u,blockCommentStart:"/*",blockCommentEnd:"*/"}})});