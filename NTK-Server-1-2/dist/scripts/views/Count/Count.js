define(["backbone","rivets","views/item/WidgetMulti","text!./template.js","utils/SignalChainFunctions","utils/SignalChainClasses"],function(t,e,i,n){return i.extend({ins:[{title:"in1",to:"in1"},{title:"in2",to:"in2"},{title:"in3",to:"in3"},{title:"in4",to:"in4"}],outs:[{title:"out1",from:"output",to:"out1"}],sources:[],typeID:"Count",className:"count",categories:["logic"],template:_.template(n),initialize:function(t){i.prototype.initialize.call(this,t),this.model.set({title:"Count",in1:"-",in2:"-",in3:"-",in4:"-",output:0,outputFloor:0,outputCeiling:10,threshold:512,increment:1,lastIns:[-1,-1,-1,-1]})},onRender:function(){i.prototype.onRender.call(this)},onModelChange:function(t){if(void 0!==t.changedAttributes().in1&&t.changedAttributes().in1!=this.model.get("lastIns")[0]||void 0!==t.changedAttributes().in2&&t.changedAttributes().in1!=this.model.get("lastIns")[1]||void 0!==t.changedAttributes().in3&&t.changedAttributes().in1!=this.model.get("lastIns")[2]||void 0!==t.changedAttributes().in4&&t.changedAttributes().in1!=this.model.get("lastIns")[3]){var e=[parseFloat(this.model.get("in1")),parseFloat(this.model.get("in2")),parseFloat(this.model.get("in3")),parseFloat(this.model.get("in4"))],i=parseFloat(this.model.get("output")),n=0,s=this.model.get("threshold");void 0!==t.changedAttributes().in1&&(this.model.get("lastIns")[0]<s&&e[0]>=s&&n++,this.model.get("lastIns")[0]=e[0]),void 0!==t.changedAttributes().in2&&(this.model.get("lastIns")[1]<s&&e[1]>=s&&n++,this.model.get("lastIns")[1]=e[1]),void 0!==t.changedAttributes().in3&&(this.model.get("lastIns")[2]<s&&e[2]>=s&&n++,this.model.get("lastIns")[2]=e[2]),void 0!==t.changedAttributes().in4&&(this.model.get("lastIns")[3]<s&&e[3]>=s&&n++,this.model.get("lastIns")[3]=e[3]),n*=this.model.get("increment"),i+=n,i>this.model.get("outputCeiling")?i=this.model.get("outputFloor"):i<this.model.get("outputFloor")&&(i=this.model.get("outputCeiling")),this.model.set("output",i)}}})});