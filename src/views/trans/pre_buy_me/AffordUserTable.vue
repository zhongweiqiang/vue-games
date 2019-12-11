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
          :scroll="{ x: 800 }"
        >
          <span slot="user" slot-scope="text">{{text.user.nickname}}</span>
          <!-- <span slot="game" slot-scope="text">{{text.game.name}}</span>
          <span slot="price" slot-scope="text">{{text.price.gold}}</span>-->
          <span slot="total_money" slot-scope="text">{{text.unit * text.unit_price}}</span>
          <span slot="owner_user_id" slot-scope="text">
            <div v-if="text.son">{{ text.son.name }}</div>
            <div v-else>{{ text.user.name }}</div>
          </span>
          <span slot="expire_time" slot-scope="text">
            <a-statistic-countdown v-if="text.status == '未供货' || text.status == '部分供货'"
              :value="(new Date(text.expire_time)).getTime()"
              format="D 天 H 时 m 分 s 秒"
            />
            <div v-else>{{ text.status }}</div>
          </span>
          <span slot="action" slot-scope="text">
            <a-button type="primary" size="small" :disabled="text.status == '完全供货' || text.status == '惩罚' || Date.now() > (new Date(text.expire_time)).getTime()" @click="punish(text.id)">惩罚</a-button>

          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { affordUser, punish } from "@/api/buy";
// import OnSearch from "./OnSearch";
// import DropDown from './DropDown'

const columns = [
  // {
  //   title: "id",
  //   dataIndex: "id",
  //   sorter: true,
  //   align: "center"
  // },
  {
    title: "用户昵称",
    key: "user",
    align: "center",
    scopedSlots: { customRender: "user" },
    fixed: "left"
  },
  // {
  //   title: "游戏名称",
  //   key: "game",
  //   align: "center",
  //   scopedSlots: { customRender: "game" }
  // },
  // {
  //   title: "面值名称",
  //   key: "price",
  //   align: "center",
  //   scopedSlots: { customRender: "price" }
  // },
  {
    title: "供货总数",
    dataIndex: "default_unit",
    align: "center"
  },
  {
    title: "未供数量",
    dataIndex: "unit",
    align: "center"
  },
  //   {
  //   title: "剩余数量",
  //   dataIndex: "unit",
  //   align: "center"
  // },
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
  // {
  //   title: "状态",
  //   dataIndex: "status",
  //   align: "center"
  // },
  {
    title: "下单时间",
    dataIndex: "created_at",
    align: "center"
  },
  {
    title: "截止日期",
    key: "expire_time",
    scopedSlots: { customRender: "expire_time" },
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
  components: {
    // OnSearch,
    // DropDown
  },
  props: {
    id: {
      type: Number,
      default: null
    }
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
    this.fetch({ pageSize: this.pagination.pageSize, id: this.id });
    // this.tag_data();
    console.log(this.config);
  },

  methods: {
    onSearch(value) {
      this.search = value;
      this.fetch({ ...value, pageSize: this.pagination.pageSize });
    },

    onUpdate(id) {
      this.fetch({
        ...this.getPagination(),
        ...this.search,
        id
      });
    },

    buy() {
      this.onUpdate();
    },

    punish(id) {
      punish({ id }).then(response => {
        this.$message.success(response.message)
        this.onUpdate(id)
      })

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
      affordUser(params).then(response => {
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
.ant-statistic-content-value {
  font-size: 14px;
}
</style>