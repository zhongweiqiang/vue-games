<template>
  <div>
    <a-button size="small" type="primary" :style="{marginTop: '4px'}" @click="showModal">
      <slot>
        <a-icon type="plus" />面值
      </slot>
    </a-button>
    <a-modal
      title="面值添加"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
      width="35%"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="游戏名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            v-decorator="['game_id', { rules: [{ required: true, message: '必须选择游戏' }] },]"
            placeholder="请选择游戏"
            showSearch
            :filterOption="filterOption"
          >
            <a-select-option v-for="game in games" :value="game.id" :key="game.id">{{ game.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="面值名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['gold', { rules: [{ required: true, message: '面值名称必须填写' }] }]"
            placeholder="请输入面值名称"
          />
        </a-form-item>
        <a-form-item label="面值价格" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['money', { rules: [{ required: true, type: 'number',                    transform(value) {
                      if(value){
                        return Number(value);
                      }
                    }, message: '面值价格必须填写且为数字' }] }]"
            placeholder="请输入面值价格"
          />
        </a-form-item>
        <a-form-item label="面值标识" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['title', { rules: [{ required: true, message: '面值标识必须填写' }] }]"
            placeholder="请输入面值标识"
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
import { add } from "@/api/price";
import { select } from "@/api/game"
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
      games: []
    };
  },
  created() {},
  methods: {
    showModal() {
      this.getGameList()
      this.visible = true;
    },
    handleCancel(e) {
      this.visible = false;
      this.form.resetFields();
    },

    getGameList(){
      select().then(response => {
        this.games = response.data
      })
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log(values);
          this.confirmLoading = true;
          add(values).then(response => {
            this.onAdd();
            this.$message.success(response.message);
            this.visible = false;
            this.confirmLoading = false;
            this.form.resetFields();
          });
        }
      });
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  }
};
</script>
