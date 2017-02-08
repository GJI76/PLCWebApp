module("selector",{teardown:moduleTeardown}),test("element - jQuery only",function(){expect(7);var e=document.getElementById("qunit-fixture");deepEqual(jQuery("p",e).get(),q("firstp","ap","sndp","en","sap","first"),"Finding elements with a Node context."),deepEqual(jQuery("p","#qunit-fixture").get(),q("firstp","ap","sndp","en","sap","first"),"Finding elements with a selector context."),deepEqual(jQuery("p",jQuery("#qunit-fixture")).get(),q("firstp","ap","sndp","en","sap","first"),"Finding elements with a jQuery object context."),deepEqual(jQuery("#qunit-fixture").find("p").get(),q("firstp","ap","sndp","en","sap","first"),"Finding elements with a context via .find()."),ok(jQuery("#length").length,'<input name="length"> cannot be found under IE, see #945'),ok(jQuery("#lengthtest input").length,'<input name="length"> cannot be found under IE, see #945'),equal(jQuery('<div id="A\'B~C.D[E]"><p>foo</p></div>').find("p").length,1,"Find where context root is a node and has an ID with CSS3 meta characters")}),test("class - jQuery only",function(){expect(4),deepEqual(jQuery(".blog",document.getElementsByTagName("p")).get(),q("mark","simon"),"Finding elements with a context."),deepEqual(jQuery(".blog","p").get(),q("mark","simon"),"Finding elements with a context."),deepEqual(jQuery(".blog",jQuery("p")).get(),q("mark","simon"),"Finding elements with a context."),deepEqual(jQuery("p").find(".blog").get(),q("mark","simon"),"Finding elements with a context.")}),test("attributes - jQuery only",function(){expect(6),t("Find elements with a tabindex attribute","[tabindex]",["listWithTabIndex","foodWithNegativeTabIndex","linkWithTabIndex","linkWithNegativeTabIndex","linkWithNoHrefWithTabIndex","linkWithNoHrefWithNegativeTabIndex"]),deepEqual(jQuery.find("[title]",null,null,jQuery("#qunit-fixture a").get().concat(document.createTextNode(""))),q("google"),"Text nodes fail attribute tests without exception"),ok(jQuery("<select value='12600'><option value='option' selected='selected'></option><option value=''></option></select>").prop("value","option").is(":input[value='12600']"),":input[value=foo] selects select by attribute"),ok(jQuery("<input type='text' value='12600'/>").prop("value","option").is(":input[value='12600']"),":input[value=foo] selects text input by attribute"),ok(jQuery("<input type='checkbox' checked='checked'/>").prop("checked",!1).is("[checked]"),"[checked] selects by attribute (positive)"),ok(!jQuery("<input type='checkbox'/>").prop("checked",!0).is("[checked]"),"[checked] selects by attribute (negative)")}),test("disconnected nodes",function(){expect(4);var e=jQuery("<option></option>").attr("value","whipit").appendTo("#qunit-fixture").detach();equal(e.val(),"whipit","option value"),equal(e.is(":selected"),!1,"unselected option"),e.prop("selected",!0),equal(e.is(":selected"),!0,"selected option");var t=jQuery("<div/>");equal(t.is("div"),!0,"Make sure .is('nodeName') works on disconnected nodes.")}),test("jQuery only - broken",1,function(){raises(function(){jQuery.call(null," <div/> ")},function(e){return e.message.indexOf("Syntax error")>=0},"leading space invalid: $(' <div/> ')")}),testIframe("selector/html5_selector","attributes - jQuery.attr",function(e,t,i){function n(){for(var e=[],t=0;t<arguments.length;t++)e.push(i.getElementById(arguments[t]));return e}function s(t,i,s){for(var a=e(i).get(),r="",o=0;o<a.length;o++)r+=(r&&",")+"'"+a[o].id+"'";deepEqual(a,n.apply(n,s),t+" ("+i+")")}expect(35),s("Attribute Exists","[autobuffer]",["video1"]),s("Attribute Exists","[autofocus]",["text1"]),s("Attribute Exists","[autoplay]",["video1"]),s("Attribute Exists","[async]",["script1"]),s("Attribute Exists","[checked]",["check1"]),s("Attribute Exists","[compact]",["dl"]),s("Attribute Exists","[controls]",["video1"]),s("Attribute Exists","[declare]",["object1"]),s("Attribute Exists","[defer]",["script1"]),s("Attribute Exists","[disabled]",["check1"]),s("Attribute Exists","[formnovalidate]",["form1"]),s("Attribute Exists","[hidden]",["div1"]),s("Attribute Exists","[indeterminate]",[]),s("Attribute Exists","[ismap]",["img1"]),s("Attribute Exists","[itemscope]",["div1"]),s("Attribute Exists","[multiple]",["select1"]),s("Attribute Exists","[muted]",["audio1"]),s("Attribute Exists","[noresize]",["textarea1"]),s("Attribute Exists","[noshade]",["hr1"]),s("Attribute Exists","[nowrap]",["td1","div1"]),s("Attribute Exists","[novalidate]",["form1"]),s("Attribute Exists","[open]",["details1"]),s("Attribute Exists","[pubdate]",["article1"]),s("Attribute Exists","[readonly]",["text1"]),s("Attribute Exists","[required]",["text1"]),s("Attribute Exists","[reversed]",["ol1"]),s("Attribute Exists","[scoped]",["style1"]),s("Attribute Exists","[seamless]",["iframe1"]),s("Attribute Exists","[selected]",["option1"]),s("Attribute Exists","[truespeed]",["marquee1"]),e.expandedEach=e.each,e.expandedEach(["draggable","contenteditable","aria-disabled"],function(e,t){s("Enumerated attribute","["+t+"]",["div1"])}),s("Enumerated attribute","[spellcheck]",["span1"]),s("Improperly named form elements do not interfere with form selections (#9570)","form[name='formName']",["form1"])}),testIframe("selector/sizzle_cache","Sizzle cache collides with multiple Sizzles on a page",function(e,t,i){var n=t.$cached;expect(3),deepEqual(n(".test a").get(),[i.getElementById("collision")],"Select collision anchor with first sizzle"),equal(e(".evil a").length,0,"Select nothing with second sizzle"),equal(e(".evil a").length,0,"Select nothing again with second sizzle")});