<template>
  <div>
    <a-icon type="money" @click="showModal" />购买
    <a-modal
      title="发布商品"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="游戏名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input disabled :value="info.game.name" />
        </a-form-item>

        <a-form-item label="游戏面值" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input disabled :value="info.price.gold" />
        </a-form-item>

        <a-form-item label="订单单价" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input disabled :value="info.unit_price" />
        </a-form-item>

        <a-form-item label="订单数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input disabled :value="info.unit" />
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-textarea disabled :value="info.description" />
        </a-form-item>

        <a-form-item label="购买数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input-number
            :min="1"
            :max="info.unit"
            @change="onChange"
            v-decorator="['unit', { rules: [{ required: true, message: '购买必须填写且为数字', type: 'number', transform(value) {
                      if(value){
                        return Number(value);
                      }
                    }, }] }]"
            placeholder="请输入购买数量"
          />
        </a-form-item>
        <a-form-item label="总价" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input disabled :value="info.unit_price * count" />
        </a-form-item>


        <a-form-item label="二级密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input-password
            placeholder="输入二级密码"
            v-decorator="['password', { rules: [{ required: true, message: '购买必须填写且为数字' }] }]"
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 8, offset: 18 }">
          <a-row>
            <a-col :span="8" :style="{ textAlign: 'left' }">
              <a-button size="small" @click="handleCancel">返回</a-button>
            </a-col>
            <a-col :span="8" :style="{ textAlign: 'left' }">
              <a-button size="small" type="primary" html-type="submit">提交</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { buy } from "@/api/sale";
export default {
  props: {
    okText: {
      type: String,
      default: "提交"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    onBuy: {
      type: Function,
      default: null
    },
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      count: 0,
      max: 0
    };
  },
  created() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
            values.id = this.info.id
          this.confirmLoading = true;
          buy(values).then(response => {
            console.log(response);
            this.onBuy()
            this.$message.success(response.message);
            this.visible = false;
            this.confirmLoading = false;
            this.form.resetFields();
          });
        }
      });
    },
    onChange(value) {
      this.count = value;
    },
    showModal() {
      this.visible = true;
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.form.resetFields();
    }
  }
};
</script>

<style scoped>
.ant-input-number {
  margin-right: 10px;
  width: 100%;
}
</style>
