define(["backbone"],function(i){var t=i.Model.extend({initialize:function(){},defaults:{wid:void 0,active:!0,activeOut:!0,smoothing:!1,easing:!1,inlets:[{name:"in",mapping:"out"}],outlets:[{name:"out"}],inputMapping:"out",outputMapping:null,"in":0,out:0,inputFloor:0,outputFloor:0,inputCeiling:1023,outputCeiling:1023,invert:!1}});return t});