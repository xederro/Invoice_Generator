<template>
  <li class="list-group-item">
    <div class="row">
      <div class="col">
        <div class="row g-3">
          <div class="form-floating col-9">
            <input v-model="items.name" class="form-control" id="itemName" required @change="handleEdit">
            <label for="itemName" class="form-label">Name:</label>
          </div>
          <div class="form-floating col-1">
            <input v-model="items.quantity" class="form-control" id="quantity" type="number" min="0" step=".1" required @change="handleEdit">
            <label for="quantity" class="form-label">Quantity:</label>
          </div>
          <div class="form-floating col-1">
            <input v-model="items.cost_per_quantity" class="form-control" id="cost_per_quantity" type="number" min="0" step=".01" required @change="handleEdit">
            <label for="cost_per_quantity" class="form-label">Cost per quantity:</label>
          </div>
          <div class="form-floating col-1">
            <select class="form-select" v-model="items.per" id="per" required @change="handleEdit">
              <option :value="currency + '/hour'" selected>{{ currency }}/hour</option>
              <option :value="currency + '/piece'">{{ currency }}/piece</option>
            </select>
            <label for="per" class="form-label">Per:</label>
          </div>
        </div>
      </div>
      <div class="col m-0 p-0" style="max-width: 50px;">
        <a role="button" class="btn btn-danger h-100 w-100 py-3" title="Delete" @click="handleDelete()"><i class="bi bi-trash"></i></a>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "invoiceFormItem",
  props:{
    data: Object,
    currency: String
  },
  data: () => ({
    items: {}
  }),
  emits:['delete','edit'],
  methods: {
    handleDelete() {
      this.$emit('delete', this.data.id);
    },
    handleEdit() {
      this.$emit('edit', this.$data.items);
    },
  },
  mounted() {
    this.$data.items = this.data;
  }
}
</script>

<style scoped>

</style>
