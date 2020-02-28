<template>
  <div>
    <a-button type="primary" @click="showModal">查看</a-button>
    <a-modal title="无归属凭证" v-model="visible" @ok="handleOk" :footer="null" width="70%" height="700px">
      <!-- <afford-user-table :id="id" /> -->
      <store-table />
    </a-modal>
  </div>
</template>
<script>
// import AffordUserTable from "./AffordUserTable";
import { ownerLessStock } from '@/api/migration'
import StoreTable from './StoreTable'
export default {
  components: {
    // AffordUserTable
    StoreTable
  },
  props: {
      // id: {
      //     type: Number,
      //     default: null
      // }
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
