<template>
  <div :style="{display: 'inline'}">
    <a-dropdown placement="bottomRight">
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="2"><a-icon type="money" />审核通过</a-menu-item>
        <a-menu-item key="3"><a-icon type="money" />审核拒绝</a-menu-item>
      </a-menu>
      <a-button size="small" :disabled="status != '未审核'" :type="type == '充值'? 'primary' : 'danger'" style="margin-left: 8px"> 操作 <a-icon type="down" /> </a-button>
    </a-dropdown>
  </div>
</template>

<script>
import { status } from '@/api/money'
  export default {
      props: {
          id: {
              type: Number,
              default: null
          },
          status: {
              type: String,
              default: null
          },
                    type: {
              type: String,
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
