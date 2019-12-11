<template>
  <div>
    <a-button type="primary" @click="showModal">迁移</a-button>
    <a-modal title="一键迁移" v-model="visible" @ok="handleOk" width="32%" :footer="null" :maskClosable="false" :closable="false" style="min-width: 420px;">
      <migration-form @cancel="handleCancel" />
    </a-modal>
  </div>
</template>
<script>
import MigrationForm from './MigrationForm'
  export default {
      components: { MigrationForm },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        console.log(e);
        this.visible = false;
      },
      handleCancel(){
          this.visible = false
          console.log('dddddd')
      },

    },
  };
</script>
