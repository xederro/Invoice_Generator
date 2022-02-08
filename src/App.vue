<template>
  <navbars/>

  <toasts/>

  <div>
    <router-view/>
  </div>

</template>
<script>
import Navbars from '@/components/Navbars';
import Toasts from '@/components/Toasts';

export default {
  components:{
    Navbars,
    Toasts
  }
}
</script>
<style>

::-webkit-scrollbar {
  background: var(--bs-dark);
  width: 12px;
  margin-top: 41.5px;
  margin-bottom: 16px;
}

::-webkit-scrollbar-track {
  background: var(--bs-light);
  width: 12px;
  margin-top: 41.5px;
  margin-bottom: 16px;
}

::-webkit-scrollbar-thumb {
  background: var(--bs-dark);
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  margin-top: 41.5px;
  margin-bottom: 16px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--bs-gray-dark);
  margin-top: 41.5px;
  margin-bottom: 16px;
}


</style>
