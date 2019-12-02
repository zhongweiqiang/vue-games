<template>
  <div class="clearfix">
    <a-upload
      listType="picture-card"
      :fileList="fileList"
      @preview="handlePreview"
      @change="handleChange"
      :customRequest="upload"
    >
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import { upload } from "@/api/money";
export default {
    props:{
        name: {
            type: String,
            default: null
        }, 
        // fileList: {
        //     type: Array,
        //     default: null
        // }
    },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: []
    //   fileList: [
    //     {
    //       uid: "-1",
    //       name: "xxx.png",
    //       status: "done",
    //       url:
    //         "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //     }
    //   ]
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    upload(data) {
      const formData = new FormData();
      formData.append(this.name, data.file);
      upload(formData).then(response => {
          this.fileList = response.data
      });
    }
  }
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
