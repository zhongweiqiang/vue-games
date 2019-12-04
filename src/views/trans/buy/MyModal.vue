<template>
  <div>
    <a-button type="primary" @click="showModal" size="small" style="margin-top: 7px;">我的求购</a-button>
    <a-modal title="Basic Modal" :footer="null" v-model="visible" @ok="handleOk" width="80%">
      <table-list />
    </a-modal>
  </div>
</template>
<script>
import TableList from './TableList'
  export default {
      components: {
          TableList
      },
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
    },
  };
</script>
