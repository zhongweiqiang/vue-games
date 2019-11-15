<template>
  <div>
    <a-button size="small" type="primary" :style="{marginTop: '4px'}" @click="showModal">
      <slot>
        <a-icon type="plus" />子账户
      </slot>
    </a-button>
    <a-modal
      title="子账户添加"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
      :width="450"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="账户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '账户名必须填写' }] }]"
            placeholder="请输入账户名"
          />
        </a-form-item>
        <a-form-item label="账户密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input-password
            v-decorator="['password', { rules: [{ required: true, message: '账户密码必须填写' }] }]"
            placeholder="请输入账户密码"
          />
        </a-form-item>
        <a-form-item label="账户类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            v-decorator="['type', {
                  rules: [{ required: true, message: '请选择账户类型' }]
                }]"
            placeholder="请选择账户类型"
          >
            <a-select-option value="1">入库</a-select-option>
            <a-select-option value="2">出库</a-select-option>
            <a-select-option value="3">入库出库</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 8, offset: 16 }">
          <a-row>
            <a-col :span="12" :style="{ textAlign: 'left' }">
              <a-button size="small" @click="handleCancel">返回</a-button>
            </a-col>
            <a-col :span="12" :style="{ textAlign: 'left' }">
              <a-button size="small" type="primary" html-type="submit">提交</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>

import { add } from "@/api/son";
export default {
  props: {
    okText: {
      type: String,
      default: "提交"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    onAdd: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      roles: []
    };
  },
  created() {
    // this.getRoleList();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.form.resetFields();
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
            console.log('values',  values)
          this.confirmLoading = true;
          add(values).then(response => {
              console.log(response)
            this.onAdd();
            this.$message.success(response.message);
            this.visible = false;
            this.confirmLoading = false;
            this.form.resetFields();
          });
        }
      });
    }
  }
};
</script>
