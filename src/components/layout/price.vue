<template>
    <div style="display: inline-block; width: 160px; height: 67px; border-radius: 5px; cursor: pointer;" v-bind:class="{changeColor:a, originColor: !a}">
        <a-row>
            <a-col style="line-height: 65px; background: #ededed; text-align: center; font-size: 24px; font-weight: 500; color: #707070;"  :span="10">{{time}}</a-col>
            <a-col style="font-size: 24px;  font-weight: 600px; color: #f5622e; line-height: 65px;" :span="14">￥{{ price }}</a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    props:{
        time: {
            type: String,
            default: '一月'
        },
        price: {
            type: Number,
            default: 1500
        },
        a: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style>

.changeColor{
    border: 1px solid blue;
}
.originColor{
    border: 1px solid #ccc;
}
</style>