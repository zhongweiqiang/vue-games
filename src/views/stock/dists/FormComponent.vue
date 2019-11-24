<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="游戏名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
      <a-input
        v-decorator="['game_name', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        :disabled="true"
      />
    </a-form-item>
    <a-form-item label="面值名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
      <a-input
        v-decorator="['gold', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        :disabled="true"
      />
    </a-form-item>
    <a-form-item label="面值价格" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
      <a-input
        v-decorator="['money', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        :disabled="true"
      />
    </a-form-item>
    <a-form-item label="库存数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
      <a-input
        v-decorator="['num', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        :disabled="true"
      />
    </a-form-item>
    <a-form-item label="选择账户" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
      <a-select
        showSearch
        placeholder="选择用户"
        optionFilterProp="children"
        :filterOption="filterOption"
        allowClear
        v-decorator="['son_id', { rules: [{ required: true, message: '必须选择子账户' }] }]"
      >
        <a-select-option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="分配数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
      <a-input-number
        :min="1"
        :max="max"
        @change="onChange"
        v-decorator="['dis_num', { rules: [{ required: true, message: '必须选择数量' }] }]"
      />
    </a-form-item>
    <a-form-item>
        <a-input v-decorator="['price_id']" type="hidden"></a-input>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 9 }">
      <a-button type="primary" html-type="submit" size="small">分配</a-button>
      <a-button :style="{marginLeft: '10px'}" @click="handleCancel" size="small">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { userSelect } from "@/api/user";
import { dist } from '@/api/dist'
export default {
  props: {
    text: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.getUserList("son");
    this.form.setFieldsValue({
      game_name: this.text.game_name,
      gold: this.text.gold,
      money: this.text.money,
      num: this.text.total,
      price_id: this.text.price_id
    });
    this.max = this.text.total
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      users: [],
      max: 10000
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          dist(values).then(response => {
              console.log(response)
              this.$emit('dist')
              this.$message.success(response.message)
          })
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
      this.$emit("cancel");
    },

    getUserList(value) {
      userSelect({ user_type: value }).then(response => {
        this.users = response.data;
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