<template>
  <div style="z-index:999;">
    <a-form :form="form" @submit="handleSubmit">
      <!-- <a-row style="height: 60px; margin-left: 10px;">
        <a-col :span="24">
          <a-row>
            <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="6" style="margin-top: 10px;">
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

            <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="6" style="margin-top: 10px;">
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
            <a-col :xs="20" :sm="16" :md="10" :lg="9" :xl="6" style="margin-top: 10px;">
              <a-form-item>
                <start-time v-decorator="['start_time']" />
              </a-form-item>
            </a-col>
            <a-col :xs="20" :sm="16" :md="10" :lg="6" :xl="6" style="margin-top: 10px;">
              <a-form-item>
                <end-time v-decorator="['end_time']" />
              </a-form-item>
            </a-col>
            <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="6" style="margin-top: 10px;">
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
            <a-col :xs="24" :sm="22" :md="6" :lg="6" :xl="2" style="margin-top: 10px;">
              <a-form-item>
                <a-button size="small" type="primary" html-type="submit">搜索</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row> -->

      <!-- 新的排列 -->
      <a-row style="margin-left: 10px;">
        <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="6">
          <a-row style="margin-top: 5px;">
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
          </a-row>
          <a-row style="margin-top: 10px;">
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
          </a-row>
        </a-col>
        <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="6">
          <a-row style="margin-top: 5px;">
            <a-form-item>
              <start-time v-decorator="['start_time']" />
            </a-form-item>
          </a-row>
          <a-row style="margin-top: 10px;">
            <a-form-item>
              <end-time v-decorator="['end_time']" />
            </a-form-item>
          </a-row>
        </a-col>
        <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="6">
          <a-row style="margin-top: 5px;">
            <a-form-item v-if="hasPermission('in.export')">
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
          </a-row>
          <a-row style="margin-top: 10px;">
            <a-form-item>
              <a-button size="small" type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
          </a-row>
        </a-col>
        <a-col :xs="20" :sm="16" :md="10" :lg="8" :xl="6">
          <a-row></a-row>
          <a-row></a-row>
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
    this.getUserList("son");
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
    getUserList(value) {
      userSelect({ user_type: value }).then(response => {
        this.users = response.data;
      });
    },

    getPriceList(value) {
      priceSelect({ game_id: value }).then(response => {
        this.prices = response.data;
      });
    },
    reset() {
      this.form.resetFields();
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