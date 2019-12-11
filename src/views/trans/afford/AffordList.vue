<template>
  <div>
    <a-row>
      <a-col style="margin-top: 20px;">
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          :scroll="{ x: 1100 }"
        >
          <span slot="user" slot-scope="text">{{text.user.nickname}}</span>
          <span slot="game" slot-scope="text">{{text.price.game.name}}</span>
          <span slot="price" slot-scope="text">{{text.price.gold}}</span>
          <span slot="total_money" slot-scope="text">{{text.default_unit * text.unit_price}}</span>
          <span slot="owner_user_id" slot-scope="text">
            <div v-if="text.son">{{ text.son.name }}</div>
            <div v-else>{{ text.user.name }}</div>
          </span>
          <span slot="action" slot-scope="text">
            <a-button type="primary" size="small" :disabled="text.unit == 0" @click="finish(text.id)">供货</a-button>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { index, finish, done } from "@/api/afford";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    sorter: true,
    align: "center",
    fixed: "left"
  },
  {
    title: "供货账户",
    key: "user",
    align: "center",
    scopedSlots: { customRender: "user" }
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
    title: "供货总量",
    dataIndex: "default_unit",
    align: "center"
  },
    {
    title: "供货数量",
    dataIndex: "unit",
    align: "center"
  },
  {
    title: "订单单价",
    dataIndex: "unit_price",
    align: "center"
  },
  {
    title: "订单总价",
    key: "total_money",
    align: "center",
    scopedSlots: { customRender: "total_money" }
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center"
  },
  {
    title: "发布时间",
    dataIndex: "created_at",
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
    // OnSearch,
    // DropDown
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

    buy() {
      this.onUpdate();
    },

    getPagination() {
      return {
        pageSize: this.pagination.pageSize,
        page: this.pagination.current,
        sortField: this.pagination.sortField,
        sortOrder: this.pagination.sortOrder
      };
    },

    finish(id) {
      console.log(id);
      finish({ id }).then(response => {
        console.log(response);
        const self = this;
        this.$confirm({
          title: "确认供货?",
          content: response.message,
          onOk() {
            self.done(id)
          },
          onCancel() {},
          okText: '确认',
          cancelText: '取消'
        });
      });
    },

    done(id){
        done({id}).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.onUpdate()
        })
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

    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    }
  }
};
</script>

<style>
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