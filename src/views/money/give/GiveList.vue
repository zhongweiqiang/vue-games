<template>
  <a-row style="margin-top: 50px;">
    <a-col :xs="20" :sm="20" :md="20" :lg="10" :xl="10" :offset="2" v-if="data.we_url">
      <a-card hoverable style="width: 350px">
        <img
          alt="加载中..."
          :src="data.we_url"
          slot="cover"
        />
        <a-card-meta title="微信支付">
          <template slot="description">{{ data.we_account }}</template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :xs="20" :sm="20" :md="20" :lg="10" :xl="10" :offset="2" v-if="data.a_url">
      <a-card hoverable style="width: 350px">
        <img
          alt="加载中..."
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

<style scoped>
.pic{
    position: relative;
    margin-left:100px;
    margin-top:40px;
    width:550px;
    height:305px;
}
img{width:100%;
    height:100%;
}
.tu li{position:absolute;
        top:0;
        left:0;
        list-style: none;
    }
.img-enter-active,
.img-leave-active {
    transition: all 4s;
}
 
.img-enter,
.img-leave-to {
    opacity: 0;
}
 
.img-enter-to,
.img-leave {
    opacity: 1;
}
.aBtn{transition:all 4s ease;}
.bannerBtn li{
    float:left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    list-style:none;
}
.bannerBtn li a{
    margin-left:2.5px;
    margin-top:1.5px;
    display: block;
    width: 10px;
    height: 10px;
    border:0.5px solid white;
    border-radius: 50%;
}
.bannerBtn{
    width: 70px;
    position:absolute;
    left:35%;
    top:250px;
    bottom:22px;
    height:20px;
    text-align: center;
}
</style>
