(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{544:function(e,t,n){"use strict";n.r(t);var r=n(635),o=(n(37),n(33),{props:{groups:{type:Array,default:null},member:{type:Object,default:null}},data:function(){return{pages:0,headers:[{text:"Name",value:"name"},{text:"Role",value:"role"},{text:"Group Type ",value:"type"},{text:"Members",value:"members"},{text:"Account ",value:"groupAccount"},{text:"Balance",value:"balance",align:"end"},{text:"Share Price",value:"sharePrice",align:"end"}],show:!1,editedItem:{}}},methods:{rowclick:function(e){this.$router.push("/groups/".concat(e.id,"/").concat(void 0===this.$route.params.id?"":this.$route.params.id))}}}),l=n(62),component=Object(l.a)(o,(function(){var e=this,t=e._self._c;return e.groups?t(r.a,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.groups,"item-key":"name","mobile-breakpoint":"0"},on:{"click:row":e.rowclick},scopedSlots:e._u([null,{key:"item.balance",fn:function(n){var r=n.item;return[t("span",[e._v(e._s(e._f("currency")(r.balance)))])]}},{key:"item.created",fn:function(n){var r=n.item;return[t("span",[e._v(e._s(e._f("dateformat")(r.createdDate)))])]}},{key:"item.type",fn:function(n){var r=n.item;return[t("span",[e._v(e._s(1===r.type?"FAMILY":"VIKOBA"))])]}},{key:"no-data",fn:function(){return[t("span",[e._v("No group found ...")])]},proxy:!0}],null,!0)}):t("skeleton-table-loader")}),[],!1,null,null,null);t.default=component.exports}}]);