function testSubproject(e,t,r){function n(e){return function(){if(!o){if(!a.length)return void ok(!1,"Found subproject fixture");for(var t=originaljQuery("#qunit-fixture");t.length&&!t.prevAll("[id='qunit']").length;)t=t.parent();if(t.nextAll().remove(),t.replaceWith(a),QUnit.config.fixture=u,QUnit.reset(),originaljQuery("#qunit-fixture").html()!==u)return void ok(!1,"Copied subproject fixture");o=!0}e.apply(this,arguments)}}var i,a,u,o=!1;QUnit.config.reorder=!1,module(e),module=QUnit.module=function(t){var r=arguments;return i=t,r[0]=e,qunitModule.apply(this,r)},test=function(e){var t=arguments,r=t.length-1;for(t[0]=i+": "+e;r>=0;r--)if(originaljQuery.isFunction(t[r])){t[r]=n(t[r]);break}return qunitTest.apply(this,t)},originaljQuery.ajax(t,{async:!1,dataType:"html",error:function(e,r){throw new Error("Could not load: "+t+" ("+r+")")},success:function(e,n,i){var o=originaljQuery.parseHTML((e||"").replace(/<\/?((!DOCTYPE|html|head)\b.*?)>/gi,"[$1]"),document,!0);for(o&&o.length||this.error(i,"no data"),o=originaljQuery(o),o.filter("script[src]").add(o.find("script[src]")).each(function(){var e=originaljQuery(this).attr("src"),n="<script src='"+t+e+"'></script>";r.test(e)&&(originaljQuery.isReady?originaljQuery("head").first().append(n):document.write(n))}),a=o.find("[id='qunit-fixture']"),u=a.html(),a.empty();a.length&&!a.prevAll("[id='qunit']").length;)a=a.parent();a=a.add(a.nextAll())}})}jQuery.noConflict(),jQuery.each([jQuery.expando,"getInterface","Packages","java","netscape"],function(e,t){window[t]=window[t]});var Sizzle=Sizzle||jQuery.find,qunitModule=QUnit.module,qunitTest=QUnit.test,Globals=function(){var e={};return{register:function(t){e[t]=!0,jQuery.globalEval("var "+t+" = undefined;")},cleanup:function(){var t,r=e;e={};for(t in r)jQuery.globalEval("try { delete "+(jQuery.support.deleteExpando?"window['"+t+"']":t)+"; } catch( x ) {}")}}}();!function(){var e=window.start;window.start=function(){e()}}(),function(){function e(e){var t,r;if(Object.keys)t=Object.keys(e);else{t=[];for(r in e)t.push(r)}return t.sort(),t}var t=0,r=0,n=0,i=0,a={},u=QUnit.reset,o=jQuery.ajaxSettings;QUnit.expectJqData=function(e,t){var r,n,i;for(QUnit.current_testEnvironment.checkJqData=!0,e.jquery&&e.toArray&&(e=e.toArray()),jQuery.isArray(e)||(e=[e]),r=0;r<e.length;r++)n=e[r],n.nodeType&&(i=n[jQuery.expando],void 0===i?notStrictEqual(i,void 0,"Target for expectJqData must have an expando, for else there can be no data to expect."):a[i]?a[i].push(t):a[i]=[t])},QUnit.config.urlConfig.push({id:"jqdata",label:"Always check jQuery.data",tooltip:"Trigger QUnit.expectJqData detection for all tests instead of just the ones that call it"}),this.moduleTeardown=function(){var u,o,c,s=0,l=0;if(QUnit.urlParams.jqdata||this.checkJqData){for(u in jQuery.cache)o=a[u],c=jQuery.cache[u]?e(jQuery.cache[u]):jQuery.cache[u],QUnit.equiv(o,c)||deepEqual(c,o,"Expected keys exist in jQuery.cache"),delete jQuery.cache[u],delete a[u];for(u in a)deepEqual(a[u],void 0,"No unexpected keys were left in jQuery.cache (#"+u+")"),delete a[u]}a={},QUnit.reset();for(u in jQuery.cache)++l;jQuery.fragments={};for(u in jQuery.fragments)++s;l!==t&&(equal(l,t,"No unit tests leak memory in jQuery.cache"),t=l),s!==r&&(equal(s,r,"No unit tests leak memory in jQuery.fragments"),r=s),jQuery.timers&&jQuery.timers.length!==n&&(equal(jQuery.timers.length,n,"No timers are still running"),n=jQuery.timers.length),void 0!==jQuery.active&&jQuery.active!==i&&(equal(jQuery.active,0,"No AJAX requests are still active"),ajaxTest.abort&&ajaxTest.abort("active requests"),i=jQuery.active)},QUnit.done(function(){jQuery("#qunit ~ *").remove()}),QUnit.reset=function(){jQuery("#qunit-fixture").empty(),jQuery.event.global={},o?jQuery.ajaxSettings=jQuery.extend(!0,{},o):delete jQuery.ajaxSettings,Globals.cleanup(),u.apply(this,arguments)}}(),QUnit.config.testTimeout=2e4,QUnit.config.requireExpects=!0,function(){var e=window.location.search;e=decodeURIComponent(e.slice(e.indexOf("swarmURL=")+"swarmURL=".length)),e&&0===e.indexOf("http")&&document.write("<script src='http://swarm.jquery.org/js/inject.js?"+(new Date).getTime()+"'></script>")}();