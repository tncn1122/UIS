(this["webpackJsonpcode-tour-frontend"]=this["webpackJsonpcode-tour-frontend"]||[]).push([[31],{942:function(e,s,t){e.exports={"user-avatar-block":"style_user-avatar-block__3GhrH","user-info-title":"style_user-info-title__2L1uG","user-info-row":"style_user-info-row__B8i4d","user-info-body":"style_user-info-body__2Y0JG","card-block":"style_card-block__3Grmw","edit-icon":"style_edit-icon__2smg7","user-menu":"style_user-menu__13dOR","form-footer":"style_form-footer__1T2X7","link-forgot-pwd":"style_link-forgot-pwd__2slE-"}},970:function(e,s,t){"use strict";t.r(s);t(214);var r=t(138),n=t(41),a=(t(216),t(140)),o=(t(83),t(33)),c=(t(189),t(137)),l=(t(571),t(570)),i=t(46),d=t(0),u=t(52),b=t(8),f=t(224),j=t(77),O=t(11),m=t(89),_=t(942),h=t.n(_),w=t(6),p={labelCol:{span:4},wrapperCol:{span:19}},S={wrapperCol:{offset:4,span:19}};s.default=Object(u.c)((function(e){return{currentUser:e.authReducer.currentUser}}))((function(e){var s=e.currentUser,t=l.a.useForm(),u=Object(i.a)(t,1)[0],_=Object(d.useState)(!1),x=Object(i.a)(_,2),N=x[0],P=x[1],C=Object(d.useState)(!1),y=Object(i.a)(C,2),v=y[0],A=y[1];return Object(w.jsxs)("div",{className:h.a["user-info-body"],children:[Object(w.jsx)("h2",{className:h.a["user-info-title"],children:b.v.GENERAL_INFORMATION}),Object(w.jsx)(j.h,{isHidden:!N,children:Object(w.jsxs)(f.a,{children:[Object(w.jsx)(j.d,{isShown:v,onClose:function(){return A(!1)},currentUserEmail:s.email,ModelService:m.f}),Object(w.jsx)(r.a,{title:b.v.CHANGE_PASSWORD.TITLE,children:Object(w.jsxs)(l.a,Object(n.a)(Object(n.a)({},p),{},{name:"basic",form:u,initialValues:{oldPassword:"",newPassword:"",newPasswordConfirm:""},onFinish:function(e){P(!0),m.f.changePassword(e).then((function(){u.resetFields(),P(!1),O.b.showNotification(b.n.UPDATE_INFO_SUCCESS)})).catch((function(e){P(!1),O.c.http(e)}))},children:[Object(w.jsx)(l.a.Item,{labelCol:{span:6},name:"oldPassword",label:b.v.CHANGE_PASSWORD.OLD_PASSWORD,className:"custom-form-item-label-required",hasFeedback:!0,rules:[function(){return{validator:function(e,s){return O.g.password(s)}}}],children:Object(w.jsx)(c.a.Password,{})}),Object(w.jsx)(l.a.Item,{labelCol:{span:6},name:"newPassword",label:b.v.CHANGE_PASSWORD.NEW_PASSWORD,className:"custom-form-item-label-required",hasFeedback:!0,rules:[function(){return{validator:function(e,s){return O.g.password(s)}}}],children:Object(w.jsx)(c.a.Password,{})}),Object(w.jsx)(l.a.Item,{labelCol:{span:6},name:"newPasswordConfirm",label:b.v.CHANGE_PASSWORD.NEW_PASSWORD_CONFIRM,className:"custom-form-item-label-required",hasFeedback:!0,dependencies:["newPassword"],rules:[function(e){var s=e.getFieldValue;return{validator:function(e,t){return O.g.textUserInfo(t).then((function(){return O.g.passwordConfirm(s("newPassword"),t)}))}}}],children:Object(w.jsx)(c.a.Password,{})}),Object(w.jsx)(l.a.Item,Object(n.a)(Object(n.a)({},S),{},{children:Object(w.jsxs)("div",{className:h.a["form-footer"],children:[Object(w.jsxs)(a.b,{children:[Object(w.jsx)(o.a,{type:"cancel",children:b.k.CANCEL}),Object(w.jsx)(o.a,{type:"primary",htmlType:"submit",children:b.k.SAVE})]}),Object(w.jsx)("div",{className:h.a["link-forgot-pwd"],children:Object(w.jsx)("a",{className:"float-right text-underline typography-small",onClick:function(){return A(!0)},children:b.o.LOGIN.FORGOT_PASSWORD})})]})}))]}))})]})})]})}))}}]);
//# sourceMappingURL=31.35c33167.chunk.js.map