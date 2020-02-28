<template>
  <div :style="{display: 'inline'}">

    <a-row>
      <a-col style="display: inline;" v-if="user_id != info.user_id">
        <buy-modal ref="buy" :info="info" :on-buy="onBuy" />
      </a-col>
      <a-col style="display: inline;" v-if="user_id == info.user_id || role_id == 1">
        <a-button size="small" type="primary" @click="operation">下架</a-button>
      </a-col>
      <a-col style="display: inline;" v-if="user_id == info.user_id">
        <sale-edit ref="edit" :info="info" :on-update="onBuy" />
      </a-col>
    </a-row>



    <!-- <a-dropdown placement="bottomRight">
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1" v-if="user_id != info.user_id">
          <buy-modal ref="buy" :info="info" :on-buy="onBuy" />
        </a-menu-item>
        <a-menu-item key="2" v-if="user_id == info.user_id || role_id == 1">
          <div>
              <a-icon type="money" />下架
          </div>
        </a-menu-item>
        <a-menu-item key="3" v-if="user_id == info.user_id">
          <sale-edit ref="edit" :info="info" :on-update="onBuy" />
        </a-menu-item>
      </a-menu>
      <a-button size="small" type="primary" style="margin-left: 8px">
        操作
        
        <a-icon type="down" />
      </a-button>
    </a-dropdown> -->


  </div>
</template>

<script>
import { status } from "@/api/money";
import { down } from "@/api/sale";
import BuyModal from "./BuyModal";
import SaleEdit from './SaleEdit'

export default {
  props: {
    id: {
      type: Number,
      default: null
    },
    info: {
      type: Object,
      default: null
    },
    onBuy: {
      type: Function,
      default: null
    }
  },
  components: {
    BuyModal,
    SaleEdit
  },
  mounted() {},
  data() {
    return {
      user_id: this.$store.getters.info.id,
      role_id: this.$store.getters.info.role_id
    };
  },
  methods: {
    // handleButtonClick(e) {
    //   console.log("click left button", e);
    // },

// 下架订单
    operation(){
      console.log('dddd')
      this.down(this.id);
    },
    handleMenuClick(e) {
      console.log("click", e.key);
      switch (Number(e.key)) {
        case 1:
          this.buy_store();
          break;
        case 2:
          this.down(this.id);
          break;
        case 3:
          this.update_store()
          break;
        default:
          break;
      }
    },

    down(value) {
      const self = this;
      this.$confirm({
        title: "确认下架?",
        content: h => <div style="color:red;">下架后可重新上架</div>,
        onOk() {
          down({ id: value }).then(response => {
            self.$message.success(response.message);
            self.$emit("update");
          });
        },
        onCancel() {
          self.$message.info("取消下架");
        },
        onText: '确定',
        cancelText: '取消'
      });
    },
    buy_store() {
      this.$refs.buy.visible = true;
    },
    update_store() {
        this.$refs.edit.showModal()
    }
  }
};
</script>
