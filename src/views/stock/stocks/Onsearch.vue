<template>
  <div style="z-index:999;height: 100%;">
    <a-form :form="form" @submit="handleSubmit" layout="inline">
      <a-row style=" margin-left: 10px;clear:both;">
        <a-col :span="22" style="clear:both;">
          <!-- <a-row style="clear:both;"> -->
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
            <a-form-item>
              <a-select
                showSearch
                placeholder="选择游戏"
                optionFilterProp="children"
                style="width: 160px"
                @change="handleGameChange"
                :filterOption="filterOption"
                allowClear
                size="small"
                v-decorator="['game_id']"
              >
                <a-select-option
                  v-for="game in games"
                  :value="game.id"
                  :key="game.id"
                >{{ game.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
            <a-form-item>
              <a-select
                showSearch
                placeholder="选择账户类型"
                style="width: 160px"
                @change="handleTypeChange"
                allowClear
                size="small"
                v-decorator="['user_type']"
              >
                <a-select-option value="son">子账户</a-select-option>
                <a-select-option value="user">主账户</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
            <a-form-item>
              <a-input
                placeholder="请输入库存单号"
                size="small"
                :style="{width: '160px'}"
                v-decorator="['identifier']"
              ></a-input>
            </a-form-item>
          </a-col>

          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
            <a-form-item>
              <start-time v-decorator="['start_time']" />
            </a-form-item>
          </a-col>
          <!-- </a-row> -->
          <!-- <a-row :style="{marginTop: '10px'}"> -->
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
            <a-form-item>
              <a-select
                showSearch
                placeholder="选择面值"
                optionFilterProp="children"
                style="width: 160px"
                :filterOption="filterOption"
                allowClear
                size="small"
                v-decorator="['price_id']"
              >
                <a-select-option
                  v-for="price in prices"
                  :value="price.id"
                  :key="price.id"
                >{{ price.gold }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
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
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
            <a-form-item>
              <a-select
                showSearch
                placeholder="选择库存状态"
                optionFilterProp="children"
                style="width: 160px"
                allowClear
                size="small"
                v-decorator="['status']"
              >
                <a-select-option value="1">正常有效</a-select-option>
                <a-select-option value="2">已被使用</a-select-option>
                <a-select-option value="4">使用失败</a-select-option>
                <a-select-option value="5">后台恢复</a-select-option>
                <a-select-option value="6">已经获取</a-select-option>
                <a-select-option value="7">禁止使用</a-select-option>
                <a-select-option value="8">库存上架</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
            <a-form-item>
              <end-time v-decorator="['end_time']" />
            </a-form-item>
          </a-col>

          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
            <a-form-item>
              <a-input
                placeholder="请输入库存id"
                size="small"
                :style="{width: '160px'}"
                v-decorator="['id']"
              ></a-input>
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="24" :md="24" :lg="3" :xl="2" style="margin-top: 10px;">
            <a-form-item>
              <a-button size="small" type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
          </a-col>
          <!-- </a-row> -->
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { gameSelect } from "@/api/game";
import { priceSelect } from "@/api/price";
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
      games: [],
      prices: [],
      users: []
    };
  },
  created() {
    this.getGameList();
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

    handleGameChange(value) {
      console.log(`selected ${value}`);
      this.form.setFieldsValue({ price_id: undefined });
      this.getPriceList(value);
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

    getGameList() {
      gameSelect().then(response => {
        this.games = response.data;
      });
    },
    getPriceList(value) {
      priceSelect({ game_id: value }).then(response => {
        this.prices = response.data;
      });
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
</style>