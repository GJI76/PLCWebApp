$(document).ready(function(){var e;module("Utility",{setup:function(){e=_.clone(_.templateSettings)},teardown:function(){_.templateSettings=e}}),test("#750 - Return _ instance.",2,function(){var e=_([]);ok(_(e)===e),ok(new _(e)===e)}),test("identity",function(){var e={name:"moe"};equal(_.identity(e),e,"moe is the same as his identity")}),test("random",function(){var e=_.range(1e3),t=Math.pow(2,31),a=Math.pow(2,62);ok(_.every(e,function(){return _.random(t,a)>=t}),"should produce a random number greater than or equal to the minimum number"),ok(_.some(e,function(){return _.random(Number.MAX_VALUE)>0}),"should produce a random number when passed `Number.MAX_VALUE`")}),test("uniqueId",function(){for(var e=[],t=0;t++<100;)e.push(_.uniqueId());equal(_.uniq(e).length,e.length,"can generate a globally-unique stream of ids")}),test("times",function(){var e=[];_.times(3,function(t){e.push(t)}),ok(_.isEqual(e,[0,1,2]),"is 0 indexed"),e=[],_(3).times(function(t){e.push(t)}),ok(_.isEqual(e,[0,1,2]),"works as a wrapper"),ok(_.isEqual([0,1,2],_.times(3,function(e){return e})),"collects return values")}),test("mixin",function(){_.mixin({myReverse:function(e){return e.split("").reverse().join("")}}),equal(_.myReverse("panacea"),"aecanap","mixed in a function to _"),equal(_("champ").myReverse(),"pmahc","mixed in a function to the OOP wrapper")}),test("_.escape",function(){equal(_.escape("Curly & Moe"),"Curly &amp; Moe"),equal(_.escape("Curly &amp; Moe"),"Curly &amp;amp; Moe"),equal(_.escape(null),"")}),test("_.unescape",function(){var e="Curly & Moe";equal(_.unescape("Curly &amp; Moe"),e),equal(_.unescape("Curly &amp;amp; Moe"),"Curly &amp; Moe"),equal(_.unescape(null),""),equal(_.unescape(_.escape(e)),e)}),test("template",function(){var e=_.template("<%= thing %> is gettin' on my noives!"),t=e({thing:"This"});equal(t,"This is gettin' on my noives!","can do basic attribute interpolation");var a=_.template("A <% this %> B");equal(a(),"A  B");var l=_.template("<%= thing %> is \\ridanculous");equal(l({thing:"This"}),"This is \\ridanculous");var i=_.template('<%= a ? "checked=\\"checked\\"" : "" %>');equal(i({a:!0}),'checked="checked"',"can handle slash escapes in interpolations.");var n=_.template("<ul><%       for (var key in people) {     %><li><%= people[key] %></li><% } %></ul>");t=n({people:{moe:"Moe",larry:"Larry",curly:"Curly"}}),equal(t,"<ul><li>Moe</li><li>Larry</li><li>Curly</li></ul>","can run arbitrary javascript in templates");var u=_.template("<ul><% _.each(numbers.split('\\n'), function(item) { %><li><%= item %></li><% }) %></ul>");t=u({numbers:"one\ntwo\nthree\nfour"}),equal(t,"<ul><li>one</li><li>two</li><li>three</li><li>four</li></ul>","Can use escaped characters (e.g. \\n) in Javascript");var s=_.template('<%= pageCount %> <%= thumbnails[pageCount] %> <% _.each(thumbnails, function(p) { %><div class="thumbnail" rel="<%= p %>"></div><% }); %>');t=s({pageCount:3,thumbnails:{1:"p1-thumbnail.gif",2:"p2-thumbnail.gif",3:"p3-thumbnail.gif"}}),equal(t,'3 p3-thumbnail.gif <div class="thumbnail" rel="p1-thumbnail.gif"></div><div class="thumbnail" rel="p2-thumbnail.gif"></div><div class="thumbnail" rel="p3-thumbnail.gif"></div>');var r=_.template("<div><p>Just some text. Hey, I know this is silly but it aids consistency.</p></div>");t=r(),equal(t,"<div><p>Just some text. Hey, I know this is silly but it aids consistency.</p></div>");var o=_.template("It's its, not it's");equal(o({}),"It's its, not it's");var p=_.template("<%      if(foo == 'bar'){     %>Statement quotes and 'quotes'.<% } %>");equal(p({foo:"bar"}),"Statement quotes and 'quotes'.");var m=_.template("This\n		is: <%= x %>.\n	ok.\nend.");equal(m({x:"that"}),"This\n		is: that.\n	ok.\nend.");var c=_.template("<i><%- value %></i>"),t=c({value:"<script>"});equal(t,"<i>&lt;script&gt;</i>");var v={name:"Moe",template:_.template("I'm <%= this.name %>")};if(equal(v.template(),"I'm Moe"),!$.browser.msie){var d=_.template($("#template").html());equal(d({data:12345}).replace(/\s/g,""),"<li>24690</li>")}_.templateSettings={evaluate:/\{\{([\s\S]+?)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g};var f=_.template("<ul>{{ for (var key in people) { }}<li>{{= people[key] }}</li>{{ } }}</ul>");t=f({people:{moe:"Moe",larry:"Larry",curly:"Curly"}}),equal(t,"<ul><li>Moe</li><li>Larry</li><li>Curly</li></ul>","can run arbitrary javascript in templates");var q=_.template("It's its, not it's");equal(q({}),"It's its, not it's");var p=_.template("{{ if(foo == 'bar'){ }}Statement quotes and 'quotes'.{{ } }}");equal(p({foo:"bar"}),"Statement quotes and 'quotes'."),_.templateSettings={evaluate:/<\?([\s\S]+?)\?>/g,interpolate:/<\?=([\s\S]+?)\?>/g};var h=_.template("<ul><? for (var key in people) { ?><li><?= people[key] ?></li><? } ?></ul>");t=h({people:{moe:"Moe",larry:"Larry",curly:"Curly"}}),equal(t,"<ul><li>Moe</li><li>Larry</li><li>Curly</li></ul>","can run arbitrary javascript in templates");var y=_.template("It's its, not it's");equal(y({}),"It's its, not it's");var p=_.template("<? if(foo == 'bar'){ ?>Statement quotes and 'quotes'.<? } ?>");equal(p({foo:"bar"}),"Statement quotes and 'quotes'."),_.templateSettings={interpolate:/\{\{(.+?)\}\}/g};var g=_.template("Hello {{planet}}!");equal(g({planet:"World"}),"Hello World!","can mimic mustache.js");var b=_.template("a null undefined {{planet}}");equal(b({planet:"world"}),"a null undefined world","can handle missing escape and evaluate settings")}),test("_.template provides the generated function source, when a SyntaxError occurs",function(){try{_.template("<b><%= if x %></b>")}catch(e){var t=e.source}ok(/__p/.test(t))}),test("_.template handles \\u2028 & \\u2029",function(){var e=_.template('<p>\u2028<%= "\\u2028\\u2029" %>\u2029</p>');strictEqual(e(),"<p>\u2028\u2028\u2029\u2029</p>")}),test("result calls functions and returns primitives",function(){var e={w:"",x:"x",y:function(){return this.x}};strictEqual(_.result(e,"w"),""),strictEqual(_.result(e,"x"),"x"),strictEqual(_.result(e,"y"),"x"),strictEqual(_.result(e,"z"),void 0),strictEqual(_.result(null,"x"),null)}),test("_.templateSettings.variable",function(){var e="<%=data.x%>",t={x:"x"};strictEqual(_.template(e,t,{variable:"data"}),"x"),_.templateSettings.variable="data",strictEqual(_.template(e)(t),"x")}),test("#547 - _.templateSettings is unchanged by custom settings.",function(){ok(!_.templateSettings.variable),_.template("",{},{variable:"x"}),ok(!_.templateSettings.variable)}),test("#556 - undefined template variables.",function(){var e=_.template("<%=x%>");strictEqual(e({x:null}),""),strictEqual(e({x:void 0}),"");var t=_.template("<%-x%>");strictEqual(t({x:null}),""),strictEqual(t({x:void 0}),"");var a=_.template("<%=x.foo%>");strictEqual(a({x:{}}),""),strictEqual(a({x:{}}),"");var l=_.template("<%-x.foo%>");strictEqual(l({x:{}}),""),strictEqual(l({x:{}}),"")}),test("interpolate evaluates code only once.",2,function(){var e=0,t=_.template("<%= f() %>");t({f:function(){ok(!e++)}});var a=0,l=_.template("<%- f() %>");l({f:function(){ok(!a++)}})}),test("#746 - _.template settings are not modified.",1,function(){var e={};_.template("",null,e),deepEqual(e,{})}),test("#779 - delimeters are applied to unescaped text.",1,function(){var e=_.template("<<\nx\n>>",null,{evaluate:/<<(.*?)>>/g});strictEqual(e(),"<<\nx\n>>")})});