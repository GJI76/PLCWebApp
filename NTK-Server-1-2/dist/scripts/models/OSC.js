define(["backbone","models/Hardware"],function(t,i){var n=i.extend({initialize:function(){window.app.vent.on("Widget:hardwareSwitch",function(t){t.deviceType==this.get("type")&&(t.hasInput===!1?void 0==this.get("outputs")[t.port]&&(this.get("outputs")[t.port]=0):t.hasInput===!0&&void 0==this.get("inputs")[t.port]&&(this.get("inputs")[t.port]=0,this.set(t.port,0)))}.bind(this))},defaults:{type:"OSC",inputs:{"/ntk/in/1":0},outputs:{"/ntk/out/1:127.0.0.1:57120":0},"/ntk/in/1":0,"/ntk/out/1:127.0.0.1:57120":0}});return n});