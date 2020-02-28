<template>
  <div>
    <a-row style="z-index: 2; margin-bottom: 70px;">
      <a-col :span="20">
        <on-search @search="onSearch" />
      </a-col>
      <a-col :span="2" style="margin-top: 17px;">
        <a-button
          v-if="hasPermission('stock.delete')"
          type="danger"
          size="small"
          :disabled="selectedRowKeys.length<1"
          @click="del"
        >删除凭证</a-button>
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
          :rowSelection="role_id == 1 ? {selectedRowKeys: selectedRowKeys, onChange: onSelectChange} : null"
          style="min-width: 1100px;"
        >
          <span slot="game" slot-scope="text">{{text.price.game.name}}</span>
          <span slot="price" slot-scope="text">{{text.price.gold}}</span>
          <span slot="money" slot-scope="text">{{text.price.money}}</span>
          <span slot="owner_user_id" slot-scope="text">
            <div v-if="text.son">{{ text.son ? text.son.name : '已删除' }}</div>
            <div v-else>{{ text.user ? text.user.name : '已删除' }}</div>
          </span>
          <span slot="use_time" v-if="text" slot-scope="text">{{text}}</span>
          <span slot="use_time" v-else>未使用</span>

          <span slot="parent" v-if="text" slot-scope="text">{{text.title}}</span>
          <span slot="parent" v-else>无</span>
          <span slot="action" slot-scope="text">
            <drop-down v-if="hasPermission('stock.forbidden')" :id="text.id" @update="onUpdate" />
            <a-button style="margin-top: 2px;"
              v-if="!hasPermission('stock.forbidden')"
              type="primary"
              size="small"
              @click="restore(5, text.id)"
            >恢复</a-button>
            <a-button style="margin-top: 2px;"
              v-if="!hasPermission('stock.forbidden')"
              type="primary"
              size="small"
              @click="restore(2, text.id)"
            >已用</a-button>
            <detail v-if="hasPermission('stock.detail')" :text="text" />
          </span>
        </a-table>
      </a-col>
    </a-row>
    <!-- <a-divider></a-divider> -->
  </div>
</template>

<script>
import { index, del, status } from "@/api/stock";
import DropDown from "./DropDown";
import Detail from "./Detail";

import OnSearch from "./Onsearch";
const columns = [
  {
    title: "id",
    dataIndex: "id",
    sorter: true,
    align: "center"
    // fixed: "left"
  },
  {
    title: "游戏名称",
    key: "game",
    align: "center",
    scopedSlots: { customRender: "game" }
  },
  {
    title: "面值名称",
    key: "price",
    align: "center",
    scopedSlots: { customRender: "price" }
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
    align: "center"
    // fixed: "right"
  }
];

const normalColumns = [
  {
    title: "id",
    dataIndex: "id",
    sorter: true,
    align: "center"
    // fixed: "left"
  },
  {
    title: "游戏名称",
    key: "game",
    align: "center",
    scopedSlots: { customRender: "game" }
  },
  {
    title: "面值名称",
    key: "price",
    align: "center",
    scopedSlots: { customRender: "price" }
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
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
    // fixed: "right"
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
  created() {
    this.role_id = this.$store.getters.info.role_id;
  },

  watch: {},
  data() {
    return {
      data: [],
      pagination: { pageSize: this.$store.getters.pagesize },
      loading: false,
      columns: this.$store.getters.info.role_id == 1 ? columns : normalColumns,
      selectedRowKeys: [],
      role_id: 1,

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
  },

  methods: {
    onSearch(value) {
      const pager = { ...this.pagination };
      // 将必要参数都放入pagination
      pager.current = 1;
      this.pagination = pager;
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

    // 用户恢复凭证
    restore(stats, id) {
      console.log(status + "-++" + id);
      const self = this;
      let cnt = null;
      if (stats == 5) {
        cnt = "恢复";
      } else if (stats == 2) {
        cnt = "已使用";
      }
      this.$confirm({
        content: "确认" + cnt + "操作？",
        cancelText: "取消",
        okText: "确定",
        onOk() {
          return new Promise((resolve, reject) => {
            status({ id, status: stats }).then(response => {
              self.$message.success(response.message);
              self.onUpdate()
            });
            self.destroyAll();
          });
        },
        onCancel() {
          self.destroyAll();
          self.$message.info("取消" + cnt + "操作", 2);
        }
      });
    },

    // // 点击状态修改时
    // status(id) {
    //   status({ id }).then(response => {
    //     // console.log(response);
    //     this.fetch(this.getPagination());
    //   });
    // },

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
              self.selectedRowKeys = [];
            });
          });
        },
        onCancel() {
          self.destroyAll();
          self.$message.info("取消删除", 2);
        }
      });
    }
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