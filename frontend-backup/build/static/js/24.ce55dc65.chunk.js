(this["webpackJsonpcode-tour-frontend"]=this["webpackJsonpcode-tour-frontend"]||[]).push([[24],{575:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var c=a(30),r=a(31),n=a(11),o=a(8),i=a(27),l=function(){function e(){Object(c.a)(this,e)}return Object(r.a)(e,null,[{key:"getCategories",value:function(e){var t=n.f.buildBeURL(o.b.FORUM.BASE,o.b.FORUM.PATH.CATEGORIES);return i.a.get(t,e)}},{key:"getForumDetails",value:function(e){var t=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.FORUMS,"/").concat(e));return i.a.get(t)}},{key:"getTopicDetails",value:function(e){var t=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.TOPICS,"/").concat(e));return i.a.get(t)}},{key:"getTopicsByForum",value:function(e,t){var a=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.FORUMS,"/").concat(t).concat(o.b.FORUM.PATH.TOPICS));return i.a.get(a,e)}},{key:"getPostsByTopic",value:function(e,t){var a=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.TOPICS,"/").concat(t).concat(o.b.FORUM.PATH.POSTS));return i.a.get(a,e)}},{key:"postPost",value:function(e,t){var a=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.TOPICS,"/").concat(e).concat(o.b.FORUM.PATH.POSTS));return i.a.post(a,t)}},{key:"createTopic",value:function(e,t){var a=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.FORUMS,"/").concat(e).concat(o.b.FORUM.PATH.TOPICS));return i.a.post(a,t)}},{key:"postTopicView",value:function(e){var t=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.TOPICS,"/").concat(e,"/views"));return i.a.post(t)}},{key:"postPostLike",value:function(e){var t=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.POSTS,"/").concat(e,"/likes"));return i.a.post(t,{isLike:!0})}},{key:"postPostDislike",value:function(e){var t=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.POSTS,"/").concat(e,"/likes"));return i.a.post(t,{isLike:!1})}},{key:"deletePostLikeDislike",value:function(e){var t=n.f.buildBeURL(o.b.FORUM.BASE,"".concat(o.b.FORUM.PATH.POSTS,"/").concat(e,"/likes"));return i.a.delete(t)}}]),e}()},594:function(e,t,a){"use strict";var c=a(2),r=a(3),n=a(10),o=a(0),i=a(5),l=a.n(i),s=a(42),u=a(221),b=a(225),p=a(61),O=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(c=Object.getOwnPropertySymbols(e);r<c.length;r++)t.indexOf(c[r])<0&&Object.prototype.propertyIsEnumerable.call(e,c[r])&&(a[c[r]]=e[c[r]])}return a},m=function(e){var t,a,r=e.prefixCls,n=e.separator,i=void 0===n?"/":n,l=e.children,s=e.overlay,m=e.dropdownProps,d=O(e,["prefixCls","separator","children","overlay","dropdownProps"]),f=(0,o.useContext(p.b).getPrefixCls)("breadcrumb",r);return t="href"in d?o.createElement("a",Object(c.a)({className:"".concat(f,"-link")},d),l):o.createElement("span",Object(c.a)({className:"".concat(f,"-link")},d),l),a=t,t=s?o.createElement(b.a,Object(c.a)({overlay:s,placement:"bottomCenter"},m),o.createElement("span",{className:"".concat(f,"-overlay-link")},a,o.createElement(u.a,null))):a,l?o.createElement("span",null,t,i&&o.createElement("span",{className:"".concat(f,"-separator")},i)):null};m.__ANT_BREADCRUMB_ITEM=!0;var d=m,f=function(e){var t=e.children,a=(0,o.useContext(p.b).getPrefixCls)("breadcrumb");return o.createElement("span",{className:"".concat(a,"-separator")},t||"/")};f.__ANT_BREADCRUMB_SEPARATOR=!0;var j=f,v=a(97),h=a(28),y=a(26),R=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(c=Object.getOwnPropertySymbols(e);r<c.length;r++)t.indexOf(c[r])<0&&Object.prototype.propertyIsEnumerable.call(e,c[r])&&(a[c[r]]=e[c[r]])}return a};function x(e,t,a,c){var r=a.indexOf(e)===a.length-1,n=function(e,t){if(!e.breadcrumbName)return null;var a=Object.keys(t).join("|");return e.breadcrumbName.replace(new RegExp(":(".concat(a,")"),"g"),(function(e,a){return t[a]||e}))}(e,t);return r?o.createElement("span",null,n):o.createElement("a",{href:"#/".concat(c.join("/"))},n)}var T=function(e,t){return e=(e||"").replace(/^\//,""),Object.keys(t).forEach((function(a){e=e.replace(":".concat(a),t[a])})),e},U=function(e){var t,a=e.prefixCls,i=e.separator,u=void 0===i?"/":i,b=e.style,O=e.className,m=e.routes,f=e.children,j=e.itemRender,U=void 0===j?x:j,P=e.params,S=void 0===P?{}:P,_=R(e,["prefixCls","separator","style","className","routes","children","itemRender","params"]),A=o.useContext(p.b),E=A.getPrefixCls,M=A.direction,g=E("breadcrumb",a);if(m&&m.length>0){var F=[];t=m.map((function(e){var t,a=T(e.path,S);return a&&F.push(a),e.children&&e.children.length&&(t=o.createElement(v.a,null,e.children.map((function(e){return o.createElement(v.a.Item,{key:e.path||e.breadcrumbName},U(e,S,m,function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2?arguments[2]:void 0,c=Object(n.a)(e),r=T(t,a);return r&&c.push(r),c}(F,e.path,S)))})))),o.createElement(d,{overlay:t,separator:u,key:a||e.breadcrumbName},U(e,S,m,F))}))}else f&&(t=Object(s.a)(f).map((function(e,t){return e?(Object(h.a)(e.type&&(!0===e.type.__ANT_BREADCRUMB_ITEM||!0===e.type.__ANT_BREADCRUMB_SEPARATOR),"Breadcrumb","Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children"),Object(y.a)(e,{separator:u,key:t})):e})));var B=l()(g,Object(r.a)({},"".concat(g,"-rtl"),"rtl"===M),O);return o.createElement("div",Object(c.a)({className:B,style:b},_),t)};U.Item=d,U.Separator=j;var P=U;t.a=P},595:function(e,t,a){"use strict";a(38),a.p,a(320),a(316)},925:function(e,t,a){e.exports={main:"style_main__14tZT",breadcrumb:"style_breadcrumb__3uv5t",title:"style_title__2VW5r",topic:"style_topic__3YotY",footer:"style_footer__2zq2v",left:"style_left__T2dyQ",right:"style_right__23_Jq","button-active":"style_button-active__3XH0m","button-inactive":"style_button-inactive__pYMOa"}},966:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return x}));var c=a(41),r=(a(122),a(51)),n=(a(136),a(39)),o=(a(83),a(33)),i=(a(595),a(594)),l=(a(571),a(570)),s=a(46),u=(a(189),a(137)),b=a(0),p=a(11),O=a(36),m=a(47),d=a(8),f=a(575),j=a(925),v=a.n(j),h=a(6),y=u.a.TextArea,R={labelCol:{span:3},wrapperCol:{span:20}};function x(e){e.onFinish,e.visible;var t=Object(b.useState)(""),a=Object(s.a)(t,2),j=(a[0],a[1],Object(b.useState)(!1)),x=Object(s.a)(j,2),T=(x[0],x[1],Object(b.useState)("")),U=Object(s.a)(T,2),P=U[0],S=(U[1],l.a.useForm()),_=Object(s.a)(S,1)[0],A=Object(O.h)().forumId;return Object(h.jsxs)("div",{className:v.a.main,children:[Object(h.jsxs)(i.a,{className:v.a.breadcrumb,separator:">",children:[Object(h.jsx)(i.a.Item,{href:"/",children:"Home"}),Object(h.jsx)(i.a.Item,{href:"/forums",children:"Forum"}),Object(h.jsx)(i.a.Item,{children:"Create Topic"})]}),Object(h.jsx)("div",{className:v.a.title,children:Object(h.jsx)("div",{children:"T\u1ea1o ch\u1ee7 \u0111\u1ec1 m\u1edbi"})}),Object(h.jsx)("div",{className:v.a.topic,children:Object(h.jsxs)(l.a,Object(c.a)(Object(c.a)({layout:"vertical"},R),{},{name:"basic",form:_,onFinish:function(e){f.a.createTopic(A,{title:e.title,summary:e.topicSummary}).then((function(e){p.f.moveToURL("".concat(d.g.FORUM.HOME,"/").concat(A))})).catch((function(e){p.c.http(e)}))},initialValues:{description:"",title:""},children:[Object(h.jsx)(l.a.Item,{name:"title",label:Object(h.jsx)("div",{className:"form-title",children:"Nh\u1eadp ti\xeau \u0111\u1ec1"}),rules:[{required:!0,message:Object(h.jsx)("div",{className:"content-validation",children:"Ch\u1ee7 \u0111\u1ec1 kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng!"})}],children:Object(h.jsx)(u.a,{className:"input",type:"title",value:P})},"title"),Object(h.jsx)(l.a.Item,{name:"topicSummary",children:Object(h.jsx)(y,{rows:4,type:"text",placeholder:"Vi\u1ebft m\xf4 t\u1ea3 ch\u1ee7 \u0111\u1ec1"})}),Object(h.jsx)(l.a.Item,{children:Object(h.jsxs)(r.a,{className:v.a.footer,children:[Object(h.jsx)(n.a,{span:14,className:v.a.left,children:Object(h.jsxs)(n.a,{span:16,children:[Object(h.jsx)(o.a,{type:"text",size:"small",children:"golang"}),Object(h.jsx)(o.a,{type:"text",size:"small",children:"linux"}),Object(h.jsx)(o.a,{type:"text",size:"small",children:"overflow"})]})}),Object(h.jsxs)(n.a,{span:10,className:v.a.right,children:[Object(h.jsx)(o.a,{className:v.a["button-inactive"],type:"text",children:Object(h.jsx)(m.a,{className:"link",to:"/forums/group/1",children:"Hu\u1ef7"})}),Object(h.jsx)(o.a,{className:v.a["button-inactive"],type:"text",children:"Xem tr\u01b0\u1edbc"}),Object(h.jsx)(o.a,{className:v.a["button-active"],type:"primary",htmlType:"submit",children:"T\u1ea1o"})]})]})})]}))})]})}}}]);
//# sourceMappingURL=24.ce55dc65.chunk.js.map