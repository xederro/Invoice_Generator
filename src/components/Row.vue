<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ name }}</td>
    <td>{{ address }}</td>
    <td>{{ invoice_date.toISOString().split('T')[0] }}</td>
    <td>{{ pay_due.toISOString().split('T')[0] }}</td>
    <td>{{ email }}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <a role="button" class="btn btn-danger" title="Delete" @click="handleDelete()"><i class="bi bi-trash"></i></a>
        <router-link :to="{ name: 'Edit', params: { id: id }}" role="button" class="btn btn-warning" title="Invoice"><i class="bi bi-clipboard"></i></router-link>
        <router-link :to="{ name: 'Edit', params: { id: id }}" role="button" class="btn btn-success" title="Edit"><i class="bi bi-pencil"></i></router-link>
      </div>
    </td>
  </tr>
</template>

<script>
import db from '@/database/stores/invoice'

export default {
  name: "Row",
  emits: ['delete'],
  props: {
    id: String,
    name: String,
    address: String,
    invoice_date: Date,
    pay_due: Date,
    email: String
  },
  methods: {
    handleDelete() {
      db.deleteInvoice(this.$props.id).then(this.$emit('delete'));
    },
  }
}
</script>

<style scoped>

</style>
