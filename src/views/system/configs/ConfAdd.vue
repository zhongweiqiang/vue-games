<template>
  <div>
    <a-button size="small" type="primary" :style="{marginTop: '4px'}" @click="showModal">
      <slot>
        <a-icon type="plus" />添加
      </slot>
    </a-button>
    <a-modal
      title="配置添加"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
      :width="400"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="键名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['key', { rules: [{ required: true, message: '键名必须填写' }] }]"
            placeholder="请输入键名"
          />
        </a-form-item>
        <a-form-item label="键值" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['value', { rules: [{ required: true, message: '键值必须填写' }] }]"
            placeholder="请输入键值"
          />
        </a-form-item>
        <a-form-item label="配置描述" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-textarea
            v-decorator="['description', { rules: [{ required: true, message: '描述必须填写' }] }]"
            placeholder="请输入键值描述"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 8, offset: 15 }">
          <a-row>
            <a-col :span="12" :style="{ textAlign: 'left' }">
              <a-button size="small" @click="handleCancel">返回</a-button>
            </a-col>
            <a-col :span="8" :style="{ textAlign: 'left' }">
              <a-button size="small" type="primary" html-type="submit">提交</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { add } from "@/api/config";
export default {
  props: {
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
          this.confirmLoading = true;
          add(values).then(response => {
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
