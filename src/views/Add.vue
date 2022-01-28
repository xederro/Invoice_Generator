<template>
  <invoice-form @send="handleAdd"></invoice-form>
</template>

<script>
import db from '@/database/stores/invoice'
import invoiceForm from '@/components/invoiceForm'

export default {
  name: "Add",
  components:{
    invoiceForm
  },
  methods: {
    handleAdd(emittedData) {
      let data = new Date();
      emittedData.invoice_id = `${data.getFullYear()}${data.getMonth()+1}${data.getDate()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}`;
      db.addInvoice(emittedData)
          .then(() => {
            this.$router.push('/list')
            this.$emit('success')
          })
          .catch(() => this.$emit('error'))
    },
  }
}
</script>

<style scoped>

</style>
