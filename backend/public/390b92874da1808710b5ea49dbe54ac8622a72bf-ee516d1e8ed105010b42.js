"use strict";(self.webpackChunkbooking_hub=self.webpackChunkbooking_hub||[]).push([[6400],{93851:function(e,t,l){var a=l(64836),n=l(75263);t.Z=void 0;var s=n(l(67294)),c=(0,a(l(58786)).default)(s.createElement("path",{d:"M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"}),"Call");t.Z=c},16002:function(e,t,l){var a=l(64836),n=l(75263);t.Z=void 0;var s=n(l(67294)),c=(0,a(l(58786)).default)(s.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.Z=c},65841:function(e,t,l){var a=l(64836),n=l(75263);t.Z=void 0;var s=n(l(67294)),c=(0,a(l(58786)).default)(s.createElement("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star");t.Z=c},51046:function(e,t,l){l.d(t,{w_:function(){return m}});var a=l(67294),n={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=a.createContext&&a.createContext(n),c=function(){return c=Object.assign||function(e){for(var t,l=1,a=arguments.length;l<a;l++)for(var n in t=arguments[l])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},c.apply(this,arguments)},r=function(e,t){var l={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(l[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(l[a[n]]=e[a[n]])}return l};function o(e){return e&&e.map((function(e,t){return a.createElement(e.tag,c({key:t},e.attr),o(e.child))}))}function m(e){return function(t){return a.createElement(i,c({attr:c({},e.attr)},t),o(e.child))}}function i(e){var t=function(t){var l,n=e.attr,s=e.size,o=e.title,m=r(e,["attr","size","title"]),i=s||t.size||"1em";return t.className&&(l=t.className),e.className&&(l=(l?l+" ":"")+e.className),a.createElement("svg",c({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,m,{className:l,style:c(c({color:e.color||t.color},t.style),e.style),height:i,width:i,xmlns:"http://www.w3.org/2000/svg"}),o&&a.createElement("title",null,o),e.children)};return void 0!==s?a.createElement(s.Consumer,null,(function(e){return t(e)})):t(n)}},17964:function(e,t,l){l.d(t,{Z:function(){return k}});var a=l(15861),n=l(64687),s=l.n(n),c=l(67294),r=l(30263),o=l(32978),m=l(29285),i=l(46216),f=l(27783),u=l(93851),x=l(19143),d=l(16002),E=l(65841),p=l(83290),v=l(57497),N=l(3340),g=l(23201),b=function(e){var t=e.count,l=e.rating,a=e.color,n=e.onRating,s=(0,c.useState)(0),r=s[0],o=s[1],m=(0,c.useMemo)((function(){return Array(t).fill(0).map((function(e,t){return t+1})).map((function(e){return c.createElement(g.QJe,{key:e,className:"cursor-pointer",icon:"star",onClick:function(){return n(e)},style:{color:(t=e,r>=t||!r&&l>=t?a.filled:a.unfilled)},onMouseEnter:function(){return o(e)},onMouseLeave:function(){return o(0)}});var t}))}),[t,l,r]);return c.createElement("div",{className:"flex"},m)};b.defaultProps={count:5,rating:0,color:{filled:"#f5eb3b",unfilled:"#DCDCDC"}};var y=b,h=l(65426);function k(e){var t=e.isVisible,l=e.isClose,n=e.detail,g=e.type;console.log(n);var b=(0,c.useState)(0),k=(b[0],b[1]),w=(0,c.useState)(0),C=w[0],_=w[1],O=(0,c.useState)(""),Z=O[0],j=O[1],S=(0,i.oV)("token"),z=n&&n.Hotel.hotel_id;(0,c.useEffect)((function(){console.log(z),(0,p.Gr)(S,z,k)}),[]);return t&&n?c.createElement("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 "},c.createElement("div",{className:"w-11/12 flex flex-col z-20 h-5/6 rounded-2xl"},c.createElement("div",{className:"bg-white p-2 rounded flex flex-col m-2 overflow-y-scroll"},c.createElement(m.Z,null),c.createElement("div",{className:"flex justify-between "},c.createElement("h2",{className:"font-bold text-2xl text-colorText ml-4 mt-2"},"Reservation Details"),c.createElement("button",{className:"text-light-close text-lg place-self-end hover:text-close-color",onClick:function(){return l()}},c.createElement(r.Z,null))),c.createElement(m.Z,null),c.createElement("div",{className:"flex flex-col relative w-screen md:w-auto break-all border-2 m-4"},c.createElement("div",{className:"border-2 border-sky-300 flex flex-col"},c.createElement("div",{className:"flex"},c.createElement("div",{className:"flex-1 flex flex-col"},c.createElement("div",{className:"flex"},c.createElement("div",{className:"flex flex-col m-2 w-40"},c.createElement("span",{className:"text-sm"},"Check in: "),c.createElement("span",{className:"text-lg font-bold text-sky-600"},null!=n.check_in?(0,f.gO)(n.check_in):"___")),c.createElement("div",{className:"flex flex-col m-2 w-40"},c.createElement("span",{className:"text-sm"},"Check out: "),c.createElement("span",{className:"text-lg font-bold text-sky-600"},null!=n.check_out?(0,f.gO)(n.check_out):"___"))),c.createElement("div",{className:"flex"},c.createElement("div",{className:"flex flex-col m-2 w-40"},c.createElement("span",{className:"text-sm"},"Date in (expected): "),c.createElement("span",{className:"text-lg font-bold text-sky-600"},(0,f.gO)(n.date_in))),c.createElement("div",{className:"flex flex-col m-2 w-40"},c.createElement("span",{className:"text-sm"},"Date out (expected): "),c.createElement("span",{className:"text-lg font-bold text-sky-600"},(0,f.gO)(n.date_out)))),c.createElement("div",{className:"flex"},c.createElement("div",{className:"flex flex-col m-2 w-40"},c.createElement("span",{className:"text-sm"},"Total rooms: "),c.createElement("span",{className:"text-lg font-bold text-sky-600"},n.number_of_rooms)),c.createElement("div",{className:"flex flex-col m-2 w-40"},c.createElement("span",{className:"text-sm"},"Status: "),c.createElement("span",{className:"text-lg font-bold text-sky-600"},c.createElement("span",{className:"waiting"===n.status?"text-sky-600 font-bold":"canceled"===n.status?"text-red-600 font-bold":"completed"===n.status?"text-green-600 font-bold":"text-amber-600 font-bold"},n.status.toUpperCase())))),c.createElement("div",{className:"flex flex-col m-2 justify-end"},c.createElement("span",{className:"text-lg font-semibold text-green-600"},"Total price:"," "),c.createElement("span",{className:"text-xl font-bold"},n.Bill.total_price,"$"))),c.createElement("div",{className:"flex-1"},c.createElement("div",{className:"flex flex-col m-2"},c.createElement("span",{className:"text-sm"},"Guest's name: "),c.createElement("span",{className:"text-lg font-bold text-sky-600"},n.name)),c.createElement("div",{className:"flex flex-col m-2"},c.createElement("span",{className:"text-sm"},"Guest's email: "),c.createElement("span",{className:"text-lg font-bold text-sky-600"},n.email)),c.createElement("div",{className:"flex"},c.createElement("div",{className:"flex flex-col mr-8"},c.createElement("div",{className:"flex flex-col m-2"},c.createElement("span",{className:"text-sm"},"Booking number: "),c.createElement("span",{className:"text-lg font-bold text-sky-600"},n.phone))))),c.createElement("div",{className:"flex2 bg-sky-200 rounded-3xl p-2 m-2"},c.createElement("div",{className:"flex justify-between"},c.createElement("div",{className:"flex flex-col m-2"},c.createElement("span",{className:"text-sm text-gray-400"},c.createElement(d.Z,null),c.createElement("span",{className:"text-black"},"Hotel's name: ")),c.createElement("span",{className:"text-lg font-bold text-sky-600 ml-5"},n.Hotel.name))),c.createElement("div",{className:"flex flex-col m-2"},c.createElement("span",{className:"text-sm text-red-400"},c.createElement(x.Z,null),c.createElement("span",{className:"text-black"},"Hotel's address: ")),c.createElement("span",{className:"text-lg font-bold text-sky-600 ml-5"},n.Hotel.address)),c.createElement("div",{className:"flex flex-col m-2"},c.createElement("span",{className:"text-sm"},c.createElement(u.Z,null),c.createElement("span",{className:"text-black"},"Telephone: ")),c.createElement("span",{className:"text-lg font-bold text-sky-600 ml-5"},n.Hotel.phone)),c.createElement("div",{className:"flex flex-col m-2"},c.createElement("span",{className:"text-sm text-amber-300"},c.createElement(E.Z,null),c.createElement("span",{className:"text-black"},"Rating: ")),c.createElement("span",{className:"text-lg font-bold text-sky-600 ml-5"},n.Hotel.rating,"/5")))),c.createElement("div",{className:""},"reservation"===g||"COMPLETED"!==n.status.toUpperCase()?c.createElement("div",null):c.createElement("div",{className:""},c.createElement("h1",{className:"font-bold text-xl text-sky-600 ml-4"},"Reviews"),null===n.Comment?c.createElement("div",null,c.createElement("h1",{className:"text-lg ml-4"},"You haven't given any reviews for this hotel. Please give a review."),c.createElement("div",{className:"flex flex-col items-center justify-center"},c.createElement("div",{className:"flex flex-col"},c.createElement("div",{className:"flex justify-center items-center"},c.createElement("div",{className:"m-auto"},c.createElement("h2",{className:"text-center m-auto"},"Rate me"),c.createElement(y,{rating:C,onRating:function(e){return _(e)}}),c.createElement("p",{className:"text-center"},"Rating - ",C))),c.createElement("textarea",{className:"border-2 border-sky-200 ml-6 rounded focus:border-sky-400 p-2 m-auto",rows:"4",cols:"80",placeholder:"Write something here...",name:Z,onChange:function(e){j(e.target.value)}}),c.createElement("button",{type:"submit",className:"flex flex-1 justify-center item-center text-center m-auto my-2 border-2 border-sky-500 bg-white hover:bg-sky-500 hover:text-white rounded-xl p-1 font-bold w-52",onClick:function(e){e.preventDefault(),e.stopPropagation(),console.log("rating",C),console.log("review",Z);var t={reservation_id:n.reservation_id,content:Z,rating:C.toString()},l=function(){var e=(0,a.Z)(s().mark((function e(){var l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,h.Y)(S,t);case 2:l=e.sent,"object"===typeof l?(o.Am.success("Give a review successfully"),setTimeout((function(){return(0,i.uX)("http://w22g1.int3306.freeddns.org/user/HistoryPage")}),1200)):o.Am.error("Something went wrong"),console.log("response",l),console.log("type",typeof l);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();l()}},"Send review")))):c.createElement("div",{className:"bg-sky-100 rounded-lg p-2 flex flex-col m-2"},c.createElement("div",{className:"flex items-center justify-between"},c.createElement("div",{className:"flex flex-col"},c.createElement("span",{className:"text-lg font-bold"},n.Comment.rating,"/5 Good"),c.createElement("span",{className:"font-bold text-sky-600 text-xl"},n.name)),c.createElement("span",{className:"text-gray-400"},c.createElement(N.Z,null)," ",n.Comment.createdAt)),c.createElement("span",{className:"text-gray-500"},c.createElement(v.Z,null)," Liked"),c.createElement("p",{className:"ml-2"},n.Comment.content),c.createElement("span",{className:"text-gray-400 text-sm"},"Stayed in ",(0,f.gO)(n.check_in)))))))))):null}}}]);
//# sourceMappingURL=390b92874da1808710b5ea49dbe54ac8622a72bf-ee516d1e8ed105010b42.js.map