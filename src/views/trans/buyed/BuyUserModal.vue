<template>
  <div>
    <a-button type="primary" @click="showModal" size="small">购买人</a-button>
    <a-modal title="购买详情" v-model="visible" @ok="handleOk" :footer="null" width="50%">
      <buy-user-table :id="id" />
    </a-modal>
  </div>
</template>
<script>
import BuyUserTable from "./BuyUserTable";
export default {
  components: {
    BuyUserTable
  },
  props: {
      id: {
          type: Number,
          default: null
      }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
  }
};
</script>
