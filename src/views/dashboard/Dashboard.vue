<template>
  <div>
      <dash-card :data="data" />
      <table-list :data="table" />
      <notice-list />
      <notice-modal />
  </div>
</template>

<script>
import DashCard from './DashCard'
import TableList from './TableList'
import NoticeList from './NoticeList'
import NoticeModal from './NoticeModal'
import { index } from '@/api/dashboard'
export default {
  components: {
    DashCard,
    TableList,
    NoticeList,
    NoticeModal
  },
  data(){
    return {
      data: {},
      table: {}
    }
  },
  mounted(){
    this.index()
  },
  methods: {
    index(){
      index().then(response => {
        console.log(response)
        this.data = response.data.field
        this.table = response.data
      })
    }
  }

}
</script>

<style>

</style>