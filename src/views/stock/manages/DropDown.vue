<template>
  <div :style="{display: 'inline'}">
    <a-dropdown>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item v-if="hasPermission('stock.no_deal')" key="5"><a-icon type="warning" />设置为可出库(不可交易)</a-menu-item>
        <a-menu-item v-if="hasPermission('stock.used')" key="2"><a-icon type="warning" />设置为已使用</a-menu-item>
        <a-menu-item v-if="hasPermission('stock.effective')" key="1"><a-icon type="warning" />设置为正常有效</a-menu-item>
        <a-menu-item v-if="hasPermission('stock.forbidden')" key="7"><a-icon type="warning" />禁止使用</a-menu-item>
      </a-menu>
      <a-button size="small" style="margin-left: 8px"> 操作 <a-icon type="down" /> </a-button>
    </a-dropdown>
  </div>
</template>

<script>
import { status } from '@/api/stock'
  export default {
      props: {
          id: {
              type: Number,
              default: null
          }
      },
    methods: {
      handleButtonClick(e) {
        console.log('click left button', e);

      },
      handleMenuClick(e) {
        console.log('click', e.key);
                console.log(this.id)
                status({id: this.id, status: e.key}).then(response => {
                  this.$emit('update')
                  this.$message.success(response.message)
                })
      },
    },
  };
</script>
