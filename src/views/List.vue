<template>
  <table class="table table-dark table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Invoice Date</th>
        <th>Pay Due Date</th>
        <th>E-mail</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <row @delete="fetchAll"
           v-for="item in $data.list"
           :key="item.invoice_id"
           :id="item.invoice_id"
           :email="item.email"
           :invoice_date="new Date(item.invoice_date)"
           :pay_due="new Date(item.pay_due)"
           :name="item.name" />
    </tbody>
    <tfoot>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Invoice Date</th>
        <th>Pay Due Date</th>
        <th>E-mail</th>
        <th>Actions</th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import Row from '@/components/Row'
import db from '@/database/stores/invoice'

export default {
  name: "List",
  components :{
    Row
  },
  data(){
    return{
      list: Array
    }
  },
  methods: {
    fetchAll: function () {
      db.fetchAllInvoices().then((r) => {
        this.$data.list = r
      })
    }
  },
  mounted() {
    this.fetchAll()
  },
}
</script>

<style scoped>

</style>
