<template>
  <div style="display: inline;">
    <a-button type="primary" size="small" @click="showModal">查看</a-button>
    <a-modal title="公告详情" v-model="visible" @ok="handleOk" okText="确定" cancelText="取消">
      <div v-html="content"></div>
    </a-modal>
  </div>
</template>
<script>
  export default {
      props: {
          content: {
              type: String,
              default: null
          }
      },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      showModal() {
        this.visible = true;
        console.log(this.content)
      },
      handleOk(e) {
        console.log(e);
        this.visible = false;
      },
    },
  };
</script>
