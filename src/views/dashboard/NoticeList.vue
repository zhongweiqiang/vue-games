<template>
  <div style="background: #ECECEC; padding: 30px; padding-top: 0px;">
    <a-row style="background: #fff;">
      <a-col>
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <span slot="parent" slot-scope="text">{{text.title}}</span>
          <!-- <span slot="content" slot-scope="text"><div v-html="text.content"></div></span> -->


          <span slot="action" slot-scope="text">
            <detail :content="text.content" />
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { index, del } from "@/api/notice";
import Detail from './Detail'
const columns = [
  {
    title: "公告",
    dataIndex: "title",
    align: "center"
  },
//   {
//     title: "公告内容",
//     key: 'content',
//     scopedSlots: { customRender: "content" },
//     align: "center"
//   },
    {
    title: "日期",
    dataIndex: "created_at",
    align: "center"
  },
  
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
  }
];
export default {
  components: { Detail },
  data() {
    return {
      data: [],
      pagination: { pageSize: 10 },
      loading: false,
      columns,
      // checked: false,

      // 给监听器使用的
      title: "",
      filters: {}
    };
  },
  mounted() {
    // 首次加载页面获取数据
    this.fetch({ pageSize: this.pagination.pageSize });
    // this.tag_data();
    console.log(this.config);
  },
  watch: {
    title: function(newVal, oldVal) {
      if (newVal == "") {
        this.fetch({ pageSize: this.pagination.pageSize });
      }
    }
  },
  methods: {
    // 页面搜索
    onSearch(value) {
      if (value.trim() == "") {
        return false;
      }
      index({ title: value }).then(response => {
        console.log(response);
        this.data = response.data.data;
        const pager = { ...this.pagination };
        pager.total = response.data.total;
        this.pagination = pager;
      });
    },

    getPagination(){
      return {
        pageSize: this.pagination.pageSize,
        page: this.pagination.current,
        sortField: this.pagination.sortField,
        sortOrder: this.pagination.sortOrder,
      }
    },

    onAdd(){
      this.fetch({ pageSize: this.pagination.pageSize })
    },

    onEdit(){
      this.fetch(this.getPagination())
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