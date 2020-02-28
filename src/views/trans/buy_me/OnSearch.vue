<template>
  <div>
    <a-row>
      <a-col :span="20">
        <a-form :form="form" @submit="handleSubmit">
          <a-row style="height: 30px; margin-left: 10px;">
            <a-col :span="14">
              <a-row>
                <a-col :xs="24" :sm="24" :md="18" :lg="12" :xl="8" style="margin-top: 10px;">
                  <a-form-item>
                    <a-select
                      showSearch
                      placeholder="选择游戏"
                      optionFilterProp="children"
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
                <a-col :xs="24" :sm="24" :md="18" :lg="12" :xl="8" style="margin-top: 10px;">
                  <a-form-item>
                    <a-select
                      showSearch
                      placeholder="订单状态"
                      allowClear
                      size="small"
                      v-decorator="['status']"
                    >
                      <a-select-option value="1">正常挂单</a-select-option>
                      <a-select-option value="2">部分交易</a-select-option>
                      <a-select-option value="3">交易完成</a-select-option>
                      <a-select-option value="4">订单下架</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="18" :lg="12" :xl="8" style="margin-top: 10px;">
                  <a-form-item>
                    <start-time v-decorator="['start_time']" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :style="{marginTop: '10px'}">
                <a-col :xs="24" :sm="24" :md="18" :lg="12" :xl="8" style="margin-top: 10px;">
                  <a-form-item>
                    <a-select
                      showSearch
                      placeholder="选择面值"
                      optionFilterProp="children"
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
                <a-col :xs="24" :sm="24" :md="18" :lg="12" :xl="8" style="margin-top: 10px;">
                  <a-form-item>
                    <a-input
                      placeholder="请输入定单号"
                      size="small"
                      v-decorator="['order_num']"
                      allowClear
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="18" :lg="12" :xl="8" style="margin-top: 10px;">
                  <a-form-item>
                    <end-time v-decorator="['end_time']" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col
               :xs="20" :sm="16" :md="10" :lg="1" :xl="1"
            >

              <a-row>
                <a-col style="margin-top: 10px;">
              <a-form-item>
                <a-button size="small" type="primary" html-type="submit">搜索</a-button>
              </a-form-item>
                </a-col>
                <a-col style="margin-top: 10px;">
                  <a-button type="primary" size="small" @click="buyList">求购列表</a-button>
                </a-col>
              </a-row>
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
import { select } from "@/api/userinfo";
import StartTime from "./StartTime";
import EndTime from "./EndTime";
// import MyModal from './MyModal'

// import SaleAdd from "./SaleAdd";
export default {
  props: {
    onAdd: {
      type: Function,
      default: null
    }
  },
  components: {
    // SaleAdd,
    StartTime,
    EndTime
    // MyModal
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
    this.getUserList();
    this.getGameList();
  },
  methods: {
    buyList(){
      this.$router.push('/buy/list')
    },
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
    handleGameChange(value) {
      console.log(`selected ${value}`);
      if (!value) {
        this.form.setFieldsValue({ price_id: undefined });
      }
      this.getPriceList(value);
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
      select().then(response => {
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
.ant-form-item{
  width: 90%;
  margin-bottom: 0px;
}
</style>