(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[7],{523:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return s.a})),t.d(n,"d",(function(){return E})),t.d(n,"e",(function(){return _})),t.d(n,"a",(function(){return I}));var r,o,a,i,c,l=t(45),u=Object(l.a)((function(){return t.e(23).then(t.bind(null,557))}),(function(e){return e.MultiInput})),s=t(164),p=t(0),d=t.n(p),f=t(163),m=t(71),b=m.b.div(r||(r=Object(f.a)(["\n  display: inline-block;\n  margin-left: 50%;\n  margin-top: 20px;\n"]))),h=m.b.div(o||(o=Object(f.a)(["\n  height: 600px;\n  .container {\n    display: flex;\n    position: relative;\n    height: 100%;\n    width: 100%;\n    align-items: center;\n    justify-content: center;\n  }\n  .circle {\n    position: absolute;\n    border-radius: 50%;\n    animation: spin 3s linear infinite;\n    display: flex;\n  }\n\n  .circle-red {\n    border: 20px solid rgba(252, 33, 33, 0.2);\n    border-right: 20px solid rgb(252, 33, 33);\n    animation-delay: 0.5s;\n    width: 150px;\n    height: 150px;\n  }\n\n  .circle-green {\n    border: 20px solid rgba(198, 200, 99, 0.2);\n    border-right: 20px solid rgb(198, 200, 99);\n    animation-delay: 1s;\n    width: 100px;\n    height: 100px;\n  }\n\n  .circle-blue {\n    border: 20px solid rgba(18, 198, 255, 0.2);\n    border-right: 20px solid rgb(18, 198, 255);\n    width: 200px;\n    height: 200px;\n  }\n\n  @keyframes spin {\n    100% {\n      transform: rotate3D(1, 0.5, 0.75, 720deg) rotateZ(720deg);\n    }\n  }\n"])));function g(){return d.a.createElement(b,null,d.a.createElement(h,null,d.a.createElement("div",{className:"container"},d.a.createElement("div",{className:"circle circle-red"}),d.a.createElement("div",{className:"circle circle-blue"}),d.a.createElement("div",{className:"circle circle-green"}))))}var x,y,v=m.b.div(a||(a=Object(f.a)(["\n  background-color: darkblue;\n  color: white;\n  text-shadow: 1px 1px 0px;\n  font-family: Gill Sans, sans-serif;\n  text-align: center;\n  padding: 12px;\n  letter-spacing: 2px;\n  border-radius: 6px;\n  border: 0.5px solid darkred;\n"]))),k=m.b.span(i||(i=Object(f.a)(["\n  &:after {\n    content: 'X';\n  }\n  cursor: pointer;\n  float: right;\n  &:hover {\n    color: grey;\n  }\n"]))),w=m.b.div(c||(c=Object(f.a)(["\n  margin: auto;\n  width: 1%;\n"])));function E(e){var n=e.children,t=e.VisualComponent,r=e.show,o=e.error,a=e.setError;return r?d.a.createElement(w,null,d.a.createElement(b,{className:"container"},t?d.a.createElement(t,null):d.a.createElement(g,null))):o?(console.log(o),d.a.createElement(v,null,d.a.createElement(k,{onClick:function(){a("")}}),o&&o.split(" ").includes("successfully")?d.a.createElement("p",null,"Error: ",o):o?d.a.createElement("p",null,o):d.a.createElement("p",null,"Error: Internal server error. Please try again later."))):n}var O=m.b.div(x||(x=Object(f.a)(["\n  .loader {\n    width: 60px;\n    height: 60px;\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n  }\n  .dot {\n    width: 0.75em;\n    height: 0.75em;\n    border-radius: 50%;\n    background: #fafafa;\n    animation-duration: 1.3s;\n    animation-iteration-count: infinite;\n  }\n  @keyframes loader_left {\n    0% {\n      opacity: 0.8;\n    }\n    20% {\n      opacity: 0.3;\n    }\n    40% {\n      opacity: 0.8;\n    }\n    60% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  @keyframes loader_middle {\n    0% {\n      opacity: 1;\n    }\n    20% {\n      opacity: 0.8;\n    }\n    40% {\n      opacity: 0.3;\n    }\n    60% {\n      opacity: 0.8;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  @keyframes loader_right {\n    0% {\n      opacity: 1;\n    }\n    20% {\n      opacity: 1;\n    }\n    40% {\n      opacity: 0.8;\n    }\n    60% {\n      opacity: 0.3;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  .dot:nth-of-type(1) {\n    animation-name: loader_left;\n  }\n  .dot:nth-of-type(2) {\n    animation-name: loader_middle;\n  }\n  .dot:nth-of-type(3) {\n    animation-name: loader_right;\n  }\n"]))),j=m.b.div(y||(y=Object(f.a)(["\n  position: relative;\n  margin: auto;\n  right: 30px;\n  top: -15px;\n  width: 100%;\n"])));function _(){return d.a.createElement(j,null,d.a.createElement(O,null,d.a.createElement("div",{className:"loader"},d.a.createElement("div",{className:"dot"}),d.a.createElement("div",{className:"dot"}),d.a.createElement("div",{className:"dot"}))))}var I=Object(l.a)((function(){return t.e(10).then(t.bind(null,558))}),(function(e){return e.CheckBox}))},525:function(e,n,t){"use strict";t.d(n,"i",(function(){return b})),t.d(n,"d",(function(){return h})),t.d(n,"f",(function(){return g})),t.d(n,"e",(function(){return x})),t.d(n,"g",(function(){return y})),t.d(n,"b",(function(){return v})),t.d(n,"h",(function(){return k})),t.d(n,"c",(function(){return w})),t.d(n,"a",(function(){return E}));var r,o,a,i,c,l,u,s,p,d,f=t(163),m=t(71),b=m.b.div(r||(r=Object(f.a)([""]))),h=m.b.form(o||(o=Object(f.a)([""]))),g=m.b.div(a||(a=Object(f.a)(["\n  display: flex;\n  flex-direction: column;\n"]))),x=m.b.div(i||(i=Object(f.a)(["\n  letter-spacing: 1.5px;\n  margin: 6px;\n  display: flex;\n  flex-direction: column;\n  input,\n  textarea,\n  select {\n    padding: 6px;\n    width: 60%;\n    background-color: #0f202d;\n    color: #85bcd8;\n  }\n"]))),y=m.b.label(c||(c=Object(f.a)(["\n  margin-bottom: 8px;\n"]))),v=m.b.button(l||(l=Object(f.a)(["\n  box-shadow: inset 0px -3px 7px 0px #29bbff;\n  background: linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);\n  background-color: #2dabf9;\n  border-radius: 3px;\n  border: 1px solid #0b0e07;\n  display: inline-block;\n  cursor: pointer;\n  color: #ffffff;\n  font-family: Arial;\n  font-size: 18px;\n  font-weight: bold;\n  padding: 13px 26px;\n  text-decoration: none;\n  text-shadow: 0px 1px 0px #263666;\n  margin-top: 10px;\n  &:hover {\n    background: linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);\n    background-color: #0688fa;\n  }\n  &:active {\n    position: relative;\n    top: 1px;\n  }\n"]))),k=m.b.span(u||(u=Object(f.a)(["\n  padding-left: 5px;\n  color: #ff3300 !important;\n"]))),w=m.b.span(s||(s=Object(f.a)(["\n  margin-top: 5px;\n  color: #ff3300 !important;\n"]))),E=m.b.div(p||(p=Object(f.a)(["\n  text-align: center;\n"])));m.b.div(d||(d=Object(f.a)(["\n  .custom-checkbox {\n    user-select: none;\n  }\n\n  .custom-checkbox__input {\n    position: absolute;\n    opacity: 0%;\n    z-index: -1;\n  }\n\n  .custom-checkbox__label {\n    cursor: pointer;\n\n    display: flex;\n    align-items: center;\n\n    padding-left: 25px;\n  }\n\n  /* ::before for checkbox frame */\n  .custom-checkbox__label::before {\n    content: ' ';\n\n    position: absolute;\n\n    height: 18px;\n    width: 18px;\n\n    transform: translate(-25px, 0px);\n\n    border: 2px solid lightgray;\n    border-radius: 2px;\n\n    transition: all 0.1s ease-out;\n  }\n\n  /* ::after for checkbox OK symbol inside the frame */\n  .custom-checkbox__label::after {\n    content: ' ';\n\n    position: absolute;\n\n    height: 6px;\n    width: 10px;\n\n    transform: translate(-21px, -1px) rotate(-45deg);\n  }\n\n  /* Checked (enabled) */\n  .custom-checkbox__input:enabled:checked + .custom-checkbox__label::before {\n    background-color: var(--blue);\n    border-color: var(--blue);\n  }\n\n  .custom-checkbox__input:checked + .custom-checkbox__label::after {\n    border-bottom: 3px solid var(--page-background);\n    border-left: 3px solid var(--page-background);\n  }\n\n  /* Active, Hover (enabled) */\n  .custom-checkbox__input:enabled + .custom-checkbox__label:hover::before,\n  .custom-checkbox__input:enabled + .custom-checkbox__label:active:before {\n    border-color: var(--blue);\n  }\n\n  /* Focus border */\n  .custom-checkbox__input:focus + .custom-checkbox__label::before {\n    box-shadow: 0 0 0px 2px var(--page-background),\n      0 0 0px 4px var(--light-blue);\n  }\n  /* #0068FF */\n  /* #ACDAFA */\n  --blue: hsl(216deg 100% 50%);\n  --blue-grad: hsl(216deg 100% 43%);\n  --light-blue: hsl(205deg 89% 83%);\n  --disable-gray: hsl(0deg 0% 60%);\n  --page-background: white;\n\n  box-sizing: border-box;\n\n  *,\n  *::before,\n  *::after {\n    box-sizing: inherit;\n  }\n"])))},526:function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"d",(function(){return a})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return c}));var r=function(e){return e.map((function(e){if((null===e||void 0===e?void 0:e.split("|").length)>1)return(null===e||void 0===e?void 0:e.split(":").length)>1?e:"returnType: ".concat(e)})).filter((function(e){return null!=e}))},o=function(e,n,t){var r=Array.from(e.target.selectedOptions)[0];if(r instanceof HTMLOptionElement){var o=r.value;if(t.includes(o))n(t.filter((function(e){return e!==o})));else n(t.concat([o]))}},a=function(e,n,t){var o=r(n.items);if(o.length&&"OK"!==window.prompt('It seems you have chosen to use the "||" or "|" operator in your type definitions.\n\nWhile auto-generation of Typescript interfaces and DB schemas supports these operators, auto-generation of GraphQL scalar types is not supported yet. If you proceed, you\'ll have to create them yourself.\nAre you sure you want to proceed?\n\nTypes affected:\n'.concat(o,'\n\nType "OK" to confirm.')))return;return e.properties=n.items,e.uniqueIdentifiers=t,e.type||(e.type="null"),e},i=function(e,n,t){var o,a=null===(o=r([e.returnType]))||void 0===o?void 0:o.concat(r(n.items));if(a.length&&"OK"!==window.prompt('It seems you have chosen to use the "||" or "|" operator in your type definitions.\n\nWhile auto-generation of Typescript interfaces and DB schemas supports these operators, auto-generation of GraphQL scalar types is not supported yet. If you proceed, you\'ll have to create them yourself.\nAre you sure you want to proceed?\n\nTypes affected:\n'.concat(a,'\n\nType "OK" to confirm.')))return;return e.uniqueIdentifiers=t,e.properties=n.items,e.type="none",e.dbSchema=!0,e.typeDef=!1,e},c=function(e,n,t){e.push(n),e.push("".concat(n,"[]")),e.push("[".concat(n,"]")),e.push("".concat(n,"Options")),e.push("".concat(n,"Options[]")),e.push("[".concat(n,"Options]")),e.push("".concat(n,"Options").concat(t,"[]")),e.push("[".concat(n,"Options").concat(t,"]")),e.push("[".concat(n,"Options").concat(t,"]"))}},556:function(e,n,t){"use strict";t.r(n),t.d(n,"ActionForm",(function(){return k}));var r=t(521),o=t.n(r),a=t(522),i=t(520),c=t(0),l=t(530),u=t(523),s=t(524),p=t(525),d=t(535),f=t(71),m=f.b.div.withConfig({componentId:"m80tur-0"})([""]),b=f.b.form.withConfig({componentId:"m80tur-1"})([""]),h=(f.b.label.withConfig({componentId:"m80tur-2"})(["margin-bottom:8px;"]),f.b.div.withConfig({componentId:"m80tur-3"})(["letter-spacing:1.5px;margin:6px;display:flex;flex-direction:column;input,textarea,select{padding:6px;width:60%;background-color:#0f202d;color:#85bcd8;}"]),f.b.div.withConfig({componentId:"m80tur-4"})(["display:flex;flex-direction:column;"]),f.b.div.withConfig({componentId:"m80tur-5"})(["text-align:center;"]),f.b.button.withConfig({componentId:"m80tur-6"})(["box-shadow:inset 0px -3px 7px 0px #29bbff;background:linear-gradient(to bottom,#2dabf9 5%,#0688fa 100%);background-color:#2dabf9;border-radius:3px;border:1px solid #0b0e07;display:inline-block;cursor:pointer;color:#ffffff;font-family:Arial;font-size:18px;font-weight:bold;padding:13px 26px;text-decoration:none;text-shadow:0px 1px 0px #263666;margin-top:10px;&:hover{background:linear-gradient(to bottom,#0688fa 5%,#2dabf9 100%);background-color:#0688fa;}&:active{position:relative;top:1px;}"]),f.b.h3.withConfig({componentId:"m80tur-7"})(["text-align:center;font-weight:normal;letter-spacing:1px;-webkit-animation-name:slideInDown;animation-name:slideInDown;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;@-webkit-keyframes slideInDown{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%);visibility:visible;}100%{-webkit-transform:translateY(0);transform:translateY(0);}}@keyframes slideInDown{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%);visibility:visible;}100%{-webkit-transform:translateY(0);transform:translateY(0);}}"])),g=(f.b.span.withConfig({componentId:"m80tur-8"})(["padding-left:5px;color:#ff3300 !important;"]),f.b.span.withConfig({componentId:"m80tur-9"})(["margin-top:5px;color:#ff3300 !important;"]),f.b.div.withConfig({componentId:"m80tur-10"})(["margin-top:-10px;"])),x=t(45),y=Object(x.a)((function(){return t.e(22).then(t.bind(null,569))}),(function(e){return e.InputSuggestionList})),v=t(526);function k(e){var n=e.allowedTypes,t=Object(d.a)(),r=c.useState([]),f=Object(i.a)(r,2),x=f[0],k=f[1],w=c.useState(),E=Object(i.a)(w,2),O=E[0],j=E[1],_=c.useState([]),I=Object(i.a)(_,2),C=I[0],T=I[1],D=c.useState(!1),S=Object(i.a)(D,2),A=S[0],q=S[1],N=c.useState(""),K=Object(i.a)(N,2),Y=K[0],R=K[1],Q=c.useState({items:[]}),z=Object(i.a)(Q,2),F=z[0],L=z[1],B=Object(l.a)(),G=B.register,M=B.handleSubmit,W=B.formState.errors;c.useEffect((function(){Object(a.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.b)(t,s.d.qResolverNames,k);case 2:case"end":return e.stop()}}),e)})))()}));var H=function(){var e=Object(a.a)(o.a.mark((function e(t){var r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.target.value,j(r),(a=n.filter((function(e){return e===r?e:e.includes(r)}))).length=6,r){e.next=7;break}return T(void 0),e.abrupt("return");case 7:T(a);case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),J=function(e){return e.map((function(e){if(e.split("|").length>1)return e.split(":").length>1?e:"returnType: ".concat(e)})).filter((function(e){return null!=e}))},P=function(){var e=Object(a.a)(o.a.mark((function e(r){var a,i,c,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(i=null===(a=J([r.returnType]))||void 0===a?void 0:a.concat(J(F.items))).length){e.next=5;break}if("OK"===window.prompt('It seems you have chosen to use the "||" or "|" operator in your type definitions.\n\nWhile auto-generation of Typescript interfaces and DB schemas supports these operators, auto-generation of GraphQL scalar types is not supported yet. If you proceed, you\'ll have to create them yourself.\nAre you sure you want to proceed?\n\nTypes affected:\n'.concat(i,'\n\nType "OK" to confirm.'))){e.next=5;break}return e.abrupt("return");case 5:return e.prev=5,q(!0),r.properties=F.items,r.returnType=O,e.next=11,Object(s.a)(t,s.c.mCreateResolver,r);case 11:c=e.sent,Object(v.a)(n,r.name,"Query"===r.type?"type":"input"),q(!1),"OK"!==c&&R(c),e.next=22;break;case 17:e.prev=17,e.t0=e.catch(5),l=e.t0.message,q(!1),R(l);case 22:case"end":return e.stop()}}),e,null,[[5,17]])})));return function(n){return e.apply(this,arguments)}}();return c.createElement(m,null,c.createElement(h,null,"Create an action"),c.createElement(b,{onSubmit:function(e){e.preventDefault()},autoComplete:"off"},c.createElement(p.f,null,c.createElement(p.e,null,c.createElement(p.g,null,"Resolver name",c.createElement(p.h,null,"*")),c.createElement("input",Object.assign({},G("name",{required:!0,validate:{unique:function(e){return!x.includes(e)}}}),{type:"text",placeholder:"Pick a name, any name.."})),W.name&&"unique"===W.name.type?c.createElement(p.c,null,"Resolver name must be unique."):W.name?c.createElement(p.c,null,"Resolver name is necessary."):null),c.createElement(p.e,null,c.createElement(p.g,null,"This is going to be a... ",c.createElement(p.h,null,"*")),c.createElement("select",G("type",{required:!0}),c.createElement("option",{value:"Query"},"Query"),c.createElement("option",{value:"Mutation"},"Mutation"))),c.createElement(p.e,null,c.createElement(p.g,null,"That will return? (can choose from existing typeDefs)",c.createElement(p.h,null,"*")),c.createElement("input",Object.assign({},G("returnType",{required:!0}),{onChange:function(e){H(e)},type:"text",value:O,placeholder:"String, [String], CustomType, etc.."})),c.createElement(y,{setter:j,value:O,searchResults:C}),W.returnType&&c.createElement(p.c,null,"Return type is necessary.")),c.createElement(p.e,null,c.createElement(p.g,null,"Description",c.createElement(p.h,null,"*")),c.createElement("input",Object.assign({type:"text"},G("description",{required:!0}),{placeholder:"IE 'create a new resolver and typeDef in fs.'"})),W.description&&c.createElement(p.c,null,"Description is necessary.")),c.createElement(p.e,null,c.createElement(p.g,null,"..And will receive? (press Enter to add, can choose from existing typeDefs)"),c.createElement(g,null,c.createElement(u.b,{type:"",items:F,setItems:L}))),c.createElement(p.e,null,c.createElement(p.g,null,"Comment?"),c.createElement("input",Object.assign({},G("comment",{required:!1}),{type:"text",placeholder:"// ...comment"})))),c.createElement(p.a,null,c.createElement(u.d,{VisualComponent:u.e,show:A,error:Y,setError:R},c.createElement(p.b,{type:"button",onClick:M(P)},"Create")))))}}}]);