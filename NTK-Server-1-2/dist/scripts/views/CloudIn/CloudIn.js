define(["backbone","rivets","views/item/WidgetMulti","text!./template.js","utils/SignalChainFunctions","utils/SignalChainClasses","jqueryknob"],function(e,t,i,s,a){return i.extend({ins:[{title:"in",to:"in"}],outs:[{title:"out",from:"in",to:"out"}],widgetEvents:{"change .getFromCloud":"getFromCloud","change .cloudService":"changeCloudService"},typeID:"CloudIn",categories:["network"],className:"cloudIn",template:_.template(s),initialize:function(e){i.prototype.initialize.call(this,e),this.model.set({title:"CloudIn",getPeriod:1e4,cloudService:"sparkfun",phantPublicKey:"",phantDataField:"mydata",phantUrl:"https://data.sparkfun.com",particlePin:"A0",particleDeviceId:"",particleAccessToken:"",getFromCloud:!1,displayTimerStart:!1,displayText:"Stopped"}),this.startTime=0,this.lastSendToCloud=!1,this.lastTimeDiff=0,this.startCountdown=!0,this.redPulseCount=0,this.signalChainFunctions.push(a.scale),this.localTimeKeeperFunc=function(e){this.timeKeeper(e)}.bind(this),window.app.timingController.registerFrameCallback(this.localTimeKeeperFunc,this)},onRender:function(){i.prototype.onRender.call(this);var e=this;this.$(".dial").knob({fgColor:"#000000",bgColor:"#ffffff",inputColor:"#000000",angleOffset:-125,angleArc:250,width:80,height:62,font:"'Helvetica Neue', sans-serif",displayInput:!1,min:0,max:1023,change:function(t){e.model.set("in",parseInt(t))}}),t.binders.knob=function(e,t){e.value=t,$(e).val(t),$(e).trigger("change")},this.init=!1},onRemove:function(){window.app.timingController.removeFrameCallback(this.localTimeKeeperFunc,this)},getFromCloud:function(){app.server||this.model.get("sendToCloud")||this.setDisplayText("Stopped")},changeCloudService:function(){if(!app.server){var e=this.model.get("cloudService");switch(e){case"sparkfun":this.$(".sparkfun").show(),this.$(".particle").hide();break;case"particle":this.$(".sparkfun").hide(),this.$(".particle").show()}}},setDisplayText:function(e){app.server||this.$(".timeLeft").text(e)},onModelChange:function(e){app.server||e.changedAttributes().in&&this.$(".dial").val(this.model.get("in")).trigger("change")},timeKeeper:function(){if(0==this.init&&(this.changeCloudService(),this.init=!0),this.model.get("getFromCloud")){var e=this,t=this.model.get("getPeriod");0==this.lastSendToCloud&&(this.startTime=Date.now()-(t+1),this.lastSendToCloud=!0);var i=Date.now()-this.startTime;if(i>t){if(this.startTime=Date.now(),app.server||this.$(".outvalue").css("color","#ff0000"),this.setDisplayText(" Get in: "+(t/1e3).toFixed(1)+"s"),this.lastTimeDiff=0,app.server&&app.serverMode||!app.server&&!app.serverMode)switch(this.model.get("cloudService")){case"sparkfun":var s=this.model.get("phantPublicKey"),a=this.model.get("phantDataField"),o=this.model.get("phantUrl"),n=o+"/output/"+s+".json";$.ajax({url:n,jsonp:"callback",cache:!1,dataType:"jsonp",data:{page:1},success:function(t){0==t.success?(console.log("Connection to cloud service failed: "+t.message),e.model.set("getFromCloud",!1),e.setDisplayText("stream not found"==t.message?"Invalid key":"Can't connect")):void 0===t[0][a]?(e.model.set("getFromCloud",!1),e.setDisplayText("Bad datafield")):e.model.set("in",t[0][a])},fail:function(t,i,s){var a=i+", "+s;console.log("Connection to cloud servive failed: "+a),e.model.set("getFromCloud",!1),this.setDisplayText("Can't connect")}});break;case"particle":var n="https://api.particle.io/v1/devices/"+this.model.get("particleDeviceId")+"/analogread";$.ajax({url:n,type:"POST",timeout:2e3,data:{access_token:this.model.get("particleAccessToken"),params:this.model.get("particlePin")}}).done(function(t){var i=parseInt(t.return_value,10);isNaN(i)?(e.model.set("getFromCloud",!1),this.setDisplayText("Bad data")):e.model.set("in",i/4)})}this.inputCount=0,this.inputCumulative=0}else i-this.lastTimeDiff>=100&&(this.setDisplayText(" Get in: "+((t-i)/1e3).toFixed(1)+"s"),!app.server&&i>=300&&this.$(".outvalue").css("color","#000000"),this.lastTimeDiff=i)}else this.lastSendToCloud=!1}})});