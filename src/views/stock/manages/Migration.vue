<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-row style="height: 24px;">
      <a-form-item>
        <a-select
          showSearch
          placeholder="选择账户类型"
          style="width: 160px;"
          @change="handleTypeChange"
          allowClear
          size="small"
          v-decorator="['user_type']"
        >
          <a-select-option value="son">子账户</a-select-option>
          <a-select-option value="user">主账户</a-select-option>
        </a-select>
      </a-form-item>
    </a-row>
    <a-row style="margin-top: 10px; height: 24px;">
      <a-form-item>
        <a-select
          showSearch
          placeholder="选择用户"
          optionFilterProp="children"
          style="width: 160px"
          :filterOption="filterOption"
          allowClear
          size="small"
          v-decorator="['user_id']"
        >
          <a-select-option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-row>
  </a-form>
</template>

<script>
import { userSelect } from "@/api/user";
import { distribution } from '@/api/migration'
export default {
    props: {
        id: {
            type: Array,
            default: null
        }
    },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      users: []
    };
  },
  methods: {
    handleSubmit(e) {
        const self = this
    //   e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          console.log('ids', self.id)
          values.id = self.id
          distribution(values).then(response => {
            //   console.log(response)
              this.$emit('dist')
              this.$message.success(response.message)
          })

        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    },

    handleTypeChange(value) {
      this.form.setFieldsValue({ user_id: undefined });
      this.getUserList(value);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getUserList(value) {
      userSelect({ user_type: value }).then(response => {
        this.users = response.data;
      });
    }
  }
};
</script>