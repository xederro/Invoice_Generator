<template>
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
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>
</style>
