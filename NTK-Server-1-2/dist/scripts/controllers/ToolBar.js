define(["application","backbone","views/ToolBar"],function(i,n,e){var t=function(i){this.parentRegion=i,this.views.main=new e};return t.prototype={views:{},attachMainViews:function(){this.parentRegion.show(this.views.main)}},t});