<template>
  <invoice-form v-if="this.$data.invoice" @send="handleEdit" :data="this.$data.invoice"></invoice-form>
</template>

<script>
import db from '@/database/stores/invoice'
import invoiceForm from '@/components/invoiceForm'

export default {
  name: "Edit",
  components:{
    invoiceForm
  },
  data: () => ({}),
  methods: {
    handleEdit(emittedData) {
      db.editInvoice(emittedData)
          .then(() => {
            this.$router.push('/list')
            this.$emit('success')
          })
          .catch(() => this.$emit('error'))

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
