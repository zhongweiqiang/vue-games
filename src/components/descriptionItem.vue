<template>
  <div style="font-size: 14px; line-height: 22px; margin-bottom: 7px; color: rgba(0, 0, 0, 0.65);">
    

    <a-row>
      <a-col :span="6" style="text-align: right">
<p style="margin-right: 8px; display: inline-block; color: rgba(0, 0, 0, 0.85);">{{title}}</p>
      </a-col>
      <a-col :span="17" :offset="1">
        {{ content }}
      </a-col>
    </a-row>
    
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    }
  }
};
</script>

<style>
</style>