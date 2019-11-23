<template>
  <a-select
    showSearch
    placeholder="选择用户"
    optionFilterProp="children"
    style="width: 160px"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
    :filterOption="filterOption"
    allowClear
    size="small"
    :value="value"
  >
    <a-select-option v-for="user in users"  :value="user.id" :key="user.id">{{ user.name }}</a-select-option>
  </a-select>
</template>
<script>
import { select } from "@/api/user";
export default {
  data() {
    return {
      users: [],
      value: ''
    };
  },
  mounted(){
      
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
      this.value = value
      this.$emit('change', value)
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },

    getUserList(value) {
        this.value = ''
        console.log('hello world')
      select({user_type: value}).then(response => {
        this.users = response.data;
      });
    }
  }
};
</script>
