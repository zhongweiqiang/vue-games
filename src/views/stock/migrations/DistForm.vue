<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="提供者类型" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-select
        showSearch
        placeholder="选择提供者账户类型"
        @change="handleProviderTypeChange"
        allowClear
        v-decorator="['provider_user_type',
          { rules: [{ required: true, message: '请选择凭证提供者类型' }] }]"
      >
        <a-select-option value="son">子账户</a-select-option>
        <a-select-option value="user">主账户</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="提供者" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-select
        showSearch
        placeholder="选择提供者账户"
        optionFilterProp="children"
        :filterOption="filterOption"
        @change="handleProviderUserChange"
        allowClear
        v-decorator="['provider_user_id',
          { rules: [{ required: true, message: '请选择提供者账户' }] }]"
      >
        <a-select-option
          v-for="user in provider_users"
          :value="user.id"
          :key="user.id"
        >{{ user.name }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="选择游戏" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-select
        showSearch
        placeholder="选择游戏"
        optionFilterProp="children"
        @change="handleGameChange"
        :filterOption="filterOption"
        allowClear
        v-decorator="['game_id',
          { rules: [{ required: true, message: '请选择游戏' }] }]"
      >
        <a-select-option v-for="game in games" :value="game.id" :key="game.id">{{ game.name }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="选择面值" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-select
        showSearch
        placeholder="选择面值"
        optionFilterProp="children"
        :filterOption="filterOption"
        @change="handlePriceChange"
        allowClear
        v-decorator="['price_id',
          { rules: [{ required: true, message: '请选择面值' }] }]"
      >
        <a-select-option v-for="price in prices" :value="price.id" :key="price.id">{{ price.gold }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="接收者类型" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-select
        showSearch
        placeholder="选择接收者账户类型"
        @change="handleReceiverTypeChange"
        allowClear
        v-decorator="['receiver_user_type',
          { rules: [{ required: true, message: '请选择接收者账户类型' }] }]"
      >
        <a-select-option value="son">子账户</a-select-option>
        <a-select-option value="user">主账户</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="接收者" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-select
        showSearch
        placeholder="选择接收者账户"
        optionFilterProp="children"
        :filterOption="filterOption"
        allowClear
        v-decorator="['receiver_user_id',
          { rules: [{ required: true, message: '请选择接收者账户' }] }]"
      >
        <a-select-option
          v-for="user in receiver_users"
          :value="user.id"
          :key="user.id"
        >{{ user.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="剩余数量" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-input-number :min="1" @change="onChange" v-decorator="['total']" disabled />
    </a-form-item>
    <a-form-item label="分配数量" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
      <a-input-number
        :min="1"
        :max="max"
        @change="onChange"
        v-decorator="['dis_num', { rules: [{ required: true, message: '必须选择数量' }] }]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 9 }">
      <a-button @click="handleCancel" size="small">取消</a-button>
      <a-button :style="{marginLeft: '10px'}" type="primary" size="small" html-type="submit">分配</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { gameSelect } from "@/api/game";
import { priceSelect } from "@/api/price";
import { userSelect } from "@/api/user";
import { migration_dist, getCount } from "@/api/dist";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      games: [],
      prices: [],
      provider_users: [],
      receiver_users: [],
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
          console.log("Received values of form: ", values);
          migration_dist(values).then(response => {
            console.log(response);
            this.$emit('cancel')
            this.form.resetFields()
            this.$message.success(response.message)
            
            
          });
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    },
    handleCancel() {
      this.form.resetFields();
      this.$emit("cancel");
    },

    handleProviderTypeChange(value) {
      this.form.setFieldsValue({ provider_user_id: undefined });
      this.getProviderUserList(value);
    },

    handleReceiverTypeChange(value) {
      this.form.setFieldsValue({ receiver_user_id: undefined });
      this.getReceiverUserList(value);
      console.log(this.form.getFieldsValue());
    },

    handleGameChange(value) {
      console.log(`selected ${value}`);
      this.form.setFieldsValue({ price_id: undefined });
      this.getPriceList(value);
      const values = this.form.getFieldsValue();
      values.game_id = value;
      this.getCount(values);
    },

    getProviderUserList(value) {
      userSelect({ user_type: value }).then(response => {
        this.provider_users = response.data;
      });
    },

    getReceiverUserList(value) {
      userSelect({ user_type: value }).then(response => {
        this.receiver_users = response.data;
      });
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
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onChange(value) {
      console.log("changed", value);
    },
    handleProviderUserChange(value) {
      console.log(value);
      const values = this.form.getFieldsValue();
      values.provider_user_id = value;
      this.getCount(values);
    },

    handlePriceChange(value) {
      console.log(value);
      const values = this.form.getFieldsValue();
      values.price_id = value;
      this.getCount(values);
    },
    getCount(values) {
      getCount(values).then(response => {
        console.log(response);
        let count = response.data;
        this.max = Number(count);
        this.form.setFieldsValue({ total: count });
      });
    }
  }
};
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 10px;
}
.ant-input-number {
  margin-right: 10px;
  width: 100%;
}
</style>

