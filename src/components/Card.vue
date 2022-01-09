<template>
  <div class="card text-center bg-dark text-light">
    <div class="card-header">
      <h1>Invoice nr. {{ id }}</h1>
    </div>

    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-dark text-light">Name: {{ name }}</li>
        <li class="list-group-item bg-dark text-light">Address: {{ address }}</li>
        <li class="list-group-item bg-dark text-light">E-mail: {{ email }}</li>
        <li class="list-group-item bg-dark text-light">Description: {{ description }}</li>
        <li class="list-group-item bg-dark text-light">Items: {{ items }}</li>
      </ul>
    </div>
    <div class="card-footer text-muted">
      Date: {{ new Date(invoice_date).toISOString().split('T')[0] }} - Payment Due: {{ new Date(pay_due).toISOString().split('T')[0] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    id: String,
    name: String,
    address: String,
    invoice_date: Date,
    pay_due: Date,
    email: String,
    items: String,
    description: String,
  }
}
</script>

<style scoped>

</style>
