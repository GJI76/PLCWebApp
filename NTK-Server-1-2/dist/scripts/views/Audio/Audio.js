define(["backbone","rivets","views/item/WidgetMulti","text!./template.js"],function(e,t,o,i){return o.extend({typeID:"Audio",categories:["media"],className:"audio",template:_.template(i),sources:[],widgetEvents:{"change .loop":"loopChange","change .continuous":"continuousChange"},initialize:function(e){o.prototype.initialize.call(this,e),this.model.set({src:"assets/audio/slowDrums.mp3",ins:[{title:"Play",to:"play"},{title:"Volume",to:"volume"},{title:"Speed",to:"speed"}],title:"Audio",play:0,playText:"Pause",toggle:0,volume:100,speed:100,loop:!1,continuous:!1,threshold:512}),this.playing=!1,this.domReady=!1},onRender:function(){o.prototype.onRender.call(this);app.server||(this.$("#audio")[0].loop=this.model.get("loop"),this.model.get("continuous")&&(this.playing=!0,this.$("#audio")[0].play(),this.model.set("playText","Play")),this.domReady=!0)},onModelChange:function(e){if(this.domReady&&!app.server&&(void 0!==e.changedAttributes().play||void 0!==e.changedAttributes().volume||void 0!==e.changedAttributes().speed)){var t=parseInt(this.model.get("play"),10),o=Math.min(parseFloat(this.model.get("volume"))/100,1);o=Math.max(o,0);var i=parseFloat(this.model.get("speed"))/100,s=this.$("#audio")[0];if(void 0!==e.changedAttributes().volume&&(console.log("changing volume"),s.volume=o),void 0!==e.changedAttributes().speed&&(s.playbackRate=i),void 0!==e.changedAttributes().play&&!this.model.get("continuous")){var a=parseInt(this.model.get("threshold"));t>=a&&!this.playing?(this.playing=!0,s.play(),this.model.set("playText","Play")):a>t&&this.playing&&(this.playing=!1,s.pause(),this.model.get("loop")?this.model.set("playText","Pause"):(s.currentTime=0,this.model.set("playText","Stop")))}}},loopChange:function(){app.server||(this.$("#audio")[0].loop=this.model.get("loop"))},continuousChange:function(){!app.server&&this.model.get("continuous")&&(this.playing=!0,this.$("#audio")[0].play(),this.model.set("playText","Play"))}})});