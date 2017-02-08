Marionette.LayoutView=Marionette.ItemView.extend({regionClass:Marionette.Region,constructor:function(e){e=e||{},this._firstRender=!0,this._initializeRegions(e),Marionette.ItemView.call(this,e)},render:function(){return this._ensureViewIsIntact(),this._firstRender?this._firstRender=!1:this._reInitializeRegions(),Marionette.ItemView.prototype.render.apply(this,arguments)},destroy:function(){this.isDestroyed||(this.regionManager.destroy(),Marionette.ItemView.prototype.destroy.apply(this,arguments))},addRegion:function(e,i){this.triggerMethod("before:region:add",e);var n={};return n[e]=i,this._buildRegions(n)[e]},addRegions:function(e){return this.regions=_.extend({},this.regions,e),this._buildRegions(e)},removeRegion:function(e){return this.triggerMethod("before:region:remove",e),delete this.regions[e],this.regionManager.removeRegion(e)},getRegion:function(e){return this.regionManager.get(e)},getRegions:function(){return this.regionManager.getRegions()},_buildRegions:function(e){var i=this,n={regionClass:this.getOption("regionClass"),parentEl:function(){return i.$el}};return this.regionManager.addRegions(e,n)},_initializeRegions:function(e){var i;this._initRegionManager(),i=_.isFunction(this.regions)?this.regions(e):this.regions||{};var n=this.getOption.call(e,"regions");_.isFunction(n)&&(n=n.call(this,e)),_.extend(i,n),this.addRegions(i)},_reInitializeRegions:function(){this.regionManager.emptyRegions(),this.regionManager.each(function(e){e.reset()})},getRegionManager:function(){return new Marionette.RegionManager},_initRegionManager:function(){this.regionManager=this.getRegionManager(),this.listenTo(this.regionManager,"before:add:region",function(e){this.triggerMethod("before:add:region",e)}),this.listenTo(this.regionManager,"add:region",function(e,i){this[e]=i,this.triggerMethod("add:region",e,i)}),this.listenTo(this.regionManager,"before:remove:region",function(e){this.triggerMethod("before:remove:region",e)}),this.listenTo(this.regionManager,"remove:region",function(e,i){delete this[e],this.triggerMethod("remove:region",e,i)})}});