"use strict";(self.webpackChunkbooking_hub=self.webpackChunkbooking_hub||[]).push([[6516],{24685:function(e,t,n){var r=n(64836);t.Z=void 0;var a=r(n(32174)),o=n(85893),c=(0,a.default)((0,o.jsx)("path",{d:"M12.89 11.1c-1.78-.59-2.64-.96-2.64-1.9 0-1.02 1.11-1.39 1.81-1.39 1.31 0 1.79.99 1.9 1.34l1.58-.67c-.15-.45-.82-1.92-2.54-2.24V5h-2v1.26c-2.48.56-2.49 2.86-2.49 2.96 0 2.27 2.25 2.91 3.35 3.31 1.58.56 2.28 1.07 2.28 2.03 0 1.13-1.05 1.61-1.98 1.61-1.82 0-2.34-1.87-2.4-2.09l-1.66.67c.63 2.19 2.28 2.78 2.9 2.96V19h2v-1.24c.4-.09 2.9-.59 2.9-3.22 0-1.39-.61-2.61-3.01-3.44zM3 21H1v-6h6v2H4.52c1.61 2.41 4.36 4 7.48 4 4.97 0 9-4.03 9-9h2c0 6.08-4.92 11-11 11-3.72 0-7.01-1.85-9-4.67V21zm-2-9C1 5.92 5.92 1 12 1c3.72 0 7.01 1.85 9 4.67V3h2v6h-6V7h2.48C17.87 4.59 15.12 3 12 3c-4.97 0-9 4.03-9 9H1z"}),"CurrencyExchange");t.Z=c},27497:function(e,t,n){var r=n(64836);t.Z=void 0;var a=r(n(32174)),o=n(85893),c=(0,a.default)((0,o.jsx)("path",{d:"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-8 6H8v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1H8v-1H6v-2h4v-1H7c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h1V7h2v1h2v2zm4 6.25-2-2h4l-2 2zM14 10l2-2 2 2h-4z"}),"PriceChange");t.Z=c},48333:function(e,t,n){var r=n(64836);t.Z=void 0;var a=r(n(32174)),o=n(85893),c=(0,a.default)((0,o.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.Z=c},36438:function(e,t,n){var r=n(64836);t.Z=void 0;var a=r(n(32174)),o=n(85893),c=(0,a.default)((0,o.jsx)("path",{d:"M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star");t.Z=c},60539:function(e,t,n){var r=n(64836);t.Z=void 0;var a=r(n(32174)),o=n(85893),c=(0,a.default)((0,o.jsx)("path",{d:"M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"}),"WorkspacePremium");t.Z=c},42096:function(e,t,n){n.d(t,{C:function(){return d},HY:function(){return s},VB:function(){return u},gU:function(){return m},lv:function(){return o},mH:function(){return l},nQ:function(){return c},q6:function(){return f},zh:function(){return i}});var r=n(13880),a=n(6490),o=function(e){fetch(a.vl).then((function(e){return e.json()})).then((function(t){return e(t),t})).catch((function(e){console.log(e)}))},c=function(e,t){var n={headers:{Authorization:"Bearer "+t}};return r.Z.post(a.ni,e,n).then((function(e){return e.data})).catch((function(e){return console.log("ERROR: ====",e),e.response.data.Message}))},l=function(e,t){var n=new Headers;n.append("Authorization","Bearer "+t);var r={method:"GET",headers:n,redirect:"follow"};fetch(a.hC,r).then((function(e){return e.json()})).then((function(t){return e(t),t}))},i=function(e,t){var n=a.qh+"/"+e;console.log("url",n);return r.Z.get(n).then((function(e){return console.log("res==",e),t(e.data),e.data})).catch((function(e){return console.log("ERROR: ====",e),e.response.data.Message}))},s=function(e,t){var n={headers:{Authorization:"Bearer "+t}};return r.Z.put(a.oc,e,n).then((function(e){return console.log("RESPONSE ==== : ",e),e.data})).catch((function(e){return console.log("ERROR: ====",e),e.response.data.Message}))},u=function(e,t){return r.Z.put(a.KP,e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){return console.log("RESPONSE:",e),t(e.data),e.data})).catch((function(e){console.log("ERROR:",e)}))},d=function(e,t,n){var o=a.HB+"/"+e;console.log("url",o);var c={headers:{Authorization:"Bearer "+t}};return r.Z.get(o,c).then((function(e){return console.log("res==",e),n(e.data),e.data})).catch((function(e){return console.log("ERROR: ====",e),e.response.data.Message}))},m=function(e){return r.Z.get(a.vf+"/"+e)},f=function(e,t){console.log("deleting token",e);var n={headers:{Authorization:"Bearer "+e,"Content-Type":"application/x-www-form-urlencoded"}};return r.Z.post(a.eN,t,n).then((function(e){return console.log("RES==",e),e})).catch((function(e){return console.log("ERR==",e),e}))}},28675:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(67294),a=n(27497),o=n(48333),c=n(24685),l=n(60539),i=[{id:1,icon:r.createElement(a.Z,{className:"text-blue-900"}),title:"Best room deals",description:"Find the best deals available from 900+ people"},{id:2,icon:r.createElement(o.Z,{className:"text-blue-900"}),title:"Search without worry",description:"The prices you see aren't affected by your searches."},{id:3,icon:r.createElement(c.Z,{className:"text-blue-900"}),title:"Book with flexibility",description:"Easily find rooms with no change fees."},{id:4,icon:r.createElement(l.Z,{className:"text-blue-900"}),title:"Trusted and free",description:"We’re completely free to use – no hidden charges or fees."}];function s(){return r.createElement("div",{className:"m-8"},r.createElement("h1",{className:"font-bold text-2xl text-primary"},"Here's why you choose bookinghub"),r.createElement("div",{className:"flex justify-between my-8"},i.map((function(e,t){return r.createElement("div",{className:"inline-block w-72 h-48 rounded-md border border-blue-900"},r.createElement("div",{className:"ml-2"},r.createElement("div",{className:"p-2"},e.icon),r.createElement("div",null,r.createElement("h1",{className:"font-bold text-xl ml-2 text-indigo-900 mb-4"},e.title)),r.createElement("div",{className:"mx-2"},e.description)))}))))}},39452:function(e,t,n){n.d(t,{Z:function(){return f}});var r=n(15861),a=n(64687),o=n.n(a),c=n(67294),l=n(36438),i=n(46216);function s(e){for(var t=e.data,n=e.dateIn,r=e.dateOut,a=[],o=0;o<t.rating;o++)a.push(o);return t&&n&&r?c.createElement("div",{className:"ml-8 flex flex-col mb-4 cursor-pointer"},c.createElement("div",null,c.createElement("img",{src:t.Images.length>0?t.Images[0].imgURL:"https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",atl:"none",className:"rounded-lg w-64 h-96 object-cover"})),c.createElement("div",{className:"mt-4",onClick:function(){(0,i.uX)("http://w22g1.int3306.freeddns.org/user/HotelPage?x="+t.hotel_id+"/"+n+"/"+r)}},c.createElement("div",{className:""},c.createElement("div",{className:"font-bold text-primary font-sans"},t.name),c.createElement("div",{className:""},a.length>0?a.map((function(e,t){return c.createElement(l.Z,{style:{width:"16px"},className:"text-primary",key:t})})):"No rating yet",c.createElement("div",{className:"inline-block ml-2 font-sans p-1 bg-primary text-white rounded-md font-bold"},t.rating.toFixed(1)," ")),c.createElement("div",{className:"text-sm"},t.province),c.createElement("div",{className:"mt-2 font-bold font-sans text-primary"},"From $",t.startPrice)))):null}var u=n(48538),d=n(42096),m=n(27783);function f(){var e=(0,c.useState)(),t=e[0],n=e[1],a=new Date,l=new Date;l.setDate(a.getDate()+1);return(0,c.useEffect)((function(){var e=function(){var e=(0,r.Z)(o().mark((function e(){var t,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={date_in:(0,m.r2)(a),date_out:(0,m.r2)(l),province:"Ha noi",number_of_room:1,number_of_guest:1},e.next=3,(0,d.VB)(t,n);case 3:r=e.sent,console.log(r),n(r);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),t?c.createElement("div",{className:"ml-8"},c.createElement("h1",{className:"text-2xl font-bold text-gray-600"},"Stays near you"),c.createElement("h1",{className:"font-sans"},"From Sun, ",(0,m.gO)(a)," -"," ",(0,m.gO)(l)),c.createElement(u.Z,Object.assign({},{dots:!0,infinite:!0,speed:500,slidesToShow:4,slidesToScroll:1},{style:{width:"95%"},className:"mt-4"}),t.map((function(e,t){return c.createElement(s,{key:t,data:e,dateIn:(0,m.r2)(a),dateOut:(0,m.r2)(l)})})))):null}},45921:function(e,t,n){n.r(t),n.d(t,{default:function(){return i}});var r=n(67294),a=n(71456),o=n(28675),c=n(39452);function l(){return r.createElement("div",{className:"m-4 bg-white w-screen z-10 md:w-auto w-full"},r.createElement("h1",{className:"font-bold text-2xl mb-3"},"this is the stay page"),r.createElement(o.Z,null),r.createElement(c.Z,null))}var i=function(){return r.createElement(a.Z,null,r.createElement(l,null))}}}]);
//# sourceMappingURL=component---src-pages-user-stay-page-js-769d6dd7dd81e5ff188e.js.map