<template>
  <div>
    <a-button type="primary" @click="showModal">分配</a-button>
    <a-modal title="凭证分配" v-model="visible" @ok="handleOk" width="45%"  :footer="null" :maskClosable="false" :closable="false" style="top: 50px;min-width: 420px">
      <dist-form @cancel="handleCancel" />
    </a-modal>
  </div>
</template>
<script>
import DistForm from './DistForm'
  export default {
      components: { DistForm },
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
