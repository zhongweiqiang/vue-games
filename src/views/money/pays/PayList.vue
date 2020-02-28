<template>
  <div style=" padding: 20px; margin-top: 5%;">
    <a-row :gutter="16">
      <a-col :xs="20" :sm="20" :md="20" :lg="4" :xl="4" style="min-width: 150px;">
        <a-card title="微信" :bordered="false">
          <up-load ref="wechat" name="wechat" key="wechat" />
        </a-card>
      </a-col>
      <a-col :xs="20" :sm="20" :md="20" :lg="4" :xl="4">
        <a-card title="支付宝" :bordered="false">
          <up-load ref="ali" name="ali" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import UpLoad from "./UpLoad";
import { pic } from "@/api/money";
export default {
  components: {
    UpLoad
  },
  data() {
    return {
      wechat: [],
      ali: []
    };
  },
  mounted() {
    this.getPic();
  },
  methods: {
    getPic() {
      pic().then(response => {
        console.log(response);
        this.$refs.wechat.fileList = response.data.wechat;
        this.$refs.ali.fileList = response.data.ali;
      });
    }
  }
};
</script>

<style scoped>
.ant-upload-list-picture-card .ant-upload-list-item {
  margin: 0px;
}
</style>


