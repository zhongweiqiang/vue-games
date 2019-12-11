<template>
  <div style="background: #ECECEC; padding: 30px; padding-bottom: 100px; min-width=500px">
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="data.table"
      :loading="loading"
      :pagination="false"
    ></a-table>
  </div>
</template>
<script>
import reqwest from "reqwest";
const columns = [
  {
    title: "入库总额",
    dataIndex: "money",
    align: "center"
  },
  {
    title: "入库次数",
    dataIndex: "number",
    align: "center"
  },
  {
    title: "入库时间",
    dataIndex: "time",
    align: "center"
  }
];

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      columns
    };
  }
};
</script>
