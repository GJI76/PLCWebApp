function sibling(e,n){do e=e[n];while(e&&1!==e.nodeType);return e}function winnow(e,n,t){if(n=n||0,jQuery.isFunction(n))return jQuery.grep(e,function(e,r){var i=!!n.call(e,r,e);return i===t});if(n.nodeType)return jQuery.grep(e,function(e){return e===n===t});if("string"==typeof n){var r=jQuery.grep(e,function(e){return 1===e.nodeType});if(isSimple.test(n))return jQuery.filter(n,r,!t);n=jQuery.filter(n,r)}return jQuery.grep(e,function(e){return jQuery.inArray(e,n)>=0===t})}var runtil=/Until$/,rparentsprev=/^(?:parents|prev(?:Until|All))/,isSimple=/^.[^:#\[\.,]*$/,rneedsContext=jQuery.expr.match.needsContext,guaranteedUnique={children:!0,contents:!0,next:!0,prev:!0};jQuery.fn.extend({find:function(e){var n,t,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(jQuery(e).filter(function(){for(n=0;i>n;n++)if(jQuery.contains(r[n],this))return!0}));for(t=[],n=0;i>n;n++)jQuery.find(e,this[n],t);return t=this.pushStack(i>1?jQuery.unique(t):t),t.selector=(this.selector?this.selector+" ":"")+e,t},has:function(e){var n,t=jQuery(e,this),r=t.length;return this.filter(function(){for(n=0;r>n;n++)if(jQuery.contains(this,t[n]))return!0})},not:function(e){return this.pushStack(winnow(this,e,!1))},filter:function(e){return this.pushStack(winnow(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?rneedsContext.test(e)?jQuery(e,this.context).index(this[0])>=0:jQuery.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,n){for(var t,r=0,i=this.length,u=[],s=rneedsContext.test(e)||"string"!=typeof e?jQuery(e,n||this.context):0;i>r;r++)for(t=this[r];t&&t.ownerDocument&&t!==n&&11!==t.nodeType;){if(s?s.index(t)>-1:jQuery.find.matchesSelector(t,e)){u.push(t);break}t=t.parentNode}return this.pushStack(u.length>1?jQuery.unique(u):u)},index:function(e){return e?"string"==typeof e?jQuery.inArray(this[0],jQuery(e)):jQuery.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,n){var t="string"==typeof e?jQuery(e,n):jQuery.makeArray(e&&e.nodeType?[e]:e),r=jQuery.merge(this.get(),t);return this.pushStack(jQuery.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),jQuery.fn.andSelf=jQuery.fn.addBack,jQuery.each({parent:function(e){var n=e.parentNode;return n&&11!==n.nodeType?n:null},parents:function(e){return jQuery.dir(e,"parentNode")},parentsUntil:function(e,n,t){return jQuery.dir(e,"parentNode",t)},next:function(e){return sibling(e,"nextSibling")},prev:function(e){return sibling(e,"previousSibling")},nextAll:function(e){return jQuery.dir(e,"nextSibling")},prevAll:function(e){return jQuery.dir(e,"previousSibling")},nextUntil:function(e,n,t){return jQuery.dir(e,"nextSibling",t)},prevUntil:function(e,n,t){return jQuery.dir(e,"previousSibling",t)},siblings:function(e){return jQuery.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return jQuery.sibling(e.firstChild)},contents:function(e){return jQuery.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:jQuery.merge([],e.childNodes)}},function(e,n){jQuery.fn[e]=function(t,r){var i=jQuery.map(this,n,t);return runtil.test(e)||(r=t),r&&"string"==typeof r&&(i=jQuery.filter(r,i)),i=this.length>1&&!guaranteedUnique[e]?jQuery.unique(i):i,this.length>1&&rparentsprev.test(e)&&(i=i.reverse()),this.pushStack(i)}}),jQuery.extend({filter:function(e,n,t){return t&&(e=":not("+e+")"),1===n.length?jQuery.find.matchesSelector(n[0],e)?[n[0]]:[]:jQuery.find.matches(e,n)},dir:function(e,n,t){for(var r=[],i=e[n];i&&9!==i.nodeType&&(void 0===t||1!==i.nodeType||!jQuery(i).is(t));)1===i.nodeType&&r.push(i),i=i[n];return r},sibling:function(e,n){for(var t=[];e;e=e.nextSibling)1===e.nodeType&&e!==n&&t.push(e);return t}});