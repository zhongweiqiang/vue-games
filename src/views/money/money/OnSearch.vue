<template>
  <div>
    <a-row>
      <a-col :span="3" v-if="hasPermission('money.add')" style="margin-top: 10px;">
        <money-add :on-add="onAdd" />
      </a-col>
      <a-col :span="20">
        <a-form :form="form" @submit="handleSubmit">
          <a-row style="height: 30px; margin-left: 10px;">
            <a-col :span="22">
              <a-col
                v-if="hasPermission('money.userlist')"
                :span="6"
                :xs="20"
                :sm="18"
                :md="12"
                :lg="8"
                :xl="6"
                style="margin-top: 10px;"
              >
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
                    <a-select-option
                      v-for="user in users"
                      :value="user.id"
                      :key="user.id"
                    >{{ user.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col
                v-if="hasPermission('money.real_name')"
                :span="6"
                :xs="20"
                :sm="18"
                :md="12"
                :lg="8"
                :xl="6"
                style="margin-top: 10px;"
              >
                <a-form-item>
                  <a-input v-decorator="['real_name']" placeholder="真实姓名" size="small" allowClear />
                </a-form-item>
              </a-col>
              <a-col :span="6" :xs="20" :sm="18" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
                <a-form-item>
                  <start-time v-decorator="['start_time']" />
                </a-form-item>
              </a-col>
              <a-col :span="6" :xs="20" :sm="18" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
                <a-form-item>
                  <a-select
                    showSearch
                    placeholder="审核状态"
                    allowClear
                    size="small"
                    v-decorator="['status']"
                  >
                    <a-select-option value="1">未审核</a-select-option>
                    <a-select-option value="2">审核通过</a-select-option>
                    <a-select-option value="3">审核拒绝</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="5" :xs="20" :sm="18" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
                <a-form-item>
                  <a-select
                    showSearch
                    placeholder="选择操作类型"
                    allowClear
                    size="small"
                    v-decorator="['type']"
                  >
                    <a-select-option value="1">充值</a-select-option>
                    <a-select-option value="2">提现</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col
                v-if="hasPermission('money.account')"
                :span="5"
                :xs="20"
                :sm="18"
                :md="12"
                :lg="8"
                :xl="6"
                style="margin-top: 10px;"
              >
                <a-form-item>
                  <a-input v-decorator="['account']" placeholder="打款账户" size="small" allowClear />
                </a-form-item>
              </a-col>
              <a-col :span="5" :xs="20" :sm="18" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
                <a-form-item>
                  <end-time v-decorator="['end_time']" />
                </a-form-item>
              </a-col>
              <a-col :span="6" :xs="20" :sm="18" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
                <a-form-item></a-form-item>
              </a-col>
            </a-col>
            <a-col
              :xs="20"
              :sm="16"
              :md="10"
              :lg="1"
              :xl="1"
              style="margin-top: 10px;"
              :offset="1"
              :style="{display: 'flex', justifyItems: 'center', alignItems: 'center'}"
            >
              <a-form-item>
                <a-button size="small" type="primary" html-type="submit">搜索</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { gameSelect } from "@/api/game";
import { priceSelect } from "@/api/price";
import { userSelect } from "@/api/user";
import StartTime from "./StartTime";
import EndTime from "./EndTime";

import MoneyAdd from "./MoneyAdd";
export default {
  props: {
    onAdd: {
      type: Function,
      default: null
    }
  },
  components: {
    MoneyAdd,
    StartTime,
    EndTime
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      games: [],
      prices: [],
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
        console.log(values);
        if (!err) {
          console.log("Received values of form: ", values);
          this.$emit("search", values);
        }
      });
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

<style>
</style>

<style scoped>
.ant-table-tbody > tr > td {
  padding: 4px 8px;
  text-align: center;
}
.search {
  margin-top: 10px;
}
.ant-row {
  height: 24px;
}
.ant-form-item-control {
  line-height: 24px;
}
.ant-form-item{
  width: 90%;
  margin-bottom: 0px;
}
</style>