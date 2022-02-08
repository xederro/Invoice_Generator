<template>
  <div class="container-sm mx-sm-auto p-sm-0 my-5">
    <invoice-form v-if="this.$data.invoice" @send="handleEdit" :data="this.$data.invoice"></invoice-form>
  </div>
</template>

<script>
import InvoiceForm from '@/components/InvoiceForm'

export default {
  name: "Edit",
  components:{
    InvoiceForm
  },
  data: () => ({}),
  methods: {
    handleEdit(emittedData) {
      window.api.send('editInvoice', JSON.stringify(emittedData))
      window.api.receive('editInvoice', () => {
        this.$router.push('/list');
        window.api.send('toast', 'success');
      })
    },
  },
  mounted() {
    window.api.send('fetchInvoice', JSON.stringify(this.$route.params.id))
    window.api.receive('fetchInvoice', (r) => {
      this.$data.invoice = r
    })

  }
}
</script>

<style scoped>

</style>
