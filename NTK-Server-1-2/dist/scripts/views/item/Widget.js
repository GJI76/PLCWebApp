define(["backbone","rivets","models/WidgetConfig","text!tmpl/item/Widget_tmpl.js","jqueryui","jquerytouchpunch"],function(t,e,i,n){return t.Marionette.ItemView.extend({events:{"click .inlet .unMap":"unMapInlet"},widgetEvents:{},className:"widget",template:_.template(n),initialize:function(t){_.extend(this.events,this.widgetEvents),this.signalChainFunctions=[],this.model=new i(t),this.model.on("change",this.processSignalChain,this),this.setWidgetBinders()},onRender:function(){var t=this;this.el.className.match(/ widget/)||(this.el.className+=" widget"),e.bind(this.$el,{widget:this.model,input:this.sourceModel,output:this.destinationModel}),this.sourceModel&&this.listenTo(this.sourceModel,"change",this.syncWithSourceModel),this.destinationModel&&this.listenTo(this.model,"change",this.syncWithDestinationModel),this.$el.draggable({handle:".dragHandle"}),this.$(".outlet").draggable({revert:!0}).data("model",this.model),this.$(".inlet").droppable({hoverClass:"hover",drop:function(e,i){t.onDrop($(i.draggable).data("model"),i,e)}})},setWidgetBinders:function(){var t=this;e.binders.positionx=function(t,e){t.style.left=parseInt(e,10)+"px"},e.binders.positiony=function(t,e){t.style.top=parseInt(e,10)+"px"},e.binders["style-*"]=function(t,e){t.style.setProperty(this.args[0],e/100)},e.binders["style-activecontrol"]=function(t,e){var i=this.model.get("activeControlParameter"),n=e;switch(i){case"top":case"left":case"bottom":case"right":n+="px";break;case"opacity":n/=100}t.style[i]=n},e.binders.selected={bind:function(e){var i=function(e){t.model.set(this.keypath.split(":")[1],$(e.currentTarget).find("option:selected").val())};$(e).on("change",_.bind(i,this))},unbind:function(t){$(t).off("change",this.callback)},routine:function(e,i){t.$("select").val(i)}}},onDrop:function(t,e,i){console.log(t,e,i),app.Patcher.Controller.mapToModel({view:this,model:t,IOMapping:"in"}),this.$(".inlet").addClass("connected")},unMapInlet:function(){this.stopListening(this.sourceModel),this.sourceModel=void 0,this.$(".inlet").removeClass("connected")},onSync:function(){},syncWithSourceModel:function(t){if(this.model.get("active"))for(var e in t.attributes)for(var i in this.model.attributes)this.model.attributes[i]===e&&"inputMapping"===i&&t.changedAttributes()[e]&&this.model.set("in",t.get(e));this.onSync()},syncWithDestinationModel:function(t){if(this.model.get("active"))for(var e in this.destinationModel.attributes)for(var i in t.attributes)this.model.attributes[i]===e&&"outputMapping"===i&&t.changedAttributes().out&&this.destinationModel.set(t.get("outputMapping"),this.model.attributes.out);this.onSync()},processSignalChain:function(){var t=this.model.get("in");_.each(this.signalChainFunctions,function(e){e=_.bind(e,this),t=e(t)},this),this.model.set("out",t)}})});