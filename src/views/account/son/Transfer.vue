<template>
  <div style="display: inline">
    <a-button size="small" :disabled="disabled" type="primary" @click="showConfirm">转主</a-button>
    <!-- <confirm-pass :visible="visible" /> -->

    <a-modal
      title="请输入支付密码"
      v-model="visible"
      @ok="handleOk"
      :footer="null"
    >
      <confirm-form @dist="onDist" :id="id" />
    </a-modal>
  </div>
</template>
<script>
import ConfirmForm from "./ConfirmForm";
import { son_to_user } from '@/api/dist'
export default {
  components: { ConfirmForm },
  props: {
    id: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showConfirm() {
      const self = this;
      this.$confirm({
        title: "一键转移库存至主账户?",
        content: "转移后可再次从主账户分配至子账户",
        cancelText: "取消",
        okText: "转移",
        onOk() {

          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          // }).catch(() => console.log("Oops errors!"));
          
          son_to_user({ son_id: self.id }).then(response => {
              console.log(response)

              self.$emit('dist')
              self.$message.success(response.message)
              self.form.resetFields()
          })
          // self.visible = true;
        },
        onCancel() {}
      });
    },

    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    onDist() {
      this.visible = false;
      this.$emit("dist");
    },

  }
};
</script>
