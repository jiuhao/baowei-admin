webpackJsonp([11],{V9V6:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("vLgD");var i={data:function(){return{data:[],defaultProps:{children:"children",label:"label"}}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.listLoading=!0,Object(n.a)({url:"/admin/permission/list",method:"get"}).then(function(e){t.data=e.data,t.listLoading=!1})}}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app-container"},[e("el-tree",{attrs:{data:this.data,props:this.defaultProps},on:{"node-click":this.handleNodeClick}})],1)},staticRenderFns:[]},l=a("VU/8")(i,s,!1,null,null,null);e.default=l.exports}});