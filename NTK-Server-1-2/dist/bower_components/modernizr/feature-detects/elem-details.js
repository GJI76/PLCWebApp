Modernizr.addTest("details",function(){var e,t,n,r=document,i=r.createElement("details");return"open"in i?(t=r.body||function(){var t=r.documentElement;return e=!0,t.insertBefore(r.createElement("body"),t.firstElementChild||t.firstChild)}(),i.innerHTML="<summary>a</summary>b",i.style.display="block",t.appendChild(i),n=i.offsetHeight,i.open=!0,n=n!=i.offsetHeight,t.removeChild(i),e&&t.parentNode.removeChild(t),n):!1});