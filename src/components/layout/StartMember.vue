<template>
  <div style="height: 64px;">
    <div @click="showModal" style="display: inline-block;" class="member">开通会员</div>
    <a-modal
      title="开通会员"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :footer="null"
      width="600px"
      ref="modal"
    >
      <a-row>
        <a-col :span="16">
          <a-row>
            <a-col @click="member1" :span="12">
              <price :price="member.one_month.price" :time="member.one_month.duration" :a="a1" />
            </a-col>
            <a-col @click="member2" :span="12">
              <price :price="member.two_month.price" :time="member.two_month.duration" :a="a2" />
            </a-col>
            <a-col @click="member3" style="margin-top: 10px;" :span="12">
              <price :price="member.three_month.price" :time="member.three_month.duration" :a="a3" />
            </a-col>
            <a-col @click="member4" style="margin-top: 10px;" :span="12">
              <price :price="member.six_month.price" :time="member.six_month.duration" :a="a4" />
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="8" style="color: #666; ">
          <a-row>{{ description }}</a-row>
          <a-row style="margin-top: ">
            <a-button @click="confirm" type="primary" style="width: 100%; margin-top: 15px;">确认</a-button>
          </a-row>
        </a-col>
      </a-row>
    </a-modal>
    <a-divider></a-divider>
  </div>
</template>
<script>
import price from "@/components/layout/price";
import { start_member_description } from "@/api/user";
import { member } from "@/api/userinfo";
export default {
  components: {
    price
  },
  data() {
    return {
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      a1: false,
      a2: false,
      a3: false,
      a4: false,
      description: "",
      member: {
        one_month: { price: 0, duration: "一月" },
        two_month: { price: 0, duration: "两月" },
        three_month: { price: 0, duration: "三月" },
        six_month: { price: 0, duration: "六月" }
      }, // 开通时长 1 2 3 6 月
      time: "" // 用户选中的时长
    };
  },

  beforeMount() {
    this.member_description();
  },
  watch: {
    visible: function(newVal, oldVal) {
      if (newVal == false) {
        this.time = "";
      }
    }
  },
  methods: {
    confirm() {
      console.log(this.time);
      if (!this.time) {
        this.$message.error("请选择套餐");
        return false;
      }

      // 点击确认时
      const self = this;
      this.$confirm({
        title: "套餐确认！",
        content:
          "月租用户购买后时间将叠加至现有截止时间，非月租用户将转为月租用户",
        onOk() {
          member({ time: self.time }).then(response => {
            console.log(response);
            self.$message.success("购买成功");
            self.reset()
          });

        },
        onCancel() {},
        okText: "确认",
        cancelText: "取消"
      });
    },
    reset() {
        this.visible = false
      this.time = "";
      this.a1 = false;
      this.a2 = false;
      this.a3 = false;
      this.a4 = false;
    },
    member1() {
      this.a1 = true;
      this.a2 = false;
      this.a3 = false;
      this.a4 = false;
      this.time = 1;
    },
    member2() {
      this.a1 = false;
      this.a2 = true;
      this.a3 = false;
      this.a4 = false;
      this.time = 2;
    },
    member3() {
      this.a1 = false;
      this.a2 = false;
      this.a3 = true;
      this.a4 = false;
      this.time = 3;
    },
    member4() {
      this.a1 = false;
      this.a2 = false;
      this.a3 = false;
      this.a4 = true;
      this.time = 6;
    },

    member_description() {
      start_member_description().then(response => {
        this.description = response.data.description;
        this.member = response.data.money;
      });
    },
    showModal() {
      // 判断用户角色
      if (this.$store.getters.info.role_id == 1) {
        this.$message.info("管理员无法开通");
        return;
      }

      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.member {
  font: 12px/1.5;
  padding: 0;
  cursor: pointer;
  display: inline-block;
  margin: 0 5px;
  border: 1px solid #f9d681;
  background-color: #f9d681;
  color: #351d06;
  width: 100px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  border-radius: 15px;
}
</style>
