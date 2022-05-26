<template>
  <tr>
    <td style="width: 200px" class="text-break text-wrap">{{ id }}</td>
    <td style="width: 40px" class="text-break text-wrap"><input type="checkbox" class="form-check-input" v-model="payCheck" @change="handlePayed"></td>
    <td class="text-break text-wrap">{{ name }}</td>
    <td style="width: 120px" class="text-break text-wrap">{{ invoice_date.toISOString().split('T')[0] }}</td>
    <td style="width: 120px" class="text-break text-wrap">{{ pay_due.toISOString().split('T')[0] }}</td>
    <td class="text-break text-wrap">{{ email }}</td>
    <td style="width: 100px">
      <div class="row m-0 p-0">
        <div class="btn-group m-0 p-0" role="group" aria-label="Basic mixed styles example">
          <a role="button" class="btn btn-danger" title="Delete" @click="handleDelete()"><i class="bi bi-trash"></i></a>
          <router-link :to="{ name: 'Invoice', params: { id: id }}" role="button" class="btn btn-warning" title="Invoice"><i class="bi bi-clipboard"></i></router-link>
          <router-link :to="{ name: 'Edit', params: { id: id }}" role="button" class="btn btn-success" title="Edit"><i class="bi bi-pencil"></i></router-link>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>

export default {
  name: "Row",
  emits: ['delete'],
  data() {
    return{
      payCheck:false
    }
  },
  props: {
    id: String,
    name: String,
    invoice_date: Date,
    pay_due: Date,
    email: String,
    payed: Boolean
  },
  mounted() {
    this.$data.payCheck = this.$props.payed
  },
  methods: {
    handleDelete() {
      window.api.send('deleteInvoice', JSON.stringify(this.$props.id))
      window.api.receive('deleteInvoice',() => {
        this.$emit('delete')
        window.api.send('toast', 'success');
      })
    },
    handlePayed() {
      window.api.send('paycheckInvoice', JSON.stringify({invoice_id: this.$props.id, payed: this.$data.payCheck}))
      window.api.receive('paycheckInvoice',() => {
        window.api.send('toast', 'success');
      })
    },
  }
}
</script>

<style scoped>
  input[type="checkbox"]{
    width: 40px;
    height: 40px;
  }
</style>
