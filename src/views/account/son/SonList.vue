<template>
  <div>
    <a-row>
      <a-col :span="3" :xs="24" :sm="2" :md="2" :lg="2">
        <son-add :on-add="onAdd" />
      </a-col>
      <a-col
        v-if="hasPermission('son.user.search')"
        :span="8"
        :xs="24"
        :sm="3"
        :md="3"
        :lg="3"
        :style="{marginTop: '4px', marginLeft: '10px'}"
      >
        <a-input allowClear v-model="name" placeholder="请输入主账户名称" @search="search" size="small" />
      </a-col>
      <a-col
        :span="8"
        :xs="24"
        :sm="3"
        :md="3"
        :lg="3"
        :style="{marginTop: '4px', marginLeft: '20px'}"
      >
        <a-input allowClear v-model="son" placeholder="请输入子账户名称" size="small" />
      </a-col>

      <a-col
        :span="8"
        :xs="24"
        :sm="3"
        :md="3"
        :lg="3"
        :style="{marginTop: '4px', marginLeft: '20px'}"
      >
        <a-select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          style="width: 140px"
          size="small"
          @change="handleChange"
        >
          <a-select-option value="0">全部</a-select-option>
          <a-select-option value="1">启用</a-select-option>
          <a-select-option value="2">禁用</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="4" :sm="1" :md="1" :lg="1" :offset="1" :style="{marginTop: '4px'}">
        <a-button @click="search" size="small" type="primary" icon="search"></a-button>
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
        >
          <span slot="parent" v-if="text" slot-scope="text">{{text.name}}</span>
          <span slot="parent" v-else>无</span>
          <span slot="action" slot-scope="text">
            <!-- <a-button size="small" type="primary" @click="edit(text.id)" icon="edit" /> -->
            <son-edit :id="text.id" :on-edit="onEdit" />
            <a-button
              v-if="hasPermission('son.delete')"
              size="small"
              type="danger"
              @click="del(text.id)"
              icon="delete"
            />
            <a-button
              v-if="hasPermission('son.forbidden')"
              type="primary"
              size="small"
              @click="status(text.id)"
            >{{text.status == '禁用' ? '启' : '禁'}}</a-button>
            <stock-list :id="text.id" />
            <transfer />
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { index, del, status } from "@/api/son";
import SonAdd from "./SonAdd";
import SonEdit from "./SonEdit";
import Transfer from './Transfer'
import StockList from './StockList'
var columns = [
  {
    title: "id",
    dataIndex: "id",
    sorter: true,
    align: "center"
  },
  {
    title: "子账户名称",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "主账户名称",
    dataIndex: "user",
    align: "center"
  },
  {
    title: "账户类型",
    dataIndex: "type",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center"
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
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
  components: { SonAdd, SonEdit, Transfer, StockList },
  data() {
    return {
      data: [],
      pagination: { pageSize: 10 },
      loading: false,
      columns,
      // checked: false,

      // 给监听器使用的
      name: "",
      son: "",
      statusSearch: 0,
      filters: {}
    };
  },
  created() {},
  mounted() {
    // 首次加载页面获取数据
    this.fetch({ pageSize: this.pagination.pageSize });
  },
  watch: {
    name: function(newVal, oldVal) {
      if (newVal == "") {
        this.search();
      }
    },
    son: function(newVal, oldVal) {
      if (newVal == "") {
        this.search();
      }
    }
  },
  methods: {
    getPagination(){
      return {
        pageSize: this.pagination.pageSize,
        page: this.pagination.current,
        sortField: this.pagination.sortField,
        sortOrder: this.pagination.sortOrder,
      }
    },

    onAdd() {
      this.fetch({ pageSize: this.pagination.pageSize });
    },

    onEdit() {
      this.fetch(this.getPagination());
    },

    search() {
      index({ name: this.name, son: this.son, status: this.statusSearch }).then(
        response => {
          console.log(response);
          this.data = response.data.data;
          const pager = { ...this.pagination };
          pager.total = response.data.total;
          this.pagination = pager;
        }
      );
    },

    handleChange(value) {
      console.log(`selected ${value}`);
      this.statusSearch = value;
      this.search();
    },

    // 页面搜索
    onSearch(value, key) {
      if (value.trim() == "") {
        return false;
      }
    },

    status(id) {
      status({ id }).then(response => {
        console.log(response);
        this.fetch(this.pagination);
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
        pagination.total = data.total;
        this.pagination = pagination;
        this.loading = false;
      });
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