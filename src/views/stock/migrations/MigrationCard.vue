<template>
  <div
    style="background-color: #ececec; padding: 20px;width: 80%; margin: 50px auto; height: 100%;clear:both"
  >
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="一键迁移" :bordered="false">
          <a-row>
            <a-col :span="18">
              <p>账户选择为主账户，迁移后该账户及其子账户凭证全部都分配给被分配账户，包括已使用凭证</p>
            </a-col>
            <a-col :span="5" :offset="1">
              <!-- <a-button type="primary">迁移</a-button> -->
              <migration-modal />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="凭证分配" :bordered="false">
          <a-row>
            <a-col :span="18">
              <p>账户分配，可选择账户类型进行分类(子账户或者子账户)，凭证接收者可以是子账户或者主账户, 只能分配有效凭证</p>
            </a-col>
            <a-col :span="5" :offset="1">
              <!-- <a-button type="primary">迁移</a-button> -->
              <dist-modal />
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
  </div>
</template>

<script>
import MigrationModal from "./MigrationModal";
import DistModal from "./DistModal";
export default {
  components: {
    MigrationModal,
    DistModal
  }
};
</script>
