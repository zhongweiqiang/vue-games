<template>
  <div>
    <a-dropdown>
      <a class="ant-dropdown-link" href="#">
        <a-avatar shape="square" icon="user" />
      </a>
      <a-menu slot="overlay" @click="onClick">
        <a-menu-item key="1">用户信息</a-menu-item>
        <a-menu-item key="2">信息修改</a-menu-item>
        <a-menu-item key="3">退出</a-menu-item>
      </a-menu>
    </a-dropdown>
    <user-detail ref="detail" :visible="visible" />
  </div>
</template>

<script>
import UserDetail from "@/components/layout/UserDetail";
export default {
  components: {
    UserDetail
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
            this.$refs.detail.showDrawer()
          break;
        case 2:
          break;
        case 3:
          break;

        default:
            // this.$refs.detail.showDrawer()
          break;
      }
    }
  }
};
</script>
