<template>
  <div :style="{display: 'inline'}">
    <a-button @click="showDrawer" type="primary" size="small">详</a-button>
    <a-drawer width="640" placement="right" :closable="true" @close="onClose" :visible="visible">
      <p :style="[pStyle, pStyle2]" style="text-align: center">凭证详情</p>
      <a-row>
        <a-col :span="12">
          <description-item title="入库人：" :content="text.input.name" />
        </a-col>
        <a-col :span="12">
          <description-item title="所有者：" v-if="text.son" :content="text.son.name" />
          <description-item title="所有者：" v-else :content="text.user.name" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <description-item title="游戏名称：" :content="text.price.game.name" />
        </a-col>
        <a-col :span="12">
          <description-item title="面值名称：" :content="text.price.gold" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <description-item title="面值价格：" :content="text.price.money" />
        </a-col>
        <a-col :span="12">
          <description-item title="库存单号：" :content="text.identifier" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <description-item title="入库时间：" :content="text.created_at" />
        </a-col>
        <a-col :span="12">
          <description-item title="币值：" :content="text.currency" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <description-item title="购买时间：" :content="apple.buy_time" />
        </a-col>
      </a-row>
      <a-divider />
      <a-row>
        <a-collapse @change="changeActivekey">
          <a-collapse-panel :style="{textAlign: 'center'}" header="凭证内容" key="1" :showArrow="false">
            <p>{{ apple.receipt }}</p>
          </a-collapse-panel>
        </a-collapse>
      </a-row>
    </a-drawer>
  </div>
</template>
<script>
import descriptionItem from "./descriptionItem";
import { detail } from "@/api/stock";
import { resolve } from "q";
export default {
  props: {
    text: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      },
      pStyle2: {
        marginBottom: "24px"
      },
      apple: {}
    };
  },
  components: {
    descriptionItem
  },
  methods: {
    showDrawer() {
      this.detail();

      console.log(this.text);
    },
    onClose() {
      this.visible = false;
    },

    detail() {
      new Promise(resolve => {
        detail({ id: this.text.id }).then(response => {
          console.log(response)
          // return
          this.apple = response.data;
          this.visible = true;
        });
      });
    },

    changeActivekey(key) {
      console.log(key);
    }
  }
};
</script>
