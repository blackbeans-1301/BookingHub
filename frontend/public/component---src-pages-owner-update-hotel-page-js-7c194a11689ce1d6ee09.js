"use strict";(self.webpackChunkbooking_hub=self.webpackChunkbooking_hub||[]).push([[236,793],{63255:function(e,l,t){t.r(l),t.d(l,{default:function(){return ae}});var n=t(67294),a=(t(77625),t(15861)),r=t(42982),c=t(64687),o=t.n(c),m=t(51181),i=t(13946),s=t(48561),u=t(47556),d=t(9394),E=t(22794),h=t(29875),g=t(14695),Z=t(66808),v=t(57239),p=t(88319),f=t(31150),b=t(46940),k=t(71591),x=t(1426),C=t(49429),F=t(9334),y=t(3851),N=t(98609),w=t(54448),S=t(82899),R=t(90592),L=t(31149),q=t(81386),U=t(56243),A=t(56201),I=t(97128),P=t(9640),T=t(75842),_=t(78865),B=(t(76506),t(42096)),j=t(75708),G=t(31690),O=t(80453),H=t(9143),z=t(43485),D=t(32978),M=t(69299),W=t(94434),Q=t(16720),V=t(41134),X=t(69117),J=t(57594),K=t(61628),Y=t(55742),$=t(49287),ee=t(6490),le=t(29285),te=m.Ry({address:m.Z_().required("Enter your hotel's address"),description:m.Z_().required("Enter the hotel's description"),province:m.Z_().required("Province is required"),criteria:m.Z_(),imgURL:m.IX().required("Image field is required")});function ne(){var e=(0,n.useState)(0),l=(e[0],e[1],(0,n.useState)(!1)),t=(l[0],l[1]),c=(0,n.useState)([]),m=(c[0],c[1]),ne=(0,n.useState)(!1),ae=ne[0],re=ne[1],ce=(0,n.useState)(!1),oe=(ce[0],ce[1],(0,n.useState)([])),me=oe[0],ie=oe[1],se=(0,n.useState)(),ue=se[0],de=se[1],Ee=(0,n.useState)(""),he=(Ee[0],Ee[1],(0,n.useState)([])),ge=(he[0],he[1],(0,n.useState)()),Ze=ge[0],ve=ge[1],pe=[];console.log("all",ue);var fe=ue;console.log("pr",fe),console.log(me);var be=function(e){var l=me.indexOf(e.target.value);ie(-1===l?[].concat((0,r.Z)(me),[e.target.value]):me.filter((function(l){return l!==e.target.value})))},ke=function(){var e=(0,a.Z)(o().mark((function e(l){var n,a,r,c;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=l.target.files,console.log("files",n),"jqlebxmc",a=new FormData,m([]),t(!0),r=0;r<n.length;r++)c=n[r],a.append("file",c),a.append("upload_preset","jqlebxmc"),fetch(ee.aZ,{method:"POST",body:a}).then((function(e){return e.json()})).then((function(e){return pe.push(e.url)}));console.log("img urls",pe),xe.values.imgURL=pe,t(!1);case 10:case"end":return e.stop()}}),e)})));return function(l){return e.apply(this,arguments)}}();(0,n.useEffect)((function(){(0,B.lv)(de)}),[]);(0,n.useEffect)((function(){(0,B.zh)(hotelID,ve,token)}),[]),console.log("hotel infor",Ze);var xe=(0,j.TA)({initialValues:{name:Ze.name,description:Ze.description,address:Ze.address,province:Ze.province,criteria:Ze.criteria,imgURL:Ze.Images},validationSchema:te,onSubmit:function(e){console.log("value",e),function(e){var l=function(){var e=(0,a.Z)(o().mark((function e(l){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,B.nQ)(l,token);case 2:t=e.sent,console.log("response",t),console.log("type",typeof t),"object"==typeof t?D.Am.success("Sign up successfully"):(console.log("Sign up failed"),D.Am.error(t)),re(!1);case 8:case"end":return e.stop()}}),e)})));return function(l){return e.apply(this,arguments)}}();xe.values.criteria=me.toString();var t={name:e.name,description:e.description,address:e.address,province:e.province,criteria:e.criteria,imgURL:e.imgURL};re(!0),l(t)}(e)}});return n.createElement("div",null,n.createElement("h1",{className:"font-bold text-2xl m-5"},"Update information for a hotel"),n.createElement(le.Z,null),n.createElement("form",{className:"flex flex-col m-4",onSubmit:xe.handleSubmit},n.createElement(G.Z,{className:"my-2"},n.createElement(O.Z,{variant:"subtitle1"},"Hotel's name"),n.createElement(H.Z,{sx:{height:"85px"},placeholder:"Enter your hotel's name...",name:"name",value:xe.values.name,error:xe.touched.name&&Boolean(xe.errors.name),onChange:xe.handleChange,helperText:xe.touched.name&&xe.errors.name})),n.createElement(M.Z,{sx:{minWidth:120}},n.createElement(G.Z,{fullWidth:!0},n.createElement(K.Z,{id:"demo-simple-select-label"},"Province"),n.createElement($.Z,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:xe.values.province,name:"province",label:"Province",onChange:xe.handleChange,error:xe.touched.province&&!!xe.errors.province},null!=fe&&fe.map((function(e){return n.createElement(Y.Z,{value:e.name},e.name)}))))),n.createElement(G.Z,{className:"my-2"},n.createElement(O.Z,{variant:"subtitle1"},"Address"),n.createElement(H.Z,{sx:{height:"85px"},placeholder:"Enter your hotel's address...",name:"address",value:xe.values.address,error:xe.touched.address&&Boolean(xe.errors.address),onChange:xe.handleChange,helperText:xe.touched.address&&xe.errors.address})),n.createElement(G.Z,{className:"my-2"},n.createElement(O.Z,{variant:"subtitle1"},"Hotel's description"),n.createElement(W.Z,{sx:{height:"85px"},style:{border:"1px solid black",padding:"4px",paddingLeft:"6px"},minRows:3,placeholder:"Enter your hotel's description...",name:"description",value:xe.values.description,error:xe.touched.description&&Boolean(xe.errors.description),onChange:xe.handleChange,helperText:xe.touched.description&&xe.errors.description})),n.createElement(Q.Z,null,"Amenities (select criterias of your hotel)"),n.createElement(V.Z,null,n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"fire-extinguisher",checked:me.includes("fire-extinguisher"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(E.Z,null)," Fire extinguisher")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"air-conditioned",checked:me.includes("air-conditioned"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(Z.Z,null)," Air-conditioned")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"Elevator",checked:me.includes("Elevator"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(p.Z,null)," Elevator")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"pet-allowed",checked:me.includes("pet-allowed"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(f.Z,null)," Pets allowed")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"outdoor-pool",checked:me.includes("outdoor-pool"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(i.Z,null)," Outdoor-pool")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"indoor-pool",checked:me.includes("indoor-pool"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(i.Z,null)," Indoor pool")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"spa",checked:me.includes("spa"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(s.Z,null)," Spa and wellness center")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"fitness",checked:me.includes("fitness"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(u.Z,null)," Fitness center")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"restaurant",checked:me.includes("restaurant"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(d.Z,null),"Restaurant")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"bar",checked:me.includes("bar"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(d.Z,null)," Bar/ Lounge")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"room-service",checked:me.includes("room-service"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(h.Z,null)," Room service")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"wifi",checked:me.includes("wifi"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(g.Z,null)," Free wifi")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"coffee-shop",checked:me.includes("coffee-shop"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(b.Z,null)," Coffee shop")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"free-parking",checked:me.includes("free-parking"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(v.Z,null)," Free parking")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"minibar",checked:me.includes("minibar"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(k.Z,null)," Minibar")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"snack-bar",checked:me.includes("snack-bar"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(x.Z,null)," Snack bar")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"shop",checked:me.includes("shop"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(y.Z,null)," Shops on site")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"golf",checked:me.includes("golf"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(N.Z,null)," Golf")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"ironing",checked:me.includes("ironing"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(C.Z,null)," Ironing service")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"gift-shop",checked:me.includes("gift-shop"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(F.Z,null)," Gift shop")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"garden",checked:me.includes("garden"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(w.Z,null)," Garden")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"terrace",checked:me.includes("terrace"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(S.Z,null)," Terrace/ Patio")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"atm",checked:me.includes("atm"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(L.Z,null)," ATM on-site")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"car-rental",checked:me.includes("car-rental"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(q.Z,null)," Car rental")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"grill",checked:me.includes("grill"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(R.Z,null)," Grill")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"lake-view",checked:me.includes("lake-view"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(U.Z,null)," Lake view")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"city-view",checked:me.includes("city-view"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(A.Z,null)," City view")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"playground",checked:me.includes("playground"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(I.Z,null)," Playground")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"buffet",checked:me.includes("buffet"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(P.Z,null)," Buffet")}),n.createElement(X.Z,{control:n.createElement(J.Z,{value:"childcare",checked:me.includes("childcare"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(T.Z,null)," Babysitting or childcare")})),n.createElement("div",{className:"flex"},n.createElement(X.Z,{control:n.createElement(J.Z,{value:"other",checked:me.includes("other"),onChange:be}),label:n.createElement(n.Fragment,null,n.createElement(_.Z,null)," Others")}))),n.createElement(G.Z,{className:"my-2"},n.createElement(O.Z,{variant:"subtitle1"},"Hotel's imgURL"),n.createElement("input",{type:"file",onChange:ke,multiple:!0,size:"50"})),n.createElement(z.Z,{type:"submit",loading:ae,variant:"contained",className:"bg-sky-300 text-xl font-bold rounded-full mt-4 hover:bg-sky-500 hover:text-white py-2"},"Send")))}var ae=function(){return n.createElement(ne,null)}},76506:function(e,l,t){t.r(l);var n=t(56861).Z.create({baseURL:"http://localhost:8080/api"});l.default=n}}]);
//# sourceMappingURL=component---src-pages-owner-update-hotel-page-js-7c194a11689ce1d6ee09.js.map