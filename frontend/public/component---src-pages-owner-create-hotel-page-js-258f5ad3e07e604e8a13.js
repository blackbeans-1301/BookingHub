"use strict";(self.webpackChunkbooking_hub=self.webpackChunkbooking_hub||[]).push([[715,793],{81454:function(e,l,t){t.r(l),t.d(l,{default:function(){return ce}});var n=t(67294),a=t(77625),r=t(15861),c=t(42982),o=t(64687),m=t.n(o),i=t(51181),u=t(13946),s=t(48561),d=t(47556),E=t(9394),h=t(22794),g=t(29875),Z=t(14695),v=t(66808),p=t(57239),f=t(88319),b=t(31150),k=t(46940),C=t(71591),x=t(1426),F=t(49429),y=t(9334),w=t(3851),N=t(98609),S=t(54448),L=t(82899),R=t(90592),q=t(31149),P=t(81386),T=t(56243),_=t(56201),A=t(97128),U=t(9640),B=t(75842),I=t(78865),j=(t(76506),t(42096)),G=t(75708),H=t(31690),O=t(80453),M=t(9143),W=t(43485),z=t(32978),D=t(69299),Q=t(94434),V=t(16720),X=t(41134),J=t(69117),K=t(57594),Y=t(61628),$=t(55742),ee=t(49287),le=t(6490),te=t(29285),ne=t(46216),ae=i.Ry({name:i.Z_().required("Enter your hotel's name"),address:i.Z_().required("Enter your hotel's address"),description:i.Z_().required("Enter the hotel's description"),province:i.Z_().required("Province is required"),criteria:i.Z_(),imgURL:i.IX().required("Image field is required")});function re(){var e=(0,n.useState)(0),l=(e[0],e[1],(0,n.useState)(!1)),t=(l[0],l[1]),a=(0,n.useState)([]),o=(a[0],a[1]),i=(0,n.useState)(!1),re=i[0],ce=i[1],oe=(0,n.useState)(!1),me=(oe[0],oe[1],(0,n.useState)([])),ie=me[0],ue=me[1],se=(0,n.useState)(),de=se[0],Ee=se[1],he=(0,n.useState)(""),ge=(he[0],he[1],(0,n.useState)([])),Ze=(ge[0],ge[1],(0,n.useState)()),ve=(Ze[0],Ze[1],[]);console.log("all",de);var pe=de;console.log("pr",pe),console.log(ie);var fe=function(e){var l=ie.indexOf(e.target.value);ue(-1===l?[].concat((0,c.Z)(ie),[e.target.value]):ie.filter((function(l){return l!==e.target.value})))},be=function(){var e=(0,r.Z)(m().mark((function e(l){var n,a,r,c;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=l.target.files,console.log("files",n),"jqlebxmc",a=new FormData,o([]),t(!0),r=0;r<n.length;r++)c=n[r],a.append("file",c),a.append("upload_preset","jqlebxmc"),fetch(le.aZ,{method:"POST",body:a}).then((function(e){return e.json()})).then((function(e){return ve.push(e.url)}));console.log("img urls",ve),Ce.values.imgURL=ve,t(!1);case 10:case"end":return e.stop()}}),e)})));return function(l){return e.apply(this,arguments)}}();(0,n.useEffect)((function(){(0,j.lv)(Ee)}),[]);var ke=function(){window.location="http://localhost:8000/owner/ListHotelPage"},Ce=(0,G.TA)({initialValues:{name:"",description:"",address:"",province:"",criteria:"",imgURL:[]},validationSchema:ae,onSubmit:function(e){console.log("value",e),function(e){var l=(0,ne.o)("token");console.log("token",l);var t=function(){var e=(0,r.Z)(m().mark((function e(t){var n;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,j.nQ)(t,l);case 2:n=e.sent,console.log("response",n),console.log("type",typeof n),"object"==typeof n?(z.Am.success("Sign up successfully"),setTimeout(ke,3e3)):(console.log("Sign up failed"),z.Am.error(n)),ce(!1);case 8:case"end":return e.stop()}}),e)})));return function(l){return e.apply(this,arguments)}}();Ce.values.criteria=ie.toString();var n={name:e.name,description:e.description,address:e.address,province:e.province,criteria:e.criteria,imgURL:e.imgURL};ce(!0),t(n)}(e)}});return n.createElement("div",null,n.createElement("h1",{className:"font-bold text-2xl m-5"},"Create a new hotel"),n.createElement(te.Z,null),n.createElement("form",{className:"flex flex-col m-4",onSubmit:Ce.handleSubmit},n.createElement(H.Z,{className:"my-2"},n.createElement(O.Z,{variant:"subtitle1"},"Hotel's name"),n.createElement(M.Z,{sx:{height:"85px"},placeholder:"Enter your hotel's name...",name:"name",value:Ce.values.name,error:Ce.touched.name&&Boolean(Ce.errors.name),onChange:Ce.handleChange,helperText:Ce.touched.name&&Ce.errors.name})),n.createElement(D.Z,{sx:{minWidth:120}},n.createElement(H.Z,{fullWidth:!0},n.createElement(Y.Z,{id:"demo-simple-select-label"},"Province"),n.createElement(ee.Z,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:Ce.values.province,name:"province",label:"Province",onChange:Ce.handleChange,error:Ce.touched.province&&!!Ce.errors.province},null!=pe&&pe.map((function(e){return n.createElement($.Z,{value:e.name},e.name)}))))),n.createElement(H.Z,{className:"my-2"},n.createElement(O.Z,{variant:"subtitle1"},"Address"),n.createElement(M.Z,{sx:{height:"85px"},placeholder:"Enter your hotel's address...",name:"address",value:Ce.values.address,error:Ce.touched.address&&Boolean(Ce.errors.address),onChange:Ce.handleChange,helperText:Ce.touched.address&&Ce.errors.address})),n.createElement(H.Z,{className:"my-2"},n.createElement(O.Z,{variant:"subtitle1"},"Hotel's description"),n.createElement(Q.Z,{sx:{height:"85px"},style:{border:"1px solid black",padding:"4px",paddingLeft:"6px"},minRows:3,placeholder:"Enter your hotel's description...",name:"description",value:Ce.values.description,error:Ce.touched.description&&Boolean(Ce.errors.description),onChange:Ce.handleChange,helperText:Ce.touched.description&&Ce.errors.description})),n.createElement(V.Z,null,"Amenities (select criterias of your hotel)"),n.createElement(X.Z,null,n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"fire-extinguisher",checked:ie.includes("fire-extinguisher"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(h.Z,null)," Fire extinguisher")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"air-conditioned",checked:ie.includes("air-conditioned"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(v.Z,null)," Air-conditioned")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"Elevator",checked:ie.includes("Elevator"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(f.Z,null)," Elevator")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"pet-allowed",checked:ie.includes("pet-allowed"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(b.Z,null)," Pets allowed")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"outdoor-pool",checked:ie.includes("outdoor-pool"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(u.Z,null)," Outdoor-pool")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"indoor-pool",checked:ie.includes("indoor-pool"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(u.Z,null)," Indoor pool")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"spa",checked:ie.includes("spa"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(s.Z,null)," Spa and wellness center")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"fitness",checked:ie.includes("fitness"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(d.Z,null)," Fitness center")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"restaurant",checked:ie.includes("restaurant"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(E.Z,null),"Restaurant")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"bar",checked:ie.includes("bar"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(E.Z,null)," Bar/ Lounge")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"room-service",checked:ie.includes("room-service"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(g.Z,null)," Room service")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"wifi",checked:ie.includes("wifi"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(Z.Z,null)," Free wifi")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"coffee-shop",checked:ie.includes("coffee-shop"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(k.Z,null)," Coffee shop")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"free-parking",checked:ie.includes("free-parking"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(p.Z,null)," Free parking")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"minibar",checked:ie.includes("minibar"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(C.Z,null)," Minibar")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"snack-bar",checked:ie.includes("snack-bar"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(x.Z,null)," Snack bar")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"shop",checked:ie.includes("shop"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(w.Z,null)," Shops on site")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"golf",checked:ie.includes("golf"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(N.Z,null)," Golf")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"ironing",checked:ie.includes("ironing"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(F.Z,null)," Ironing service")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"gift-shop",checked:ie.includes("gift-shop"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(y.Z,null)," Gift shop")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"garden",checked:ie.includes("garden"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(S.Z,null)," Garden")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"terrace",checked:ie.includes("terrace"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(L.Z,null)," Terrace/ Patio")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"atm",checked:ie.includes("atm"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(q.Z,null)," ATM on-site")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"car-rental",checked:ie.includes("car-rental"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(P.Z,null)," Car rental")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"grill",checked:ie.includes("grill"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(R.Z,null)," Grill")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"lake-view",checked:ie.includes("lake-view"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(T.Z,null)," Lake view")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"city-view",checked:ie.includes("city-view"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(_.Z,null)," City view")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"playground",checked:ie.includes("playground"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(A.Z,null)," Playground")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"buffet",checked:ie.includes("buffet"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(U.Z,null)," Buffet")}),n.createElement(J.Z,{control:n.createElement(K.Z,{value:"childcare",checked:ie.includes("childcare"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(B.Z,null)," Babysitting or childcare")})),n.createElement("div",{className:"flex"},n.createElement(J.Z,{control:n.createElement(K.Z,{value:"other",checked:ie.includes("other"),onChange:fe}),label:n.createElement(n.Fragment,null,n.createElement(I.Z,null)," Others")}))),n.createElement(H.Z,{className:"my-2"},n.createElement(O.Z,{variant:"subtitle1"},"Hotel's imgURL"),n.createElement("input",{type:"file",onChange:be,multiple:!0,size:"50"})),n.createElement(W.Z,{type:"submit",loading:re,variant:"contained",className:"bg-sky-300 text-xl font-bold rounded-full mt-4 hover:bg-sky-500 hover:text-white py-2"},"Send")))}var ce=function(){return n.createElement(a.Z,null,n.createElement(re,null))}},76506:function(e,l,t){t.r(l);var n=t(56861).Z.create({baseURL:"http://localhost:8080/api"});l.default=n}}]);
//# sourceMappingURL=component---src-pages-owner-create-hotel-page-js-258f5ad3e07e604e8a13.js.map