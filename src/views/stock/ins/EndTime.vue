<template>
  <div>
    <a-date-picker
      :mode="mode1"
      showTime
      @openChange="handleOpenChange1"
      @panelChange="handlePanelChange1"
      @change="onChange"
      size="small"
      style="width: 100%;"
      placeholder="选择截止时间"
      
    />
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      mode1: "time",
      mode2: ["month", "month"],
      value: []
    };
  },
  methods: {
    handleOpenChange1(open) {
      if (open) {
        this.mode1 = "date";
      }
    },
    handleChange(value) {
      this.value = value;
    },
    handlePanelChange1(value, mode) {
      this.mode1 = mode;
    },
    handlePanelChange2(value, mode) {
      this.value = value;
      this.mode2 = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1]
      ];
    },
    onChange(date, dateString) {
    //   console.log(date, dateString);
      this.$emit("change", dateString);
    }
  }
};
</script>

<style scoped>
.ant-calendar-picker{
  width: 110%;
}
.ant-calendar-picker-small{
  width: 110%;
}
</style>
