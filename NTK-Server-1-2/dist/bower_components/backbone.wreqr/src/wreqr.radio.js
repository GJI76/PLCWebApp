Wreqr.radio=function(e,n){var t=function(){this._channels={},this.vent={},this.commands={},this.reqres={},this._proxyMethods()};n.extend(t.prototype,{channel:function(e){if(!e)throw new Error("Channel must receive a name");return this._getChannel(e)},_getChannel:function(n){var t=this._channels[n];return t||(t=new e.Channel(n),this._channels[n]=t),t},_proxyMethods:function(){n.each(["vent","commands","reqres"],function(e){n.each(r[e],function(n){this[e][n]=s(this,e,n)},this)},this)}});var r={vent:["on","off","trigger","once","stopListening","listenTo","listenToOnce"],commands:["execute","setHandler","setHandlers","removeHandler","removeAllHandlers"],reqres:["request","setHandler","setHandlers","removeHandler","removeAllHandlers"]},s=function(e,t,r){return function(s){var a=e._getChannel(s)[t];return a[r].apply(a,n.rest(arguments))}};return new t}(Wreqr,_);