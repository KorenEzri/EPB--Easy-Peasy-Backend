/*! For license information please see 1.0ce571a3.chunk.js.LICENSE.txt */
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{520:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n(165);function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],i=!0,r=!1,a=void 0;try{for(var s,o=e[Symbol.iterator]();!(i=(s=o.next()).done)&&(n.push(s.value),!t||n.length!==t);i=!0);}catch(c){r=!0,a=c}finally{try{i||null==o.return||o.return()}finally{if(r)throw a}}return n}}(e,t)||Object(i.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},522:function(e,t,n){e.exports=n(267)},523:function(e,t,n){"use strict";function i(e,t,n,i,r,a,s){try{var o=e[a](s),c=o.value}catch(u){return void n(u)}o.done?t(c):Promise.resolve(c).then(i,r)}function r(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function o(e){i(s,r,a,o,c,"next",e)}function c(e){i(s,r,a,o,c,"throw",e)}o(void 0)}))}}n.d(t,"a",(function(){return r}))},535:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var i=n(0),r=n.n(i),a=n(3),s=n(259);function o(){var e=r.a.useContext(Object(s.a)()).client;return Object(a.b)(e,33),e}},548:function(e,t,n){"use strict";var i=function(){return(i=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};Object.create;Object.create;function r(e){return(r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}"function"===typeof Symbol&&null!=Symbol.iterator&&Symbol.iterator,"function"===typeof Symbol&&null!=Symbol.asyncIterator&&Symbol.asyncIterator;var a="function"===typeof Symbol&&null!=Symbol.toStringTag?Symbol.toStringTag:"@@toStringTag";function s(e,t){for(var n,i=/\r\n|[\n\r]/g,r=1,a=t+1;(n=i.exec(e.body))&&n.index<t;)r+=1,a=t+1-(n.index+n[0].length);return{line:r,column:a}}function o(e){return c(e.source,s(e.source,e.start))}function c(e,t){var n=e.locationOffset.column-1,i=l(n)+e.body,r=t.line-1,a=e.locationOffset.line-1,s=t.line+a,o=1===t.line?n:0,c=t.column+o,p="".concat(e.name,":").concat(s,":").concat(c,"\n"),h=i.split(/\r\n|[\n\r]/g),f=h[r];if(f.length>120){for(var d=Math.floor(c/80),E=c%80,v=[],N=0;N<f.length;N+=80)v.push(f.slice(N,N+80));return p+u([["".concat(s),v[0]]].concat(v.slice(1,d+1).map((function(e){return["",e]})),[[" ",l(E-1)+"^"],["",v[d+1]]]))}return p+u([["".concat(s-1),h[r-1]],["".concat(s),f],["",l(c-1)+"^"],["".concat(s+1),h[r+1]]])}function u(e){var t=e.filter((function(e){e[0];return void 0!==e[1]})),n=Math.max.apply(Math,t.map((function(e){return e[0].length})));return t.map((function(e){var t,i=e[0],r=e[1];return l(n-(t=i).length)+t+(r?" | "+r:" |")})).join("\n")}function l(e){return Array(e+1).join(" ")}function p(e){return(p="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function f(e,t){return!t||"object"!==p(t)&&"function"!==typeof t?d(e):t}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e){var t="function"===typeof Map?new Map:void 0;return(E=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!==typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof t){if(t.has(e))return t.get(e);t.set(e,i)}function i(){return v(e,arguments,I(this).constructor)}return i.prototype=Object.create(e.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),T(i,e)})(e)}function v(e,t,n){return(v=N()?Reflect.construct:function(e,t,n){var i=[null];i.push.apply(i,t);var r=new(Function.bind.apply(e,i));return n&&T(r,n.prototype),r}).apply(null,arguments)}function N(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(l,e);var t,n,i,u=function(e){var t=N();return function(){var n,i=I(e);if(t){var r=I(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return f(this,n)}}(l);function l(e,t,n,i,a,o,c){var p,h,E,v,N;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),N=u.call(this,e);var T,I=Array.isArray(t)?0!==t.length?t:void 0:t?[t]:void 0,y=n;!y&&I&&(y=null===(T=I[0].loc)||void 0===T?void 0:T.source);var m,_=i;!_&&I&&(_=I.reduce((function(e,t){return t.loc&&e.push(t.loc.start),e}),[])),_&&0===_.length&&(_=void 0),i&&n?m=i.map((function(e){return s(n,e)})):I&&(m=I.reduce((function(e,t){return t.loc&&e.push(s(t.loc.source,t.loc.start)),e}),[]));var O,A=c;if(null==A&&null!=o){var D=o.extensions;"object"==r(O=D)&&null!==O&&(A=D)}return Object.defineProperties(d(N),{name:{value:"GraphQLError"},message:{value:e,enumerable:!0,writable:!0},locations:{value:null!==(p=m)&&void 0!==p?p:void 0,enumerable:null!=m},path:{value:null!==a&&void 0!==a?a:void 0,enumerable:null!=a},nodes:{value:null!==I&&void 0!==I?I:void 0},source:{value:null!==(h=y)&&void 0!==h?h:void 0},positions:{value:null!==(E=_)&&void 0!==E?E:void 0},originalError:{value:o},extensions:{value:null!==(v=A)&&void 0!==v?v:void 0,enumerable:null!=A}}),null!==o&&void 0!==o&&o.stack?(Object.defineProperty(d(N),"stack",{value:o.stack,writable:!0,configurable:!0}),f(N)):(Error.captureStackTrace?Error.captureStackTrace(d(N),l):Object.defineProperty(d(N),"stack",{value:Error().stack,writable:!0,configurable:!0}),N)}return t=l,(n=[{key:"toString",value:function(){return function(e){var t=e.message;if(e.nodes)for(var n=0,i=e.nodes;n<i.length;n++){var r=i[n];r.loc&&(t+="\n\n"+o(r.loc))}else if(e.source&&e.locations)for(var a=0,s=e.locations;a<s.length;a++){var u=s[a];t+="\n\n"+c(e.source,u)}return t}(this)}},{key:a,get:function(){return"Object"}}])&&h(t.prototype,n),i&&h(t,i),l}(E(Error));function m(e,t,n){return new y("Syntax Error: ".concat(n),void 0,e,[t])}var _=Object.freeze({NAME:"Name",DOCUMENT:"Document",OPERATION_DEFINITION:"OperationDefinition",VARIABLE_DEFINITION:"VariableDefinition",SELECTION_SET:"SelectionSet",FIELD:"Field",ARGUMENT:"Argument",FRAGMENT_SPREAD:"FragmentSpread",INLINE_FRAGMENT:"InlineFragment",FRAGMENT_DEFINITION:"FragmentDefinition",VARIABLE:"Variable",INT:"IntValue",FLOAT:"FloatValue",STRING:"StringValue",BOOLEAN:"BooleanValue",NULL:"NullValue",ENUM:"EnumValue",LIST:"ListValue",OBJECT:"ObjectValue",OBJECT_FIELD:"ObjectField",DIRECTIVE:"Directive",NAMED_TYPE:"NamedType",LIST_TYPE:"ListType",NON_NULL_TYPE:"NonNullType",SCHEMA_DEFINITION:"SchemaDefinition",OPERATION_TYPE_DEFINITION:"OperationTypeDefinition",SCALAR_TYPE_DEFINITION:"ScalarTypeDefinition",OBJECT_TYPE_DEFINITION:"ObjectTypeDefinition",FIELD_DEFINITION:"FieldDefinition",INPUT_VALUE_DEFINITION:"InputValueDefinition",INTERFACE_TYPE_DEFINITION:"InterfaceTypeDefinition",UNION_TYPE_DEFINITION:"UnionTypeDefinition",ENUM_TYPE_DEFINITION:"EnumTypeDefinition",ENUM_VALUE_DEFINITION:"EnumValueDefinition",INPUT_OBJECT_TYPE_DEFINITION:"InputObjectTypeDefinition",DIRECTIVE_DEFINITION:"DirectiveDefinition",SCHEMA_EXTENSION:"SchemaExtension",SCALAR_TYPE_EXTENSION:"ScalarTypeExtension",OBJECT_TYPE_EXTENSION:"ObjectTypeExtension",INTERFACE_TYPE_EXTENSION:"InterfaceTypeExtension",UNION_TYPE_EXTENSION:"UnionTypeExtension",ENUM_TYPE_EXTENSION:"EnumTypeExtension",INPUT_OBJECT_TYPE_EXTENSION:"InputObjectTypeExtension"}),O=n(156),A=Object.freeze({SOF:"<SOF>",EOF:"<EOF>",BANG:"!",DOLLAR:"$",AMP:"&",PAREN_L:"(",PAREN_R:")",SPREAD:"...",COLON:":",EQUALS:"=",AT:"@",BRACKET_L:"[",BRACKET_R:"]",BRACE_L:"{",PIPE:"|",BRACE_R:"}",NAME:"Name",INT:"Int",FLOAT:"Float",STRING:"String",BLOCK_STRING:"BlockString",COMMENT:"Comment"}),D=n(235);function x(e,t){if(!Boolean(e))throw new Error(t)}var k=function(e,t){return e instanceof t};function b(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var S=function(){function e(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GraphQL request",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{line:1,column:1};"string"===typeof e||x(0,"Body must be a string. Received: ".concat(Object(D.a)(e),".")),this.body=e,this.name=t,this.locationOffset=n,this.locationOffset.line>0||x(0,"line in locationOffset is 1-indexed and must be positive."),this.locationOffset.column>0||x(0,"column in locationOffset is 1-indexed and must be positive.")}var t,n,i;return t=e,(n=[{key:a,get:function(){return"Source"}}])&&b(t.prototype,n),i&&b(t,i),e}();var R=Object.freeze({QUERY:"QUERY",MUTATION:"MUTATION",SUBSCRIPTION:"SUBSCRIPTION",FIELD:"FIELD",FRAGMENT_DEFINITION:"FRAGMENT_DEFINITION",FRAGMENT_SPREAD:"FRAGMENT_SPREAD",INLINE_FRAGMENT:"INLINE_FRAGMENT",VARIABLE_DEFINITION:"VARIABLE_DEFINITION",SCHEMA:"SCHEMA",SCALAR:"SCALAR",OBJECT:"OBJECT",FIELD_DEFINITION:"FIELD_DEFINITION",ARGUMENT_DEFINITION:"ARGUMENT_DEFINITION",INTERFACE:"INTERFACE",UNION:"UNION",ENUM:"ENUM",ENUM_VALUE:"ENUM_VALUE",INPUT_OBJECT:"INPUT_OBJECT",INPUT_FIELD_DEFINITION:"INPUT_FIELD_DEFINITION"}),C=n(236),L=function(){function e(e){var t=new O.b(A.SOF,0,0,0,0,null);this.source=e,this.lastToken=t,this.token=t,this.line=1,this.lineStart=0}var t=e.prototype;return t.advance=function(){return this.lastToken=this.token,this.token=this.lookahead()},t.lookahead=function(){var e=this.token;if(e.kind!==A.EOF)do{var t;e=null!==(t=e.next)&&void 0!==t?t:e.next=g(this,e)}while(e.kind===A.COMMENT);return e},e}();function w(e){return isNaN(e)?A.EOF:e<127?JSON.stringify(String.fromCharCode(e)):'"\\u'.concat(("00"+e.toString(16).toUpperCase()).slice(-4),'"')}function g(e,t){for(var n=e.source,i=n.body,r=i.length,a=t.end;a<r;){var s=i.charCodeAt(a),o=e.line,c=1+a-e.lineStart;switch(s){case 65279:case 9:case 32:case 44:++a;continue;case 10:++a,++e.line,e.lineStart=a;continue;case 13:10===i.charCodeAt(a+1)?a+=2:++a,++e.line,e.lineStart=a;continue;case 33:return new O.b(A.BANG,a,a+1,o,c,t);case 35:return P(n,a,o,c,t);case 36:return new O.b(A.DOLLAR,a,a+1,o,c,t);case 38:return new O.b(A.AMP,a,a+1,o,c,t);case 40:return new O.b(A.PAREN_L,a,a+1,o,c,t);case 41:return new O.b(A.PAREN_R,a,a+1,o,c,t);case 46:if(46===i.charCodeAt(a+1)&&46===i.charCodeAt(a+2))return new O.b(A.SPREAD,a,a+3,o,c,t);break;case 58:return new O.b(A.COLON,a,a+1,o,c,t);case 61:return new O.b(A.EQUALS,a,a+1,o,c,t);case 64:return new O.b(A.AT,a,a+1,o,c,t);case 91:return new O.b(A.BRACKET_L,a,a+1,o,c,t);case 93:return new O.b(A.BRACKET_R,a,a+1,o,c,t);case 123:return new O.b(A.BRACE_L,a,a+1,o,c,t);case 124:return new O.b(A.PIPE,a,a+1,o,c,t);case 125:return new O.b(A.BRACE_R,a,a+1,o,c,t);case 34:return 34===i.charCodeAt(a+1)&&34===i.charCodeAt(a+2)?V(n,a,o,c,t,e):U(n,a,o,c,t);case 45:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return M(n,a,s,o,c,t);case 65:case 66:case 67:case 68:case 69:case 70:case 71:case 72:case 73:case 74:case 75:case 76:case 77:case 78:case 79:case 80:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:case 90:case 95:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 106:case 107:case 108:case 109:case 110:case 111:case 112:case 113:case 114:case 115:case 116:case 117:case 118:case 119:case 120:case 121:case 122:return K(n,a,o,c,t)}throw m(n,a,F(s))}var u=e.line,l=1+a-e.lineStart;return new O.b(A.EOF,r,r,u,l,t)}function F(e){return e<32&&9!==e&&10!==e&&13!==e?"Cannot contain the invalid character ".concat(w(e),"."):39===e?"Unexpected single quote character ('), did you mean to use a double quote (\")?":"Cannot parse the unexpected character ".concat(w(e),".")}function P(e,t,n,i,r){var a,s=e.body,o=t;do{a=s.charCodeAt(++o)}while(!isNaN(a)&&(a>31||9===a));return new O.b(A.COMMENT,t,o,n,i,r,s.slice(t+1,o))}function M(e,t,n,i,r,a){var s=e.body,o=n,c=t,u=!1;if(45===o&&(o=s.charCodeAt(++c)),48===o){if((o=s.charCodeAt(++c))>=48&&o<=57)throw m(e,c,"Invalid number, unexpected digit after 0: ".concat(w(o),"."))}else c=B(e,c,o),o=s.charCodeAt(c);if(46===o&&(u=!0,o=s.charCodeAt(++c),c=B(e,c,o),o=s.charCodeAt(c)),69!==o&&101!==o||(u=!0,43!==(o=s.charCodeAt(++c))&&45!==o||(o=s.charCodeAt(++c)),c=B(e,c,o),o=s.charCodeAt(c)),46===o||function(e){return 95===e||e>=65&&e<=90||e>=97&&e<=122}(o))throw m(e,c,"Invalid number, expected digit but got: ".concat(w(o),"."));return new O.b(u?A.FLOAT:A.INT,t,c,i,r,a,s.slice(t,c))}function B(e,t,n){var i=e.body,r=t,a=n;if(a>=48&&a<=57){do{a=i.charCodeAt(++r)}while(a>=48&&a<=57);return r}throw m(e,r,"Invalid number, expected digit but got: ".concat(w(a),"."))}function U(e,t,n,i,r){for(var a,s,o,c,u=e.body,l=t+1,p=l,h=0,f="";l<u.length&&!isNaN(h=u.charCodeAt(l))&&10!==h&&13!==h;){if(34===h)return f+=u.slice(p,l),new O.b(A.STRING,t,l+1,n,i,r,f);if(h<32&&9!==h)throw m(e,l,"Invalid character within String: ".concat(w(h),"."));if(++l,92===h){switch(f+=u.slice(p,l-1),h=u.charCodeAt(l)){case 34:f+='"';break;case 47:f+="/";break;case 92:f+="\\";break;case 98:f+="\b";break;case 102:f+="\f";break;case 110:f+="\n";break;case 114:f+="\r";break;case 116:f+="\t";break;case 117:var d=(a=u.charCodeAt(l+1),s=u.charCodeAt(l+2),o=u.charCodeAt(l+3),c=u.charCodeAt(l+4),j(a)<<12|j(s)<<8|j(o)<<4|j(c));if(d<0){var E=u.slice(l+1,l+5);throw m(e,l,"Invalid character escape sequence: \\u".concat(E,"."))}f+=String.fromCharCode(d),l+=4;break;default:throw m(e,l,"Invalid character escape sequence: \\".concat(String.fromCharCode(h),"."))}p=++l}}throw m(e,l,"Unterminated string.")}function V(e,t,n,i,r,a){for(var s=e.body,o=t+3,c=o,u=0,l="";o<s.length&&!isNaN(u=s.charCodeAt(o));){if(34===u&&34===s.charCodeAt(o+1)&&34===s.charCodeAt(o+2))return l+=s.slice(c,o),new O.b(A.BLOCK_STRING,t,o+3,n,i,r,Object(C.a)(l));if(u<32&&9!==u&&10!==u&&13!==u)throw m(e,o,"Invalid character within String: ".concat(w(u),"."));10===u?(++o,++a.line,a.lineStart=o):13===u?(10===s.charCodeAt(o+1)?o+=2:++o,++a.line,a.lineStart=o):92===u&&34===s.charCodeAt(o+1)&&34===s.charCodeAt(o+2)&&34===s.charCodeAt(o+3)?(l+=s.slice(c,o)+'"""',c=o+=4):++o}throw m(e,o,"Unterminated string.")}function j(e){return e>=48&&e<=57?e-48:e>=65&&e<=70?e-55:e>=97&&e<=102?e-87:-1}function K(e,t,n,i,r){for(var a=e.body,s=a.length,o=t+1,c=0;o!==s&&!isNaN(c=a.charCodeAt(o))&&(95===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122);)++o;return new O.b(A.NAME,t,o,n,i,r,a.slice(t,o))}var G=function(){function e(e,t){var n=function(e){return k(e,S)}(e)?e:new S(e);this._lexer=new L(n),this._options=t}var t=e.prototype;return t.parseName=function(){var e=this.expectToken(A.NAME);return{kind:_.NAME,value:e.value,loc:this.loc(e)}},t.parseDocument=function(){var e=this._lexer.token;return{kind:_.DOCUMENT,definitions:this.many(A.SOF,this.parseDefinition,A.EOF),loc:this.loc(e)}},t.parseDefinition=function(){if(this.peek(A.NAME))switch(this._lexer.token.value){case"query":case"mutation":case"subscription":return this.parseOperationDefinition();case"fragment":return this.parseFragmentDefinition();case"schema":case"scalar":case"type":case"interface":case"union":case"enum":case"input":case"directive":return this.parseTypeSystemDefinition();case"extend":return this.parseTypeSystemExtension()}else{if(this.peek(A.BRACE_L))return this.parseOperationDefinition();if(this.peekDescription())return this.parseTypeSystemDefinition()}throw this.unexpected()},t.parseOperationDefinition=function(){var e=this._lexer.token;if(this.peek(A.BRACE_L))return{kind:_.OPERATION_DEFINITION,operation:"query",name:void 0,variableDefinitions:[],directives:[],selectionSet:this.parseSelectionSet(),loc:this.loc(e)};var t,n=this.parseOperationType();return this.peek(A.NAME)&&(t=this.parseName()),{kind:_.OPERATION_DEFINITION,operation:n,name:t,variableDefinitions:this.parseVariableDefinitions(),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(e)}},t.parseOperationType=function(){var e=this.expectToken(A.NAME);switch(e.value){case"query":return"query";case"mutation":return"mutation";case"subscription":return"subscription"}throw this.unexpected(e)},t.parseVariableDefinitions=function(){return this.optionalMany(A.PAREN_L,this.parseVariableDefinition,A.PAREN_R)},t.parseVariableDefinition=function(){var e=this._lexer.token;return{kind:_.VARIABLE_DEFINITION,variable:this.parseVariable(),type:(this.expectToken(A.COLON),this.parseTypeReference()),defaultValue:this.expectOptionalToken(A.EQUALS)?this.parseValueLiteral(!0):void 0,directives:this.parseDirectives(!0),loc:this.loc(e)}},t.parseVariable=function(){var e=this._lexer.token;return this.expectToken(A.DOLLAR),{kind:_.VARIABLE,name:this.parseName(),loc:this.loc(e)}},t.parseSelectionSet=function(){var e=this._lexer.token;return{kind:_.SELECTION_SET,selections:this.many(A.BRACE_L,this.parseSelection,A.BRACE_R),loc:this.loc(e)}},t.parseSelection=function(){return this.peek(A.SPREAD)?this.parseFragment():this.parseField()},t.parseField=function(){var e,t,n=this._lexer.token,i=this.parseName();return this.expectOptionalToken(A.COLON)?(e=i,t=this.parseName()):t=i,{kind:_.FIELD,alias:e,name:t,arguments:this.parseArguments(!1),directives:this.parseDirectives(!1),selectionSet:this.peek(A.BRACE_L)?this.parseSelectionSet():void 0,loc:this.loc(n)}},t.parseArguments=function(e){var t=e?this.parseConstArgument:this.parseArgument;return this.optionalMany(A.PAREN_L,t,A.PAREN_R)},t.parseArgument=function(){var e=this._lexer.token,t=this.parseName();return this.expectToken(A.COLON),{kind:_.ARGUMENT,name:t,value:this.parseValueLiteral(!1),loc:this.loc(e)}},t.parseConstArgument=function(){var e=this._lexer.token;return{kind:_.ARGUMENT,name:this.parseName(),value:(this.expectToken(A.COLON),this.parseValueLiteral(!0)),loc:this.loc(e)}},t.parseFragment=function(){var e=this._lexer.token;this.expectToken(A.SPREAD);var t=this.expectOptionalKeyword("on");return!t&&this.peek(A.NAME)?{kind:_.FRAGMENT_SPREAD,name:this.parseFragmentName(),directives:this.parseDirectives(!1),loc:this.loc(e)}:{kind:_.INLINE_FRAGMENT,typeCondition:t?this.parseNamedType():void 0,directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(e)}},t.parseFragmentDefinition=function(){var e,t=this._lexer.token;return this.expectKeyword("fragment"),!0===(null===(e=this._options)||void 0===e?void 0:e.experimentalFragmentVariables)?{kind:_.FRAGMENT_DEFINITION,name:this.parseFragmentName(),variableDefinitions:this.parseVariableDefinitions(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(t)}:{kind:_.FRAGMENT_DEFINITION,name:this.parseFragmentName(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(t)}},t.parseFragmentName=function(){if("on"===this._lexer.token.value)throw this.unexpected();return this.parseName()},t.parseValueLiteral=function(e){var t=this._lexer.token;switch(t.kind){case A.BRACKET_L:return this.parseList(e);case A.BRACE_L:return this.parseObject(e);case A.INT:return this._lexer.advance(),{kind:_.INT,value:t.value,loc:this.loc(t)};case A.FLOAT:return this._lexer.advance(),{kind:_.FLOAT,value:t.value,loc:this.loc(t)};case A.STRING:case A.BLOCK_STRING:return this.parseStringLiteral();case A.NAME:switch(this._lexer.advance(),t.value){case"true":return{kind:_.BOOLEAN,value:!0,loc:this.loc(t)};case"false":return{kind:_.BOOLEAN,value:!1,loc:this.loc(t)};case"null":return{kind:_.NULL,loc:this.loc(t)};default:return{kind:_.ENUM,value:t.value,loc:this.loc(t)}}case A.DOLLAR:if(!e)return this.parseVariable()}throw this.unexpected()},t.parseStringLiteral=function(){var e=this._lexer.token;return this._lexer.advance(),{kind:_.STRING,value:e.value,block:e.kind===A.BLOCK_STRING,loc:this.loc(e)}},t.parseList=function(e){var t=this,n=this._lexer.token;return{kind:_.LIST,values:this.any(A.BRACKET_L,(function(){return t.parseValueLiteral(e)}),A.BRACKET_R),loc:this.loc(n)}},t.parseObject=function(e){var t=this,n=this._lexer.token;return{kind:_.OBJECT,fields:this.any(A.BRACE_L,(function(){return t.parseObjectField(e)}),A.BRACE_R),loc:this.loc(n)}},t.parseObjectField=function(e){var t=this._lexer.token,n=this.parseName();return this.expectToken(A.COLON),{kind:_.OBJECT_FIELD,name:n,value:this.parseValueLiteral(e),loc:this.loc(t)}},t.parseDirectives=function(e){for(var t=[];this.peek(A.AT);)t.push(this.parseDirective(e));return t},t.parseDirective=function(e){var t=this._lexer.token;return this.expectToken(A.AT),{kind:_.DIRECTIVE,name:this.parseName(),arguments:this.parseArguments(e),loc:this.loc(t)}},t.parseTypeReference=function(){var e,t=this._lexer.token;return this.expectOptionalToken(A.BRACKET_L)?(e=this.parseTypeReference(),this.expectToken(A.BRACKET_R),e={kind:_.LIST_TYPE,type:e,loc:this.loc(t)}):e=this.parseNamedType(),this.expectOptionalToken(A.BANG)?{kind:_.NON_NULL_TYPE,type:e,loc:this.loc(t)}:e},t.parseNamedType=function(){var e=this._lexer.token;return{kind:_.NAMED_TYPE,name:this.parseName(),loc:this.loc(e)}},t.parseTypeSystemDefinition=function(){var e=this.peekDescription()?this._lexer.lookahead():this._lexer.token;if(e.kind===A.NAME)switch(e.value){case"schema":return this.parseSchemaDefinition();case"scalar":return this.parseScalarTypeDefinition();case"type":return this.parseObjectTypeDefinition();case"interface":return this.parseInterfaceTypeDefinition();case"union":return this.parseUnionTypeDefinition();case"enum":return this.parseEnumTypeDefinition();case"input":return this.parseInputObjectTypeDefinition();case"directive":return this.parseDirectiveDefinition()}throw this.unexpected(e)},t.peekDescription=function(){return this.peek(A.STRING)||this.peek(A.BLOCK_STRING)},t.parseDescription=function(){if(this.peekDescription())return this.parseStringLiteral()},t.parseSchemaDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("schema");var n=this.parseDirectives(!0),i=this.many(A.BRACE_L,this.parseOperationTypeDefinition,A.BRACE_R);return{kind:_.SCHEMA_DEFINITION,description:t,directives:n,operationTypes:i,loc:this.loc(e)}},t.parseOperationTypeDefinition=function(){var e=this._lexer.token,t=this.parseOperationType();this.expectToken(A.COLON);var n=this.parseNamedType();return{kind:_.OPERATION_TYPE_DEFINITION,operation:t,type:n,loc:this.loc(e)}},t.parseScalarTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("scalar");var n=this.parseName(),i=this.parseDirectives(!0);return{kind:_.SCALAR_TYPE_DEFINITION,description:t,name:n,directives:i,loc:this.loc(e)}},t.parseObjectTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("type");var n=this.parseName(),i=this.parseImplementsInterfaces(),r=this.parseDirectives(!0),a=this.parseFieldsDefinition();return{kind:_.OBJECT_TYPE_DEFINITION,description:t,name:n,interfaces:i,directives:r,fields:a,loc:this.loc(e)}},t.parseImplementsInterfaces=function(){var e;if(!this.expectOptionalKeyword("implements"))return[];if(!0===(null===(e=this._options)||void 0===e?void 0:e.allowLegacySDLImplementsInterfaces)){var t=[];this.expectOptionalToken(A.AMP);do{t.push(this.parseNamedType())}while(this.expectOptionalToken(A.AMP)||this.peek(A.NAME));return t}return this.delimitedMany(A.AMP,this.parseNamedType)},t.parseFieldsDefinition=function(){var e;return!0===(null===(e=this._options)||void 0===e?void 0:e.allowLegacySDLEmptyFields)&&this.peek(A.BRACE_L)&&this._lexer.lookahead().kind===A.BRACE_R?(this._lexer.advance(),this._lexer.advance(),[]):this.optionalMany(A.BRACE_L,this.parseFieldDefinition,A.BRACE_R)},t.parseFieldDefinition=function(){var e=this._lexer.token,t=this.parseDescription(),n=this.parseName(),i=this.parseArgumentDefs();this.expectToken(A.COLON);var r=this.parseTypeReference(),a=this.parseDirectives(!0);return{kind:_.FIELD_DEFINITION,description:t,name:n,arguments:i,type:r,directives:a,loc:this.loc(e)}},t.parseArgumentDefs=function(){return this.optionalMany(A.PAREN_L,this.parseInputValueDef,A.PAREN_R)},t.parseInputValueDef=function(){var e=this._lexer.token,t=this.parseDescription(),n=this.parseName();this.expectToken(A.COLON);var i,r=this.parseTypeReference();this.expectOptionalToken(A.EQUALS)&&(i=this.parseValueLiteral(!0));var a=this.parseDirectives(!0);return{kind:_.INPUT_VALUE_DEFINITION,description:t,name:n,type:r,defaultValue:i,directives:a,loc:this.loc(e)}},t.parseInterfaceTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("interface");var n=this.parseName(),i=this.parseImplementsInterfaces(),r=this.parseDirectives(!0),a=this.parseFieldsDefinition();return{kind:_.INTERFACE_TYPE_DEFINITION,description:t,name:n,interfaces:i,directives:r,fields:a,loc:this.loc(e)}},t.parseUnionTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("union");var n=this.parseName(),i=this.parseDirectives(!0),r=this.parseUnionMemberTypes();return{kind:_.UNION_TYPE_DEFINITION,description:t,name:n,directives:i,types:r,loc:this.loc(e)}},t.parseUnionMemberTypes=function(){return this.expectOptionalToken(A.EQUALS)?this.delimitedMany(A.PIPE,this.parseNamedType):[]},t.parseEnumTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("enum");var n=this.parseName(),i=this.parseDirectives(!0),r=this.parseEnumValuesDefinition();return{kind:_.ENUM_TYPE_DEFINITION,description:t,name:n,directives:i,values:r,loc:this.loc(e)}},t.parseEnumValuesDefinition=function(){return this.optionalMany(A.BRACE_L,this.parseEnumValueDefinition,A.BRACE_R)},t.parseEnumValueDefinition=function(){var e=this._lexer.token,t=this.parseDescription(),n=this.parseName(),i=this.parseDirectives(!0);return{kind:_.ENUM_VALUE_DEFINITION,description:t,name:n,directives:i,loc:this.loc(e)}},t.parseInputObjectTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("input");var n=this.parseName(),i=this.parseDirectives(!0),r=this.parseInputFieldsDefinition();return{kind:_.INPUT_OBJECT_TYPE_DEFINITION,description:t,name:n,directives:i,fields:r,loc:this.loc(e)}},t.parseInputFieldsDefinition=function(){return this.optionalMany(A.BRACE_L,this.parseInputValueDef,A.BRACE_R)},t.parseTypeSystemExtension=function(){var e=this._lexer.lookahead();if(e.kind===A.NAME)switch(e.value){case"schema":return this.parseSchemaExtension();case"scalar":return this.parseScalarTypeExtension();case"type":return this.parseObjectTypeExtension();case"interface":return this.parseInterfaceTypeExtension();case"union":return this.parseUnionTypeExtension();case"enum":return this.parseEnumTypeExtension();case"input":return this.parseInputObjectTypeExtension()}throw this.unexpected(e)},t.parseSchemaExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("schema");var t=this.parseDirectives(!0),n=this.optionalMany(A.BRACE_L,this.parseOperationTypeDefinition,A.BRACE_R);if(0===t.length&&0===n.length)throw this.unexpected();return{kind:_.SCHEMA_EXTENSION,directives:t,operationTypes:n,loc:this.loc(e)}},t.parseScalarTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("scalar");var t=this.parseName(),n=this.parseDirectives(!0);if(0===n.length)throw this.unexpected();return{kind:_.SCALAR_TYPE_EXTENSION,name:t,directives:n,loc:this.loc(e)}},t.parseObjectTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("type");var t=this.parseName(),n=this.parseImplementsInterfaces(),i=this.parseDirectives(!0),r=this.parseFieldsDefinition();if(0===n.length&&0===i.length&&0===r.length)throw this.unexpected();return{kind:_.OBJECT_TYPE_EXTENSION,name:t,interfaces:n,directives:i,fields:r,loc:this.loc(e)}},t.parseInterfaceTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("interface");var t=this.parseName(),n=this.parseImplementsInterfaces(),i=this.parseDirectives(!0),r=this.parseFieldsDefinition();if(0===n.length&&0===i.length&&0===r.length)throw this.unexpected();return{kind:_.INTERFACE_TYPE_EXTENSION,name:t,interfaces:n,directives:i,fields:r,loc:this.loc(e)}},t.parseUnionTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("union");var t=this.parseName(),n=this.parseDirectives(!0),i=this.parseUnionMemberTypes();if(0===n.length&&0===i.length)throw this.unexpected();return{kind:_.UNION_TYPE_EXTENSION,name:t,directives:n,types:i,loc:this.loc(e)}},t.parseEnumTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("enum");var t=this.parseName(),n=this.parseDirectives(!0),i=this.parseEnumValuesDefinition();if(0===n.length&&0===i.length)throw this.unexpected();return{kind:_.ENUM_TYPE_EXTENSION,name:t,directives:n,values:i,loc:this.loc(e)}},t.parseInputObjectTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("input");var t=this.parseName(),n=this.parseDirectives(!0),i=this.parseInputFieldsDefinition();if(0===n.length&&0===i.length)throw this.unexpected();return{kind:_.INPUT_OBJECT_TYPE_EXTENSION,name:t,directives:n,fields:i,loc:this.loc(e)}},t.parseDirectiveDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("directive"),this.expectToken(A.AT);var n=this.parseName(),i=this.parseArgumentDefs(),r=this.expectOptionalKeyword("repeatable");this.expectKeyword("on");var a=this.parseDirectiveLocations();return{kind:_.DIRECTIVE_DEFINITION,description:t,name:n,arguments:i,repeatable:r,locations:a,loc:this.loc(e)}},t.parseDirectiveLocations=function(){return this.delimitedMany(A.PIPE,this.parseDirectiveLocation)},t.parseDirectiveLocation=function(){var e=this._lexer.token,t=this.parseName();if(void 0!==R[t.value])return t;throw this.unexpected(e)},t.loc=function(e){var t;if(!0!==(null===(t=this._options)||void 0===t?void 0:t.noLocation))return new O.a(e,this._lexer.lastToken,this._lexer.source)},t.peek=function(e){return this._lexer.token.kind===e},t.expectToken=function(e){var t=this._lexer.token;if(t.kind===e)return this._lexer.advance(),t;throw m(this._lexer.source,t.start,"Expected ".concat(J(e),", found ").concat(Y(t),"."))},t.expectOptionalToken=function(e){var t=this._lexer.token;if(t.kind===e)return this._lexer.advance(),t},t.expectKeyword=function(e){var t=this._lexer.token;if(t.kind!==A.NAME||t.value!==e)throw m(this._lexer.source,t.start,'Expected "'.concat(e,'", found ').concat(Y(t),"."));this._lexer.advance()},t.expectOptionalKeyword=function(e){var t=this._lexer.token;return t.kind===A.NAME&&t.value===e&&(this._lexer.advance(),!0)},t.unexpected=function(e){var t=null!==e&&void 0!==e?e:this._lexer.token;return m(this._lexer.source,t.start,"Unexpected ".concat(Y(t),"."))},t.any=function(e,t,n){this.expectToken(e);for(var i=[];!this.expectOptionalToken(n);)i.push(t.call(this));return i},t.optionalMany=function(e,t,n){if(this.expectOptionalToken(e)){var i=[];do{i.push(t.call(this))}while(!this.expectOptionalToken(n));return i}return[]},t.many=function(e,t,n){this.expectToken(e);var i=[];do{i.push(t.call(this))}while(!this.expectOptionalToken(n));return i},t.delimitedMany=function(e,t){this.expectOptionalToken(e);var n=[];do{n.push(t.call(this))}while(this.expectOptionalToken(e));return n},e}();function Y(e){var t=e.value;return J(e.kind)+(null!=t?' "'.concat(t,'"'):"")}function J(e){return function(e){return e===A.BANG||e===A.DOLLAR||e===A.AMP||e===A.PAREN_L||e===A.PAREN_R||e===A.SPREAD||e===A.COLON||e===A.EQUALS||e===A.AT||e===A.BRACKET_L||e===A.BRACKET_R||e===A.BRACE_L||e===A.PIPE||e===A.BRACE_R}(e)?'"'.concat(e,'"'):e}var X=new Map,q=new Map,Q=!0,H=!1;function z(e){return e.replace(/[\s,]+/g," ").trim()}function W(e){var t=new Set,n=[];return e.definitions.forEach((function(e){if("FragmentDefinition"===e.kind){var i=e.name.value,r=z((s=e.loc).source.body.substring(s.start,s.end)),a=q.get(i);a&&!a.has(r)?Q&&console.warn("Warning: fragment with name "+i+" already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"):a||q.set(i,a=new Set),a.add(r),t.has(r)||(t.add(r),n.push(e))}else n.push(e);var s})),i(i({},e),{definitions:n})}function $(e){var t=z(e);if(!X.has(t)){var n=function(e,t){return new G(e,t).parseDocument()}(e,{experimentalFragmentVariables:H});if(!n||"Document"!==n.kind)throw new Error("Not a valid GraphQL document.");X.set(t,function(e){var t=new Set(e.definitions);t.forEach((function(e){e.loc&&delete e.loc,Object.keys(e).forEach((function(n){var i=e[n];i&&"object"===typeof i&&t.add(i)}))}));var n=e.loc;return n&&(delete n.startToken,delete n.endToken),e}(W(n)))}return X.get(t)}function Z(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];"string"===typeof e&&(e=[e]);var i=e[0];return t.forEach((function(t,n){t&&"Document"===t.kind?i+=t.loc.source.body:i+=t,i+=e[n+1]})),$(i)}var ee,te=Z,ne=function(){X.clear(),q.clear()},ie=function(){Q=!1},re=function(){H=!0},ae=function(){H=!1};(ee=Z||(Z={})).gql=te,ee.resetCaches=ne,ee.disableFragmentWarnings=ie,ee.enableExperimentalFragmentVariables=re,ee.disableExperimentalFragmentVariables=ae,Z.default=Z;t.a=Z}}]);