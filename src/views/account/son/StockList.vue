<template>
  <div style="display: inline;">
    <a-button type="primary" size="small" @click="showModal">库存</a-button>
    <a-modal
      title="子账户库存"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :footer="null"
      width="70%"
    >
      <table-list :id="id" />
    </a-modal>
  </div>
</template>
<script>
import TableList from "./TableList";
export default {
  components: { TableList },
  props:{
      id: {
          type: Number,
          default: null
      }
  },
  data() {
    return {
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    }
  }
};
</script>
