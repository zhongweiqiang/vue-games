<template>
  <a-row style="margin-top: 50px;">
    <a-col :span="10" :offset="2">
      <a-card hoverable style="width: 350px">
        <img
          alt="example"
          :src="data.we_url"
          slot="cover"
        />
        <a-card-meta title="微信支付">
          <template slot="description">{{ data.we_account }}</template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="10">
      <a-card hoverable style="width: 350px">
        <img
          alt="example"
          :src="data.a_url"
          slot="cover"
        />
        <a-card-meta title="支付宝支付">
          <template slot="description">{{ data.ali_account }}</template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { picList } from '@/api/money'
export default {
    data(){
        return {
            data: {}
        }
    },
    created(){
        this.picList()
    },
    methods: {
        picList(){
            picList().then(response => {
                console.log(response)
                this.data = response.data
            })
        }
    }
}
</script>
