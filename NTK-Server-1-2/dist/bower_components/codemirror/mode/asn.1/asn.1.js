// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){function t(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}e.defineMode("asn.1",function(e,t){function n(e,t){var n=e.next();if('"'==n||"'"==n)return t.tokenize=r(n),t.tokenize(e,t);if(/[\[\]\(\){}:=,;]/.test(n))return a=n,"punctuation";if("-"==n&&e.eat("-"))return e.skipToEnd(),"comment";if(/\d/.test(n))return e.eatWhile(/[\w\.]/),"number";if(O.test(n))return e.eatWhile(O),"operator";e.eatWhile(/[\w\-]/);var i=e.current();return I.propertyIsEnumerable(i)?"keyword":T.propertyIsEnumerable(i)?"variable cmipVerbs":u.propertyIsEnumerable(i)?"atom compareTypes":S.propertyIsEnumerable(i)?"comment status":l.propertyIsEnumerable(i)?"variable-3 tags":c.propertyIsEnumerable(i)?"builtin storage":A.propertyIsEnumerable(i)?"string-2 modifier":p.propertyIsEnumerable(i)?"atom accessTypes":"variable"}function r(e){return function(t,n){for(var r,i=!1,o=!1;null!=(r=t.next());){if(r==e&&!i){var E=t.peek();E&&(E=E.toLowerCase(),("b"==E||"h"==E||"o"==E)&&t.next()),o=!0;break}i=!i&&"\\"==r}return(o||!i&&!N)&&(n.tokenize=null),"string"}}function i(e,t,n,r,i){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=i}function o(e,t,n){var r=e.indented;return e.context&&"statement"==e.context.type&&(r=e.context.indented),e.context=new i(r,t,n,null,e.context)}function E(e){var t=e.context.type;return(")"==t||"]"==t||"}"==t)&&(e.indented=e.context.indented),e.context=e.context.prev}var a,s=e.indentUnit,I=t.keywords||{},T=t.cmipVerbs||{},u=t.compareTypes||{},S=t.status||{},l=t.tags||{},c=t.storage||{},A=t.modifier||{},p=t.accessTypes||{},N=t.multiLineStrings,m=t.indentStatements!==!1,O=/[\|\^]/;return{startState:function(e){return{tokenize:null,context:new i((e||0)-s,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,t){var r=t.context;if(e.sol()&&(null==r.align&&(r.align=!1),t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;a=null;var i=(t.tokenize||n)(e,t);if("comment"==i)return i;if(null==r.align&&(r.align=!0),";"!=a&&":"!=a&&","!=a||"statement"!=r.type)if("{"==a)o(t,e.column(),"}");else if("["==a)o(t,e.column(),"]");else if("("==a)o(t,e.column(),")");else if("}"==a){for(;"statement"==r.type;)r=E(t);for("}"==r.type&&(r=E(t));"statement"==r.type;)r=E(t)}else a==r.type?E(t):m&&(("}"==r.type||"top"==r.type)&&";"!=a||"statement"==r.type&&"newstatement"==a)&&o(t,e.column(),"statement");else E(t);return t.startOfLine=!1,i},electricChars:"{}",lineComment:"--",fold:"brace"}}),e.defineMIME("text/x-ttcn-asn",{name:"asn.1",keywords:t("DEFINITIONS OBJECTS IF DERIVED INFORMATION ACTION REPLY ANY NAMED CHARACTERIZED BEHAVIOUR REGISTERED WITH AS IDENTIFIED CONSTRAINED BY PRESENT BEGIN IMPORTS FROM UNITS SYNTAX MIN-ACCESS MAX-ACCESS MINACCESS MAXACCESS REVISION STATUS DESCRIPTION SEQUENCE SET COMPONENTS OF CHOICE DistinguishedName ENUMERATED SIZE MODULE END INDEX AUGMENTS EXTENSIBILITY IMPLIED EXPORTS"),cmipVerbs:t("ACTIONS ADD GET NOTIFICATIONS REPLACE REMOVE"),compareTypes:t("OPTIONAL DEFAULT MANAGED MODULE-TYPE MODULE_IDENTITY MODULE-COMPLIANCE OBJECT-TYPE OBJECT-IDENTITY OBJECT-COMPLIANCE MODE CONFIRMED CONDITIONAL SUBORDINATE SUPERIOR CLASS TRUE FALSE NULL TEXTUAL-CONVENTION"),status:t("current deprecated mandatory obsolete"),tags:t("APPLICATION AUTOMATIC EXPLICIT IMPLICIT PRIVATE TAGS UNIVERSAL"),storage:t("BOOLEAN INTEGER OBJECT IDENTIFIER BIT OCTET STRING UTCTime InterfaceIndex IANAifType CMIP-Attribute REAL PACKAGE PACKAGES IpAddress PhysAddress NetworkAddress BITS BMPString TimeStamp TimeTicks TruthValue RowStatus DisplayString GeneralString GraphicString IA5String NumericString PrintableString SnmpAdminAtring TeletexString UTF8String VideotexString VisibleString StringStore ISO646String T61String UniversalString Unsigned32 Integer32 Gauge Gauge32 Counter Counter32 Counter64"),modifier:t("ATTRIBUTE ATTRIBUTES MANDATORY-GROUP MANDATORY-GROUPS GROUP GROUPS ELEMENTS EQUALITY ORDERING SUBSTRINGS DEFINED"),accessTypes:t("not-accessible accessible-for-notify read-only read-create read-write"),multiLineStrings:!0})});