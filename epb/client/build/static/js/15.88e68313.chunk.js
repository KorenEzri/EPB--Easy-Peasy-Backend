(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[15],{520:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(165);function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,i=!1,o=void 0;try{for(var a,c=t[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(u){i=!0,o=u}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}return n}}(t,e)||Object(r.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},560:function(t,e,n){"use strict";n.r(e),n.d(e,"ItemInput",(function(){return u}));var r=n(520),i=n(71),o=n(0);function a(t){return o.createElement(c,null)}var c=i.b.div.withConfig({componentId:"sc-1v9pdjf-0"})([""]);function u(t){var e=t.items,n=t.setItems,i=o.useState(""),c=Object(r.a)(i,2),u=c[0],p=c[1],s=function(){var t=u.trim();if(t=t.replace(/,/g,"")){var r=e.items.concat([t]);n({items:r}),p("")}},f=function(){var t=e.items,r=t.pop();n({items:t}),r&&p(r)};return o.createElement(l,null,o.createElement("ul",null,e.items.map((function(t,r){return""===t?null:o.createElement("li",{key:"".concat(t,", ").concat(r)+12*Math.random(),onClick:function(t){!function(t){var r=t.target.innerText,i=e.items.filter((function(t){return t!==r}));n({items:i})}(t)}},t)}))),o.createElement("input",{type:"text",placeholder:"amount: Int, currency: String..",value:u,onChange:function(t){p(t.target.value)},onKeyUp:function(t){var e=t.key;"Enter"!==e&&","!==e||s()},onKeyDown:function(t){"Backspace"!==t.key||u||f()}}),o.createElement("span",{onClick:s},o.createElement(a,null)))}var l=i.b.div.withConfig({componentId:"sc-1dpxkb2-0"})(["ul{margin-left:-35px;margin-top:-5px;li{list-style-type:none;display:inline;position:relative;margin:4px;top:10px;padding:3px;border-radius:6px;white-space:nowrap;cursor:pointer;&:hover::before{content:' [x] ';font-weight:bold;}margin:4px;&:after{content:',';}}}"])}}]);