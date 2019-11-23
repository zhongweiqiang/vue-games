<template>
  <a-select
    showSearch
    placeholder="选择账户类型"
    optionFilterProp="children"
    style="width: 160px"
    @change="handleChange"
    allowClear
    size="small"
  >
    <a-select-option value="son">子账户</a-select-option>
    <a-select-option value="user">主账户</a-select-option>
  </a-select>
</template>
<script>
  export default {
    methods: {
      handleChange(value) {
        console.log(`selected ${value}`);
        this.$emit('change', value)
      },
    },
  };
</script>
