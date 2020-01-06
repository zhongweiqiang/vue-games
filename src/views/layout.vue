<template>
  <a-layout id="components-layout-demo-custom-trigger" style="z-index: 999;">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      style="overflow: auto; z-index: 999;"
    >
      <div class="logo" />
      <!-- 这里是sidebar的log部分 -->
      <a-menu mode="inline" theme="dark" :inlineCollapsed="collapsed">
        <a-menu-item key="1">
          <router-link to="/dashboard">
            <a-icon type="home" />
            <span>首页</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu v-for="menu in menus" :key="menu.path">
          <span slot="title">
            <a-icon :type="menu.icon" />
            <span>{{ menu.title }}</span>
          </span>
          <a-menu-item v-for="item in menu.children" :key="item.path">
            <router-link :to="item.path">{{item.title}}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <div
        style="background: #eee; position: fixed; z-index: 999; width: 100%; height: 100px;box-shadow:0 0 20px #bbb inset"
      >
        <a-layout-header style="background: #fff; padding: 0;z-index: 999;">
          <a-row>
            <a-col :span="2">
              <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="()=> collapsed = !collapsed"
              />
            </a-col>
            <a-col :span="22">
              <a-row>
                <a-col :span="10"></a-col>
                <a-col :span="3">
                  <div style="display: inline-block; color: purple;">
                    <span color="red" v-if="info.role_id != '1'">账户余额：{{ info.userinfo.money }}</span>
                  </div>
                </a-col>
                <a-col :span="3">
                  <div style="display: inline-block; color: red; font-size: 13px;">
                    到期时间：
                    <span v-if="info.role_id == '1'">永不过期</span>
                    <span
                      v-else-if="info.userinfo.charge_status=='月租收费'"
                    >{{ info.userinfo.expire_time }}</span>
                    <span v-else>{{ info.userinfo.charge_status }}</span>
                  </div>
                </a-col>
                <a-col :span="3">
                  <div class="ddd" @click="member">
                    <start-member />
                  </div>

                </a-col>
                <a-col :span="1">
                  <user-info />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-layout-header>

        <div style="padding: 6px 0px 6px 24px; background: #eee;">
          <a-breadcrumb>
            <a-breadcrumb-item href>
              <router-link to="/">
                <a-icon type="home" />
                <span>首页</span>
              </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.meta.title">{{ this.$route.meta.title }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
      </div>

      <a-layout-content
        :style="{ margin: '0px 16px 24px 16px', padding: '115px 10px 24px 24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
// import menus from "./menu";
import UserInfo from "@/components/layout/UserInfo";
import StartMember from '@/components/layout/StartMember';

import { userMenu } from "@/api/menu";
import { info } from "@/api/user";

export default {
  components: {
    UserInfo,
    StartMember
  },
  data() {
    return {
      collapsed: false,
      menus: [],
      info: {
        userinfo: {
          charge_status: ""
        }
      }
    };
  },
  created() {
    console.log("this is in layout");
    this.getMenu();
    this.getElement();
    this.getPageSize();
    // console.log(menus);
  },
  mounted() {
    this.getInfo();
  },
  methods: {


    member(){
      console.log('member')
    },
    getInfo() {
      // if (this.info.length) {
      //   return;
      // }

      // setTimeout(() => {
      //   this.info = this.$store.getters.info;
      //   this.getInfo();
      // }, 1000);

      info().then(response => {
        this.info = response.data;
      });
    },
    home() {
      // console.log("ddd");
      this.$router.push({ name: "Dashboard" });
    },
    getMenu() {
      userMenu().then(response => {
        // console.log(response);
        this.menus = response.data;
      });
    },
    getElement() {
      this.$store.dispatch("user/getElement");
    },
    getPageSize() {
      this.$store.dispatch("user/setPageSize");
    }
  }
};
</script>
<style>
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-menu-inline .ant-menu-item:not(:last-child) {
  margin: 0px;
}


</style>
