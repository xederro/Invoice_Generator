<template>
  <div class="container-sm mx-sm-auto p-sm-0 my-5">
    <div class="row">
      <div class="col">
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
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col text-center">
        <paginator @pageChange="pageChange" :current="current" :pages="pages" v-if="pages>0"></paginator>
      </div>
    </div>
  </div>
</template>

<script>
import Row from '@/components/Row'
import Paginator from '@/components/Paginator'

export default {
  name: "List",
  emits: ['success', 'error'],
  components :{
    Paginator,
    Row
  },
  data(){
    return{
      list: Array,
      pages: Number,
      current: 1,
    }
  },
  methods: {
    pageChange:function (page) {
      this.$data.current = page < 1 ? this.$data.current : page;
      this.fetchAll();
    },
    fetchAll: function () {
      window.api.send('paginate', JSON.stringify(this.$data.current-1))
      window.api.receive('paginate',(r) => {
        this.$data.list = r;
      })

      window.api.send('pageCount')
      window.api.receive('pageCount',(r) => {
        this.$data.pages = Number(r);
      })
    }
  },
  created() {
    this.fetchAll();
  },
}
</script>

<style scoped>

</style>
