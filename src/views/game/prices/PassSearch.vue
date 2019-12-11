<template>
  <div style="z-index:999;height: 100%;">
    <a-form :form="form" @submit="handleSubmit" layout="inline">
      <a-row style=" margin-left: 10px;clear:both;">
        <a-col :span="20" style="clear:both;">
          <a-row style="clear:both;">
            <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="8" style="margin-top: 10px;">
              <a-form-item>
                <a-select
                  showSearch
                  placeholder="选择游戏"
                  optionFilterProp="children"
                  style="width: 200px"
                  @change="handleGameChange"
                  :filterOption="filterOption"
                  allowClear
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

            <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="8" style="margin-top: 10px;">
              <a-form-item>
                <a-select
                  showSearch
                  placeholder="选择面值"
                  optionFilterProp="children"
                  style="width: 200px"
                  :filterOption="filterOption"
                  allowClear
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

            <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="8" style="margin-top: 10px;">
              <a-form-item>
                <a-input allowClear placeholder="面值标识" :style="{width: '200px'}" v-decorator="['title']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="2"
          :xl="2"
          :style="{display: 'flex', justifyItems: 'center', alignItems: 'center', height: '58px'}"
        >
          <a-form-item>
            <a-button size="small" type="primary" html-type="submit">搜索</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { gameSelect } from "@/api/game";
import { priceSelect } from "@/api/price";
import { userSelect } from "@/api/user";
export default {
  components: {},
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
        //   return
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