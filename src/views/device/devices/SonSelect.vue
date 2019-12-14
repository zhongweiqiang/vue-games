<template>
  <a-select
    showSearch
    placeholder="选择账户"
    optionFilterProp="children"
    style="width: 90%;"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
    :filterOption="filterOption"
    allowClear
    size="small"
  >
    <a-select-option v-for="son in sons" :value="son.id" :key="son.id">{{ son.name }}</a-select-option>
  </a-select>
</template>
<script>
import { select } from "@/api/device";
export default {
  data() {
    return {
      sons: []
    };
  },
  mounted(){
      this.getSonList()
  },
  methods: {
    handleChange(value) {
      // console.log(`selected ${value}`);
      this.$emit('select', value)
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

    getSonList() {
      select().then(response => {
        this.sons = response.data;
      });
    }
  }
};
</script>
