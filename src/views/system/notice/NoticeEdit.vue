<template>
  <div style="display: inline;">
    <a-button type="primary" @click="showModal" size="small">
      <a-icon type="edit" />
    </a-button>
    <a-modal title="修改公告" v-model="visible" @ok="handleOk" width="50%" style="min-width: 660px; top: 50px;" okText="确定" cancelText="取消">
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
import { detail, edit } from "@/api/notice";
export default {
  components: {
    EditorBar
  },
  props: {
    onEdit: {
      type: Function,
      default: null
    },
    text: {
      type: Object,
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
  mounted(){
    this.title = this.text.title
    this.detail = this.text.content
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
      edit({id: this.text.id, title: this.title, content: this.detail }).then(response => {
        this.$message.success(response.message);
        this.visible = false;
        this.onEdit();
      });
    },
    change(val) {
      console.log(val);
    }
  }
};
</script>
