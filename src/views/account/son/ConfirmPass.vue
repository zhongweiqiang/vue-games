<template>
  <div style="display: inline">
    <!-- <a-button type="primary" @click="showModal">Open Modal</a-button> -->
    <a-modal title="Basic Modal" v-model="visible" @ok="visible = false">
      <!-- <p>Some contents...</p> -->
    <confirm-form />
    </a-modal>
  </div>
</template>
<script>
import ConfirmForm from './ConfirmForm'
  export default {
    components:{
      ConfirmForm
    },
    props: {
      visible: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        // visible: false
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