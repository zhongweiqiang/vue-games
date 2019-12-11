<template>
  <div :style="{ display: 'inline' }">
    <a-button size="small" type="primary" :style="{marginTop: '4px'}" @click="showModal">
      <slot>
        <a-icon type="edit" />
      </slot>
    </a-button>
    <a-modal
      title="游戏修改"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
      width="35%"
      style="min-width: 450px;"
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
        <a-form-item :wrapper-col="{ span: 8, offset: 18 }">
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
import { detail, edit } from "@/api/game";
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
  created() {},
  methods: {
    showModal() {
      this.getGameDetail()
    },
    handleCancel(e) {
      this.visible = false;
      this.form.resetFields();
    },

    getGameDetail() {
      new Promise(resolve => {
        detail({ id: this.id }).then(response => {
          this.visible = true;
          resolve(response);
        });
      }).then(response => {
        this.form.setFieldsValue(response.data);
      });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log(values);
          this.confirmLoading = true;
          values.id = this.id
          edit(values).then(response => {
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
