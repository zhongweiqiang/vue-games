<template>
  <div>
    <a-modal
      title="最新公告"
      v-model="visible"
      :maskClosable="false"
      :closable="closable"
      @ok="handleOk"
      :footer="null"
    >
      <div v-html="content"></div>
    </a-modal>
  </div>
</template>
<script>
import { display } from "@/api/notice";
export default {
  data() {
    return {
      visible: false,
      closable: false,
      content: ""
    };
  },
  created() {
    this.display();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    display() {
      display().then(response => {
        console.log(response);
        if (response.data == "") {
          console.log("null");
        } else {
        console.log("not null");
          this.content = response.data.content;
          this.visible = true;
          setTimeout(() => {
            this.closable = true;
          }, response.data.expire_time * 1000);
        }
      });
    }
  }
};
</script>
