<template>
  <form @submit.prevent="handleSet" class="row g-3">
    <div class="form-floating col-12">
      <input v-model="credentials.name" type="text" class="form-control" id="name" required>
      <label for="name" class="form-label">Name</label>
    </div>
    <div class="form-floating col-9">
      <input v-model="credentials.address.street" type="text" class="form-control" id="street" required>
      <label for="street" class="form-label">Street</label>
    </div>
    <div class="form-floating col-3">
      <input v-model="credentials.address.number" type="text" class="form-control" id="number" required>
      <label for="street" class="form-label">Building Number</label>
    </div>
    <div class="form-floating col-6">
      <input v-model="credentials.address.city" type="text" class="form-control" id="city" required>
      <label for="city" class="form-label">City, State</label>
    </div>
    <div class="form-floating col-6">
      <input v-model="credentials.address.zip" type="text" class="form-control" id="zip" required>
      <label for="zip" class="form-label">ZIP code</label>
    </div>
    <div class="form-floating col-12">
      <input v-model="credentials.email" type="email" class="form-control" id="email" placeholder="name@example.com" required>
      <label for="email" class="form-label">Email address</label>
    </div>
    <div class="form-floating col-12">
      <input v-model="credentials.phone" type="text" class="form-control" id="phone" placeholder="000 000 000" required>
      <label for="phone" class="form-label">Phone number</label>
    </div>
    <div class="form-floating col-12">
      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  </form>
</template>

<script>
import cred from "@/database/stores/credentials";

export default {
  name: 'Home',
  emits: ['success', 'error'],
  data: () => ({
    credentials: {
      name: '',
      address: {
        street: '',
        city: '',
        number: '',
        zip: '',
      },
      email: '',
      phone: '',
    }
  }),
  methods: {
    handleSet() {
      cred.setCredentials(this.$data.credentials)
          .then(() => this.$emit('success'))
          .catch(() => this.$emit('error'))
    },
    handleGet() {
      cred.getCredentials().then(r => this.$data.credentials = r)
    }
  },
  mounted() {
    this.handleGet()
  }
}
</script>
