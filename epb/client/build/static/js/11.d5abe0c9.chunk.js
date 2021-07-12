(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{524:function(e,n,t){"use strict";t.d(n,"d",(function(){return S})),t.d(n,"c",(function(){return j})),t.d(n,"b",(function(){return y})),t.d(n,"a",(function(){return k}));var r,a,c,o,u,i,s,l,p,b,d,m,f,h,g=t(521),x=t.n(g),O=t(522),$=t(163),v=t(551),S={qGetResolvers:Object(v.a)(r||(r=Object($.a)(["\n    query getResolvers {\n      getResolvers\n    }\n  "]))),qTypeDefs:Object(v.a)(a||(a=Object($.a)(["\n    query getTypeDefs {\n      getTypeDefs\n    }\n  "]))),qActions:Object(v.a)(c||(c=Object($.a)(["\n    query getActions {\n      getActions\n    }\n  "]))),qResolverNames:Object(v.a)(o||(o=Object($.a)(["\n    query getAllResolverNames {\n      getAllResolverNames\n    }\n  "]))),qAllowedTypes:Object(v.a)(u||(u=Object($.a)(["\n    query getAllowedTypes {\n      getAllowedTypes\n    }\n  "]))),qDBSchemaNames:Object(v.a)(i||(i=Object($.a)(["\n    query getAllDBSchemaNames {\n      getAllDBSchemaNames\n    }\n  "]))),qgetAllSchemaProps:Object(v.a)(s||(s=Object($.a)(["\n    query getAllSchemaProps($schemaName: String) {\n      getAllSchemaProps(schemaName: $schemaName)\n    }\n  "]))),qGetAllowedCruds:Object(v.a)(l||(l=Object($.a)(["\n    query getAllowedCruds($schemaName: String) {\n      getAllowedCruds(schemaName: $schemaName)\n    }\n  "])))},j={mCreateResolver:Object(v.a)(p||(p=Object($.a)(["\n    mutation createResolver(\n      $name: String\n      $comment: String\n      $description: String\n      $returnType: String\n      $type: String\n      $properties: [String]\n    ) {\n      createResolver(\n        options: {\n          name: $name\n          comment: $comment\n          description: $description\n          returnType: $returnType\n          type: $type\n          properties: $properties\n        }\n      )\n    }\n  "]))),mCreateInterface:Object(v.a)(b||(b=Object($.a)(["\n    mutation createCustomType(\n      $properties: [String]\n      $name: String\n      $comment: String\n      $typeDef: Boolean\n      $dbSchema: Boolean\n      $type: String\n    ) {\n      createCustomType(\n        options: {\n          properties: $properties\n          name: $name\n          comment: $comment\n          typeDef: $typeDef\n          dbSchema: $dbSchema\n          type: $type\n        }\n      )\n    }\n  "]))),mCreateSchema:Object(v.a)(d||(d=Object($.a)(["\n    mutation createSchema(\n      $properties: [String]\n      $name: String\n      $comment: String\n      $typeDef: Boolean\n      $dbSchema: Boolean\n      $type: String\n      $uniqueIdentifiers: [String]\n    ) {\n      createSchema(\n        options: {\n          properties: $properties\n          name: $name\n          comment: $comment\n          typeDef: $typeDef\n          dbSchema: $dbSchema\n          type: $type\n          uniqueIdentifiers: $uniqueIdentifiers\n        }\n      )\n    }\n  "]))),mAddUserAuth:Object(v.a)(m||(m=Object($.a)(["\n    mutation addUserAuth(\n      $publicUserInputs: [String]\n      $authUserInputs: [String]\n      $publicUserProperties: [String]\n      $authUserProperties: [String]\n    ) {\n      addUserAuth(\n        options: {\n          publicUserInputs: $publicUserInputs\n          authUserInputs: $authUserInputs\n          publicUserProperties: $publicUserProperties\n          authUserProperties: $authUserProperties\n        }\n      )\n    }\n  "]))),mRestartServer:Object(v.a)(f||(f=Object($.a)(["\n    mutation restartServer($timeout: Int) {\n      restartServer(timeout: $timeout)\n    }\n  "]))),mAddCrudOperations:Object(v.a)(h||(h=Object($.a)(["\n    mutation addCrudOperations(\n      $schemaName: String\n      $crudActions: [String]\n      $identifier: identifier\n    ) {\n      addCrudOperations(\n        options: {\n          schemaName: $schemaName\n          crudActions: $crudActions\n          identifier: $identifier\n        }\n      )\n    }\n  "])))},y=function(){var e=Object(O.a)(x.a.mark((function e(n,t,r,a,c){var o,u,i,s,l,p,b,d;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,o=t,!c){e.next=12;break}return e.next=5,n.query({query:o,variables:c});case 5:return u=e.sent,i=u.data,s=i[t.definitions[0].name.value],r&&r(s),e.abrupt("return",s);case 12:return e.next=14,n.query({query:o});case 14:return l=e.sent,p=l.data,b=p[t.definitions[0].name.value],r&&r(b),e.abrupt("return",b);case 19:e.next=26;break;case 21:return e.prev=21,e.t0=e.catch(0),d=e.t0.message,console.log(d),e.abrupt("return",d);case 26:case"end":return e.stop()}}),e,null,[[0,21]])})));return function(n,t,r,a,c){return e.apply(this,arguments)}}(),k=function(){var e=Object(O.a)(x.a.mark((function e(n,t,r,a,c){var o,u,i,s,l;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o=t,e.next=4,n.mutate({mutation:o,variables:r});case 4:return u=e.sent,i=u.data,s=i[t.definitions[0].name.value],a&&a(s),e.abrupt("return",s);case 11:return e.prev=11,e.t0=e.catch(0),l=e.t0.message,console.log(l),e.abrupt("return",l);case 16:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(n,t,r,a,c){return e.apply(this,arguments)}}()},525:function(e,n,t){"use strict";t.d(n,"i",(function(){return f})),t.d(n,"d",(function(){return h})),t.d(n,"f",(function(){return g})),t.d(n,"e",(function(){return x})),t.d(n,"g",(function(){return O})),t.d(n,"b",(function(){return $})),t.d(n,"h",(function(){return v})),t.d(n,"c",(function(){return S})),t.d(n,"a",(function(){return j}));var r,a,c,o,u,i,s,l,p,b,d=t(163),m=t(71),f=m.b.div(r||(r=Object(d.a)([""]))),h=m.b.form(a||(a=Object(d.a)([""]))),g=m.b.div(c||(c=Object(d.a)(["\n  display: flex;\n  flex-direction: column;\n"]))),x=m.b.div(o||(o=Object(d.a)(["\n  letter-spacing: 1.5px;\n  margin: 6px;\n  display: flex;\n  flex-direction: column;\n  input,\n  textarea,\n  select {\n    padding: 6px;\n    width: 60%;\n    background-color: #0f202d;\n    color: #85bcd8;\n  }\n"]))),O=m.b.label(u||(u=Object(d.a)(["\n  margin-bottom: 8px;\n"]))),$=m.b.button(i||(i=Object(d.a)(["\n  box-shadow: inset 0px -3px 7px 0px #29bbff;\n  background: linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);\n  background-color: #2dabf9;\n  border-radius: 3px;\n  border: 1px solid #0b0e07;\n  display: inline-block;\n  cursor: pointer;\n  color: #ffffff;\n  font-family: Arial;\n  font-size: 18px;\n  font-weight: bold;\n  padding: 13px 26px;\n  text-decoration: none;\n  text-shadow: 0px 1px 0px #263666;\n  margin-top: 10px;\n  &:hover {\n    background: linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);\n    background-color: #0688fa;\n  }\n  &:active {\n    position: relative;\n    top: 1px;\n  }\n"]))),v=m.b.span(s||(s=Object(d.a)(["\n  padding-left: 5px;\n  color: #ff3300 !important;\n"]))),S=m.b.span(l||(l=Object(d.a)(["\n  margin-top: 5px;\n  color: #ff3300 !important;\n"]))),j=m.b.div(p||(p=Object(d.a)(["\n  text-align: center;\n"])));m.b.div(b||(b=Object(d.a)(["\n  .custom-checkbox {\n    user-select: none;\n  }\n\n  .custom-checkbox__input {\n    position: absolute;\n    opacity: 0%;\n    z-index: -1;\n  }\n\n  .custom-checkbox__label {\n    cursor: pointer;\n\n    display: flex;\n    align-items: center;\n\n    padding-left: 25px;\n  }\n\n  /* ::before for checkbox frame */\n  .custom-checkbox__label::before {\n    content: ' ';\n\n    position: absolute;\n\n    height: 18px;\n    width: 18px;\n\n    transform: translate(-25px, 0px);\n\n    border: 2px solid lightgray;\n    border-radius: 2px;\n\n    transition: all 0.1s ease-out;\n  }\n\n  /* ::after for checkbox OK symbol inside the frame */\n  .custom-checkbox__label::after {\n    content: ' ';\n\n    position: absolute;\n\n    height: 6px;\n    width: 10px;\n\n    transform: translate(-21px, -1px) rotate(-45deg);\n  }\n\n  /* Checked (enabled) */\n  .custom-checkbox__input:enabled:checked + .custom-checkbox__label::before {\n    background-color: var(--blue);\n    border-color: var(--blue);\n  }\n\n  .custom-checkbox__input:checked + .custom-checkbox__label::after {\n    border-bottom: 3px solid var(--page-background);\n    border-left: 3px solid var(--page-background);\n  }\n\n  /* Active, Hover (enabled) */\n  .custom-checkbox__input:enabled + .custom-checkbox__label:hover::before,\n  .custom-checkbox__input:enabled + .custom-checkbox__label:active:before {\n    border-color: var(--blue);\n  }\n\n  /* Focus border */\n  .custom-checkbox__input:focus + .custom-checkbox__label::before {\n    box-shadow: 0 0 0px 2px var(--page-background),\n      0 0 0px 4px var(--light-blue);\n  }\n  /* #0068FF */\n  /* #ACDAFA */\n  --blue: hsl(216deg 100% 50%);\n  --blue-grad: hsl(216deg 100% 43%);\n  --light-blue: hsl(205deg 89% 83%);\n  --disable-gray: hsl(0deg 0% 60%);\n  --page-background: white;\n\n  box-sizing: border-box;\n\n  *,\n  *::before,\n  *::after {\n    box-sizing: inherit;\n  }\n"])))},554:function(e,n,t){"use strict";t.r(n),t.d(n,"UserAuthForm",(function(){return $}));var r,a=t(163),c=t(521),o=t.n(c),u=t(522),i=t(520),s=t(0),l=t(530),p=t(537),b=t(71),d=t(523),m=t(524),f=t(45),h=Object(f.a)((function(){return t.e(13).then(t.bind(null,545))}),(function(e){return e.AuthInputSelect})),g=Object(f.a)((function(){return t.e(14).then(t.bind(null,546))}),(function(e){return e.UserInputSelect})),x=Object(f.a)((function(){return t.e(15).then(t.bind(null,547))}),(function(e){return e.UserPropsSelect})),O=t(525);function $(e){var n=Object(p.a)(),t=s.useState(!1),r=Object(i.a)(t,2),a=r[0],c=r[1],b=s.useState(""),f=Object(i.a)(b,2),$=f[0],S=f[1],j=s.useState(["username:string","password:string"]),y=Object(i.a)(j,2),k=y[0],A=y[1],_=s.useState([""]),w=Object(i.a)(_,1)[0],U=s.useState([""]),q=Object(i.a)(U,2),E=q[0],I=q[1],C=s.useState([""]),N=Object(i.a)(C,2),P=N[0],D=N[1],T=function(e){return k.includes("username:string")||k.push("username:string"),k.includes("password:string")||k.push("password:string"),e.authUserInputs=k.filter((function(e){return""!==e})),e.authUserProperties=w.filter((function(e){return""!==e})),e.publicUserInputs=E.filter((function(e){return""!==e})),e.publicUserProperties=P.filter((function(e){return""!==e})),e},R=Object(l.a)().handleSubmit,B=function(){var e=Object(u.a)(o.a.mark((function e(t){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=T(t),e.prev=1,c(!0),e.next=5,Object(m.a)(n,m.c.mAddUserAuth,t);case 5:c(!1),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(1),r=e.t0.message,c(!1),S(r);case 13:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(n){return e.apply(this,arguments)}}();return s.createElement(O.i,null,s.createElement(O.d,null,s.createElement(O.f,null,s.createElement(O.e,null,s.createElement(O.g,null,"Step one:",s.createElement("br",null),"Select user-auth inputs."),s.createElement(h,{inputs:{authInputs:k,setAuthInputs:A}})),s.createElement(O.e,null,s.createElement(O.g,null,"Step two:",s.createElement("br",null),"Select public user inputs."),s.createElement(g,{inputs:{userInputs:E,setUserInputs:I}})),s.createElement(O.e,null,s.createElement(O.g,null,"Step three:",s.createElement("br",null),"Select public user optional properties."),s.createElement(x,{inputs:{userProperties:P,setUserProperties:D}})),s.createElement(d.d,{error:$,setError:S,show:a,VisualComponent:d.e},s.createElement(v,null,s.createElement(O.b,{type:"button",onClick:R(B)},"Create"))))))}var v=b.b.div(r||(r=Object(a.a)(["\n  margin: auto;\n"])))}}]);