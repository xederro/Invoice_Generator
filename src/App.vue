<template>
  <nav class="navbar navbar-dark bg-dark draggable">
    <div class="btn-group me-2 not-draggable" role="group">
      <button type="button" class="btn btn-dark bi-dash-lg" @click="min"></button>
      <button v-if="isMax" type="button" class="btn btn-dark bi-fullscreen" @click="toggleFull"></button>
      <button v-else type="button" class="btn btn-dark bi-fullscreen-exit" @click="toggleFull"></button>
      <button type="button" class="btn btn-dark bi-x-lg" @click="close"></button>
    </div>
  </nav>

  <div ref="success" class="position-fixed toast align-items-center text-white bg-success border-0 bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        Success!
      </div>
    </div>
  </div>

  <div ref="error" class="position-fixed toast align-items-center text-white bg-danger border-0 bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        Error!
      </div>
    </div>
  </div>


  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-auto bg-dark sticky-top">
        <div class="d-flex flex-sm-column flex-row flex-nowrap bg-dark align-items-center sticky-top">
          <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
            <li class="nav-item">
              <router-link to="/" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Main"><i class="bi-house bi fs-1"></i></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/list" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Main"><i class="bi-table fs-1 bi"></i></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/add" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Add"><i class="fs-1 bi bi-clipboard-plus"></i></router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-sm p-3 min-vh-100">
        <router-view @success="successToast" @error="errorToast"/>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'bootstrap';

export default {
  data: () => ({
    isMax: false
  }),
  methods:{
    successToast: function () {
      (new Toast(this.$refs.success)).show()
    },
    errorToast: function () {
      (new Toast(this.$refs.error)).show()
    },
    close: function () {
      window.api.send("close");
    },
    toggleFull: function () {
      window.api.send("toggleFull");
      this.$data.isMax = !this.$data.isMax;
    },
    min: function () {
      window.api.send("min");
    }
  }
}
</script>
<style>

.draggable{
  -webkit-app-region: drag
}
.not-draggable{
  -webkit-app-region: no-drag
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--bs-light);
  width: 12px;
}

::-webkit-scrollbar-thumb {
  background: var(--bs-dark);
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--bs-gray-dark);
}
</style>
