!function(e,r){if("function"==typeof define&&define.amd)define(["backbone","underscore"],function(e,n){return r(e,n)});else if("undefined"!=typeof exports){var n=require("backbone"),o=require("underscore");module.exports=r(n,o)}else r(e.Backbone,e._)}(this,function(e){{var r=e.Wreqr;e.Wreqr={}}return e.Wreqr.VERSION="<%= version %>",e.Wreqr.noConflict=function(){return e.Wreqr=r,this},e.Wreqr});