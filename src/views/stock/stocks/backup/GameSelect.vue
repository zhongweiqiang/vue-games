<template>
  <a-select
    showSearch
    placeholder="选择游戏"
    optionFilterProp="children"
    style="width: 160px"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
    :filterOption="filterOption"
    allowClear
    size="small"
  >
    <a-select-option v-for="game in games" :value="game.id" :key="game.id">{{ game.name }}</a-select-option>
  </a-select>
</template>
<script>
import { select } from "@/api/game";
export default {
  data() {
    return {
      games: []
    };
  },
  mounted(){
      this.getGameList()
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

    getGameList() {
      select().then(response => {
        this.games = response.data;
      });
    }
  }
};
</script>
