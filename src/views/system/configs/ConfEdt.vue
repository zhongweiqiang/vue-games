<template>
  <div>
    <a-button size="small" type="primary" :style="{marginTop: '4px'}" @click="showModal">
      <slot>
        <a-icon type="edit" />
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
            :disabled="true"
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
import { edit, detail } from "@/api/config";
import { resolve } from "q";
export default {
  props: {
    onEdit: {
      type: Function,
      default: null
    },
    id: {
      type: Number,
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
      this.getDetailConfig();
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.form.resetFields();
    },

    getDetailConfig() {
      new Promise(resolve => {
        detail({ id: this.id }).then(response => {
          delete response.data.id;
          this.visible = true;
          resolve(response)
        });
      }).then(response => {
          this.form.setFieldsValue(response.data);
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true;
          values.id = this.id;
          edit(values).then(response => {
            console.log(response);
            this.onEdit();
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
