<template>
  <div style="display: inline">
    <a-button size="small" type="primary" @click="showConfirm">转主</a-button>
  </div>
</template>
<script>
export default {
  methods: {
    showConfirm() {
      this.$confirm({
        title: "一键转移库存至主账户?",
        content: "转移后可再次从主账户分配至子账户",
        cancelText: "取消",
        okText: "转移",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
    }
  }
};
</script>
