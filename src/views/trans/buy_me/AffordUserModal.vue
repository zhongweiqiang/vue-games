<template>
  <div>
    <a-button type="primary" @click="showModal" size="small">供货人</a-button>
    <a-modal title="购买详情" v-model="visible" @ok="handleOk" :footer="null" width="50%" style="min-width: 500px;">
      <afford-user-table :id="id" />
    </a-modal>
  </div>
</template>
<script>
import AffordUserTable from "./AffordUserTable";
export default {
  components: {
    AffordUserTable
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
