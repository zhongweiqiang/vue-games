<template>
  <div style="display: inline;">
    <a-button size="small" type="primary" @click="showDrawer" style="margin-top: 4px;">
      <a-icon type="edit" />
    </a-button>
    <a-drawer
      title="用户详情修改"
      :width="520"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
      :destroyOnClose="true"
    >
      <a-form :form="form" layout="vertical" @submit="handleSubmit">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="用户昵称">
              <a-input
                v-decorator="['name', {
                  rules: [{ required: true, message: '请输入用户昵称' }]
                }]"
                placeholder="请输入用户昵称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="用户昵称">
              <a-input
                v-decorator="['nickname', {
                  rules: [{ required: true, message: '请输入用户昵称' }]
                }]"
                placeholder="请输入用户昵称"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="账户余额">
              <a-input
                v-decorator="['money', {
                  rules: [{ required: false }]
                }]"
                placeholder="请输入账户余额"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="过期时间">
              <a-date-picker
                @change="onChange"
                v-decorator="['expire_time', {
                  rules: [{ required: true, message: '请输入过期时间' }]
                }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="收费方式">
              <a-select
                v-decorator="['charge_status', {
                  rules: [{ required: true, message: '请选择收费方式' }]
                }]"
                placeholder="请选择收费方式"
              >
                <a-select-option value="1">月租收费</a-select-option>
                <a-select-option value="2">出库收费</a-select-option>
                <a-select-option value="3">免费用户</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否可添加游戏包名">
              <a-select
                v-decorator="['admin', {
                  rules: [{ required: true, message: '请选择' }]
                }]"
                placeholder="请选择"
              >
                <a-select-option value="1">可添加</a-select-option>
                <a-select-option value="2">不可添加</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="首次登陆是否需启用">
              <a-select
                v-decorator="['save_device', {
                  rules: [{ required: true, message: '请选择是否需启用' }]
                }]"
                placeholder="请选择"
              >
                <a-select-option value="1">需启用</a-select-option>
                <a-select-option value="2">无需启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="出库跳过已使用凭证">
              <a-select
                v-decorator="['pass_store', {
                  rules: [{ required: true, message: '请选择' }]
                }]"
                placeholder="请选择"
              >
                <a-select-option value="1">跳过</a-select-option>
                <a-select-option value="2">不跳过</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item :wrapper-col="{ span: 24, offset: 0 }">
          <a-row>
            <a-col :span="8" :offset="16">
              <a-button size="small" :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
              <a-button size="small" type="primary" html-type="submit">提交</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>
<script>
import { edit, detail } from "@/api/userinfo";
import moment from 'moment'
export default {
  name: "PermEdit",
  props: {
    onEdit: {
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
      form: this.$form.createForm(this),
      visible: false,
      perms: [],
      dateFormat: "YYYY-MM-DD"
    };
  },
  mounted() {},
  methods: {
    /**
     * display drawer when click edit button and load perm data
     */
    showDrawer() {
      console.log(this.info);
      this.detail();
    },
    onClose() {
      this.visible = false;
    },

    /**
     * datepicker method
     */
    onChange(date, dateString) {
      console.log(date, dateString);
    },

    /**
     * display detailed data for a specific id
     */
    detail() {
      new Promise(resolve => {
        detail({ id: this.info.id }).then(response => {
          delete response.data.id;
          this.visible = true;
          resolve(response);
          response.data.expire_time = moment(response.data.expire_time, this.dateFormat);
        });
      }).then(response => {
        this.form.setFieldsValue(response.data);
      });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          values.id = this.info.id;
          edit(values).then(response => {
            console.log(response);
            this.onEdit();
            this.$message.success(response.message);
            setTimeout(() => {
              this.onClose();
            }, 100);
          });
        }
      });
    }
  }
};
</script>
