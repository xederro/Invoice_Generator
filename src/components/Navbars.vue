<template>
  <nav class="nav nav-tabs navbar navbar-dark bg-dark draggable m-0 p-0 position-fixed top-0 start-0 vw-100">
    <ul class="nav not-draggable">
      <li class="nav-item">
        <router-link to="/" class="nav-link bi-house" :active-class="'active'"></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/list" class="nav-link bi-table" :active-class="'active'"></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/add" class="nav-link bi-clipboard-plus" :active-class="'active'"></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/settings" class="nav-link bi-gear" :active-class="'active'"></router-link>
      </li>
    </ul>

    <span class="navbar-brand my-auto pe-5 ms-1 text-primary" href="#">
      Invoice Generator
    </span>

    <ul class="nav not-draggable">
      <li class="nav-item">
        <button type="button" class="nav-link bi-dash-lg" @click="min"></button>
      </li>
      <li class="nav-item">
        <button type="button" class="nav-link bi-fullscreen-exit d-none" @click="toggleFull" ref="toggle1"></button>
      </li>
      <li class="nav-item">
        <button type="button" class="nav-link bi-fullscreen" @click="toggleFull" ref="toggle2"></button>
      </li>
      <li class="nav-item">
        <button type="button" class="nav-link bi-x-lg" @click="close"></button>
      </li>
    </ul>
  </nav>


  <footer class="position-fixed bottom-0 start-0 vw-100 not-draggable">
    <div class="progress bg-dark" style="border-radius: 0">
      <div ref="progressBar" class="progress-bar progress-bar-striped progress-bar-animated d-none" role="progressbar" :style="{ width: value + '%'}" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100" id="dynamic"></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Navbars",
  data: () =>({
    value: 0,
    timer: null
  }),
  methods:{
    close: function () {
      window.api.send("close");
    },
    toggleFullButton: function () {
      this.$refs.toggle1.classList.toggle('d-none')
      this.$refs.toggle2.classList.toggle('d-none')
    },
    toggleFull: function (){
      window.api.send("full");
    },
    min: function () {
      window.api.send("min");
    },
    toggleClass: function () {
      this.clearInterval()
      this.$refs.progressBar.classList.toggle('d-none');
    },
    clearInterval: function () {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  mounted() {
    window.api.receive("full", () => {
      this.toggleFullButton()
    })



    window.api.receive("progress", () => {
      this.toggleClass()
      this.value = 0;
      this.timer = setInterval(() => {
        if (this.value >= 90) this.clearInterval()
        else this.value += 10;
      }, 10);
    })

    window.api.receive("toast", () => {
      this.value = 100;
      setTimeout(this.toggleClass, 1000)
    })

  },
  beforeUnmount() {
    this.clearInterval()
  }

}
</script>
<style>

.draggable{
  z-index: 9999;
  -webkit-app-region: drag
}
.not-draggable{
  z-index: 9999;
  -webkit-app-region: no-drag
}

</style>
