<template>
  <div>
    <a-button size="small" type="primary" @click="showModal">
      <slot>
        <a-icon type="plus" />游戏
      </slot>
    </a-button>
    <a-modal
      title="游戏添加"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
      width="35%"
      style="min-width: 400px;"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="游戏名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '游戏名称必须填写' }] }]"
            placeholder="请输入游戏名称"
          />
        </a-form-item>
        <a-form-item label="游戏包名" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['productIdentifier', { rules: [{ required: true, message: '游戏包名称必须填写' }] }]"
            placeholder="请输入游戏包名"
          />
        </a-form-item>
        <a-form-item label="游戏描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-textarea
            v-decorator="['description', { rules: [{ required: true, message: '游戏描述称必须填写' }] }]"
            placeholder="请输入游戏描述"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 10, offset: 14 }">
          <a-row>
            <a-col :span="8" :style="{ textAlign: 'left' }">
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
import { add } from "@/api/game";
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
    };
  },
  created() {},
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel(e) {
      this.visible = false;
      this.form.resetFields();
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
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
