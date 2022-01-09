<template>
  <form @submit.prevent="handleEdit" class="row g-3">
    <div class="col-12">
      <label for="name" class="form-label">Invoice ID:</label>
      <input v-model="invoice.invoice_id" type="text" class="form-control" id="name">
    </div>
    <div class="col-12">
      <label for="name" class="form-label">Name:</label>
      <input v-model="invoice.name" type="text" class="form-control" id="name">
    </div>
    <div class="col-12">
      <label for="address" class="form-label">Address:</label>
      <input v-model="invoice.address" type="text" class="form-control" id="address">
    </div>
    <div class="col-12">
      <label for="email" class="form-label">Email address</label>
      <input v-model="invoice.email" type="email" class="form-control" id="email" placeholder="name@example.com">
    </div>
    <div class="col-md-6">
      <label for="invoice_date" class="form-label">Invoice date:</label>
      <input v-model="invoice.invoice_date" type="date" class="form-control" id="invoice_date">
    </div>
    <div class="col-md-6">
      <label for="pay_due" class="form-label">Pay due date:</label>
      <input v-model="invoice.pay_due" type="date" class="form-control" id="pay_due">
    </div>
    <div class="col-12">
      <label for="description" class="form-label">Description:</label>
      <textarea v-model="invoice.description" class="form-control" id="description" rows="3"></textarea>
    </div>
    <div class="col-12">
      <label for="items" class="form-label">Items:</label>
      <textarea v-model="invoice.items" class="form-control" id="items" rows="3"></textarea>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  </form>
</template>

<script>
import db from '@/database/stores/invoice'

export default {
  name: "Edit",
  data: () => ({
    invoice: {
      invoice_id: '',
      name: '',
      address: '',
      invoice_date: new Date().toISOString().split('T')[0],
      pay_due: new Date(Date.now()+588000000).toISOString().split('T')[0],
      description: '',
      email: '',
      items: '',
    }
  }),
  methods: {
    handleEdit() {
      db.editInvoice(this.invoice).then(this.$router.push('/list'))
    },
  },
  mounted() {
    db.fetchInvoice(this.$route.params.id).then(r => {
      this.$data.invoice = r
    })
  }
}
</script>

<style scoped>

</style>
