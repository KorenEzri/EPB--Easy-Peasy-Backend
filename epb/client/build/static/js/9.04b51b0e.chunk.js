(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{544:function(e,t,n){"use strict";n.r(t),n.d(t,"ItemInput",(function(){return l}));var i=n(519),r=n(162),o=n(0);function a(e){return o.createElement(c,null)}var c=r.b.div.withConfig({componentId:"sc-1v9pdjf-0"})([""]);function l(e){var t=e.items,n=e.setItems,r=o.useState(""),c=Object(i.a)(r,2),l=c[0],u=c[1],s=function(){var e=l.trim();if(e=e.replace(/,/g,"")){var i=t.items.concat([e]);n({items:i}),u("")}},m=function(){var e=t.items,i=e.pop();n({items:e}),i&&u(i)};return o.createElement(p,null,o.createElement("ul",null,t.items.map((function(e,i){return""===e?null:o.createElement("li",{key:"".concat(e,", ").concat(i)+12*Math.random(),onClick:function(e){!function(e){var i=e.target.innerText,r=t.items.filter((function(e){return e!==i}));n({items:r})}(e)}},e)}))),o.createElement("input",{type:"text",placeholder:"amount: Int, currency: String..",value:l,onChange:function(e){u(e.target.value)},onKeyUp:function(e){var t=e.key;"Enter"!==t&&","!==t||s()},onKeyDown:function(e){"Backspace"!==e.key||l||m()}}),o.createElement("span",{onClick:s},o.createElement(a,null)))}var p=r.b.div.withConfig({componentId:"sc-1dpxkb2-0"})(["ul{margin-left:-35px;margin-top:-5px;li{list-style-type:none;display:inline;position:relative;margin:4px;top:10px;padding:3px;border-radius:6px;white-space:nowrap;cursor:pointer;&:hover::before{content:' [x] ';font-weight:bold;}margin:4px;&:after{content:',';}}}"])}}]);