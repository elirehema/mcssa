(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{557:function(t,e,r){"use strict";r.r(e);var o=r(201),n=r(551),l=r(610),c=r(135),m=r(480),d=r(64),f=r(487),v=(r(38),r(36),{props:{groups:{type:Array,default:null},member:{type:Object,default:null}},data:function(){return{pages:0,headers:[{text:"Name",value:"name"},{text:"Group Type ",value:"groupType"},{text:"Location",value:"location"},{text:"Members",value:"members"},{text:"Status ",value:"status"},{text:"Created Date",value:"created"}],show:!1,editedItem:{}}},methods:{rowclick:function(t){this.$router.push("/groups/".concat(t.id,"/").concat(this.$route.params.id))}}}),_=r(59),component=Object(_.a)(v,(function(){var t=this,e=t._self._c;return t.groups?e(l.a,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.groups,"item-key":"name"},on:{"click:row":t.rowclick},scopedSlots:t._u([{key:"top",fn:function(){return[e(d.a,{attrs:{color:"",flat:""}},[e(f.a,{staticClass:"font-weight-medium"},[t._v("\n       "+t._s(t.member.name)+" "+t._s(t.member.familyName)+" Groups\n      ")]),t._v(" "),e(m.a)],1)]},proxy:!0},{key:"item.created",fn:function(r){var o=r.item;return[e("span",[t._v(t._s(t._f("dateformat")(o.createdDate)))])]}},{key:"item.status",fn:function(r){var l=r.item;return[e(n.a,{staticClass:"font-weight-bold",attrs:{dark:"",color:"ACTIVE"==l.status?"green":"success"}},["ACTIVE"==l.status?e(o.a,{attrs:{left:""}},[e(c.a,{attrs:{small:""}},[t._v("mdi-checkbox-marked-circle")])],1):t._e(),t._v("\n      "+t._s(l.status.toLowerCase())+"\n    ")],1)]}},{key:"no-data",fn:function(){return[e("span",[t._v("No group found ...")])]},proxy:!0}],null,!1,2558843920)}):e("skeleton-table-loader")}),[],!1,null,null,null);e.default=component.exports}}]);