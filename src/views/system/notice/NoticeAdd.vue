<template>
  <div>
    <a-button type="primary" @click="showModal" size="small">
      <a-icon type="plus" />公告
    </a-button>
    <a-modal title="添加公告" v-model="visible" @ok="handleOk" width="50%" style="min-width: 660px; top: 50px;" okText="确定" cancelText="取消">
      <a-row style="margin-bottom: 20px;">
        <a-col>
          <a-input v-model="title" placeholder="请输入标题" />
        </a-col>
      </a-row>

      <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
    </a-modal>
  </div>
</template>
<script>
import EditorBar from "@/components/Editor";
import { add } from "@/api/notice";
export default {
  components: {
    EditorBar
  },
  props: {
    onAdd: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      isClear: false,
      detail: "",
      title: ""
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      console.log(this.title);
      console.log(this.detail);
      if (this.title == "" || this.detail == "请输入公告内容") {
        this.$message.error("请将内容输入完全");
        return false;
      }
      add({ title: this.title, content: this.detail }).then(response => {
        this.$message.success(response.message);
        this.visible = false;
        this.title = "";
        this.detail = "";
        this.onAdd();
      });
    },
    change(val) {
      console.log(val);
    }
  }
};
</script>
