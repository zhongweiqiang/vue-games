<template>
  <a-select
    allowClear
    placeholder="设备状态"
    optionFilterProp="children"
    style="width: 200px"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
    size="small"
  >
    <a-select-option value="1">无效</a-select-option>
    <a-select-option value="2">启用</a-select-option>
    <a-select-option value="3">禁用</a-select-option>
  </a-select>
</template>
<script>
  export default {
    methods: {
      handleChange(value) {
        console.log(`selected ${value}`);
        this.$emit('sss', value)
      },
      handleBlur() {
        console.log('blur');
      },
      handleFocus() {
        console.log('focus');
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
    },
  };
</script>
