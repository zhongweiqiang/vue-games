<template>
  <div>
    <a-button size="small" type="primary" :style="{marginTop: '2px'}" @click="showModal">
        出售商品
    </a-button>
    <a-modal
      title="发布商品"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="选择游戏" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            showSearch
            placeholder="选择游戏"
            optionFilterProp="children"
            @change="handleGameChange"
            :filterOption="filterOption"
            allowClear
            v-decorator="['game_id', { rules: [{ required: true, message: '请选择游戏' }] }]"
          >
            <a-select-option v-for="game in games" :value="game.id" :key="game.id">{{ game.name }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="选择面值" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            showSearch
            placeholder="选择面值"
            optionFilterProp="children"
            :filterOption="filterOption"
            @change="handlePriceChange"
            allowClear
            v-decorator="['price_id', { rules: [{ required: true, message: '请选择面值' }] }]"
          >
            <a-select-option
              v-for="price in prices"
              :value="price.id"
              :key="price.id"
            >{{ price.gold }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="订单单价" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['unit_price', { rules: [{ required: true, message: '订单单价必须填写' }] }]"
            placeholder="请输入订单单价"
          />
        </a-form-item>

        <a-form-item label="剩余数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
          :value="total"
            disabled
          />
        </a-form-item>

        <a-form-item label="订单数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input-number
            :min="1"
            :max="max"
            v-decorator="['unit', { rules: [{ required: true, message: '订单数量必须填写' }] }]"
            placeholder="请输入订单数量"
          />
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-textarea
            v-decorator="['description']"
            placeholder="请输入备注"
            :autosize="{ minRows: 1, maxRows: 3 }"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 8, offset: 18 }">
          <a-row>
            <a-col :span="8" :style="{ textAlign: 'left' }">
              <a-button size="small" @click="handleCancel">返回</a-button>
            </a-col>
            <a-col :span="8" :style="{ textAlign: 'left' }">
              <a-button size="small" type="primary" html-type="submit">提交</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { apply } from "@/api/money";

import { add, remain } from '@/api/sale'
import { gameSelect } from "@/api/game";
import { priceSelect } from "@/api/price";
export default {
  props: {
    okText: {
      type: String,
      default: "提交"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    onAdd: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      games: [],
      prices: [],
      users: [],
      total: 0,
      max: 0
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
          console.log(values);
          this.confirmLoading = true;
          add(values).then(response => {
            console.log(response);
            this.onAdd();
            this.$message.success(response.message);
            this.visible = false;
            this.confirmLoading = false;
            this.form.resetFields();
          });
        }
      });
    },
    showModal() {
      this.visible = true;
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.form.resetFields();
    },

    handleGameChange(value) {
      console.log(`selected ${value}`);
      this.form.setFieldsValue({ price_id: undefined });
      this.getPriceList(value);
    },

    getGameList() {
      gameSelect().then(response => {
        this.games = response.data;
      });
    },
    handlePriceChange(value){
      let params = {game_id: this.form.getFieldValue('game_id'), price_id: value}
      remain(params).then(response => {
        this.total = response.data
        this.max = response.data
      })
    },
    getPriceList(value) {
      priceSelect({ game_id: value }).then(response => {
        this.prices = response.data;
      });
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  }
};
</script>

<style scoped>
.ant-input-number {
  margin-right: 10px;
  width: 100%;
}
</style>
