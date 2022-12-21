"use strict";(self.webpackChunkbooking_hub=self.webpackChunkbooking_hub||[]).push([[7605],{81328:function(e,t,a){a.r(t),a.d(t,{default:function(){return Z}});var r=a(15861),n=a(64687),l=a.n(n),s=a(67294),o=a(51181),m=a(30263),c=a(71456),i=(a(70516),a(83290)),d=a(10511),u=a(32978),h=a(75471),f=a(58555);var x=new Date;o.Ry({email:o.Z_().email("Let enter a valid email").required("Enter your email"),firstName:o.Z_().required("Enter your firstName"),lastName:o.Z_().required("Enter your lastName"),dob:(0,o.hT)().transform((function(e,t){return(0,h.Z)(t)?t:(0,f.Z)(t,"yyyy-MM-dd",new Date)})).max(x).required("Enter your date of birth. Please enter a valid date."),gender:o.Z_().required("Enter your gender"),phone_number:o.Z_().required("Enter your phone number")});var b=a(46216),E=a(31690),p=a(80453),N=a(9143),v=a(29285);var g=new Date,w=o.Ry({oldPassword:o.Z_().required("Enter your email"),newPassword:o.Z_().required("Enter your email")}),y=o.Ry({firstName:o.Z_().required("Enter your email"),lastName:o.Z_().required("Enter your email"),dateOfBirth:o.hT().transform((function(e,t){return(0,h.Z)(t)?t:(0,f.Z)(t,"yyyy-MM-dd",new Date)})).max(g).required("Enter your date of birth. Please enter a valid date."),gender:o.Z_().required("Enter your email"),phoneNumber:o.Z_().required("Enter your email")}),Z=function(){(0,b.oV)("email");var e=(0,s.useState)(),t=e[0],a=e[1],n=(0,s.useState)(""),o=n[0],h=n[1],f=(0,s.useState)(""),x=f[0],g=(f[1],(0,s.useState)(!1));g[0],g[1];(0,s.useEffect)((function(){var e=function(){var e=(0,r.Z)(l().mark((function e(){var t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.tn)((0,b.oV)("token"));case 2:t=e.sent,a(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var Z=(0,d.TA)({validationSchema:w,onSubmit:function(e){k(e.oldPassword,e.newPassword)}}),P=(0,d.TA)({initialValues:{firstName:t?t.firstName:"",lastName:t?t.lastName:"",gender:t?t.gender:"",phoneNumber:t?t.phone_number:""},validationSchema:y,onSubmit:function(e){C(e)},enableReinitialze:!0}),C=function(){var e=(0,r.Z)(l().mark((function e(t){var a,r;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={dob:t.dateOfBirth,firstName:t.firstName,lastName:t.lastName,gender:t.gender,phone_number:t.phoneNumber},e.next=3,(0,i.gS)(a,(0,b.oV)("token"));case 3:r=e.sent,console.log(r),void 0!==r?(u.Am.success(r.message),setTimeout((function(){return(0,b.uX)("http://w22g1.int3306.freeddns.org/user/ProfilePage")}),1e3)):u.Am.error("Error updating information. Plase try again later...");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=(0,r.Z)(l().mark((function e(t,a){var r,n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={password:t,newPassword:a},e.next=3,(0,i.c0)(r,(0,b.oV)("token"));case 3:if(n=e.sent,console.log(n),void 0!==n){e.next=8;break}return u.Am.error("Wrong password!"),e.abrupt("return");case 8:"Updated password successfully!"===n.message&&(u.Am.success(n.message),h(""));case 9:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();return s.createElement(c.Z,null,s.createElement(v.Z,null),s.createElement("div",{className:"h-80 w-full bg-primary-light flex pt-20 px-32 justify-between"},s.createElement("div",{className:""},s.createElement("h1",{className:"text-white font-bold text-5xl"},"Hello"),s.createElement("div",{className:"text-white text-md pt-12"},"Account email",s.createElement("br",null),s.createElement("span",{className:"text-lg font-bold"},t?t.email:"error getting data"))),s.createElement("div",null,s.createElement("img",{className:"w-48",src:"https://cdn-icons-png.flaticon.com/512/149/149071.png",alt:"avatar"}))),s.createElement("div",{className:"px-32 py-20"},s.createElement("h1",{className:"font-bold text-primary text-2xl"},"General settings"),s.createElement("div",{className:"p-8 border mt-12 rounded-md"},s.createElement("h1",{className:"font-bold text-black"},"Login details"),s.createElement("div",{className:"flex justify-between "},s.createElement("div",null,s.createElement("div",{className:"mt-8"},s.createElement("h1",null,"Name"),s.createElement("div",{className:"flex w-80 justify-between border-b mt-2"},s.createElement("h1",{className:"text-xl font-bold"},t?t.firstName+" "+t.lastName:"not set"))),s.createElement("div",{className:"mt-8"},s.createElement("h1",null,"Email"),s.createElement("div",{className:"flex w-80 justify-between border-b mt-2"},s.createElement("h1",{className:"text-xl font-bold"},t?t.email:"(not set)"),s.createElement("h1",null))),s.createElement("div",{className:"mt-8"},s.createElement("h1",null,"Date of birth"),s.createElement("div",{className:"flex w-80 justify-between border-b mt-2"},s.createElement("h1",{className:"text-xl font-bold"},t?t.dob:"(not set)"),s.createElement("h1",null))),s.createElement("div",{className:"mt-8"},s.createElement("h1",null,"Gender"),s.createElement("div",{className:"flex w-80 justify-between border-b mt-2"},s.createElement("h1",{className:"text-xl font-bold"},t?t.gender:"(not set)"))),s.createElement("div",{className:"mt-8"},s.createElement("h1",null,"Phone number"),s.createElement("div",{className:"flex w-80 justify-between border-b mt-2"},s.createElement("h1",{className:"text-xl font-bold"},t?"(+84) "+t.phone_number:"(not set)")))),s.createElement("div",{className:""},s.createElement("h1",{className:"rounded-lg py-4 px-12 bg-primary text-white text-xl font-bold cursor-pointer",onClick:function(){h("update")}},"Edit Profile"))))),"changePW"===o&&s.createElement("div",{className:"w-full h-full fixed top-0",style:{backgroundColor:"rgba(0,0,0,0.5)"}},s.createElement("div",{className:"flex justify-center mt-12"},s.createElement("div",{className:"bg-white w-1/2 p-2 rounded flex flex-col m-2 z-10 top-20"},s.createElement("div",{className:"flex justify-between m-2"},s.createElement("h2",{className:"font-bold text-3xl text-colorText"},"Change password"),s.createElement("button",{className:"text-light-close text-xl place-self-end hover:text-close-color",onClick:function(){h("")}},s.createElement(m.Z,null))),s.createElement("form",{className:"flex flex-col m-4",onSubmit:Z.handleSubmit},s.createElement(E.Z,{className:"my-2"},s.createElement(p.Z,{variant:"subtitle1"},"Your old password"),s.createElement(N.Z,{sx:{height:"85px"},placeholder:"Old password",name:"oldPassword",value:Z.values.oldPassword,error:Z.touched.oldPassword&&Boolean(Z.errors.oldPassword),onChange:Z.handleChange,helperText:Z.touched.oldPassword&&Z.errors.oldPassword})),s.createElement(E.Z,{className:"my-2"},s.createElement(p.Z,{variant:"subtitle1"},"Your new password"),s.createElement(N.Z,{sx:{height:"85px"},placeholder:"New password",name:"newPassword",value:Z.values.newPassword,error:Z.touched.newPassword&&Boolean(Z.errors.newPassword),onChange:Z.handleChange,helperText:Z.touched.newPassword&&Z.errors.newPassword})),s.createElement("div",{className:"p-2 right-0 flex justify-end items-end"},"Go to",s.createElement("span",{className:"font-bold text-light-primary hover:text-primary mx-2",onClick:function(){return h("signin")}},"Sign in")),s.createElement("div",{className:"text-red-700 font-bold text-center"},x),s.createElement("button",{variant:"contained",className:"bg-sky-300 text-xl font-bold rounded-full mt-6 hover:bg-sky-500 hover:text-white py-2",type:"submit"},"Confirm"))))),"update"===o&&s.createElement("div",{className:"w-full h-full fixed top-0",style:{backgroundColor:"rgba(0,0,0,0.5)"}},s.createElement("div",{className:"flex justify-center mt-12"},s.createElement("div",{className:"bg-white w-1/2 p-2 rounded flex flex-col m-2 z-10 top-20"},s.createElement("div",{className:"flex justify-between m-2"},s.createElement("h2",{className:"font-bold text-3xl text-colorText"},"Edit Profile"),s.createElement("button",{className:"text-light-close text-xl place-self-end hover:text-close-color",onClick:function(){h("")}},s.createElement(m.Z,null))),s.createElement("form",{className:"flex flex-col m-4",onSubmit:P.handleSubmit},s.createElement(E.Z,{className:"my-2"},s.createElement(p.Z,{variant:"subtitle1"},"First name"),s.createElement(N.Z,{sx:{height:"85px"},placeholder:"First name",name:"firstName",value:P.values.firstName,error:P.touched.firstName&&Boolean(P.errors.firstName),onChange:P.handleChange,helperText:P.touched.firstName&&P.errors.firstName})),s.createElement(E.Z,{className:"my-2"},s.createElement(p.Z,{variant:"subtitle1"},"Last name"),s.createElement(N.Z,{sx:{height:"85px"},placeholder:"Last name",name:"lastName",value:P.values.lastName,error:P.touched.lastName&&Boolean(P.errors.lastName),onChange:P.handleChange,helperText:P.touched.lastName&&P.errors.lastName})),s.createElement(E.Z,{className:"my-2"},s.createElement(p.Z,{variant:"subtitle1"},"Gender"),s.createElement(N.Z,{sx:{height:"85px"},placeholder:"Gender",name:"gender",value:P.values.gender,error:P.touched.gender&&Boolean(P.errors.gender),onChange:P.handleChange,helperText:P.touched.gender&&P.errors.gender})),s.createElement(E.Z,{className:"my-2"},s.createElement(p.Z,{variant:"subtitle1"},"Date of birth"),s.createElement(N.Z,{sx:{height:"85px"},placeholder:"Date of birth",name:"dateOfBirth",value:P.values.dateOfBirth,error:P.touched.dateOfBirth&&Boolean(P.errors.dateOfBirth),onChange:P.handleChange,helperText:P.touched.dateOfBirth&&P.errors.dateOfBirth})),s.createElement(E.Z,{className:"my-2"},s.createElement(p.Z,{variant:"subtitle1"},"Phone number"),s.createElement(N.Z,{sx:{height:"85px"},placeholder:"EX: 0123456789",name:"phoneNumber",value:P.values.phoneNumber,error:P.touched.phoneNumber&&Boolean(P.errors.phoneNumber),onChange:P.handleChange,helperText:P.touched.phoneNumber&&P.errors.phoneNumber})),s.createElement("div",{className:"text-red-700 font-bold text-center"},x),s.createElement("button",{variant:"contained",className:"bg-sky-300 text-xl font-bold rounded-full mt-6 hover:bg-sky-500 hover:text-white py-2",type:"submit"},"Confirm"))))))}}}]);
//# sourceMappingURL=component---src-pages-user-profile-page-js-4cbaa510c76562a80ef0.js.map