define(["backbone","rivets","views/item/WidgetMulti","text!./template.js","utils/SignalChainFunctions","utils/SignalChainClasses"],function(t,e,i,n){return i.extend({ins:[{title:"in1",to:"in1"}],outs:[{title:"out1",from:"output",to:"out1"}],widgetEvents:{"blur .database":"outputText","change .select_language":"updateCountry","mousedown .listen":"listenStart","mouseup .listen":"listenStop"},sources:[],typeID:"SpeechIn",className:"speechin",categories:["generator"],template:_.template(n),initialize:function(t){i.prototype.initialize.call(this,t),this.model.set({title:"SpeechIn",in1:0,output:"",threshold:512,lastIn:-1,final_transcript:"",recognizing:!1,ignore_onend:!1,start_timestamp:0,continuous:!1,language:6,dialect:"en-US"})},onRender:function(){if(i.prototype.onRender.call(this),!app.server){this.$(".listen").css("cursor","pointer");var t=this;if(t.model.set("output",""),t.model.set("final_transcript",""),"webkitSpeechRecognition"in window){this.select_language=this.$(".select_language").get(0),this.select_dialect=this.$(".select_dialect").get(0),this.setLanguages(),this.recognition=new webkitSpeechRecognition,this.recognition.continuous=!0,this.recognition.interimResults=!0;var t=this;this.recognition.onstart=function(){t.model.set("recognizing",!0)},this.recognition.onerror=function(e){"no-speech"==e.error&&t.model.set("ignore_onend",!0),"audio-capture"==e.error&&t.model.set("ignore_onend",!0),"not-allowed"==e.error&&(e.timeStamp-start_timestamp<100,t.model.set("ignore_onend",!0))},this.recognition.onend=function(){t.model.set("recognizing",!1),t.$(".title").css({color:"white"}),!t.model.get("final_transcript")},this.recognition.onresult=function(e){var i="";if("undefined"==typeof e.results)return t.recognition.onend=null,void t.recognition.stop();for(var n=e.resultIndex;n<e.results.length;++n)e.results[n].isFinal?(t.$(".transcript").css({"background-color":"lime"}),i+=e.results[n][0].transcript,t.model.set("final_transcript",i),!t.model.get("continuous")&&t.model.get("recognizing")&&t.recognition.stop(),t.model.set("output",t.model.get("final_transcript"))):(t.model.set("output",""),t.$(".transcript").css({"background-color":"yellow"}),i+=e.results[n][0].transcript);t.model.set("final_transcript",i)}}else alert("Browser not supported for speech recognition")}},onModelChange:function(t){if(void 0!==t.changedAttributes().in1){var e=parseFloat(this.model.get("in1")),i=this.model.get("threshold");this.model.get("lastIn")<i&&e>=i?(this.model.set("final_transcript",""),this.recognition.stop(),this.recognition.lang=this.select_dialect.value,this.recognition.start(),this.model.set("ignore_onend",!1),this.model.set("start_timestamp",Date.now()),this.$(".transcript").css({"background-color":"yellow"}),this.$(".title").css({color:"red"})):this.model.get("lastIn")>=i&&i>e&&this.model.get("recognizing")&&this.recognition.stop(),this.model.set("lastIn",e)}},outputText:function(){this.model.set("output",this.model.get("final_transcript"))},listenStart:function(){this.model.set("in1",1023)},listenStop:function(){this.model.set("in1",0)},setLanguages:function(){this.langs=[["Afrikaans",["af-ZA"]],["Bahasa Indonesia",["id-ID"]],["Bahasa Melayu",["ms-MY"]],["Català",["ca-ES"]],["Čeština",["cs-CZ"]],["Deutsch",["de-DE"]],["English",["en-AU","Australia"],["en-CA","Canada"],["en-IN","India"],["en-NZ","New Zealand"],["en-ZA","South Africa"],["en-GB","United Kingdom"],["en-US","United States"]],["Español",["es-AR","Argentina"],["es-BO","Bolivia"],["es-CL","Chile"],["es-CO","Colombia"],["es-CR","Costa Rica"],["es-EC","Ecuador"],["es-SV","El Salvador"],["es-ES","España"],["es-US","Estados Unidos"],["es-GT","Guatemala"],["es-HN","Honduras"],["es-MX","México"],["es-NI","Nicaragua"],["es-PA","Panamá"],["es-PY","Paraguay"],["es-PE","Perú"],["es-PR","Puerto Rico"],["es-DO","República Dominicana"],["es-UY","Uruguay"],["es-VE","Venezuela"]],["Euskara",["eu-ES"]],["Français",["fr-FR"]],["Galego",["gl-ES"]],["Hrvatski",["hr_HR"]],["IsiZulu",["zu-ZA"]],["Íslenska",["is-IS"]],["Italiano",["it-IT","Italia"],["it-CH","Svizzera"]],["Magyar",["hu-HU"]],["Nederlands",["nl-NL"]],["Norsk bokmål",["nb-NO"]],["Polski",["pl-PL"]],["Português",["pt-BR","Brasil"],["pt-PT","Portugal"]],["Română",["ro-RO"]],["Slovenčina",["sk-SK"]],["Suomi",["fi-FI"]],["Svenska",["sv-SE"]],["Türkçe",["tr-TR"]],["български",["bg-BG"]],["Pусский",["ru-RU"]],["Српски",["sr-RS"]],["한국어",["ko-KR"]],["中文",["cmn-Hans-CN","普通话 (中国大陆)"],["cmn-Hans-HK","普通话 (香港)"],["cmn-Hant-TW","中文 (台灣)"],["yue-Hant-HK","粵語 (香港)"]],["日本語",["ja-JP"]],["Lingua latīna",["la"]]];for(var t=0;t<this.langs.length;t++)this.select_language.options[t]=new Option(this.langs[t][0],t);this.select_language.selectedIndex=this.model.get("language"),this.updateCountry(),this.select_dialect.value=this.model.get("dialect")},updateCountry:function(){for(var t=this.select_dialect.options.length-1;t>=0;t--)this.select_dialect.remove(t);for(var e=this.langs[this.select_language.selectedIndex],t=1;t<e.length;t++)this.select_dialect.options.add(new Option(e[t][1],e[t][0]));this.select_dialect.style.visibility=1==e[1].length?"hidden":"visible"}})});