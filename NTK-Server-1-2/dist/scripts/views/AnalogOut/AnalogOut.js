define(["backbone","rivets","views/item/WidgetMulti","text!./template.js","jqueryknob"],function(t,e,i,n){return i.extend({typeID:"AnalogOut",deviceMode:"PWM",categories:["I/O"],className:"analogOut",template:_.template(n),ins:[{title:"input",to:"in"}],outs:[{title:"output",from:"in",to:"out"}],sources:[],initialize:function(t){i.prototype.initialize.call(this,t),this.model.set({title:"AnalogOut",outputMapping:t.outputMapping,activeOut:!0}),this.signalChainFunctions.push(this.limitRange),this.model.on("change",this.processSignalChain,this)},onModelChange:function(){for(var t=this.sources.length-1;t>=0;t--)this.syncWithSource(this.sources[t].model)},onRender:function(){i.prototype.onRender.call(this),this.$(".dial").knob({fgColor:"#000000",bgColor:"#ffffff",inputColor:"#000000",angleOffset:-125,angleArc:250,width:80,height:62,font:"'Helvetica Neue', sans-serif",displayInput:!1,min:0,max:255,change:function(t){this.model.set("in",parseInt(t))}.bind(this)}),e.binders.knob=function(t,e){t.value=e,$(t).val(e),$(t).trigger("change")}},limitRange:function(t){var e=t;return e=Math.max(e,0),e=Math.min(e,255),Number(e)}})});