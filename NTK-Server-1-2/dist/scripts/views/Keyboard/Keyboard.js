define(["backbone","rivets","views/item/WidgetMulti","text!./template.js","utils/SignalChainFunctions","utils/SignalChainClasses"],function(t,e,o,i){return o.extend({ins:[],outs:[{title:"out",from:"output",to:"out"}],widgetEvents:{},typeID:"Keyboard",className:"keyboard",categories:["UI"],template:_.template(i),initialize:function(t){o.prototype.initialize.call(this,t),this.model.set({"in":0,output:0,title:"Keyboard",keyDetect:!1,keyDetectNum:32,outputFloor:0,outputCeiling:1023}),this.model.set("in",this.model.get("outputFloor"))},onRender:function(){o.prototype.onRender.call(this);var t=this;$(document).keydown(function(e){t.model.set("in",e.which),t.model.get("keyDetect")?e.which===parseInt(t.model.get("keyDetectNum"))?t.model.set("output",t.model.get("outputCeiling")):t.model.set("output",t.model.get("outputFloor")):t.model.set("output",e.which)}),$(document).keyup(function(e){t.model.get("keyDetect")&&e.which===parseInt(t.model.get("keyDetectNum"))&&t.model.set("output",t.model.get("outputFloor"))})}})});