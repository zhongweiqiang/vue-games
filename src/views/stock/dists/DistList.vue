<template>
  <div>
    <a-row style="z-index: 2;">
      <a-col :span="18">
        <on-search @search="onSearch" />
      </a-col>

      <a-col :span="2" :style="{float: 'right', marginRight: '20px', marginTop: '10px'}">
        <a-tag color="#108ee9">总额: {{ totalMoney }}</a-tag>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          width="500"
        >
          <span slot="action" slot-scope="text">
            <dist v-if="hasPermission('dist.dist')" :text="text" @dist="onDist" />
            <div v-else>无</div>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <!-- <a-divider></a-divider> -->
  </div>
</template>

<script>
import { index } from "@/api/dist";
import OnSearch from "./OnSearch";
import Dist from "./DistComponent";
const columns = [
  // {
  //   title: "id",
  //   dataIndex: "id",
  //   sorter: true,
  //   align: "center"
  // },
  {
    title: "游戏名称",
    dataIndex: "game_name",
    align: "center"
  },
  {
    title: "面值名称",
    dataIndex: "gold",
    align: "center"
  },
  {
    title: "面值价格",
    dataIndex: "money",
    align: "center"
  },

  {
    title: "总数",
    dataIndex: "total",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
export default {
  components: { OnSearch, Dist },
  data() {
    return {
      data: [],
      pagination: { pageSize: this.$store.getters.pagesize },
      loading: false,
      columns,
      totalMoney: 0,
      // checked: false,

      // 给监听器使用的
      search: {},
      filters: {}
    };
  },
  mounted() {
    // 首次加载页面获取数据
    this.fetch({ pageSize: this.pagination.pageSize });
    // this.tag_data();
    console.log(this.config);
  },

  methods: {
    // 页面搜索
    onSearch(value) {
      this.search = value;
      const pager = { ...this.pagination };
      // 将必要参数都放入pagination
      pager.current = 1;
      this.pagination = pager;
      this.fetch({ pageSize: this.pagination.pageSize, ...value });
    },

    getPagination() {
      return {
        pageSize: this.pagination.pageSize,
        page: this.pagination.current,
        sortField: this.pagination.sortField,
        sortOrder: this.pagination.sortOrder
      };
    },

    onDist() {
      this.fetch({ ...this.getPagination(), ...this.search });
    },

    // 表格参数改变时
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination);
      const pager = { ...this.pagination };
      // 将必要参数都放入pagination
      pager.current = pagination.current;
      pager.sortField = sorter.field;
      pager.sortOrder = sorter.order;
      this.pagination = pager;
      this.filters = filters;

      this.fetch({
        pageSize: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters, // 此处放搜索字段
        ...this.search
      });
    },

    // 获取首页数据
    fetch(params = {}) {
      // console.log("params:", params);
      this.loading = true;
      index(params).then(response => {
        console.log(response.data);
        const pagination = { ...this.pagination };
        let data = response.data;
        this.data = data.data;
        this.totalMoney = data.totalMoney;
        pagination.total = data.total;
        this.pagination = pagination;
        this.loading = false;
      });
      // 每次加载数据都重新获取一遍数据
      // this.tag_data();
    }
  }
};
</script>

<style>
.ant-table-tbody > tr > td {
  padding: 4px 8px;
  text-align: center;
}
</style>