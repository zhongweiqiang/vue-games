<template>
  <div>
    <a-date-picker
      :mode="mode1"
      showTime
      @openChange="handleOpenChange1"
      @panelChange="handlePanelChange1"
      @change="onChange"
      style="width: 100%;"
      size="small"
      placeholder="选择开始时间"
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
      value: [],

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
      console.log("hello world");
    },
    handlePanelChange1(value, mode) {
      this.mode1 = mode;
    },
    handlePanelChange2(value, mode) {
    //   console.log(value);
      this.value = value;
      this.mode2 = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1]
      ];
    },

    onChange(date, dateString) {
    //   console.log(date, dateString);
      this.$emit('change', dateString)
    }
  }
};
</script>
