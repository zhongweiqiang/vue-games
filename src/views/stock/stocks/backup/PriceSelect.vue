<template>
  <a-select
    showSearch
    placeholder="选择面值"
    optionFilterProp="children"
    style="width: 160px"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
    :filterOption="filterOption"
    allowClear
    size="small"
  >
    <a-select-option v-for="price in prices" :value="price.id" :key="price.id">{{ price.gold }}</a-select-option>
  </a-select>
</template>
<script>
import { select } from "@/api/price";
export default {
  data() {
    return {
      prices: []
    };
  },
  mounted(){
      
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
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

    getPriceList(value) {
      select({game_id: value}).then(response => {
        this.prices = response.data;
      });
    }
  }
};
</script>
