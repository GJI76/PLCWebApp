define(["backbone","views/item/Canvas","application"],function(e){return e.Router.extend({routes:{"":"index",server:"setServerClient"},index:function(){},setServerClient:function(){app.server=!0,console.log("setting server")},renderContainerViews:function(){console.log("rendering main",window.app)}})});