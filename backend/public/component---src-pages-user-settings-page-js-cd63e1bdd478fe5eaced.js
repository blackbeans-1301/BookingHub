"use strict";(self.webpackChunkbooking_hub=self.webpackChunkbooking_hub||[]).push([[560],{85558:function(e,r,s){s.r(r),s.d(r,{default:function(){return E}});var a=s(67294),t=s(71456),n=s(15861),o=s(64687),l=s.n(o),d=s(51181),w=s(10511),c=s(31690),u=s(80453),m=s(9143),p=s(83290),h=s(32978),i=s(58615),b=s(29285),f=s(46216),v=d.Ry({password:d.Z_().required("Enter your password"),newPassword:d.Z_().required("Enter your new password")});function g(){var e=(0,a.useState)(!1),r=e[0],s=e[1],t=(0,f.oV)("token"),o=(0,w.TA)({initialValues:{password:"",newPassword:""},validationSchema:v,onSubmit:function(e){!function(e){var r=function(){var e=(0,n.Z)(l().mark((function e(r){var a;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,p.c0)(r,t);case 2:a=e.sent,console.log("response",a),console.log("type",typeof a),"object"==typeof a?(console.log("message",Object.values(a)[0]),h.Am.success(Object.values(a)[0])):(console.log("update password failed"),h.Am.error(a)),s(!1);case 8:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),a={password:e.password,newPassword:e.newPassword};s(!0),r(a)}(e)}});return a.createElement("div",{className:"m-4 bg-white w-screen z-10 md:w-auto w-full"},a.createElement("h1",{className:"font-bold text-2xl mb-3"},"Setting Account"),a.createElement(b.Z,null),a.createElement("div",{className:"bg-white shadow-xl shadow-blue-100 rounded-2xl m-4 p-4"},a.createElement("h2",{className:"font-bold text-2xl mb-3 ml-4"},"Change password"),a.createElement("form",{className:"flex flex-col m-4 mb-4",onSubmit:o.handleSubmit},a.createElement(c.Z,{className:"my-4"},a.createElement(u.Z,{variant:"subtitle1"},"Password"),a.createElement(m.Z,{sx:{height:"85px"},type:"password",placeholder:"Enter your password...",name:"password",value:o.values.password,error:o.touched.password&&Boolean(o.errors.password),onChange:o.handleChange,helperText:o.touched.password&&o.errors.password})),a.createElement(c.Z,{className:"my-4"},a.createElement(u.Z,{variant:"subtitle1"},"New password"),a.createElement(m.Z,{sx:{height:"85px"},type:"password",placeholder:"Enter your new password...",name:"newPassword",value:o.values.newPassword,error:o.touched.newPassword&&Boolean(o.errors.newPassword),onChange:o.handleChange,helperText:o.touched.newPassword&&o.errors.newPassword})),a.createElement(c.Z,{className:"my-4"},a.createElement(u.Z,{variant:"subtitle1"},"Confirm new password"),a.createElement(m.Z,{sx:{height:"85px"},type:"password",placeholder:"Enter your new password...",name:"newPassword",value:o.values.newPassword,error:o.touched.newPassword&&Boolean(o.errors.newPassword),onChange:o.handleChange,helperText:o.touched.newPassword&&o.errors.newPassword})),a.createElement(i.Z,{type:"submit",loading:r,variant:"contained",className:"bg-sky-300 text-xl font-bold rounded-full mt-4 hover:bg-sky-500 hover:text-white py-2 mt-4 mb-4"},"Update password"))))}var E=function(){return a.createElement(t.Z,null,a.createElement(g,null))}}}]);
//# sourceMappingURL=component---src-pages-user-settings-page-js-cd63e1bdd478fe5eaced.js.map