(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3aef698c"],{"207a":function(t,e,s){"use strict";s("f4e2")},d50a:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{margin:"30px"}},[s("el-row",{staticClass:"mgl20 mgr20",attrs:{gutter:20}},[s("el-col",{staticClass:"mgt20",attrs:{span:8}},[s("el-upload",{attrs:{action:"/","show-file-list":!1,"before-upload":t.beforeAvatarUpload,"http-request":t.uploadFile}},[t.samplePicture?s("img",{attrs:{src:t.samplePicture}}):s("el-button",{staticClass:"pad-30 bor-1"},[t.samplePicture?t._e():s("i",{staticClass:"el-icon-plus",staticStyle:{"font-size":"30px"}}),t.samplePicture?s("i",{staticClass:"el-icon-loading"}):t._e(),s("p",{staticClass:"mar-t-5"},[t._v("上传 图片，大小不超过2M")])])],1)],1),s("el-col",{staticClass:"mgt20",attrs:{span:8}},[s("el-upload",{attrs:{action:"/","show-file-list":!1,"before-upload":t.beforeBatchInExcel,"http-request":t.batchInFileExcel}},[s("el-button",{staticClass:"pad-30",attrs:{loading:t.importLoaing}},[s("i",{staticClass:"el-icon-plus",staticStyle:{"font-size":"30px"}}),s("p",{staticClass:"mar-t-5"},[t._v("上传excel，大小不超过2M")])])],1)],1),s("el-col",{staticClass:"mgt20",attrs:{span:8}},[s("el-upload",{attrs:{"show-file-list":!1,"before-upload":t.beforeAvatarUploadPdf,"http-request":t.uploadFilePdf,limit:1,action:"/",multiple:""}},[s("el-button",{staticClass:"pad-30"},[s("i",{staticClass:"el-icon-plus",staticStyle:{"font-size":"30px"}}),s("p",{staticClass:"mar-t-5"},[t._v("上传 pdf、word，大小不超过10M")])])],1)],1)],1)],1)},r=[],l=(s("caad"),s("b0c0"),s("ac1f"),s("5319"),{name:"upload",data:function(){return{samplePicture:"",importLoaing:!1}},methods:{uploadFile:function(t){return this.$message.error("请配置接口!")},beforeAvatarUpload:function(t){console.log(t.type);var e=/^image\/(jpeg|png|jpg|gif)$/g.test(t.type),s=t.size/1024/1024<2;return e||this.$message.error("上传图片只能是图片格式!"),s||this.$message.error("上传图片大小不能超过 2MB!"),e&&s},batchInFileExcel:function(t){return this.$message.error("请配置接口!")},beforeBatchInExcel:function(t){var e="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===t.type,s=t.size/1024/1024<2;return e||this.$message.error("上传文件只能是 excel 格式!"),s||this.$message.error("上传文件大小不能超过 2MB!"),e&&s},uploadFilePdf:function(t){return this.$message.error("请配置接口!")},beforeAvatarUploadPdf:function(t){var e=["pdf","doc","docx"],s=t.name,a=s.replace(/.+\./,""),r=t.size/1024/1024<10,l=e.includes(a);return r||this.$message.error("上传文件大小不能超过 10MB!"),l||this.$message({type:"error",message:"上传文件类型只能是pdf或者word格式!"}),l&&r}}}),i=l,o=(s("207a"),s("2877")),c=Object(o["a"])(i,a,r,!1,null,"59c97a6e",null);e["default"]=c.exports},f4e2:function(t,e,s){}}]);