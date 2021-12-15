!function(){"use strict";var e,i,t=!1;function n(e){if(t&&window.top!==window.self){var i=window;"srcdoc"===i.location.pathname&&(i=i.parent);var n,o=(n={},window._Flourish_template_id&&(n.template_id=window._Flourish_template_id),window.Flourish&&window.Flourish.app&&window.Flourish.app.loaded_template_id&&(n.template_id=window.Flourish.app.loaded_template_id),window._Flourish_visualisation_id&&(n.visualisation_id=window._Flourish_visualisation_id),window.Flourish&&window.Flourish.app&&window.Flourish.app.loaded_visualisation&&(n.visualisation_id=window.Flourish.app.loaded_visualisation.id),window.Flourish&&window.Flourish.app&&window.Flourish.app.story&&(n.story_id=window.Flourish.app.story.id,n.slide_count=window.Flourish.app.story.slides.length),window.Flourish&&window.Flourish.app&&window.Flourish.app.current_slide&&(n.slide_index=window.Flourish.app.current_slide.index+1),n),r={sender:"Flourish",method:"customerAnalytics"};for(var a in o)o.hasOwnProperty(a)&&(r[a]=o[a]);for(var a in e)e.hasOwnProperty(a)&&(r[a]=e[a]);i.parent.postMessage(JSON.stringify(r),"*")}}function o(e){if("function"!=typeof e)throw new Error("Analytics callback is not a function");window.Flourish._analytics_listeners.push(e)}function r(){t=!0;[{event_name:"click",action_name:"click",use_capture:!0},{event_name:"keydown",action_name:"key_down",use_capture:!0},{event_name:"mouseenter",action_name:"mouse_enter",use_capture:!1},{event_name:"mouseleave",action_name:"mouse_leave",use_capture:!1}].forEach((function(e){document.body.addEventListener(e.event_name,(function(){n({action:e.action_name})}),e.use_capture)}))}function a(){if(null==e){var i=function(){var e=window.location;"about:srcdoc"==e.href&&(e=window.parent.location);var i={};return function(e,t,n){for(;n=t.exec(e);)i[decodeURIComponent(n[1])]=decodeURIComponent(n[2])}(e.search.substring(1).replace(/\+/g,"%20"),/([^&=]+)=?([^&]*)/g),i}();e="referrer"in i?/^https:\/\/medium.com\//.test(i.referrer):!("auto"in i)}return e}function s(e){var i=e||window.innerWidth;return i>999?650:i>599?575:400}function l(e,t){if(window.top!==window.self){var n=window;if("srcdoc"==n.location.pathname&&(n=n.parent),i)return e=parseInt(e,10),void n.parent.postMessage({sentinel:"amp",type:"embed-size",height:e},"*");var o={sender:"Flourish",context:"iframe.resize",method:"resize",height:e,src:n.location.toString()};if(t)for(var r in t)o[r]=t[r];n.parent.postMessage(JSON.stringify(o),"*")}}function d(){return(-1!==navigator.userAgent.indexOf("Safari")||-1!==navigator.userAgent.indexOf("iPhone"))&&-1==navigator.userAgent.indexOf("Chrome")}function u(e){window.addEventListener("message",(function(i){if(null!=i.source&&(i.origin===document.location.origin||i.origin.match(/\/\/localhost:\d+$|\/\/flourish-api\.com$|\.flourish\.(?:local(:\d+)?|net|rocks|studio)$|\.uri\.sh$/))){var t;try{t=JSON.parse(i.data)}catch(e){return void console.warn("Unexpected non-JSON message: "+JSON.stringify(i.data))}if("Flourish"===t.sender){for(var n=document.querySelectorAll("iframe"),o=0;o<n.length;o++)if(n[o].contentWindow==i.source||n[o].contentWindow==i.source.parent)return void e(t,n[o]);console.warn("could not find frame",t)}}})),d()&&(window.addEventListener("resize",h),h())}function h(){for(var e=document.querySelectorAll(".flourish-embed"),i=0;i<e.length;i++){var t=e[i];if(!t.getAttribute("data-width")){var n=t.querySelector("iframe");if(n){var o=window.getComputedStyle(t),r=t.offsetWidth-parseFloat(o.paddingLeft)-parseFloat(o.paddingRight);n.style.width=r+"px"}}}}function c(e,i,t,n,o){var r=document.createElement("iframe");if(r.setAttribute("scrolling","no"),r.setAttribute("frameborder","0"),r.setAttribute("title","Interactive or visual content"),r.setAttribute("sandbox","allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"),i.appendChild(r),r.offsetParent||"fixed"===getComputedStyle(r).position)f(e,i,r,t,n,o);else{var a={embed_url:e,container:i,iframe:r,width:t,height:n,play_on_load:o};if(window._flourish_poll_items?window._flourish_poll_items.push(a):window._flourish_poll_items=[a],window._flourish_poll_items.length>1)return r;var s=setInterval((function(){window._flourish_poll_items=window._flourish_poll_items.filter((function(e){return!e.iframe.offsetParent||(f(e.embed_url,e.container,e.iframe,e.width,e.height,e.play_on_load),!1)})),window._flourish_poll_items.length||clearInterval(s)}),500)}return r}function f(e,i,t,n,o,r){var a;return n&&"number"==typeof n?(a=n,n+="px"):n&&n.match(/^[ \t\r\n\f]*([+-]?\d+|\d*\.\d+(?:[eE][+-]?\d+)?)(?:\\?[Pp]|\\0{0,4}[57]0(?:\r\n|[ \t\r\n\f])?)(?:\\?[Xx]|\\0{0,4}[57]8(?:\r\n|[ \t\r\n\f])?)[ \t\r\n\f]*$/)&&(a=parseFloat(n)),o&&"number"==typeof o&&(o+="px"),n?t.style.width=n:d()?t.style.width=i.offsetWidth+"px":t.style.width="100%",!!o||(e.match(/\?/)?e+="&auto=1":e+="?auto=1",o=s(a||t.offsetWidth)+"px"),o&&("%"===o.charAt(o.length-1)&&(o=parseFloat(o)/100*i.parentNode.offsetHeight+"px"),t.style.height=o),t.setAttribute("src",e+(r?"#play-on-load":"")),t}function w(e){return!Array.isArray(e)&&"object"==typeof e&&null!=e}function p(e,i){for(var t in i)w(e[t])&&w(i[t])?p(e[t],i[t]):e[t]=i[t];return e}!function(){var e,t=window.top===window.self,h=t?null:(i="#amp=1"==window.location.hash,{createEmbedIframe:c,isFixedHeight:a,getHeightForBreakpoint:s,startEventListeners:u,notifyParentWindow:l,isSafari:d,initCustomerAnalytics:r,addAnalyticsListener:o,sendCustomerAnalyticsMessage:n}),f=!0;function w(){var i;Flourish.fixed_height||(null!=e?i=e:f&&(i=h.getHeightForBreakpoint()),i!==window.innerHeight&&h.notifyParentWindow(i))}function m(){w(),window.addEventListener("resize",w)}Flourish.warn=function(e){if("string"==typeof e&&(e={message:e}),t||"editor"!==Flourish.environment)console.warn(e.message);else{var i={sender:"Flourish",method:"warn",message:e.message,explanation:e.explanation};window.parent.postMessage(JSON.stringify(i),"*")}},Flourish.uploadImage=function(e){if(t||"story_editor"!==Flourish.environment)throw"Invalid upload request";var i={sender:"Flourish",method:"request-upload",name:e.name,accept:e.accept};window.parent.postMessage(JSON.stringify(i),"*")},Flourish.setSetting=function(e,i){if("editor"===Flourish.environment||"sdk"===Flourish.environment){var t={sender:"Flourish",method:"setSetting",name:e,value:i};window.parent.postMessage(JSON.stringify(t),"*")}else if("story_editor"===Flourish.environment){var n={};n[e]=i,p(window.template.state,function(e){var i={};for(var t in e){for(var n=i,o=t.indexOf("."),r=0;o>=0;o=t.indexOf(".",r=o+1)){var a=t.substring(r,o);a in n||(n[a]={}),n=n[a]}n[t.substring(r)]=e[t]}return i}(n))}},Flourish.setHeight=function(i){Flourish.fixed_height||(e=i,f=null==i,w())},Flourish.checkHeight=function(){if(!t){var e=Flourish.__container_height;null!=e?(Flourish.fixed_height=!0,h.notifyParentWindow(e)):h.isFixedHeight()?Flourish.fixed_height=!0:(Flourish.fixed_height=!1,w())}},Flourish.fixed_height=t||h.isFixedHeight(),Flourish.enableCustomerAnalytics=function(){h&&h.initCustomerAnalytics()},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",m):m()}()}();
//# sourceMappingURL=embedded.js.map
