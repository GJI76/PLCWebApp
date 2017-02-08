Marionette.RegionManager=function(e){var t=e.Controller.extend({constructor:function(t){this._regions={},e.Controller.call(this,t)},addRegions:function(e,t){var i={};return _.each(e,function(e,n){_.isString(e)&&(e={selector:e}),e.selector&&(e=_.defaults({},e,t));var o=this.addRegion(n,e);i[n]=o},this),i},addRegion:function(t,i){var n,o=_.isObject(i),r=_.isString(i),s=!!i.selector;return n=r||o&&s?e.Region.buildRegion(i,e.Region):_.isFunction(i)?e.Region.buildRegion(i,e.Region):i,this.triggerMethod("before:add:region",t,n),this._store(t,n),this.triggerMethod("add:region",t,n),n},get:function(e){return this._regions[e]},getRegions:function(){return _.clone(this._regions)},removeRegion:function(e){var t=this._regions[e];this._remove(e,t)},removeRegions:function(){_.each(this._regions,function(e,t){this._remove(t,e)},this)},emptyRegions:function(){_.each(this._regions,function(e){e.empty()},this)},destroy:function(){this.removeRegions(),e.Controller.prototype.destroy.apply(this,arguments)},_store:function(e,t){this._regions[e]=t,this._setLength()},_remove:function(e,t){this.triggerMethod("before:remove:region",e,t),t.empty(),t.stopListening(),delete this._regions[e],this._setLength(),this.triggerMethod("remove:region",e,t)},_setLength:function(){this.length=_.size(this._regions)}});return e.actAsCollection(t.prototype,"_regions"),t}(Marionette);