<template>
  <div
    style="background-color: #ececec; padding: 20px;width: 80%; margin: 50px auto; height: 100%;clear:both"
  >
    <a-row :gutter="16">
      <a-col :xs="24" :sm="24" :md="16" :lg="12" :xl="12" style="margin-top: 10px;">
        <a-card title="一键迁移" :bordered="false">
          <a-row>
            <a-col :span="18">
              <p>账户选择为主账户，迁移后该账户及其子账户凭证全部都分配给被分配账户，包括已使用凭证</p>
            </a-col>
            <a-col :span="5" :offset="1">
              <migration-modal />
            </a-col>
          </a-row>
        </a-card>
      </a-col>


      <a-col :xs="24" :sm="24" :md="16" :lg="12" :xl="12" style="margin-top: 10px;">
        <a-card title="凭证分配" :bordered="false">
          <a-row>
            <a-col :span="18">
              <p>账户分配，可选择账户类型进行分类(子账户或者子账户)，凭证接收者可以是子账户或者主账户, 只能分配有效凭证</p>
            </a-col>
            <a-col :span="5" :offset="1">
              <dist-modal />
            </a-col>
          </a-row>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="24" :md="16" :lg="12" :xl="12" style="margin-top: 10px;">
        <a-card title="凭证导入" :bordered="false">
          <a-row>
            <a-col :span="18">
              <p>账户导入，在配置列表中找到key为receipt_postion的列数, 从0开始数, 比如凭证在第五列, 那么位置为4</p>
            </a-col>
            <a-col :span="5" :offset="1">
              <upload-file />
            </a-col>
          </a-row>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="24" :md="16" :lg="12" :xl="12" style="margin-top: 10px;">
        <a-card title="无归属凭证" :bordered="false">
          <a-row>
            <a-col :span="18">
              <p>所有的其子账户或者主账户被删除的凭证</p>
            </a-col>
            <a-col :span="5" :offset="1">
              <store-modal />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <!-- <a-col :span="8">
        <a-card title="Card title" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>-->
    </a-row>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import MigrationModal from "./MigrationModal";
import StoreModal from "./StoreModal"
import DistModal from "./DistModal";
import UploadFile from './UploadFile'
export default {
  components: {
    MigrationModal,
    DistModal,
    UploadFile,
    StoreModal
  }
};
</script>
