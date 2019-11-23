<template>
  <a-select
    showSearch
    placeholder="选择库存状态"
    optionFilterProp="children"
    style="width: 160px"
    @change="handleChange"
    allowClear
    size="small"
  >
    <a-select-option value="1">正常有效</a-select-option>
    <a-select-option value="2">已被使用</a-select-option>
    <a-select-option value="4">使用失败</a-select-option>
    <a-select-option value="5">后台恢复</a-select-option>
    <a-select-option value="6">已经获取</a-select-option>
    <a-select-option value="7">禁止使用</a-select-option>
    <a-select-option value="8">库存上架</a-select-option>
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
