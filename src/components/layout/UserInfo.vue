<template>
  <div style="display: inline-block;">
    <a-dropdown>
      <a class="ant-dropdown-link" href="#">
        <a-avatar shape="square" icon="user" />
      </a>
      <a-menu slot="overlay" @click="onClick">
        <a-menu-item key="1" v-if="hasPermission('user.info')">用户信息</a-menu-item>
        <a-menu-item key="2">密码修改</a-menu-item>
        <a-menu-item key="3" v-if="hasPermission('user.info.edit')">支付修改</a-menu-item>
        <a-menu-item key="5" v-if="hasPermission('user.info.edit')">昵称修改</a-menu-item>
        <a-menu-item key="4">退出</a-menu-item>
      </a-menu>
    </a-dropdown>
    <user-detail ref="detail" :visible="visible" />
    <user-edit ref="edit" />
    <pay-edit ref="pay" />
    <nick-modal ref="nick" :nickname="nickname" />
  </div>
</template>

<script>
import UserDetail from "@/components/layout/UserDetail";
import UserEdit from "@/components/layout/UserEdit";
import PayEdit from "@/components/layout/PayEdit";
import NickModal from "./NickModal";
import { judge_status } from "@/api/userinfo";
export default {
  components: {
    UserDetail,
    UserEdit,
    PayEdit,
    NickModal
  },
  data() {
    return {
      visible: false,
      nickname: ""
    };
  },
  methods: {
    onClick({ key }) {
      console.log(`Click on item ${key}`);
      switch (parseInt(key)) {
        case 1:
          this.$refs.detail.showDrawer();
          break;
        case 2:
          this.$refs.edit.showModal();
          break;
        case 3:
          this.$refs.pay.showModal();
          break;
        case 4:
          this.logout();
          break;
        case 5:
          this.judge_status();
          break;

        default:
          // this.$refs.detail.showDrawer()

          break;
      }
    },

    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push({
          name: "Login"
        });
      });
    },
    judge_status() {
      console.log("nickname");
      judge_status().then(response => {
        this.nickname = response.data.nickname;
        if (response.data.nickname_change_times == 0) {
          // 还没有更改过，显示修改modal
          this.$refs.nick.showModal();
        } else {
          const self = this;
          this.$confirm({
            title: "是否修改昵称?",
            content:
              "昵称只能修改一次, 再次修改成功后扣除" + response.data.money + "元",
            onOk() {
              console.log("修改");
              self.$refs.nick.showModal();
            },
            onCancel() {},
            okText: "修改",
            cancelText: "取消"
          });
        }
      });
    }
  }
};
</script>
