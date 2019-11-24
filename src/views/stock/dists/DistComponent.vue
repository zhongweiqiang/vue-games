<template>
  <div style="display: inline">
    <a-button type="primary" @click="showModal" size="small">分配</a-button>
    <a-modal
      title="分配库存"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="42%"
      :footer="null"
    >
      <!-- <p>{{ModalText}}</p> -->
      <form-component :text="text" @cancel="visible = false" @dist="onDist" />
    </a-modal>
  </div>
</template>
<script>
import FormComponent from './FormComponent'
  export default {
      components: { FormComponent },
      props: {
          text: {
              type: Object,
              default: null
          }
      },
    data() {
      return {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
      };
    },
    methods: {
      showModal() {
        this.visible = true;
        console.log(this.text)

      },
      handleOk(e) {
        this.ModalText = 'The modal will be closed after two seconds';
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false;
      },

      onDist(){
          this.$emit('dist')
      },


    },
  };
</script>
