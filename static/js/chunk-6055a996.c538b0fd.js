(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6055a996"],{1298:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"form",staticClass:"small-form-margin",attrs:{model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"用户名："}},[a("span",[e._v(e._s(e.name))])]),a("el-form-item",{attrs:{label:"昵称："}},[a("el-input",{staticStyle:{width:"32%"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"密码："}},[a("el-input",{staticStyle:{width:"32%"},model:{value:e.form.passWord,callback:function(t){e.$set(e.form,"passWord",t)},expression:"form.passWord"}})],1),a("el-form-item",{attrs:{label:"状态："}},[a("el-radio-group",{model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[a("el-radio",{attrs:{label:"0",name:"type"}},[e._v("在线")]),a("el-radio",{attrs:{label:"1",name:"type"}},[e._v("忙碌")]),a("el-radio",{attrs:{label:"2",name:"type"}},[e._v("离开")])],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")])],1)],1)],1)},o=[],r=a("5530"),s=a("2f62"),n={name:"personal",computed:Object(r["a"])({},Object(s["b"])(["name"])),data:function(){return{form:{name:"",passWord:"",type:"0"}}},methods:{onSubmit:function(){this.$message.success("提交成功!")}}},m=n,i=(a("c31c"),a("2877")),c=Object(i["a"])(m,l,o,!1,null,"32036b97",null);t["default"]=c.exports},"4c77":function(e,t,a){},c31c:function(e,t,a){"use strict";a("4c77")}}]);