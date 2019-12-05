<template>
  <div style="z-index:999;">
    <a-form :form="form" @submit="handleSubmit" layout="inline">
      <a-row style="height: 60px; margin-left: 10px;">
        <a-col :span="24">
          <a-row>
            <!-- <a-col :span="5">
              <a-form-item>
                <a-select
                  showSearch
                  placeholder="选择账户类型"
                  optionFilterProp="children"
                  style="width: 160px"
                  @change="handleTypeChange"
                  allowClear
                  size="small"
                  v-decorator="['user_type']"
                >
                  <a-select-option value="user">主账户</a-select-option>
                  <a-select-option value="son">子账户</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>-->

            <a-col :span="5" v-if="hasPermission('trans.user')">
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
                  <a-select-option
                    v-for="user in users"
                    :value="user.id"
                    :key="user.id"
                  >{{ user.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="5">
              <a-form-item>
                <a-select
                  showSearch
                  placeholder="选择交易类型"
                  style="width: 160px"
                  allowClear
                  size="small"
                  v-decorator="['status']"
                >
                  <a-select-option value="1">出售</a-select-option>
                  <a-select-option value="2">求购</a-select-option>
                  <a-select-option value="3">供货</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <start-time v-decorator="['start_time']" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <end-time v-decorator="['end_time']" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item>
                <a-button size="small" type="primary" html-type="submit">搜索</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { index } from "@/api/log";
import { userSelect } from "@/api/user";
import StartTime from "./StartTime";
import EndTime from "./EndTime";
export default {
  components: {
    StartTime,
    EndTime
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      users: []
    };
  },
  created() {
    this.getUserList("user");
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$emit("search", values);
        }
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
    },
    reset() {
      this.form.resetFields();
    }
  }
};
</script>