jQuery.support=function(){var e,t,n,o,i,l,d,a,s,c,r=document.createElement("div");if(r.setAttribute("className","t"),r.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",t=r.getElementsByTagName("*"),n=r.getElementsByTagName("a")[0],!t||!n||!t.length)return{};i=document.createElement("select"),d=i.appendChild(document.createElement("option")),o=r.getElementsByTagName("input")[0],n.style.cssText="top:1px;float:left;opacity:.5",e={getSetAttribute:"t"!==r.className,leadingWhitespace:3===r.firstChild.nodeType,tbody:!r.getElementsByTagName("tbody").length,htmlSerialize:!!r.getElementsByTagName("link").length,style:/top/.test(n.getAttribute("style")),hrefNormalized:"/a"===n.getAttribute("href"),opacity:/^0.5/.test(n.style.opacity),cssFloat:!!n.style.cssFloat,checkOn:!!o.value,optSelected:d.selected,enctype:!!document.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==document.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===document.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},o.checked=!0,e.noCloneChecked=o.cloneNode(!0).checked,i.disabled=!0,e.optDisabled=!d.disabled;try{delete r.test}catch(p){e.deleteExpando=!1}o=document.createElement("input"),o.setAttribute("value",""),e.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),e.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=document.createDocumentFragment(),l.appendChild(o),e.appendChecked=o.checked,e.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,r.attachEvent&&(r.attachEvent("onclick",function(){e.noCloneEvent=!1}),r.cloneNode(!0).click());for(c in{submit:!0,change:!0,focusin:!0})r.setAttribute(a="on"+c,"t"),e[c+"Bubbles"]=a in window||r.attributes[a].expando===!1;return r.style.backgroundClip="content-box",r.cloneNode(!0).style.backgroundClip="",e.clearCloneStyle="content-box"===r.style.backgroundClip,jQuery(function(){var t,n,o,i="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=document.getElementsByTagName("body")[0];l&&(t=document.createElement("div"),t.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(t).appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=r.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",s=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",e.reliableHiddenOffsets=s&&0===o[0].offsetHeight,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",e.boxSizing=4===r.offsetWidth,e.doesNotIncludeMarginInBodyOffset=1!==l.offsetTop,window.getComputedStyle&&(e.pixelPosition="1%"!==(window.getComputedStyle(r,null)||{}).top,e.boxSizingReliable="4px"===(window.getComputedStyle(r,null)||{width:"4px"}).width,n=r.appendChild(document.createElement("div")),n.style.cssText=r.style.cssText=i,n.style.marginRight=n.style.width="0",r.style.width="1px",e.reliableMarginRight=!parseFloat((window.getComputedStyle(n,null)||{}).marginRight)),typeof r.style.zoom!==core_strundefined&&(r.innerHTML="",r.style.cssText=i+"width:1px;padding:1px;display:inline;zoom:1",e.inlineBlockNeedsLayout=3===r.offsetWidth,r.style.display="block",r.innerHTML="<div></div>",r.firstChild.style.width="5px",e.shrinkWrapBlocks=3!==r.offsetWidth,e.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(t),t=r=o=n=null)}),t=i=l=d=n=o=null,e}();