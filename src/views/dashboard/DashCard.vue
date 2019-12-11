<template>
  <div style="background: #ECECEC; padding: 30px; padding-top: 0px;">
    <a-row :gutter="16">
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
          <router-link to="/stock/list">
        <a-card>
          <a-statistic
            title="库存数量"
            :value="data.total"
            :precision="0"
            suffix="个"
            :valueStyle="{color: '#3f8600'}"
            style="margin-right: 50px"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
          </router-link>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
        <a-card>
          <a-statistic
            title="正常有效"
            :value="data.s1"
            :precision="0"
            suffix="个"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
          <router-link to="/out/list">

        <a-card>
          <a-statistic
            title="已出库"
            :value="data.s2"
            :precision="0"
            suffix="个"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
          </router-link>
      </a-col>

      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
          <router-link to="/buy/list">
        <a-card>
          <a-statistic
            title="上架中"
            :value="data.s8"
            :precision="0"
            suffix="个"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
          </router-link>
      </a-col>

      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
        <a-card>
          <a-statistic
            title="有效金额"
            :value="data.available_money"
            :precision="2"
            suffix="元"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
          <router-link to="/saled/list">
        <a-card>
          <a-statistic
            title="出售总额"
            :value="data.sale_money"
            :precision="2"
            suffix="元"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
          </router-link>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
          <router-link to="/pre_buy_me/list">
        <a-card>
          <a-statistic
            title="求购总额"
            :value="data.want_to_buy"
            :precision="2"
            suffix="元"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
          </router-link>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
        <a-card>
          <a-statistic
            title="冻结总额"
            :value="data.fro_money"
            :precision="2"
            suffix="元"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
          <router-link to="/log/withdraw">
        <a-card>
          <a-statistic
            title="提现手续费"
            :value="data.withdraw_money"
            :precision="2"
            suffix="元"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
          </router-link>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
        <a-card>
          <a-statistic
            title="出库手续费"
            :value="data.output_money"
            :precision="2"
            suffix="元"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
          <router-link to="/log/trans">
        <a-card>
          <a-statistic
            title="出售手续费"
            :value="data.sale_fee"
            :precision="2"
            suffix="元"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
          </router-link>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="top">
          <router-link to="/log/trans">
        <a-card>
          <a-statistic
            title="求购手续费"
            :value="data.buy_afford_fee"
            :precision="2"
            suffix="元"
            valueClass="demo-class"
            :valueStyle="{color: '#3f8600'}"
          >
            <template v-slot:prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
          </router-link>
      </a-col>
    </a-row>

  </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: null
        }
    }
}
</script>


<style scoped>
.top {
  margin-top: 30px;
}
</style>
