<template>
  <div>
<a-form :form="form" @submit="handleSubmit">
    <a-row style="padding-left: 10px;">
      <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="4" style="margin-top: 10px;">
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
      <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="4" style="margin-top: 10px;">
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
      <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="3" style="margin-top: 10px;" v-if="hasPermission('buy_admin_priv')">
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
                </a-select>
              </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="3" style="margin-top: 10px;" v-if="hasPermission('buy_admin_priv')">
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
                    :value="user.user_id"
                    :key="user.user_id"
                  >{{ user.nickname }}</a-select-option>
                </a-select>
              </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="3" style="margin-top: 10px;"  v-if="hasPermission('buy_admin_priv')">
              <a-form-item>
                <a-input v-decorator="['order_num']" allowClear placeholder="请输入订单号" size="small" />
              </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="7" style="margin-top: 10px;">
        <a-row>
          <a-col style="display: inline;">
                            <!-- <a-form-item style="display: inline;"> -->
                <a-button size="small" type="primary" html-type="submit">搜索</a-button>
              <!-- </a-form-item> -->
           
          </a-col>
          <a-col style="display: inline;"  v-if="hasPermission('sale.add')">
            <buy-add :on-add="onAdd" />
          </a-col>
          <a-col style="display: inline;">
            <!-- <my-modal /> -->
            <a-button @click="me_buy_pre" type="primary" size="small">求购(预)</a-button>
          </a-col>
          <a-col style="display: inline;">
            <!-- <my-modal /> -->
            <a-button @click="buy_me_instance" type="primary" size="small">求购(即)</a-button>
          </a-col>
          <a-col style="display: inline;">
            <!-- <my-modal /> -->
            <a-button @click="me_afford" type="primary" size="small">预供</a-button>
          </a-col>
        </a-row>




        <!-- <a-row>
          <a-col style="display: inline;">
              <a-form-item>
                <a-button size="small" type="primary" html-type="submit">搜索</a-button>
              </a-form-item>
          </a-col>
          <a-col style="display: inline;" v-if="hasPermission('sale.add')">
             <buy-add :on-add="onAdd" />
          </a-col>
          <a-col style="display: inline;">
            <my-modal style="display: inline;" />
          </a-col>
        </a-row> -->
      </a-col>
    </a-row>
</a-form>




    <!-- <a-row> -->
      <!-- <a-col
        :xs="20"
        :sm="16"
        :md="10"
        :lg="2"
        :xl="2"
        v-if="hasPermission('sale.add')"
        style="height: 58px; margin-left: 10px; margin-top: 10px;"
      >
        <a-row>
          <a-col>
            <buy-add :on-add="onAdd" />
          </a-col>
          <a-col>
            <my-modal />
          </a-col>
        </a-row>
      </a-col> -->

      <!-- <a-col :span="24">
        <a-form :form="form" @submit="handleSubmit">
          <a-row style="height: 30px; margin-left: 10px;">
            <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="4" style="margin-top: 10px;">
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
            <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="4" style="margin-top: 10px;">
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
            <a-col
              v-if="hasPermission('buy_admin_priv')"
              :xs="24"
              :sm="18"
              :md="12"
              :lg="8"
              :xl="4"
              style="margin-top: 10px;"
            >
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
                </a-select>
              </a-form-item>
            </a-col>

            <a-col
              v-if="hasPermission('buy_admin_priv')"
              :xs="24"
              :sm="18"
              :md="12"
              :lg="8"
              :xl="4"
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
                    :value="user.user_id"
                    :key="user.user_id"
                  >{{ user.nickname }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col v-if="hasPermission('buy_admin_priv')" :xs="24" :sm="18" :md="12" :lg="8" :xl="4" style="margin-top: 10px;">
              <a-form-item>
                <a-input v-decorator="['order_num']" allowClear placeholder="请输入订单号" size="small" />
              </a-form-item>
            </a-col>

            <a-col
              :xs="20"
              :sm="16"
              :md="12"
              :lg="8"
              :xl="8"
              
            
            >
              <a-form-item>
                <a-button size="small" type="primary" html-type="submit">搜索</a-button>
              </a-form-item>

              <a-row>

              </a-row>
            </a-col>
          </a-row>
        </a-form>
      </a-col> -->
    <!-- </a-row> -->
  </div>
</template>

<script>
import { gameSelect } from "@/api/game";
import { priceSelect } from "@/api/price";
import { select } from "@/api/userinfo";
import StartTime from "./StartTime";
import EndTime from "./EndTime";
import MyModal from "./MyModal";

import BuyAdd from "./BuyAdd";
export default {
  props: {
    onAdd: {
      type: Function,
      default: null
    }
  },
  components: {
    BuyAdd,
    StartTime,
    EndTime,
    MyModal
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      games: [],
      prices: [],
      users: [],
      order_num: ""
    };
  },
  created() {
    this.getUserList();
    this.getGameList();
  },
  methods: {
    me_buy_pre(){
      this.$router.push('/pre_buy_me/list')
    },
    buy_me_instance(){
      this.$router.push('/buy_me/list')
    },
    me_afford(){
      this.$router.push('/afford/list')
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
.ant-form-item {
  width: 90%;
  margin-bottom: 0px;
}
</style>