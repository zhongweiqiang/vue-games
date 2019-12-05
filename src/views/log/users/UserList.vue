<template>
  <div>
    <a-row>
      <a-col :span="18">
        <on-search @search="onSearch" />
      </a-col>
    </a-row>
    <!-- <a-row> -->
      <a-col>
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <span slot="user" v-if="text.user" slot-scope="text">{{text.user.name}}</span>
          <span slot="user" v-else-if="text.son" slot-scope="text">{{text.son.name}}</span>
          <span slot="user" v-else>身份验证失败</span>


        </a-table>
      </a-col>
    <!-- </a-row> -->
    <a-divider></a-divider>
  </div>
</template>

<script>
import { user } from "@/api/log";
import OnSearch from "./OnSearch";
const columns = [
  {
    title: "id",
    dataIndex: "id",
    sorter: true,
    align: "center"
  },
    {
    title: "所属用户",
    key: "user",
    align: "center",
    scopedSlots: { customRender: "user" }
  },
  {
    title: "登录ip",
    dataIndex: "login_ip",
    align: "center",
  },
  {
    title: "描述",
    dataIndex: "description",
    align: "center",
  },
  {
    title: "登录时间",
    dataIndex: "created_at",
    align: "center"
  },

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
      filters: {},
            search: {}
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
      this.search = value
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
        ...filters, // 此处放搜索字段
        ...this.search
      });
    },

    // 获取首页数据
    fetch(params = {}) {
      // console.log("params:", params);
      this.loading = true;
      user(params).then(response => {
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
  }
};
</script>

<style>
.ant-table-tbody > tr > td {
  padding: 4px 8px;
  text-align: center;
}
</style>