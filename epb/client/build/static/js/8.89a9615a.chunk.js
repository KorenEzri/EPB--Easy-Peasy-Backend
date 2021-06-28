(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[8],{521:function(e,n,t){"use strict";t.d(n,"b",(function(){return s})),t.d(n,"c",(function(){return u.a})),t.d(n,"d",(function(){return j})),t.d(n,"e",(function(){return I})),t.d(n,"a",(function(){return O}));var r,o,a,i,c,l=t(45),s=Object(l.a)((function(){return t.e(21).then(t.bind(null,556))}),(function(e){return e.MultiInput})),u=t(164),d=t(0),p=t.n(d),f=t(163),b=t(71),m=b.b.div(r||(r=Object(f.a)(["\n  display: inline-block;\n  margin-left: 50%;\n  margin-top: 20px;\n"]))),h=b.b.div(o||(o=Object(f.a)(["\n  height: 600px;\n  .container {\n    display: flex;\n    position: relative;\n    height: 100%;\n    width: 100%;\n    align-items: center;\n    justify-content: center;\n  }\n  .circle {\n    position: absolute;\n    border-radius: 50%;\n    animation: spin 3s linear infinite;\n    display: flex;\n  }\n\n  .circle-red {\n    border: 20px solid rgba(252, 33, 33, 0.2);\n    border-right: 20px solid rgb(252, 33, 33);\n    animation-delay: 0.5s;\n    width: 150px;\n    height: 150px;\n  }\n\n  .circle-green {\n    border: 20px solid rgba(198, 200, 99, 0.2);\n    border-right: 20px solid rgb(198, 200, 99);\n    animation-delay: 1s;\n    width: 100px;\n    height: 100px;\n  }\n\n  .circle-blue {\n    border: 20px solid rgba(18, 198, 255, 0.2);\n    border-right: 20px solid rgb(18, 198, 255);\n    width: 200px;\n    height: 200px;\n  }\n\n  @keyframes spin {\n    100% {\n      transform: rotate3D(1, 0.5, 0.75, 720deg) rotateZ(720deg);\n    }\n  }\n"])));function g(){return p.a.createElement(m,null,p.a.createElement(h,null,p.a.createElement("div",{className:"container"},p.a.createElement("div",{className:"circle circle-red"}),p.a.createElement("div",{className:"circle circle-blue"}),p.a.createElement("div",{className:"circle circle-green"}))))}var x,y,v=b.b.div(a||(a=Object(f.a)(["\n  background-color: darkblue;\n  color: white;\n  text-shadow: 1px 1px 0px;\n  font-family: Gill Sans, sans-serif;\n  text-align: center;\n  padding: 12px;\n  letter-spacing: 2px;\n  border-radius: 6px;\n  border: 0.5px solid darkred;\n"]))),k=b.b.span(i||(i=Object(f.a)(["\n  &:after {\n    content: 'X';\n  }\n  cursor: pointer;\n  float: right;\n  &:hover {\n    color: grey;\n  }\n"]))),w=b.b.div(c||(c=Object(f.a)(["\n  margin: auto;\n  width: 1%;\n"])));function j(e){var n=e.children,t=e.VisualComponent,r=e.show,o=e.error,a=e.setError;return r?p.a.createElement(w,null,p.a.createElement(m,{className:"container"},t?p.a.createElement(t,null):p.a.createElement(g,null))):o?(console.log(o),p.a.createElement(v,null,p.a.createElement(k,{onClick:function(){a("")}}),o&&o.split(" ").includes("successfully")?p.a.createElement("p",null,"Error: ",o):o?p.a.createElement("p",null,o):p.a.createElement("p",null,"Error: Internal server error. Please try again later."))):n}var E=b.b.div(x||(x=Object(f.a)(["\n  .loader {\n    width: 60px;\n    height: 60px;\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n  }\n  .dot {\n    width: 0.75em;\n    height: 0.75em;\n    border-radius: 50%;\n    background: #fafafa;\n    animation-duration: 1.3s;\n    animation-iteration-count: infinite;\n  }\n  @keyframes loader_left {\n    0% {\n      opacity: 0.8;\n    }\n    20% {\n      opacity: 0.3;\n    }\n    40% {\n      opacity: 0.8;\n    }\n    60% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  @keyframes loader_middle {\n    0% {\n      opacity: 1;\n    }\n    20% {\n      opacity: 0.8;\n    }\n    40% {\n      opacity: 0.3;\n    }\n    60% {\n      opacity: 0.8;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  @keyframes loader_right {\n    0% {\n      opacity: 1;\n    }\n    20% {\n      opacity: 1;\n    }\n    40% {\n      opacity: 0.8;\n    }\n    60% {\n      opacity: 0.3;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  .dot:nth-of-type(1) {\n    animation-name: loader_left;\n  }\n  .dot:nth-of-type(2) {\n    animation-name: loader_middle;\n  }\n  .dot:nth-of-type(3) {\n    animation-name: loader_right;\n  }\n"]))),_=b.b.div(y||(y=Object(f.a)(["\n  position: relative;\n  margin: auto;\n  right: 30px;\n  top: -15px;\n  width: 100%;\n"])));function I(){return p.a.createElement(_,null,p.a.createElement(E,null,p.a.createElement("div",{className:"loader"},p.a.createElement("div",{className:"dot"}),p.a.createElement("div",{className:"dot"}),p.a.createElement("div",{className:"dot"}))))}var O=Object(l.a)((function(){return t.e(9).then(t.bind(null,557))}),(function(e){return e.CheckBox}))},526:function(e,n,t){"use strict";t.d(n,"l",(function(){return o})),t.d(n,"e",(function(){return a})),t.d(n,"h",(function(){return i})),t.d(n,"f",(function(){return c})),t.d(n,"g",(function(){return l})),t.d(n,"a",(function(){return s})),t.d(n,"c",(function(){return u})),t.d(n,"k",(function(){return d})),t.d(n,"j",(function(){return p})),t.d(n,"i",(function(){return f})),t.d(n,"d",(function(){return b})),t.d(n,"b",(function(){return m}));var r=t(71),o=r.b.div.withConfig({componentId:"sc-105jl82-0"})([""]),a=r.b.form.withConfig({componentId:"sc-105jl82-1"})([""]),i=r.b.label.withConfig({componentId:"sc-105jl82-2"})(["margin-bottom:8px;"]),c=r.b.div.withConfig({componentId:"sc-105jl82-3"})(["letter-spacing:1.5px;margin:6px;display:flex;flex-direction:column;input,textarea,select{padding:6px;width:60%;background-color:#0f202d;color:#85bcd8;}"]),l=r.b.div.withConfig({componentId:"sc-105jl82-4"})(["display:flex;flex-direction:column;"]),s=r.b.div.withConfig({componentId:"sc-105jl82-5"})(["text-align:center;"]),u=r.b.button.withConfig({componentId:"sc-105jl82-6"})(["box-shadow:inset 0px -3px 7px 0px #29bbff;background:linear-gradient(to bottom,#2dabf9 5%,#0688fa 100%);background-color:#2dabf9;border-radius:3px;border:1px solid #0b0e07;display:inline-block;cursor:pointer;color:#ffffff;font-family:Arial;font-size:18px;font-weight:bold;padding:13px 26px;text-decoration:none;text-shadow:0px 1px 0px #263666;margin-top:10px;&:hover{background:linear-gradient(to bottom,#0688fa 5%,#2dabf9 100%);background-color:#0688fa;}&:active{position:relative;top:1px;}"]),d=r.b.h3.withConfig({componentId:"sc-105jl82-7"})(["text-align:center;font-weight:normal;letter-spacing:1px;-webkit-animation-name:slideInDown;animation-name:slideInDown;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;@-webkit-keyframes slideInDown{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%);visibility:visible;}100%{-webkit-transform:translateY(0);transform:translateY(0);}}@keyframes slideInDown{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%);visibility:visible;}100%{-webkit-transform:translateY(0);transform:translateY(0);}}"]),p=r.b.span.withConfig({componentId:"sc-105jl82-8"})(["padding-left:5px;color:#ff3300 !important;"]),f=r.b.div.withConfig({componentId:"sc-105jl82-9"})(["margin-top:-10px;"]),b=r.b.span.withConfig({componentId:"sc-105jl82-10"})(["margin-top:5px;color:#ff3300 !important;"]),m=r.b.div.withConfig({componentId:"sc-105jl82-11"})([".custom-checkbox{user-select:none;}.custom-checkbox__input{position:absolute;opacity:0%;z-index:-1;}.custom-checkbox__label{cursor:pointer;display:flex;align-items:center;padding-left:25px;}.custom-checkbox__label::before{content:' ';position:absolute;height:18px;width:18px;transform:translate(-25px,0px);border:2px solid lightgray;border-radius:2px;transition:all 0.1s ease-out;}.custom-checkbox__label::after{content:' ';position:absolute;height:6px;width:10px;transform:translate(-21px,-1px) rotate(-45deg);}.custom-checkbox__input:enabled:checked + .custom-checkbox__label::before{background-color:var(--blue);border-color:var(--blue);}.custom-checkbox__input:checked + .custom-checkbox__label::after{border-bottom:3px solid var(--page-background);border-left:3px solid var(--page-background);}.custom-checkbox__input:enabled + .custom-checkbox__label:hover::before,.custom-checkbox__input:enabled + .custom-checkbox__label:active:before{border-color:var(--blue);}.custom-checkbox__input:focus + .custom-checkbox__label::before{box-shadow:0 0 0px 2px var(--page-background),0 0 0px 4px var(--light-blue);}--blue:hsl(216deg 100% 50%);--blue-grad:hsl(216deg 100% 43%);--light-blue:hsl(205deg 89% 83%);--disable-gray:hsl(0deg 0% 60%);--page-background:white;box-sizing:border-box;*,*::before,*::after{box-sizing:inherit;}"])},527:function(e,n,t){"use strict";t.d(n,"a",(function(){return o})),t.d(n,"c",(function(){return a})),t.d(n,"b",(function(){return i}));var r=function(e){return e.map((function(e){if(e.split("|").length>1)return e.split(":").length>1?e:"returnType: ".concat(e)})).filter((function(e){return null!=e}))},o=function(e,n,t){var r=Array.from(e.target.selectedOptions)[0];if(r instanceof HTMLOptionElement){var o=r.value;if(t.includes(o))n(t.filter((function(e){return e!==o})));else n(t.concat([o]))}},a=function(e,n,t){var o=r(n.items);if(o.length&&"OK"!==window.prompt('It seems you have chosen to use the "||" or "|" operator in your type definitions.\n\nWhile auto-generation of Typescript interfaces and DB schemas supports these operators, auto-generation of GraphQL scalar types is not supported yet. If you proceed, you\'ll have to create them yourself.\nAre you sure you want to proceed?\n\nTypes affected:\n'.concat(o,'\n\nType "OK" to confirm.')))return;return e.properties=n.items,e.uniqueIdentifiers=t,e.type||(e.type="null"),e},i=function(e,n,t){var o,a=null===(o=r([e.returnType]))||void 0===o?void 0:o.concat(r(n.items));if(a.length&&"OK"!==window.prompt('It seems you have chosen to use the "||" or "|" operator in your type definitions.\n\nWhile auto-generation of Typescript interfaces and DB schemas supports these operators, auto-generation of GraphQL scalar types is not supported yet. If you proceed, you\'ll have to create them yourself.\nAre you sure you want to proceed?\n\nTypes affected:\n'.concat(a,'\n\nType "OK" to confirm.')))return;e.uniqueIdentifiers=t,e.properties=n.items,e.type="none",e.dbSchema=!0,e.typeDef=!1}},567:function(e,n,t){"use strict";t.r(n),t.d(n,"SchemaForm",(function(){return h}));var r=t(522),o=t.n(r),a=t(523),i=t(520),c=t(0),l=t(526),s=t(530),u=t(521),d=t(525),p=t(535),f=t(527),b=t(45),m=Object(b.a)((function(){return t.e(33).then(t.bind(null,547))}),(function(e){return e.SchemaInputs}));function h(){var e=Object(p.a)(),n=c.useState([""]),t=Object(i.a)(n,2),r=t[0],b=t[1],h=c.useState(""),g=Object(i.a)(h,2),x=g[0],y=g[1],v=c.useState(!1),k=Object(i.a)(v,2),w=k[0],j=k[1],E=c.useState({items:[]}),_=Object(i.a)(E,2),I=_[0],O=_[1],C=Object(s.a)(),S=C.handleSubmit,D=function(){var n=Object(a.a)(o.a.mark((function n(t){var a,i;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t=Object(f.b)(t,I,r),I.items.length){n.next=4;break}return y("Properties are necessary to compose an interface!"),n.abrupt("return");case 4:return n.prev=4,j(!0),n.next=8,Object(d.a)(e,d.c.mCreateSchema,t);case 8:"OK"!==(a=n.sent)&&y(a),j(!1),n.next=18;break;case 13:n.prev=13,n.t0=n.catch(4),i=n.t0.message,j(!1),y(i);case 18:case"end":return n.stop()}}),n,null,[[4,13]])})));return function(e){return n.apply(this,arguments)}}();return c.createElement(l.l,null,c.createElement(l.k,null,"Create a database schema"),c.createElement(l.e,{onSubmit:function(e){e.preventDefault()}},c.createElement(l.g,null,c.createElement(m,{useFormProps:C,properties:I,setProperties:O,uniqueIdentifiers:r,setUniqueIdentifiers:b})),c.createElement(u.d,{VisualComponent:u.e,show:w,error:x,setError:y},c.createElement(l.a,null,c.createElement(l.c,{type:"button",onClick:S(D)},"Create")))))}}}]);