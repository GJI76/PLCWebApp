jQuery.each({Height:"height",Width:"width"},function(e,n){jQuery.each({padding:"inner"+e,content:n,"":"outer"+e},function(t,o){jQuery.fn[o]=function(o,r){var u=arguments.length&&(t||"boolean"!=typeof o),i=t||(o===!0||r===!0?"margin":"border");return jQuery.access(this,function(n,t,o){var r;return jQuery.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(r=n.documentElement,Math.max(n.body["scroll"+e],r["scroll"+e],n.body["offset"+e],r["offset"+e],r["client"+e])):void 0===o?jQuery.css(n,t,i):jQuery.style(n,t,o,i)},n,u?o:void 0,u,null)}})});