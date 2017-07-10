!function(t){"use strict";function e(t){return void 0===t||null===t||!t.length}function n(t){var e=/\./.test(1.1.toLocaleString())?".":",",n=new RegExp("\\"+e+"\\d+$");return Math.round(t).toLocaleString().replace(n,"")}function o(t,e,n,r){var i=e.split(" ");if(t instanceof NodeList)for(var a=0;a<t.length;a++)t[a]instanceof Node&&o(t[a],arguments[1],arguments[2],arguments[3]);else for(var c=0;c<i.length;c++)t[r?"addEventListener":"removeEventListener"](i[c],n,!1)}function r(t,e,n){t&&o(t,e,n,!0)}function i(t,e){for(var n in e)e[n]&&e[n].constructor&&e[n].constructor===Object?(t[n]=t[n]||{},i(t[n],e[n])):t[n]=e[n];return t}function a(t,e){if(e.network in k.popup){t.preventDefault();var n=k.popup[e.network],o=e.link.href,r=n.width,i=n.height,a="window-"+e.network;if(window[a]&&!window[a].closed)window[a].focus();else{var c=void 0!==window.screenLeft?window.screenLeft:screen.left,u=void 0!==window.screenTop?window.screenTop:screen.top,l=screen.width/2-r/2+c,s=screen.height/2-i/2+u;window[a]=window.open(o,e.network,"top="+s+",left="+l+",width="+r+",height="+i),window[a].focus()}window[a].opener=null}}function c(t,e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(t);return null===n?"":decodeURIComponent(n[1].replace(/\+/g," "))}function u(t,e){var n="jsonp_callback_"+Math.round(1e5*Math.random());window[n]=function(t){delete window[n],document.body.removeChild(o),e(t)};var o=document.createElement("script");o.setAttribute("src",t+(t.indexOf("?")>=0?"&":"?")+"callback="+n),document.body.appendChild(o)}function l(){k.storage.enabled&&k.storage.key in window.localStorage&&(v={data:JSON.parse(window.localStorage[k.storage.key]),ttl:window.localStorage[k.storage.key+"_ttl"]})}function s(t){k.storage.enabled&&(window.localStorage[k.storage.key]=JSON.stringify(t),window.localStorage[k.storage.key+"_ttl"]=Date.now()+k.storage.ttl)}function d(t){switch(t.network){case"facebook":return c(t.link.search,"u");case"github":return t.link.pathname;default:return c(t.link.search,"url")}}function w(t){if(t.network in k.urls)switch(t.network){case"github":return k.urls[t.network](d(t),k.tokens.github);default:return k.urls[t.network](encodeURIComponent(t.url))}return null}function f(t,n){var o=w(t);if(!e(o)&&k.storage.enabled){var r=d(t);if(r in v.data&&t.network in v.data[r]&&v.ttl>Date.now())return void n(v.data[r][t.network])}e(o)||u(o,function(e){k.storage.enabled&&(r in v.data||(v.data[r]={}),v.data[r][t.network]=e,s(v.data)),n(e)})}function h(t,e){return t in k.count.prefix?e[k.count.prefix[t]]:e}function g(t,o){var r,i,a=t.link.getAttribute("data-shr-display");o=h(t.network,o),r=e(a)?t.network in k.count.value?o[k.count.value[t.network]]:o.count:o[a],t.count="number"==typeof r?r:0,i=t.count,i=k.count.format&&t.count>1e6?Math.round(t.count/1e6)+"M":k.count.format&&t.count>1e3?Math.round(t.count/1e3)+"K":n(t.count),(t.count>0||k.count.displayZero)&&t.link.insertAdjacentHTML("after"===k.count.position?"afterend":"beforebegin",k.count.html(i,k.count.classname))}function p(t){var e=this;return void 0===t?(y("No share link found."),!1):(e.link=t,e.network=t.getAttribute("data-shr-network"),e.url=d(e),f(e,function(t){g(e,t)}),r(e.link,"click",function(t){a(t,e)}),e)}var k,v={data:{},ttl:0},b={selector:"[data-shr-network]",count:{classname:"share-count",displayZero:!0,format:!1,position:"after",html:function(t,e){return'<span class="'+e+'">'+t+"</span>"},value:{facebook:"shares",github:"stargazers_count"},prefix:{github:"data"}},urls:{facebook:function(t){return"https://graph.facebook.com/?id="+t},pinterest:function(t){return"https://widgets.pinterest.com/v1/urls/count.json?url="+t},github:function(t,e){return"https://api.github.com/repos"+t+("string"==typeof e?"?access_token="+e:"")}},popup:{google:{width:500,height:500},facebook:{width:640,height:270},twitter:{width:640,height:240},pinterest:{width:750,height:550}},storage:{key:"shr",enabled:function(){if("localStorage"in window&&null!==window.localStorage)return!1;try{window.localStorage.setItem("___test","OK");var t=window.localStorage.getItem("___test");return window.localStorage.removeItem("___test"),"OK"===t}catch(t){return!1}return!1}(),ttl:3e5},tokens:{}},m=function(){},y=function(){};t.setup=function(t,e){"string"==typeof t?t=document.querySelectorAll(t):t instanceof HTMLElement?t=[t]:t instanceof NodeList||"string"==typeof t||(void 0===e&&"object"==typeof t&&(e=t),t=document.querySelectorAll(b.selector)),k=i(b,e),l();for(var n=t.length-1;n>=0;n--){var o=t[n];if(void 0===o.shr){var r=new p(o);o.shr=!!Object.keys(r).length&&r}}k.debug&&window.console&&(m=window.console.log.bind(console),y=window.console.error.bind(console))}}(this.shr=this.shr||{});