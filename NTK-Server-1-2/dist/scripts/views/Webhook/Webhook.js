define(["backbone","rivets","views/item/WidgetMulti","text!./template.js","utils/SignalChainFunctions","utils/SignalChainClasses"],function(e,t,i,o){return i.extend({typeID:"Webhook",categories:["network"],className:"webhook",template:_.template(o),sources:[],widgetEvents:{},initialize:function(e){i.prototype.initialize.call(this,e),this.model.set({title:"Webhook",ins:[{title:"trigger",to:"trigger"},{title:"in1",to:"in1"},{title:"in2",to:"in2"},{title:"in3",to:"in3"}],outs:[{title:"out",from:"trigger",to:"out"}],trigger:0,in1:0,in2:0,in3:0,minPeriod:1e3,urlTemplate:"",urlComputed:"",sendToCloud:!1,displayText:"Waiting",threshold:512,lastInput:"",lastSent:0,widgetReady:!1}),this.signalChainFunctions.push(this.watchData)},onRender:function(){i.prototype.onRender.call(this);this.model.set("widgetReady",!0)},onModelChange:function(e){this.model.get("widgetReady")&&(void 0!==e.changedAttributes().in1||void 0!==e.changedAttributes().in2||void 0!==e.changedAttributes().in3)&&this.computeUrl()},watchData:function(e){return parseFloat(this.model.get("lastInput"),10)<parseFloat(this.model.get("threshold"),10)&&parseFloat(e,10)>=parseFloat(this.model.get("threshold"),10)?this.sendUrl():parseFloat(this.model.get("lastInput"),10)>=parseFloat(this.model.get("threshold"),10)&&parseFloat(e,10)<parseFloat(this.model.get("threshold"),10)&&this.model.set("displayText","Waiting"),this.model.set("lastInput",e),e},computeUrl:function(){var e=this.model.get("urlTemplate");e=e.replace(/<1>/g,encodeURIComponent(this.model.get("in1"))),e=e.replace(/<2>/g,encodeURIComponent(this.model.get("in2"))),e=e.replace(/<3>/g,encodeURIComponent(this.model.get("in3"))),this.model.set("urlComputed",e)},sendUrl:function(){var e=Date.now()-this.model.get("lastSent");if(!this.model.get("sendToCloud"))return void this.model.set("displayText","Reconnect");if(0!=this.model.get("urlTemplate").indexOf("http"))return void this.model.set("displayText","No URL");if(!(e<this.model.get("minPeriod"))){var t=this;"Sending"!=this.model.get("displayText")&&(t.model.set("displayText","Sending"),setTimeout(function(){t.model.set("lastSent",Date.now()),t.computeUrl();var e=t.model.get("urlComputed");(app.server&&app.serverMode||!app.server&&!app.serverMode)&&(console.log("sending: "+e),$.getJSON(e).done(function(e){t.model.set("displayText","Sent"),console.log("JSON Data: "+JSON.stringify(e))}).fail(function(e,i,o){var n=i+", "+o;console.log("Connection to webhook failed: "+n),t.model.set("sendToCloud",!1),t.model.set("displayText","Can't connect")}))},10))}}})});