webpackJsonp([83],{Xnq1:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("bUp0"),s={name:"MenuAdd",props:{onAdd:{type:Function,default:null}},data:function(){return{form:this.$form.createForm(this),visible:!1,formLayout:"horizontal",menus:[]}},created:function(){this.getMenuList()},methods:{showDrawer:function(){this.visible=!0},onClose:function(){this.form.resetFields(),this.visible=!1},getMenuList:function(){var e=this;Object(a.f)().then(function(t){e.menus=t.data})},handleSubmit:function(e){var t=this;e.preventDefault(),this.form.validateFields(function(e,r){if(!e){if(console.log("values: ",r),Number(r.order)>255)return t.$message.error("排序不能大于255"),!1;console.log(r),Object(a.a)(r).then(function(e){t.$message.success(e.message),t.onAdd(),setTimeout(function(){t.onClose()},100)})}})},filterOption:function(e,t){return t.componentOptions.children[0].text.toLowerCase().indexOf(e.toLowerCase())>=0}}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("a-button",{staticStyle:{"margin-top":"4px"},attrs:{size:"small",type:"primary"},on:{click:e.showDrawer}},[r("a-icon",{attrs:{type:"plus"}}),e._v("菜单\n  ")],1),e._v(" "),r("a-drawer",{attrs:{title:"菜单添加",width:400,visible:e.visible,wrapStyle:{height:"calc(100% - 108px)",overflow:"auto",paddingBottom:"108px"}},on:{close:e.onClose}},[r("a-form",{staticStyle:{"margin-top":"20px"},attrs:{form:e.form},on:{submit:e.handleSubmit}},[r("a-form-item",{attrs:{label:"资源类型","label-col":{span:5},"wrapper-col":{span:18}}},[r("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["type",{rules:[{required:!0,message:"必须选择资源类型"}]}],expression:"[\n        'type',\n        { rules: [{ required: true, message: '必须选择资源类型' }] },\n      ]"}],attrs:{placeholder:"请选择资源类型"}},[r("a-select-option",{attrs:{value:"m"}},[e._v("菜单")]),e._v(" "),r("a-select-option",{attrs:{value:"e"}},[e._v("页面元素")])],1)],1),e._v(" "),r("a-form-item",{attrs:{label:"父级菜单","label-col":{span:5},"wrapper-col":{span:18}}},[r("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["parent_id",{rules:[{required:!0,message:"必须选择父级菜单"}]}],expression:"['parent_id', { rules: [{ required: true, message: '必须选择父级菜单' }] },]"}],attrs:{placeholder:"请选择父级菜单",showSearch:"",filterOption:e.filterOption}},[r("a-select-option",{attrs:{value:"0"}},[e._v("无父级菜单")]),e._v(" "),e._l(e.menus,function(t){return r("a-select-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.title))])})],2)],1),e._v(" "),r("a-form-item",{attrs:{label:"资源名称","label-col":{span:5},"wrapper-col":{span:18}}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["title",{rules:[{required:!0,message:"资源名称必须填写"}]}],expression:"['title', { rules: [{ required: true, message: '资源名称必须填写' }] }]"}],attrs:{allowClear:"",placeholder:"请输入资源名称"}})],1),e._v(" "),r("a-form-item",{attrs:{label:"资源标识","label-col":{span:5},"wrapper-col":{span:18}}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["slug",{rules:[{required:!0,message:"资源标识必须填写"}]}],expression:"['slug', { rules: [{ required: true, message: '资源标识必须填写' }] }]"}],attrs:{allowClear:"",placeholder:"请输入资源标识"}})],1),e._v(" "),r("a-form-item",{attrs:{label:"视图路径","label-col":{span:5},"wrapper-col":{span:18}}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["path",{rules:[{required:!0,message:"视图路径必须填写"}]}],expression:"['path', { rules: [{ required: true, message: '视图路径必须填写' }] }]"}],attrs:{allowClear:"",placeholder:"请输入视图路径"}})],1),e._v(" "),r("a-form-item",{attrs:{label:"图标名称","label-col":{span:5},"wrapper-col":{span:18}}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["icon"],expression:"['icon']"}],attrs:{allowClear:"",placeholder:"请输入图标名称"}})],1),e._v(" "),r("a-form-item",{attrs:{label:"菜单排序","label-col":{span:5},"wrapper-col":{span:18}}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["order",{rules:[{required:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"必须为0-255数字"}]}],expression:"['order', { rules: [{ required: true, type: 'number',                    transform(value) {\n                    if(value){\n                      return Number(value);\n                    }\n                  }, message: '必须为0-255数字' }] }]"}],attrs:{allowClear:"",placeholder:"请输入菜单排序"}})],1),e._v(" "),r("a-form-item",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px 0px",background:"#fff",textAlign:"right",marginBottom:"0"},attrs:{"wrapper-col":{span:24}}},[r("a-row",[r("a-col",{style:{textAlign:"left"},attrs:{span:4,offset:13}},[r("a-button",{attrs:{size:"small"},on:{click:e.onClose}},[e._v("返回")])],1),e._v(" "),r("a-col",{style:{textAlign:"left"},attrs:{span:4}},[r("a-button",{style:{marginRight:"8px"},attrs:{size:"small",type:"primary","html-type":"submit"}},[e._v("提交")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]},l=r("VU/8")(s,o,!1,null,null,null);t.default=l.exports}});
//# sourceMappingURL=83.f95cdafd3248e8ef586b.js.map