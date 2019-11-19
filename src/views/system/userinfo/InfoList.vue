<template>
  <div>
    <a-row>
      <!-- <a-col :span="3" :xs="24" :sm="5" :md="4" :lg="3">
        <perm-add :on-add="onAdd" />
      </a-col>-->
      <a-col :xs="24" :sm="10" :md="4" :lg="4" :style="{marginLeft: '20px'}">
        <a-input-search
          placeholder="用户名称搜索"
          @search="onSearch"
          enterButton
          size="small"
          v-model="name"
          allowClear
        />
      </a-col>
      <a-col :xs="24" :sm="10" :md="4" :lg="4" :style="{marginLeft: '20px'}">
        <a-input-search
          placeholder="用户昵称搜索"
          @search="onSearch"
          enterButton
          size="small"
          v-model="nickname"
          allowClear
        />
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
          <span slot="id" slot-scope="text">{{ text.user.id ? text.user.id: '' }}</span>
          <span slot="status" slot-scope="text">{{ text ? '启用' : '禁用' }}</span>
          <span slot="action" slot-scope="text">
            <!-- <a-button size="small" type="primary" @click="edit(text.id)" icon="edit" /> -->
            <info-edit :info="text" :on-edit="onEdit" />
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { index } from "@/api/userinfo";
import InfoEdit from "./InfoEdit";
const columns = [
  {
    title: "id",
    dataIndex: "user_id",
    sorter: true,
    align: "center"
  },
  {
    title: "主账户名称",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "用户昵称",
    dataIndex: "nickname",
    align: "center"
  },
  {
    title: "收费模式",
    dataIndex: "charge_status",
    align: "center"
  },
  {
    title: "初次登陆是否需启用",
    dataIndex: "save_device",
    align: "center"
  },
  {
    title: "到期时间",
    dataIndex: "expire_time",
    align: "center"
  },
  {
    title: "用户状态",
    dataIndex: "status",
    align: "center",
    filters: [{ text: "禁用", value: "2" }, { text: "启用", value: "1" }],
    scopedSlots: { customRender: "status" }
  },
  {
    title: "账户余额",
    dataIndex: "money",
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
  components: { InfoEdit },
  data() {
    return {
      data: [],
      pagination: { pageSize: 10 },
      loading: false,
      columns,
      // checked: false,

      // 给监听器使用的
      name: "",
      nickname: "",
      filters: {}
    };
  },
  mounted() {
    // 首次加载页面获取数据
    this.fetch({ pageSize: this.pagination.pageSize });
  },
  watch: {
    name: function(newVal, oldVal) {
      if (newVal == "") {
        this.fetch({ pageSize: this.pagination.pageSize });
      }
    },
    nickname: function(newVal, oldVal) {
      if (newVal == "") {
        this.fetch({ pageSize: this.pagination.pageSize });
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
    // 页面搜索
    onSearch(value) {
      if (value.trim() == "") {
        return false;
      }
      index({ name: this.name.trim(), nickname: this.nickname.trim() }).then(
        response => {
          console.log(response);
          this.data = response.data.data;
          const pager = { ...this.pagination };
          pager.total = response.data.total;
          this.pagination = pager;
        }
      );
    },

    permAdd() {
      this.$router.push({
        name: "MenuAdd"
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

    edit(id) {
      this.$router.push({
        name: "MenuEdit",
        query: { id }
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