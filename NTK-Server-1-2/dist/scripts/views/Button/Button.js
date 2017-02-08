define(["backbone","rivets","views/item/WidgetMulti","text!./template.js","utils/SignalChainFunctions","utils/SignalChainClasses"],function(t,e,o,n){return o.extend({ins:[],outs:[{title:"out",from:"in",to:"out"}],widgetEvents:{"mouseup .dragKnob":"imgMoved","change .buttonLabel":"setStyle","change .buttonFontSize":"setStyle","change .buttonWidth":"setStyle","change .buttonHeight":"setStyle"},typeID:"Button",categories:["UI"],className:"button",template:_.template(n),initialize:function(t){o.prototype.initialize.call(this,t),this.model.set({title:"Button",activeControlParameter:"left",controlParameters:[{name:"X",parameter:"left"},{name:"Y",parameter:"top"},{name:"opacity",parameter:"opacity"}],left:100,top:200,opacity:100,buttonLabel:"Button Label",buttonFontSize:"30px",buttonWidth:200,buttonHeight:200}),this.stateHighlight="#f8c885",this.model.set("in",this.model.get("outputFloor"))},onRender:function(){o.prototype.onRender.call(this);var t=this;app.server||(this.$(".theButton").button({label:"Button"}),t.$(".buttonOn").css("background-color","#fff"),t.$(".buttonOff").css("background-color",t.stateHighlight),this.$(".theButton").mousedown(function(){t.model.set("in",parseInt(t.model.get("outputCeiling"),10)),app.server||(t.$(".buttonOn").css("background-color",t.stateHighlight),t.$(".buttonOff").css("background-color","#fff"))}),this.$(".theButton").mouseup(function(){t.model.set("in",parseInt(t.model.get("outputFloor"),10)),app.server||(t.$(".buttonOn").css("background-color","#fff"),t.$(".buttonOff").css("background-color",t.stateHighlight))}),this.$(".theButton").on("touchstart",function(){t.model.set("in",parseInt(t.model.get("outputCeiling"),10)),app.server||(t.$(".buttonOn").css("background-color",t.stateHighlight),t.$(".buttonOff").css("background-color","#fff"))}),this.$(".theButton").on("touchend",function(){t.model.set("in",parseInt(t.model.get("outputFloor"),10)),app.server||(t.$(".buttonOn").css("background-color","#fff"),t.$(".buttonOff").css("background-color",t.stateHighlight))}),this.$(".theButton").on("touchcancel",function(){t.model.set("in",parseInt(t.model.get("outputFloor"),10)),app.server||(t.$(".buttonOn").css("background-color","#fff"),t.$(".buttonOff").css("background-color",t.stateHighlight))}),this.$(".detachedEl").css("position","fixed"),this.$(".detachedEl").draggable({cursor:"move",handle:".dragKnob"}),this.$(".dragKnob").css("cursor","move"),this.setStyle())},imgMoved:function(){var t=this.$(".detachedEl").offset();this.model.set("left",t.left),this.model.set("top",t.top)},setStyle:function(){if(!app.server){var t=this.$(".theButton");t.button({label:this.model.get("buttonLabel")}),this.$(".theButton.ui-widget").css("width",this.model.get("buttonWidth")),this.$(".theButton.ui-widget").css("height",this.model.get("buttonHeight")),t.css("font-size",this.model.get("buttonFontSize"))}}})});