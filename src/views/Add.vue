<template>
  <div class="container-sm mx-sm-auto p-sm-0 my-5">
    <invoice-form @send="handleAdd"></invoice-form>
  </div>
</template>

<script>
import InvoiceForm from '@/components/InvoiceForm'

export default {
  name: "Add",
  components:{
    InvoiceForm
  },
  methods: {
    handleAdd(emittedData) {
      let data = new Date();
      emittedData.invoice_id = `${data.getFullYear()}${data.getMonth()+1}${data.getDate()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}`;
      window.api.send('addInvoice', JSON.stringify(emittedData));
      window.api.receive('addInvoice', (r) => {
          if (typeof r == "object"){
            this.$router.push('/list');
            window.api.send('toast', 'success');
          }
          else window.api.send('toast', 'error');
      });
    },
  }
}
</script>

<style scoped>

</style>
