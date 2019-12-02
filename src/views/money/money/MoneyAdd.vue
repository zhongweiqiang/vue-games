<template>
  <div>
    <a-button size="small" type="primary" :style="{marginTop: '4px'}" @click="showModal">
      <slot>
        <a-icon type="plus" />申请
      </slot>
    </a-button>
    <a-modal
      title="资金申请"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="操作类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            showSearch
            placeholder="操作类型"
            v-decorator="['type', { rules: [{ required: true, message: '请选择操作类型' }] }]"
          >
            <a-select-option value="1">充值</a-select-option>
            <a-select-option value="2">提现</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="操作金额" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['money', { rules: [{ required: true,type: 'number',                    transform(value) {
                      if(value){
                        return Number(value);
                      }
                    }, message: '操作金额必须填写且为数字' }] }]"
            placeholder="请输入金额"
          />
        </a-form-item>
        <a-form-item label="账户类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            v-decorator="[
          'account_type',
          { rules: [{ required: true, message: '必须选择账户类型' }] },
        ]"
            placeholder="请选择账户类型"
          >
            <a-select-option value="1">支付宝</a-select-option>
            <a-select-option value="2">微信</a-select-option>
            <a-select-option value="3">其他</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="打款账户" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['account', { rules: [{ required: true, message: '账户名必须添加' }] }]"
            placeholder="请输入打款账户"
          />
        </a-form-item>
        <a-form-item label="真实姓名" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['real_name', { rules: [{ required: true, message: '真实姓名必须填写' }] }]"
            placeholder="请输入真实姓名"
          />
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-textarea
            v-decorator="['description']"
            placeholder="请输入备注"
            :autosize="{ minRows: 1, maxRows: 3 }"
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
import { apply } from "@/api/money";
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
    onAdd: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      roles: []
    };
  },
  created() {
    // this.getRoleList();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.form.resetFields();
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.confirmLoading = true;
          apply(values).then(response => {
            console.log(response)
            this.onAdd();
            this.$message.success(response.message);
            this.visible = false;
            this.confirmLoading = false;
            this.form.resetFields();
          });
        }
      });
    }
  }
};
</script>
