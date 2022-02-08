<template>
  <div ref="success" class="position-fixed toast align-items-center text-white bg-success border-0 bottom-0 end-0 m-4" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        Success!
      </div>
    </div>
  </div>

  <div ref="error" class="position-fixed toast align-items-center text-white bg-danger border-0 bottom-0 end-0 m-4" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        Error!
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'bootstrap';

export default {
  name: "Toasts",
  mounted() {
    window.api.receive('toast', (r) => {
      if (r == 'success') (new Toast(this.$refs.success)).show()
      if (r == 'error') (new Toast(this.$refs.error)).show()
    })
  }
}
</script>

<style scoped>

</style>
