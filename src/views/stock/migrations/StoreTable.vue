<template>
  <div>
    <a-row style="background: #fff;clear:both;">
      <a-col>
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
           style="background: #fff"
        >
          <span slot="game" slot-scope="text">{{text.price.game.name}}</span>
          <span slot="price" slot-scope="text">{{text.price.gold}}</span>
          <span slot="money" slot-scope="text">{{text.price.money}}</span>
          <!-- <span slot="owner_user_id" slot-scope="text">
            <div v-if="text.son">{{ text.son ? text.son.name : '已删除' }}</div>
            <div v-else>{{ text.user ? text.user.name : '已删除' }}</div>
          </span> -->
          <span slot="use_time" v-if="text" slot-scope="text">{{text}}</span>
          <span slot="use_time" v-else>未使用</span>

          <span slot="parent" v-if="text" slot-scope="text">{{text.title}}</span>
          <span slot="parent" v-else>无</span>

        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import { index, del, status } from "@/api/stock";
import { ownerLessStock } from '@/api/migration'

// import OnSearch from "./Onsearch";
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
];

export default {
  components: {
    // DropDown,
    // Detail,
    // OnSearch
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
      pagination: { pageSize: 10 },
      loading: false,
      columns: columns,
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
      ownerLessStock(params).then(response => {
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