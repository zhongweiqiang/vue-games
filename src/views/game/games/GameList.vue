<template>
  <div>
    <a-row style="margin-bottom: 10px;">
      <a-col :span="3" :xs="24" :sm="5" :md="4" :lg="3">
        <game-add :on-add="onAdd" />
      </a-col>
      <a-col :span="8" :xs="24" :sm="10" :md="4" :lg="4">
        <a-input-search
          allowClear
          v-model="name"
          placeholder="请输入游戏名称"
          size="small"
          @search="onGameSearch"
          enterButton
        />
      </a-col>
      <a-col :span="8" :xs="24" :sm="10" :md="5" :lg="5" :offset="1">
        <a-input-search
          allowClear
          v-model="productIdentifier"
          placeholder="请输入游戏包名"
          size="small"
          @search="onProductSearch"
          enterButton
        />
      </a-col>

      <a-col :span="8" :xs="24" :sm="10" :md="5" :lg="5" :offset="1">
        <a-select
          allowClear
          placeholder="游戏状态"
          optionFilterProp="children"
          style="width: 80%"
          size="small"
          @change="handleTypeChange"
        >
          <a-select-option value="1">启用</a-select-option>
          <a-select-option value="2">禁用</a-select-option>
        </a-select>
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
          :scroll="{ x: 900 }"
        >
          <span slot="parent" v-if="text" slot-scope="text">{{text.title}}</span>
          <span slot="parent" v-else>无</span>
          <span slot="action" slot-scope="text">
            <game-edit :id="text.id" :on-edit="onEdit" />
            <a-button size="small" type="danger" @click="del(text.id)" icon="delete" />
            <a-button
              :type=" text.status == '禁用'? 'danger' : 'primary'"
              size="small"
              @click="status(text.id)"
            >{{text.status == '禁用' ? '启' : '禁'}}</a-button>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { index, del, detail, status } from "@/api/game";
import GameAdd from "./GameAdd";
import GameEdit from "./GameEdit";
const columns = [
  {
    title: "id",
    dataIndex: "id",
    sorter: true,
    align: "center",
    // fixed: "left"
  },
  {
    title: "游戏名称",
    dataIndex: "name",
    align: "center",
    // fixed: "left"
  },
  {
    title: "游戏包名",
    dataIndex: "productIdentifier",
    align: "center"
  },
  {
    title: "游戏描述",
    dataIndex: "description",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center"
  },
  {
    title: "添加时间",
    dataIndex: "created_at",
    align: "center"
  },
  {
    title: "修改时间",
    dataIndex: "updated_at",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
    // fixed: "right"
  }
];
export default {
  components: { GameAdd, GameEdit },
  data() {
    return {
      data: [],
      pagination: { pageSize: this.$store.getters.pagesize },
      loading: false,
      columns,
      // checked: false,

      // 给监听器使用的
      name: "",
      filters: {},
      productIdentifier: ""
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
    },
    productIdentifier: function(newVal, oldVal) {
      if (newVal == "") {
        this.fetch({ pageSize: this.pagination.pageSize });
      }
    },
  },
  methods: {
    onGameSearch(value) {
      if (value == "") {
        return false;
      }
      this.onSearch({ name: value });
    },

    onProductSearch(value) {
      if (value == "") {
        return false;
      }
      this.onSearch({ productIdentifier: value });
    },

    handleTypeChange(value){
      this.onSearch({ status: value });
    },

    // 页面搜索
    onSearch(value) {
      index(value).then(response => {
        console.log(response);
        this.data = response.data.data;
        const pager = { ...this.pagination };
        pager.total = response.data.total;
        this.pagination = pager;
      });
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