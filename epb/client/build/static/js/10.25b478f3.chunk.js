(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[10],{521:function(e,n,t){"use strict";t.d(n,"b",(function(){return s})),t.d(n,"c",(function(){return u.a})),t.d(n,"d",(function(){return w})),t.d(n,"e",(function(){return _})),t.d(n,"a",(function(){return C}));var r,a,o,i,l,c=t(45),s=Object(c.a)((function(){return t.e(21).then(t.bind(null,556))}),(function(e){return e.MultiInput})),u=t(164),d=t(0),p=t.n(d),b=t(163),m=t(71),f=m.b.div(r||(r=Object(b.a)(["\n  display: inline-block;\n  margin-left: 50%;\n  margin-top: 20px;\n"]))),x=m.b.div(a||(a=Object(b.a)(["\n  height: 600px;\n  .container {\n    display: flex;\n    position: relative;\n    height: 100%;\n    width: 100%;\n    align-items: center;\n    justify-content: center;\n  }\n  .circle {\n    position: absolute;\n    border-radius: 50%;\n    animation: spin 3s linear infinite;\n    display: flex;\n  }\n\n  .circle-red {\n    border: 20px solid rgba(252, 33, 33, 0.2);\n    border-right: 20px solid rgb(252, 33, 33);\n    animation-delay: 0.5s;\n    width: 150px;\n    height: 150px;\n  }\n\n  .circle-green {\n    border: 20px solid rgba(198, 200, 99, 0.2);\n    border-right: 20px solid rgb(198, 200, 99);\n    animation-delay: 1s;\n    width: 100px;\n    height: 100px;\n  }\n\n  .circle-blue {\n    border: 20px solid rgba(18, 198, 255, 0.2);\n    border-right: 20px solid rgb(18, 198, 255);\n    width: 200px;\n    height: 200px;\n  }\n\n  @keyframes spin {\n    100% {\n      transform: rotate3D(1, 0.5, 0.75, 720deg) rotateZ(720deg);\n    }\n  }\n"])));function g(){return p.a.createElement(f,null,p.a.createElement(x,null,p.a.createElement("div",{className:"container"},p.a.createElement("div",{className:"circle circle-red"}),p.a.createElement("div",{className:"circle circle-blue"}),p.a.createElement("div",{className:"circle circle-green"}))))}var h,y,v=m.b.div(o||(o=Object(b.a)(["\n  background-color: darkblue;\n  color: white;\n  text-shadow: 1px 1px 0px;\n  font-family: Gill Sans, sans-serif;\n  text-align: center;\n  padding: 12px;\n  letter-spacing: 2px;\n  border-radius: 6px;\n  border: 0.5px solid darkred;\n"]))),k=m.b.span(i||(i=Object(b.a)(["\n  &:after {\n    content: 'X';\n  }\n  cursor: pointer;\n  float: right;\n  &:hover {\n    color: grey;\n  }\n"]))),E=m.b.div(l||(l=Object(b.a)(["\n  margin: auto;\n  width: 1%;\n"])));function w(e){var n=e.children,t=e.VisualComponent,r=e.show,a=e.error,o=e.setError;return r?p.a.createElement(E,null,p.a.createElement(f,{className:"container"},t?p.a.createElement(t,null):p.a.createElement(g,null))):a?(console.log(a),p.a.createElement(v,null,p.a.createElement(k,{onClick:function(){o("")}}),a&&a.split(" ").includes("successfully")?p.a.createElement("p",null,"Error: ",a):a?p.a.createElement("p",null,a):p.a.createElement("p",null,"Error: Internal server error. Please try again later."))):n}var O=m.b.div(h||(h=Object(b.a)(["\n  .loader {\n    width: 60px;\n    height: 60px;\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n  }\n  .dot {\n    width: 0.75em;\n    height: 0.75em;\n    border-radius: 50%;\n    background: #fafafa;\n    animation-duration: 1.3s;\n    animation-iteration-count: infinite;\n  }\n  @keyframes loader_left {\n    0% {\n      opacity: 0.8;\n    }\n    20% {\n      opacity: 0.3;\n    }\n    40% {\n      opacity: 0.8;\n    }\n    60% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  @keyframes loader_middle {\n    0% {\n      opacity: 1;\n    }\n    20% {\n      opacity: 0.8;\n    }\n    40% {\n      opacity: 0.3;\n    }\n    60% {\n      opacity: 0.8;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  @keyframes loader_right {\n    0% {\n      opacity: 1;\n    }\n    20% {\n      opacity: 1;\n    }\n    40% {\n      opacity: 0.8;\n    }\n    60% {\n      opacity: 0.3;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  .dot:nth-of-type(1) {\n    animation-name: loader_left;\n  }\n  .dot:nth-of-type(2) {\n    animation-name: loader_middle;\n  }\n  .dot:nth-of-type(3) {\n    animation-name: loader_right;\n  }\n"]))),j=m.b.div(y||(y=Object(b.a)(["\n  position: relative;\n  margin: auto;\n  right: 30px;\n  top: -15px;\n  width: 100%;\n"])));function _(){return p.a.createElement(j,null,p.a.createElement(O,null,p.a.createElement("div",{className:"loader"},p.a.createElement("div",{className:"dot"}),p.a.createElement("div",{className:"dot"}),p.a.createElement("div",{className:"dot"}))))}var C=Object(c.a)((function(){return t.e(9).then(t.bind(null,557))}),(function(e){return e.CheckBox}))},524:function(e,n,t){"use strict";t.d(n,"i",(function(){return f})),t.d(n,"d",(function(){return x})),t.d(n,"f",(function(){return g})),t.d(n,"e",(function(){return h})),t.d(n,"g",(function(){return y})),t.d(n,"b",(function(){return v})),t.d(n,"h",(function(){return k})),t.d(n,"c",(function(){return E})),t.d(n,"a",(function(){return w}));var r,a,o,i,l,c,s,u,d,p,b=t(163),m=t(71),f=m.b.div(r||(r=Object(b.a)([""]))),x=m.b.form(a||(a=Object(b.a)([""]))),g=m.b.div(o||(o=Object(b.a)(["\n  display: flex;\n  flex-direction: column;\n"]))),h=m.b.div(i||(i=Object(b.a)(["\n  letter-spacing: 1.5px;\n  margin: 6px;\n  display: flex;\n  flex-direction: column;\n  input,\n  textarea,\n  select {\n    padding: 6px;\n    width: 60%;\n    background-color: #0f202d;\n    color: #85bcd8;\n  }\n"]))),y=m.b.label(l||(l=Object(b.a)(["\n  margin-bottom: 8px;\n"]))),v=m.b.button(c||(c=Object(b.a)(["\n  box-shadow: inset 0px -3px 7px 0px #29bbff;\n  background: linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);\n  background-color: #2dabf9;\n  border-radius: 3px;\n  border: 1px solid #0b0e07;\n  display: inline-block;\n  cursor: pointer;\n  color: #ffffff;\n  font-family: Arial;\n  font-size: 18px;\n  font-weight: bold;\n  padding: 13px 26px;\n  text-decoration: none;\n  text-shadow: 0px 1px 0px #263666;\n  margin-top: 10px;\n  &:hover {\n    background: linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);\n    background-color: #0688fa;\n  }\n  &:active {\n    position: relative;\n    top: 1px;\n  }\n"]))),k=m.b.span(s||(s=Object(b.a)(["\n  padding-left: 5px;\n  color: #ff3300 !important;\n"]))),E=m.b.span(u||(u=Object(b.a)(["\n  margin-top: 5px;\n  color: #ff3300 !important;\n"]))),w=m.b.div(d||(d=Object(b.a)(["\n  text-align: center;\n"])));m.b.div(p||(p=Object(b.a)(["\n  .custom-checkbox {\n    user-select: none;\n  }\n\n  .custom-checkbox__input {\n    position: absolute;\n    opacity: 0%;\n    z-index: -1;\n  }\n\n  .custom-checkbox__label {\n    cursor: pointer;\n\n    display: flex;\n    align-items: center;\n\n    padding-left: 25px;\n  }\n\n  /* ::before for checkbox frame */\n  .custom-checkbox__label::before {\n    content: ' ';\n\n    position: absolute;\n\n    height: 18px;\n    width: 18px;\n\n    transform: translate(-25px, 0px);\n\n    border: 2px solid lightgray;\n    border-radius: 2px;\n\n    transition: all 0.1s ease-out;\n  }\n\n  /* ::after for checkbox OK symbol inside the frame */\n  .custom-checkbox__label::after {\n    content: ' ';\n\n    position: absolute;\n\n    height: 6px;\n    width: 10px;\n\n    transform: translate(-21px, -1px) rotate(-45deg);\n  }\n\n  /* Checked (enabled) */\n  .custom-checkbox__input:enabled:checked + .custom-checkbox__label::before {\n    background-color: var(--blue);\n    border-color: var(--blue);\n  }\n\n  .custom-checkbox__input:checked + .custom-checkbox__label::after {\n    border-bottom: 3px solid var(--page-background);\n    border-left: 3px solid var(--page-background);\n  }\n\n  /* Active, Hover (enabled) */\n  .custom-checkbox__input:enabled + .custom-checkbox__label:hover::before,\n  .custom-checkbox__input:enabled + .custom-checkbox__label:active:before {\n    border-color: var(--blue);\n  }\n\n  /* Focus border */\n  .custom-checkbox__input:focus + .custom-checkbox__label::before {\n    box-shadow: 0 0 0px 2px var(--page-background),\n      0 0 0px 4px var(--light-blue);\n  }\n  /* #0068FF */\n  /* #ACDAFA */\n  --blue: hsl(216deg 100% 50%);\n  --blue-grad: hsl(216deg 100% 43%);\n  --light-blue: hsl(205deg 89% 83%);\n  --disable-gray: hsl(0deg 0% 60%);\n  --page-background: white;\n\n  box-sizing: border-box;\n\n  *,\n  *::before,\n  *::after {\n    box-sizing: inherit;\n  }\n"])))},565:function(e,n,t){"use strict";t.r(n),t.d(n,"ActionForm",(function(){return h}));var r=t(522),a=t.n(r),o=t(523),i=t(520),l=t(0),c=t(530),s=t(521),u=t(525),d=t(524),p=t(535),b=t(71),m=b.b.div.withConfig({componentId:"m80tur-0"})([""]),f=b.b.form.withConfig({componentId:"m80tur-1"})([""]),x=(b.b.label.withConfig({componentId:"m80tur-2"})(["margin-bottom:8px;"]),b.b.div.withConfig({componentId:"m80tur-3"})(["letter-spacing:1.5px;margin:6px;display:flex;flex-direction:column;input,textarea,select{padding:6px;width:60%;background-color:#0f202d;color:#85bcd8;}"]),b.b.div.withConfig({componentId:"m80tur-4"})(["display:flex;flex-direction:column;"]),b.b.div.withConfig({componentId:"m80tur-5"})(["text-align:center;"]),b.b.button.withConfig({componentId:"m80tur-6"})(["box-shadow:inset 0px -3px 7px 0px #29bbff;background:linear-gradient(to bottom,#2dabf9 5%,#0688fa 100%);background-color:#2dabf9;border-radius:3px;border:1px solid #0b0e07;display:inline-block;cursor:pointer;color:#ffffff;font-family:Arial;font-size:18px;font-weight:bold;padding:13px 26px;text-decoration:none;text-shadow:0px 1px 0px #263666;margin-top:10px;&:hover{background:linear-gradient(to bottom,#0688fa 5%,#2dabf9 100%);background-color:#0688fa;}&:active{position:relative;top:1px;}"]),b.b.h3.withConfig({componentId:"m80tur-7"})(["text-align:center;font-weight:normal;letter-spacing:1px;-webkit-animation-name:slideInDown;animation-name:slideInDown;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;@-webkit-keyframes slideInDown{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%);visibility:visible;}100%{-webkit-transform:translateY(0);transform:translateY(0);}}@keyframes slideInDown{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%);visibility:visible;}100%{-webkit-transform:translateY(0);transform:translateY(0);}}"])),g=(b.b.span.withConfig({componentId:"m80tur-8"})(["padding-left:5px;color:#ff3300 !important;"]),b.b.span.withConfig({componentId:"m80tur-9"})(["margin-top:5px;color:#ff3300 !important;"]),b.b.div.withConfig({componentId:"m80tur-10"})(["margin-top:-10px;"]));function h(e){var n=Object(p.a)(),t=l.useState([]),r=Object(i.a)(t,2),b=r[0],h=r[1],y=l.useState(!1),v=Object(i.a)(y,2),k=v[0],E=v[1],w=l.useState(""),O=Object(i.a)(w,2),j=O[0],_=O[1],C=l.useState({items:[]}),I=Object(i.a)(C,2),D=I[0],N=I[1],S=Object(c.a)(),T=S.register,q=S.handleSubmit,A=S.formState,Y=(A.isValid,A.errors);l.useEffect((function(){Object(o.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.b)(n,u.d.qResolverNames,h);case 2:case"end":return e.stop()}}),e)})))()}));var R=function(e){return e.map((function(e){if(e.split("|").length>1)return e.split(":").length>1?e:"returnType: ".concat(e)})).filter((function(e){return null!=e}))},z=function(){var e=Object(o.a)(a.a.mark((function e(t){var r,o,i,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(o=null===(r=R([t.returnType]))||void 0===r?void 0:r.concat(R(D.items))).length){e.next=5;break}if("OK"===window.prompt('It seems you have chosen to use the "||" or "|" operator in your type definitions.\n\nWhile auto-generation of Typescript interfaces and DB schemas supports these operators, auto-generation of GraphQL scalar types is not supported yet. If you proceed, you\'ll have to create them yourself.\nAre you sure you want to proceed?\n\nTypes affected:\n'.concat(o,'\n\nType "OK" to confirm.'))){e.next=5;break}return e.abrupt("return");case 5:return e.prev=5,E(!0),t.properties=D.items,e.next=10,Object(u.a)(n,u.c.mCreateResolver,t);case 10:i=e.sent,E(!1),"OK"!==i&&_(i),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(5),l=e.t0.message,E(!1),_(l);case 20:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(n){return e.apply(this,arguments)}}();return l.createElement(m,null,l.createElement(x,null,"Create an action"),l.createElement(f,{onSubmit:function(e){e.preventDefault()}},l.createElement(d.f,null,l.createElement(d.e,null,l.createElement(d.g,null,"Resolver name",l.createElement(d.h,null,"*")),l.createElement("input",Object.assign({},T("name",{required:!0,validate:{unique:function(e){return!b.includes(e)}}}),{type:"text",placeholder:"Pick a name, any name.."})),Y.name&&"unique"===Y.name.type?l.createElement(d.c,null,"Resolver name must be unique."):Y.name?l.createElement(d.c,null,"Resolver name is necessary."):null),l.createElement(d.e,null,l.createElement(d.g,null,"This is going to be a... ",l.createElement(d.h,null,"*")),l.createElement("select",T("type",{required:!0}),l.createElement("option",{value:"Query"},"Query"),l.createElement("option",{value:"Mutation"},"Mutation"))),l.createElement(d.e,null,l.createElement(d.g,null,"That will return? (can choose from existing typeDefs)",l.createElement(d.h,null,"*")),l.createElement("input",Object.assign({},T("returnType",{required:!0}),{type:"text",placeholder:"String, [String], CustomType, etc.."})),Y.returnType&&l.createElement(d.c,null,"Return type is necessary.")),l.createElement(d.e,null,l.createElement(d.g,null,"Description",l.createElement(d.h,null,"*")),l.createElement("input",Object.assign({type:"text"},T("description",{required:!0}),{placeholder:"IE 'create a new resolver and typeDef in fs.'"})),Y.description&&l.createElement(d.c,null,"Return type is necessary.")),l.createElement(d.e,null,l.createElement(d.g,null,"..And will receive? (press Enter to add, can choose from existing typeDefs)"),l.createElement(g,null,l.createElement(s.b,{type:"",items:D,setItems:N}))),l.createElement(d.e,null,l.createElement(d.g,null,"Comment?"),l.createElement("input",Object.assign({},T("comment",{required:!1}),{type:"text",placeholder:"// ...comment"})))),l.createElement(d.a,null,l.createElement(s.d,{VisualComponent:s.e,show:k,error:j,setError:_},l.createElement(d.b,{type:"button",onClick:q(z)},"Create")))))}}}]);