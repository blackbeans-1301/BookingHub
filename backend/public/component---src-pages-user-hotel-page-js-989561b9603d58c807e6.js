"use strict";(self.webpackChunkbooking_hub=self.webpackChunkbooking_hub||[]).push([[5125],{19143:function(n,t,e){var o=e(64836),r=e(75263);t.Z=void 0;var u=r(e(67294)),c=(0,o(e(58786)).default)(u.createElement("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}),"LocationOn");t.Z=c},42096:function(n,t,e){e.d(t,{C:function(){return f},HY:function(){return s},VB:function(){return l},gU:function(){return h},lv:function(){return u},mH:function(){return a},nQ:function(){return c},q6:function(){return d},zh:function(){return i}});var o=e(13880),r=e(6490),u=function(n){fetch(r.vl).then((function(n){return n.json()})).then((function(t){return n(t),t})).catch((function(n){console.log(n)}))},c=function(n,t){var e={headers:{Authorization:"Bearer "+t}};return o.Z.post(r.ni,n,e).then((function(n){return n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.Message}))},a=function(n,t){var e=new Headers;e.append("Authorization","Bearer "+t);var o={method:"GET",headers:e,redirect:"follow"};fetch(r.hC,o).then((function(n){return n.json()})).then((function(t){return n(t),t}))},i=function(n,t){var e=r.qh+"/"+n;console.log("url",e);return o.Z.get(e).then((function(n){return console.log("res==",n),t(n.data),n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.Message}))},s=function(n,t){var e={headers:{Authorization:"Bearer "+t}};return o.Z.put(r.oc,n,e).then((function(n){return console.log("RESPONSE ==== : ",n),n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.Message}))},l=function(n,t){return o.Z.put(r.KP,n,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(n){return console.log("RESPONSE:",n),t(n.data),n.data})).catch((function(n){console.log("ERROR:",n)}))},f=function(n,t,e){var u=r.HB+"/"+n;console.log("url",u);var c={headers:{Authorization:"Bearer "+t}};return o.Z.get(u,c).then((function(n){return console.log("res==",n),e(n.data),n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.Message}))},h=function(n){return o.Z.get(r.vf+"/"+n)},d=function(n,t){console.log("deleting token",n);var e={headers:{Authorization:"Bearer "+n,"Content-Type":"application/x-www-form-urlencoded"}};return o.Z.post(r.eN,t,e).then((function(n){return console.log("RES==",n),n})).catch((function(n){return console.log("ERR==",n),n}))}},95817:function(n,t,e){e.d(t,{Fp:function(){return u},MC:function(){return i},TZ:function(){return s},Ui:function(){return a},jh:function(){return c}});var o=e(13880),r=e(6490),u=function(n,t){var e={headers:{Authorization:"Bearer "+t}};return o.Z.post(r.QG,n,e).then((function(n){return console.log("RESPONSE ==== : ",n),n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.Message}))},c=function(n,t,e){var u={headers:{Authorization:"Bearer "+e,"Content-Type":"application/x-www-form-urlencoded"}};return o.Z.post(r.Hc,t,u).then((function(t){return console.log("RESPONSE ==== : ",t),n(t.data),t.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.message}))},a=function(n,t){var e={headers:{Authorization:"Bearer "+t}};return o.Z.put(r.H7,n,e).then((function(n){return console.log("RESPONSE ==== : ",n),n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.Message}))},i=function(n,t){return o.Z.put(r.TX,n,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(n){return console.log("RESPONSE ==== : ",n),t(n.data),n.data})).catch((function(n){return console.log("ERROR: ====",n),n.response.data.message}))},s=function(n,t){console.log("deleting token",n);var e={headers:{Authorization:"Bearer "+n,"Content-Type":"application/x-www-form-urlencoded"}};return o.Z.post(r.k2,t,e).then((function(n){return console.log("RES==",n),n})).catch((function(n){return console.log("ERR==",n),n}))}},15282:function(n,t,e){e.r(t);var o=e(67294),r=e(71456),u=e(77695);e(42096);t.default=function(n){var t=n.location.search;console.log("location",t);t.length;var e=t.substring(3).split("/"),c=e[0],a=e[1],i=e[2];return console.log("hotelId",c,a,i),o.createElement(r.Z,null,o.createElement(u.Z,{id:c,dateIn:a,dateOut:i}))}}}]);
//# sourceMappingURL=component---src-pages-user-hotel-page-js-989561b9603d58c807e6.js.map