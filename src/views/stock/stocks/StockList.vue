<template>
  <div>
    <a-row style="z-index: 2;">
      <a-col :span="20">
        <on-search @search="onSearch" />
      </a-col>
      <a-col :span="2" style="margin-top: 17px;">
        <a-button v-if="hasPermission('stock.delete')" type="danger" size="small" :disabled="selectedRowKeys.length<1" @click="del">删除凭证</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col style="margin-top: 25px;">
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          :scroll="{ x: 1300 }"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        >
          <span slot="game" slot-scope="text">{{text.price.game.name}}</span>
          <span slot="price" slot-scope="text">{{text.price.gold}}</span>
          <span slot="money" slot-scope="text">{{text.price.money}}</span>
          <span slot="owner_user_id" slot-scope="text">
            <div v-if="text.son">{{ text.son.name }}</div>
            <div v-else>{{ text.user.name }}</div>
          </span>
          <span slot="use_time" v-if="text" slot-scope="text">{{text}}</span>
          <span slot="use_time" v-else>未使用</span>

          <span slot="parent" v-if="text" slot-scope="text">{{text.title}}</span>
          <span slot="parent" v-else>无</span>
          <span slot="action" slot-scope="text">
            <drop-down :id="text.id" @update="onUpdate" />
            <detail :text="text" />
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { index, del } from "@/api/stock";
import DropDown from "./DropDown";
import Detail from "./Detail";

import OnSearch from "./Onsearch";
const columns = [
  {
    title: "id",
    dataIndex: "id",
    sorter: true,
    align: "center",
    fixed: "left"
  },
  {
    title: "游戏名称",
    key: "game",
    align: "center",
    scopedSlots: { customRender: "game" },
  },
  {
    title: "面值名称",
    key: "price",
    align: "center",
    scopedSlots: { customRender: "price" },
  },
  {
    title: "面值价格",
    key: "money",
    align: "center",
    scopedSlots: { customRender: "money" }
  },
  {
    title: "库存单号",
    dataIndex: "identifier",
    align: "center"
  },
  {
    title: "所属用户",
    key: "owner_user_id",
    align: "center",
    scopedSlots: { customRender: "owner_user_id" }
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center"
  },
  {
    title: "入库时间",
    dataIndex: "created_at",
    align: "center"
  },

  {
    title: "使用时间",
    dataIndex: "use_time",
    align: "center",
    scopedSlots: { customRender: "use_time" }
  },
  {
    title: "币值",
    dataIndex: "currency",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
    fixed: "right"
  }
];
export default {
  components: {
    DropDown,
    Detail,
    OnSearch
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      data: [],
      pagination: { pageSize: 12 },
      loading: false,
      columns,
      selectedRowKeys: [],

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

  methods: {
    onSearch(value) {
      this.search = value;
      this.fetch({ ...value, pageSize: this.pagination.pageSize });
    },

    onUpdate() {
      this.fetch({
        ...this.getPagination(),
        ...this.search
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

    destroyAll() {
      this.$destroyAll();
    },

    // tag标签数据
    // tag_data() {
    //   tag_data().then(response => {
    //     this.total = response.data.total;
    //     this.start = response.data.start;
    //   });
    // }
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    
    del(id) {
      const self = this;
      this.$confirm({
        content: "确认删除？",
        cancelText: "取消",
        okText: "删除",
        onOk() {
          return new Promise((resolve, reject) => {
            // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)

            del({ id: self.selectedRowKeys }).then(response => {
              self.$message.success(response.message);
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
  }
};
</script>

<style scoped>
.ant-table-tbody > tr > td {
  padding: 4px 8px;
  text-align: center;
}
.search {
  margin-top: 10px;
}
.ant-row {
  height: 24px;
}
.ant-form-item-control {
  line-height: 24px;
}
</style>