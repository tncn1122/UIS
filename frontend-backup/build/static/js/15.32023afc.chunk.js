(this["webpackJsonpcode-tour-frontend"]=this["webpackJsonpcode-tour-frontend"]||[]).push([[15],{574:function(t,e,n){"use strict";e.a=n.p+"static/media/search.67c51618.svg"},581:function(t,e,n){"use strict";n(0);var c=n(596),a=n.n(c),s=n(604),i=n.n(s),r=n(606),o=n.n(r),l=(n(607),n(626),n(589),n(608),n(6));window.katex=o.a;var u={syntax:{highlight:function(t){return a.a.highlightAuto(t).value}},clipboard:{matchVisual:!1}},d=["header","font","size","bold","italic","underline","strike","blockquote","script","formula","code-block","list","bullet","indent","link","image","video","align","height","width","class","style","color","background"];e.a=function(t){var e=t.htmlData;return Object(l.jsx)(i.a,{value:e,readOnly:!0,theme:"bubble",modules:u,formats:d})}},584:function(t,e,n){"use strict";n.d(e,"a",(function(){return b}));n(189);var c=n(137),a=(n(83),n(33)),s=n(46),i=n(0),r=n(47),o=n(8),l=n(11),u=n(574),d=n(585),h=n.n(d),j=n(6);function b(){var t=Object(i.useState)(!0),e=Object(s.a)(t,2),n=e[0],d=e[1];return Object(i.useEffect)((function(){var t=l.f.getPathnameInURL();d(0===t.indexOf(o.g.CONTEST.PUBLIC))}),[]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:h.a["switch-buttons"],children:[Object(j.jsx)(a.a,{className:[h.a.btn,n?h.a.active:""].join(" "),children:Object(j.jsx)(r.a,{to:o.g.CONTEST.PUBLIC,children:Object(j.jsx)("span",{className:"typography-menu transform-uppercase",children:o.p.PUBLIC})})}),Object(j.jsx)(a.a,{className:[h.a.btn,n?"":h.a.active].join(" "),children:Object(j.jsx)(r.a,{to:o.g.CONTEST.PRIVATE,children:Object(j.jsx)("span",{className:"typography-menu transform-uppercase",children:o.p.PRIVATE})})})]}),Object(j.jsx)("div",{className:h.a["search-challenge"],children:Object(j.jsx)(c.a,{size:"large",suffix:Object(j.jsx)("img",{alt:"search-icon",src:u.a}),placeholder:n?"T\xecm t\xean cu\u1ed9c thi...":"Nh\u1eadp m\xe3 chia s\u1ebb"})})]})}},585:function(t,e,n){t.exports={"contest-page-content":"style_contest-page-content__2UlCv","switch-buttons":"style_switch-buttons__3juiA",btn:"style_btn__26eDt",active:"style_active__1n1kN","search-challenge":"style_search-challenge__3ZJ7_"}},589:function(t,e,n){},910:function(t,e,n){t.exports={rankings:"style_rankings__86hGe"}},911:function(t,e,n){t.exports={"contest-page-content":"style_contest-page-content__gtFHu",content:"style_content__21MSJ",pagination:"style_pagination__2mrxX"}},978:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return T}));var c=n(46),a=(n(323),n(206)),s=n(0),i=n(11),r=n(8),o=n(89),l=n(581),u=n(6);function d(t){var e=t.contest;return Object(u.jsx)(l.a,{htmlData:e.information})}n(214);var h=n(138),j=(n(83),n(33)),b=n(36),O=n(52),m=n(77);var f=Object(O.c)((function(t){return{currentUser:t.authReducer.currentUser}}))((function(t){var e=t.currentUser,n=t.contest,a=Object(b.g)(),d=Object(s.useState)(!1),O=Object(c.a)(d,2),f=O[0],g=O[1];return Object(s.useEffect)((function(){}),[]),Object(u.jsx)(m.h,{isHidden:!f,children:Object(u.jsxs)(h.a,{className:"ta-center",children:[Object(u.jsx)("h4",{children:"Ph\xf2ng thi s\u1ebd b\u1eaft \u0111\u1ea7u sau"}),Object(u.jsx)("div",{className:"m-t-20 m-b-20 align-content-center",children:n&&Object(u.jsx)(m.b,{targetTime:n.event_time_begin,isDisabled:n.status===r.d.PAST||n.status===r.d.ONGOING})}),Object(u.jsx)(l.a,{htmlData:n.waiting_room}),Object(u.jsx)("br",{}),n&&n.status===r.d.ONGOING&&Object(u.jsx)(j.a,{type:"primary",size:"large",className:"m-t-20",onClick:function(){i.g.empty(e)&&a.push("".concat(r.g.AUTH.LOGIN,"?next=").concat(i.f.getPathnameInURL())),g(!0),o.c.visitRoom({id:n.id}).then((function(t){i.f.moveToURL(t)})).catch((function(t){g(!1),i.c.http(t)}))},children:"V\xe0o ph\xf2ng thi"})]})})})),g=(n(631),n(629)),x=n(910),p=n.n(x);function v(){return Object(s.useEffect)((function(){console.log("-------- Contest Deailt: ranking mounted")}),[]),Object(u.jsx)("div",{className:p.a.rankings,children:Object(u.jsx)(g.a,{columns:y,dataSource:_,bordered:!0,size:"middle"})})}var y=[{title:"H\u1ea1ng",dataIndex:"order",key:"order",width:50},{title:"Username",dataIndex:"username",key:"username",width:150},{title:"B\xe0i thi",dataIndex:"contest",key:"contest",width:400,children:[{title:"1",dataIndex:"contest1",key:"contest1",width:100},{title:"2",dataIndex:"contest2",key:"contest1",width:100},{title:"3",dataIndex:"contest3",key:"contest1",width:100},{title:"4",dataIndex:"contest4",key:"contest1",width:100}]}],_=[{key:1,order:1,username:"User",contest1:10,contest2:10,contest3:10},{key:2,order:2,username:"User",contest1:10,contest2:10,contest3:10},{key:3,order:3,username:"User",contest1:10,contest2:10,contest3:10}],N=n(584),k=n(911),I=n.n(k),w=a.a.TabPane;function T(t){var e=t.match.params.id,n=Object(s.useState)(null),l=Object(c.a)(n,2),h=l[0],j=l[1],b=Object(s.useState)(null),O=Object(c.a)(b,2),m=O[0],g=O[1];return Object(s.useEffect)((function(){var t=i.f.getParamsInURL().tab;j(i.g.empty(t)?"information":t),o.c.getById(e).then((function(t){g(t)})).catch((function(t){i.c.http(t)}))}),[]),Object(u.jsxs)("div",{className:I.a.content,children:[Object(u.jsx)(N.a,{}),h&&m&&Object(u.jsxs)(a.a,{defaultActiveKey:h,centered:!0,children:[Object(u.jsx)(w,{tab:r.p.INFORMATION,children:Object(u.jsx)(d,{contest:m})},"information"),Object(u.jsx)(w,{tab:r.p.WAITING_ROOM,children:Object(u.jsx)(f,{contest:m})},"waitingRoom"),Object(u.jsx)(w,{tab:r.p.RANKING,children:Object(u.jsx)(v,{contest:m})},"ranking")]})]})}}}]);
//# sourceMappingURL=15.32023afc.chunk.js.map