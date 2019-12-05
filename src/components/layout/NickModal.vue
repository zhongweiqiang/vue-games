<template>
  <div>
    <a-modal title="昵称修改" v-model="visible" :footer="null" width="35%">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="原始昵称" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input v-decorator="['old_nickname']" disabled />
        </a-form-item>

        <a-form-item label="新昵称" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input
            placeholder="请输入新昵称"
            v-decorator="['new_nickname', { rules: [{ required: true, message: '请输入新昵称' }] }]"
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 12, offset: 10 }">
          <a-button type="primary" html-type="submit">修改</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { reset_nickname } from "@/api/userinfo";
export default {
  props: {
    nickname: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  watch: {
    visible: function(newVal, oldVal) {
      if (newVal == false) {
        this.form.resetFields();
      }
    }
  },
  methods: {
    showModal() {
      this.visible = true;
      setTimeout(() => {
        this.form.setFieldsValue({
          old_nickname: this.nickname
        });
      }, 100);
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          reset_nickname(values).then(response => {
            console.log(response);
              this.visible = false;

            this.$message.success(response.message);
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.ant-form-item {
  margin-bottom: 10px;
}
</style>
