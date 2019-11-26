<template>
  <div>
    <a-button type="primary" @click="showModal">Start</a-button>
    <a-modal title="Basic Modal" v-model="visible" @ok="handleOk" width="32%" :footer="null">
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
      },
    },
  };
</script>
