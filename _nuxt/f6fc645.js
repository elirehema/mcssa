(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{602:function(t,e,n){"use strict";n.r(e);var r=n(430),c=n(530),o=n(600),l=n(208),d=n(445),f=n(59),v=n(451),m=n(8),h=(n(62),{data:function(){return{accounts:null,pages:0,headers:[{text:"Name ",value:"name"},{text:"Account #",value:"account"},{text:"Status ",value:"status"},{text:"Deposits ",value:"deposits"},{text:"Dividends ",value:"dividend"},{text:"Penalty",value:"penalty"},{text:"Withdraws",value:"withdraws"},{text:"Dividends ",value:"dividend"},{text:"Social Fund",value:"socialfund"},{text:"S.F Withdraws",value:"socialfundWithdraws"},{text:"Created Date",value:"created"}]}},head:function(){return{title:"Accounts"}},created:function(){this.paginate({page:0,itemsPerPage:15})},methods:{paginate:function(t){var e=this;return Object(m.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$api.$get("/accounts",{params:{page:t.page,size:t.itemsPerPage,sort:"groupid desc"}}).then((function(t){e.pages=t.totalRows,e.page=t.currentPage,e.accounts=t.results})).catch((function(t){}));case 2:case"end":return n.stop()}}),n)})))()}}}),x=n(55),component=Object(x.a)(h,(function(){var t=this,e=t._self._c;return t.accounts?e(o.a,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.accounts,"item-key":"name","footer-props":t.footerprops,"server-items-length":t.pages},on:{pagination:t.paginate},scopedSlots:t._u([{key:"top",fn:function(){return[e(f.a,{attrs:{flat:""}},[e(v.a,{staticClass:"font-weight-medium"},[t._v("\n        Accounts\n      ")]),t._v(" "),e(d.a)],1)]},proxy:!0},{key:"item.created",fn:function(n){var r=n.item;return[e("span",[t._v(t._s(t._f("dateformat")(r.createdDate)))])]}},{key:"item.status",fn:function(n){var o=n.item;return[e(c.a,{attrs:{small:"",color:"ACTIVE"==o.status?"success":""}},["ACTIVE"==o.status?e(r.a,{attrs:{left:""}},[e(l.a,{attrs:{small:""}},[t._v("\n          mdi-checkbox-marked-circle\n        ")])],1):t._e(),t._v("\n      "+t._s(o.status)+"\n    ")],1)]}}],null,!1,481397227)}):e("skeleton-table-loader")}),[],!1,null,null,null);e.default=component.exports}}]);