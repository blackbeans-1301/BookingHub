"use strict";(self.webpackChunkbooking_hub=self.webpackChunkbooking_hub||[]).push([[5376],{57182:function(e,t,r){r.r(t),r.d(t,{default:function(){return d}});var a=r(67294),s=r(71456),l=(r(21850),r(12531)),n=(r(42096),r(13586),r(46216)),c=r(27783),m=r(83290),o=(r(32978),r(6490),r(17964));function b(){var e=(0,a.useState)(!1),t=(e[0],e[1],(0,a.useState)()),r=t[0],s=t[1],b=(0,a.useState)(),d=(b[0],b[1],(0,a.useState)(!1)),p=d[0],x=d[1],i=(0,a.useState)(),g=i[0],y=i[1],u=(0,a.useState)({name:"",address:"",criteria:"",Images:"",description:"",province:""});u[0],u[1];var h=(0,n.oV)("token");return(0,a.useEffect)((function(){(0,m.s1)(h,y)}),[]),console.log("history",g),a.createElement(a.Fragment,null,a.createElement("div",{className:"m-4 bg-white w-screen z-10 md:w-auto min-h-screen"},a.createElement("h1",{className:"font-bold text-2xl mb-3"},"History"),a.createElement("div",{className:"container mx-auto px-4 sm:px-8"},a.createElement("div",{className:"-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"},a.createElement("div",{className:"inline-block min-w-full shadow-md rounded-lg overflow-hidden"},void 0===g?a.createElement("div",null,"You haven't book any reservations yet."):a.createElement("table",{className:"min-w-full leading-normal"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"No"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"Reservation id"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"Hotel name"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"Guest name"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"Telephone"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"Number of rooms"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"Check in date"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"Check out date"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"Created at"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"},"Status"),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"}),a.createElement("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100"}))),a.createElement("tbody",null,g.map((function(e,t){return a.createElement("tr",{key:t},a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"},a.createElement("p",{className:"text-gray-900 whitespace-no-wrap"},t+1)),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"},a.createElement("p",{className:"text-gray-900 whitespace-no-wrap"},e.reservation_id)),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"},a.createElement("p",{className:"text-gray-900 whitespace-no-wrap"},e.Hotel.name)),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"},a.createElement("p",{className:"text-gray-900 whitespace-no-wrap"},e.name)),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"},a.createElement("p",{className:"text-gray-900 whitespace-no-wrap"},e.phone)),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"},a.createElement("p",{className:"text-gray-900 whitespace-no-wrap"},e.number_of_rooms)),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"},null===e.check_in?"____":(0,c.Um)(e.check_in)),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"},null===e.check_out?"____":(0,c.Um)(e.check_out)),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"},a.createElement("p",{className:"text-gray-900 whitespace-no-wrap"},(0,c.Um)(e.createdAt))),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"},a.createElement("p",{className:"text-gray-900 whitespace-no-wrap"},a.createElement("span",{className:"waiting"===e.status?"text-sky-400 ":"canceled"===e.status?"text-red-400":"completed"===e.status?"text-green-400":"text-amber-400"},e.status.toUpperCase()))),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"},a.createElement("button",{type:"button",className:"inline-block mx-px text-green-300 hover:text-green-500",onClick:function(){s(e),x(!0)}},a.createElement(l.Z,null))),a.createElement("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm"}),a.createElement(o.Z,{isVisible:p,isClose:function(){return x(!1)},detail:r,type:"history"}))})))))))))}var d=function(){return a.createElement(s.Z,null,a.createElement(b,null))}}}]);
//# sourceMappingURL=component---src-pages-user-history-page-js-94353ededb485685ddcc.js.map