<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-row>
      <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" style="margin-top: 10px;">
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
            <a-select-option v-for="game in games" :value="game.id" :key="game.id">{{ game.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" style="margin-top: 10px;">
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
      <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" style="margin-top: 10px;">
        <a-form-item>
          <a-select showSearch placeholder="订单状态" allowClear size="small" v-decorator="['status']">
            <a-select-option value="1">正常挂单</a-select-option>
            <a-select-option value="2">部分交易</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" style="margin-top: 10px;">
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
      <a-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin-top: 10px;">
        <a-row>
          <a-col :span="4">
            <a-form-item>
              <a-button size="small" type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
          </a-col>
          <a-col v-if="hasPermission('sale.add')" :span="4">
            <sale-add :on-add="onAdd" />
          </a-col>
          <a-col :span="6">
            <!-- <my-modal /> -->
            <a-button size="small" type="primary" @click="mySale">销售记录</a-button>
          </a-col>
          <a-col :span="6">
            <a-button size="small" type="primary" @click="myBuy">购买记录</a-button>
          </a-col>
          <a-col :span="4">
            <!-- <my-modal /> -->
            <a-button type="primary" size="small" @click="downSale">一键下架</a-button>
          </a-col>
        </a-row>
      </a-col>

      <!-- <a-col
      :xs="24"
      :sm="18"
      :md="2"
      :lg="2"
      :xl="3"
      v-if="hasPermission('sale.add')"
      style="height: 58px; margin-left: 10px;"
    >
      <a-row>
        <a-col :span="8" style="margin-top: 10px;">
          <sale-add :on-add="onAdd" />
        </a-col>
        <a-col :span="8">
          <my-modal />
        </a-col>
      </a-row>
      </a-col>-->
      <!-- <a-col :span="24">
      <a-form :form="form" @submit="handleSubmit">
        <a-row style="height: 30px; margin-left: 10px;">
          <a-col :span="24">

              <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
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
              <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
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


              <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
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
              <a-col :xs="24" :sm="18" :md="12" :lg="8" :xl="6" style="margin-top: 10px;">
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
 
          </a-col>
          <a-col
            :span="6"
            :xs="20"
            :sm="16"
            :md="10"
            :lg="4"
            :xl="4"
            style="margin-top: 10px;"
            
            
          >


            <a-row>
              <a-col :span="6">
                            <a-form-item>
              <a-button size="small" type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
              </a-col>
              <a-col v-if="hasPermission('sale.add')" :span="6">
                <sale-add :on-add="onAdd" />
              </a-col>
              <a-col :span="6"></a-col>
              <a-col :span="6"></a-col>
            </a-row>



          </a-col>
        </a-row>
      </a-form>
      </a-col>-->
    </a-row>
  </a-form>
</template>

<script>
import { gameSelect } from "@/api/game";
import { priceSelect } from "@/api/price";
import { select } from "@/api/userinfo";
import StartTime from "./StartTime";
import EndTime from "./EndTime";
import MyModal from "./MyModal";
import { downSale } from "@/api/sale";

import SaleAdd from "./SaleAdd";
export default {
  props: {
    onAdd: {
      type: Function,
      default: null
    }
  },
  components: {
    SaleAdd,
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
      users: []
    };
  },
  created() {
    this.getUserList();
    this.getGameList();
  },
  methods: {
    downSale() {
      const self = this;
      this.$confirm({
        title: "确认下架所有商品？",
        content:
          "下架后，所有已上架的商品转为正常使用，如需出售，请再次发布商品",
        onOk() {
          return new Promise((resolve, reject) => {
            downSale().then(response => {
              self.$emit('down')
              self.$message.success(response.message);
              self.destroyAll()
            });
          }).catch(() => {self.$message.warning('下架失败')});
        },
        onCancel() {
          self.$message.info("取消下架");
        },
        okText: '下架',
        cancelText: '取消'
      });
    },
    mySale() {
      this.$router.push("/saled/list");
    },
    myBuy() {
      this.$router.push("/buyed/list");
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
    },
    destroyAll() {
      this.$destroyAll();
    },
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