<template>
  <div>
    <a-modal title="登录密码修改" v-model="visible" :footer="null">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="原始密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input-password
            placeholder="请输入密码"
            v-decorator="['old_password', { rules: [{ required: true, message: '请输入原始密码' }] }]"
          />
        </a-form-item>

        <a-form-item label="新密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input-password
            placeholder="请输入密码"
            v-decorator="['new_password', { rules: [{ required: true, message: '请输入新密码' }] }]"
          />
        </a-form-item>
        <a-form-item label="确认密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input-password
            placeholder="确认密码"
            v-decorator="['re_new_password', { rules: [{ required: true, message: '请确认密码' }] }]"
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
import { user_reset_password } from "@/api/user";
export default {
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
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.new_password != values.re_new_password) {
            this.$message.error("两次密码不一致");
            return;
          }
          console.log("Received values of form: ", values);
          user_reset_password(values).then(response => {
            console.log(response);
            if (response.code == 200) {
              this.visible = false;
            }
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
