webpackJsonp([1],{"4er+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={props:{title:{type:String,default:null},content:{type:String,default:null}}},r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticStyle:{"font-size":"14px","line-height":"22px","margin-bottom":"7px",color:"rgba(0, 0, 0, 0.65)"}},[t("a-row",[t("a-col",{staticStyle:{"text-align":"right"},attrs:{span:6}},[t("p",{staticStyle:{"margin-right":"8px",display:"inline-block",color:"rgba(0, 0, 0, 0.85)"}},[this._v(this._s(this.title))])]),this._v(" "),t("a-col",{attrs:{span:17,offset:1}},[this._v("\n        "+this._s(this.content)+"\n      ")])],1)],1)},staticRenderFns:[]};var o=a("VU/8")(s,r,!1,function(e){a("PjAd")},null,null).exports,n=a("vMJZ"),i={components:{descriptionItem:o},data:function(){return{visible:!1,pStyle:{fontSize:"16px",color:"rgba(0,0,0,0.85)",lineHeight:"24px",display:"block",marginBottom:"16px",textAlign:"center"},pStyle2:{marginBottom:"24px"},info:{userinfo:{},role:{}}}},created:function(){this.userinfo()},methods:{showDrawer:function(){this.visible=!0},onClose:function(){this.visible=!1},userinfo:function(){var e=this;Object(n.g)().then(function(t){console.log(t),e.info=t.data,e.$store.dispatch("user/info",t.data)})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-drawer",{attrs:{width:"340",placement:"right",closable:!1,visible:e.visible},on:{close:e.onClose}},[a("p",{style:[e.pStyle,e.pStyle2]},[e._v("用户详情")]),e._v(" "),a("a-row",[a("a-col",[a("description-item",{attrs:{title:"用户名",content:e.info.name}})],1),e._v(" "),a("a-col",[e.info.userinfo?a("description-item",{attrs:{title:"用户昵称",content:e.info.userinfo.nickname}}):e._e()],1)],1),e._v(" "),a("a-row",[a("a-col",[a("description-item",{attrs:{title:"角色",content:e.info.role.name}})],1),e._v(" "),a("a-col",[a("description-item",{attrs:{title:"登陆时间",content:e.info.last_login_time}})],1)],1),e._v(" "),a("a-row",[a("a-col",[a("description-item",{attrs:{title:"登陆ip",content:e.info.last_login_ip}})],1),e._v(" "),a("a-col",[e.info.userinfo?a("description-item",{attrs:{title:"收费模式",content:e.info.userinfo.charge_status}}):e._e()],1)],1),e._v(" "),a("a-row",[a("a-col",[e.info.userinfo?a("description-item",{attrs:{title:"账户余额",content:e.info.userinfo.money}}):e._e()],1),e._v(" "),a("a-col",[e.info.userinfo?a("description-item",{attrs:{title:"冻结金额",content:e.info.userinfo.fro_money}}):e._e()],1)],1),e._v(" "),a("a-divider")],1)],1)},staticRenderFns:[]},c=a("VU/8")(i,l,!1,null,null,null).exports,u={data:function(){return{visible:!1,formLayout:"horizontal",form:this.$form.createForm(this,{name:"coordinated"})}},watch:{visible:function(e,t){0==e&&this.form.resetFields()}},methods:{showModal:function(){this.visible=!0},handleSubmit:function(e){var t=this;e.preventDefault(),this.form.validateFields(function(e,a){if(!e){if(a.new_password!=a.re_new_password)return void t.$message.error("两次密码不一致");console.log("Received values of form: ",a),Object(n.q)(a).then(function(e){console.log(e),200==e.code&&(t.visible=!1),t.$message.success(e.message)})}})}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-modal",{attrs:{title:"登录密码修改",footer:null},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("a-form",{attrs:{form:e.form},on:{submit:e.handleSubmit}},[a("a-form-item",{attrs:{label:"原始密码","label-col":{span:4},"wrapper-col":{span:18}}},[a("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["old_password",{rules:[{required:!0,message:"请输入原始密码"}]}],expression:"['old_password', { rules: [{ required: true, message: '请输入原始密码' }] }]"}],attrs:{placeholder:"请输入密码"}})],1),e._v(" "),a("a-form-item",{attrs:{label:"新密码","label-col":{span:4},"wrapper-col":{span:18}}},[a("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["new_password",{rules:[{required:!0,message:"请输入新密码"}]}],expression:"['new_password', { rules: [{ required: true, message: '请输入新密码' }] }]"}],attrs:{placeholder:"请输入密码"}})],1),e._v(" "),a("a-form-item",{attrs:{label:"确认密码","label-col":{span:4},"wrapper-col":{span:18}}},[a("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["re_new_password",{rules:[{required:!0,message:"请确认密码"}]}],expression:"['re_new_password', { rules: [{ required: true, message: '请确认密码' }] }]"}],attrs:{placeholder:"确认密码"}})],1),e._v(" "),a("a-form-item",{attrs:{"wrapper-col":{span:12,offset:10}}},[a("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v("修改")])],1)],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(u,d,!1,function(e){a("FgXo")},"data-v-a7fae21e",null).exports,p={data:function(){return{visible:!1,formLayout:"horizontal",form:this.$form.createForm(this,{name:"coordinated"})}},watch:{visible:function(e,t){0==e&&this.form.resetFields()}},methods:{showModal:function(){this.visible=!0},handleSubmit:function(e){var t=this;e.preventDefault(),this.form.validateFields(function(e,a){if(!e){if(a.new_password!=a.re_new_password)return void t.$message.error("两次密码不一致");console.log("Received values of form: ",a),Object(n.j)(a).then(function(e){console.log(e),200==e.code&&(t.visible=!1),t.$message.success(e.message)})}})}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-modal",{attrs:{title:"支付密码修改",footer:null},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("a-form",{attrs:{form:e.form},on:{submit:e.handleSubmit}},[a("a-form-item",{attrs:{label:"原始密码","label-col":{span:4},"wrapper-col":{span:18}}},[a("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["old_password",{rules:[{required:!0,message:"请输入原始密码"}]}],expression:"['old_password', { rules: [{ required: true, message: '请输入原始密码' }] }]"}],attrs:{placeholder:"请输入密码"}})],1),e._v(" "),a("a-form-item",{attrs:{label:"新密码","label-col":{span:4},"wrapper-col":{span:18}}},[a("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["new_password",{rules:[{required:!0,message:"请输入新密码"}]}],expression:"['new_password', { rules: [{ required: true, message: '请输入新密码' }] }]"}],attrs:{placeholder:"请输入密码"}})],1),e._v(" "),a("a-form-item",{attrs:{label:"确认密码","label-col":{span:4},"wrapper-col":{span:18}}},[a("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["re_new_password",{rules:[{required:!0,message:"请确认密码"}]}],expression:"['re_new_password', { rules: [{ required: true, message: '请确认密码' }] }]"}],attrs:{placeholder:"确认密码"}})],1),e._v(" "),a("a-form-item",{attrs:{"wrapper-col":{span:12,offset:10}}},[a("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v("修改")])],1)],1)],1)],1)},staticRenderFns:[]};var v=a("VU/8")(p,f,!1,function(e){a("wbvF")},"data-v-4d3a245f",null).exports,h=a("MArX"),_={props:{nickname:{type:String,default:null}},data:function(){return{visible:!1,formLayout:"horizontal",form:this.$form.createForm(this,{name:"coordinated"})}},watch:{visible:function(e,t){0==e&&this.form.resetFields()}},methods:{showModal:function(){var e=this;this.visible=!0,setTimeout(function(){e.form.setFieldsValue({old_nickname:e.nickname})},100)},handleSubmit:function(e){var t=this;e.preventDefault(),this.form.validateFields(function(e,a){e||(console.log("Received values of form: ",a),Object(h.f)(a).then(function(e){console.log(e),t.visible=!1,t.$message.success(e.message)}))})}}},b={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-modal",{attrs:{title:"昵称修改",footer:null,width:"35%"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("a-form",{attrs:{form:e.form},on:{submit:e.handleSubmit}},[a("a-form-item",{attrs:{label:"原始昵称","label-col":{span:4},"wrapper-col":{span:18}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["old_nickname"],expression:"['old_nickname']"}],attrs:{disabled:""}})],1),e._v(" "),a("a-form-item",{attrs:{label:"新昵称","label-col":{span:4},"wrapper-col":{span:18}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["new_nickname",{rules:[{required:!0,message:"请输入新昵称"}]}],expression:"['new_nickname', { rules: [{ required: true, message: '请输入新昵称' }] }]"}],attrs:{placeholder:"请输入新昵称"}})],1),e._v(" "),a("a-form-item",{attrs:{"wrapper-col":{span:12,offset:10}}},[a("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v("修改")])],1)],1)],1)],1)},staticRenderFns:[]};var w={components:{UserDetail:c,UserEdit:m,PayEdit:v,NickModal:a("VU/8")(_,b,!1,function(e){a("sNSM")},"data-v-4cd54d2c",null).exports},data:function(){return{visible:!1,nickname:""}},methods:{onClick:function(e){var t=e.key;switch(console.log("Click on item "+t),parseInt(t)){case 1:this.$refs.detail.showDrawer();break;case 2:this.$refs.edit.showModal();break;case 3:this.$refs.pay.showModal();break;case 4:this.logout();break;case 5:this.judge_status()}},logout:function(){var e=this;this.$store.dispatch("user/logout").then(function(){e.$router.push({name:"Login"})})},judge_status:function(){var e=this;console.log("nickname"),Object(h.d)().then(function(t){if(e.nickname=t.data.nickname,0==t.data.nickname_change_times)e.$refs.nick.showModal();else{var a=e;e.$confirm({title:"是否修改昵称?",content:"昵称只能修改一次, 再次修改成功后扣除"+t.data.money+"元",onOk:function(){console.log("修改"),a.$refs.nick.showModal()},onCancel:function(){},okText:"修改",cancelText:"取消"})}})}}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-dropdown",[a("a",{staticClass:"ant-dropdown-link",attrs:{href:"#"}},[a("a-avatar",{attrs:{shape:"square",icon:"user"}})],1),e._v(" "),a("a-menu",{attrs:{slot:"overlay"},on:{click:e.onClick},slot:"overlay"},[e.hasPermission("user.info")?a("a-menu-item",{key:"1"},[e._v("用户信息")]):e._e(),e._v(" "),a("a-menu-item",{key:"2"},[e._v("密码修改")]),e._v(" "),e.hasPermission("user.info.edit")?a("a-menu-item",{key:"3"},[e._v("支付修改")]):e._e(),e._v(" "),e.hasPermission("user.info.edit")?a("a-menu-item",{key:"5"},[e._v("昵称修改")]):e._e(),e._v(" "),a("a-menu-item",{key:"4"},[e._v("退出")])],1)],1),e._v(" "),a("user-detail",{ref:"detail",attrs:{visible:e.visible}}),e._v(" "),a("user-edit",{ref:"edit"}),e._v(" "),a("pay-edit",{ref:"pay"}),e._v(" "),a("nick-modal",{ref:"nick",attrs:{nickname:e.nickname}})],1)},staticRenderFns:[]},y=a("VU/8")(w,g,!1,null,null,null).exports,k=a("bUp0"),x={components:{UserInfo:y},data:function(){return{collapsed:!1,menus:[]}},created:function(){console.log("this is in layout"),this.getMenu(),this.getElement()},mounted:function(){},methods:{home:function(){this.$router.push({name:"Dashboard"})},getMenu:function(){var e=this;Object(k.h)().then(function(t){e.menus=t.data})},getElement:function(){this.$store.dispatch("user/getElement")}}},$={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-layout",{staticStyle:{"z-index":"999"},attrs:{id:"components-layout-demo-custom-trigger"}},[a("a-layout-sider",{staticStyle:{overflow:"auto","z-index":"999"},attrs:{trigger:null,collapsible:""},model:{value:e.collapsed,callback:function(t){e.collapsed=t},expression:"collapsed"}},[a("div",{staticClass:"logo"}),e._v(" "),a("a-menu",{attrs:{mode:"inline",theme:"dark",inlineCollapsed:e.collapsed}},[a("a-menu-item",{key:"1"},[a("router-link",{attrs:{to:"/dashboard"}},[a("a-icon",{attrs:{type:"home"}}),e._v(" "),a("span",[e._v("首页")])],1)],1),e._v(" "),e._l(e.menus,function(t){return a("a-sub-menu",{key:t.path},[a("span",{attrs:{slot:"title"},slot:"title"},[a("a-icon",{attrs:{type:t.icon}}),e._v(" "),a("span",[e._v(e._s(t.title))])],1),e._v(" "),e._l(t.children,function(t){return a("a-menu-item",{key:t.path},[a("router-link",{attrs:{to:t.path}},[e._v(e._s(t.title))])],1)})],2)})],2)],1),e._v(" "),a("a-layout",[a("div",{staticStyle:{background:"#eee",position:"fixed","z-index":"999",width:"100%",height:"100px","box-shadow":"0 0 20px #bbb inset"}},[a("a-layout-header",{staticStyle:{background:"#fff",padding:"0","z-index":"999"}},[a("a-row",[a("a-col",{attrs:{span:2}},[a("a-icon",{staticClass:"trigger",attrs:{type:e.collapsed?"menu-unfold":"menu-fold"},on:{click:function(){return e.collapsed=!e.collapsed}}})],1),e._v(" "),a("a-col",{attrs:{span:22}},[a("a-row",[a("a-col",{attrs:{span:19}},[e._v("\n                fdsf\n              ")]),e._v(" "),a("a-col",{attrs:{span:4}},[a("user-info")],1)],1)],1)],1)],1),e._v(" "),a("div",{staticStyle:{padding:"6px 0px 6px 24px",background:"#eee"}},[a("a-breadcrumb",[a("a-breadcrumb-item",{attrs:{href:""}},[a("router-link",{attrs:{to:"/"}},[a("a-icon",{attrs:{type:"home"}}),e._v(" "),a("span",[e._v("首页")])],1)],1),e._v(" "),this.$route.meta.title?a("a-breadcrumb-item",[e._v(e._s(this.$route.meta.title))]):e._e()],1)],1)],1),e._v(" "),a("a-layout-content",{style:{margin:"0px 16px 24px 16px",padding:"115px 10px 24px 24px",background:"#fff",minHeight:"280px"}},[a("router-view")],1)],1)],1)},staticRenderFns:[]};var S=a("VU/8")(x,$,!1,function(e){a("talL")},null,null);t.default=S.exports},FgXo:function(e,t){},PjAd:function(e,t){},sNSM:function(e,t){},talL:function(e,t){},wbvF:function(e,t){}});
//# sourceMappingURL=1.249ace2cbea1143a638d.js.map