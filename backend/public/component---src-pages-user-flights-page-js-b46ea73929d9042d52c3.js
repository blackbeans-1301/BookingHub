"use strict";(self.webpackChunkbooking_hub=self.webpackChunkbooking_hub||[]).push([[277],{42096:function(n,e,t){t.d(e,{HY:function(){return l},VB:function(){return s},gU:function(){return f},lv:function(){return u},mH:function(){return a},nQ:function(){return c},q6:function(){return h},zh:function(){return i}});var o=t(13880),r=t(6490),u=function(n){fetch(r.vl).then((function(n){return n.json()})).then((function(e){return n(e),e})).catch((function(n){console.log(n)}))},c=function(n,e){var t={headers:{Authorization:"Bearer "+e}};return o.Z.post(r.ni,n,t).then((function(n){return n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.Message}))},a=function(n,e){var t=new Headers;t.append("Authorization","Bearer "+e);var o={method:"GET",headers:t,redirect:"follow"};fetch(r.hC,o).then((function(n){return n.json()})).then((function(e){return n(e),e}))},i=function(n,e){var t=r.qh+"/"+n;console.log("url",t);return o.Z.get(t).then((function(n){return console.log("res==",n),e(n.data),n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.Message}))},l=function(n,e){var t={headers:{Authorization:"Bearer "+e}};return o.Z.put(r.oc,n,t).then((function(n){return console.log("RESPONSE ==== : ",n),n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.Message}))},s=function(n,e){return o.Z.put(r.KP,n,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(n){return console.log("RESPONSE:",n),e(n.data),n.data})).catch((function(n){console.log("ERROR:",n)}))},f=function(n){return o.Z.get(r.vf+"/"+n)},h=function(n,e){console.log("deleting token",n);var t={headers:{Authorization:"Bearer "+n,"Content-Type":"application/x-www-form-urlencoded"}};return o.Z.post(r.eN,e,t).then((function(n){return console.log("RES==",n),n})).catch((function(n){return console.log("ERR==",n),n}))}},33848:function(n,e,t){t.r(e),t.d(e,{default:function(){return a}});var o=t(67294),r=t(71456),u=t(21850);function c(){var n=(0,o.useState)(!1),e=n[0],t=n[1];return o.createElement(o.Fragment,null,o.createElement("div",{className:"m-4 bg-white w-screen z-10 md:w-auto w-full"},o.createElement("h1",{className:"font-bold text-2xl mb-3"},"this is the flight page"),o.createElement("button",{className:"",onClick:function(){console.log("click on make reservation"),t(!0)}},o.createElement("span",{className:""},"Make a reservation"))),o.createElement(u.Z,{isVisible:e,isClose:function(){return t(!1)}}))}var a=function(){return o.createElement(r.Z,null,o.createElement(c,null))}}}]);
//# sourceMappingURL=component---src-pages-user-flights-page-js-b46ea73929d9042d52c3.js.map