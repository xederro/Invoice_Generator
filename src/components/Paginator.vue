<template>
  <div class="btn-group">
    <button @click="pageChange(1)" v-if="prev > 1" class="btn btn-dark bi-chevron-double-left"></button>
    <button @click="pageChange(prev)" v-if="prev >= 1" class="btn btn-dark bi-chevron-left"></button>
    <button @click="pageChange(index)" v-for="index in pages" class="btn btn-dark" :class="{ active: index == current, disabled: index == current }" :key="index">{{ index }}</button>
    <button @click="pageChange(next)" v-if="next <= pages" class="btn btn-dark bi-chevron-right"></button>
    <button @click="pageChange(pages)" v-if="next < pages" class="btn btn-dark bi-chevron-double-right"></button>
  </div>
</template>

<script>
export default {
  name: "Paginator",
  props:{
    pages: Number,
    current: Number
  },
  emits: ['pageChange'],
  methods:{
    pageChange: function (page) {
      this.$emit('pageChange', page);
    }
  },
  computed:{
    prev: function () {
      return this.current-1
    },
    next: function () {
      return this.current+1
    }
  }
}
</script>

<style scoped>

</style>
