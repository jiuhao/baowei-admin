webpackJsonp([12],{GhLf:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("vLgD");var i={data:function(){return{list:null,listLoading:!0,listQuery:{currentPage:1,size:50},total:0}},created:function(){this.getList()},methods:{getList:function(){var e,t=this;this.listLoading=!0,(e=this.listQuery,Object(a.a)({url:"/admin/list",method:"post",data:e})).then(function(e){t.list=e.data.list,t.total=e.data.total,t.listLoading=!1})},handleSizeChange:function(e){this.listQuery.size=e,this.getList()},handleCurrentChange:function(e){this.listQuery.currentPage=e,this.getList()}}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",width:"50",label:"序号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.$index+1)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"账号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.username)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"权限",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.role))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"姓名",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.nickname)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"手机号码",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.mobile)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",prop:"created_at",label:"最近登录",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("i",{staticClass:"el-icon-time"}),e._v(" "),n("span",[e._v(e._s(t.row.display_time))])]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container",attrs:{align:"center"}},[n("el-pagination",{attrs:{background:"","current-page":e.listQuery.currentPage,"page-sizes":[10,20,30,50],"page-size":e.listQuery.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"currentPage",t)}}})],1)],1)},staticRenderFns:[]},s=n("VU/8")(i,l,!1,null,null,null);t.default=s.exports}});