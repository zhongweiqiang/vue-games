<template>
  <div>
    <a-drawer width="340" placement="right" :closable="false" @close="onClose" :visible="visible">
      <p :style="[pStyle, pStyle2]">用户详情</p>
      <a-row>
        <a-col>
          <description-item title="用户名" :content="info.name" />
        </a-col>
        <a-col>
          <description-item title="用户昵称" v-if="info.userinfo" :content="info.userinfo.nickname" />
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <description-item title="角色" :content="info.role.name" />
        </a-col>
        <a-col>
          <description-item title="登陆时间" :content="info.last_login_time" />
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <description-item title="登陆ip" :content="info.last_login_ip" />
        </a-col>
        <a-col>
          <description-item title="收费模式" v-if="info.userinfo" :content="info.userinfo.charge_status" />
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <description-item title="账户余额" v-if="info.userinfo" :content="info.userinfo.money" />
        </a-col>
        <a-col>
          <description-item title="冻结金额" v-if="info.userinfo" :content="info.userinfo.fro_money" />
        </a-col>
      </a-row>

      <a-divider />
      <!-- <p :style="pStyle">Company</p>
      <a-row>
        <a-col :span="12">
          <description-item title="Position" content="Programmer" />
        </a-col>
        <a-col :span="12">
          <description-item title="Responsibilities" content="Coding" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <description-item title="Department" content="AFX" />
        </a-col>
        <a-col :span="12">
          <description-item title="Supervisor">
            <a slot="content">Lin</a>
          </description-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <description-item
            title="Skills"
            content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
          />
        </a-col>
      </a-row>
      <a-divider />
      <p :style="pStyle">Contacts</p>
      <a-row>
        <a-col :span="12">
          <description-item title="Email" content="ant-design-vue@example.com" />
        </a-col>
        <a-col :span="12">
          <description-item title="Phone Number" content="+86 181 0000 0000" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <description-item title="Github">
            <a slot="content" href="https://github.com/vueComponent/ant-design-vue">
              github.com/vueComponent/ant-design-vue
            </a>
          </description-item>
        </a-col>
      </a-row>-->
    </a-drawer>
  </div>
</template>
<script>
import descriptionItem from "@/components/descriptionItem";
import { info } from '@/api/user'
export default {
  components: {
    descriptionItem
  },
  data() {
    return {
      visible: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px",
        textAlign: "center"
      },
      pStyle2: {
        marginBottom: "24px"
      },
      info: {
          userinfo:{},
          role: {}
      },

    };
  },

  created(){
      this.userinfo()
  },

  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    userinfo(){
        info().then(response => {
            console.log(response)
            this.info = response.data
        })
    }
  }
};
</script>
