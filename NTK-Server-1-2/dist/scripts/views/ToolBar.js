define(["application","backbone","text!tmpl/ToolBar_tmpl.js","views/WidgetMap"],function(e,t,i,a){return t.View.extend({events:{"click .savePatch":"savePatch","click .downloadPatch":"downloadPatch","click .loadPatch":"showUploadFileDialog","click .clearPatch":"clearPatch","click .hideWidgets":"hideWidgets","click .fullScreen":"fullScreen","click .serverSwitch":"toggleServer","click .openAddWidgets":"toggleAddWidgetsPanel","click .openSettings":"toggleSettingsPanel"},subViews:[],template:_.template(i),className:"toolBar",widgetsVisible:!0,initialize:function(){window.app.vent.on("serverActive",this.indicateServerActive,this)},render:function(){this.el.innerHTML=this.template();var e=this.sortWidgetCategories();for(var t in e){var i=document.createElement("div"),a=document.createElement("ul"),r="category cat"+t.replace("/","-");$(i).addClass(r).text(t).click(function(){$(this).next("ul").toggle()});var n=e[t];n.sort();for(var s=0;s<=n.length-1;s++){var o=document.createElement("li"),l=n[s],c="addWidget widget"+t.replace("/","-");$(o).addClass(c).data("widgetType",l).text(l).on("click",function(e){return e.preventDefault(),e.stopPropagation(),window.app.serverMode?(window.app.trigger("RestrictiveOverlay:showMessage",e),!1):void window.app.vent.trigger("ToolBar:addWidget",$(this).data("widgetType"))}),$(a).append(o)}this.$(".addWidgets").append(i),$(i).after(a)}var d=this.$("#patchFileUpload")[0];d.addEventListener("change",this.loadPatch.bind(this)),this.indicateServerActive(window.app.serverActive)},sortWidgetCategories:function(){var e={};for(var t in a){var i=a[t].prototype;if(i.categories.length>0)for(var r=i.categories,n=r.length-1;n>=0;n--){var s=r[n].toUpperCase();void 0==e[s]&&(e[s]=[]),e[s].push(t)}}return e},showUploadFileDialog:function(e){window.app.serverMode?window.app.trigger("RestrictiveOverlay:showMessage",e):this.$("#patchFileUpload").click()},loadPatch:function(e){if(window.app.serverMode)return window.app.trigger("RestrictiveOverlay:showMessage",e),!1;var t=document.getElementById("patchFileUpload"),i=new FormData;t.files.length>0&&i.append("patch",t.files[0]),$.ajax({url:"/loadPatch",type:"POST",data:i,processData:!1,contentType:!1,success:function(){console.log("patch uploaded")}}),$(".inputForm").empty(),$(".inputForm").append('<input type="file" name="images" id="patchFileUpload" style="display:none" />');var t=this.$("#patchFileUpload")[0];t.addEventListener("change",this.loadPatch.bind(this))},savePatch:function(){window.app.vent.trigger("ToolBar:savePatch")},clearPatch:function(e){window.app.serverMode?window.app.trigger("RestrictiveOverlay:showMessage",e):window.app.vent.trigger("ToolBar:clearPatch")},downloadPatch:function(){window.app.vent.trigger("ToolBar:savePatch"),window.location.href="/patch.ntk"},hideWidgets:function(){this.widgetsVisible=!this.widgetsVisible,this.widgetsVisible?($(".widgetAuthoring").show("fast"),$("svg").show("fast"),$(".patchCableParent").show("fast")):($(".widgetAuthoring").hide("fast"),$("svg").hide("fast"),$(".patchCableParent").hide("fast"))},fullScreen:function(){var e=document.getElementById("patcherRegion");e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()},toggleServer:function(){window.app.vent.trigger("ToolBar:toggleServer")},indicateServerActive:function(e){var t=this.$(".serverSwitch");e?(t.addClass("serverActive"),t.text("Edit OFF"),window.app.trigger("RestrictiveOverlay:show")):(t.removeClass("serverActive"),t.text("Edit ON"),window.app.trigger("RestrictiveOverlay:hide"))},toggleAddWidgetsPanel:function(){this.$(".menuBar, .addWidgets").toggleClass("open")},toggleSettingsPanel:function(){this.$(".settings").toggleClass("open")}})});