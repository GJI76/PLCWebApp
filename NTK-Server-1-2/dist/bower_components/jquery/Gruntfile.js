module.exports=function(e){var s=["dist/jquery.js","dist/jquery.min.map","dist/jquery.min.js"],r=function(s){var r={};try{r=e.file.readJSON(s)}catch(t){}return r};e.initConfig({pkg:e.file.readJSON("package.json"),dst:r("dist/.destination.json"),compare_size:{files:s},selector:{destFile:"src/selector.js",apiFile:"src/sizzle-jquery.js",srcFile:"src/sizzle/sizzle.js"},build:{all:{dest:"dist/jquery.js",src:["src/intro.js","src/core.js","src/callbacks.js","src/deferred.js","src/support.js","src/data.js","src/queue.js","src/attributes.js","src/event.js","src/selector.js","src/traversing.js","src/manipulation.js",{flag:"css",src:"src/css.js"},"src/serialize.js",{flag:"event-alias",src:"src/event-alias.js"},{flag:"ajax",src:"src/ajax.js"},{flag:"ajax/script",src:"src/ajax/script.js",needs:["ajax"]},{flag:"ajax/jsonp",src:"src/ajax/jsonp.js",needs:["ajax","ajax/script"]},{flag:"ajax/xhr",src:"src/ajax/xhr.js",needs:["ajax"]},{flag:"effects",src:"src/effects.js",needs:["css"]},{flag:"offset",src:"src/offset.js",needs:["css"]},{flag:"dimensions",src:"src/dimensions.js",needs:["css"]},{flag:"deprecated",src:"src/deprecated.js"},"src/exports.js","src/outro.js"]}},jshint:{dist:{src:["dist/jquery.js"],options:{jshintrc:"src/.jshintrc"}},grunt:{src:["Gruntfile.js"],options:{jshintrc:".jshintrc"}},tests:{src:["test/data/{test,testinit,testrunner}.js","test/unit/**/*.js"],options:{jshintrc:"test/.jshintrc"}}},testswarm:{tests:"ajax attributes callbacks core css data deferred dimensions effects event manipulation offset queue selector serialize support traversing Sizzle".split(" ")},watch:{files:["<%= jshint.grunt.src %>","<%= jshint.tests.src %>","src/**/*.js"],tasks:"dev"},uglify:{all:{files:{"dist/jquery.min.js":["dist/jquery.js"]},options:{banner:"/*! jQuery v<%= pkg.version %> | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license */",sourceMap:"dist/jquery.min.map",compress:{hoist_funs:!1,join_vars:!1,loops:!1,unused:!1},beautify:{ascii_only:!0}}}}}),e.registerTask("testswarm",function(s,r){var t,i=require("testswarm"),n=[],a=/PR-(\d+)/.exec(s),c=e.file.readJSON(r).jquery,o=e.config([this.name,"tests"]);t=a?"jQuery pull <a href='https://github.com/jquery/jquery/pull/"+a[1]+"'>#"+a[1]+"</a>":"jQuery commit #<a href='https://github.com/jquery/jquery/commit/"+s+"'>"+s.substr(0,10)+"</a>",o.forEach(function(e){n.push(c.testUrl+s+"/test/index.html?module="+e)}),i({url:c.swarmUrl,pollInterval:1e4,timeout:18e5,done:this.async()},{authUsername:c.authUsername,authToken:c.authToken,jobName:t,runMax:c.runMax,"runNames[]":o,"runUrls[]":n,"browserSets[]":c.browserSets})}),e.registerTask("selector","Build src/selector.js",function(){var s,r,t=e.config("selector"),i=t.destFile,n={api:e.file.read(t.apiFile),src:e.file.read(t.srcFile)};return r=n.src.split("// EXPOSE"),r[1]=n.api,s=r.join(""),e.verbose.write("Injected sizzle-jquery.js into sizzle.js"),e.file.write(i,s.replace(/\x0d\x0a/g,"\n")),this.errorCount?!1:void e.log.writeln("File '"+i+"' created.")}),e.registerTask("custom",function(){var s=this.async(),r=[].slice.call(arguments),t=r.length?r[0].replace(/,/g,":"):"";e.log.writeln("Creating custom build...\n"),e.util.spawn({cmd:"win32"===process.platform?"grunt.cmd":"grunt",args:["build:*:*:"+t,"uglify","dist"]},function(r,t){return r?(e.verbose.error(),void s(r)):(e.log.writeln(t.stdout.replace("Done, without errors.","")),void s())})}),e.registerMultiTask("build","Concatenate source (include/exclude modules with +/- flags), embed date/version",function(){var s="",r=this.flags,t=!r["*"],i=t||Object.keys(r).length>1,n=this.data.dest,a=this.data.src,c={},o={},l=e.config("pkg.version"),u=function(e,s){!t||r[e]||r["+"+e]||(o[e]=!1),o[s]||r["-"+e]?o[e]=!0:o[s]===!1&&(r[e]||r["+"+e])&&(delete o[s],c[s]&&c[s].forEach(function(e){r[s]=!0,u(s,e)}))};return process.env.COMMIT&&(l+=" "+process.env.COMMIT),a.forEach(function(e){var s=e.flag;s&&(u(s),e.needs&&(c[s]=e.needs,e.needs.forEach(function(e){u(s,e)})))}),Object.keys(o).length&&(l+=" -"+Object.keys(o).join(",-"),e.config.set("pkg.version",l)),a.forEach(function(t){var n=t.flag,a=!1,c=!1,l="";n&&(void 0!==o[n]?(l=("Excluding "+n).red,a=!0,c=!0):(l=("Including "+n).green,r["+"+n]&&(a=!0)),i&&a&&e.log.writetableln([27,30],[l,("("+t.src+")").grey]),t=t.src),c||(s+=e.file.read(t))}),s=s.replace(/@VERSION/g,l).replace("@DATE",function(){var e=new Date;return[e.getFullYear(),e.getMonth()+1,e.getDate()].join("-")}),e.file.write(n,s),this.errorCount?!1:void e.log.writeln("File '"+n+"' created.")}),e.registerTask("dist",function(){var r,t,i;i=Object.keys(e.config("dst")),r=Object.keys(this.flags),t=[].concat(i,r).filter(function(e){return"*"!==e});var n=require("fs"),a=!1;return s.forEach(function(s){var r,i,c,o=n.readFileSync(s,"utf8");if(/\x0d\x0a/.test(o)&&(e.log.writeln(s+": Incorrect line endings (\\r\\n)"),a=!0),o.length!==Buffer.byteLength(o,"utf8")){for(e.log.writeln(s+": Non-ASCII characters detected:"),r=0;r<o.length;r++)if(i=o.charCodeAt(r),i>127){e.log.writeln("- position "+r+": "+i),e.log.writeln("-- "+o.substring(r-20,r+20));break}a=!0}/\.map$/.test(s)?(o=o.replace(/"dist\//g,'"'),n.writeFileSync(s,o,"utf-8")):/\.min\.js$/.test(s)&&(o=o.replace(/\n?(\/\/@\s*sourceMappingURL=)(.*)/,function(e,s,r){return c="\n"+s+r.replace(/^dist\//,""),""}),c&&(o=o.replace(/(^\/\*[\w\W]*?)\s*\*\/|$/,function(e,s){return(s||"\n/*")+c+"\n*/"})),n.writeFileSync(s,o,"utf-8")),t.forEach(function(r){var t;/\/$/.test(r)||(r+="/"),t=r+s.replace("dist/",""),e.file.write(t,o),e.log.writeln("File '"+t+"' created.")})}),!a}),e.loadNpmTasks("grunt-compare-size"),e.loadNpmTasks("grunt-git-authors"),e.loadNpmTasks("grunt-update-submodules"),e.loadNpmTasks("grunt-contrib-watch"),e.loadNpmTasks("grunt-contrib-jshint"),e.loadNpmTasks("grunt-contrib-uglify"),e.registerTask("default",["update_submodules","selector","build:*:*","jshint","uglify","dist:*"]),e.registerTask("dev",["selector","build:*:*","jshint"])};