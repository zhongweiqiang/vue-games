<template>
  <div>
    <a-row style="z-index:2">
      <a-col :xs="16" :sm="16" :md="16" :lg="12" :xl="3" style="margin-top: 10px;">
        <price-add :on-add="onAdd" />
      </a-col>
      <a-col :xs="16" :sm="16" :md="16" :lg="5" :xl="5" style="margin-top: 10px;">
        <game-search @select="onSelect" />
      </a-col>
      <a-col :xs="16" :sm="16" :md="16" :lg="5" :xl="5" style="margin-top: 10px;">
        <a-input-search
          allowClear
          v-model="gold"
          placeholder="请输入面值名称"
          @search="onPriceSearch"
          enterButton
        />
      </a-col>

      <a-col :xs="16" :sm="16" :md="16" :lg="5" :xl="5" :offset="1" style="margin-top: 10px;">
        <a-select
          allowClear
          placeholder="面值状态"
          optionFilterProp="children"
          style="width: 140px"
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
          :scroll="{ x: 1000 }"
        >
          <span slot="action" slot-scope="text">
            <price-edit :id="text.id" :on-edit="onEdit" />
            <a-button size="small" type="danger" @click="del(text.id)" icon="delete" />
            <a-button
              type="primary"
              size="small"
              @click="status(text.id)"
            >{{text.status == '禁用' ? '启' : '禁'}}</a-button>
            <a-button size="small" type="primary" @click="pass(text.id)">跳</a-button>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { index, del, detail, status, pass } from "@/api/price";
import PriceAdd from "./PriceAdd";
import PriceEdit from "./PriceEdit";
import GameSearch from "./GameSearch";
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
    dataIndex: "name",
    align: "center"
  },
  {
    title: "面值名称",
    dataIndex: "gold",
    align: "center"
  },
  {
    title: "面值标识",
    dataIndex: "title",
    align: "center"
  },
  {
    title: "面值价格",
    dataIndex: "money",
    align: "center"
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
    width: 150,
    fixed: "right"
  }
];
export default {
  components: { PriceAdd, PriceEdit, GameSearch },
  data() {
    return {
      data: [],
      pagination: { pageSize: this.$store.getters.pagesize },
      loading: false,
      columns,

      // 给监听器使用的
      gold: "",
      filters: {},
      search: {},
      game_id: "",
      type: "", // 面值状态
    };
  },
  mounted() {
    // 首次加载页面获取数据
    this.fetch({ pageSize: this.pagination.pageSize });
    // this.tag_data();
    console.log(this.config);
  },
  watch: {
    gold: function(newVal, oldVal) {
      if (newVal == "") {
        this.fetch({
          pageSize: this.pagination.pageSize,
          game_id: this.game_id
        });
      }
    }
  },
  methods: {

    onPriceSearch(value){
      if (value.trim() == "") {
        return false;
      }
      this.gold = value
      this.onSearch()
    },
    // 页面搜索
    onSearch() {
      // if (value.trim() == "") {
      //   return false;
      // }
      index({ gold: this.gold, game_id: this.game_id, status: this.type }).then(response => {
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

    onSelect(game_id) {
      this.game_id = game_id;
      this.fetch({ ...this.pagination, game_id });
    },

    handleTypeChange(value) {
      this.type = value
      // this.
      this.onSearch()
    },

    // 点击状态修改时
    status(id) {
      status({ id }).then(response => {
        console.log(response);
        this.fetch(this.getPagination());
      });
    },

    // 入库跳过凭证验证
    pass(id) {
      const self = this;
      this.$confirm({
        content: "确认入库跳过该面值验证？",
        cancelText: "取消",
        okText: "跳过",
        onOk() {
          return new Promise((resolve, reject) => {
            pass({ id }).then(response => {
              self.fetch(self.getPagination());
              self.destroyAll();
            });
          });
        },
        onCancel() {
          self.destroyAll();
          self.$message.info("取消跳过", 2);
        }
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
        gold: this.gold,
        game_id: this.game_id
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