<template>
  <a-upload name="file" :multiple="true" :customRequest="upload" :loading="uploading">
    <a-button type="primary">
      <a-icon type="upload" />上传
    </a-button>
  </a-upload>
</template>
<script>
import { importStock } from "@/api/migration";
export default {
  data() {
    return {
      headers: {
        authorization: "authorization-text"
      },
      uploading: false
    };
  },
  methods: {
    handleChange(info) {
      // if (info.file.status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === "done") {
      //   this.$message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === "error") {
      //   this.$message.error(`${info.file.name} file upload failed.`);
      // }
    },
    upload(data) {
      console.log("dat", data);
      const formData = new FormData();
      formData.append(data.filename, data.file);
      importStock(formData).then(response => {
        console.log(response);
        if (response.code == 200) {
          this.$message.success(response.message)
          this.$router.push({
            name: "StockList"
          });
        } else{
          this.$message.error(response.message);
        }
      });
    }
  }
};
</script>
