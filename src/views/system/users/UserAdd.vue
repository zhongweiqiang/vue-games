<template>
  <div>
    <a-button size="small" type="primary" :style="{marginTop: '4px'}" @click="showModal">
      <slot>
        <a-icon type="plus" />添加
      </slot>
    </a-button>
    <a-modal title="用户添加" :visible="visible" :confirmLoading="confirmLoading" :footer="null" @cancel="handleCancel">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="用户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '用户名必须填写' }] }]"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item label="角色" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            v-decorator="[
          'role_id',
          { rules: [{ required: true, message: '必须选择角色' }] },
        ]"
            placeholder="请选择角色"
          >
            <a-select-option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</a-select-option>
          </a-select>
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
import { index } from "@/api/role";
import { add } from "@/api/user";
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
    this.getRoleList();
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
    getRoleList() {
      index().then(response => {
        console.log(response);
        this.roles = response.data;
      });
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
