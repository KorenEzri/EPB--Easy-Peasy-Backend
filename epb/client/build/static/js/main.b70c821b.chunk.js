(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{160:function(e){e.exports=JSON.parse('{"title":"welcome"}')},163:function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));var a=t(70),c=Object(a.a)((function(){return t.e(10).then(t.bind(null,506))}),(function(e){return e.NotFoundPage}))},503:function(e,n,t){"use strict";t.r(n);t(267),t(277);var a,c=t(0),r=t(117),l=t(69),i=(t(471),t(115)),o=t(258),u=t(17),f=t(515),s=t(516),m=t(514),b=t(164),h=t(162),d=Object(h.a)(a||(a=Object(b.a)(["\n  html,\n  body {\n    height: 100%;\n    width: 100%;\n  }\n\n  body {\n    background-color: #3D5866;\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n    color: whitesmoke;\n  }\n  #root {\n    min-height: 100%;\n    min-width: 100%;\n  }\n\n  p,\n  label {\n    font-family: Georgia, Times, 'Times New Roman', serif;\n    line-height: 1.5em;\n  }\n\n  input, select {\n    font-family: inherit;\n    font-size: inherit;\n  }\n"]))),p=t(70),g=Object(p.a)((function(){return t.e(14).then(t.bind(null,527))}),(function(e){return e.HomePage})),v=Object(p.a)((function(){return Promise.all([t.e(4),t.e(7)]).then(t.bind(null,535))}),(function(e){return e.ControlPage})),j=t(163),E=t(517),O=new f.a({uri:"http://localhost:8001/graphql",credentials:"include",cache:new s.a});function k(){var e=Object(E.a)().i18n;return c.createElement(m.a,{client:O},c.createElement(o.a,null,c.createElement(i.a,{titleTemplate:"%s - React Boilerplate",defaultTitle:"React Boilerplate",htmlAttributes:{lang:e.language}},c.createElement("meta",{name:"description",content:"A React Boilerplate application"})),c.createElement(u.c,null,c.createElement(u.a,{exact:!0,path:"/",component:g}),c.createElement(u.a,{exact:!0,path:"/control",component:v}),c.createElement(u.a,{component:j.a})),c.createElement(d,null)))}var w=t(248),y=t(123),T=t(259),P=t(263),B=t(260),F=t(33);function R(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return 0===Object.keys(e).length?function(e){return e}:Object(F.c)(Object(B.a)({},e))}var S=function(e){e&&e instanceof Function&&t.e(15).then(t.bind(null,529)).then((function(n){var t=n.getCLS,a=n.getFID,c=n.getFCP,r=n.getLCP,l=n.getTTFB;t(e),a(e),c(e),r(e),l(e)}))},C=t(264),N=t(95),x=t(262),A=t(160),H={},J={en:{translation:A}};!function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:H,a=arguments.length>2?arguments[2]:void 0;Object.keys(n).forEach((function(c){var r=a?"".concat(a,".").concat(c):c;"object"===typeof n[c]?(t[c]={},e(n[c],t[c],r)):t[c]=r}))}(A);C.a.use(N.e).use(x.a).init({resources:J,fallbackLng:"en",debug:!1,interpolation:{escapeValue:!1}});var L=function(){var e=Object(P.a)({}),n=e.run,t=[e],a=[Object(T.a)({createReducer:R,runSaga:n})];return Object(y.a)({reducer:R(),middleware:[].concat(Object(w.a)(Object(y.b)()),t),devTools:!1,enhancers:a})}(),z=document.getElementById("root");r.render(c.createElement(l.a,{store:L},c.createElement(i.b,null,c.createElement(c.StrictMode,null,c.createElement(k,null)))),z),S()},70:function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));var a=t(0),c=t.n(a),r=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{fallback:null},r=e;n&&(r=function(){return e().then((function(e){return{default:n(e)}}))});var l=Object(a.lazy)(r);return function(e){return c.a.createElement(a.Suspense,{fallback:t.fallback},c.a.createElement(l,e))}}}},[[503,2,3]]]);