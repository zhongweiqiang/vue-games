<template>
  <div>
    <a-row>
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
          :scroll="{ x: 1200 }"
        >
          <span slot="money" slot-scope="text">{{text.money}}元</span>
          <span
            slot="totalMoney"
            slot-scope="text"
          >{{parseInt(text.total) * parseFloat(text.money)}}</span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { index } from "@/api/statistic";
import OnSearch from "./OnSearch";
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
    align: "center",
    fixed: "left"
  },
  {
    title: "面值名称",
    dataIndex: "gold",
    align: "center",
    fixed: "left"
  },
  {
    title: "面值价格",
    key: "money",
    align: "center",
    scopedSlots: { customRender: "money" },
    fixed: "left"
  },
  {
    title: "正常有效",
    dataIndex: "s1",
    align: "center"
  },
  {
    title: "已使用",
    dataIndex: "s2",
    align: "center"
  },
  {
    title: "使用失败",
    dataIndex: "s4",
    align: "center"
  },
  {
    title: "后台恢复",
    dataIndex: "s5",
    align: "center"
  },
  {
    title: "手机端已获取",
    dataIndex: "s6",
    align: "center"
  },
  {
    title: "凭证上架",
    dataIndex: "s8",
    align: "center"
  },
  {
    title: "禁止使用",
    dataIndex: "s7",
    align: "center"
  },

  {
    title: "总数",
    dataIndex: "total",
    align: "center",
    fixed: "right"
  }
];
export default {
  components: { OnSearch },
  data() {
    return {
      data: [],
      pagination: { pageSize: 15 },
      loading: false,
      columns,
      totalMoney: 0,
      // checked: false,

      // 给监听器使用的
      name: "",
      filters: {}
    };
  },
  mounted() {
    // 首次加载页面获取数据
    this.fetch({ pageSize: this.pagination.pageSize });
    // this.tag_data();
    console.log(this.config);
  },
  watch: {
    name: function(newVal, oldVal) {
      if (newVal == "") {
        this.fetch({ pageSize: this.pagination.pageSize });
      }
    }
  },
  methods: {
    // 页面搜索
    onSearch(value) {
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

    onAdd() {
      this.fetch({ pageSize: this.pagination.pageSize });
    },

    onEdit() {
      this.fetch(this.getPagination());
    },

    // 点击状态修改时
    status(id) {
      status({ id }).then(response => {
        // console.log(response);
        this.fetch(this.getPagination());
      });
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
        ...filters // 此处放搜索字段
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
    },

    // 删除用户
    del(id) {
      const self = this;
      this.$confirm({
        content: "确认删除？",
        cancelText: "取消",
        okText: "删除",
        onOk() {
          return new Promise((resolve, reject) => {
            del({ id }).then(response => {
              self.$message.success("删除成功");
              self.fetch({
                pageSize: self.pagination.pageSize,
                page: self.pagination.current,
                sortField: self.pagination.sortField,
                sortOrder: self.pagination.sortOrder,
                ...self.filters
              });
              self.destroyAll();
            });
          });
        },
        onCancel() {
          self.destroyAll();
          self.$message.info("取消删除", 2);
        }
      });
    },

    destroyAll() {
      this.$destroyAll();
    }

    // tag标签数据
    // tag_data() {
    //   tag_data().then(response => {
    //     this.total = response.data.total;
    //     this.start = response.data.start;
    //   });
    // }
  }
};
</script>

<style>
.ant-table-tbody > tr > td {
  padding: 4px 8px;
  text-align: center;
}
</style>