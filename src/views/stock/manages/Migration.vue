<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-row style="height: 24px;">
      <a-form-item>
        <a-select
          showSearch
          placeholder="选择账户类型"
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
          if(values.user_type == undefined){
            this.$message.warning('请选择账户类型')
            return
          } else if(values.user_id == undefined){
            this.$message.warning('请选择用户')
            return
          }
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

<style scoped>
.ant-form-item{
  width: 90%;
  margin-bottom: 0px;
}
</style>