module("ajax",{setup:function(){var e=this.jsonpCallback=jQuery.ajaxSettings.jsonpCallback;jQuery.ajaxSettings.jsonpCallback=function(){var t=e.apply(this,arguments);return Globals.register(t),t}},teardown:function(){jQuery(document).off("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxError ajaxSuccess"),moduleTeardown.apply(this,arguments)}}),function(){function e(e){return function(){e=e||"",jQuery(document).on("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxError ajaxSuccess",function(t){ok(-1!==e.indexOf(t.type),t.type)})}}if(jQuery.ajax&&(!isLocal||hasPHP)){ajaxTest("jQuery.ajax() - success callbacks",8,{setup:e("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxSuccess"),url:url("data/name.html"),beforeSend:function(){ok(!0,"beforeSend")},success:function(){ok(!0,"success")},complete:function(){ok(!0,"complete")}}),ajaxTest("jQuery.ajax() - success callbacks - (url, options) syntax",8,{setup:e("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxSuccess"),create:function(e){return jQuery.ajax(url("data/name.html"),e)},beforeSend:function(){ok(!0,"beforeSend")},success:function(){ok(!0,"success")},complete:function(){ok(!0,"complete")}}),ajaxTest("jQuery.ajax() - success callbacks (late binding)",8,{setup:e("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxSuccess"),url:url("data/name.html"),beforeSend:function(){ok(!0,"beforeSend")},success:!0,afterSend:function(e){e.complete(function(){ok(!0,"complete")}).success(function(){ok(!0,"success")}).error(function(){ok(!1,"error")})}}),ajaxTest("jQuery.ajax() - success callbacks (oncomplete binding)",8,{setup:e("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxSuccess"),url:url("data/name.html"),beforeSend:function(){ok(!0,"beforeSend")},success:!0,complete:function(e){e.complete(function(){ok(!0,"complete")}).success(function(){ok(!0,"success")}).error(function(){ok(!1,"error")})}}),ajaxTest("jQuery.ajax() - error callbacks",8,{setup:e("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxError"),url:url("data/name.php?wait=5"),beforeSend:function(){ok(!0,"beforeSend")},afterSend:function(e){e.abort()},error:function(){ok(!0,"error")},complete:function(){ok(!0,"complete")}}),ajaxTest("jQuery.ajax() - textStatus and errorThrown values",4,[{url:url("data/name.php?wait=5"),error:function(e,t,a){strictEqual(t,"abort","textStatus is 'abort' for abort"),strictEqual(a,"abort","errorThrown is 'abort' for abort")},afterSend:function(e){e.abort()}},{url:url("data/name.php?wait=5"),error:function(e,t,a){strictEqual(t,"mystatus","textStatus is 'mystatus' for abort('mystatus')"),strictEqual(a,"mystatus","errorThrown is 'mystatus' for abort('mystatus')")},afterSend:function(e){e.abort("mystatus")}}]),ajaxTest("jQuery.ajax() - responseText on error",1,{url:url("data/errorWithText.php"),error:function(e){strictEqual(e.responseText,"plain text message","Test jqXHR.responseText is filled for HTTP errors")}}),asyncTest("jQuery.ajax() - retry with jQuery.ajax( this )",2,function(){var e,t=!0;jQuery.ajax({url:url("data/errorWithText.php"),error:function(){t?(t=!1,jQuery.ajax(this)):(ok(!0,"Test retrying with jQuery.ajax(this) works"),jQuery.ajax({url:url("data/errorWithText.php"),data:{x:1},beforeSend:function(){return e?(strictEqual(this.url,e,"url parameters are not re-appended"),start(),!1):void(e=this.url)},error:function(){jQuery.ajax(this)}}))}})}),ajaxTest("jQuery.ajax() - headers",4,{setup:function(){jQuery(document).ajaxSend(function(e,t){t.setRequestHeader("ajax-send","test")})},url:url("data/headers.php?keys=siMPle_SometHing-elsE_OthEr_ajax-send"),headers:{siMPle:"value","SometHing-elsE":"other value",OthEr:"something else"},success:function(e,t,a){var r,s,n=jQuery.extend(this.headers,{"ajax-send":"test"}),o=[];for(r in n)o.push(r,": ",n[r],"\n");o=o.join(""),strictEqual(e,o,"Headers were sent"),strictEqual(a.getResponseHeader("Sample-Header"),"Hello World","Sample header received"),s=a.getResponseHeader("Empty-Header"),null===s?ok(!0,"Firefox doesn't support empty headers"):strictEqual(s,"","Empty header received"),strictEqual(a.getResponseHeader("Sample-Header2"),"Hello World 2","Second sample header received")}}),ajaxTest("jQuery.ajax() - Accept header",1,{url:url("data/headers.php?keys=accept"),headers:{Accept:"very wrong accept value"},beforeSend:function(e){e.setRequestHeader("Accept","*/*")},success:function(e){strictEqual(e,"accept: */*\n","Test Accept header is set to last value provided")}}),ajaxTest("jQuery.ajax() - contentType",2,[{url:url("data/headers.php?keys=content-type"),contentType:"test",success:function(e){strictEqual(e,"content-type: test\n","Test content-type is sent when options.contentType is set")}},{url:url("data/headers.php?keys=content-type"),contentType:!1,success:function(e){strictEqual(e,"content-type: \n","Test content-type is not sent when options.contentType===false")}}]),ajaxTest("jQuery.ajax() - protocol-less urls",1,{url:"//somedomain.com",beforeSend:function(e,t){return equal(t.url,location.protocol+"//somedomain.com","Make sure that the protocol is added."),!1},error:!0}),ajaxTest("jQuery.ajax() - hash",3,[{url:"data/name.html#foo",beforeSend:function(e,t){return equal(t.url,"data/name.html","Make sure that the URL is trimmed."),!1},error:!0},{url:"data/name.html?abc#foo",beforeSend:function(e,t){return equal(t.url,"data/name.html?abc","Make sure that the URL is trimmed."),!1},error:!0},{url:"data/name.html?abc#foo",data:{test:123},beforeSend:function(e,t){return equal(t.url,"data/name.html?abc&test=123","Make sure that the URL is trimmed."),!1},error:!0}]),ajaxTest("jQuery.ajax() - cross-domain detection",7,function(){function e(e,t,a){return jQuery.extend({dataType:"jsonp",url:e,beforeSend:function(e,r){return ok(a===!1?!r.crossDomain:r.crossDomain,t),!1},error:!0},a)}var t=document.location,a=t.port||("http:"===t.protocol?80:443),r=666===t.port?667:666,s="http:"===t.protocol?"https:":"http:";return[e(t.protocol+"//"+t.host+":"+a,"Test matching ports are not detected as cross-domain",!1),e(s+"//"+t.host,"Test different protocols are detected as cross-domain"),e("app:/path","Adobe AIR app:/ URL detected as cross-domain"),e(t.protocol+"//example.invalid:"+(t.port||80),"Test different hostnames are detected as cross-domain"),e(t.protocol+"//"+t.hostname+":"+r,"Test different ports are detected as cross-domain"),e("about:blank","Test about:blank is detected as cross-domain"),e(t.protocol+"//"+t.host,"Test forced crossDomain is detected as cross-domain",{crossDomain:!0})]}),ajaxTest("jQuery.ajax() - abort",9,{setup:e("ajaxStart ajaxStop ajaxSend ajaxError ajaxComplete"),url:url("data/name.php?wait=5"),beforeSend:function(){ok(!0,"beforeSend")},afterSend:function(e){strictEqual(e.readyState,1,"XHR readyState indicates successful dispatch"),e.abort(),strictEqual(e.readyState,0,"XHR readyState indicates successful abortion")},error:!0,complete:function(){ok(!0,"complete")}}),ajaxTest("jQuery.ajax() - events with context",12,function(){function e(e){equal(this,a,e.type)}function t(e){return function(){equal(this,a,"context is preserved on callback "+e)}}var a=document.createElement("div");return{setup:function(){jQuery(a).appendTo("#foo").ajaxSend(e).ajaxComplete(e).ajaxError(e).ajaxSuccess(e)},requests:[{url:url("data/name.html"),context:a,beforeSend:t("beforeSend"),success:t("success"),complete:t("complete")},{url:url("data/404.html"),context:a,beforeSend:t("beforeSend"),error:t("error"),complete:t("complete")}]}}),ajaxTest("jQuery.ajax() - events without context",3,function(){function e(e){return function(){equal(typeof this.url,"string","context is settings on callback "+e)}}return{url:url("data/404.html"),beforeSend:e("beforeSend"),error:e("error"),complete:e("complete")}}),ajaxTest("jQuery.ajax() - context modification",1,{url:url("data/name.html"),context:{},beforeSend:function(){this.test="foo"},afterSend:function(){strictEqual(this.context.test,"foo","Make sure the original object is maintained.")},success:!0}),ajaxTest("jQuery.ajax() - context modification through ajaxSetup",3,function(){var e={};return{setup:function(){jQuery.ajaxSetup({context:e}),strictEqual(jQuery.ajaxSettings.context,e,"Make sure the context is properly set in ajaxSettings.")},requests:[{url:url("data/name.html"),success:function(){strictEqual(this,e,"Make sure the original object is maintained.")}},{url:url("data/name.html"),context:{},success:function(){ok(this!==e,"Make sure overidding context is possible.")}}]}}),ajaxTest("jQuery.ajax() - disabled globals",3,{setup:e(""),global:!1,url:url("data/name.html"),beforeSend:function(){ok(!0,"beforeSend")},success:function(){ok(!0,"success")},complete:function(){ok(!0,"complete")}}),ajaxTest("jQuery.ajax() - xml: non-namespace elements inside namespaced elements",3,{url:url("data/with_fries.xml"),dataType:"xml",success:function(e){equal(jQuery("properties",e).length,1,"properties in responseXML"),equal(jQuery("jsconf",e).length,1,"jsconf in responseXML"),equal(jQuery("thing",e).length,2,"things in responseXML")}}),ajaxTest("jQuery.ajax() - xml: non-namespace elements inside namespaced elements (over JSONP)",3,{url:url("data/with_fries_over_jsonp.php"),dataType:"jsonp xml",success:function(e){equal(jQuery("properties",e).length,1,"properties in responseXML"),equal(jQuery("jsconf",e).length,1,"jsconf in responseXML"),equal(jQuery("thing",e).length,2,"things in responseXML")}}),ajaxTest("jQuery.ajax() - HEAD requests",2,[{url:url("data/name.html"),type:"HEAD",success:function(e,t,a){ok(/Date/i.test(a.getAllResponseHeaders()),"No Date in HEAD response")}},{url:url("data/name.html"),data:{whip_it:"good"},type:"HEAD",success:function(e,t,a){ok(/Date/i.test(a.getAllResponseHeaders()),"No Date in HEAD response with data")}}]),ajaxTest("jQuery.ajax() - beforeSend",1,{url:url("data/name.html"),beforeSend:function(){this.check=!0},success:function(){ok(this.check,"check beforeSend was executed")}}),ajaxTest("jQuery.ajax() - beforeSend, cancel request manually",2,{create:function(){return jQuery.ajax({url:url("data/name.html"),beforeSend:function(e){ok(!0,"beforeSend got called, canceling"),e.abort()},success:function(){ok(!1,"request didn't get canceled")},complete:function(){ok(!1,"request didn't get canceled")},error:function(){ok(!1,"request didn't get canceled")}})},fail:function(e,t){strictEqual(t,"canceled","canceled request must fail with 'canceled' status text")}}),ajaxTest("jQuery.ajax() - dataType html",5,{setup:function(){Globals.register("testFoo"),Globals.register("testBar")},dataType:"html",url:url("data/test.html"),success:function(e){ok(e.match(/^html text/),"Check content for datatype html"),jQuery("#ap").html(e),strictEqual(window.testFoo,"foo","Check if script was evaluated for datatype html"),strictEqual(window.testBar,"bar","Check if script src was evaluated for datatype html")}}),ajaxTest("jQuery.ajax() - synchronous request",1,{url:url("data/json_obj.js"),dataType:"text",async:!1,success:!0,afterSend:function(e){ok(/^\{ "data"/.test(e.responseText),"check returned text")}}),ajaxTest("jQuery.ajax() - synchronous request with callbacks",2,{url:url("data/json_obj.js"),async:!1,dataType:"text",success:!0,afterSend:function(e){var t;e.done(function(e){ok(!0,"success callback executed"),t=e}),ok(/^\{ "data"/.test(t),"check returned text")}}),asyncTest("jQuery.ajax(), jQuery.get[Script|JSON](), jQuery.post(), pass-through request object",8,function(){var e="data/name.html",t=0,a=0,r="",s=function(){t++};jQuery(document).on("ajaxError.passthru",function(e,t){a++,r+=": "+t.status}),jQuery(document).one("ajaxStop",function(){equal(t,5,"Check all ajax calls successful"),equal(a,0,"Check no ajax errors (status"+r+")"),jQuery(document).off("ajaxError.passthru"),start()}),Globals.register("testBar"),ok(jQuery.get(url(e),s),"get"),ok(jQuery.post(url(e),s),"post"),ok(jQuery.getScript(url("data/test.js"),s),"script"),ok(jQuery.getJSON(url("data/json_obj.js"),s),"json"),ok(jQuery.ajax({url:url(e),success:s}),"generic")}),ajaxTest("jQuery.ajax() - cache",12,function(){function e(e,a){return{url:e,cache:!1,beforeSend:function(){for(var e,r;r=t.exec(this.url);)strictEqual(e,void 0,a+": only one 'no-cache' parameter"),e=r[1],notStrictEqual(e,"tobereplaced555",a+": parameter (if it was there) was replaced");return!1},error:!0}}var t=/_=(.*?)(&|$)/g;return[e("data/text.php","no parameter"),e("data/text.php?pizza=true","1 parameter"),e("data/text.php?_=tobereplaced555","_= parameter"),e("data/text.php?pizza=true&_=tobereplaced555","1 parameter and _="),e("data/text.php?_=tobereplaced555&tv=false","_= and 1 parameter"),e("data/text.php?name=David&_=tobereplaced555&washere=true","2 parameters surrounding _=")]}),jQuery.each([" - Same Domain"," - Cross Domain"],function(e,t){ajaxTest("jQuery.ajax() - JSONP - Query String (?n)"+t,4,[{url:"data/jsonp.php?callback=?",dataType:"jsonp",crossDomain:e,success:function(e){ok(e.data,"JSON results returned (GET, url callback)")}},{url:"data/jsonp.php?callback=??",dataType:"jsonp",crossDomain:e,success:function(e){ok(e.data,"JSON results returned (GET, url context-free callback)")}},{url:"data/jsonp.php/??",dataType:"jsonp",crossDomain:e,success:function(e){ok(e.data,"JSON results returned (GET, REST-like)")}},{url:"data/jsonp.php/???json=1",dataType:"jsonp",crossDomain:e,success:function(e){strictEqual(jQuery.type(e),"array","JSON results returned (GET, REST-like with param)")}}]),ajaxTest("jQuery.ajax() - JSONP - Explicit callback param"+t,9,{setup:function(){Globals.register("functionToCleanUp"),Globals.register("XXX"),Globals.register("jsonpResults"),window.jsonpResults=function(e){ok(e.data,"JSON results returned (GET, custom callback function)")}},requests:[{url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,jsonp:"callback",success:function(e){ok(e.data,"JSON results returned (GET, data obj callback)")}},{url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,jsonpCallback:"jsonpResults",success:function(e){ok(e.data,"JSON results returned (GET, custom callback name)")}},{url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,jsonpCallback:"functionToCleanUp",success:function(t){ok(t.data,"JSON results returned (GET, custom callback name to be cleaned up)"),strictEqual(window.functionToCleanUp,void 0,"Callback was removed (GET, custom callback name to be cleaned up)");var a;jQuery.ajax({url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,jsonpCallback:"functionToCleanUp",beforeSend:function(e){return a=e,!1}}),a.fail(function(){ok(!0,"Ajax error JSON (GET, custom callback name to be cleaned up)"),strictEqual(window.functionToCleanUp,void 0,"Callback was removed after early abort (GET, custom callback name to be cleaned up)")})}},{url:"data/jsonp.php?callback=XXX",dataType:"jsonp",jsonp:!1,jsonpCallback:"XXX",crossDomain:e,beforeSend:function(){ok(/^data\/jsonp.php\?callback=XXX&_=\d+$/.test(this.url),"The URL wasn't messed with (GET, custom callback name with no url manipulation)")},success:function(e){ok(e.data,"JSON results returned (GET, custom callback name with no url manipulation)")}}]}),ajaxTest("jQuery.ajax() - JSONP - Callback in data"+t,2,[{url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,data:"callback=?",success:function(e){ok(e.data,"JSON results returned (GET, data callback)")}},{url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,data:"callback=??",success:function(e){ok(e.data,"JSON results returned (GET, data context-free callback)")}}]),ajaxTest("jQuery.ajax() - JSONP - POST"+t,3,[{type:"POST",url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,success:function(e){ok(e.data,"JSON results returned (POST, no callback)")}},{type:"POST",url:"data/jsonp.php",data:"callback=?",dataType:"jsonp",crossDomain:e,success:function(e){ok(e.data,"JSON results returned (POST, data callback)")}},{type:"POST",url:"data/jsonp.php",jsonp:"callback",dataType:"jsonp",crossDomain:e,success:function(e){ok(e.data,"JSON results returned (POST, data obj callback)")}}]),ajaxTest("jQuery.ajax() - JSONP"+t,3,[{url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,success:function(e){ok(e.data,"JSON results returned (GET, no callback)")}},{create:function(e){var t=jQuery.ajax(e),a=t.then(function(e){return ok(e.data,"first request: JSON results returned (GET, no callback)"),t=jQuery.ajax(this).done(function(e){ok(e.data,"this re-used: JSON results returned (GET, no callback)")}),a.abort=t.abort,t});return a.abort=t.abort,a},url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,success:!0}])}),ajaxTest("jQuery.ajax() - script, Remote",2,{setup:function(){Globals.register("testBar")},url:window.location.href.replace(/[^\/]*$/,"")+"data/test.js",dataType:"script",success:function(){strictEqual(window.testBar,"bar","Script results returned (GET, no callback)")}}),ajaxTest("jQuery.ajax() - script, Remote with POST",3,{setup:function(){Globals.register("testBar")},url:window.location.href.replace(/[^\/]*$/,"")+"data/test.js",type:"POST",dataType:"script",success:function(e,t){strictEqual(window.testBar,"bar","Script results returned (POST, no callback)"),strictEqual(t,"success","Script results returned (POST, no callback)")}}),ajaxTest("jQuery.ajax() - script, Remote with scheme-less URL",2,{setup:function(){Globals.register("testBar")},url:window.location.href.replace(/[^\/]*$/,"").replace(/^.*?\/\//,"//")+"data/test.js",dataType:"script",success:function(){strictEqual(window.testBar,"bar","Script results returned (GET, no callback)")}}),ajaxTest("jQuery.ajax() - malformed JSON",2,{url:"data/badjson.js",dataType:"json",error:function(e,t,a){strictEqual(t,"parsererror","A parse error occurred."),ok(/(invalid|error|exception)/i.test(a),"Detailed parsererror message provided")}}),ajaxTest("jQuery.ajax() - script by content-type",2,[{url:"data/script.php",data:{header:"script"},success:!0},{url:"data/script.php",data:{header:"ecma"},success:!0}]),ajaxTest("jQuery.ajax() - JSON by content-type",5,{url:"data/json.php",data:{header:"json",json:"array"},success:function(e){ok(e.length>=2,"Check length"),strictEqual(e[0].name,"John","Check JSON: first, name"),strictEqual(e[0].age,21,"Check JSON: first, age"),strictEqual(e[1].name,"Peter","Check JSON: second, name"),strictEqual(e[1].age,25,"Check JSON: second, age")}}),ajaxTest("jQuery.ajax() - JSON by content-type disabled with options",6,{url:url("data/json.php"),data:{header:"json",json:"array"},contents:{json:!1},success:function(e){strictEqual(typeof e,"string","json wasn't auto-determined");var t=jQuery.parseJSON(e);ok(t.length>=2,"Check length"),strictEqual(t[0].name,"John","Check JSON: first, name"),strictEqual(t[0].age,21,"Check JSON: first, age"),strictEqual(t[1].name,"Peter","Check JSON: second, name"),strictEqual(t[1].age,25,"Check JSON: second, age")}}),ajaxTest("jQuery.ajax() - simple get",1,{type:"GET",url:url("data/name.php?name=foo"),success:function(e){strictEqual(e,"bar","Check for GET")}}),ajaxTest("jQuery.ajax() - simple post",1,{type:"POST",url:url("data/name.php"),data:"name=peter",success:function(e){strictEqual(e,"pan","Check for POST")}}),ajaxTest("jQuery.ajax() - data option - empty bodies for non-GET requests",1,{url:"data/echoData.php",data:void 0,type:"post",success:function(e){strictEqual(e,"")}});var t=new Date;jQuery.each({" (cache)":!0," (no cache)":!1},function(e,a){var r=!!window.opera;asyncTest("jQuery.ajax() - If-Modified-Since support"+e,3,function(){var e="data/if_modified_since.php?ts="+t++;jQuery.ajax({url:e,ifModified:!0,cache:a,success:function(t,s){strictEqual(s,"success"),jQuery.ajax({url:e,ifModified:!0,cache:a,success:function(e,t){"FAIL"===e?(ok(r,"Opera is incapable of doing .setRequestHeader('If-Modified-Since')."),ok(r,"Opera is incapable of doing .setRequestHeader('If-Modified-Since').")):(strictEqual(t,"notmodified"),ok(null==e,"response body should be empty")),start()},error:function(){ok(r,"error"),ok(r,"error"),start()}})},error:function(){strictEqual(!1,"error"),ok(r,"error"),start()}})}),asyncTest("jQuery.ajax() - Etag support"+e,3,function(){var e="data/etag.php?ts="+t++;jQuery.ajax({url:e,ifModified:!0,cache:a,success:function(t,s){strictEqual(s,"success"),jQuery.ajax({url:e,ifModified:!0,cache:a,success:function(e,t){"FAIL"===e?(ok(r,"Opera is incapable of doing .setRequestHeader('If-None-Match')."),ok(r,"Opera is incapable of doing .setRequestHeader('If-None-Match').")):(strictEqual(t,"notmodified"),ok(null==e,"response body should be empty")),start()},error:function(){ok(r,"error"),ok(r,"error"),start()}})},error:function(){ok(r,"error"),start()}})})}),ajaxTest("jQuery.ajax() - failing cross-domain (non-existing)",1,{url:"http://example.invalid",error:function(e,t,a){ok(!0,"file not found: "+e.status+" => "+a)}}),ajaxTest("jQuery.ajax() - failing cross-domain",1,{url:"http://"+externalHost,error:function(e,t,a){ok(!0,"access denied: "+e.status+" => "+a)}}),ajaxTest("jQuery.ajax() - atom+xml",1,{url:url("data/atom+xml.php"),success:function(){ok(!0,"success")}}),asyncTest("jQuery.ajax() - statusText",3,function(){jQuery.ajax(url("data/statusText.php?status=200&text=Hello")).done(function(e,t,a){strictEqual(t,"success","callback status text ok for success"),ok("Hello"===a.statusText||"OK"===a.statusText,"jqXHR status text ok for success ("+a.statusText+")"),jQuery.ajax(url("data/statusText.php?status=404&text=World")).fail(function(e,t){strictEqual(t,"error","callback status text ok for error"),start()})})}),asyncTest("jQuery.ajax() - statusCode",20,function(){function e(){--a||start()}function t(e,t){return e="Test "+e+" "+(t?"success":"error"),{200:function(){ok(t,e)},404:function(){ok(!t,e)}}}var a=12;jQuery.each({"data/name.html":!0,"data/someFileThatDoesNotExist.html":!1},function(a,r){jQuery.ajax(url(a),{statusCode:t("in options",r),complete:e}),jQuery.ajax(url(a),{complete:e}).statusCode(t("immediately with method",r)),jQuery.ajax(url(a),{complete:function(a){a.statusCode(t("on complete",r)),e()}}),jQuery.ajax(url(a),{complete:function(a){setTimeout(function(){a.statusCode(t("very late binding",r)),e()},100)}}),jQuery.ajax(url(a),{statusCode:t("all (options)",r),complete:function(a){a.statusCode(t("all (on complete)",r)),setTimeout(function(){a.statusCode(t("all (very late binding)",r)),e()},100)}}).statusCode(t("all (immediately with method)",r));var s="";jQuery.ajax(url(a),{success:function(e,t,a){ok(r,"success");var n={};n[a.status]=function(){s+="B"},a.statusCode(n),s+="A"},error:function(e){ok(!r,"error");var t={};t[e.status]=function(){s+="B"},e.statusCode(t),s+="A"},complete:function(){strictEqual(s,"AB","Test statusCode callbacks are ordered like "+(r?"success":"error")+" callbacks"),e()}})})}),ajaxTest("jQuery.ajax() - transitive conversions",8,[{url:url("data/json.php"),converters:{"json myJson":function(e){return ok(!0,"converter called"),e}},dataType:"myJson",success:function(){ok(!0,"Transitive conversion worked"),strictEqual(this.dataTypes[0],"text","response was retrieved as text"),strictEqual(this.dataTypes[1],"myjson","request expected myjson dataType")}},{url:url("data/json.php"),converters:{"json myJson":function(e){return ok(!0,"converter called (*)"),e}},contents:!1,dataType:"* myJson",success:function(){ok(!0,"Transitive conversion worked (*)"),strictEqual(this.dataTypes[0],"text","response was retrieved as text (*)"),strictEqual(this.dataTypes[1],"myjson","request expected myjson dataType (*)")}}]),ajaxTest("jQuery.ajax() - overrideMimeType",2,[{url:url("data/json.php"),beforeSend:function(e){e.overrideMimeType("application/json")},success:function(e){ok(e.data,"Mimetype overriden using beforeSend")}},{url:url("data/json.php"),mimeType:"application/json",success:function(e){ok(e.data,"Mimetype overriden using mimeType option")}}]),ajaxTest("jQuery.ajax() - empty json gets to error callback instead of success callback.",1,{url:url("data/echoData.php"),error:function(e,t,a){equal("object"==typeof a,!0,"Didn't get back error object for empty json response")},dataType:"json"}),ajaxTest("#2688 - jQuery.ajax() - beforeSend, cancel request",2,{create:function(){return jQuery.ajax({url:url("data/name.html"),beforeSend:function(){return ok(!0,"beforeSend got called, canceling"),!1},success:function(){ok(!1,"request didn't get canceled")},complete:function(){ok(!1,"request didn't get canceled")},error:function(){ok(!1,"request didn't get canceled")}})},fail:function(e,t){strictEqual(t,"canceled","canceled request must fail with 'canceled' status text")}}),ajaxTest("#2806 - jQuery.ajax() - data option - evaluate function values",1,{url:"data/echoQuery.php",data:{key:function(){return"value"}},success:function(e){strictEqual(e,"key=value")}}),test("#7531 - jQuery.ajax() - Location object as url",1,function(){var e=!1;try{var t=jQuery.ajax({url:window.location});e=!0,t.abort()}catch(a){}ok(e,"document.location did not generate exception")}),jQuery.each([" - Same Domain"," - Cross Domain"],function(e,t){ajaxTest("#7578 - jQuery.ajax() - JSONP - default for cache option"+t,1,{url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,beforeSend:function(){return strictEqual(this.cache,!1,"cache must be false on JSON request"),!1},error:!0})}),ajaxTest("#8107 - jQuery.ajax() - multiple method signatures introduced in 1.5",4,[{create:function(){return jQuery.ajax()},done:function(){ok(!0,"With no arguments")}},{create:function(){return jQuery.ajax("data/name.html")},done:function(){ok(!0,"With only string URL argument")}},{create:function(){return jQuery.ajax("data/name.html",{})},done:function(){ok(!0,"With string URL param and map")}},{create:function(e){return jQuery.ajax(e)},url:"data/name.html",success:function(){ok(!0,"With only map")}}]),jQuery.each([" - Same Domain"," - Cross Domain"],function(e,t){ajaxTest("#8205 - jQuery.ajax() - JSONP - re-use callbacks name"+t,2,{url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,beforeSend:function(e,t){t.callback=t.jsonpCallback},success:function(){var t=this;strictEqual(t.jsonpCallback,void 0,"jsonpCallback option is set back to default in callbacks"),jQuery.ajax({url:"data/jsonp.php",dataType:"jsonp",crossDomain:e,beforeSend:function(){return strictEqual(this.jsonpCallback,t.callback,"JSONP callback name is re-used"),!1}})}})}),test("#9887 - jQuery.ajax() - Context with circular references (#9887)",2,function(){var e=!1,t={};t.field=t;try{jQuery.ajax("non-existing",{context:t,beforeSend:function(){return ok(this===t,"context was not deep extended"),!1}}),e=!0}catch(a){console.log(a)}ok(e,"context with circular reference did not generate an exception")}),jQuery.each(["as argument","in settings object"],function(e,t){function a(a,r){return{create:function(){return jQuery.ajax(e?{url:a}:a)},done:function(){ok(!0,(r||a)+" "+t)}}}ajaxTest("#10093 - jQuery.ajax() - falsy url "+t,4,[a("","empty string"),a(!1),a(null),a(void 0)])}),ajaxTest("#11426 - jQuery.ajax() - loading binary data shouldn't throw an exception in IE",1,{url:url("data/1x1.jpg"),success:function(e){ok(void 0===e||/JFIF/.test(e),"success callback reached")}}),test("#11743 - jQuery.ajax() - script, throws exception",1,function(){raises(function(){jQuery.ajax({url:"data/badjson.js",dataType:"script","throws":!0,async:!1,global:!1,success:function(){ok(!1,"Success.")},error:function(){ok(!1,"Error.")}})},"exception bubbled")}),jQuery.each(["method","type"],function(e,t){function a(e){var t={url:url("data/echoData.php"),data:"hello",success:function(e){strictEqual(e,"hello","Check for POST (no override)")}};return e&&(t[e]="GET",t.success=function(t){strictEqual(t,"","Check for no POST (overriding with "+e+")")}),t}ajaxTest("#12004 - jQuery.ajax() - method is an alias of type - "+t+" set globally",3,{setup:function(){var e={};e[t]="POST",jQuery.ajaxSetup(e)},requests:[a("type"),a("method"),a()]})}),ajaxTest("#13276 - jQuery.ajax() - compatibility between XML documents from ajax requests and parsed string",1,{url:"data/dashboard.xml",dataType:"xml",success:function(e){var t=jQuery(jQuery.parseXML('<tab title="Added">blibli</tab>')).find("tab");e=jQuery(e);try{e.find("infowindowtab").append(t)}catch(a){return void strictEqual(a,void 0,"error")}strictEqual(e.find("tab").length,3,"Parsed node was added properly")}}),ajaxTest("#13292 - jQuery.ajax() - converter is bypassed for 204 requests",3,{url:"data/nocontent.php",dataType:"testing",converters:{"* testing":function(){throw"converter was called"}},success:function(e,t,a){strictEqual(a.status,204,"status code is 204"),strictEqual(t,"nocontent","status text is 'nocontent'"),strictEqual(e,void 0,"data is undefined")},error:function(e,t,a){ok(!1,"error"),strictEqual(t,"parsererror","Parser Error"),strictEqual(a,"converter was called","Converter was called")}}),ajaxTest("jQuery.ajaxPrefilter() - abort",1,{setup:function(){jQuery.ajaxPrefilter(function(e,t,a){e.abortInPrefilter&&a.abort()})},abortInPrefilter:!0,error:function(){ok(!1,"error callback called")},fail:function(e,t){strictEqual(t,"canceled","Request aborted by the prefilter must fail with 'canceled' status text")}}),asyncTest("jQuery.ajaxSetup()",1,function(){jQuery.ajaxSetup({url:url("data/name.php?name=foo"),success:function(e){strictEqual(e,"bar","Check for GET"),start()}}),jQuery.ajax()}),asyncTest("jQuery.ajaxSetup({ timeout: Number }) - with global timeout",2,function(){var e=0,t=function(){ok(e++<2,"Error callback executed"),2==e&&(jQuery(document).off("ajaxError.setupTest"),start())},a=function(e,t){ok(!1,"Check for timeout failed "+e+" "+t),start()};jQuery(document).on("ajaxError.setupTest",t),jQuery.ajaxSetup({timeout:1e3}),jQuery.ajax({type:"GET",url:url("data/name.php?wait=5"),error:t,success:a})}),asyncTest("jQuery.ajaxSetup({ timeout: Number }) with localtimeout",1,function(){jQuery.ajaxSetup({timeout:50}),jQuery.ajax({type:"GET",timeout:15e3,url:url("data/name.php?wait=1"),error:function(){ok(!1,"Check for local timeout failed"),start()},success:function(){ok(!0,"Check for local timeout"),start()}})}),test("#11264 - jQuery.domManip() - no side effect because of ajaxSetup or global events",1,function(){jQuery.ajaxSetup({type:"POST"}),jQuery(document).bind("ajaxStart ajaxStop",function(){ok(!1,"Global event triggered")}),jQuery("#qunit-fixture").append("<script src='data/evalScript.php'></script>"),jQuery(document).unbind("ajaxStart ajaxStop")}),asyncTest("#11402 - jQuery.domManip() - script in comments are properly evaluated",2,function(){jQuery("#qunit-fixture").load("data/cleanScript.html",start)}),asyncTest("jQuery.get( String, Hash, Function ) - parse xml and use text() on nodes",2,function(){jQuery.get(url("data/dashboard.xml"),function(e){var t=[];jQuery("tab",e).each(function(){t.push(jQuery(this).text())}),strictEqual(t[0],"blabla","Check first tab"),strictEqual(t[1],"blublu","Check second tab"),start()})}),asyncTest("#8277 - jQuery.get( String, Function ) - data in ajaxSettings",1,function(){jQuery.ajaxSetup({data:"helloworld"}),jQuery.get(url("data/echoQuery.php"),function(e){ok(/helloworld$/.test(e),"Data from ajaxSettings was used"),start()})}),asyncTest("jQuery.getJSON( String, Hash, Function ) - JSON array",5,function(){jQuery.getJSON(url("data/json.php"),{json:"array"},function(e){ok(e.length>=2,"Check length"),strictEqual(e[0].name,"John","Check JSON: first, name"),strictEqual(e[0].age,21,"Check JSON: first, age"),strictEqual(e[1].name,"Peter","Check JSON: second, name"),strictEqual(e[1].age,25,"Check JSON: second, age"),start()})}),asyncTest("jQuery.getJSON( String, Function ) - JSON object",2,function(){jQuery.getJSON(url("data/json.php"),function(e){e&&e.data&&(strictEqual(e.data.lang,"en","Check JSON: lang"),strictEqual(e.data.length,25,"Check JSON: length"),start())})}),asyncTest("jQuery.getJSON() - Using Native JSON",2,function(){var e="JSON"in window,t=window.JSON;e||Globals.register("JSON"),window.JSON={parse:function(){return ok(!0,"Verifying that parse method was run"),window.JSON=t,!0}},jQuery.getJSON(url("data/json.php"),function(e){strictEqual(e,!0,"Verifying return value"),start()})}),asyncTest("jQuery.getJSON( String, Function ) - JSON object with absolute url to local content",2,function(){jQuery.getJSON(url(window.location.href.replace(/[^\/]*$/,"")+"data/json.php"),function(e){strictEqual(e.data.lang,"en","Check JSON: lang"),strictEqual(e.data.length,25,"Check JSON: length"),start()
})}),asyncTest("jQuery.getScript( String, Function ) - with callback",2,function(){Globals.register("testBar"),jQuery.getScript(url("data/test.js"),function(){strictEqual(window.testBar,"bar","Check if script was evaluated"),start()})}),asyncTest("jQuery.getScript( String, Function ) - no callback",1,function(){Globals.register("testBar"),jQuery.getScript(url("data/test.js")).done(start)}),asyncTest("#8082 - jQuery.getScript( String, Function ) - source as responseText",2,function(){Globals.register("testBar"),jQuery.getScript(url("data/test.js"),function(e,t,a){strictEqual(e,a.responseText,"Same-domain script requests returns the source of the script"),start()})}),asyncTest("jQuery.fn.load( String )",2,function(){jQuery.ajaxSetup({beforeSend:function(){strictEqual(this.type,"GET","no data means GET request")}}),jQuery("#first").load("data/name.html",start)}),asyncTest("jQuery.fn.load() - 404 error callbacks",6,function(){e("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxError")(),jQuery(document).ajaxStop(start),jQuery("<div/>").load("data/404.html",function(){ok(!0,"complete")})}),asyncTest("jQuery.fn.load( String, null )",2,function(){jQuery.ajaxSetup({beforeSend:function(){strictEqual(this.type,"GET","no data means GET request")}}),jQuery("#first").load("data/name.html",null,start)}),asyncTest("jQuery.fn.load( String, undefined )",2,function(){jQuery.ajaxSetup({beforeSend:function(){strictEqual(this.type,"GET","no data means GET request")}}),jQuery("#first").load("data/name.html",void 0,start)}),asyncTest("jQuery.fn.load( URL_SELECTOR )",1,function(){jQuery("#first").load("data/test3.html div.user",function(){strictEqual(jQuery(this).children("div").length,2,"Verify that specific elements were injected"),start()})}),asyncTest("jQuery.fn.load( String, Function ) - simple: inject text into DOM",2,function(){jQuery("#first").load(url("data/name.html"),function(){ok(/^ERROR/.test(jQuery("#first").text()),"Check if content was injected into the DOM"),start()})}),asyncTest("jQuery.fn.load( String, Function ) - check scripts",7,function(){var e=function(){strictEqual(window.testBar,"bar","Check if script src was evaluated after load"),strictEqual(jQuery("#ap").html(),"bar","Check if script evaluation has modified DOM"),start()};Globals.register("testFoo"),Globals.register("testBar"),jQuery("#first").load(url("data/test.html"),function(){ok(jQuery("#first").html().match(/^html text/),"Check content after loading html"),strictEqual(jQuery("#foo").html(),"foo","Check if script evaluation has modified DOM"),strictEqual(window.testFoo,"foo","Check if script was evaluated after load"),setTimeout(e,600)})}),asyncTest("jQuery.fn.load( String, Function ) - check file with only a script tag",3,function(){Globals.register("testFoo"),jQuery("#first").load(url("data/test2.html"),function(){strictEqual(jQuery("#foo").html(),"foo","Check if script evaluation has modified DOM"),strictEqual(window.testFoo,"foo","Check if script was evaluated after load"),start()})}),asyncTest("jQuery.fn.load( String, Function ) - dataFilter in ajaxSettings",2,function(){jQuery.ajaxSetup({dataFilter:function(){return"Hello World"}}),jQuery("<div/>").load(url("data/name.html"),function(e){strictEqual(jQuery(this).html(),"Hello World","Test div was filled with filtered data"),strictEqual(e,"Hello World","Test callback receives filtered data"),start()})}),asyncTest("jQuery.fn.load( String, Object, Function )",2,function(){jQuery("<div />").load(url("data/params_html.php"),{foo:3,bar:"ok"},function(){var e=jQuery(this).find("#post");strictEqual(e.find("#foo").text(),"3","Check if a hash of data is passed correctly"),strictEqual(e.find("#bar").text(),"ok","Check if a hash of data is passed correctly"),start()})}),asyncTest("jQuery.fn.load( String, String, Function )",2,function(){jQuery("<div />").load(url("data/params_html.php"),"foo=3&bar=ok",function(){var e=jQuery(this).find("#get");strictEqual(e.find("#foo").text(),"3","Check if a string of data is passed correctly"),strictEqual(e.find("#bar").text(),"ok","Check if a   of data is passed correctly"),start()})}),asyncTest("jQuery.fn.load() - callbacks get the correct parameters",8,function(){var e=([].slice,{});jQuery.ajaxSetup({success:function(t,a,r){e[this.url]=[r.responseText,a,r]},error:function(t,a){e[this.url]=[t.responseText,a,t]}}),jQuery.when.apply(jQuery,jQuery.map([{type:"success",url:"data/echoQuery.php?arg=pop"},{type:"error",url:"data/404.php"}],function(t){return jQuery.Deferred(function(a){jQuery("#foo").load(t.url,function(){var r=arguments;strictEqual(e[t.url].length,r.length,"same number of arguments ("+t.type+")"),jQuery.each(e[t.url],function(e,a){strictEqual(r[e],a,"argument #"+e+" is the same ("+t.type+")")}),a.resolve()})})})).always(start)}),asyncTest("#2046 - jQuery.fn.load( String, Function ) with ajaxSetup on dataType json",1,function(){jQuery.ajaxSetup({dataType:"json"}),jQuery(document).ajaxComplete(function(e,t,a){strictEqual(a.dataType,"html","Verify the load() dataType was html"),jQuery(document).unbind("ajaxComplete"),start()}),jQuery("#first").load("data/test3.html")}),asyncTest("#10524 - jQuery.fn.load() - data specified in ajaxSettings is merged in",1,function(){var e={baz:1};jQuery.ajaxSetup({data:{foo:"bar"}}),jQuery("#foo").load("data/echoQuery.php",e),jQuery(document).ajaxComplete(function(e,t,a){ok(~a.data.indexOf("foo=bar"),"Data from ajaxSettings was used"),start()})}),asyncTest("jQuery.post() - data",3,function(){jQuery.when(jQuery.post(url("data/name.php"),{xml:"5-2",length:3},function(e){jQuery("math",e).each(function(){strictEqual(jQuery("calculation",this).text(),"5-2","Check for XML"),strictEqual(jQuery("result",this).text(),"3","Check for XML")})}),jQuery.ajax({url:url("data/echoData.php"),type:"POST",data:{test:{length:7,foo:"bar"}},success:function(e){strictEqual(e,"test%5Blength%5D=7&test%5Bfoo%5D=bar","Check if a sub-object with a length param is serialized correctly")}})).always(start)}),asyncTest("jQuery.post( String, Hash, Function ) - simple with xml",4,function(){jQuery.when(jQuery.post(url("data/name.php"),{xml:"5-2"},function(e){jQuery("math",e).each(function(){strictEqual(jQuery("calculation",this).text(),"5-2","Check for XML"),strictEqual(jQuery("result",this).text(),"3","Check for XML")})}),jQuery.post(url("data/name.php?xml=5-2"),{},function(e){jQuery("math",e).each(function(){strictEqual(jQuery("calculation",this).text(),"5-2","Check for XML"),strictEqual(jQuery("result",this).text(),"3","Check for XML")})})).always(start)}),test("jQuery.active",1,function(){ok(0===jQuery.active,"ajax active counter should be zero: "+jQuery.active)})}}();