<template>
  <div style="display: flex; justify-content: center; height: 100%; margin-top: 15%;">
    <div>
      <a-row>
        <a-col style="line-height: 32px;">
          <p>账户选择为主账户，迁移后该账户及其子账户凭证全部都分配给被分配账户，包括已使用凭证</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="10" style="margin-top: 15px;">
          <migration-modal />
        </a-col>
      </a-row>
    </div>

  </div>
</template>

<script>
import MigrationModal from './MigrationModal'
export default {
    components: {
        MigrationModal
    },
};
</script>

<style>
</style>