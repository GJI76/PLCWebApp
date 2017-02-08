define(["backbone","rivets","views/item/WidgetMulti","text!./template.js","utils/SignalChainFunctions","utils/SignalChainClasses","velocity","velocity-ui"],function(t,e,n,i){return n.extend({ins:[{title:"in1",to:"in0"},{title:"in2",to:"in1"},{title:"in3",to:"in2"},{title:"in4",to:"in3"}],outs:[{title:"out1",from:"output0",to:"out0"}],sources:[],typeID:"Sequence",className:"sequence",categories:["generator"],template:_.template(i),initialize:function(t){n.prototype.initialize.call(this,t),this.model.set({title:"Sequence",in0:0,in1:0,in2:0,in3:0,out0:0,out1:0,out2:0,out3:0,output0:0,output1:0,output2:0,output3:0,lastIns:[-1,-1,-1,-1],output:0,loop0:!0,loop1:!0,loop2:!0,loop3:!0,returnToStart0:!0,returnToStart1:!0,returnToStart2:!0,returnToStart3:!0,start0:0,start1:0,start2:0,start3:0,duration0:1e3,duration1:1e3,duration2:1e3,duration3:1e3,sendTo0:"output0",sendTo1:"output0",sendTo2:"output0",sendTo3:"output0",playSequence:!1,threshold:512,animationRunning:!1,lastInput:-1,sequence0:"0,500,200\n500,100,500\n100,500,500\n500,0,200",sequence1:"0,500,400\n500,100,1000\n100,500,1000\n500,0,400",sequence2:"0,500,600\n500,100,1500\n100,500,1500\n500,0,600",sequence3:"0,500,800\n500,100,2000\n100,500,2000\n500,0,800",currentSequence:0,sequencePosition:0,domReady:!1})},onRender:function(){n.prototype.onRender.call(this),this.$(".animateDiv").css("visibility","hidden"),this.$(".animateDiv").css("position","absolute"),this.model.set("animationRunning",!1),this.$(".animateDiv").velocity("stop",!0),this.model.set("domReady",!0)},onRemove:function(){this.$(".animateDiv").velocity("stop",!0)},onModelChange:function(t){if(this.model.get("domReady")===!0){if(void 0!==t.changedAttributes().in0||void 0!==t.changedAttributes().in1||void 0!==t.changedAttributes().in2||void 0!==t.changedAttributes().in3){var e=[];e[0]=parseFloat(this.model.get("in0")),e[1]=parseFloat(this.model.get("in1")),e[2]=parseFloat(this.model.get("in2")),e[3]=parseFloat(this.model.get("in3"));for(var n=parseInt(this.model.get("threshold")),i=0;4>i;i++){if(e[i]>=n&&this.model.get("lastIns")[i]<n)this.model.set("animationRunning",!1),this.model.set("currentSequence",i),this.runAnimation();else if(e[i]<n&&this.model.get("lastIns")[i]>=n&&i===this.model.get("currentSequence")){this.$(".animateDiv").velocity("stop",!0),this.model.set("animationRunning",!1);var o="returnToStart"+i.toString();this.model.get(o)&&this.returnAnimation()}this.model.get("lastIns")[i]=e[i]}}if(void 0!==t.changedAttributes().threshold){this.$(".animateDiv").velocity("stop",!0),this.model.set("animationRunning",!1);for(var i=0;4>i;i++)this.model.get("lastIns")[i]=-1}}},runAnimation:function(){if(app.server&&app.serverMode||!app.server&&!app.serverMode){var t=this,e=this.$(".animateDiv");if(e.velocity("stop",!0),!this.model.get("animationRunning")){var n=[],i=[],o=this.model.get("currentSequence").toString(),s="sequence"+o,a="loop"+o,u=this.model.get("sendTo"+o),r=this.model.get(s);r=r.replace(/(\r\n|\n|\r)/gm,"\n"),r.split("\n").forEach(function(t){var e=t.split(",");n.push(e)});var l=n.length;t.model.set("sequencePosition",0),n.forEach(function(n){var o={e:e,p:{tween:[n[1],n[0]]},o:{duration:n[2],progress:function(e,n,i,o,s){t.model.set(u,s)},complete:function(){var n=1+t.model.get("sequencePosition");n>=l?t.model.get(a)?(t.model.set("sequencePosition",0),e.velocity("stop",!0),t.model.get("domReady")===!0&&t.model.get("animationRunning")&&$.Velocity.RunSequence(i)):t.model.set("animationRunning",!1):t.model.set("sequencePosition",n)}}};i.push(o)}),this.model.set("animationRunning",!0),$.Velocity.RunSequence(i)}}},returnAnimation:function(){if(app.server&&app.serverMode||!app.server&&!app.serverMode){this.$(".animateDiv").velocity("stop",!0);var t=this.model.get("currentSequence").toString(),e=parseInt(this.model.get("duration"+t)),n=parseFloat(this.model.get("start"+t)),i=parseFloat(this.model.get("output0")),o=this,s=this.$(".animateDiv"),a="output0";s.velocity({tween:[n,i]},{duration:e,progress:function(t,e,n,i,s){o.model.set(a,s)},complete:function(){o.model.set("animationRunning",!1)}}),this.model.set("animationRunning",!0)}}})});