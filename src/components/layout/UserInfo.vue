<template>
  <div>
    <a-dropdown>
      <a class="ant-dropdown-link" href="#">
        <a-avatar shape="square" icon="user" />
      </a>
      <a-menu slot="overlay" @click="onClick">
        <a-menu-item key="1" v-if="hasPermission('user.info')">用户信息</a-menu-item>
        <a-menu-item key="2">密码修改</a-menu-item>
        <a-menu-item key="3" v-if="hasPermission('user.info.edit')">支付修改</a-menu-item>
        <a-menu-item key="4">退出</a-menu-item>
      </a-menu>
    </a-dropdown>
    <user-detail ref="detail" :visible="visible" />
    <user-edit ref="edit" />
    <pay-edit ref="pay" />
  </div>
</template>

<script>
import UserDetail from "@/components/layout/UserDetail";
import UserEdit from "@/components/layout/UserEdit";
import PayEdit from '@/components/layout/PayEdit'
export default {
  components: {
    UserDetail,
    UserEdit,
    PayEdit
  },
  data() {
    return {
      visible: false
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
    }
  }
};
</script>
