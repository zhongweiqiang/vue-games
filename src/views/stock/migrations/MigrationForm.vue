<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="凭证提供者" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-select
        showSearch
        placeholder="凭证提供者"
        optionFilterProp="children"
        :filterOption="filterOption"
        allowClear
        v-decorator="['user_afford', { rules: [{ required: true, message: '必须选择凭证提供者' }] }]"
      >
        <a-select-option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="凭证接收者" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-select
        showSearch
        placeholder="凭证接收者"
        optionFilterProp="children"
        :filterOption="filterOption"
        allowClear
        v-decorator="['user_receiver', { rules: [{ required: true, message: '必须选择凭证接收者' }] }]"
      >
        <a-select-option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 9 }">
      <a-button type="primary" html-type="submit" size="small">分配</a-button>
      <a-button :style="{marginLeft: '10px'}" @click="handleCancel" size="small">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { userSelect } from "@/api/user";
import { migration } from "@/api/migration";
export default {
  props: {
    text: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.getUserList("user");
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      users: [],
      max: 10000
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          migration(values).then(response => {
            console.log(response);
            this.form.resetFields();
            this.$emit("cancel");
            setTimeout(() => {
              this.$message.success(response.message);
            }, 1000);
          });
        }
      });
    },

    handleCancel() {
      this.form.resetFields();
      this.$emit("cancel");
    },

    getUserList(value) {
      userSelect({ user_type: value }).then(response => {
        this.users = response.data;
      });
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onChange(value) {
      console.log("changed", value);
    }
  }
};
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 10px;
}
.ant-input-number {
  margin-right: 10px;
  width: 100%;
}
</style>