<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-row>
      <a-col :span="19">
        <a-form-item label="支付密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
          <a-input-password
            v-decorator="['pay_pass', { rules: [{ required: true, message: 'Please input your note!' }] }]"

          />
        </a-form-item>
      </a-col>
      <a-col :span="4">
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-form-item>
      </a-col>
      <a-col :span="1" :style="{marginTop: '8px'}"><a-spin size="small" v-if="span" /></a-col>
    </a-row>
    
  </a-form>
</template>

<script>
import { son_to_user } from '@/api/dist'
export default {
    props: {
        id: {
            type: Number,
            default: null
        }
    },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      span: false
              
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
          values.son_id = this.id
        if (!err) {
          console.log("Received values of form: ", values);
          // 转移库存
          this.span = true
          son_to_user(values).then(response => {
              console.log(response)
              this.span = false
              this.$emit('dist')
              this.$message.success(response.message)
              this.form.resetFields()
          })
        }
      });
    }
  }
};
</script>