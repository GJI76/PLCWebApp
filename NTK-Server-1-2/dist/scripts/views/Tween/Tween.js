define(["backbone","rivets","views/item/WidgetMulti","text!./template.js","utils/SignalChainFunctions","utils/SignalChainClasses","velocity","velocity-ui"],function(t,e,i,n){return i.extend({ins:[{title:"in",to:"in"},{title:"Duration",to:"duration"},{title:"Start",to:"start"},{title:"End",to:"end"}],outs:[{title:"out1",from:"output",to:"out1"}],sources:[],typeID:"Tween",className:"tween",categories:["generator"],template:_.template(n),initialize:function(t){i.prototype.initialize.call(this,t),this.model.set({title:"Tween","in":"--",output:0,duration:2e3,start:0,end:1023,returnToStart:!0,loop:!1,playSequence:!1,threshold:512,animationRunning:!1,lastInput:-1,userSequence:"0,500,500\n500,100,1000\n100,1000,500\n1000,0,500",sequencePosition:0}),this.stateHighlight="#f8c885"},onRender:function(){i.prototype.onRender.call(this),this.$(".animateDiv").css("visibility","hidden"),this.$(".animateDiv").css("position","absolute"),this.model.set("animationRunning",!1),this.model.get("loop")&&"--"==this.model.get("in")&&this.runAnimation()},onModelChange:function(t){if(void 0!==t.changedAttributes().in){var e=parseFloat(this.model.get("in")),i=this.model.get("lastInput"),n=parseFloat(this.model.get("threshold"));e>=n&&n>i?(this.$(".animateDiv").velocity("stop"),this.model.set("animationRunning",!1),this.runAnimation()):n>e&&i>=n&&(this.$(".animateDiv").velocity("stop"),this.model.set("animationRunning",!1),this.model.get("returnToStart")&&this.returnAnimation()),this.model.set("lastInput",e)}void 0!==t.changedAttributes().loop&&(this.model.get("loop")&&"--"==this.model.get("in")?this.runAnimation():this.model.get("loop")||(this.$(".animateDiv").velocity("stop"),this.model.set("animationRunning",!1)))},runAnimation:function(){if(app.server&&app.serverMode||!app.server&&!app.serverMode){var t=parseFloat(this.model.get("duration")),e=parseFloat(this.model.get("start")),i=parseFloat(this.model.get("end"));isNaN(t)&&(t=2e3,this.model.set("duration",t)),isNaN(e)&&(e=0,this.model.set("start",e)),isNaN(i)&&(i=1023,this.model.set("end",i));var n=this,o=this.$(".animateDiv");this.model.get("animationRunning")||(o.velocity({tween:[i,e]},{duration:t,progress:function(t,e,i,o,s){n.model.set("output",s)},loop:this.model.get("loop"),complete:function(){n.model.set("animationRunning",!1)}}),this.model.set("animationRunning",!0))}},returnAnimation:function(){if(app.server&&app.serverMode||!app.server&&!app.serverMode){var t=parseFloat(this.model.get("duration")),e=parseFloat(this.model.get("start")),i=this.model.get("output"),n=this,o=this.$(".animateDiv");o.velocity({tween:[e,i]},{duration:t,progress:function(t,e,i,o,s){n.model.set("output",s)},complete:function(){n.model.set("animationRunning",!1)}}),this.model.set("animationRunning",!0)}}})});