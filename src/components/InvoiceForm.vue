<template>
  <form @submit.prevent="emit" class="row g-3">
    <div class="form-floating col-6">
      <input v-model="invoice.name" type="text" class="form-control" maxlength="500" id="name" required>
      <label for="name" class="form-label">Name:</label>
    </div>
    <div class="form-floating col-6">
      <input v-model="invoice.email" type="email" class="form-control" maxlength="500" id="email" pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" required>
      <label for="email" class="form-label">Email address</label>
    </div>
    <div class="form-floating col-9">
      <input v-model="invoice.address.street" type="text" class="form-control" maxlength="250" id="street" required>
      <label for="street" class="form-label">Street</label>
    </div>
    <div class="form-floating col-3">
      <input v-model="invoice.address.number" type="text" maxlength="15" class="form-control" id="number" required>
      <label for="street" class="form-label">Building Number</label>
    </div>
    <div class="form-floating col-6">
      <input v-model="invoice.address.city" type="text" maxlength="250" class="form-control" id="city" required>
      <label for="city" class="form-label">City, State</label>
    </div>
    <div class="form-floating col-6">
      <input v-model="invoice.address.zip" maxlength="15" pattern="(^\d{1,5}([ \-]\d{1,5})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ \-]\d{1}[A-Z]{1}\d{1}$)" type="text" class="form-control" id="zip" required>
      <label for="zip" class="form-label">ZIP code</label>
    </div>
    <div class="form-floating col-md-6">
      <input v-model="invoice.invoice_date" type="date" class="form-control" id="invoice_date" min="2000-01-01" max="2099-12-31" required>
      <label for="invoice_date" class="form-label">Invoice date:</label>
    </div>
    <div class="form-floating col-md-6">
      <input v-model="invoice.pay_due" type="date" class="form-control" id="pay_due" min="2000-01-01" max="2099-12-31" required>
      <label for="pay_due" class="form-label">Pay due date:</label>
    </div>
    <div class="form-floating col-11">
      <textarea v-model="invoice.description" maxlength="3000" class="form-control" id="description" rows="3"></textarea>
      <label for="description" class="form-label">Description:</label>
    </div>
    <div class="form-floating col-1">
      <input v-model="invoice.discount" class="form-control" id="cost_per_quantity" type="number" min="0" step=".01" required @change="handleEdit">
      <label for="cost_per_quantity" class="form-label">Discount [{{currency}}]:</label>
    </div>
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          Items
          <a role="button" class="btn btn-success float-end" title="Delete" @click="addItem"><i class="bi bi-plus"></i></a>
        </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <invoice-form-item v-for="item in invoice.items" :currency="currency" @delete="removeItem" :key="item.id" :data="item" @edit="editItem"></invoice-form-item>
            </ul>
          </div>
        </div>
      </div>
    <div class="form-floating col-12">
      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  </form>
</template>

<script>
import InvoiceFormItem from "@/components/InvoiceFormItem";
export default {
  name: "InvoiceForm",
  components:{
    InvoiceFormItem
  },
  props: {
    data: Object
  },
  data: () => ({
    id: 0,
    invoice: {
      invoice_id: '',
      name: '',
      payed: false,
      address: {
        street: '',
        city: '',
        number: '',
        zip: '',
      },
      invoice_date: new Date().toISOString().split('T')[0],
      pay_due: new Date(Date.now()+588000000).toISOString().split('T')[0],
      description: '',
      email: '',
      items: [],
      discount: 0,
    },
    currency: 'EUR',
  }),
  emits: ['send'],
  methods: {
    removeItem: function (id) {
      this.$data.invoice.items.splice(this.$data.invoice.items.findIndex(x => x.id === id), 1);
    },
    emit: function () {
      this.$emit('send', this.$data.invoice)
    },
    addItem: function () {
      this.$data.invoice.items.push({
        id: this.$data.id++,
        name: '',
        quantity: '',
        cost_per_quantity: '',
        per: '',
      });
    },
    editItem: function (data) {
      this.$data.invoice.items[this.$data.invoice.items.findIndex(x => x.id === data.id)] = data;
    }
  },
  mounted() {
    if (this.data) {
      this.$data.invoice = this.data;
      this.$data.id = this.data.items[this.data.items.length-1].id+1;
    }
    else this.addItem()

    window.api.send('getCredentials')
    window.api.receive('getCredentials', (r) => this.$data.currency = r.currency)
  }
}
</script>

<style scoped>

</style>
